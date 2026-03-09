import { type Env, type Barber, corsHeaders, corsOptionsHeaders, jsonResponse, jsonError } from './_shared';

// GET — look up booking by token (for the cancel page to display details)
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const token = url.searchParams.get('token');

  if (!token || token.length < 16) {
    return jsonError('Invalid cancel link.', 400, context.request);
  }

  try {
    const booking = await context.env.DB.prepare(
      'SELECT id, barber, name, service, date, time, status FROM bookings WHERE cancel_token = ?'
    ).bind(token).first<{ id: number; barber: string; name: string; service: string; date: string; time: string; status: string }>();

    if (!booking) {
      return jsonError('Booking not found.', 404, context.request);
    }

    const barberRow = await context.env.DB.prepare(
      'SELECT name FROM barbers WHERE id = ?'
    ).bind(booking.barber).first<Pick<Barber, 'name'>>();
    const barberName = barberRow?.name ?? booking.barber;

    return jsonResponse({
      id: booking.id,
      barber: barberName,
      name: booking.name,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      status: booking.status,
    }, 200, context.request, { 'Cache-Control': 'no-cache' });
  } catch (err) {
    console.error('Cancel lookup error:', err);
    return jsonError('Failed to look up booking.', 500, context.request);
  }
};

// POST — cancel the booking
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { token?: string };
  try {
    body = await context.request.json();
  } catch {
    return jsonError('Invalid request.', 400, context.request);
  }

  const { token } = body;

  if (!token || token.length < 16) {
    return jsonError('Invalid cancel link.', 400, context.request);
  }

  try {
    const booking = await context.env.DB.prepare(
      "SELECT id, status FROM bookings WHERE cancel_token = ?"
    ).bind(token).first<{ id: number; status: string }>();

    if (!booking) {
      return jsonError('Booking not found.', 404, context.request);
    }

    if (booking.status === 'cancelled') {
      return jsonError('This booking has already been cancelled.', 409, context.request);
    }

    await context.env.DB.prepare(
      "UPDATE bookings SET status = 'cancelled' WHERE cancel_token = ?"
    ).bind(token).run();

    return jsonResponse({
      success: true,
      message: 'Your booking has been cancelled.',
    }, 200, context.request);
  } catch (err) {
    console.error('Cancel error:', err);
    return jsonError('Failed to cancel booking.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'GET, POST, OPTIONS') });
};
