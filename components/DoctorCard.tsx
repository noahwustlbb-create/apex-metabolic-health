'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const AHPRA_URL = 'https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx'
const LEGITSCRIPT_URL = 'https://www.legitscript.com/websites/?checker_keywords=apexmetabolichealth.com.au'
const ABN = '91 682 876 884'
const ABN_URL = 'https://abr.business.gov.au/ABN/View?abn=91682876884'
const NATA_URL = 'https://nata.com.au/'

/**
 * The verification ledger. Every row is an auditable claim paired with the
 * third party that can confirm it. Rows only exist when the proof is real:
 * the reviews row stays dormant until the Google Business Profile holds
 * 10+ reviews (see REVIEWS_LIVE below) - no fake proof, ever.
 *
 * Deliberately no individual clinician here. Our doctors are contracted
 * practitioners, not the brand; trust rests on the regulators, the company
 * and the supply chain, all of which the reader can check without us.
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
    claim: 'AHPRA-registered doctors',
    detail: 'Every prescriber holds current Australian medical registration',
    verifyLabel: 'Search the public register',
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
  {
    claim: 'Registered Australian company',
    detail: `ABN ${ABN}`,
    verifyLabel: 'Look up the ABN',
    destination: 'opens abr.business.gov.au',
    href: ABN_URL,
  },
  {
    claim: 'NATA-accredited pathology',
    detail: 'Bloods collected and analysed by accredited laboratories',
    verifyLabel: 'About NATA accreditation',
    destination: 'opens nata.com.au',
    href: NATA_URL,
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
              Every consultation at Apex is conducted by an AHPRA-registered doctor.
              Every script is filled by an Australian pharmacy. Every blood test runs
              through an accredited lab. You don&apos;t have to trust any of that: each
              claim on the right links to the body that regulates it.
            </motion.p>

            {/* No individual clinician on the brand. The trust device is the
                absence list: the three things a legitimate clinic never does. */}
            <motion.ul
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.24, ease }}
              className="list-none p-0 m-0"
              style={{ borderTop: '1px solid var(--border)' }}
              aria-label="What Apex does not do"
            >
              {[
                ['No overseas prescribers.', 'Every script is written by a doctor registered to practise in Australia.'],
                ['No grey-market pharmacies.', 'Medication is compounded and dispensed by a TGA-compliant Australian pharmacy.'],
                ['No unaccredited diagnostics.', 'Every blood panel runs through NATA-accredited pathology.'],
              ].map(([lead, rest]) => (
                <li key={lead} className="py-4 flex items-start gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--blue)' }}
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed m-0" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{lead}</span> {rest}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right: the verification ledger ── */}
          <div className="lg:pt-3">
            {LEDGER.map((row, i) => (
              <motion.a
                key={row.claim}
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={prefersReduced ? false : { opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay: 0.2 + i * 0.1, ease }}
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
