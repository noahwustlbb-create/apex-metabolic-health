'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const PROGRAMS = [
  {
    category: 'Hormonal Health',
    name: 'Hormone Optimisation',
    tagline: 'Low drive, poor recovery, body composition changes, often rooted in hormonal dysfunction that standard testing misses.',
    tag: 'Most common',
    accent: 'var(--blue)',
    accentBg: 'rgba(72,144,247,0.12)',
    accentBorder: 'rgba(72,144,247,0.3)',
    glowColor: 'rgba(72,144,247,0.45)',
    href: '/programs/hormone-optimisation',
    intakeHref: 'https://app.apexmetabolichealth.com.au/intake/hormone',
    image: 'https://images.unsplash.com/photo-1734443544776-7161343f09d2?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center 30%',
    bg: '#06111f',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" strokeLinecap="round" />
        <circle cx="10" cy="10" r="4" />
      </svg>
    ),
  },
  {
    category: 'Metabolic Health',
    name: 'Medical Weight Loss',
    tagline: "Stubborn weight that doesn't respond to diet or exercise? There's usually a clinical driver that hasn't been investigated.",
    tag: null,
    accent: '#00a89e',
    accentBg: 'rgba(0,168,158,0.12)',
    accentBorder: 'rgba(0,168,158,0.3)',
    glowColor: 'rgba(0,168,158,0.4)',
    href: '/programs/metabolic-weight-loss',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#061509',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 17l4-8 4 4 3-6 3 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="6" r="2" />
      </svg>
    ),
  },
  {
    category: "Men's Sexual Health",
    name: 'Sexual Health',
    tagline: 'Sexual health concerns are medical issues. We identify the clinical drivers (hormonal, vascular, and beyond) and treat them properly.',
    tag: null,
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
    accentBorder: 'rgba(167,139,250,0.3)',
    glowColor: 'rgba(167,139,250,0.4)',
    href: '/programs/sexual-health',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=800&q=90',
    imgPos: 'center 20%',
    bg: '#0d0818',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 3c0 0-5 4-5 8a5 5 0 0010 0c0-4-5-8-5-8z" strokeLinejoin="round" />
        <path d="M10 11v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: 'Recovery & Rehabilitation',
    name: 'Injury Repair & Recovery',
    tagline: "Slow healing, recurring injury, post-surgical recovery: clinical protocols that support what the body can't do alone.",
    tag: null,
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.12)',
    accentBorder: 'rgba(74,222,128,0.3)',
    glowColor: 'rgba(74,222,128,0.4)',
    href: '/programs/injury-repair',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=90',
    imgPos: 'center center',
    bg: '#050f0d',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 10h8M10 6v8" strokeLinecap="round" />
        <rect x="3" y="3" width="14" height="14" rx="3" />
      </svg>
    ),
  },
  {
    category: 'Longevity & Healthspan',
    name: 'Anti-Ageing & Longevity',
    tagline: 'Proactive protocols to extend healthspan, not just lifespan. Biological markers assessed and optimised before problems develop.',
    tag: null,
    accent: '#c9a84c',
    accentBg: 'rgba(201,168,76,0.12)',
    accentBorder: 'rgba(201,168,76,0.3)',
    glowColor: 'rgba(201,168,76,0.4)',
    href: '/programs/longevity',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0d0818',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: 'Skin & Hair',
    name: 'Skin and Hair',
    tagline: "Skin quality, hair loss, texture, and ageing, driven by internal biology that topical products can't reach. We address the root cause.",
    tag: null,
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.12)',
    accentBorder: 'rgba(56,189,248,0.3)',
    glowColor: 'rgba(56,189,248,0.4)',
    href: '/programs/skin-regeneration',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1781178339148-d6ac1edb7b8f?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#071116',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: 'Diagnostic Pathology',
    name: 'Comprehensive Blood Tests',
    tagline: '30+ markers: hormones, metabolism, inflammation, nutrition. Doctor-issued, doctor-reviewed, doctor-explained.',
    tag: null,
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.12)',
    accentBorder: 'rgba(249,115,22,0.3)',
    glowColor: 'rgba(249,115,22,0.4)',
    href: '/programs/pathology',
    intakeHref: 'https://app.apexmetabolichealth.com.au/signup',
    image: 'https://images.unsplash.com/photo-1570917013020-a6966d3ee863?auto=format&fit=crop&w=800&q=85',
    imgPos: 'center center',
    bg: '#0d0c08',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M7 3h6M8 3v2a4 4 0 108 0V3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 8h8l1 9H5L6 8z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function ProgramCard({ p, i, inView }: { p: typeof PROGRAMS[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.07, ease }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{ background: p.bg, minHeight: 400 }}
    >
      {/* Photography */}
      <img
        src={p.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ objectPosition: p.imgPos, opacity: 0.6 }}
      />

      {/* Bottom gradient protecting text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${p.bg} 0%, ${p.bg}f0 38%, ${p.bg}80 60%, transparent 80%)` }}
      />

      {/* Accent glow - revealed on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 90% 50% at 50% 100%, ${p.glowColor.replace(/[\d.]+\)$/, '0.3)')} 0%, transparent 65%)` }}
      />

      {/* Tag badge at top */}
      {p.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className="text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.accent }}
          >
            {p.tag}
          </span>
        </div>
      )}

      {/* Content pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5 z-10">
        {/* Category row */}
        <div className="flex items-center gap-2 mb-2.5">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 scale-90"
            style={{ background: p.accentBg, border: `1px solid ${p.accentBorder}`, color: p.accent }}
          >
            {p.icon}
          </div>
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: p.accent }}>
            {p.category}
          </span>
        </div>

        <h3
          className="font-bold leading-snug mb-2"
          style={{ fontFamily: 'var(--font-inter)', fontSize: '17px', color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          {p.name}
        </h3>

        <p className="text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.68)', maxWidth: 260 }}>
          {p.tagline}
        </p>

        {/* CTA row */}
        <div className="flex items-center gap-4">
          <Link
            href={p.intakeHref}
            className="text-[11px] font-bold tracking-[0.06em] uppercase px-4 py-2 rounded-lg transition-all duration-150"
            style={{ background: p.accent, color: '#fff', boxShadow: `0 4px 16px ${p.glowColor.replace(/[\d.]+\)$/, '0.4)')}` }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)' }}
          >
            Get started
          </Link>
          <Link
            href={p.href}
            className="text-[11px] font-medium transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
          >
            Learn more →
          </Link>
        </div>
      </div>

      {/* Inset glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${p.accent}50` }}
      />
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

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
          aria-label="Clinical treatments"
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
              Clinical Treatments
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(30px, 4vw, 58px)',
                fontWeight: 800,
                lineHeight: 1.06,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                maxWidth: '720px',
                marginBottom: '1.25rem',
              }}
            >
              Most clinics treat symptoms.{' '}
              <span style={{ color: 'var(--blue)' }}>
                We assess systems.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              style={{ color: 'var(--text-secondary)', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
            >
              Seven doctor-led programs, each targeting a distinct biological system with its own clinical pathway, blood panel, and personalised protocol.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide telehealth'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--blue)' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--blue)', opacity: 0.5 }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Program Cards - dark cinematic section ────────────── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#080d18', paddingTop: '72px', paddingBottom: '72px' }}
          aria-label="Treatments"
        >
          {/* Top edge rule */}
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.2), transparent)' }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.04) 0%, transparent 65%)' }}
            aria-hidden="true"
          />

          <div ref={cardsRef} className="container-tight relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p className="text-sm font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Not sure which treatment fits?
                </p>
                <p className="text-xs" style={{ color: 'rgba(72,144,247,0.8)' }}>
                  Complete the 60-second pre-screen and we&apos;ll identify the right clinical pathway for you.
                </p>
              </div>
              <Link
                href="https://app.apexmetabolichealth.com.au/signup"
                className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0 px-5 py-2.5 rounded-lg transition-all duration-150"
                style={{
                  background: 'rgba(72,144,247,0.1)',
                  border: '1px solid rgba(72,144,247,0.25)',
                  color: 'var(--blue)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(72,144,247,0.18)'
                  el.style.borderColor = 'rgba(72,144,247,0.4)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(72,144,247,0.1)'
                  el.style.borderColor = 'rgba(72,144,247,0.25)'
                }}
              >
                Take the health assessment
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Bottom edge rule */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.15), transparent)' }}
            aria-hidden="true"
          />
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section
          ref={ctaRef}
          className="relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg)', paddingTop: '80px', paddingBottom: '100px' }}
          aria-label="Get started"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.05) 0%, transparent 55%)' }}
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
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(28px, 3.5vw, 52px)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}
            >
              Get answers.{' '}
              <span style={{ color: 'var(--blue)' }}>
                Not reassurance.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: 1.7 }}
            >
              Doctor-led assessment. Advanced diagnostics. A protocol built around your biology, not a generic plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="https://app.apexmetabolichealth.com.au/signup" className="btn-pill">
                Take the health assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
              <Link
                href="https://app.apexmetabolichealth.com.au/signup"
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--blue)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                Book a free discovery call
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs mt-10"
              style={{ color: 'var(--text-muted)' }}
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
