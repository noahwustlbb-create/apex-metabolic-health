import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { programs } from '@/lib/programs'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { firstName, email, programs: programNames } = await req.json()

  if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })

  const matchedPrograms = (programNames as string[]).map((name: string) => {
    const match = programs.find((p) => p.name === name)
    return { name, tagline: match?.tagline ?? '' }
  })

  const programRows = matchedPrograms
    .map(
      ({ name, tagline }, i) => `
        <tr>
          <td style="padding-bottom:16px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="28" style="vertical-align:top;padding-top:2px;">
                  <span style="font-size:11px;font-weight:700;color:#00c2b8;letter-spacing:0.1em;">${String(i + 1).padStart(2, '0')}</span>
                </td>
                <td style="vertical-align:top;">
                  <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:#f0f4f8;">${name}</p>
                  ${tagline ? `<p style="margin:0;font-size:13px;color:#8899aa;">${tagline}</p>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join('')

  const { error } = await resend.emails.send({
    from: 'Apex Metabolic Health <onboarding@resend.dev>',
    to: email,
    subject: 'Your Apex Health Assessment — Personalised Clinical Pathway',
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#070a0d;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#070a0d;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Brand -->
        <tr>
          <td style="padding-bottom:32px;text-align:center;">
            <img src="https://www.apexmetabolichealth.com.au/logo-new.png" alt="Apex Metabolic Health" width="180" style="display:inline-block;max-width:180px;height:auto;" />
          </td>
        </tr>

        <!-- Hero card -->
        <tr>
          <td style="background:#0d1117;border:1px solid #1e2d3d;border-radius:12px;padding:40px 40px 32px;">

            <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#00c2b8;">
              Your personalised clinical pathway
            </p>
            <h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#f0f4f8;line-height:1.3;">
              Hi ${firstName || 'there'}, your assessment has been prepared.
            </h1>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#8899aa;">
              Based on your answers, our doctors have matched you to the programs below. Your doctor will review these during your consultation and build a protocol specific to your biology and goals.
            </p>

          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="height:2px;background:linear-gradient(90deg,transparent,#1e2d3d,transparent);"></td></tr>

        <!-- Matched programs -->
        <tr>
          <td style="background:#0d1117;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:32px 40px;">

            <p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4a5a6a;">
              Matched Programs
            </p>

            <table width="100%" cellpadding="0" cellspacing="0">
              ${programRows}
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e2d3d,transparent);"></td></tr>

        <!-- What happens next -->
        <tr>
          <td style="background:#0d1117;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:32px 40px;">

            <p style="margin:0 0 24px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4a5a6a;">
              What Happens Next
            </p>

            <!-- Step 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td width="32" style="vertical-align:top;padding-top:1px;">
                  <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#00c2b8;text-align:center;font-size:11px;font-weight:700;color:#070a0d;line-height:22px;">1</span>
                </td>
                <td style="vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#f0f4f8;">Complete Your Clinical Intake</p>
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#8899aa;">Health history, symptoms, medications, lifestyle, and goals. Takes 3–5 minutes and gives your doctor everything needed before your consultation.</p>
                </td>
              </tr>
            </table>

            <!-- Step 2 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td width="32" style="vertical-align:top;padding-top:1px;">
                  <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#00c2b8;text-align:center;font-size:11px;font-weight:700;color:#070a0d;line-height:22px;">2</span>
                </td>
                <td style="vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#f0f4f8;">Pathology Referral</p>
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#8899aa;">Your doctor will issue your blood panel referral to assess the key biomarkers relevant to your programs.</p>
                </td>
              </tr>
            </table>

            <!-- Step 3 -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="32" style="vertical-align:top;padding-top:1px;">
                  <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#00c2b8;text-align:center;font-size:11px;font-weight:700;color:#070a0d;line-height:22px;">3</span>
                </td>
                <td style="vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#f0f4f8;">Telehealth Consultation</p>
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#8899aa;">Review your results with your AHPRA-registered doctor and receive your personalised protocol.</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e2d3d,transparent);"></td></tr>

        <!-- Pricing -->
        <tr>
          <td style="background:#0d1117;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:32px 40px;">

            <p style="margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4a5a6a;">
              Membership &amp; Pricing
            </p>

            <!-- Option 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td style="background:#111820;border:1px solid #1e2d3d;border-radius:8px;padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#f0f4f8;">Apex Protocol Membership</p>
                        <p style="margin:0;font-size:12px;color:#4a5a6a;">Ongoing clinical program</p>
                      </td>
                      <td align="right">
                        <p style="margin:0;font-size:16px;font-weight:700;color:#00c2b8;">$99<span style="font-size:12px;font-weight:400;color:#4a5a6a;">/month</span></p>
                      </td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                    <tr>
                      <td style="font-size:13px;line-height:1.8;color:#8899aa;">
                        &#x2713;&nbsp; Doctor-led protocol design &amp; optimisation<br>
                        &#x2713;&nbsp; Medication at pharmacy-direct rates<br>
                        &#x2713;&nbsp; Accredited compounding pharmacy fulfilment<br>
                        &#x2713;&nbsp; Ongoing clinical support &amp; treatment adjustments<br>
                        &#x2713;&nbsp; Structured follow-up consultations<br>
                        &#x2713;&nbsp; Evidence-based supplement guidance
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Option 2 -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#111820;border:1px solid #1e2d3d;border-radius:8px;padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#f0f4f8;">Script Release Only</p>
                        <p style="margin:0;font-size:12px;color:#4a5a6a;">One-off prescribing — no ongoing support</p>
                      </td>
                      <td align="right">
                        <p style="margin:0;font-size:16px;font-weight:700;color:#f0f4f8;">$145<span style="font-size:12px;font-weight:400;color:#4a5a6a;"> one-off</span></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e2d3d,transparent);"></td></tr>

        <!-- CTA -->
        <tr>
          <td style="background:#0d1117;border:1px solid #1e2d3d;border-bottom-left-radius:12px;border-bottom-right-radius:12px;padding:32px 40px 40px;">

            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#8899aa;">
              Complete your intake to move forward. Your doctor will review your case before your consultation.
            </p>

            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#00c2b8;border-radius:2px;">
                  <a href="https://apexmetabolic.com.au/get-started"
                     style="display:inline-block;padding:14px 32px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#070a0d;text-decoration:none;">
                    Start Your Intake &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:0;font-size:13px;line-height:1.7;color:#4a5a6a;">
              This isn't a one-off treatment.<br>
              This is an ongoing optimisation system — built around you.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:28px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#4a5a6a;line-height:1.8;">
              Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.<br>
              All consultations conducted by AHPRA-registered medical practitioners.<br>
              This email does not constitute medical advice.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
