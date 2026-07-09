'use client'

import { useState } from 'react'
import { useSignupGate } from '@/context/SignupGateContext'

declare const gtag: undefined | ((...args: unknown[]) => void)
function track(event: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
    gtag('event', event, params ?? {})
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Answers {
  q1?: string; q2?: string; q3?: string
  reasons?: string[]
  sex?: string
  age?: string
  illness?: string
  state?: string
  concerns?: string[]
  condQ?: string
  familyHistory?: string[]
  firstName?: string
  email?: string
  phone?: string
}

// ─── Static data ──────────────────────────────────────────────────────────────

const REASONS = [
  'Low energy or persistent fatigue',
  'Weight gain or difficulty changing my body',
  'Poor sleep or slow recovery',
  'Reduced drive, focus or performance',
  'I just want to understand my health better',
]

const CONCERNS = [
  'A recent health warning or wake-up call',
  "I'm not performing at the level I expect of myself",
  'I feel older than I should for my age',
  'I want to get ahead of potential issues',
  "A family member's diagnosis made me think",
  "I've tried other approaches that haven't worked",
]

const FAMILY_HX = [
  'Heart disease or stroke',
  'Type 2 diabetes',
  'Thyroid conditions',
  'Hormone-related cancers',
  'Obesity',
  'None of the above',
]

const STATES = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT']

const PERSONAS = [
  {
    name: 'Marcus T.', age: 38, loc: 'Sydney',
    quote: "I'd been brushing off the same symptoms for two years. This gave me data I could actually act on.",
    goals: ['Energy restoration', 'Body composition', 'Sleep quality'],
  },
  {
    name: 'Liam K.', age: 44, loc: 'Melbourne',
    quote: "I wanted answers, not reassurance. For the first time I understand what's been happening.",
    goals: ['Hormone optimisation', 'Longevity planning', 'Mental clarity'],
  },
  {
    name: 'James P.', age: 51, loc: 'Brisbane',
    quote: "I thought this was only for elite athletes. Turns out it's exactly what I needed.",
    goals: ['Weight management', 'Cardiovascular health', 'Metabolic function'],
  },
]

const GOAL_MAP: Record<string, string> = {
  'Low energy or persistent fatigue': 'Restore sustained energy',
  'Weight gain or difficulty changing my body': 'Optimise body composition',
  'Poor sleep or slow recovery': 'Improve sleep & recovery',
  'Reduced drive, focus or performance': 'Enhance drive & cognitive performance',
  'I just want to understand my health better': 'Build a comprehensive health baseline',
}

const RISK_MAP: Record<string, string[]> = {
  '35–39': ['Early hormonal decline markers'],
  '40–44': ['Testosterone & metabolic panel', 'Cardiovascular risk markers'],
  '45–54': ['Full hormonal panel', 'Metabolic syndrome screening'],
  '55+': ['Comprehensive age-related panel', 'Bone density markers'],
  'Heart disease or stroke': ['Cardiovascular & lipid profile'],
  'Type 2 diabetes': ['Metabolic & glucose regulation panel'],
  'Thyroid conditions': ['Full thyroid panel (TSH, fT3, fT4)'],
  'Hormone-related cancers': ['Hormonal panel with PSA'],
  'Obesity': ['Metabolic & insulin resistance markers'],
}

const TOTAL = 17

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getGoals = (answers: Answers) =>
  (answers.reasons || []).map(r => GOAL_MAP[r]).filter(Boolean)

const getRisks = (answers: Answers): string[] => {
  const out: string[] = []
  if (RISK_MAP[answers.age || '']) out.push(...RISK_MAP[answers.age || ''])
  ;(answers.familyHistory || []).forEach(h => {
    if (RISK_MAP[h]) out.push(...RISK_MAP[h])
  })
  return [...new Set(out)].slice(0, 4)
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const BG      = '#f9fafb'
const SURFACE = '#ffffff'
const BLUE    = 'var(--blue)'
const TEXT    = '#111827'
const DIM     = '#4b5563'
const MUTED   = '#6b7280'
const BORDER  = 'rgba(0,0,0,0.10)'

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  if (step === 0 || step > TOTAL) return null
  const pct = Math.min(Math.round((step / TOTAL) * 100), 100)
  return (
    <div className="fixed top-0 inset-x-0 z-50 border-b" style={{ backgroundColor: 'rgba(249,250,251,0.97)', backdropFilter: 'blur(16px)', borderColor: BORDER }}>
      <div className="max-w-[480px] mx-auto px-5 py-3 flex items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase whitespace-nowrap" style={{ color: MUTED }}>
          Apex Health
        </span>
        <div className="flex items-center gap-2.5 flex-1 ml-auto max-w-[160px] ml-auto">
          <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(72,144,247,0.12)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: BLUE }} />
          </div>
          <span className="text-[11px] font-bold tabular-nums w-8 text-right" style={{ color: DIM }}>{pct}%</span>
        </div>
      </div>
    </div>
  )
}

function BackBtn({ step, onBack }: { step: number; onBack: () => void }) {
  if (step <= 1) return null
  return (
    <button onClick={onBack} className="flex items-center gap-1.5 text-xs transition-colors mt-1" style={{ color: MUTED }}
      onMouseEnter={e => { e.currentTarget.style.color = DIM }}
      onMouseLeave={e => { e.currentTarget.style.color = MUTED }}>
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Back
    </button>
  )
}

function InfoBox({ text }: { text: string }) {
  return (
    <div className="mt-5 rounded-xl px-4 py-3 flex gap-2.5" style={{ background: 'rgba(72,144,247,0.07)', border: `1px solid rgba(72,144,247,0.18)` }}>
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BLUE }}>
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 8v5M9 6v.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(168,196,232,0.85)' }}>{text}</p>
    </div>
  )
}

function BlueCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0">
      <circle cx="8" cy="8" r="7" fill="rgba(72,144,247,0.15)" />
      <circle cx="8" cy="8" r="7" stroke={BLUE} strokeWidth="0.8" />
      <path d="M5 8l2 2 4-4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PrimaryBtn({ children, onClick, disabled = false }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full rounded-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ background: BLUE, color: '#fff' }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = 'var(--blue-dark)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = BLUE }}>
      {children}
    </button>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChoiceBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full py-4 px-5 rounded-2xl text-sm font-semibold text-left transition-all duration-150"
      style={{ background: SURFACE, color: TEXT, border: `1.5px solid ${BORDER}` }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(72,144,247,0.1)'
        e.currentTarget.style.borderColor = `rgba(72,144,247,0.4)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = SURFACE
        e.currentTarget.style.borderColor = BORDER
      }}>
      {children}
    </button>
  )
}

function MultiSelect({ options, selected, onToggle, exclusive }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; exclusive?: string
}) {
  const toggle = (v: string) => {
    if (exclusive && v === exclusive) { onToggle(exclusive); return }
    onToggle(v)
  }
  return (
    <div className="flex flex-col gap-2.5 mt-5">
      {options.map(opt => {
        const active = selected.includes(opt)
        return (
          <button key={opt} onClick={() => toggle(opt)}
            className="flex items-center gap-3 p-4 rounded-2xl text-sm font-medium transition-all duration-100 text-left"
            style={{
              background: active ? 'rgba(72,144,247,0.12)' : SURFACE,
              color: active ? TEXT : DIM,
              border: `1.5px solid ${active ? 'rgba(72,144,247,0.4)' : BORDER}`,
            }}>
            <span className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all"
              style={{ borderColor: active ? BLUE : 'rgba(72,144,247,0.2)', background: active ? 'rgba(72,144,247,0.2)' : 'rgba(72,144,247,0.04)' }}>
              {active && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HealthQuiz() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [personaIdx, setPersonaIdx] = useState(0)
  const [sel, setSel] = useState<string[]>([])
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const { open } = useSignupGate()

  const STEP_NAMES: Record<number, string> = {
    1: 'energy_q', 2: 'gp_q', 3: 'data_q', 4: 'reasons',
    5: 'personas', 6: 'sex', 7: 'age', 8: 'illness', 9: 'state',
    10: 'educational', 11: 'map', 12: 'testimonial', 13: 'concerns',
    14: 'cond_q', 15: 'family_hx', 16: 'reveal', 17: 'teaser',
    18: 'capture', 19: 'outcome',
  }

  const go = (next: number, extra?: Partial<Answers>) => {
    if (extra) setAnswers(a => ({ ...a, ...extra }))
    setSel([])
    setStep(next)
    track('quiz_step_viewed', { step_number: next, step_name: STEP_NAMES[next] ?? `step_${next}` })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const back = () => go(Math.max(0, step - 1))

  const toggleSel = (v: string, excl?: string) => {
    if (excl && v === excl) { setSel([v]); return }
    setSel(s => s.includes(v) ? s.filter(x => x !== (excl ? excl : v) && x !== v) : [...s.filter(x => x !== (excl || '')), v])
  }

  const condQ = (() => {
    const c = answers.concerns || []
    if (c.includes("I'm not performing at the level I expect of myself"))
      return { q: 'Which area of performance matters most?', opts: ['Mental sharpness & focus', 'Physical strength & endurance', 'Drive and motivation', 'All of the above'] }
    if (c.includes('I feel older than I should for my age') || c.includes('A recent health warning or wake-up call'))
      return { q: 'How would you describe your energy across the day?', opts: ['Strong in the morning, crashes by afternoon', 'Low from the moment I wake up', 'Inconsistent — varies day to day', 'Gradually declining over time'] }
    return { q: 'Which would most improve your quality of life right now?', opts: ['More sustained energy', 'Sharper mental performance', 'Better body composition', 'Improved sleep and recovery'] }
  })()

  const goals = getGoals(answers)
  const risks = getRisks(answers)
  const planName = answers.firstName || firstName || 'Your'

  const inputCls = "w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-colors"
  const inputStyle = { background: SURFACE, color: TEXT, border: `1px solid rgba(72,144,247,0.2)` }
  const wrap = "flex flex-col min-h-screen pt-20 pb-10 px-5"
  const inner = "flex-1 flex flex-col max-w-[480px] mx-auto w-full"
  const heading = "text-[26px] font-bold leading-tight"

  // ── STEPS 1–3: Yes / No micro-quiz ───────────────────────────────────────────
  const YN_STEPS: [number, keyof Answers, string, string][] = [
    [1, 'q1', 'In the past 12 months, have you noticed changes in your energy, body, or mood?',
      'Many men experience meaningful hormonal and metabolic shifts between 35 and 55. Few ever investigate the underlying cause.'],
    [2, 'q2', "Have you ever felt something was off, even when a doctor said everything looks normal?",
      'Standard GP blood panels check fewer than 12 markers. Comprehensive testing assesses 40+ biomarkers and can reveal patterns routine checks miss.'],
    [3, 'q3', 'Are you open to using real data, not guesswork, to understand your health?',
      'Evidence-based clinical treatments use your own biomarker data to inform treatment decisions. That is a fundamentally different approach to your health.'],
  ]
  const ynMatch = YN_STEPS.find(([s]) => s === step)
  if (ynMatch) {
    const [, key, question, callout] = ynMatch
    return (
      <div className={wrap} style={{ background: BG }}>
        <ProgressBar step={step} />
        <div className={inner}>
          <BackBtn step={step} onBack={back} />
          <div className="mt-6">
            <h2 className={`${heading} mb-8`} style={{ color: TEXT }}>{question}</h2>
            <div className="flex flex-col gap-3">
              {['Yes', 'No'].map(opt => <ChoiceBtn key={opt} onClick={() => go(step + 1, { [key]: opt })}>{opt}</ChoiceBtn>)}
            </div>
            <InfoBox text={`Did you know? ${callout}`} />
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 4: What brought you here ────────────────────────────────────────────
  if (step === 4) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={inner}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6">
          <h2 className={`${heading} mb-1`} style={{ color: TEXT }}>What's brought you here today?</h2>
          <p className="text-sm mb-0.5" style={{ color: DIM }}>Select all that apply.</p>
          <MultiSelect options={REASONS} selected={sel} onToggle={v => setSel(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v])} />
          <div className="mt-6"><PrimaryBtn onClick={() => go(5, { reasons: sel })} disabled={sel.length === 0}>Continue <Arrow /></PrimaryBtn></div>
        </div>
      </div>
    </div>
  )

  // ── STEP 5: Why clinical data matters ────────────────────────────────────────
  if (step === 5) {
    const goalLabels = sel.length ? sel.map(r => GOAL_MAP[r]).filter(Boolean) : ['Comprehensive health baseline']
    return (
      <div className={wrap} style={{ background: BG }}>
        <ProgressBar step={step} />
        <div className={inner}>
          <BackBtn step={step} onBack={back} />
          <div className="mt-6">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>What we'll work on</p>
            <h2 className={`${heading} mb-6`} style={{ color: TEXT }}>Here's what your answers point to</h2>
            <div className="rounded-2xl p-5 mb-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              {(goalLabels.length ? goalLabels : ['Comprehensive health baseline']).map(g => (
                <div key={g} className="flex items-center gap-3 text-sm font-medium mb-3 last:mb-0" style={{ color: TEXT }}>
                  <BlueCheck />{g}
                </div>
              ))}
            </div>
            <PrimaryBtn onClick={() => go(6)}>Continue <Arrow /></PrimaryBtn>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 6: Biological sex ────────────────────────────────────────────────────
  if (step === 6) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <h2 className={`${heading} mt-6 mb-2`} style={{ color: TEXT }}>What is your biological sex?</h2>
        <p className="text-sm mb-8" style={{ color: DIM }}>Helps us apply the right reference ranges to your results.</p>
        <div className="flex flex-col gap-3">
          {['Male', 'Female', 'Prefer not to say'].map(opt => <ChoiceBtn key={opt} onClick={() => go(7, { sex: opt })}>{opt}</ChoiceBtn>)}
        </div>
      </div>
    </div>
  )

  // ── STEP 7: Age bracket ───────────────────────────────────────────────────────
  if (step === 7) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <h2 className={`${heading} mt-6 mb-8`} style={{ color: TEXT }}>What is your age?</h2>
        <div className="grid grid-cols-2 gap-3">
          {['Under 30', '30–34', '35–39', '40–44', '45–54', '55+'].map(opt => <ChoiceBtn key={opt} onClick={() => go(8, { age: opt })}>{opt}</ChoiceBtn>)}
        </div>
        <InfoBox text="Hormonal and metabolic function shifts meaningfully across different age brackets. Your panel recommendations are tailored accordingly." />
      </div>
    </div>
  )

  // ── STEP 8: Serious illness ───────────────────────────────────────────────────
  if (step === 8) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <h2 className={`${heading} mt-6 mb-2`} style={{ color: TEXT }}>Are you currently undergoing treatment for a serious medical condition?</h2>
        <p className="text-sm mb-8" style={{ color: DIM }}>Cancer, organ disease, or an active treatment regimen.</p>
        <div className="flex flex-col gap-3">
          {['Yes', 'No'].map(opt => <ChoiceBtn key={opt} onClick={() => go(9, { illness: opt })}>{opt}</ChoiceBtn>)}
        </div>
        {answers.illness === 'Yes' && (
          <div className="mt-4 rounded-xl p-4" style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)' }}>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(253,224,71,0.75)' }}>Please consult your treating physician before starting any new health treatment. Our clinical team can still discuss what might be appropriate for your situation.</p>
          </div>
        )}
      </div>
    </div>
  )

  // ── STEP 9: State picker ──────────────────────────────────────────────────────
  if (step === 9) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <h2 className={`${heading} mt-6 mb-8`} style={{ color: TEXT }}>Which state or territory are you in?</h2>
        <div className="grid grid-cols-2 gap-3">
          {STATES.map(s => <ChoiceBtn key={s} onClick={() => go(10, { state: s })}>{s}</ChoiceBtn>)}
        </div>
      </div>
    </div>
  )

  // ── STEP 10: Educational interstitial ────────────────────────────────────────
  if (step === 10) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6 rounded-3xl p-7" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(72,144,247,0.15)', border: `1px solid rgba(72,144,247,0.25)` }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: BLUE }}>
              <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>Why this matters</p>
          <h2 className="text-2xl font-bold leading-tight mb-4" style={{ color: TEXT }}>
            Most standard blood tests check fewer than 12 markers.
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: DIM }}>
            A comprehensive health intelligence panel assesses 40+ biomarkers, giving you a far more detailed picture of how your hormonal, metabolic, and cardiovascular systems are functioning.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {['40+ biomarkers', 'Hormonal panel', 'Metabolic markers', 'Cardiovascular risk'].map(tag => (
              <div key={tag} className="flex items-center gap-2 text-xs" style={{ color: DIM }}><BlueCheck />{tag}</div>
            ))}
          </div>
          <PrimaryBtn onClick={() => go(11)}>Continue <Arrow /></PrimaryBtn>
        </div>
      </div>
    </div>
  )

  // ── STEP 11: Map screen ───────────────────────────────────────────────────────
  if (step === 11) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={inner}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: BLUE }}>Collection network</p>
          <h2 className={`${heading} mb-6`} style={{ color: TEXT }}>
            4,200+ collection points{answers.state ? ` in and around ${answers.state}` : ' across Australia'}
          </h2>
          <div className="rounded-2xl overflow-hidden mb-6 relative" style={{ background: SURFACE, border: `1px solid ${BORDER}`, aspectRatio: '4/3' }}>
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-60">
              <path d="M60,90 L80,60 L120,45 L180,40 L240,38 L290,42 L330,55 L350,75 L355,100 L340,130 L330,155 L310,175 L290,210 L270,240 L245,255 L220,260 L195,255 L175,240 L160,220 L140,230 L120,240 L100,235 L85,220 L75,200 L65,175 L55,150 L50,120 Z"
                fill="none" stroke="rgba(72,144,247,0.35)" strokeWidth="1.5" />
              {[[310,220],[175,215],[255,100],[130,165],[85,155],[220,180],[290,175],[185,100],[330,130],[150,210],[270,140],[110,200],[340,100],[200,240],[245,120],[160,170],[300,90],[200,140]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill={BLUE} opacity="0.85" />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-end p-5">
              <div className="rounded-xl px-4 py-2.5" style={{ background: 'rgba(4,6,13,0.8)', backdropFilter: 'blur(8px)', border: `1px solid ${BORDER}` }}>
                <p className="text-xs font-semibold" style={{ color: TEXT }}>4,200+ accredited collection centres nationwide</p>
                <p className="text-[10px] mt-0.5" style={{ color: MUTED }}>Morning appointments · No GP referral needed</p>
              </div>
            </div>
          </div>
          <PrimaryBtn onClick={() => go(12)}>Continue <Arrow /></PrimaryBtn>
        </div>
      </div>
    </div>
  )

  // ── STEP 12: Clinical process overview ───────────────────────────────────────
  if (step === 12) return (
    <div className="flex flex-col min-h-screen pt-20 pb-10 px-5" style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>How it works</p>
          <h2 className={`${heading} mb-6`} style={{ color: TEXT }}>From assessment to clinical care in three steps</h2>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { num: '01', title: 'Complete pathology', body: 'Visit any accredited collection centre. No GP referral required.' },
              { num: '02', title: 'Telehealth consultation', body: 'Review your results with an AHPRA-registered doctor.' },
              { num: '03', title: 'Personalised protocol', body: 'Receive an ongoing care plan tailored to your biomarker data.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-4 rounded-2xl p-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                <span className="text-[11px] font-bold tabular-nums pt-0.5 flex-shrink-0" style={{ color: BLUE }}>{num}</span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: TEXT }}>{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: DIM }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
          <PrimaryBtn onClick={() => go(13)}>Continue <Arrow /></PrimaryBtn>
        </div>
      </div>
    </div>
  )

  // ── STEP 13: What's making you look now ──────────────────────────────────────
  if (step === 13) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={inner}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6">
          <h2 className={`${heading} mb-1`} style={{ color: TEXT }}>What's making you look at this now?</h2>
          <p className="text-sm mb-0.5" style={{ color: DIM }}>Select all that apply.</p>
          <MultiSelect options={CONCERNS} selected={sel} onToggle={v => setSel(s => s.includes(v) ? s.filter(x => x !== v) : [...s, v])} />
          <div className="mt-6"><PrimaryBtn onClick={() => go(14, { concerns: sel })} disabled={sel.length === 0}>Continue <Arrow /></PrimaryBtn></div>
        </div>
      </div>
    </div>
  )

  // ── STEP 14: Conditional question ────────────────────────────────────────────
  if (step === 14) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={`${inner} justify-center`}>
        <BackBtn step={step} onBack={back} />
        <h2 className={`${heading} mt-6 mb-8`} style={{ color: TEXT }}>{condQ.q}</h2>
        <div className="flex flex-col gap-3">
          {condQ.opts.map(opt => <ChoiceBtn key={opt} onClick={() => go(15, { condQ: opt })}>{opt}</ChoiceBtn>)}
        </div>
      </div>
    </div>
  )

  // ── STEP 15: Family history ───────────────────────────────────────────────────
  if (step === 15) return (
    <div className={wrap} style={{ background: BG }}>
      <ProgressBar step={step} />
      <div className={inner}>
        <BackBtn step={step} onBack={back} />
        <div className="mt-6">
          <h2 className={`${heading} mb-1`} style={{ color: TEXT }}>Does your family history include any of the following?</h2>
          <p className="text-sm mb-0.5" style={{ color: DIM }}>Select all that apply.</p>
          <MultiSelect options={FAMILY_HX} selected={sel} onToggle={v => toggleSel(v, 'None of the above')} exclusive="None of the above" />
          <div className="mt-6"><PrimaryBtn onClick={() => go(16, { familyHistory: sel })} disabled={sel.length === 0}>Continue <Arrow /></PrimaryBtn></div>
          <InfoBox text="Family history helps identify which panels are most relevant for your risk profile. This is used only to personalise your plan." />
        </div>
      </div>
    </div>
  )

  // ── STEP 16: Recommendation reveal ───────────────────────────────────────────
  if (step === 16) {
    const g = goals.length ? goals : ['Comprehensive health baseline']
    const r = risks.length ? risks : ['Hormonal health markers', 'Metabolic function panel']
    return (
      <div className={wrap} style={{ background: BG }}>
        <ProgressBar step={step} />
        <div className={inner}>
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#22c55e' }} />
              <span className="text-[11px] font-semibold" style={{ color: '#4ade80' }}>Analysis complete</span>
            </div>
            <h2 className={`${heading} mb-6`} style={{ color: TEXT }}>Based on your answers, here's what we've identified</h2>
            <div className="rounded-2xl p-5 mb-4" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>What you want to address</p>
              {g.map(goal => <div key={goal} className="flex items-center gap-3 text-sm font-medium mb-2" style={{ color: TEXT }}><BlueCheck />{goal}</div>)}
            </div>
            <div className="rounded-2xl p-5 mb-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: MUTED }}>Panels worth discussing with your doctor</p>
              {r.map(risk => <div key={risk} className="flex items-center gap-3 text-sm font-medium mb-2" style={{ color: TEXT }}><BlueCheck />{risk}</div>)}
            </div>
            <PrimaryBtn onClick={() => go(17)}>See my personalised plan <Arrow /></PrimaryBtn>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 17: Teaser / locked plan card ───────────────────────────────────────
  if (step === 17) {
    const g = goals.length ? goals : ['Comprehensive health baseline']
    return (
      <div className={wrap} style={{ background: BG }}>
        <ProgressBar step={step} />
        <div className={inner}>
          <div className="mt-6">
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: BLUE }}>Your plan is ready</p>
            <div className="relative rounded-2xl overflow-hidden mb-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg" style={{ color: TEXT }}>{planName}'s Health Intelligence Plan</h3>
                    <p className="text-xs mt-0.5" style={{ color: MUTED }}>Personalised · {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(72,144,247,0.15)', color: BLUE }}>
                    {planName[0].toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {g.slice(0, 3).map(tag => <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.1)', color: 'rgba(168,196,232,0.8)' }}>{tag}</span>)}
                  {answers.state && <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.1)', color: 'rgba(168,196,232,0.8)' }}>{answers.state}</span>}
                </div>
              </div>
              {/* Blurred lock overlay */}
              <div className="relative">
                <div className="px-5 pb-5 blur-sm select-none pointer-events-none">
                  <div className="border-t pt-4" style={{ borderColor: BORDER }}>
                    <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: MUTED }}>Recommended panels</p>
                    {['Panel A — ████████ ██████', 'Panel B — ████ ██████', 'Panel C — ██████████'].map(item => (
                      <div key={item} className="flex items-center gap-2 mb-2"><BlueCheck /><span className="text-xs" style={{ color: DIM }}>{item}</span></div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4" style={{ borderColor: BORDER }}>
                    <p className="text-[10px] uppercase tracking-wider mb-3" style={{ color: MUTED }}>Clinical pathway</p>
                    <div className="rounded-xl h-12" style={{ background: 'rgba(72,144,247,0.06)' }} />
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: 'rgba(13,21,37,0.75)', backdropFilter: 'blur(2px)' }}>
                  <div className="flex items-center gap-2 text-sm font-semibold mb-1" style={{ color: TEXT }}>
                    <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4"><rect x="3" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8V5.5a3 3 0 016 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    Full plan locked
                  </div>
                  <p className="text-xs" style={{ color: MUTED }}>Enter your details to unlock</p>
                </div>
              </div>
            </div>
            <PrimaryBtn onClick={() => go(18)}>Unlock my full plan <Arrow /></PrimaryBtn>
            <p className="text-xs text-center mt-3" style={{ color: MUTED }}>Free · Your details stay private</p>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 18: Capture gate ─────────────────────────────────────────────────────
  if (step === 18) {
    const valid = firstName.trim().length > 0 && email.includes('@') && email.includes('.')
    const handleSubmit = async () => {
      if (!valid) return
      const fn = firstName.trim()
      const em = email.trim()
      const ph = phone.trim()
      const payload = { ...answers, firstName: fn, email: em, phone: ph }
      setAnswers(payload)
      track('quiz_lead_captured', {
        step_number: 18,
        has_phone: ph.length > 0 ? 1 : 0,
        goals_count: (answers.reasons || []).length,
      })
      // Dual send — Web3Forms (browser→admin@) + Resend (server→gmail) for redundancy
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
          subject: `Apex — Health Assessment Lead: ${fn}`,
          name: fn,
          email: em,
          phone: ph || 'Not provided',
          source: 'health-assessment',
          goals: (answers.reasons || []).join(', ') || 'Not specified',
          concerns: (answers.concerns || []).join(', ') || 'Not specified',
          age_bracket: answers.age || 'Not specified',
          state: answers.state || 'Not specified',
          sex: answers.sex || 'Not specified',
          family_history: (answers.familyHistory || []).join(', ') || 'Not specified',
        }),
      }).catch(() => {})
      fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fn, email: em, phone: ph || '',
          source: 'quiz',
          goals: (answers.reasons || []).join(', ') || '',
          concerns: (answers.concerns || []).join(', ') || '',
          age: answers.age || '', state: answers.state || '',
          sex: answers.sex || '',
          familyHistory: (answers.familyHistory || []).join(', ') || '',
        }),
      }).catch(() => {})
      go(19, { firstName: fn, email: em, phone: ph })
    }
    return (
      <div className={wrap} style={{ background: BG }}>
        <ProgressBar step={step} />
        <div className={`${inner} justify-center`}>
          <div className="mt-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(72,144,247,0.12)', border: `1px solid rgba(72,144,247,0.25)` }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: BLUE }}>
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className={`${heading} mb-2`} style={{ color: TEXT }}>Where should we send your plan?</h2>
            <p className="text-sm mb-8" style={{ color: DIM }}>We'll email you a summary and a link to book your consultation. No spam, ever.</p>
            <div className="flex flex-col gap-3 mb-6">
              <input
                className={inputCls} style={inputStyle} aria-label="First name"
                placeholder="First name *" value={firstName}
                onChange={e => setFirstName(e.target.value)}
                onFocus={e => { e.target.style.borderColor = BLUE }}
                onBlur={e => { e.target.style.borderColor = 'rgba(72,144,247,0.2)' }}
                autoComplete="given-name" />
              <input
                className={inputCls} style={inputStyle} aria-label="Email address"
                placeholder="Email address *" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={e => { e.target.style.borderColor = BLUE }}
                onBlur={e => { e.target.style.borderColor = 'rgba(72,144,247,0.2)' }}
                autoComplete="email" />
              <input
                className={inputCls} style={inputStyle} aria-label="Mobile number (optional)"
                placeholder="Mobile number (optional)" type="tel" value={phone}
                onChange={e => setPhone(e.target.value)}
                onFocus={e => { e.target.style.borderColor = BLUE }}
                onBlur={e => { e.target.style.borderColor = 'rgba(72,144,247,0.2)' }}
                autoComplete="tel" />
            </div>
            <PrimaryBtn onClick={handleSubmit} disabled={!valid}>Unlock my plan <Arrow /></PrimaryBtn>
            <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: MUTED }}>
              By continuing you agree to our privacy policy. Your information will not be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── STEP 19: Final outcome ────────────────────────────────────────────────────
  if (step >= 19) {
    const g = goals.length ? goals : ['Comprehensive health baseline']
    const displayName = answers.firstName || firstName || ''
    return (
      <div className="flex flex-col min-h-screen pt-12 pb-12 px-5" style={{ background: BG }}>
        {/* Top glow */}
        <div className="fixed top-0 right-0 w-[400px] h-[300px] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 65%)' }} />
        <div className="max-w-[480px] mx-auto w-full relative">
          <div className="flex items-center gap-2 mb-8 mt-4">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <circle cx="10" cy="10" r="9" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="0.8" />
              <path d="M6 10l3 3 5-5" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: '#4ade80' }}>Your plan is ready</span>
          </div>
          <h2 className="text-2xl font-bold leading-tight mb-1" style={{ color: TEXT }}>
            {displayName ? `${displayName}'s` : 'Your'} Health Intelligence Plan
          </h2>
          <p className="text-sm mb-6" style={{ color: DIM }}>Personalised from your answers · {new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {g.map(tag => <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: BLUE, color: '#fff' }}>{tag}</span>)}
          </div>

          {/* Tier cards */}
          <div className="rounded-2xl p-5 mb-3" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: MUTED }}>Tier 1</p>
                <h3 className="font-bold text-lg" style={{ color: TEXT }}>Diagnostic</h3>
                <p className="text-xs mt-0.5" style={{ color: DIM }}>Understand your baseline</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {['Comprehensive 40+ marker blood panel', 'Doctor-led telehealth consultation', 'Written clinical summary and next steps'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-xs" style={{ color: DIM }}><BlueCheck />{f}</div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5 mb-6 relative" style={{ background: 'rgba(72,144,247,0.08)', border: `2px solid ${BLUE}` }}>
            <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ background: BLUE, color: '#fff' }}>Recommended</span>
            <div className="pr-24 mb-3">
              <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-1" style={{ color: 'rgba(72,144,247,0.5)' }}>Tier 2</p>
              <h3 className="font-bold text-lg" style={{ color: TEXT }}>Optimisation</h3>
              <p className="text-xs mt-0.5" style={{ color: DIM }}>Act on what you find</p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {['Everything in Diagnostic', 'Ongoing personalised protocol', 'Clinical reviews every 3 months', 'Priority support between appointments'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-xs" style={{ color: DIM }}>
                  <BlueCheck />{f}
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => open()}
            className="w-full rounded-full py-4 text-sm font-semibold flex items-center justify-center gap-2 mb-3 transition-all"
            style={{ background: BLUE, color: '#fff', cursor: 'pointer', border: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--blue-dark)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = BLUE }}>
            Get started <Arrow />
          </button>
          <button type="button" onClick={() => open()}
            className="w-full rounded-full py-3.5 text-sm font-medium flex items-center justify-center mb-6 transition-colors"
            style={{ border: `1px solid ${BORDER}`, color: DIM, cursor: 'pointer', background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = TEXT; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(72,144,247,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = DIM; (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER }}>
            Create your account →
          </button>
          <p className="text-[10px] text-center leading-relaxed" style={{ color: MUTED }}>
            AHPRA-registered doctors · All consultations conducted by Australian licensed practitioners<br />
            This assessment does not constitute medical advice. Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
        </div>
      </div>
    )
  }

  return null
}
