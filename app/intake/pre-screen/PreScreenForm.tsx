'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AppFeature from '@/components/AppFeature'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const ease = [0.22, 1, 0.36, 1] as const

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Gate (lead capture)
  firstName: string
  email: string
  phone: string
  // Step 1
  ageRange: string
  goals: string[]
  symptoms: string[]
  recentBloods: string
  // Step 2
  duration: string
  impact: string
  tried: string
  lookingFor: string
  urgency: string
}

const INITIAL: FormData = {
  firstName: '', email: '', phone: '',
  ageRange: '', goals: [], symptoms: [], recentBloods: '',
  duration: '', impact: '', tried: '', lookingFor: '', urgency: '',
}

// ─── Question data ────────────────────────────────────────────────────────────

const AGE_RANGES = ['18–25', '26–35', '36–45', '46–55', '55+']

const GOALS = [
  'Hormone balance',
  'More energy',
  'Weight management',
  'Athletic performance',
  'Hair & skin',
  'Better sleep',
  'Sexual health',
  'General health check',
]

const SYMPTOMS = [
  'Low energy / fatigue',
  'Brain fog',
  'Weight gain',
  'Poor sleep',
  'Low libido or drive',
  'Hair loss',
  'Slow recovery',
  'Mood changes',
  'Reduced strength',
  'Skin changes',
]

const DURATIONS = [
  'Less than 3 months',
  '3–12 months',
  '1–3 years',
  'More than 3 years',
  "Hard to say — it's been gradual",
]

const IMPACTS = [
  'Energy and work performance',
  'Training and physical output',
  'Sexual health and relationships',
  'Weight and body composition',
  'Mood and mental clarity',
  'Hair, skin, or appearance',
  'Injury recovery',
]

const TRIED = [
  "Nothing yet — looking for a starting point",
  'Diet and exercise changes',
  'Supplements or over-the-counter products',
  "Saw a GP — was told my results are normal",
  "Previous treatment that didn't fully work",
]

const LOOKING_FOR = [
  "Clinical answers — I want to know what's actually wrong",
  'An ongoing protocol, not just a one-off check',
  'A doctor who actually specialises in this',
  'Fast access to bloodwork and a real consultation',
]

const URGENCY = [
  "I'm ready to start now",
  'Within the next few weeks',
  'Still exploring — no rush',
]

// ─── Pathway scoring ──────────────────────────────────────────────────────────

type Pathway = 'hormone' | 'performance' | 'metabolic' | 'hair_skin' | 'injury'

const PATHWAY_LABELS: Record<Pathway, string> = {
  hormone: 'Hormone Optimisation',
  performance: 'Performance & Recovery',
  metabolic: 'Metabolic & Weight',
  hair_skin: 'Hair & Skin Restoration',
  injury: 'Injury Repair & Recovery',
}

interface PathwayInfo {
  description: string
  tags: string[]
  bloods: string
  bloodLabel: string
  bloodPrice: string
  bloodNote: string
  bloodConditional: boolean
}

const PATHWAY_INFO: Record<Pathway, PathwayInfo> = {
  hormone: {
    description: 'Your profile points to hormonal drivers. Our doctors recommend a panel covering testosterone, cortisol, thyroid function, SHBG, and metabolic markers.',
    tags: ['Testosterone', 'Cortisol', 'Thyroid', 'SHBG'],
    bloods: '/intake/bloods-hormone',
    bloodLabel: 'Comprehensive hormonal blood panel',
    bloodPrice: '$235.38 incl. GST',
    bloodNote: 'Required before your initial consultation.',
    bloodConditional: false,
  },
  performance: {
    description: 'Your profile suggests performance and recovery drivers. We assess IGF-1, cortisol, testosterone, CK, and inflammation markers.',
    tags: ['IGF-1', 'Testosterone', 'CK', 'Cortisol'],
    bloods: '/intake/bloods-performance',
    bloodLabel: 'Performance and metabolic baseline panel',
    bloodPrice: '$166.16 incl. GST',
    bloodNote: 'Initial pathology is required before consultation. Ongoing monitoring is managed as part of membership.',
    bloodConditional: false,
  },
  metabolic: {
    description: 'Your profile points to metabolic drivers. Our panel covers HbA1c, insulin resistance markers, thyroid function, cortisol, and lipids.',
    tags: ['HbA1c', 'Insulin', 'Thyroid', 'Lipids'],
    bloods: '/intake/bloods-metabolic',
    bloodLabel: 'Metabolic baseline panel',
    bloodPrice: '$166.16 incl. GST',
    bloodNote: 'Initial pathology is required before consultation. Ongoing monitoring is managed as part of membership.',
    bloodConditional: false,
  },
  hair_skin: {
    description: 'Your profile suggests hormonal and nutritional drivers. We assess DHT, DHEA-S, thyroid, zinc, ferritin, and inflammation markers.',
    tags: ['DHT', 'DHEA-S', 'Ferritin', 'Thyroid'],
    bloods: '/intake/bloods-hair',
    bloodLabel: 'Pre-treatment blood panel',
    bloodPrice: 'From $73.66 incl. GST',
    bloodNote: 'A pre-treatment blood panel may be required depending on your clinical pathway. Your doctor will confirm at consultation.',
    bloodConditional: true,
  },
  injury: {
    description: 'Your profile points to recovery and repair drivers. We assess IGF-1, Vitamin D, CK, CRP, ESR, and hormonal impact on healing.',
    tags: ['IGF-1', 'Vitamin D', 'CRP', 'ESR'],
    bloods: '/intake/bloods-injury',
    bloodLabel: 'Baseline metabolic and recovery panel',
    bloodPrice: 'From $166.16 incl. GST',
    bloodNote: 'Some pathways require baseline metabolic testing, while others may not require bloods initially. Your doctor will confirm.',
    bloodConditional: true,
  },
}

function computePathway(data: FormData): Pathway {
  const scores: Record<Pathway, number> = { hormone: 0, performance: 0, metabolic: 0, hair_skin: 0, injury: 0 }

  // Goals
  const goalW: Record<string, Partial<Record<Pathway, number>>> = {
    'Hormone balance':    { hormone: 3 },
    'More energy':        { hormone: 2, metabolic: 1 },
    'Weight management':  { metabolic: 3 },
    'Athletic performance': { performance: 3 },
    'Hair & skin':        { hair_skin: 3 },
    'Better sleep':       { hormone: 2 },
    'Sexual health':      { hormone: 3 },
    'General health check': { hormone: 1, metabolic: 1 },
  }
  data.goals.forEach(g => Object.entries(goalW[g] || {}).forEach(([p, v]) => { scores[p as Pathway] += v }))

  // Symptoms
  const symptomW: Record<string, Partial<Record<Pathway, number>>> = {
    'Low energy / fatigue':   { hormone: 2, metabolic: 1 },
    'Brain fog':              { hormone: 2, metabolic: 1 },
    'Weight gain':            { metabolic: 2 },
    'Poor sleep':             { hormone: 2 },
    'Low libido or drive':    { hormone: 3 },
    'Hair loss':              { hair_skin: 3 },
    'Slow recovery':          { performance: 2, injury: 1 },
    'Mood changes':           { hormone: 2 },
    'Reduced strength':       { performance: 2, hormone: 1 },
    'Skin changes':           { hair_skin: 2 },
  }
  data.symptoms.forEach(s => Object.entries(symptomW[s] || {}).forEach(([p, v]) => { scores[p as Pathway] += v }))

  // Impact (step 2)
  const impactW: Record<string, Partial<Record<Pathway, number>>> = {
    'Energy and work performance':      { hormone: 2, metabolic: 1 },
    'Training and physical output':     { performance: 3 },
    'Sexual health and relationships':  { hormone: 3 },
    'Weight and body composition':      { metabolic: 3 },
    'Mood and mental clarity':          { hormone: 2 },
    'Hair, skin, or appearance':        { hair_skin: 3 },
    'Injury recovery':                  { injury: 3 },
  }
  if (data.impact) Object.entries(impactW[data.impact] || {}).forEach(([p, v]) => { scores[p as Pathway] += v })

  // Bonus signals
  if (data.recentBloods === 'Yes') scores.hormone += 1
  if (data.tried === "Saw a GP — was told my results are normal") { scores.hormone += 1; scores.metabolic += 1 }
  if (data.urgency === "I'm ready to start now") scores.hormone += 1

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as Pathway
}

// ─── Reusable UI ──────────────────────────────────────────────────────────────

function MultiPill({ label, selected, onClick, accent = '#4890f7' }: {
  label: string; selected: boolean; onClick: () => void; accent?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 text-left"
      style={{
        background: selected ? `color-mix(in srgb, ${accent} 12%, transparent)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? `color-mix(in srgb, ${accent} 50%, transparent)` : 'rgba(255,255,255,0.07)'}`,
        color: selected ? accent : '#8899aa',
      }}
    >
      {label}
    </button>
  )
}

function RadioCard({ label, selected, onClick, accent = '#4890f7' }: {
  label: string; selected: boolean; onClick: () => void; accent?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-150 text-left"
      style={{
        background: selected ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${selected ? `color-mix(in srgb, ${accent} 45%, transparent)` : 'rgba(255,255,255,0.06)'}`,
        color: selected ? '#f0f4f8' : '#8899aa',
        fontWeight: selected ? 500 : 400,
      }}
    >
      <span
        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{
          border: `1.5px solid ${selected ? accent : 'rgba(255,255,255,0.18)'}`,
          background: selected ? `color-mix(in srgb, ${accent} 15%, transparent)` : 'transparent',
          transition: 'all 0.15s',
        }}
      >
        {selected && <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />}
      </span>
      {label}
    </button>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold mb-2 tracking-[0.14em] uppercase" style={{ color: '#4a5a6a' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: '#4890f7' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(72,144,247,0.45)'; e.target.style.background = 'rgba(72,144,247,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
      />
    </div>
  )
}

function QLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#4a5a6a' }}>{children}</p>
}

// ─── Step 1: Symptoms & goals ─────────────────────────────────────────────────

function StepOne({ data, set, toggle }: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
  toggle: (k: 'goals' | 'symptoms', v: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
      <p className="label mb-4">STEP 1 OF 2</p>
      <h2
        className="font-bold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 34px)', color: '#f0f4f8', lineHeight: 1.1 }}
      >
        What&apos;s been going on?
      </h2>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: '#6b7a8d' }}>
        Tell us what you&apos;re dealing with. We&apos;ll use this to identify your likely clinical pathway.
      </p>

      {/* Age */}
      <div className="mb-8">
        <QLabel>Your age range</QLabel>
        <div className="flex flex-wrap gap-2">
          {AGE_RANGES.map(a => (
            <button
              key={a}
              type="button"
              onClick={() => set('ageRange', a)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
              style={{
                background: data.ageRange === a ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${data.ageRange === a ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
                color: data.ageRange === a ? '#4890f7' : '#8899aa',
                fontFamily: 'var(--font-space-grotesk)',
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="mb-8">
        <QLabel>Primary concern — select all that apply</QLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GOALS.map(g => (
            <MultiPill key={g} label={g} selected={data.goals.includes(g)} onClick={() => toggle('goals', g)} accent="#4890f7" />
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div className="mb-8">
        <QLabel>Symptoms you&apos;ve noticed</QLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SYMPTOMS.map(s => (
            <MultiPill key={s} label={s} selected={data.symptoms.includes(s)} onClick={() => toggle('symptoms', s)} accent="#4890f7" />
          ))}
        </div>
      </div>

      {/* Recent bloods */}
      <div>
        <QLabel>Blood test results in the last 3 months?</QLabel>
        <div className="flex flex-col sm:flex-row gap-2">
          {[
            { label: 'Yes — I have recent results', val: 'Yes' },
            { label: "No — I haven't tested recently", val: 'No' },
            { label: 'Not sure', val: 'Not sure' },
          ].map(({ label, val }) => (
            <button
              key={val}
              type="button"
              onClick={() => set('recentBloods', val)}
              className="flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 text-left sm:text-center"
              style={{
                background: data.recentBloods === val ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${data.recentBloods === val ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                color: data.recentBloods === val ? '#4890f7' : '#8899aa',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Step 2: Context & urgency ────────────────────────────────────────────────

function StepTwo({ data, set }: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
      <p className="label mb-4" style={{ color: '#4890f7' }}>STEP 2 OF 2</p>
      <h2
        className="font-bold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 34px)', color: '#f0f4f8', lineHeight: 1.1 }}
      >
        A bit more context.
        <br />
        <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          This helps us be specific.
        </span>
      </h2>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: '#6b7a8d' }}>
        These questions go beyond a generic match — and help us identify what&apos;s likely driving this for you specifically.
      </p>

      <div className="flex flex-col gap-8">

        {/* Duration */}
        <div>
          <QLabel>How long has this been going on?</QLabel>
          <div className="flex flex-col gap-2">
            {DURATIONS.map(d => (
              <RadioCard key={d} label={d} selected={data.duration === d} onClick={() => set('duration', d)} accent="#4890f7" />
            ))}
          </div>
        </div>

        {/* Impact */}
        <div>
          <QLabel>What&apos;s it affecting most right now?</QLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {IMPACTS.map(i => (
              <RadioCard key={i} label={i} selected={data.impact === i} onClick={() => set('impact', i)} accent="#4890f7" />
            ))}
          </div>
        </div>

        {/* Tried */}
        <div>
          <QLabel>Have you tried to address this already?</QLabel>
          <div className="flex flex-col gap-2">
            {TRIED.map(t => (
              <RadioCard key={t} label={t} selected={data.tried === t} onClick={() => set('tried', t)} accent="#4890f7" />
            ))}
          </div>
        </div>

        {/* Looking for */}
        <div>
          <QLabel>What are you looking for from a clinic?</QLabel>
          <div className="flex flex-col gap-2">
            {LOOKING_FOR.map(l => (
              <RadioCard key={l} label={l} selected={data.lookingFor === l} onClick={() => set('lookingFor', l)} accent="#4890f7" />
            ))}
          </div>
        </div>

        {/* Urgency */}
        <div>
          <QLabel>How soon are you looking to act on this?</QLabel>
          <div className="flex flex-col sm:flex-row gap-2">
            {URGENCY.map(u => (
              <button
                key={u}
                type="button"
                onClick={() => set('urgency', u)}
                className="flex-1 px-4 py-3 rounded-lg text-xs font-medium transition-all duration-150 text-center"
                style={{
                  background: data.urgency === u ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${data.urgency === u ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  color: data.urgency === u ? '#4890f7' : '#8899aa',
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

// ─── Gate: result unlock ──────────────────────────────────────────────────────

function Gate({ data, set, submitting, onSubmit, onBack, error }: {
  data: FormData
  set: (k: keyof FormData, v: string) => void
  submitting: boolean
  onSubmit: () => void
  onBack: () => void
  error: string
}) {
  const pathway = computePathway(data)
  const label = PATHWAY_LABELS[pathway]
  const info = PATHWAY_INFO[pathway]
  const valid = data.firstName.trim() && data.email.trim() && data.phone.trim()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>

      {/* Badge */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.3)' }}>
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: '#4890f7' }}>Assessment complete</p>
      </div>

      <h2
        className="font-bold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(24px, 3vw, 34px)', color: '#f0f4f8', lineHeight: 1.1 }}
      >
        Your result is ready.
      </h2>
      <p className="text-sm mb-7 leading-relaxed" style={{ color: '#6b7a8d' }}>
        We&apos;ve identified your likely clinical pathway. Enter your details to unlock your result and speak with an Apex doctor.
      </p>

      {/* Blurred pathway card */}
      <div className="relative rounded-xl overflow-hidden mb-7" style={{ border: '1px solid rgba(72,144,247,0.22)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(10,28,80,0.9) 0%, rgba(20,60,180,0.6) 100%)' }} />

        {/* Blurred content */}
        <div className="relative px-5 pt-5 pb-4" style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>RECOMMENDED PATHWAY</p>
          <p className="text-lg font-bold mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>{label}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{info.description}</p>
          <div className="flex gap-1.5 flex-wrap">
            {info.tags.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Lock bar */}
        <div className="relative px-5 py-3 flex items-center gap-2.5" style={{ background: 'rgba(5,8,14,0.7)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true">
            <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="#4890f7" strokeWidth="1.3" />
            <path d="M5 7V5.5a3 3 0 016 0V7" stroke="#4890f7" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <p className="text-[11px] font-medium" style={{ color: '#6b8fd4' }}>Enter your details below to unlock your result</p>
        </div>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-4 mb-5">
        <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="James" />
        <Field label="Email" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@email.com" />
        <Field label="Mobile" type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" />
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack}
          className="px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-150 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7a8d' }}>
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting || !valid}
          className="btn-teal flex-1 justify-center"
          style={{ opacity: submitting || !valid ? 0.5 : 1, cursor: submitting || !valid ? 'not-allowed' : 'pointer' }}
        >
          {submitting ? 'Submitting…' : 'Unlock my result →'}
        </button>
      </div>

      {error && <p className="text-sm mt-3" style={{ color: '#e05c5c' }}>{error}</p>}

      <p className="text-[11px] mt-4" style={{ color: '#3a4a5a' }}>
        100% private. No spam. An Apex doctor contacts you the same day.
      </p>
    </motion.div>
  )
}

// ─── Success ──────────────────────────────────────────────────────────────────

function Success({ data }: { data: FormData }) {
  const pathway = computePathway(data)
  const label = PATHWAY_LABELS[pathway]
  const hasBloods = data.recentBloods === 'Yes'
  const highUrgency = data.urgency === "I'm ready to start now"

  const FEATURES = [
    {
      icon: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="#4890f7" strokeWidth="1.4" /><path d="M6 10a4 4 0 014-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" /><circle cx="10" cy="10" r="1.5" fill="#4890f7" /></svg>,
      title: 'Biological Age Tracking',
      body: 'See your biological age vs chronological age, updated with every panel.',
    },
    {
      icon: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true"><rect x="3" y="5" width="14" height="11" rx="1.5" stroke="#4890f7" strokeWidth="1.4" /><path d="M6 9h2m0 0l1.5 2L11 8l1.5 3H14" stroke="#4890f7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
      title: '54+ Biomarker Dashboard',
      body: 'Every marker displayed clearly — with context, trends, and what it means for you.',
    },
    {
      icon: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true"><path d="M10 3v14M3 10h14" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" /><circle cx="10" cy="10" r="7" stroke="#4890f7" strokeWidth="1.4" /></svg>,
      title: 'Doctor-Built Protocol',
      body: 'An AHPRA-registered doctor reviews your results and builds a personalised programme.',
    },
    {
      icon: <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true"><path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.5L10 14.5 5.1 17.2l.9-5.5L2 7.8l5.5-.8L10 2z" stroke="#4890f7" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
      title: 'Ongoing Optimisation',
      body: 'Scheduled reviews, protocol adjustments, and real clinical support — not a one-off.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
      className="max-w-2xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
            <path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="label">Assessment complete</p>
          <p className="text-[11px]" style={{ color: '#3a4a5a' }}>Matched to your recommended pathway</p>
        </div>
      </div>

      <h2 className="font-bold tracking-tight mb-3"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#f0f4f8', lineHeight: 1.15 }}>
        {data.firstName ? `Here's your next step, ${data.firstName}.` : "Here's your next step."}
      </h2>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#8899aa' }}>
        {hasBloods
          ? `You have recent blood results — our team will review your submission and an Apex doctor will contact you ${highUrgency ? 'today' : 'shortly'} to arrange your consultation.`
          : `Based on your full profile, we've matched you to the ${label} program. An Apex doctor will contact you ${highUrgency ? 'today' : 'shortly'} with your blood panel referral and next steps.`}
      </p>

      {/* Matched pathway revealed */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl p-5 mb-7"
        style={{ background: 'linear-gradient(135deg, rgba(10,28,80,0.6) 0%, rgba(20,60,180,0.35) 100%)', border: '1px solid rgba(72,144,247,0.25)' }}
      >
        <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>YOUR MATCHED PATHWAY</p>
        <p className="text-base font-bold mb-1.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>{label}</p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>{PATHWAY_INFO[pathway].description}</p>
        <div className="flex gap-1.5 flex-wrap">
          {PATHWAY_INFO[pathway].tags.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(72,144,247,0.15)', color: 'rgba(160,190,255,0.8)', border: '1px solid rgba(72,144,247,0.2)' }}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Pathology pricing card — shown only after match, not publicly */}
      {!hasBloods && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="rounded-xl p-5 mb-7"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-3" style={{ color: '#3a4a5a' }}>
            PATHOLOGY
          </p>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#c8d4e0' }}>
                {PATHWAY_INFO[pathway].bloodLabel}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
                {PATHWAY_INFO[pathway].bloodNote}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-base font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: PATHWAY_INFO[pathway].bloodConditional ? '#8899aa' : '#4890f7' }}>
                {PATHWAY_INFO[pathway].bloodPrice}
              </p>
              {PATHWAY_INFO[pathway].bloodConditional && (
                <p className="text-[9px] tracking-[0.1em] uppercase mt-0.5" style={{ color: '#3a4a5a' }}>if required</p>
              )}
            </div>
          </div>
          <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
            <p className="text-[10px]" style={{ color: '#3a4a5a' }}>
              Ongoing monitoring bloods are included as part of your Apex Membership review cycle — not charged separately.
            </p>
          </div>
        </motion.div>
      )}

      {/* Doctor contact card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex items-start gap-4 p-5 rounded-xl mb-7"
        style={{ background: 'linear-gradient(135deg, rgba(72,144,247,0.07) 0%, rgba(72,144,247,0.07) 100%)', border: '1px solid rgba(72,144,247,0.18)' }}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
            <path d="M10 2a6 6 0 016 6c0 2.5-1 4.5-3 5.5V15a1 1 0 01-1 1H8a1 1 0 01-1-1v-1.5C5 12.5 4 10.5 4 8a6 6 0 016-6z" stroke="#4890f7" strokeWidth="1.3" />
            <path d="M8 18h4" stroke="#4890f7" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: '#f0f4f8' }}>An Apex doctor will contact you today</p>
          <p className="text-sm leading-relaxed" style={{ color: '#6b7a8d' }}>
            Our clinical team reviews your submission and a doctor reaches out directly — no portal, no waiting room, no queue. We handle your referral and next steps.
          </p>
        </div>
      </motion.div>

      {/* What's included */}
      <div className="mb-7">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#3a4a5a' }}>WHAT YOU GET WITH APEX</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="p-4 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">{f.icon}<p className="text-xs font-semibold" style={{ color: '#f0f4f8' }}>{f.title}</p></div>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7a8d' }}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sample dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="p-5 rounded-xl mb-7 overflow-hidden relative"
        style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.14)' }}
      >
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.08) 0%, transparent 70%)' }} />
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: '#4890f7' }}>SAMPLE — YOUR RESULTS DASHBOARD</p>
        <div className="flex flex-col gap-2.5">
          {[
            { label: 'Total Testosterone', value: '22.4 nmol/L', status: 'optimal', pct: 78 },
            { label: 'Free Testosterone', value: '420 pmol/L', status: 'optimal', pct: 82 },
            { label: 'Cortisol (AM)', value: '540 nmol/L', status: 'watch', pct: 55 },
            { label: 'Vitamin D', value: '62 nmol/L', status: 'low', pct: 32 },
            { label: 'hsCRP', value: '0.4 mg/L', status: 'optimal', pct: 88 },
          ].map(row => (
            <div key={row.label} className="flex items-center gap-3">
              <div className="w-28 flex-shrink-0"><p className="text-[10px] font-medium" style={{ color: '#4a5a6a' }}>{row.label}</p></div>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.status === 'optimal' ? '#4890f7' : row.status === 'watch' ? '#e8a838' : '#e05c5c' }} />
              </div>
              <p className="text-[10px] font-mono w-20 text-right" style={{ color: row.status === 'optimal' ? '#4890f7' : row.status === 'watch' ? '#e8a838' : '#e05c5c' }}>{row.value}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] mt-3" style={{ color: '#3a4a5a' }}>54 biomarkers tracked · Updated with every panel · Doctor-reviewed</p>
      </motion.div>

      {/* Pathway steps */}
      <div className="p-5 rounded-xl mb-7" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-5" style={{ color: '#3a4a5a' }}>YOUR NEXT STEPS</p>
        <div className="flex flex-col gap-0">
          {(hasBloods
            ? [
                { n: '01', label: 'Complete your consultation intake (3 min)' },
                { n: '02', label: 'Doctor reviews your results before the call' },
                { n: '03', label: 'Telehealth consultation — your personalised protocol is built' },
                { n: '04', label: 'Begin your protocol — coordinated fulfilment and ongoing support' },
              ]
            : [
                { n: '01', label: `Doctor-issued referral for your ${label} panel sent within 24 hours` },
                { n: '02', label: 'Collect at any accredited centre near you — fasted before 9am' },
                { n: '03', label: 'Consultation booked once results are back' },
                { n: '04', label: 'Your personalised protocol is built, monitored, and refined over time' },
              ]
          ).map((step, i, arr) => (
            <div key={step.n} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#4890f7', fontFamily: 'var(--font-space-grotesk)' }}>{step.n}</div>
                {i < arr.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 12, background: 'rgba(72,144,247,0.1)', marginTop: 2, marginBottom: 2 }} />}
              </div>
              <p className="text-sm leading-relaxed pb-3" style={{ color: '#6b7a8d' }}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {['AHPRA-registered doctors', 'Australia-wide telehealth', 'Private & confidential', 'No lock-in contracts'].map(t => (
          <span key={t} className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase" style={{ color: '#3a4a5a' }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.5)' }} />
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PreScreenForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1=symptoms, 2=context, 3=gate
  const [data, setData] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof FormData, v: string) => setData(p => ({ ...p, [k]: v }))
  const toggle = (k: 'goals' | 'symptoms', v: string) =>
    setData(p => ({
      ...p,
      [k]: (p[k] as string[]).includes(v)
        ? (p[k] as string[]).filter(x => x !== v)
        : [...(p[k] as string[]), v],
    }))

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const step1Valid = data.ageRange && data.goals.length > 0
  const step2Valid = data.duration && data.impact && data.urgency

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const pathway = computePathway(data)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Lead — ${data.firstName} → ${PATHWAY_LABELS[pathway]}`,
          from_name: 'Apex Metabolic Health',
          name: data.firstName,
          email: data.email,
          phone: data.phone,
          age_range: data.ageRange,
          goals: data.goals.join(', '),
          symptoms: data.symptoms.join(', '),
          recent_bloods: data.recentBloods,
          duration: data.duration,
          impact: data.impact,
          tried: data.tried,
          looking_for: data.lookingFor,
          urgency: data.urgency,
          matched_pathway: PATHWAY_LABELS[pathway],
          formType: 'Clinical Assessment',
        }),
      })
      const json = await res.json()
      if (json.success) {
        // Send confirmation email to customer
        const pathwayProgramMap: Record<Pathway, string> = {
          hormone:     'Hormone Optimisation',
          performance: 'Hormone & Performance',
          metabolic:   'Metabolic Weight Loss',
          hair_skin:   'Hair Restoration',
          injury:      'Injury Repair & Recovery',
        }
        fetch('/api/quiz-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: data.firstName,
            email: data.email,
            programs: [pathwayProgramMap[pathway]],
          }),
        }).catch(() => {/* non-blocking */})
        setSubmitted(true)
        scrollTop()
      }
      else setError(json.message || 'Something went wrong. Please try again.')
    } catch {
      setError('Network error — please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const progressPct = step === 1 ? '33%' : step === 2 ? '66%' : '100%'

  return (
    <>
      <Nav />
      <main>
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}
        >
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />

          <div ref={topRef} className="container-tight relative z-10" style={{ maxWidth: 680 }}>

            {/* Progress bar */}
            {!submitted && (
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: step === 3 ? '#4890f7' : '#4890f7' }}>
                    {step === 1 ? 'STEP 1 OF 2' : step === 2 ? 'STEP 2 OF 2' : 'RESULT READY'}
                  </span>
                  <span className="text-xs" style={{ color: '#3a4a5a' }}>{progressPct}</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div
                    style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #4890f7)' }}
                    initial={false}
                    animate={{ width: progressPct }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
              </div>
            )}

            {submitted ? (
              <Success data={data} />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    {step === 1 && <StepOne data={data} set={set} toggle={toggle} />}
                    {step === 2 && <StepTwo data={data} set={set} />}
                    {step === 3 && (
                      <Gate
                        data={data}
                        set={set}
                        submitting={submitting}
                        onSubmit={submit}
                        onBack={() => { setStep(2); scrollTop() }}
                        error={error}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Step 1 & 2 navigation */}
                {step < 3 && (
                  <div className="flex items-center gap-4 mt-8">
                    {step === 2 && (
                      <button type="button" onClick={() => { setStep(1); scrollTop() }}
                        className="px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-150"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7a8d' }}>
                        ← Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => { setStep(step === 1 ? 2 : 3); scrollTop() }}
                      disabled={step === 1 ? !step1Valid : !step2Valid}
                      className="btn-teal"
                      style={{ opacity: (step === 1 ? !step1Valid : !step2Valid) ? 0.45 : 1 }}
                    >
                      {step === 1 ? 'Continue →' : 'Reveal my result →'}
                    </button>
                  </div>
                )}

                {step === 1 && (
                  <p className="text-xs mt-5 flex items-center gap-2" style={{ color: '#3a4a5a' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(72,144,247,0.4)' }} />
                    Trusted by 2,000+ Australian men
                  </p>
                )}
              </>
            )}
          </div>
        </section>
        <AppFeature />
      </main>
      <Footer />
    </>
  )
}
