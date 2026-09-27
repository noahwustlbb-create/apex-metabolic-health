'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * 0 → 1 progress through a section, computed from window scrollY.
 * useScroll({ target }) hands opacity to a native ScrollTimeline, whose range
 * did not match the sticky stage here (values ran backwards past halfway),
 * so the mapping is done in JS instead.
 *
 * mode 'pin'   : 0 when the section top hits the viewport top, 1 when its bottom hits the viewport bottom.
 * mode 'cross' : 0 when the section top enters at the bottom, 1 when its bottom leaves at the top.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, mode: 'pin' | 'cross' = 'pin'): MotionValue<number> {
  const { scrollY } = useScroll()
  const box = useRef({ top: 0, height: 1, vh: 1 })

  useEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      box.current = { top: r.top + window.scrollY, height: el.offsetHeight, vh: window.innerHeight }
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (ref.current) ro.observe(ref.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [ref])

  return useTransform(scrollY, y => {
    const { top, height, vh } = box.current
    const start = mode === 'pin' ? top : top - vh
    const span = mode === 'pin' ? Math.max(1, height - vh) : height + vh
    return Math.min(1, Math.max(0, (y - start) / span))
  })
}
