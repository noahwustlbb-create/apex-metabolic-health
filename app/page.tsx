import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import ProgramsSection from '@/components/ProgramsSection'
import PricingSnapshot from '@/components/PricingSnapshot'
import ClinicalJourney from '@/components/ClinicalJourney'
import AppFeature from '@/components/AppFeature'
import StatsBar from '@/components/StatsBar'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <ProgramsSection />
        <AppFeature />
        <HowItWorks />
        <PricingSnapshot />
        <StatsBar />
        <ClinicalJourney />
        <CTASection />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
