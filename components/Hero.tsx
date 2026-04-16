'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered doctors',
  'No GP referral required',
  'Australia-wide telehealth',
]

const STEPS = [
  {
    n: '01',
    title: 'Complete assessment',
    body: 'Answer questions about your symptoms, goals, and health history.',
  },
  {
    n: '02',
    title: 'Pathology partner',
    body: 'Comprehensive biomarker panel at an Apex-partnered accredited pathology collector.',
  },
  {
    n: '03',
    title: 'Doctor consultation',
    body: 'AHPRA-registered doctor reviews results and designs your protocol.',
  },
  {
    n: '04',
    title: 'Ongoing review',
    body: 'Structured monitoring and adjustments every four months.',
  },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: '100svh', backgroundColor: '#070a0d' }}
      aria-label="Hero — Apex Metabolic Health"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-[0.18]" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 15% 50%, rgba(72,144,247,0.025) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 55% 70% at 85% 30%, rgba(72,144,247,0.06) 0%, transparent 60%)',
        }}
      />
      {/* Subtle horizontal rule at mid-height for depth */}
      <div
        className="absolute left-0 right-0 pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          top: '50%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.025) 70%, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-32 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* ── LEFT COLUMN ────────────────────────────────────────────────── */}
          <div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="flex items-center gap-2.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#4890f7', opacity: 0.7 }} />
              <span className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: '#4890f7' }}>
                Doctor-Led Men's Health — Australia-Wide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(34px, 3.8vw, 58px)',
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#f0f4f8',
                marginBottom: '1.5rem',
                maxWidth: '560px',
              }}
            >
              Most men get reassurance.
              <br />
              <span style={{ color: 'rgba(240,244,248,0.65)' }}>We look deeper.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(14px, 1.05vw, 16px)',
                lineHeight: 1.8,
                color: '#6b7d91',
                maxWidth: '440px',
                marginBottom: '2.5rem',
              }}
            >
              Doctor-led assessments for men dealing with low energy, poor recovery,
              body composition changes, brain fog, and reduced drive.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
              className="mb-9"
            >
              <a
                href="/intake/pre-screen"
                className="inline-flex items-center gap-2.5 transition-all duration-200"
                style={{
                  background: '#f0f4f8',
                  color: '#070a0d',
                  padding: '13px 26px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#ffffff'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(72,144,247,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f0f4f8'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Start Health Assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.52, ease }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {TRUST.map((item, i) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] uppercase"
                  style={{ color: '#3d5166' }}
                >
                  {i > 0 && (
                    <span className="hidden sm:block w-px h-3 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.08)' }} />
                  )}
                  {item}
                </span>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN — Clinical process card ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease }}
            className="relative"
          >
            {/* Outer glow */}
            <div
              className="absolute -inset-px rounded-2xl pointer-events-none"
              aria-hidden="true"
              style={{ boxShadow: '0 0 28px rgba(72,144,247,0.04)' }}
            />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: '#0d1117',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              {/* Card header */}
              <div
                className="px-6 pt-6 pb-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-1.5" style={{ color: '#4890f7' }}>
                      Clinical pathway
                    </p>
                    <h2
                      className="text-base font-semibold"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', letterSpacing: '-0.01em' }}
                    >
                      How Apex works
                    </h2>
                  </div>
                  {/* Status pill */}
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.1)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4890f7' }} />
                    <span className="text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ color: '#4890f7' }}>
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="px-6 py-5">
                <div className="relative">
                  {/* Vertical connector */}
                  <div
                    className="absolute left-[18px] top-7 bottom-7 w-px"
                    aria-hidden="true"
                    style={{ background: 'linear-gradient(to bottom, rgba(72,144,247,0.12), rgba(72,144,247,0.06) 60%, transparent)' }}
                  />

                  <div className="flex flex-col gap-0">
                    {STEPS.map((step, i) => (
                      <div key={step.n} className="flex gap-4 pb-5 last:pb-0">
                        {/* Number node */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                            style={{
                              background: '#111820',
                              border: `1px solid ${i === 0 ? 'rgba(72,144,247,0.22)' : 'rgba(255,255,255,0.06)'}`,
                            }}
                          >
                            <span
                              className="text-[11px] font-bold"
                              style={{
                                fontFamily: 'var(--font-space-grotesk)',
                                color: i === 0 ? '#4890f7' : '#3a4d61',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {step.n}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="pt-1.5 pb-1">
                          <p
                            className="text-sm font-semibold mb-0.5 leading-snug"
                            style={{
                              fontFamily: 'var(--font-space-grotesk)',
                              color: i === 0 ? '#e8f0f8' : '#8899aa',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {step.title}
                          </p>
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: i === 0 ? '#4a6070' : '#2e3d4d' }}
                          >
                            {step.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div
                className="px-6 py-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}
              >
                <p className="text-[11px] leading-relaxed" style={{ color: '#2e3d4d' }}>
                  Assessment-first. Treatment only where clinically appropriate.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-px h-9 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <div className="scroll-drip absolute left-0 w-full" style={{ backgroundColor: '#4890f7', height: '40%' }} />
        </div>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,10,13,0.6))' }}
      />
    </section>
  )
}
