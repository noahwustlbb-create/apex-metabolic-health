'use client'

import Link from 'next/link'
import { programs } from '@/lib/programs'

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Get Started', href: '/assessment' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#080808' }}>
      <div className="h-px w-full" style={{ background: '#1E1E1E' }} aria-hidden="true" />

      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: '18px',
                letterSpacing: '0.15em',
                color: '#F5F5F5',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}>
                APEX
              </span>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#888888',
                lineHeight: 1,
                marginTop: '4px',
                textTransform: 'uppercase',
              }}>
                Metabolic Health
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#555555' }}>
              Doctor-led hormonal health. Evidence-based. Australia-wide.
            </p>

            <div className="flex flex-wrap gap-2">
              {['AHPRA Registered', 'TGA Compliant', '100% Online'].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5"
                  style={{ color: '#555555', border: '1px solid #1E1E1E' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: '#444444' }}>
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#555555' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#555555' }}
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: '#444444' }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#555555' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F5F5F5' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#555555' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase py-3 px-5 transition-all duration-200"
                style={{ background: '#C8A96E', color: '#0A0A0A', borderRadius: '2px' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#D4B97E' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#C8A96E' }}
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ backgroundColor: '#1E1E1E' }} aria-hidden="true" />

        {/* Compliance */}
        <div className="p-5 mb-8" style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E' }}>
          <p className="text-xs leading-relaxed mb-2" style={{ color: '#444444' }}>
            All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: '#444444' }}>
            Clinical suitability is assessed by a doctor during consultation. All medical services are provided by Australian AHPRA-registered medical practitioners.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#444444' }}>
            <strong style={{ color: '#666666' }}>After-hours &amp; emergencies:</strong> Apex Metabolic Health does not provide emergency medical care. If you are experiencing a medical emergency, call <strong style={{ color: '#F5F5F5' }}>000</strong> immediately. For after-hours GP care, contact the <strong style={{ color: '#666666' }}>National Home Doctor Service on 13 7425</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: '#333333' }}>
            © {year} Apex Metabolic Health. All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: '#444444' }}>
            Doctor-led hormonal health. Evidence-based. Australia-wide.
          </p>
        </div>
      </div>
    </footer>
  )
}
