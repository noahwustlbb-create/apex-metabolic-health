'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { START_HREF } from '@/lib/portal'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Phone sticky bar for the inner pages. While the hero's own "Create your
 * free account" is on screen the bar carries only the phone number, so the
 * first screen never shows two Start buttons (same rule as home).
 */
export default function InnerStickyBar() {
  const [heroCta, setHeroCta] = useState(true)
  useEffect(() => {
    const el = document.querySelector('.ip-hero-row, [data-hero-cta]')
    if (!el || !('IntersectionObserver' in window)) { setHeroCta(false); return }
    const io = new IntersectionObserver(es => setHeroCta(es.some(e => e.isIntersecting)))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="al-page-bar" role="region" aria-label="Quick actions" data-hero={heroCta || undefined}>
      <Link href={START_HREF} className="al-page-bar-start" aria-hidden={heroCta || undefined} tabIndex={heroCta ? -1 : undefined}>Create your free account</Link>
      <a href={`tel:${CLINIC_PHONE_E164}`} className="al-page-bar-call" aria-label={`Call ${CLINIC_PHONE_DISPLAY}`}>{CLINIC_PHONE_DISPLAY}</a>
    </div>
  )
}
