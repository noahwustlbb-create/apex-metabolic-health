'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { programs } from '@/lib/programs'

// ─── Input styles ─────────────────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #1e2d3d',
  color: '#f0f4f8',
  padding: '12px 16px',
  borderRadius: '4px',
  width: '100%',
  outline: 'none',
  fontFamily: 'var(--font-inter)',
  fontSize: '14px',
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function GetStartedHero() {
  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: '#070a0d', paddingTop: '120px' }}
      aria-label="Get started hero"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(0,194,184,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label mb-5"
        >
          GET STARTED
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 max-w-3xl"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.06' }}
        >
          Ready to Take Control of Your Health?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl"
          style={{ color: '#8899aa' }}
        >
          Three ways to begin. Choose what feels right for where you&apos;re at.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Booking Cards ─────────────────────────────────────────────────────────────

function BookingCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Booking options"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A — Free Discovery Call */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
            style={{ border: '1px solid rgba(0,194,184,0.35)' }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: '#00c2b8' }}
            >
              RECOMMENDED START
            </p>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
            >
              Free Discovery Call
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#8899aa' }}>
              Not sure which program is right for you? Talk to our team first. A 15-minute call to
              understand your goals and point you in the right direction. No cost, no commitment.
            </p>
            <a
              href="/intake/discovery"
              data-cta="book-discovery-call"
              className="btn-teal w-full block text-center"
            >
              Book a Discovery Call
            </a>
          </motion.div>

          {/* Card B — Hormone Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="mb-4 opacity-0 text-[10px]" aria-hidden="true">
              SPACER
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
            >
              Hormone Consultation
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#8899aa' }}>
              Ready to get your bloods done and meet with a doctor. For patients pursuing hormone
              optimisation or performance programs.
            </p>
            <a
              href="/intake/hormone"
              data-cta="book-hormone-consult"
              className="btn-ghost w-full block text-center"
            >
              Book Hormone Consult
            </a>
          </motion.div>

          {/* Card C — General Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="mb-4 opacity-0 text-[10px]" aria-hidden="true">
              SPACER
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
            >
              General Consultation
            </h3>
            <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: '#8899aa' }}>
              For weight management, peptide programs, medical certificates, or a general health
              check-in with one of our doctors.
            </p>
            <a
              href="/intake/general"
              data-cta="book-general-consult"
              className="btn-ghost w-full block text-center"
            >
              Book General Consult
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Enquiry Form ─────────────────────────────────────────────────────────────

function EnquiryForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="Enquiry form"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <div ref={ref} className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <p className="label mb-4">SEND AN ENQUIRY</p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
            >
              Prefer to reach out directly?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#8899aa' }}>
              Fill out the form below and we&apos;ll get back to you within 1 business day.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5"
            noValidate
          >
            {/* Name + Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: '#8899aa' }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: '#8899aa' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                />
              </div>
            </div>

            {/* Phone + Program row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: '#8899aa' }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+61 4xx xxx xxx"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: '#8899aa' }}
                >
                  Program of Interest
                </label>
                <select
                  name="program"
                  style={{ ...inputBase, cursor: 'pointer' }}
                  defaultValue=""
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
                >
                  <option value="" disabled style={{ color: '#4a5a6a' }}>
                    Select a program
                  </option>
                  {programs.map((p) => (
                    <option
                      key={p.slug}
                      value={p.slug}
                      style={{ background: '#0d1117', color: '#f0f4f8' }}
                    >
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* How did you hear */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: '#8899aa' }}
              >
                How did you hear about us?
              </label>
              <select
                name="referral"
                style={{ ...inputBase, cursor: 'pointer' }}
                defaultValue=""
                onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
              >
                <option value="" disabled style={{ color: '#4a5a6a' }}>
                  Select an option
                </option>
                {[
                  'Google Search',
                  'Social Media',
                  'Referral from a friend',
                  'GP or medical referral',
                  'Other',
                ].map((option) => (
                  <option
                    key={option}
                    value={option}
                    style={{ background: '#0d1117', color: '#f0f4f8' }}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: '#8899aa' }}
              >
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us what you're experiencing or what you'd like to achieve..."
                style={{ ...inputBase, resize: 'vertical' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#00c2b8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1e2d3d')}
              />
            </div>

            <button type="submit" className="btn-teal w-full md:w-auto px-12">
              Send Enquiry
            </button>

            <p className="text-xs" style={{ color: '#4a5a6a' }}>
              We respond within 1 business day. Your information is kept strictly private.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

// ─── Trust Strip ──────────────────────────────────────────────────────────────

function TrustStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const TRUST_ITEMS = [
    'AHPRA-Registered Practitioners',
    '100% Online · Australia-Wide',
    'Private & Confidential',
    'No GP Referral Required',
  ]

  return (
    <section
      ref={ref}
      className="relative py-14 overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Trust signals"
    >
      <div className="glow-rule" aria-hidden="true" />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {TRUST_ITEMS.map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#00c2b8" strokeWidth="1.2" fill="rgba(0,194,184,0.07)" />
                <path d="M5 8l2.5 2.5 4-4" stroke="#00c2b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm font-semibold tracking-wide" style={{ color: '#f0f4f8' }}>
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
  return (
    <>
      <Nav />
      <main>
        <GetStartedHero />
        <BookingCards />
        <EnquiryForm />
        <TrustStrip />
      </main>
      <Footer />
    </>
  )
}
