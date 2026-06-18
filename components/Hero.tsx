'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered doctors',
  'Accredited compounding pharmacy',
  'No GP referral required',
  '100% online — Australia-wide',
]

const MORE_PROGRAMS = [
  { label: 'Hair Restoration',  href: '/intake/general-consult' },
  { label: 'Skin Regeneration', href: '/intake/general-consult' },
  { label: 'Sexual Health',     href: '/intake/general-consult' },
]

export default function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [showMore, setShowMore] = useState(false)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Hero"
    >
      {/* Hero background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.18 }}
          priority
          unoptimized
        />
        {/* Mobile: heavier overlay so text stays readable */}
        <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(4,6,13,0.6)' }} />
        {/* Desktop: right-side fade */}
        <div className="absolute inset-0 hidden lg:block" style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgba(4,6,13,0.55) 40%, transparent 68%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />
      </div>

      <div className="absolute inset-0 dot-grid opacity-100" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
      />

      <div className="container-tight relative z-10 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(72,144,247,0.06)',
              border: '1px solid rgba(72,144,247,0.18)',
            }}
          >
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 10 10" fill="#4890f7" className="w-2.5 h-2.5" aria-hidden="true">
                  <path d="M5 1l1.12 2.27L9 3.64 7 5.59l.47 2.74L5 7l-2.47 1.33L3 5.59 1 3.64l2.88-.37z" />
                </svg>
              ))}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: '#4890f7' }}>
              Trusted by 1,400+ patients across Australia
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.04, ease }}
            className="label mb-6"
          >
            Doctor-Led Telehealth · Australia-Wide
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="display-serif mb-6"
            style={{ fontSize: 'clamp(48px, 8vw, 108px)' }}
          >
            Real answers.{' '}
            <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Not reassurance.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your GP said everything looks normal. You know something is wrong.
            We run the diagnostics GPs don&apos;t order — interpreted by doctors who specialise in exactly this.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex flex-col items-center mb-16 w-full"
            style={{ maxWidth: 440 }}
          >
            {/* Stacked program CTAs */}
            {[
              {
                label: 'Start Health Assessment',
                href: '/intake/pre-screen',
                primary: true,
              },
              {
                label: 'Get Started — Hormone Consult',
                href: '/intake/hormone-consult',
                primary: false,
              },
              {
                label: 'Weight Loss & Metabolic Health',
                href: '/intake/metabolic',
                primary: false,
              },
              {
                label: 'Performance & Recovery',
                href: '/intake/performance',
                primary: false,
              },
              {
                label: 'General Telehealth Consult',
                href: '/intake/general-consult',
                primary: false,
              },
              {
                label: 'Anti-Ageing & Longevity',
                href: '/intake/general-consult',
                primary: false,
              },
              {
                label: 'Injury Repair',
                href: '/intake/injury',
                primary: false,
              },
            ].map(({ label, href, primary }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.34 + i * 0.07, ease }}
                className="w-full flex items-center justify-between px-5 transition-all duration-200"
                style={{
                  marginBottom: i < 6 ? '8px' : 0,
                  height: '54px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  ...(primary
                    ? {
                        background: '#4890f7',
                        color: '#ffffff',
                        border: '1px solid #4890f7',
                        boxShadow: '0 4px 24px rgba(72,144,247,0.30)',
                      }
                    : {
                        background: 'rgba(72,144,247,0.04)',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(72,144,247,0.2)',
                      }),
                }}
                onMouseEnter={e => {
                  if (primary) {
                    e.currentTarget.style.background = '#5fa0ff'
                    e.currentTarget.style.boxShadow = '0 6px 32px rgba(72,144,247,0.42)'
                  } else {
                    e.currentTarget.style.background = 'rgba(72,144,247,0.09)'
                    e.currentTarget.style.borderColor = 'rgba(72,144,247,0.4)'
                  }
                }}
                onMouseLeave={e => {
                  if (primary) {
                    e.currentTarget.style.background = '#4890f7'
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(72,144,247,0.30)'
                  } else {
                    e.currentTarget.style.background = 'rgba(72,144,247,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(72,144,247,0.2)'
                  }
                }}
              >
                <span>{label}</span>
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12" aria-hidden="true" style={{ flexShrink: 0, opacity: primary ? 1 : 0.45 }}>
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ))}

            {/* Explore all programs toggle */}
            <button
              onClick={() => setShowMore(o => !o)}
              className="w-full flex items-center justify-between px-5 mt-2 transition-all duration-200"
              style={{
                height: '44px',
                borderRadius: '6px',
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid rgba(72,144,247,0.12)',
                opacity: 0.55,
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.12)' }}
            >
              <span>{showMore ? 'Show less' : 'Explore all programs'}</span>
              <motion.svg
                viewBox="0 0 14 14" fill="none" width="12" height="12" aria-hidden="true"
                animate={{ rotate: showMore ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexShrink: 0 }}
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </button>

            {/* Expanded secondary programs */}
            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  key="more"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: 'hidden', width: '100%' }}
                >
                  <div className="flex flex-col gap-2 pt-2">
                    {MORE_PROGRAMS.map(({ label, href }) => (
                      <a
                        key={href}
                        href={href}
                        className="w-full flex items-center justify-between px-5 transition-all duration-150"
                        style={{
                          height: '48px',
                          borderRadius: '6px',
                          fontFamily: 'var(--font-space-grotesk)',
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          background: 'rgba(72,144,247,0.03)',
                          color: 'var(--text-primary)',
                          border: '1px solid rgba(72,144,247,0.14)',
                          opacity: 0.7,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.08)'; e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.3)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(72,144,247,0.03)'; e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.14)' }}
                      >
                        <span>{label}</span>
                        <svg viewBox="0 0 14 14" fill="none" width="11" height="11" aria-hidden="true" style={{ flexShrink: 0, opacity: 0.35 }}>
                          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Soft fallback link */}
            <a
              href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xs font-medium transition-opacity duration-200"
              style={{ color: 'var(--text-primary)', opacity: 0.38 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.65' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.38' }}
            >
              Not sure where to start? Book a free discovery call →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {TRUST.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1.5"
                style={{
                  color: '#4890f7',
                  background: 'rgba(72,144,247,0.05)',
                  border: '1px solid rgba(72,144,247,0.18)',
                  borderRadius: '2px',
                }}
              >
                {i > 0 && <span className="w-px h-3 hidden" />}
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(72,144,247,0.12)' }}>
          <div className="absolute w-full scroll-drip" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #4890f7, transparent)' }} />
        </div>
      </div>
    </section>
  )
}
