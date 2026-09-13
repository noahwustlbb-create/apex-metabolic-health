import {
  sanitizeMarketingLead,
  submitMarketingLeadToHighLevel,
} from '@/lib/highLevel'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 16_384
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_REQUESTS = 10

interface RateLimitBucket {
  count: number
  resetsAt: number
}

const rateLimitBuckets = new Map<string, RateLimitBucket>()

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true

  const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  const expectedHost = forwardedHost ?? req.headers.get('host')
  if (!expectedHost) return false

  try {
    return new URL(origin).host.toLowerCase() === expectedHost.toLowerCase()
  } catch {
    return false
  }
}

function isRateLimited(req: Request): boolean {
  const forwardedFor = req.headers.get('x-forwarded-for')
  const clientId = forwardedFor?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const current = rateLimitBuckets.get(clientId)

  if (!current || current.resetsAt <= now) {
    rateLimitBuckets.set(clientId, { count: 1, resetsAt: now + RATE_LIMIT_WINDOW_MS })
  } else {
    current.count += 1
    if (current.count > RATE_LIMIT_REQUESTS) return true
  }

  // Serverless instances are short-lived, but keep the fallback map bounded in
  // case a warm instance receives many unique clients.
  if (rateLimitBuckets.size > 1_000) {
    for (const [key, bucket] of rateLimitBuckets) {
      if (bucket.resetsAt <= now) rateLimitBuckets.delete(key)
    }
  }

  return false
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ error: 'Forbidden' }, 403)
  if (isRateLimited(req)) return json({ error: 'Too many requests' }, 429)

  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) return json({ error: 'Request too large' }, 413)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const lead = sanitizeMarketingLead(body)
  if (!lead) return json({ error: 'A valid email is required' }, 400)

  try {
    await submitMarketingLeadToHighLevel(lead)
  } catch (error) {
    // Never log the lead payload or vendor response; either may contain PII.
    console.error(
      'HighLevel lead delivery failed:',
      error instanceof Error ? error.message : 'Unknown error',
    )
    return json({ error: 'CRM delivery unavailable' }, 503)
  }

  return json({ ok: true }, 202)
}
