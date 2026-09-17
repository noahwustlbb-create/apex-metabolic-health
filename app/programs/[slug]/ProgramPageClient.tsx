'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DoctorCard from '@/components/DoctorCard'
import FAQSection from '@/components/FAQSection'
import type { Program } from '@/lib/programs'

const TEXTURE: Record<string, string> = {
  'hormone-optimisation': '/protocols/hormone.jpg', 'metabolic-weight-loss': '/protocols/weight.jpg', 'sexual-health': '/protocols/sexual.jpg',
  'injury-repair': '/protocols/recovery.jpg', 'longevity': '/protocols/longevity.jpg', 'skin-regeneration': '/protocols/skin.jpg',
  'hair-restoration': '/protocols/hair.jpg', 'performance-plus': '/protocols/performance.jpg', 'pathology': '/protocols/bloods.jpg',
}
const CODE: Record<string, string> = {
  'hormone-optimisation': 'APX-01', 'metabolic-weight-loss': 'APX-02', 'sexual-health': 'APX-03', 'injury-repair': 'APX-04', 'longevity': 'APX-05',
  'skin-regeneration': 'APX-06', 'hair-restoration': 'APX-07', 'performance-plus': 'APX-08', 'pathology': 'APX-09',
}
const START_TYPE: Record<string, string> = {
  'hormone-optimisation': 'hormone', 'metabolic-weight-loss': 'weight', 'sexual-health': 'sexual', 'injury-repair': 'recovery', 'longevity': 'longevity',
  'skin-regeneration': 'skinhair', 'hair-restoration': 'skinhair', 'performance-plus': 'recovery', 'pathology': 'bloods',
}

// ─── Program Hero ─────────────────────────────────────────────────────────────

function ProgramHero({ program }: { program: Program }) {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '120px' }}
      aria-label="Program hero"
    >

      <div className="container-tight relative z-10 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            {/* Badge */}
            {program.badge && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <span
                  className="inline-flex items-center text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm"
                  style={
                    program.badge === 'Flagship'
                      ? {
                          color: 'var(--blue)',
                          backgroundColor: 'rgba(72,144,247,0.08)',
                          border: '1px solid rgba(72,144,247,0.2)',
                        }
                      : {
                          color: '#c9a84c',
                          backgroundColor: 'rgba(201,168,76,0.1)',
                          border: '1px solid rgba(201,168,76,0.25)',
                        }
                  }
                >
                  {program.badge}
                </span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: program.badge ? 0.05 : 0 }}
              className="t-eyebrow mb-5"
            >
              Clinical protocol
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="t-display mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {program.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="t-lead mb-6 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {program.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="mb-8"
            >
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: 'var(--blue)' }}
              >
                View transparent pricing
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex flex-wrap gap-4"
            >
              {program.status === 'coming-soon' ? (
                <a href="https://app.apexmetabolichealth.com.au/signup" className="btn-ghost">
                  Get Started
                </a>
              ) : (
                <Link href={`/start?t=${START_TYPE[program.slug] ?? 'general'}`} className="btn-primary" style={{ fontSize: 15, padding: '17px 34px', borderRadius: 999 }}>
                  Start your assessment
                  <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              )}
            </motion.div>
          </div>

          {/* SAS Category B disclosure */}
          {program.sasDisclosure && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 px-4 py-3 rounded-sm text-xs leading-relaxed"
              style={{ backgroundColor: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
            >
              <strong style={{ color: 'var(--text-primary)' }}>Therapeutic goods disclosure: </strong>
              Some treatment options available through this program involve therapeutic goods not registered on the Australian Register of Therapeutic Goods (ARTG). Your doctor will advise you if this applies to your protocol and will obtain your informed consent before proceeding.
            </motion.div>
          )}

          {/* Protocol frame: texture, code and two readouts, on the mesh. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mesh rounded-[32px] overflow-hidden hidden lg:block"
            style={{ aspectRatio: '4 / 3', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.9)' }}
            aria-hidden="true"
          >
            <div className="absolute rounded-[24px] overflow-hidden" style={{ inset: '14%' , boxShadow: '0 30px 60px rgba(15,23,42,0.22)' }}>
              <Image src={TEXTURE[program.slug] ?? '/protocols/hormone.jpg'} alt="" fill className="object-cover" sizes="40vw" priority />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,6,13,0.75) 0%, rgba(4,6,13,0.15) 50%, transparent 75%)' }} />
              <div className="absolute left-5 bottom-5 right-5">
                <span className="t-mono text-white/70 block" style={{ fontSize: 9.5 }}>{CODE[program.slug] ?? 'APX'}</span>
                <span className="block text-white text-[20px] font-semibold leading-tight mt-1" style={{ letterSpacing: '-0.02em' }}>{program.name}</span>
              </div>
            </div>
            <div className="absolute left-5 top-5 glass-card" style={{ padding: '12px 16px', borderRadius: 18 }}>
              <span className="t-readout block" style={{ fontSize: 30, color: 'var(--text-primary)' }}>48h</span>
              <span className="t-mono block mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Results back</span>
            </div>
            <div className="absolute right-5 bottom-5 glass-card text-right" style={{ padding: '12px 16px', borderRadius: 18 }}>
              <span className="t-readout block" style={{ fontSize: 30, color: 'var(--text-primary)' }}>01</span>
              <span className="t-mono block mt-1" style={{ color: 'var(--text-muted)', fontSize: 9.5 }}>Doctor, start to finish</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── What This Program Addresses ──────────────────────────────────────────────

function WhatItAddresses({ program }: { program: Program }) {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const listRef = useRef(null)
  const listInView = useInView(listRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden mesh"
      aria-label="What this program addresses"
    >

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '-0.03em', fontFeatureSettings: '"cv11", "ss03"', color: 'var(--text-primary)' }}
          >
            What This Program Addresses
          </motion.h2>
        </div>

        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          {program.symptoms.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={listInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 py-3.5"
              style={{ borderBottom: '1px solid rgba(72,144,247,0.1)' }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <circle cx="10" cy="10" r="9" stroke="#4890f7" strokeWidth="1.5" fill="rgba(72,144,247,0.06)" />
                <path d="M6 10l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What's Included ──────────────────────────────────────────────────────────

function WhatsIncluded({ program }: { program: Program }) {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="What's included"
    >

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '-0.03em', fontFeatureSettings: '"cv11", "ss03"', color: 'var(--text-primary)' }}
          >
            What&apos;s Included
          </motion.h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {program.includes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="apex-card p-6 flex items-start gap-4"
            >
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--blue)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowThisProgramWorks({ program }: { program: Program }) {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--elevated)' }}
      aria-label="How this program works"
    >

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '-0.03em', fontFeatureSettings: '"cv11", "ss03"', color: 'var(--text-primary)' }}
          >
            How This Program Works
          </motion.h2>
        </div>

        {/* Vertical timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: 'rgba(72,144,247,0.08)' }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {program.howItWorks.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={stepsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 pb-12 last:pb-0"
              >
                {/* Step number */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{
                      backgroundColor: 'var(--elevated-high)',
                      border: '1px solid rgba(72,144,247,0.25)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '20px',
                        color: 'var(--blue)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 600, letterSpacing: '-0.03em', fontFeatureSettings: '"cv11", "ss03"', color: 'var(--text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--text-primary)' }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function ProgramBottomCTA({ program }: { program: Program }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Get started"
    >

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', lineHeight: '1.08' }}
        >
          Ready to Get Started?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mb-10"
        >
          <Link href="https://app.apexmetabolichealth.com.au/signup" className="btn-pill">
            Get Started
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-xs leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'var(--text-primary)' }}
        >
          Clinical suitability is assessed by a doctor. All treatments are prescribed by
          AHPRA-registered medical practitioners. We do not name specific medications in compliance
          with TGA guidelines.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page Client ──────────────────────────────────────────────────────────────

const PROGRAM_FAQS = [
  {
    q: 'Do I need a GP referral to start?',
    a: 'No. You register directly through Apex and we issue a pathology referral within the same business day. No existing GP referral needed.',
  },
  {
    q: 'Are your doctors AHPRA-registered?',
    a: 'Yes, unconditionally. Every consultation is conducted by an AHPRA-registered medical practitioner. You can verify any of our doctors directly on the AHPRA national register.',
  },
  {
    q: 'What blood tests are included?',
    a: 'Our panels go well beyond standard GP orders: full hormone profiles, metabolic markers, thyroid function, inflammatory markers, and nutritional status. The full picture needed to build a protocol, not just check for disease.',
  },
  {
    q: 'Where do I get my blood test done?',
    a: 'At any of 4,000+ accredited pathology collection centres across Australia. We send your referral electronically and most results come back within 24–48 hours.',
  },
  {
    q: 'How does ongoing care work?',
    a: "After your initial consultation, you'll have structured clinical reviews every 3 months: a blood panel followed by a telehealth consultation where your doctor reviews results and adjusts your protocol. Script renewal requires a review. It's not a set-and-forget service.",
  },
  {
    q: 'Is this legal in Australia?',
    a: 'Yes. We operate under Australian law with TGA-compliant prescribing and a registered compounding pharmacy partner operating under TGA GMP standards.',
  },
]

export default function ProgramPageClient({ program }: { program: Program }) {
  return (
    <>
      <Nav />
      <main>
        <ProgramHero program={program} />
        <WhatItAddresses program={program} />
        <WhatsIncluded program={program} />
        <HowThisProgramWorks program={program} />
        <DoctorCard />
        <FAQSection faqs={PROGRAM_FAQS} />
        <ProgramBottomCTA program={program} />
      </main>
      <Footer />
    </>
  )
}
