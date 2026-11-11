// Every "start" on the site goes to account creation, never the quiz (Noah, 12 Nov 2026).
// The site /signup page captures the email, then hands off to the portal, which
// creates the account and lands the patient where the button promised.
export const PORTAL_ORIGIN = 'https://app.apexmetabolichealth.com.au'
export const PORTAL_SIGNUP = `${PORTAL_ORIGIN}/signup`

const viaSignup = (next?: 'order' | 'membership') =>
  next ? `/signup?redirect=${encodeURIComponent(`${PORTAL_SIGNUP}?next=${next}`)}` : '/signup'

/** Create an account (no destination beyond the portal dashboard). */
export const START_HREF = viaSignup()
/** Create an account, then the portal's Order Blood Tests tab. */
export const PORTAL_ORDER_BLOODS = viaSignup('order')
/** Create an account, then the portal membership page. */
export const PORTAL_MEMBERSHIP = viaSignup('membership')

/** Only the portal or a same-site path may be a signup redirect target. */
export function safeSignupRedirect(raw: string | null): string {
  if (!raw || /[\x00-\x1f\x7f\\]/.test(raw)) return PORTAL_SIGNUP
  try {
    const here = typeof window !== 'undefined' ? window.location.origin : 'https://www.apexmetabolichealth.com.au'
    const u = new URL(raw, here)
    if (u.origin === here) return u.pathname + u.search + u.hash
    if (u.origin === PORTAL_ORIGIN) return u.toString()
  } catch { /* not a URL */ }
  return PORTAL_SIGNUP
}
