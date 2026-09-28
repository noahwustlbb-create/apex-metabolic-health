'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import Image from '@/components/audience/Img'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import HeroStartModal from '@/components/HeroStartModal'

const ease = [0.22, 1, 0.36, 1] as const
const BLUE = 'var(--blue)'
const INK = 'var(--text-primary)'
const BODY_COLOR = 'var(--text-secondary)'
const DARK_INK = '#111827'

export interface ProgramPageConfig {
  slug: string
  name: string
  category: string

  headline: string
  headlineAccent: string
  heroBody: string
  heroBullets: string[]
  heroBentoPortrait: string
  heroBentoStat: { value: string; label: string }
  heroBentoLifestyle: string

  empathyHeadline: string
  empathyBody: string
  empathyChips: string[]
  empathyImage: string

  evidenceHeadline: string
  evidencePoints: { value: string; label: string; detail: string }[]
  evidenceImage: string

  processSteps: { title: string; body: string; time: string; image: string }[]

  mechanismHeadline: string
  mechanismBody: string
  mechanismFeatures: { title: string; body: string }[]
  mechanismImage: string

  /** Retained for reference only. NOT rendered: AHPRA prohibits testimonials
   *  about clinical care in advertising a regulated health service, and a
   *  disclaimer does not cure one. See DESIGN.md -> Regulatory Constraints. */
  testimonials: { name: string; date: string; highlight: string; full: string }[]

  faqs: { q: string; a: string }[]

  ctaHeadline: string
  ctaBody: string
  ctaImage: string
  intakeUrl?: string
}

// ─── Stage art (Higgsfield glass set, 2026-09-27) ──────────────────────────────

const ART: Record<string, string> = {
  'hormone-optimisation': 'hormone',
  'metabolic-weight-loss': 'weight',
  'performance-plus': 'performance',
  'hair-restoration': 'hair',
  'injury-repair': 'recovery',
  longevity: 'longevity',
  pathology: 'bloods',
  'sexual-health': 'sexual',
  'skin-regeneration': 'skin',
}
const art = (slug: string) => `/protocols/${ART[slug] ?? 'bloods'}.jpg`

function useReveal(margin = '-12% 0px') {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` })
  const rise = (delay = 0, y = 22) =>
    reduced
      ? { initial: false as const }
      : { initial: { opacity: 0, y }, animate: inView ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, delay, ease } }
  return { ref, inView, reduced, rise }
}

function StartButton({ onClick, children, tone = 'light' }: { onClick: () => void; children: React.ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <button type="button" onClick={onClick} className="stage-cta" data-tone={tone}>
      <span className="stage-cta-label">{children}</span>
      <span className="stage-cta-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </button>
  )
}

// ─── Hero: ice stage, the program's glass render bleeding off the frame ────────

function HeroSection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const { ref, rise } = useReveal('0px')
  return (
    <section ref={ref} className="prog-hero" aria-label={config.name}>
      <div className="stage-frame prog-hero-frame">
        <div className="prog-hero-art stage-load" aria-hidden="true">
          <Image src={art(config.slug)} alt="" fill priority sizes="(min-width: 900px) 58vw, 100vw" className="object-cover" />
        </div>
        <div className="prog-hero-copy">
          <motion.p {...rise(0, 10)} className="stage-kicker"><span className="stage-kicker-dot" aria-hidden="true" /> {config.category}</motion.p>
          <motion.h1 {...rise(0.06, 28)} className="stage-display prog-title">
            {config.headline}<br /><span className="stage-muted">{config.headlineAccent}</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="stage-lead">{config.heroBody}</motion.p>
          <motion.ul {...rise(0.24)} className="prog-bullets">
            {config.heroBullets.map(b => (
              <li key={b}><span aria-hidden="true" className="prog-tick" />{b}</li>
            ))}
          </motion.ul>
          <motion.div {...rise(0.32)} className="stage-actions">
            <StartButton onClick={onGetStarted}>Start your assessment</StartButton>
            <Link href="/discovery-call" className="stage-link">Free discovery call</Link>
          </motion.div>
        </div>
        <div className="prog-hero-float" aria-hidden="true">
          <span className="stage-float-k">Reviewed by</span>
          <span className="stage-float-v">An AHPRA-registered doctor</span>
        </div>
      </div>
    </section>
  )
}

// ─── Empathy: one statement, the symptoms as glass chips ───────────────────────

function EmpathySection({ config }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const { ref, rise } = useReveal()
  return (
    <section ref={ref} className="prog-empathy container-x" aria-label="Understanding your situation">
      <motion.h2 {...rise(0, 26)} className="stage-h2 prog-empathy-title">{config.empathyHeadline}</motion.h2>
      <div className="prog-empathy-grid">
        <motion.p {...rise(0.1)} className="stage-lead prog-body">{config.empathyBody}</motion.p>
        <motion.ul {...rise(0.18)} className="prog-chips" aria-label="Common reasons people start">
          {config.empathyChips.map(c => <li key={c}>{c}</li>)}
        </motion.ul>
      </div>
    </section>
  )
}

// ─── Evidence: night band, numbers in Doto beside the render ───────────────────

function EvidenceSection({ config }: { config: ProgramPageConfig }) {
  const { ref, rise } = useReveal()
  return (
    <section ref={ref} className="stage-night prog-night" aria-label="Clinical foundation">
      <div className="container-x prog-night-grid">
        <div>
          <motion.h2 {...rise(0, 26)} className="stage-h2">{config.evidenceHeadline}</motion.h2>
          <ol className="prog-evidence">
            {config.evidencePoints.map((p, i) => (
              <motion.li key={p.label} {...rise(0.12 + i * 0.08)}>
                <span className="stage-readout prog-evidence-v">{p.value}</span>
                <span className="prog-evidence-l">{p.label}</span>
                <span className="prog-evidence-d">{p.detail}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div {...rise(0.2, 40)} className="prog-night-art" aria-hidden="true">
          <Image src={art(config.slug)} alt="" fill sizes="(min-width: 900px) 40vw, 90vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Process: four tall cards in four materials, like the homepage ────────────

const TONES = ['night', 'blue', 'ice', 'mist'] as const

function ProcessSection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const { ref, inView, reduced } = useReveal()
  return (
    <section ref={ref} className="stage-clarity" aria-label="How it works">
      <div className="container-x">
        <h2 className="stage-h2 stage-center">From first question<br /><span className="stage-muted">to your protocol.</span></h2>
        <div className="stage-cards">
          {config.processSteps.map((s, i) => (
            <motion.article
              key={s.title}
              className="stage-card"
              data-tone={TONES[i % 4]}
              style={{ ['--lift' as string]: `${[0, 44, 10, 56][i % 4]}px` }}
              initial={reduced ? false : { opacity: 0, y: 90, filter: 'blur(14px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
            >
              <span className="stage-readout prog-step-n">{String(i + 1).padStart(2, '0')}</span>
              <div className="stage-card-text">
                <p className="prog-step-time">{s.time}</p>
                <h3 className="stage-card-title">{s.title}</h3>
                <p className="stage-card-body">{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="stage-actions stage-actions-center prog-process-cta">
          <StartButton onClick={onGetStarted}>Start your assessment</StartButton>
        </div>
      </div>
    </section>
  )
}

// ─── Mechanism: ice stage, features as glass cards ────────────────────────────

function MechanismSection({ config }: { config: ProgramPageConfig }) {
  const { ref, rise } = useReveal()
  return (
    <section ref={ref} className="prog-mech-wrap" aria-label="Why this approach works">
      <div className="stage-frame prog-mech">
        <div className="prog-mech-head">
          <motion.h2 {...rise(0, 26)} className="stage-h2">{config.mechanismHeadline}</motion.h2>
          <motion.p {...rise(0.1)} className="stage-lead">{config.mechanismBody}</motion.p>
        </div>
        <div className="prog-mech-grid">
          {config.mechanismFeatures.map((f, i) => (
            <motion.div key={f.title} {...rise(0.15 + i * 0.07)} className="prog-glass">
              <h3 className="prog-glass-t">{f.title}</h3>
              <p className="prog-glass-b">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA: back on the ice stage ─────────────────────────────────────────

function FinalCTASection({ config, onGetStarted }: { config: ProgramPageConfig; onGetStarted: () => void }) {
  const { ref, rise } = useReveal()
  return (
    <section ref={ref} className="stage-close-wrap" aria-label="Get started">
      <div className="stage-frame stage-close">
        <motion.h2 {...rise(0.05)} className="stage-display stage-center">{config.ctaHeadline}</motion.h2>
        <motion.p {...rise(0.15)} className="stage-lead stage-center">{config.ctaBody}</motion.p>
        <motion.div {...rise(0.25)} className="stage-actions stage-actions-center">
          <StartButton onClick={onGetStarted}>Start your assessment</StartButton>
          <Link href="/discovery-call" className="stage-link">Prefer to talk first? Book a free call</Link>
        </motion.div>
      </div>
    </section>
  )
}

function StickyBar({ name, onGetStarted }: { name: string; onGetStarted: () => void }) {
  const prefersReduced = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={prefersReduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
            background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: '0 -8px 30px rgba(15,23,42,0.08)',
            borderTop: '1px solid var(--border)',
            padding: '12px clamp(16px, 5vw, 48px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: INK, fontFamily: 'var(--font-inter)' }}>{name}</p>
            <p style={{ fontSize: 11, color: '#6b7280' }}>Doctor-led · AHPRA registered · 100% online</p>
          </div>
          <StartButton onClick={onGetStarted}>Start assessment</StartButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main Template ────────────────────────────────────────────────────────────

// Only these programs use the multi-step clinical questionnaire.
// Every other program gets the lighter intake-form / create-account choice.
const QUESTIONNAIRE_SLUGS = new Set(['hormone-optimisation', 'sexual-health', 'hair-restoration'])

export default function ProgramPageTemplate({ config }: { config: ProgramPageConfig }) {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  const handleGetStarted = () => {
    if (QUESTIONNAIRE_SLUGS.has(config.slug) && config.intakeUrl) {
      router.push(config.intakeUrl)
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <Nav />
      <main className="prog-main">
        <HeroSection config={config} onGetStarted={handleGetStarted} />
        <EmpathySection config={config} onGetStarted={handleGetStarted} />
        <EvidenceSection config={config} />
        <ProcessSection config={config} onGetStarted={handleGetStarted} />
        <MechanismSection config={config} />
        <FAQSection faqs={config.faqs} />
        <FinalCTASection config={config} onGetStarted={handleGetStarted} />
      </main>
      <Footer />
      <StickyBar name={config.name} onGetStarted={handleGetStarted} />

      <AnimatePresence>
        {modalOpen && <HeroStartModal program={config.name} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
