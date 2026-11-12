import Link from 'next/link'
import { HowBand, BLOOD_STEPS, PROGRAM_STEPS } from '@/components/inner/InnerSections'
import { START_HREF } from '@/lib/portal'
import { FAQS } from '@/lib/faqs'
import { OBJECTIONS } from '@/components/Objections'
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164 } from '@/lib/contact'

/**
 * Home sections in the AlgoRx system, to Noah's structure (12 Nov 2026):
 * 01 hero, 02 about you, 03 protocols, 04 approach, 05 why Apex, FAQ,
 * 06 ready to start. 02 is about the person, 03 is the programs, so neither
 * repeats the other. Facts come from the brand platform
 * (~/Clients/Apex/brand/BRAND-PLATFORM-2026-11-12.md), lib/faqs.ts and
 * components/Objections.tsx. No medicine names, no outcomes, no invented
 * numbers, no prices above the fold.
 */

/** The 45-second health quiz (app/start/quiz, lib/startFunnel.ts). Secondary only: no primary CTA points here. */
export const QUIZ_HREF = '/start/quiz'

const Arrow = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Head({ id, n, k, title, cap, dark }: { id: string; n: string; k: string; title: string; cap?: string[]; dark?: boolean }) {
  return (
    <div className="al-head" data-dark={dark || undefined}>
      <div>
        <p className="al-k al-num">// {n} {k}</p>
        <h2 id={id} className="al-h2">{title}</h2>
      </div>
      {cap && <p className="al-cap">{cap.map((c, i) => <span key={c}>{c}{i < cap.length - 1 && <br />}</span>)}</p>}
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
function Photo({ src, alt, className, sizes = '(min-width: 900px) 50vw, 100vw' }: { src: string; alt: string; className?: string; sizes?: string }) {
  return (
    <figure className={`al-photo ${className ?? ''}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" sizes={sizes} />
    </figure>
  )
}

/** 02 About you: who it is for, how they feel, what they want to know. */
const QUESTIONS = [
  { t: 'Why do I feel flat?', b: 'Tired by mid-afternoon, slower to recover, not as sharp as you were. You want a reason, not a shrug.' },
  { t: 'What do my numbers say?', b: 'Your hormone markers, thyroid, iron, heart and metabolic health, measured in one blood panel.' },
  { t: 'What do I do about it?', b: 'A doctor who reads every result with you, and a plan you understand.' },
]
export function AboutYou() {
  return (
    <section className="al-sec al-about" aria-labelledby="about-title">
      <div className="container-x">
        <Head id="about-title" n="02" k="About you" title="Told you're fine. Still don't feel it." cap={['Men and women', 'Australians 18 to 80', 'No GP referral']} />
        <div className="al-about-grid">
          <Photo className="al-about-main" src="/photos/couple-walk.webp" alt="A man and a woman in their forties walking side by side on a tree-lined street in the morning" />
          <div className="al-about-side">
            <div className="al-card al-about-card">
              <p className="al-lead al-about-lead">
                Apex is for adults who want to understand their health properly. Your bloods came back &ldquo;normal&rdquo; but something is off, or you simply want to know where you stand before it becomes a problem.
              </p>
              <ol className="al-qs" role="list">
                {QUESTIONS.map((q, i) => (
                  <li key={q.t}>
                    <span className="al-k">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{q.t}</h3>
                      <p>{q.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="al-about-pair">
              <Photo src="/photos/woman-kitchen.webp" alt="A woman standing at her kitchen bench with a glass of water, looking out the window" sizes="(min-width: 900px) 22vw, 50vw" />
              <Photo src="/photos/man-park-bench.webp" alt="A man in a grey hoodie resting on a park bench after a walk" sizes="(min-width: 900px) 22vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** 04 Approach: Test, Assess, Optimise, Review, on black. */
const STEPS = [
  { k: 'Test', t: 'Bloods near you.', b: '23+ markers from one draw at a collection centre near you. Most results are back in about 48 hours.' },
  { k: 'Assess', t: 'A doctor reads every result.', b: 'Results come into your portal automatically and a doctor reviews them before you see them. Then you talk it through, results open.' },
  { k: 'Optimise', t: 'Normal isn’t optimal.', b: 'Your doctor sets a plan aimed at where you work best, not just inside the reference range. If treatment is suitable, it is dispensed discreetly.' },
  { k: 'Review', t: 'Measure again.', b: 'Follow-up bloods and a review about every 3 months, so the plan follows your numbers. Your trend lives in your portal.' },
]
export function Approach() {
  return (
    <section className="al-sec al-how" id="approach" aria-labelledby="how-title">
      <div className="container-x">
        <div className="al-how-top">
          <Head id="how-title" n="04" k="Approach" title="Test. Assess. Optimise. Review." dark />
          <Photo className="al-how-photo" src="/photos/man-kitchen-dawn.webp" alt="A man leaning on his kitchen bench at dawn, a glass of water beside him" sizes="(min-width: 900px) 34vw, 100vw" />
        </div>
        <ol className="al-how-grid" role="list">
          {STEPS.map((s, i) => (
            <li key={s.k}>
              <span className="al-how-k">{String(i + 1).padStart(2, '0')} / {s.k}</span>
              <h3>{s.t}</h3>
              <p>{s.b}</p>
              {/* Phones only: a photo between 02 and 03, so no screen is text alone. */}
              {i === 1 && <Photo className="al-how-photo-sm" src="/photos/man-balcony-call.webp" alt="A man on a phone call on his balcony above the ocean" sizes="100vw" />}
            </li>
          ))}
        </ol>
        <Link href={START_HREF} className="al-pill al-pill-lg al-pill-light">Create your free account <Arrow /></Link>
      </div>
    </section>
  )
}

/** 04 Approach, AlgoRx "How It Works." treatment (Noah, 12 Nov 2026: "yes" to the
 * two-row dark band on home): BLOODS and PROGRAMS rows, mono step labels, outline
 * icons. Same component as /how-it-works and /treatments, so one source of truth. */
export function HomeHow() {
  return (
    <div id="approach">
      <HowBand
        id="how-title"
        kicker="04 Approach"
        title="Test. Assess. Optimise. Review."
        cap={['Bloods: four steps', 'Programs: four steps', 'Doctor-led, start to finish']}
        rows={[{ label: 'Bloods', steps: BLOOD_STEPS }, { label: 'Programs', steps: PROGRAM_STEPS }]}
      />
    </div>
  )
}

/** 05 Why Apex: three reasons beside a patient-side photo (principles live in Approach). */
const REASONS = [
  { k: 'Doctors', t: 'Australian-registered doctors.', b: 'Every plan is set by an AHPRA-registered doctor who works in hormone and metabolic health. NATA-accredited pathology, cGMP partner pharmacies.' },
  { k: 'Pricing', t: 'Transparent pricing.', b: 'Every fee is on the pricing page before you start. No lock-in, no surprise invoices.', link: { href: '/pricing', label: 'See pricing' } },
  { k: 'Care', t: 'Personalised care.', b: 'Your plan starts from your own numbers and changes when they do. You can ask about your results any time in your portal.' },
]
export function WhyApex() {
  return (
    <section className="al-sec al-why" aria-labelledby="why-title">
      <div className="container-x">
        <Head id="why-title" n="05" k="Why Apex" title="Doctor-led. No fluff." cap={['LegitScript certified', 'No GP referral', 'Australia-wide']} />
        <div className="al-why-in">
          <ol className="al-why-cards" role="list">
            {REASONS.map((r, i) => (
              <li key={r.k} className="al-card">
                <span className="al-k">{String(i + 1).padStart(2, '0')} · {r.k}</span>
                <h3>{r.t}</h3>
                <p>{r.b}</p>
                {r.link && <Link href={r.link.href} className="al-why-link">{r.link.label} <Arrow /></Link>}
              </li>
            ))}
          </ol>
          <Photo className="al-why-photo" src="/photos/man-kettlebell.webp" alt="A man with a towel over his shoulder after a session in his home gym" sizes="(min-width: 900px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  )
}

/** Full-bleed photo break between Why Apex and the FAQ. */
export function PhotoBreak() {
  return (
    <figure className="al-break">
      <img src="/photos/hero-window-wide.webp" alt="A man at a window looking out over the coast at dusk" loading="lazy" decoding="async" sizes="100vw" />
    </figure>
  )
}

/** You ask, we answer: left block, numbered accordion right. */
export function HomeFAQ() {
  // Five on the home page; the rest live on /faqs.
  const all = [...FAQS.map(f => ({ q: f.q, a: <>{f.a}</> })), ...OBJECTIONS].slice(0, 5)
  return (
    <section className="al-sec al-faq" id="faq" aria-labelledby="faq-title">
      <div className="container-x al-faq-in">
        <div className="al-faq-side">
          <p className="al-k">// Straight answers</p>
          <h2 id="faq-title" className="al-h2">You ask,<br />we answer.</h2>
          <p className="al-lead">The straight answers on bloods, doctors, fees and cancelling.</p>
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
          <Link href="/faqs" className="al-faq-more">All questions <Arrow /></Link>
        </div>
      </div>
    </section>
  )
}

/** 06 Ready to start: one primary action, the quiz as a quiet text link. */
export function ReadyToStart() {
  return (
    <section className="al-close" id="cta" aria-labelledby="close-title">
      <img className="al-close-bg" src="/photos/woman-stairs.webp" alt="" loading="lazy" decoding="async" aria-hidden="true" />
      <div className="container-x al-close-in">
        <p className="al-k">// 06 Ready to start</p>
        <h2 id="close-title" className="al-h2">Ready to start.</h2>
        <p className="al-lead">Create your free account, order your bloods, and a doctor reads every result with you. No GP referral.</p>
        <div className="al-close-row">
          <Link href={START_HREF} className="al-pill al-pill-lg al-pill-light">Create your free account <Arrow /></Link>
        </div>
        <p className="al-close-quiz">
          Not sure where to start? <Link href={QUIZ_HREF}>Take the 45-second health quiz</Link>
        </p>
        <p className="al-k al-close-meta">Doctors Monday to Saturday · <a href={`tel:${CLINIC_PHONE_E164}`}>Call {CLINIC_PHONE_DISPLAY}</a></p>
      </div>
    </section>
  )
}
