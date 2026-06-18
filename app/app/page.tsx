'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { AppPhoneMockup } from '@/components/AppFeature'

const ease = [0.22, 1, 0.36, 1] as const

const FEATURES = [
  {
    title: 'Biomarker Trends',
    body: 'Every draw plots a point. Watch patterns emerge across months — not single snapshots.',
  },
  {
    title: 'Biological Age',
    body: 'See how your biology ages relative to your chronological years in real time.',
  },
  {
    title: 'Protocol Visibility',
    body: 'Your current protocol, dosing schedule, and doctor notes. Always accessible.',
  },
  {
    title: 'Review Timeline',
    body: 'Know exactly when your next review is — and what will be assessed.',
  },
  {
    title: 'Clinical Progress',
    body: 'Track your treatment response between consultations, not just at them.',
  },
  {
    title: 'Direct Team Access',
    body: 'Message your clinical team without leaving the platform.',
  },
]

export default function AppComingSoon() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: '-60px' })

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

        {/* Hero */}
        <section
          className="relative overflow-hidden flex flex-col items-center justify-center text-center"
          style={{ paddingTop: '140px', paddingBottom: '100px' }}
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(72,144,247,0.07) 0%, transparent 55%)',
            }}
          />
          <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

          <div ref={ref} className="container-tight relative z-10 flex flex-col items-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(72,144,247,0.06)',
                border: '1px solid rgba(72,144,247,0.2)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#4890f7', boxShadow: '0 0 6px rgba(72,144,247,0.8)' }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#4890f7' }}
              >
                In Development
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="display-serif mb-5 mx-auto"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                maxWidth: '720px',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              Your care,{' '}
              <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>
                visible over time.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-base md:text-lg leading-relaxed mb-10 mx-auto"
              style={{ color: 'var(--text-secondary)', maxWidth: '520px' }}
            >
              The Apex app is coming. Track biomarkers, view your protocol, and message your
              clinical team — all in one place, built for continuity of care.
            </motion.p>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.28, ease }}
              className="mb-14"
            >
              <AppPhoneMockup inView={isInView} delay={0.35} />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65, ease }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/intake/pre-screen" className="btn-primary">
                Start Your Assessment
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="text-sm" style={{ color: 'rgba(72,144,247,0.6)' }}>
                App available to all active patients at launch
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features grid */}
        <section
          ref={featuresRef}
          className="relative section-pad"
          style={{ backgroundColor: 'var(--surface)' }}
        >
          <div className="warm-rule" aria-hidden="true" />
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease }}
              className="text-center mb-14"
            >
              <p className="label mb-4">What's inside</p>
              <h2
                className="display-serif"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}
              >
                Built for the long game
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.07, ease }}
                  className="apex-card p-7"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-5"
                    style={{ background: 'rgba(72,144,247,0.55)' }}
                  />
                  <h3
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative section-pad">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.05) 0%, transparent 55%)',
            }}
          />
          <div className="container-tight relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="label mb-5">Don't wait for the app</p>
              <h2
                className="display-serif mb-5 mx-auto"
                style={{ fontSize: 'clamp(28px, 3vw, 44px)', maxWidth: '520px' }}
              >
                Your clinical journey starts with a consultation
              </h2>
              <p
                className="text-base leading-relaxed mb-10 mx-auto"
                style={{ color: 'var(--text-secondary)', maxWidth: '440px' }}
              >
                The app will be available to all Apex patients. Get started today and have full
                access from day one of launch.
              </p>
              <Link href="/intake/pre-screen" className="btn-primary">
                Book a Consultation
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
