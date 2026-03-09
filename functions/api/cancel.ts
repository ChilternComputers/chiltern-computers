interface Env {
  DB: D1Database;
}

// GET — look up booking by token (for the cancel page to display details)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const token = url.searchParams.get('token');

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  };

  if (!token || token.length < 16) {
    return new Response(JSON.stringify({ error: 'Invalid cancel link.' }), { status: 400, headers });
  }

  const booking = await context.env.DB.prepare(
    'SELECT id, barber, name, service, date, time, status FROM bookings WHERE cancel_token = ?'
  ).bind(token).first();

  if (!booking) {
    return new Response(JSON.stringify({ error: 'Booking not found.' }), { status: 404, headers });
  }

  // Look up barber display name from DB
  const barberRow = await context.env.DB.prepare(
    'SELECT name FROM barbers WHERE id = ?'
  ).bind(booking.barber).first();
  const barberName = (barberRow as any)?.name || booking.barber;

  return new Response(JSON.stringify({
    id: booking.id,
    barber: barberName,
    name: booking.name,
    service: booking.service,
    date: booking.date,
    time: booking.time,
    status: booking.status,
  }), { status: 200, headers });
};

// POST — cancel the booking
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let body: any;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers });
  }

  const { token } = body;

  if (!token || token.length < 16) {
    return new Response(JSON.stringify({ error: 'Invalid cancel link.' }), { status: 400, headers });
  }

  const booking = await context.env.DB.prepare(
    "SELECT id, status FROM bookings WHERE cancel_token = ?"
  ).bind(token).first();

  if (!booking) {
    return new Response(JSON.stringify({ error: 'Booking not found.' }), { status: 404, headers });
  }

  if (booking.status === 'cancelled') {
    return new Response(JSON.stringify({ error: 'This booking has already been cancelled.' }), { status: 409, headers });
  }

  await context.env.DB.prepare(
    "UPDATE bookings SET status = 'cancelled' WHERE cancel_token = ?"
  ).bind(token).run();

  return new Response(JSON.stringify({
    success: true,
    message: 'Your booking has been cancelled.',
  }), { status: 200, headers });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
