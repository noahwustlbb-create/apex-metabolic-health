'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

// ─── Hero ─────────────────────────────────────────────────────────────────────

function PricingHero() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', paddingTop: '140px', paddingBottom: '80px' }}
      aria-label="Pricing hero"
    >
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.08) 0%, transparent 60%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease }} className="label mb-5">
          Pricing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease }}
          className="display-serif mb-5"
          style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', maxWidth: '780px' }}
        >
          Simple. Transparent.{' '}
          <span style={{ color: '#4890f7' }}>Nothing forced.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          style={{ color: 'var(--text-primary)', maxWidth: '480px', fontSize: '15px', lineHeight: 1.75, marginBottom: '2rem' }}
        >
          Every number published upfront. Member or single consult — compare and decide before you start.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {['No hidden fees', 'No lock-in contracts', 'AHPRA-registered doctors'].map(t => (
            <span key={t} className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--text-primary)' }}>
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#4890f7' }} />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Membership vs Single Consultation ───────────────────────────────────────

const COMPARISON_ROWS = [
  { label: 'Initial Blood Panel',   member: 'From $99',   single: 'From $99'    },
  { label: 'Hormone Consultation',  member: '$275',        single: '$275'        },
  { label: 'Peptide Consultation',  member: '$125',        single: '$125'        },
  { label: 'Monthly Membership',    member: '$99 /mo',     single: '—'           },
  { label: 'Medication',            member: 'Cost price',  single: 'Cost + fee'  },
  { label: 'Prescribing Fee',       member: 'Waived',      single: '$125'        },
  { label: 'Follow-up Bloods',      member: 'Discounted',  single: 'Standard'    },
  { label: 'Referrals & Certs',     member: 'Free',        single: 'Standard'    },
]

function MembershipComparison() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const accent = '#4890f7'
  const memberHighlight = new Set(['Cost price', 'Waived', 'Free', 'Discounted', '$99 /mo'])

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--bg)' }} aria-label="Choose your path">
      <div className="warm-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">

        <div className="mb-12 text-center max-w-2xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            Choose Your Path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif"
            style={{ fontSize: 'clamp(26px, 3.5vw, 46px)' }}
          >
            Ongoing program vs.{' '}
            <span style={{ color: accent }}>script only.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.16, ease }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto"
        >

          {/* ── Single Consult Card ── */}
          <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(72,144,247,0.1)', background: 'var(--surface)' }}
          >
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
              <p style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '13px', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                color: 'var(--text-primary)', opacity: 0.45, marginBottom: '4px',
              }}>Single Consult</p>
              <p style={{ fontSize: '12px', color: 'var(--text-primary)', opacity: 0.28 }}>
                Once-off · No subscription
              </p>
            </div>

            <div className="flex flex-col flex-1">
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between px-6 py-3.5"
                  style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? '1px solid rgba(72,144,247,0.05)' : 'none' }}
                >
                  <span style={{
                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase' as const, color: 'var(--text-primary)', opacity: 0.35,
                  }}>{row.label}</span>
                  <span style={{
                    fontFamily: 'var(--font-space-grotesk)', fontSize: '15px', fontWeight: 700,
                    color: row.single === '—' ? 'rgba(255,255,255,0.1)' : 'var(--text-primary)',
                    opacity: row.single === '—' ? 1 : 0.48,
                  }}>{row.single}</span>
                </div>
              ))}
            </div>

            <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(72,144,247,0.07)' }}>
              <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>Average initial investment</p>
                <p className="text-base font-bold mt-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>$350 – $650</p>
                <p className="text-[10px] mt-1 leading-snug" style={{ color: 'var(--text-primary)', opacity: 0.38 }}>Consultation + pathology + AHI prescribing fee</p>
              </div>
              <Link
                href="/intake/pre-screen"
                className="flex items-center justify-center w-full py-3.5 rounded-lg text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-200"
                style={{ border: '1px solid rgba(72,144,247,0.18)', color: 'var(--text-primary)', opacity: 0.55 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.55'; e.currentTarget.style.borderColor = 'rgba(72,144,247,0.18)' }}
              >
                Single Consult
              </Link>
            </div>
          </div>

          {/* ── Member Card (featured) ── */}
          <div
            className="flex flex-col rounded-2xl overflow-hidden relative"
            style={{
              border: `1px solid ${accent}`,
              background: 'var(--surface)',
              boxShadow: '0 0 80px rgba(72,144,247,0.14)',
            }}
          >
            {/* Recommended badge */}
            <div style={{
              position: 'absolute', top: 0, right: 20,
              background: accent, borderRadius: '0 0 6px 6px',
              padding: '4px 12px',
              fontFamily: 'var(--font-space-grotesk)', fontSize: '9px',
              fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#fff',
            }}>
              Recommended
            </div>

            <div className="px-6 py-5" style={{ borderBottom: `1px solid rgba(72,144,247,0.18)` }}>
              <p style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '13px', fontWeight: 800,
                letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: accent, marginBottom: '4px',
              }}>Apex Member</p>
              <p style={{ fontSize: '12px', color: 'var(--text-primary)', opacity: 0.4 }}>
                Ongoing program · Cancel anytime
              </p>
            </div>

            <div className="flex flex-col flex-1">
              {COMPARISON_ROWS.map((row, i) => {
                const isAdvantage = memberHighlight.has(row.member)
                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-6 py-3.5"
                    style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? `1px solid rgba(72,144,247,0.08)` : 'none' }}
                  >
                    <span style={{
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
                      textTransform: 'uppercase' as const, color: 'var(--text-primary)', opacity: 0.4,
                    }}>{row.label}</span>
                    <span
                      className="flex items-center gap-1.5"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)', fontSize: '15px', fontWeight: 700,
                        color: isAdvantage ? accent : 'var(--text-primary)',
                      }}
                    >
                      {isAdvantage && (
                        <svg viewBox="0 0 12 12" fill="none" width="11" height="11" aria-hidden="true">
                          <circle cx="6" cy="6" r="5.5" fill="rgba(72,144,247,0.15)" stroke={accent} strokeWidth="0.8" />
                          <path d="M3.5 6l2 2 3-3.5" stroke={accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {row.member}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="px-6 py-5" style={{ borderTop: `1px solid rgba(72,144,247,0.18)` }}>
              <Link
                href="/intake/hormone-consult"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-[11px] font-bold tracking-[0.1em] uppercase transition-all duration-200"
                style={{ background: accent, color: '#ffffff', boxShadow: '0 4px 20px rgba(72,144,247,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5fa0ff'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(72,144,247,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.boxShadow = '0 4px 20px rgba(72,144,247,0.35)' }}
              >
                Get Started
                <svg viewBox="0 0 14 14" fill="none" width="12" height="12" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[11px] leading-relaxed"
          style={{ color: 'var(--text-primary)', opacity: 0.28, maxWidth: 520, margin: '20px auto 0' }}
        >
          Membership activates after your initial consultation, where clinically appropriate. No lock-in contracts.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Member Savings Guide ────────────────────────────────────────────────────

const SAVINGS_ROWS = [
  { label: 'Prescribing fees',       saving: 'Up to $500',  period: '/yr', detail: '3–5 scripts × $125, waived entirely as a member' },
  { label: 'Medication mark-ups',    saving: '$600–$1,200', period: '/yr', detail: 'Zero AHI fees — you pay pharmacy cost price direct' },
  { label: 'Follow-up blood panels', saving: '~$120',       period: '/yr', detail: 'Discounted member rate on all repeat blood panels' },
]

function MemberSavings() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const accent = '#4890f7'

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--surface)', paddingTop: '80px', paddingBottom: '80px' }}
      aria-label="Membership savings guide"
    >
      <div className="warm-rule" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="container-tight relative z-10">

        <div className="max-w-2xl mx-auto text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
            className="label mb-4"
          >
            Is Membership Worth It?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.08, ease }}
            className="display-serif"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)' }}
          >
            The average Apex patient on protocol has:
          </motion.h2>
        </div>

        {/* Typical usage stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15, ease }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10"
        >
          {[
            { value: '2–4', label: 'Doctor consultations per year' },
            { value: '2–3', label: 'Blood panels per year' },
            { value: '12+', label: 'Months of ongoing treatment' },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center py-6 px-4 rounded-xl text-center"
              style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}
            >
              <span style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '38px', fontWeight: 800,
                color: accent, lineHeight: 1,
              }}>
                {value}
              </span>
              <span style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                color: 'var(--text-primary)', opacity: 0.4, marginTop: '8px',
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm mb-8"
          style={{ color: 'var(--text-primary)', opacity: 0.45 }}
        >
          If that&apos;s you, here&apos;s what membership saves you annually vs. the single consult path:
        </motion.p>

        {/* Savings breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35, ease }}
          className="max-w-2xl mx-auto overflow-hidden"
          style={{ border: '1px solid rgba(72,144,247,0.12)', borderRadius: '16px', background: 'var(--bg)' }}
        >
          {SAVINGS_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(72,144,247,0.06)' }}
            >
              <div className="min-w-0 pr-4">
                <p style={{
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                  color: 'var(--text-primary)', opacity: 0.5, marginBottom: '3px',
                }}>
                  {row.label}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-primary)', opacity: 0.28 }}>
                  {row.detail}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <span style={{
                  fontFamily: 'var(--font-space-grotesk)', fontSize: '20px', fontWeight: 800, color: accent,
                }}>
                  {row.saving}
                </span>
                <span style={{
                  fontFamily: 'var(--font-space-grotesk)', fontSize: '12px', fontWeight: 600, color: accent, opacity: 0.65,
                }}>
                  {row.period}
                </span>
              </div>
            </div>
          ))}

          {/* Total row */}
          <div
            className="flex items-center justify-between px-6 py-6"
            style={{ background: 'rgba(72,144,247,0.05)', borderTop: '1px solid rgba(72,144,247,0.16)' }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-primary)', opacity: 0.55,
              }}>
                Typical annual saving
              </p>
              <p style={{ fontSize: '11px', color: 'var(--text-primary)', opacity: 0.28, marginTop: '3px' }}>
                vs. single consult path · individual results vary
              </p>
            </div>
            <div className="text-right flex-shrink-0 ml-6">
              <p style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '30px', fontWeight: 800,
                color: accent, lineHeight: 1,
              }}>
                $1,000–$1,800
              </p>
              <p style={{
                fontFamily: 'var(--font-space-grotesk)', fontSize: '11px', fontWeight: 600,
                color: accent, opacity: 0.6, marginTop: '3px',
              }}>
                per year
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-[11px] mt-5"
          style={{ color: 'var(--text-primary)', opacity: 0.28 }}
        >
          Membership: $99/mo ($1,188/yr). At 3+ medication invoices, the saving pays for itself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6, ease }}
          className="flex justify-center mt-8"
        >
          <Link
            href="/intake/hormone-consult"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-200"
            style={{ background: accent, color: '#ffffff', boxShadow: '0 4px 20px rgba(72,144,247,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5fa0ff'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(72,144,247,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = accent; e.currentTarget.style.boxShadow = '0 4px 20px rgba(72,144,247,0.3)' }}
          >
            Become a Member
            <svg viewBox="0 0 14 14" fill="none" width="12" height="12" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

// ─── Program Pathways (accordion) ────────────────────────────────────────────

type PathwayStep = {
  label: string
  body: string
  price?: string
  priceNote?: string
  includes?: string[]
  options?: { label: string; detail: string }[]
}

type Pathway = {
  id: string
  title: string
  tag: 'Apex Member' | 'Single Consult'
  steps: PathwayStep[]
}

const PATHWAYS: Pathway[] = [
  {
    id: 'hormone-member',
    title: 'Hormone Optimisation',
    tag: 'Apex Member',
    steps: [
      {
        label: 'Intake',
        body: 'Complete the hormone consult intake form online — takes 8–10 minutes. Our clinical team reviews your submission before your consultation is scheduled.',
      },
      {
        label: 'Blood Panel',
        body: 'Doctor-issued referral — no GP required. Collected fasted before 9am at any accredited pathology centre. Results reviewed directly by your Apex doctor.',
        price: 'From $99',
        priceNote: 'Discounted for members',
      },
      {
        label: 'Hormone Consultation',
        body: 'Full telehealth review of your pathology, clinical history, and goals. Your doctor builds a personalised protocol and prescribes where clinically appropriate.',
        price: '$275',
        priceNote: 'Initial consultation',
      },
      {
        label: 'Ongoing Protocol',
        body: 'Apex Membership activates post-consultation, where clinically appropriate. Your protocol evolves with your results — reviewed every cycle.',
        price: '$99 /mo',
        priceNote: 'No lock-in contracts',
        includes: [
          'Zero medication mark-ups — pharmacy cost price direct',
          'Prescribing fee waived — scripts issued at no charge',
          'Discounted follow-up consultations and review blood panels',
          'Nursing team check-ins every 6–8 weeks',
          'Free referrals, medical certificates, and health summaries',
          'Priority clinical support between reviews',
        ],
      },
    ],
  },
  {
    id: 'hormone-single',
    title: 'Hormone Optimisation',
    tag: 'Single Consult',
    steps: [
      {
        label: 'Intake',
        body: 'Complete the hormone consult intake form. Our clinical team reviews your submission before your consultation is scheduled.',
      },
      {
        label: 'Blood Panel',
        body: 'Doctor-issued referral. Collected fasted before 9am at any accredited pathology centre. Results reviewed by your Apex doctor.',
        price: 'From $99',
        priceNote: 'Standard pricing',
      },
      {
        label: 'Hormone Consultation',
        body: 'Full telehealth review of your results and clinical history. Personalised treatment plan issued where clinically appropriate.',
        price: '$275',
        priceNote: 'Initial consultation',
      },
      {
        label: 'Treatment Options',
        body: 'At the conclusion of your consultation, choose how to proceed with your prescription.',
        options: [
          {
            label: 'Partner Pharmacy',
            detail: 'You pay the pharmacy cost price for medication. An Administration, Handling & Infrastructure (AHI) fee from $50 per invoice covers file management, dosing guidance, and safety checks.',
          },
          {
            label: 'Own Pharmacy — Script Release',
            detail: '$125 prescribing fee. Prescription, treatment plan, and dosing guides sent directly to you. Ongoing nursing support included. Note: excludes NSW patients.',
          },
        ],
      },
    ],
  },
  {
    id: 'weight-member',
    title: 'Weight Loss & Metabolic',
    tag: 'Apex Member',
    steps: [
      {
        label: 'Intake',
        body: 'Complete the metabolic health intake form online. Our clinical team reviews your submission before your consultation.',
      },
      {
        label: 'Blood Panel',
        body: 'Doctor-issued referral matched to your metabolic pathway. No GP required. Collected at any accredited pathology centre.',
        price: 'From $99',
        priceNote: 'Discounted for members',
      },
      {
        label: 'Peptide Consultation',
        body: 'Telehealth review of your metabolic health profile, results, and goals. Treatment plan built where clinically appropriate.',
        price: '$125',
        priceNote: 'Initial consultation',
      },
      {
        label: 'Ongoing Protocol',
        body: 'Apex Membership activates post-consultation where clinically appropriate.',
        price: '$99 /mo',
        priceNote: 'No lock-in contracts',
        includes: [
          'Zero medication mark-ups — pharmacy cost price direct',
          'Prescribing fee waived',
          'Discounted follow-up consultations and review bloods',
          'Nursing team support throughout your protocol',
          'Free referrals, medical certificates, and health summaries',
        ],
      },
    ],
  },
  {
    id: 'weight-single',
    title: 'Weight Loss & Metabolic',
    tag: 'Single Consult',
    steps: [
      {
        label: 'Intake',
        body: 'Complete the metabolic health intake form. Our clinical team reviews before your consultation.',
      },
      {
        label: 'Blood Panel',
        body: 'Doctor-issued referral. Collected at any accredited pathology centre. Results reviewed by your Apex doctor.',
        price: 'From $99',
        priceNote: 'Standard pricing',
      },
      {
        label: 'Peptide Consultation',
        body: 'Telehealth review of your metabolic health and goals. Treatment plan issued where clinically appropriate.',
        price: '$125',
        priceNote: 'Initial consultation',
      },
      {
        label: 'Treatment Options',
        body: 'Choose how to proceed with your prescription after consultation.',
        options: [
          {
            label: 'Partner Pharmacy',
            detail: 'Pharmacy cost price for medication. AHI fee from $50 per invoice covers ongoing management, guidance, and safety checks.',
          },
          {
            label: 'Own Pharmacy — Script Release',
            detail: '$125 prescribing fee. Prescription, treatment plan, and dosing guides sent directly to you.',
          },
        ],
      },
    ],
  },
]

function AccordionItem({ pathway }: { pathway: Pathway }) {
  const [open, setOpen] = useState(false)
  const accent = '#4890f7'
  const isMember = pathway.tag === 'Apex Member'

  return (
    <div
      className="rounded-xl overflow-hidden mb-2"
      style={{
        border: open
          ? `1px solid ${isMember ? 'rgba(72,144,247,0.3)' : 'rgba(72,144,247,0.12)'}`
          : `1px solid ${isMember ? 'rgba(72,144,247,0.18)' : 'rgba(72,144,247,0.08)'}`,
        background: open
          ? (isMember ? 'rgba(72,144,247,0.04)' : 'var(--bg)')
          : 'var(--bg)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className="flex-shrink-0 px-3 py-1.5 rounded text-[11px] font-bold tracking-[0.1em] uppercase"
            style={{
              background: isMember ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.05)',
              color: isMember ? accent : 'var(--text-primary)',
              border: `1px solid ${isMember ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.14)'}`,
              opacity: isMember ? 1 : 0.8,
              minWidth: '120px',
              textAlign: 'center',
            }}
          >
            {pathway.tag}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-primary)', opacity: 0.5 }}>
            {isMember ? 'Ongoing program · $99/mo membership' : 'Once-off · Script release available'}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0 ml-4">
          <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke={open ? accent : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: open ? 1 : 0.35 }} />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-8" style={{ borderTop: '1px solid rgba(72,144,247,0.06)' }}>
              {pathway.steps.map((step, i) => (
                <div
                  key={step.label}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-5"
                  style={{ borderBottom: i < pathway.steps.length - 1 ? '1px solid rgba(72,144,247,0.05)' : 'none' }}
                >
                  {/* Left — step number + content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: accent, fontFamily: 'var(--font-space-grotesk)' }}>{i + 1}</span>
                      </div>
                      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                        {step.label}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55, paddingLeft: '29px' }}>
                      {step.body}
                    </p>

                    {step.options && (
                      <div className="mt-4 flex flex-col gap-2.5" style={{ paddingLeft: '29px' }}>
                        {step.options.map(opt => (
                          <div key={opt.label} className="p-4 rounded-xl" style={{ background: 'rgba(72,144,247,0.03)', border: '1px solid rgba(72,144,247,0.1)' }}>
                            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '6px' }}>
                              {opt.label}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                              {opt.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.includes && (
                      <ul className="mt-4 flex flex-col gap-2" style={{ paddingLeft: '29px' }}>
                        {step.includes.map(item => (
                          <li key={item} className="flex items-start gap-2.5">
                            <svg viewBox="0 0 12 12" fill="none" className="flex-shrink-0" style={{ width: 12, height: 12, marginTop: '3px' }} aria-hidden="true">
                              <circle cx="6" cy="6" r="5.5" stroke={accent} strokeWidth="0.8" fill="rgba(72,144,247,0.06)" />
                              <path d="M3.5 6l2 2 3-3.5" stroke={accent} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right — price */}
                  {step.price && (
                    <div className="flex-shrink-0 sm:text-right" style={{ minWidth: '100px' }}>
                      <p style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '20px',
                        fontWeight: 700,
                        lineHeight: 1,
                        color: (isMember && step.price.includes('/mo')) ? accent : 'var(--text-primary)',
                      }}>
                        {step.price}
                      </p>
                      {step.priceNote && (
                        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', opacity: 0.3, marginTop: '4px' }}>
                          {step.priceNote}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProgramPathways() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const accent = '#4890f7'

  const programGroups = PATHWAYS.reduce<Record<string, Pathway[]>>((acc, p) => {
    if (!acc[p.title]) acc[p.title] = []
    acc[p.title].push(p)
    return acc
  }, {})

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="Program pathways">
      <div className="warm-rule" aria-hidden="true" />
      <div ref={ref} className="container-tight relative z-10">

        <div className="mb-10">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="label mb-4">
            Program Pathways
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="display-serif"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            Step-by-step,{' '}
            <span style={{ color: accent }}>by program.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col gap-10"
        >
          {Object.entries(programGroups).map(([title, pathways], groupIndex) => (
            <div key={title}>
              <div
                className="flex items-center gap-4 mb-4"
                style={{ paddingBottom: '14px', borderBottom: '1px solid rgba(72,144,247,0.14)' }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {title}
                </h3>
                <span style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  color: 'var(--text-primary)', opacity: 0.3,
                }}>
                  {pathways.length} pathways
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {pathways.map(pathway => (
                  <AccordionItem key={pathway.id} pathway={pathway} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <p className="text-[10px] mt-8" style={{ color: 'var(--text-primary)', opacity: 0.25 }}>
          Script release excludes NSW patients. All treatment subject to clinical appropriateness.
        </p>
      </div>
    </section>
  )
}

// ─── What's NOT Included ──────────────────────────────────────────────────────

const NOT_INCLUDED = [
  {
    label: 'Discovery call fees',
    detail: 'No discovery call. Complete the assessment — your doctor contacts you directly.',
  },
  {
    label: 'Surprise admin charges',
    detail: 'Clinical support is part of membership. No bolt-ons.',
  },
  {
    label: 'Lock-in contracts',
    detail: 'No lock-in. 4-monthly reviews are clinical, not commercial.',
  },
  {
    label: 'Bundled packages',
    detail: 'No bundles. You pay for what your protocol requires — nothing else.',
  },
  {
    label: 'Outcome guarantees',
    detail: 'No clinic can guarantee outcomes. We won\'t. What we guarantee is clinical rigour.',
  },
]

function NotIncluded() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative section-pad overflow-hidden" style={{ backgroundColor: 'var(--surface)' }} aria-label="What's not included">
      <div className="warm-rule" aria-hidden="true" />

      <div ref={ref} className="container-tight relative z-10">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="label mb-4">
            Transparency
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-serif mb-3"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            What&apos;s NOT included.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18 }}
            className="text-sm leading-relaxed mb-10" style={{ color: 'var(--text-primary)' }}>
            Most clinics hide fees until you&apos;re committed. We&apos;d rather tell you what you won&apos;t be paying for.
          </motion.p>

          <div className="flex flex-col" style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}>
            {NOT_INCLUDED.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease }}
                className="flex items-start gap-4 py-4"
                style={{ borderBottom: '1px solid rgba(72,144,247,0.07)' }}
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.2)' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(220,50,50,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-semibold mr-2" style={{ color: 'var(--text-primary)' }}>{item.label}.</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{item.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function PricingCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4890f7 55%, #6ba8ff 100%)' }}
      aria-label="Get started"
    >
      <div className="absolute inset-0 dot-grid opacity-30" style={{ filter: 'invert(1)' }} aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 70%)' }}
      />

      <div className="container-tight relative z-10 text-center">
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', color: '#ffffff', marginBottom: '1rem' }}>
          Know the cost.{' '}
          <span style={{ color: 'rgba(255,255,255,0.45)' }}>Start when you&apos;re ready.</span>
        </motion.h2>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.18, ease }} className="flex flex-col items-center gap-3">
          <Link href="/intake/pre-screen" className="btn-white" style={{ fontSize: '14px', padding: '16px 32px' }}>
            Start your clinical assessment
            <svg viewBox="0 0 16 16" fill="none" width="15" height="15" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Takes 60 seconds. No commitment.</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs mt-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
          All consultations conducted by AHPRA-registered practitioners. Treatment only where clinically appropriate. Pricing subject to change — confirm at time of booking.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingHero />
        <MembershipComparison />
        <MemberSavings />
        <ProgramPathways />
        <NotIncluded />
        <PricingCTA />
      </main>
      <Footer />
    </>
  )
}
