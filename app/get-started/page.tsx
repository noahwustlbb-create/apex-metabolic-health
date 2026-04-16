'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
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
          Every Way to Begin.{' '}
          <span className="text-teal-gradient">Choose Yours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="text-lg leading-relaxed max-w-xl mb-8"
          style={{ color: '#B0B8C5' }}
        >
          Not sure where to start? Book a consultation and speak directly with one of our doctors.
        </motion.p>

        {/* Quick CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-wrap gap-3"
        >
          {[
            { label: 'Start Assessment', href: '/intake/pre-screen', primary: true },
            { label: 'Hormone Consultation', href: '/intake/hormone' },
            { label: 'Performance Consultation', href: '/intake/performance' },
            { label: 'Metabolic Consultation', href: '/intake/metabolic' },
            { label: 'Hair Restoration', href: '/intake/hair' },
            { label: 'Skin Regeneration', href: '/intake/skin' },
            { label: 'Injury Repair', href: '/intake/injury' },
            { label: 'General Check Up', href: '/intake/general' },
            { label: 'Order Blood Panel', href: '/order-bloods' },
            { label: 'Free Discovery Call', href: '/intake/discovery' },
            { label: 'View All Programs', href: '/services' },
          ].map(({ label, href, primary }) => (
            <Link
              key={href}
              href={href}
              className={primary ? 'btn-teal' : 'btn-ghost'}
            >
              {label}
              <span className="btn-circle">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── All Pathways ─────────────────────────────────────────────────────────────

const ALL_PATHWAYS = [
  {
    tag: 'Not Sure Where to Start',
    title: 'Start Assessment',
    desc: 'Answer a few questions. Get matched to the right clinical pathway in under 2 minutes.',
    href: '/assessment',
    cta: 'Start Assessment',
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" strokeLinecap="round"/>
        <path d="M20 20l-3-3M11 8v3l2 2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Quick 2-Min Quiz',
    title: 'Health Assessment Quiz',
    desc: 'Take our short health quiz to understand your symptoms and find the most suitable program.',
    href: '/quiz',
    cta: 'Take the Quiz',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12h6M9 16h4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Hormone & TRT Programs',
    title: 'Get Started Hormone Consult',
    desc: 'Hormone optimisation, TRT, and performance-focused treatment. Advanced blood work first, then your dedicated consultation.',
    href: '/intake/hormone',
    cta: 'Get Started Hormone Consult',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C10.5 2 9.5 3 9.5 4.5V13.5C8 14.3 7 15.8 7 17.5C7 20 9.2 22 12 22C14.8 22 17 20 17 17.5C17 15.8 16 14.3 14.5 13.5V4.5C14.5 3 13.5 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="17.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    tag: 'Weight, Peptides & More',
    title: 'General Check Up',
    desc: 'Metabolic weight loss, injury repair, skin regeneration, hair restoration, and general consultation programs.',
    href: '/intake/general',
    cta: 'Book General Check Up',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" strokeLinecap="round"/>
        <path d="M9 12h6M12 9v6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Speak to Our Team',
    title: 'Free Discovery Call',
    desc: '15 minutes with our clinical team. Understand your options and whether Apex is the right fit — no cost.',
    href: '/intake/discovery',
    cta: 'Book Discovery Call',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.5 4h11a2 2 0 012 2v8a2 2 0 01-2 2H13l-4 4v-4H6.5a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'No GP Referral Needed',
    title: 'Start With Bloods',
    desc: 'Doctor-ordered blood panels issued directly through Apex — collect at any accredited centre near you.',
    href: '/order-bloods',
    cta: 'Order Blood Panel',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 3l-1 6H5l3 8a3 3 0 006 0l3-8h-2L14 3H8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Performance & Recovery',
    title: 'Performance Consultation',
    desc: 'Optimise recovery, strength output, endurance, and mental performance. Advanced panel with IGF-1, cortisol, testosterone and more.',
    href: '/intake/performance',
    cta: 'Start Performance Intake',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Metabolic & Weight Management',
    title: 'Metabolic Consultation',
    desc: 'Comprehensive metabolic panel covering insulin resistance, thyroid, inflammation and fat metabolism markers.',
    href: '/intake/metabolic',
    cta: 'Start Metabolic Intake',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    tag: 'Hair Restoration',
    title: 'Hair Restoration Consultation',
    desc: 'DHT, SHBG, ferritin, thyroid and more. Identify the hormonal and nutritional root causes of hair loss.',
    href: '/intake/hair',
    cta: 'Start Hair Intake',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c0 0-6 4-6 10a6 6 0 0012 0c0-6-6-10-6-10z" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Skin Regeneration',
    title: 'Skin Regeneration Consultation',
    desc: 'Cortisol, DHEA-S, thyroid and inflammatory markers. Address skin ageing, texture and conditions from the inside out.',
    href: '/intake/skin',
    cta: 'Start Skin Intake',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
  },
  {
    tag: 'Injury Repair & Recovery',
    title: 'Injury Repair Consultation',
    desc: 'IGF-1, cortisol, Vit D, CK and inflammatory markers. Understand what\'s slowing your recovery and how to fix it.',
    href: '/intake/injury',
    cta: 'Start Injury Intake',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    tag: 'Explore All Services',
    title: 'View All Programs',
    desc: 'Browse our full range of clinical programs — hormone optimisation, metabolic health, hair, skin, injury and more.',
    href: '/services',
    cta: 'View Programs',
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      </svg>
    ),
  },
]

function AllPathways() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#0d1117' }}
      aria-label="All pathways"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(44,116,232,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="label mb-4">YOUR OPTIONS</p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8', lineHeight: '1.08' }}
            >
              Every way to{' '}
              <span className="text-teal-gradient">get started.</span>
            </h2>
            <p className="text-base md:text-lg" style={{ color: '#8899aa' }}>
              Choose what fits where you&apos;re at right now.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_PATHWAYS.map((path, i) => (
              <motion.div
                key={path.href}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={path.href}
                  className="group flex flex-col h-full p-6 rounded-xl transition-all duration-300"
                  style={{
                    background: path.featured ? 'rgba(44,116,232,0.1)' : '#111820',
                    border: path.featured
                      ? '1px solid rgba(44,116,232,0.4)'
                      : '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-3px)'
                    el.style.borderColor = path.featured
                      ? 'rgba(44,116,232,0.7)'
                      : 'rgba(72,144,247,0.35)'
                    el.style.boxShadow = path.featured
                      ? '0 12px 40px rgba(44,116,232,0.18)'
                      : '0 8px 30px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = path.featured
                      ? 'rgba(44,116,232,0.4)'
                      : 'rgba(255,255,255,0.07)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <p
                    className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-4"
                    style={{ color: path.featured ? '#4890f7' : '#4a5a6a' }}
                  >
                    {path.tag}
                  </p>

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
                    style={{
                      background: path.featured ? 'rgba(44,116,232,0.15)' : 'rgba(255,255,255,0.05)',
                      color: path.featured ? '#4890f7' : '#8899aa',
                    }}
                  >
                    {path.icon}
                  </div>

                  <h3
                    className="text-base font-bold mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                  >
                    {path.title}
                  </h3>

                  <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: '#8899aa' }}>
                    {path.desc}
                  </p>

                  <div
                    className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200"
                    style={{ color: path.featured ? '#4890f7' : '#4a5a6a' }}
                  >
                    <span className="group-hover:text-[#4890f7] transition-colors duration-200">
                      {path.cta}
                    </span>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-[11px] tracking-[0.16em] uppercase mt-10"
            style={{ color: '#4a5a6a' }}
          >
            All consultations conducted by AHPRA-registered medical practitioners · 100% online · Australia-wide
          </motion.p>
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
        <AllPathways />
        <EnquiryForm />
        <TrustStrip />
      </main>
      <Footer />
    </>
  )
}
