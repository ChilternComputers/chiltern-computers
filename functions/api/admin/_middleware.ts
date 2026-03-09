import { type Env, corsHeaders, getCorsOrigin } from '../_shared';

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // Skip auth for login endpoint and OPTIONS preflight
  if (url.pathname === '/api/admin/login' || context.request.method === 'OPTIONS') {
    return context.next();
  }

  const headers = corsHeaders(context.request);

  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized.' }), {
      status: 401,
      headers,
    });
  }

  const token = authHeader.slice(7);

  try {
    const session = await context.env.DB.prepare(
      "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
    ).bind(token).first();

    if (!session) {
      return new Response(JSON.stringify({ success: false, error: 'Session expired. Please log in again.' }), {
        status: 401,
        headers,
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Authentication failed.' }), {
      status: 500,
      headers,
    });
  }

  return context.next();
};
