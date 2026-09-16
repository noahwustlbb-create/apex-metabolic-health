import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProtocolGrid from '@/components/ProtocolGrid'
import WhyApex from '@/components/WhyApex'
import HowItWorks from '@/components/HowItWorks'
import BrandBand from '@/components/BrandBand'
import DoctorCard from '@/components/DoctorCard'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhyApex />
        <ProtocolGrid />
        <HowItWorks />
        <BrandBand />
        <DoctorCard />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
