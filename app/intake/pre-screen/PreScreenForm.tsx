'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'
const WEB3_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'

type Pathway = 'hormone' | 'performance' | 'metabolic' | 'hair_skin' | 'injury' | 'peptide'

interface FormData {
  concern: string
  age: string
  symptoms: string[]
  history: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

const INITIAL: FormData = {
  concern: '', age: '', symptoms: [], history: '',
  firstName: '', lastName: '', email: '', phone: '',
}

// ─── Program Data ────────────────────────────────────────────────────────────

interface ProgramData {
  label: string
  tagline: string
  clinicalSummary: string
  intakeHref: string
  enquiry: string
  biomarkers: string[]
  urgency: string
}

const PROGRAMS: Record<Pathway, ProgramData> = {
  hormone: {
    label: 'Hormone Optimisation Protocol',
    tagline: 'Your GP tested 3 things. We test 32.',
    clinicalSummary: 'Your profile is consistent with hypothalamic-pituitary-gonadal axis disruption — the hormonal cascade controlling testosterone, energy, libido, and mood. This is among the most underdiagnosed patterns in men under 55, precisely because standard GP panels measure only total testosterone and miss the 11 markers that actually explain how you feel.',
    intakeHref: '/intake/hormone-consult',
    enquiry: 'trt',
    biomarkers: ['Free & Total Testosterone', 'SHBG', 'LH + FSH', 'Oestradiol', 'Prolactin', 'Cortisol', 'DHEA-S', 'TSH / T3 / T4', 'IGF-1', 'Vitamin D', 'hsCRP', 'Full Metabolic Panel'],
    urgency: 'Hormonal decline is progressive. The earlier intervention begins, the better the clinical response.',
  },
  performance: {
    label: 'Performance & Recovery Protocol',
    tagline: 'Your biology has a ceiling. Find it — then raise it.',
    clinicalSummary: 'Your profile suggests your training has hit a biological ceiling — not a motivational one. The markers we look for include suppressed IGF-1, elevated cortisol-to-testosterone ratio, and micronutrient depletion that systematically undermines recovery, adaptation, and output. This is addressable with precision. Your effort isn\'t the problem.',
    intakeHref: '/intake/hormone-consult',
    enquiry: 'performance',
    biomarkers: ['IGF-1', 'Free & Total Testosterone', 'Cortisol', 'DHEA-S', 'Thyroid Panel', 'Ferritin + Iron Studies', 'B12 + Folate', 'Zinc + Magnesium', 'hsCRP', 'Creatine Kinase', 'Vitamin D', 'Full Blood Count'],
    urgency: 'Most athletes operate 20–30% below their biological potential. The gap is measurable and closable.',
  },
  metabolic: {
    label: 'Metabolic & Weight Loss Protocol',
    tagline: 'Resistance to diet and exercise is almost always hormonal.',
    clinicalSummary: 'Your responses indicate a metabolic presentation where the limiting factor is biology, not behaviour. Insulin resistance, thyroid dysfunction, and cortisol-driven visceral fat accumulation are the three most common drivers — and they\'re virtually never investigated by GPs until you\'re diabetic. The correct intervention starts with identifying your specific driver.',
    intakeHref: '/intake/hormone-consult',
    enquiry: 'weight-loss',
    biomarkers: ['HbA1c', 'Fasting Insulin + HOMA-IR', 'TSH / T3 / T4', 'Cortisol', 'Testosterone + SHBG', 'hsCRP', 'Full Lipid Panel', 'Liver Function', 'Vitamin D', 'Leptin', 'Adiponectin', 'Full Metabolic Panel'],
    urgency: 'Metabolic dysfunction compounds over time. Earlier diagnosis changes the trajectory significantly.',
  },
  hair_skin: {
    label: 'Hair Restoration & Skin Protocol',
    tagline: 'Hair loss has a cause. Most people are treating the wrong one.',
    clinicalSummary: 'Your profile is most consistent with a hormonally-driven presentation — either DHT-mediated follicle miniaturisation, nutritional depletion, or thyroid dysfunction. These three mechanisms look identical from the outside but require entirely different interventions. Treating the wrong cause is the most common reason people spend years on products that don\'t work.',
    intakeHref: '/intake/general-consult',
    enquiry: 'hair',
    biomarkers: ['DHT', 'Free & Total Testosterone', 'DHEA-S', 'TSH / T3 / T4', 'Ferritin', 'Zinc', 'Prolactin', 'hsCRP', 'Vitamin D', 'SHBG', 'Oestradiol', 'Full Blood Count'],
    urgency: 'Hair follicle miniaturisation is progressive. Earlier intervention preserves significantly more density.',
  },
  injury: {
    label: 'Injury Repair & Recovery Protocol',
    tagline: 'Slow healing always has a systemic cause.',
    clinicalSummary: 'Your presentation suggests what\'s limiting your recovery isn\'t local — it\'s systemic. Chronically elevated cortisol, suppressed IGF-1, Vitamin D deficiency, and inflammatory burden are the four most common biological barriers to tissue repair and don\'t appear on any standard sports medicine workup. We identify the specific driver so your rehabilitation has the hormonal substrate it needs.',
    intakeHref: '/intake/general-consult',
    enquiry: 'injury-repair',
    biomarkers: ['IGF-1', 'Cortisol', 'Vitamin D', 'CK + CRP + ESR', 'Testosterone', 'Ferritin', 'B12 + Folate', 'Zinc', 'Growth Hormone Panel', 'Full Blood Count', 'Thyroid Panel', 'Full Metabolic Panel'],
    urgency: 'Tissue repair capacity declines with each failed recovery cycle. Systemic intervention changes the outcome.',
  },
  peptide: {
    label: 'Peptide & Longevity Protocol',
    tagline: 'Optimisation isn\'t a symptom. It\'s a decision.',
    clinicalSummary: 'Your profile indicates a patient functioning adequately but aware that biological output doesn\'t match ambition. This is the category where targeted peptide protocols and longevity medicine deliver the most clinically meaningful outcomes. The goal isn\'t to fix a dysfunction — it\'s to systematically close the gap between where you are and where your biology is capable of taking you.',
    intakeHref: '/intake/general-consult',
    enquiry: 'peptide',
    biomarkers: ['IGF-1', 'Growth Hormone', 'Testosterone', 'Cortisol', 'DHEA-S', 'Thyroid Panel', 'Biological Age Markers', 'hsCRP', 'Telomere Length (optional)', 'Vitamin D', 'Full Metabolic Panel', 'Oxidative Stress Panel'],
    urgency: 'Biological ageing is measurable. So is the rate of change.',
  },
}

// ─── Matching ────────────────────────────────────────────────────────────────

function matchPathway(data: FormData): Pathway {
  const { concern, age, symptoms } = data

  if (concern === 'hair_skin') return 'hair_skin'
  if (concern === 'injury')    return 'injury'
  if (concern === 'weight')    return 'metabolic'
  if (concern === 'libido')    return 'hormone'

  if (concern === 'optimise') {
    return (age === '50+' || age === '40-49') ? 'hormone' : 'peptide'
  }

  if (concern === 'energy') {
    const hormoneFlags = ['low_libido', 'mood', 'muscle_loss', 'brain_fog']
    if (symptoms.some(s => hormoneFlags.includes(s)) || age === '40-49' || age === '50+') return 'hormone'
    return 'performance'
  }

  return 'hormone'
}

function getClinicalObservations(data: FormData, pathway: Pathway): string[] {
  const obs: string[] = []

  if (data.history === 'gp_normal') {
    obs.push('Prior GP testing returned "normal" — standard panels miss free testosterone, LH/FSH, oestradiol, and cortisol, which are the markers that actually explain your symptoms.')
  } else if (data.history === 'never') {
    obs.push('No comprehensive testing on record — your symptom profile has never been mapped to objective biomarker data. This is the critical first step.')
  } else if (data.history === 'treated') {
    obs.push('Prior treatment history detected — previous intervention provides a clinical baseline. Protocol refinement is typically more targeted in these cases.')
  }

  if (data.symptoms.includes('brain_fog') && data.symptoms.includes('fatigue')) {
    obs.push('Co-presenting cognitive and energy symptoms — this combination is a hallmark of insufficient free testosterone and/or thyroid disruption. Both are routinely missed by standard panels.')
  }

  if (pathway === 'hormone' && (data.age === '40-49' || data.age === '50+')) {
    obs.push('Age-related hormonal shift — testosterone typically declines 1–2% annually from age 30. At your age bracket, the cumulative deficit is often clinically significant even when labelled "within range."')
  }

  if (data.symptoms.includes('mood') && data.symptoms.includes('low_libido')) {
    obs.push('Concurrent mood and libido changes — this pattern is characteristic of HPG axis disruption, not psychological stress. It has a distinct biomarker signature.')
  }

  if (data.symptoms.includes('muscle_loss') && pathway === 'hormone') {
    obs.push('Muscle loss is a reliable indicator of anabolic insufficiency — typically driven by low free testosterone. It won\'t respond to training adjustments alone.')
  }

  if (pathway === 'metabolic') {
    obs.push('Resistance to conventional diet and exercise is the clinical hallmark of a hormonal metabolic driver. The underlying mechanism is testable and directly addressable.')
  }

  if (pathway === 'performance' && (data.age === '18-29' || data.age === '30-39')) {
    obs.push('Performance ceiling in a physiologically active individual often reflects systemic underperformance — elevated cortisol-to-testosterone ratio and micronutrient depletion are the most common culprits.')
  }

  return obs.slice(0, 3)
}

// ─── Question Data ───────────────────────────────────────────────────────────

const CONCERN_OPTIONS = [
  { val: 'energy',    label: 'Low energy, brain fog, or fatigue',          sub: 'Difficulty getting through the day, mental sluggishness' },
  { val: 'libido',    label: 'Low libido or sexual health',                sub: 'Reduced drive, erectile difficulties, performance concerns' },
  { val: 'weight',    label: 'Weight gain or body composition',            sub: 'Fat accumulation, inability to lose weight, muscle loss' },
  { val: 'hair_skin', label: 'Hair loss or declining skin quality',        sub: 'Thinning, shedding, texture changes, skin quality decline' },
  { val: 'injury',    label: 'Injury recovery or chronic pain',            sub: 'Slow healing, recurring injuries, persistent inflammation' },
  { val: 'optimise',  label: 'I feel okay — but I want to be exceptional', sub: 'Performance, longevity, peptides, full optimisation' },
]

const AGE_OPTIONS = [
  { val: '18-29', label: '18 – 29' },
  { val: '30-39', label: '30 – 39' },
  { val: '40-49', label: '40 – 49' },
  { val: '50+',   label: '50 +' },
]

const SYMPTOM_MAP: Record<string, { val: string; label: string }[]> = {
  energy: [
    { val: 'fatigue',     label: 'Persistent fatigue — not fixed by sleep' },
    { val: 'brain_fog',   label: 'Brain fog or poor concentration' },
    { val: 'mood',        label: 'Mood changes, irritability, or low motivation' },
    { val: 'low_libido',  label: 'Reduced sex drive' },
    { val: 'muscle_loss', label: 'Muscle loss or difficulty building' },
  ],
  libido: [
    { val: 'low_libido',   label: 'Reduced sexual drive or interest' },
    { val: 'erectile',     label: 'Erectile dysfunction or reduced firmness' },
    { val: 'morning_wood', label: 'Loss of morning erections' },
    { val: 'mood',         label: 'Low mood or confidence' },
    { val: 'fatigue',      label: 'Low energy or motivation' },
  ],
  weight: [
    { val: 'belly_fat',    label: 'Stubborn belly fat that won\'t shift' },
    { val: 'plateau',      label: 'Diet and exercise aren\'t producing results' },
    { val: 'cravings',     label: 'Strong sugar or carbohydrate cravings' },
    { val: 'energy_crash', label: 'Energy crashes after eating' },
    { val: 'slow_meta',    label: 'Feeling like metabolism has slowed significantly' },
  ],
  hair_skin: [
    { val: 'thinning',     label: 'Visible thinning across the crown or temples' },
    { val: 'shedding',     label: 'Excessive daily shedding' },
    { val: 'hairline',     label: 'Hairline recession' },
    { val: 'skin_texture', label: 'Declining skin texture or firmness' },
    { val: 'scalp',        label: 'Scalp sensitivity, itching, or oiliness' },
  ],
  injury: [
    { val: 'slow_heal',    label: 'Injuries take significantly longer to heal' },
    { val: 'recurring',    label: 'Recurring injury at the same site' },
    { val: 'chronic_pain', label: 'Chronic joint or tendon pain' },
    { val: 'inflammation', label: 'Persistent swelling or inflammation' },
    { val: 'stiffness',    label: 'Morning stiffness that takes hours to resolve' },
  ],
  optimise: [
    { val: 'sub_energy',   label: 'Energy that\'s good — but not optimal' },
    { val: 'sub_recovery', label: 'Recovery that could be faster' },
    { val: 'sub_focus',    label: 'Focus and mental clarity that could be sharper' },
    { val: 'sub_body',     label: 'Body composition that could be leaner' },
    { val: 'sub_libido',   label: 'Sex drive that has dipped from your baseline' },
  ],
}

const HISTORY_OPTIONS = [
  { val: 'never',     label: 'No — I\'ve never had comprehensive blood work',  sub: 'Standard GP panels only, if at all' },
  { val: 'gp_normal', label: 'Yes — GP told me everything was "normal"',       sub: 'Results came back fine, but I still feel like this' },
  { val: 'recent',    label: 'Yes — I have results from the last 6 months',    sub: 'I can share these with my doctor' },
  { val: 'treated',   label: 'Yes — I\'ve been treated for this before',       sub: 'Previous hormone therapy or clinical treatment' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: 'rgba(72,144,247,0.1)' }}>
        <motion.div className="h-full rounded-full" style={{ background: ACCENT }}
          initial={false} animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.5, ease }} />
      </div>
      <span className="text-[10px] font-bold tracking-[0.15em] uppercase flex-shrink-0" style={{ color: ACCENT, opacity: 0.6 }}>
        {step} / {total}
      </span>
    </div>
  )
}

function ProfileStrip({ data }: { data: FormData }) {
  const parts: string[] = []
  if (data.concern) {
    const c = CONCERN_OPTIONS.find(o => o.val === data.concern)
    if (c) {
      const short = c.label.length > 28 ? c.label.substring(0, 28) + '…' : c.label
      parts.push(short)
    }
  }
  if (data.age) {
    const a = AGE_OPTIONS.find(o => o.val === data.age)
    if (a) parts.push(a.label)
  }
  if (data.symptoms.length > 0) {
    parts.push(`${data.symptoms.length} symptom${data.symptoms.length !== 1 ? 's' : ''} flagged`)
  }
  if (parts.length === 0) return null
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }} className="mb-5 px-4 py-2.5 rounded-xl flex items-center gap-2.5 overflow-hidden"
      style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
      <p className="text-[10px] font-semibold tracking-[0.06em] truncate" style={{ color: ACCENT, opacity: 0.85 }}>
        {parts.join('  ·  ')}
      </p>
    </motion.div>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 mb-6"
      style={{ color: 'var(--text-primary)', opacity: 0.35, fontSize: '12px', fontWeight: 500 }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '0.35' }}>
      <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3" aria-hidden="true">
        <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </button>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

const TOTAL_Q = 4

export default function PreScreenForm() {
  const [screen, setScreen]         = useState(0)
  const [dir, setDir]               = useState(1)
  const [data, setData]             = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [errors, setErrors]         = useState<string[]>([])
  const [flash, setFlash]           = useState('')

  const concern  = data.concern as keyof typeof SYMPTOM_MAP
  const symptoms = SYMPTOM_MAP[concern] || SYMPTOM_MAP['energy']
  const pathway  = matchPathway(data)
  const prog     = PROGRAMS[pathway]
  const observations = getClinicalObservations(data, pathway)

  const advance = (delta = 1) => {
    setDir(delta)
    setScreen(s => s + delta)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pick = (k: keyof FormData, v: string) => {
    setData(p => ({ ...p, [k]: v }))
    setFlash(v)
    setTimeout(() => { setFlash(''); advance(1) }, 280)
  }

  const toggleSymptom = (s: string) =>
    setData(p => ({ ...p, symptoms: p.symptoms.includes(s) ? p.symptoms.filter(x => x !== s) : [...p.symptoms, s] }))

  const set = (k: keyof FormData, v: string) => setData(p => ({ ...p, [k]: v }))

  const validateLead = () => {
    const e: string[] = []
    if (!data.firstName.trim()) e.push('First name required')
    if (!data.email.trim() || !data.email.includes('@')) e.push('Valid email required')
    if (!data.phone.trim()) e.push('Phone number required')
    return e
  }

  const submitLead = async () => {
    const errs = validateLead()
    if (errs.length) { setErrors(errs); return }
    setSubmitting(true)
    setErrors([])
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: `Health Assessment — ${data.firstName} ${data.lastName} → ${prog.label}`,
          from_name: 'Apex Metabolic Health',
          firstName: data.firstName, lastName: data.lastName,
          email: data.email, phone: data.phone,
          matchedProgram: prog.label, pathway,
          concern: data.concern, age: data.age,
          symptoms: data.symptoms.join(', '), history: data.history,
          formType: 'Health Assessment',
          submittedAt: new Date().toISOString(),
        }),
      })
      fetch('/api/send-confirmation', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, firstName: data.firstName, formType: 'assessment' }),
      }).catch(() => {})
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
    advance(1)
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -36 : 36 }),
  }
  const sp = {
    key: screen, custom: dir, variants,
    initial: 'enter' as const, animate: 'center' as const, exit: 'exit' as const,
    transition: { duration: 0.28, ease },
  }

  const cardBase: React.CSSProperties = { background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }
  const cardHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'rgba(72,144,247,0.3)'
    e.currentTarget.style.background  = 'rgba(72,144,247,0.04)'
  }
  const cardLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.borderColor = 'rgba(72,144,247,0.1)'
    e.currentTarget.style.background  = 'var(--surface)'
  }

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '96px', paddingBottom: '80px' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }} />

        <div className="container-tight relative z-10 max-w-lg">
          <AnimatePresence mode="wait" custom={dir}>

            {/* ── Screen 0 — Concern ── */}
            {screen === 0 && (
              <motion.div {...sp}>
                <div className="mb-8">
                  <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT, opacity: 0.65 }}>
                    Clinical Assessment · Confidential
                  </p>
                  <h1 className="font-bold tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    What&apos;s the primary issue?
                  </h1>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                    Your answer determines the clinical pathway we map for you. Be direct — the more accurate the input, the more relevant your result.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {CONCERN_OPTIONS.map(opt => {
                    const isFlash = flash === opt.val
                    return (
                      <button key={opt.val} type="button" onClick={() => pick('concern', opt.val)}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150"
                        style={{
                          background: isFlash ? 'rgba(72,144,247,0.08)' : 'var(--surface)',
                          border: `1px solid ${isFlash ? 'rgba(72,144,247,0.4)' : 'rgba(72,144,247,0.1)'}`,
                        }}
                        onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{opt.label}</p>
                          <p className="text-[11px]" style={{ color: 'var(--text-primary)', opacity: 0.38 }}>{opt.sub}</p>
                        </div>
                        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: isFlash ? ACCENT : 'rgba(72,144,247,0.3)', transition: 'color 0.15s' }} aria-hidden="true">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )
                  })}
                </div>

                <p className="text-[10px] text-center mt-6" style={{ color: 'var(--text-primary)', opacity: 0.22 }}>
                  Takes 90 seconds · Confidential · AHPRA-registered doctors
                </p>
              </motion.div>
            )}

            {/* ── Screen 1 — Age ── */}
            {screen === 1 && (
              <motion.div {...sp}>
                <BackBtn onClick={() => advance(-1)} />
                <Progress step={1} total={TOTAL_Q} />
                <ProfileStrip data={data} />
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT, opacity: 0.65 }}>
                  Clinical Intake · Step 1 of {TOTAL_Q}
                </p>
                <h2 className="font-bold tracking-tight mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  How old are you?
                </h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Hormonal profiles shift significantly by decade. Age determines which markers we prioritise.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {AGE_OPTIONS.map(opt => {
                    const isFlash = flash === opt.val
                    return (
                      <button key={opt.val} type="button" onClick={() => pick('age', opt.val)}
                        className="flex items-center justify-center py-5 rounded-xl font-bold transition-all duration-150"
                        style={{
                          background: isFlash ? 'rgba(72,144,247,0.08)' : 'var(--surface)',
                          border: `1px solid ${isFlash ? ACCENT : 'rgba(72,144,247,0.1)'}`,
                          fontFamily: 'var(--font-space-grotesk)', fontSize: '20px',
                          color: isFlash ? ACCENT : 'var(--text-primary)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = 'rgba(72,144,247,0.05)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.1)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--surface)' }}>
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Screen 2 — Symptoms ── */}
            {screen === 2 && (
              <motion.div {...sp}>
                <BackBtn onClick={() => advance(-1)} />
                <Progress step={2} total={TOTAL_Q} />
                <ProfileStrip data={data} />
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT, opacity: 0.65 }}>
                  Clinical Intake · Step 2 of {TOTAL_Q}
                </p>
                <h2 className="font-bold tracking-tight mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  Which of these apply?
                </h2>
                <p className="text-sm mb-7" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Select everything that sounds familiar. Co-presenting symptoms are diagnostically significant.
                </p>
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {symptoms.map(s => {
                    const sel = data.symptoms.includes(s.val)
                    return (
                      <button key={s.val} type="button" onClick={() => toggleSymptom(s.val)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm text-left transition-all duration-150"
                        style={{
                          background: sel ? 'rgba(72,144,247,0.07)' : 'var(--surface)',
                          border: `1px solid ${sel ? 'rgba(72,144,247,0.35)' : 'rgba(72,144,247,0.08)'}`,
                        }}>
                        <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: sel ? ACCENT : 'transparent', border: `1.5px solid ${sel ? ACCENT : 'rgba(255,255,255,0.15)'}`, transition: 'all 0.15s' }}>
                          {sel && (
                            <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                              <path d="M1.5 5l3 3 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium" style={{ color: sel ? ACCENT : 'var(--text-primary)' }}>{s.label}</span>
                      </button>
                    )
                  })}
                </div>
                <button type="button" onClick={() => advance(1)} className="btn-teal w-full justify-center">
                  {data.symptoms.length === 0 ? 'None of these — continue' : `Continue (${data.symptoms.length} selected)`}
                  <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.div>
            )}

            {/* ── Screen 3 — Blood work history ── */}
            {screen === 3 && (
              <motion.div {...sp}>
                <BackBtn onClick={() => advance(-1)} />
                <Progress step={3} total={TOTAL_Q} />
                <ProfileStrip data={data} />
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: ACCENT, opacity: 0.65 }}>
                  Clinical Intake · Step 3 of {TOTAL_Q}
                </p>
                <h2 className="font-bold tracking-tight mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  Have you had blood work done?
                </h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                  Prior testing changes what your first appointment looks like and how we interpret your symptom profile.
                </p>
                <div className="flex flex-col gap-2.5">
                  {HISTORY_OPTIONS.map(opt => {
                    const isFlash = flash === opt.val
                    return (
                      <button key={opt.val} type="button" onClick={() => pick('history', opt.val)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-xl text-left transition-all duration-150"
                        style={{
                          background: isFlash ? 'rgba(72,144,247,0.06)' : 'var(--surface)',
                          border: `1px solid ${isFlash ? 'rgba(72,144,247,0.4)' : 'rgba(72,144,247,0.1)'}`,
                        }}
                        onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div>
                          <p className="text-sm font-semibold mb-0.5" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{opt.label}</p>
                          <p className="text-[11px]" style={{ color: 'var(--text-primary)', opacity: 0.38 }}>{opt.sub}</p>
                        </div>
                        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: isFlash ? ACCENT : 'rgba(72,144,247,0.3)', transition: 'color 0.15s' }} aria-hidden="true">
                          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Screen 4 — Unlock (lead form) ── */}
            {screen === 4 && !submitted && (
              <motion.div {...sp}>
                <BackBtn onClick={() => advance(-1)} />
                <Progress step={4} total={TOTAL_Q} />

                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.3)' }}>
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                      <path d="M1.5 5l2.5 2.5 4.5-5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                    Clinical profile compiled · Protocol match ready
                  </span>
                </div>

                <h2 className="font-bold tracking-tight mb-3"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  Your results are ready.
                </h2>
                <p className="text-sm leading-relaxed mb-7" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
                  We&apos;ve identified a clinical pattern and matched you to a protocol. Enter your details to unlock your personalised assessment — a doctor will review your profile within 24 hours.
                </p>

                {/* Blurred result preview */}
                <div className="relative mb-8 rounded-2xl overflow-hidden"
                  style={{ border: '1px solid rgba(72,144,247,0.2)', background: 'var(--surface)' }}>
                  <div className="p-5" style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: ACCENT }}>Matched protocol</p>
                    <p className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>{prog.label}</p>
                    <p className="text-xs mb-4" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>{prog.tagline}</p>
                    <div className="flex flex-col gap-1.5">
                      {prog.biomarkers.slice(0, 4).map(b => (
                        <div key={b} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
                          <span className="text-xs" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{b}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
                        <span className="text-xs" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>+ {prog.biomarkers.length - 4} more markers</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ background: 'rgba(7,10,13,0.65)', backdropFilter: 'blur(2px)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)' }}>
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" style={{ color: ACCENT }}>
                        <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-center mb-1" style={{ color: 'var(--text-primary)' }}>Results locked</p>
                    <p className="text-[10px] text-center" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>Enter your details below to unlock</p>
                  </div>
                </div>

                {errors.length > 0 && (
                  <div className="rounded-lg px-4 py-3 mb-4" style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)' }}>
                    {errors.map(e => <p key={e} className="text-xs" style={{ color: '#dc3545' }}>— {e}</p>)}
                  </div>
                )}

                <div className="flex flex-col gap-3 mb-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                        First name <span style={{ color: ACCENT }}>*</span>
                      </label>
                      <input type="text" value={data.firstName} onChange={e => set('firstName', e.target.value)}
                        placeholder="John" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = ACCENT }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.15)' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                        Last name
                      </label>
                      <input type="text" value={data.lastName} onChange={e => set('lastName', e.target.value)}
                        placeholder="Smith" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = ACCENT }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.15)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                      Email address <span style={{ color: ACCENT }}>*</span>
                    </label>
                    <input type="email" value={data.email} onChange={e => set('email', e.target.value)}
                      placeholder="john@email.com" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
                      onFocus={e => { e.currentTarget.style.borderColor = ACCENT }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.15)' }} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                      Mobile number <span style={{ color: ACCENT }}>*</span>
                    </label>
                    <input type="tel" value={data.phone} onChange={e => set('phone', e.target.value)}
                      placeholder="04XX XXX XXX" inputMode="tel" className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.15)', color: 'var(--text-primary)' }}
                      onFocus={e => { e.currentTarget.style.borderColor = ACCENT }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.15)' }} />
                  </div>
                </div>

                <button type="button" onClick={submitLead} disabled={submitting}
                  className="btn-teal w-full justify-center mb-4" style={{ opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Processing…' : 'Unlock my clinical assessment'}
                  {!submitting && (
                    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                <p className="text-[10px] text-center" style={{ color: 'var(--text-primary)', opacity: 0.25 }}>
                  Your information is private and confidential. A doctor will review your profile within 24 hours.
                  <br />Not shared with third parties. AHPRA-registered practitioners only.
                </p>
              </motion.div>
            )}

            {/* ── Screen 5 — Result ── */}
            {screen === 5 && (
              <motion.div {...sp}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.3)' }}>
                      <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                        <path d="M1.5 5l2.5 2.5 4.5-5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                      Clinical profile unlocked{data.firstName ? ` · ${data.firstName}` : ''} · reviewed by Apex Medical Team
                    </span>
                  </div>

                  <h1 className="font-bold tracking-tight mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 4.5vw, 40px)', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                    {prog.label}
                  </h1>
                  <p className="text-base font-semibold mb-6"
                    style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {prog.tagline}
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="rounded-2xl p-6 mb-6"
                  style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.15)' }}>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: ACCENT }}>Clinical assessment</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>
                    {prog.clinicalSummary}
                  </p>
                </motion.div>

                {observations.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18, ease }}
                    className="rounded-2xl p-6 mb-6"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>Observations from your profile</p>
                    <div className="flex flex-col gap-3">
                      {observations.map((obs, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.07, ease }}
                          className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: ACCENT }} />
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{obs}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl px-5 py-3.5 mb-6"
                  style={{ background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.12)' }}>
                  <p className="text-xs leading-relaxed italic" style={{ color: ACCENT }}>{prog.urgency}</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28, ease }}
                  className="rounded-2xl p-6 mb-6"
                  style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.1)' }}>
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>
                    Recommended blood panel — {prog.biomarkers.length} markers
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {prog.biomarkers.map(b => (
                      <div key={b} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT, opacity: 0.6 }} />
                        <span className="text-xs" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38, ease }}
                  className="flex flex-col gap-3">
                  <Link href={prog.intakeHref} className="btn-teal w-full justify-center" style={{ fontSize: '14px', padding: '16px' }}>
                    Book my consultation →
                  </Link>
                  <a href="https://calendly.com/admin-apexmetabolichealth/free-discovery-call" target="_blank" rel="noopener noreferrer"
                    className="btn-ghost w-full justify-center" style={{ fontSize: '13px' }}>
                    Speak with our team first
                  </a>
                </motion.div>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.55 }}
                  className="text-[10px] text-center mt-6" style={{ color: 'var(--text-primary)', opacity: 0.22 }}>
                  This assessment is not a medical diagnosis. A clinical assessment with an AHPRA-registered doctor is required before any treatment is prescribed.
                </motion.p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Selection flash toast */}
        <AnimatePresence>
          {flash && (
            <motion.div key="toast"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-5 py-2.5 rounded-full pointer-events-none z-50"
              style={{ background: 'rgba(7,10,13,0.9)', border: '1px solid rgba(72,144,247,0.3)', backdropFilter: 'blur(16px)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
              <span className="text-xs font-semibold tracking-[0.1em]" style={{ color: ACCENT }}>Updating your profile</span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
