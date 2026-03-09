// Shared types and utilities for all API endpoints

export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  RESEND_API_KEY: string;
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_FROM_NUMBER: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  status: string;
  sort_order: number;
  created_at: string;
}

export interface Booking {
  id: number;
  ref: string;
  barber: string;
  barber_name?: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: string;
  cancel_token: string;
  created_at: string;
}

export interface AdminSession {
  token: string;
  created_at: string;
  expires_at: string;
}

export const ALLOWED_ORIGINS = [
  'https://chilterncomputers.net',
  'https://www.chilterncomputers.net',
];

export function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';
  // Allow production origins and Cloudflare Pages preview deployments
  if (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.chiltern-computers.pages.dev')) {
    return origin;
  }
  return ALLOWED_ORIGINS[0];
}

export function corsHeaders(request: Request): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': getCorsOrigin(request),
    'Vary': 'Origin',
  };
}

export function corsOptionsHeaders(request: Request, methods: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': getCorsOrigin(request),
    'Access-Control-Allow-Methods': methods,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
}

export function generateToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  // Use rejection sampling to avoid modulo bias
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (const b of arr) {
    // 256 % 62 = 8, so reject values >= 248 to avoid bias
    if (b < 248) {
      result += chars[b % chars.length];
    } else {
      // Retry with fresh crypto random byte instead of Math.random
      const extra = new Uint8Array(1);
      crypto.getRandomValues(extra);
      result += chars[extra[0] % chars.length];
    }
  }
  return result;
}

export function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

export function jsonResponse(data: unknown, status: number, request: Request, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), ...extraHeaders },
  });
}

export function jsonError(error: string, status: number, request: Request): Response {
  return jsonResponse({ success: false, error }, status, request);
}

export const SERVICES = [
  { name: 'Skin Fade', price: 18, duration: 30 },
  { name: 'Scissor Cut', price: 15, duration: 30 },
  { name: 'Beard Trim', price: 10, duration: 15 },
  { name: 'Hot Towel Shave', price: 20, duration: 30 },
  { name: 'Fade & Beard', price: 25, duration: 45 },
  { name: 'Full Service', price: 30, duration: 60 },
];

export const VALID_SERVICE_NAMES = SERVICES.map(s => s.name);

export const HOURS: Record<number, { open: string; close: string } | null> = {
  0: null, // Sunday closed
  1: { open: '09:00', close: '18:00' },
  2: { open: '09:00', close: '18:00' },
  3: { open: '09:00', close: '18:00' },
  4: { open: '09:00', close: '18:00' },
  5: { open: '09:00', close: '18:00' },
  6: { open: '08:30', close: '16:30' },
};

export function generateSlots(dayOfWeek: number): string[] {
  const hours = HOURS[dayOfWeek];
  if (!hours) return [];
  const slots: string[] = [];
  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);
  let h = openH;
  let m = openM;
  while (h < closeH || (h === closeH && m < closeM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += 30;
    if (m >= 60) { h++; m = 0; }
  }
  return slots;
}

/** Check if a time string is a valid business-hours slot */
export function isValidSlotTime(time: string, dayOfWeek: number): boolean {
  return generateSlots(dayOfWeek).includes(time);
}

/** Check if a date string is today or in the future (UTC) */
export function isDateTodayOrFuture(dateStr: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateStr >= today;
}
