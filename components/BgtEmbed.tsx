'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BLUE = '#4890f7'
const BG   = '#070a0d'

interface BgtEmbedProps {
  title: string
  subtitle: string
  url: string
  biomarkers: string[]
}

export default function BgtEmbed({ title, subtitle, url, biomarkers }: BgtEmbedProps) {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Minimal header */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={() => router.back()} className="flex flex-col leading-none" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: BLUE }}>Metabolic Health</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.15)' }}>
            <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
              <path d="M8 2L2 8M2 2l6 6" stroke="rgba(72,144,247,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-semibold" style={{ color: 'rgba(200,220,248,0.6)' }}>Secure checkout</span>
          </div>
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
            aria-label="Close"
          >
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar — panel info */}
        <div className="hidden lg:flex flex-col w-80 flex-shrink-0 px-8 py-8 overflow-y-auto" style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: BLUE }}>Blood Panel</p>
          <h2 className="font-bold mb-1 leading-tight" style={{ fontSize: 22, color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>{title}</h2>
          <p className="text-xs mb-6 leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{subtitle}</p>

          <div className="h-px mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: 'rgba(240,244,248,0.4)' }}>Biomarkers included</p>
          <div className="flex flex-col gap-2">
            {biomarkers.map(b => (
              <div key={b} className="flex items-center gap-2.5">
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                <span className="text-xs" style={{ color: 'rgba(240,244,248,0.65)' }}>{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl" style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.12)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: BLUE }}>Powered by BGT</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.4)' }}>
              Pathology ordered by AHPRA-registered doctors. Collect at 2,000+ accredited centres across Australia. Results reviewed by our clinical team.
            </p>
          </div>
        </div>

        {/* Right — BGT iframe */}
        <div className="flex-1 relative">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: BG }}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${BLUE} transparent transparent transparent` }} />
                <p className="text-xs" style={{ color: 'rgba(240,244,248,0.4)' }}>Loading secure checkout…</p>
              </div>
            </div>
          )}
          <iframe
            src={url}
            title={`Order ${title}`}
            onLoad={() => setLoaded(true)}
            className="w-full h-full"
            style={{ minHeight: 'calc(100vh - 72px)', border: 'none', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
            allow="payment"
          />
        </div>
      </div>

      {/* Footer strip */}
      <div className="px-6 py-3 text-center flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
          AHPRA-registered doctors · TGA compliant · Secured by BGT
        </p>
      </div>
    </div>
  )
}
