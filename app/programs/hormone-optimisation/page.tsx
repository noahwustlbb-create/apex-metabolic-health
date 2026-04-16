'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'
const ACCENT_BG = 'rgba(72,144,247,0.06)'
const ACCENT_BORDER = 'rgba(72,144,247,0.18)'
const GLOW = 'rgba(72,144,247,0.07)'

const SYMPTOMS = [
  { title: 'Low testosterone & drive', body: 'Reduced libido, motivation, and competitive edge — often the first signs of suboptimal hormone levels.' },
  { title: 'Persistent fatigue', body: 'Low energy that sleep doesn\'t fix. Waking unrefreshed. Afternoon crashes that disrupt work and training.' },
  { title: 'Body composition changes', body: 'Unexpected fat accumulation — particularly around the abdomen — combined with difficulty building or retaining muscle.' },
  { title: 'Brain fog', body: 'Reduced mental clarity, poor concentration, and memory lapses that weren\'t there a few years ago.' },
  { title: 'Poor sleep quality', body: 'Difficulty falling asleep, staying asleep, or achieving restorative rest — often a downstream effect of hormonal imbalance.' },
  { title: 'Mood and emotional changes', body: 'Increased irritability, reduced confidence, or a general flatness that doesn\'t have a clear external cause.' },
]

const PATHWAY = [
  {
    step: '01',
    title: 'Pre-screen assessment',
    body: 'A structured 60-second intake covering your primary concerns, medical history, and goals. Confirms your suitability for the program before any commitment.',
  },
  {
    step: '02',
    title: 'Doctor-issued blood panel',
    body: 'Your Apex doctor issues a referral for a comprehensive hormonal and metabolic panel. Collected at any accredited pathology centre — no GP required.',
  },
  {
    step: '03',
    title: 'Clinical consultation',
    body: 'A full telehealth consultation with your doctor. Your results are reviewed in detail, a clinical history is taken, and your personalised protocol is built.',
  },
  {
    step: '04',
    title: 'Protocol and ongoing care',
    body: 'Your doctor-prescribed protocol is coordinated through our TGA-compliant compounding pharmacy partner. Ongoing membership includes regular reviews and protocol adjustments as your results improve.',
  },
]

const PANEL_MARKERS = [
  'Total and free testosterone',
  'LH, FSH, and SHBG',
  'Oestradiol (E2)',
  'Prolactin',
  'Thyroid panel (TSH, fT3, fT4)',
  'Full blood count',
  'Metabolic markers (HbA1c, fasting glucose, insulin)',
  'Lipid panel',
  'PSA (where clinically indicated)',
  'Vitamin D and key micronutrients',
  'Cortisol (where indicated)',
  'DHEA-S',
]

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Hormone Optimisation program"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${GLOW} 0%, transparent 60%)` }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-2.5 mb-5"
        >
          <Link href="/services" className="text-[11px] tracking-[0.14em] uppercase font-semibold transition-colors duration-150" style={{ color: '#3a4a5a' }}
            onMouseEnter={e => { e.currentTarget.style.color = ACCENT }}
            onMouseLeave={e => { e.currentTarget.style.color = '#3a4a5a' }}
          >
            Clinical Programs
          </Link>
          <span style={{ color: '#2a3a4a' }}>›</span>
          <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: ACCENT }}>
            Hormone Optimisation
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Hormonal Health
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(30px, 4.5vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: '#f0f4f8',
            maxWidth: '720px',
            marginBottom: '1.25rem',
          }}
        >
          Hormonal health.
          <br />
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #6ba8ff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Assessed properly.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ color: '#6b7a8d', maxWidth: '500px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Most GPs check one or two markers. We run a comprehensive hormonal and metabolic panel — then build a personalised, doctor-prescribed protocol around what your biology actually needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
        >
          {['AHPRA-registered doctors', 'Comprehensive blood panel', 'Doctor-prescribed protocol', 'Australia-wide telehealth'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `rgba(72,144,247,0.5)` }} />
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Check my eligibility
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <Link href="/pricing" className="btn-ghost">
            View pricing
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function SymptomsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Symptoms">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-4">
              Who this is for
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Told everything looks{' '}
              <span style={{ color: ACCENT }}>"normal"?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed"
              style={{ color: '#6b7a8d', maxWidth: '420px' }}
            >
              Standard GP blood panels check if you&apos;re in a disease range — not an optimal one. Testosterone can sit in the bottom third of reference range and your results will show "normal." We look harder.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SYMPTOMS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
                className="rounded-xl p-4"
                style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.08)', borderLeft: `2px solid ${ACCENT}` }}
              >
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c5cdd6' }}>{s.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PathwaySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Clinical pathway">
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${GLOW} 0%, transparent 60%)` }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-4">
            Clinical pathway
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '0.75rem' }}
          >
            How it works.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-sm leading-relaxed max-w-lg"
            style={{ color: '#8899aa' }}
          >
            A structured, clinical process — not a quick online quiz and a script. Every step has a purpose.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATHWAY.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
              className="rounded-xl p-6"
              style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
              >
                <span className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{p.step}</span>
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#e8f0f8' }}>{p.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#5a6a7a' }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PanelSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: '#0d1117' }} aria-label="Blood panel">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-4">
              Pathology
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0f4f8', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              What we actually test.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed mb-6"
              style={{ color: '#6b7a8d', maxWidth: '400px' }}
            >
              Our hormone panel goes beyond a standard testosterone check. We assess the full endocrine picture — including upstream signals, metabolic context, and conversion pathways.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="rounded-xl p-5"
              style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: ACCENT }}>Good news</p>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7a8d' }}>
                Have recent bloods from your GP? Submit them during the pre-screen — we&apos;ll review whether they meet our clinical requirements. If they do, you may not need to retest.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0a0e14', border: '1px solid rgba(148,163,184,0.08)' }}
          >
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}>
              <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: ACCENT }}>Hormone Optimisation Panel</p>
            </div>
            <ul className="p-5 flex flex-col gap-2">
              {PANEL_MARKERS.map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-xs" style={{ color: '#5a6a7a' }}>
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT, opacity: 0.5 }} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5">
              <p className="text-[11px]" style={{ color: '#2e3d4d' }}>
                Final panel confirmed after pre-screen assessment. Pricing from $73.66 at accredited collection centres.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: '#070a0d' }} aria-label="Get started">
      <div className="glow-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${GLOW} 0%, transparent 55%)` }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 50px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#f0f4f8', marginBottom: '1rem' }}
        >
          Find out where you actually stand.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ color: '#6b7a8d', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '14px', lineHeight: 1.7 }}
        >
          Complete the pre-screen. Your doctor reviews your suitability and contacts you directly to confirm next steps.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Check my eligibility
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className="text-xs" style={{ color: '#3a4a5a' }}>60 seconds. No commitment.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto"
          style={{ color: '#2e3d4d' }}
        >
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
        </motion.p>
      </div>
    </section>
  )
}

export default function HormoneOptimisationPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SymptomsSection />
        <PathwaySection />
        <PanelSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
