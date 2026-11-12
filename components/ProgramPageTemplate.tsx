'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Image from '@/components/audience/Img'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HeroStartModal from '@/components/HeroStartModal'
import TrustChips from '@/components/TrustChips'
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
  /** Legacy fields from the old bento hero. Not rendered. */
  heroBentoPortrait?: string
  heroBentoStat?: { value: string; label: string }
  heroBentoLifestyle?: string

  empathyHeadline: string
  empathyBody: string
  empathyChips: string[]
  empathyImage?: string

  evidenceHeadline: string
  evidencePoints: { value: string; label: string; detail: string }[]
  evidenceImage?: string

  processSteps: { title: string; body: string; time: string; image?: string }[]

  mechanismHeadline: string
  mechanismBody: string
  mechanismFeatures: { title: string; body: string }[]
  mechanismImage?: string

  /** Retained for reference only. NOT rendered: AHPRA prohibits testimonials
   *  about clinical care in advertising a regulated health service, and a
   *  disclaimer does not cure one. See DESIGN.md -> Regulatory Constraints. */
  testimonials: { name: string; date: string; highlight: string; full: string }[]

  faqs: { q: string; a: string }[]

  ctaHeadline: string
  ctaBody: string
  ctaImage?: string
  intakeUrl?: string
}

// ─── Photos (repo images only; one distinct hero per page, no repeat within a page) ──
// pos / posM are object-position on desktop / phone, set on the subject's face.

type Shot = { src: string; alt: string; pos?: string; posM?: string; posD?: string; portrait?: boolean }

const IMG = {
  windowMan: { src: '/photos/hero-window-portrait.webp', alt: 'Man looking out of a window in low evening light', pos: '50% 30%', posM: '62% 30%', posD: '50% 20%', portrait: true },
  kitchenMan: { src: '/photos/man-kitchen-dawn.webp', alt: 'Man leaning on a kitchen bench at dawn', pos: '50% 28%', posM: '55% 25%', posD: '50% 18%', portrait: true },
  greyMan: { src: '/photos/portrait-man.webp', alt: 'Portrait of a grey-haired man in a black t-shirt', pos: '50% 26%', posM: '50% 22%', posD: '50% 14%', portrait: true },
  hairBack: { src: '/team/hair-editorial.webp', alt: 'The back of a man’s head and hairline, close up', pos: '50% 30%', posM: '50% 22%', posD: '50% 20%', portrait: true },
  darkWoman: { src: '/photos/portrait-woman.webp', alt: 'Portrait of a woman with dark hair in a black t-shirt', pos: '50% 26%', posM: '50% 20%', posD: '50% 16%', portrait: true },
  oceanWindow: { src: '/photos/hero-window-wide.webp', alt: 'Man looking out over the ocean from a high window', pos: '50% 40%', posM: '40% 40%' },
  balconyCall: { src: '/photos/man-balcony-call.webp', alt: 'Man on a phone call on a coastal balcony', pos: '50% 30%', posM: '46% 30%' },
  duskWoman: { src: '/photos/hero-window-woman.webp', alt: 'Woman looking out at the ocean at dusk', pos: '30% 50%', posM: '22% 50%' },
  phoneDesk: { src: '/photos/phone-desk.webp', alt: 'Hands holding a phone beside a cup of coffee', pos: '50% 50%', posM: '62% 50%' },
  phoneHand: { src: '/photos/phone-hand.webp', alt: 'A hand holding a phone', pos: '50% 40%', portrait: true },
  balance: { src: '/photos/injury-hero.webp', alt: 'Man doing a single-leg balance exercise in a home gym', pos: '50% 30%', posM: '50% 30%', posD: '50% 0%', portrait: true },
  runner: { src: '/photos/performance-hero.webp', alt: 'Man running on a coastal path at dawn', pos: '50% 35%', posM: '45% 35%', posD: '50% 8%', portrait: true },
  sprintMan: { src: '/photos/man-sprint-track.webp', alt: 'Man sprinting on a running track, seen from above', pos: '55% 45%', posM: '55% 45%', posD: '55% 40%', portrait: true },
  sprintWoman: { src: '/photos/woman-sprint-night.webp', alt: 'Woman sprinting on a track at night', pos: '50% 40%', posM: '50% 40%', posD: '50% 30%', portrait: true },
  trailRun: { src: '/photos/woman-trail-run.webp', alt: 'Woman running up a grassy volcanic hillside under a grey sky', pos: '50% 50%', posM: '50% 50%', posD: '50% 45%', portrait: true },
  trackRest: { src: '/photos/man-track-rest.webp', alt: 'Man bent over, hands on knees, catching his breath on a running track', pos: '50% 30%', posM: '50% 30%', posD: '50% 20%', portrait: true },
  womanKitchen: { src: '/photos/woman-kitchen.webp', alt: 'Woman holding a glass of water in a sunlit kitchen', pos: '50% 28%', posD: '50% 12%', portrait: true },
  womanStairs: { src: '/photos/woman-stairs.webp', alt: 'Woman climbing outdoor stairs above the coast', pos: '50% 28%', posD: '50% 3%', portrait: true },
  womanCall: { src: '/photos/woman-video-call.webp', alt: 'Woman on a video call at a laptop by a window', pos: '50% 34%', posM: '45% 34%', posD: '50% 15%', portrait: true },
  parkBench: { src: '/photos/man-park-bench.webp', alt: 'Man in a hoodie resting on a park bench', pos: '50% 26%', posD: '50% 17%', portrait: true },
  kettlebell: { src: '/photos/man-kettlebell.webp', alt: 'Man resting between sets in a timber-walled home gym', pos: '50% 30%', posD: '50% 0%', portrait: true },
  couple: { src: '/photos/couple-walk.webp', alt: 'A couple talking as they walk along a leafy street', pos: '50% 26%', posD: '50% 4%', portrait: true },
} satisfies Record<string, Shot>

const texture = (slug: string, tone: string): Shot => ({ src: `/programs-grid/${slug}-1200.webp`, alt: `Close-up natural texture in ${tone} tones` })

type ProgramPhotos = { hero: Shot; card: Shot; brk: Shot; bandA: Shot; bandB: Shot; how: Shot; cta: Shot }

const PORTAL_CARD: Shot = IMG.phoneHand

// hero: first screen · card: photo card in "What it is" · brk: photo break ·
// bandA: after How it works · bandB: between What's included and the FAQ ·
// how: phone-only photo between steps 02 and 03 · cta: closing band.
const PHOTOS: Record<string, ProgramPhotos> = {
  'hormone-optimisation': { hero: IMG.windowMan, card: IMG.parkBench, brk: IMG.womanKitchen, bandA: IMG.kettlebell, bandB: IMG.couple, how: IMG.womanCall, cta: IMG.womanStairs },
  'metabolic-weight-loss': { hero: IMG.kitchenMan, card: IMG.womanKitchen, brk: IMG.couple, bandA: IMG.womanStairs, bandB: IMG.parkBench, how: IMG.kettlebell, cta: IMG.duskWoman },
  longevity: { hero: IMG.greyMan, card: IMG.couple, brk: IMG.trailRun, bandA: IMG.parkBench, bandB: IMG.womanKitchen, how: IMG.duskWoman, cta: IMG.womanCall },
  'hair-restoration': { hero: IMG.hairBack, card: texture('hair-restoration', 'green'), brk: IMG.parkBench, bandA: IMG.womanCall, bandB: IMG.couple, how: IMG.kettlebell, cta: IMG.womanKitchen },
  'skin-regeneration': { hero: IMG.darkWoman, card: texture('skin-regeneration', 'soft rose'), brk: IMG.womanKitchen, bandA: IMG.womanCall, bandB: IMG.couple, how: IMG.duskWoman, cta: IMG.womanStairs },
  'injury-repair': { hero: IMG.balance, card: IMG.kettlebell, brk: IMG.trackRest, bandA: IMG.parkBench, bandB: IMG.couple, how: IMG.womanKitchen, cta: IMG.womanCall },
  'performance-plus': { hero: IMG.sprintMan, card: IMG.kettlebell, brk: IMG.sprintWoman, bandA: IMG.couple, bandB: IMG.parkBench, how: IMG.womanCall, cta: IMG.trackRest },
  'sexual-health': { hero: IMG.balconyCall, card: texture('sexual-health', 'deep red'), brk: IMG.couple, bandA: IMG.parkBench, bandB: IMG.womanCall, how: IMG.duskWoman, cta: IMG.oceanWindow },
  pathology: { hero: IMG.womanCall, card: texture('pathology', 'dark red'), brk: IMG.parkBench, bandA: IMG.couple, bandB: IMG.womanKitchen, how: IMG.womanStairs, cta: IMG.phoneDesk },
}
const FALLBACK: ProgramPhotos = PHOTOS.pathology

const photoStyle = (s: Shot) => ({
  ['--pos' as string]: s.pos ?? '50% 50%',
  ['--pos-m' as string]: s.posM ?? s.pos ?? '50% 50%',
  // Wide crops of portrait photos (desktop bands, break, CTA): keep the head in frame.
  ['--pos-d' as string]: s.posD ?? s.pos ?? '50% 50%',
})

function Photo({ shot, priority, sizes = '100vw', className = '' }: { shot: Shot; priority?: boolean; sizes?: string; className?: string }) {
  return (
    <div className={`pa-photo ${className}`} style={photoStyle(shot)}>
      <Image src={shot.src} alt={shot.alt} fill priority={priority} loading={priority ? undefined : 'lazy'} sizes={sizes} />
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
    <section className="pa-hero" aria-labelledby="pa-title" data-portrait={photos.hero.portrait || undefined}>
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

// ─── Photo band: a full-bleed people photo, about 40vh, between text blocks ───

function Band({ shot, label }: { shot: Shot; label: string }) {
  return (
    <section className="pa-band" aria-label={label}>
      <Photo shot={shot} />
      <div className="pa-grade" aria-hidden="true" />
      <div className="container-x"><p className="al-k">{label}</p></div>
    </section>
  )
}

// ─── 4. How it works, on black, numbered 01 to 04 ────────────────────────────

function HowItWorks({ config, photos, onStart }: { config: ProgramPageConfig; photos: ProgramPhotos; onStart: () => void }) {
  return (
    <section className="al-sec al-how" aria-labelledby="pa-how">
      <div className="container-x">
        <div className="al-head">
          <h2 id="pa-how" className="al-h2">How it works.</h2>
          <p className="al-cap"><span>Four steps<br /></span><span>No GP referral<br /></span><span>AHPRA-registered doctors</span></p>
        </div>
        <p className="al-k al-how-row">{config.name}</p>
        {/* Two lists so a photo can sit between steps 02 and 03 on phones (no run of
            text longer than one phone screen). On desktop the lists flow as one 4-up grid. */}
        <div className="al-how-grid pa-how-grid">
          {[config.processSteps.slice(0, 2), config.processSteps.slice(2)].map((half, h) => (
            <Fragment key={h}>
              {h === 1 && (
                <figure className="pa-how-photo">
                  <Photo shot={photos.how} sizes="(max-width: 899px) 100vw, 1px" />
                </figure>
              )}
              <ol className="pa-how-ol" role="list" start={h * 2 + 1}>
                {half.map((s, j) => (
                  <li key={s.title}>
                    <span className="al-how-k">{n2(h * 2 + j)} / {s.time}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </Fragment>
          ))}
        </div>
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
          <p className="al-lead pa-faq-lead">The straight answers on {config.name.toLowerCase()}, bloods and your doctor.</p>
          <Link href="/faqs" className="al-pill">All questions <Arrow /></Link>
        </div>
        <div className="al-faq-list">
          {config.faqs.map((f, i) => (
            <details key={f.q} className="al-faq-item">
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
        <TrustChips />
        <WhatItIs config={config} photos={photos} />
        <PhotoBreak config={config} photos={photos} />
        <HowItWorks config={config} photos={photos} onStart={handleGetStarted} />
        <Band shot={photos.bandA} label="// Bloods first · Then a plan" />
        <Included config={config} />
        <Band shot={photos.bandB} label="// Doctor-led · Australia-wide" />
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
