// Shared Gmail SMTP mailer. Sends as admin@apexmetabolichealth.com.au via
// Google Workspace using an app password — no sending-domain verification
// needed (Resend is blocked until the domain leaves Wix DNS).
import nodemailer from 'nodemailer'

const SENDER = 'admin@apexmetabolichealth.com.au'

export async function sendEmail(opts: {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  fromName?: string
  replyTo?: string
}) {
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
