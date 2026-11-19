// Guards for the public form routes (safety pack item 4, 19 Nov 2026).
//
// - Origin is compared with a fixed list of our own origins, never with the
//   request's own Host header. Previews also accept their own Vercel URL.
// - The client IP for rate limits is the one the platform sets (x-real-ip on
//   Vercel), or the rightmost x-forwarded-for hop, never the first entry a
//   client can write.
// - Limiters are per instance (serverless), so they are a speed bump; the
//   confirmation email itself is a fixed template sent only to the lead's own
//   address, with a per-recipient daily cap.
//
// Node built-ins only, so tests/form-guard.test.mjs can import it directly.

type Env = Record<string, string | undefined>

export const CANONICAL_ORIGINS = ['https://www.apexmetabolichealth.com.au', 'https://apexmetabolichealth.com.au']

export function allowedOrigins(env: Env = process.env): string[] {
  const out = [...CANONICAL_ORIGINS]
  if (env.VERCEL_ENV === 'preview') for (const h of [env.VERCEL_URL, env.VERCEL_BRANCH_URL]) if (h) out.push(`https://${h}`)
  if (env.NODE_ENV === 'development') out.push('http://localhost:3000')
  return out
}

/** True only for a request whose Origin is one of ours. A missing Origin is refused. */
export function originAllowed(origin: string | null | undefined, env: Env = process.env): boolean {
  if (!origin) return false
  return allowedOrigins(env).includes(origin.trim().toLowerCase().replace(/\/$/, ''))
}

/** The platform-set client IP: x-real-ip, else the rightmost x-forwarded-for hop. */
export function clientIp(headers: { get(name: string): string | null }): string {
  const real = headers.get('x-real-ip')?.trim()
  if (real) return real
  const hops = (headers.get('x-forwarded-for') ?? '').split(',').map(s => s.trim()).filter(Boolean)
  return hops[hops.length - 1] || 'unknown'
}

export const normEmail = (e: unknown) => (typeof e === 'string' ? e.trim().toLowerCase() : '')
export const validEmail = (e: string) => e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

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
  return value.replace(/[\r\n\t]+/g, ' ').replace(/[^\p{L}\p{M}' .-]/gu, '').trim().split(/\s+/)[0]?.slice(0, 40) ?? ''
}

/** Fixed-window limiter: true when the key is over `max` in the window. */
export function makeLimiter(max: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetsAt: number }>()
  return (key: string, now = Date.now()): boolean => {
    if (buckets.size > 5000) for (const [k, b] of buckets) if (b.resetsAt <= now) buckets.delete(k)
    const b = buckets.get(key)
    if (!b || b.resetsAt <= now) { buckets.set(key, { count: 1, resetsAt: now + windowMs }); return false }
    b.count += 1
    return b.count > max
  }
}

/** Lead sources that get a confirmation email, and which template. Only the discovery call form today. */
export const CONFIRMATION_FOR_SOURCE: Record<string, 'discovery'> = { 'discovery-call-request': 'discovery' }
