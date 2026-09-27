'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

const TREATMENTS = [
  { href: '/programs/hormone-optimisation', label: 'Hormone Optimisation', sub: 'Energy, drive and recovery, restored through precise hormonal balancing.', image: '/protocols/hormone.jpg', imgPos: 'center 30%', tag: 'Most popular' },
  { href: '/programs/metabolic-weight-loss', label: 'Medical Weight Loss', sub: 'A doctor-led metabolic reset that targets the real drivers of weight resistance.', image: '/protocols/weight.jpg', imgPos: 'center center', tag: null },
  { href: '/programs/sexual-health', label: 'Sexual Health', sub: 'Private, confidential care that treats the root cause, not just the symptom.', image: '/protocols/sexual.jpg', imgPos: 'center center', tag: null },
  { href: '/programs/injury-repair', label: 'Recovery and Injury Repair', sub: 'Regenerative protocols for performance, rehabilitation and mobility.', image: '/protocols/recovery.jpg', imgPos: 'center center', tag: null },
  { href: '/programs/longevity', label: 'Anti-Ageing and Longevity', sub: 'Healthspan, vitality and prevention, measured and managed over time.', image: '/protocols/longevity.jpg', imgPos: 'center center', tag: 'New' },
  { href: '/programs/skin-regeneration', label: 'Skin and Hair', sub: 'Evidence-based restoration and regeneration for skin and hair.', image: '/protocols/skin.jpg', imgPos: 'center center', tag: null },
  { href: '/programs/pathology', label: 'Comprehensive Blood Tests', sub: 'Full-panel diagnostics that go well beyond the standard GP screen, doctor reviewed.', image: '/protocols/bloods.jpg', imgPos: 'center center', tag: null },
]

function TreatmentCard({ t, i }: { t: (typeof TREATMENTS)[number]; i: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.a
      ref={ref}
      href={t.href}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: (i % 3) * 0.08, ease }}
      className="group prog-card"
      style={{ textDecoration: 'none' }}
    >
      <span className="prog-card-art" aria-hidden>
        <Image
          src={t.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          style={{ objectPosition: t.imgPos }}
        />
      </span>
      {t.tag && <span className="prog-card-tag">{t.tag}</span>}
      <div className="prog-card-text">
        <h2 className="prog-card-title">{t.label}</h2>
        <p className="prog-card-sub">{t.sub}</p>
        <span className="prog-card-more">
          Explore program
          <span className="stage-cta-arrow prog-card-arrow" aria-hidden>
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </span>
      </div>
    </motion.a>
  )
}

export default function TreatmentsPage() {
  const prefersReduced = useReducedMotion()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', paddingTop: 160, paddingBottom: 64 }}>
          <div className="absolute inset-0 dot-grid opacity-[0.12]" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(72,144,247,0.08) 0%, transparent 70%)' }}
          />
          <div ref={heroRef} className="container-tight relative z-10">
            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 26 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.75, delay: 0.06, ease }}
              className="font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-inter)', fontFeatureSettings: '"cv11", "ss03"', fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--text-primary)', maxWidth: 820, marginBottom: 20 }}
            >
              Doctor-led programs, built around{' '}
              <span style={{ color: 'var(--blue)' }}>your biology.</span>
            </motion.h1>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.65, delay: 0.18, ease }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: 28 }}
            >
              Every program starts with advanced diagnostics and a real doctor. Choose the area
              that fits, or take the assessment and we&apos;ll point you to the right one.
            </motion.p>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.28, ease }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', '100% online, Australia-wide'].map(t => (
                <span key={t} className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden>
                    <path d="M3 8.5l3.2 3.2L13 5" stroke="var(--blue)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="relative section-pad-sm" style={{ backgroundColor: 'var(--bg)' }}>
          <div className="container-tight">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TREATMENTS.map((t, i) => <TreatmentCard key={t.href} t={t} i={i} />)}

              {/* Assessment CTA tile, fills the 8th slot */}
              <div
                className="flex flex-col justify-center rounded-2xl p-7"
                style={{ background: 'linear-gradient(150deg, rgba(72,144,247,0.14), rgba(29,79,216,0.1))', border: '1px solid rgba(72,144,247,0.28)', aspectRatio: '4 / 5' }}
              >
                <h2 className="mb-3 font-bold" style={{ fontFamily: 'var(--font-inter)', fontFeatureSettings: '"cv11", "ss03"', fontSize: 'clamp(20px, 2vw, 24px)', letterSpacing: '-0.01em', lineHeight: 1.12, color: 'var(--text-primary)' }}>
                  Not sure which is right for you?
                </h2>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Answer a few quick questions and we&apos;ll match you to the right program and doctor.
                </p>
                <a
                  href="/start"
                  className="inline-flex w-fit items-center gap-2.5 font-semibold"
                  style={{ background: 'linear-gradient(135deg, #4890f7 0%, #1d4fd8 100%)', color: '#fff', fontSize: 15, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 28px rgba(72,144,247,0.35)' }}
                >
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
