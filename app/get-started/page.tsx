'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BookingOptions from '@/components/BookingOptions'
import { programs } from '@/lib/programs'

// ─── Input styles ─────────────────────────────────────────────────────────────

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

const inputBase: React.CSSProperties = {
  background: '#19202c',
  border: '1px solid rgba(255,255,255,0.08)',
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
      style={{ backgroundColor: '#0c131f', paddingTop: '120px' }}
      aria-label="Get started hero"
    >
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(44,116,232,0.07) 0%, transparent 60%)',
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
          style={{ fontFamily: 'var(--font-space-grotesk)', color: '#F4F4F6', lineHeight: '1.06' }}
        >
          Four Ways to Begin.{' '}
          <span className="text-teal-gradient">Choose Yours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mb-8"
          style={{ color: '#B0B8C5' }}
        >
          Not sure where to start? Take the quiz and find your program in 2 minutes. Or jump straight in.
        </motion.p>

        {/* Quick CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-wrap gap-3"
        >
          <Link href="/assessment" className="btn-teal">
            Find My Program
            <span className="btn-circle">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <Link href="/intake/discovery" className="btn-ghost">
            Free Discovery Call
            <span className="btn-circle">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </motion.div>
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
      style={{ backgroundColor: '#151c28' }}
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
            style={{ border: '1px solid rgba(44,116,232,0.35)' }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: '#2C74E8' }}
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
              Unsure which program fits? A 15-minute call with our team. No cost.
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
              For hormone or performance programs. Blood work first, then your consultation.
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
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const data = new FormData(e.currentTarget)
    data.append('access_key', WEB3FORMS_KEY)
    data.append('subject', 'New Enquiry — Apex Metabolic Health')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) { setSubmitted(true) } else { setError('Something went wrong. Please try again.') }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0c131f' }}
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
              Send a Direct Enquiry
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#8899aa' }}>
              Fill out the form below and we&apos;ll get back to you within 1 business day.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-lg text-center"
              style={{ background: 'rgba(44,116,232,0.08)', border: '1px solid rgba(44,116,232,0.2)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 mx-auto mb-4" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="#2C74E8" strokeWidth="1.5"/>
                <path d="M7.5 12l3 3 5-5" stroke="#2C74E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>Enquiry Received</h3>
              <p className="text-sm" style={{ color: '#8899aa' }}>We&apos;ll be in touch within 1 business day.</p>
            </motion.div>
          ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                >
                  <option value="" disabled style={{ color: '#8299b0' }}>
                    Select a program
                  </option>
                  {programs.map((p) => (
                    <option
                      key={p.slug}
                      value={p.slug}
                      style={{ background: '#ffffff', color: '#f0f4f8' }}
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
                onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              >
                <option value="" disabled style={{ color: '#8299b0' }}>
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
                    style={{ background: '#ffffff', color: '#f0f4f8' }}
                  >
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="referralDetail"
                placeholder="Please specify (optional)"
                style={{ ...inputBase, marginTop: '8px' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#3575C6')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
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
                onFocus={(e) => (e.currentTarget.style.borderColor = '#2C74E8')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>

            <button type="submit" className="btn-teal w-full md:w-auto px-12" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Sending…' : 'Send Enquiry'}
            </button>

            {error && <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>}

            <p className="text-xs" style={{ color: '#8299b0' }}>
              We respond within 1 business day. Your information is kept strictly private.
            </p>
          </motion.form>
          )}
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
      style={{ backgroundColor: '#0d1840' }}
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
                <circle cx="8" cy="8" r="7" stroke="#2C74E8" strokeWidth="1.2" fill="rgba(44,116,232,0.07)" />
                <path d="M5 8l2.5 2.5 4-4" stroke="#2C74E8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
        <BookingOptions
          eyebrow="YOUR OPTIONS"
          heading="Four Ways to Begin. Choose Yours."
          subheading="Choose what feels right for where you're at."
        />
        <EnquiryForm />
        <TrustStrip />
      </main>
      <Footer />
    </>
  )
}
