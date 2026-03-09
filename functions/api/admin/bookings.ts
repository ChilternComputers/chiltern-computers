import { type Env, type Booking, corsOptionsHeaders, jsonResponse, jsonError } from '../_shared';

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

  query += ' ORDER BY b.date ASC, b.time ASC LIMIT 500';

  try {
    const stmt = context.env.DB.prepare(query);
    const bound = params.length > 0 ? stmt.bind(...params) : stmt;
    const { results } = await bound.all<Booking>();

    return jsonResponse({ success: true, bookings: results }, 200, context.request);
  } catch (err) {
    console.error('Bookings list error:', err);
    return jsonError('Failed to load bookings.', 500, context.request);
  }
};

// DELETE — cancel a booking by id
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return jsonError('Booking ID is required.', 400, context.request);
  }

  try {
    const booking = await context.env.DB.prepare(
      'SELECT id, status FROM bookings WHERE id = ?'
    ).bind(id).first<{ id: number; status: string }>();

    if (!booking) {
      return jsonError('Booking not found.', 404, context.request);
    }

    await context.env.DB.prepare(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ?"
    ).bind(id).run();

    return jsonResponse({ success: true, message: 'Booking cancelled.' }, 200, context.request);
  } catch (err) {
    console.error('Cancel booking error:', err);
    return jsonError('Failed to cancel booking.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'GET, DELETE, OPTIONS') });
};
