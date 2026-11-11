'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Phone sticky bar. While the hero's own "Start your assessment" is on screen
 * the bar carries only the phone number, so the first screen never shows two
 * Start buttons (fix 2, 11 Nov 2026). Server render assumes the hero is in view.
 */
export default function HomeStickyBar() {
  const [heroCta, setHeroCta] = useState(true)
  useEffect(() => {
    const el = document.querySelector('.hx-actions')
    if (!el || !('IntersectionObserver' in window)) { setHeroCta(false); return }
    const io = new IntersectionObserver(es => setHeroCta(es.some(e => e.isIntersecting)))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="hsb" role="region" aria-label="Quick actions" data-hero={heroCta || undefined}>
      <Link href="/start" className="hsb-start" aria-hidden={heroCta || undefined} tabIndex={heroCta ? -1 : undefined}>Start your assessment</Link>
      <a href={`tel:${CLINIC_PHONE_E164}`} className="hsb-call" aria-label={`Call ${CLINIC_PHONE_DISPLAY}`}>{CLINIC_PHONE_DISPLAY}</a>
    </div>
  )
}
