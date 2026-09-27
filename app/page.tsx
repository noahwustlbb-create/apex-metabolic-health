import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import StageHero from '@/components/home/stage/StageHero'
import StageClarity from '@/components/home/stage/StageClarity'
import StagePortal from '@/components/home/stage/StagePortal'
import PanelMarkers from '@/components/home/PanelMarkers'
import DoctorCard from '@/components/DoctorCard'
import FAQSection from '@/components/FAQSection'
import { FAQS } from '@/lib/faqs'
import StageClose from '@/components/home/stage/StageClose'
import StageStartTiles from '@/components/home/stage/StageStartTiles'
import StageSteps from '@/components/home/stage/StageSteps'
import StageIncluded from '@/components/home/stage/StageIncluded'
import { StageToneProvider } from '@/components/home/stage/StageTone'
import Footer from '@/components/Footer'

// Story, rebuilt to the BioTrack bar (Noah, 2026-09-27): HOOK (ice stage,
// glass body with the four pillars, handing over to the heart) → PROVE
// (four cards: bloods, doctor, panel, portal) → SHOW (the portal on a night
// band, sample data) → EXPLAIN (pathway) → PROVE (panel) → TRUST (doctor)
// → ANSWER (FAQ) → INVITE (ice stage again). Renders: public/3d, made in
// Higgsfield (jobs in Clients/Apex/research/hero-2026-09-27/HANDOFF.md).
// No prices on the homepage (Noah, 2026-09-27); they live on /pricing.

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
      <main id="main-content">
        <StageHero />
        <StageStartTiles />
        <StageClarity />
        <StageSteps />
        <StagePortal />
        <StageIncluded />
        <PanelMarkers />
        <DoctorCard />
        <FAQSection />
        <StageClose />
      </main>
      </StageToneProvider>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
