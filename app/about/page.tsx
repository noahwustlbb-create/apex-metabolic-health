import Nav from '@/components/Nav'
import TrustChips from '@/components/TrustChips'
import { InnerHero, Photo, WhyApex, CtaBand, InnerFoot, SHOTS, n2, type Shot } from '@/components/inner/InnerSections'

/**
 * /about in the AlgoRx about-us structure (12 Nov 2026): dark photo hero with
 * a big headline and a mono trust line, alternating photo + story blocks,
 * "Why Apex?" principles, trust chips, photo CTA band. Apex's real story only:
 * a doctor-led Australian telehealth clinic, Imperial Equity Investments Pty
 * Ltd, Gold Coast. No invented founder story, no doctor named or pictured
 * until Noah says yes (brand platform, decision 3). Photos are the repo's own.
 */

const STORY: { k: string; t: string; ps: string[]; chips?: string[]; shot: Shot }[] = [
  {
    k: 'What Apex is',
    t: 'A doctor-led clinic, built on blood work.',
    ps: [
      'Apex Metabolic Health is an Australian telehealth clinic for hormone and metabolic health. Men and women, 18 to 80, anywhere in Australia, no GP referral.',
      'Every plan starts the same way: one blood panel, 23+ markers from one morning draw at an accredited collection centre near you, read by an AHPRA-registered doctor with you.',
    ],
    chips: ['Men and women', '18 to 80', 'Australia-wide'],
    shot: SHOTS.couple,
  },
  {
    k: 'How we think',
    t: 'Normal isn’t optimal.',
    ps: [
      'A result inside the reference range is not always where you feel your best. Our doctors read your markers for how you actually function, and set a plan aimed at where you work best, not just inside the range.',
      'Then we measure again. Follow-up bloods and a review about every 3 months, so the plan follows your numbers, and your trend lives in your portal.',
    ],
    chips: ['Measure first. Then treat.', 'Review every 3 months'],
    shot: SHOTS.kitchenMan,
  },
  {
    k: 'Who we are',
    t: 'Doctors, labs and pharmacies you can check.',
    ps: [
      'Every consultation is with an AHPRA-registered doctor who works in hormone and metabolic health. Bloods run through NATA-accredited pathology. If treatment is suitable, it is dispensed by Australian cGMP partner pharmacies and delivered discreetly.',
      'Apex Metabolic Health is operated by Imperial Equity Investments Pty Ltd, a registered Australian company based on the Gold Coast, Queensland. Every claim on this page links to the body that regulates it.',
    ],
    chips: ['AHPRA', 'NATA', 'cGMP partner pharmacies', 'LegitScript'],
    shot: SHOTS.womanCall,
  },
]

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="About Apex"
          title="Doctor-led. Built on blood work."
          lead="An Australian telehealth clinic for hormone and metabolic health. Your markers measured, read by an AHPRA-registered doctor, and a plan you understand."
          cap={['AHPRA-registered doctors', 'Imperial Equity Investments Pty Ltd', 'Gold Coast, Australia-wide']}
          photo={SHOTS.oceanWindow}
        />
        <TrustChips />

        <section className="al-sec" aria-label="Our story">
          <div className="container-x">
            {STORY.map((s, i) => (
              <article key={s.k} className="ip-story" data-flip={i % 2 === 1 || undefined}>
                <Photo shot={s.shot} className="ip-story-photo" />
                <div className="ip-story-copy">
                  <p className="ip-story-n" aria-hidden="true">{n2(i)}</p>
                  <p className="al-k">{'// '}{s.k}</p>
                  <h2 className="al-h2">{s.t}</h2>
                  {s.ps.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
                  {s.chips && <div className="ip-chips" aria-label="In short">{s.chips.map(c => <span key={c}>{c}</span>)}</div>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <WhyApex id="ab-why" />

        <div style={{ marginTop: 'clamp(64px, 7vw, 110px)' }}><TrustChips /></div>

        <CtaBand shot={SHOTS.parkBench} />
      </main>
      <InnerFoot />
    </>
  )
}
