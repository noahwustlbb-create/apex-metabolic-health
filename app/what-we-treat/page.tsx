'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'
const ACCENT_BG = 'rgba(72,144,247,0.07)'
const ACCENT_BORDER = 'rgba(72,144,247,0.18)'

// ─── Symptoms ─────────────────────────────────────────────────────────────────

const SYMPTOMS = [
  {
    title: 'Low Energy & Fatigue',
    recognition: 'If you wake up exhausted, crash by midday, or rely on caffeine to function — that\'s worth investigating properly.',
    clinical: 'We assess hormonal, thyroid, iron, cortisol, and metabolic drivers rather than dismissing it as ageing or stress.',
    tags: ['Hormones', 'Thyroid', 'Cortisol', 'Iron'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Brain Fog & Cognitive Performance',
    recognition: 'Can\'t focus, forgetting things, or feeling mentally slower than you should — this has a clinical explanation.',
    clinical: 'Brain fog is a downstream effect of hormonal, thyroid, or metabolic dysfunction. We find the cause.',
    tags: ['Hormones', 'Thyroid', 'Metabolic', 'Cortisol'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9.5 2a5.5 5.5 0 015.5 5.5c0 1.5-.5 2.8-1.4 3.8C14.8 12.5 16 14.1 16 16a4 4 0 01-8 0c0-1.9 1.2-3.5 2.4-4.7A5.5 5.5 0 019.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Sleep Disruption & Stress',
    recognition: 'Waking at 3am, never feeling rested, or running on chronic stress — these aren\'t lifestyle issues, they\'re hormonal ones.',
    clinical: 'Cortisol dysregulation, low testosterone, and thyroid dysfunction are the most common drivers. We measure and manage them.',
    tags: ['Cortisol', 'HPA Axis', 'Sleep', 'Hormones'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Mood, Motivation & Drive',
    recognition: 'Flat affect, low motivation, irritability, or just not feeling like yourself — these are textbook presentations of hormonal dysfunction.',
    clinical: 'Low testosterone and thyroid imbalance are the most common drivers in men. We assess and treat both.',
    tags: ['Testosterone', 'Thyroid', 'Cortisol', 'Hormones'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Weight Gain & Body Composition',
    recognition: 'If you\'re eating well and training but the weight won\'t shift, the problem isn\'t effort — it\'s underlying physiology.',
    clinical: 'Hormonal resistance, poor insulin sensitivity, and metabolic adaptation block progress. We address the root cause.',
    tags: ['Metabolic', 'Insulin', 'Hormones', 'Body Composition'],
    href: '/intake/general-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Performance & Recovery Decline',
    recognition: 'Strength that\'s harder to build, recovery that takes longer, and drive that simply isn\'t there — these are signals, not age.',
    clinical: 'We optimise the hormonal and metabolic physiology that physical performance depends on.',
    tags: ['Performance', 'Hormones', 'Recovery', 'Muscle'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ─── Clinical Areas ───────────────────────────────────────────────────────────

const CLINICAL = [
  {
    title: 'Hormonal Health & Testosterone',
    recognition: 'Testosterone, oestradiol, SHBG, DHEA, prolactin — when these are off, everything downstream suffers.',
    clinical: 'Full hormonal panel, clinical interpretation, and a doctor-led protocol where treatment is appropriate.',
    tags: ['Testosterone', 'TRT', 'Hormones', 'DHEA'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C10.5 2 9.5 3 9.5 4.5V13.5C8 14.3 7 15.8 7 17.5C7 20 9.2 22 12 22C14.8 22 17 20 17 17.5C17 15.8 16 14.3 14.5 13.5V4.5C14.5 3 13.5 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Erectile Dysfunction',
    recognition: 'ED has clinical causes — vascular, hormonal, neurological — and deserves a clinical solution, not a generic script.',
    clinical: 'We assess the root cause and build a treatment approach that addresses it directly, not just symptomatically.',
    tags: ['Sexual Health', 'Vascular', 'Hormones', 'ED'],
    href: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Cardiovascular & Metabolic Risk',
    recognition: 'Most men don\'t know their metabolic risk numbers until something goes wrong. We give you the full picture.',
    clinical: 'Lipids, glucose, HbA1c, inflammation, and cardiovascular markers — assessed, interpreted, and explained.',
    tags: ['Lipids', 'HbA1c', 'CRP', 'Metabolic'],
    href: '/intake/general-consult',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Hair Loss & Skin Regeneration',
    recognition: 'Hair loss and declining skin quality both have identifiable clinical drivers — DHT, nutrient deficiencies, hormones, collagen.',
    clinical: 'We run the blood work, identify the cause, and build a protocol tailored to your pattern.',
    tags: ['DHT', 'Hormones', 'Peptides', 'Nutrition'],
    href: '/programs/hair-restoration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3c-1.5 3-3 5-3 8a3 3 0 006 0c0-3-1.5-5-3-8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 15v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Injury Repair & Recovery',
    recognition: 'Chronic injuries that won\'t resolve, or recovery that stalls after training — these have clinical solutions.',
    clinical: 'Peptide protocols accelerate tissue repair and reduce the inflammation that blocks recovery.',
    tags: ['Peptides', 'Inflammation', 'Tissue Repair', 'Recovery'],
    href: '/programs/injury-repair',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function AreaCard({ area, index }: { area: typeof SYMPTOMS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease }}
    >
      <Link
        href={area.href}
        className="group flex flex-col h-full p-6 rounded-xl transition-all duration-300"
        style={{ background: '#0a0e14', border: '1px solid rgba(255,255,255,0.07)' }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-2px)'
          el.style.borderColor = ACCENT_BORDER
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.borderColor = 'rgba(255,255,255,0.07)'
          el.style.boxShadow = 'none'
        }}
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
          style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
          {area.icon}
        </div>

        <h3 className="text-sm font-bold mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
          {area.title}
        </h3>

        <p className="text-xs leading-relaxed mb-2" style={{ color: '#c5cdd6' }}>
          {area.recognition}
        </p>
        <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: '#5a6a7a' }}>
          {area.clinical}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {area.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-semibold tracking-[0.1em] uppercase px-2 py-1 rounded-sm"
              style={{ color: '#3a4a5a', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200"
          style={{ color: '#3a4a5a' }}>
          <span className="group-hover:text-[#4890f7] transition-colors duration-200">Start assessment</span>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHead({ label, title, sub, inView }: { label: string; title: string; sub: string; inView: boolean }) {
  return (
    <div className="mb-10">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-3">
        {label}
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 0.07, ease }}
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.12, marginBottom: '0.5rem' }}>
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.15, ease }}
        className="text-sm leading-relaxed max-w-lg" style={{ color: '#6b7a8d' }}>
        {sub}
      </motion.p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatWeTreatPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })
  const symptomsRef = useRef(null)
  const symptomsInView = useInView(symptomsRef, { once: true, margin: '-80px' })
  const clinicalRef = useRef(null)
  const clinicalInView = useInView(clinicalRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>

        {/* ── Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
          aria-label="What we treat hero"
        >
          <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-5">
              Focus Areas
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}>
              Your symptoms are signals.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                We read them clinically.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '520px', marginBottom: '2rem' }}>
              You&apos;ve been told your bloods are &ldquo;normal.&rdquo; Normal is not optimal. We investigate what&apos;s actually behind your low energy, poor recovery, weight gain, and lost drive.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.36, ease }}
              className="flex flex-wrap items-center gap-4 mb-8">
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5, ease }}
              className="flex flex-wrap gap-x-6 gap-y-2">
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide telehealth'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Symptoms ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Symptoms we assess">
          <div className="glow-rule" aria-hidden="true" />
          <div ref={symptomsRef} className="container-tight relative z-10">
            <SectionHead
              label="Symptoms"
              title="What our patients commonly experience"
              sub="These are the patterns that bring men to Apex. If something on this list sounds familiar, there's likely a clinical reason — and a clinical answer."
              inView={symptomsInView}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SYMPTOMS.map((area, i) => (
                <AreaCard key={area.title} area={area} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Clinical Areas ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Clinical areas we investigate">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }} />
          <div ref={clinicalRef} className="container-tight relative z-10">
            <SectionHead
              label="Clinical Areas"
              title="What we actually investigate"
              sub="Behind most symptoms is a measurable clinical driver. These are the areas we focus on — not broad wellness categories, but specific, testable physiological problems."
              inView={clinicalInView}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLINICAL.map((area, i) => (
                <AreaCard key={area.title} area={area} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Not sure where you fit">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.06) 0%, transparent 55%)' }} />
          <div className="container-tight relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <p className="label mb-5">Not sure where you fit</p>
              <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#f0f4f8', marginBottom: '1rem' }}>
                60 seconds will point you
                <br />
                <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  in the right direction.
                </span>
              </h2>
              <p className="text-sm leading-relaxed mb-8 mx-auto" style={{ color: '#6b7a8d', maxWidth: '400px' }}>
                Our clinical pre-screen identifies the most relevant pathway for your situation — no commitment, no GP referral required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/intake/pre-screen" className="btn-teal">
                  Start your assessment
                  <span className="btn-circle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
                <Link href="/intake/general-consult" className="btn-ghost">
                  General Appointment
                </Link>
              </div>
              <p className="text-xs mt-8" style={{ color: '#2e3d4d' }}>
                All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
