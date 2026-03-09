import { type Env, type Barber, corsHeaders, corsOptionsHeaders, jsonResponse, jsonError, generateToken, escapeHtml, VALID_SERVICE_NAMES, isValidSlotTime, isDateTodayOrFuture } from './_shared';

const SITE_URL = 'https://chilterncomputers.net';

function buildConfirmationEmail(
  name: string,
  barberName: string,
  service: string,
  dateStr: string,
  time: string,
  cancelUrl: string
): string {
  const eName = escapeHtml(name);
  const eBarber = escapeHtml(barberName);
  const eService = escapeHtml(service);
  const eDate = escapeHtml(dateStr);
  const eTime = escapeHtml(time);
  const eCancelUrl = escapeHtml(cancelUrl);

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="text-align:center;padding-bottom:32px;">
          <span style="font-size:22px;font-weight:800;letter-spacing:3px;color:#f8fafc;">BLADES <span style="color:#c8a96e;">&amp;</span> FADES</span>
          <br/><span style="font-size:10px;letter-spacing:4px;color:#c8a96e;font-weight:700;">PREMIUM BARBERING</span>
        </td></tr>
        <tr><td style="background:#1e293b;border:1px solid rgba(200,169,110,0.15);border-radius:12px;padding:36px 32px;">
          <p style="color:#c8a96e;font-size:12px;font-weight:700;letter-spacing:3px;margin:0 0 8px;">BOOKING CONFIRMED</p>
          <h1 style="color:#f8fafc;font-size:24px;font-weight:700;margin:0 0 24px;">You're all set, ${eName}!</h1>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:rgba(248,250,252,0.55);font-size:14px;">Barber</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:#f8fafc;font-size:14px;font-weight:600;text-align:right;">${eBarber}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:rgba(248,250,252,0.55);font-size:14px;">Service</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:#f8fafc;font-size:14px;font-weight:600;text-align:right;">${eService}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:rgba(248,250,252,0.55);font-size:14px;">Date</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(200,169,110,0.1);color:#f8fafc;font-size:14px;font-weight:600;text-align:right;">${eDate}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:rgba(248,250,252,0.55);font-size:14px;">Time</td>
              <td style="padding:12px 0;color:#c8a96e;font-size:16px;font-weight:800;text-align:right;">${eTime}</td>
            </tr>
          </table>
          <div style="background:rgba(200,169,110,0.06);border:1px solid rgba(200,169,110,0.12);border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="color:#c8a96e;font-size:11px;font-weight:700;letter-spacing:2px;margin:0 0 6px;">FIND US</p>
            <p style="color:rgba(248,250,252,0.7);font-size:14px;margin:0;line-height:1.6;">42 High Street, Romford, Essex, RM1 1HR</p>
          </div>
          <div style="text-align:center;margin-bottom:24px;">
            <a href="${eCancelUrl}" style="display:inline-block;padding:12px 32px;background:transparent;border:1px solid rgba(248,250,252,0.2);border-radius:6px;color:rgba(248,250,252,0.6);font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.5px;">
              Need to cancel? Click here
            </a>
          </div>
          <p style="color:rgba(248,250,252,0.4);font-size:12px;line-height:1.7;margin:0;text-align:center;">
            Or call us on <a href="tel:07845123456" style="color:#c8a96e;text-decoration:none;">07845 123 456</a>
          </p>
        </td></tr>
        <tr><td style="text-align:center;padding-top:24px;">
          <p style="color:rgba(248,250,252,0.3);font-size:11px;margin:0;">&copy; 2026 Blades &amp; Fades. All rights reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  let body: Record<string, string>;
  try {
    body = await context.request.json();
  } catch {
    return jsonError('Invalid JSON body.', 400, context.request);
  }

  const { name, phone, email, service, date, time, barber } = body;

  if (!name || !phone || !email || !service || !date || !time || !barber) {
    return jsonError('All fields are required: name, phone, email, service, date, time, barber.', 400, context.request);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return jsonError('Invalid date format.', 400, context.request);
  }
  if (!/^\d{2}:\d{2}$/.test(time)) {
    return jsonError('Invalid time format.', 400, context.request);
  }

  // Validate date is today or future
  if (!isDateTodayOrFuture(date)) {
    return jsonError('Cannot book in the past.', 400, context.request);
  }

  // Validate time is a real slot
  const dateObj = new Date(date + 'T12:00:00Z');
  if (!isValidSlotTime(time, dateObj.getUTCDay())) {
    return jsonError('Invalid time slot.', 400, context.request);
  }

  // Validate service against known list
  if (!VALID_SERVICE_NAMES.includes(service)) {
    return jsonError('Invalid service.', 400, context.request);
  }

  const cleanName = name.trim().slice(0, 100);
  if (!/^[a-zA-Z\s\-']+$/.test(cleanName)) {
    return jsonError('Invalid name.', 400, context.request);
  }

  const cleanPhone = phone.trim().slice(0, 20);
  if (!/^[\d\s\+\-]+$/.test(cleanPhone)) {
    return jsonError('Invalid phone number.', 400, context.request);
  }

  const cleanEmail = email.trim().toLowerCase().slice(0, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return jsonError('Invalid email address.', 400, context.request);
  }

  try {
    // Resolve actual barber for "any" selection
    let assignedBarber = barber;
    if (barber === 'any') {
      const { results: activeBarbers } = await context.env.DB.prepare(
        "SELECT id FROM barbers WHERE status = 'active' ORDER BY sort_order"
      ).all<Pick<Barber, 'id'>>();

      let found = false;
      for (const b of activeBarbers) {
        const existing = await context.env.DB.prepare(
          "SELECT id FROM bookings WHERE barber = ? AND date = ? AND time = ? AND status = 'confirmed'"
        ).bind(b.id, date, time).first();

        if (!existing) {
          assignedBarber = b.id;
          found = true;
          break;
        }
      }

      if (!found) {
        return jsonError('No barbers available at this time. Please choose another slot.', 409, context.request);
      }
    } else {
      // Validate barber exists
      const barberExists = await context.env.DB.prepare(
        "SELECT id FROM barbers WHERE id = ?"
      ).bind(assignedBarber).first();
      if (!barberExists) {
        return jsonError('Invalid barber.', 400, context.request);
      }

      const existing = await context.env.DB.prepare(
        "SELECT id FROM bookings WHERE barber = ? AND date = ? AND time = ? AND status = 'confirmed'"
      ).bind(assignedBarber, date, time).first();

      if (existing) {
        return jsonError('This time slot has just been booked. Please choose another.', 409, context.request);
      }
    }

    // Get barber display name from DB
    const barberRow = await context.env.DB.prepare(
      "SELECT name FROM barbers WHERE id = ?"
    ).bind(assignedBarber).first<Pick<Barber, 'name'>>();
    const barberName = barberRow?.name ?? assignedBarber;

    // Generate unique cancel token
    const cancelToken = generateToken();

    // Generate BF### ref with retry for uniqueness
    let ref = '';
    for (let attempt = 0; attempt < 3; attempt++) {
      const maxRef = await context.env.DB.prepare(
        "SELECT MAX(CAST(SUBSTR(ref, 3) AS INTEGER)) as max_num FROM bookings WHERE ref LIKE 'BF%'"
      ).first<{ max_num: number | null }>();
      const nextNum = (maxRef?.max_num ?? 0) + 1 + attempt;
      ref = 'BF' + String(nextNum).padStart(3, '0');

      // Check ref doesn't already exist (handles race condition)
      const refExists = await context.env.DB.prepare(
        "SELECT id FROM bookings WHERE ref = ?"
      ).bind(ref).first();
      if (!refExists) break;
    }

    // INSERT — the unique index on (barber, date, time) WHERE status='confirmed'
    // will prevent double-bookings at the DB level
    try {
      await context.env.DB.prepare(
        'INSERT INTO bookings (barber, name, phone, email, service, date, time, cancel_token, ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(assignedBarber, cleanName, cleanPhone, cleanEmail, service, date, time, cancelToken, ref).run();
    } catch (insertErr: unknown) {
      const errMsg = insertErr instanceof Error ? insertErr.message : String(insertErr);
      if (errMsg.includes('UNIQUE constraint')) {
        return jsonError('This time slot has just been booked. Please choose another.', 409, context.request);
      }
      throw insertErr;
    }

    // Format date for email
    const formattedDate = dateObj.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const cancelUrl = `${SITE_URL}/cancel?token=${cancelToken}`;

    // Send confirmation email via Resend (non-blocking)
    const emailPromise = context.env.RESEND_API_KEY
      ? fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Blades & Fades <bookings@bladesandfades.co.uk>',
            to: [cleanEmail],
            subject: `Booking Confirmed — ${service} with ${barberName} on ${formattedDate}`,
            html: buildConfirmationEmail(cleanName, barberName, service, formattedDate, time, cancelUrl),
          }),
        }).catch((err) => console.error('Email send failed:', err))
      : Promise.resolve();

    // Send SMS confirmation via Twilio (non-blocking)
    const smsPromise = context.env.TWILIO_ACCOUNT_SID
      ? fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${context.env.TWILIO_ACCOUNT_SID}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${context.env.TWILIO_ACCOUNT_SID}:${context.env.TWILIO_AUTH_TOKEN}`),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              From: context.env.TWILIO_FROM_NUMBER,
              To: cleanPhone.startsWith('+') ? cleanPhone : `+44${cleanPhone.replace(/^0/, '')}`,
              Body: `Blades & Fades — Booking Confirmed\n\n${service} with ${barberName}\n${formattedDate} at ${time}\n42 High Street, Romford, RM1 1HR\n\nNeed to cancel?\n${cancelUrl}`,
            }).toString(),
          }
        ).catch((err) => console.error('SMS send failed:', err))
      : Promise.resolve();

    await Promise.allSettled([emailPromise, smsPromise]);

    return jsonResponse({
      success: true,
      booking: { ref, barber: assignedBarber, barberName, name: cleanName, service, date, time },
      message: `Booking ${ref} confirmed for ${cleanName} with ${barberName} on ${date} at ${time}. Confirmation sent.`,
    }, 201, context.request);
  } catch (err) {
    console.error('Booking error:', err);
    return jsonError('Failed to create booking. Please try again.', 500, context.request);
  }
};

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, { status: 204, headers: corsOptionsHeaders(context.request, 'POST, OPTIONS') });
};
