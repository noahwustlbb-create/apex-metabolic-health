'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BLUE = '#4890f7'
const BG   = '#070a0d'

const PANELS = {
  hormone: {
    name: 'Hormone Health Panel',
    tag: 'Pre-TRT Assessment',
    heading: "Let's check your baseline hormone levels",
    description: 'A comprehensive hormone assessment to understand your current hormonal profile — including testosterone, oestrogen, thyroid, and metabolic markers.',
    biomarkers: [
      'Total Testosterone', 'Free Testosterone', 'SHBG', 'LH', 'FSH',
      'Oestradiol (E2)', 'DHEA-S', 'Prolactin', 'PSA',
      'Full Blood Count (FBC)', 'Thyroid (TSH)', 'Cortisol',
      'Lipid Studies inc. HDL', 'Glucose', 'Liver Function (LFT)', 'Electrolytes & Kidney (UEC)',
    ],
    url: 'https://my.bloodygoodtests.com.au/buy/8db67cec-81c9-4c51-a66a-ddf4ce8278f2',
    turnaround: '1 – 7 business days',
  },
  trt: {
    name: 'TRT Monitoring Panel',
    tag: 'On-Treatment Monitoring',
    heading: "Let's monitor your testosterone levels",
    description: 'Essential safety and efficacy monitoring for patients currently on testosterone replacement therapy. Keeps your levels dialled and your health protected.',
    biomarkers: [
      'Total Testosterone', 'Free Testosterone', 'SHBG', 'Oestradiol (E2)',
      'PSA', 'Full Blood Count (FBC)', 'Haematocrit', 'Haemoglobin',
      'Liver Function (LFT)', 'Electrolytes & Kidney (UEC)', 'Glucose', 'Lipids',
    ],
    url: 'https://my.bloodygoodtests.com.au/buy/a069c9d0-3f6f-4627-b998-67afb76993ad',
    turnaround: '1 – 7 business days',
  },
}

type PanelKey = 'hormone' | 'trt'
type Phase = 'question' | PanelKey

interface Props {
  startPanel?: PanelKey
}

const RADIO_OPTIONS = [
  { value: 'no',  label: 'No, I am not currently on TRT' },
  { value: 'yes', label: 'Yes, I am currently on testosterone replacement therapy' },
]

function QuestionStep({ onAnswer }: { onAnswer: (panel: PanelKey) => void }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  function handleContinue() {
    if (!selected) return
    onAnswer(selected === 'no' ? 'hormone' : 'trt')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto w-full">
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>Step 1 of 2</p>
      <h1 className="font-bold mb-3 leading-tight text-center" style={{ fontSize: 'clamp(26px,4vw,40px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
        Let's take the first step
        <br />to a better you
      </h1>
      <p className="text-sm text-center mb-10 max-w-md" style={{ color: 'rgba(240,244,248,0.5)', lineHeight: 1.7 }}>
        Answer one quick question so we can recommend the right blood panel for you.
      </p>

      <div className="w-full mb-3">
        <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(240,244,248,0.8)' }}>
          Are you currently receiving testosterone replacement therapy?
        </p>
        <div className="flex flex-col gap-3">
          {RADIO_OPTIONS.map(opt => {
            const active = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150"
                style={{
                  background: active ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    border: `2px solid ${active ? BLUE : 'rgba(255,255,255,0.2)'}`,
                    background: active ? BLUE : 'transparent',
                  }}
                >
                  {active && <span className="w-2 h-2 rounded-full bg-white block" />}
                </span>
                <span className="text-sm" style={{ color: active ? '#f0f4f8' : 'rgba(240,244,248,0.65)' }}>{opt.label}</span>
              </button>
            )
          })}
        </div>
        <p className="text-[11px] mt-4" style={{ color: 'rgba(240,244,248,0.3)' }}>
          This helps us recommend the correct panel — be sure to answer truthfully.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,244,248,0.5)' }}
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

function PanelStep({ panelKey, showBack }: { panelKey: PanelKey; showBack?: () => void }) {
  const panel = PANELS[panelKey]

  const TRUST = [
    'Receive referral instantly',
    'Walk into 2,000+ collection centres',
    'Results within 1–7 business days',
    'Doctor-reviewed results',
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-20 max-w-2xl mx-auto w-full">
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-5" style={{ color: BLUE }}>
        {showBack ? 'Step 2 of 2' : 'Blood Panel'}
      </p>
      <h1 className="font-bold mb-8 leading-tight text-center" style={{ fontSize: 'clamp(24px,3.5vw,36px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
        {panel.heading}
      </h1>

      {/* Panel card */}
      <div className="w-full rounded-2xl overflow-hidden mb-8" style={{ border: '1px solid rgba(72,144,247,0.2)', background: '#0d1117' }}>
        <div className="px-6 py-5 flex items-start justify-between gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5" style={{ color: BLUE }}>{panel.tag}</p>
            <h2 className="font-bold text-lg leading-snug" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{panel.name}</h2>
          </div>
          <div className="flex-shrink-0">
            <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10 opacity-20" aria-hidden="true">
              <rect x="8" y="6" width="28" height="34" rx="3" stroke="#4890f7" strokeWidth="1.5" />
              <path d="M14 16h16M14 22h16M14 28h10" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{panel.description}</p>

          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: 'rgba(240,244,248,0.35)' }}>Tests included</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {panel.biomarkers.map(b => (
              <span key={b} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.07)', color: 'rgba(200,220,248,0.7)', border: '1px solid rgba(72,144,247,0.12)' }}>{b}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#22c55e' }} />
            <span className="text-xs" style={{ color: 'rgba(240,244,248,0.4)' }}>Estimated turnaround: {panel.turnaround}</span>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div className="w-full grid grid-cols-2 gap-3 mb-8">
        {TRUST.map(t => (
          <div key={t} className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ background: BLUE }} />
            <span className="text-[11px] leading-snug" style={{ color: 'rgba(240,244,248,0.5)' }}>{t}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 w-full">
        {showBack && (
          <button
            onClick={showBack}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,244,248,0.5)' }}
          >
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}
        <a
          href={panel.url}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-150"
          style={{ background: BLUE, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Purchase blood test
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <p className="text-[10px] text-center mt-4" style={{ color: 'rgba(240,244,248,0.25)' }}>
        Secure payment powered by Bloody Good Tests · Referral issued instantly
      </p>
    </div>
  )
}

export default function BloodPanelFlow({ startPanel }: Props) {
  const [phase, setPhase] = useState<Phase>(startPanel ?? 'question')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <a href="/" className="flex flex-col leading-none">
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: BLUE }}>Metabolic Health</span>
        </a>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.15)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(200,220,248,0.6)' }}>Secure · AHPRA-registered doctors</span>
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
                      background: active ? BLUE : 'rgba(255,255,255,0.06)',
                      color: active ? '#fff' : 'rgba(255,255,255,0.25)',
                      border: `1px solid ${active ? BLUE : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs hidden sm:block" style={{ color: active ? 'rgba(240,244,248,0.7)' : 'rgba(240,244,248,0.25)' }}>{label}</span>
                </div>
                {i < 1 && <div className="w-12 h-px mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />}
              </div>
            )
          })}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {phase === 'question' && (
          <QuestionStep onAnswer={panel => setPhase(panel)} />
        )}
        {(phase === 'hormone' || phase === 'trt') && (
          <PanelStep
            panelKey={phase}
            showBack={startPanel ? undefined : () => setPhase('question')}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 text-center flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
          All pathology ordered by AHPRA-registered doctors · TGA compliant · Apex Metabolic Health
        </p>
      </div>
    </div>
  )
}
