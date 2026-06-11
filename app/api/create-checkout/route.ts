import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProduct, getPriceId, type EnquiryType } from '@/lib/intake-routing'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

  const body = await req.json()
  const { firstName, lastName, dob, email, phone, state, sex, enquiry, medications, hasBloods } = body

  if (!enquiry || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const product = getProduct(enquiry as EnquiryType, hasBloods)
  const priceId = getPriceId(product.type)

  const origin = req.headers.get('origin') || 'https://www.apexmetabolichealth.com.au'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    success_url: `${origin}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
    metadata: {
      firstName,
      lastName,
      dob,
      email,
      phone,
      state,
      sex,
      enquiry,
      hasBloods: hasBloods ? 'true' : 'false',
      medications: medications || '',
      productType: product.type,
      productName: product.name,
    },
    payment_intent_data: {
      metadata: {
        source: 'apex-intake-v2',
        enquiry,
        productType: product.type,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}
