'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container-tight max-w-3xl">
          <div className="mb-10">
            <p className="label mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0d1420' }}>
              Privacy Policy
            </h1>
            <p className="text-sm" style={{ color: '#4a6080' }}>Last updated: 26 March 2026</p>
          </div>

          <div className="space-y-8 text-base leading-relaxed" style={{ color: '#4a6080' }}>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>1. About This Policy</h2>
              <p>Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd (ABN available on request). We are committed to protecting the privacy of individuals who interact with our website and clinical services in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).</p>
              <p className="mt-3">This policy applies to all personal information we collect, hold, use, and disclose through apexmetabolichealth.com.au and our associated intake and booking systems.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>2. Information We Collect</h2>
              <p>We collect the following categories of personal and health information:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Name, date of birth, address, phone number, and email address</li>
                <li>Medicare number and card details (collected for QScript monitored medicines verification only)</li>
                <li>Medical and health history, current medications, and lifestyle information provided via intake forms</li>
                <li>Pathology results shared with or ordered through our clinic</li>
                <li>Payment information (processed by third-party payment processors — we do not store card details)</li>
                <li>Website usage data collected via cookies and analytics tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>3. How We Use Your Information</h2>
              <p>Your personal and health information is used to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Assess your suitability for our clinical programs</li>
                <li>Facilitate telehealth consultations with our AHPRA-registered medical practitioners</li>
                <li>Coordinate pathology testing and medication fulfilment</li>
                <li>Comply with our obligations under the <em>Poisons Standard</em>, QScript, and other regulatory frameworks</li>
                <li>Communicate with you regarding your appointments, results, and ongoing care</li>
                <li>Improve our website and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>4. Disclosure of Your Information</h2>
              <p>We may disclose your personal and health information to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Our AHPRA-registered medical practitioners providing your care</li>
                <li>Our TGA-compliant compounding pharmacy partner for medication fulfilment</li>
                <li>Accredited pathology collection centres and laboratory providers</li>
                <li>Queensland Health&apos;s QScript system, where required by law</li>
                <li>Third-party service providers (e.g., secure form hosting, email delivery) under confidentiality obligations</li>
                <li>Regulatory bodies (AHPRA, TGA, OAIC) where required by law</li>
              </ul>
              <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>5. Storage and Security</h2>
              <p>Your information is stored on secure, Australian-hosted or adequately protected cloud infrastructure. We apply reasonable technical and organisational safeguards to protect health information from unauthorised access, disclosure, or loss.</p>
              <p className="mt-3">In the event of an eligible data breach under the Notifiable Data Breaches scheme, we will notify the Office of the Australian Information Commissioner (OAIC) and affected individuals as required by law.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Complain about a breach of the Australian Privacy Principles</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, contact us at <strong style={{ color: '#0d1420' }}>admin@apexmetabolichealth.com.au</strong>. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>7. Cookies and Analytics</h2>
              <p>Our website uses cookies and analytics tools (including web analytics) to understand how visitors interact with our site. This data is aggregated and does not identify individuals. You may disable cookies through your browser settings; however, some site functionality may be affected.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>8. Complaints</h2>
              <p>If you believe we have breached your privacy, please contact us in the first instance at <strong style={{ color: '#0d1420' }}>admin@apexmetabolichealth.com.au</strong>. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at <strong style={{ color: '#0d1420' }}>oaic.gov.au</strong>.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3" style={{ color: '#0d1420', fontFamily: 'var(--font-space-grotesk)' }}>9. Updates to This Policy</h2>
              <p>We may update this policy from time to time. The current version will always be published at this URL with the date of last update noted above.</p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
