import { TEMPLATES } from '@/lib/email/templates'
import { STAGES, T } from '@/lib/email/shell'

// Internal gallery of every journey email. Renders sample data only — no patient
// information is ever loaded here.
export const dynamic = 'force-dynamic'

const GROUPS: { title: string; keys: string[] }[] = [
  { title: 'Assessment', keys: ['assessment-abandoned', 'assessment-complete', 'assessment-may-continue', 'process-explainer', 'action-reminder', 'final-followup', 'clinical-review-required'] },
  { title: 'Blood testing', keys: ['bloods-selected', 'bloods-payment-received', 'pathology-issued', 'bloods-reminder', 'bloods-results-received'] },
  { title: 'Consultation', keys: ['consult-available', 'consult-booking-abandoned', 'consult-confirmed', 'consult-reminder-24h', 'consult-reminder-2h', 'info-required', 'consult-complete'] },
  { title: 'Plan, membership & treatment', keys: ['plan-ready', 'membership-activated', 'treatment-payment-received', 'prescription-sent', 'pharmacy-processing', 'order-dispatched', 'treatment-started', 'patient-checkin'] },
  { title: 'Ongoing monitoring', keys: ['followup-bloods-due', 'review-ready-to-book', 'four-month-review'] },
  { title: 'Recovery & exceptions', keys: ['payment-failed', 'checkout-abandoned', 'appointment-rescheduled', 'additional-info-required', 'not-suitable', 'membership-overdue', 'membership-cancelled', 're-engagement'] },
]

export async function GET() {
  const covered = new Set(GROUPS.flatMap(g => g.keys))
  const orphans = Object.keys(TEMPLATES).filter(k => !covered.has(k))

  const groupHtml = GROUPS.map(g => {
    const rows = g.keys.map(key => {
      const t = TEMPLATES[key]
      if (!t) return `<li style="color:#ff6b6b;">MISSING: ${key}</li>`
      const stageLabel = t.stage ? STAGES.find(s => s.key === t.stage)?.label ?? t.stage : '—'
      const tag = t.category === 'marketing'
        ? `<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:rgba(255,180,72,0.15);color:#ffb448;">marketing</span>`
        : `<span style="font-size:10px;padding:2px 8px;border-radius:99px;background:${T.accentSoft};color:${T.accent};">service</span>`
      return `<li style="margin:0 0 10px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
        <a href="/email-preview/${key}" style="color:${T.text};text-decoration:none;font-weight:600;font-size:14px;min-width:260px;">${key}</a>
        ${tag}
        <span style="font-size:11px;color:${T.dim};">${stageLabel}</span>
      </li>`
    }).join('')
    return `<section style="margin:0 0 36px;">
      <h2 style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${T.accent};margin:0 0 16px;">${g.title}</h2>
      <ul style="list-style:none;padding:0;margin:0;">${rows}</ul>
    </section>`
  }).join('')

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Apex email journey — preview</title></head>
<body style="margin:0;background:${T.bg};color:${T.text};font-family:${T.font};padding:48px 24px;">
<div style="max-width:840px;margin:0 auto;">
  <p style="margin:0;font-size:16px;font-weight:300;letter-spacing:0.18em;text-transform:uppercase;">APEX</p>
  <p style="margin:4px 0 32px;font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:${T.accent};">Email journey preview</p>
  <p style="font-size:13px;color:${T.muted};margin:0 0 36px;line-height:1.7;">
    ${Object.keys(TEMPLATES).length} templates, rendered with sample data. Click any to view.
  </p>
  ${groupHtml}
  ${orphans.length ? `<p style="color:#ffb448;font-size:12px;">Ungrouped templates: ${orphans.join(', ')}</p>` : ''}
</div>
</body></html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } })
}
