'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered practitioners',
  'Australia-wide telehealth',
  'No GP referral required',
  'Private & confidential',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: '#07080a' }}
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(72,144,247,0.07) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #07080a, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-tight text-center flex flex-col items-center" style={{ paddingTop: '120px', paddingBottom: '80px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4890f7' }} />
          <span className="label">Doctor-Led Telehealth · Australia-Wide</span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4890f7' }} />
        </motion.div>

        {/* Display headline — Cormorant Garamond */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="display-serif mx-auto mb-6"
          style={{
            fontSize: 'clamp(52px, 8vw, 112px)',
            lineHeight: 1.02,
            maxWidth: '900px',
            color: '#f2efe9',
          }}
        >
          Real answers.<br />
          <span style={{ fontStyle: 'italic', color: 'rgba(242,239,233,0.6)' }}>
            Not reassurance.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            lineHeight: 1.7,
            color: '#7a8a9a',
            maxWidth: '540px',
            marginBottom: '2.5rem',
          }}
        >
          Advanced diagnostics, specialist doctors, and personalised clinical protocols — delivered entirely online.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <a href="/intake/pre-screen" className="btn-primary">
            Start your assessment
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/intake/discovery" className="btn-outline">
            Free discovery call
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.58, ease }}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
        >
          {TRUST.map((item, i) => (
            <span
              key={item}
              className="flex items-center gap-2"
              style={{ fontSize: '11px', color: '#3a4a5a', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              {i > 0 && (
                <span className="hidden sm:block" style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(72,144,247,0.3)', flexShrink: 0 }} />
              )}
              {item}
            </span>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="absolute left-0 right-0 top-0 bottom-0 scroll-drip rounded-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(72,144,247,0.5), transparent)', height: '40%' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
