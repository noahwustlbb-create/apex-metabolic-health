// Home-page FAQ copy. Plain data so the server can build FAQPage JSON-LD from it
// and the client accordion can render it.
export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Do I need a GP referral to get started?',
    a: 'No. You register directly through Apex and our doctors issue a pathology referral within the same business day. No existing doctor\'s referral required, no waiting rooms.',
  },
  {
    q: 'What\'s included in the blood panel?',
    a: 'Our panels go significantly beyond what a standard GP orders. For hormone programs, we test full hormone profiles, metabolic markers, thyroid function, inflammatory markers, and nutritional status: the full picture needed to build a precise protocol, not just check for disease.',
  },
  {
    q: 'Are your doctors actually AHPRA-registered?',
    a: 'Yes, unconditionally. Every consultation is conducted by an AHPRA-registered medical practitioner. We publish our registration details and you can verify any of our doctors directly on the AHPRA national register.',
  },
  {
    q: 'Where do I get my blood test done?',
    a: 'At any of 4,000+ accredited pathology collection centres across Australia. We send your referral electronically and you simply book a morning appointment at your nearest centre. Most results come back within 24–48 hours.',
  },
  {
    q: 'How does the ongoing care model work?',
    a: 'After your initial consultation and protocol is set, you\'ll have a scheduled clinical review every 3 months. Between reviews, your doctor adjusts your protocol based on new pathology data, and our team is available for clinical questions. It\'s not a set-and-forget service.',
  },
  {
    q: 'Is this legal in Australia?',
    a: 'Yes. We operate under Australian law, with TGA-compliant prescribing and a registered compounding pharmacy partner who operates under TGA Good Manufacturing Practice (GMP) standards. Our services comply with all relevant AHPRA telehealth regulations.',
  },
  {
    q: 'What if I\'ve had blood tests with my GP recently?',
    a: 'We\'ll review any recent results you can share, but in most cases we order our own panel because the markers we rely on for protocol-building are different from what standard GP panels include. If your recent tests are comprehensive, we can discuss deferring the re-test at your consultation.',
  },
]
