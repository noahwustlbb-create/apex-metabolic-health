'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const TREATMENTS = [
  {
    id: 'hormone',
    href: '/intake/hormone',
    label: 'Hormone Optimisation',
    sub: 'Testosterone · Energy · Drive',
    image: 'https://images.unsplash.com/photo-1601113329251-0aebe217bdbe?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center top',
    bg: '#030d1f',
    glowColor: 'rgba(72,144,247,0.35)',
    tag: 'Most popular',
  },
  {
    id: 'weight',
    href: '/intake/fast-track?program=weightloss',
    label: 'Medical Weight Loss',
    sub: 'Doctor-led metabolic management',
    image: 'https://images.unsplash.com/photo-1579758682665-53a1a614eea6?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center top',
    bg: '#02150a',
    glowColor: 'rgba(5,150,105,0.35)',
    tag: null,
  },
  {
    id: 'sexual',
    href: '/intake/fast-track?program=sexual',
    label: 'Sexual Health',
    sub: 'Private & confidential treatment',
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center center',
    bg: '#08081e',
    glowColor: 'rgba(99,102,241,0.35)',
    tag: null,
  },
  {
    id: 'recovery',
    href: '/intake/fast-track?program=recovery',
    label: 'Recovery & Injury Repair',
    sub: 'Performance · Rehab · Mobility',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center top',
    bg: '#060f20',
    glowColor: 'rgba(37,99,235,0.35)',
    tag: null,
  },
  {
    id: 'longevity',
    href: '/intake/fast-track?program=antiageing',
    label: 'Anti-Ageing & Longevity',
    sub: 'Healthspan · Vitality · Prevention',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center center',
    bg: '#0a0618',
    glowColor: 'rgba(139,92,246,0.35)',
    tag: 'New',
  },
  {
    id: 'skinhair',
    href: '/intake/fast-track?program=skinhair',
    label: 'Skin & Hair',
    sub: 'Restoration · Regeneration',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center center',
    bg: '#140818',
    glowColor: 'rgba(168,85,247,0.35)',
    tag: null,
  },
  {
    id: 'bloods',
    href: '/intake/fast-track?program=bloods',
    label: 'Comprehensive Blood Tests',
    sub: 'Full-panel diagnostics · Doctor reviewed',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=90',
    imgPos: 'center center',
    bg: '#041510',
    glowColor: 'rgba(16,185,129,0.35)',
    tag: null,
  },
]

export default function TreatmentSelector() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
      {/* Subtle radial at top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        style={{
          paddingLeft: 'clamp(24px, 5.5vw, 80px)',
          paddingRight: 'clamp(24px, 5.5vw, 80px)',
          marginBottom: 40,
        }}
      >
        <p className="label mb-4">Treatment Pathways</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(26px, 3.5vw, 48px)',
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
            }}
          >
            Find your program.
          </h2>
          <a
            href="/start"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(200,220,248,0.4)', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4890f7' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,220,248,0.4)' }}
          >
            Not sure? Take the assessment
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* ── Horizontal scroll ── */}
      <div
        className="[&::-webkit-scrollbar]:hidden overflow-x-auto"
        style={{
          paddingLeft: 'clamp(24px, 5.5vw, 80px)',
          paddingRight: 'clamp(24px, 5.5vw, 80px)',
          paddingBottom: 8,
          scrollSnapType: 'x mandatory',
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
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.065, ease }}
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
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: t.imgPos, opacity: 0.72 }}
                  unoptimized
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

                {/* Top section: badge + title + sub */}
                <div>
                  {t.tag && (
                    <div
                      className="inline-flex items-center mb-2.5"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: 99,
                        padding: '4px 10px',
                      }}
                    >
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
                        {t.tag}
                      </span>
                    </div>
                  )}
                  <h3
                    className="font-bold leading-tight"
                    style={{
                      fontFamily: 'var(--font-space-grotesk)',
                      fontSize: 'clamp(16px, 2vw, 21px)',
                      color: '#ffffff',
                      letterSpacing: '-0.015em',
                      marginBottom: 6,
                    }}
                  >
                    {t.label}
                  </h3>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.025em' }}>
                    {t.sub}
                  </p>
                </div>

                {/* Bottom section: arrow CTA */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-semibold tracking-wide uppercase transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Get started
                  </span>
                  <div
                    className="flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-white/20"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      flexShrink: 0,
                      marginLeft: 'auto',
                    }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Mobile: assessment link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="md:hidden text-center mt-8"
        style={{ paddingLeft: 24, paddingRight: 24 }}
      >
        <a
          href="/start"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
          style={{ color: 'rgba(200,220,248,0.4)', textDecoration: 'none' }}
        >
          Not sure? Take the Health Assessment
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
