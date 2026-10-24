import Link from 'next/link'

/**
 * The five questions people ask before they pay (behaviour audit, 24 Oct 2026).
 * Every answer restates something already in /terms or on /pricing. Do not add
 * outcomes, medicines or prices that are not in those two places.
 */
const ITEMS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'Can I claim it on Medicare?',
    a: <>No. Apex is a fully private clinic, so there is no Medicare rebate on consults, bloods or anything else. Every fee is on the <Link href="/pricing">pricing page</Link> before you start.</>,
  },
  {
    q: 'Where are my bloods taken?',
    a: <>At an accredited pathology collection centre near you. We send the referral electronically, you book a morning visit, and most results come back within 48 hours.</>,
  },
  {
    q: 'Can I cancel the membership?',
    a: <>Yes. Membership is $99 a month with no lock-in contract. Pause or cancel your membership from your account.</>,
  },
  {
    q: 'What about side effects?',
    a: <>If a treatment is suitable, your doctor talks you through its possible side effects before anything is prescribed, and you can raise any concern with the care team at any time.</>,
  },
  {
    q: 'What if I change my mind?',
    a: <>Cancel or reschedule up to 4 hours before your appointment for a full refund of the consult fee. After a consult has happened the fee is not refundable, whatever the outcome. The full rules are in our <Link href="/terms">terms</Link>.</>,
  },
]

export default function Objections({ id = 'before-you-start' }: { id?: string }) {
  return (
    <section id={id} className="obj container-x" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="stage-h2">Before you start.<br /><span className="stage-muted">The straight answers.</span></h2>
      <dl className="obj-list">
        {ITEMS.map(x => (
          <div key={x.q} className="obj-item">
            <dt>{x.q}</dt>
            <dd>{x.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
