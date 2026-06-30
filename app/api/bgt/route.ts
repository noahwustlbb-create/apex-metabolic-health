import { NextResponse } from 'next/server'

const BGT_API = 'https://api.bloodygoodtests.com.au'

async function bgtFetch(url: string, clientId: string, clientSecret: string): Promise<Response> {
  // Try 1: client_secret as Bearer token directly (simplest API key pattern)
  const r1 = await fetch(url, {
    headers: { Authorization: `Bearer ${clientSecret}` },
    next: { revalidate: 300 },
  })
  if (r1.ok) return r1

  // Try 2: Basic auth (client_id:client_secret)
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const r2 = await fetch(url, {
    headers: { Authorization: `Basic ${basic}` },
    next: { revalidate: 300 },
  })
  if (r2.ok) return r2

  // Try 3: client_id as Bearer
  const r3 = await fetch(url, {
    headers: { Authorization: `Bearer ${clientId}` },
    next: { revalidate: 300 },
  })
  return r3
}

// GET /api/bgt?resource=bundles|tests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const resource = searchParams.get('resource') ?? 'bundles'
  const count    = searchParams.get('count') ?? '50'

  const clientId     = process.env.BGT_CLIENT_ID
  const clientSecret = process.env.BGT_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'BGT credentials not configured' }, { status: 500 })
  }

  try {
    const endpoint = resource === 'tests'
      ? `${BGT_API}/v1/tests`
      : `${BGT_API}/v1/bundles?count=${count}`

    const res = await bgtFetch(endpoint, clientId, clientSecret)

    if (!res.ok) {
      const text = await res.text()
      console.error('[BGT API] all auth methods failed:', text)
      return NextResponse.json({ error: text, authHint: 'Check BGT API docs for correct auth format' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[BGT API]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
