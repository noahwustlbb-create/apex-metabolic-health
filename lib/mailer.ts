// Shared transactional mailer.
//
// Primary channel is Resend (API-based, no SMTP credentials to expire). The
// legacy Gmail SMTP path is kept as an automatic fallback so a missing or
// not-yet-verified Resend key can't take the whole thing down — which is
// exactly what happened when the Gmail app password was rejected and every
// intake email died silently.
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

const SENDER = 'admin@apexmetabolichealth.com.au'

export interface MailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  fromName?: string
  replyTo?: string
}

async function sendViaResend(opts: MailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const base = {
    from: `${opts.fromName || 'Apex Metabolic Health'} <${SENDER}>`,
    to: Array.isArray(opts.to) ? opts.to : [opts.to],
    subject: opts.subject,
    replyTo: opts.replyTo,
  }
  // Resend types the body as a union, so html/text have to be narrowed to a
  // single concrete variant rather than passed as possibly-undefined.
  const { error } = opts.html
    ? await resend.emails.send({ ...base, html: opts.html, text: opts.text })
    : await resend.emails.send({ ...base, text: opts.text ?? '' })
  // The Resend SDK reports failures on `error` rather than throwing, so a
  // silent no-send is possible unless we surface it ourselves.
  if (error) throw new Error(`Resend: ${error.name} - ${error.message}`)
}

async function sendViaGmail(opts: MailOptions) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: SENDER, pass: process.env.GMAIL_APP_PASSWORD },
  })
  await transporter.sendMail({
    from: `${opts.fromName || 'Apex Metabolic Health'} <${SENDER}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  })
}

type Provider = 'gmail' | 'resend'

// Gmail SMTP is primary because Resend cannot verify this domain: Resend needs
// an MX record on the `send.` subdomain, and Wix DNS can't create subdomain MX
// records. Trying Resend first meant a failed API round-trip on every single
// send. Once DNS moves off Wix and the domain verifies, flip this to 'resend'.
const PRIMARY: Provider = 'gmail'

const PROVIDERS: Record<Provider, { configured: () => boolean; send: (o: MailOptions) => Promise<void> }> = {
  gmail: { configured: () => !!process.env.GMAIL_APP_PASSWORD, send: sendViaGmail },
  resend: { configured: () => !!process.env.RESEND_API_KEY, send: sendViaResend },
}

export async function sendEmail(opts: MailOptions) {
  const order: Provider[] = PRIMARY === 'gmail' ? ['gmail', 'resend'] : ['resend', 'gmail']
  const failures: string[] = []

  for (const name of order) {
    const provider = PROVIDERS[name]
    if (!provider.configured()) continue
    try {
      await provider.send(opts)
      return
    } catch (error) {
      failures.push(`${name}: ${error instanceof Error ? error.message : String(error)}`)
      console.error(`mailer: ${name} send failed, trying next provider:`, error)
    }
  }

  throw new Error(
    failures.length
      ? `All mail providers failed — ${failures.join(' | ')}`
      : 'No mail provider configured (set GMAIL_APP_PASSWORD or RESEND_API_KEY)'
  )
}
