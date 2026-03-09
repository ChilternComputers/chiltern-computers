import { type Env, corsOptionsHeaders, jsonResponse, jsonError, generateToken } from '../_shared';

// Simple in-memory rate limiter (per-isolate, resets on cold start)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';

  if (isRateLimited(ip)) {
    return jsonError('Too many login attempts. Try again in a minute.', 429, context.request);
  }

  let body: { password?: string };
  try {
    body = await context.request.json();
  } catch {
    return jsonError('Invalid request.', 400, context.request);
  }

  const { password } = body;

  if (!password) {
    return jsonError('Invalid password.', 401, context.request);
  }

  // Timing-safe comparison
  const expected = context.env.ADMIN_PASSWORD || '';
  const encoder = new TextEncoder();
  const a = encoder.encode(password);
  const b = encoder.encode(expected);

  if (a.byteLength !== b.byteLength) {
    // Compare expected against itself to avoid timing leak on length
    crypto.subtle.timingSafeEqual(b, b);
    return jsonError('Invalid password.', 401, context.request);
  }

  if (!crypto.subtle.timingSafeEqual(a, b)) {
    return jsonError('Invalid password.', 401, context.request);
  }

  try {
    // Generate session token (expires in 2 hours)
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    await context.env.DB.prepare(
      'INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)'
    ).bind(token, expiresAt).run();

    // Clean up expired sessions
    await context.env.DB.prepare(
      "DELETE FROM admin_sessions WHERE expires_at < datetime('now')"
    ).run();

    return jsonResponse({ success: true, token }, 200, context.request);
  } catch (err) {
    console.error('Login error:', err);
    return jsonError('Login failed.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'POST, OPTIONS') });
};
