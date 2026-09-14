// Product analytics (PostHog, project "Apex Production").
//
// Privacy boundary: events carry routing context only (which form, which
// step). Never pass names, emails, phone numbers, DOB, Medicare numbers or
// questionnaire answers. Visitors stay anonymous on the public site.
import posthog from 'posthog-js'

export const POSTHOG_KEY = 'phc_udcwRxWEZTSTD7Mo7KoZFAugMKzb4bdtgSrBhRAbYVGt'

const KEPT_PARAMS = /^(utm_[a-z]+|gclid|gbraid|wbraid|fbclid|msclkid|ref)$/i

/** Drop every query param except campaign attribution, so no email or token in a URL is stored. */
export function sanitizeUrl(value: unknown): unknown {
  if (typeof value !== 'string' || !value.includes('?')) return value
  try {
    const url = new URL(value)
    for (const key of Array.from(url.searchParams.keys())) {
      if (!KEPT_PARAMS.test(key)) url.searchParams.delete(key)
    }
    return url.toString()
  } catch {
    return value.split('?')[0]
  }
}

type Props = Record<string, string | number | boolean | undefined>

export function track(event: string, props?: Props) {
  try {
    if (posthog.__loaded) posthog.capture(event, props)
  } catch {
    /* analytics must never break a form */
  }
}
