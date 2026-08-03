'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import HeroStartModal from '@/components/HeroStartModal'

const ease = [0.22, 1, 0.36, 1] as const
const BLUE = 'var(--blue)'
const INK = 'var(--text-primary)'
const BODY_COLOR = 'var(--text-secondary)'
const DARK_INK = '#111827'

export interface ProgramPageConfig {
  slug: string
  name: string
  category: string

  headline: string
  headlineAccent: string
  heroBody: string
  heroBullets: string[]
  heroBentoPortrait: string
  heroBentoStat: { value: string; label: string }
  heroBentoLifestyle: string

  empathyHeadline: string
  empathyBody: string
  empathyChips: string[]
  empathyImage: string

  evidenceHeadline: string
  evidencePoints: { value: string; label: string; detail: string }[]
  evidenceImage: string

  processSteps: { title: string; body: string; time: string; image: string }[]

  mechanismHeadline: string
  mechanismBody: string
  mechanismFeatures: { title: string; body: string }[]
  mechanismImage: string

  testimonials: { name: string; date: string; highlight: string; full: string }[]

  faqs: { q: string; a: string }[]

  ctaHeadline: string
  ctaBody: string
  ctaImage: string
  intakeUrl?: string
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const anim = (delay = 0, y = 20) => ({
    initial: prefersReduced ? false : { opacity: 0, y },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: prefersReduced ? { duration: 0 } : { duration: 0.65, delay, ease },
  })

  return (
    <section
      ref={ref}
      style={{ backgroundColor: 'var(--bg)', paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: 'clamp(64px, 8vw, 100px)' }}
      aria-label={config.name}
    >
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-start">

          {/* Left: text */}
          <div className="max-w-xl">
            <motion.p {...anim(0, 12)} className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: BLUE }}>
              {config.category}
            </motion.p>

            <motion.h1
              {...anim(0.06, 32)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(34px, 5vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                color: INK,
                marginBottom: '0.75rem',
              }}
            >
              {config.headline}{' '}
              <span style={{ color: BLUE }}>{config.headlineAccent}</span>
            </motion.h1>

            <motion.p {...anim(0.14, 16)} style={{ fontSize: '16px', lineHeight: 1.7, color: BODY_COLOR, marginBottom: '2rem' }}>
              {config.heroBody}
            </motion.p>

            <motion.ul {...anim(0.2)} style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {config.heroBullets.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg viewBox="0 0 10 10" fill="none" width={8} height={8} aria-hidden="true">
                      <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div {...anim(0.28)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: '2rem' }}>
              <button
                onClick={onGetStarted}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `linear-gradient(135deg, ${BLUE} 0%, #2563eb 100%)`,
                  color: '#fff', fontSize: 14, fontWeight: 600, padding: '15px 32px',
                  borderRadius: 12, border: 'none', cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(72,144,247,0.35)',
                  fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em',
                  transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(72,144,247,0.45)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(72,144,247,0.35)' }}
              >
                Start your assessment
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link
                href="/discovery-call"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: BODY_COLOR, fontSize: 14, fontWeight: 500, textDecoration: 'none',
                  padding: '15px 24px', borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = INK }}
                onMouseLeave={e => { e.currentTarget.style.color = BODY_COLOR }}
              >
                Free discovery call
              </Link>
            </motion.div>

            <motion.p {...anim(0.36, 0)} style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              AHPRA Registered&nbsp;&nbsp;·&nbsp;&nbsp;TGA Compliant&nbsp;&nbsp;·&nbsp;&nbsp;100% Online
            </motion.p>
          </div>

          {/* Right: bento photo grid - 2-col on mobile, 2-col 2-row on desktop */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, delay: 0.18, ease }}
            className="grid grid-cols-2 grid-rows-[200px] lg:grid-rows-[220px_160px] w-full lg:w-[clamp(280px,38vw,460px)]"
            style={{ gap: 8, flexShrink: 0 }}
          >
            {/* Portrait - 200px on mobile, spans 2 rows on desktop */}
            <div className="row-span-1 lg:row-span-2" style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <Image
                src={config.heroBentoPortrait}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 230px"
                aria-hidden="true"
              />
            </div>

            {/* Stat card */}
            <div style={{
              borderRadius: 16, padding: '16px 14px',
              background: DARK_INK,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(22px, 3.5vw, 42px)',
                fontWeight: 700, color: '#ffffff', lineHeight: 1, letterSpacing: '-0.03em',
                marginBottom: 4,
              }}>
                {config.heroBentoStat.value}
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, lineHeight: 1.4 }}>
                {config.heroBentoStat.label}
              </p>
              <div style={{ width: 24, height: 2, background: BLUE, borderRadius: 1, marginTop: 10 }} />
            </div>

            {/* Lifestyle photo - hidden on mobile, second row on desktop */}
            <div className="hidden lg:block" style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
              <Image
                src={config.heroBentoLifestyle}
                alt=""
                fill
                className="object-cover"
                sizes="230px"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Empathy ──────────────────────────────────────────────────────────────────

function EmpathySection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const anim = (delay = 0) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: prefersReduced ? { duration: 0 } : { duration: 0.65, delay, ease },
  })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', padding: '0 0 clamp(64px, 8vw, 100px)' }} aria-label="Understanding your situation">
      <div className="container-tight">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
          style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 420 }}
        >
          <Image
            src={config.empathyImage}
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.45 }}
            sizes="(max-width: 768px) 100vw, 1200px"
            aria-hidden="true"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,6,13,0.92) 0%, rgba(10,20,40,0.82) 55%, rgba(4,6,13,0.6) 100%)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 70% at 10% 50%, rgba(72,144,247,0.1) 0%, transparent 60%)` }} aria-hidden="true" />

          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(36px, 5vw, 64px)', maxWidth: 600 }}>
            <motion.h2
              {...anim(0.1)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(26px, 3.5vw, 48px)',
                fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em',
                color: '#f0f4f8', marginBottom: '1rem',
              }}
            >
              {config.empathyHeadline}
            </motion.h2>

            <motion.p {...anim(0.18)} style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(240,244,248,0.8)', marginBottom: '1.5rem', maxWidth: '46ch' }}>
              {config.empathyBody}
            </motion.p>

            <motion.div {...anim(0.24)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
              {config.empathyChips.map((chip) => (
                <span key={chip} style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(240,244,248,0.75)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 99, padding: '5px 12px',
                }}>
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.button
              {...anim(0.3)}
              onClick={onGetStarted}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ffffff', color: DARK_INK, fontSize: 13, fontWeight: 600,
                padding: '13px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f0f4f8' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff' }}
            >
              See if I qualify →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Evidence ─────────────────────────────────────────────────────────────────

function EvidenceSection({ config }: { config: ProgramPageConfig }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 100px) 0' }} aria-label="Clinical foundation">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Stats */}
          <div>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(24px, 3vw, 42px)',
                fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em',
                color: INK, marginBottom: '2.5rem',
              }}
            >
              {config.evidenceHeadline}
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {config.evidencePoints.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: i * 0.1, ease }}
                  style={{ paddingBottom: 28, borderBottom: i < config.evidencePoints.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(30px, 3.5vw, 46px)',
                    fontWeight: 700, color: BLUE, lineHeight: 1, letterSpacing: '-0.03em',
                    marginBottom: 4,
                  }}>
                    {p.value}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: INK, marginBottom: 4 }}>{p.label}</p>
                  <p style={{ fontSize: 13, color: BODY_COLOR, lineHeight: 1.6 }}>{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, delay: 0.15, ease }}
            style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}
          >
            <Image
              src={config.evidenceImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────

function ProcessSection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', padding: 'clamp(64px, 8vw, 100px) 0' }} aria-label="How it works">
      <div className="container-tight">
        <div style={{ marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(26px, 3.5vw, 48px)',
              fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em',
              color: INK, marginBottom: '0.75rem',
            }}
          >
            From intake <span style={{ color: BLUE }}>to protocol.</span>
          </motion.h2>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.1, ease }}
            style={{ fontSize: 15, color: BODY_COLOR, maxWidth: '52ch', lineHeight: 1.65 }}
          >
            A structured clinical process, not a quick quiz. Every step has a purpose.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={prefersReduced ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: i * 0.1, ease }}
              style={{
                borderRadius: 16, overflow: 'hidden',
                background: 'var(--surface)',
                border: '1px solid rgba(72,144,247,0.1)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Photo */}
              <div style={{ aspectRatio: '4/3', position: 'relative' }}>
                <Image
                  src={step.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  aria-hidden="true"
                />
                {/* Time chip */}
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(4,6,13,0.65)',
                  border: '1px solid rgba(72,144,247,0.4)',
                  borderRadius: 99, padding: '3px 9px',
                  backdropFilter: 'blur(6px)',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: BLUE }}>
                    {step.time}
                  </span>
                </div>
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  width: 28, height: 28, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BLUE} 0%, #2563eb 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-inter)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '16px 18px 20px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 6, fontFamily: 'var(--font-inter)', lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12, color: BODY_COLOR, lineHeight: 1.65 }}>
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.5, ease }}
          style={{ marginTop: 40, textAlign: 'center' }}
        >
          <button
            onClick={onGetStarted}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `linear-gradient(135deg, ${BLUE} 0%, #2563eb 100%)`,
              color: '#fff', fontSize: 14, fontWeight: 600, padding: '15px 36px',
              borderRadius: 12, border: 'none', cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(72,144,247,0.35)',
              fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em',
              transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(72,144,247,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 24px rgba(72,144,247,0.35)' }}
          >
            Start your assessment
            <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 10, fontFamily: 'var(--font-inter)' }}>
            No GP referral required. 100% online.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Mechanism ────────────────────────────────────────────────────────────────

function MechanismSection({ config }: { config: ProgramPageConfig }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', padding: 'clamp(64px, 8vw, 100px) 0' }} aria-label="Why this approach works">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Features */}
          <div>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(24px, 3vw, 42px)',
                fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em',
                color: INK, marginBottom: '0.75rem',
              }}
            >
              {config.mechanismHeadline}
            </motion.h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.08, ease }}
              style={{ fontSize: 15, color: BODY_COLOR, lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '48ch' }}
            >
              {config.mechanismBody}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {config.mechanismFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                  style={{
                    padding: '18px 20px', borderRadius: 12,
                    background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.1)',
                  }}
                >
                  <p style={{ fontSize: 14, fontWeight: 700, color: INK, marginBottom: 5, fontFamily: 'var(--font-inter)' }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: 12, color: BODY_COLOR, lineHeight: 1.65 }}>{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.8, delay: 0.12, ease }}
            style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '3/4', position: 'relative' }}
          >
            <Image
              src={config.mechanismImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aria-hidden="true"
            />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, rgba(4,6,13,0.6) 100%)` }} aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection({ config }: { config: ProgramPageConfig }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', padding: 'clamp(64px, 8vw, 100px) 0' }} aria-label="Patient experiences">
      <div className="container-tight">
        <motion.h2
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em',
            color: INK, marginBottom: '0.5rem',
          }}
        >
          What patients say.
        </motion.h2>
        <motion.p
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.08 }}
          style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '60ch', lineHeight: 1.6 }}
        >
          Patient experiences reflect individual service interactions. Clinical outcomes vary and cannot be implied or guaranteed.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {config.testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: i * 0.1, ease }}
              style={{
                borderRadius: 16, padding: '24px',
                background: '#1a1f2e',
                display: 'flex', flexDirection: 'column', gap: 16,
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${BLUE} 0%, #2563eb 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-inter)' }}>
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#ffffff', fontFamily: 'var(--font-inter)' }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.date}</p>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', flex: 1 }}>
                <span style={{
                  background: 'rgba(72,144,247,0.2)',
                  borderRadius: 3, padding: '1px 2px', color: '#93b9fd',
                }}>
                  {t.highlight}
                </span>
                {t.full.replace(t.highlight, '')}
              </p>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} viewBox="0 0 12 12" fill={BLUE} width={12} height={12} aria-hidden="true">
                    <path d="M6 1l1.4 2.9L10.5 4 8.5 6l.4 3L6 7.5 3.1 9l.4-3L1.5 4l3.1-.1z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ backgroundColor: 'var(--bg)', padding: 'clamp(0px, 0vw, 0px) 0 clamp(64px, 8vw, 100px)' }} aria-label="Get started">
      <div className="container-tight">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.75, ease }}
          style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', minHeight: 360 }}
        >
          <Image
            src={config.ctaImage}
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.4 }}
            sizes="(max-width: 768px) 100vw, 1200px"
            aria-hidden="true"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,6,13,0.94) 0%, rgba(10,20,50,0.88) 50%, rgba(4,6,13,0.7) 100%)' }} aria-hidden="true" />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 80% at 15% 50%, rgba(72,144,247,0.1) 0%, transparent 60%)` }} aria-hidden="true" />

          <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(48px, 6vw, 72px)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay: 0.1, ease }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(26px, 3.5vw, 52px)',
                fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em',
                color: '#f0f4f8', marginBottom: '1rem', maxWidth: '18ch',
              }}
            >
              {config.ctaHeadline}
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 15, color: 'rgba(240,244,248,0.75)', maxWidth: '48ch', lineHeight: 1.7, marginBottom: '2rem' }}
            >
              {config.ctaBody}
            </motion.p>

            <motion.button
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: 0.3, ease }}
              onClick={onGetStarted}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#ffffff', color: DARK_INK, fontSize: 14, fontWeight: 600,
                padding: '16px 36px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
            >
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width={14} height={14} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>

            <p style={{ fontSize: 11, color: 'rgba(240,244,248,0.35)', marginTop: '2rem', maxWidth: '56ch', lineHeight: 1.6, fontFamily: 'var(--font-inter)' }}>
              All consultations conducted by AHPRA-registered medical practitioners. Treatment only where clinically appropriate. This page does not constitute medical advice.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Sticky Bar ───────────────────────────────────────────────────────────────

function StickyBar({ name, onGetStarted }: { name: string; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={prefersReduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
            background: 'var(--surface)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--border)',
            padding: '12px clamp(16px, 5vw, 48px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: INK, fontFamily: 'var(--font-inter)' }}>{name}</p>
            <p style={{ fontSize: 11, color: '#6b7280' }}>Doctor-led · AHPRA registered · 100% online</p>
          </div>
          <button
            onClick={onGetStarted}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0,
              background: `linear-gradient(135deg, ${BLUE} 0%, #2563eb 100%)`,
              color: '#fff', fontSize: 13, fontWeight: 600, padding: '11px 22px',
              borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-inter)', letterSpacing: '-0.01em',
              boxShadow: '0 4px 16px rgba(72,144,247,0.35)',
              minHeight: 44,
            }}
          >
            Start assessment →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main Template ────────────────────────────────────────────────────────────

// Only these programs use the multi-step clinical questionnaire.
// Every other program gets the lighter intake-form / create-account choice.
const QUESTIONNAIRE_SLUGS = new Set(['hormone-optimisation', 'sexual-health', 'hair-restoration'])

export default function ProgramPageTemplate({ config }: { config: ProgramPageConfig }) {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  const handleGetStarted = () => {
    if (QUESTIONNAIRE_SLUGS.has(config.slug) && config.intakeUrl) {
      router.push(config.intakeUrl)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <Nav />
      <main>
        <HeroSection config={config} onGetStarted={handleGetStarted} />
        <EmpathySection config={config} onGetStarted={handleGetStarted} />
        <EvidenceSection config={config} />
        <ProcessSection config={config} onGetStarted={handleGetStarted} />
        <MechanismSection config={config} />
        <TestimonialsSection config={config} />
        <FAQSection faqs={config.faqs} />
        <FinalCTASection config={config} onGetStarted={handleGetStarted} />
      </main>
      <Footer />
      <StickyBar name={config.name} onGetStarted={handleGetStarted} />

      <AnimatePresence>
        {modalOpen && <HeroStartModal program={config.name} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
