import { NextResponse } from 'next/server'

const BGT_API = 'https://api.bloodygoodtests.com.au'

const CORS = {
  'Access-Control-Allow-Origin': 'https://app.apexmetabolichealth.com.au',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

async function bgtFetch(url: string, clientId: string, clientSecret: string): Promise<Response> {
  const r1 = await fetch(url, { headers: { Authorization: `Bearer ${clientSecret}` } })
  if (r1.ok) return r1

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const r2 = await fetch(url, { headers: { Authorization: `Basic ${basic}` } })
  if (r2.ok) return r2

  const r3 = await fetch(url, { headers: { Authorization: `Bearer ${clientId}` } })
  return r3
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
