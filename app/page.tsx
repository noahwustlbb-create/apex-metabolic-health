import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import HowItWorks from '@/components/HowItWorks'
import ProgramsGrid from '@/components/ProgramsGrid'
import WhyApex from '@/components/WhyApex'
import PathologyPanel from '@/components/PathologyPanel'
import ProgramQuiz from '@/components/ProgramQuiz'
import Affiliations from '@/components/Affiliations'
import StatsBar from '@/components/StatsBar'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProgramsGrid />
        <ProblemSection />
        <HowItWorks />
        <ProgramQuiz />
        <WhyApex />
        <PathologyPanel />
        <Affiliations />
        <StatsBar />
        <CTASection />
      </main>
      <Footer />
      <FloatingContact />
      {/* <ChatWidget /> */}
    </>
  )
}
