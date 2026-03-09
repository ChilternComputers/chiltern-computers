interface Env {
  DB: D1Database;
}

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

// GET — list bookings with optional filters
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const date = url.searchParams.get('date');
  const barber = url.searchParams.get('barber');
  const status = url.searchParams.get('status') || 'confirmed';

  let query = 'SELECT b.id, b.ref, b.barber, b.name, b.phone, b.email, b.service, b.date, b.time, b.status, b.created_at, br.name as barber_name FROM bookings b LEFT JOIN barbers br ON b.barber = br.id';
  const conditions: string[] = [];
  const params: string[] = [];

  if (status !== 'all') {
    conditions.push('b.status = ?');
    params.push(status);
  }
  if (date) {
    conditions.push('b.date = ?');
    params.push(date);
  }
  if (barber) {
    conditions.push('b.barber = ?');
    params.push(barber);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY b.date ASC, b.time ASC';

  const stmt = context.env.DB.prepare(query);
  const bound = params.length > 0 ? stmt.bind(...params) : stmt;
  const { results } = await bound.all();

  return new Response(JSON.stringify({ bookings: results }), { status: 200, headers: CORS });
};

// DELETE — cancel a booking by id
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Booking ID is required.' }), { status: 400, headers: CORS });
  }

  const booking = await context.env.DB.prepare(
    'SELECT id, status FROM bookings WHERE id = ?'
  ).bind(id).first();

  if (!booking) {
    return new Response(JSON.stringify({ error: 'Booking not found.' }), { status: 404, headers: CORS });
  }

  await context.env.DB.prepare(
    "UPDATE bookings SET status = 'cancelled' WHERE id = ?"
  ).bind(id).run();

  return new Response(JSON.stringify({ success: true, message: 'Booking cancelled.' }), { status: 200, headers: CORS });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
