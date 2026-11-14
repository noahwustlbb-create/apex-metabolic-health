'use client'

import { useEffect, useRef } from 'react'

/**
 * Micro interactions for a row of How It Works steps (Noah, 15 Nov 2026:
 * "micro interactions for the steps in boxes ... details are everything").
 * Rendered straight after the <ol className="ip-steps">, which stays server
 * markup; this only adds behaviour to it and draws the progress rail.
 *
 *  - Entrance, once: the boxes rise in with a 60ms stagger and each icon draws.
 *  - Phones: the box you are on lights up, the others sit back, and the rail
 *    and "02 / 04" counter follow the swipe.
 *  - Desktop gets a hover focus in CSS only (styles/inner.css).
 *
 * Without JS, or before it loads, every box is simply visible. If the row is
 * already on screen when this mounts, it skips the entrance instead of hiding
 * what the visitor is looking at. Reduced motion: no movement, no draw.
 */
export default function StepRail({ count }: { count: number }) {
  const rail = useRef<HTMLDivElement>(null)
  const fill = useRef<HTMLSpanElement>(null)
  const num = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const list = rail.current?.previousElementSibling as HTMLElement | null
    if (!list || !list.classList.contains('ip-steps')) return
    const items = Array.from(list.children) as HTMLElement[]
    if (!items.length) return

    // Normalise every icon stroke to length 1 so one CSS rule can draw them all.
    list.querySelectorAll('.ip-step-ic svg *').forEach(el => el.setAttribute('pathLength', '1'))

    const r = list.getBoundingClientRect()
    const onScreen = r.top < window.innerHeight * 0.9 && r.bottom > 0
    if (onScreen) list.setAttribute('data-in', '')
    list.setAttribute('data-live', '')

    let io: IntersectionObserver | undefined
    if (!onScreen) {
      io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) {
          list.setAttribute('data-in', '')
          io?.disconnect()
        }
      }, { threshold: 0.2 })
      io.observe(list)
    }

    let frame = 0
    let active = -1
    const sync = () => {
      frame = 0
      const max = list.scrollWidth - list.clientWidth
      if (max <= 1) return // desktop: nothing to scroll, the rail is hidden in CSS
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : list.clientWidth
      const at = Math.min(items.length - 1, Math.max(0, Math.round(list.scrollLeft / step)))
      // The last box can never reach the left gutter, so the end of the scroll counts as the last step.
      const i = list.scrollLeft >= max - 2 ? items.length - 1 : at
      if (fill.current) {
        const p = Math.min(1, Math.max(0, list.scrollLeft / max))
        fill.current.style.transform = `scaleX(${(1 / items.length + (1 - 1 / items.length) * p).toFixed(4)})`
      }
      if (i !== active) {
        active = i
        items.forEach((li, n) => li.toggleAttribute('data-active', n === i))
        if (num.current) num.current.textContent = String(i + 1).padStart(2, '0')
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync) }
    sync()
    list.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io?.disconnect()
      if (frame) cancelAnimationFrame(frame)
      list.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div ref={rail} className="ip-rail" aria-hidden="true">
      <span className="ip-rail-track"><span ref={fill} className="ip-rail-fill" style={{ transform: `scaleX(${(1 / count).toFixed(4)})` }} /></span>
      <span className="ip-rail-n"><span ref={num}>01</span> / {String(count).padStart(2, '0')}</span>
    </div>
  )
}
