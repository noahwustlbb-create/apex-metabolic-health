'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The BioTrack tick dial: 24 ticks light to the value while the number counts
 * up over the same 1.1 s. Mirrors the portal's TickGauge. `delay` lets the
 * hero wait for its headline to land first.
 */
export default function TickGauge({ value, max = 100, label, delay = 0, size = 112 }: {
  value: number; max?: number; label?: string; delay?: number; size?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); setShown(value); return }
    let raf = 0, t0 = 0, timer = 0
    const run = (t: number) => {
      if (!t0) t0 = t
      const p = Math.min(1, (t - t0) / 1100)
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(run)
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      timer = window.setTimeout(() => { setOn(true); raf = requestAnimationFrame(run) }, delay)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [value, delay])

  const N = 24
  // Fixed precision: server and browser trig differ in the last digits,
  // which React reports as a hydration mismatch.
  const r3 = (n: number) => Math.round(n * 1000) / 1000
  const lit = Math.round((Math.max(0, Math.min(max, value)) / max) * N)
  const cx = 60, cy = 58, r1 = 44, r2 = 54
  return (
    <div ref={ref} className="tg" style={{ width: size }}>
      <svg viewBox="0 0 120 66" aria-hidden="true">
        {Array.from({ length: N }, (_, i) => {
          const a = Math.PI - (i / (N - 1)) * Math.PI
          const isLit = i < lit
          return (
            <line key={i}
              x1={r3(cx + r1 * Math.cos(a))} y1={r3(cy - r1 * Math.sin(a))} x2={r3(cx + r2 * Math.cos(a))} y2={r3(cy - r2 * Math.sin(a))}
              strokeWidth="3.4" strokeLinecap="round" stroke={isLit ? 'var(--stage-blue)' : 'currentColor'}
              style={{ opacity: isLit && on ? 1 : 0.16, transition: `opacity 180ms ease ${Math.round(i * (1100 / N))}ms` }} />
          )
        })}
      </svg>
      <span className="tg-v stage-readout">{shown}</span>
      {label && <span className="tg-l">{label}</span>}
    </div>
  )
}
