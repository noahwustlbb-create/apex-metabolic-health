'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const DISCOVERY_URL = 'https://calendly.com/admin-apexmetabolichealth/free-discovery-call'
const TEAL = '#00c2b8'
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

type Phase = 'intro' | 'quiz' | 'processing' | 'eligible' | 'ineligible'
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
    setPhase(eligible ? 'eligible' : 'ineligible')
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
      {phase === 'eligible' && <EligiblePhase config={config} />}
      {phase === 'ineligible' && <IneligiblePhase config={config} overrideMsg={bmiIneligibleMsg} />}
    </Shell>
  )
}
