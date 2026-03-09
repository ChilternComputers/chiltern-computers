import { type Env, type Barber, corsOptionsHeaders, jsonResponse, jsonError } from './_shared';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT id, name, role, status FROM barbers WHERE status = 'active' ORDER BY sort_order"
    ).all<Barber>();

    return jsonResponse({ success: true, barbers: results }, 200, context.request, { 'Cache-Control': 'no-cache' });
  } catch (err) {
    console.error('Barbers list error:', err);
    return jsonError('Failed to load barbers.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'GET, OPTIONS') });
};
