'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export type Sex = 'male' | 'female'

type Hotspot = {
  id: string
  label: string
  /** Tests on the Apex panel. Names of tests only, never medicines or outcomes. */
  markers: string
  /** Women's panel differs for some systems (full thyroid, iron, vitamin D). */
  femaleMarkers?: string
  /** One line on what the markers describe. */
  tells: string
  /** The pathway that reads these markers first. */
  protocol: { code: string; name: string; href: string }
  x: number
  y: number
}

// One hotspot per protocol, placed where the body tells the story. Test
// names only, never medicines or outcomes.
const SHARED: Omit<Hotspot, 'x' | 'y'>[] = [
  { id: 'brain',     label: 'Brain and pituitary', markers: 'LH · FSH · Prolactin · IGF-1 · Cortisol', femaleMarkers: 'LH · FSH · Prolactin · Cortisol',                  tells: 'The signals that drive the rest of the hormone system, and how you age.', protocol: { code: 'APX-05', name: 'Anti-Ageing and Longevity', href: '/programs/longevity' } },
  { id: 'hair',      label: 'Scalp and hair',      markers: 'Testosterone · SHBG · DHEA-S · TSH', femaleMarkers: 'Testosterone · SHBG · DHEA-S · Iron studies · Thyroid',              tells: 'The four markers behind thinning and shedding.',                        protocol: { code: 'APX-07', name: 'Hair Restoration', href: '/programs/hair-restoration' } },
  { id: 'skin',      label: 'Skin',                markers: 'Cortisol · DHEA-S · hs-CRP', femaleMarkers: 'Cortisol · DHEA-S · hs-CRP · Vitamin D', tells: 'Stress, inflammation and the nutrients skin repairs with.',             protocol: { code: 'APX-06', name: 'Skin Regeneration', href: '/programs/skin-regeneration' } },
  { id: 'thyroid',   label: 'Thyroid',             markers: 'TSH', femaleMarkers: 'TSH · Free T4 · Free T3',                      tells: 'Energy, temperature, weight and mood set-point.',                       protocol: { code: 'APX-02', name: 'Medical Weight Loss', href: '/programs/metabolic-weight-loss' } },
  { id: 'heart',     label: 'Heart and vessels',   markers: 'Cholesterol · Triglycerides · hs-CRP · Full blood count', femaleMarkers: 'Cholesterol · Triglycerides · hs-CRP · Full blood count',    tells: 'Cardiovascular risk, oxygen carrying and background inflammation.',     protocol: { code: 'APX-09', name: 'Comprehensive Blood Tests', href: '/programs/pathology' } },
  { id: 'muscle',    label: 'Muscle and recovery', markers: 'Testosterone · IGF-1 · Growth hormone · Cortisol', femaleMarkers: 'Testosterone · SHBG · Cortisol · Iron studies', tells: 'Output, recovery between sessions and body composition.',           protocol: { code: 'APX-08', name: 'Performance Plus', href: '/programs/performance-plus' } },
  { id: 'liver',     label: 'Liver and kidneys',   markers: 'Liver function · Kidney function · Electrolytes', femaleMarkers: 'Liver function · Kidney function · Electrolytes · Lipase',        tells: 'How the body is coping with load, and what is safe to prescribe.',      protocol: { code: 'APX-09', name: 'Comprehensive Blood Tests', href: '/programs/pathology' } },
  { id: 'metabolic', label: 'Metabolic',           markers: 'Glucose · Cholesterol · Triglycerides · Uric acid', femaleMarkers: 'Glucose · HbA1c · Cholesterol · Triglycerides', tells: 'Blood sugar control, insulin resistance and where weight sits.',      protocol: { code: 'APX-02', name: 'Medical Weight Loss', href: '/programs/metabolic-weight-loss' } },
  { id: 'joint',     label: 'Joints and tissue',   markers: 'hs-CRP · Full blood count · Uric acid', femaleMarkers: 'hs-CRP · Vitamin D · Full blood count', tells: 'Inflammation and the repair signals after injury.',                    protocol: { code: 'APX-04', name: 'Recovery and Injury Repair', href: '/programs/injury-repair' } },
]

const MALE_REPRO: Omit<Hotspot, 'x' | 'y'>[] = [
  { id: 'repro',  label: 'Reproductive',  markers: 'Total and free testosterone · SHBG · Oestradiol · PSA', tells: 'Drive, muscle, mood and recovery.',            protocol: { code: 'APX-01', name: 'Hormone Optimisation', href: '/programs/hormone-optimisation' } },
  { id: 'sexual', label: 'Sexual health', markers: 'Testosterone · Prolactin · Oestradiol · Cholesterol',            tells: 'The hormonal and vascular side of performance.', protocol: { code: 'APX-03', name: 'Sexual Health', href: '/programs/sexual-health' } },
]
const FEMALE_REPRO: Omit<Hotspot, 'x' | 'y'>[] = [
  { id: 'repro',  label: 'Reproductive',  markers: 'Oestradiol · Progesterone · FSH · LH · Testosterone', tells: 'Cycle, energy, mood and body composition.',      protocol: { code: 'APX-01', name: 'Hormone Optimisation', href: '/programs/hormone-optimisation' } },
  { id: 'sexual', label: 'Sexual health', markers: 'Oestradiol · Testosterone · Prolactin · TSH',     tells: 'Libido, comfort and the hormones behind both.',  protocol: { code: 'APX-03', name: 'Sexual Health', href: '/programs/sexual-health' } },
]

/** Positions are percentages of the frame, tuned to each figure. */
const POS: Record<Sex, Record<string, [number, number]>> = {
  male:   { brain: [50, 11], hair: [50, 5], skin: [56, 16], thyroid: [50, 27], heart: [52, 38], muscle: [33, 34], liver: [43, 48], metabolic: [49, 55], joint: [68, 44], repro: [50, 73], sexual: [50, 80] },
  female: { brain: [50, 11], hair: [50, 5], skin: [56, 16], thyroid: [50, 27], heart: [52, 38], muscle: [34, 34], liver: [43, 48], metabolic: [49, 55], joint: [67, 44], repro: [50, 63], sexual: [50, 72] },
}

export function hotspotsFor(sex: Sex): Hotspot[] {
  const list = [...SHARED.map(h => sex === 'female' && h.femaleMarkers ? { ...h, markers: h.femaleMarkers } : h), ...(sex === 'male' ? MALE_REPRO : FEMALE_REPRO)]
  return list.map(h => ({ ...h, x: POS[sex][h.id][0], y: POS[sex][h.id][1] }))
}

const FIGURE: Record<Sex, { src: string; alt: string }> = {
  male:   { src: '/photos/anatomy.webp',        alt: 'A translucent male figure showing the systems the Apex panel measures' },
  female: { src: '/photos/anatomy-female.webp', alt: 'A translucent female figure showing the systems the Apex panel measures' },
}

/**
 * The interactive anatomy piece. A translucent figure on a soft mesh with a
 * hotspot per system. Each hotspot names the panel markers for that system,
 * what they describe, and the protocol that reads them first, with a link.
 * Men and women each get their own figure and reproductive markers. The
 * active hotspot cycles on its own until the visitor touches one.
 */
export default function AnatomyFigure({ sx, sy }: { sx: MotionValue<number>; sy: MotionValue<number> }) {
  const reduced = useReducedMotion()
  const [sex, setSex] = useState<Sex>('male')
  // Nothing is selected until the visitor picks. A preselected hotspot meant
  // the label card covered the figure on load, which on a phone is most of the
  // viewport.
  const [active, setActive] = useState<number | null>(null)
  const [manual, setManual] = useState(false)
  const timer = useRef<number | null>(null)
  const spots = hotspotsFor(sex)
  const figX = useTransform(sx, v => v * 10)
  const figY = useTransform(sy, v => v * 10)
  const rotY = useTransform(sx, v => v * 4)
  const rotX = useTransform(sy, v => v * -4)

  // The carousel is desktop-only, and only once the visitor has looked at it.
  // It used to run everywhere from load, which on touch fought the user for the
  // screen. It never starts until a hotspot has been opened at least once.
  useEffect(() => {
    if (manual || reduced || active === null) return
    if (!window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) return
    timer.current = window.setInterval(() => setActive(a => (a === null ? 0 : (a + 1) % spots.length)), 3400)
    return () => { if (timer.current) window.clearInterval(timer.current) }
  }, [manual, reduced, spots.length, active])

  const pick = (i: number) => { setManual(true); setActive(i) }
  const spot = active === null ? null : spots[active]
  // The card sits on whichever side has room; never past the frame edge.
  const labelLeft = spot ? spot.x >= 46 : false

  return (
    <div className="relative" id="hero-anatomy-slot" aria-label="The systems on the Apex panel">
      <motion.div
        style={{ x: figX, y: figY, rotateX: rotX, rotateY: rotY, transformPerspective: 1200, aspectRatio: '4 / 5' }}
        initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
        className={`relative ${sex === 'female' ? 'mesh-rose' : 'mesh'} rounded-[32px] overflow-hidden`}
      >
        <div aria-hidden="true" className="absolute inset-0" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.9), inset 0 -80px 120px rgba(255,255,255,0.6)' }} />

        <svg aria-hidden="true" viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
          {[70, 120, 170, 220].map(r => (
            <circle key={r} cx="200" cy="230" r={r} fill="none" stroke="rgba(72,144,247,0.22)" strokeWidth="1" strokeDasharray={r > 120 ? '2 6' : undefined} />
          ))}
        </svg>

        {/* The figure. Both are mounted so the toggle is instant; only one is visible. */}
        {(['male', 'female'] as Sex[]).map(s => (
          <motion.div key={s} className={`absolute inset-[6%] ${reduced ? '' : 'breathe'}`} initial={false} animate={{ opacity: s === sex ? 1 : 0, scale: s === sex ? 1 : 0.98 }} transition={{ duration: 0.5, ease }} style={{ pointerEvents: 'none' }}>
            <Image src={FIGURE[s].src} alt={s === sex ? FIGURE[s].alt : ''} fill priority={s === 'male'} sizes="(min-width: 1024px) 520px, 100vw" className="object-contain" />
          </motion.div>
        ))}

        {/* Hotspots */}
        {spots.map((h, i) => {
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
              style={{ left: `${h.x}%`, top: `${h.y}%`, outlineColor: 'var(--blue)', background: 'transparent', border: 'none', cursor: 'pointer', zIndex: on ? 3 : 2, transition: 'left 0.5s ease, top 0.5s ease' }}
            >
              {on && !reduced && <span aria-hidden="true" className="hotspot-ring absolute inset-0 rounded-full" style={{ background: 'rgba(72,144,247,0.35)' }} />}
              <span aria-hidden="true" className="relative rounded-full transition-all duration-300" style={{ width: on ? 12 : 8, height: on ? 12 : 8, background: on ? 'var(--blue)' : '#fff', boxShadow: on ? '0 0 0 4px rgba(255,255,255,0.9), 0 0 24px rgba(72,144,247,0.6)' : '0 0 0 2px rgba(72,144,247,0.6)' }} />
            </button>
          )
        })}

        {/* The active label: markers, what they tell you, and the protocol CTA.
            Renders only once the visitor has opened a hotspot - on a phone this
            card is most of the frame, so nothing should open it for them. */}
        {spot && (
        <motion.div
          key={`${sex}-${spot.id}`}
          initial={reduced ? false : { opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease }}
          className="absolute glass-card"
          style={{ left: labelLeft ? undefined : `${Math.min(spot.x + 5, 52)}%`, right: labelLeft ? `${Math.min(100 - spot.x + 4, 52)}%` : undefined, top: `${Math.min(Math.max(spot.y - 4, 16), 62)}%`, padding: '12px 14px 12px', borderRadius: 18, width: 236, maxWidth: '46%', zIndex: 4 }}
          aria-live="polite"
        >
          <span className="block text-[13px] font-semibold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{spot.label}</span>
          <span className="block text-[11px] mt-0.5 leading-snug" style={{ color: 'var(--text-secondary)' }}>{spot.markers}</span>
          <span className="block text-[11px] mt-1.5 leading-snug" style={{ color: 'var(--text-muted)' }}>{spot.tells}</span>
          <Link href={spot.protocol.href} className="mt-2.5 inline-flex items-center gap-1.5 no-underline text-[11.5px] font-semibold rounded-full" style={{ padding: '7px 11px', background: 'var(--text-primary)', color: '#fff' }}>
            <span className="t-mono" style={{ fontSize: 8.5, opacity: 0.7 }}>{spot.protocol.code}</span>
            {spot.protocol.name}
            <svg viewBox="0 0 16 16" fill="none" width={11} height={11} aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </motion.div>
        )}

        {/* Sex toggle */}
        <div className="absolute right-5 top-5 glass-card flex" style={{ padding: 4, borderRadius: 999 }} role="group" aria-label="Show figure for">
          {(['male', 'female'] as Sex[]).map(s => (
            <button key={s} type="button" onClick={() => { setSex(s); setManual(true) }} aria-pressed={sex === s} className="t-mono rounded-full transition-colors duration-200" style={{ padding: '7px 12px', fontSize: 9.5, background: sex === s ? 'var(--text-primary)' : 'transparent', color: sex === s ? '#fff' : 'var(--text-muted)', border: 'none', cursor: 'pointer' }}>
              {s === 'male' ? 'Men' : 'Women'}
            </button>
          ))}
        </div>

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

      <ul className="list-none p-0 m-0 mt-4 flex flex-wrap gap-2" aria-label="Systems on the panel">
        {spots.map((h, i) => (
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
