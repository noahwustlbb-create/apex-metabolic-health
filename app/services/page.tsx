'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { programs } from '@/lib/programs'
import type { ProgramTrack } from '@/lib/programs'

// ─── Services Hero ────────────────────────────────────────────────────────────

function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#070a0d', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Services hero"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.08) 0%, transparent 60%)',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(72,144,247,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          OUR PROGRAMS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-4xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          Doctor-Led Programs.{' '}
          <span className="text-teal-gradient">Built Around Your Biology.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-2xl"
          style={{ color: '#8899aa' }}
        >
          Every program begins with pathology. Every protocol is built by an AHPRA-registered
          doctor — not a generic plan. Choose the program that fits your goals.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Program Catalogue ────────────────────────────────────────────────────────

type FilterTab = 'all' | ProgramTrack

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: 'All Programs', value: 'all' },
  { label: 'Hormone & Performance', value: 'hormone' },
  { label: 'General Health', value: 'general' },
]

function ProgramCatalogueCard({ program, index }: { program: (typeof programs)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const intakeHref = program.track === 'hormone' ? '/intake/hormone' : '/intake/general'

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="apex-card overflow-hidden flex flex-col group"
      aria-label={program.name}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0" style={{ background: '#070a0d' }}>
        {program.image ? (
          <Image
            src={program.image}
            alt={program.name}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div style={{ background: '#111820', width: '100%', height: '100%' }} />
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 40%)',
          }}
          aria-hidden="true"
        />
        {/* Badge */}
        {program.badge && (
          <span
            className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
            style={{
              background: program.status === 'coming-soon'
                ? 'rgba(30,45,61,0.9)'
                : 'rgba(72,144,247,0.15)',
              border: `1px solid ${program.status === 'coming-soon' ? 'rgba(255,255,255,0.08)' : 'rgba(72,144,247,0.4)'}`,
              color: program.status === 'coming-soon' ? '#8899aa' : '#4890f7',
              backdropFilter: 'blur(4px)',
            }}
          >
            {program.badge}
          </span>
        )}
        {/* Track pill */}
        <span
          className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.18em] uppercase px-2 py-1 rounded-sm"
          style={{
            background: 'rgba(7,10,13,0.75)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#8899aa',
            backdropFilter: 'blur(4px)',
          }}
        >
          {program.track === 'hormone' ? 'Hormone' : 'General'}
        </span>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1">
        <h3
          className="text-xl font-bold mb-1.5 leading-snug"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
        >
          {program.name}
        </h3>
        <p
          className="text-sm mb-4 leading-snug font-medium"
          style={{ color: '#4890f7' }}
        >
          {program.tagline}
        </p>
        <p
          className="text-sm leading-relaxed mb-6 flex-1"
          style={{ color: '#8899aa' }}
        >
          {program.bio.length > 180 ? program.bio.slice(0, 180).trimEnd() + '…' : program.bio}
        </p>

        {/* Includes */}
        <ul className="space-y-2 mb-7">
          {program.includes.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-4 h-4 flex-shrink-0 mt-px"
                aria-hidden="true"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="#4890f7"
                  strokeWidth="1.2"
                  fill="rgba(72,144,247,0.07)"
                />
                <path
                  d="M5 8l2.5 2.5 4-4"
                  stroke="#4890f7"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs leading-relaxed" style={{ color: '#8899aa' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex gap-3">
          {program.status === 'coming-soon' ? (
            <span
              className="btn-ghost w-full text-center opacity-50 cursor-not-allowed"
              aria-disabled="true"
            >
              Coming Soon
            </span>
          ) : (
            <>
              <a href={intakeHref} className="btn-teal flex-1 text-center">
                Get Started
              </a>
              <Link
                href={`/programs/${program.slug}`}
                className="btn-ghost px-4"
                aria-label={`Learn more about ${program.name}`}
              >
                Details
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function ProgramCatalogue() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  const filtered = activeFilter === 'all'
    ? programs
    : programs.filter((p) => p.track === activeFilter)

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#19202c' }}
      aria-label="Program catalogue"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-10 md:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            CHOOSE YOUR PROGRAM
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            Clinical Programs
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter programs by category"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className="text-xs font-semibold tracking-wide uppercase px-4 py-2 rounded-sm transition-all duration-200"
              style={
                activeFilter === tab.value
                  ? {
                      background: '#4890f7',
                      color: '#070a0d',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid #1e2d3d',
                      color: '#8899aa',
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((program, i) => (
              <ProgramCatalogueCard key={program.slug} program={program} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Not sure prompt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-sm mb-4" style={{ color: '#8899aa' }}>
            Not sure which program is right for you?
          </p>
          <Link href="/intake/discovery" className="btn-ghost">
            Book a Free Discovery Call
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── What We Test ─────────────────────────────────────────────────────────────

const HORMONAL_PANEL = [
  'Free & Total Testosterone',
  'Oestradiol (E2)',
  'SHBG',
  'FSH / LH',
  'Prolactin',
  'Thyroid Function — TSH / FT3 / FT4',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Full Blood Count (FBC)',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c',
  'High Sensitivity CRP',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

const WOMENS_PANEL = [
  'Full Blood Count (FBC)',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c + Insulin',
  'Iron Studies',
  'Thyroid Function — TSH / FT3 / FT4',
  'High Sensitivity CRP',
  'Vitamin D',
  'Vitamin B12',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

function WhatWeTest() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const panelsRef = useRef(null)
  const panelsInView = useInView(panelsRef, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="What we test"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            PATHOLOGY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            What We Test
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#8899aa' }}
          >
            Every clinical decision is built on objective pathology data, not guesswork.
          </motion.p>
        </div>

        <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <h3
                className="text-lg font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Hormone Health Panel
              </h3>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                style={{
                  color: '#4890f7',
                  backgroundColor: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.2)',
                }}
              >
                Hormone Programs
              </span>
            </div>
            <ul className="space-y-2 mb-7 flex-1">
              {HORMONAL_PANEL.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#4890f7' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="https://imedical.com.au/order/blood-tests/apexmeta-trt-panel&tracking=69bae136964db"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal w-full text-center text-xs"
            >
              Order Men&apos;s Panel
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-5">
              <h3
                className="text-lg font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
              >
                Metabolic Health Panel
              </h3>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm flex-shrink-0"
                style={{
                  color: '#4890f7',
                  backgroundColor: 'rgba(72,144,247,0.08)',
                  border: '1px solid rgba(72,144,247,0.2)',
                }}
              >
                Metabolic Programs
              </span>
            </div>
            <ul className="space-y-2 mb-7 flex-1">
              {WOMENS_PANEL.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: '#4890f7' }}
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="https://imedical.com.au/order/blood-tests/apex-meta-weightloss&tracking=69bae136964db"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal w-full text-center text-xs"
            >
              Order Metabolic Panel
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={panelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm mt-6"
          style={{ color: '#4a5a6a' }}
        >
          Panels are tailored by your doctor based on your program and clinical history. Additional
          markers may be requested where clinically indicated.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────

function ServicesCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#19202c' }}
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
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
        >
          Ready to Find Out What&apos;s Actually Going On?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: '#8899aa' }}
        >
          Book a discovery call — free, no commitment. Understand your options before you make any
          decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/intake/discovery" className="btn-teal">
            Book a Free Discovery Call
          </Link>
          <Link href="/assessment" className="btn-ghost">
            Get Started
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-sm tracking-wide"
          style={{ color: '#4a5a6a' }}
        >
          AHPRA-Registered Practitioners · 100% Online · Australia-Wide · Private &amp; Confidential
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <ServicesHero />
        <ProgramCatalogue />
        <WhatWeTest />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
