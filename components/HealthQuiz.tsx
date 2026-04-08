'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Program Registry ─────────────────────────────────────────────────────────

const PROGRAMS = {
  hormone: {
    name: 'Hormone Optimisation',
    desc: 'Clinically-guided hormone restoration for men experiencing testosterone decline, fatigue, reduced drive, and loss of performance.',
    href: '/intake/hormone',
    cta: 'Begin Hormone Assessment',
    color: '#3575C6',
    glow: 'rgba(53,117,198,0.18)',
  },
  metabolic: {
    name: 'Metabolic Weight Management',
    desc: 'Evidence-based protocols targeting insulin resistance, body composition, and the root drivers of stubborn weight gain.',
    href: '/intake/general',
    cta: 'Begin Metabolic Assessment',
    color: '#7c52e8',
    glow: 'rgba(124,82,232,0.18)',
  },
  performance: {
    name: 'Performance & Recovery',
    desc: 'Advanced protocols for men who train hard and want to break through plateaus, recover faster, and sustain peak output.',
    href: '/intake/general',
    cta: 'Begin Performance Assessment',
    color: '#e8872c',
    glow: 'rgba(232,135,44,0.18)',
  },
  hair: {
    name: 'Hair Restoration',
    desc: 'Doctor-prescribed treatment addressing the hormonal and genetic drivers of male pattern hair loss.',
    href: '/intake/general',
    cta: 'Begin Hair Assessment',
    color: '#2e9e52',
    glow: 'rgba(46,158,82,0.18)',
  },
  skin: {
    name: 'Skin Regeneration',
    desc: 'Clinical skin protocols combining advanced diagnostics with evidence-based regenerative treatments.',
    href: '/intake/general',
    cta: 'Begin Skin Assessment',
    color: '#c9a84c',
    glow: 'rgba(201,168,76,0.18)',
  },
  injury: {
    name: 'Injury Repair & Recovery',
    desc: 'Targeted repair protocols for chronic injuries, joint issues, and musculoskeletal conditions that haven\'t responded to standard care.',
    href: '/intake/general',
    cta: 'Begin Injury Assessment',
    color: '#1a9e8f',
    glow: 'rgba(26,158,143,0.18)',
  },
  bloodpanel: {
    name: 'Comprehensive Blood Panel',
    desc: 'Advanced pathology covering 50+ biomarkers — the most complete picture of your health, baseline or ongoing.',
    href: '/order-bloods',
    cta: 'Order Blood Panel',
    color: '#00c2b8',
    glow: 'rgba(0,194,184,0.18)',
  },
  general: {
    name: 'General Telehealth',
    desc: 'A doctor-led consultation to assess your concerns, review your history, and map the right clinical pathway for you.',
    href: '/intake/general',
    cta: 'Book a Consultation',
    color: '#8899aa',
    glow: 'rgba(136,153,170,0.12)',
  },
} as const

type ProgramKey = keyof typeof PROGRAMS
type Scores = Record<ProgramKey, number>

function baseScores(): Scores {
  return { hormone: 0, metabolic: 0, performance: 0, hair: 0, skin: 0, injury: 0, bloodpanel: 0, general: 0 }
}

function addWeights(scores: Scores, delta: Partial<Scores>): Scores {
  const next = { ...scores }
  for (const k in delta) next[k as ProgramKey] += delta[k as ProgramKey] ?? 0
  return next
}

function rankPrograms(scores: Scores, n = 3): ProgramKey[] {
  return (Object.entries(scores) as [ProgramKey, number][])
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([k]) => k)
}

// ─── Question Data ────────────────────────────────────────────────────────────

const GOALS = [
  { id: 'energy',      label: 'Energy & vitality',            sub: 'Fatigue, motivation, drive',        w: { hormone: 3, metabolic: 2, performance: 1 } },
  { id: 'weight',      label: 'Weight & body composition',    sub: 'Fat loss, metabolism',              w: { metabolic: 3, hormone: 2 } },
  { id: 'performance', label: 'Athletic performance',         sub: 'Strength, output, endurance',       w: { performance: 3, hormone: 2 } },
  { id: 'recovery',    label: 'Recovery & repair',            sub: 'Muscle, sleep, healing',            w: { performance: 3, injury: 2, hormone: 1 } },
  { id: 'hair',        label: 'Hair restoration',             sub: 'Thinning, loss, regrowth',          w: { hair: 4, hormone: 1 } },
  { id: 'skin',        label: 'Skin & appearance',            sub: 'Ageing, texture, regeneration',     w: { skin: 4 } },
  { id: 'injury',      label: 'Injury & joint pain',          sub: 'Chronic pain, mobility',            w: { injury: 4, performance: 1 } },
  { id: 'health',      label: 'General health check',         sub: 'Baseline, prevention, clarity',     w: { bloodpanel: 3, general: 2 } },
]

const SYMPTOMS = [
  { id: 'low_energy',     label: 'Persistent low energy or fatigue',          w: { hormone: 3, metabolic: 2, performance: 1 } },
  { id: 'brain_fog',      label: 'Brain fog or difficulty concentrating',      w: { hormone: 2, metabolic: 2 } },
  { id: 'weight_gain',    label: 'Unexplained weight gain or belly fat',       w: { metabolic: 3, hormone: 2 } },
  { id: 'poor_recovery',  label: 'Slow recovery from training or exertion',    w: { performance: 3, hormone: 2 } },
  { id: 'low_libido',     label: 'Low libido or reduced sex drive',            w: { hormone: 4 } },
  { id: 'mood',           label: 'Mood changes, irritability, or low mood',    w: { hormone: 2, metabolic: 1 } },
  { id: 'sleep',          label: 'Poor sleep quality or waking unrefreshed',   w: { hormone: 2, performance: 1, metabolic: 1 } },
  { id: 'hair_loss',      label: 'Hair thinning or noticeable hair loss',      w: { hair: 4, hormone: 1 } },
  { id: 'skin_issues',    label: 'Skin concerns or accelerated ageing',        w: { skin: 4 } },
  { id: 'joint_pain',     label: 'Joint, muscle, or chronic pain',             w: { injury: 4, performance: 1 } },
  { id: 'strength',       label: 'Declining strength or physical capability',  w: { performance: 3, hormone: 2 } },
  { id: 'none',           label: 'None of the above',                          w: { bloodpanel: 2, general: 2 } },
]

const DURATIONS = [
  { id: 'recent',   label: 'Under 3 months',     w: { general: 1, bloodpanel: 1 } },
  { id: 'months',   label: '3–12 months',         w: { hormone: 1, metabolic: 1 } },
  { id: 'years',    label: '1–3 years',           w: { hormone: 2, metabolic: 1 } },
  { id: 'longterm', label: 'More than 3 years',   w: { hormone: 3, metabolic: 2 } },
]

const TRAINING = [
  { id: 'none',     label: 'Not currently training',   sub: 'Sedentary or very light',     w: { metabolic: 1, general: 1 } },
  { id: 'light',    label: '1–2x per week',            sub: 'Light activity',              w: { hormone: 1, performance: 1 } },
  { id: 'moderate', label: '3–4x per week',            sub: 'Regular training',            w: { performance: 2, hormone: 1 } },
  { id: 'heavy',    label: '5+ per week',              sub: 'High-performance athlete',    w: { performance: 3, injury: 1 } },
]

const AGES = [
  { id: '18-30', label: '18–30',  w: { performance: 1, general: 1 } },
  { id: '31-40', label: '31–40',  w: { hormone: 2, metabolic: 1, performance: 1 } },
  { id: '41-50', label: '41–50',  w: { hormone: 3, metabolic: 2 } },
  { id: '51-60', label: '51–60',  w: { hormone: 3, metabolic: 2, bloodpanel: 1 } },
  { id: '61+',   label: '61+',    w: { hormone: 2, metabolic: 2, bloodpanel: 2 } },
]

const CONDITIONS = [
  { id: 'diabetes',    label: 'Diabetes or pre-diabetes',          w: { metabolic: 3 } },
  { id: 'thyroid',     label: 'Thyroid condition',                 w: { hormone: 2, metabolic: 1 } },
  { id: 'heart',       label: 'Heart or cardiovascular condition', w: { bloodpanel: 2, general: 2 } },
  { id: 'autoimmune',  label: 'Autoimmune condition',              w: { general: 2, bloodpanel: 1 } },
  { id: 'none',        label: 'None of the above',                 w: {} },
]

const READINESS = [
  { id: 'now',       label: "I'm ready to start now",         sub: 'Looking to book within the week',  w: { hormone: 1, metabolic: 1, performance: 1 } },
  { id: 'soon',      label: 'Within the next 2–4 weeks',      sub: 'Researching, nearly decided',      w: {} },
  { id: 'exploring', label: "I'm still exploring options",    sub: 'Not yet committed',                w: { bloodpanel: 1, general: 1 } },
]

// ─── Step flow ────────────────────────────────────────────────────────────────

type StepId = 'intro' | 'goal' | 'symptoms' | 'duration' | 'training' | 'age' | 'conditions' | 'readiness' | 'capture' | 'results'

const STEP_ORDER: StepId[] = ['intro', 'goal', 'symptoms', 'duration', 'training', 'age', 'conditions', 'readiness', 'capture', 'results']
const QUESTION_STEPS: StepId[] = ['goal', 'symptoms', 'duration', 'training', 'age', 'conditions', 'readiness']

interface Answers {
  goal?: string
  symptoms?: string[]
  duration?: string
  training?: string
  age?: string
  conditions?: string[]
  readiness?: string
  firstName?: string
  email?: string
}

// ─── Animation variants ───────────────────────────────────────────────────────

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit:  (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
}
const ease = [0.22, 1, 0.36, 1] as const

// ─── Shared UI ────────────────────────────────────────────────────────────────

function StepShell({ step, total, onBack, children }: {
  step: number; total: number; onBack?: () => void; children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Step counter + back */}
      <div className="flex items-center justify-between mb-8">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : <span />}
        <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em' }}>
          {step} / {total}
        </span>
      </div>
      {children}
    </div>
  )
}

function OptionCard({ label, sub, selected, onClick, multi }: {
  label: string; sub?: string; selected: boolean; onClick: () => void; multi?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl px-5 py-4 transition-all duration-200 flex items-center gap-4"
      style={{
        background: selected ? 'rgba(0,194,184,0.07)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${selected ? 'rgba(0,194,184,0.4)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: selected ? '0 0 0 1px rgba(0,194,184,0.15)' : 'none',
        transform: selected ? 'translateY(-1px)' : 'none',
      }}
    >
      {/* Indicator */}
      <span
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: 20, height: 20,
          borderRadius: multi ? 4 : 10,
          border: `1.5px solid ${selected ? 'var(--teal)' : 'rgba(255,255,255,0.15)'}`,
          background: selected ? 'var(--teal)' : 'transparent',
          transition: 'all 0.15s',
        }}
      >
        {selected && (
          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
            <path d="M1.5 5.5L4 8l4.5-5.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'var(--font-space-grotesk)' }}>
          {label}
        </span>
        {sub && <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</span>}
      </span>
    </button>
  )
}

function NextBtn({ onClick, disabled, label = 'Continue' }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-teal w-full justify-center mt-6"
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      {label}
      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-semibold"
        style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.2)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
        HEALTH ASSESSMENT
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
        Find Your <span className="text-teal-gradient">Clinical Program</span>
      </h1>

      <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
        Answer 7 questions and we'll match you to the right program — based on your goals, symptoms, and health profile.
        Takes under 2 minutes.
      </p>

      <div className="flex items-center justify-center gap-8 mb-10">
        {[
          { v: '7', l: 'Questions' },
          { v: '< 2 min', l: 'To complete' },
          { v: '8', l: 'Programs mapped' },
        ].map(({ v, l }) => (
          <div key={l} className="text-center">
            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--teal)' }}>{v}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{l}</p>
          </div>
        ))}
      </div>

      <button onClick={onStart} className="btn-teal px-10 py-4 text-base">
        Begin Assessment
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="mt-5 text-xs" style={{ color: 'var(--text-muted)' }}>
        Doctor-curated · No cost · No commitment
      </p>
    </div>
  )
}

function GoalStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack?: () => void }) {
  return (
    <StepShell step={1} total={7} onBack={onBack}>
      <p className="label mb-3">Primary Goal</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        What are you looking to improve?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Select your main priority — we'll refine from there.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {GOALS.map(g => (
          <button
            key={g.id}
            onClick={() => onSelect(g.id)}
            className="text-left rounded-xl px-5 py-4 transition-all duration-150"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(0,194,184,0.25)'
              e.currentTarget.style.background = 'rgba(0,194,184,0.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
            }}
          >
            <span className="block text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk)' }}>{g.label}</span>
            <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>{g.sub}</span>
          </button>
        ))}
      </div>
    </StepShell>
  )
}

function SymptomsStep({ onNext, onBack }: { onNext: (ids: string[]) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    if (id === 'none') { setSelected(['none']); return }
    setSelected(prev => {
      const without = prev.filter(x => x !== 'none')
      return without.includes(id) ? without.filter(x => x !== id) : [...without, id]
    })
  }

  return (
    <StepShell step={2} total={7} onBack={onBack}>
      <p className="label mb-3">Symptoms</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        Which of these do you experience?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Select all that apply. This shapes your program match.</p>

      <div className="flex flex-col gap-2">
        {SYMPTOMS.map(s => (
          <OptionCard
            key={s.id}
            label={s.label}
            selected={selected.includes(s.id)}
            onClick={() => toggle(s.id)}
            multi
          />
        ))}
      </div>

      <NextBtn onClick={() => onNext(selected)} disabled={selected.length === 0} />
    </StepShell>
  )
}

function DurationStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <StepShell step={3} total={7} onBack={onBack}>
      <p className="label mb-3">Timeline</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        How long have you felt this way?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Duration helps us assess the likely cause and urgency.</p>

      <div className="flex flex-col gap-2.5">
        {DURATIONS.map(d => (
          <OptionCard key={d.id} label={d.label} selected={false} onClick={() => onSelect(d.id)} />
        ))}
      </div>
    </StepShell>
  )
}

function TrainingStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <StepShell step={4} total={7} onBack={onBack}>
      <p className="label mb-3">Lifestyle</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        How often do you currently train?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Physical activity levels directly influence hormone and recovery protocols.</p>

      <div className="flex flex-col gap-2.5">
        {TRAINING.map(t => (
          <OptionCard key={t.id} label={t.label} sub={t.sub} selected={false} onClick={() => onSelect(t.id)} />
        ))}
      </div>
    </StepShell>
  )
}

function AgeStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <StepShell step={5} total={7} onBack={onBack}>
      <p className="label mb-3">Profile</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        What is your age range?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Hormonal and metabolic baselines shift significantly by decade.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {AGES.map(a => (
          <button
            key={a.id}
            onClick={() => onSelect(a.id)}
            className="rounded-xl py-5 text-center font-bold text-lg transition-all duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={e => {
              e.currentTarget.style.border = '1px solid rgba(0,194,184,0.3)'
              e.currentTarget.style.background = 'rgba(0,194,184,0.05)'
              e.currentTarget.style.color = 'var(--teal)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
          >
            {a.label}
          </button>
        ))}
      </div>
    </StepShell>
  )
}

function ConditionsStep({ onNext, onBack }: { onNext: (ids: string[]) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    if (id === 'none') { setSelected(['none']); return }
    setSelected(prev => {
      const without = prev.filter(x => x !== 'none')
      return without.includes(id) ? without.filter(x => x !== id) : [...without, id]
    })
  }

  return (
    <StepShell step={6} total={7} onBack={onBack}>
      <p className="label mb-3">Medical Context</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        Do you have any existing conditions?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>This helps us route you to the right clinical pathway safely.</p>

      <div className="flex flex-col gap-2">
        {CONDITIONS.map(c => (
          <OptionCard
            key={c.id}
            label={c.label}
            selected={selected.includes(c.id)}
            onClick={() => toggle(c.id)}
            multi
          />
        ))}
      </div>

      <NextBtn onClick={() => onNext(selected)} disabled={selected.length === 0} />
    </StepShell>
  )
}

function ReadinessStep({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <StepShell step={7} total={7} onBack={onBack}>
      <p className="label mb-3">Commitment</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        How ready are you to take action?
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>We personalise your next steps based on where you're at.</p>

      <div className="flex flex-col gap-2.5">
        {READINESS.map(r => (
          <OptionCard key={r.id} label={r.label} sub={r.sub} selected={false} onClick={() => onSelect(r.id)} />
        ))}
      </div>
    </StepShell>
  )
}

function CaptureStep({ onSubmit, submitting, onBack }: {
  onSubmit: (firstName: string, email: string) => void
  submitting: boolean
  onBack: () => void
}) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')

  const valid = firstName.trim().length > 0 && email.includes('@')

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 text-xs font-semibold"
        style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.2)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
        ELIGIBILITY CHECK COMPLETE
      </div>

      <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
        Your results are ready
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        Enter your details to see your personalised program matches and clinical pathway.
      </p>

      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="w-full rounded-sm px-5 py-3.5 text-sm outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-inter)',
          }}
          onFocus={e => (e.target.style.border = '1px solid rgba(0,194,184,0.35)')}
          onBlur={e => (e.target.style.border = '1px solid rgba(255,255,255,0.08)')}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full rounded-sm px-5 py-3.5 text-sm outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-inter)',
          }}
          onFocus={e => (e.target.style.border = '1px solid rgba(0,194,184,0.35)')}
          onBlur={e => (e.target.style.border = '1px solid rgba(255,255,255,0.08)')}
        />
      </div>

      <button
        onClick={() => onSubmit(firstName.trim(), email.trim())}
        disabled={!valid || submitting}
        className="btn-teal w-full justify-center"
        style={{ opacity: !valid || submitting ? 0.45 : 1, cursor: !valid || submitting ? 'not-allowed' : 'pointer' }}
      >
        {submitting ? 'Analysing…' : 'See My Results'}
        {!submitting && (
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <button
        onClick={onBack}
        className="block mx-auto mt-4 text-xs transition-colors"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        ← Back
      </button>

      <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        No spam. No sales calls. Doctor-reviewed results only.
      </p>
    </div>
  )
}

function ResultsScreen({ programs: matched, answers }: { programs: ProgramKey[]; answers: Answers }) {
  const primary = matched[0]
  const secondary = matched.slice(1)

  if (!primary) return null

  const firstName = answers.firstName ? `, ${answers.firstName}` : ''

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6 text-xs font-semibold"
          style={{ background: 'rgba(0,194,184,0.07)', border: '1px solid rgba(0,194,184,0.2)', color: 'var(--teal)', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.1em' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)', boxShadow: '0 0 6px var(--teal)' }} />
          ASSESSMENT COMPLETE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
          Your Clinical Matches{firstName}
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Based on your responses, we've identified your top program matches. Your primary recommendation is below.
        </p>
      </div>

      {/* Primary match */}
      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          background: 'var(--surface)',
          border: `1px solid ${PROGRAMS[primary].color}44`,
          boxShadow: `0 0 40px ${PROGRAMS[primary].glow}`,
        }}
      >
        <div className="h-1 w-full" style={{ background: PROGRAMS[primary].color }} />
        <div className="p-7 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold mb-3"
                style={{ background: `${PROGRAMS[primary].color}18`, border: `1px solid ${PROGRAMS[primary].color}44`, color: PROGRAMS[primary].color, fontFamily: 'var(--font-space-grotesk)', letterSpacing: '0.12em' }}>
                PRIMARY MATCH
              </span>
              <h3 className="text-xl md:text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                {PROGRAMS[primary].name}
              </h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {PROGRAMS[primary].desc}
          </p>
          <a href={PROGRAMS[primary].href} className="btn-teal inline-flex">
            {PROGRAMS[primary].cta}
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Secondary matches */}
      {secondary.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em', fontFamily: 'var(--font-space-grotesk)' }}>
            ALSO RELEVANT
          </p>
          <div className="flex flex-col gap-3">
            {secondary.map(key => (
              <div
                key={key}
                className="rounded-xl p-5 flex items-center gap-5"
                style={{ background: 'var(--surface)', border: `1px solid ${PROGRAMS[key].color}22` }}
              >
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: PROGRAMS[key].color }} />
                <div className="flex-1">
                  <p className="text-sm font-bold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                    {PROGRAMS[key].name}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {PROGRAMS[key].desc}
                  </p>
                </div>
                <a
                  href={PROGRAMS[key].href}
                  className="flex-shrink-0 btn-ghost text-xs px-4 py-2"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div
        className="mt-8 rounded-lg p-4 text-xs leading-relaxed"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}
      >
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Clinical note: </span>
        These recommendations are based on your self-reported responses and are intended as a guide only. A diagnosis and treatment plan requires assessment by one of our AHPRA-registered practitioners.
      </div>
    </div>
  )
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function HealthQuiz() {
  const [step, setStep] = useState<StepId>('intro')
  const [dir, setDir] = useState(1)
  const [scores, setScores] = useState<Scores>(baseScores())
  const [answers, setAnswers] = useState<Answers>({})
  const [results, setResults] = useState<ProgramKey[]>([])
  const [submitting, setSubmitting] = useState(false)

  function go(next: StepId, d = 1) {
    setDir(d); setStep(next)
  }

  function weight(delta: Partial<Scores>) {
    setScores(prev => addWeights(prev, delta))
  }

  function handleGoal(id: string) {
    const g = GOALS.find(g => g.id === id)!
    weight(g.w); setAnswers(p => ({ ...p, goal: id })); go('symptoms')
  }

  function handleSymptoms(ids: string[]) {
    const delta = baseScores()
    for (const id of ids) {
      const s = SYMPTOMS.find(s => s.id === id)!
      for (const k in s.w) delta[k as ProgramKey] += (s.w as unknown as Record<string, number>)[k]
    }
    weight(delta); setAnswers(p => ({ ...p, symptoms: ids })); go('duration')
  }

  function handleDuration(id: string) {
    const d = DURATIONS.find(d => d.id === id)!
    weight(d.w); setAnswers(p => ({ ...p, duration: id })); go('training')
  }

  function handleTraining(id: string) {
    const t = TRAINING.find(t => t.id === id)!
    weight(t.w); setAnswers(p => ({ ...p, training: id })); go('age')
  }

  function handleAge(id: string) {
    const a = AGES.find(a => a.id === id)!
    weight(a.w); setAnswers(p => ({ ...p, age: id })); go('conditions')
  }

  function handleConditions(ids: string[]) {
    const delta = baseScores()
    for (const id of ids) {
      const c = CONDITIONS.find(c => c.id === id)!
      for (const k in c.w) delta[k as ProgramKey] += (c.w as unknown as Record<string, number>)[k]
    }
    weight(delta); setAnswers(p => ({ ...p, conditions: ids })); go('readiness')
  }

  function handleReadiness(id: string) {
    const r = READINESS.find(r => r.id === id)!
    weight(r.w); setAnswers(p => ({ ...p, readiness: id })); go('capture')
  }

  async function handleCapture(firstName: string, email: string) {
    setSubmitting(true)
    const matched = rankPrograms(scores, 3)
    setResults(matched)

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
          subject: `Quiz Lead — ${matched.map(k => PROGRAMS[k].name).join(', ')}`,
          from_name: firstName || 'Quiz Lead',
          email,
          message: JSON.stringify({ ...answers, firstName, email, programs: matched }, null, 2),
        }),
      })
    } catch {}

    setAnswers(p => ({ ...p, firstName, email }))
    setSubmitting(false)
    go('results')
  }

  const progressPct = () => {
    if (step === 'intro' || step === 'results') return step === 'results' ? 100 : 0
    const idx = QUESTION_STEPS.indexOf(step as typeof QUESTION_STEPS[number])
    return Math.round(((idx + 1) / QUESTION_STEPS.length) * 100)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />

      {/* Progress bar */}
      {step !== 'intro' && (
        <div className="fixed top-[80px] left-0 right-0 z-40 h-[2px]" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'var(--teal)' }}
            animate={{ width: `${progressPct()}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}

      <main className="min-h-screen flex items-center justify-center px-5 py-24 pt-32">
        <div className="w-full">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease }}
            >
              {step === 'intro'      && <IntroScreen onStart={() => go('goal')} />}
              {step === 'goal'       && <GoalStep onSelect={handleGoal} />}
              {step === 'symptoms'   && <SymptomsStep onNext={handleSymptoms} onBack={() => go('goal', -1)} />}
              {step === 'duration'   && <DurationStep onSelect={handleDuration} onBack={() => go('symptoms', -1)} />}
              {step === 'training'   && <TrainingStep onSelect={handleTraining} onBack={() => go('duration', -1)} />}
              {step === 'age'        && <AgeStep onSelect={handleAge} onBack={() => go('training', -1)} />}
              {step === 'conditions' && <ConditionsStep onNext={handleConditions} onBack={() => go('age', -1)} />}
              {step === 'readiness'  && <ReadinessStep onSelect={handleReadiness} onBack={() => go('conditions', -1)} />}
              {step === 'capture'    && <CaptureStep onSubmit={handleCapture} submitting={submitting} onBack={() => go('readiness', -1)} />}
              {step === 'results'    && <ResultsScreen programs={results} answers={answers} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
