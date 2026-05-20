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
                fontWeight: 300,
                fontSize: '18px',
                letterSpacing: '0.15em',
                color: '#ffffff',
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
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1,
                marginTop: '4px',
                textTransform: 'uppercase',
              }}>
                Metabolic Health
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Doctor-led hormonal health. Evidence-based. Australia-wide.
            </p>

            <div className="flex flex-wrap gap-2">
              {['AHPRA Registered', 'TGA Compliant', '100% Online'].map((badge) => (
                <span key={badge} className="text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5"
                  style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(72,144,247,0.2)', borderRadius: '2px' }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programs.map((program) => (
                <li key={program.slug}>
                  <Link href={`/programs/${program.slug}`}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
                  >{program.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/assessment" className="btn-primary text-[11px] tracking-widest uppercase py-3 px-5">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="h-px w-full mb-8" style={{ backgroundColor: 'rgba(72,144,247,0.1)' }} aria-hidden="true" />

        {/* Compliance */}
        <div className="p-5 rounded-sm mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(72,144,247,0.1)' }}>
          <p className="text-xs leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            All consultations conducted by AHPRA-registered medical practitioners. This website does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Clinical suitability is assessed by a doctor during consultation. All medical services are provided by Australian AHPRA-registered medical practitioners.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.25)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.45)' }}>After-hours &amp; emergencies:</strong> Apex Metabolic Health does not provide emergency medical care. If you are experiencing a medical emergency, call <strong style={{ color: '#ffffff' }}>000</strong> immediately. For after-hours GP care, contact the <strong style={{ color: 'rgba(255,255,255,0.45)' }}>National Home Doctor Service on 13 7425</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            © {year} Apex Metabolic Health. All rights reserved.
          </p>
          <p className="text-xs tracking-wide" style={{ color: 'rgba(72,144,247,0.4)' }}>
            Doctor-led hormonal health. Evidence-based. Australia-wide.
          </p>
        </div>
      </div>
    </footer>
  )
}
