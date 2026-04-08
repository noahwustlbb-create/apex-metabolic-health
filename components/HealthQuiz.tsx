'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Program definitions ──────────────────────────────────────────────────────

type PK = 'hormone' | 'metabolic' | 'performance' | 'hair' | 'skin' | 'injury' | 'bloodpanel' | 'general'

const PROGRAMS: Record<PK, { name: string; desc: string; href: string; cta: string; color: string }> = {
  hormone:    { name: 'Hormone Optimisation',        color: '#3575C6', href: '/intake/hormone',  cta: 'Begin Hormone Assessment',     desc: 'Clinically-guided TRT and hormone restoration. Your doctor will review your full hormonal panel before designing a personalised protocol targeting energy, drive, body composition, and performance.' },
  metabolic:  { name: 'Metabolic Weight Management', color: '#7c52e8', href: '/intake/general',  cta: 'Begin Metabolic Assessment',   desc: 'Evidence-based protocols targeting insulin resistance, visceral fat, and the root drivers of stubborn weight gain. Doctor-led and data-driven.' },
  performance:{ name: 'Performance & Recovery',      color: '#e8872c', href: '/intake/general',  cta: 'Begin Performance Assessment', desc: 'Advanced clinical protocols for men who train hard. Optimise recovery markers, output, and endurance through targeted biomarker analysis.' },
  hair:       { name: 'Hair Restoration',            color: '#2e9e52', href: '/intake/general',  cta: 'Begin Hair Assessment',        desc: 'Doctor-prescribed treatment addressing the hormonal and genetic drivers of male pattern hair loss — clinically validated and TGA-compliant.' },
  skin:       { name: 'Skin Regeneration',           color: '#c9a84c', href: '/intake/general',  cta: 'Begin Skin Assessment',        desc: 'Clinical skin protocols combining advanced diagnostics with evidence-based regenerative treatments for lasting skin quality improvement.' },
  injury:     { name: 'Injury Repair & Recovery',    color: '#1a9e8f', href: '/intake/general',  cta: 'Begin Injury Assessment',      desc: 'Targeted repair protocols for chronic injuries, joint issues, and musculoskeletal conditions that have not responded to standard treatment.' },
  bloodpanel: { name: 'Comprehensive Blood Panel',   color: '#00c2b8', href: '/order-bloods',    cta: 'Order Blood Panel',            desc: 'Advanced pathology covering 50+ biomarkers — the most complete picture of your hormonal, metabolic, and cardiovascular health available.' },
  general:    { name: 'General Telehealth',          color: '#8899aa', href: '/intake/general',  cta: 'Book a Consultation',          desc: 'A doctor-led consultation to assess your concerns, review your health history, and map the right clinical pathway forward.' },
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

type W = Partial<Record<PK, number>>
type Scores = Record<PK, number>

const zero = (): Scores => ({ hormone:0, metabolic:0, performance:0, hair:0, skin:0, injury:0, bloodpanel:0, general:0 })

function merge(s: Scores, w: W): Scores {
  const n = { ...s }
  for (const k in w) n[k as PK] += w[k as PK]!
  return n
}

function top(s: Scores): PK[] {
  return (Object.entries(s) as [PK, number][])
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([k]) => k)
}

// ─── Question data ────────────────────────────────────────────────────────────

const GOALS = [
  { id: 'energy',      label: 'Energy & vitality',         sub: 'Fatigue, motivation, drive',          w: { hormone:3, metabolic:2, performance:1 } as W },
  { id: 'weight',      label: 'Weight management',         sub: 'Fat loss, body composition',          w: { metabolic:3, hormone:2 } as W },
  { id: 'performance', label: 'Athletic performance',      sub: 'Strength, endurance, output',         w: { performance:3, hormone:2 } as W },
  { id: 'recovery',    label: 'Recovery & repair',         sub: 'Post-training, sleep, healing',       w: { performance:3, injury:2, hormone:1 } as W },
  { id: 'hair',        label: 'Hair restoration',          sub: 'Thinning, loss, regrowth',            w: { hair:4, hormone:1 } as W },
  { id: 'skin',        label: 'Skin & appearance',         sub: 'Ageing, texture, regeneration',       w: { skin:4 } as W },
  { id: 'injury',      label: 'Injury & joint pain',       sub: 'Chronic pain, mobility',              w: { injury:4, performance:1 } as W },
  { id: 'health',      label: 'General health check',      sub: 'Baseline, prevention, clarity',       w: { bloodpanel:3, general:2 } as W },
]

const SYMPTOMS = [
  { id: 'low_energy',    label: 'Persistent fatigue or low energy',          w: { hormone:3, metabolic:2, performance:1 } as W },
  { id: 'brain_fog',     label: 'Brain fog or poor concentration',           w: { hormone:2, metabolic:2 } as W },
  { id: 'weight_gain',   label: 'Unexplained weight gain or belly fat',      w: { metabolic:3, hormone:2 } as W },
  { id: 'poor_recovery', label: 'Slow recovery after training or exertion',  w: { performance:3, hormone:2 } as W },
  { id: 'low_libido',    label: 'Low libido or reduced sex drive',           w: { hormone:4 } as W },
  { id: 'mood',          label: 'Mood changes or persistent low mood',       w: { hormone:2, metabolic:1 } as W },
  { id: 'sleep',         label: 'Poor sleep or waking unrefreshed',          w: { hormone:2, performance:1, metabolic:1 } as W },
  { id: 'hair_loss',     label: 'Hair thinning or visible hair loss',        w: { hair:4, hormone:1 } as W },
  { id: 'skin_issues',   label: 'Skin concerns or accelerated ageing',       w: { skin:4 } as W },
  { id: 'joint_pain',    label: 'Joint, muscle, or chronic pain',            w: { injury:4, performance:1 } as W },
  { id: 'strength',      label: 'Declining strength or physical capability', w: { performance:3, hormone:2 } as W },
  { id: 'none',          label: 'None of the above',                         w: { bloodpanel:2, general:2 } as W },
]

const DURATIONS = [
  { id: 'recent',   label: 'Less than 3 months',  w: { general:1, bloodpanel:1 } as W },
  { id: 'months',   label: '3 – 12 months',        w: { hormone:1, metabolic:1 } as W },
  { id: 'years',    label: '1 – 3 years',           w: { hormone:2, metabolic:1 } as W },
  { id: 'longterm', label: 'More than 3 years',    w: { hormone:3, metabolic:2 } as W },
]

const TRAINING = [
  { id: 'none',     label: 'Not currently training',  sub: 'Sedentary or light activity',   w: { metabolic:1, general:1 } as W },
  { id: 'light',    label: '1 – 2x per week',          sub: 'Light, inconsistent',           w: { hormone:1, performance:1 } as W },
  { id: 'moderate', label: '3 – 4x per week',          sub: 'Regular training',              w: { performance:2, hormone:1 } as W },
  { id: 'heavy',    label: '5+ per week',              sub: 'High volume athlete',           w: { performance:3, injury:1 } as W },
]

const AGES = [
  { id: '18-25', label: '18 – 25', w: { performance:1, general:1 } as W },
  { id: '26-35', label: '26 – 35', w: { hormone:2, metabolic:1, performance:1 } as W },
  { id: '36-45', label: '36 – 45', w: { hormone:3, metabolic:2 } as W },
  { id: '46-55', label: '46 – 55', w: { hormone:3, metabolic:2, bloodpanel:1 } as W },
  { id: '56+',   label: '56+',     w: { hormone:2, metabolic:2, bloodpanel:2 } as W },
]

const CONDITIONS = [
  { id: 'diabetes',   label: 'Diabetes or pre-diabetes',           w: { metabolic:3 } as W },
  { id: 'thyroid',    label: 'Thyroid condition',                  w: { hormone:2, metabolic:1 } as W },
  { id: 'heart',      label: 'Heart or cardiovascular condition',  w: { bloodpanel:2, general:2 } as W },
  { id: 'autoimmune', label: 'Autoimmune condition',               w: { general:2, bloodpanel:1 } as W },
  { id: 'cancer',     label: 'Cancer or history of cancer',        w: { general:3, bloodpanel:2 } as W },
  { id: 'none',       label: 'None of the above',                  w: {} as W },
]

const READINESS = [
  { id: 'now',       label: 'Ready to start now',           sub: 'Looking to book within the week',  w: { hormone:1, metabolic:1, performance:1 } as W },
  { id: 'soon',      label: 'Within the next 2 – 4 weeks',  sub: 'Researching, nearly decided',      w: {} as W },
  { id: 'exploring', label: 'Still exploring options',      sub: 'Early stage, not yet committed',   w: { bloodpanel:1, general:1 } as W },
]

// ─── Step types ───────────────────────────────────────────────────────────────

type Step = 'intro' | 'goal' | 'symptoms' | 'duration' | 'training' | 'age' | 'conditions' | 'readiness' | 'analysing' | 'capture' | 'results'

const STEPS: Step[] = ['intro','goal','symptoms','duration','training','age','conditions','readiness','analysing','capture','results']
const Q_STEPS: Step[] = ['goal','symptoms','duration','training','age','conditions','readiness']

// ─── Motion variants ──────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const
const variants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Card({ children, selected, onClick }: { children: React.ReactNode; selected?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl px-6 py-5 transition-all duration-200"
      style={{
        background: selected ? 'rgba(0,194,184,0.07)' : 'rgba(255,255,255,0.025)',
        border: `1px solid ${selected ? 'rgba(0,194,184,0.45)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: selected ? '0 0 0 1px rgba(0,194,184,0.12), inset 0 0 20px rgba(0,194,184,0.04)' : 'none',
        transform: selected ? 'translateY(-1px)' : 'none',
      }}
    >
      {children}
    </button>
  )
}

function Dot({ selected }: { selected: boolean }) {
  return (
    <span className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150"
      style={{
        width: 22, height: 22,
        background: selected ? 'var(--teal)' : 'transparent',
        border: `1.5px solid ${selected ? 'var(--teal)' : 'rgba(255,255,255,0.18)'}`,
      }}
    >
      {selected && (
        <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
          <path d="M1.5 5.5L4 8l4.5-5.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  )
}

function ContinueBtn({ onClick, disabled, label = 'Continue' }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: disabled ? 0.35 : 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="btn-teal w-full justify-center mt-6 text-sm"
      style={{ cursor: disabled ? 'not-allowed' : 'pointer', pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {label}
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-xs font-medium transition-colors"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  )
}

function StepLabel({ n, total }: { n: number; total: number }) {
  return (
    <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}>
      {n} / {total}
    </span>
  )
}

function QHead({ eyebrow, heading, sub }: { eyebrow: string; heading: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="label mb-3">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', lineHeight: 1.2 }}>
        {heading}
      </h2>
      {sub && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
    </div>
  )
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center max-w-lg mx-auto px-4">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest"
        style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.2)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)' }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--teal)' }} />
        PERFORMANCE HEALTH ASSESSMENT
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', lineHeight: 1.05 }}>
        Find Your<br /><span className="text-teal-gradient">Clinical Program</span>
      </h1>

      <p className="text-base md:text-lg leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        7 questions. 2 minutes. Matched to up to 3 programs based on your goals, symptoms, and health profile.
      </p>
      <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
        Checking your eligibility for Apex clinical programs.
      </p>

      <div className="flex items-center justify-center gap-10 mb-10">
        {[['7', 'Questions'], ['< 2 min', 'To complete'], ['8', 'Programs mapped']].map(([v, l]) => (
          <div key={l} className="text-center">
            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--teal)' }}>{v}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{l}</p>
          </div>
        ))}
      </div>

      <button onClick={onStart} className="btn-teal px-10 py-4 text-sm">
        Begin Assessment
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>Doctor-curated · No cost · No commitment</p>
    </div>
  )
}

function GoalStep({ onNext, onBack }: { onNext: (ids: string[], w: W) => void; onBack?: () => void }) {
  const [sel, setSel] = useState<string[]>([])

  function toggle(id: string) {
    setSel(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function handleNext() {
    const w = zero()
    for (const id of sel) {
      const g = GOALS.find(x => x.id === id)!
      for (const k in g.w) w[k as PK] += g.w[k as PK]!
    }
    onNext(sel, w)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        {onBack ? <BackBtn onClick={onBack} /> : <span />}
        <StepLabel n={1} total={7} />
      </div>
      <QHead eyebrow="Primary Goal" heading="What are you looking to improve?" sub="Select all that apply — we'll build your profile from there." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GOALS.map(g => {
          const selected = sel.includes(g.id)
          return (
            <button key={g.id} onClick={() => toggle(g.id)}
              className="text-left rounded-2xl px-6 py-5 transition-all duration-200 flex items-start gap-4"
              style={{
                background: selected ? 'rgba(0,194,184,0.07)' : 'rgba(255,255,255,0.025)',
                border: `1px solid ${selected ? 'rgba(0,194,184,0.45)' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: selected ? '0 0 0 1px rgba(0,194,184,0.12)' : 'none',
              }}
            >
              <span className="flex-shrink-0 flex items-center justify-center rounded-md mt-0.5 transition-all duration-150"
                style={{ width: 20, height: 20, background: selected ? 'var(--teal)' : 'transparent', border: `1.5px solid ${selected ? 'var(--teal)' : 'rgba(255,255,255,0.18)'}` }}>
                {selected && (
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path d="M1.5 5.5L4 8l4.5-5.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span>
                <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{g.label}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{g.sub}</p>
              </span>
            </button>
          )
        })}
      </div>
      <ContinueBtn onClick={handleNext} disabled={sel.length === 0} />
    </div>
  )
}

function SymptomsStep({ onNext, onBack }: { onNext: (ids: string[], w: W) => void; onBack: () => void }) {
  const [sel, setSel] = useState<string[]>([])

  function toggle(id: string) {
    if (id === 'none') { setSel(s => s.includes('none') ? [] : ['none']); return }
    setSel(prev => {
      const without = prev.filter(x => x !== 'none')
      return without.includes(id) ? without.filter(x => x !== id) : [...without, id]
    })
  }

  function handleNext() {
    const w = zero()
    for (const id of sel) {
      const s = SYMPTOMS.find(x => x.id === id)!
      for (const k in s.w) w[k as PK] += s.w[k as PK]!
    }
    onNext(sel, w)
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={2} total={7} />
      </div>
      <QHead eyebrow="Symptoms" heading="Which of these do you experience?" sub="Select all that apply — this shapes your program match." />
      <div className="flex flex-col gap-2.5">
        {SYMPTOMS.map(s => (
          <Card key={s.id} selected={sel.includes(s.id)} onClick={() => toggle(s.id)}>
            <div className="flex items-center gap-4">
              <Dot selected={sel.includes(s.id)} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
            </div>
          </Card>
        ))}
      </div>
      <ContinueBtn onClick={handleNext} disabled={sel.length === 0} />
    </div>
  )
}

function DurationStep({ onSelect, onBack }: { onSelect: (id: string, w: W) => void; onBack: () => void }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={3} total={7} />
      </div>
      <QHead eyebrow="Timeline" heading="How long have you felt this way?" sub="Duration helps determine the likely cause and appropriate intervention." />
      <div className="flex flex-col gap-2.5">
        {DURATIONS.map(d => (
          <Card key={d.id} onClick={() => onSelect(d.id, d.w)}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>{d.label}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TrainingStep({ onSelect, onBack }: { onSelect: (id: string, w: W) => void; onBack: () => void }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={4} total={7} />
      </div>
      <QHead eyebrow="Lifestyle" heading="How often do you currently train?" sub="Physical activity levels directly influence hormone and recovery protocols." />
      <div className="flex flex-col gap-2.5">
        {TRAINING.map(t => (
          <Card key={t.id} onClick={() => onSelect(t.id, t.w)}>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>{t.label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AgeStep({ onSelect, onBack }: { onSelect: (id: string, w: W) => void; onBack: () => void }) {
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={5} total={7} />
      </div>
      <QHead eyebrow="Profile" heading="What is your age range?" sub="Hormonal and metabolic baselines shift significantly across decades." />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {AGES.map(a => (
          <button key={a.id} onClick={() => onSelect(a.id, a.w)}
            className="rounded-2xl py-6 text-center font-bold text-xl transition-all duration-200"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(0,194,184,0.35)'; e.currentTarget.style.background = 'rgba(0,194,184,0.06)'; e.currentTarget.style.color = 'var(--teal)' }}
            onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ConditionsStep({ onNext, onBack }: { onNext: (ids: string[], w: W) => void; onBack: () => void }) {
  const [sel, setSel] = useState<string[]>([])

  function toggle(id: string) {
    if (id === 'none') { setSel(s => s.includes('none') ? [] : ['none']); return }
    setSel(prev => {
      const without = prev.filter(x => x !== 'none')
      return without.includes(id) ? without.filter(x => x !== id) : [...without, id]
    })
  }

  function handleNext() {
    const w = zero()
    for (const id of sel) {
      const c = CONDITIONS.find(x => x.id === id)!
      for (const k in c.w) w[k as PK] += c.w[k as PK]!
    }
    onNext(sel, w)
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={6} total={7} />
      </div>
      <QHead eyebrow="Medical Context" heading="Any existing medical conditions?" sub="This ensures we route you to the correct clinical pathway safely." />
      <div className="flex flex-col gap-2.5">
        {CONDITIONS.map(c => (
          <Card key={c.id} selected={sel.includes(c.id)} onClick={() => toggle(c.id)}>
            <div className="flex items-center gap-4">
              <Dot selected={sel.includes(c.id)} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{c.label}</span>
            </div>
          </Card>
        ))}
      </div>
      <ContinueBtn onClick={handleNext} disabled={sel.length === 0} />
    </div>
  )
}

function ReadinessStep({ onSelect, onBack }: { onSelect: (id: string, w: W) => void; onBack: () => void }) {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <BackBtn onClick={onBack} />
        <StepLabel n={7} total={7} />
      </div>
      <QHead eyebrow="Commitment" heading="How ready are you to take action?" sub="We personalise your next steps based on where you're at right now." />
      <div className="flex flex-col gap-2.5">
        {READINESS.map(r => (
          <Card key={r.id} onClick={() => onSelect(r.id, r.w)}>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>{r.label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{r.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Analysing({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setLine(1), 700)
    const t2 = setTimeout(() => setLine(2), 1600)
    const t3 = setTimeout(onDone, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  const lines = ['Analysing your health profile…', 'Matching you to clinical programs…']

  return (
    <div className="text-center max-w-sm mx-auto px-4">
      <div className="flex items-center justify-center gap-2 mb-10">
        {[0, 1, 2].map(i => (
          <motion.span key={i} className="rounded-full"
            style={{ width: 10, height: 10, background: 'var(--teal)', display: 'block' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="space-y-3">
        {lines.map((l, i) => (
          <AnimatePresence key={l}>
            {line > i && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="text-base font-medium" style={{ color: i === 0 ? 'var(--text-secondary)' : 'var(--teal)', fontFamily: 'var(--font-space-grotesk)' }}>
                {l}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  )
}

function Capture({ onSubmit, submitting, onBack }: {
  onSubmit: (first: string, email: string, mobile: string) => void
  submitting: boolean
  onBack: () => void
}) {
  const [first, setFirst] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const valid = first.trim().length > 1 && email.includes('@') && email.includes('.') && mobile.trim().length >= 8

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-inter)',
    borderRadius: 6,
    width: '100%',
    padding: '14px 18px',
    fontSize: 14,
    outline: 'none',
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest"
        style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.25)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)' }}>
        <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
          <path d="M13 4L6 11l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ELIGIBILITY CONFIRMED
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        Your personalised<br />protocol is ready
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        Enter your details to unlock your clinical program matches and recommended pathway.
      </p>

      <div className="flex flex-col gap-3 mb-4 text-left">
        <input type="text" placeholder="First name" value={first} onChange={e => setFirst(e.target.value)}
          style={inputStyle}
          onFocus={e => (e.target.style.border = '1px solid rgba(0,194,184,0.4)')}
          onBlur={e => (e.target.style.border = '1px solid rgba(255,255,255,0.08)')}
        />
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle}
          onFocus={e => (e.target.style.border = '1px solid rgba(0,194,184,0.4)')}
          onBlur={e => (e.target.style.border = '1px solid rgba(255,255,255,0.08)')}
        />
        <input type="tel" placeholder="Mobile number" value={mobile} onChange={e => setMobile(e.target.value)}
          style={inputStyle}
          onFocus={e => (e.target.style.border = '1px solid rgba(0,194,184,0.4)')}
          onBlur={e => (e.target.style.border = '1px solid rgba(255,255,255,0.08)')}
        />
      </div>

      <button onClick={() => onSubmit(first.trim(), email.trim(), mobile.trim())} disabled={!valid || submitting}
        className="btn-teal w-full justify-center"
        style={{ opacity: !valid || submitting ? 0.4 : 1, cursor: !valid || submitting ? 'not-allowed' : 'pointer' }}>
        {submitting ? 'Loading…' : 'Unlock My Results'}
        {!submitting && (
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <button onClick={onBack} className="block mx-auto mt-4 text-xs transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
        ← Back
      </button>

      <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
        No spam. Reviewed by our clinical team. No commitment required.
      </p>
    </div>
  )
}

function Results({ matches, firstName }: { matches: PK[]; firstName: string }) {
  const primary = matches[0]
  const secondary = matches.slice(1)
  if (!primary) return null
  const p = PROGRAMS[primary]

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-bold tracking-widest"
          style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.25)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)' }}>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
            <path d="M13 4L6 11l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          CLINICAL MATCH CONFIRMED
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
          {firstName ? `${firstName}, here are` : 'Here are'} your program matches
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Based on your goals and symptom profile. Your primary recommendation is below.
        </p>
      </div>

      {/* Primary */}
      <div className="rounded-2xl overflow-hidden mb-4"
        style={{ background: 'var(--surface)', border: `1px solid ${p.color}44`, boxShadow: `0 0 50px ${p.color}1a` }}>
        <div className="h-1" style={{ background: p.color }} />
        <div className="p-7 md:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold mb-4"
            style={{ background: `${p.color}18`, border: `1px solid ${p.color}40`, color: p.color, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em' }}>
            PRIMARY MATCH
          </span>
          <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
            {p.name}
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
          <a href={p.href} className="btn-teal inline-flex">
            {p.cta}
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>Limited consultation availability</p>
        </div>
      </div>

      {/* Secondary */}
      {secondary.length > 0 && (
        <>
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)' }}>
            ALSO RELEVANT
          </p>
          <div className="flex flex-col gap-3">
            {secondary.map(key => {
              const s = PROGRAMS[key]
              return (
                <div key={key} className="rounded-xl p-5 flex items-center gap-4"
                  style={{ background: 'var(--surface)', border: `1px solid ${s.color}22` }}>
                  <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{s.name}</p>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                  </div>
                  <a href={s.href} className="btn-ghost text-xs px-4 py-2 flex-shrink-0">View</a>
                </div>
              )
            })}
          </div>
        </>
      )}

      <div className="mt-8 rounded-xl p-4 text-xs leading-relaxed"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Clinical note: </span>
        These recommendations are based on self-reported responses and are a guide only. Diagnosis and treatment require assessment by one of our AHPRA-registered practitioners.
      </div>
    </div>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function HealthQuiz() {
  const [step, setStep]       = useState<Step>('intro')
  const [dir, setDir]         = useState(1)
  const [scores, setScores]   = useState<Scores>(zero())
  const [matches, setMatches] = useState<PK[]>([])
  const [firstName, setFirstName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function go(next: Step, d = 1) { setDir(d); setStep(next) }

  function applyAndGo(w: W, next: Step) {
    setScores(prev => merge(prev, w))
    go(next)
  }

  function progressPct() {
    if (step === 'intro') return 0
    if (step === 'results') return 100
    if (step === 'analysing' || step === 'capture') return 95
    const i = Q_STEPS.indexOf(step)
    return Math.round(((i + 1) / Q_STEPS.length) * 90)
  }

  async function handleCapture(first: string, email: string, mobile: string) {
    setSubmitting(true)
    setFirstName(first)
    const m = top(scores)
    setMatches(m)
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
          subject: `Quiz Lead — ${m.map(k => PROGRAMS[k].name).join(', ')}`,
          from_name: first || 'Quiz Lead',
          email,
          message: `Programs matched: ${m.map(k => PROGRAMS[k].name).join(', ')}\nMobile: ${mobile}`,
        }),
      })
    } catch {}
    setSubmitting(false)
    go('results')
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />

      {/* Progress bar */}
      {step !== 'intro' && (
        <div className="fixed left-0 right-0 z-40" style={{ top: 80, height: 2, background: 'rgba(255,255,255,0.04)' }}>
          <motion.div className="h-full" style={{ background: 'var(--teal)' }}
            animate={{ width: `${progressPct()}%` }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        </div>
      )}

      <main className="min-h-screen flex items-center justify-center py-24 pt-32">
        <div className="w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={variants}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.28, ease }}>

              {step === 'intro'      && <Intro onStart={() => go('goal')} />}
              {step === 'goal'       && <GoalStep onNext={(_, w) => applyAndGo(w, 'symptoms')} />}
              {step === 'symptoms'   && <SymptomsStep onNext={(_, w) => applyAndGo(w, 'duration')} onBack={() => go('goal', -1)} />}
              {step === 'duration'   && <DurationStep onSelect={(_, w) => applyAndGo(w, 'training')} onBack={() => go('symptoms', -1)} />}
              {step === 'training'   && <TrainingStep onSelect={(_, w) => applyAndGo(w, 'age')} onBack={() => go('duration', -1)} />}
              {step === 'age'        && <AgeStep onSelect={(_, w) => applyAndGo(w, 'conditions')} onBack={() => go('training', -1)} />}
              {step === 'conditions' && <ConditionsStep onNext={(_, w) => applyAndGo(w, 'readiness')} onBack={() => go('age', -1)} />}
              {step === 'readiness'  && <ReadinessStep onSelect={(_, w) => applyAndGo(w, 'analysing')} onBack={() => go('conditions', -1)} />}
              {step === 'analysing'  && <Analysing onDone={() => go('capture')} />}
              {step === 'capture'    && <Capture onSubmit={handleCapture} submitting={submitting} onBack={() => go('readiness', -1)} />}
              {step === 'results'    && <Results matches={matches} firstName={firstName} />}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {step === 'results' && <Footer />}
    </div>
  )
}
