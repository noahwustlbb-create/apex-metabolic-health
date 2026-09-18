// Ad attribution that survives the walk from the site to the portal.
//
// The problem this solves: Google Ads reports clicks and form fills. It cannot
// tell you which ad produced a *patient*, because the patient is created in the
// portal — a different app on a different domain — and the click id never gets
// there. Without it, Smart Bidding optimises toward whatever it can see, which
// is how the account ended up buying page views at $28.69 each.
//
// Two jobs:
//
//   1. Capture the click id on arrival and keep it. First touch wins: if
//      someone arrives on a Search ad, reads for a week, then returns via a
//      brand search, the Search ad earned that patient.
//   2. Put it on every link that hands off to the portal, so signup can store
//      it against the account. That stored id is what gets uploaded back to
//      Google later as an offline conversion, valued at what the patient is
//      actually worth.
//
// Privacy: click ids and campaign names only. Never a name, email, or anything
// clinical — the same boundary lib/analytics.ts holds.

const STORAGE_KEY = 'apex_attribution'
const PORTAL_HOST = 'app.apexmetabolichealth.com.au'

/** Google, Microsoft and Meta click ids, plus the standard campaign set. */
const TRACKED = [
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'matchtype', 'device', 'ref',
] as const

/** Google's click ids carry a 90-day conversion window; match it. */
const TTL_DAYS = 90
const DAY = 86400000

export interface Attribution {
  params: Record<string, string>
  /** When this was first captured, ISO. */
  at: string
}

function read(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Attribution
    if (!parsed?.at || !parsed.params) return null
    if (Date.now() - Date.parse(parsed.at) > TTL_DAYS * DAY) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    // Private windows and blocked storage throw. Attribution is never worth
    // breaking a page over.
    return null
  }
}

function write(params: Record<string, string>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ params, at: new Date().toISOString() }))
  } catch {
    /* ignore */
  }
}

/** What is on the current URL, filtered to the tracked set. */
function fromUrl(search: string): Record<string, string> {
  const found: Record<string, string> = {}
  const q = new URLSearchParams(search)
  for (const key of TRACKED) {
    const value = q.get(key)
    // Google substitutes an empty string when a ValueTrack param does not
    // apply, so blank is not a value.
    if (value && value.trim()) found[key] = value.trim().slice(0, 200)
  }
  return found
}

/**
 * Capture on arrival. First touch wins: an existing record is never
 * overwritten, only filled in where it was blank.
 */
export function captureAttribution(search: string = window.location.search): Attribution | null {
  const incoming = fromUrl(search)
  const existing = read()

  if (!Object.keys(incoming).length) return existing
  if (!existing) {
    write(incoming)
    return read()
  }

  // Keep the original click, but let a later visit fill gaps it never had.
  const merged = { ...incoming, ...existing.params }
  if (JSON.stringify(merged) !== JSON.stringify(existing.params)) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ params: merged, at: existing.at }))
    } catch {
      /* ignore */
    }
  }
  return read()
}

/** Append the stored attribution to a portal URL, without clobbering existing params. */
export function decorateUrl(href: string, attribution: Attribution | null = read()): string {
  if (!attribution) return href
  try {
    const url = new URL(href, window.location.origin)
    if (url.hostname !== PORTAL_HOST) return href
    for (const [key, value] of Object.entries(attribution.params)) {
      if (!url.searchParams.has(key)) url.searchParams.set(key, value)
    }
    // Lets the portal record how old the click is without a second lookup.
    if (!url.searchParams.has('click_at')) url.searchParams.set('click_at', attribution.at)
    return url.toString()
  } catch {
    return href
  }
}

/**
 * Rewrite every portal link on the page.
 *
 * Done at runtime rather than at 78 call sites: the links are spread across
 * the whole site, and a link added tomorrow gets this for free. Re-runs on
 * navigation because the site is a single-page app after first load.
 */
export function decoratePortalLinks(root: ParentNode = document): number {
  const attribution = read()
  if (!attribution) return 0
  let touched = 0
  for (const anchor of Array.from(root.querySelectorAll<HTMLAnchorElement>(`a[href*="${PORTAL_HOST}"]`))) {
    const next = decorateUrl(anchor.href, attribution)
    if (next !== anchor.href) {
      anchor.href = next
      touched++
    }
  }
  return touched
}

/** Capture on load, then keep links decorated as the app renders and navigates. */
export function startAttribution(): void {
  if (typeof window === 'undefined') return
  captureAttribution()
  const run = () => decoratePortalLinks()
  run()
  // Client-side navigation and lazily rendered sections both add links after
  // first paint, so watch rather than running once.
  try {
    const observer = new MutationObserver(() => run())
    observer.observe(document.body, { childList: true, subtree: true })
  } catch {
    document.addEventListener('DOMContentLoaded', run)
  }
}
