'use client'

import Link from 'next/link'
import { programs } from '@/lib/programs'

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Get Started', href: '/book' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
]

const BLUE  = '#4890f7'
const TEXT  = '#c8dcf8'
const DIM   = 'rgba(200,220,248,0.55)'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.2), transparent)' }} aria-hidden="true" />

      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontWeight: 600,
                fontSize: '18px',
                letterSpacing: '0.22em',
                color: '#f0f5ff',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}>
                APEX
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                fontSize: '9.5px',
                letterSpacing: '0.2em',
                color: BLUE,
                lineHeight: 1,
                marginTop: '5px',
                textTransform: 'uppercase',
                opacity: 0.85,
              }}>
                Metabolic Health
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: TEXT }}>
              Doctor-led hormonal health, evidence-based and delivered online across Australia.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['AHPRA Registered', 'TGA Compliant', '100% Online'].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5"
                  style={{ color: TEXT, border: '1px solid rgba(72,144,247,0.3)', borderRadius: '2px' }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 mb-5">
              <a href="mailto:admin@apexmetabolichealth.com.au"
                className="text-xs transition-colors duration-200"
                style={{ color: TEXT }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff' }}
                onMouseLeave={e => { e.currentTarget.style.color = TEXT }}>
                admin@apexmetabolichealth.com.au
              </a>
              <p className="text-xs" style={{ color: DIM }}>Mon – Fri · 9am – 5pm AEST</p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/apex_metabolichealth',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com/apexmetabolichealth',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: TEXT, background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff'; e.currentTarget.style.background = 'rgba(72,144,247,0.18)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = TEXT; e.currentTarget.style.background = 'rgba(72,144,247,0.08)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link href={`/programs/${program.slug}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: TEXT }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = TEXT }}
                  >{program.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: TEXT }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#f0f5ff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = TEXT }}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/signup" className="btn-primary text-[11px] tracking-widest uppercase py-3 px-5">
                Get Started
              </Link>
              {/* LegitScript certified badge */}
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=apexmetabolichealth.com.au"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LegitScript certified — verify our certification"
                className="flex items-center gap-2.5 mt-1 w-fit"
              >
                <div className="relative flex-shrink-0" style={{ width: 52, height: 60 }}>
                  <svg viewBox="0 0 52 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={52} height={60}>
                    <path d="M26 1L4 11v17c0 13.2 9.4 25.6 22 29 12.6-3.4 22-15.8 22-29V11L26 1z" fill="#0a1628" stroke="rgba(72,144,247,0.4)" strokeWidth="1.5" />
                    <path d="M26 1L4 11v17c0 13.2 9.4 25.6 22 29 12.6-3.4 22-15.8 22-29V11L26 1z" fill="url(#ls-grad)" />
                    <defs>
                      <linearGradient id="ls-grad" x1="4" y1="1" x2="48" y2="60" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="rgba(72,144,247,0.15)" />
                        <stop offset="100%" stopColor="rgba(72,144,247,0.03)" />
                      </linearGradient>
                    </defs>
                    <circle cx="26" cy="30" r="11" fill="rgba(72,144,247,0.15)" stroke={BLUE} strokeWidth="1.2" />
                    <path d="M20.5 30l3.5 3.5 7-7" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase leading-tight" style={{ color: BLUE }}>LegitScript</p>
                  <p className="text-[9px] tracking-[0.08em] leading-tight" style={{ color: 'rgba(200,220,248,0.5)' }}>Certified</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ backgroundColor: 'rgba(72,144,247,0.12)' }} aria-hidden="true" />

        {/* Compliance */}
        <div className="p-5 rounded-sm mb-8" style={{ backgroundColor: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
          <p className="text-xs leading-relaxed mb-2" style={{ color: DIM }}>
            All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: DIM }}>
            Clinical suitability is assessed by a doctor during consultation. All medical services are provided by Australian AHPRA-registered medical practitioners.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: DIM }}>
            <strong style={{ color: TEXT }}>After-hours &amp; emergencies:</strong> Apex Metabolic Health does not provide emergency medical care. If you are experiencing a medical emergency, call <strong style={{ color: '#ffffff' }}>000</strong> immediately. For after-hours GP care, contact the <strong style={{ color: TEXT }}>National Home Doctor Service on 13 7425</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: DIM }}>
            © {year} Apex Metabolic Health. All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: BLUE, opacity: 0.7 }}>
            Doctor-led hormonal health. Evidence-based. Australia-wide.
          </p>
        </div>
      </div>
    </footer>
  )
}
