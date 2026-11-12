import Link from 'next/link'
import Nav from '@/components/Nav'
import TrustChips from '@/components/TrustChips'
import { PORTAL_MEMBERSHIP } from '@/lib/portal'
import { InnerHero, Head, FaqSection, CtaBand, InnerFoot, Arrow, SHOTS, type Faq } from '@/components/inner/InnerSections'
import ImageryNote from '@/components/ImageryNote'

/**
 * /membership in the AlgoRx "Performance Club" treatment (12 Nov 2026), Apex's
 * own model: no points, no tiers. Dark photo hero (no price on the first
 * screen) -> three bordered dark cards (member pricing, free escripts, reviews
 * about every 3 months) -> the one tier card, Apex Member $99 a month, on a
 * texture, with what's included as ticks -> FAQ accordion -> CTA to the portal
 * membership page (lib/portal.ts). Facts from the live pricing data; no
 * medicine names, no outcomes.
 */

const Ic = {
  tag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l9-9h9v9l-9 9-9-9z" /><circle cx="16" cy="8" r="1.5" /></svg>,
  script: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h6M8 16h4" /></svg>,
  review: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v5h-5" /></svg>,
}

const CARDS = [
  { k: 'Member pricing', t: 'Member rates on everything.', b: 'Your first panel at $199 instead of $280, follow-ups at $139, consults at the member rate, and medication at cost price with no AHI fee.', ic: Ic.tag },
  { k: 'Free escripts', t: 'No escript fee.', b: 'The $155 escript release fee is included. Scripts go to our partner pharmacies or to your own pharmacy (not NSW).', ic: Ic.script },
  { k: 'Reviews', t: 'A review about every 3 months.', b: 'Follow-up bloods and a doctor review built into your plan, with nursing check-ins every 6 to 8 weeks in between.', ic: Ic.review },
]

const TICKS = [
  'First blood panel $199, follow-ups $139',
  'General consult $99, hormone consult $199',
  'Medication at cost price, no AHI fee per order',
  'Escript fee included',
  'Referrals, medical certificates, health summaries and travel letters included',
  'Pause or cancel from your account, no lock-in',
]

const INCLUDED = [
  { t: 'Doctor-led plan management', b: 'Your plan is not a static script. It changes with your bloods, your feedback and your response, adjusted by a doctor every cycle.' },
  { t: 'Eight health-system scores, trended', b: 'Hormones, metabolic, heart, thyroid, nutrients, liver, kidney and blood, each scored from your own markers across every panel you have done.' },
  { t: 'Ask about your results, any time', b: 'Plain-English answers grounded in your own markers and your doctor’s written assessment. Members ask without limit.' },
  { t: 'Your plan, after every panel', b: 'One page: your scores, the markers your doctor is watching, the written assessment and the next review date. Hand it to your GP.' },
  { t: 'Priority clinical support', b: 'Your care team between consultations, not just at them. Questions answered, concerns escalated.' },
  { t: 'Full patient portal access', b: 'Results, trends, bookings, documents and messages to your care team, in one place.' },
]

const FAQS: Faq[] = [
  { q: 'Can I cancel the membership?', a: 'Yes. Membership is month to month with no lock-in contract. Pause or cancel from your account.' },
  { q: 'When does membership activate?', a: 'The day you join, from your account. You can join before your first blood panel and consult, and member rates apply to anything you book after joining.' },
  { q: 'What does the fee cover?', a: 'Medication at cost price with no AHI fee and no escript fee on partner-pharmacy orders, member rates on every panel and consult, nursing check-ins, referrals and certificates, and priority support between reviews.' },
  { q: 'Do I have to be a member to be treated?', a: <>No. You can pay per consult and fill scripts at any pharmacy, or use our partner pharmacy and pay per order. Membership is the path with the fees included. The three paths are added up on the <Link href="/pricing">pricing page</Link>.</> },
  { q: 'Does membership guarantee a prescription?', a: 'No. A doctor only prescribes where it is clinically appropriate, member or not. Membership changes what you pay, never what a doctor decides.' },
  { q: 'Can I claim it on Medicare?', a: 'No. Apex is a fully private clinic, so there is no Medicare rebate on membership, consults or bloods.' },
]

export default function MembershipPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Membership"
          title="Ongoing care, one monthly fee."
          lead="Apex Member: member rates on every panel and consult, medication at cost, free escripts, and a doctor review about every 3 months. Pause or cancel from your account."
          cap={['No lock-in', 'Member rates from day one', 'Cancel from your account']}
          photo={SHOTS.balance}
          ctaLabel="Join as a member"
          ctaHref={PORTAL_MEMBERSHIP}
        />
        <TrustChips />

        <section className="al-sec" aria-labelledby="mb-cards">
          <div className="container-x">
            <Head id="mb-cards" kicker="What members get" title="Three things change." cap={['Member pricing', 'Free escripts', 'Reviews every 3 months']} />
            <ul className="ip-cards" role="list">
              {CARDS.map((c, i) => (
                <li key={c.k} className="al-card ip-card" data-dark>
                  <span className="ip-card-ic" aria-hidden="true">{c.ic}</span>
                  <span className="al-k">{String(i + 1).padStart(2, '0')} · {c.k}</span>
                  <h3>{c.t}</h3>
                  <p>{c.b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ip-tier-band" aria-labelledby="mb-tier">
          <div className="ip-bg"><img src={SHOTS.textureLongevity.src} alt="" loading="lazy" decoding="async" sizes="100vw" /></div>
          <div className="ip-grade" aria-hidden="true" />
          <div className="container-x">
            <Head id="mb-tier" kicker="The membership" title="Apex Member." cap={['One tier', 'One monthly fee', 'Textures: AI-generated, illustrative']} dark />
            <div className="ip-tier-grid">
              <div className="ip-tier">
                <span className="al-k">Membership</span>
                <h3>Apex Member</h3>
                <div className="ip-tier-price"><b>$99</b><span>a month</span></div>
                <hr />
                <p className="ip-tier-req">To join</p>
                <p>Create your free account, then join from your account.</p>
                <ul className="ip-ticks" role="list">
                  {TICKS.map(t => <li key={t}>{t}</li>)}
                </ul>
                <Link href={PORTAL_MEMBERSHIP} className="al-pill al-pill-lg al-pill-light">Join as a member <Arrow /></Link>
                <p className="ip-tier-note">Medication is extra on every path and depends on what, if anything, your doctor prescribes. Private clinic, no Medicare rebate.</p>
              </div>
              <ul className="ip-inc" role="list">
                {INCLUDED.map(x => (
                  <li key={x.t}>
                    <h3>{x.t}</h3>
                    <p>{x.b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FaqSection faqs={FAQS} kicker="Membership" title={<>Before you join.<br />The straight answers.</>} lead="Cancelling, when it starts, what it covers, and what it never changes." id="mb-faq" />

        <CtaBand shot={SHOTS.womanKitchen} kicker="Join" title="Ready to join." lead="Create your free account, then join from your account. Member rates apply from that day, including your first panel and consult." label="Join as a member" href={PORTAL_MEMBERSHIP} />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
