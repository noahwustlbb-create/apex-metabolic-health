'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#c9a84c'
const ACCENT_BG = 'rgba(201,168,76,0.06)'
const ACCENT_BORDER = 'rgba(201,168,76,0.18)'
const GLOW = 'rgba(201,168,76,0.05)'

const PILLARS = [
  {
    title: 'Multi-system biomarker baseline',
    body: 'A comprehensive panel covering hormonal, metabolic, cardiovascular, haematological, and cellular markers. The most complete picture of your biological state available in clinical practice.',
  },
  {
    title: 'Biological age assessment',
    body: 'Tracking biological age over time — not just a point-in-time result. Are you ageing slower or faster than your chronological age? The data tells the story.',
  },
  {
    title: 'Long-horizon clinical protocol',
    body: 'A protocol built for a 10-year horizon, not the next six months. Interventions selected for evidence, safety, and long-term biological impact.',
  },
  {
    title: 'Ongoing optimisation',
    body: 'Regular panels, protocol reviews, and adjustments as your biology evolves. Longevity is a practice — one that requires continuous clinical data to get right.',
  },
]

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Longevity Protocol program"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${GLOW} 0%, transparent 60%)` }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-2.5 mb-5"
        >
          <Link href="/services" className="text-[11px] tracking-[0.14em] uppercase font-semibold transition-colors duration-150" style={{ color: '#3a4a5a' }}
            onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3a4a5a' }}
          >
            Clinical Programs
          </Link>
          <span style={{ color: '#2a3a4a' }}>›</span>
          <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: ACCENT }}>
            Longevity Protocol
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <p className="label">Longevity</p>
          <span
            className="text-[8px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
            style={{ color: ACCENT, background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
          >
            Coming soon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(30px, 4.5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: '#f0f4f8',
            maxWidth: '720px',
            marginBottom: '1.25rem',
          }}
        >
          Optimise for the
          <br />
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #e2c16e)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            long game.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ color: '#6b7a8d', maxWidth: '520px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          The Apex Longevity Protocol is our most comprehensive program — a multi-system biological assessment, ongoing tracking, and a doctor-led protocol built for men who are thinking proactively about the next decade, not just the next checkup.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.38, ease }}
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl"
          style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, opacity: 0.8 }} />
          <span className="text-xs font-semibold" style={{ color: ACCENT }}>Joining soon — existing members get first access</span>
        </motion.div>
      </div>
    </section>
  )
}

function PillarsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Program pillars">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-4">
              What it covers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Proactive.{' '}
              <span style={{ color: ACCENT }}>Not reactive.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed"
              style={{ color: '#6b7a8d', maxWidth: '420px' }}
            >
              Most medicine waits for disease to declare itself. The Longevity Protocol is built around a different premise: that the best time to identify and address biological decline is before it becomes symptomatic.
            </motion.p>
          </div>

          <div className="flex flex-col gap-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                className="rounded-xl p-4 flex gap-4"
                style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.08)', borderLeft: `2px solid ${ACCENT}` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
                >
                  <span className="text-[10px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}>{p.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NotifySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Get notified">
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${GLOW} 0%, transparent 55%)` }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Launch access
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 50px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#f0f4f8', marginBottom: '1rem' }}
        >
          Existing members get first access.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ color: '#6b7a8d', maxWidth: '460px', margin: '0 auto 2.5rem', fontSize: '14px', lineHeight: 1.7 }}
        >
          The Longevity Protocol launches to Apex members first. If you&apos;re on an active program, you&apos;ll be contacted when enrollment opens. If you&apos;re not yet a member, starting any program now puts you at the front of the queue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Start a program now
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <Link href="/services" className="btn-ghost">
            View all programs
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xs mt-10 max-w-xl mx-auto"
          style={{ color: '#2e3d4d' }}
        >
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
        </motion.p>
      </div>
    </section>
  )
}

export default function LongevityPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PillarsSection />
        <NotifySection />
      </main>
      <Footer />
    </>
  )
}
