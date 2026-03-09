interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => chars[b % chars.length]).join('');
}

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

  const { password } = body;

  if (!password || password !== context.env.ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'Invalid password.' }), { status: 401, headers });
  }

  // Generate session token (expires in 24 hours)
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  await context.env.DB.prepare(
    'INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)'
  ).bind(token, expiresAt).run();

  // Clean up expired sessions
  await context.env.DB.prepare(
    "DELETE FROM admin_sessions WHERE expires_at < datetime('now')"
  ).run();

  return new Response(JSON.stringify({ success: true, token }), { status: 200, headers });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
