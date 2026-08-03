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

// Resources that expose patient PII / results. These are NOT public: they must
// be called server-to-server with the internal secret. Anyone could otherwise
// pull every patient's name, DOB, address and biomarkers from this endpoint.
const PROTECTED = new Set(['results', 'orders', 'patients', 'reports'])

// GET /api/bgt?resource=bundles|results|orders|patients
// For patient results: ?resource=results&email=patient@email.com
// Protected resources require header x-apex-internal: <BGT_INTERNAL_SECRET>.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const resource = searchParams.get('resource') ?? 'bundles'
  const email    = searchParams.get('email')
  const count    = searchParams.get('count') ?? '100'

  const clientId     = process.env.BGT_CLIENT_ID
  const clientSecret = process.env.BGT_CLIENT_SECRET
  const internalSecret = process.env.BGT_INTERNAL_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'BGT credentials not configured' }, { status: 500, headers: CORS })
  }

  // Guard patient data behind the internal secret + a required email to match on.
  //
  // `all=true` lifts the email requirement for the scheduled sync sweep, which
  // has to see every recent result to match them against portal accounts. It is
  // deliberately opt-in rather than "email is optional", so a caller can never
  // pull the whole patient list by simply forgetting a parameter.
  const wantsAll = searchParams.get('all') === 'true'
  if (PROTECTED.has(resource)) {
    const provided = req.headers.get('x-apex-internal')
    if (!internalSecret || provided !== internalSecret) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: CORS })
    }
    if (!email && !wantsAll) {
      return NextResponse.json({ error: 'email is required (or pass all=true)' }, { status: 400, headers: CORS })
    }
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

    let data = await res.json()

    // BGT ignores the ?email filter and returns every patient's results, so we
    // MUST filter to the requested person here before returning anything.
    if (PROTECTED.has(resource) && email && data && Array.isArray(data.results)) {
      const wanted = email.trim().toLowerCase()
      const filtered = data.results.filter(
        (r: { person?: { email?: string } }) => r?.person?.email?.toLowerCase() === wanted
      )
      data = { ...data, results: filtered }
    }

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
