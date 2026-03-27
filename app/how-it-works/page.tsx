'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HowItWorksHero() {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#0c131f', paddingTop: '120px' }}
      aria-label="How it works hero"
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
          HOW IT WORKS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-3xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          From First Contact to Ongoing Protocol.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mb-10"
          style={{ color: '#8899aa' }}
        >
          No vague timelines. Here&apos;s every step.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link href="/get-started" className="btn-teal">
            Book a Consult
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Full Process ─────────────────────────────────────────────────────────────

const FULL_STEPS = [
  {
    number: '1',
    title: 'Request an Appointment and Consent Form',
    subtitle: 'Appointment & Consent Form',
    body: `Fill out the form. Tell us your symptoms and goals. No commitment at this point.

Our team will call to confirm your appointment and pathology referral.`,
  },
  {
    number: '2',
    title: 'Pathology Collection',
    subtitle: '',
    body: `For hormone programs: we issue a blood panel referral. Attend any accredited collection centre — no appointment required at most locations.

Weight loss and general programs may not need upfront bloods. Your doctor advises.`,
  },
  {
    number: '3',
    title: 'Telehealth Consultation',
    subtitle: '',
    body: `Your doctor reviews your results, takes a detailed history, and delivers a clinical assessment. Typically 30–60 minutes. Not a quick prescription call.

You'll leave with a clear protocol and know exactly what happens next.`,
  },
  {
    number: '4',
    title: 'Begin Your Protocol',
    subtitle: '',
    body: `Where clinically appropriate, two fulfilment options: our TGA-compliant partner pharmacy, or a script release to your own pharmacy. Your doctor explains both.`,
  },
  {
    number: '5',
    title: 'Ongoing Monitoring & Reviews',
    subtitle: '',
    body: `Blood work and a review consultation are required every 4 months for active protocol patients. Non-negotiable — it's how we keep treatment safe and effective. Adjustments are based on results, not assumptions.`,
  },
]

function FullProcess() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#151c28' }}
      aria-label="The full process"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            THE PROCESS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Step by Step
          </motion.h2>
        </div>

        {/* Vertical timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: 'rgba(72,144,247,0.1)' }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {FULL_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 pb-14 last:pb-0"
              >
                {/* Step number circle */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{
                      backgroundColor: '#19202c',
                      border: '1px solid rgba(72,144,247,0.3)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '22px',
                        color: '#4890f7',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3
                      className="text-xl font-semibold"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                    >
                      {step.title}
                    </h3>
                    {step.subtitle && (
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-sm"
                        style={{
                          color: '#4890f7',
                          backgroundColor: 'rgba(72,144,247,0.08)',
                          border: '1px solid rgba(72,144,247,0.2)',
                        }}
                      >
                        {step.subtitle}
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {step.body.split('\n\n').map((para, j) => (
                      <p key={j} className="text-base leading-relaxed max-w-2xl" style={{ color: '#8899aa' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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

const HOW_IT_WORKS_FAQS = [
  {
    question: 'Do I need a GP referral to get started?',
    answer:
      'No. You can book directly through our website. Our AHPRA-registered doctors will assess clinical suitability during your consultation.',
  },
  {
    question: 'How long before I see results?',
    answer:
      'This varies by program and individual. Your doctor will give you a realistic timeline based on your specific protocol during your consultation. We don\'t make generalised outcome claims.',
  },
  {
    question: 'Can I use existing blood test results?',
    answer:
      'In some cases, yes — particularly if results are recent and comprehensive. Submit them via our Get Started form and our team will assess their suitability before your consultation.',
  },
  {
    question: 'What if I\'m not suitable for a program?',
    answer:
      'Clinical suitability is always assessed by a doctor. If a specific program isn\'t appropriate for you, your doctor will discuss alternatives and will not prescribe treatment that isn\'t clinically indicated.',
  },
  {
    question: 'How are consultations conducted?',
    answer:
      'All consultations are conducted via secure telehealth — video or phone. You just need a device with a camera or microphone and a private space.',
  },
  {
    question: 'Is there a lock-in contract?',
    answer:
      'No. You\'re not locked into any ongoing contract. Review consultations are required for patients on active protocols, but you can step back from treatment at any point by speaking with your doctor.',
  },
]

function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#151c28' }}
      aria-label="Common questions"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="label mb-4">COMMON QUESTIONS</p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Quick Answers
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {HOW_IT_WORKS_FAQS.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function HowItWorksCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0c131f' }}
      aria-label="Have more questions"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(72,144,247,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          Have more questions?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/faqs" className="btn-ghost">
            Browse FAQs
          </Link>
          <Link href="/get-started" className="btn-teal">
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <HowItWorksHero />
        <FullProcess />
        <FAQSection />
        <HowItWorksCTA />
      </main>
      <Footer />
    </>
  )
}
