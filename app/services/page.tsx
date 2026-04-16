'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AppFeature from '@/components/AppFeature'

const ease = [0.22, 1, 0.36, 1] as const

const PROGRAMS = [
  {
    category: 'Hormonal Health',
    name: 'Hormone Optimisation',
    tagline: 'Low drive, poor recovery, body composition changes — often rooted in hormonal dysfunction that standard testing misses.',
    bullets: [
      'Low testosterone, libido, and drive',
      'Persistent fatigue and poor sleep quality',
      'Body composition changes — fat gain, muscle loss',
      'Brain fog and reduced motivation',
    ],
    tag: 'Most common',
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.06)',
    accentBorder: 'rgba(72,144,247,0.18)',
    glowColor: 'rgba(72,144,247,0.05)',
    href: '/programs/hormone-optimisation',
    intakeHref: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" strokeLinecap="round" />
        <circle cx="10" cy="10" r="4" />
      </svg>
    ),
  },
  {
    category: 'Athletic Optimisation',
    name: 'Performance & Recovery',
    tagline: 'Output has stalled, recovery is slow — something clinical is likely limiting what your training can produce.',
    bullets: [
      'Training plateau despite consistent effort',
      'Poor recovery between sessions',
      'Declining strength or endurance output',
      'Suboptimal body composition despite diet and training',
    ],
    tag: null,
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.06)',
    accentBorder: 'rgba(249,115,22,0.18)',
    glowColor: 'rgba(249,115,22,0.04)',
    href: '/programs/performance-plus',
    intakeHref: '/intake/performance',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 10h3l2-5 3 10 2-7 2 4 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: 'Metabolic Health',
    name: 'Metabolic & Weight Loss',
    tagline: 'Stubborn weight gain and body fat that doesn\'t respond to diet or exercise — there\'s usually a clinical driver.',
    bullets: [
      'Stubborn weight and body fat accumulation',
      'Insulin resistance or metabolic dysfunction',
      'Low energy despite adequate sleep and diet',
      'Weight that hasn\'t responded to previous efforts',
    ],
    tag: null,
    accent: '#00a89e',
    accentBg: 'rgba(0,168,158,0.06)',
    accentBorder: 'rgba(0,168,158,0.18)',
    glowColor: 'rgba(0,168,158,0.05)',
    href: '/programs/metabolic-weight-loss',
    intakeHref: '/intake/metabolic',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 17l4-8 4 4 3-6 3 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="6" r="2" />
      </svg>
    ),
  },
  {
    category: 'Hair & Scalp Health',
    name: 'Hair Restoration',
    tagline: 'Shedding, thinning density, hairline recession — address the biology driving hair loss, not just the surface.',
    bullets: [
      'Pattern hair loss or diffuse thinning',
      'Shedding and reduced density',
      'Hairline recession',
      'Hormonally driven scalp changes',
    ],
    tag: null,
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
    accentBorder: 'rgba(167,139,250,0.18)',
    glowColor: 'rgba(167,139,250,0.04)',
    href: '/programs/hair-restoration',
    intakeHref: '/intake/hair',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 3c0 0-5 4-5 8a5 5 0 0010 0c0-4-5-8-5-8z" strokeLinejoin="round" />
        <path d="M10 11v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: 'Skin & Dermal Health',
    name: 'Skin Regeneration',
    tagline: 'Declining texture, firmness, and skin quality — driven by internal biology that topical products can\'t reach.',
    bullets: [
      'Declining skin texture, firmness, or quality',
      'Hormonally driven skin changes',
      'Acne or persistent skin conditions',
      'Post-injury or post-procedural skin repair',
    ],
    tag: null,
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.06)',
    accentBorder: 'rgba(56,189,248,0.18)',
    glowColor: 'rgba(56,189,248,0.04)',
    href: '/programs/skin-regeneration',
    intakeHref: '/intake/skin',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: 'Musculoskeletal Health',
    name: 'Injury Repair & Recovery',
    tagline: 'Slow healing, recurring injury, post-surgical recovery — clinical protocols that support what the body can\'t do alone.',
    bullets: [
      'Soft tissue injury — tendons, ligaments, muscle',
      'Slow or incomplete healing after injury or surgery',
      'Recurring injury at the same sites',
      'Return-to-training clinical support',
    ],
    tag: null,
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.06)',
    accentBorder: 'rgba(74,222,128,0.18)',
    glowColor: 'rgba(74,222,128,0.04)',
    href: '/programs/injury-repair',
    intakeHref: '/intake/injury',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 10h8M10 6v8" strokeLinecap="round" />
        <rect x="3" y="3" width="14" height="14" rx="3" />
      </svg>
    ),
  },
  {
    category: 'Longevity',
    name: 'Longevity Protocol',
    tagline: 'Comprehensive health optimisation for men thinking about the long game — proactive, not reactive.',
    bullets: [
      'Full multi-system biomarker baseline',
      'Hormonal, metabolic, cardiovascular, and cellular markers',
      'Long-horizon clinical protocol',
      'Ongoing biological age tracking',
    ],
    tag: 'Coming soon',
    accent: '#c9a84c',
    accentBg: 'rgba(201,168,76,0.06)',
    accentBorder: 'rgba(201,168,76,0.18)',
    glowColor: 'rgba(201,168,76,0.04)',
    href: '/programs/longevity',
    intakeHref: '/intake/pre-screen',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function ProgramCard({ p, i, inView }: { p: typeof PROGRAMS[0]; i: number; inView: boolean }) {
  const isComingSoon = p.tag === 'Coming soon'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.07, ease }}
      className="group flex flex-col rounded-xl overflow-hidden"
      style={{
        background: '#0a0e14',
        border: '1px solid rgba(148,163,184,0.09)',
        borderLeft: `2px solid ${p.accent}`,
        opacity: isComingSoon ? 0.75 : 1,
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        if (!isComingSoon) {
          e.currentTarget.style.boxShadow = `0 0 32px ${p.glowColor}, 0 8px 24px rgba(0,0,0,0.3)`
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.accent }}
            >
              {p.icon}
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: p.accent, opacity: 0.85 }}>
              {p.category}
            </span>
          </div>
          {p.tag && (
            <span
              className="text-[8px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm flex-shrink-0"
              style={{ color: p.accent, background: p.accentBg, border: `1px solid ${p.accentBorder}` }}
            >
              {p.tag}
            </span>
          )}
        </div>

        <h3
          className="text-[15px] font-bold leading-snug mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#e8f0f8', letterSpacing: '-0.01em' }}
        >
          {p.name}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
          {p.tagline}
        </p>
      </div>

      {/* Bullets */}
      <div className="flex flex-col flex-1 px-5 py-4">
        <ul className="flex flex-col gap-2 flex-1">
          {p.bullets.map((b, j) => (
            <li key={j} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ background: p.accent, opacity: 0.6 }} />
              <span className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isComingSoon ? (
          <div
            className="mt-5 flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-[0.06em] uppercase"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(148,163,184,0.08)', color: '#3a4a5a', cursor: 'default' }}
          >
            Joining soon
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        ) : (
          <Link
            href={p.intakeHref}
            className="mt-5 flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-[0.06em] uppercase transition-all duration-150"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(148,163,184,0.1)', color: '#6b7a8d' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = p.accentBg
              el.style.borderColor = p.accentBorder
              el.style.color = p.accent
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.03)'
              el.style.borderColor = 'rgba(148,163,184,0.1)'
              el.style.color = '#6b7a8d'
            }}
          >
            Check eligibility
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })
  const helperRef = useRef(null)
  const helperInView = useInView(helperRef, { once: true, margin: '-40px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
          aria-label="Clinical programs"
        >
          <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
          />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Clinical Programs
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(30px, 4vw, 58px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
                color: '#f0f4f8',
                maxWidth: '720px',
                marginBottom: '1.25rem',
              }}
            >
              Most clinics treat symptoms.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                We assess systems.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              style={{ color: '#6b7a8d', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
            >
              Six doctor-led protocols — each targeting a distinct biological system with its own clinical pathway, blood panel, and personalised protocol.
            </motion.p>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide telehealth'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Program Cards ─────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#0d1117', paddingTop: '64px', paddingBottom: '48px' }}
          aria-label="Programs"
        >
          <div className="glow-rule" aria-hidden="true" />

          <div ref={cardsRef} className="container-tight relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {PROGRAMS.map((p, i) => (
                <ProgramCard key={p.name} p={p} i={i} inView={cardsInView} />
              ))}
            </div>

            {/* Helper strip */}
            <motion.div
              ref={helperRef}
              initial={{ opacity: 0, y: 16 }}
              animate={helperInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
            >
              <div>
                <p className="text-sm font-medium mb-0.5" style={{ color: '#8899aa' }}>
                  Not sure which program fits?
                </p>
                <p className="text-xs" style={{ color: '#3a4a5a' }}>
                  Complete the 60-second pre-screen — we&apos;ll identify the right clinical pathway for you.
                </p>
              </div>
              <Link
                href="/intake/pre-screen"
                className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 px-5 py-2.5 rounded-lg transition-all duration-150"
                style={{
                  background: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.2)',
                  color: '#4890f7',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(72,144,247,0.13)'
                  el.style.borderColor = 'rgba(72,144,247,0.35)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(72,144,247,0.08)'
                  el.style.borderColor = 'rgba(72,144,247,0.2)'
                }}
              >
                Start pre-screen assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── App Section ───────────────────────────────────────── */}
        <AppFeature />

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '80px', paddingBottom: '100px' }}
          aria-label="Get started"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.06) 0%, transparent 55%)' }}
          />

          <div className="container-tight relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Get Started
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#f0f4f8',
                marginBottom: '1.5rem',
              }}
            >
              Get answers.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Not reassurance.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              style={{ color: '#6b7a8d', maxWidth: '440px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: 1.7 }}
            >
              Doctor-led assessment. Advanced diagnostics. A protocol built around your biology — not a generic plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/intake/discovery"
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: '#4a5a6a' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#8899aa' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#4a5a6a' }}
              >
                Book a free discovery call
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs mt-10"
              style={{ color: '#2e3d4d' }}
            >
              All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
            </motion.p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
