'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const AHPRA_NUMBER = 'MED0001201298'
const AHPRA_URL = `https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx?q=${AHPRA_NUMBER}`
const LEGITSCRIPT_URL = 'https://www.legitscript.com/websites/?checker_keywords=apexmetabolichealth.com.au'

/**
 * The verification ledger. Every row is an auditable claim paired with the
 * third party that can confirm it. Rows only exist when the proof is real:
 * the reviews row stays dormant until the Google Business Profile holds
 * 10+ reviews (see REVIEWS_LIVE below) - no fake proof, ever.
 */
const REVIEWS_LIVE = false // flip when Google Business Profile has ≥10 reviews
const GOOGLE_REVIEWS_URL = '' // set alongside REVIEWS_LIVE

interface LedgerRow {
  claim: string
  detail: string
  verifyLabel: string
  destination: string
  href: string
}

const LEDGER: LedgerRow[] = [
  {
    claim: 'AHPRA-registered practitioners',
    detail: AHPRA_NUMBER,
    verifyLabel: 'Check the public register',
    destination: 'opens ahpra.gov.au',
    href: AHPRA_URL,
  },
  {
    claim: 'LegitScript-certified healthcare merchant',
    detail: 'apexmetabolichealth.com.au',
    verifyLabel: 'Verify certification',
    destination: 'opens legitscript.com',
    href: LEGITSCRIPT_URL,
  },
  ...(REVIEWS_LIVE
    ? [{
        claim: 'Patient reviews, published unedited',
        detail: 'Google Business Profile',
        verifyLabel: 'Read patient reviews',
        destination: 'opens google.com',
        href: GOOGLE_REVIEWS_URL,
      }]
    : []),
]

export default function DoctorCard() {
  const prefersReduced = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="our-doctors"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--elevated)' }}
      aria-label="Verify our credentials"
    >
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_8fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: the person ── */}
          <div>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, ease }}
              className="display-heading mb-6"
              style={{ fontSize: 'clamp(32px, 3.5vw, 54px)' }}
            >
              Don&apos;t take our word for it.
            </motion.h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.14, ease }}
              className="text-base leading-relaxed mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every consultation at Apex is conducted by an AHPRA-registered doctor who
              specialises in hormonal and metabolic medicine. You don&apos;t have to trust
              the claim: every credential on this page links to the body that regulates it.
            </motion.p>

            {/* Doctor identity - monogram is a temporary state; the 64px slot
                is sized for clinician photography (shoot scheduled). */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.24, ease }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(72,144,247,0.18) 0%, rgba(29,79,216,0.22) 100%)',
                    border: '1px solid rgba(72,144,247,0.25)',
                  }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--blue)', fontFamily: 'var(--font-space-grotesk)' }}>CC</span>
                </div>
                <div>
                  <p
                    className="text-base font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
                  >
                    Dr Cameron Chen
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Medical Director
                  </p>
                </div>
              </div>

              <blockquote
                className="text-sm leading-relaxed"
                style={{
                  color: 'var(--text-primary)',
                  opacity: 0.75,
                  borderTop: '1px solid var(--border)',
                  paddingTop: 20,
                }}
              >
                &ldquo;We test what other doctors don&apos;t order and interpret results in the
                context of optimisation, not just whether you fall inside the &lsquo;normal&rsquo;
                reference range.&rdquo;
              </blockquote>
            </motion.div>
          </div>

          {/* ── Right: the verification ledger ── */}
          <div className="lg:pt-3">
            {LEDGER.map((row, i) => (
              <motion.a
                key={row.claim}
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.55, delay: 0.2 + i * 0.1, ease }}
                className="group grid grid-cols-1 sm:grid-cols-[8fr_5fr] gap-2 sm:gap-8 py-7 no-underline transition-colors duration-200"
                style={{ borderTop: '1px solid var(--border)', minHeight: 44 }}
              >
                <div>
                  <p className="text-base font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {row.claim}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-secondary)', letterSpacing: '0.02em' }}
                  >
                    {row.detail}
                  </p>
                </div>
                <div className="flex sm:flex-col sm:items-end items-baseline gap-2 sm:gap-1 sm:text-right">
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                    style={{ color: 'var(--blue)' }}
                  >
                    {row.verifyLabel}
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      {/* external-link arrow: leaving-site affordance */}
                      <path d="M4 10L10 4M5.5 4H10v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {row.destination}
                  </span>
                </div>
              </motion.a>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} aria-hidden="true" />

            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.7, delay: 0.5, ease }}
              className="text-sm leading-relaxed mt-8"
              style={{ color: 'var(--text-secondary)' }}
            >
              Every claim on this page is checkable. That&apos;s the point.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  )
}
