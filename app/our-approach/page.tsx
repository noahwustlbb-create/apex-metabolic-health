'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

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
      transition={{ duration: 0.65, delay, ease }}
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
          <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 left-0 w-[900px] h-[600px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 55%)' }} />

          <div ref={heroRef} className="container-tight relative z-10">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-5">
              The Apex Method
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#f0f4f8', maxWidth: '780px', marginBottom: '1.25rem' }}>
              We work by system.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Not by symptom.
              </span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.22, ease }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: '#8899aa', maxWidth: '520px', marginBottom: '2rem' }}>
              Every clinical decision is guided by data, context, and a doctor who takes the time to understand the full picture — not the fastest path to a script.
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
              {['AHPRA-registered doctors', 'No GP referral required', 'Data-led, not assumption-led'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── 2. The Problem ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="The problem with standard healthcare">
          <div className="glow-rule" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-[0.12]" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <FadeIn><p className="label mb-6">The Problem</p></FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}>
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
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { label: 'Standard care', value: '5–10 min consult', negative: true },
                    { label: 'Standard care', value: 'Surface-level bloodwork', negative: true },
                    { label: 'Standard care', value: 'Symptom management only', negative: true },
                    { label: 'Apex Protocol', value: 'Thorough clinical consultation', negative: false },
                    { label: 'Apex Protocol', value: 'Comprehensive biomarker analysis', negative: false },
                    { label: 'Apex Protocol', value: 'Ongoing, structured optimisation', negative: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-lg"
                      style={{
                        background: row.negative ? 'rgba(255,255,255,0.02)' : 'rgba(72,144,247,0.06)',
                        border: `1px solid ${row.negative ? 'rgba(255,255,255,0.05)' : 'rgba(72,144,247,0.18)'}`,
                      }}>
                      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase flex-shrink-0"
                        style={{ color: row.negative ? '#4a5a6a' : '#4890f7' }}>
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
        </section>

        {/* ── 3. How We Assess (merged: approach + consultation) ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="How we assess">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(72,144,247,0.04) 0%, transparent 60%)' }} />
          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Left — heading + numbered rows */}
              <div>
                <FadeIn>
                  <p className="label mb-5">How We Consult</p>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}>
                    Time, context,
                    <br />and clarity.
                  </h2>
                  <p className="text-base leading-relaxed mb-8" style={{ color: '#6b7a8d', maxWidth: '400px' }}>
                    Your health is complex. Understanding it properly requires time, full context, and clinical precision. We don&apos;t rush the picture.
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div className="space-y-4">
                    {[
                      { heading: 'Full history review', body: 'Your doctor has context — your history, your results, your goals — before the consult begins.' },
                      { heading: 'Test before we recommend', body: 'Nothing is assumed. Clinical decisions are made on objective data, not guesswork.' },
                      { heading: 'Nothing assumed, nothing missed', body: 'Sleep, stress, lifestyle, and recovery are part of the clinical picture. We ask the questions others skip.' },
                    ].map((item, i) => (
                      <div key={item.heading} className="flex gap-4 p-5 rounded-xl"
                        style={{ background: '#0d1520', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold"
                          style={{ background: 'rgba(72,144,247,0.1)', color: '#4890f7', fontFamily: 'var(--font-space-grotesk)' }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>{item.heading}</h4>
                          <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Right — 4 assessment pillars */}
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pt-[88px]">
                  {[
                    {
                      title: 'Detailed clinical consultation',
                      desc: 'Thorough, unhurried consultations that give your doctor the full picture before any decision is made.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M6.5 4h11a2 2 0 012 2v8a2 2 0 01-2 2H13l-4 4v-4H6.5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                    {
                      title: 'Comprehensive biomarker analysis',
                      desc: 'We test what\'s clinically relevant — not just what\'s standard. Every marker reviewed in context.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M7 16l4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                    {
                      title: 'Lifestyle, nutrition & recovery',
                      desc: 'Sleep, stress, and nutrition assessed alongside clinical data — because they all interact.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                    {
                      title: 'Ongoing monitoring & adjustment',
                      desc: 'Your protocol is never set and forgotten — reviewed, refined, and updated as your biology responds.',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col gap-3 p-5 rounded-xl"
                      style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.08)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.18)', color: '#4890f7' }}>
                        {item.icon}
                      </div>
                      <h3 className="text-xs font-bold leading-snug" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}>{item.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── 4. Systems interaction ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Systems-level assessment">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }} />
          <div className="container-tight relative z-10">
            <div className="max-w-3xl">
              <FadeIn>
                <p className="label mb-5">The Full Picture</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}>
                  We assess how key systems interact.
                </h2>
                <p className="text-lg leading-relaxed mb-10" style={{ color: '#8899aa', maxWidth: '540px' }}>
                  Symptoms are downstream of systems. Sleep, hormones, metabolic health, and stress don&apos;t operate in isolation — and we don&apos;t assess them that way.
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
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg"
                      style={{ background: '#111820', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#4890f7' }} aria-hidden="true" />
                      <span className="text-xs font-medium" style={{ color: '#8899aa' }}>{system}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Ongoing review — compact strip ── */}
        <section className="relative overflow-hidden" style={{ backgroundColor: '#070a0d', paddingTop: '60px', paddingBottom: '60px' }}
          aria-label="Ongoing review">
          <div className="glow-rule" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
                {[
                  { label: 'Reviewed every 4 months', desc: 'Structured clinical review cycles — not ad hoc when something feels wrong.' },
                  { label: 'Protocol adjusts as you respond', desc: 'A protocol written today should look different in 4 months. Yours will.' },
                  { label: 'Blood work included in care', desc: 'Follow-up testing is built into the cycle. No gaps. No blind adjustments.' },
                ].map((item, i) => (
                  <div key={item.label} className="px-7 py-6"
                    style={{ background: i === 1 ? '#0d1520' : '#0a0e14', borderRight: i < 2 ? '1px solid rgba(148,163,184,0.07)' : 'none' }}>
                    <p className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>{item.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 6. Trust close ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Authority close">
          <div className="glow-rule" aria-hidden="true" />
          <div className="absolute inset-0 dot-grid opacity-[0.1]" aria-hidden="true" />
          <div className="container-tight relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(148,163,184,0.08)' }}>
              {[
                { headline: 'Doctor-Led.', body: 'Every clinical decision is made by an AHPRA-registered medical practitioner — not an algorithm, not a template.' },
                { headline: 'Data-First.', body: 'Nothing recommended without objective data to support it. We test before we treat, and we track after.' },
                { headline: 'Built Around You.', body: 'As your results change, so does your care. We don\'t set and forget — we track, refine, and stay ahead.' },
              ].map((item, i) => (
                <FadeIn key={item.headline} delay={i * 0.1}>
                  <div className="p-8 md:p-10 h-full flex flex-col" style={{ background: '#0d1117' }}>
                    <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>
                      {item.headline}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>{item.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Start assessment">
          <div className="glow-rule" aria-hidden="true" />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 55%)' }} />
          <div className="container-tight relative z-10 text-center">
            <FadeIn>
              <h2 style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#f0f4f8', marginBottom: '1rem' }}>
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
