import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'
import { isTemplateKey, renderEmail, templateKeys } from '@/lib/email/render'
import type { EmailData } from '@/lib/email/templates'

// Single entry point for every journey email.
//
// Callers (portal, Stripe webhooks, scheduled abandonment jobs) POST a template
// key plus whatever data that template needs. Keeping one route means the shell,
// compliance footer and service/marketing split can never drift between senders.
//
// Server-to-server only, never called from a browser.
//
// Prefers EMAIL_API_SECRET, falling back to BGT_INTERNAL_SECRET. They are kept
// separate deliberately: BGT_INTERNAL_SECRET is shared with the portal's
// blood-sync job, so rotating it to hand someone email access would break that
// integration. Set EMAIL_API_SECRET to give this endpoint its own credential.

function authorised(req: Request): boolean {
  const expected = process.env.EMAIL_API_SECRET || process.env.BGT_INTERNAL_SECRET
  if (!expected) return false
  const provided = req.headers.get('x-apex-internal-secret')
  if (!provided || provided.length !== expected.length) return false
  // Constant-time compare so the endpoint can't be probed byte-by-byte.
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  return diff === 0
}

export async function POST(req: Request) {
  if (!authorised(req)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  let payload: { template?: string; to?: string; data?: EmailData; dryRun?: boolean }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { template, to, data = {}, dryRun } = payload
  if (!template || !isTemplateKey(template)) {
    return NextResponse.json({ error: 'Unknown template', available: templateKeys() }, { status: 400 })
  }
  if (!to) return NextResponse.json({ error: 'Missing recipient' }, { status: 400 })

  const email = renderEmail(template, data)

  // dryRun lets callers verify subject/category wiring without sending mail.
  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, subject: email.subject, category: email.category })
  }

  try {
    await sendEmail({ to, subject: email.subject, html: email.html, text: email.text })
  } catch (error) {
    console.error(`journey-email: ${template} send failed:`, error)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, template, subject: email.subject })
}

/** Discovery: lists every template so integrators don't have to guess keys. */
export async function GET(req: Request) {
  if (!authorised(req)) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  return NextResponse.json({ templates: templateKeys() })
}
