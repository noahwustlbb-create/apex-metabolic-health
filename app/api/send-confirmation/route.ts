import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

type FormType = 'hormone-consult' | 'general-consult' | 'discovery' | 'bloods' | 'consult-intake'

const FORM_CONFIG: Record<FormType, { subject: string; heading: string; subheading: string; nextSteps: string[] }> = {
  'hormone-consult': {
    subject: 'Your Hormone Consultation — Apex Metabolic Health',
    heading: 'Your hormone consult intake has been received.',
    subheading: 'Our clinical team will review your case and confirm your consultation within 1 business day.',
    nextSteps: [
      'Our team reviews your intake and confirms your appointment time',
      'Your doctor issues a pathology referral for your hormone panel — collected at 4,000+ accredited centres',
      'Your AHPRA-registered doctor reviews your results and builds your personalised protocol',
    ],
  },
  'general-consult': {
    subject: 'Your Consultation Request — Apex Metabolic Health',
    heading: 'Your clinical intake has been received.',
    subheading: 'Our team will be in touch within 1 business day to confirm your consultation.',
    nextSteps: [
      'Our team reviews your intake and confirms your appointment',
      'Your doctor reviews your health history before your consultation',
      'Telehealth consultation — your doctor builds your personalised protocol',
    ],
  },
  'discovery': {
    subject: 'Your Discovery Call — Apex Metabolic Health',
    heading: "We've received your discovery call request.",
    subheading: "One of our team will be in touch within 1 business day to lock in a time.",
    nextSteps: [
      "We'll call or message you to confirm your 10-minute slot",
      'Our team walks you through the right program for your goals',
      'You decide if Apex is the right fit — zero pressure',
    ],
  },
  'bloods': {
    subject: 'Your Blood Panel Request — Apex Metabolic Health',
    heading: 'Your blood panel request has been received.',
    subheading: 'Your doctor-issued pathology referral will be sent to this email within 24 hours.',
    nextSteps: [
      'Doctor-issued referral arrives in your inbox within 24 hours',
      'Collect at any of 4,000+ accredited pathology centres — no GP required',
      'Results reviewed by your Apex doctor with a full clinical interpretation',
    ],
  },
  'consult-intake': {
    subject: 'Your Intake Confirmed — Apex Metabolic Health',
    heading: "Your intake has been received.",
    subheading: "Our clinical team will review your case and reach out within 1 business day.",
    nextSteps: [
      'Our team reviews your intake before your consultation',
      'Your doctor is briefed on your history and goals',
      'Telehealth consultation — your personalised protocol is built',
    ],
  },
}

function buildEmail(firstName: string, formType: FormType): string {
  const config = FORM_CONFIG[formType]
  const steps = config.nextSteps.map((step, i) => `
    <tr>
      <td style="padding-bottom:16px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="32" style="vertical-align:top;padding-top:1px;">
              <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#4890f7;text-align:center;font-size:11px;font-weight:700;color:#ffffff;line-height:22px;">${i + 1}</span>
            </td>
            <td style="vertical-align:top;padding-top:2px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#8899aa;">${step}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#07090f;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#07090f;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Logo -->
      <tr>
        <td style="padding-bottom:28px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:17px;font-weight:300;letter-spacing:0.15em;color:#f0f4f8;text-transform:uppercase;line-height:1;">APEX</p>
                <p style="margin:3px 0 0;font-size:10px;font-weight:300;letter-spacing:0.15em;color:#4890f7;text-transform:uppercase;line-height:1;">Metabolic Health</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="background:#0d1117;border:1px solid rgba(72,144,247,0.15);border-radius:16px 16px 0 0;padding:40px 40px 32px;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4890f7;">Apex Metabolic Health</p>
          <h1 style="margin:0 0 14px;font-size:22px;font-weight:700;color:#f0f4f8;line-height:1.25;">
            ${firstName ? `Hi ${firstName} — ` : ''}${config.heading}
          </h1>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#8899aa;">${config.subheading}</p>
        </td>
      </tr>

      <!-- Divider -->
      <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(72,144,247,0.2),transparent);"></td></tr>

      <!-- What happens next -->
      <tr>
        <td style="background:#0d1117;border-left:1px solid rgba(72,144,247,0.1);border-right:1px solid rgba(72,144,247,0.1);padding:32px 40px;">
          <p style="margin:0 0 20px;font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4a5a6a;">What happens next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${steps}
          </table>
        </td>
      </tr>

      <!-- Divider -->
      <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(72,144,247,0.2),transparent);"></td></tr>

      <!-- Why Apex -->
      <tr>
        <td style="background:#0d1117;border-left:1px solid rgba(72,144,247,0.1);border-right:1px solid rgba(72,144,247,0.1);padding:28px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding-right:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td style="background:rgba(72,144,247,0.08);border:1px solid rgba(72,144,247,0.15);border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 2px;font-size:18px;font-weight:700;color:#4890f7;">1,400+</p>
                      <p style="margin:0;font-size:11px;color:#4a5a6a;">men across Australia</p>
                    </td>
                  </tr>
                </table>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:rgba(72,144,247,0.08);border:1px solid rgba(72,144,247,0.15);border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 2px;font-size:18px;font-weight:700;color:#4890f7;">&lt;48h</p>
                      <p style="margin:0;font-size:11px;color:#4a5a6a;">average referral turnaround</p>
                    </td>
                  </tr>
                </table>
              </td>
              <td width="50%" style="padding-left:8px;vertical-align:top;">
                <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                  <tr>
                    <td style="background:rgba(72,144,247,0.08);border:1px solid rgba(72,144,247,0.15);border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 2px;font-size:18px;font-weight:700;color:#4890f7;">4,000+</p>
                      <p style="margin:0;font-size:11px;color:#4a5a6a;">pathology collection centres</p>
                    </td>
                  </tr>
                </table>
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:rgba(72,144,247,0.08);border:1px solid rgba(72,144,247,0.15);border-radius:8px;padding:14px 16px;">
                      <p style="margin:0 0 2px;font-size:13px;font-weight:700;color:#f0f4f8;">AHPRA Registered</p>
                      <p style="margin:0;font-size:11px;color:#4a5a6a;">every doctor, every consult</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Divider -->
      <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(72,144,247,0.2),transparent);"></td></tr>

      <!-- CTA -->
      <tr>
        <td style="background:#0d1117;border:1px solid rgba(72,144,247,0.15);border-top:none;border-radius:0 0 16px 16px;padding:32px 40px 40px;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#f0f4f8;">Any questions in the meantime?</p>
          <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#8899aa;">
            Reply to this email or reach us at <a href="mailto:admin@apexmetabolichealth.com.au" style="color:#4890f7;text-decoration:none;">admin@apexmetabolichealth.com.au</a>
          </p>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#4890f7;border-radius:999px;">
                <a href="https://www.apexmetabolichealth.com.au"
                   style="display:inline-block;padding:12px 28px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
                  Visit Apex &rarr;
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding-top:28px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#2a3a4a;line-height:1.8;">
            Apex Metabolic Health &nbsp;&middot;&nbsp; Imperial Equity Investments Pty Ltd &nbsp;&middot;&nbsp; ABN 91 682 876 884<br>
            All consultations conducted by AHPRA-registered medical practitioners.<br>
            This email does not constitute medical advice.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function POST(req: Request) {
  const { email, firstName, formType } = await req.json() as {
    email: string
    firstName?: string
    formType: FormType
  }

  if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })
  if (!FORM_CONFIG[formType]) return NextResponse.json({ error: 'Unknown form type' }, { status: 400 })

  const config = FORM_CONFIG[formType]

  const { error } = await resend.emails.send({
    from: 'Apex Metabolic Health <admin@apexmetabolichealth.com.au>',
    to: email,
    subject: config.subject,
    html: buildEmail(firstName ?? '', formType),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
