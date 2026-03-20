const REFERRAL_KEY = 'apex_ref'

export function captureReferral(): void {
  if (typeof window === 'undefined') return
  try {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      localStorage.setItem(REFERRAL_KEY, ref.toUpperCase().trim())
    }
  } catch {}
}

export function getReferral(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(REFERRAL_KEY)
  } catch {
    return null
  }
}
