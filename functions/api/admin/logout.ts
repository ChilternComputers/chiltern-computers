import { type Env, corsOptionsHeaders, jsonResponse, jsonError } from '../_shared';

// POST — invalidate session server-side
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ success: true }, 200, context.request);
  }

  const token = authHeader.slice(7);

  try {
    await context.env.DB.prepare(
      'DELETE FROM admin_sessions WHERE token = ?'
    ).bind(token).run();
  } catch (err) {
    console.error('Logout error:', err);
  }

  return jsonResponse({ success: true }, 200, context.request);
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'POST, OPTIONS') });
};
