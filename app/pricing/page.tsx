'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Treatment Option Cards ────────────────────────────────────────────────────

function TreatmentOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
      {/* Card A: Partner Pharmacies */}
      <div className="apex-card p-7 flex flex-col">
        <p
          className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: '#2b7be0' }}
        >
          RECOMMENDED
        </p>
        <h4
          className="text-base font-semibold mb-4 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          Through Our Partner Pharmacies
        </h4>
        <ul className="space-y-3 flex-1">
          {[
            'Medication priced at pharmacy rates',
            <>Apex Protocol Membership: <span style={{ color: '#f0f4f8', fontWeight: 600 }}>$99/month</span></>,
            'Medication fulfilment access through our partner pharmacy',
            'File management & treatment coordination',
            'Medication safety review',
            'Clinical support team access',
            'Coordinated review consultations built in',
            'Admin support 9–5, 7 days a week',
            'Evidence-based supplement recommendations',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#2b7be0' }}
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card B: Through Your Own Pharmacy */}
      <div className="apex-card p-7 flex flex-col">
        <div className="mb-7">
          <div
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 opacity-0 select-none"
            aria-hidden="true"
          >
            OPTION
          </div>
          <h4
            className="text-base font-semibold mb-4 leading-snug"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Through Your Own Pharmacy
          </h4>
        </div>
        <ul className="space-y-3 flex-1">
          {[
            <>Script release &amp; prescribing fee: <span style={{ color: '#f0f4f8', fontWeight: 600 }}>$125</span></>,
            'No ongoing support fee',
            'Access to our clinical team for dosing guidance as needed',
            'You fill your prescription at any pharmacy',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#2b7be0' }}
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Timeline Step ─────────────────────────────────────────────────────────────

function TimelineStep({
  stepNumber,
  title,
  costBadge,
  costColor = '#f0f4f8',
  children,
  index,
}: {
  stepNumber: string
  title: string
  costBadge: string
  costColor?: string
  children: React.ReactNode
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-8"
    >
      {/* Left: step number + line */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: '56px' }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: 'rgba(43,123,224,0.06)',
            border: '1px solid rgba(43,123,224,0.25)',
          }}
        >
          <span
            className="font-bold"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '22px',
              color: '#2b7be0',
              letterSpacing: '-0.02em',
            }}
          >
            {stepNumber}
          </span>
        </div>
        {/* Connector line */}
        <div
          className="flex-1 w-px mt-3"
          style={{ backgroundColor: 'rgba(43,123,224,0.12)', minHeight: '32px' }}
          aria-hidden="true"
        />
      </div>

      {/* Right: content */}
      <div className="flex-1 pb-10">
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h3
            className="text-lg font-semibold leading-snug"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            {title}
          </h3>
          <span
            className="text-sm font-bold tracking-wide px-3 py-1 rounded-sm"
            style={{
              color: costColor,
              backgroundColor:
                costColor === '#c9a84c'
                  ? 'rgba(201,168,76,0.1)'
                  : 'rgba(240,244,248,0.06)',
              border: `1px solid ${
                costColor === '#c9a84c'
                  ? 'rgba(201,168,76,0.25)'
                  : 'rgba(240,244,248,0.12)'
              }`,
            }}
          >
            {costBadge}
          </span>
        </div>
        <div>{children}</div>
      </div>
    </motion.div>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────────

function PricingHero() {
  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117', paddingTop: '120px' }}
      aria-label="Pricing hero"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(43,123,224,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          PRICING
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 max-w-4xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          Transparent Pricing.
          <br />
          <span className="text-teal-gradient">No Surprises.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-2xl mb-10"
          style={{ color: '#8899aa' }}
        >
          We publish our fees upfront. Here&apos;s exactly what each step costs and what you&apos;re
          paying for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#hormone-track" className="btn-ghost">
            Hormone Programs
          </a>
          <a href="#general-track" className="btn-ghost">
            General Programs
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Track 1 ───────────────────────────────────────────────────────────────────

function Track1Section() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      id="hormone-track"
      aria-label="Track 1: Hormone Optimisation pricing"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(43,123,224,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            TRACK 01
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Hormone Optimisation Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-xl"
            style={{ color: '#8899aa' }}
          >
            Hormone Optimisation, Hormone &amp; Performance, and Performance+ programs follow this
            pricing pathway.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          <TimelineStep
            stepNumber="1"
            title="Get Started & Discovery Call"
            costBadge="FREE"
            costColor="#c9a84c"
            index={0}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              Complete our Get Started form — takes 3–5 minutes. Our team will reach out to
              schedule a complimentary discovery call to understand your goals and confirm you&apos;re
              on the right clinical pathway for you. No payment required at this stage.
            </p>
          </TimelineStep>

          <TimelineStep
            stepNumber="2"
            title="Blood Work"
            costBadge="From $264"
            index={1}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8899aa' }}>
              Comprehensive pathology is the foundation of every hormone program we run.
            </p>
            <div
              className="rounded-sm overflow-hidden mb-4"
              style={{ border: '1px solid #1e2d3d', backgroundColor: '#111820' }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4"
                style={{ borderBottom: '1px solid #1e2d3d' }}
              >
                <div>
                  <span className="text-sm font-medium" style={{ color: '#f0f4f8' }}>
                    Hormone Health Panel
                  </span>
                  <span className="block text-xs mt-0.5" style={{ color: '#4a5a6a' }}>
                    Hormone &amp; TRT programs
                  </span>
                </div>
                <span
                  className="text-lg font-bold flex-shrink-0"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  $264
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-4">
                <div>
                  <span className="text-sm font-medium" style={{ color: '#f0f4f8' }}>
                    Metabolic Health Panel
                  </span>
                  <span className="block text-xs mt-0.5" style={{ color: '#4a5a6a' }}>
                    Metabolic &amp; weight loss programs
                  </span>
                </div>
                <span
                  className="text-lg font-bold flex-shrink-0"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  $296
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
              Already have recent pathology results? You can submit them during the Get Started
              process — additional testing may not be required.
            </p>
          </TimelineStep>

          <TimelineStep
            stepNumber="3"
            title="Doctor Consultation"
            costBadge="$275"
            index={2}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              A structured telehealth consultation — not a quick check-in. Your AHPRA-registered
              doctor reviews your full results, takes a detailed health history, and builds a
              personalised treatment plan. Typically 45–60 minutes.
            </p>
          </TimelineStep>

          <TimelineStep
            stepNumber="4"
            title="Treatment (if clinically appropriate)"
            costBadge="If prescribed"
            costColor="#4a5a6a"
            index={3}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8899aa' }}>
              If your doctor determines that treatment is clinically appropriate, you choose how
              your medication is fulfilled:
            </p>
            <TreatmentOptions />
          </TimelineStep>
        </div>
      </div>
    </section>
  )
}

// ─── Track 2 ───────────────────────────────────────────────────────────────────

function Track2Section() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      id="general-track"
      aria-label="Track 2: Weight Loss, Peptide Therapy & General Programs pricing"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(43,123,224,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            TRACK 02
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Weight Loss, Peptide Therapy &amp; General Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base leading-relaxed max-w-xl"
            style={{ color: '#8899aa' }}
          >
            Metabolic Weight Loss, Injury Repair, Skin Regeneration, Hair Restoration, and General
            Consultation programs follow this pathway.
          </motion.p>
        </div>

        {/* Timeline */}
        <div>
          <TimelineStep
            stepNumber="1"
            title="Get Started & Discovery Call"
            costBadge="FREE"
            costColor="#c9a84c"
            index={0}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              Complete our Get Started form. Our team will reach out to schedule a complimentary
              discovery call to understand your goals and confirm you&apos;re on the right clinical
              pathway. No payment required at this stage.
            </p>
          </TimelineStep>

          <TimelineStep
            stepNumber="2"
            title="Doctor Consultation"
            costBadge="$125"
            index={1}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              No upfront blood work required for this pathway. Your doctor conducts a full health
              profile review and creates your personalised treatment plan. Typically 30–45 minutes.
            </p>
          </TimelineStep>

          <TimelineStep
            stepNumber="3"
            title="Treatment (if clinically appropriate)"
            costBadge="If prescribed"
            costColor="#4a5a6a"
            index={2}
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8899aa' }}>
              If your doctor determines that treatment is clinically appropriate, you choose how
              your medication is fulfilled:
            </p>
            <TreatmentOptions />
          </TimelineStep>
        </div>
      </div>
    </section>
  )
}

// ─── Compliance Note ────────────────────────────────────────────────────────────

function ComplianceNote() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Compliance information"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-sm"
          style={{
            backgroundColor: '#111820',
            border: '1px solid #1e2d3d',
          }}
        >
          <p className="text-sm leading-relaxed text-center max-w-3xl mx-auto" style={{ color: '#4a5a6a' }}>
            All consultations are conducted by AHPRA-registered medical practitioners. Clinical
            suitability is assessed by your doctor — treatment is not guaranteed. Pricing is subject
            to change — confirm current fees at time of booking. We do not name specific medications
            in compliance with TGA guidelines.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ─────────────────────────────────────────────────────────────────

function PricingBottomCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Get started"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(43,123,224,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
        >
          Ready to Get Started?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#8899aa' }}
        >
          Book your complimentary discovery call. No commitment, no payment upfront.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <Link href="/get-started" className="btn-teal">
            Book a Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingHero />
        <Track1Section />
        <Track2Section />
        <ComplianceNote />
        <PricingBottomCTA />
      </main>
      <Footer />
    </>
  )
}
