import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = 'noahwustlbb@gmail.com'

export async function POST(req: Request) {
  const body = await req.json() as Record<string, string>
  const { name, email, phone, source, program, goals, concerns, age, state, sex, familyHistory, readiness, duration, message } = body

  if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  const rows = [
    ['Name',           name            ],
    ['Email',          email           ],
    ['Phone',          phone           ],
    ['Source',         source          ],
    ['Program',        program         ],
    ['Goals',          goals           ],
    ['Concerns',       concerns        ],
    ['Age bracket',    age             ],
    ['State',          state           ],
    ['Sex',            sex             ],
    ['Family history', familyHistory   ],
    ['Readiness',      readiness       ],
    ['Duration',       duration        ],
    ['Message',        message         ],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr>
      <td style="padding:6px 12px 6px 0;font-size:12px;color:#8899aa;white-space:nowrap;vertical-align:top;">${k}</td>
      <td style="padding:6px 0;font-size:12px;color:#f0f4f8;word-break:break-word;">${v}</td>
    </tr>`)
    .join('')

  const sourceLabel = source === 'quiz' ? 'Health Assessment' : source === 'book' ? 'Book page' : source ?? 'Website'

  const { error } = await resend.emails.send({
    // STOPGAP: resend.dev until domain verified in Resend, then revert to admin@apexmetabolichealth.com.au
    from: 'Apex Metabolic Health <onboarding@resend.dev>',
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `New lead: ${name || email} (${sourceLabel})`,
    html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#07090f;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#07090f;padding:40px 20px;">
  <tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

      <tr>
        <td style="padding-bottom:20px;">
          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:#4890f7;">Apex Metabolic Health</p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#f0f4f8;">New lead: ${sourceLabel}</h1>
        </td>
      </tr>

      <tr>
        <td style="background:#0d1117;border:1px solid rgba(72,144,247,0.15);border-radius:12px;padding:28px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding-top:20px;">
          <a href="mailto:${email}"
             style="display:inline-block;padding:10px 24px;background:#4890f7;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff;text-decoration:none;">
            Reply to ${name || email} &rarr;
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding-top:24px;text-align:center;">
          <p style="margin:0;font-size:10px;color:#2a3a4a;">Apex Metabolic Health &middot; Imperial Equity Investments Pty Ltd</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`,
  })

  if (error) {
    console.error('notify-admin Resend error:', error)
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
