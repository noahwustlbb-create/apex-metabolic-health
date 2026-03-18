import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import ProgramsGrid from '@/components/ProgramsGrid'
import WhyApex from '@/components/WhyApex'
import StatsBar from '@/components/StatsBar'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <ProgramsGrid />
        <WhyApex />
        <StatsBar />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
