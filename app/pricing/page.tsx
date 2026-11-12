import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import TrustChips from '@/components/TrustChips'
import CoreHealthPanels from '@/components/CoreHealthPanels'
import { OBJECTIONS } from '@/components/Objections'
import { PORTAL_MEMBERSHIP, START_HREF } from '@/lib/portal'
import { InnerHero, Head, FaqSection, CtaBand, InnerFoot, Arrow, SHOTS, type Faq } from '@/components/inner/InnerSections'
import Link from 'next/link'

/**
 * /pricing in the AlgoRx lab-packages structure (12 Nov 2026), Apex's numbers.
 * Hero (headline, sub, chips only: no price on the first screen) -> the dark
 * Core Health Panels cards -> the three paths added up as white bordered cards
 * with mono line items and one big total -> every fee side by side -> "Before
 * you start" as the numbered FAQ accordion -> photo CTA band.
 *
 * Every figure is the live pricing data (Noah, 11 Nov 2026): bloods $280 /
 * $199 member, follow-ups $180 / $139, hormone consult $275 / $199, general
 * consult $199 / $125 (Noah, 13 Nov 2026), escript fee $155, AHI fee from $50 averaging $350 to
 * $650 per partner-pharmacy order, membership $99 a month. The consult the
 * portal calls "Peptide / General Consult" is shown as "Program consult" (Noah, 12 Nov 2026: rename)
 * here: no medicine classes on the site (brand platform, open item).
 * Medication is never included in a total: it depends on what, if anything,
 * a doctor prescribes. Private clinic, no Medicare rebate.
 */

type Line = { k: string; v: string }
type Path = { id: string; tag?: string; name: string; who: string; lines: Line[]; total: { k: string; v: string }; then: string; cta: { label: string; href: string }; featured?: boolean }

const PATHS: Path[] = [
  {
    id: 'single', name: 'Script only', who: 'You want a doctor’s script and will fill it at any pharmacy.',
    lines: [
      { k: 'Blood panel', v: '$280' },
      { k: 'Program consult', v: '$199' },
      { k: 'Escript fee', v: '$155' },
    ],
    total: { k: 'First 3 months, before medication', v: '$634' },
    then: 'With the hormone consult ($275) instead: $710. Plus the medication itself at your pharmacy’s price. Most pharmacies add their own mark-up.',
    cta: { label: 'Create your free account', href: START_HREF },
  },
  {
    id: 'partner', name: 'Partner pharmacy', who: 'You want medication with no mark-up and to pay per order.',
    lines: [
      { k: 'Blood panel', v: '$280' },
      { k: 'Program consult', v: '$199' },
      { k: 'Each order: AHI fee, on average', v: '$350 to $650' },
      { k: 'Each order: escript fee', v: '$155' },
    ],
    total: { k: 'First 3 months, one order', v: '$984 to $1,284' },
    then: 'Plus the medication at the pharmacy’s cost, with no mark-up. The AHI fee (admin, handling and infrastructure) starts from $50. Each further order adds the AHI fee and the escript fee again.',
    cta: { label: 'Create your free account', href: START_HREF },
  },
  {
    id: 'member', tag: 'Most included', name: 'Apex member', who: 'You want ongoing care with the fees included. Pause or cancel from your account.', featured: true,
    lines: [
      { k: 'Blood panel, member rate', v: '$199' },
      { k: 'Program consult, members', v: '$125' },
      { k: 'Membership, 3 x $99', v: '$297' },
      { k: 'AHI fee and escript fee', v: 'Included' },
    ],
    total: { k: 'First 3 months', v: '$621' },
    then: 'Assumes you join before your first panel: member rates apply from the day you join. Plus the medication at cost price. Follow-up panels are $139 for members.',
    cta: { label: 'Join as a member', href: PORTAL_MEMBERSHIP },
  },
]

// Every fee, side by side (the live comparison table, same numbers).
const FEES: { label: string; single: string; partner: string; member: string }[] = [
  { label: 'Initial blood referral', single: '$280', partner: '$280', member: '$199' },
  { label: 'Follow-up blood referral', single: '$180', partner: '$180', member: '$139' },
  { label: 'Hormone consultation', single: '$275', partner: '$275', member: '$199' },
  { label: 'Program consult', single: '$199', partner: '$199', member: '$125' },
  { label: 'Monthly membership', single: 'None', partner: 'None', member: '$99 a month' },
  { label: 'Medication', single: 'Pharmacy price', partner: 'No mark-up', member: 'Cost price' },
  { label: 'AHI fee per order', single: 'None', partner: 'From $50, avg $350 to $650', member: 'Included' },
  { label: 'Escript release fee', single: '$155', partner: '$155', member: 'Free' },
  { label: 'Referrals and certificates', single: '$25 each', partner: '$25 each', member: 'Free' },
  { label: 'Health-system score history', single: 'Latest two', partner: 'Latest two', member: 'Every panel' },
  { label: 'Ask about your results', single: '5 a month', partner: '5 a month', member: 'Unlimited' },
  { label: 'Your plan and GP summary', single: 'Included', partner: 'Included', member: 'Included' },
]
const COLS = [
  { id: 'single', name: 'Script only' },
  { id: 'partner', name: 'Partner pharmacy' },
  { id: 'member', name: 'Apex member' },
] as const

const PRICING_FAQS: Faq[] = [
  { q: 'Is there a lock-in contract?', a: 'No. Pause or cancel your membership from your account. Clinical reviews happen about every 3 months. That is a clinical schedule, not a commercial one.' },
  { q: 'What does the membership fee cover?', a: 'The $99 a month membership covers: medication at cost price, no AHI fee and no escript fee on partner-pharmacy orders, member rates on every blood panel and consult, nursing check-ins, and priority clinical support between reviews.' },
  { q: 'When does membership activate?', a: 'The day you join, from your account. You can join before your first blood panel and consult, and member rates apply to anything you book after joining.' },
  { q: 'Are there any hidden fees?', a: 'No. Every fee is on this page before you start, including the AHI fee on partner-pharmacy orders. No discovery call fees and no bundled packages.' },
  { q: 'What is your refund policy?', a: <>Not happy after your consult? Contact us and we refund the consult fee, less a $50 admin fee. Cancel at least 4 hours before your appointment for a full refund. Blood panel referrals are not refundable once issued, and medication invoices once dispensed. None of this limits your rights under the Australian Consumer Law. Full details are in our <Link href="/terms">terms</Link>.</> },
  { q: 'What else should I know before I pay?', a: 'Prices may change over time. Every medication invoice includes the AHI fee (for members it is covered by the membership). Prescription fees are paid before your script is issued. A consult does not guarantee a prescription: your doctor only prescribes where it is clinically appropriate.' },
]

export default function PricingPage() {
  const faqs: Faq[] = [...OBJECTIONS, ...PRICING_FAQS.filter(f => !OBJECTIONS.some(o => o.q === f.q))]
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Pricing"
          title="What it costs, added up."
          lead="Every fee is on this page before you start. One blood panel, a doctor who reads it with you, and three ways to be treated. Private clinic, no Medicare rebate."
          cap={['No hidden fees', 'No lock-in', 'Member rates from day one']}
          sidePhoto={SHOTS.kitchenMan}
        />
        <TrustChips />

        <CoreHealthPanels />

        <section className="al-sec" aria-labelledby="pr-paths">
          <div className="container-x">
            <Head id="pr-paths" kicker="Three ways to be treated" title="Your first 3 months, added up." cap={['Bloods first', 'Then a doctor', 'Medication is extra on every path']} />
            <ul className="ip-cards" role="list">
              {PATHS.map(p => (
                <li key={p.id} className="al-card ip-path" data-featured={p.featured || undefined}>
                  {p.tag && <span className="ip-path-tag">{p.tag}</span>}
                  <h3>{p.name}</h3>
                  <p className="ip-path-who">{p.who}</p>
                  <ul className="ip-lines" role="list">
                    {p.lines.map(l => <li key={l.k}><span>{l.k}</span><b>{l.v}</b></li>)}
                  </ul>
                  <div className="ip-total">
                    <p className="ip-total-k">{p.total.k}</p>
                    <p className="ip-total-v">{p.total.v}</p>
                    <p className="ip-total-then">{p.then}</p>
                  </div>
                  <Link href={p.cta.href} className={p.featured ? 'al-pill' : 'ip-path-line'}>{p.cta.label} {p.featured && <Arrow />}</Link>
                </li>
              ))}
            </ul>
            <p className="al-k" style={{ marginTop: 20 }}>Totals use the general consult. Every path starts with one panel and one doctor read. Apex is a private clinic: no Medicare rebate.</p>
          </div>
        </section>

        <section className="al-sec" aria-labelledby="pr-fees">
          <div className="container-x">
            <Head id="pr-fees" kicker="Every fee" title="Side by side." cap={['Script only', 'Partner pharmacy', 'Apex member']} />
            <div className="al-card ip-fees">
              <table className="ip-table">
                <thead>
                  <tr>
                    <th scope="col"><span className="al-k">Fee</span></th>
                    {COLS.map(c => <th key={c.id} scope="col"><span className="al-k">{c.name}</span></th>)}
                  </tr>
                </thead>
                <tbody>
                  {FEES.map(f => (
                    <tr key={f.label}>
                      <th scope="row">{f.label}</th>
                      {COLS.map(c => <td key={c.id} data-col={c.name}>{f[c.id]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="al-k" style={{ marginTop: 20 }}>Join from your account at any time, including before your first consult. Member rates apply to anything you book after you join.</p>
          </div>
        </section>

        <FaqSection faqs={faqs} kicker="Before you start" title={<>Before you start.<br />The straight answers.</>} lead="Fees, refunds, cancelling and what a consult does and does not guarantee." id="pr-faq" />

        <CtaBand shot={SHOTS.trailRun} lead="Create your free account and order your panel at the standard or member rate. A doctor reads every result with you. No GP referral." />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
