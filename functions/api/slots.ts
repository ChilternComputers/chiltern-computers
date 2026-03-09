import { type Env, type Barber, corsHeaders, corsOptionsHeaders, jsonResponse, jsonError, SERVICES, generateSlots } from './_shared';

async function getActiveBarbers(db: D1Database): Promise<Barber[]> {
  const { results } = await db.prepare(
    "SELECT id, name, role, status, sort_order, created_at FROM barbers WHERE status = 'active' ORDER BY sort_order"
  ).all<Barber>();
  return results;
}

async function getAllBarbers(db: D1Database): Promise<Barber[]> {
  const { results } = await db.prepare(
    "SELECT id, name, role, status, sort_order, created_at FROM barbers ORDER BY sort_order"
  ).all<Barber>();
  return results;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const date = url.searchParams.get('date');
  const barber = url.searchParams.get('barber');
  const mode = url.searchParams.get('mode');

  try {
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

        const total = allSlots.length;

        if (barber === 'any') {
          // Batch query: get all booking counts for all active barbers for this date in one query
          const barberIds = activeBarbers.map(b => b.id);
          let anyAvailable = 0;

          if (barberIds.length > 0) {
            const placeholders = barberIds.map(() => '?').join(',');
            const { results } = await context.env.DB.prepare(
              `SELECT barber, COUNT(*) as count FROM bookings WHERE barber IN (${placeholders}) AND date = ? AND status = 'confirmed' GROUP BY barber`
            ).bind(...barberIds, dateStr).all<{ barber: string; count: number }>();

            const bookedMap = new Map(results.map(r => [r.barber, r.count]));
            for (const b of activeBarbers) {
              const booked = bookedMap.get(b.id) ?? 0;
              const free = total - booked;
              if (free > anyAvailable) anyAvailable = free;
            }
          }

          let status = 'green';
          if (anyAvailable <= 0) status = 'red';
          else if (anyAvailable / total <= 0.3) status = 'amber';

          days.push({ date: dateStr, day: `${dayName} ${dayNum}`, status, available: anyAvailable, total });
        } else {
          const row = await context.env.DB.prepare(
            "SELECT COUNT(*) as count FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
          ).bind(barber, dateStr).first<{ count: number }>();

          const booked = row?.count ?? 0;
          const available = total - booked;
          const ratio = available / total;

          let status = 'green';
          if (ratio <= 0) status = 'red';
          else if (ratio <= 0.3) status = 'amber';

          days.push({ date: dateStr, day: `${dayName} ${dayNum}`, status, available, total });
        }
      }

      return jsonResponse({ barber, days, barbers: activeBarbers }, 200, context.request, { 'Cache-Control': 'no-cache' });
    }

    // Single day slots mode
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return jsonError('Invalid date. Use YYYY-MM-DD.', 400, context.request);
    }

    if (!barber) {
      return jsonError('Barber is required.', 400, context.request);
    }

    const dateObj = new Date(date + 'T12:00:00Z');
    const dayOfWeek = dateObj.getUTCDay();
    const allSlots = generateSlots(dayOfWeek);

    if (allSlots.length === 0) {
      return jsonResponse({ date, barber, closed: true, slots: [], services: SERVICES }, 200, context.request, { 'Cache-Control': 'no-cache' });
    }

    if (barber === 'any') {
      const allBarbersList = await getAllBarbers(context.env.DB);
      const barberBookedTimes = new Map<string, Set<string>>();

      // Batch query for all active barbers' bookings on this date
      const barberIds = activeBarbers.map(b => b.id);
      if (barberIds.length > 0) {
        const placeholders = barberIds.map(() => '?').join(',');
        const { results } = await context.env.DB.prepare(
          `SELECT barber, time FROM bookings WHERE barber IN (${placeholders}) AND date = ? AND status = 'confirmed'`
        ).bind(...barberIds, date).all<{ barber: string; time: string }>();

        for (const r of results) {
          if (!barberBookedTimes.has(r.barber)) barberBookedTimes.set(r.barber, new Set());
          barberBookedTimes.get(r.barber)!.add(r.time);
        }
      }

      const slots = allSlots.map((time) => {
        const slotBarbers = allBarbersList.filter(b => b.status === 'active').map(b => {
          const isFree = !barberBookedTimes.get(b.id)?.has(time);
          return { id: b.id, name: b.name, status: b.status, available: isFree };
        });
        const anyFree = slotBarbers.some(b => b.available);
        return { time, available: anyFree, slotBarbers };
      });

      return jsonResponse({ date, barber, closed: false, slots, services: SERVICES, barbers: activeBarbers }, 200, context.request, { 'Cache-Control': 'no-cache' });
    }

    // Specific barber
    const { results } = await context.env.DB.prepare(
      "SELECT time FROM bookings WHERE barber = ? AND date = ? AND status = 'confirmed'"
    ).bind(barber, date).all<{ time: string }>();

    const bookedTimes = new Set(results.map(r => r.time));
    const slots = allSlots.map((time) => ({
      time,
      available: !bookedTimes.has(time),
    }));

    return jsonResponse({ date, barber, closed: false, slots, services: SERVICES, barbers: activeBarbers }, 200, context.request, { 'Cache-Control': 'no-cache' });
  } catch (err) {
    console.error('Slots error:', err);
    return jsonError('Failed to load availability.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'GET, OPTIONS') });
};
