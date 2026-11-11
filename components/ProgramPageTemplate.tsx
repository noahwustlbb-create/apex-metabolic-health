'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Image from '@/components/audience/Img'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HeroStartModal from '@/components/HeroStartModal'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Program pages in the AlgoRx system (12 Nov 2026), the same tokens, type and
 * cards as the home page and /order-bloods (styles/algo.css + styles/programs-al.css).
 * Order, phone first: full-bleed photo hero (headline bottom-left, one CTA, the
 * phone number) -> what it is (bordered cards + one photo card) -> photo break
 * -> numbered steps on black -> what's included (bordered cards + one photo
 * card) -> FAQ accordion -> photo CTA band. Content is unchanged and comes
 * from lib/program-configs.ts. No medicines, vials, pens or prices anywhere.
 */

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

// ─── Photos per program (repo images only; one distinct hero per page) ─────────
// pos / posM are object-position on desktop / phone so the subject stays clear of the copy.

type Shot = { src: string; pos?: string; posM?: string }
type ProgramPhotos = { hero: Shot; card: Shot; brk: Shot; cta: Shot }

const PORTAL_CARD: Shot = { src: '/photos/phone-hand.webp', pos: '50% 40%' }

// hero: full-bleed first screen · card: photo card in "What it is" · brk: photo break · cta: closing band.
// injury-repair has no fitting lifestyle photo in the repo yet, so its texture holds the hero.
const PHOTOS: Record<string, ProgramPhotos> = {
  'hormone-optimisation': {
    hero: { src: '/photos/hero-window-portrait.webp', pos: '50% 30%', posM: '62% 30%' },
    card: { src: '/programs-grid/hormone-optimisation-1200.webp' },
    brk: { src: '/photos/ocean-dawn.webp' },
    cta: { src: '/photos/hero-window-woman.webp', pos: '30% 50%', posM: '22% 50%' },
  },
  'metabolic-weight-loss': {
    hero: { src: '/photos/man-kitchen-dawn.webp', pos: '50% 28%', posM: '55% 25%' },
    card: { src: '/programs-grid/metabolic-weight-loss-1200.webp' },
    brk: { src: '/photos/ridge-dawn.webp' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
  longevity: {
    hero: { src: '/photos/portrait-man.webp', pos: '50% 26%', posM: '50% 22%' },
    card: { src: '/programs-grid/longevity-1200.webp' },
    brk: { src: '/photos/ocean-dawn.webp' },
    cta: { src: '/photos/ridge-dawn.webp' },
  },
  'hair-restoration': {
    hero: { src: '/team/hair-editorial.webp', pos: '50% 30%', posM: '50% 22%' },
    card: { src: '/programs-grid/hair-restoration-1200.webp' },
    brk: { src: '/photos/ridge-dawn.webp' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
  'skin-regeneration': {
    hero: { src: '/photos/portrait-woman.webp', pos: '50% 26%', posM: '50% 20%' },
    card: { src: '/programs-grid/skin-regeneration-1200.webp' },
    brk: { src: '/photos/hero-window-woman.webp', pos: '30% 50%', posM: '22% 50%' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
  'injury-repair': {
    hero: { src: '/programs-grid/injury-repair-1200.webp' },
    card: { src: '/photos/mesh-field.webp' },
    brk: { src: '/photos/ridge-dawn.webp' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
  'performance-plus': {
    hero: { src: '/photos/hero-window-wide.webp', pos: '50% 40%', posM: '40% 40%' },
    card: { src: '/programs-grid/performance-plus-1200.webp' },
    brk: { src: '/photos/ridge-dawn.webp' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
  'sexual-health': {
    hero: { src: '/photos/man-balcony-call.webp', pos: '50% 30%', posM: '46% 30%' },
    card: { src: '/programs-grid/sexual-health-1200.webp' },
    brk: { src: '/photos/ocean-dawn.webp' },
    cta: { src: '/photos/hero-window-woman.webp', pos: '30% 50%', posM: '22% 50%' },
  },
  pathology: {
    hero: { src: '/photos/phone-desk.webp', pos: '50% 50%', posM: '62% 50%' },
    card: { src: '/programs-grid/pathology-1200.webp' },
    brk: { src: '/photos/consult-room.webp', pos: '60% 50%' },
    cta: { src: '/photos/ocean-dawn.webp' },
  },
}
const FALLBACK: ProgramPhotos = PHOTOS.pathology

const photoStyle = (s: Shot) => ({ ['--pos' as string]: s.pos ?? '50% 50%', ['--pos-m' as string]: s.posM ?? s.pos ?? '50% 50%' })

function Photo({ shot, priority, sizes = '100vw', className = '' }: { shot: Shot; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`pa-photo ${className}`} style={photoStyle(shot)} aria-hidden="true">
      <Image src={shot.src} alt="" fill priority={priority} loading={priority ? undefined : 'lazy'} sizes={sizes} />
    </div>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const kicker = (config: ProgramPageConfig) => `// ${config.category}`
const n2 = (i: number) => String(i + 1).padStart(2, '0')

function StartButton({ onClick, light, lg = true }: { onClick: () => void; light?: boolean; lg?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`al-pill pa-btn${lg ? ' al-pill-lg' : ''}${light ? ' al-pill-light' : ''}`}>
      Create your free account <Arrow />
    </button>
  )
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero({ config, photos, onStart }: { config: ProgramPageConfig; photos: ProgramPhotos; onStart: () => void }) {
  return (
    <section className="pa-hero" aria-labelledby="pa-title">
      <Photo shot={photos.hero} priority className="pa-photo-hero" />
      <div className="pa-grade" aria-hidden="true" />
      <div className="container-x pa-hero-in">
        <div className="pa-hero-copy">
          <p className="al-k">{kicker(config)} · Doctor-led</p>
          <h1 id="pa-title" className="pa-h1">{config.headline}<span>{config.headlineAccent}</span></h1>
          <p className="pa-hero-lead">{config.heroBody}</p>
          <div className="pa-hero-row" data-pa-hero-cta>
            <StartButton onClick={onStart} light />
            <a href={`tel:${CLINIC_PHONE_E164}`} className="pa-call">Or call {CLINIC_PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 2. What it is: bordered cards, one photo card ───────────────────────────

function WhatItIs({ config, photos }: { config: ProgramPageConfig; photos: ProgramPhotos }) {
  return (
    <section className="al-sec" aria-labelledby="pa-what">
      <div className="container-x">
        <div className="pa-intro">
          <div>
            <p className="al-k">{'// What it is'}</p>
            <h2 id="pa-what" className="al-h2">{config.empathyHeadline}</h2>
          </div>
          <div>
            <p className="al-lead">{config.empathyBody}</p>
            <ul className="pa-chips" aria-label="Common reasons people start">
              {config.empathyChips.map(c => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
        <ul className="pa-bento" role="list">
          <li className="pa-photocard">
            <Photo shot={photos.card} sizes="(min-width: 900px) 33vw, 100vw" />
            <div className="pa-grade" aria-hidden="true" />
            <span className="al-k">{kicker(config)}</span>
            <span className="pa-photocard-name">{config.name}</span>
          </li>
          {config.mechanismFeatures.map((f, i) => (
            <li key={f.title} className="al-card pa-tcard">
              <span className="al-k">{n2(i)}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── 3. Full-bleed photo break ───────────────────────────────────────────────

function PhotoBreak({ config, photos }: { config: ProgramPageConfig; photos: ProgramPhotos }) {
  const shot = photos.brk
  return (
    <section className="pa-break" aria-labelledby="pa-why">
      <Photo shot={shot} />
      <div className="pa-grade" aria-hidden="true" />
      <div className="container-x">
        <p className="al-k">{'// Why it matters'}</p>
        <h2 id="pa-why" className="pa-break-h">{config.mechanismHeadline}</h2>
        <p className="pa-break-b">{config.mechanismBody}</p>
      </div>
    </section>
  )
}

// ─── 4. How it works, on black, numbered 01 to 04 ────────────────────────────

function HowItWorks({ config, onStart }: { config: ProgramPageConfig; onStart: () => void }) {
  return (
    <section className="al-sec al-how" aria-labelledby="pa-how">
      <div className="container-x">
        <div className="al-head">
          <h2 id="pa-how" className="al-h2">How it works.</h2>
          <p className="al-cap"><span>Four steps<br /></span><span>No GP referral<br /></span><span>AHPRA-registered doctors</span></p>
        </div>
        <p className="al-k al-how-row">{config.name}</p>
        <ol className="al-how-grid" role="list">
          {config.processSteps.map((s, i) => (
            <li key={s.title}>
              <span className="al-how-k">{n2(i)} / {s.time}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <StartButton onClick={onStart} light />
      </div>
    </section>
  )
}

// ─── 5. What's included: bordered cards, one photo card ──────────────────────

function Included({ config }: { config: ProgramPageConfig }) {
  const isPathology = config.slug === 'pathology'
  return (
    <section className="al-sec" aria-labelledby="pa-inc">
      <div className="container-x">
        <div className="al-head">
          <div>
            <p className="al-k">{'// What’s included'}</p>
            <h2 id="pa-inc" className="al-h2" style={{ marginTop: 18 }}>What’s included.</h2>
          </div>
          <p className="al-cap"><span>Bloods first<br /></span><span>Read with your doctor<br /></span><span>Australia-wide</span></p>
        </div>
        <ul className="pa-inc" role="list">
          {config.heroBullets.map(b => <li key={b} className="al-card">{b}</li>)}
        </ul>
        <p className="al-k pa-ev-k">{config.evidenceHeadline}</p>
        <ul className="pa-ev" role="list">
          <li className="pa-photocard">
            <Photo shot={PORTAL_CARD} sizes="(min-width: 1100px) 25vw, (min-width: 900px) 50vw, 100vw" />
            <div className="pa-grade" aria-hidden="true" />
            <span className="al-k">{'// Your portal'}</span>
            <span className="pa-photocard-name">Results in your portal.</span>
          </li>
          {config.evidencePoints.map(p => (
            <li key={p.label} className="al-card pa-evcard">
              <p className="pa-ev-v">{p.value}</p>
              <h3>{p.label}</h3>
              <p>{p.detail}</p>
            </li>
          ))}
        </ul>
        {isPathology && (
          <div className="pa-inc-row">
            <Link href="/order-bloods" className="al-pill al-pill-lg">See the blood panels <Arrow /></Link>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── 6. FAQ ──────────────────────────────────────────────────────────────────

function FAQ({ config }: { config: ProgramPageConfig }) {
  return (
    <section className="al-sec al-faq" id="faq" aria-labelledby="pa-faq">
      <div className="container-x al-faq-in">
        <div className="al-faq-side">
          <p className="al-k">{'// Straight answers'}</p>
          <h2 id="pa-faq" className="al-h2">You ask,<br />we answer.</h2>
          <p className="al-lead">The straight answers on {config.name.toLowerCase()}, bloods and your doctor.</p>
          <Link href="/faqs" className="al-pill">All questions <Arrow /></Link>
        </div>
        <div className="al-faq-list">
          {config.faqs.map((f, i) => (
            <details key={f.q} className="al-faq-item" open={i === 0}>
              <summary>
                <span className="al-k">{n2(i)}</span>
                <span className="al-faq-q">{f.q}</span>
                <span className="al-faq-x" aria-hidden="true" />
              </summary>
              <div className="al-faq-a">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. Photo CTA band ───────────────────────────────────────────────────────

function CtaBand({ config, photos, onStart }: { config: ProgramPageConfig; photos: ProgramPhotos; onStart: () => void }) {
  const shot = photos.cta
  return (
    <section className="pa-cta" id="cta" aria-labelledby="pa-close">
      <Photo shot={shot} />
      <div className="pa-grade" aria-hidden="true" />
      <div className="container-x">
        <p className="al-k">{kicker(config)}</p>
        <h2 id="pa-close" className="al-h2">{config.ctaHeadline}</h2>
        <p className="al-lead">{config.ctaBody}</p>
        <div className="pa-cta-row">
          <StartButton onClick={onStart} light />
          <a href={`tel:${CLINIC_PHONE_E164}`} className="al-pill al-pill-lg al-pill-ghost">Call {CLINIC_PHONE_DISPLAY}</a>
        </div>
        <p className="al-k pa-cta-meta">Doctors Monday to Saturday · <Link href="/discovery-call">Prefer to talk first? Book a free call</Link></p>
      </div>
    </section>
  )
}

// ─── Sticky bar: appears once the hero CTA is off screen ─────────────────────

function StickyBar({ name, onStart }: { name: string; onStart: () => void }) {
  const [off, setOff] = useState(true)
  useEffect(() => {
    const el = document.querySelector('[data-pa-hero-cta]')
    if (!el || !('IntersectionObserver' in window)) { setOff(false); return }
    const io = new IntersectionObserver(es => {
      const e = es[0]
      // Off while the hero CTA is visible or still below the fold.
      setOff(e.isIntersecting || e.boundingClientRect.top > 0)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className="prog-al-bar" role="region" aria-label="Quick actions" data-off={off || undefined} aria-hidden={off || undefined}>
      <div className="prog-al-bar-name">
        <strong>{name}</strong>
        <span className="al-k" style={{ color: '#a3a8b0' }}>Doctor-led · AHPRA registered · Online</span>
      </div>
      <div className="prog-al-bar-acts">
        <button type="button" onClick={onStart} className="al-pill al-pill-light pa-btn" tabIndex={off ? -1 : undefined}>Create your free account</button>
        <a href={`tel:${CLINIC_PHONE_E164}`} className="al-pill al-pill-ghost" aria-label={`Call ${CLINIC_PHONE_DISPLAY}`} tabIndex={off ? -1 : undefined}>{CLINIC_PHONE_DISPLAY}</a>
      </div>
    </div>
  )
}

// ─── Main Template ────────────────────────────────────────────────────────────

// Only these programs use the multi-step clinical questionnaire.
// Every other program gets the lighter intake-form / create-account choice.
const QUESTIONNAIRE_SLUGS = new Set(['hormone-optimisation', 'sexual-health', 'hair-restoration'])

export default function ProgramPageTemplate({ config }: { config: ProgramPageConfig }) {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  const photos = PHOTOS[config.slug] ?? FALLBACK

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
      <main id="main-content" className="prog-al">
        <Hero config={config} photos={photos} onStart={handleGetStarted} />
        <WhatItIs config={config} photos={photos} />
        <PhotoBreak config={config} photos={photos} />
        <HowItWorks config={config} onStart={handleGetStarted} />
        <Included config={config} />
        <FAQ config={config} />
        <CtaBand config={config} photos={photos} onStart={handleGetStarted} />
      </main>
      <div className="prog-al-foot"><Footer /></div>
      <StickyBar name={config.name} onStart={handleGetStarted} />

      <AnimatePresence>
        {modalOpen && <HeroStartModal program={config.name} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
