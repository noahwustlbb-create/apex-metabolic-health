import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TreatmentSelector from '@/components/TreatmentSelector'
import WhyApex from '@/components/WhyApex'
import HowItWorks from '@/components/HowItWorks'
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
        <TreatmentSelector />
        <HowItWorks />
        <DoctorCard />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
