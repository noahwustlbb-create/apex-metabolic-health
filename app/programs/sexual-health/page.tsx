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

const SYMPTOMS = [
  { title: 'Reduced libido', body: 'Declining interest in sex that isn\'t explained by stress or relationship factors — often a direct indicator of hormonal imbalance, particularly low testosterone.' },
  { title: 'Erectile dysfunction', body: 'Difficulty achieving or maintaining erections. Can be vascular, neurological, hormonal, or psychological in origin — full assessment determines the driver.' },
  { title: 'Premature or delayed ejaculation', body: 'Changes in ejaculatory control that aren\'t situational. Often responsive to treatment once the underlying physiology is identified.' },
  { title: 'Low testosterone symptoms', body: 'Fatigue, reduced drive, mood changes, and body composition shifts alongside sexual changes — often occurring together when testosterone is suboptimal.' },
  { title: 'Performance anxiety', body: 'Anticipatory anxiety around sexual performance that creates a feedback loop, independent of or compounding physical drivers.' },
  { title: 'Hormonal imbalance signs', body: 'Elevated oestrogen, low free testosterone, or thyroid dysfunction — all measurable on pathology and all with direct sexual health implications.' },
]

const PATHWAY = [
  {
    step: '01',
    title: 'Clinical intake',
    body: 'A targeted intake covering your sexual health history, symptoms, and relevant hormonal context. Reviewed by your doctor before consultation is scheduled.',
  },
  {
    step: '02',
    title: 'Targeted blood panel',
    body: 'Doctor-issued referral assessing the hormonal and vascular markers relevant to sexual health. Collected fasted at any accredited pathology centre.',
  },
  {
    step: '03',
    title: 'Hormone consultation',
    body: 'Full telehealth review of your results, history, and goals. Your doctor builds a personalised protocol addressing the specific drivers identified.',
  },
  {
    step: '04',
    title: 'Protocol and ongoing care',
    body: 'Doctor-prescribed treatment coordinated through our TGA-compliant pharmacy partner. Membership includes monitoring, review consultations, and protocol adjustments.',
  },
]

const PANEL_MARKERS = [
  'Total and free testosterone',
  'SHBG (sex hormone-binding globulin)',
  'LH and FSH',
  'Oestradiol (E2)',
  'Prolactin',
  'Thyroid panel (TSH, fT3, fT4)',
  'Full blood count',
  'Fasting glucose and HbA1c',
  'Lipid panel',
  'PSA (where indicated)',
  'DHEA-S',
  'Cortisol (where indicated)',
]

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Sexual Health program"
    >
      <div className="absolute inset-0 dot-grid opacity-[0.14]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-2.5 mb-5"
        >
          <Link href="/services" className="text-[11px] tracking-[0.14em] uppercase font-semibold transition-colors duration-150" style={{ color: '#4890f7' }}>
            Clinical Programs
          </Link>
          <span style={{ color: 'var(--text-primary)' }}>›</span>
          <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: ACCENT }}>
            Sexual Health
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Sexual Health
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
            color: 'var(--text-primary)',
            maxWidth: '720px',
            marginBottom: '1.25rem',
          }}
        >
          Address the cause.
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Not the symptom.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '500px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Sexual health changes are almost always driven by measurable biology — hormonal imbalance, vascular function, or metabolic factors. We run the tests most GPs don&apos;t order, and build a protocol around what we find.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
        >
          {['AHPRA-registered doctors', 'Full hormonal panel', 'Doctor-prescribed protocol', 'Australia-wide telehealth'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#4890f7' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
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
          <Link href="/intake/hormone-consult" className="btn-teal">
            Start clinical assessment
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Symptoms">
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
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              Something&apos;s changed.{' '}
              <span style={{ color: ACCENT }}>Find out what.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-primary)', maxWidth: '420px' }}
            >
              Most GPs offer little beyond a referral to a psychologist. We run the full hormonal and metabolic workup that identifies the physical drivers — because most of the time, they&apos;re there.
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
                style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)', borderLeft: `2px solid ${ACCENT}` }}
              >
                <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{s.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>{s.body}</p>
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Clinical pathway">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-4">
            Clinical pathway
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '0.75rem' }}
          >
            How it works.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATHWAY.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4" style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}>
                <span className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: ACCENT }}>{p.step}</span>
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#e8f0f8' }}>{p.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>{p.body}</p>
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
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Blood panel">
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
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1rem' }}
            >
              What we actually test.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'var(--text-primary)', maxWidth: '400px' }}
            >
              The sexual health panel covers the full hormonal, metabolic, and vascular picture — not just testosterone. Results reviewed directly by your Apex doctor.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="rounded-xl p-5"
              style={{ background: ACCENT_BG, border: `1px solid ${ACCENT_BORDER}` }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: ACCENT }}>Have recent bloods?</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                Submit them in the intake — your doctor will review whether they meet the panel requirements before ordering new tests.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg)', border: '1px solid rgba(72,144,247,0.14)' }}
          >
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(72,144,247,0.1)' }}>
              <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: ACCENT }}>Sexual Health Panel</p>
            </div>
            <ul className="p-5 flex flex-col gap-2">
              {PANEL_MARKERS.map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-primary)' }}>
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT, opacity: 0.5 }} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5">
              <p className="text-[11px]" style={{ color: '#4890f7' }}>
                Final panel confirmed after intake assessment. Blood panels from $99 at accredited collection centres.
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
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Get started">
      <div className="glow-rule" aria-hidden="true" />
      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 50px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '1rem' }}
        >
          Find out what&apos;s driving it.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '14px', lineHeight: 1.7 }}
        >
          Complete the intake and your doctor will confirm suitability. No commitment required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/intake/hormone-consult" className="btn-teal">
            Start clinical assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className="text-xs" style={{ color: '#4890f7' }}>60 seconds. No commitment.</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto"
          style={{ color: '#4890f7' }}
        >
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
        </motion.p>
      </div>
    </section>
  )
}

export default function SexualHealthPage() {
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
