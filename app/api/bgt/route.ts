import { NextResponse } from 'next/server'

const BGT_API = 'https://api.bloodygoodtests.com.au'
const BGT_TOKEN_URL = 'https://auth.bloodygoodtests.com.au/oauth/token'
// BGT versions its API through the Accept header. Bundles require >= 1.1.0.
const BGT_ACCEPT = 'application/vnd.bloodygoodtests.v1.1.0+json'

const CORS = {
  'Access-Control-Allow-Origin': 'https://app.apexmetabolichealth.com.au',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

// Cache the OAuth access token across requests (tokens last ~24h). Refresh a
// minute early to avoid using one that expires mid-flight.
let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value

  const res = await fetch(BGT_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })
  if (!res.ok) {
    throw new Error(`BGT token exchange failed (${res.status}): ${await res.text()}`)
  }
  const data = (await res.json()) as { access_token: string; expires_in?: number }
  const ttlMs = (data.expires_in ?? 86400) * 1000
  cachedToken = { value: data.access_token, expiresAt: Date.now() + ttlMs - 60_000 }
  return cachedToken.value
}

async function bgtFetch(url: string, clientId: string, clientSecret: string): Promise<Response> {
  const token = await getAccessToken(clientId, clientSecret)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: BGT_ACCEPT },
  })
  // If the cached token was rejected, force one refresh and retry once.
  if (res.status === 401) {
    cachedToken = null
    const fresh = await getAccessToken(clientId, clientSecret)
    return fetch(url, { headers: { Authorization: `Bearer ${fresh}`, Accept: BGT_ACCEPT } })
  }
  return res
}

// GET /api/bgt?resource=bundles|results|orders|patients
// For patient results: ?resource=results&email=patient@email.com
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const resource = searchParams.get('resource') ?? 'bundles'
  const email    = searchParams.get('email')
  const count    = searchParams.get('count') ?? '100'

  const clientId     = process.env.BGT_CLIENT_ID
  const clientSecret = process.env.BGT_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'BGT credentials not configured' }, { status: 500, headers: CORS })
  }

  try {
    let endpoint: string

    switch (resource) {
      case 'results':
        endpoint = email
          ? `${BGT_API}/v1/results?email=${encodeURIComponent(email)}&count=${count}`
          : `${BGT_API}/v1/results?count=${count}`
        break
      case 'orders':
        endpoint = email
          ? `${BGT_API}/v1/orders?email=${encodeURIComponent(email)}&count=${count}`
          : `${BGT_API}/v1/orders?count=${count}`
        break
      case 'patients':
        endpoint = email
          ? `${BGT_API}/v1/patients?email=${encodeURIComponent(email)}`
          : `${BGT_API}/v1/patients?count=${count}`
        break
      case 'reports':
        endpoint = email
          ? `${BGT_API}/v1/reports?email=${encodeURIComponent(email)}&count=${count}`
          : `${BGT_API}/v1/reports?count=${count}`
        break
      case 'tests':
        endpoint = `${BGT_API}/v1/tests`
        break
      default:
        endpoint = `${BGT_API}/v1/bundles?count=${count}`
    }

    const res = await bgtFetch(endpoint, clientId, clientSecret)

    if (!res.ok) {
      const text = await res.text()
      console.error(`[BGT API] ${resource} failed (${res.status}):`, text)
      return NextResponse.json(
        { error: text, resource, endpoint: endpoint.replace(clientSecret, '***') },
        { status: res.status, headers: CORS }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { ...CORS, 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('[BGT API]', err)
    return NextResponse.json({ error: String(err) }, { status: 500, headers: CORS })
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { ...CORS, 'Access-Control-Max-Age': '86400' },
  })
}
