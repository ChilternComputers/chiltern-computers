interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);

  // Skip auth for login endpoint and OPTIONS preflight
  if (url.pathname === '/api/admin/login' || context.request.method === 'OPTIONS') {
    return context.next();
  }

  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const token = authHeader.slice(7);

  const session = await context.env.DB.prepare(
    "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
  ).bind(token).first();

  if (!session) {
    return new Response(JSON.stringify({ error: 'Session expired. Please log in again.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  return context.next();
};
