'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth scrolling. Native scroll position still updates, so every
 * framer-motion useScroll on the page keeps working; the wheel just eases.
 * Off for reduced-motion and for touch, where the OS scroll is already right.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    // In-page anchors go through Lenis so they ease instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href')!.slice(1)
      const el = id && document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -72, duration: 1.2 })
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy() }
  }, [])
  return null
}
