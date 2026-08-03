import {
  ctaButton, detailPanel, noteBlock, paragraphs, progressBar, renderShell, stepList,
} from './shell'
import { TEMPLATES, type EmailData } from './templates'

export interface RenderedEmail {
  subject: string
  html: string
  text: string
  category: 'service' | 'marketing'
}

export function isTemplateKey(key: string): boolean {
  return Object.prototype.hasOwnProperty.call(TEMPLATES, key)
}

export function templateKeys(): string[] {
  return Object.keys(TEMPLATES)
}

/**
 * Render one journey email. Block order is fixed on purpose — every email in
 * the system reads the same way, so patients learn where to look:
 *   progress → confirmation → context → next steps → one CTA → reassurance.
 */
export function renderEmail(key: string, data: EmailData = {}): RenderedEmail {
  const t = TEMPLATES[key]
  if (!t) throw new Error(`Unknown email template: ${key}`)

  const details = t.details?.(data) ?? []
  const body = t.body?.(data) ?? []
  const steps = t.steps?.(data) ?? []
  const cta = t.cta?.(data) ?? null
  const note = t.note?.(data) ?? ''

  const blocks = [
    progressBar(t.stage),
    details.length ? detailPanel(details, t.detailsTitle ?? 'Summary') : '',
    body.length ? paragraphs(body) : '',
    steps.length ? stepList(steps) : '',
    cta ? ctaButton(cta.label, cta.url) : '',
    note ? noteBlock(note) : '',
  ].join('')

  const html = renderShell({
    preheader: t.preheader(data),
    eyebrow: t.eyebrow,
    heading: t.heading(data),
    intro: t.intro(data),
    blocks,
    category: t.category,
  })

  return { subject: t.subject(data), html, text: buildText(key, data), category: t.category }
}

/** Plain-text alternative. Improves deliverability and covers text-only clients. */
function buildText(key: string, data: EmailData): string {
  const t = TEMPLATES[key]
  const strip = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const lines: string[] = ['APEX METABOLIC HEALTH', '', strip(t.heading(data)), '', strip(t.intro(data))]

  const details = t.details?.(data) ?? []
  if (details.length) {
    lines.push('', (t.detailsTitle ?? 'Summary').toUpperCase())
    details.forEach(r => lines.push(`  ${r.label}: ${r.value}`))
  }

  const body = t.body?.(data) ?? []
  if (body.length) lines.push('', ...body.map(strip))

  const steps = t.steps?.(data) ?? []
  if (steps.length) {
    lines.push('', 'WHAT HAPPENS NEXT')
    steps.forEach((s, i) => lines.push(`  ${i + 1}. ${strip(s)}`))
  }

  const cta = t.cta?.(data) ?? null
  if (cta) lines.push('', `${cta.label}: ${cta.url}`)

  const note = t.note?.(data) ?? ''
  if (note) lines.push('', strip(note))

  lines.push(
    '', '---',
    'Questions? Reply to this email or contact admin@apexmetabolichealth.com.au',
    'All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.',
  )
  return lines.join('\n')
}
