'use client'

import Link from 'next/link'
import { CANONICAL_PROGRAMS } from '@/lib/canonical-programs'
import Logo from '@/components/brand/Logo'

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Start your assessment', href: '/start' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
]

const BLUE  = 'var(--blue)'
const TEXT  = 'var(--text-muted)'
const DIM   = 'var(--text-muted)'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(72,144,247,0.2), transparent)' }} aria-hidden="true" />

      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo variant="footer" />
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-5" style={{ color: TEXT }}>
              Doctor-led hormonal health, evidence-based and delivered online across Australia.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['AHPRA Registered', 'TGA Compliant', '100% Online'].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5"
                  style={{ color: TEXT, border: '1px solid rgba(72,144,247,0.3)', borderRadius: 0 }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 mb-5">
              <a href="mailto:admin@apexmetabolichealth.com.au"
                className="text-xs transition-colors duration-200 break-all"
                style={{ color: TEXT }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
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
                  className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ color: TEXT, background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(72,144,247,0.18)' }}
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
              Treatments
            </h4>
            <ul className="space-y-2.5">
              {CANONICAL_PROGRAMS.map((program) => (
                <li key={program.slug}>
                  <Link href={program.websiteHref}
                    className="text-sm transition-colors duration-200"
                    style={{ color: TEXT }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
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
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = TEXT }}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/start" className="btn-primary text-[11px] tracking-widest uppercase py-3 px-5">
                Start your assessment
              </Link>
              {/* LegitScript certified badge - real verifiable seal */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=apexmetabolichealth.com.au"
                target="_blank"
                rel="noopener noreferrer"
                title="Verify LegitScript Approval for apexmetabolichealth.com.au"
                className="mt-1 w-fit block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://static.legitscript.com/seals/46014035.png"
                  alt="Verify Approval for apexmetabolichealth.com.au"
                  width={73}
                  height={79}
                  style={{ display: 'block' }}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ backgroundColor: 'rgba(72,144,247,0.12)' }} aria-hidden="true" />

        {/* Compliance */}
        <div className="p-5 rounded-none mb-8" style={{ backgroundColor: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
          <p className="text-xs leading-relaxed mb-2" style={{ color: DIM }}>
            All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: DIM }}>
            Clinical suitability is assessed by a doctor during consultation. All medical services are provided by Australian AHPRA-registered medical practitioners.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: DIM }}>
            <strong style={{ color: 'var(--text-secondary)' }}>After-hours &amp; emergencies:</strong> Apex Metabolic Health does not provide emergency medical care. If you are experiencing a medical emergency, call <strong style={{ color: 'var(--text-primary)' }}>000</strong> immediately. For after-hours GP care, contact the <strong style={{ color: 'var(--text-secondary)' }}>National Home Doctor Service on 13 7425</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: DIM }}>
            © {year} Apex Metabolic Health. All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: TEXT }}>
            Doctor-led hormonal health. Evidence-based. Australia-wide.
          </p>
        </div>
      </div>
    </footer>
  )
}
