'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useSignupGate } from '@/context/SignupGateContext'

const DISCOVERY_URL = '/discovery-call'
const PORTAL_SIGNUP = 'https://app.apexmetabolichealth.com.au/signup'
const TEAL = 'var(--blue)'
const BG = '#ffffff'
const PORTAL_LOGIN = 'https://app.apexmetabolichealth.com.au'

// ─── Types ────────────────────────────────────────────────────────────────────

type SingleStep = { type: 'single'; id: string; question: string; sub?: string; options: Array<{ label: string; value: string; disqualify?: boolean; score?: number }> }
type MultiStep  = { type: 'multi';  id: string; question: string; sub?: string; options: Array<{ label: string; value: string; disqualify?: boolean; score?: number }> }
type TextStep   = { type: 'text';   id: string; question: string; sub?: string; placeholder?: string; whyWeAsk?: string; optional?: boolean }
type BmiStep    = { type: 'bmi';    id: string; question: string; minBmi: number; bmiIneligibleMsg?: string }
type InfoStep   = { type: 'info';   id: string; heading: string; body: string; stat?: string }
type TrustStep  = { type: 'trust';  id: string; heading: string; body: string }

export type QuizStep = SingleStep | MultiStep | TextStep | BmiStep | InfoStep | TrustStep

export interface QuizConfig {
  programName: string
  programSub: string
  estimatedTime: string
  benefits: string[]
  steps: QuizStep[]
  consultUrl: string
  signupUrl?: string
  scoreLabel?: string
  requiresBloodTest?: boolean
  bloodTestUrl?: string
  ineligibleHeading?: string
  ineligibleBody?: string
  ineligibleAlt?: { label: string; href: string }
}

// ─── Score helpers ─────────────────────────────────────────────────────────────

function calcScore(steps: QuizStep[], answers: Answers): { earned: number; max: number; pct: number } {
  let earned = 0, max = 0
  for (const step of steps) {
    if (step.type === 'single') {
      const maxVal = Math.max(0, ...step.options.map(o => o.score ?? 0))
      if (maxVal > 0) {
        max += maxVal
        const ans = answers[step.id] as string
        earned += step.options.find(o => o.value === ans)?.score ?? 0
      }
    }
    if (step.type === 'multi') {
      for (const opt of step.options) {
        if ((opt.score ?? 0) > 0) {
          max += opt.score!
          if (((answers[step.id] as string[]) ?? []).includes(opt.value)) earned += opt.score!
        }
      }
    }
  }
  const pct = max > 0 ? Math.round((earned / max) * 100) : 0
  return { earned, max, pct }
}

function scoreTier(pct: number): { label: string; color: string; bg: string; border: string } {
  if (pct >= 70) return { label: 'High: significant indicators detected', color: '#ef4444', bg: 'rgba(239,68,68,0.07)', border: 'rgba(239,68,68,0.2)' }
  if (pct >= 45) return { label: 'Moderate: notable indicators present', color: '#f59e0b', bg: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.2)' }
  return { label: 'Mild: some early indicators', color: '#22c55e', bg: 'rgba(34,197,94,0.07)', border: 'rgba(34,197,94,0.2)' }
}

type Phase = 'intro' | 'quiz' | 'processing' | 'account' | 'eligible' | 'ineligible'
type Answers = Record<string, string | string[]>

const ease = [0.22, 1, 0.36, 1] as const

// Auto-injected as step 0 in every quiz - captures blood work recency for portal task creation
const BLOOD_TIMING_STEP: QuizStep = {
  type: 'single',
  id: '__bloodwork_timing',
  question: 'When did you last have a blood test done?',
  options: [
    { label: 'Within the last 3 months', value: 'lt3m' },
    { label: '3 to 6 months ago', value: '3to6m' },
    { label: 'More than 6 months ago', value: 'gt6m' },
    { label: "I haven't had one / not sure", value: 'never' },
  ],
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Header */}
      <div
        className="flex items-center justify-center px-6 py-5 flex-shrink-0 relative"
        style={{ borderBottom: '1px solid #f1f5f9' }}
      >
        {/* Exit link */}
        <button
          onClick={onClose}
          className="absolute left-6 flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
          style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-space-grotesk)' }}
          aria-label="Exit"
          onMouseEnter={e => { e.currentTarget.style.color = TEAL }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8' }}
        >
          ← Exit
        </button>
        {/* Centered logo */}
        <a href="/" className="flex flex-col items-center leading-none" style={{ textDecoration: 'none' }}>
          <span className="font-black text-[17px] tracking-[0.2em] uppercase" style={{ color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1 }}>APEX</span>
          <span className="text-[8px] tracking-[0.24em] font-semibold uppercase mt-0.5" style={{ color: '#94a3b8' }}>Metabolic Health</span>
        </a>
        {/* Sign in link */}
        <a
          href={PORTAL_LOGIN}
          className="absolute right-6 text-xs font-medium transition-colors duration-150"
          style={{ color: '#94a3b8', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = TEAL }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94a3b8' }}
        >
          Sign in
        </a>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
      <div className="px-6 py-4 text-center flex-shrink-0" style={{ borderTop: '1px solid #f1f5f9' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: '#6b7280', fontFamily: 'var(--font-space-grotesk)' }}>
          AHPRA-registered doctors · TGA compliant · 100% online
        </p>
      </div>
    </div>
  )
}

function BtnContinue({ onClick, disabled, label = 'Continue' }: { onClick: () => void; disabled?: boolean; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-150"
      style={{
        borderRadius: 12,
        background: disabled ? '#f1f5f9' : `linear-gradient(135deg, ${TEAL} 0%, #1d4fd8 100%)`,
        color: disabled ? '#94a3b8' : '#ffffff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-space-grotesk)',
        boxShadow: disabled ? 'none' : '0 4px 16px rgba(72,144,247,0.3)',
        border: 'none',
      }}
    >
      {label}
      {!disabled && (
        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function BtnBack({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium transition-colors duration-150"
      style={{ color: '#6b7280', fontFamily: 'var(--font-space-grotesk)' }}
    >
      <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  )
}

// ─── Intro ────────────────────────────────────────────────────────────────────

function IntroPhase({ config, onStart }: { config: QuizConfig; onStart: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4" style={{ color: TEAL }}>
          {config.programName}
        </p>
        <h1 className="font-bold mb-3 leading-tight" style={{ fontSize: 'clamp(24px,4vw,34px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Let&apos;s get you one step closer to feeling better
        </h1>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: '#4b5563' }}>
          Answer a few quick questions so our doctors can tailor a safe and effective plan just for you.
        </p>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm" style={{ color: '#6b7280' }}>Estimated time:</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(72,144,247,0.08)', color: TEAL, border: `1px solid rgba(72,144,247,0.18)` }}>{config.estimatedTime}</span>
        </div>

        <div className="rounded-xl p-5 mb-8" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: '#4b5563' }}>Based on your answers, you&apos;ll receive:</p>
          <ul className="flex flex-col gap-2.5">
            {config.benefits.map(b => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(72,144,247,0.12)', border: `1px solid rgba(72,144,247,0.25)` }}>
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M2 5l2 2 4-4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: '#4b5563' }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-sm text-sm font-bold tracking-wide transition-all duration-150"
          style={{ background: TEAL, color: BG, fontFamily: 'var(--font-space-grotesk)' }}
        >
          Check my eligibility
        </button>
      </motion.div>
    </div>
  )
}

// ─── Step renderers ───────────────────────────────────────────────────────────

function SingleStep({ step, answer, onSelect }: { step: SingleStep; answer: string; onSelect: (v: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-2.5">
      {step.options.map(opt => {
        const selected = answer === opt.value
        const hot = hovered === opt.value || selected
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            onMouseEnter={() => setHovered(opt.value)}
            onMouseLeave={() => setHovered(null)}
            className="text-left flex items-center gap-4 transition-all duration-150"
            style={{
              padding: '17px 20px',
              borderRadius: 12,
              background: hot ? '#f8faff' : '#ffffff',
              border: `1.5px solid ${hot ? TEAL : '#e2e8f0'}`,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              border: `1.5px solid ${hot ? TEAL : '#cbd5e1'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'border-color 0.15s',
            }}>
              {hot && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: TEAL }} />}
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: hot ? '#0f172a' : '#1e293b', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.5 }}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function MultiStep({ step, answer, onToggle }: { step: MultiStep; answer: string[]; onToggle: (v: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-2.5">
      {step.options.map(opt => {
        const selected = answer.includes(opt.value)
        const hot = hovered === opt.value || selected
        return (
          <button
            key={opt.value}
            onMouseEnter={() => setHovered(opt.value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onToggle(opt.value)}
            className="text-left flex items-center gap-4 transition-all duration-150"
            style={{
              padding: '17px 20px', borderRadius: 12,
              background: hot ? '#f8faff' : '#ffffff',
              border: `1.5px solid ${hot ? TEAL : '#e2e8f0'}`,
              cursor: 'pointer', width: '100%',
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
              border: `1.5px solid ${hot ? TEAL : '#cbd5e1'}`,
              background: selected ? TEAL : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}>
              {selected && (
                <svg viewBox="0 0 10 10" fill="none" width="10" height="10" aria-hidden="true">
                  <path d="M1.5 5l2.5 2.5 4.5-5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, color: hot ? '#0f172a' : '#1e293b', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.5 }}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function TextStepRender({ step, answer, onChange }: { step: TextStep; answer: string; onChange: (v: string) => void }) {
  return (
    <div>
      <textarea
        value={answer}
        onChange={e => onChange(e.target.value)}
        placeholder={step.placeholder ?? 'Type your answer here...'}
        rows={4}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-150"
        style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.12)', color: '#111827', caretColor: TEAL }}
        onFocus={e => { e.target.style.borderColor = `rgba(72,144,247,0.35)` }}
        onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.08)' }}
      />
      {step.whyWeAsk && (
        <div className="mt-4 flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.12)' }}>
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke={TEAL} strokeWidth="1.5" />
            <path d="M10 7v4M10 13h.01" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: TEAL }}>Why we ask?</p>
            <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>{step.whyWeAsk}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function BmiStepRender({ step, heightCm, weightKg, onHeight, onWeight }: {
  step: BmiStep; heightCm: string; weightKg: string; onHeight: (v: string) => void; onWeight: (v: string) => void
}) {
  const bmi = heightCm && weightKg ? (parseFloat(weightKg) / Math.pow(parseFloat(heightCm) / 100, 2)) : null

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="iqe-height" className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: '#6b7280' }}>Height</label>
          <div className="relative">
            <input
              id="iqe-height"
              type="number"
              value={heightCm}
              onChange={e => onHeight(e.target.value)}
              placeholder="175"
              min={100}
              max={250}
              className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-150"
              style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.12)', color: '#111827' }}
              onFocus={e => { e.target.style.borderColor = `rgba(72,144,247,0.35)` }}
              onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.08)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{ color: '#6b7280' }}>cm</span>
          </div>
        </div>
        <div>
          <label htmlFor="iqe-weight" className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: '#6b7280' }}>Weight</label>
          <div className="relative">
            <input
              id="iqe-weight"
              type="number"
              value={weightKg}
              onChange={e => onWeight(e.target.value)}
              placeholder="85"
              min={30}
              max={300}
              className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-150"
              style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.12)', color: '#111827' }}
              onFocus={e => { e.target.style.borderColor = `rgba(72,144,247,0.35)` }}
              onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.08)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{ color: '#6b7280' }}>kg</span>
          </div>
        </div>
      </div>
      {bmi !== null && !isNaN(bmi) && (
        <p className="text-xs" style={{ color: '#6b7280' }}>
          Your BMI: <span style={{ color: bmi >= (step.minBmi) ? TEAL : '#f59e0b' }}>{bmi.toFixed(1)}</span>
        </p>
      )}
    </div>
  )
}

function InfoStepRender({ step }: { step: InfoStep }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <h3 className="font-bold text-lg mb-3 leading-snug" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{step.heading}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: '#4b5563' }}>{step.body}</p>
      {step.stat && (
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: TEAL }}>{step.stat}</p>
      )}
    </div>
  )
}

function TrustStepRender({ step }: { step: TrustStep }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(0,194,184,0.03)', border: '1px solid rgba(72,144,247,0.12)' }}>
      <div className="flex items-start gap-3 mb-4">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 flex-shrink-0 mt-0.5" aria-hidden="true">
          <path d="M3 21l1.5-5.5L12 3l7.5 12.5L21 21H3z" stroke={TEAL} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <h3 className="font-bold text-lg leading-snug" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{step.heading}</h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{step.body}</p>
    </div>
  )
}

// ─── Quiz phase ───────────────────────────────────────────────────────────────

function QuizPhase({
  config, stepIndex, answers, direction,
  onAnswer, onMultiToggle, onTextChange, onBmiChange,
  onContinue, onBack, bmiHeight, bmiWeight, bmiIneligibleMsg,
  onBmiIneligible,
}: {
  config: QuizConfig
  stepIndex: number
  answers: Answers
  direction: number
  onAnswer: (id: string, value: string) => void
  onMultiToggle: (id: string, value: string) => void
  onTextChange: (id: string, value: string) => void
  onBmiChange: (field: 'height' | 'weight', value: string) => void
  onContinue: () => void
  onBack: () => void
  bmiHeight: string
  bmiWeight: string
  bmiIneligibleMsg: string | undefined
  onBmiIneligible: (msg?: string) => void
}) {
  const step = config.steps[stepIndex]
  const questionSteps = config.steps.filter(s => s.type === 'single' || s.type === 'multi' || s.type === 'text' || s.type === 'bmi')
  const questionIndex = questionSteps.findIndex((_, i) => config.steps.indexOf(questionSteps[i]) === stepIndex)
  const progress = Math.round(((stepIndex) / config.steps.length) * 100)

  const canContinue = (() => {
    if (step.type === 'single') return !!(answers[step.id] as string)
    if (step.type === 'multi') return ((answers[step.id] as string[]) ?? []).length > 0
    if (step.type === 'text') return true
    if (step.type === 'bmi') return !!(bmiHeight && bmiWeight)
    return true
  })()

  const handleContinue = () => {
    if (step.type === 'bmi') {
      const h = parseFloat(bmiHeight)
      const w = parseFloat(bmiWeight)
      const bmi = w / Math.pow(h / 100, 2)
      if (bmi < (step as BmiStep).minBmi) {
        onBmiIneligible((step as BmiStep).bmiIneligibleMsg)
        return
      }
    }
    onContinue()
  }

  // Single select: auto-advance
  const handleSingleSelect = (id: string, value: string) => {
    onAnswer(id, value)
    setTimeout(() => onContinue(), 180)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress bar - full-width, no padding */}
      <div style={{ height: 3, backgroundColor: '#f1f5f9' }}>
        <motion.div
          style={{ height: '100%', backgroundColor: TEAL }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-5 pt-12 pb-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.25, ease }}
            >
              {/* Question heading */}
              {(step.type === 'single' || step.type === 'multi' || step.type === 'text' || step.type === 'bmi') && (
                <div className="mb-8">
                  {/* "Question X of Y" counter */}
                  <p style={{ fontSize: 14, fontWeight: 600, color: TEAL, marginBottom: 18, fontFamily: 'var(--font-space-grotesk)' }}>
                    Question {questionIndex + 1} of {questionSteps.length}
                  </p>
                  <h2 className="font-bold" style={{ fontSize: 'clamp(24px, 4.5vw, 36px)', lineHeight: 1.22, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {'question' in step ? step.question : ''}
                  </h2>
                  {('sub' in step && step.sub) && (
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: '#64748b', marginTop: 8 }}>{step.sub}</p>
                  )}
                  {/* Doctor avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, marginBottom: 4 }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: `linear-gradient(135deg, ${TEAL} 0%, #1d4fd8 100%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid #e2e8f0',
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-space-grotesk)' }}>CC</span>
                      </div>
                      <span style={{
                        position: 'absolute', bottom: 1, right: 1, width: 9, height: 9,
                        borderRadius: '50%', backgroundColor: '#22c55e', border: '1.5px solid #fff',
                        display: 'block',
                      }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', fontFamily: 'var(--font-space-grotesk)', lineHeight: 1.3 }}>
                        Dr Cameron Chen
                      </p>
                      <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Medical Director</p>
                    </div>
                  </div>
                </div>
              )}

              {step.type === 'single' && (
                <SingleStep step={step} answer={(answers[step.id] as string) ?? ''} onSelect={v => handleSingleSelect(step.id, v)} />
              )}
              {step.type === 'multi' && (
                <MultiStep step={step} answer={(answers[step.id] as string[]) ?? []} onToggle={v => onMultiToggle(step.id, v)} />
              )}
              {step.type === 'text' && (
                <TextStepRender step={step} answer={(answers[step.id] as string) ?? ''} onChange={v => onTextChange(step.id, v)} />
              )}
              {step.type === 'bmi' && (
                <BmiStepRender step={step} heightCm={bmiHeight} weightKg={bmiWeight} onHeight={v => onBmiChange('height', v)} onWeight={v => onBmiChange('weight', v)} />
              )}
              {step.type === 'info' && <InfoStepRender step={step} />}
              {step.type === 'trust' && <TrustStepRender step={step} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Nav - only show if not single (single auto-advances) */}
      {step.type !== 'single' && (
        <div className="px-5 pb-8 flex items-center gap-3 justify-center">
          <div className="w-full max-w-lg flex items-center gap-3">
            <BtnBack onClick={onBack} />
            <BtnContinue onClick={handleContinue} disabled={!canContinue} />
          </div>
        </div>
      )}
      {step.type === 'single' && (
        <div className="px-5 pb-8 flex justify-center">
          <div className="w-full max-w-lg">
            <BtnBack onClick={onBack} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Processing phase ─────────────────────────────────────────────────────────

function ProcessingPhase({ onDone }: { onDone: (eligible: boolean) => void; eligible: boolean }) {
  const [step1Done, setStep1Done] = useState(false)
  const [step2Done, setStep2Done] = useState(false)

  useEffect(() => {
    // Brief transition only - answers are already saved and eligibility is
    // checked instantly in onDone. Don't fake long-running work.
    const t1 = setTimeout(() => setStep1Done(true), 600)
    const t2 = setTimeout(() => setStep2Done(true), 1200)
    const t3 = setTimeout(() => onDone(true), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  const ProcessStep = ({ done, label, sub }: { done: boolean; label: string; sub?: string }) => (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
        style={{ background: done ? 'rgba(72,144,247,0.12)' : 'rgba(0,0,0,0.06)', border: `1.5px solid ${done ? TEAL : 'rgba(0,0,0,0.09)'}` }}>
        {done ? (
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2.5 7l3 3 6-6" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <motion.div className="w-3 h-3 rounded-full border-t-2 border-r-2" style={{ borderColor: TEAL }}
            animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: done ? '#111827' : '#6b7280', fontFamily: 'var(--font-space-grotesk)' }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{sub}</p>}
      </div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-16">
      <motion.div className="w-full max-w-sm flex flex-col gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
        <ProcessStep done={step1Done} label="Saving your answers" sub="Your responses are recorded for your consultation" />
        <div className="w-px h-8 ml-4" style={{ background: 'rgba(0,0,0,0.06)' }} />
        <ProcessStep done={step2Done} label="Checking eligibility" sub="Against our clinical screening criteria" />
      </motion.div>
    </div>
  )
}

// ─── Eligible phase ───────────────────────────────────────────────────────────

function EligiblePhase({ config }: { config: QuizConfig }) {
  const portalUrl = config.signupUrl ?? PORTAL_SIGNUP
  const bloodTestUrl = config.bloodTestUrl ?? '/order-bloods'

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
      <motion.div className="w-full max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'rgba(72,144,247,0.1)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-bold text-center mb-3 leading-tight" style={{ fontSize: 'clamp(22px,4vw,30px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Account created.<br />You&apos;re all set.
        </h1>
        <p className="text-sm text-center mb-8 leading-relaxed" style={{ color: '#6b7280' }}>
          Our clinical team has your assessment. Here&apos;s what happens next.
        </p>

        {/* Blood test card for programs that require it */}
        {config.requiresBloodTest && (
          <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(72,144,247,0.05)', border: '1px solid rgba(72,144,247,0.15)' }}>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: TEAL }}>Step 1: Pathology</p>
            <p className="text-sm font-semibold mb-1" style={{ color: '#111827' }}>Complete your hormone panel</p>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#6b7280' }}>
              Walk into any of 4,000+ accredited collection centres across Australia. Your referral is issued by your doctor after your consultation.
            </p>
            <p className="text-[10px] leading-relaxed" style={{ color: '#6b7280' }}>
              Prescription treatments require a valid prescription from an AHPRA-registered doctor. A pathology assessment is required before any treatment is initiated.
            </p>
          </div>
        )}

        {/* Next steps */}
        <div className="flex flex-col gap-0 mb-7 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
          {(config.requiresBloodTest
            ? [
                { n: 1, label: 'Sign in to your patient portal', sub: 'Access your assessment results and clinical profile' },
                { n: 2, label: 'Complete your pathology', sub: 'Doctor issues your referral, collect at 4,000+ centres Australia-wide' },
                { n: 3, label: 'Telehealth consultation', sub: 'AHPRA-registered doctor builds your personalised protocol' },
              ]
            : [
                { n: 1, label: 'Sign in to your patient portal', sub: 'Access your assessment and clinical profile' },
                { n: 2, label: 'Doctor reviews your assessment', sub: 'Your answers inform a tailored clinical plan' },
                { n: 3, label: 'Personalised protocol issued', sub: 'Doctor-prescribed, coordinated through our TGA-compliant pharmacy' },
              ]
          ).map((s, i, arr) => (
            <div key={s.n} className="flex items-start gap-4 px-4 py-4" style={{ background: i % 2 === 0 ? '#fafafa' : '#fff', borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5" style={{ background: 'rgba(72,144,247,0.1)', color: TEAL }}>{s.n}</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{s.label}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6b7280' }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href={portalUrl}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-wide mb-3 transition-all duration-150"
          style={{ background: `linear-gradient(135deg, ${TEAL} 0%, #1d4fd8 100%)`, color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)', boxShadow: '0 4px 20px rgba(72,144,247,0.3)' }}
        >
          Go to my patient portal
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {config.requiresBloodTest && (
          <a
            href={bloodTestUrl}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold mb-4 transition-all duration-150"
            style={{ background: 'rgba(72,144,247,0.07)', color: TEAL, textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Order my blood panel now
          </a>
        )}

        <p className="text-center text-xs" style={{ color: '#6b7280' }}>
          Questions?{' '}
          <a href={DISCOVERY_URL} style={{ color: TEAL }}>Book a free discovery call</a>
        </p>
      </motion.div>
    </div>
  )
}

// ─── Ineligible phase ─────────────────────────────────────────────────────────

function IneligiblePhase({ config, overrideMsg }: { config: QuizConfig; overrideMsg?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
      <motion.div className="w-full max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'rgba(245,158,11,0.08)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-bold text-center mb-4 leading-tight" style={{ fontSize: 'clamp(20px,3.5vw,26px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.015em' }}>
          {overrideMsg ? 'This program may not be the right fit right now.' : (config.ineligibleHeading ?? 'This program may not be right for you at this time.')}
        </h1>
        <p className="text-sm text-center mb-8 leading-relaxed" style={{ color: '#4b5563' }}>
          {overrideMsg ?? config.ineligibleBody ?? 'Based on your answers, our doctors need to review your situation more carefully before recommending a protocol.'}
        </p>

        <a
          href={DISCOVERY_URL}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-wide mb-4"
          style={{ background: 'rgba(245,158,11,0.08)', color: '#d97706', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Book a free discovery call
        </a>

        {config.ineligibleAlt && (
          <p className="text-center text-xs" style={{ color: '#6b7280' }}>
            <a href={config.ineligibleAlt.href} style={{ color: TEAL }}>{config.ineligibleAlt.label}</a>
          </p>
        )}

        <p className="text-center text-xs mt-3" style={{ color: '#d1d5db' }}>
          Our clinical team can help determine the right pathway for you.
        </p>
      </motion.div>
    </div>
  )
}

// ─── Account gate ─────────────────────────────────────────────────────────────

const TRUST_PANELS = [
  {
    label: 'Personalised',
    heading: 'Prescription protocols',
    body: 'Treatments matched to your pathology, not a one-size-fits-all template.',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&h=500&fit=crop&auto=format&q=80',
  },
  {
    label: 'Pharmacy delivery',
    heading: 'Australia-wide',
    body: 'TGA-compliant compounding pharmacy, delivered direct to your door.',
    img: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=700&h=500&fit=crop&auto=format&q=80',
  },
  {
    label: 'Unlimited',
    heading: 'Doctor consultations',
    body: 'AHPRA-registered practitioners managing your ongoing care.',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&h=500&fit=crop&auto=format&q=80',
  },
  {
    label: '100%',
    heading: 'Telehealth based',
    body: 'Consult from anywhere in Australia. No waiting rooms.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop&auto=format&q=80',
  },
]

function AccountPhase({ config, answers, onDone }: { config: QuizConfig; answers: Answers; onDone: () => void }) {
  const [loading, setLoading] = useState(false)
  const { open: openSignupGate } = useSignupGate()
  const { earned, max, pct } = calcScore(config.steps, answers)
  const hasScore = !!(config.scoreLabel && max > 0)
  const tier = hasScore ? scoreTier(pct) : null
  const circumference = 2 * Math.PI * 44

  async function handleContinue() {
    setLoading(true)
    try {
      if (typeof window !== 'undefined') {
        const bloodTiming = answers['__bloodwork_timing'] as string | undefined
        const hasRecentBloods = bloodTiming === 'lt3m' || bloodTiming === '3to6m'
        localStorage.setItem('apex-quiz-result', JSON.stringify({
          program: config.programName,
          answers,
          score: hasScore ? { earned, max, pct } : null,
          hasRecentBloods,
          lastBloods: bloodTiming ?? null,
          completedAt: new Date().toISOString(),
        }))
      }
      const answerSummary = Object.entries(answers)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join('\n')
      await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'quiz',
          program: config.programName,
          score: hasScore ? `${pct}% (${earned}/${max})` : 'n/a',
          message: answerSummary,
        }),
      }).catch(() => {})
    } finally {
      onDone()
    }
  }

  return (
    <div className="flex-1 flex min-h-0" style={{ background: '#f9fafb' }}>

      {/* Left - score reveal + CTA */}
      <div className="flex flex-col w-full lg:w-[520px] flex-shrink-0 overflow-y-auto px-8 sm:px-12 py-10" style={{ background: '#ffffff' }}>

        {/* Score ring */}
        {hasScore && tier && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center mb-8 pt-2"
          >
            <div className="relative mb-4">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
                <motion.circle
                  cx="60" cy="60" r="44" fill="none"
                  stroke={tier.color} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - (pct / 100) * circumference }}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  style={{ transformOrigin: '60px 60px', rotate: '-90deg' } as React.CSSProperties}
                />
                <text x="60" y="55" textAnchor="middle" style={{ fontSize: 26, fontWeight: 700, fill: '#111827', fontFamily: 'Space Grotesk, sans-serif' }}>{pct}%</text>
                <text x="60" y="72" textAnchor="middle" style={{ fontSize: 9, fill: '#6b7280', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: 1 }}>SCORE</text>
              </svg>
            </div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-center mb-1" style={{ color: TEAL }}>{config.scoreLabel}</p>
            <div className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: tier.bg, color: tier.color }}>
              {tier.label}
            </div>
          </motion.div>
        )}

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease, delay: hasScore ? 0.2 : 0 }}>
          <h1 className="font-bold mb-2 leading-tight" style={{ fontSize: 'clamp(20px,3vw,28px)', color: '#111827', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
            {hasScore
              ? <>Your results are ready.<br /><span style={{ color: TEAL }}>Create an account to start.</span></>
              : <>Assessment complete.<br /><span style={{ color: TEAL }}>One step to get started.</span></>
            }
          </h1>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: '#4b5563' }}>
            {hasScore
              ? 'Our doctors have the context they need. Create your patient account and we\'ll build your personalised clinical protocol.'
              : 'You\'re eligible for a consultation. Create your patient account to book with an AHPRA-registered doctor.'}
          </p>
        </motion.div>

        {/* What happens next */}
        <div className="rounded-xl mb-5 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="px-4 py-3" style={{ background: 'rgba(72,144,247,0.06)', borderBottom: '1px solid rgba(72,144,247,0.1)' }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TEAL }}>What happens next</p>
          </div>
          <div className="flex flex-col" style={{ background: '#fafafa' }}>
            {[
              { n: 1, title: 'Create your account', body: 'Register in under 2 minutes, no GP referral required.' },
              { n: 2, title: 'Complete pathology testing', body: 'We issue your referral. Walk into any of 4,000+ accredited collection centres.' },
              { n: 3, title: 'Doctor consultation', body: 'Your AHPRA-registered doctor builds your personalised protocol.' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3 px-4 py-3.5" style={{ borderBottom: s.n < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5" style={{ background: 'rgba(72,144,247,0.1)', color: TEAL }}>{s.n}</div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#111827' }}>{s.title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: '#6b7280' }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={config.signupUrl ?? PORTAL_SIGNUP}
          onClick={e => { e.preventDefault(); openSignupGate(() => { handleContinue().then(() => { window.location.href = config.signupUrl ?? PORTAL_SIGNUP }) }) }}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-wide mb-3 transition-all duration-150"
          style={{
            background: loading ? 'rgba(0,0,0,0.08)' : `linear-gradient(135deg, ${TEAL} 0%, #1d4fd8 100%)`,
            color: loading ? '#6b7280' : '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-space-grotesk)',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(72,144,247,0.3)',
          }}
        >
          {loading ? 'Saving your results…' : 'Create account & start treatment'}
          {!loading && (
            <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </a>

        <p className="text-center text-[11px] mb-6" style={{ color: '#6b7280' }}>
          Already have an account?{' '}
          <a href="https://app.apexmetabolichealth.com.au" style={{ color: TEAL }}>Sign in to portal</a>
        </p>

        {/* Compliance note for blood-requiring programs */}
        {config.requiresBloodTest && (
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.12)' }}>
            <p className="text-[11px] leading-relaxed" style={{ color: '#6b7280' }}>
              Prescription treatments require a valid prescription from an AHPRA-registered doctor. A pathology assessment is required before any treatment is initiated.
            </p>
          </div>
        )}

        {/* Trust row */}
        <div className="flex items-center justify-center gap-5 mt-1">
          {['AHPRA registered', 'TGA compliant', '100% online'].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true">
                <path d="M1.5 5l2 2 4.5-4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px]" style={{ color: '#6b7280' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right - trust grid (desktop only) */}
      <div className="hidden lg:grid flex-1 grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.06)' }}>
        {TRUST_PANELS.map((p, i) => (
          <div
            key={i}
            className="flex flex-col justify-end relative overflow-hidden"
            style={{ minHeight: '50%' }}
          >
            {/* Photo background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${p.img})` }}
            />
            {/* Dark gradient overlay for text legibility */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(7,10,13,0.92) 0%, rgba(7,10,13,0.4) 50%, rgba(7,10,13,0.1) 100%)' }}
            />
            <div className="relative z-10 p-7">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: TEAL }}>{p.label}</p>
              <h3 className="font-bold text-base mb-1.5" style={{ color: '#111827', fontFamily: 'var(--font-space-grotesk)' }}>{p.heading}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#4b5563' }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

// ─── Main engine ──────────────────────────────────────────────────────────────

export default function IntakeQuizEngine({ config }: { config: QuizConfig }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('quiz')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [direction, setDirection] = useState(1)
  const [bmiHeight, setBmiHeight] = useState('')
  const [bmiWeight, setBmiWeight] = useState('')
  const [isEligible, setIsEligible] = useState(true)
  const [bmiIneligibleMsg, setBmiIneligibleMsg] = useState<string | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_accountDone, setAccountDone] = useState(false)

  // Inject blood timing question as the very first step in every quiz
  const augmentedConfig = { ...config, steps: [BLOOD_TIMING_STEP, ...config.steps] }

  const checkEligibility = useCallback(() => {
    for (const step of augmentedConfig.steps) {
      if (step.type === 'single') {
        const ans = answers[step.id] as string
        const opt = step.options.find(o => o.value === ans)
        if (opt?.disqualify) return false
      }
      if (step.type === 'multi') {
        const ans = (answers[step.id] as string[]) ?? []
        const opts = step.options.filter(o => ans.includes(o.value))
        if (opts.some(o => o.disqualify)) return false
      }
    }
    return true
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, augmentedConfig.steps])

  const handleContinue = useCallback(() => {
    if (stepIndex < augmentedConfig.steps.length - 1) {
      setDirection(1)
      setStepIndex(i => i + 1)
    } else {
      setPhase('processing')
    }
  }, [stepIndex, config.steps.length])

  const handleBack = () => {
    if (stepIndex === 0) {
      setPhase('intro')
    } else {
      setDirection(-1)
      setStepIndex(i => i - 1)
    }
  }

  const handleAnswer = (id: string, value: string) => {
    setAnswers(a => ({ ...a, [id]: value }))
  }

  const handleMultiToggle = (id: string, value: string) => {
    setAnswers(a => {
      const current = (a[id] as string[]) ?? []
      const noneValue = 'none'
      if (value === noneValue) {
        return { ...a, [id]: current.includes(noneValue) ? [] : [noneValue] }
      }
      const withoutNone = current.filter(v => v !== noneValue)
      const next = withoutNone.includes(value)
        ? withoutNone.filter(v => v !== value)
        : [...withoutNone, value]
      return { ...a, [id]: next }
    })
  }

  const handleTextChange = (id: string, value: string) => {
    setAnswers(a => ({ ...a, [id]: value }))
  }

  const handleBmiChange = (field: 'height' | 'weight', value: string) => {
    if (field === 'height') setBmiHeight(value)
    else setBmiWeight(value)
  }

  const handleBmiIneligible = (msg?: string) => {
    setBmiIneligibleMsg(msg)
    setIsEligible(false)
    setPhase('ineligible')
  }

  const handleProcessingDone = useCallback((_eligible: boolean) => {
    const eligible = checkEligibility()
    setIsEligible(eligible)
    setPhase(eligible ? 'account' : 'ineligible')
  }, [checkEligibility])

  return (
    <Shell onClose={() => router.back()}>
      {phase === 'intro' && <IntroPhase config={augmentedConfig} onStart={() => { setPhase('quiz'); setStepIndex(0) }} />}
      {phase === 'quiz' && (
        <QuizPhase
          config={augmentedConfig}
          stepIndex={stepIndex}
          answers={answers}
          direction={direction}
          onAnswer={handleAnswer}
          onMultiToggle={handleMultiToggle}
          onTextChange={handleTextChange}
          onBmiChange={handleBmiChange}
          onContinue={handleContinue}
          onBack={handleBack}
          bmiHeight={bmiHeight}
          bmiWeight={bmiWeight}
          bmiIneligibleMsg={bmiIneligibleMsg}
          onBmiIneligible={handleBmiIneligible}
        />
      )}
      {phase === 'processing' && <ProcessingPhase eligible={isEligible} onDone={handleProcessingDone} />}
      {phase === 'account' && (
        <AccountPhase
          config={augmentedConfig}
          answers={answers}
          onDone={() => { setAccountDone(true); setPhase('eligible') }}
        />
      )}
      {phase === 'eligible' && <EligiblePhase config={augmentedConfig} />}
      {phase === 'ineligible' && <IneligiblePhase config={augmentedConfig} overrideMsg={bmiIneligibleMsg} />}
    </Shell>
  )
}
