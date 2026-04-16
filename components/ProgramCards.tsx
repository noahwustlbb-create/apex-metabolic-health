'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const PROGRAMS = [
  {
    name: 'Hormone Optimisation',
    slug: 'Hormone & TRT',
    description: 'Testosterone, SHBG, LH, FSH, cortisol and 20+ hormone markers. Identify and correct the root cause of low drive, fatigue, and poor recovery.',
    href: '/intake/hormone',
    bloodsHref: '/intake/bloods-hormone',
    color: '#1a4fd6',
    bg: 'linear-gradient(145deg, #0f2a6e 0%, #1a4fd6 60%, #3b82f6 100%)',
    accent: '#4890f7',
    tag: 'Most Popular',
    comingSoon: false,
  },
  {
    name: 'Performance & Recovery',
    slug: 'Athletic Optimisation',
    description: 'IGF-1, CK, cortisol, testosterone and inflammation markers. Optimise strength output, recovery speed, and endurance.',
    href: '/intake/performance',
    bloodsHref: '/intake/bloods-performance',
    color: '#c2580a',
    bg: 'linear-gradient(145deg, #6b2a0a 0%, #c2580a 60%, #f97316 100%)',
    accent: '#f97316',
    tag: null,
    comingSoon: false,
  },
  {
    name: 'Metabolic & Weight',
    slug: 'Weight Management',
    description: 'Insulin resistance, HbA1c, thyroid, cortisol, lipids and metabolic markers. Understand exactly what is driving weight gain and stubborn fat.',
    href: '/intake/metabolic',
    bloodsHref: '/intake/bloods-metabolic',
    color: '#6d28d9',
    bg: 'linear-gradient(145deg, #2e1065 0%, #6d28d9 60%, #a855f7 100%)',
    accent: '#a855f7',
    tag: null,
    comingSoon: false,
  },
  {
    name: 'Hair & Skin',
    slug: 'Restoration Protocol',
    description: 'DHT, DHEA-S, thyroid, cortisol, zinc, ferritin and inflammation markers. Address hair loss and skin quality from the same hormonal and nutritional root causes.',
    href: '/intake/hair',
    bloodsHref: '/intake/bloods-hair',
    color: '#be185d',
    bg: 'linear-gradient(145deg, #500724 0%, #be185d 60%, #ec4899 100%)',
    accent: '#ec4899',
    tag: null,
    comingSoon: false,
  },
  {
    name: 'Injury Repair',
    slug: 'Recovery Protocol',
    description: 'IGF-1, CK, Vit D, ESR, CRP and repair markers. Understand the biological factors slowing your recovery and how to accelerate them.',
    href: '/intake/injury',
    bloodsHref: '/intake/bloods-injury',
    color: '#b45309',
    bg: 'linear-gradient(145deg, #451a03 0%, #b45309 60%, #d97706 100%)',
    accent: '#d97706',
    tag: null,
    comingSoon: false,
  },
  {
    name: 'Longevity Protocol',
    slug: 'Coming Soon',
    description: 'Comprehensive multi-system panel covering hormonal, metabolic, cardiovascular, and cellular health markers. Built for the long game.',
    href: '/programs/longevity',
    bloodsHref: '/programs/longevity',
    color: '#0f766e',
    bg: 'linear-gradient(145deg, #042f2e 0%, #0f766e 60%, #14b8a6 100%)',
    accent: '#4890f7',
    tag: 'Coming Soon',
    comingSoon: true,
  },
]

function ProgramCard({ program, index, inView }: {
  program: typeof PROGRAMS[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Visual area */}
      <div
        className="relative flex flex-col justify-between p-6 overflow-hidden"
        style={{ background: program.bg, minHeight: 200, aspectRatio: '4/3' }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />
        {/* Top bar */}
        <div className="flex items-center justify-between relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
            APEX
          </span>
          {program.tag && (
            <span className="text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}>
              {program.tag}
            </span>
          )}
        </div>

        {/* Program name on card */}
        <div className="relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {program.slug}
          </p>
          <h3 className="text-xl font-bold leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>
            {program.name}
          </h3>
          <p className="text-[10px] mt-3 tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            YOUR JOURNEY TO OPTIMAL HEALTH ↗
          </p>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#6b7a8d' }}>
          {program.description}
        </p>

        {/* CTA button */}
        {program.comingSoon ? (
          <div
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold mb-3"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#4a5a6a', border: '1px solid rgba(255,255,255,0.08)', cursor: 'default' }}
          >
            Joining waitlist soon
          </div>
        ) : (
          <a
            href={program.href}
            className="inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 mb-3"
            style={{ background: program.accent, color: '#ffffff' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Start program
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

      </div>
    </motion.div>
  )
}

export default function ProgramCards() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="programs"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Clinical programs"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-4"
            >
              Clinical Programs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(32px, 3.5vw, 54px)',
                lineHeight: 1.06,
                color: '#f0f4f8',
                letterSpacing: '-0.02em',
              }}
            >
              Six programs.
              <br />
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-base leading-relaxed max-w-sm md:text-right"
            style={{ color: '#8899aa' }}
          >
            Doctor-led, evidence-based protocols for each of the six biological systems that most affect how men look, feel, and perform.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.name} program={program} index={i} inView={inView} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-sm" style={{ color: '#4a5a6a' }}>
            Not sure which program is right for you?
          </p>
          <a
            href="/intake/pre-screen"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150"
            style={{ color: '#4890f7' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4890f7' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#4890f7' }}
          >
            Take the 60-second assessment →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
