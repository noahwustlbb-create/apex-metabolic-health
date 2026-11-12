import Link from 'next/link'
import Footer from '@/components/Footer'
import InnerStickyBar from '@/components/inner/InnerStickyBar'
import { START_HREF } from '@/lib/portal'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Shared blocks for the inner pages in the AlgoRx system (12 Nov 2026):
 * hero band, section head, how-it-works rows on black, the four principles,
 * FAQ accordion, photo CTA band, black footer and the phone sticky bar.
 * Styles: styles/inner.css (.ip-*) plus the shared al-* classes (styles/algo.css).
 * Server components, no JS. No medicine names, no outcomes, no prices above
 * the first screen, no invented people or numbers.
 */

export const Arrow = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const n2 = (i: number) => String(i + 1).padStart(2, '0')

export type Shot = { src: string; alt: string; pos?: string }

/* eslint-disable @next/next/no-img-element */
export function Photo({ shot, className = '', sizes = '(min-width: 900px) 50vw, 100vw', priority }: { shot: Shot; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <figure className={`al-photo ${className}`}>
      <img src={shot.src} alt={shot.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" sizes={sizes} style={{ objectPosition: shot.pos ?? '50% 30%' }} />
    </figure>
  )
}

function Bg({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <>
      <div className="ip-bg" style={{ ['--pos' as string]: shot.pos ?? '50% 30%' }}>
        <img src={shot.src} alt={shot.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" sizes="100vw" />
      </div>
      <div className="ip-grade" aria-hidden="true" />
    </>
  )
}

export function Cap({ lines, className = '' }: { lines: string[]; className?: string }) {
  return (
    <p className={`al-cap ${className}`}>
      {lines.map((c, i) => <span key={c}>{c}{i < lines.length - 1 && <br />}</span>)}
    </p>
  )
}

export function StartPill({ light, lg = true, label = 'Create your free account', href = START_HREF }: { light?: boolean; lg?: boolean; label?: string; href?: string }) {
  return (
    <Link href={href} className={`al-pill${lg ? ' al-pill-lg' : ''}${light ? ' al-pill-light' : ''}`}>
      {label} <Arrow />
    </Link>
  )
}

export function CallLink({ prefix = 'Or call' }: { prefix?: string }) {
  return <a href={`tel:${CLINIC_PHONE_E164}`} className="ip-call">{prefix} {CLINIC_PHONE_DISPLAY}</a>
}

/** Hero band: black (or a crushed photo), kicker, headline with a full stop, one line, one CTA, mono caption. */
export function InnerHero({ kicker, title, lead, cap, photo, sidePhoto, cta = true, ctaLabel, ctaHref, id = 'ip-title' }: {
  kicker: string; title: React.ReactNode; lead?: string; cap?: string[]; photo?: Shot; sidePhoto?: Shot; cta?: boolean; ctaLabel?: string; ctaHref?: string; id?: string
}) {
  return (
    <section className="ip-hero" aria-labelledby={id} data-photo={photo ? '' : undefined}>
      {photo && <Bg shot={photo} priority />}
      {sidePhoto && (
        /* Desktop only (>= 900px): photo on the right half, dark gradient to the text side. */
        <div className="ip-hero-photo" aria-hidden="true" style={{ ['--pos' as string]: sidePhoto.pos ?? '50% 30%' }}>
          <img src={sidePhoto.src} alt="" loading="lazy" decoding="async" sizes="50vw" />
        </div>
      )}
      <div className="container-x">
        <div className="ip-hero-in">
          <div className="ip-hero-copy">
            <p className="al-k">{'// '}{kicker}</p>
            <h1 id={id} className="ip-h1">{title}</h1>
            {lead && <p className="ip-hero-lead">{lead}</p>}
            {cta && (
              <div className="ip-hero-row">
                <StartPill light label={ctaLabel} href={ctaHref} />
                <CallLink />
              </div>
            )}
          </div>
          {cap && <div className="ip-hero-side"><Cap lines={cap} /></div>}
        </div>
      </div>
    </section>
  )
}

export function Head({ id, kicker, title, cap, dark }: { id: string; kicker: string; title: React.ReactNode; cap?: string[]; dark?: boolean }) {
  return (
    <div className="ip-head" data-dark={dark || undefined}>
      <div>
        <p className="al-k">{'// '}{kicker}</p>
        <h2 id={id} className="al-h2">{title}</h2>
      </div>
      {cap && <Cap lines={cap} />}
    </div>
  )
}

/* ── Outline icons (one stroke, 1.5px) for the how-it-works rows ── */
const IC = {
  order: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>,
  collect: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
  doctor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /><circle cx="12" cy="8" r="4" /></svg>,
  portal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18h2" /><path d="M10 9l1.5 2.5L13 8l1.5 3" /></svg>,
  consult: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></svg>,
  plan: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5" /><path d="M4 15l5-5 4 3 7-7" /><path d="M16 6h4v4" /></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-4 9 4-9 4-9-4z" /><path d="M3 8v8l9 4 9-4V8" /><path d="M12 12v8" /></svg>,
  review: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v5h-5" /></svg>,
}
export type StepIcon = keyof typeof IC

export type Step = { k: string; t: string; b: string; ic: StepIcon }

export const BLOOD_STEPS: Step[] = [
  { k: 'Order', t: 'Order your panel.', b: 'Create your free account and order a doctor-issued panel. No GP referral.', ic: 'order' },
  { k: 'Collect', t: 'Bloods near you.', b: 'A morning draw at an accredited collection centre near you, Australia-wide.', ic: 'collect' },
  { k: 'Doctor reads', t: 'A doctor reads every result.', b: 'Results land in the system automatically and a doctor reviews them before you see them.', ic: 'doctor' },
  { k: 'Results', t: 'Results in your portal.', b: 'Every marker in plain English, your trend over time, and the next step.', ic: 'portal' },
]
export const PROGRAM_STEPS: Step[] = [
  { k: 'Consult', t: 'Talk it through.', b: 'A telehealth consult with an AHPRA-registered doctor, your results open on the screen.', ic: 'consult' },
  { k: 'Plan', t: 'A plan you understand.', b: 'Set from your own numbers, aimed at where you work best, not just inside the reference range.', ic: 'plan' },
  { k: 'Dispensed', t: 'Dispensed discreetly.', b: 'If treatment is suitable, it is dispensed by an Australian partner pharmacy and delivered to your door.', ic: 'box' },
  { k: 'Review', t: 'Review every 3 months.', b: 'Follow-up bloods and a review about every 3 months, so the plan follows your numbers.', ic: 'review' },
]

export function StepRow({ label, steps }: { label: string; steps: Step[] }) {
  return (
    <div className="ip-how-row">
      <p className="al-k ip-how-label">{label}</p>
      <ol className="ip-steps" role="list">
        {steps.map((s, i) => (
          <li key={s.k}>
            <span className="ip-step-k">{n2(i)} / {s.k}</span>
            <h3>{s.t}</h3>
            <p>{s.b}</p>
            <span className="ip-step-ic" aria-hidden="true">{IC[s.ic]}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** How it works on black. One row (programs) or two (bloods, programs). */
export function HowBand({ rows, cap, title = 'How it works.', kicker = 'How it works', id = 'ip-how', cta = true }: { rows: { label: string; steps: Step[] }[]; cap?: string[]; title?: string; kicker?: string; id?: string; cta?: boolean }) {
  return (
    <section className="ip-how" aria-labelledby={id}>
      <div className="container-x">
        <Head id={id} kicker={kicker} title={title} cap={cap ?? ['No GP referral', 'AHPRA-registered doctors', 'Australia-wide']} dark />
        {rows.map(r => <StepRow key={r.label} label={r.label} steps={r.steps} />)}
        {cta && (
          <div className="ip-how-cta">
            <StartPill light />
            <CallLink />
          </div>
        )}
      </div>
    </section>
  )
}

/** The four principles (brand platform, 12 Nov 2026). */
export const PRINCIPLES = [
  { k: 'Measure', t: 'Measure.', b: 'Nothing starts without bloods. Every plan begins with your own numbers.' },
  { k: 'Assess', t: 'Assess.', b: 'A doctor reads every result. Results land in the system automatically and are reviewed before you see them.' },
  { k: 'Optimise', t: 'Optimise.', b: 'Normal isn’t optimal. The plan aims for where you perform best, not just inside the reference range.' },
  { k: 'Doctor-led', t: 'Doctor-led specialists.', b: 'Every plan is set by an AHPRA-registered doctor who works in hormone and metabolic health.' },
]
export function WhyApex({ id = 'ip-why' }: { id?: string }) {
  return (
    <section className="al-sec" aria-labelledby={id}>
      <div className="container-x">
        <Head id={id} kicker="Why Apex" title="Measure first. Then treat." cap={['Four principles', 'Every page, every plan', 'No fluff']} />
        <ol className="ip-why" role="list">
          {PRINCIPLES.map((p, i) => (
            <li key={p.k}>
              <span className="al-k">{n2(i)}</span>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export type Faq = { q: string; a: React.ReactNode }

/** Numbered accordion: hairlines, + / x toggles. */
export function FaqList({ faqs, openFirst, start = 0 }: { faqs: Faq[]; openFirst?: boolean; start?: number }) {
  return (
    <div className="al-faq-list">
      {faqs.map((f, i) => (
        <details key={typeof f.q === 'string' ? f.q : i} className="al-faq-item" open={openFirst && i === 0 ? true : undefined}>
          <summary>
            <span className="al-k">{n2(start + i)}</span>
            <span className="al-faq-q">{f.q}</span>
            <span className="al-faq-x" aria-hidden="true" />
          </summary>
          <div className="al-faq-a">{f.a}</div>
        </details>
      ))}
    </div>
  )
}

/** You ask, we answer: left block, numbered accordion right. */
export function FaqSection({ faqs, kicker = 'Straight answers', title = <>You ask,<br />we answer.</>, lead, more = true, id = 'ip-faq', last }: {
  faqs: Faq[]; kicker?: string; title?: React.ReactNode; lead?: string; more?: boolean; id?: string; last?: boolean
}) {
  return (
    <section className="al-sec al-faq" id="faq" aria-labelledby={id} data-last={last || undefined}>
      <div className="container-x al-faq-in">
        <div className="al-faq-side">
          <p className="al-k">{'// '}{kicker}</p>
          <h2 id={id} className="al-h2">{title}</h2>
          {lead && <p className="al-lead">{lead}</p>}
          {more && <Link href="/faqs" className="al-pill" style={{ marginTop: 24 }}>All questions <Arrow /></Link>}
        </div>
        <FaqList faqs={faqs} openFirst />
      </div>
    </section>
  )
}

/** Full-bleed photo band with a mono label. */
export function PhotoBand({ shot, label }: { shot: Shot; label: string }) {
  return (
    <section className="ip-band" aria-label={label.replace(/^\/\/\s*/, '')}>
      <Bg shot={shot} />
      <div className="container-x"><p className="al-k">{label}</p></div>
    </section>
  )
}

/** Full-bleed photo band with one short white line (phone pacing between text sections). */
export function PhotoLine({ shot, line }: { shot: Shot; line: string }) {
  return (
    <section className="ip-band ip-band-line" aria-label={line}>
      <Bg shot={shot} />
      <div className="container-x"><p className="ip-band-text">{line}</p></div>
    </section>
  )
}

/** Closing photo CTA band (same as home's "Ready to start"). */
export function CtaBand({ shot, kicker = 'Ready to start', title = 'Ready to start.', lead = 'Create your free account, order your bloods, and a doctor reads every result with you. No GP referral.', label, href }: {
  shot: Shot; kicker?: string; title?: string; lead?: string; label?: string; href?: string
}) {
  return (
    <section className="al-close" id="cta" aria-labelledby="ip-close">
      <img className="al-close-bg" src={shot.src} alt="" loading="lazy" decoding="async" aria-hidden="true" style={{ objectPosition: shot.pos ?? '50% 20%' }} />
      <div className="container-x al-close-in">
        <p className="al-k">{'// '}{kicker}</p>
        <h2 id="ip-close" className="al-h2">{title}</h2>
        <p className="al-lead">{lead}</p>
        <div className="al-close-row">
          <StartPill light label={label} href={href} />
          <a href={`tel:${CLINIC_PHONE_E164}`} className="al-pill al-pill-lg al-pill-ghost">Call {CLINIC_PHONE_DISPLAY}</a>
        </div>
        <p className="al-k al-close-meta">Doctors Monday to Saturday · <Link href="/discovery-call">Prefer to talk first? Book a free call</Link></p>
      </div>
    </section>
  )
}

/** Black footer plus the phone sticky bar. */
export function InnerFoot({ bar = true }: { bar?: boolean }) {
  return (
    <>
      <div className="al-foot"><Footer /></div>
      {bar && <InnerStickyBar />}
    </>
  )
}

/* ── Photos: repo originals (public/photos), chosen per page so no page repeats one ── */
export const SHOTS = {
  runner: { src: '/photos/performance-hero.webp', alt: 'Man running on a coastal path at dawn', pos: '50% 20%' },
  womanStairs: { src: '/photos/woman-stairs.webp', alt: 'Woman climbing outdoor stairs above the coast', pos: '50% 12%' },
  womanKitchen: { src: '/photos/woman-kitchen.webp', alt: 'Woman holding a glass of water in a sunlit kitchen', pos: '50% 20%' },
  kettlebell: { src: '/photos/man-kettlebell.webp', alt: 'Man resting between sets in a timber-walled home gym', pos: '50% 10%' },
  couple: { src: '/photos/couple-walk.webp', alt: 'A couple talking as they walk along a leafy street', pos: '50% 20%' },
  parkBench: { src: '/photos/man-park-bench.webp', alt: 'Man in a hoodie resting on a park bench', pos: '50% 22%' },
  womanCall: { src: '/photos/woman-video-call.webp', alt: 'Woman on a video call at a laptop by a window', pos: '50% 25%' },
  kitchenMan: { src: '/photos/man-kitchen-dawn.webp', alt: 'Man leaning on a kitchen bench at dawn', pos: '50% 25%' },
  balconyCall: { src: '/photos/man-balcony-call.webp', alt: 'Man on a phone call on a coastal balcony', pos: '50% 30%' },
  oceanWindow: { src: '/photos/hero-window-wide.webp', alt: 'Man looking out over the ocean from a high window', pos: '50% 40%' },
  duskWoman: { src: '/photos/hero-window-woman.webp', alt: 'Woman looking out at the ocean at dusk', pos: '30% 50%' },
  windowMan: { src: '/photos/hero-window-portrait.webp', alt: 'Man looking out of a window in low evening light', pos: '55% 25%' },
  // 13 Nov 2026 (Noah): people holding phones become his device renders (tablet for wide slots, phone for tall).
  phoneDesk: { src: '/photos/device-tablet-1600.webp', alt: 'A tablet showing a glowing outline of the human body beside four result rings', pos: '50% 50%' },
  phoneHand: { src: '/photos/device-phone-1200.webp', alt: 'A phone showing a glowing outline of the human body', pos: '50% 46%' },
  balance: { src: '/photos/injury-hero.webp', alt: 'Man doing a single-leg balance exercise in a home gym', pos: '50% 20%' },
  greyMan: { src: '/photos/portrait-man.webp', alt: 'Portrait of a grey-haired man in a black t-shirt', pos: '50% 20%' },
  darkWoman: { src: '/photos/portrait-woman.webp', alt: 'Portrait of a woman with dark hair in a black t-shirt', pos: '50% 20%' },
  trackRest: { src: '/photos/man-track-rest.webp', alt: 'Man bent over, hands on knees, catching his breath on a running track', pos: '50% 30%' },
  sprintMan: { src: '/photos/man-sprint-track.webp', alt: 'Man sprinting on a running track, seen from above', pos: '82% 38%' },
  sprintWoman: { src: '/photos/woman-sprint-night.webp', alt: 'Woman sprinting on a track at night', pos: '50% 40%' },
  trailRun: { src: '/photos/woman-trail-run.webp', alt: 'Woman running up a grassy volcanic hillside under a grey sky', pos: '50% 50%' },
  driftwood: { src: '/photos/driftwood.webp', alt: 'Close-up of weathered driftwood grain', pos: '50% 50%' },
  glassSphere: { src: '/photos/glass-sphere.webp', alt: 'Amber glass sphere inside glass rings on a mossy rock', pos: '50% 50%' },
  texturePathology: { src: '/programs-grid/pathology-1200.webp', alt: 'Close-up natural texture in dark red tones (AI-generated, illustrative)', pos: '50% 50%' },
  textureLongevity: { src: '/programs-grid/longevity-1200.webp', alt: 'Close-up natural texture (AI-generated, illustrative)', pos: '50% 50%' },
  textureHormone: { src: '/programs-grid/hormone-optimisation-1200.webp', alt: 'Close-up natural texture (AI-generated, illustrative)', pos: '50% 50%' },
} satisfies Record<string, Shot>
