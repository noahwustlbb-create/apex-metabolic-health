'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container-tight max-w-3xl">
          <div className="mb-10">
            <p className="label mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0d1420' }}>
              Terms of Service
            </h1>
            <p className="text-sm" style={{ color: '#4a6080' }}>Last updated: 26 March 2026</p>
          </div>

          <div className="space-y-8 text-base leading-relaxed" style={{ color: '#4a6080' }}>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>1. About These Terms</h2>
              <p>These Terms of Service govern your use of apexmetabolichealth.com.au and any services you access through it. They are provided by Imperial Equity Investments Pty Ltd, trading as Apex Metabolic Health. By using this website or submitting an intake form, you agree to these terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>2. Nature of Services</h2>
              <p>Apex Metabolic Health facilitates access to telehealth consultations with independent AHPRA-registered medical practitioners. All clinical decisions — including assessment, diagnosis, and prescribing — are made by those practitioners in accordance with their professional obligations.</p>
              <p className="mt-3">This website does not constitute medical advice. Nothing published here should be relied upon to self-diagnose or self-treat any condition. If you are experiencing a medical emergency, call <strong style={{ color: '#0d1420' }}>000</strong> immediately.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>3. Eligibility</h2>
              <p>Our services are available to individuals aged 18 and over who are located in Australia at the time of consultation. You must provide accurate, current, and complete information via our intake forms. Providing false or misleading information may result in clinical risk and termination of your access to our services.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>4. Fully Private Clinic — No Medicare Rebates</h2>
              <p>Apex Metabolic Health is a fully private medical service. No Medicare rebates are available for consultations or services provided through our platform. All fees are payable in full by the patient. A full fee schedule is available on our Pricing page.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>5. Clinical Suitability</h2>
              <p>Completion of an intake form and payment of a consultation fee does not guarantee that treatment will be prescribed. Clinical suitability is assessed solely by the treating AHPRA-registered practitioner. If a program is not clinically appropriate for you, your doctor will advise alternatives and will not prescribe treatment that is not clinically indicated.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>6. Therapeutic Goods</h2>
              <p>Some treatment options available through our programs may involve therapeutic goods not registered on the Australian Register of Therapeutic Goods (ARTG), accessed under the TGA Special Access Scheme (SAS) Category B. Your doctor will advise you if this applies to your protocol and will obtain your informed consent before any such treatment is initiated.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>7. Ongoing Reviews</h2>
              <p>Patients on active treatment protocols are required to attend a review consultation and repeat pathology testing every 4 months. This is a clinical safety requirement, not optional. Failure to attend a scheduled review may result in your treating doctor declining to continue prescribing until a review is completed.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>8. Cancellations and Refunds</h2>
              <p>Consultation fees are non-refundable once a consultation has been conducted. If you need to reschedule, please contact us at least 24 hours before your scheduled appointment. Missed appointments without notice may forfeit the consultation fee. Medication fees are subject to the terms of our pharmacy partner and are non-refundable once dispensed.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Imperial Equity Investments Pty Ltd is not liable for any indirect, incidental, or consequential loss arising from your use of this website or our services. Our liability for any claim is limited to the amount paid for the specific service giving rise to the claim.</p>
              <p className="mt-3">Nothing in these terms excludes any guarantee, warranty, or right you have under the Australian Consumer Law that cannot be excluded.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>10. Governing Law</h2>
              <p>These terms are governed by the laws of Queensland, Australia. Any dispute arising from these terms will be subject to the exclusive jurisdiction of the courts of Queensland.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>11. Contact</h2>
              <p>For any questions regarding these terms, contact us at <strong style={{ color: '#0d1420' }}>admin@apexmetabolichealth.com.au</strong>.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
