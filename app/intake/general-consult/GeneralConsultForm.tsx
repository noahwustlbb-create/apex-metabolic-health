'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const STORAGE_KEY = 'apex-general-consult-v2'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const ease = [0.22, 1, 0.36, 1] as const
const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

const HEALTH_CONDITIONS = [
  'Hormone Optimisation & TRT',
  'Weight Management & Metabolic Health',
  'Performance & Recovery',
  'Hair Restoration',
  'Erectile Dysfunction',
  'Skin Regeneration',
  'Injury Repair & Recovery',
  'Longevity & Anti-Ageing',
  'Sleep Disorders',
  'Blood Panel & Health Assessment',
  'General Consultation',
  'Other',
]

const CURRENT_SYMPTOMS = [
  'High Blood Pressure', 'High Cholesterol', 'Chest Pain', 'Frequent Headaches',
  'Shortness of Breath', 'Previous Heart Condition', 'Heart Attack', 'Stroke',
  'Palpitations', 'None of the Above',
]

const CONDITIONS = [
  'High Blood Pressure', 'Heart Failure', 'Palpitations / Irregular Heartbeat', 'DVT (Deep Vein Thrombosis)',
  'Diabetes', 'Hypoglycaemia', 'Hyperthyroidism', 'Hypothyroidism', 'Endocrine Issues',
  'Renal Failure', 'Kidney Stones / Infections', 'Liver Failure / Abnormal LFTs',
  'Cancer', 'Prostate Cancer', 'BPH (Benign Prostatic Hyperplasia)',
  'Immune Disorders', 'Auto Immune Disorders',
  'Anaemia', 'Iron Deficiency',
  'Mental Health Conditions', 'Anxiety / Agitation', 'Depression',
  'Substance Abuse Disorders', 'Eating Disorders',
  'Seizures', 'Muscle Pain', 'Hair Loss', 'Other Medical Condition',
]

interface D {
  firstName: string; lastName: string; gender: string
  dob: string; nationality: string; occupation: string
  homeAddress: string; suburb: string; state: string; postcode: string
  homePh: string; workPh: string; mobile: string
  email: string; email2: string
  weightKg: string; heightCm: string
  bloodGroup: string; bloodPressure: string; heartRate: string
  medicareNum: string; medicareExp: string; medicareRef: string
  atsi: string; myHealthRecord: string
  gpName: string; gpContact: string
  healthCondition: string
  mainCondition: string; firstNoticed: string; contributingFactors: string
  recentBloods: string
  allergies: string
  currentSymptoms: string[]
  healthScore: string; energyScore: string; energyLowest: string; energyHighest: string
  currentHealthStatus: string
  pastSurgeries: string; pastMedicalHistory: string
  medications: string; familyHistory: string
  conditions: string[]; otherConditions: string
  exerciseFrequency: string; exerciseRoutine: string
  typicalDiet: string
  alcoholPerWeek: string; recreationalDrugs: string
  smokingStatus: string; smokingPerDay: string; pastSmoker: string; quitYear: string
  weightLoss: string; weightGain: string
  stressScore: string; stressEvents: string; hobbies: string
  majorGoal: string; pharmacyPreference: string; pathway: string
  notMultipleClinics: boolean
  agentAgreement: boolean; waiverConsent: boolean
  gpCheckAgreement: boolean; privacyConsent: boolean
  consent: boolean; ageConfirm: boolean; sportingCode: boolean
  printName: string
}

const init = (): D => ({
  firstName: '', lastName: '', gender: '', dob: '', nationality: '', occupation: '',
  homeAddress: '', suburb: '', state: '', postcode: '',
  homePh: '', workPh: '', mobile: '', email: '', email2: '',
  weightKg: '', heightCm: '', bloodGroup: '', bloodPressure: '', heartRate: '',
  medicareNum: '', medicareExp: '', medicareRef: '', atsi: '', myHealthRecord: '',
  gpName: '', gpContact: '',
  healthCondition: '',
  mainCondition: '', firstNoticed: '', contributingFactors: '', recentBloods: '',
  allergies: '', currentSymptoms: [],
  healthScore: '', energyScore: '', energyLowest: '', energyHighest: '',
  currentHealthStatus: '',
  pastSurgeries: '', pastMedicalHistory: '',
  medications: '', familyHistory: '',
  conditions: [], otherConditions: '',
  exerciseFrequency: '', exerciseRoutine: '',
  typicalDiet: '',
  alcoholPerWeek: '', recreationalDrugs: '',
  smokingStatus: '', smokingPerDay: '', pastSmoker: '', quitYear: '',
  weightLoss: '', weightGain: '',
  stressScore: '', stressEvents: '', hobbies: '',
  majorGoal: '', pharmacyPreference: '', pathway: '',
  notMultipleClinics: false,
  agentAgreement: false, waiverConsent: false,
  gpCheckAgreement: false, privacyConsent: false,
  consent: false, ageConfirm: false, sportingCode: false, printName: '',
})

// ─── Primitives ───────────────────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#0a0e1a',
  caretColor: '#4890f7',
}
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'rgba(200,169,110,0.5)'
  e.target.style.background = 'rgba(72,144,247,0.04)'
}
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.09)'
  e.target.style.background = 'rgba(255,255,255,0.04)'
}

function F({ label, value, onChange, type = 'text', placeholder, req, hint }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; req?: boolean; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5878' }}>
        {label}{req && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      {hint && <p className="text-[11px] mb-1.5 leading-relaxed" style={{ color: '#7a90a8' }}>{hint}</p>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
        style={inputBase} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}

function TA({ label, value, onChange, placeholder, rows = 3, hint, req }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; hint?: string; req?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5878' }}>
        {label}{req && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      {hint && <p className="text-[11px] mb-1.5 leading-relaxed" style={{ color: '#7a90a8' }}>{hint}</p>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none transition-all duration-150"
        style={inputBase} onFocus={onFocus} onBlur={onBlur} />
    </div>
  )
}

function Cards({ label, opts, value, onChange, hint, req }: {
  label: string; opts: string[]; value: string; onChange: (v: string) => void
  hint?: string; req?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5878' }}>
        {label}{req && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      {hint && <p className="text-[11px] mb-2" style={{ color: '#7a90a8' }}>{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {opts.map(o => (
          <button key={o} type="button" onClick={() => onChange(value === o ? '' : o)}
            className="px-4 py-2.5 rounded-sm text-xs font-semibold transition-all duration-150"
            style={{
              background: value === o ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === o ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
              color: value === o ? '#4890f7' : '#8899aa',
            }}>{o}</button>
        ))}
      </div>
    </div>
  )
}

function Score({ label, value, onChange, hint }: {
  label: string; value: string; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5878' }}>{label}</label>
      {hint && <p className="text-[11px] mb-2" style={{ color: '#7a90a8' }}>{hint}</p>}
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => String(i)).map(s => (
          <button key={s} type="button" onClick={() => onChange(s)}
            className="w-9 h-9 rounded-sm text-xs font-bold transition-all duration-150"
            style={{
              background: value === s ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === s ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.07)'}`,
              color: value === s ? '#4890f7' : '#5a6a7a',
            }}>{s}</button>
        ))}
      </div>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#2a3a4a' }}>{label}</span>
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}

function Chk({ checked, toggle, label }: { checked: boolean; toggle: () => void; label: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer" onClick={toggle}>
      <div className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-150"
        style={{
          background: checked ? 'rgba(72,144,247,0.12)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${checked ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.1)'}`,
        }}>
        {checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className="text-sm leading-relaxed" style={{ color: '#4a5878' }}>{label}</span>
    </label>
  )
}

function SectionHead({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <span className="font-bold flex-shrink-0 tabular-nums leading-none"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '2.8rem', color: 'rgba(72,144,247,0.09)', letterSpacing: '-0.04em', marginTop: '-4px' }}>
        {num}
      </span>
      <div>
        <h3 className="font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(15px, 1.8vw, 18px)', color: '#0a0e1a', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          {title}
        </h3>
        {sub && <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4a5878' }}>{sub}</p>}
      </div>
    </div>
  )
}

function CheckGrid({ items, selected, toggle }: { items: string[]; selected: string[]; toggle: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map(c => (
        <button key={c} type="button" onClick={() => toggle(c)}
          className="flex items-center gap-3 px-4 py-3 rounded-sm text-xs font-medium text-left transition-all duration-150"
          style={{
            background: selected.includes(c) ? 'rgba(72,144,247,0.07)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${selected.includes(c) ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.07)'}`,
            color: selected.includes(c) ? '#4890f7' : '#8899aa',
          }}>
          <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center transition-all"
            style={{
              background: selected.includes(c) ? 'rgba(72,144,247,0.18)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selected.includes(c) ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.1)'}`,
            }}>
            {selected.includes(c) && (
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                <path d="M2 5l2 2 4-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          {c}
        </button>
      ))}
    </div>
  )
}

// ─── Pathway Cards ───────────────────────────────────────────────────────────

function PathwayCards({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const memberFeatures = [
    'No clinic or admin fees after enrolment',
    'Medications at cost price through our partner pharmacy — zero mark-up',
    'Nursing team support and review cycles every 6–8 weeks',
    'VIP admin support 9am–4pm weekdays',
    'Treatment protocols updated at every review',
  ]
  const casualPath1 = [
    'Fulfilled through our TGA-compliant partner pharmacy',
    'Medication fees apply — our team will confirm before dispensing',
  ]
  const casualPath2 = [
    'Script and treatment plan sent directly to you',
    'Fill at any pharmacy of your choice',
    'Dosing guides included',
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Membership */}
      <button type="button" onClick={() => onChange('member')}
        className="text-left p-5 rounded-sm transition-all duration-200"
        style={{
          background: value === 'member' ? 'rgba(72,144,247,0.07)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${value === 'member' ? 'rgba(200,169,110,0.5)' : 'rgba(255,255,255,0.08)'}`,
        }}>
        <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm mb-4"
          style={{ background: 'rgba(72,144,247,0.1)', border: '1px solid rgba(72,144,247,0.25)', color: '#4890f7' }}>
          Recommended
        </span>
        <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>
          Apex Clinical Program
        </h3>
        <p className="text-xs mb-4" style={{ color: '#4a5878' }}>
          Complete care pathway from consultation through to ongoing treatment.
        </p>
        <ul className="flex flex-col gap-2 mb-6">
          {memberFeatures.map(f => (
            <li key={f} className="flex items-start gap-2 text-xs" style={{ color: '#4a5878' }}>
              <span style={{ color: '#4890f7', flexShrink: 0 }}>—</span>{f}
            </li>
          ))}
        </ul>
        <div className="w-full py-2.5 rounded-sm text-center text-xs font-bold tracking-[0.1em] uppercase transition-all duration-150"
          style={{
            background: value === 'member' ? '#4890f7' : 'rgba(72,144,247,0.08)',
            color: value === 'member' ? '#fff' : '#4890f7',
            border: '1px solid rgba(72,144,247,0.35)',
          }}>
          {value === 'member' ? '✓ Selected' : 'Select Program'}
        </div>
      </button>

      {/* Casual */}
      <button type="button" onClick={() => onChange('casual')}
        className="text-left p-5 rounded-sm transition-all duration-200"
        style={{
          background: value === 'casual' ? 'rgba(72,144,247,0.04)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${value === 'casual' ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.07)'}`,
        }}>
        <div className="mb-4" style={{ height: 28 }} />
        <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#0a0e1a' }}>
          Single Consultation
        </h3>
        <p className="text-xs mb-4" style={{ color: '#4a5878' }}>
          One-time consultation. Script issued if clinically appropriate.
        </p>
        <p className="text-xs font-semibold mb-1.5" style={{ color: '#4a5878' }}>Pathway 1 — Partner Pharmacy</p>
        <ul className="flex flex-col gap-1.5 mb-4">
          {casualPath1.map(f => (
            <li key={f} className="flex items-start gap-2 text-xs" style={{ color: '#4a5878' }}>
              <span style={{ color: '#7a90a8', flexShrink: 0 }}>—</span>{f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-semibold" style={{ color: '#4a5878' }}>Pathway 2 — Own Pharmacy</p>
          <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#4890f7' }}>$125 <span className="text-[10px] font-normal" style={{ color: '#4a5878' }}>one-off</span></span>
        </div>
        <ul className="flex flex-col gap-1.5 mb-4">
          {casualPath2.map(f => (
            <li key={f} className="flex items-start gap-2 text-xs" style={{ color: '#4a5878' }}>
              <span style={{ color: '#7a90a8', flexShrink: 0 }}>—</span>{f}
            </li>
          ))}
        </ul>
        <p className="text-[11px] mb-4 px-3 py-2 rounded-sm" style={{ color: '#f0a84a', background: 'rgba(240,168,74,0.08)', border: '1px solid rgba(240,168,74,0.2)' }}>
          ⚠ NSW patients: Script release (Pathway 2) is not available under NSW Poisons and Therapeutic Goods Regulation 2008 for certain Schedule 4 medications prescribed via telehealth. Partner Pharmacy (Pathway 1) remains available.
        </p>
        <div className="w-full py-2.5 rounded-sm text-center text-xs font-bold tracking-[0.1em] uppercase transition-all duration-150"
          style={{
            background: value === 'casual' ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
            color: value === 'casual' ? '#4890f7' : '#4a5a6a',
            border: `1px solid ${value === 'casual' ? 'rgba(72,144,247,0.3)' : 'rgba(255,255,255,0.07)'}`,
          }}>
          {value === 'casual' ? '✓ Selected' : 'Single Consult'}
        </div>
      </button>
    </div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────

function Success({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mb-10" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(72,144,247,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(72,144,247,0.05)' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }} className="label mb-5">Intake Received</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease }}
        className="font-bold tracking-tight mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1, color: '#0a0e1a', letterSpacing: '-0.02em' }}>
        {name ? `Thank you, ${name}.` : 'Thank you.'}<br />
        <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          We take it from here.
        </span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58, ease }}
        className="text-base leading-relaxed mb-10" style={{ color: '#4a5878', maxWidth: 440 }}>
        Your General Consult intake has been received. Our clinical team will review your details and be in touch within one business day to confirm your appointment.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.7, delay: 0.72, ease }}
        style={{ width: '100%', height: 1, transformOrigin: 'left', background: 'linear-gradient(90deg, rgba(72,144,247,0.12), rgba(255,255,255,0.04) 60%, transparent)', marginBottom: 32 }} />
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.82, ease }} className="flex flex-col gap-4 mb-12">
        {[
          { step: 'Intake review', detail: 'Our clinical team reviews your submission and prepares a case summary for your assigned doctor.' },
          { step: 'Appointment confirmation', detail: "You'll receive direct contact from us confirming your telehealth appointment time and any pre-consultation requirements." },
          { step: 'Medical consultation', detail: 'Your doctor conducts a thorough telehealth consultation, reviews your history, and discusses next clinical steps.' },
          { step: 'Your care protocol', detail: 'Treatment is coordinated through our TGA-compliant compounding pharmacy partner. Ongoing reviews are scheduled from day one.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div style={{ minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#7a90a8', fontFamily: 'var(--font-space-grotesk)' }}>{i + 1}</div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#0a0e1a' }}>{item.step}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5878' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0, ease }} className="text-[11px]" style={{ color: '#2a3a4a' }}>
        Apex Metabolic Health &nbsp;·&nbsp; AHPRA-registered practitioners &nbsp;·&nbsp; Private &amp; confidential
      </motion.p>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function GeneralConsultForm() {
  const [data, setData] = useState<D>(() => {
    if (typeof window !== 'undefined') {
      try { return { ...init(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } } catch { return init() }
    }
    return init()
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (!submitted) localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }, [data, submitted])

  const set = (k: keyof D, v: string | boolean | string[]) => setData(p => ({ ...p, [k]: v }))

  const toggleCond = (c: string) => setData(p => ({
    ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c],
  }))

  const toggleSymptom = (s: string) => setData(p => ({
    ...p, currentSymptoms: s === 'None of the Above'
      ? (p.currentSymptoms.includes(s) ? [] : ['None of the Above'])
      : p.currentSymptoms.includes(s)
        ? p.currentSymptoms.filter(x => x !== s)
        : p.currentSymptoms.filter(x => x !== 'None of the Above').concat(s),
  }))

  const isValid = !!(
    data.firstName.trim() && data.lastName.trim() && data.dob &&
    data.mobile.trim() && data.email.trim() && data.medicareNum.trim() &&
    data.myHealthRecord && data.notMultipleClinics &&
    data.agentAgreement && data.waiverConsent && data.gpCheckAgreement &&
    data.privacyConsent && data.consent && data.ageConfirm && data.sportingCode &&
    data.printName.trim()
  )

  const submit = async () => {
    if (!isValid) {
      setError('Please complete all required fields and accept all declarations before submitting.')
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `General Consult Intake — ${data.firstName} ${data.lastName}`,
          from_name: 'Apex Metabolic Health',
          formType: 'General Consult Intake',
          name: `${data.firstName} ${data.lastName}`,
          dob: data.dob, gender: data.gender,
          nationality: data.nationality, occupation: data.occupation,
          email: data.email, email2: data.email2, mobile: data.mobile,
          home_phone: data.homePh, work_phone: data.workPh,
          home_address: `${data.homeAddress}, ${data.suburb} ${data.state} ${data.postcode}`,
          weight_kg: data.weightKg, height_cm: data.heightCm,
          blood_group: data.bloodGroup, blood_pressure: data.bloodPressure, heart_rate: data.heartRate,
          medicare: `${data.medicareNum} exp ${data.medicareExp} ref ${data.medicareRef}`,
          atsi: data.atsi, my_health_record: data.myHealthRecord,
          gp_name: data.gpName, gp_contact: data.gpContact,
          health_condition: data.healthCondition,
          main_condition: data.mainCondition,
          first_noticed: data.firstNoticed,
          contributing_factors: data.contributingFactors,
          recent_bloods: data.recentBloods,
          allergies: data.allergies,
          current_symptoms: data.currentSymptoms.join(', ') || 'None selected',
          health_score: data.healthScore, energy_score: data.energyScore,
          energy_lowest: data.energyLowest, energy_highest: data.energyHighest,
          current_health_status: data.currentHealthStatus,
          past_medical_history: data.pastMedicalHistory,
          past_surgeries: data.pastSurgeries,
          medications: data.medications,
          family_history: data.familyHistory,
          conditions: data.conditions.join(', ') || 'None selected',
          other_conditions: data.otherConditions,
          exercise_frequency: data.exerciseFrequency,
          exercise_routine: data.exerciseRoutine,
          typical_diet: data.typicalDiet,
          alcohol_per_week: data.alcoholPerWeek,
          recreational_drugs: data.recreationalDrugs,
          smoking: data.smokingStatus === 'Yes' ? `Yes — ${data.smokingPerDay}/day` : data.smokingStatus,
          past_smoker: data.pastSmoker === 'Yes' ? `Yes — quit ${data.quitYear}` : data.pastSmoker,
          weight_change: `Loss: ${data.weightLoss || '0'}kg  Gain: ${data.weightGain || '0'}kg`,
          stress_score: data.stressScore, stress_events: data.stressEvents,
          hobbies: data.hobbies,
          health_goals: data.majorGoal,
          pharmacy_preference: data.pharmacyPreference,
          pathway: data.pathway === 'member' ? 'Apex Clinical Program' : data.pathway === 'casual' ? 'Single Consultation' : 'Not selected',
          print_name: data.printName,
          consents_accepted: 'Age 18+, Medical consent, Sporting code, Not multiple clinics, Agent agreement, Waiver, GP check, Privacy consent',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
        localStorage.removeItem(STORAGE_KEY)
        setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      } else setError('Something went wrong. Please try again.')
    } catch { setError('Network error. Please try again.') }
    finally { setSubmitting(false) }
  }

  const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden" style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }} />

          <div ref={topRef} className="container-tight relative z-10" style={{ maxWidth: 720 }}>
            {submitted ? (
              <Success name={data.firstName} />
            ) : (
              <>
                {/* Page header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="mb-12">
                  <p className="label mb-3">General Telehealth Consult</p>
                  <h1 className="font-bold tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#0a0e1a', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
                    Request an appointment<br />
                    <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      & consent form.
                    </span>
                  </h1>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#4a5878', maxWidth: 520 }}>
                    Complete this intake before your consultation. Your doctor reviews all information prior to your appointment — the more detail you provide, the better prepared they will be.
                  </p>
                  <div className="flex flex-wrap gap-5">
                    {[['⏱', '10–15 min'], ['🔒', 'Private & confidential'], ['💾', 'Auto-saved'], ['🩺', 'Doctor reviewed']].map(([icon, text]) => (
                      <div key={text} className="flex items-center gap-2">
                        <span className="text-xs">{icon}</span>
                        <span className="text-xs" style={{ color: '#4a5878' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Form sections */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-col gap-12">

                  {/* 01 — Personal Information */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="01" title="Personal Information" sub="Your basic registration details for our clinical records." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="James" req />
                      <F label="Last name" value={data.lastName} onChange={v => set('lastName', v)} placeholder="Smith" req />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Date of birth" type="date" value={data.dob} onChange={v => set('dob', v)} req />
                      <F label="Nationality" value={data.nationality} onChange={v => set('nationality', v)} placeholder="Australian" />
                    </div>
                    <Cards label="Biological gender" opts={['Male', 'Female', 'Non-binary', 'Prefer not to say']} value={data.gender} onChange={v => set('gender', v)} />
                    <F label="Occupation / job title" value={data.occupation} onChange={v => set('occupation', v)} placeholder="e.g. Construction manager" />
                  </div>

                  {/* 02 — Contact & Address */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="02" title="Contact & Address" sub="How we reach you and your registered address." />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <F label="Mobile" type="tel" value={data.mobile} onChange={v => set('mobile', v)} placeholder="04XX XXX XXX" req />
                      <F label="Home phone" type="tel" value={data.homePh} onChange={v => set('homePh', v)} placeholder="07 XXXX XXXX" />
                      <F label="Work phone" type="tel" value={data.workPh} onChange={v => set('workPh', v)} placeholder="Optional" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Email" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@email.com" req />
                      <F label="Second email (optional)" type="email" value={data.email2} onChange={v => set('email2', v)} placeholder="Optional" />
                    </div>
                    <Divider label="Address" />
                    <F label="Street address" value={data.homeAddress} onChange={v => set('homeAddress', v)} placeholder="123 Example Street" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="col-span-2">
                        <F label="Suburb" value={data.suburb} onChange={v => set('suburb', v)} placeholder="Brisbane City" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5878' }}>State</label>
                        <select value={data.state} onChange={e => set('state', e.target.value)}
                          className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150 appearance-none"
                          style={{ ...inputBase, color: data.state ? '#F5F5F5' : '#4a5a6a' }}
                          onFocus={onFocus} onBlur={onBlur}>
                          <option value="" disabled style={{ background: '#f8f9ff' }}>State</option>
                          {AU_STATES.map(s => <option key={s} value={s} style={{ background: '#f8f9ff', color: '#0a0e1a' }}>{s}</option>)}
                        </select>
                      </div>
                      <F label="Postcode" value={data.postcode} onChange={v => set('postcode', v)} placeholder="4000" />
                    </div>
                  </div>

                  {/* 03 — Medicare & Identification */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="03" title="Medicare & Identification" sub="Required for safe prescribing and monitored medicine compliance." />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <F label="Medicare number" value={data.medicareNum} onChange={v => set('medicareNum', v)} placeholder="XXXX XXXXX X" req
                          hint="10 digits. Required to verify use of monitored medicines via QSCRIPTS. If you do not have a Medicare number, enter 10 zeros." />
                      </div>
                      <F label="Medicare expiry" value={data.medicareExp} onChange={v => set('medicareExp', v)} placeholder="MMYY" />
                    </div>
                    <F label="Medicare reference number" value={data.medicareRef} onChange={v => set('medicareRef', v)} placeholder="e.g. 1" />
                    <div className="p-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs font-semibold mb-1.5" style={{ color: '#4a5878' }}>Driver&apos;s licence — identity verification</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#4a5878' }}>
                        Please email a photo of your driver&apos;s licence (name and date of birth only — no licence number required) to{' '}
                        <strong style={{ color: '#4a5878' }}>care@apexmetabolichealth.com.au</strong> with your full name in the subject line.
                        This is collected for identity verification only and destroyed once confirmed.
                      </p>
                    </div>
                    <Cards label="Aboriginal or Torres Strait Islander?" opts={['Yes', 'No', 'Prefer not to say']} value={data.atsi} onChange={v => set('atsi', v)} />
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5878' }}>
                        Consent to access My Health Record <span style={{ color: '#4890f7' }}>*</span>
                      </label>
                      <p className="text-[11px] mb-3 leading-relaxed" style={{ color: '#7a90a8' }}>
                        Access allows your doctor to view your medical records and current medications to make an informed diagnosis and prescribe appropriate treatment. Access is obtained only during consultation and while you are a current patient. Your file is kept completely confidential throughout.
                      </p>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map(o => (
                          <button key={o} type="button" onClick={() => set('myHealthRecord', data.myHealthRecord === o ? '' : o)}
                            className="px-8 py-2.5 rounded-sm text-xs font-semibold transition-all duration-150"
                            style={{
                              background: data.myHealthRecord === o ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${data.myHealthRecord === o ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                              color: data.myHealthRecord === o ? '#4890f7' : '#8899aa',
                            }}>{o}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 04 — Reason for Consultation */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="04" title="Reason for Consultation" sub="Tell us what you'd like help with. The more detail you provide, the more prepared your doctor will be." />
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5878' }}>
                        Please select the health condition you would like to discuss
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {HEALTH_CONDITIONS.map(c => (
                          <button key={c} type="button" onClick={() => set('healthCondition', data.healthCondition === c ? '' : c)}
                            className="px-4 py-2.5 rounded-sm text-xs font-semibold transition-all duration-150"
                            style={{
                              background: data.healthCondition === c ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${data.healthCondition === c ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                              color: data.healthCondition === c ? '#4890f7' : '#8899aa',
                            }}>{c}</button>
                        ))}
                      </div>
                    </div>
                    <TA label="Reason for appointment" value={data.mainCondition} onChange={v => set('mainCondition', v)}
                      placeholder="Describe your main concern, symptoms, and problems as clearly as you can. Include as much detail as possible."
                      rows={5} hint="Your doctor reads this before your consultation — more detail means a more prepared doctor." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TA label="When did you first notice this?" value={data.firstNoticed} onChange={v => set('firstNoticed', v)}
                        placeholder="When symptoms began and how they have progressed…" rows={3} />
                      <TA label="Suspected contributing factors" value={data.contributingFactors} onChange={v => set('contributingFactors', v)}
                        placeholder="Stress, lifestyle changes, prior treatments, injuries…" rows={3} />
                    </div>
                    <Cards label="Do you have blood test results from the past 3 months?"
                      opts={['Yes', 'No', 'Not sure']} value={data.recentBloods} onChange={v => set('recentBloods', v)} />
                    <div className="p-4 rounded-sm" style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.1)' }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: '#4890f7' }}>Forward previous test results</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#4a5878' }}>
                        Email previous blood tests, DEXA scans, or other relevant results to{' '}
                        <strong style={{ color: '#4a5878' }}>care@apexmetabolichealth.com.au</strong> with your full name in the subject line. Your doctor will review them before your consultation.
                      </p>
                    </div>
                  </div>

                  {/* 05 — Physical Health */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="05" title="Physical Health" sub="Baseline physical measurements and your regular GP details." />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Height (cm)" type="number" value={data.heightCm} onChange={v => set('heightCm', v)} placeholder="178" />
                      <F label="Current weight (kg)" type="number" value={data.weightKg} onChange={v => set('weightKg', v)} placeholder="85" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <F label="Blood group (if known)" value={data.bloodGroup} onChange={v => set('bloodGroup', v)} placeholder="e.g. A+" />
                      <F label="Last blood pressure reading" value={data.bloodPressure} onChange={v => set('bloodPressure', v)} placeholder="e.g. 120/80 mmHg" />
                      <F label="Heart rate (bpm)" type="number" value={data.heartRate} onChange={v => set('heartRate', v)} placeholder="72" />
                    </div>
                    <Divider label="Your GP" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="GP / regular doctor's name" value={data.gpName} onChange={v => set('gpName', v)} placeholder="Dr. Surname" />
                      <F label="GP contact number" type="tel" value={data.gpContact} onChange={v => set('gpContact', v)} placeholder="Phone number" />
                    </div>
                  </div>

                  {/* 06 — Allergies & Current Symptoms */}
                  <div className="flex flex-col gap-5">
                    <SectionHead num="06" title="Allergies & Current Symptoms" sub="Please indicate if you currently suffer from any of the following." />
                    <TA label="Do you have any allergies?" value={data.allergies} onChange={v => set('allergies', v)}
                      placeholder="Please state each allergen and your reaction (e.g. Penicillin → anaphylaxis). Write 'None' if not applicable."
                      rows={3} hint="Medications, vitamins, minerals, food, latex, etc." />
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5878' }}>
                        Please tick relating to your current health — select all that apply
                      </label>
                      <CheckGrid items={CURRENT_SYMPTOMS} selected={data.currentSymptoms} toggle={toggleSymptom} />
                    </div>
                    <Score label="Current overall health score" value={data.healthScore} onChange={v => set('healthScore', v)} hint="0 = very poor, 10 = excellent" />
                    <Score label="Current energy level" value={data.energyScore} onChange={v => set('energyScore', v)} hint="0 = exhausted, 10 = highly energetic" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Energy lowest time of day" value={data.energyLowest} onChange={v => set('energyLowest', v)} placeholder="e.g. 3pm" />
                      <F label="Energy highest time of day" value={data.energyHighest} onChange={v => set('energyHighest', v)} placeholder="e.g. 10am" />
                    </div>
                  </div>

                  {/* 07 — Medical Conditions */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="07" title="Medical Conditions" sub="Do you suffer from any of the following? Select all that apply — past or present." />
                    <CheckGrid items={CONDITIONS} selected={data.conditions} toggle={toggleCond} />
                    <TA label="Other medical conditions not listed above" value={data.otherConditions} onChange={v => set('otherConditions', v)}
                      placeholder="Any other conditions not covered above…" rows={2} />
                  </div>

                  {/* 08 — Medical History */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="08" title="Medical History" sub="Include anything relevant, even if it seems minor. Your doctor reviews all of this before your consultation." />
                    <TA label="Current health status including any medical issues" value={data.currentHealthStatus} onChange={v => set('currentHealthStatus', v)}
                      placeholder="Describe your current health status and any ongoing medical issues…" rows={4} />
                    <TA label="Past medical history" value={data.pastMedicalHistory} onChange={v => set('pastMedicalHistory', v)}
                      placeholder="All medical problems with the year they began (e.g. Hypertension 2018). Write 'None' if not applicable." rows={3} />
                    <TA label="Past surgeries" value={data.pastSurgeries} onChange={v => set('pastSurgeries', v)}
                      placeholder="List all surgeries with approximate year (e.g. Appendectomy 2015). Write 'None' if not applicable."
                      rows={3} hint="Mark any work-related injuries with an asterisk (*) and note if a workers compensation claim is involved." />
                    <TA label="List any medications, vitamins or supplements you take" value={data.medications} onChange={v => set('medications', v)}
                      placeholder="Include all prescription medications, vitamins, minerals, herbal remedies — dose and frequency. Write 'None' if not applicable."
                      rows={4} hint="Include everything. Over-the-counter items and supplements all count." />
                    <TA label="Family medical history" value={data.familyHistory} onChange={v => set('familyHistory', v)}
                      placeholder="Note the condition and which family member — e.g. Father: type 2 diabetes, Mother: breast cancer…" rows={3} />
                  </div>

                  {/* 09 — Lifestyle */}
                  <div className="flex flex-col gap-5">
                    <SectionHead num="09" title="Lifestyle" sub="Your daily habits, exercise, nutrition, and relevant lifestyle factors." />
                    <Cards label="How often do you exercise?"
                      opts={['Never', 'Once or twice a week', 'Every other day', 'Daily']}
                      value={data.exerciseFrequency} onChange={v => set('exerciseFrequency', v)} />
                    <TA label="Describe your current lifestyle" value={data.exerciseRoutine} onChange={v => set('exerciseRoutine', v)}
                      placeholder="Exercise routine, physical activity, sport — describe what you typically do. Write 'None' if you don't currently exercise." rows={3} />
                    <TA label="Describe your current diet" value={data.typicalDiet} onChange={v => set('typicalDiet', v)}
                      placeholder="What do you typically eat? Keto, Mediterranean, high carb, intermittent fasting — describe your eating pattern." rows={3} />
                    <F label="How many standard drinks of alcohol do you consume per week?" value={data.alcoholPerWeek} onChange={v => set('alcoholPerWeek', v)} placeholder="e.g. 5–6 standard drinks" />
                    <Cards label="Do you engage in the use of recreational drugs?" opts={['No', 'Occasionally', 'Yes']} value={data.recreationalDrugs} onChange={v => set('recreationalDrugs', v)} />
                    <Divider label="Smoking" />
                    <Cards label="What is your smoking status?" opts={['Current smoker', 'Ex-smoker', 'Never smoked']} value={data.smokingStatus} onChange={v => set('smokingStatus', v)} />
                    {data.smokingStatus === 'Current smoker' && (
                      <F label="Cigarettes per day" type="number" value={data.smokingPerDay} onChange={v => set('smokingPerDay', v)} placeholder="Number per day" />
                    )}
                    {data.smokingStatus === 'Ex-smoker' && (
                      <F label="Year you quit" type="number" value={data.quitYear} onChange={v => set('quitYear', v)} placeholder="e.g. 2018" />
                    )}
                    <Divider label="Weight Changes (Past 12 Months)" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Weight lost (kg)" type="number" value={data.weightLoss} onChange={v => set('weightLoss', v)} placeholder="0" hint="Leave blank if not applicable" />
                      <F label="Weight gained (kg)" type="number" value={data.weightGain} onChange={v => set('weightGain', v)} placeholder="0" hint="Leave blank if not applicable" />
                    </div>
                    <Divider label="Mental Health" />
                    <Score label="Current stress level" value={data.stressScore} onChange={v => set('stressScore', v)} hint="0 = extremely stressed, 10 = completely calm" />
                    <TA label="Three most significant stressful events in your life" value={data.stressEvents} onChange={v => set('stressEvents', v)}
                      placeholder="List up to three. Indicate if any are ongoing and continuing to impact your daily life."
                      rows={3} hint="This helps your doctor understand your broader mental health context." />
                    <F label="Hobbies and sport" value={data.hobbies} onChange={v => set('hobbies', v)} placeholder="What do you do for fun or fitness?" />
                  </div>

                  {/* 10 — Goals & Pharmacy */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="10" title="Goals & Pharmacy" sub="Your health objectives and preferred pharmacy for any prescribed protocols." />
                    <TA label="What are your health goals?" value={data.majorGoal} onChange={v => set('majorGoal', v)}
                      placeholder="What do you want to achieve through this consultation and ongoing care? Be as specific as possible." rows={4} />
                    <div>
                      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5878' }}>Pharmacy preference</label>
                      <p className="text-[11px] mb-2 leading-relaxed" style={{ color: '#7a90a8' }}>
                        If treatment is prescribed, where would you prefer your protocol to be fulfilled?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Apex Partner Pharmacy', 'My local chemist'].map(o => (
                          <button key={o} type="button" onClick={() => set('pharmacyPreference', data.pharmacyPreference === o ? '' : o)}
                            className="px-5 py-2.5 rounded-sm text-xs font-semibold transition-all duration-150"
                            style={{
                              background: data.pharmacyPreference === o ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
                              border: `1px solid ${data.pharmacyPreference === o ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
                              color: data.pharmacyPreference === o ? '#4890f7' : '#8899aa',
                            }}>{o}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 11 — Choose Your Path */}
                  <div className="flex flex-col gap-4">
                    <SectionHead num="11" title="Choose Your Path" sub="After your consultation, two pathways are available. One is a complete clinical program. The other is a prescription only." />
                    <PathwayCards value={data.pathway} onChange={v => set('pathway', v)} />
                    <p className="text-xs" style={{ color: '#7a90a8' }}>
                      Our team will confirm consultation fees and program details based on your selected pathway. You can change your selection at any time before your consultation.
                    </p>
                  </div>

                  {/* 12 — Declaration & Consents */}
                  <div className="flex flex-col gap-5">
                    <SectionHead num="12" title="Declaration & Consents" sub="Please read each statement carefully before submitting." />

                    {/* Not multiple clinics */}
                    <div className="p-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Chk checked={data.notMultipleClinics} toggle={() => set('notMultipleClinics', !data.notMultipleClinics)}
                        label="I confirm and agree that I am not procuring medication or treatments through multiple clinics for the same conditions for either personal use or on-selling, and understand that it would be illegal to do so and would result in immediate termination of any relationship with Apex Metabolic Health." />
                    </div>

                    {/* Agent Agreement */}
                    <div className="flex flex-col gap-3 p-5 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: '#7a90a8' }}>Agent Agreement</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#4a5878' }}>
                        The individual filling out this form consents and agrees to Apex Metabolic Health, its Directors, Staff, Contractors and associated partners to act as their agent. You agree to giving consent for the agent to act on your behalf with AHPRA-registered Doctors, Pharmacists, and Allied Health Professionals within the interest of your enquiries and in accordance with the Australian Privacy Act. You acknowledge that the Apex Metabolic Health team comprises contractors and admin staff who are not Doctors and cannot provide medical advice. You agree for the team to act as an agent in liaising with your Doctor/s, the pharmacies and other parties at your instruction and in your best interests.
                      </p>
                      <p className="text-xs leading-relaxed font-semibold" style={{ color: '#4a5878' }}>
                        Note: Body enhancement or performance enhancement for purely aesthetic or competitive purposes is not a clinical treatment goal and will not be prescribed by a Doctor for this purpose.
                      </p>
                      <Chk checked={data.agentAgreement} toggle={() => set('agentAgreement', !data.agentAgreement)}
                        label="I confirm I have read and agree to the Agent Agreement above." />
                    </div>

                    {/* GP check agreement */}
                    <div className="p-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Chk checked={data.gpCheckAgreement} toggle={() => set('gpCheckAgreement', !data.gpCheckAgreement)}
                        label="I agree to attend my regular GP or Specialist for full health checks and agree to have any checks they deem necessary, including but not limited to blood pressure, cholesterol, heart check, ECG, physical examination, and pathology requests." />
                    </div>

                    {/* Privacy consent */}
                    <div className="p-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Chk checked={data.privacyConsent} toggle={() => set('privacyConsent', !data.privacyConsent)}
                        label="I confirm I have read and agree to the terms in Apex Metabolic Health's Medical Practice Privacy and Consent Policy." />
                    </div>

                    {/* Waiver */}
                    <div className="flex flex-col gap-3 p-5 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: '#7a90a8' }}>Waiver & Disclaimer</p>
                      <p className="text-xs leading-relaxed" style={{ color: '#4a5878' }}>
                        By submitting this form, I agree to only use any medication or treatment prescribed to me, if any, in the correct and safe manner as ordered by the Doctor. I agree that the information and any prescribed protocols are only for me and that I will not sell, share or distribute medication or protocols to any other parties. I agree to use any medication at the prescribed dose only and to report any side effects or adverse reactions to the pharmacy and clinical team promptly.
                      </p>
                      <Chk checked={data.waiverConsent} toggle={() => set('waiverConsent', !data.waiverConsent)}
                        label="I have read and agree to the Waiver and Disclaimer above." />
                    </div>

                    {/* Standard consents */}
                    <div className="flex flex-col gap-4">
                      <Chk checked={data.ageConfirm} toggle={() => set('ageConfirm', !data.ageConfirm)}
                        label="I confirm I am 18 years of age or older." />
                      <Chk checked={data.consent} toggle={() => set('consent', !data.consent)}
                        label="I authorise Apex Metabolic Health and its AHPRA-registered medical team to review my information and perform examinations and/or treatment deemed clinically necessary. I understand this is not a substitute for emergency medical care." />
                      <Chk checked={data.sportingCode} toggle={() => set('sportingCode', !data.sportingCode)}
                        label="I declare that I am NOT under any sporting or professional code where the treatments or medicines offered may be prohibited." />
                    </div>

                    {/* Submission summary + signature */}
                    <div className="p-4 rounded-sm mt-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-xs font-bold tracking-[0.12em] uppercase mb-3" style={{ color: '#7a90a8' }}>Submission Summary</p>
                      {[
                        ['Name', `${data.firstName} ${data.lastName}`],
                        ['Email', data.email],
                        ['Mobile', data.mobile],
                        ['Date of birth', data.dob],
                        ['State', data.state],
                      ].filter(([, v]) => v?.trim()).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <span style={{ color: '#7a90a8' }}>{k}</span>
                          <span style={{ color: '#4a5878' }}>{v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <F label="Print full name (signature)" value={data.printName} onChange={v => set('printName', v as string)} placeholder="Your full legal name" req />
                      <div>
                        <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5878' }}>Date</label>
                        <div className="w-full px-4 py-3 rounded-sm text-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#4a5878' }}>
                          {today}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-2 pb-4">
                    {error && (
                      <div className="mb-5 p-4 rounded-sm text-sm" style={{ background: 'rgba(224,92,92,0.06)', border: '1px solid rgba(224,92,92,0.2)', color: '#e05c5c' }}>
                        {error}
                      </div>
                    )}
                    <button type="button" onClick={submit} disabled={submitting}
                      className="btn-teal w-full sm:w-auto"
                      style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Submitting…' : 'Submit intake form →'}
                    </button>
                    <p className="text-xs mt-4" style={{ color: '#7a90a8' }}>
                      Your progress is saved automatically. All information is private and confidential. This is not a substitute for emergency medical care.
                    </p>
                  </div>

                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
