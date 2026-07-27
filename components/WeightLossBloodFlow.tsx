'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BLUE = 'var(--blue)'
const BG   = '#f9fafb'

const PANEL = {
  name: 'Metabolic Health Panel',
  tag: 'Weight Loss Assessment',
  heading: "Let's check your metabolic baseline",
  description: 'A comprehensive metabolic assessment covering blood sugar, insulin resistance, thyroid, hormone levels, and inflammatory markers: everything needed to build your weight loss protocol.',
  price: 'A$99',
  priceNote: 'inc. GST',
  biomarkers: [
    'FBC', 'Glucose', 'HbA1c', 'Fasting Insulin', 'HOMA-IR',
    'Lipids', 'LFT', 'UEC', 'TSH', 'FT3', 'FT4',
    'Cortisol', 'Testosterone', 'SHBG', 'Iron Studies',
    'Ferritin', 'Vit D', 'B12', 'Magnesium', 'Zinc', 'hsCRP', 'Uric Acid',
  ],
  url: 'https://my.bloodygoodtests.com.au/buy/6b4a52f4-fcb8-422c-aefb-aa2811451d0f',
  turnaround: '1 – 3 business days',
}

const TRUST = [
  'Receive referral instantly',
  '2,000+ collection centres',
  'Results in 1–3 business days',
  'Doctor-reviewed results',
]

const OPTIONS = [
  {
    value: 'yes',
    label: 'Yes, I have had blood tests in the last 6 months',
    sub: 'I have recent results and am ready to consult with a doctor.',
  },
  {
    value: 'no',
    label: 'No, I have not had recent blood tests',
    sub: 'I need to complete a blood panel before my consultation.',
  },
]

type Phase = 'question' | 'panel'

function QuestionStep({ onAnswer }: { onAnswer: (v: string) => void }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  function handleContinue() {
    if (!selected) return
    if (selected === 'yes') {
      router.push('/intake/general-consult')
    } else {
      onAnswer('no')
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto w-full">
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>Step 1 of 2</p>
      <h1 className="font-bold mb-3 leading-tight text-center" style={{ fontSize: 'clamp(26px,4vw,40px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
        Let's start your<br />weight loss journey
      </h1>
      <p className="text-sm text-center mb-10 max-w-md" style={{ color: '#6b7280', lineHeight: 1.7 }}>
        One quick question so we can point you in the right direction.
      </p>

      <div className="w-full mb-3">
        <p className="text-sm font-semibold mb-4" style={{ color: '#374151' }}>
          Have you had blood tests in the last 6 months?
        </p>
        <div className="flex flex-col gap-3">
          {OPTIONS.map(opt => {
            const active = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className="w-full flex items-start gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150"
                style={{
                  background: active ? 'rgba(72,144,247,0.12)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${active ? 'rgba(72,144,247,0.45)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all mt-0.5"
                  style={{
                    border: `2px solid ${active ? BLUE : 'rgba(0,0,0,0.12)'}`,
                    background: active ? BLUE : 'transparent',
                  }}
                >
                  {active && <span className="w-2 h-2 rounded-full bg-white block" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium" style={{ color: active ? '#111827' : '#4b5563' }}>{opt.label}</span>
                  <span className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{opt.sub}</span>
                </span>
              </button>
            )
          })}
        </div>
        <p className="text-[11px] mt-4" style={{ color: '#6b7280' }}>
          This helps us recommend the right next step, so answer honestly for the best outcome.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', color: '#6b7280' }}
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-150"
          style={{
            background: selected ? BLUE : 'rgba(72,144,247,0.2)',
            color: selected ? '#fff' : 'rgba(72,144,247,0.4)',
            fontFamily: 'var(--font-space-grotesk)',
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function PanelStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-20 max-w-2xl mx-auto w-full">
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>Step 2 of 2</p>
      <h1 className="font-bold mb-8 leading-tight text-center" style={{ fontSize: 'clamp(24px,3.5vw,36px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
        {PANEL.heading}
      </h1>

      <div className="w-full rounded-2xl overflow-hidden mb-8" style={{ border: '1px solid rgba(72,144,247,0.2)', background: '#ffffff' }}>
        <div className="px-6 py-5 flex items-start justify-between gap-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5" style={{ color: BLUE }}>{PANEL.tag}</p>
            <h2 className="font-bold text-lg leading-snug" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{PANEL.name}</h2>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="font-bold text-2xl leading-none" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{PANEL.price}</p>
            <p className="text-[10px] mt-1" style={{ color: '#6b7280' }}>{PANEL.priceNote}</p>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm mb-5 leading-relaxed" style={{ color: '#6b7280' }}>{PANEL.description}</p>

          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#6b7280' }}>Tests included</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {PANEL.biomarkers.map(b => (
              <span key={b} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.07)', color: '#4b5563', border: '1px solid rgba(72,144,247,0.12)' }}>{b}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#22c55e' }} />
            <span className="text-xs" style={{ color: '#6b7280' }}>Estimated turnaround: {PANEL.turnaround}</span>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mb-8">
        {TRUST.map(t => (
          <div key={t} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: BLUE }} />
            <span className="text-[11px] leading-snug" style={{ color: '#6b7280' }}>{t}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', color: '#6b7280' }}
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <a
          href={PANEL.url}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-150"
          style={{ background: BLUE, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Purchase blood test
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <p className="text-[10px] text-center mt-4" style={{ color: '#d1d5db' }}>
        Secure payment powered by Bloody Good Tests · Referral issued instantly
      </p>
    </div>
  )
}

export default function WeightLossBloodFlow() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('question')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <button onClick={() => router.back()} className="flex flex-col leading-none" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: BLUE }}>Metabolic Health</span>
        </button>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.15)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
          <span className="text-[10px] font-semibold" style={{ color: '#4b5563' }}>Secure · AHPRA-registered doctors</span>
        </div>
      </div>

      {/* Step progress */}
      {phase === 'question' && (
        <div className="flex items-center justify-center gap-2 pt-6 px-6">
          {['Question', 'Panel'].map((label, i) => {
            const active = i === 0
            return (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all"
                    style={{
                      background: active ? BLUE : 'rgba(0,0,0,0.05)',
                      color: active ? '#fff' : 'rgba(255,255,255,0.25)',
                      border: `1px solid ${active ? BLUE : 'rgba(0,0,0,0.08)'}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs hidden sm:block" style={{ color: active ? 'rgba(240,244,248,0.7)' : 'rgba(240,244,248,0.25)' }}>{label}</span>
                </div>
                {i < 1 && <div className="w-12 h-px mx-1" style={{ background: 'rgba(0,0,0,0.08)' }} />}
              </div>
            )
          })}
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {phase === 'question' && <QuestionStep onAnswer={() => setPhase('panel')} />}
        {phase === 'panel' && <PanelStep onBack={() => setPhase('question')} />}
      </div>

      <div className="px-6 py-3 text-center flex-shrink-0" style={{ borderTop: '1px solid rgba(0,0,0,0.03)' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
          All pathology ordered by AHPRA-registered doctors · TGA compliant · Apex Metabolic Health
        </p>
      </div>
    </div>
  )
}
