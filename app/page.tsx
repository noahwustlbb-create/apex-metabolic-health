import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import StageHero from '@/components/home/stage/StageHero'
import StageBox from '@/components/home/stage/StageBox'
import StageIncluded from '@/components/home/stage/StageIncluded'
import { StageToneProvider } from '@/components/home/stage/StageTone'
import TreatmentsGrid from '@/components/home/TreatmentsGrid'
import { TrustStrip, Pathways, WhyApex, ResultsTeaser, HowItWorks, HomeFAQ, CloseBand } from '@/components/home/AlgoSections'
import HomeStickyBar from '@/components/home/HomeStickyBar'
import DoctorCard from '@/components/DoctorCard'
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
// 24 Oct 2026 fundamentals plan (Noah: Go) supersedes 27 Sep: the hero carries
// one price line; the detail lives on /pricing.

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
      {/* AlgoRx order (playbook section 4, 11 Nov 2026): hero, trust strip,
          program grid, ways in, box band, why, results, proof, how it works
          (black), included, FAQ, close, black footer. */}
      <main id="main-content" className="home-main">
        <StageHero />
        <TrustStrip />
        <TreatmentsGrid />
        <Pathways />
        <StageBox />
        <WhyApex />
        <ResultsTeaser />
        <DoctorCard />
        <HowItWorks />
        <StageIncluded />
        <HomeFAQ />
        <CloseBand />
      </main>
      </StageToneProvider>
      <div className="al-foot"><Footer /></div>
      <HomeStickyBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
