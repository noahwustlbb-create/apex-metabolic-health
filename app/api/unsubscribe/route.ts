import { unsubscribeInHighLevel } from '@/lib/highLevel'
import { clientIp, makeLimiter, normEmail, originAllowed, validEmail } from '@/lib/formGuard'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Unsubscribe → HighLevel Do Not Disturb (Spam Act 2003: unsubscribe requests
// must be honoured within 5 business days; this makes it immediate).
//
// Same guards as the other public form routes (lib/formGuard, 19 Nov 2026):
// Origin must be one of our fixed origins (never compared with the request's
// own Host header, and a missing Origin is refused), and the rate limit keys
// on the platform-set client IP, never the first forwarded hop a
// client can write. Only /unsubscribe on our own site posts here.

const perIp = makeLimiter(5, 60_000)
const MAX_BODY_BYTES = 2_048

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  if (!originAllowed(req.headers.get('origin'))) return json({ error: 'Forbidden' }, 403)
  if (perIp(clientIp(req.headers))) return json({ error: 'Too many requests' }, 429)

  const raw = await req.text().catch(() => '')
  if (raw.length > MAX_BODY_BYTES) return json({ error: 'Request too large' }, 413)

  let body: { email?: unknown }
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }
  const email = normEmail(body?.email)
  if (!validEmail(email)) return json({ error: 'A valid email is required' }, 400)

  try {
    await unsubscribeInHighLevel(email)
  } catch (error) {
    // Never log the email or vendor response.
    console.error('HighLevel unsubscribe failed:', error instanceof Error ? error.message : 'Unknown error')
    return json({ error: 'Unsubscribe could not be recorded' }, 503)
  }
  return json({ ok: true }, 200)
}
