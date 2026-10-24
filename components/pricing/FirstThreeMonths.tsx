import Link from 'next/link'

/**
 * Your first 3 months, per path, in plain English (fundamentals plan, 24 Oct 2026).
 * Every figure is a sum of prices already in COMPARISON_ROWS on /pricing:
 * bloods $280 / $199 member, Peptide / General Consult $199 / $99 member,
 * escript fee $125, AHI fee $350-$650 per partner-pharmacy order, membership $99/mo.
 * The $125 here is the escript fee, not a consult. Totals use the $199 consult
 * (Noah, 24 Oct 2026); the hormone consult ($275 / $199 member) is the note below.
 * Medication is never included: it depends on what (if anything) a doctor prescribes.
 * Change the table and these together.
 */
type Line = { k: string; v: string }
type Path = { id: string; name: string; who: string; lines: Line[]; total: { k: string; v: string }; then: string; featured?: boolean }

const PATHS: Path[] = [
  {
    id: 'single', name: 'Script only', who: 'You want a doctor’s script and will fill it at any pharmacy.',
    lines: [
      { k: 'Blood panel', v: '$280' },
      { k: 'Peptide / General Consult', v: '$199' },
      { k: 'Escript fee', v: '$125' },
    ],
    total: { k: 'First 3 months', v: '$604' },
    then: 'Plus the medication itself, at your pharmacy’s price. Most pharmacies add their own mark-up.',
  },
  {
    id: 'partner', name: 'Partner pharmacy', who: 'You want medication with no mark-up and to pay per order.',
    lines: [
      { k: 'Blood panel', v: '$280' },
      { k: 'Peptide / General Consult', v: '$199' },
      { k: 'Each order: AHI fee', v: '$350 – $650' },
      { k: 'Each order: escript fee', v: '$125' },
    ],
    total: { k: 'First 3 months, one order', v: '$954 – $1,254' },
    then: 'Plus the medication at the pharmacy’s cost, with no mark-up. Each further order adds the AHI fee and the escript fee again.',
  },
  {
    id: 'member', name: 'Apex member', who: 'You want ongoing care with fees included. Pause or cancel your membership from your account.', featured: true,
    lines: [
      { k: 'Blood panel (member rate)', v: '$199' },
      { k: 'Peptide / General Consult (members)', v: '$99' },
      { k: 'Membership, 3 × $99', v: '$297' },
      { k: 'AHI fee and escript fee', v: 'Included' },
    ],
    total: { k: 'First 3 months', v: '$595' },
    then: 'Plus the medication at cost price. Follow-up panels are $139 for members.',
  },
]

export default function FirstThreeMonths() {
  return (
    <section id="first-3-months" className="ftm container-x" aria-labelledby="ftm-title">
      <h2 id="ftm-title" className="stage-h2">Your first 3 months.<br /><span className="stage-muted">Added up, per path.</span></h2>
      <p className="ftm-lead">Every path starts the same way: one blood panel, then a doctor reads it with you. What changes is how you get your medication, if your doctor finds it suitable. Totals use the Peptide / General Consult ($199, or $99 for members); medication is extra on every path because it depends on what is prescribed. Apex is a private clinic, so there is no Medicare rebate.</p>
      <div className="ftm-grid">
        {PATHS.map(p => (
          <article key={p.id} className="ftm-card" data-featured={p.featured || undefined}>
            <h3>{p.name}</h3>
            <p className="ftm-who">{p.who}</p>
            <dl>
              {p.lines.map(l => (<div key={l.k}><dt>{l.k}</dt><dd>{l.v}</dd></div>))}
              <div className="ftm-total"><dt>{p.total.k}</dt><dd>{p.total.v}</dd></div>
            </dl>
            <p className="ftm-then">{p.then}</p>
          </article>
        ))}
      </div>
      <div className="ftm-terms">
        <p><strong>Escript fee ($125).</strong> The fee for your doctor to write and send an electronic prescription. Members do not pay it.</p>
        <p><strong>AHI fee ($350 – $650 per order, on average).</strong> Admin, handling and infrastructure on each partner-pharmacy order. The medication itself is not marked up. Members do not pay it.</p>
        <p><strong>Hormone consult instead?</strong> It is $275, or $199 for members. Add $76 to the first two totals, or $100 to the member total.</p>
      </div>
      <p className="ftm-cta"><Link href="/start" className="stage-link">Start your assessment</Link> <span>Creating an account is free.</span></p>
    </section>
  )
}
