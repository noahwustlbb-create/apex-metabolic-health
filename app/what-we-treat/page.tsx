'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FOCUS_AREAS = [
  {
    title: 'Low Energy & Fatigue',
    description:
      'Waking up exhausted, hitting a wall by midday, running on caffeine — this isn\'t normal and it\'s not just "getting older." We dig into the underlying physiology: hormones, thyroid, iron, cortisol, and more.',
    tags: ['Hormones', 'Thyroid', 'Iron', 'Cortisol'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Hormonal Imbalance',
    description:
      'Testosterone, oestradiol, SHBG, DHEA, prolactin — when these are off, everything suffers. Mood, drive, sleep, body composition, and recovery all run downstream from your hormonal baseline.',
    tags: ['Testosterone', 'TRT', 'Thyroid', 'DHEA'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C10.5 2 9.5 3 9.5 4.5V13.5C8 14.3 7 15.8 7 17.5C7 20 9.2 22 12 22C14.8 22 17 20 17 17.5C17 15.8 16 14.3 14.5 13.5V4.5C14.5 3 13.5 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="17.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Weight Optimisation',
    description:
      'If you\'re eating well and training but the weight won\'t shift, the issue is rarely effort. Hormonal resistance, poor insulin sensitivity, and metabolic adaptation all block progress — we address the cause.',
    tags: ['Metabolic Health', 'Peptides', 'Insulin', 'GLP-1'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3v18M3 12h18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Performance Decline',
    description:
      'Strength that\'s harder to build, recovery that takes longer, and drive that\'s simply not there — these aren\'t signs of ageing, they\'re signals. We optimise the physiology that performance depends on.',
    tags: ['Performance', 'Recovery', 'Hormones', 'Nutrition'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Brain Fog & Cognitive Decline',
    description:
      'Can\'t focus, forgetting things, mentally slow — brain fog is often a downstream effect of hormonal or metabolic dysfunction. When the underlying cause is addressed, clarity follows.',
    tags: ['Hormones', 'Thyroid', 'Cortisol', 'Metabolic'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9.5 2a5.5 5.5 0 015.5 5.5c0 1.5-.5 2.8-1.4 3.8C14.8 12.5 16 14.1 16 16a4 4 0 01-8 0c0-1.9 1.2-3.5 2.4-4.7A5.5 5.5 0 019.5 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Low Libido & Sexual Health',
    description:
      'Reduced sex drive is one of the most common — and least discussed — symptoms of hormonal imbalance. We assess the full picture: testosterone, prolactin, vascular health, and psychological factors.',
    tags: ['Testosterone', 'Sexual Health', 'Hormones', 'Peptides'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Erectile Dysfunction',
    description:
      'ED has clinical causes — vascular, hormonal, neurological, and psychological — and it deserves a clinical solution. We assess the root cause and build a treatment approach that actually addresses it.',
    tags: ['Sexual Health', 'Hormones', 'Vascular', 'Peptides'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Men's Health",
    description:
      'A broad clinical pathway for men who want a thorough, evidence-based health review. From cardiovascular risk to hormonal health — we look at the full picture, not just what your last GP checked.',
    tags: ["Men's Health", 'Preventive', 'Hormones', 'Metabolic'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a6 6 0 0112 0v2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Sleep Disruption',
    description:
      'Poor sleep quality, waking at 3am, or never feeling rested can be driven by cortisol dysregulation, low testosterone, or thyroid imbalance — not just lifestyle. We investigate and treat what\'s behind it.',
    tags: ['Cortisol', 'Hormones', 'Thyroid', 'Recovery'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Mood & Motivation',
    description:
      'Flat affect, irritability, low motivation, and apathy are commonly dismissed as stress. They are also textbook presentations of hormonal dysfunction — particularly low testosterone and thyroid imbalance.',
    tags: ['Testosterone', 'Cortisol', 'Thyroid', 'Hormones'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Stress & Cortisol',
    description:
      'Chronic stress drives cortisol dysregulation, which suppresses testosterone, disrupts thyroid function, promotes fat storage, and impairs recovery. We measure and manage this clinically.',
    tags: ['Cortisol', 'Adrenal', 'HPA Axis', 'Hormones'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22V12M12 12C12 12 8 10 8 6a4 4 0 018 0c0 4-4 6-4 6z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Cardiovascular & Metabolic Risk',
    description:
      'Lipids, glucose, HbA1c, inflammation markers — most people don\'t know their numbers until something goes wrong. We give you a complete metabolic risk profile and a plan to improve it.',
    tags: ['Lipids', 'HbA1c', 'CRP', 'Glucose'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Anti-Ageing & Longevity',
    description:
      'Ageing is a biological process with measurable drivers — hormonal decline, oxidative stress, inflammation, and cellular dysfunction. We use evidence-based protocols to slow the process and optimise healthspan.',
    tags: ['Peptides', 'Hormones', 'Longevity', 'Anti-Ageing'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Muscle Health & Sarcopenia',
    description:
      'Losing muscle with age isn\'t inevitable — it\'s a clinical problem with clinical solutions. We address the hormonal and nutritional drivers of muscle loss and build protocols to reverse the trend.',
    tags: ['Testosterone', 'Peptides', 'Recovery', 'Nutrition'],
    href: '/intake/hormone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6.5 6.5h11M6.5 17.5h11M4 10h2.5M17.5 10H20M4 14h2.5M17.5 14H20" strokeLinecap="round" />
        <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      </svg>
    ),
  },
  {
    title: 'Hair Restoration',
    description:
      'Hair loss in men is usually hormonal — DHT sensitivity, nutrient deficiencies, and scalp health all contribute. We run the blood work, identify the drivers, and build a protocol tailored to your pattern.',
    tags: ['DHT', 'Hormones', 'Peptides', 'Nutrition'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 3c-1.5 3-3 5-3 8a3 3 0 006 0c0-3-1.5-5-3-8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 15v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Skin Regeneration',
    description:
      'Skin quality is a marker of internal health. We use peptide protocols and evidence-based interventions to support cellular repair and collagen production — not cosmetic treatments.',
    tags: ['Peptides', 'Collagen', 'Anti-Ageing', 'Cellular Health'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Injury Repair & Recovery',
    description:
      'Whether it\'s a chronic injury that won\'t heal or a recent setback affecting your training, peptide therapy can accelerate tissue repair and reduce the inflammation that stalls recovery.',
    tags: ['BPC-157', 'Peptides', 'Inflammation', 'Recovery'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Nutrient Deficiencies',
    description:
      'Vitamin D, B12, magnesium, iron, and ferritin deficiencies are widespread and clinically significant. Many men are running on empty without knowing it — a simple blood panel shows the full picture.',
    tags: ['Vitamin D', 'B12', 'Iron', 'Magnesium'],
    href: '/order-bloods',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 3H15L17 8H7L9 3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 8C7 8 5 12 5 15.5C5 18.5 8.1 21 12 21C15.9 21 19 18.5 19 15.5C19 12 17 8 17 8H7Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Pathology & Blood Testing',
    description:
      'If you want answers, you need data. Our doctor-ordered blood panels cover every clinically relevant marker — no GP referral required. Collect at any accredited pathology centre near you.',
    tags: ['Blood Tests', 'Biomarkers', 'No Referral', 'Pathology'],
    href: '/order-bloods',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M8 3l-1 6H5l3 8a3 3 0 006 0l3-8h-2L14 3H8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Telehealth Consultations',
    description:
      'All consultations are conducted online with AHPRA-registered doctors. Australia-wide, no GP referral required. You get a real clinical consultation — not a five-minute script factory.',
    tags: ['Online', 'Australia-Wide', 'No Referral', 'Telehealth'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Medical Certificates',
    description:
      'Need a medical certificate fast? Our doctors can assess and issue certificates via telehealth. Available same day through a standard general consultation — no waiting room.',
    tags: ['Medical Cert', 'Same Day', 'Online', 'General Consult'],
    href: '/intake/general',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h4" strokeLinecap="round" />
      </svg>
    ),
  },
]

function AreaCard({ area, index }: { area: typeof FOCUS_AREAS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={area.href}
        className="group flex flex-col h-full p-7 rounded-xl transition-all duration-300"
        style={{
          background: '#111820',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(-3px)'
          el.style.borderColor = 'rgba(72,144,247,0.35)'
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.borderColor = 'rgba(255,255,255,0.07)'
          el.style.boxShadow = 'none'
        }}
      >
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 flex-shrink-0"
          style={{
            background: 'rgba(72,144,247,0.07)',
            border: '1px solid rgba(72,144,247,0.15)',
            color: '#4890f7',
          }}
        >
          {area.icon}
        </div>

        <h3
          className="text-base font-bold mb-2 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          {area.title}
        </h3>

        <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#8899aa' }}>
          {area.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {area.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1 rounded-sm"
              style={{
                color: '#4a5a6a',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200"
          style={{ color: '#4a5a6a' }}
        >
          <span className="group-hover:text-[#4890f7] transition-colors duration-200">
            Get Started
          </span>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </motion.div>
  )
}

export default function WhatWeTreatPage() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
          aria-label="What we treat hero"
        >
          <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)',
            }}
          />

          <div ref={headingRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="label mb-5"
            >
              Focus Areas
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}
            >
              Your symptoms are signals.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                We read them clinically.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '520px', marginBottom: '2rem' }}
            >
              You&apos;ve been told your bloods are &ldquo;normal.&rdquo; Normal is not optimal. We dig into what&apos;s actually driving your low energy, poor recovery, weight gain, and lost drive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={headingInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide telehealth', '2,000+ assessments completed'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#0d1117' }}
          aria-label="Focus areas grid"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FOCUS_AREAS.map((area, i) => (
                <AreaCard key={area.title} area={area} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#070a0d' }}
          aria-label="Get started"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 55%)' }}
          />
          <div className="container-tight relative z-10 text-center">
            <h2
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#f0f4f8', marginBottom: '1rem' }}
            >
              Not sure where you fit?
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                60 seconds will tell you.
              </span>
            </h2>
            <div className="flex flex-col items-center gap-3 mt-6">
              <Link href="/intake/pre-screen" className="btn-teal">
                Start your clinical assessment
                <span className="btn-circle" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </Link>
              <p className="text-xs" style={{ color: '#3a4a5a' }}>No commitment. An Apex doctor contacts you same day.</p>
            </div>
            <p className="text-sm mt-10" style={{ color: '#3a4a5a' }}>
              Next: <Link href="/services" style={{ color: '#4890f7' }} className="hover:underline">explore our clinical programs →</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
