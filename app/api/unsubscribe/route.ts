import { unsubscribeInHighLevel } from '@/lib/highLevel'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Unsubscribe → HighLevel Do Not Disturb (Spam Act 2003: unsubscribe requests
// must be honoured within 5 business days; this makes it immediate).

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_REQUESTS = 5
const buckets = new Map<string, { count: number; resetsAt: number }>()

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true
  const host = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ?? req.headers.get('host')
  try {
    return !!host && new URL(origin).host.toLowerCase() === host.toLowerCase()
  } catch {
    return false
  }
}

function isRateLimited(req: Request): boolean {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (!bucket || bucket.resetsAt <= now) {
    buckets.set(ip, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  bucket.count += 1
  return bucket.count > RATE_LIMIT_REQUESTS
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ error: 'Forbidden' }, 403)
  if (isRateLimited(req)) return json({ error: 'Too many requests' }, 429)

  let body: { email?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }
  if (typeof body.email !== 'string') return json({ error: 'A valid email is required' }, 400)

  try {
    await unsubscribeInHighLevel(body.email)
  } catch (error) {
    // Never log the email or vendor response.
    console.error('HighLevel unsubscribe failed:', error instanceof Error ? error.message : 'Unknown error')
    return json({ error: 'Unsubscribe could not be recorded' }, 503)
  }
  return json({ ok: true }, 200)
}
