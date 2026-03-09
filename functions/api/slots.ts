interface Env {
  DB: D1Database;
}

const SERVICES = [
  { name: 'Skin Fade', price: 18, duration: 30 },
  { name: 'Scissor Cut', price: 15, duration: 30 },
  { name: 'Beard Trim', price: 10, duration: 15 },
  { name: 'Hot Towel Shave', price: 20, duration: 30 },
  { name: 'Fade & Beard', price: 25, duration: 45 },
  { name: 'Full Service', price: 30, duration: 60 },
];

const HOURS: Record<number, { open: string; close: string } | null> = {
  0: null, // Sunday closed
  1: { open: '09:00', close: '18:00' },
  2: { open: '09:00', close: '18:00' },
  3: { open: '09:00', close: '18:00' },
  4: { open: '09:00', close: '18:00' },
  5: { open: '09:00', close: '18:00' },
  6: { open: '08:30', close: '16:30' },
};

function generateSlots(dayOfWeek: number): string[] {
  const hours = HOURS[dayOfWeek];
  if (!hours) return [];
  const slots: string[] = [];
  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);
  let h = openH;
  let m = openM;
  while (h < closeH || (h === closeH && m < closeM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }
  return slots;
}

async function getActiveBarbers(db: D1Database): Promise<Array<{ id: string; name: string; role: string }>> {
  const { results } = await db.prepare(
    "SELECT id, name, role FROM barbers WHERE status = 'active' ORDER BY sort_order"
  ).all();
  return results as any[];
}

async function getAllBarbers(db: D1Database): Promise<Array<{ id: string; name: string; role: string; status: string }>> {
  const { results } = await db.prepare(
    "SELECT id, name, role, status FROM barbers ORDER BY sort_order"
  ).all();
  return results as any[];
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const date = url.searchParams.get('date');
  const barber = url.searchParams.get('barber');
  const mode = url.searchParams.get('mode');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  };

  const activeBarbers = await getActiveBarbers(context.env.DB);

  // Weekly availability mode — returns traffic light status for 14 days
  if (mode === 'week' && barber) {
    const days: Array<{ date: string; day: string; status: string; available: number; total: number }> = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dow = d.getDay();
      const allSlots = generateSlots(dow);
      const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
      const dayNum = d.getDate();

      if (allSlots.length === 0) {
        days.push({ date: dateStr, day: `${dayName} ${dayNum}`, status: 'closed', available: 0, total: 0 });
        continue;
      }

      if (barber === 'any') {
        let anyAvailable = 0;
        const total = allSlots.length;

        for (const b of activeBarbers) {
          const { results } = await context.env.DB.prepare(
            "SELECT COUNT(*) as count FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
          ).bind(b.id, dateStr).all();
          const booked = (results[0] as any)?.count || 0;
          const free = total - booked;
          if (free > anyAvailable) anyAvailable = free;
        }

        let status = 'green';
        if (anyAvailable <= 0) status = 'red';
        else if (anyAvailable / total <= 0.3) status = 'amber';

        days.push({ date: dateStr, day: `${dayName} ${dayNum}`, status, available: anyAvailable, total });
      } else {
        const { results } = await context.env.DB.prepare(
          "SELECT COUNT(*) as count FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
        ).bind(barber, dateStr).all();

        const booked = (results[0] as any)?.count || 0;
        const total = allSlots.length;
        const available = total - booked;
        const ratio = available / total;

        let status = 'green';
        if (ratio <= 0) status = 'red';
        else if (ratio <= 0.3) status = 'amber';

        days.push({ date: dateStr, day: `${dayName} ${dayNum}`, status, available, total });
      }
    }

    return new Response(JSON.stringify({ barber, days, barbers: activeBarbers }), { status: 200, headers });
  }

  // Single day slots mode
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Response(JSON.stringify({ error: 'Invalid date. Use YYYY-MM-DD.' }), { status: 400, headers });
  }

  if (!barber) {
    return new Response(JSON.stringify({ error: 'Barber is required.' }), { status: 400, headers });
  }

  const dateObj = new Date(date + 'T12:00:00Z');
  const dayOfWeek = dateObj.getUTCDay();
  const allSlots = generateSlots(dayOfWeek);

  if (allSlots.length === 0) {
    return new Response(JSON.stringify({ date, barber, closed: true, slots: [], services: SERVICES }), { status: 200, headers });
  }

  if (barber === 'any') {
    const allBarbersList = await getAllBarbers(context.env.DB);
    const barberBookedTimes = new Map<string, Set<string>>();

    for (const b of activeBarbers) {
      const { results } = await context.env.DB.prepare(
        "SELECT time FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
      ).bind(b.id, date).all();
      barberBookedTimes.set(b.id, new Set(results.map((r: any) => r.time)));
    }

    const slots = allSlots.map((time) => {
      const slotBarbers = allBarbersList.map(b => {
        const isActive = b.status === 'active';
        const isFree = isActive && !barberBookedTimes.get(b.id)?.has(time);
        return { id: b.id, name: b.name, status: b.status, available: isFree };
      });
      const anyFree = slotBarbers.some(b => b.available);
      return { time, available: anyFree, slotBarbers };
    });

    return new Response(JSON.stringify({ date, barber, closed: false, slots, services: SERVICES, barbers: activeBarbers }), { status: 200, headers });
  }

  // Specific barber
  const { results } = await context.env.DB.prepare(
    "SELECT time FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
  ).bind(barber, date).all();

  const bookedTimes = new Set(results.map((r: any) => r.time));
  const slots = allSlots.map((time) => ({
    time,
    available: !bookedTimes.has(time),
  }));

  return new Response(JSON.stringify({ date, barber, closed: false, slots, services: SERVICES, barbers: activeBarbers }), { status: 200, headers });
};
