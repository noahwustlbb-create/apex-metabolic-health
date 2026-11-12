import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import StageHero from '@/components/home/stage/StageHero'
import StageBox from '@/components/home/stage/StageBox'
import { StageToneProvider } from '@/components/home/stage/StageTone'
import TreatmentsGrid from '@/components/home/TreatmentsGrid'
import { AboutYou, Approach, WhyApex, PhotoBreak, HomeFAQ, ReadyToStart } from '@/components/home/AlgoSections'
import HomeStickyBar from '@/components/home/HomeStickyBar'
import { FAQS } from '@/lib/faqs'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

// Homepage keeps the root title and description; only the canonical is set here,
// so it never leaks onto other pages through the layout.
export const metadata: Metadata = { alternates: { canonical: '/' } }

// Story, rebuilt to the BioTrack bar (Noah, 2026-09-27): HOOK (ice stage,
// glass body with the four pillars, handing over to the heart) → PROVE
// (four cards: bloods, doctor, panel, portal) → SHOW (the portal on a night
// band, sample data) → EXPLAIN (pathway) → PROVE (panel) → TRUST (doctor)
// → ANSWER (FAQ) → INVITE (ice stage again). Renders: public/3d, made in
// Higgsfield (jobs in Clients/Apex/research/hero-2026-09-27/HANDOFF.md).
// 24 Oct 2026 fundamentals plan (Noah: Go) supersedes 27 Sep. No price in the
// hero (Noah, 2 Nov); the detail lives on /pricing. Current order: 12 Nov below.

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <StageToneProvider>
      {/* Noah's structure (12 Nov 2026): 01 hero (neutral until the pick),
          02 about you, 03 protocols, 04 approach (with the box band after
          Optimise and Review), 05 why Apex, FAQ, 06 ready to start, black
          footer. */}
      <main id="main-content" className="home-main">
        <StageHero />
        <AboutYou />
        <TreatmentsGrid />
        <Approach />
        <StageBox />
        <WhyApex />
        <PhotoBreak />
        <HomeFAQ />
        <ReadyToStart />
      </main>
      </StageToneProvider>
      <div className="al-foot"><Footer /></div>
      <HomeStickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
