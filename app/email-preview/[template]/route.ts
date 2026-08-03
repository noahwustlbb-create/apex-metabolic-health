import { isTemplateKey, renderEmail } from '@/lib/email/render'
import { SAMPLE } from '@/lib/email/sample'

export const dynamic = 'force-dynamic'

/**
 * Renders a single journey email with sample data.
 * `?format=text` shows the plain-text alternative, `?firstName=` etc. override
 * sample fields so personalisation can be spot-checked.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ template: string }> },
) {
  const { template } = await params
  if (!isTemplateKey(template)) {
    return new Response(`Unknown template: ${template}`, { status: 404 })
  }

  const url = new URL(req.url)
  const overrides = Object.fromEntries(
    [...url.searchParams.entries()].filter(([k]) => k !== 'format'),
  )
  const email = renderEmail(template, { ...SAMPLE, ...overrides })

  if (url.searchParams.get('format') === 'text') {
    return new Response(`Subject: ${email.subject}\n\n${email.text}`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    })
  }

  return new Response(email.html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  })
}
