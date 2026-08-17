'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
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
    image: '/shoot/hormone.jpg',
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
    image: '/shoot/weight.jpg',
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
    image: '/shoot/sexual.jpg',
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
    image: '/shoot/recovery.jpg',
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
    image: '/shoot/longevity.jpg',
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
    image: '/shoot/skin.jpg',
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
    image: '/shoot/consult.jpg',
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

  // "Skin and Hair" is one card but two distinct pathways: Hair runs the
  // clinical questionnaire, Skin uses the intake form. Ask which on select.
  const [skinHairOpen, setSkinHairOpen] = useState(false)

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
              onClick={t.id === 'skinhair' ? (e) => { e.preventDefault(); setSkinHairOpen(true) } : undefined}
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

      {/* Skin vs Hair sub-choice */}
      <AnimatePresence>
        {skinHairOpen && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Choose skin or hair"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSkinHairOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000, display: 'flex',
              alignItems: 'center', justifyContent: 'center', padding: 24,
              background: 'rgba(4,6,13,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={prefersReduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.24, ease }}
              style={{
                width: '100%', maxWidth: 460, background: 'var(--surface)',
                border: '1px solid var(--border)', borderRadius: 20, padding: 'clamp(24px, 4vw, 32px)',
                boxShadow: '0 40px 90px rgba(0,0,0,0.5)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8 }}>
                Skin or hair?
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                Two pathways, each with its own doctor-designed panel. Which are you here for?
              </p>

              {[
                { href: '/programs/hair-restoration', label: 'Hair restoration', sub: 'DHT, SHBG, ferritin & thyroid markers' },
                { href: '/programs/skin-regeneration', label: 'Skin regeneration', sub: 'Cortisol, DHEA-S & inflammatory markers' },
              ].map(opt => (
                <a
                  key={opt.href}
                  href={opt.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 14,
                    marginBottom: 12, textDecoration: 'none', background: 'var(--bg)',
                    border: '1px solid var(--border)', transition: 'border-color 0.18s ease, transform 0.18s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: 15.5, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-inter)', marginBottom: 3 }}>{opt.label}</span>
                    <span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-secondary)' }}>{opt.sub}</span>
                  </span>
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true" style={{ color: 'var(--blue)', flexShrink: 0 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}

              <button
                onClick={() => setSkinHairOpen(false)}
                style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: 8, padding: 10, background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-inter)' }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
