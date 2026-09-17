'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

/** Every hotspot names tests on the Apex panel. No outcomes, no medicines. */
export const HOTSPOTS = [
  { id: 'thyroid',  label: 'Thyroid',        markers: 'TSH · Free T4 · Free T3',                 x: 50, y: 27 },
  { id: 'heart',    label: 'Heart and vessels', markers: 'Lipids · ApoB · hs-CRP',               x: 46, y: 38 },
  { id: 'liver',    label: 'Liver',          markers: 'ALT · AST · GGT',                          x: 42, y: 48 },
  { id: 'adrenal',  label: 'Adrenals',       markers: 'Cortisol · DHEA-S',                        x: 57, y: 46 },
  { id: 'metabolic',label: 'Metabolic',      markers: 'HbA1c · Fasting insulin · Glucose',        x: 52, y: 54 },
  { id: 'repro',    label: 'Reproductive',   markers: 'Testosterone · SHBG · Oestradiol · LH',    x: 50, y: 68 },
] as const

/**
 * The interactive anatomy piece. A translucent figure on a soft mesh with
 * six hotspots, each naming the panel markers for that system. The active
 * hotspot cycles on its own until the visitor hovers or taps one; the whole
 * figure breathes and leans with the cursor.
 */
export default function AnatomyFigure({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [manual, setManual] = useState(false)
  const timer = useRef<number | null>(null)
  const figX = useTransform(sx, v => v * 10)
  const figY = useTransform(sy, v => v * 10)
  const rotY = useTransform(sx, v => v * 4)
  const rotX = useTransform(sy, v => v * -4)

  useEffect(() => {
    if (manual || reduced) return
    timer.current = window.setInterval(() => setActive(a => (a + 1) % HOTSPOTS.length), 3200)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [manual, reduced])

  const pick = (i: number) => { setManual(true); setActive(i) }
  const spot = HOTSPOTS[active]
  const labelLeft = spot.x < 50

  return (
    <div className="relative" id="hero-anatomy-slot" aria-label="The systems on the Apex panel">
      <motion.div
        style={{ x: figX, y: figY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200, aspectRatio: '4 / 5' }}
        initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className="relative mesh rounded-[32px] overflow-hidden"
      >
        <div aria-hidden="true" className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.9), inset 0 -80px 120px rgba(255,255,255,0.6)' }} />

        {/* Concentric rings behind the figure. */}
        <svg aria-hidden="true" viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
          {[70, 120, 170, 220].map(r => (
            <circle key={r} cx="200" cy="230" r={r} fill="none" stroke="rgba(72,144,247,0.22)" strokeWidth="1" strokeDasharray={r > 120 ? '2 6' : undefined} />
          ))}
        </svg>

        <div className={`absolute inset-[6%] ${reduced ? '' : 'breathe'}`}>
          <Image src="/photos/anatomy.webp" alt="A translucent human figure showing the systems the Apex panel measures" fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-contain" style={{ objectPosition: '50% 50%' }} />
        </div>

        {/* Hotspots */}
        {HOTSPOTS.map((h, i) => {
          const on = i === active
          return (
            <button
              key={h.id}
              type="button"
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
              aria-label={`${h.label}: ${h.markers}`}
              aria-pressed={on}
              className="absolute w-7 h-7 -ml-3.5 -mt-3.5 rounded-full flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ left: `${h.x}%`, top: `${h.y}%`, outlineColor: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: on ? 3 : 2 }}
            >
              {on && !reduced && <span aria-hidden="true" className="hotspot-ring absolute inset-0 rounded-full" style={{ background: 'rgba(72,144,247,0.35)' }} />}
              <span aria-hidden="true" className="relative rounded-full transition-all duration-300" style={{ width: on ? 12 : 8, height: on ? 12 : 8, background: on ? 'var(--blue)' : '#fff', boxShadow: on ? '0 0 0 4px rgba(255,255,255,0.9), 0 0 24px rgba(72,144,247,0.6)' : '0 0 0 2px rgba(72,144,247,0.6)' }} />
            </button>
          )
        })}

        {/* The active label */}
        <motion.div
          key={spot.id}
          initial={reduced ? false : { opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease }}
          className="absolute glass-card pointer-events-none"
          style={{ left: labelLeft ? undefined : `${spot.x + 5}%`, right: labelLeft ? `${100 - spot.x + 5}%` : undefined, top: `${spot.y - 3}%`, padding: '10px 14px', borderRadius: 16, maxWidth: 220, zIndex: 4 }}
          aria-live="polite"
        >
          <span className="block text-[12.5px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{spot.label}</span>
          <span className="block text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--text-secondary)' }}>{spot.markers}</span>
        </motion.div>

        {/* Readout chips */}
        <div className="absolute left-5 top-5 glass-card" style={{ padding: '12px 16px', borderRadius: 18 }}>
          <span className="t-readout block" style={{ fontSize: 30, color: 'var(--text-primary)' }}>48h</span>
          <span className="t-mono block mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Results back</span>
        </div>
        <div className="absolute right-5 bottom-5 glass-card text-right" style={{ padding: '12px 16px', borderRadius: 18 }}>
          <span className="t-readout block" style={{ fontSize: 30, color: 'var(--text-primary)' }}>40+</span>
          <span className="t-mono block mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Markers read</span>
        </div>

        <p className="absolute left-5 bottom-5 m-0 t-mono" style={{ color: 'var(--text-muted)', fontSize: 9, maxWidth: 150, lineHeight: 1.5 }}>
          Illustrative figure. Markers shown are on the Apex panel.
        </p>
      </motion.div>

      {/* Hotspot index under the frame: keyboard and touch users get a list. */}
      <ul className="list-none p-0 m-0 mt-4 flex flex-wrap gap-2" aria-label="Systems on the panel">
        {HOTSPOTS.map((h, i) => (
          <li key={h.id}>
            <button type="button" onClick={() => pick(i)} className="t-mono rounded-full transition-colors duration-200" style={{ padding: '7px 11px', fontSize: 9.5, background: i === active ? 'var(--text-primary)' : 'transparent', color: i === active ? '#fff' : 'var(--text-muted)', border: `1px solid ${i === active ? 'var(--text-primary)' : 'var(--border)'}`, cursor: 'pointer' }}>
              {h.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
