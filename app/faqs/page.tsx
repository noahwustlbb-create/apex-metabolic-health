import Link from 'next/link'
import ImageryNote from '@/components/ImageryNote'
import Nav from '@/components/Nav'
import { FAQS } from '@/lib/faqs'
import { OBJECTIONS } from '@/components/Objections'
import { CLINIC_EMAIL } from '@/lib/contact'
import { pageMetadata } from '@/lib/seo'
import { FaqList, CtaBand, InnerFoot, Arrow, SHOTS, type Faq } from '@/components/inner/InnerSections'

export const metadata = pageMetadata({
  path: '/faqs',
  title: 'FAQs',
  description: 'Straight answers on bloods, doctors, fees, membership and cancelling at Apex Metabolic Health. AHPRA-registered doctors, no GP referral, Australia-wide.',
})

/**
 * /faqs in the AlgoRx "You Ask, We Answer." treatment (12 Nov 2026): left
 * column (kicker // SUPPORT, headline, one line, black pill to contact), right
 * a numbered accordion with hairlines and + / x toggles. Questions come from
 * lib/faqs.ts and components/Objections.tsx only: no hormone names, no
 * medicines, no outcomes.
 */

const GROUPS: { k: string; faqs: Faq[] }[] = [
  { k: 'Getting started', faqs: FAQS.map(f => ({ q: f.q, a: f.a })) },
  { k: 'Before you pay', faqs: OBJECTIONS },
]

export default function FAQsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  let start = 0
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <section className="al-sec ip-faq" aria-labelledby="fq-title" style={{ paddingTop: 'calc(88px + clamp(48px, 6vw, 96px))' }}>
          <div className="container-x al-faq-in">
            <div className="al-faq-side">
              <p className="al-k">{'// Support'}</p>
              <h1 id="fq-title" className="al-h2" style={{ fontSize: 'clamp(40px, 4.6vw, 72px)' }}>You ask,<br />we answer.</h1>
              <p className="al-lead">The straight answers on bloods, doctors, fees, membership and cancelling.</p>
              <a href={`mailto:${CLINIC_EMAIL}`} className="al-pill">Ask us a question <Arrow /></a>
            </div>
            <div>
              {GROUPS.map(g => {
                const s = start
                start += g.faqs.length
                return (
                  <div key={g.k} className="ip-faq-group">
                    <p className="al-k">{'// '}{g.k}</p>
                    <FaqList faqs={g.faqs} start={s} openFirst={s === 0} />
                  </div>
                )
              })}
              <p className="al-k" style={{ marginTop: 28 }}>Not on this list? <Link href="/discovery-call" style={{ color: 'var(--al-ink)', textDecoration: 'underline', textUnderlineOffset: 3, display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Book a free call</Link></p>
            </div>
          </div>
        </section>

        <CtaBand shot={SHOTS.duskWoman} />
        <ImageryNote />
      </main>
      <InnerFoot />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
