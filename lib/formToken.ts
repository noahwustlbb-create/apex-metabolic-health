// Confirmation emails go only to the address that was just submitted
// (safety pack item 4, 19 Nov 2026; security audit P1-4).
//
// When a lead is accepted (/api/notify-admin or /api/ghl-lead), the server
// returns a short-lived token signed over that email. /api/send-confirmation
// sends only to an email that comes with a valid token for it, so the route
// can no longer be used to mail anyone the caller likes.
//
// Node built-ins only, so tests/form-token.test.mjs can import it directly.

import { createHmac, timingSafeEqual } from 'node:crypto'

export const FORM_TOKEN_TTL_MS = 30 * 60_000

type Env = Record<string, string | undefined>

/** The signing key. FORM_TOKEN_SECRET if set, else derived from an existing server secret. Null means no confirmation emails (fail closed). */
export function formTokenKey(env: Env = process.env): Buffer | null {
  const base = env.FORM_TOKEN_SECRET || env.EMAIL_API_SECRET || env.STRIPE_WEBHOOK_SECRET
  if (!base) return null
  return createHmac('sha256', base).update('apex-confirm-form-token-v1').digest()
}

export const normEmail = (e: unknown) => (typeof e === 'string' ? e.trim().toLowerCase() : '')

function sign(key: Buffer, email: string, exp: number): string {
  return createHmac('sha256', key).update(`${normEmail(email)}|${exp}`).digest('base64url')
}

export function issueFormToken(email: string, key: Buffer | null, now = Date.now()): string | null {
  if (!key || !normEmail(email)) return null
  const exp = now + FORM_TOKEN_TTL_MS
  return `${exp}.${sign(key, email, exp)}`
}

export function verifyFormToken(token: unknown, email: unknown, key: Buffer | null, now = Date.now()): boolean {
  if (!key || typeof token !== 'string' || !normEmail(email)) return false
  const [expRaw, sig] = token.split('.')
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || exp < now || exp > now + FORM_TOKEN_TTL_MS + 60_000 || !sig) return false
  const want = Buffer.from(sign(key, String(email), exp))
  const got = Buffer.from(sig)
  return want.length === got.length && timingSafeEqual(want, got)
}

/** Escape a value for HTML email. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** A first name fit for a greeting: one line, letters and common name marks only, 40 characters at most. */
export function greetingName(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[\r\n\t]+/g, ' ').replace(/[^\p{L}\p{M}' .-]/gu, '').trim().slice(0, 40)
}

/** Fixed-window limiter. Serverless instances are short-lived, so this is a speed bump, paired with the token. */
export function makeLimiter(max: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetsAt: number }>()
  return (key: string, now = Date.now()): boolean => {
    if (buckets.size > 2000) for (const [k, b] of buckets) if (b.resetsAt <= now) buckets.delete(k)
    const b = buckets.get(key)
    if (!b || b.resetsAt <= now) { buckets.set(key, { count: 1, resetsAt: now + windowMs }); return false }
    b.count += 1
    return b.count > max
  }
}
