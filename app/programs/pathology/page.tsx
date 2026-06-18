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

const PANELS = [
  {
    name: 'Comprehensive Hormone Panel',
    for: 'Hormone Optimisation · Sexual Health',
    markers: [
      'Total and free testosterone',
      'SHBG',
      'LH and FSH',
      'Oestradiol (E2)',
      'Prolactin',
      'DHEA-S',
      'Cortisol',
      'PSA (where indicated)',
    ],
  },
  {
    name: 'Metabolic Health Panel',
    for: 'Weight Loss · Performance',
    markers: [
      'Fasting glucose and HbA1c',
      'Full lipid panel',
      'Insulin',
      'Thyroid panel (TSH, fT3, fT4)',
      'Full blood count',
      'Iron studies and ferritin',
      'CRP (inflammatory marker)',
      'Liver function tests',
    ],
  },
  {
    name: 'Hair & Skin Panel',
    for: 'Hair Restoration · Skin Regeneration',
    markers: [
      'DHT (dihydrotestosterone)',
      'Total and free testosterone',
      'Thyroid panel',
      'Ferritin and iron studies',
      'Zinc and selenium',
      'Vitamin D',
      'Vitamin B12 and folate',
      'Full blood count',
    ],
  },
  {
    name: 'Performance & Recovery Panel',
    for: 'Performance · Injury Repair',
    markers: [
      'Total and free testosterone',
      'IGF-1',
      'Cortisol (morning)',
      'Full blood count',
      'Iron studies and ferritin',
      'Vitamin D',
      'CRP and ESR',
      'Metabolic panel',
    ],
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Complete your intake',
    body: 'Your doctor reviews your clinical history and goals. The blood panel referral is tailored to your specific program and presentation.',
  },
  {
    step: '02',
    title: 'Doctor-issued referral',
    body: 'No GP visit required. Your Apex doctor issues the referral directly. Valid at any accredited pathology collection centre across Australia.',
  },
  {
    step: '03',
    title: 'Collect fasted, before 9am',
    body: 'Attend your nearest collection centre fasted. Most panels take 15–20 minutes. Results are returned directly to your Apex doctor.',
  },
  {
    step: '04',
    title: 'Clinical interpretation',
    body: 'Your results are interpreted in the context of your program — not just against a generic reference range. Your consultation follows within days.',
  },
]

function Hero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Pathology"
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
          <Link href="/services" className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: '#4890f7' }}>
            Clinical Programs
          </Link>
          <span style={{ color: 'var(--text-primary)' }}>›</span>
          <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: ACCENT }}>
            Pathology
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="label mb-5"
        >
          Clinical Blood Testing
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
          Real diagnostics.
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #7bb3ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Not guesswork.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '500px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Every Apex program begins with a doctor-issued blood panel specific to your clinical pathway. No GP referral required. Results interpreted by a specialist — not checked against a generic lab range.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-8"
        >
          {['No GP referral required', 'From $99', 'Accredited collection centres', 'Australia-wide'].map(t => (
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
          <Link href="/intake/pre-screen" className="btn-teal">
            Start your assessment
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

function HowItWorksSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="How pathology works">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            The process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}
          >
            From referral to results.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOW_IT_WORKS.map((p, i) => (
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

function PanelsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Blood panels">
      <div className="glow-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="mb-12">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            Program Panels
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1.1 }}
          >
            What we test,{' '}
            <span style={{ color: ACCENT }}>by program.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease }}
            className="text-sm leading-relaxed mt-3 max-w-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            Each panel is matched to your program. Final markers confirmed after intake assessment — panels may be adjusted based on your clinical history.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PANELS.map((panel, i) => (
            <motion.div
              key={panel.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.14)' }}
            >
              <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(72,144,247,0.1)', background: ACCENT_BG }}>
                <p className="text-xs font-bold tracking-[0.14em] uppercase mb-0.5" style={{ color: ACCENT }}>{panel.name}</p>
                <p className="text-[10px] tracking-[0.1em] uppercase" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>{panel.for}</p>
              </div>
              <ul className="p-5 flex flex-col gap-2">
                {panel.markers.map((m, j) => (
                  <li key={j} className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-primary)' }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT, opacity: 0.5 }} />
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-[11px] mt-8"
          style={{ color: 'var(--text-primary)', opacity: 0.3 }}
        >
          Blood panels from $99 at accredited collection centres across Australia. Doctor-issued referral — no GP required.
        </motion.p>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Get started">
      <div className="glow-rule" aria-hidden="true" />
      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 50px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: '1rem' }}
        >
          Start with the right data.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '400px', margin: '0 auto 2rem', fontSize: '14px', lineHeight: 1.7 }}
        >
          Complete your program intake and your doctor issues the referral. No GP visit required.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col items-center gap-3"
        >
          <Link href="/intake/pre-screen" className="btn-teal">
            Start assessment
            <span className="btn-circle" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
          <p className="text-xs" style={{ color: '#4890f7' }}>Doctor-issued referral. From $99.</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto"
          style={{ color: '#4890f7' }}
        >
          All referrals issued by AHPRA-registered practitioners. Pathology collected at accredited centres Australia-wide.
        </motion.p>
      </div>
    </section>
  )
}

export default function PathologyPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorksSection />
        <PanelsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
