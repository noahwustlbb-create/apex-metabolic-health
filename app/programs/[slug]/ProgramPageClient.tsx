'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Program } from '@/lib/programs'

// ─── Program Hero ─────────────────────────────────────────────────────────────

function ProgramHero({ program }: { program: Program }) {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#070a0d', paddingTop: '120px' }}
      aria-label="Program hero"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      {/* Glow — top left */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(43,123,224,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Glow — bottom right */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 100%, rgba(43,123,224,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="glow-rule" aria-hidden="true" />

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
                          color: '#2b7be0',
                          backgroundColor: 'rgba(43,123,224,0.1)',
                          border: '1px solid rgba(43,123,224,0.25)',
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
              className="label mb-5"
            >
              CLINICAL PROGRAM
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
            >
              {program.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-xl font-medium mb-6 max-w-2xl"
              style={{ color: '#8899aa' }}
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
                style={{ color: '#2b7be0' }}
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
                <a href="/intake/hormone" className="btn-ghost">
                  Join the Waitlist
                </a>
              ) : (
                <Link href={program.track === 'hormone' ? '/intake/hormone' : '/intake/general'} className="btn-teal">
                  {program.ctaLabel}
                </Link>
              )}
            </motion.div>
          </div>

          {/* Hero image */}
          {program.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden hidden lg:block"
              style={{ border: '1px solid #1e2d3d' }}
            >
              <Image
                src={program.image}
                alt={program.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(43,123,224,0.08) 0%, transparent 60%)' }}
              />
            </motion.div>
          )}
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
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="What this program addresses"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            WHAT WE TREAT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
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
              style={{ borderBottom: '1px solid #1e2d3d' }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <circle cx="10" cy="10" r="9" stroke="#2b7be0" strokeWidth="1.5" fill="rgba(43,123,224,0.07)" />
                <path d="M6 10l3 3 5-5" stroke="#2b7be0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
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
      style={{ backgroundColor: '#070a0d' }}
      aria-label="What's included"
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
        <div ref={headingRef} className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            PROGRAM INCLUDES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
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
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#2b7be0' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
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
      style={{ backgroundColor: '#0d1117' }}
      aria-label="How this program works"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="mb-16 md:mb-20">
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
            How This Program Works
          </motion.h2>
        </div>

        {/* Vertical timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{ backgroundColor: 'rgba(43,123,224,0.1)' }}
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
                      backgroundColor: '#0d1117',
                      border: '1px solid rgba(43,123,224,0.3)',
                    }}
                  >
                    <span
                      className="font-bold"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '20px',
                        color: '#2b7be0',
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
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: '#8899aa' }}>
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
      style={{ backgroundColor: '#070a0d' }}
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

      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

      <div className="container-tight relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
        >
          Ready to Get Started?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mb-10"
        >
          <Link href={program.track === 'hormone' ? '/intake/hormone' : '/intake/general'} className="btn-teal">
            Book a Consultation
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="text-xs leading-relaxed max-w-2xl mx-auto"
          style={{ color: '#4a5a6a' }}
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

export default function ProgramPageClient({ program }: { program: Program }) {
  return (
    <>
      <Nav />
      <main>
        <ProgramHero program={program} />
        <WhatItAddresses program={program} />
        <WhatsIncluded program={program} />
        <HowThisProgramWorks program={program} />
        <ProgramBottomCTA program={program} />
      </main>
      <Footer />
    </>
  )
}
