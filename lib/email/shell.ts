// Apex email design system — tokens, primitives and the shared shell.
//
// Everything renders as inlined-style tables because email clients strip
// <style> blocks, flexbox and CSS variables. Keep it boring and compatible.

export const T = {
  bg: '#07090f',
  surface: '#0d1117',
  surfaceAlt: '#111820',
  accent: '#4890f7',
  accentSoft: 'rgba(72,144,247,0.12)',
  border: 'rgba(72,144,247,0.15)',
  borderSoft: 'rgba(72,144,247,0.08)',
  text: '#f0f4f8',
  muted: '#8899aa',
  dim: '#4a5a6a',
  font: "'Helvetica Neue',Helvetica,Arial,sans-serif",
} as const

export const SUPPORT_EMAIL = 'admin@apexmetabolichealth.com.au'
export const SITE = 'https://www.apexmetabolichealth.com.au'
export const PORTAL = 'https://app.apexmetabolichealth.com.au'

// ─── Journey stages ──────────────────────────────────────────────────────────
// The progress indicator is the spine of the whole system: it answers "where am
// I" without the patient having to read a word of body copy.

export const STAGES = [
  { key: 'assessment',   n: '01', label: 'Assessment' },
  { key: 'bloods',       n: '02', label: 'Blood Testing' },
  { key: 'consultation', n: '03', label: 'Consultation' },
  { key: 'review',       n: '04', label: 'Clinical Plan' },
  { key: 'ongoing',      n: '05', label: 'Ongoing Care' },
] as const

export type Stage = (typeof STAGES)[number]['key']

// ─── Primitives ──────────────────────────────────────────────────────────────

/** Escape untrusted interpolated values so patient data can't break the markup. */
export function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

export function progressBar(active?: Stage): string {
  if (!active) return ''
  const activeIdx = STAGES.findIndex(s => s.key === active)

  const cells = STAGES.map((s, i) => {
    const done = i < activeIdx
    const isNow = i === activeIdx
    const color = isNow ? T.accent : done ? T.muted : T.dim
    const weight = isNow ? 700 : 500
    const dot = isNow ? T.accent : done ? T.muted : 'rgba(74,90,106,0.45)'
    return `<td align="center" style="padding:0 2px;width:20%;">
      <div style="height:3px;border-radius:2px;background:${dot};margin-bottom:9px;"></div>
      <p style="margin:0;font-size:8px;font-weight:700;letter-spacing:0.14em;color:${color};line-height:1.3;">${s.n}</p>
      <p style="margin:2px 0 0;font-size:9px;font-weight:${weight};letter-spacing:0.05em;color:${color};line-height:1.3;">${s.label}</p>
    </td>`
  }).join('')

  return `<tr>
    <td style="background:${T.surface};border-left:1px solid ${T.borderSoft};border-right:1px solid ${T.borderSoft};padding:24px 32px 26px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr>${cells}</tr></table>
    </td>
  </tr>`
}

/** Numbered "what happens next" list. */
export function stepList(steps: string[]): string {
  if (!steps.length) return ''
  const rows = steps.map((step, i) => `
    <tr><td style="padding-bottom:14px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr>
        <td width="30" style="vertical-align:top;">
          <span style="display:inline-block;width:21px;height:21px;border-radius:50%;background:${T.accentSoft};border:1px solid ${T.border};text-align:center;font-size:10px;font-weight:700;color:${T.accent};line-height:21px;">${i + 1}</span>
        </td>
        <td style="vertical-align:top;padding-top:2px;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:${T.muted};">${step}</p>
        </td>
      </tr></table>
    </td></tr>`).join('')

  return section(`
    <p style="margin:0 0 18px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${T.dim};">What happens next</p>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${rows}</table>`)
}

/** Key/value confirmation panel — appointment details, order summary, etc. */
export function detailPanel(rows: { label: string; value: string }[], title = 'Summary'): string {
  if (!rows.length) return ''
  const body = rows.map(r => `
    <tr>
      <td style="padding:7px 16px 7px 0;font-size:11px;color:${T.dim};white-space:nowrap;vertical-align:top;letter-spacing:0.04em;">${esc(r.label)}</td>
      <td style="padding:7px 0;font-size:13px;color:${T.text};font-weight:600;vertical-align:top;">${esc(r.value)}</td>
    </tr>`).join('')

  return section(`
    <div style="background:${T.surfaceAlt};border:1px solid ${T.borderSoft};border-radius:12px;padding:20px 22px;">
      <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${T.accent};">${esc(title)}</p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${body}</table>
    </div>`)
}

/** One dominant call to action. Bulletproof enough for Outlook. */
export function ctaButton(label: string, url: string): string {
  return section(`
    <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
      <tr><td align="center" style="border-radius:999px;background:${T.accent};">
        <a href="${esc(url)}" style="display:inline-block;padding:15px 38px;font-family:${T.font};font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#ffffff;text-decoration:none;border-radius:999px;">${esc(label)}</a>
      </td></tr>
    </table>`, 'center')
}

/** Quiet reassurance line — timing expectations, support routes. */
export function noteBlock(text: string): string {
  return section(`
    <div style="border-left:2px solid ${T.border};padding:2px 0 2px 16px;">
      <p style="margin:0;font-size:12px;line-height:1.7;color:${T.muted};">${text}</p>
    </div>`)
}

export function paragraphs(items: string[]): string {
  if (!items.length) return ''
  return section(items.map(p =>
    `<p style="margin:0 0 14px;font-size:14px;line-height:1.75;color:${T.muted};">${p}</p>`
  ).join(''))
}

function section(inner: string, align: 'left' | 'center' = 'left'): string {
  return `<tr><td align="${align}" style="background:${T.surface};border-left:1px solid ${T.borderSoft};border-right:1px solid ${T.borderSoft};padding:6px 32px 22px;">${inner}</td></tr>`
}

// ─── Shell ───────────────────────────────────────────────────────────────────

export interface ShellOptions {
  preheader: string
  eyebrow: string
  heading: string
  intro: string
  /** Rendered <tr> blocks from the primitives above. */
  blocks: string
  /** Marketing mail legally requires an unsubscribe path; service mail must not carry one. */
  category: 'service' | 'marketing'
  unsubscribeUrl?: string
}

export function renderShell(o: ShellOptions): string {
  const unsubscribe = o.category === 'marketing'
    ? `<p style="margin:12px 0 0;font-size:10px;line-height:1.6;color:${T.dim};">
         You're receiving this because you asked us to keep you updated.
         <a href="${esc(o.unsubscribeUrl || `${SITE}/unsubscribe`)}" style="color:${T.muted};text-decoration:underline;">Unsubscribe</a>.
       </p>`
    : `<p style="margin:12px 0 0;font-size:10px;line-height:1.6;color:${T.dim};">
         This is a service message about your care with Apex Metabolic Health.
       </p>`

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark">
<title>${esc(o.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${T.bg};font-family:${T.font};-webkit-font-smoothing:antialiased;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${esc(o.preheader)}</div>

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${T.bg};padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

  <tr><td style="padding-bottom:24px;">
    <p style="margin:0;font-size:16px;font-weight:300;letter-spacing:0.18em;color:${T.text};text-transform:uppercase;line-height:1;">APEX</p>
    <p style="margin:4px 0 0;font-size:9px;font-weight:400;letter-spacing:0.18em;color:${T.accent};text-transform:uppercase;line-height:1;">Metabolic Health</p>
  </td></tr>

  <tr><td style="background:${T.surface};border:1px solid ${T.border};border-bottom:none;border-radius:16px 16px 0 0;padding:36px 32px 26px;">
    <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${T.accent};">${esc(o.eyebrow)}</p>
    <h1 style="margin:0 0 14px;font-size:24px;font-weight:700;color:${T.text};line-height:1.28;letter-spacing:-0.01em;">${o.heading}</h1>
    <p style="margin:0;font-size:14px;line-height:1.75;color:${T.muted};">${o.intro}</p>
  </td></tr>

  ${o.blocks}

  <tr><td style="background:${T.surface};border:1px solid ${T.borderSoft};border-top:none;border-radius:0 0 16px 16px;padding:22px 32px 28px;">
    <p style="margin:0;font-size:11px;line-height:1.7;color:${T.dim};">
      Questions? Reply to this email or contact
      <a href="mailto:${SUPPORT_EMAIL}" style="color:${T.accent};text-decoration:none;">${SUPPORT_EMAIL}</a>.
    </p>
  </td></tr>

  <tr><td style="padding:24px 8px 8px;">
    <p style="margin:0;font-size:10px;line-height:1.7;color:${T.dim};">
      All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
    </p>
    ${unsubscribe}
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}
