'use client'

import { useEffect, useRef } from 'react'
import type { FounderNote as Note } from '@/lib/founder'

/**
 * The co-founder card (lib/founder.ts): a dark photo card with a mono kicker,
 * the wordmark, one quote and a ticked name line. AlgoRx founder card layout.
 *
 * Micro interactions, once, when the card scrolls in: the card rises, the photo
 * settles from a slight zoom, the lines follow 60ms apart and the tick draws.
 * Without JS, or before it loads, the card is simply visible. If it is already
 * on screen when this mounts, the entrance is skipped. Reduced motion: no movement.
 */
export default function FounderNote({ note }: { note: Note }) {
  const card = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = card.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute('data-in', '')
    el.setAttribute('data-live', '')
    if (el.hasAttribute('data-in')) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          el.setAttribute('data-in', '')
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure ref={card} className="al-fnd-card">
      {/* Mood landscape, decorative: the words carry the card. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="al-fnd-bg" src="/photos/ridge-dawn.webp" alt="" width={1920} height={826} loading="lazy" decoding="async" />
      <div className="al-fnd-top">
        <span className="al-k">{note.role}</span>
        <span className="al-fnd-brand" aria-hidden="true">Apex</span>
      </div>
      <blockquote className="al-fnd-q">
        <p>“{note.quote}”</p>
      </blockquote>
      <figcaption className="al-k al-fnd-by">
        <span>{note.name}</span>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 8.5l3.5 3.5 7.5-8" pathLength={1} />
        </svg>
        <span>{note.role}</span>
      </figcaption>
    </figure>
  )
}
