'use client'

import { useState, useEffect, useCallback } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BLUE = 'var(--blue)'

interface BgtBundle {
  id: string
  name: string
  description?: string
  price?: number
  price_cents?: number
  biomarkers?: string[]
  tests?: Array<{ name: string }>
  url?: string
  checkout_url?: string
}

// ─── Checkout modal (keeps users on-site) ─────────────────────────────────────

function CheckoutModal({ url, onClose }: { url: string; onClose: () => void }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ zIndex: 1000, background: 'rgba(4,6,10,0.96)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Blood test checkout"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: '#070a0d', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-black tracking-[0.22em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
            <span className="text-[7px] tracking-[0.2em] font-semibold uppercase" style={{ color: 'var(--blue)' }}>Metabolic Health</span>
          </div>
          <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-xs" style={{ color: 'rgba(240,244,248,0.4)' }}>Blood test checkout</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium flex items-center gap-1 transition-colors duration-150"
            style={{ color: 'rgba(240,244,248,0.35)', textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,244,248,0.7)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,244,248,0.35)' }}
          >
            Open in new tab
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M5 3H3a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V7M7 2h3v3M10 2L6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,244,248,0.7)', cursor: 'pointer' }}
            aria-label="Close checkout"
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)' }}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* iframe */}
      <div className="flex-1 relative">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `rgba(72,144,247,0.3)`, borderTopColor: BLUE }} />
              <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>Loading checkout…</p>
            </div>
          </div>
        )}
        <iframe
          src={url}
          title="Blood test checkout"
          className="w-full h-full"
          style={{ border: 'none', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          onLoad={() => setIframeLoaded(true)}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
        />
      </div>

      {/* Bottom trust bar */}
      <div className="flex items-center justify-center gap-4 px-4 py-2.5 flex-shrink-0" style={{ background: '#070a0d', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.25)' }}>
          Blood test collection by Bloody Good Tests, a TGA accredited partner · SSL secured
        </p>
      </div>
    </div>
  )
}

// ─── Panel card ───────────────────────────────────────────────────────────────

function PanelCard({ bundle, onOrder }: { bundle: BgtBundle; onOrder: (url: string) => void }) {
  const price = bundle.price_cents
    ? `$${(bundle.price_cents / 100).toFixed(0)}`
    : bundle.price
    ? `$${bundle.price}`
    : null

  const biomarkers = bundle.biomarkers ?? bundle.tests?.map(t => t.name) ?? []
  const orderUrl = bundle.checkout_url ?? bundle.url ?? `https://bloodygoodtests.com.au/products/${bundle.id}`

  return (
    <div
      className="rounded-xl flex flex-col transition-all duration-200 group"
      style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `rgba(72,144,247,0.3)` }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)' }}
    >
      <div className="p-6 flex-1">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: BLUE }}>Blood Panel</p>
        <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{bundle.name}</h3>
        {bundle.description && (
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(240,244,248,0.7)' }}>{bundle.description}</p>
        )}

        {biomarkers.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {biomarkers.slice(0, 8).map(b => (
              <span key={b} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', color: 'rgba(200,220,248,0.7)', border: '1px solid rgba(72,144,247,0.12)' }}>{b}</span>
            ))}
            {biomarkers.length > 8 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', color: 'rgba(200,220,248,0.5)', border: '1px solid rgba(72,144,247,0.12)' }}>+{biomarkers.length - 8} more</span>
            )}
          </div>
        )}
      </div>

      <div className="px-6 pb-6 flex items-center justify-between gap-4">
        {price && (
          <p className="text-lg font-bold" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{price}</p>
        )}
        <button
          onClick={() => onOrder(orderUrl)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-xs font-bold tracking-wide transition-all duration-150"
          style={{ background: BLUE, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Order now
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}


const APEX_PANELS: BgtBundle[] = [
  {
    id: 'pre-trt',
    name: 'Pre-TRT Hormone Panel',
    description: 'Baseline hormonal assessment required before starting a testosterone optimisation program. Includes complete endocrine and metabolic markers.',
    biomarkers: ['Total Testosterone', 'Free Testosterone', 'SHBG', 'LH', 'FSH', 'Oestradiol', 'Prolactin', 'Cortisol', 'DHEA-S', 'PSA', 'Full Blood Count', 'Lipids'],
    checkout_url: 'https://my.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
  },
  {
    id: 'trt-monitoring',
    name: 'TRT Monitoring Panel',
    description: 'Ongoing monitoring for patients on testosterone replacement therapy. Tracks key safety and efficacy markers to keep you in your optimal range.',
    biomarkers: ['Total Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol', 'LH', 'Haematocrit', 'Haemoglobin', 'PSA', 'Liver Function'],
    checkout_url: 'https://my.bloodygoodtests.com.au/buy/a069c9d0-3f6f-4627-b998-67afb76993ad',
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss Blood Panel',
    description: 'Comprehensive metabolic and hormonal assessment for weight management programs. Identifies drivers of weight gain and resistance to loss.',
    biomarkers: ['Fasting Glucose', 'HbA1c', 'Fasting Insulin', 'TSH', 'Free T3', 'Free T4', 'Total Testosterone', 'Cortisol', 'Lipid Panel', 'CRP', 'Liver Function'],
    checkout_url: 'https://my.bloodygoodtests.com.au/buy/6b4a52f4-fcb8-422c-aefb-aa2811451d0f',
  },
  {
    id: 'skin-pre-treatment',
    name: 'Skin Regeneration Pre-Treatment Panel',
    description: 'Baseline bloodwork required before commencing a skin regeneration program. Covers inflammatory, nutritional, and metabolic markers.',
    biomarkers: ['Full Blood Count', 'Liver Function', 'Kidney Function', 'Zinc', 'Copper', 'Vitamin D', 'CRP', 'Ferritin', 'Thyroid Panel'],
    checkout_url: 'https://my.bloodygoodtests.com.au/buy/a09b6127-f307-4446-81a6-ab7789440754',
  },
]

export default function BgtOrderPage() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  return (
    <>
      {checkoutUrl && <CheckoutModal url={checkoutUrl} onClose={() => setCheckoutUrl(null)} />}
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: 80 }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="relative z-10 text-center px-6 pt-16 pb-12">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BLUE }}>Pathology</p>
          <h1 className="font-bold mb-4 leading-tight" style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
            Doctor-reviewed blood panels
          </h1>
          <p className="text-sm leading-relaxed mx-auto max-w-xl" style={{ color: 'rgba(240,244,248,0.7)' }}>
            Order online, collect at an accredited pathology centre near you, and get results reviewed by our clinical team. No GP referral required.
          </p>

          <div className="flex items-center justify-center gap-6 mt-6">
            {[
              'Results in 1–3 business days',
              '2,000+ collection centres Australia-wide',
              'Doctor-reviewed results',
            ].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ background: BLUE }} />
                <span className="text-xs" style={{ color: 'rgba(240,244,248,0.7)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panels grid */}
        <div className="relative z-10 px-6 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {APEX_PANELS.map(b => <PanelCard key={b.id} bundle={b} onOrder={setCheckoutUrl} />)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
