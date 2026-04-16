'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const PROGRAMS = [
  {
    category: 'Hormonal Health',
    name: 'Hormone Optimisation',
    tagline: 'Low drive, poor recovery, body composition changes — often rooted in hormonal dysfunction that standard testing misses.',
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.06)',
    accentBorder: 'rgba(72,144,247,0.18)',
    glowColor: 'rgba(72,144,247,0.05)',
    tag: 'Most common',
    focus: [
      'Low testosterone, libido, and drive',
      'Fatigue and poor sleep quality',
      'Body composition changes — fat gain, muscle loss',
      'Brain fog and reduced motivation',
    ],
    href: '/intake/pre-screen',
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
    tagline: 'Output has stalled, recovery is slow — and something clinical is likely limiting what your training can produce.',
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.06)',
    accentBorder: 'rgba(249,115,22,0.18)',
    glowColor: 'rgba(249,115,22,0.04)',
    tag: null,
    focus: [
      'Training plateau despite consistent effort',
      'Poor recovery between sessions',
      'Declining strength or endurance output',
      'Suboptimal body composition despite diet and training',
    ],
    href: '/intake/pre-screen',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 10h3l2-5 3 10 2-7 2 4 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: 'Metabolic Health',
    name: 'Metabolic & Weight Loss',
    tagline: 'Stubborn weight gain and body fat that doesn\'t respond to diet or exercise usually has a clinical driver.',
    accent: '#00a89e',
    accentBg: 'rgba(0,168,158,0.06)',
    accentBorder: 'rgba(0,168,158,0.18)',
    glowColor: 'rgba(0,168,158,0.05)',
    tag: null,
    focus: [
      'Stubborn weight and body fat accumulation',
      'Insulin resistance or metabolic dysfunction',
      'Low energy despite adequate sleep',
      'Weight that doesn\'t respond to diet or exercise',
    ],
    href: '/intake/pre-screen',
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
    tagline: 'Shedding, thinning density, or hairline recession — address the biology driving hair loss, not just the surface.',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
    accentBorder: 'rgba(167,139,250,0.18)',
    glowColor: 'rgba(167,139,250,0.04)',
    tag: null,
    focus: [
      'Pattern hair loss or diffuse thinning',
      'Shedding and reduced density',
      'Hairline recession',
      'Hormonally driven scalp changes',
    ],
    href: '/intake/pre-screen',
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
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.06)',
    accentBorder: 'rgba(56,189,248,0.18)',
    glowColor: 'rgba(56,189,248,0.04)',
    tag: null,
    focus: [
      'Declining skin texture, firmness, or quality',
      'Hormonally driven skin changes',
      'Acne or persistent skin conditions',
      'Post-injury or post-procedural skin repair',
    ],
    href: '/intake/pre-screen',
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
    tagline: 'Slow healing, recurring injury, or post-surgical recovery — a clinical protocol supports what the body can\'t do alone.',
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.06)',
    accentBorder: 'rgba(74,222,128,0.18)',
    glowColor: 'rgba(74,222,128,0.04)',
    tag: null,
    focus: [
      'Soft tissue injury — tendons, ligaments, muscle',
      'Slow or incomplete healing post-injury or surgery',
      'Recurring injury at the same sites',
      'Return-to-training clinical support',
    ],
    href: '/intake/pre-screen',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 10h8M10 6v8" strokeLinecap="round" />
        <rect x="3" y="3" width="14" height="14" rx="3" />
      </svg>
    ),
  },
]

function ProgramCard({ prog, i, inView }: { prog: typeof PROGRAMS[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease }}
      className="group flex flex-col rounded-xl overflow-hidden relative"
      style={{
        background: '#0a0e14',
        border: '1px solid rgba(148,163,184,0.09)',
        borderLeft: `2px solid ${prog.accent}`,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        opacity: 1,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.boxShadow = `0 0 32px ${prog.glowColor}, 0 8px 24px rgba(0,0,0,0.3)`
        el.style.borderColor = `rgba(148,163,184,0.14)`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.boxShadow = 'none'
        el.style.borderColor = 'rgba(148,163,184,0.09)'
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
        <div className="flex items-center justify-between gap-3 mb-3.5">
          {/* Icon + category */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}`, color: prog.accent }}
            >
              {prog.icon}
            </div>
            <span
              className="text-[9px] font-bold tracking-[0.2em] uppercase"
              style={{ color: prog.accent, opacity: 0.85 }}
            >
              {prog.category}
            </span>
          </div>
          {prog.tag && (
            <span
              className="text-[8px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm flex-shrink-0"
              style={{ color: prog.accent, background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}
            >
              {prog.tag}
            </span>
          )}
        </div>

        <h3
          className="text-[15px] font-bold leading-snug mb-2"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#e8f0f8', letterSpacing: '-0.01em' }}
        >
          {prog.name}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
          {prog.tagline}
        </p>
      </div>

      {/* Focus list */}
      <div className="flex flex-col flex-1 px-5 py-4">
        <ul className="flex flex-col gap-2 flex-1">
          {prog.focus.map((item, j) => (
            <li key={j} className="flex items-start gap-2">
              <div
                className="w-1 h-1 rounded-full flex-shrink-0 mt-1.5"
                style={{ background: prog.accent, opacity: 0.6 }}
              />
              <span className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={prog.href}
          className="mt-5 flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg text-[11px] font-semibold tracking-[0.06em] uppercase transition-all duration-150"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(148,163,184,0.1)',
            color: '#6b7a8d',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = prog.accentBg
            el.style.borderColor = prog.accentBorder
            el.style.color = prog.accent
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
      </div>
    </motion.div>
  )
}

export default function ProgramsSection() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsRef = useRef(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })
  const footerRef = useRef(null)
  const footerInView = useInView(footerRef, { once: true, margin: '-40px' })

  return (
    <section
      id="programs"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Clinical programs"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10">

        {/* Heading */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-12 md:mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-4"
            >
              Clinical Programs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(28px, 3.5vw, 50px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#f0f4f8',
                lineHeight: 1.08,
              }}
            >
              Six programs.{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                One clinic.
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            <p className="text-base leading-relaxed" style={{ color: '#6b7a8d' }}>
              Each program targets a distinct biological system with its own clinical pathway and doctor-led protocol. The pre-screen assessment confirms the right fit for your profile.
            </p>
          </motion.div>
        </div>

        {/* Program grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
        >
          {PROGRAMS.map((prog, i) => (
            <ProgramCard key={prog.name} prog={prog} i={i} inView={cardsInView} />
          ))}
        </div>

        {/* Helper strip */}
        <motion.div
          ref={footerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(148,163,184,0.07)' }}
        >
          <div>
            <p className="text-sm font-medium mb-0.5" style={{ color: '#8899aa' }}>
              Not sure which program fits?
            </p>
            <p className="text-xs" style={{ color: '#3a4a5a' }}>
              Complete the pre-screen and we&apos;ll identify the right clinical pathway for you.
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
              el.style.background = 'rgba(72,144,247,0.12)'
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
  )
}
