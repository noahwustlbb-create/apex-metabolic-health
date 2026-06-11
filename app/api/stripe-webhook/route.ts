import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createClinikoPatient } from '@/lib/cliniko'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true })
  }

  const m = session.metadata || {}
  const firstName = m.firstName || ''
  const lastName = m.lastName || ''
  const email = m.email || session.customer_email || ''
  const phone = m.phone || ''
  const dob = m.dob || ''
  const enquiry = m.enquiry || ''
  const productName = m.productName || ''
  const productType = m.productType || ''
  const hasBloods = m.hasBloods === 'true'
  const amountPaid = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : 'N/A'

  // 1 — Create Cliniko patient
  try {
    await createClinikoPatient({
      firstName,
      lastName,
      dob,
      email,
      phone,
      notes: `Enquiry: ${enquiry} | Product: ${productName} | Has bloods: ${hasBloods} | Amount: ${amountPaid} | Source: apex-intake-v2`,
    })
  } catch (err) {
    console.error('Cliniko patient creation failed:', err)
    // Non-fatal — log and continue
  }

  // 2 — Send internal admin notification
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Apex Metabolic Health <admin@apexmetabolichealth.com.au>',
      to: 'admin@apexmetabolichealth.com.au',
      subject: `New Patient Payment — ${firstName} ${lastName} — ${productName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;padding:32px;">
          <h2 style="margin:0 0 16px;font-size:18px;">New patient payment confirmed</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${[
              ['Name', `${firstName} ${lastName}`],
              ['Email', email],
              ['Phone', phone],
              ['DOB', dob],
              ['Enquiry', enquiry],
              ['Product', productName],
              ['Product type', productType],
              ['Has existing bloods', hasBloods ? 'Yes' : 'No'],
              ['Amount paid', amountPaid],
              ['Stripe session', session.id],
            ].map(([k, v]) => `
              <tr>
                <td style="padding:8px 12px 8px 0;color:#6b7280;white-space:nowrap;">${k}</td>
                <td style="padding:8px 0;font-weight:500;">${v}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `,
    })
  } catch (err) {
    console.error('Admin email failed:', err)
  }

  // 3 — Send patient confirmation email
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const isPanel = productType.startsWith('panel')
    await resend.emails.send({
      from: 'Apex Metabolic Health <admin@apexmetabolichealth.com.au>',
      to: email,
      subject: `Payment confirmed — ${productName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;background:#07090f;padding:40px;border-radius:12px;">
          <p style="color:#4890f7;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 16px;">Apex Metabolic Health</p>
          <h1 style="color:#f0f4f8;font-size:22px;font-weight:700;margin:0 0 12px;">Payment confirmed${firstName ? `, ${firstName}` : ''}.</h1>
          <p style="color:#8899aa;font-size:14px;line-height:1.7;margin:0 0 24px;">
            Your payment of ${amountPaid} for <strong style="color:#f0f4f8;">${productName}</strong> has been received.
          </p>
          <p style="color:#8899aa;font-size:14px;line-height:1.7;margin:0 0 24px;">
            ${isPanel
              ? 'Your doctor-issued pathology referral will be sent to this email within 24 hours. Collect at any accredited collection centre — fasted before 9am, no appointment needed.'
              : 'Our team will contact you within 1 business day to confirm your telehealth consultation time.'}
          </p>
          <p style="color:#4a5a6a;font-size:11px;margin:32px 0 0;">
            Questions? Reply to this email or contact us at care@apexmetabolichealth.com.au<br>
            Apex Metabolic Health · AHPRA-registered practitioners · This email does not constitute medical advice.
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Patient confirmation email failed:', err)
  }

  return NextResponse.json({ received: true })
}
