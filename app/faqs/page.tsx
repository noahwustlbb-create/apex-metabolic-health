'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontWeight: 600,
            color: '#f0f4f8',
            fontSize: '15px',
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: '#4890f7',
            fontSize: '22px',
            lineHeight: 1,
            flexShrink: 0,
            fontWeight: 300,
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: '#8899aa' }}>
          {answer}
        </p>
      )}
    </div>
  )
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
  {
    category: 'Getting Started',
    faqs: [
      {
        question: 'Are your services legal and regulated?',
        answer:
          'Yes. All medical services at Apex Metabolic Health are provided by AHPRA-registered medical practitioners. We operate in full compliance with Australian healthcare regulations, including TGA guidelines for the prescription and supply of medications.',
      },
      {
        question: 'Do I need a referral from my GP?',
        answer:
          'No GP referral is required. You can book directly through our website. Clinical suitability is assessed by our own AHPRA-registered doctors during your consultation.',
      },
      {
        question: 'How do I begin the process?',
        answer:
          "Submit the form on our website. Our team will call to confirm your appointment and pathology referral. No commitment until we've spoken.",
      },
      {
        question: 'How long does the initial review take?',
        answer:
          'From submitting the form to completing your consultation, most patients move through the process within 1–2 weeks. Blood test turnaround time depends on the collection centre and the markers ordered. We\'ll keep you updated throughout.',
      },
    ],
  },
  {
    category: 'Pathology & Blood Tests',
    faqs: [
      {
        question: 'Why do I need blood tests before a consultation?',
        answer:
          'Advanced biomarker analysis is the foundation of every clinical decision. Without objective biological data, a doctor cannot responsibly design a hormonal protocol. We don\'t guess — we measure.',
      },
      {
        question: 'Where do I get my blood tests done?',
        answer:
          'We refer you to an accredited pathology collection centre. There are centres across all major cities and most regional areas in Australia — you can attend whichever one is most convenient. No appointment is required at most locations.',
      },
      {
        question: 'Can I use existing blood test results?',
        answer:
          'Possibly. If your results are recent (within the last 3–6 months) and cover the relevant markers, your doctor may accept them. Submit your existing results through the Get Started form and our team will assess them before your consultation.',
      },
      {
        question: 'What does the blood panel test for?',
        answer:
          'Our advanced biomarker panels cover a comprehensive range of markers including free and total testosterone, oestradiol, SHBG, FSH/LH, liver and kidney function, full blood count, metabolic and cellular markers, thyroid function, and more. Panels are tailored by your doctor based on your protocol and clinical history.',
      },
    ],
  },
  {
    category: 'Consultations & Treatment',
    faqs: [
      {
        question: 'How are consultations conducted?',
        answer:
          'All consultations are conducted via secure telehealth — video or phone call. You need a private space, a device with a camera or microphone, and a stable internet connection. Our doctors are available across all Australian time zones.',
      },
      {
        question: 'Am I guaranteed to receive a prescription?',
        answer:
          'No. A prescription is issued only if your doctor determines that treatment is clinically appropriate based on your pathology results, health history, and individual circumstances. We do not prescribe to patients who are not suitable candidates.',
      },
      {
        question: 'What happens if treatment isn\'t clinically appropriate for me?',
        answer:
          'Your doctor will explain their assessment, discuss alternative options, and ensure you leave the consultation with clear guidance — even if that guidance is to explore other options. You will not be charged for a consultation that doesn\'t result in a treatment plan without prior discussion.',
      },
      {
        question: 'Can I share my medication with someone else?',
        answer:
          'Absolutely not. All prescribed treatments are prescribed for a specific individual based on their individual pathology results and health profile. Sharing prescription medication is illegal and dangerous.',
      },
      {
        question: 'What if I have a medical emergency?',
        answer:
          'Apex Metabolic Health is not an emergency service. In the case of a medical emergency, call 000 immediately. Our clinical team is available for non-urgent queries during business hours.',
      },
    ],
  },
  {
    category: 'Services & Programs',
    faqs: [
      {
        question: 'What programs does Apex Metabolic Health offer?',
        answer:
          'We currently offer eight clinical programs: Hormone Optimisation, Hormone & Performance, Performance+, Injury Repair & Recovery, Skin Regeneration, Hair Restoration, Metabolic Optimisation, and the Longevity Protocol (coming soon). Visit our programs pages for full details.',
      },
      {
        question: 'Are your services suitable for both men and women?',
        answer:
          'Yes. Apex Metabolic Health provides clinical services for all adults. Our hormone and metabolic programs are designed to assess and address imbalances in both men and women. Women\'s-specific programs are available including tailored pathology panels.',
      },
      {
        question: 'What is telehealth and how does it work at Apex?',
        answer:
          'Telehealth is a secure, online medical consultation — the same clinical standard as an in-person visit, conducted via video or phone. All Apex consultations are telehealth-based, meaning you can access our services from anywhere in Australia without travelling to a clinic.',
      },
      {
        question: 'Can I get a medical certificate during my consultation?',
        answer:
          'Yes. Our AHPRA-registered doctors can issue medical certificates and referral letters during a telehealth consultation where clinically appropriate.',
      },
      {
        question: 'What is integrative hormone care?',
        answer:
          'Integrative hormone care combines evidence-based pathology testing with personalised clinical protocols that address the full picture of a patient\'s health — not just a single symptom. Our approach considers hormonal, metabolic, and lifestyle factors together rather than in isolation.',
      },
      {
        question: 'How does the weight management program work?',
        answer:
          'Our Metabolic Optimisation program begins with a doctor consultation (no upfront biomarker analysis required) to assess your metabolic profile and design a personalised protocol. Where clinically appropriate, doctor-prescribed treatment is coordinated through our pharmacy partner. Ongoing biological monitoring and review consultations are built into the program.',
      },
    ],
  },
  {
    category: 'Privacy & Compliance',
    faqs: [
      {
        question: 'Is my information kept confidential?',
        answer:
          'Yes. All patient information is handled in accordance with the Australian Privacy Act 1988 and relevant health privacy legislation. Your records are never shared with third parties without your explicit consent.',
      },
      {
        question: 'Is Apex Metabolic Health a pharmacy?',
        answer:
          'No. Apex Metabolic Health is a telehealth clinic. We do not dispense medications directly. Where treatment is clinically indicated, prescriptions are fulfilled through our TGA-compliant partner pharmacies or a pharmacy of your choosing.',
      },
      {
        question: 'Are all practitioners at Apex doctors?',
        answer:
          'Yes. All clinical consultations at Apex Metabolic Health are conducted by AHPRA-registered medical practitioners. You will always consult with a qualified doctor.',
      },
      {
        question: 'Can I decline treatment at any point?',
        answer:
          'Yes, at any point. Participation in any treatment protocol is entirely voluntary. You can pause, modify, or discontinue treatment by discussing it with your doctor during any consultation.',
      },
    ],
  },
]

// ─── FAQ Hero ─────────────────────────────────────────────────────────────────

function FAQHero() {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#0c131f', paddingTop: '120px' }}
      aria-label="FAQs hero"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          FAQS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-3xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          Straight Answers.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: '#8899aa' }}
        >
          Not on this list? Contact us through the Get Started page.
        </motion.p>
      </div>
    </section>
  )
}

// ─── FAQ Category Section ─────────────────────────────────────────────────────

function FAQCategory({
  category,
  faqs,
  index,
}: {
  category: string
  faqs: Array<{ question: string; answer: string }>
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const bg = index % 2 === 0 ? '#151c28' : '#0c131f'

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: bg }}
      aria-label={category}
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          {category}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl"
        >
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function FAQBottomCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0c131f' }}
      aria-label="Get started"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          Still have questions?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/assessment" className="btn-teal">
            Get Started
          </Link>
          <Link href="/how-it-works" className="btn-ghost">
            How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQsPage() {
  return (
    <>
      <Nav />
      <main>
        <FAQHero />
        {FAQ_CATEGORIES.map((cat, i) => (
          <FAQCategory
            key={cat.category}
            category={cat.category}
            faqs={cat.faqs}
            index={i}
          />
        ))}
        <FAQBottomCTA />
      </main>
      <Footer />
    </>
  )
}
