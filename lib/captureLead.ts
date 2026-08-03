// Lead capture with two independent delivery channels.
//
// Several forms previously posted to /api/notify-admin and nowhere else. When
// the Gmail app password was rejected, that route began returning 500 and every
// one of those leads was lost outright — no inbox copy, no database row.
//
// captureLead fans the submission out to both the transactional mailer and
// Web3Forms. They share no infrastructure, so a lead now survives the loss of
// either one. It rejects only if BOTH channels fail, which keeps the caller's
// error state meaningful rather than cosmetic.
//
// Web3Forms must be called from the browser: on the free plan it rejects
// server-side requests, so this helper is client-only by design.

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

export interface LeadPayload {
  /** Which form/entry point produced this lead, e.g. 'get-started-intake'. */
  source: string
  email: string
  name?: string
  phone?: string
  program?: string
  message?: string
  [key: string]: unknown
}

async function viaNotifyAdmin(lead: LeadPayload): Promise<void> {
  const res = await fetch('/api/notify-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
  if (!res.ok) throw new Error(`notify-admin ${res.status}`)
}

async function viaWeb3Forms(lead: LeadPayload): Promise<void> {
  const { source, name, email, ...rest } = lead
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `New lead: ${name || email} (${source})`,
      from_name: 'Apex Metabolic Health',
      source,
      name,
      email,
      ...rest,
      submittedAt: new Date().toISOString(),
    }),
  })
  // Web3Forms answers 200 with {success:false} for rejected submissions, so the
  // status code alone is not enough to call this delivered.
  const json = await res.json().catch(() => null)
  if (!res.ok || !json?.success) throw new Error(`web3forms ${res.status}`)
}

/**
 * Submit an arbitrary form payload through both channels.
 *
 * Use this instead of calling Web3Forms directly. Ad blockers and privacy
 * extensions routinely block requests to third-party form endpoints — a form
 * that posts only to Web3Forms shows those visitors "Something went wrong" and
 * loses the lead entirely. /api/notify-admin is first-party, so it survives.
 *
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
  const results = await Promise.allSettled([viaNotifyAdmin(lead), viaWeb3Forms(lead)])

  const delivered = results.some(r => r.status === 'fulfilled')
  const failures = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => String(r.reason))

  if (failures.length) {
    console.error(`captureLead: ${failures.length}/${results.length} channel(s) failed:`, failures)
  }
  if (!delivered) throw new Error(`All lead channels failed: ${failures.join('; ')}`)
}
