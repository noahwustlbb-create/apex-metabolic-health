import Link from 'next/link'
import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import TrustChips from '@/components/TrustChips'
import { PORTAL_ORDER_BLOODS, START_HREF } from '@/lib/portal'
import { InnerHero, Head, HowBand, PhotoLine, WhyApex, CtaBand, InnerFoot, Arrow, BLOOD_STEPS, PROGRAM_STEPS, SHOTS } from '@/components/inner/InnerSections'

/**
 * /how-it-works in the AlgoRx "How It Works." treatment (12 Nov 2026):
 * hero on black -> two labelled rows on black (BLOODS: order, collect, doctor
 * reads, results in your portal; PROGRAMS: consult, plan, dispensed discreetly,
 * review every 3 months), mono step labels, bold titles, one line each,
 * outline icons -> "Why Apex?" four principles on white -> portal results
 * teaser (a real marker on its range, no fabricated numbers) -> trust chips
 * -> photo CTA band. No medicine names, no outcomes, no prices.
 */

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="How it works"
          title="Bloods first. Then a doctor. Then a plan."
          lead="One blood panel, read by an AHPRA-registered doctor with you, then a plan you understand. Everything lives in your portal."
          cap={['No GP referral', 'Most results in about 48 hours', 'Online, Australia-wide']}
          sidePhoto={SHOTS.balconyCall}
        />

        <PhotoLine shot={SHOTS.womanKitchen} line="Measure first. Then treat." />

        <HowBand
          rows={[{ label: 'Bloods', steps: BLOOD_STEPS }, { label: 'Programs', steps: PROGRAM_STEPS }]}
          title="Two tracks. One portal."
          kicker="Step by step"
          cap={['Bloods: four steps', 'Programs: four steps', 'Doctor-led, start to finish']}
        />

        <PhotoLine shot={SHOTS.windowMan} line="A doctor reads every result." />

        <WhyApex />

        <section className="al-sec" aria-labelledby="hw-portal">
          <div className="container-x">
            <div className="ip-portal">
              <div className="al-card ip-portal-copy">
                <p className="al-k">{'// Your portal'}</p>
                <h2 id="hw-portal" className="al-h2">Every marker, on its range.</h2>
                <p className="al-lead">Results land in your portal automatically. Each marker sits on its reference range with your doctor’s note underneath, and every panel you do adds to your trend.</p>
                <ul className="ip-ticks" role="list" style={{ color: 'var(--al-ink)' }}>
                  {['23+ markers from one draw', 'Read by a doctor before you see them', 'Your trend over time, panel after panel'].map(t => <li key={t} style={{ color: 'var(--al-ink)' }}>{t}</li>)}
                </ul>
                <Link href={PORTAL_ORDER_BLOODS} className="al-pill al-pill-lg">Order your panel <Arrow /></Link>
              </div>
              <div className="ip-portal-card">
                <div className="ip-bg">
                  {/* Noah's device renders (13 Nov 2026): the phone on phones, the tablet from 900 up. */}
                  <picture>
                    <source media="(min-width: 900px)" srcSet="/photos/device-tablet-900.webp 900w, /photos/device-tablet-1600.webp 1600w" sizes="58vw" />
                    <img src="/photos/device-phone-1200.webp" srcSet="/photos/device-phone-700.webp 700w, /photos/device-phone-1200.webp 1200w" sizes="100vw" alt={SHOTS.phoneDesk.alt} loading="lazy" decoding="async" className="ip-device" />
                  </picture>
                </div>
                <div className="ip-grade" aria-hidden="true" />
                <div className="ip-reading" aria-label="Sample portal reading, no result shown">
                  <p className="al-k">Marker · Ferritin</p>
                  <div className="ip-reading-v"><b>Sample</b><span>Layout only</span></div>
                  <div className="ip-bar" aria-hidden="true"><i style={{ left: '58%' }} /></div>
                  <p className="ip-bar-k"><span>Low</span><span>Reference range</span><span>High</span></p>
                  <p className="ip-reading-note">Your own value sits here once your results are in, with your doctor’s note underneath.</p>
                  <div className="ip-chips"><span>Doctor reviewed</span><span>Trend over time</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="al-sec" aria-labelledby="hw-start">
          <div className="container-x">
            <Head id="hw-start" kicker="Start" title="Two ways in." cap={['Order a panel', 'Or create an account first', 'Both free to start']} />
            <ul className="ip-cards" role="list" data-two>
              <li className="al-card ip-card">
                <span className="al-k">01 · Bloods</span>
                <h3>Order your panel.</h3>
                <p>Create your free account and order a doctor-issued panel. Collect near you, results in your portal, a doctor reads them with you.</p>
                <Link href={PORTAL_ORDER_BLOODS} className="al-why-link">Order bloods <Arrow /></Link>
              </li>
              <li className="al-card ip-card">
                <span className="al-k">02 · Programs</span>
                <h3>Pick a program.</h3>
                <p>Nine doctor-led programs. Every one starts with the same panel, so you can decide after your results are in.</p>
                <Link href="/treatments" className="al-why-link">See the programs <Arrow /></Link>
              </li>
            </ul>
          </div>
        </section>

        <div style={{ marginTop: 'clamp(64px, 7vw, 110px)' }}><TrustChips /></div>

        <CtaBand shot={SHOTS.sprintMan} href={START_HREF} />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
