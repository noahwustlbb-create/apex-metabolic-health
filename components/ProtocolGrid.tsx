'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'

/**
 * Choose your protocol.
 *
 * A bento of every pathway. Two cards are open at rest; hovering or focusing
 * any card makes it the feature and folds the rest to compact rows. Every
 * card is a real link, so keyboard and touch users lose nothing: on a phone
 * the grid is one column of compact rows and a tap navigates.
 *
 * Card anatomy (compact): index top-left, thumbnail top-right, name and a
 * short line of what the pathway covers. Featured: full-bleed texture, colour
 * dot top-left, name and code bottom-left.
 *
 * Imagery: one macro texture per pathway, generated for Apex (Higgsfield
 * Soul 2.0), served from /public/protocols. No stock, no people, no faces.
 */

const ease = [0.22, 1, 0.36, 1] as const

export type Protocol = {
  id: string
  code: string
  label: string
  sub: string
  href: string
  image: string
  /** Category colour, shown as the dot on the feature. */
  swatch: string
  /** Fixed column on the 3-column grid so featuring a card never moves another card under the cursor. */
  col: 1 | 2 | 3
  tag?: string
}

export const PROTOCOLS: Protocol[] = [
  { id: 'hormone',     col: 1, code: 'APX-01', label: 'Hormone Optimisation',       sub: 'Energy · Drive · Recovery',          href: '/programs/hormone-optimisation',  image: '/protocols/hormone.jpg',     swatch: '#c9962a', tag: 'Most chosen' },
  { id: 'weight',      col: 2, code: 'APX-02', label: 'Medical Weight Loss',        sub: 'Doctor-led metabolic reset',         href: '/programs/metabolic-weight-loss', image: '/protocols/weight.jpg',      swatch: '#3b82f6' },
  { id: 'sexual',      col: 3, code: 'APX-03', label: 'Sexual Health',              sub: 'Private · Confidential · Discreet',  href: '/programs/sexual-health',         image: '/protocols/sexual.jpg',      swatch: '#9f1239' },
  { id: 'recovery',    col: 1, code: 'APX-04', label: 'Recovery and Injury Repair', sub: 'Performance · Rehab · Mobility',     href: '/programs/injury-repair',         image: '/protocols/recovery.jpg',    swatch: '#475569' },
  { id: 'longevity',   col: 2, code: 'APX-05', label: 'Anti-Ageing and Longevity',  sub: 'Healthspan · Vitality · Prevention', href: '/programs/longevity',             image: '/protocols/longevity.jpg',   swatch: '#8b5cf6', tag: 'New' },
  { id: 'skin',        col: 3, code: 'APX-06', label: 'Skin Regeneration',          sub: 'Cortisol · DHEA-S · Inflammation',   href: '/programs/skin-regeneration',     image: '/protocols/skin.jpg',        swatch: '#d4a5a5' },
  { id: 'hair',        col: 3, code: 'APX-07', label: 'Hair Restoration',           sub: 'DHT · SHBG · Ferritin · Thyroid',    href: '/programs/hair-restoration',      image: '/protocols/hair.jpg',        swatch: '#0f766e' },
  { id: 'performance', col: 1, code: 'APX-08', label: 'Performance Plus',           sub: 'Output · Recovery · Composition',    href: '/programs/performance-plus',      image: '/protocols/performance.jpg', swatch: '#e2e8f0' },
  { id: 'bloods',      col: 2, code: 'APX-09', label: 'Comprehensive Blood Tests',  sub: 'Full panel · Doctor reviewed',       href: '/programs/pathology',             image: '/protocols/bloods.jpg',      swatch: '#b91c1c' },
]

const REST_FEATURED = new Set(['hormone', 'longevity'])
const ROW = 84

const MONO = { fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.08em' } as const

function useCanHover() {
  const [can, setCan] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (min-width: 768px)')
    const update = () => setCan(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return can
}

export default function ProtocolGrid() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const canHover = useCanHover()
  const [active, setActive] = useState<string | null>(null)

  const isFeatured = useCallback((id: string) => {
    if (!canHover) return false
    return active ? active === id : REST_FEATURED.has(id)
  }, [active, canHover])

  return (
    <section
      id="treatments"
      ref={ref}
      className="relative section-pad"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Choose your protocol"
    >
      <div className="container-tight">

        {/* ── Header ── */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease }}
          className="flex items-end justify-between flex-wrap gap-6 mb-8"
        >
          <h2 className="display-heading" style={{ fontSize: 'clamp(34px, 4.6vw, 64px)' }}>
            Choose your protocol.
          </h2>
          <p
            className="text-[11px] font-semibold uppercase leading-relaxed text-right max-w-[240px]"
            style={{ ...MONO, letterSpacing: '0.16em', color: 'var(--text-secondary)' }}
          >
            Nine pathways, one doctor-led standard. Every protocol starts with your bloods.
          </p>
        </motion.div>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
          className="hidden md:flex items-center gap-2 text-[10px] font-semibold uppercase mb-4"
          style={{ ...MONO, letterSpacing: '0.16em', color: 'var(--text-secondary)' }}
        >
          <span aria-hidden="true">→</span> Hover any card to open it
        </motion.p>

        {/* ── Grid ── */}
        <LayoutGroup id="protocols">
          <ul
            className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-2.5"
            style={{ gridAutoFlow: 'dense', gridAutoRows: canHover ? ROW : 'auto' }}
            onMouseLeave={() => setActive(null)}
          >
            {PROTOCOLS.map((p, i) => {
              const featured = isFeatured(p.id)
              return (
                <motion.li
                  key={p.id}
                  layout={prefersReduced ? false : 'position'}
                  transition={{ layout: { duration: 0.45, ease } }}
                  initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  className="min-w-0"
                  style={{ gridRow: featured ? 'span 3' : 'span 1', gridColumn: canHover ? p.col : undefined }}
                >
                  <ProtocolCard
                    p={p}
                    index={i}
                    featured={featured}
                    reduced={!!prefersReduced}
                    onEnter={() => setActive(p.id)}
                  />
                </motion.li>
              )
            })}

            {/* Not sure: always compact, always last. */}
            <li className="min-w-0" style={{ gridColumn: canHover ? 3 : undefined }}>
              <a
                href="/start"
                className="group no-underline flex flex-col justify-between h-full rounded-2xl px-4 py-3.5 transition-colors duration-200"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)', minHeight: ROW }}
              >
                <span className="flex items-start justify-between">
                  <span className="text-[10px] font-medium opacity-60" style={MONO}>Not sure?</span>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ border: '1px solid currentColor', opacity: 0.7 }}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M4 10L10 4M5.5 4H10v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </span>
                <span>
                  <span className="block text-[15px] font-bold leading-tight" style={{ letterSpacing: '-0.01em' }}>Take the 2-minute assessment</span>
                  <span className="block text-[10px] mt-1 opacity-60" style={MONO}>We match you to a pathway</span>
                </span>
              </a>
            </li>
          </ul>
        </LayoutGroup>
      </div>
    </section>
  )
}

function ProtocolCard({
  p, index, featured, reduced, onEnter,
}: {
  p: Protocol
  index: number
  featured: boolean
  reduced: boolean
  onEnter: () => void
}) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <a
      href={p.href}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      aria-label={`View ${p.label} protocol`}
      className="group relative block h-full w-full overflow-hidden no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderRadius: 16,
        background: featured ? '#0b0d12' : 'var(--surface)',
        border: `1px solid ${featured ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        minHeight: ROW,
        transition: 'background-color 0.35s ease, border-color 0.35s ease',
        outlineColor: 'var(--blue)',
      }}
    >
      {/* Feature image: always mounted so the reveal is a fade, not a load. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: featured ? 1 : 0, transition: reduced ? 'none' : 'opacity 0.45s ease', transform: featured ? 'scale(1)' : 'scale(1.06)' }}
        aria-hidden="true"
      >
        <Image
          src={p.image}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,13,0.82) 0%, rgba(4,6,13,0.2) 45%, transparent 70%)' }} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {featured ? (
          <motion.div
            key="feature"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.28, ease }}
            className="absolute inset-0 flex flex-col justify-between p-4"
          >
            <span className="w-2 h-2 rounded-full" style={{ background: p.swatch, boxShadow: `0 0 0 3px ${p.swatch}33` }} aria-hidden="true" />
            <div>
              {p.tag && (
                <span
                  className="inline-block mb-2.5 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full text-white"
                  style={{ letterSpacing: '0.14em', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}
                >
                  {p.tag}
                </span>
              )}
              <h3 className="text-[20px] font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>{p.label}</h3>
              <p className="text-[10.5px] mt-1 text-white/70 uppercase" style={MONO}>{p.code} · {p.sub}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="compact"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative flex flex-col justify-between h-full px-4 py-3.5"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-medium" style={{ ...MONO, color: 'var(--text-secondary)' }}>{num}</span>
              <span className="relative w-[26px] h-[26px] rounded-md overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }} aria-hidden="true">
                <Image src={p.image} alt="" fill sizes="26px" className="object-cover" />
              </span>
            </div>
            <div className="min-w-0">
              <span className="block text-[15px] font-bold leading-tight truncate" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{p.label}</span>
              <span className="block text-[10px] mt-1 truncate uppercase" style={{ ...MONO, color: 'var(--text-secondary)' }}>{p.code} · {p.sub}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}
