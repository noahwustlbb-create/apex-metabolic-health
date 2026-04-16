'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Section({
  children,
  bg = '#070a0d',
  label,
}: {
  children: React.ReactNode
  bg?: string
  label?: string
}) {
  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: bg }}
      aria-label={label}
    >
      <div className="glow-rule" aria-hidden="true" />
      {children}
    </section>
  )
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function OurApproachPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  return (
    <>
      <Nav />
      <main>

        {/* ── 1. Hero ── */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', paddingTop: '150px', paddingBottom: '100px' }}
          aria-label="Our approach hero"
        >
          <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[900px] h-[600px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 55%)' }}
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
          />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="label mb-5"
            >
              The Apex Method
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}
            >
              We work by system.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not by symptom.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '520px', marginBottom: '2rem' }}
            >
              Every clinical decision is guided by data, context, and a doctor who takes the time to understand the full picture. Not the fastest path to a script.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
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
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {['AHPRA-registered doctors', 'No GP referral required', 'Australia-wide telehealth', 'Data-led, not assumption-led'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 2. The Problem ── */}
        <Section bg="#0d1117" label="The problem with standard healthcare">
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <FadeIn>
              <p className="label mb-6">THE PROBLEM</p>
            </FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
                >
                  Most healthcare is{' '}
                  <span style={{ color: '#4a5a6a' }}>reactive.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-5" style={{ color: '#8899aa' }}>
                  Short consults. Surface-level assessments. One-size-fits-all recommendations.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#4a5a6a' }}>
                  That&apos;s not how high-performing individuals operate — and it&apos;s not how we practise.
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Standard care', value: '5–10 min consult', negative: true },
                    { label: 'Standard care', value: 'Surface-level bloodwork', negative: true },
                    { label: 'Standard care', value: 'Symptom management only', negative: true },
                    { label: 'Apex Protocol', value: 'Thorough clinical consultation', negative: false },
                    { label: 'Apex Protocol', value: 'Comprehensive biomarker analysis', negative: false },
                    { label: 'Apex Protocol', value: 'Ongoing, structured optimisation', negative: false },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-lg"
                      style={{
                        background: row.negative ? 'rgba(255,255,255,0.02)' : 'rgba(72,144,247,0.06)',
                        border: `1px solid ${row.negative ? 'rgba(255,255,255,0.05)' : 'rgba(72,144,247,0.18)'}`,
                      }}
                    >
                      <span
                        className="text-[10px] font-semibold tracking-[0.15em] uppercase flex-shrink-0"
                        style={{ color: row.negative ? '#4a5a6a' : '#4890f7' }}
                      >
                        {row.label}
                      </span>
                      <span className="text-sm font-medium text-right" style={{ color: row.negative ? '#4a5a6a' : '#f0f4f8' }}>
                        {row.negative ? <s>{row.value}</s> : row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* ── 3. The Approach ── */}
        <Section bg="#070a0d" label="Our comprehensive approach">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <FadeIn className="text-center mb-14">
              <p className="label mb-4">OUR APPROACH</p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-4 max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
              >
                A comprehensive, individualised approach
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#8899aa' }}>
                At Apex, we assess the full system — not just isolated symptoms. Our doctors take
                the time to understand your physiology, lifestyle, and goals before making any
                clinical decisions.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: 'Detailed Clinical Consultations',
                  desc: 'Thorough, unhurried consultations that give your doctor the full picture before any decision is made.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6.5 4h11a2 2 0 012 2v8a2 2 0 01-2 2H13l-4 4v-4H6.5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: 'Comprehensive Biomarker Analysis',
                  desc: 'We test what\'s clinically relevant — not just what\'s standard. Every marker is reviewed in context.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 16l4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: 'Lifestyle, Nutrition & Recovery',
                  desc: 'Sleep, stress, nutrition, and recovery are assessed alongside clinical data — because they all interact.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: 'Ongoing Monitoring & Adjustment',
                  desc: 'Your protocol is never set and forgotten. It\'s reviewed, refined, and updated as your body responds.',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div
                    className="apex-card p-6 h-full flex flex-col gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)', color: '#4890f7' }}
                    >
                      {item.icon}
                    </div>
                    <h3
                      className="text-sm font-bold leading-snug"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#8899aa' }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 4. The Standard ── */}
        <Section bg="#0d1117" label="A higher standard of care">
          <div className="absolute inset-0 dot-grid opacity-15" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <div className="max-w-3xl">
              <FadeIn>
                <p className="label mb-5">THE STANDARD</p>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
                >
                  Care, delivered at{' '}
                  <span className="text-teal-gradient">a higher standard.</span>
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#8899aa' }}>
                  The level of care typically reserved for elite performers should not be limited to
                  a select few.
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#8899aa' }}>
                  At Apex, every patient receives a structured, attentive, and detail-oriented
                  approach — with the time, consideration, and clinical oversight required to make
                  informed decisions about their health.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#4a5a6a' }}>
                  Not because of who you are. Because of the standard we hold ourselves to.
                </p>
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* ── 5. Time & Clarity ── */}
        <Section bg="#070a0d" label="Time, context, and clarity">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(72,144,247,0.04) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <p className="label mb-5">HOW WE CONSULT</p>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
                >
                  Time, context,<br />and clarity.
                </h2>
                <p className="text-lg leading-relaxed mb-5" style={{ color: '#8899aa' }}>
                  We prioritise thorough consultations to ensure nothing is overlooked.
                </p>
                <p className="text-base leading-relaxed" style={{ color: '#4a5a6a' }}>
                  Your health is complex — and understanding it properly requires time, context, and
                  clinical precision. We don&apos;t rush the picture.
                </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="space-y-5">
                  {[
                    { heading: 'Full history review', body: 'We don\'t start from scratch at every consult. Your doctor has context — your history, your results, your goals.' },
                    { heading: 'Data-driven decisions', body: 'Clinical decisions are made on objective data — not assumptions. We test before we recommend.' },
                    { heading: 'Nothing assumed, nothing missed', body: 'Lifestyle, sleep, stress, and recovery are part of the clinical picture. We ask the questions others skip.' },
                  ].map((item, i) => (
                    <div
                      key={item.heading}
                      className="flex gap-5 p-6 rounded-xl"
                      style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(72,144,247,0.08)', color: '#4890f7', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4
                          className="text-sm font-bold mb-1.5"
                          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                        >
                          {item.heading}
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* ── 6. Ongoing Care ── */}
        <Section bg="#0d1117" label="Ongoing care model">
          <div className="absolute inset-0 dot-grid opacity-15" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <FadeIn className="max-w-2xl mb-12">
              <p className="label mb-5">ONGOING, NOT ONE-OFF</p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
              >
                Health is not static.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#8899aa' }}>
                Our approach is built around continuous assessment, structured review cycles, and
                adjustments based on how your body responds over time. A protocol written today
                should look different in 4 months — because you will.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Continuous', title: 'Doctor-Led Optimisation', desc: 'Your doctor monitors your progress and makes precise protocol adjustments as your data evolves.' },
                { label: 'Structured', title: '4-Month Review Cycles', desc: 'Comprehensive blood work, full biomarker analysis, and protocol reassessment every 4 months.' },
                { label: 'Responsive', title: 'Adjusted to You', desc: 'No two patients follow identical protocols. Your treatment adapts to your biology, not a template.' },
              ].map((card, i) => (
                <FadeIn key={card.title} delay={i * 0.1}>
                  <div
                    className="apex-card p-7 h-full flex flex-col"
                  >
                    <span
                      className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 block"
                      style={{ color: '#4890f7' }}
                    >
                      {card.label}
                    </span>
                    <h3
                      className="text-base font-bold mb-3"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: '#8899aa' }}>
                      {card.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 7. Full System ── */}
        <Section bg="#070a0d" label="Systems-level assessment">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <div className="max-w-3xl">
              <FadeIn>
                <p className="label mb-5">THE FULL PICTURE</p>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
                >
                  We assess how key systems interact.
                </h2>
                <p className="text-lg leading-relaxed mb-10" style={{ color: '#8899aa' }}>
                  Sleep, nutrition, stress, hormonal health, and metabolic function don&apos;t operate
                  in isolation. We assess how these systems interact to build a clearer picture
                  of what&apos;s actually driving your experience.
                </p>
              </FadeIn>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Hormonal Function',
                  'Metabolic Health',
                  'Sleep Quality',
                  'Stress & Cortisol',
                  'Nutritional Status',
                  'Cardiovascular Markers',
                  'Inflammatory Load',
                  'Recovery Capacity',
                  'Thyroid Function',
                ].map((system, i) => (
                  <FadeIn key={system} delay={i * 0.04}>
                    <div
                      className="flex items-center gap-2.5 px-4 py-3 rounded-lg"
                      style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: '#4890f7' }}
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium" style={{ color: '#8899aa' }}>{system}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── 8. Trust Close ── */}
        <Section bg="#0d1117" label="Authority close">
          <div className="absolute inset-0 dot-grid opacity-15" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {[
                { headline: 'Doctor-Led.', body: 'Every clinical decision is made by an AHPRA-registered medical practitioner — not an algorithm, not a nurse, not a template.' },
                { headline: 'Individualised.', body: 'Your protocol is built around your results, your history, and your goals. Not a standard program applied to everyone.' },
                { headline: 'Built Around You.', body: 'As your results change, so does your care. We don\'t set and forget — we track, refine, and stay ahead of the curve.' },
              ].map((item, i) => (
                <FadeIn key={item.headline} delay={i * 0.1}>
                  <div
                    className="p-8 md:p-10 h-full flex flex-col"
                    style={{ background: '#0d1117' }}
                  >
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}
                    >
                      {item.headline}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>

        {/* ── 9. CTA ── */}
        <section
          className="relative section-pad overflow-hidden"
          style={{ backgroundColor: '#070a0d' }}
          aria-label="Start assessment"
        >
          <div className="glow-rule" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 55%)' }}
          />

          <div className="container-tight relative z-10 text-center">
            <FadeIn>
              <h2
                style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#f0f4f8', marginBottom: '1rem' }}
              >
                The standard you expected.
                <br />
                <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Finally available.
                </span>
              </h2>
              <div className="flex flex-col items-center gap-3 mt-6">
                <Link href="/intake/pre-screen" className="btn-teal">
                  Start your clinical assessment
                  <span className="btn-circle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
                <p className="text-xs" style={{ color: '#3a4a5a' }}>Takes 60 seconds. No commitment.</p>
              </div>
              <p className="text-sm mt-10" style={{ color: '#3a4a5a' }}>
                Next: <Link href="/services" style={{ color: '#4890f7' }} className="hover:underline">explore our clinical programs →</Link>
              </p>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
