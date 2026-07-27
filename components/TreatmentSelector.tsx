'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const ACCENT = 'var(--blue)'
const GLOW   = 'rgba(72,144,247,0.35)'

const TREATMENTS = [
  {
    id: 'hormone',
    href: '/programs/hormone-optimisation',
    label: 'Hormone Optimisation',
    sub: 'Energy · Drive · Recovery',
    image: 'https://images.unsplash.com/photo-1734443544776-7161343f09d2?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center 30%',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: 'Most popular',
  },
  {
    id: 'weight',
    href: '/programs/metabolic-weight-loss',
    label: 'Medical Weight Loss',
    sub: 'Doctor-led metabolic reset',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: null,
  },
  {
    id: 'sexual',
    href: '/programs/sexual-health',
    label: 'Sexual Health',
    sub: 'Private · Confidential · Discreet',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: null,
  },
  {
    id: 'recovery',
    href: '/programs/injury-repair',
    label: 'Recovery and Injury Repair',
    sub: 'Performance · Rehab · Mobility',
    image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: null,
  },
  {
    id: 'longevity',
    href: '/programs/longevity',
    label: 'Anti-Ageing and Longevity',
    sub: 'Healthspan · Vitality · Prevention',
    image: 'https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: 'New',
  },
  {
    id: 'skinhair',
    href: '/programs/skin-regeneration',
    label: 'Skin and Hair',
    sub: 'Restoration · Regeneration',
    image: 'https://images.unsplash.com/photo-1781178339148-d6ac1edb7b8f?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: null,
  },
  {
    id: 'bloods',
    href: '/programs/pathology',
    label: 'Comprehensive Blood Tests',
    sub: 'Full-panel diagnostics · Doctor reviewed',
    image: 'https://images.unsplash.com/photo-1570917013020-a6966d3ee863?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0e1117',
    accent: ACCENT,
    glowColor: GLOW,
    tag: null,
  },
]

export default function TreatmentSelector() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Scroll progress for the card strip - the affordance that says
  // "there are more cards" and "here's where you are".
  const [scrollProgress, setScrollProgress] = useState(0)
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const max = el.scrollWidth - el.clientWidth
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
  }, [])

  return (
    <section
      id="treatments"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        paddingTop: 'clamp(72px, 9vw, 120px)',
        paddingBottom: 'clamp(72px, 9vw, 120px)',
      }}
      aria-label="Treatment pathways"
    >

      {/* ── Section header ── */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease }}
        style={{
          paddingLeft: 'clamp(24px, 5.5vw, 80px)',
          paddingRight: 'clamp(24px, 5.5vw, 80px)',
          marginBottom: 40,
        }}
      >
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="display-heading"
            style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}
          >
            Find your treatment.
          </h2>
          <a
            href="/start"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            Not sure? Start your assessment
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
          {['Under 2 minutes', 'Completely confidential', 'Reviewed by Australian doctors'].map(item => (
            <span key={item} className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Horizontal scroll ── */}
      <div
        className="[&::-webkit-scrollbar]:hidden overflow-x-auto"
        onScroll={handleScroll}
        style={{
          paddingLeft: 'clamp(24px, 5.5vw, 80px)',
          paddingRight: 'clamp(24px, 5.5vw, 80px)',
          paddingBottom: 8,
          scrollSnapType: 'x proximity',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
          {TREATMENTS.map((t, i) => (
            <motion.a
              key={t.id}
              href={t.href}
              initial={prefersReduced ? false : { opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: i * 0.065, ease }}
              className="relative flex-shrink-0 overflow-hidden no-underline group"
              style={{
                width: 'clamp(210px, 26vw, 290px)',
                height: 'clamp(310px, 38vw, 430px)',
                borderRadius: 20,
                background: t.bg,
                scrollSnapAlign: 'start',
                display: 'block',
              }}
              aria-label={t.label}
            >
              {/* ── Photography ── */}
              <div className="absolute inset-0">
                <Image
                  src={t.image}
                  alt=""
                  fill
                  className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
                  style={{ objectPosition: t.imgPos, opacity: 0.72 }}
                />
              </div>

              {/* ── Top gradient (protects title) ── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${t.bg} 0%, ${t.bg}e0 22%, ${t.bg}80 44%, transparent 68%)`,
                }}
                aria-hidden="true"
              />

              {/* ── Bottom gradient (protects arrow) ── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 38%)' }}
                aria-hidden="true"
              />

              {/* ── Color glow from bottom ── */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse 100% 50% at 50% 100%, ${t.glowColor} 0%, transparent 65%)` }}
                aria-hidden="true"
              />

              {/* ── Card content ── */}
              <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 'clamp(16px, 2.5vw, 22px)' }}>

                {/* Top section: badge + sub + title */}
                <div>
                  {t.tag && (
                    <div
                      className="inline-flex items-center mb-2.5"
                      style={{
                        background: `${t.accent}22`,
                        border: `1px solid ${t.accent}55`,
                        borderRadius: 99,
                        padding: '4px 10px',
                      }}
                    >
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accent }}>
                        {t.tag}
                      </span>
                    </div>
                  )}
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.accent, marginBottom: 6 }}>
                    {t.sub}
                  </p>
                  <h3
                    className="font-bold leading-tight"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(16px, 2vw, 21px)',
                      color: '#ffffff',
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {t.label}
                  </h3>
                </div>

                {/* Bottom section: arrow CTA */}
                <div className="flex items-center justify-end">
                  <div
                    className="flex items-center justify-center transition-all duration-200"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: `${t.accent}20`,
                      border: `1px solid ${t.accent}55`,
                      flexShrink: 0,
                      color: t.accent,
                    }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── Scroll progress - where you are in the 7 pathways ── */}
      <div
        style={{
          paddingLeft: 'clamp(24px, 5.5vw, 80px)',
          paddingRight: 'clamp(24px, 5.5vw, 80px)',
          marginTop: 20,
        }}
        aria-hidden="true"
      >
        <div
          className="relative overflow-hidden"
          style={{ maxWidth: 200, height: 2, borderRadius: 1, background: 'rgba(72,144,247,0.15)' }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: '25%',
              borderRadius: 1,
              background: 'var(--blue)',
              transform: `translateX(${scrollProgress * 300}%)`,
              transition: 'transform 80ms linear',
            }}
          />
        </div>
      </div>

      {/* Mobile: assessment link */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.6 }}
        className="md:hidden text-center mt-8"
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        <a
          href="/start"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
        >
          Not sure? Start your assessment
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
