import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import StatsBar from '@/components/StatsBar'
import ProgramsSection from '@/components/ProgramsSection'
import WhyApex from '@/components/WhyApex'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import PricingSnapshot from '@/components/PricingSnapshot'
import AppFeature from '@/components/AppFeature'
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
        <StatsBar />
        <ProgramsSection />
        <WhyApex />
        <HowItWorks />
        <Testimonials />
        <PricingSnapshot />
        <AppFeature />
        <CTASection />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
