// Lead capture with two independent first-party delivery channels:
// the admin notification email (/api/notify-admin) and HighLevel (/api/ghl-lead).
// A lead survives the loss of either channel.
//
// Privacy boundary: only identity and routing fields ever leave the browser.
// Clinical questionnaire answers are collected in the patient portal, never
// here, and third-party form services must not be used for any submission.

import { track } from '@/lib/analytics'

export interface LeadPayload {
  /** Which form/entry point produced this lead, e.g. 'get-started-intake'. */
  source: string
  email: string
  name?: string
  phone?: string
  program?: string
  state?: string
  message?: string
  [key: string]: unknown
}

/** Strip everything except identity/routing fields. Never forward questionnaire answers. */
function allowlisted(lead: LeadPayload) {
  const { name, email, phone, source, program, state, message } = lead
  return { name, email, phone, source, program, state, message }
}

async function viaNotifyAdmin(lead: LeadPayload): Promise<void> {
  const res = await fetch('/api/notify-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(allowlisted(lead)),
  })
  if (!res.ok) throw new Error(`notify-admin ${res.status}`)
}

async function viaHighLevel(lead: LeadPayload): Promise<void> {
  // HighLevel is a marketing CRM, not the clinical patient record. Keep this
  // allowlist explicit so questionnaire answers can never cross this boundary.
  const { name, email, phone, source, program } = lead
  const res = await fetch('/api/ghl-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, source, program }),
  })
  if (!res.ok) throw new Error(`ghl-lead ${res.status}`)
}

/**
 * Submit a form payload through both first-party channels.
 * Only allowlisted identity/routing fields are forwarded.
 * Resolves if either channel delivered; rejects only if both failed.
 */
export async function submitForm(
  payload: Record<string, unknown> & { email: string; source: string },
): Promise<void> {
  return captureLead(payload as LeadPayload)
}

/**
 * Deliver a lead through every available channel.
 * Resolves if at least one channel succeeded; rejects only if all of them failed.
 */
export async function captureLead(lead: LeadPayload): Promise<void> {
  const results = await Promise.allSettled([
    viaNotifyAdmin(lead),
    viaHighLevel(lead),
  ])

  const delivered = results.some(r => r.status === 'fulfilled')
  const failures = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => String(r.reason))

  if (failures.length) {
    console.error(`captureLead: ${failures.length}/${results.length} channel(s) failed:`, failures)
  }
  if (!delivered) {
    track('lead_capture_failed', { source: lead.source })
    throw new Error(`All lead channels failed: ${failures.join('; ')}`)
  }
  // Routing context only: never the lead's identity fields.
  track('lead_captured', { source: lead.source })
}
