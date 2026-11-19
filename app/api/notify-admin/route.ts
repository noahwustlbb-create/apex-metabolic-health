import { sendEmail } from '@/lib/mailer'
import { NextResponse } from 'next/server'
import { CONFIRMATION_FOR_SOURCE, clientIp, greetingName, makeLimiter, normEmail, originAllowed, validEmail } from '@/lib/formGuard'
import { FORM_CONFIG, buildConfirmationEmail } from '@/lib/confirmationEmail'

// Safety pack item 4 (19 Nov 2026): our own pages only (fixed origin list),
// rate limited on the platform client IP, body capped. For a discovery call
// request the server also sends the "we got your request" email itself, to
// the lead's own address only, at most once per 10 minutes and 3 times a day
// per address. Nothing a caller sends can change who gets it or what it says
// beyond an escaped first name.

export const runtime = 'nodejs'
const MAX_BODY_BYTES = 16_384
const perIp = makeLimiter(10, 60_000)
const confirmRecent = makeLimiter(1, 10 * 60_000)
const confirmDaily = makeLimiter(3, 24 * 60 * 60_000)

const ADMIN_EMAIL = 'admin@apexmetabolichealth.com.au'

function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function field(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/[\r\n]+/g, ' ').trim().slice(0, max) : ''
}

export async function POST(req: Request) {
  if (!originAllowed(req.headers.get('origin'))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  if (perIp(clientIp(req.headers))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  let body: Record<string, unknown>
  try { body = await req.json() as Record<string, unknown> } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }
  // Privacy boundary: identity and routing fields only. Health questionnaire
  // answers must never be emailed from the public website.
  const name = field(body.name, 120)
  const email = field(body.email, 254)
  const phone = field(body.phone, 40)
  const source = field(body.source, 75)
  const program = field(body.program, 120)
  const state = field(body.state, 10)
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : ''

  if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })


  const rows = [
    ['Name',           name            ],
    ['Email',          email           ],
    ['Phone',          phone           ],
    ['Source',         source          ],
    ['Program',        program         ],
    ['State',          state           ],
    ['Message',        message         ],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr>
      <td style="padding:6px 12px 6px 0;font-size:12px;color:#8899aa;white-space:nowrap;vertical-align:top;">${k}</td>
      <td style="padding:6px 0;font-size:12px;color:#f0f4f8;word-break:break-word;">${esc(v)}</td>
    </tr>`)
    .join('')

  const sourceLabel = source === 'quiz' ? 'Health Assessment' : source === 'book' ? 'Book page' : source ?? 'Website'

  const sendArgs = {
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `New lead: ${name || email} (${sourceLabel})`.replace(/[\r\n]+/g, ' '),
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#07090f;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#07090f;padding:40px 20px;">
  <tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

      <tr>
        <td style="padding-bottom:20px;">
          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4890f7;">Apex Metabolic Health</p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#f0f4f8;">New lead: ${esc(sourceLabel)}</h1>
        </td>
      </tr>

      <tr>
        <td style="background:#0d1117;border:1px solid rgba(72,144,247,0.15);border-radius:12px;padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding-top:20px;">
          <a href="mailto:${encodeURIComponent(email)}"
             style="display:inline-block;padding:10px 24px;background:#4890f7;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
            Reply to ${esc(name || email)} &rarr;
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding-top:24px;text-align:center;">
          <p style="margin:0;font-size:10px;color:#2a3a4a;">Apex Metabolic Health &middot; Imperial Equity Investments Pty Ltd</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`,
  }

  try {
    await sendEmail(sendArgs)
  } catch (error) {
    console.error('notify-admin mailer error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json({ error: 'send failed' }, { status: 500 })
  }

  // The confirmation, if this form gets one: fixed template, to the lead's own email only.
  const formType = CONFIRMATION_FOR_SOURCE[source]
  const to = normEmail(email)
  if (formType && validEmail(to) && !confirmRecent(to) && !confirmDaily(to)) {
    try {
      await sendEmail({ to, subject: FORM_CONFIG[formType].subject, html: buildConfirmationEmail(greetingName(name), formType) })
    } catch (error) {
      console.error('notify-admin confirmation failed:', error instanceof Error ? error.message : 'unknown')
    }
  }

  return NextResponse.json({ ok: true })
}
