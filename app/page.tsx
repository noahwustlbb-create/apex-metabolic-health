import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/home/Hero'
import Intro from '@/components/home/Intro'
import ProtocolList from '@/components/home/ProtocolList'
import Pathway from '@/components/home/Pathway'
import VisualBreak from '@/components/home/VisualBreak'
import DoctorCard from '@/components/DoctorCard'
import Pricing from '@/components/home/Pricing'
import Values from '@/components/home/Values'
import FAQSection from '@/components/FAQSection'
import { FAQS } from '@/lib/faqs'
import Invite from '@/components/home/Invite'
import Footer from '@/components/Footer'

// Story: HOOK (hero) → INTRODUCE (clinic) → OFFER (protocols) → EXPLAIN
// (pathway) → rest (visual break) → PROVE (verification, pricing) → PAUSE
// (who we are) → ANSWER (FAQ) → INVITE (cta). Bands alternate dark and light.

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
        <ProtocolList />
        <Pathway />
        <VisualBreak />
        <DoctorCard />
        <Pricing />
        <Values />
        <FAQSection />
        <Invite />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  )
}
