'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4ade80'
const ACCENT_BG = 'rgba(74,222,128,0.06)'
const ACCENT_BORDER = 'rgba(74,222,128,0.18)'
const GLOW = 'rgba(74,222,128,0.05)'

const SYMPTOMS = [
  { title: 'Soft tissue injury', body: 'Tendon, ligament, or muscle injuries that haven\'t healed at the expected rate. Clinical protocols can support tissue repair where the body\'s capacity is limited.' },
  { title: 'Slow post-surgical healing', body: 'Incomplete recovery following surgical repair. Healing velocity is a biological variable — one that can be supported clinically.' },
  { title: 'Recurring injury at the same sites', body: 'Repeated reinjury at the same location suggests incomplete biological repair, not just mechanical overload. A clinical lens is often warranted.' },
  { title: 'Persistent pain without structural cause', body: 'Ongoing pain in the absence of clear structural findings. Tissue-level biology — inflammation, growth factors, vascularity — may be the underlying driver.' },
  { title: 'Return-to-training support', body: 'Clinical oversight during return-to-sport or high-load training phases. Reduces reinjury risk and supports progressive loading capacity.' },
  { title: 'Post-procedural recovery', body: 'Supporting healing after orthopedic procedures, joint surgery, or interventional treatments. Clinical protocols can be coordinated alongside your treating specialist.' },
]

const PATHWAY = [
  {
    step: '01',
    title: 'Pre-screen assessment',
    body: 'A targeted intake covering your injury history, current symptoms, surgical or treatment background, and recovery goals. Confirms program suitability.',
  },
  {
    step: '02',
    title: 'Recovery-focused blood panel',
    body: 'Your doctor issues a referral for a panel assessing the hormonal, nutritional, and inflammatory variables relevant to tissue repair. Collected at any accredited centre.',
  },
  {
    step: '03',
    title: 'Clinical consultation',
    body: 'Your results are reviewed alongside your injury context. Your doctor identifies the biological factors limiting recovery and builds a personalised clinical protocol.',
  },
  {
    step: '04',
    title: 'Protocol and ongoing support',
    body: 'Doctor-prescribed treatment coordinated through our TGA-compliant pharmacy partner. Ongoing membership provides monitoring and protocol adjustment as recovery progresses.',
  },
]

const PANEL_MARKERS = [
  'Total and free testosterone',
  'IGF-1 (growth hormone axis)',
  'Vitamin D',
  'Zinc and magnesium',
  'Ferritin and iron studies',
  'Full blood count',
  'Inflammatory markers (hsCRP, ESR)',
  'Thyroid panel (TSH, fT3, fT4)',
  'Cortisol (where indicated)',
  'Collagen precursor nutrients (Vitamin C, copper)',
  'Metabolic panel',
  'Bone markers (where indicated)',
]

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Injury Repair & Recovery program"
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
            Injury Repair & Recovery
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Musculoskeletal Health
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
          Healing isn&apos;t passive.
          <br />
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #86efac)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            It&apos;s clinical.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ color: '#6b7a8d', maxWidth: '500px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Slow healing, recurring injury, and incomplete recovery are biological problems. The hormonal, nutritional, and inflammatory variables that govern tissue repair can be assessed and optimised with a clinical protocol.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
        >
          {['AHPRA-registered doctors', 'Recovery-focused blood panel', 'Doctor-prescribed protocol', 'Australia-wide telehealth'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: `rgba(74,222,128,0.5)` }} />
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
              Healing slower{' '}
              <span style={{ color: ACCENT }}>than it should.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="text-sm leading-relaxed"
              style={{ color: '#6b7a8d', maxWidth: '420px' }}
            >
              Tissue repair is governed by hormones, growth factors, inflammation, and nutrition. When these are suboptimal, recovery slows — and recurring injury becomes the pattern. A clinical protocol can change the biological environment healing occurs in.
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
            A clinical process that addresses the biology of recovery — not just the injury site.
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
              The recovery panel assesses the hormonal, nutritional, and inflammatory variables that govern tissue repair. It identifies the specific deficiencies or imbalances limiting your recovery rate.
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
                Have recent bloods? Submit them during the pre-screen — we&apos;ll review whether they meet our panel requirements before ordering anything new.
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
              <p className="text-xs font-bold tracking-[0.16em] uppercase" style={{ color: ACCENT }}>Injury Repair & Recovery Panel</p>
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
          Support your recovery clinically.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ color: '#6b7a8d', maxWidth: '420px', margin: '0 auto 2rem', fontSize: '14px', lineHeight: 1.7 }}
        >
          Complete the pre-screen. We&apos;ll confirm suitability and outline what the clinical pathway looks like for your injury and recovery context.
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

export default function InjuryRepairPage() {
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
