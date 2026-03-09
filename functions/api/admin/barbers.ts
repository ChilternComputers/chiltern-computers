import { type Env, type Barber, corsOptionsHeaders, jsonResponse, jsonError } from '../_shared';

// GET — list all barbers
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      'SELECT id, name, role, status, sort_order, created_at FROM barbers ORDER BY sort_order'
    ).all<Barber>();

    return jsonResponse({ success: true, barbers: results }, 200, context.request);
  } catch (err) {
    console.error('Admin barbers list error:', err);
    return jsonError('Failed to load barbers.', 500, context.request);
  }
};

// POST — add a new barber
export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: { id?: string; name?: string; role?: string };
  try {
    body = await context.request.json();
  } catch {
    return jsonError('Invalid request.', 400, context.request);
  }

  const { id, name, role } = body;

  if (!id || !name) {
    return jsonError('ID and name are required.', 400, context.request);
  }

  const cleanId = id.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '').slice(0, 50);
  const cleanName = name.trim().slice(0, 100);
  const cleanRole = (role || 'Barber').trim().slice(0, 100);

  // Validate name/role content (no HTML)
  if (!/^[a-zA-Z\s\-'.]+$/.test(cleanName)) {
    return jsonError('Name contains invalid characters.', 400, context.request);
  }
  if (!/^[a-zA-Z\s\-'.]+$/.test(cleanRole)) {
    return jsonError('Role contains invalid characters.', 400, context.request);
  }

  try {
    const existing = await context.env.DB.prepare(
      'SELECT id FROM barbers WHERE id = ?'
    ).bind(cleanId).first();

    if (existing) {
      return jsonError('A barber with this ID already exists.', 409, context.request);
    }

    const maxOrder = await context.env.DB.prepare(
      'SELECT MAX(sort_order) as max_order FROM barbers'
    ).first<{ max_order: number | null }>();
    const nextOrder = (maxOrder?.max_order ?? 0) + 1;

    await context.env.DB.prepare(
      'INSERT INTO barbers (id, name, role, status, sort_order) VALUES (?, ?, ?, ?, ?)'
    ).bind(cleanId, cleanName, cleanRole, 'active', nextOrder).run();

    return jsonResponse({ success: true, barber: { id: cleanId, name: cleanName, role: cleanRole, status: 'active' } }, 201, context.request);
  } catch (err) {
    console.error('Add barber error:', err);
    return jsonError('Failed to add barber.', 500, context.request);
  }
};

// PUT — update barber status/name/role (single query)
export const onRequestPut: PagesFunction<Env> = async (context) => {
  let body: { id?: string; status?: string; name?: string; role?: string };
  try {
    body = await context.request.json();
  } catch {
    return jsonError('Invalid request.', 400, context.request);
  }

  const { id, status, name, role } = body;

  if (!id) {
    return jsonError('Barber ID is required.', 400, context.request);
  }

  try {
    const barber = await context.env.DB.prepare(
      'SELECT id FROM barbers WHERE id = ?'
    ).bind(id).first();

    if (!barber) {
      return jsonError('Barber not found.', 404, context.request);
    }

    // Build single UPDATE with all provided fields
    const updates: string[] = [];
    const values: string[] = [];

    if (status) {
      const validStatuses = ['active', 'away', 'holiday'];
      if (!validStatuses.includes(status)) {
        return jsonError('Invalid status. Use: active, away, holiday.', 400, context.request);
      }
      updates.push('status = ?');
      values.push(status);
    }

    if (name) {
      const cleanName = name.trim().slice(0, 100);
      if (!/^[a-zA-Z\s\-'.]+$/.test(cleanName)) {
        return jsonError('Name contains invalid characters.', 400, context.request);
      }
      updates.push('name = ?');
      values.push(cleanName);
    }

    if (role) {
      const cleanRole = role.trim().slice(0, 100);
      if (!/^[a-zA-Z\s\-'.]+$/.test(cleanRole)) {
        return jsonError('Role contains invalid characters.', 400, context.request);
      }
      updates.push('role = ?');
      values.push(cleanRole);
    }

    if (updates.length > 0) {
      await context.env.DB.prepare(
        `UPDATE barbers SET ${updates.join(', ')} WHERE id = ?`
      ).bind(...values, id).run();
    }

    return jsonResponse({ success: true, message: 'Barber updated.' }, 200, context.request);
  } catch (err) {
    console.error('Update barber error:', err);
    return jsonError('Failed to update barber.', 500, context.request);
  }
};

// DELETE — remove a barber (soft-delete: mark as 'deleted' to preserve booking history)
export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return jsonError('Barber ID is required.', 400, context.request);
  }

  try {
    const barber = await context.env.DB.prepare(
      'SELECT id FROM barbers WHERE id = ?'
    ).bind(id).first();

    if (!barber) {
      return jsonError('Barber not found.', 404, context.request);
    }

    // Check for future confirmed bookings
    const futureBookings = await context.env.DB.prepare(
      "SELECT COUNT(*) as count FROM bookings WHERE barber = ? AND date >= date('now') AND status = 'confirmed'"
    ).bind(id).first<{ count: number }>();

    if ((futureBookings?.count ?? 0) > 0) {
      return jsonError(`Cannot delete — ${futureBookings!.count} future booking(s) exist. Cancel them first or mark barber as away.`, 409, context.request);
    }

    await context.env.DB.prepare('DELETE FROM barbers WHERE id = ?').bind(id).run();

    return jsonResponse({ success: true, message: 'Barber removed.' }, 200, context.request);
  } catch (err) {
    console.error('Delete barber error:', err);
    return jsonError('Failed to delete barber.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'GET, POST, PUT, DELETE, OPTIONS') });
};
