'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'

/**
 * Choose your protocol.
 *
 * A bento of the seven pathways. Two cards are open at rest; hovering or
 * focusing any card makes it the feature and folds the rest to a single
 * row. Every card is a real link, so keyboard and touch users lose nothing:
 * on a phone the grid is one column of compact rows and a tap navigates.
 *
 * Imagery is the signature: one macro texture per pathway, generated for
 * Apex, served from /public/protocols. No stock, no people, no faces.
 */

const ease = [0.22, 1, 0.36, 1] as const

export type Protocol = {
  id: string
  code: string
  label: string
  sub: string
  href: string
  image: string
  swatch: string
  /** Fixed column on the 3-column grid so featuring a card never moves another card under the cursor. */
  col: 1 | 2 | 3
  tag?: string
}

export const PROTOCOLS: Protocol[] = [
  { id: 'hormone', col: 1,   code: 'APX-01', label: 'Hormone Optimisation',       sub: 'Energy · Drive · Recovery',          href: '/programs/hormone-optimisation',  image: '/protocols/hormone.jpg',   swatch: '#c9962a', tag: 'Most chosen' },
  { id: 'weight', col: 2,    code: 'APX-02', label: 'Medical Weight Loss',        sub: 'Doctor-led metabolic reset',         href: '/programs/metabolic-weight-loss', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/weight.jpg once generated */,    swatch: '#3b82f6' },
  { id: 'sexual', col: 3,    code: 'APX-03', label: 'Sexual Health',              sub: 'Private · Confidential · Discreet',  href: '/programs/sexual-health',         image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/sexual.jpg once generated */,    swatch: '#9f1239' },
  { id: 'recovery', col: 1,  code: 'APX-04', label: 'Recovery and Injury Repair', sub: 'Performance · Rehab · Mobility',     href: '/programs/injury-repair',         image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/recovery.jpg once generated */,  swatch: '#475569' },
  { id: 'longevity', col: 2, code: 'APX-05', label: 'Anti-Ageing and Longevity',  sub: 'Healthspan · Vitality · Prevention', href: '/programs/longevity',             image: 'https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/longevity.jpg once generated */, swatch: '#8b5cf6', tag: 'New' },
  { id: 'skinhair', col: 3,  code: 'APX-06', label: 'Skin and Hair',              sub: 'Restoration · Regeneration',         href: '/programs/skin-regeneration',     image: 'https://images.unsplash.com/photo-1781178339148-d6ac1edb7b8f?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/skin.jpg once generated */,      swatch: '#d4a5a5' },
  { id: 'bloods', col: 1,    code: 'APX-07', label: 'Comprehensive Blood Tests',  sub: 'Full panel · Doctor reviewed',       href: '/programs/pathology',             image: 'https://images.unsplash.com/photo-1570917013020-a6966d3ee863?auto=format&fit=crop&w=1200&q=85' /* TODO swap for /protocols/bloods.jpg once generated */,    swatch: '#b91c1c' },
]

const REST_FEATURED = new Set(['hormone', 'longevity'])

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
  const [skinHairOpen, setSkinHairOpen] = useState(false)
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
            style={{ color: 'var(--text-secondary)', letterSpacing: '0.16em', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Select a pathway to explore treatments built around your bloods
          </p>
        </motion.div>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.15 }}
          className="hidden md:flex items-center gap-2 text-[10px] font-semibold uppercase mb-4"
          style={{ color: 'var(--text-secondary)', letterSpacing: '0.16em', fontFamily: 'var(--font-space-grotesk)' }}
        >
          <span aria-hidden="true">→</span> Hover to expand · any card becomes the feature · {PROTOCOLS.length} pathways
        </motion.p>

        {/* ── Grid ── */}
        <LayoutGroup id="protocols">
          <ul
            className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ gridAutoFlow: 'dense', gridAutoRows: canHover ? 92 : 'auto' }}
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
                    onClick={p.id === 'skinhair' ? (e) => { e.preventDefault(); setSkinHairOpen(true) } : undefined}
                  />
                </motion.li>
              )
            })}

            {/* Not sure card: always compact, always last */}
            <li className="min-w-0" style={{ gridColumn: canHover ? 3 : undefined }}>
              <a
                href="/start"
                className="group no-underline flex items-center justify-between gap-4 h-full rounded-2xl px-5 py-4 transition-colors duration-200"
                style={{ background: 'var(--text-primary)', color: 'var(--bg)', minHeight: 92 }}
              >
                <span>
                  <span className="block text-[10px] font-semibold uppercase opacity-60" style={{ letterSpacing: '0.16em', fontFamily: 'var(--font-space-grotesk)' }}>Not sure</span>
                  <span className="block text-[15px] font-bold mt-1.5" style={{ letterSpacing: '-0.01em' }}>Take the 2-minute assessment</span>
                  <span className="block text-[11px] mt-0.5 opacity-60">We match you to a pathway</span>
                </span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ border: '1px solid currentColor', opacity: 0.7 }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5"><path d="M4 10L10 4M5.5 4H10v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </li>
          </ul>
        </LayoutGroup>
      </div>

      {/* Skin vs Hair: one card, two pathways with different panels. */}
      <AnimatePresence>
        {skinHairOpen && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Choose skin or hair"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSkinHairOpen(false)}
            className="fixed inset-0 flex items-center justify-center p-6"
            style={{ zIndex: 1000, background: 'rgba(4,6,13,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={prefersReduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.24, ease }}
              className="w-full rounded-[20px] p-7"
              style={{ maxWidth: 460, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 40px 90px rgba(0,0,0,0.5)' }}
            >
              <h3 className="text-[22px] font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Skin or hair?</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>Two pathways, each with its own doctor-designed panel. Which are you here for?</p>
              {[
                { href: '/programs/hair-restoration', label: 'Hair restoration', sub: 'DHT, SHBG, ferritin and thyroid markers' },
                { href: '/programs/skin-regeneration', label: 'Skin regeneration', sub: 'Cortisol, DHEA-S and inflammatory markers' },
              ].map(opt => (
                <a
                  key={opt.href}
                  href={opt.href}
                  className="flex items-center gap-4 rounded-[14px] px-5 py-4 mb-3 no-underline transition-[border-color,transform] duration-200 hover:-translate-y-0.5"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <span className="flex-1">
                    <span className="block text-[15.5px] font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>{opt.label}</span>
                    <span className="block text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>{opt.sub}</span>
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
              <button onClick={() => setSkinHairOpen(false)} className="block w-full text-center mt-2 p-2.5 text-[13px] bg-transparent border-0 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProtocolCard({
  p, index, featured, reduced, onEnter, onClick,
}: {
  p: Protocol
  index: number
  featured: boolean
  reduced: boolean
  onEnter: () => void
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <a
      href={p.href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      aria-label={`View ${p.label} protocol`}
      className="group relative block h-full w-full overflow-hidden no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderRadius: 18,
        background: featured ? '#0b0d12' : 'var(--surface)',
        border: `1px solid ${featured ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`,
        minHeight: 92,
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
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,13,0.85) 0%, rgba(4,6,13,0.25) 45%, transparent 70%)' }} />
      </div>

      {/* Swatch dot (AlgoRx-style category colour) */}
      <span
        className="absolute left-4 top-4 w-2 h-2 rounded-full"
        style={{ background: p.swatch, boxShadow: featured ? `0 0 0 3px ${p.swatch}33` : 'none' }}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait" initial={false}>
        {featured ? (
          <motion.div
            key="feature"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.28, ease }}
            className="absolute inset-0 flex flex-col justify-end p-5"
          >
            {p.tag && (
              <span
                className="self-start mb-3 text-[9px] font-bold uppercase px-2.5 py-1 rounded-full"
                style={{ letterSpacing: '0.14em', color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}
              >
                {p.tag}
              </span>
            )}
            <h3 className="text-[22px] font-bold leading-tight text-white" style={{ fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>{p.label}</h3>
            <p className="text-[11px] mt-1.5 text-white/70" style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              // {p.code} · {p.sub}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="compact"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="relative flex items-center justify-between gap-4 px-5 py-4 h-full"
          >
            <div className="min-w-0 pl-4">
              <span className="block text-[10px] font-semibold" style={{ color: 'var(--text-secondary)', letterSpacing: '0.16em', fontFamily: 'var(--font-space-grotesk)' }}>{num}</span>
              <span className="block text-[15px] font-bold mt-1.5 truncate" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{p.label}</span>
              <span className="block text-[11px] mt-0.5 truncate" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.04em' }}>
                {p.code} · {p.sub}
              </span>
            </div>
            <span className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border)' }} aria-hidden="true">
              <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  )
}
