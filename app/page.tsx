import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/home/Hero'
import Intro from '@/components/home/Intro'
import Pillars from '@/components/home/Pillars'
import Pathway from '@/components/home/Pathway'
import ReportPreview from '@/components/home/ReportPreview'
import PanelMarkers from '@/components/home/PanelMarkers'
import DoctorCard from '@/components/DoctorCard'
import Pricing from '@/components/home/Pricing'
import FAQSection from '@/components/FAQSection'
import { FAQS } from '@/lib/faqs'
import Invite from '@/components/home/Invite'
import Footer from '@/components/Footer'

// Story: HOOK (hero: one promise, the figure) → INTRODUCE (one statement) →
// OFFER (four areas) → EXPLAIN (pathway) → PROVE (panel, sample report,
// verification, pricing) → ANSWER (FAQ) → INVITE. White page; chapters are
// marked by white/porcelain bands, not dark ones. Ticker, PortalPeek and
// Values left the homepage on 2026-09-27: each repeated a neighbour.

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
      <main id="main-content">
        <Hero />
        <Intro />
        <Pillars />
        <Pathway />
        <PanelMarkers />
        <ReportPreview />
        <DoctorCard />
        <Pricing />
        <FAQSection />
        <Invite />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
