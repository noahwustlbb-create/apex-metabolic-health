'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const TRUST = [
  'AHPRA-registered doctors',
  'No GP referral required',
  'Australia-wide',
  'Personalised treatment plans',
]

const HERO_PROGRAMS = [
  { label: 'Get Started — Hormone Consult',   href: '/intake/fast-track?program=hormone',    primary: true  },
  { label: 'Weight Loss & Metabolic',         href: '/intake/fast-track?program=weightloss', primary: false },
  { label: 'Injury Repair & Performance',     href: '/intake/fast-track?program=recovery',   primary: false },
  { label: 'Anti-Ageing & Longevity',         href: '/intake/fast-track?program=antiageing', primary: false },
  { label: 'Repeat Order — Existing Patient', href: '/intake/fast-track?program=repeat',     primary: false },
]

export default function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col lg:flex-row overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Hero"
    >
      {/* ── Background effects (shared) ── */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none lg:hidden"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }}
      />

      {/* Mobile background image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden lg:hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=1200&q=80"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.1 }}
          priority
          unoptimized
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, var(--bg))' }} />
      </div>

      {/* ── LEFT: Content panel ── */}
      <div
        className="relative z-10 flex flex-col justify-center lg:w-[56%] px-6 md:px-10 lg:pr-12 pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-0 lg:pb-0"
        style={{ paddingLeft: 'max(24px, min(80px, calc((100vw - 1200px) / 2 + 56px)))' }}
      >
        <div className="w-full max-w-[560px] mx-auto lg:ml-0 text-center lg:text-left">

          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-2.5 mb-4 md:mb-8 px-4 py-2 rounded-full"
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

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.06, ease }}
            className="label mb-3 md:mb-5"
          >
            Doctor-Led Telehealth · Australia-Wide
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="display-serif mb-3 md:mb-6"
            style={{ fontSize: 'clamp(34px, 9vw, 86px)' }}
          >
            Doctor-led.{' '}
            <span
              className="lg:block"
              style={{
                background: 'linear-gradient(135deg, #4890f7, #7bb3ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Personalised to you.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-sm md:text-[17px] leading-relaxed mb-5 md:mb-10 max-w-[440px] mx-auto lg:mx-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            Comprehensive, doctor-led care designed around your biology.
          </motion.p>

          {/* Stacked program CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex flex-col gap-1.5 md:gap-2.5 mb-5 md:mb-8 w-full max-w-[440px] mx-auto lg:mx-0"
          >
            {HERO_PROGRAMS.map((p, i) => (
              <motion.a
                key={p.href}
                href={p.href}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.07, ease }}
                className="flex items-center justify-between rounded-xl no-underline group transition-all duration-200"
                style={{
                  background: p.primary ? 'rgba(72,144,247,0.12)' : 'rgba(13,21,37,0.7)',
                  border: `1px solid ${p.primary ? 'rgba(72,144,247,0.4)' : 'rgba(72,144,247,0.12)'}`,
                  padding: '11px 15px',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(72,144,247,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(72,144,247,0.35)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = p.primary ? 'rgba(72,144,247,0.12)' : 'rgba(13,21,37,0.7)'
                  e.currentTarget.style.borderColor = p.primary ? 'rgba(72,144,247,0.4)' : 'rgba(72,144,247,0.12)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span
                  className="font-semibold tracking-wide"
                  style={{ color: p.primary ? '#f0f5ff' : '#c8dcf8', fontSize: '12px', letterSpacing: '0.03em', textTransform: 'uppercase' }}
                >
                  {p.label}
                </span>
                <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: p.primary ? '#4890f7' : 'rgba(200,220,248,0.3)' }} aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            ))}

            <motion.a
              href="/signup"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.72, ease }}
              className="text-center text-[11px] font-medium mt-0.5 transition-colors duration-200"
              style={{ color: 'rgba(200,220,248,0.35)', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#c8dcf8' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(200,220,248,0.35)' }}
            >
              Not sure? Take the Health Assessment instead
            </motion.a>
          </motion.div>

          {/* Trust checkmarks — 3 items on mobile, all 4 on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.54, ease }}
            className="flex flex-wrap items-center gap-x-1 gap-y-1.5 justify-center lg:justify-start"
          >
            {TRUST.map((item, i) => (
              <span
                key={item}
                className={`flex items-center gap-1.5 text-[10px] md:text-[11px] font-medium${i === 3 ? ' hidden md:flex' : ''}`}
                style={{ color: 'var(--text-secondary)' }}
              >
                {i > 0 && (
                  <span
                    className="w-px h-3 mx-1.5 inline-block"
                    style={{ background: 'rgba(72,144,247,0.2)' }}
                    aria-hidden="true"
                  />
                )}
                <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT: Image panel (desktop only) ── */}
      <div className="hidden lg:block lg:w-[44%] relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=960&q=85"
          alt=""
          fill
          className="object-cover object-[60%_center]"
          style={{ opacity: 0.88 }}
          priority
          unoptimized
        />

        {/* Blend left edge into content */}
        <div
          className="absolute inset-y-0 left-0 w-[42%] pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--bg) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-36 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, var(--bg), transparent)' }}
          aria-hidden="true"
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, var(--bg), transparent)' }}
          aria-hidden="true"
        />

        {/* Floating proof card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="absolute bottom-14 right-10 rounded-2xl p-5"
          style={{
            background: 'var(--bg)',
            border: '1px solid rgba(72,144,247,0.18)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(72,144,247,0.08)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            minWidth: 236,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.22)' }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4.5 h-4.5" aria-hidden="true">
                <path d="M10 2a4 4 0 100 8 4 4 0 000-8z" stroke="#4890f7" strokeWidth="1.4" />
                <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M7.5 7l1.5 1.5L12 6" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p
                className="text-[12px] font-bold leading-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
              >
                AHPRA-Registered
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: '#4890f7' }}>
                Every consultation · No exceptions
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-3 pt-4"
            style={{ borderTop: '1px solid rgba(72,144,247,0.1)' }}
          >
            {[
              { value: '1,400+', label: 'Patients' },
              { value: '4.9★',   label: 'Rating'   },
              { value: '< 48h',  label: 'Referral'  },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p
                  className="text-sm font-bold leading-none mb-1"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    color: '#4890f7',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {value}
                </p>
                <p
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 lg:left-[28%] -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'rgba(72,144,247,0.12)' }}>
          <div
            className="absolute w-full scroll-drip"
            style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, #4890f7, transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}
