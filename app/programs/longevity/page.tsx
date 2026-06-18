'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Image from 'next/image'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const GOLD  = '#c9a84c'
const GOLD2 = '#e2c16e'
const GOLD_BG     = 'rgba(201,168,76,0.06)'
const GOLD_BORDER = 'rgba(201,168,76,0.18)'
const GOLD_GLOW   = 'rgba(201,168,76,0.05)'
const BLUE  = '#4890f7'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SYSTEMS = [
  {
    number: '01',
    title: 'Hormonal axis',
    body: 'Testosterone, free testosterone, SHBG, oestradiol, LH, FSH, DHEA-S, cortisol, and prolactin. The hormonal environment that determines drive, body composition, mood, and how you respond to everything else.',
  },
  {
    number: '02',
    title: 'Metabolic function',
    body: 'Fasting insulin, HbA1c, full lipid fractions, liver enzymes, kidney function, and glucose regulation markers. Metabolic dysfunction rarely announces itself — it builds quietly for years.',
  },
  {
    number: '03',
    title: 'Thyroid & adrenal',
    body: 'TSH, free T3, free T4, and adrenal cortisol patterns. These two axes control energy regulation, recovery rate, and metabolic speed — and are the most frequently overlooked on routine panels.',
  },
  {
    number: '04',
    title: 'Inflammatory load',
    body: 'hsCRP, ferritin, ESR, and key nutrient status markers. Chronic low-grade inflammation is the common denominator in nearly every age-related disease — and it\'s entirely measurable years before symptoms.',
  },
  {
    number: '05',
    title: 'Growth & cellular repair',
    body: 'IGF-1 and growth hormone markers that reflect your body\'s capacity to repair, adapt, and regenerate. These decline predictably with age — and the rate of decline is modifiable.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Longevity consultation',
    body: 'A comprehensive telehealth consultation with an AHPRA-registered doctor. Your clinical history, goals, and current health picture are reviewed in full. Your personalised multi-system panel is ordered.',
  },
  {
    n: '02',
    title: 'Multi-system blood panel',
    body: 'Attend any accredited collection centre in Australia — no GP referral required. Your panel covers 40+ markers across five biological systems. Fasted collection, typically 15–20 minutes.',
  },
  {
    n: '03',
    title: 'Clinical interpretation',
    body: 'Your results are reviewed by your doctor against optimal ranges — not just population averages. A complete biological picture is built. Every marker is contextualised against your age, goals, and history.',
  },
  {
    n: '04',
    title: 'Your longevity protocol',
    body: 'A personalised clinical strategy built for the next decade. Doctor-prescribed interventions, a monitoring cadence, and scheduled review consultations. Adjusted as your data evolves.',
  },
]

const TRUTHS = [
  {
    stat: '3',
    unit: 'markers',
    label: 'Standard GP panel',
    body: 'A routine blood test screens for catastrophic failure — anaemia, organ dysfunction, obvious disease. It tells you almost nothing about how you\'re ageing.',
  },
  {
    stat: '40+',
    unit: 'markers',
    label: 'Apex Longevity Protocol',
    body: 'Five biological systems assessed in a single panel. The most complete picture of your health available outside a research hospital.',
  },
  {
    stat: '10–20',
    unit: 'years',
    label: 'The intervention window',
    body: 'The biological changes that determine how you feel at 60 are detectable — and addressable — a decade or more before they become symptomatic.',
  },
]

// ─── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '96px' }}
      aria-label="Longevity Protocol"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-[0.12]" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <Image
          src="/img-longevity.png" alt="" fill
          className="object-cover object-center"
          style={{ opacity: 0.12, mixBlendMode: 'luminosity' }}
        />
        <div className="absolute inset-0 lg:hidden" style={{ background: 'rgba(4,6,13,0.72)' }} />
        <div className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(90deg, var(--bg) 0%, rgba(4,6,13,0.5) 50%, transparent 78%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />
      </div>
      <div aria-hidden="true" className="absolute top-0 right-0 w-[800px] h-[600px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 80% 0%, ${GOLD_GLOW} 0%, transparent 55%)` }} />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, rgba(201,168,76,0.03) 0%, transparent 60%)` }} />

      <div ref={ref} className="container-tight relative z-10 max-w-5xl">

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }} className="flex items-center gap-2.5 mb-8">
          <Link href="/services"
            className="text-[11px] tracking-[0.14em] uppercase font-semibold"
            style={{ color: 'rgba(201,168,76,0.5)' }}
            onMouseEnter={e => { e.currentTarget.style.color = GOLD }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(201,168,76,0.5)' }}>
            Clinical Programs
          </Link>
          <span style={{ color: 'rgba(201,168,76,0.3)' }}>›</span>
          <span className="text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ color: GOLD }}>
            Longevity Protocol
          </span>
        </motion.div>

        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease }} className="flex items-center gap-3 mb-7">
          <p className="label" style={{ color: GOLD, borderColor: GOLD_BORDER }}>Longevity</p>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm"
            style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
            <span className="text-[8px] font-bold tracking-[0.18em] uppercase" style={{ color: GOLD }}>Now enrolling</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.06, ease }}
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(34px, 5.5vw, 78px)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            maxWidth: '820px',
            marginBottom: '1.5rem',
          }}
        >
          Your doctor is waiting
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 50%, ${GOLD} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            for something to go wrong.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{ color: 'var(--text-primary)', opacity: 0.7, maxWidth: '540px', fontSize: '16px', lineHeight: 1.8, marginBottom: '2.5rem' }}
        >
          The Apex Longevity Protocol maps your complete biological picture — before the first symptom — and builds a clinical strategy for the next decade of your health. Not a check-up. A biological audit.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.34, ease }}
          className="flex flex-col sm:flex-row items-start gap-3 mb-12">
          <Link href="/intake/pre-screen"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-sm font-bold text-sm tracking-wide transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
              color: '#07080a',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
            Begin your longevity baseline
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-200"
            style={{ border: `1px solid ${GOLD_BORDER}`, color: GOLD, background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = GOLD_BG }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.background = 'transparent' }}>
            Speak with our team
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-6">
          {['AHPRA-registered doctors', 'No GP referral required', '100% telehealth — Australia-wide', '40+ biomarkers assessed'].map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: GOLD, opacity: 0.6 }} />
              <span className="text-[11px] font-semibold tracking-[0.08em]" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TruthsSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="The clinical gap">
      <div className="glow-rule" aria-hidden="true" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)` }} />
      <div className="container-tight relative z-10 py-20 md:py-24">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ border: `1px solid ${GOLD_BORDER}`, borderRadius: '16px', overflow: 'hidden', background: GOLD_BORDER }}>
          {TRUTHS.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="p-8 flex flex-col gap-4"
              style={{ background: i === 1 ? GOLD_BG : 'var(--surface)' }}>
              <div>
                <span className="text-[42px] font-bold leading-none" style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{t.stat}</span>
                <span className="ml-2 text-sm font-semibold" style={{ color: GOLD, opacity: 0.7 }}>{t.unit}</span>
              </div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: GOLD, opacity: 0.55 }}>{t.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SystemsSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="What we assess">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.1]" />
      <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 0%, ${GOLD_GLOW} 0%, transparent 60%)` }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="max-w-2xl mb-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-[9px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>
            The biological audit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 50px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.08, marginBottom: '1rem' }}
          >
            Five systems.{' '}
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              One complete picture.
            </span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className="text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
            The Longevity Protocol assesses every biological system that determines how you age — not just the ones that fail first. This is what a complete picture of your health actually looks like.
          </motion.p>
        </div>

        <div className="flex flex-col gap-3">
          {SYSTEMS.map((s, i) => (
            <motion.div key={s.number}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
              className="flex gap-6 p-6 rounded-2xl"
              style={{ background: 'var(--surface)', border: `1px solid ${GOLD_BORDER}`, borderLeft: `3px solid ${GOLD}` }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
                <span className="text-[11px] font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: GOLD }}>{s.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: GOLD }}>{s.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs mt-8 text-center" style={{ color: 'var(--text-primary)', opacity: 0.3 }}>
          Panel composition is determined by your doctor at consultation and tailored to your clinical history and goals.
        </motion.p>
      </div>
    </section>
  )
}

function PathwaySection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="How it works">
      <div className="glow-rule" aria-hidden="true" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)` }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-[9px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>
            The pathway
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1 }}
          >
            Four steps to a complete{' '}
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              biological picture.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEPS.map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
              className="p-7 rounded-2xl flex gap-5"
              style={{ background: 'var(--bg)', border: `1px solid ${GOLD_BORDER}` }}>
              <div className="flex-shrink-0">
                <span className="text-[32px] font-bold leading-none" style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: 0.5,
                }}>{s.n}</span>
              </div>
              <div>
                <p className="text-[15px] font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{s.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ForWhomSection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const profiles = [
    'You\'re functional. You\'re not sick. But you\'re aware that the trajectory matters.',
    'You\'ve been told everything\'s "normal" — and you know that\'s not the same as optimal.',
    'You\'re thinking 10 years ahead, not 10 weeks. You want a clinical strategy, not reassurance.',
    'You want data on your biology. Not a guess. Not a general recommendation. Your data.',
  ]

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Who this is for">
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.08]" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 100%, ${GOLD_GLOW} 0%, transparent 60%)` }} />

      <div ref={ref} className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="text-[9px] font-bold tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>
              Who this is for
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '1.5rem' }}
            >
              The men who age well{' '}
              <span style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                don&apos;t get lucky.
              </span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease }}
              className="text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
              They start earlier, with better data, and a doctor who knows how to act on it.
            </motion.p>
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease }}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: 'var(--surface)', border: `1px solid ${GOLD_BORDER}` }}>
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: GOLD_BG, border: `1px solid ${GOLD_BORDER}` }}>
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path d="M1.5 5l2.5 2.5 4.5-5" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.72 }}>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Book your longevity baseline">
      <div className="glow-rule" aria-hidden="true" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)` }} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${GOLD_GLOW} 0%, transparent 55%)` }} />

      <div className="container-tight relative z-10 text-center max-w-3xl mx-auto">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="text-[9px] font-bold tracking-[0.28em] uppercase mb-5" style={{ color: GOLD }}>
          Begin your protocol
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.06, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1.25rem' }}
        >
          The best time to start
          <br />
          <span style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 50%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            was five years ago.
          </span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.14, ease }}
          style={{ color: 'var(--text-primary)', opacity: 0.6, maxWidth: '480px', margin: '0 auto 2.5rem', fontSize: '15px', lineHeight: 1.75 }}>
          The second best time is now. One telehealth consultation. One blood draw. A complete biological picture — and a doctor who knows how to act on it.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/intake/pre-screen"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-sm font-bold text-sm tracking-wide transition-all duration-200"
            style={{
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
              color: '#07080a',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
            Begin your longevity baseline
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-sm font-semibold text-sm tracking-wide transition-all duration-200"
            style={{ border: `1px solid ${GOLD_BORDER}`, color: GOLD }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.background = GOLD_BG }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.background = 'transparent' }}>
            Free discovery call
          </a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-xs" style={{ color: 'var(--text-primary)', opacity: 0.28 }}>
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate.
          <br />This website does not constitute medical advice.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LongevityPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <TruthsSection />
        <SystemsSection />
        <PathwaySection />
        <ForWhomSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
