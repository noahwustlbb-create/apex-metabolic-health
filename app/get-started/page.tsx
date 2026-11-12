import Link from 'next/link'
import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import TrustChips from '@/components/TrustChips'
import { PORTAL_ORDER_BLOODS, START_HREF } from '@/lib/portal'
import { InnerHero, Head, InnerFoot, Arrow, SHOTS, Photo } from '@/components/inner/InnerSections'
import EnquiryForm from './EnquiryForm'

/**
 * /get-started in the AlgoRx system (12 Nov 2026): hero band, three ways in as
 * bordered cards (account, bloods, free call), the enquiry form in one card.
 * Every start goes to /signup (never the quiz); bloods land on the portal's
 * order tab after signup (lib/portal.ts).
 */

const WAYS = [
  { k: 'Account', t: 'Create your free account.', b: 'Set up your patient portal in a minute. Order bloods or book a consult from there. No GP referral.', cta: 'Create your free account', href: START_HREF },
  { k: 'Bloods', t: 'Order your panel.', b: 'One doctor-issued panel, 23+ markers, collected near you. A doctor reads every result with you in your portal.', cta: 'Order bloods', href: PORTAL_ORDER_BLOODS },
  { k: 'Talk first', t: 'Book a free call.', b: 'Fifteen minutes with our clinical team on whether Apex is the right fit. No hard sell, no commitment.', cta: 'Book a free call', href: '/discovery-call' },
]

export default function GetStartedPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Get started"
          title="Every way to begin."
          lead="Create your free account, order your panel, or talk to the team first. Every path starts with one blood panel and a doctor who reads it with you."
          cap={['No GP referral', 'AHPRA-registered doctors', 'Online, Australia-wide']}
        />
        <TrustChips />

        <section className="al-sec" aria-labelledby="gs-ways">
          <div className="container-x">
            <Head id="gs-ways" kicker="Three ways in" title="Choose yours." cap={['Account', 'Bloods', 'Or talk first']} />
            <ul className="ip-cards" role="list">
              {WAYS.map((w, i) => (
                <li key={w.k} className="al-card ip-card">
                  <span className="al-k">{String(i + 1).padStart(2, '0')} · {w.k}</span>
                  <h3>{w.t}</h3>
                  <p>{w.b}</p>
                  <Link href={w.href} className={i === 0 ? 'al-pill' : 'ip-path-line'} style={{ marginTop: 16, justifyContent: 'center' }}>{w.cta} {i === 0 && <Arrow />}</Link>
                </li>
              ))}
            </ul>
            <p className="al-k" style={{ marginTop: 20 }}>Not sure which program? <Link href="/treatments" style={{ color: 'var(--al-ink)', textDecoration: 'underline', textUnderlineOffset: 3, display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>See all nine programs</Link></p>
          </div>
        </section>

        <section className="al-sec" aria-labelledby="gs-enquiry" id="enquiry" data-last>
          <div className="container-x">
            <Head id="gs-enquiry" kicker="Send an enquiry" title="Ask us anything." cap={['Reply within 1 business day', 'Private', 'No obligation']} />
            <div className="ip-split">
              <div className="al-card" style={{ overflow: 'hidden' }}>
                <Photo shot={SHOTS.couple} className="ip-story-photo" sizes="(min-width: 900px) 40vw, 100vw" />
              </div>
              <EnquiryForm />
            </div>
            <ImageryNote tone="light" />
          </div>
        </section>
      </main>
      <InnerFoot />
    </>
  )
}
