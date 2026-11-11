import Link from 'next/link'
import { FAQS } from '@/lib/faqs'
import { OBJECTIONS } from '@/components/Objections'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Home sections in the AlgoRx system (Noah 11 Nov 2026; locked reference
 * ~/Clients/4thQtr/reference/algorx/ALGORX-PLAYBOOK.md section 4). Every
 * fact here already appears elsewhere on the site: prices from
 * app/pricing/page.tsx, timings from /order-bloods and the stage sections,
 * answers from lib/faqs.ts and components/Objections.tsx. No medicine names,
 * no outcomes, no invented numbers.
 */

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Head({ id, title, cap, dark }: { id: string; title: string; cap: string[]; dark?: boolean }) {
  return (
    <div className="al-head" data-dark={dark || undefined}>
      <h2 id={id} className="al-h2">{title}</h2>
      <p className="al-cap">{cap.map((c, i) => <span key={c}>{c}{i < cap.length - 1 && <br />}</span>)}</p>
    </div>
  )
}

/** 3. Trust strip: claims the site already proves (footer badges, /about). */
export function TrustStrip() {
  const items = ['AHPRA-registered doctors', 'NATA-accredited pathology', 'TGA-compliant pharmacy partner', 'LegitScript certified', 'No GP referral']
  return (
    <div className="al-trust" aria-label="Why you can trust Apex">
      <ul className="container-x">{items.map(t => <li key={t}>{t}</li>)}</ul>
    </div>
  )
}

/** 5. The AlgoRx "Best Sellers" slot: the four ways people start with Apex. */
const PATHWAYS = [
  { cat: 'Men', name: 'Men’s blood panel', sub: '23+ markers · incl. testosterone', price: '$280 first panel · members $199', page: '/programs/pathology', start: '/start?for=men' },
  { cat: 'Women', name: 'Women’s blood panel', sub: 'Hormones · cycle · iron · thyroid', price: '$280 first panel · members $199', page: '/programs/pathology', start: '/start?for=women' },
  { cat: 'Pathology', name: 'Order bloods', sub: 'Doctor-reviewed · 4,000+ collection centres', price: 'Most results in about 48 hours', page: '/order-bloods', start: '/order-bloods' },
  { cat: 'Membership', name: 'Apex Member', sub: 'Member rates · reviews about every 3 months', price: '$99 /mo · no lock-in', page: '/membership', start: '/start' },
]
export function Pathways() {
  return (
    <section className="al-sec al-paths" aria-labelledby="paths-title">
      <div className="container-x">
        <Head id="paths-title" title="Start here." cap={['One panel, then a plan', 'Four ways in', 'Prices on /pricing']} />
        <ul className="al-paths-grid" role="list">
          {PATHWAYS.map((p, i) => (
            <li key={p.name} className="al-card al-path">
              <span className="al-path-top"><span className="al-k">{String(i + 1).padStart(2, '0')} · {p.cat}</span></span>
              <Link href={p.page} className="al-path-name">{p.name}</Link>
              <span className="al-k al-path-sub">{p.sub}</span>
              <span className="al-path-foot">
                <span className="al-path-price">{p.price}</span>
                <Link href={p.start} className="al-pill" aria-label={`Start ${p.name} pathway`}>Start <Arrow /></Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** 7. Why Apex? Four principles under a hairline. */
const PRINCIPLES = [
  { t: 'Measure first', b: 'One blood panel before any plan, read with you by a doctor.' },
  { t: 'Doctor-led', b: 'Every consultation is with an AHPRA-registered doctor.' },
  { t: 'Australian', b: 'NATA-accredited pathology, Australian pharmacies, Australian doctors.' },
  { t: 'Honest', b: 'Every fee is on the pricing page before you start. No lock-in.' },
]
export function WhyApex() {
  return (
    <section className="al-sec al-why" aria-labelledby="why-title">
      <div className="container-x">
        <Head id="why-title" title="Why Apex?" cap={['Numbers, not guesses', 'Four principles', 'Every claim checkable']} />
        <ol className="al-why-grid" role="list">
          {PRINCIPLES.map((p, i) => (
            <li key={p.t}>
              <span className="al-k">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/** 8. Results teaser: split, with a dark panel card. No result values are shown. */
export function ResultsTeaser() {
  return (
    <section className="al-sec al-results" aria-labelledby="results-title">
      <div className="container-x al-results-in">
        <div className="al-results-copy">
          <p className="al-k">→ Read with your doctor · Every panel</p>
          <h2 id="results-title" className="al-h2">Your results, in your portal.</h2>
          <p className="al-lead">Every marker grouped by system and flagged where it matters. Your doctor explains it on the call, and your plan lives next to it.</p>
          <ul className="al-ticks" role="list">
            <li>Every marker grouped by system</li>
            <li>Flagged against your lab’s reference range</li>
            <li>Ask about your results, any time</li>
          </ul>
          <Link href="/start" className="al-pill al-pill-lg">Start your assessment <Arrow /></Link>
        </div>
        <figure className="al-bio" aria-label="How a marker shows in your portal">
          <div className="al-bio-top"><span className="al-k">Your panel · Hormones, energy, heart, metabolic</span><span className="al-k">Sample layout</span></div>
          <p className="al-bio-big">23+<span>markers</span></p>
          <div className="al-bio-bar" aria-hidden="true"><i /><i /><i /></div>
          <div className="al-bio-scale al-k" aria-hidden="true"><span>Low</span><span>In range</span><span>High</span></div>
          <figcaption>Each result sits against your lab’s reference range. Your doctor reads it with you.</figcaption>
          <div className="al-bio-chips"><span>Hormones</span><span>Metabolic</span></div>
        </figure>
      </div>
    </section>
  )
}

/** 12. How it works, on black. The copy is the old three steps, split into four. */
const STEPS = [
  { k: 'Check', t: 'Take the 45-second check', b: 'A few questions. We show you what your panel looks at before you create an account.', icon: 'M4 6h12M4 10h8M4 14h5' },
  { k: 'Bloods', t: 'Bloods near you', b: 'Referral sent electronically. Most results back in about 48 hours.', icon: 'M10 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z' },
  { k: 'Consult', t: 'Your doctor, results open', b: 'Phone or video with an AHPRA-registered doctor, Monday to Saturday.', icon: 'M4 5h12v8H8l-4 3V5Z' },
  { k: 'Plan', t: 'Your plan, delivered', b: 'If treatment is suitable, it arrives discreetly. Reviewed about every three months.', icon: 'M3 7l7-4 7 4v6l-7 4-7-4V7Zm0 0 7 4 7-4M10 11v6' },
]
export function HowItWorks() {
  return (
    <section className="al-sec al-how" aria-labelledby="how-title">
      <div className="container-x">
        <Head id="how-title" title="How it works." cap={['Four steps', 'That is the whole thing', 'No GP referral']} dark />
        <p className="al-k al-how-row">Blood testing and care</p>
        <ol className="al-how-grid" role="list">
          {STEPS.map((s, i) => (
            <li key={s.k}>
              <span className="al-how-k">{String(i + 1).padStart(2, '0')} / {s.k}</span>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
              <svg viewBox="0 0 20 20" width="22" height="22" fill="none" aria-hidden="true"><path d={s.icon} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" /></svg>
            </li>
          ))}
        </ol>
        <Link href="/start" className="al-pill al-pill-lg al-pill-light">Start the 45-second check <Arrow /></Link>
      </div>
    </section>
  )
}

/** 15. You ask, we answer: left block, numbered accordion right. */
export function HomeFAQ() {
  const all = [...FAQS.map(f => ({ q: f.q, a: <>{f.a}</> })), ...OBJECTIONS]
  return (
    <section className="al-sec al-faq" id="faq" aria-labelledby="faq-title">
      <div className="container-x al-faq-in">
        <div className="al-faq-side">
          <p className="al-k">→ Straight answers</p>
          <h2 id="faq-title" className="al-h2">You ask,<br />we answer.</h2>
          <p className="al-lead">For Australian adults 18 to 80. The straight answers on bloods, doctors, fees and cancelling.</p>
          <Link href="/faqs" className="al-pill">All questions <Arrow /></Link>
        </div>
        <div className="al-faq-list">
          {all.map((f, i) => (
            <details key={f.q} className="al-faq-item" open={i === 0}>
              <summary>
                <span className="al-k">{String(i + 1).padStart(2, '0')}</span>
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

/** 16. Closing band: one line, one action, the phone. */
export function CloseBand() {
  return (
    <section className="al-close" id="cta" aria-labelledby="close-title">
      <div className="container-x">
        <p className="al-k">→ Measure first</p>
        <h2 id="close-title" className="al-h2">Stop guessing. Start measuring.</h2>
        <p className="al-lead">Two minutes to start. Bloods near you, then a doctor with your results open. No GP referral.</p>
        <div className="al-close-row">
          <Link href="/start" className="al-pill al-pill-lg al-pill-light">Start your assessment <Arrow /></Link>
          <a href={`tel:${CLINIC_PHONE_E164}`} className="al-pill al-pill-lg al-pill-ghost">Call {CLINIC_PHONE_DISPLAY}</a>
        </div>
        <p className="al-k al-close-meta">Doctors Monday to Saturday · <Link href="/discovery-call">Prefer to talk first? Book a free call</Link></p>
      </div>
    </section>
  )
}

/** Phones: one slim bar from the first screen, the CTA and the phone number. */
