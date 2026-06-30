'use client'

import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BLUE = '#4890f7'

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

function PanelCard({ bundle }: { bundle: BgtBundle }) {
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
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(240,244,248,0.5)' }}>{bundle.description}</p>
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
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-xs font-bold tracking-wide transition-all duration-150"
          style={{ background: BLUE, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Order now
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-xl p-6 animate-pulse" style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="h-3 w-20 rounded mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-5 w-3/4 rounded mb-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-3 w-full rounded mb-1" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="h-3 w-2/3 rounded mb-6" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="h-9 w-full rounded" style={{ background: 'rgba(72,144,247,0.08)' }} />
    </div>
  )
}

export default function BgtOrderPage() {
  const [bundles, setBundles] = useState<BgtBundle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/bgt?resource=bundles&count=50')
      .then(r => r.json())
      .then(data => {
        const list: BgtBundle[] = Array.isArray(data) ? data : (data.bundles ?? data.data ?? [])
        setBundles(list)
      })
      .catch(() => setError('Unable to load panels. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: 80 }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="relative z-10 text-center px-6 pt-16 pb-12">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: BLUE }}>Pathology</p>
          <h1 className="font-bold mb-4 leading-tight" style={{ fontSize: 'clamp(28px,4vw,44px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
            Doctor-reviewed blood panels
          </h1>
          <p className="text-sm leading-relaxed mx-auto max-w-xl" style={{ color: 'rgba(240,244,248,0.5)' }}>
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
                <span className="text-xs" style={{ color: 'rgba(240,244,248,0.5)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panels grid */}
        <div className="relative z-10 px-6 pb-20 max-w-6xl mx-auto">
          {error && (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: 'rgba(240,244,248,0.4)' }}>{error}</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && !error && bundles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: 'rgba(240,244,248,0.4)' }}>No panels available at the moment.</p>
              <a
                href="https://bloodygoodtests.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold"
                style={{ color: BLUE }}
              >
                Browse all panels →
              </a>
            </div>
          )}

          {!loading && bundles.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bundles.map(b => <PanelCard key={b.id} bundle={b} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
