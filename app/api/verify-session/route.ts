import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-05-28.basil' })

  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ ok: false })
    }

    return NextResponse.json({
      ok: true,
      firstName: session.metadata?.firstName || '',
      productName: session.metadata?.productName || '',
    })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
