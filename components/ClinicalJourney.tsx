'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Choose your program',
    description: 'Six clinical programs — each targeting a distinct biological system. The pre-screen assessment will confirm the right match for your goals.',
    hasPrograms: false,
  },
  {
    number: '02',
    title: 'Complete your intake & blood draw',
    description: 'Fill in a short pre-screen form online. Your doctor issues a pathology referral — collect at any of 4,000+ accredited centres near you. No GP required. Morning, fasted.',
    hasPrograms: false,
  },
  {
    number: '03',
    title: 'Telehealth consultation',
    description: 'Your Apex doctor reviews your results and meets with you via telehealth. This is where your clinical picture is built — not a 10-minute GP visit.',
    hasPrograms: false,
  },
  {
    number: '04',
    title: 'Your personalised protocol',
    description: 'You receive a treatment protocol tailored to your biology. Prescriptions coordinated through our TGA-compliant compounding pharmacy where indicated.',
    hasPrograms: false,
  },
  {
    number: '05',
    title: 'Ongoing care or one-off pathway',
    description: 'Continue with Apex Membership for quarterly bloods, protocol adjustments, and biological age tracking. Or take your protocol and go. Your choice.',
    hasPrograms: false,
  },
]

function StepBlock({ step, index, isInView }: {
  step: typeof STEPS[0]
  index: number
  isInView: boolean
}) {
  const isLast = index === STEPS.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-6 md:gap-10"
    >
      {/* Left rail */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        {/* Circle */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(72,144,247,0.08)',
            border: '1.5px solid rgba(72,144,247,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 11,
              fontWeight: 800,
              color: '#4890f7',
              letterSpacing: '0.05em',
            }}
          >
            {step.number}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: 1,
              minHeight: 40,
              marginTop: 6,
              background: 'linear-gradient(to bottom, rgba(72,144,247,0.25), rgba(72,144,247,0.05))',
            }}
          />
        )}
      </div>

      {/* Right content */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-10 md:pb-12'}`}>
        <h3
          className="text-xl md:text-2xl font-bold mb-2 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', marginTop: 8 }}
        >
          {step.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed mb-0" style={{ color: '#6b7a8d', maxWidth: 560 }}>
          {step.description}
        </p>

      </div>
    </motion.div>
  )
}

export default function ClinicalJourney() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="programs"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Clinical journey"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label mb-4"
            >
              CLINICAL PATHWAY
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(32px, 3.5vw, 54px)',
                lineHeight: 1.06,
                color: '#f0f4f8',
                letterSpacing: '-0.02em',
              }}
            >
              Simple from{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>start to finish.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed lg:mb-1"
            style={{ color: '#8899aa' }}
          >
            Five steps from not knowing your numbers to having a doctor-built protocol working in your favour.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl">
          {STEPS.map((step, i) => (
            <StepBlock key={step.number} step={step} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <a
            href="/intake/pre-screen"
            className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200"
            style={{
              background: '#f0f4f8',
              color: '#070a0d',
              padding: '14px 28px',
              borderRadius: '999px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f0f4f8' }}
          >
            Start your assessment
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/intake/discovery"
            className="text-sm font-medium flex items-center gap-2 transition-colors duration-150"
            style={{ color: '#4a5a6a' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#8899aa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4a5a6a')}
          >
            Not sure where to start?
            <span style={{ color: '#4890f7' }}>Book a free discovery call →</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
