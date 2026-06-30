import { NextResponse } from 'next/server'

const BGT_API = 'https://api.bloodygoodtests.com.au'

// Cache the token in memory for its lifetime
let cachedToken: { value: string; expiresAt: number } | null = null

async function getBgtToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value
  }

  const clientId     = process.env.BGT_CLIENT_ID
  const clientSecret = process.env.BGT_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('BGT credentials not configured')
  }

  // Standard OAuth2 client credentials — Basic auth header
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(`${BGT_API}/oauth/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  })

  if (!res.ok) {
    // Fallback: try JSON body approach
    const res2 = await fetch(`${BGT_API}/v1/auth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, grant_type: 'client_credentials' }),
      cache: 'no-store',
    })
    if (!res2.ok) {
      const text = await res2.text()
      throw new Error(`BGT auth failed: ${text}`)
    }
    const data = await res2.json()
    const token = data.access_token ?? data.token
    cachedToken = { value: token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - 60_000 }
    return token
  }

  const data = await res.json()
  const token = data.access_token ?? data.token
  cachedToken = { value: token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - 60_000 }
  return token
}

// GET /api/bgt?resource=bundles|tests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const resource = searchParams.get('resource') ?? 'bundles'
  const count    = searchParams.get('count') ?? '50'

  try {
    const token = await getBgtToken()

    const endpoint = resource === 'tests'
      ? `${BGT_API}/v1/tests`
      : `${BGT_API}/v1/bundles?count=${count}`

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 300 }, // cache 5 min
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[BGT API]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
