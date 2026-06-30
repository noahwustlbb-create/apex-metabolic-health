'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const DISCOVERY_URL = 'https://calendly.com/admin-apexmetabolichealth/free-discovery-call'
const TEAL = '#4890f7'
const BG = '#070a0d'

// ─── Types ────────────────────────────────────────────────────────────────────

type SingleStep = { type: 'single'; id: string; question: string; sub?: string; options: Array<{ label: string; value: string; disqualify?: boolean }> }
type MultiStep  = { type: 'multi';  id: string; question: string; sub?: string; options: Array<{ label: string; value: string; disqualify?: boolean }> }
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
  ineligibleHeading?: string
  ineligibleBody?: string
  ineligibleAlt?: { label: string; href: string }
}

type Phase = 'intro' | 'quiz' | 'processing' | 'account' | 'eligible' | 'ineligible'
type Answers = Record<string, string | string[]>

const ease = [0.22, 1, 0.36, 1] as const

// ─── Shell ────────────────────────────────────────────────────────────────────

function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <a href="/" className="flex flex-col leading-none">
          <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: TEAL }}>Metabolic Health</span>
        </a>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
          aria-label="Close"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
      <div className="px-6 py-4 text-center flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
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
      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-sm text-sm font-semibold transition-all duration-150"
      style={{
        background: disabled ? 'rgba(255,255,255,0.05)' : TEAL,
        color: disabled ? 'rgba(255,255,255,0.2)' : BG,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-space-grotesk)',
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
      style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-space-grotesk)' }}
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
        <h1 className="font-bold mb-3 leading-tight" style={{ fontSize: 'clamp(24px,4vw,34px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Let&apos;s get you one step closer to feeling better
        </h1>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>
          Answer a few quick questions so our doctors can tailor a safe and effective plan just for you.
        </p>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm" style={{ color: 'rgba(240,244,248,0.45)' }}>Estimated time:</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,194,184,0.1)', color: TEAL, border: `1px solid rgba(0,194,184,0.2)` }}>{config.estimatedTime}</span>
        </div>

        <div className="rounded-xl p-5 mb-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: 'rgba(240,244,248,0.5)' }}>Based on your answers, you&apos;ll receive:</p>
          <ul className="flex flex-col gap-2.5">
            {config.benefits.map(b => (
              <li key={b} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,194,184,0.15)', border: `1px solid rgba(0,194,184,0.3)` }}>
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                    <path d="M2 5l2 2 4-4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: 'rgba(240,244,248,0.7)' }}>{b}</span>
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
  return (
    <div className="flex flex-col gap-2.5">
      {step.options.map(opt => {
        const selected = answer === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="text-left flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-150"
            style={{
              background: selected ? 'rgba(0,194,184,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1.5px solid ${selected ? 'rgba(0,194,184,0.45)' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: selected ? '0 0 20px rgba(0,194,184,0.07)' : 'none',
            }}
          >
            <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ border: `1.5px solid ${selected ? TEAL : 'rgba(255,255,255,0.2)'}`, background: selected ? TEAL : 'transparent', transition: 'all 0.15s' }}>
              {selected && <div className="w-1.5 h-1.5 rounded-full" style={{ background: BG }} />}
            </div>
            <span className="text-sm font-medium leading-snug" style={{ color: selected ? '#f0f4f8' : 'rgba(240,244,248,0.7)', fontFamily: 'var(--font-space-grotesk)' }}>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function MultiStep({ step, answer, onToggle }: { step: MultiStep; answer: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      {step.options.map(opt => {
        const selected = answer.includes(opt.value)
        return (
          <button
            key={opt.value}
            onClick={() => onToggle(opt.value)}
            className="text-left flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-150"
            style={{
              background: selected ? 'rgba(0,194,184,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1.5px solid ${selected ? 'rgba(0,194,184,0.45)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ border: `1.5px solid ${selected ? TEAL : 'rgba(255,255,255,0.2)'}`, background: selected ? TEAL : 'transparent', transition: 'all 0.15s' }}>
              {selected && (
                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" aria-hidden="true">
                  <path d="M1.5 5l2.5 2.5 4.5-5" stroke={BG} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium leading-snug" style={{ color: selected ? '#f0f4f8' : 'rgba(240,244,248,0.7)', fontFamily: 'var(--font-space-grotesk)' }}>{opt.label}</span>
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
        style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: TEAL }}
        onFocus={e => { e.target.style.borderColor = `rgba(0,194,184,0.4)` }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)' }}
      />
      {step.whyWeAsk && (
        <div className="mt-4 flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(0,194,184,0.04)', border: '1px solid rgba(0,194,184,0.12)' }}>
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
            <circle cx="10" cy="10" r="8" stroke={TEAL} strokeWidth="1.5" />
            <path d="M10 7v4M10 13h.01" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-xs font-semibold mb-1" style={{ color: TEAL }}>Why we ask?</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>{step.whyWeAsk}</p>
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
          <label className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: 'rgba(240,244,248,0.45)' }}>Height</label>
          <div className="relative">
            <input
              type="number"
              value={heightCm}
              onChange={e => onHeight(e.target.value)}
              placeholder="175"
              min={100}
              max={250}
              className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.09)', color: '#f0f4f8' }}
              onFocus={e => { e.target.style.borderColor = `rgba(0,194,184,0.4)` }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>cm</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: 'rgba(240,244,248,0.45)' }}>Weight</label>
          <div className="relative">
            <input
              type="number"
              value={weightKg}
              onChange={e => onWeight(e.target.value)}
              placeholder="85"
              min={30}
              max={300}
              className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-all duration-150"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1.5px solid rgba(255,255,255,0.09)', color: '#f0f4f8' }}
              onFocus={e => { e.target.style.borderColor = `rgba(0,194,184,0.4)` }}
              onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>kg</span>
          </div>
        </div>
      </div>
      {bmi !== null && !isNaN(bmi) && (
        <p className="text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>
          Your BMI: <span style={{ color: bmi >= (step.minBmi) ? TEAL : '#f59e0b' }}>{bmi.toFixed(1)}</span>
        </p>
      )}
    </div>
  )
}

function InfoStepRender({ step }: { step: InfoStep }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <h3 className="font-bold text-lg mb-3 leading-snug" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{step.heading}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(240,244,248,0.55)' }}>{step.body}</p>
      {step.stat && (
        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase" style={{ color: TEAL }}>{step.stat}</p>
      )}
    </div>
  )
}

function TrustStepRender({ step }: { step: TrustStep }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'rgba(0,194,184,0.03)', border: '1px solid rgba(0,194,184,0.12)' }}>
      <div className="flex items-start gap-3 mb-4">
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 flex-shrink-0 mt-0.5" aria-hidden="true">
          <path d="M3 21l1.5-5.5L12 3l7.5 12.5L21 21H3z" stroke={TEAL} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <h3 className="font-bold text-lg leading-snug" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{step.heading}</h3>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{step.body}</p>
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
      {/* Progress bar */}
      <div className="px-6 sm:px-10 pt-5 pb-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex-1 h-1 rounded-full mr-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: TEAL }} />
          </div>
          <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)', minWidth: 32, textAlign: 'right' }}>{progress}%</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.28, ease }}
            >
              {/* Question heading */}
              {(step.type === 'single' || step.type === 'multi' || step.type === 'text' || step.type === 'bmi') && (
                <div className="mb-6">
                  <h2 className="font-bold mb-2 leading-tight" style={{ fontSize: 'clamp(18px,3.5vw,26px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.015em' }}>
                    {'question' in step ? step.question : ''}
                  </h2>
                  {('sub' in step && step.sub) && (
                    <p className="text-sm" style={{ color: 'rgba(240,244,248,0.4)' }}>{step.sub}</p>
                  )}
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

      {/* Nav — only show if not single (single auto-advances) */}
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
    const t1 = setTimeout(() => setStep1Done(true), 2000)
    const t2 = setTimeout(() => setStep2Done(true), 4000)
    const t3 = setTimeout(() => onDone(true), 4400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  const ProcessStep = ({ done, label, sub }: { done: boolean; label: string; sub?: string }) => (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500"
        style={{ background: done ? 'rgba(0,194,184,0.15)' : 'rgba(255,255,255,0.05)', border: `1.5px solid ${done ? TEAL : 'rgba(255,255,255,0.1)'}` }}>
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
        <p className="text-sm font-semibold" style={{ color: done ? '#f0f4f8' : 'rgba(240,244,248,0.45)', fontFamily: 'var(--font-space-grotesk)' }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: 'rgba(240,244,248,0.3)' }}>{sub}</p>}
      </div>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-16">
      <motion.div className="w-full max-w-sm flex flex-col gap-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
        <ProcessStep done={step1Done} label="Reviewing your answers" sub="Checking clinical eligibility criteria" />
        <div className="w-px h-8 ml-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <ProcessStep done={step2Done} label="Creating your consultation plan" sub="This can take up to 20 seconds" />
      </motion.div>
    </div>
  )
}

// ─── Eligible phase ───────────────────────────────────────────────────────────

function EligiblePhase({ config }: { config: QuizConfig }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
      <motion.div className="w-full max-w-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'rgba(0,194,184,0.12)', border: `2px solid ${TEAL}` }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="text-[10px] font-bold tracking-[0.22em] uppercase mb-3 text-center" style={{ color: TEAL }}>Eligibility check complete</p>
        <h1 className="font-bold text-center mb-3 leading-tight" style={{ fontSize: 'clamp(22px,4vw,30px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          You appear to be a good candidate for {config.programName}.
        </h1>
        <p className="text-sm text-center mb-10 leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)' }}>
          Your profile has been reviewed. Book your consultation and let our AHPRA-registered doctors design your personalised protocol.
        </p>

        {/* Next steps */}
        <div className="flex flex-col gap-3 mb-8">
          {[
            { n: 1, label: 'Book your consultation', sub: 'Telehealth — 30 mins with an AHPRA-registered doctor' },
            { n: 2, label: 'Doctor reviews your profile', sub: 'Your answers inform a tailored clinical assessment' },
            { n: 3, label: 'Personalised protocol issued', sub: 'Doctor-prescribed treatment coordinated through our pharmacy' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-4 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: 'rgba(0,194,184,0.1)', color: TEAL }}>{s.n}</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{s.label}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(240,244,248,0.4)' }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href={config.consultUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-sm text-sm font-bold tracking-wide mb-4"
          style={{ background: TEAL, color: BG, textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Book my {config.programName.toLowerCase()} consultation
          <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <p className="text-center text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>
          Prefer to chat first?{' '}
          <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer" style={{ color: TEAL }}>Book a free discovery call</a>
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
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: 'rgba(245,158,11,0.1)', border: '2px solid rgba(245,158,11,0.4)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-bold text-center mb-4 leading-tight" style={{ fontSize: 'clamp(20px,3.5vw,26px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.015em' }}>
          {overrideMsg ? 'This program may not be the right fit right now.' : (config.ineligibleHeading ?? 'This program may not be right for you at this time.')}
        </h1>
        <p className="text-sm text-center mb-8 leading-relaxed" style={{ color: 'rgba(240,244,248,0.5)' }}>
          {overrideMsg ?? config.ineligibleBody ?? 'Based on your answers, our doctors need to review your situation more carefully before recommending a protocol.'}
        </p>

        <a
          href={DISCOVERY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-sm text-sm font-bold tracking-wide mb-4"
          style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', textDecoration: 'none', fontFamily: 'var(--font-space-grotesk)', border: '1px solid rgba(245,158,11,0.25)' }}
        >
          Book a free discovery call
        </a>

        {config.ineligibleAlt && (
          <p className="text-center text-xs" style={{ color: 'rgba(240,244,248,0.35)' }}>
            <a href={config.ineligibleAlt.href} style={{ color: TEAL }}>{config.ineligibleAlt.label}</a>
          </p>
        )}

        <p className="text-center text-xs mt-3" style={{ color: 'rgba(240,244,248,0.25)' }}>
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
    img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&h=500&fit=crop&auto=format&q=80',
  },
  {
    label: '100%',
    heading: 'Telehealth based',
    body: 'Consult from anywhere in Australia. No waiting rooms.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop&auto=format&q=80',
  },
]

function AccountPhase({ config, answers, onDone }: { config: QuizConfig; answers: Answers; onDone: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', emailConfirm: '', password: '', passwordConfirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const valid =
    form.name.trim().length > 1 &&
    form.email.includes('@') &&
    form.email === form.emailConfirm &&
    form.password.length >= 8 &&
    form.password === form.passwordConfirm

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setError('')
    setLoading(true)
    try {
      const answerSummary = Object.entries(answers)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join('\n')

      await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          source: 'quiz',
          program: config.programName,
          message: answerSummary,
        }),
      })
      onDone()
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex min-h-0" style={{ background: '#070a0d' }}>

      {/* Left — form */}
      <div className="flex flex-col w-full lg:w-[520px] flex-shrink-0 overflow-y-auto px-8 sm:px-12 py-10">
        {/* Mini brand */}
        <div className="mb-8">
          <span className="font-black text-sm tracking-[0.2em] uppercase block" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>APEX</span>
          <span className="text-[9px] tracking-[0.18em] font-semibold uppercase" style={{ color: TEAL }}>Metabolic Health</span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-7">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: n === 1 ? TEAL : 'rgba(255,255,255,0.06)',
                  color: n === 1 ? '#fff' : 'rgba(255,255,255,0.25)',
                  border: `1px solid ${n === 1 ? TEAL : 'rgba(255,255,255,0.08)'}`,
                }}
              >{n}</div>
              {n < 3 && <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />}
            </div>
          ))}
          <span className="text-xs ml-1" style={{ color: 'rgba(240,244,248,0.35)' }}>Step 1 of 3</span>
        </div>

        <h1 className="font-bold mb-2 leading-tight" style={{ fontSize: 'clamp(22px,3vw,30px)', color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          Take the first step<br />to a <span style={{ color: TEAL }}>better you.</span>
        </h1>
        <div className="flex items-center gap-5 mb-5 mt-2">
          {['Treatment in days, not months', 'Doctor prescribed, tailored to you'].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px]" style={{ color: 'rgba(240,244,248,0.5)' }}>{t}</span>
            </div>
          ))}
        </div>

        {/* What you get */}
        <div className="rounded-xl mb-5 overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="px-4 py-3" style={{ background: 'rgba(72,144,247,0.08)', borderBottom: '1px solid rgba(72,144,247,0.12)' }}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TEAL }}>What you get</p>
          </div>
          <div className="flex flex-col divide-y" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
            {[
              {
                title: 'Doctor-prescribed protocol',
                body: 'Built from your blood results by an AHPRA-registered practitioner — not a template.',
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <circle cx="10" cy="6" r="3.5" stroke={TEAL} strokeWidth="1.4" />
                    <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Pathology at 2,000+ centres',
                body: 'Doctor-ordered blood tests — referral issued instantly. Collect anywhere in Australia.',
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <path d="M7 2h6v5l2 8H5L7 7V2z" stroke={TEAL} strokeWidth="1.4" strokeLinejoin="round" />
                    <path d="M7 8h6" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'TGA-compliant pharmacy delivery',
                body: 'Medication compounded and shipped directly to your door. No chemist visits.',
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <rect x="2" y="6" width="16" height="11" rx="2" stroke={TEAL} strokeWidth="1.4" />
                    <path d="M6 6V4a4 4 0 018 0v2" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: 'Unlimited telehealth reviews',
                body: 'Ongoing clinical support and scheduled check-ins with your doctor, 100% online.',
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
                    <rect x="2" y="4" width="16" height="11" rx="2" stroke={TEAL} strokeWidth="1.4" />
                    <path d="M7 18h6M10 15v3" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map(({ title, body, icon }) => (
              <div key={title} className="flex items-start gap-3 px-4 py-3.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="mt-0.5 flex-shrink-0">{icon}</div>
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#f0f4f8' }}>{title}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,244,248,0.45)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="font-semibold text-sm" style={{ color: '#f0f4f8' }}>Create your account</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold" style={{ color: 'rgba(240,244,248,0.45)' }}>Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="px-4 py-3 rounded-lg text-sm outline-none w-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f4f8' }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold" style={{ color: 'rgba(240,244,248,0.45)' }}>Confirm email</label>
              <input
                type="email"
                placeholder="Confirm email address"
                value={form.emailConfirm}
                onChange={e => setForm(f => ({ ...f, emailConfirm: e.target.value }))}
                className="px-4 py-3 rounded-lg text-sm outline-none w-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.emailConfirm && form.emailConfirm !== form.email ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold" style={{ color: 'rgba(240,244,248,0.45)' }}>Full name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="px-4 py-3 rounded-lg text-sm outline-none w-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f4f8' }}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold" style={{ color: 'rgba(240,244,248,0.45)' }}>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="px-4 py-3 rounded-lg text-sm outline-none w-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.password && form.password.length < 8 ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
                minLength={8}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold" style={{ color: 'rgba(240,244,248,0.45)' }}>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={form.passwordConfirm}
                onChange={e => setForm(f => ({ ...f, passwordConfirm: e.target.value }))}
                className="px-4 py-3 rounded-lg text-sm outline-none w-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${form.passwordConfirm && form.passwordConfirm !== form.password ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, color: '#f0f4f8' }}
                required
              />
            </div>

            {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}

            <button
              type="submit"
              disabled={!valid || loading}
              className="w-full py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 mt-1"
              style={{
                background: valid && !loading ? TEAL : 'rgba(255,255,255,0.06)',
                color: valid && !loading ? '#fff' : 'rgba(255,255,255,0.25)',
                cursor: valid && !loading ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-[11px]" style={{ color: 'rgba(240,244,248,0.25)' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: TEAL }}>Sign in</a>
          </p>
        </div>

        {/* LegitScript badge */}
        <div className="mt-5 rounded-xl p-4 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.2)' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M12 2L4 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6l-8-4z" stroke={TEAL} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#f0f4f8' }}>LegitScript Certified</p>
            <p className="text-[10px]" style={{ color: 'rgba(240,244,248,0.35)' }}>Verified online healthcare provider · TGA compliant</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-semibold" style={{ color: '#22c55e' }}>Verified</span>
          </div>
        </div>
      </div>

      {/* Right — trust grid (desktop only) */}
      <div className="hidden lg:grid flex-1 grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
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
              <h3 className="font-bold text-base mb-1.5" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{p.heading}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(240,244,248,0.55)' }}>{p.body}</p>
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
  const [phase, setPhase] = useState<Phase>('intro')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [direction, setDirection] = useState(1)
  const [bmiHeight, setBmiHeight] = useState('')
  const [bmiWeight, setBmiWeight] = useState('')
  const [isEligible, setIsEligible] = useState(true)
  const [bmiIneligibleMsg, setBmiIneligibleMsg] = useState<string | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_accountDone, setAccountDone] = useState(false)

  const checkEligibility = useCallback(() => {
    for (const step of config.steps) {
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
  }, [answers, config.steps])

  const handleContinue = useCallback(() => {
    if (stepIndex < config.steps.length - 1) {
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
      {phase === 'intro' && <IntroPhase config={config} onStart={() => { setPhase('quiz'); setStepIndex(0) }} />}
      {phase === 'quiz' && (
        <QuizPhase
          config={config}
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
          config={config}
          answers={answers}
          onDone={() => { setAccountDone(true); setPhase('eligible') }}
        />
      )}
      {phase === 'eligible' && <EligiblePhase config={config} />}
      {phase === 'ineligible' && <IneligiblePhase config={config} overrideMsg={bmiIneligibleMsg} />}
    </Shell>
  )
}
