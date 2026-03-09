interface Env {
  DB: D1Database;
}

const CORS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

// GET — list all barbers
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { results } = await context.env.DB.prepare(
    'SELECT id, name, role, status, sort_order, created_at FROM barbers ORDER BY sort_order'
  ).all();

  return new Response(JSON.stringify({ barbers: results }), { status: 200, headers: CORS });
};

// POST — add a new barber
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: any;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers: CORS });
  }

  const { id, name, role } = body;

  if (!id || !name) {
    return new Response(JSON.stringify({ error: 'ID and name are required.' }), { status: 400, headers: CORS });
  }

  const cleanId = id.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '').slice(0, 50);
  const cleanName = name.trim().slice(0, 100);
  const cleanRole = (role || 'Barber').trim().slice(0, 100);

  // Check if ID already exists
  const existing = await context.env.DB.prepare(
    'SELECT id FROM barbers WHERE id = ?'
  ).bind(cleanId).first();

  if (existing) {
    return new Response(JSON.stringify({ error: 'A barber with this ID already exists.' }), { status: 409, headers: CORS });
  }

  // Get next sort_order
  const maxOrder = await context.env.DB.prepare(
    'SELECT MAX(sort_order) as max_order FROM barbers'
  ).first();
  const nextOrder = ((maxOrder as any)?.max_order || 0) + 1;

  await context.env.DB.prepare(
    'INSERT INTO barbers (id, name, role, status, sort_order) VALUES (?, ?, ?, ?, ?)'
  ).bind(cleanId, cleanName, cleanRole, 'active', nextOrder).run();

  return new Response(JSON.stringify({ success: true, barber: { id: cleanId, name: cleanName, role: cleanRole, status: 'active' } }), { status: 201, headers: CORS });
};

// PUT — update barber status
export const onRequestPut: PagesFunction<Env> = async (context) => {
  let body: any;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), { status: 400, headers: CORS });
  }

  const { id, status, name, role } = body;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Barber ID is required.' }), { status: 400, headers: CORS });
  }

  const barber = await context.env.DB.prepare(
    'SELECT id FROM barbers WHERE id = ?'
  ).bind(id).first();

  if (!barber) {
    return new Response(JSON.stringify({ error: 'Barber not found.' }), { status: 404, headers: CORS });
  }

  if (status) {
    const validStatuses = ['active', 'away', 'holiday'];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status. Use: active, away, holiday.' }), { status: 400, headers: CORS });
    }
    await context.env.DB.prepare(
      'UPDATE barbers SET status = ? WHERE id = ?'
    ).bind(status, id).run();
  }

  if (name) {
    await context.env.DB.prepare(
      'UPDATE barbers SET name = ? WHERE id = ?'
    ).bind(name.trim().slice(0, 100), id).run();
  }

  if (role) {
    await context.env.DB.prepare(
      'UPDATE barbers SET role = ? WHERE id = ?'
    ).bind(role.trim().slice(0, 100), id).run();
  }

  return new Response(JSON.stringify({ success: true, message: 'Barber updated.' }), { status: 200, headers: CORS });
};

// DELETE — remove a barber
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Barber ID is required.' }), { status: 400, headers: CORS });
  }

  const barber = await context.env.DB.prepare(
    'SELECT id FROM barbers WHERE id = ?'
  ).bind(id).first();

  if (!barber) {
    return new Response(JSON.stringify({ error: 'Barber not found.' }), { status: 404, headers: CORS });
  }

  // Check for future confirmed bookings
  const futureBookings = await context.env.DB.prepare(
    "SELECT COUNT(*) as count FROM bookings WHERE barber = ? AND date >= date('now') AND status = 'confirmed'"
  ).bind(id).first();

  if ((futureBookings as any)?.count > 0) {
    return new Response(JSON.stringify({ error: `Cannot delete — ${(futureBookings as any).count} future booking(s) exist. Cancel them first or mark barber as away.` }), { status: 409, headers: CORS });
  }

  await context.env.DB.prepare('DELETE FROM barbers WHERE id = ?').bind(id).run();

  return new Response(JSON.stringify({ success: true, message: 'Barber removed.' }), { status: 200, headers: CORS });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
