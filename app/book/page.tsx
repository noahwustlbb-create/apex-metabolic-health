import Link from 'next/link'
import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import TrustChips from '@/components/TrustChips'
import { START_HREF } from '@/lib/portal'
import { InnerHero, Head, InnerFoot, CtaBand, Arrow, SHOTS } from '@/components/inner/InnerSections'

/**
 * /book in the AlgoRx system (12 Nov 2026). The old multi-step "what brings
 * you in" wizard (old intake routes, hormone names in the copy) is gone: two
 * consult cards and the free call, every start to /signup. Consults are
 * booked inside the portal after the account exists. Prices stay below the
 * first screen; no medicine names.
 */

const CONSULTS = [
  { k: 'Hormone consultation', t: 'For hormone and metabolic health.', b: 'Your AHPRA-registered doctor reviews your blood results, history and goals by phone or video, then sets a plan. Bloods first.', price: '$275, members $199' },
  { k: 'Program consult', t: 'For every other program.', b: 'Weight, recovery, skin and hair, longevity, sexual health. The same doctor review, your results open on the screen.', price: '$199, members $99' },
]

export default function BookPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Book a consult"
          title="Talk to a doctor."
          lead="Create your free account, order your panel, and book your consult from your portal once the results are in. Video or phone, Monday to Saturday."
          cap={['Telehealth', 'AHPRA-registered doctors', 'Bloods first']}
        />
        <TrustChips />

        <section className="al-sec" aria-labelledby="bk-consults">
          <div className="container-x">
            <Head id="bk-consults" kicker="Two consults" title="Pick the one that fits." cap={['Booked from your portal', 'Cancel up to 4 hours before', 'Full refund if you do']} />
            <ul className="ip-cards" role="list" data-two>
              {CONSULTS.map((c, i) => (
                <li key={c.k} className="al-card ip-card">
                  <span className="al-k">{String(i + 1).padStart(2, '0')} · {c.k}</span>
                  <h3>{c.t}</h3>
                  <p>{c.b}</p>
                  <p className="al-k" style={{ marginTop: 10 }}>{c.price}</p>
                  <Link href={START_HREF} className="al-pill" style={{ marginTop: 16, justifyContent: 'center' }}>Create your free account <Arrow /></Link>
                </li>
              ))}
            </ul>
            <p className="al-k" style={{ marginTop: 20 }}>Prefer to talk first? <Link href="/discovery-call" style={{ color: 'var(--al-ink)', textDecoration: 'underline', textUnderlineOffset: 3, display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Book a free call with the team</Link></p>
          </div>
        </section>

        <CtaBand shot={SHOTS.balance} />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
