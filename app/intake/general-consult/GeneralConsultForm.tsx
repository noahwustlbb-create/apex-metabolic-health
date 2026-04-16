'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const STORAGE_KEY = 'apex-general-consult-v1'
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const ease = [0.22, 1, 0.36, 1] as const
const TOTAL = 6
const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const STEP_LABELS = ['Personal Details', 'Medical History', 'Lifestyle & Health', 'Conditions', 'Your Goals', 'Declaration']
const CONDITIONS = [
  'Cancer', 'Hypoglycaemia', 'Diabetes', 'Kidney Stones / Infections',
  'Abnormal Liver Function Tests', 'Seizures', 'High Blood Pressure',
  'Palpitations / Irregular Heartbeat', 'DVT (Deep Vein Thrombosis)',
  'Anaemia', 'Iron Deficiency', 'Agitation / Anxiety',
  'Depression', 'Muscle Pain', 'Hair Loss',
]

interface D {
  firstName: string; lastName: string; gender: string
  dob: string; weightKg: string; heightCm: string; nationality: string
  homeAddress: string; suburb: string; state: string; postcode: string
  homePh: string; workPh: string; mobile: string
  email: string; email2: string; occupation: string
  bloodGroup: string; bpSystolic: string; bpDiastolic: string; heartRate: string
  medicareNum: string; medicareExp: string; medicareRef: string
  atsi: string; gpName: string; gpContact: string; hobbies: string
  pastSurgeries: string; pastMedicalHistory: string
  medications: string; allergies: string; familyHistory: string
  smokingStatus: string; smokingPerDay: string; pastSmoker: string; quitYear: string
  alcoholPerWeek: string; weightLoss: string; weightGain: string
  healthScore: string; energyScore: string; energyLowest: string; energyHighest: string
  exerciseFrequency: string; exerciseRoutine: string
  mealBreakfast: string; mealMorningTea: string; mealLunch: string
  mealAfternoonTea: string; mealDinner: string; mealBeforeBed: string; typicalDiet: string
  stressScore: string; stressEvents: string; conditions: string[]; otherConditions: string
  mainCondition: string; majorGoal: string; firstNoticed: string; contributingFactors: string
  recentBloods: string
  printName: string; consent: boolean; ageConfirm: boolean; sportingCode: boolean
}

const init = (): D => ({
  firstName: '', lastName: '', gender: '', dob: '', weightKg: '', heightCm: '', nationality: '',
  homeAddress: '', suburb: '', state: '', postcode: '',
  homePh: '', workPh: '', mobile: '', email: '', email2: '', occupation: '',
  bloodGroup: '', bpSystolic: '', bpDiastolic: '', heartRate: '',
  medicareNum: '', medicareExp: '', medicareRef: '',
  atsi: '', gpName: '', gpContact: '', hobbies: '',
  pastSurgeries: '', pastMedicalHistory: '', medications: '', allergies: '', familyHistory: '',
  smokingStatus: '', smokingPerDay: '', pastSmoker: '', quitYear: '', alcoholPerWeek: '',
  weightLoss: '', weightGain: '',
  healthScore: '', energyScore: '', energyLowest: '', energyHighest: '',
  exerciseFrequency: '', exerciseRoutine: '',
  mealBreakfast: '', mealMorningTea: '', mealLunch: '',
  mealAfternoonTea: '', mealDinner: '', mealBeforeBed: '', typicalDiet: '',
  stressScore: '', stressEvents: '', conditions: [], otherConditions: '',
  mainCondition: '', majorGoal: '', firstNoticed: '', contributingFactors: '', recentBloods: '',
  printName: '', consent: false, ageConfirm: false, sportingCode: false,
})

// ─── Primitives ───────────────────────────────────────────────────────────────

const inputBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#f0f4f8',
  caretColor: '#4890f7',
}
const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'rgba(72,144,247,0.5)'
  e.target.style.background = 'rgba(72,144,247,0.04)'
}
const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.09)'
  e.target.style.background = 'rgba(255,255,255,0.04)'
}

function F({ label, value, onChange, type = 'text', placeholder, req, hint }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; req?: boolean; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>
        {label}{req && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      {hint && <p className="text-[11px] mb-1.5 leading-relaxed" style={{ color: '#3a4a5a' }}>{hint}</p>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
        style={inputBase} onFocus={inputFocus} onBlur={inputBlur} />
    </div>
  )
}

function TA({ label, value, onChange, placeholder, rows = 3, hint }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>{label}</label>
      {hint && <p className="text-[11px] mb-1.5 leading-relaxed" style={{ color: '#3a4a5a' }}>{hint}</p>}
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none transition-all duration-150"
        style={inputBase} onFocus={inputFocus} onBlur={inputBlur} />
    </div>
  )
}

function Cards({ label, opts, value, onChange, hint }: {
  label: string; opts: string[]; value: string; onChange: (v: string) => void; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>{label}</label>
      {hint && <p className="text-[11px] mb-2" style={{ color: '#3a4a5a' }}>{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {opts.map(o => (
          <button key={o} type="button" onClick={() => onChange(value === o ? '' : o)}
            className="px-4 py-2.5 rounded-sm text-xs font-semibold transition-all duration-150"
            style={{
              background: value === o ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === o ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
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
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>{label}</label>
      {hint && <p className="text-[11px] mb-2" style={{ color: '#3a4a5a' }}>{hint}</p>}
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => String(i)).map(s => (
          <button key={s} type="button" onClick={() => onChange(s)}
            className="w-9 h-9 rounded-sm text-xs font-bold transition-all duration-150"
            style={{
              background: value === s ? 'rgba(72,144,247,0.15)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === s ? 'rgba(72,144,247,0.5)' : 'rgba(255,255,255,0.07)'}`,
              color: value === s ? '#4890f7' : '#5a6a7a',
            }}>{s}</button>
        ))}
      </div>
    </div>
  )
}

function Div({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: '#2a3a4a' }}>{label}</span>
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
    </div>
  )
}

function Head({ step, title, sub }: { step: number; title: string; sub: string }) {
  return (
    <div className="mb-8">
      <p className="label mb-3">Step {step} of {TOTAL}</p>
      <h2 className="font-bold tracking-tight mb-2"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 34px)', color: '#f0f4f8', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <p className="text-sm" style={{ color: '#6b7a8d' }}>{sub}</p>
    </div>
  )
}

function Chk({ checked, toggle, label }: { checked: boolean; toggle: () => void; label: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer" onClick={toggle}>
      <div className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-150"
        style={{
          background: checked ? 'rgba(72,144,247,0.15)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${checked ? 'rgba(72,144,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
        }}>
        {checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{label}</span>
    </label>
  )
}

// ─── Welcome ──────────────────────────────────────────────────────────────────

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
      <div className="mb-8" style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
          <path d="M9 12h6M12 9v6" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#4890f7" strokeWidth="1.4" opacity="0.5" />
        </svg>
      </div>
      <p className="label mb-4">General Telehealth Consult</p>
      <h1 className="font-bold tracking-tight mb-4"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#f0f4f8', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
        Let&apos;s get you ready<br />
        <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          for your consult.
        </span>
      </h1>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7a8d', maxWidth: 460 }}>
        This intake form gives your doctor the full clinical picture before your consultation. Completing it thoroughly means your appointment time is spent on clinical discussion — not gathering basic information.
      </p>
      <div className="flex flex-col gap-3 mb-8 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          ['⏱', 'About 8–10 minutes to complete'],
          ['🔒', 'Private and confidential — AHPRA-compliant'],
          ['💾', 'Your progress is saved automatically'],
          ['🩺', 'Reviewed by your doctor before your consultation'],
        ].map(([icon, text]) => (
          <div key={text} className="flex items-center gap-3">
            <span className="text-sm w-5 flex-shrink-0">{icon}</span>
            <span className="text-sm" style={{ color: '#8899aa' }}>{text}</span>
          </div>
        ))}
      </div>
      <button type="button" onClick={onStart} className="btn-teal">
        Start intake
        <span className="btn-circle" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <p className="text-xs mt-4" style={{ color: '#2a3a4a' }}>All consultations conducted by AHPRA-registered practitioners. This is not a substitute for emergency medical care.</p>
    </motion.div>
  )
}

// ─── Step 1: Personal Details ─────────────────────────────────────────────────

function S1({ d, set }: { d: D; set: (k: keyof D, v: string) => void }) {
  return (
    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={1} title="Let's start with your details." sub="Basic registration information for your clinical file." />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="First name" value={d.firstName} onChange={v => set('firstName', v)} placeholder="James" req />
          <F label="Last name" value={d.lastName} onChange={v => set('lastName', v)} placeholder="Smith" req />
        </div>
        <Cards label="Gender" opts={['Male', 'Female', 'Non-binary', 'Prefer not to say']} value={d.gender} onChange={v => set('gender', v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Date of birth" type="date" value={d.dob} onChange={v => set('dob', v)} req />
          <F label="Nationality" value={d.nationality} onChange={v => set('nationality', v)} placeholder="Australian" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Weight (kg)" type="number" value={d.weightKg} onChange={v => set('weightKg', v)} placeholder="85" />
          <F label="Height (cm)" type="number" value={d.heightCm} onChange={v => set('heightCm', v)} placeholder="178" />
        </div>

        <Div label="Address" />
        <F label="Home address" value={d.homeAddress} onChange={v => set('homeAddress', v)} placeholder="123 Example Street" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="col-span-2">
            <F label="Suburb" value={d.suburb} onChange={v => set('suburb', v)} placeholder="Brisbane City" />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>State</label>
            <select value={d.state} onChange={e => set('state', e.target.value)}
              className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150 appearance-none"
              style={{ ...inputBase, color: d.state ? '#f0f4f8' : '#4a5a6a' }}
              onFocus={inputFocus} onBlur={inputBlur}>
              <option value="" disabled style={{ background: '#0d1117' }}>State</option>
              {AU_STATES.map(s => <option key={s} value={s} style={{ background: '#0d1117', color: '#f0f4f8' }}>{s}</option>)}
            </select>
          </div>
          <F label="Postcode" value={d.postcode} onChange={v => set('postcode', v)} placeholder="4000" />
        </div>

        <Div label="Contact" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <F label="Mobile" type="tel" value={d.mobile} onChange={v => set('mobile', v)} placeholder="04XX XXX XXX" req />
          <F label="Home phone" type="tel" value={d.homePh} onChange={v => set('homePh', v)} placeholder="07 XXXX XXXX" />
          <F label="Work phone" type="tel" value={d.workPh} onChange={v => set('workPh', v)} placeholder="Optional" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Email" type="email" value={d.email} onChange={v => set('email', v)} placeholder="you@email.com" req />
          <F label="Second email (optional)" type="email" value={d.email2} onChange={v => set('email2', v)} placeholder="Optional" />
        </div>
        <F label="Occupation" value={d.occupation} onChange={v => set('occupation', v)} placeholder="Your job or industry" />

        <Div label="Medical Admin" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="GP name" value={d.gpName} onChange={v => set('gpName', v)} placeholder="Dr. Surname" />
          <F label="GP contact number" type="tel" value={d.gpContact} onChange={v => set('gpContact', v)} placeholder="Phone number" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <F label="Blood group (if known)" value={d.bloodGroup} onChange={v => set('bloodGroup', v)} placeholder="e.g. A+" />
          <F label="Blood pressure (systolic)" type="number" value={d.bpSystolic} onChange={v => set('bpSystolic', v)} placeholder="e.g. 120" hint="Top number only" />
          <F label="Heart rate (bpm)" type="number" value={d.heartRate} onChange={v => set('heartRate', v)} placeholder="72" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <F label="Medicare number" value={d.medicareNum} onChange={v => set('medicareNum', v)} placeholder="XXXX XXXXX X" />
          <F label="Medicare expiry" value={d.medicareExp} onChange={v => set('medicareExp', v)} placeholder="MM/YYYY" />
          <F label="Reference number" value={d.medicareRef} onChange={v => set('medicareRef', v)} placeholder="1" />
        </div>
        <Cards label="Aboriginal or Torres Strait Islander?" opts={['Yes', 'No', 'Prefer not to say']} value={d.atsi} onChange={v => set('atsi', v)} />
        <TA label="Hobbies and sport" value={d.hobbies} onChange={v => set('hobbies', v)} placeholder="What do you do for fun or fitness?" rows={2} />
      </div>
    </motion.div>
  )
}

// ─── Step 2: Medical History ──────────────────────────────────────────────────

function S2({ d, set }: { d: D; set: (k: keyof D, v: string) => void }) {
  return (
    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={2} title="Your medical history." sub="Include anything relevant, even if it seems minor. Your doctor reviews all of this before your consultation." />
      <div className="flex flex-col gap-5">
        <TA label="Past surgeries" value={d.pastSurgeries} onChange={v => set('pastSurgeries', v)}
          placeholder="List all surgeries with approximate year (e.g. Appendectomy 2015). Write 'None' if not applicable."
          rows={4} hint="Mark any work-related injuries with an asterisk (*) and note if a workers compensation claim is involved." />
        <TA label="Past medical history" value={d.pastMedicalHistory} onChange={v => set('pastMedicalHistory', v)}
          placeholder="All medical problems with the year they began (e.g. Hypertension 2018). Write 'None' if not applicable." rows={4} />
        <TA label="All medications, nutrients & supplements" value={d.medications} onChange={v => set('medications', v)}
          placeholder="List all prescription medications, vitamins, minerals, herbal remedies — including dose and how often you take them. Write 'None' if not applicable."
          rows={4} hint="Include everything. Supplements and over-the-counter items count." />
        <TA label="Known allergies" value={d.allergies} onChange={v => set('allergies', v)}
          placeholder="Medications, vitamins, minerals, herbs, food, latex, etc. Write 'None' if not applicable." rows={3} />
        <TA label="Family medical history" value={d.familyHistory} onChange={v => set('familyHistory', v)}
          placeholder="Heart disease, cancer, diabetes, mental illness, auto-immune conditions, osteoarthritis, asthma, or any other relevant family conditions…"
          rows={3} hint="Note the condition and which family member — e.g. Father: type 2 diabetes." />

        <Div label="Lifestyle Factors" />
        <Cards label="Do you currently smoke?" opts={['Yes', 'No']} value={d.smokingStatus} onChange={v => set('smokingStatus', v)} />
        {d.smokingStatus === 'Yes' && (
          <F label="Cigarettes per day" type="number" value={d.smokingPerDay} onChange={v => set('smokingPerDay', v)} placeholder="Number per day" />
        )}
        <Cards label="Have you smoked in the past?" opts={['Yes', 'No']} value={d.pastSmoker} onChange={v => set('pastSmoker', v)} />
        {d.pastSmoker === 'Yes' && (
          <F label="Year you quit" type="number" value={d.quitYear} onChange={v => set('quitYear', v)} placeholder="e.g. 2018" />
        )}
        <F label="Alcohol per week (standard drinks)" value={d.alcoholPerWeek} onChange={v => set('alcoholPerWeek', v)} placeholder="e.g. 5–6 standard drinks" />

        <Div label="Weight Changes (Past 12 Months)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Weight lost (kg)" type="number" value={d.weightLoss} onChange={v => set('weightLoss', v)} placeholder="0" hint="Leave blank if not applicable" />
          <F label="Weight gained (kg)" type="number" value={d.weightGain} onChange={v => set('weightGain', v)} placeholder="0" hint="Leave blank if not applicable" />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Step 3: Lifestyle & Health ───────────────────────────────────────────────

function S3({ d, set }: { d: D; set: (k: keyof D, v: string) => void }) {
  const meals: { key: keyof D; label: string }[] = [
    { key: 'mealBreakfast', label: 'Breakfast' },
    { key: 'mealMorningTea', label: 'Morning snack' },
    { key: 'mealLunch', label: 'Lunch' },
    { key: 'mealAfternoonTea', label: 'Afternoon snack' },
    { key: 'mealDinner', label: 'Dinner' },
    { key: 'mealBeforeBed', label: 'Before bed' },
  ]
  return (
    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={3} title="Your lifestyle & physical health." sub="This helps us understand your daily health baseline — energy, movement, and nutrition." />
      <div className="flex flex-col gap-5">
        <Score label="Current health score" value={d.healthScore} onChange={v => set('healthScore', v)} hint="0 = very poor, 10 = excellent" />
        <Score label="Current energy level" value={d.energyScore} onChange={v => set('energyScore', v)} hint="0 = exhausted, 10 = highly energetic" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Energy lowest time of day" value={d.energyLowest} onChange={v => set('energyLowest', v)} placeholder="e.g. 3pm" />
          <F label="Energy highest time of day" value={d.energyHighest} onChange={v => set('energyHighest', v)} placeholder="e.g. 10am" />
        </div>
        <Cards label="How often do you exercise?"
          opts={['Never', 'Once or twice a week', 'Every other day', 'Daily']}
          value={d.exerciseFrequency} onChange={v => set('exerciseFrequency', v)} />
        <TA label="Typical exercise routine" value={d.exerciseRoutine} onChange={v => set('exerciseRoutine', v)}
          placeholder="Gym, running, sport, swimming — describe what you typically do. Write 'None' if you don't exercise currently." rows={2} />

        <Div label="Meal Pattern" />
        <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
          Describe what you typically eat and when. Your doctor uses this to assess your nutritional context.
        </p>
        <div className="flex flex-col gap-3">
          {meals.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
              <span className="text-xs font-semibold" style={{ color: '#4a5a6a' }}>{label}</span>
              <div className="sm:col-span-3">
                <input type="text" value={d[key] as string} onChange={e => set(key, e.target.value)}
                  placeholder="Food, amount, approximate time"
                  className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
                  style={inputBase} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>
          ))}
        </div>
        <TA label="Overall diet summary" value={d.typicalDiet} onChange={v => set('typicalDiet', v)}
          placeholder="Briefly describe your eating pattern — high carb, low carb, keto, Mediterranean, etc." rows={2} />
      </div>
    </motion.div>
  )
}

// ─── Step 4: Mental Health & Conditions ──────────────────────────────────────

function S4({ d, set, toggleCond }: { d: D; set: (k: keyof D, v: string) => void; toggleCond: (c: string) => void }) {
  return (
    <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={4} title="Mental health & conditions." sub="Select anything that applies — past or present. Your doctor reviews this in confidence." />
      <div className="flex flex-col gap-5">
        <Score label="Current stress level" value={d.stressScore} onChange={v => set('stressScore', v)} hint="0 = extremely stressed, 10 = completely calm" />
        <TA label="Three most significant stressful events in your life" value={d.stressEvents} onChange={v => set('stressEvents', v)}
          placeholder="List up to three. Indicate if any are ongoing and continuing to impact your daily life."
          rows={4} hint="This helps your doctor understand your broader mental health context." />

        <Div label="General Health Conditions" />
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>
            Have you experienced any of the following? Select all that apply.
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CONDITIONS.map(c => (
              <button key={c} type="button" onClick={() => toggleCond(c)}
                className="flex items-center gap-3 px-4 py-3 rounded-sm text-xs font-medium text-left transition-all duration-150"
                style={{
                  background: d.conditions.includes(c) ? 'rgba(72,144,247,0.08)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${d.conditions.includes(c) ? 'rgba(72,144,247,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  color: d.conditions.includes(c) ? '#4890f7' : '#8899aa',
                }}>
                <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center transition-all duration-150"
                  style={{
                    background: d.conditions.includes(c) ? 'rgba(72,144,247,0.2)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${d.conditions.includes(c) ? 'rgba(72,144,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  }}>
                  {d.conditions.includes(c) && (
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                      <path d="M2 5l2 2 4-4" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {c}
              </button>
            ))}
          </div>
        </div>
        <TA label="Other relevant conditions (if not listed above)" value={d.otherConditions} onChange={v => set('otherConditions', v)}
          placeholder="Any other medical conditions not covered above…" rows={2} />
      </div>
    </motion.div>
  )
}

// ─── Step 5: Main Issue & Goals ───────────────────────────────────────────────

function S5({ d, set }: { d: D; set: (k: keyof D, v: string) => void }) {
  return (
    <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={5} title="Your main concern & goals." sub="Tell us why you're here. The more detail you provide, the more prepared your doctor will be." />
      <div className="flex flex-col gap-5">
        <TA label="Main condition / reason for this consultation" value={d.mainCondition} onChange={v => set('mainCondition', v)}
          placeholder="Describe your main concern, symptoms, and problems as clearly as you can. Include as much detail as possible."
          rows={5} hint="Your doctor reads this before your consultation — more detail means a better prepared doctor." />
        <TA label="Your major goal from this consultation" value={d.majorGoal} onChange={v => set('majorGoal', v)}
          placeholder="What outcome do you want from this consultation? What do you want help with?" rows={3} />
        <TA label="When did you first notice this?" value={d.firstNoticed} onChange={v => set('firstNoticed', v)}
          placeholder="Describe when you first noticed the condition and how it has progressed." rows={2} />
        <TA label="Suspected contributing factors" value={d.contributingFactors} onChange={v => set('contributingFactors', v)}
          placeholder="Anything you think may have contributed — lifestyle changes, stress, previous treatments, injuries, medications…" rows={2} />
        <Cards label="Do you have blood test results from the past 3 months?"
          opts={['Yes', 'No', 'Not sure']} value={d.recentBloods} onChange={v => set('recentBloods', v)} />
        <div className="p-4 rounded-xl" style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.12)' }}>
          <p className="text-xs font-semibold mb-1.5" style={{ color: '#4890f7' }}>Forward previous test results</p>
          <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
            If you have previous blood test reports, hair tests, salivary tests, DEXA scans, or other relevant results, please forward them to{' '}
            <strong style={{ color: '#6b7a8d' }}>care@apexmetabolichealth.com.au</strong>{' '}
            with your full name in the subject line. Your doctor will review them before your consultation.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Step 6: Declaration ─────────────────────────────────────────────────────

function S6({ d, set }: { d: D; set: (k: keyof D, v: string | boolean) => void }) {
  const today = new Date().toLocaleDateString('en-AU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return (
    <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Head step={6} title="A few final confirmations." sub="Please read each statement carefully before submitting your intake." />
      <div className="flex flex-col gap-5">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold tracking-[0.12em] uppercase mb-3" style={{ color: '#3a4a5a' }}>Submission Summary</p>
          {[
            ['Name', `${d.firstName} ${d.lastName}`],
            ['Email', d.email],
            ['Mobile', d.mobile],
            ['Date of birth', d.dob],
            ['State', d.state],
          ].filter(([, v]) => v?.trim()).map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ color: '#3a4a5a' }}>{k}</span>
              <span style={{ color: '#6b7a8d' }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <Chk checked={d.ageConfirm} toggle={() => set('ageConfirm', !d.ageConfirm)}
            label="I confirm I am 18 years of age or older." />
          <Chk checked={d.consent} toggle={() => set('consent', !d.consent)}
            label="I authorise Apex Metabolic Health and its AHPRA-registered medical team to review my information and perform examinations and/or treatment deemed clinically necessary. I understand this is not a substitute for emergency medical care." />
          <Chk checked={d.sportingCode} toggle={() => set('sportingCode', !d.sportingCode)}
            label="I declare that I am NOT under any sporting or professional code where the treatments or medicines offered may be prohibited." />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <F label="Print full name" value={d.printName} onChange={v => set('printName', v as string)} placeholder="Your full name" req />
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>Date</label>
            <div className="w-full px-4 py-3 rounded-sm text-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#4a5a6a' }}>
              {today}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Success ─────────────────────────────────────────────────────────────────

function Success({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
        className="mb-10" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(72,144,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(72,144,247,0.06)' }}>
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease }} className="label mb-5">Intake Received</motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease }}
        className="font-bold tracking-tight mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1, color: '#f0f4f8', letterSpacing: '-0.02em' }}>
        {name ? `Thank you, ${name}.` : 'Thank you.'}<br />
        <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          We take it from here.
        </span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58, ease }}
        className="text-base leading-relaxed mb-10" style={{ color: '#8899aa', maxWidth: 440 }}>
        Your General Consult intake has been received. Our clinical team will review your details and be in touch within one business day to confirm your appointment.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.7, delay: 0.72, ease }}
        style={{ width: '100%', height: 1, transformOrigin: 'left', background: 'linear-gradient(90deg, rgba(72,144,247,0.15), rgba(255,255,255,0.04) 60%, transparent)', marginBottom: 32 }} />
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.82, ease }} className="flex flex-col gap-4 mb-12">
        {[
          { step: 'Intake review', detail: 'Our clinical team reviews your submission and prepares a case summary for your assigned doctor.' },
          { step: 'Appointment confirmation', detail: 'You\'ll receive direct contact from us confirming your telehealth appointment time and any pre-consultation requirements.' },
          { step: 'Medical consultation', detail: 'Your doctor conducts a thorough telehealth consultation, reviews your history, and discusses next clinical steps.' },
          { step: 'Your care protocol', detail: 'Treatment is coordinated through our TGA-compliant compounding pharmacy partner. Ongoing reviews are scheduled from day one.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div style={{ minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#3a4a5a', fontFamily: 'var(--font-space-grotesk)' }}>{i + 1}</div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#c8d4e0' }}>{item.step}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5a6a' }}>{item.detail}</p>
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
  const [step, setStep] = useState(0)
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
  const toggleCond = (c: string) => setData(p => ({ ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c] }))
  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  const next = () => { setStep(s => s + 1); scrollTop() }
  const back = () => { setStep(s => s - 1); scrollTop() }

  const step1Valid = !!(data.firstName.trim() && data.lastName.trim() && data.mobile.trim() && data.email.trim() && data.dob)
  const step6Valid = !!(data.consent && data.ageConfirm && data.sportingCode && data.printName.trim())
  const canNext = step === 1 ? step1Valid : step === 6 ? step6Valid : true

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `General Consult Intake — ${data.firstName} ${data.lastName}`,
          from_name: 'Apex Metabolic Health',
          formType: 'General Consult Intake',
          name: `${data.firstName} ${data.lastName}`, email: data.email, mobile: data.mobile,
          dob: data.dob, gender: data.gender, nationality: data.nationality,
          weight_kg: data.weightKg, height_cm: data.heightCm,
          home_address: `${data.homeAddress}, ${data.suburb} ${data.state} ${data.postcode}`,
          occupation: data.occupation, gp_name: data.gpName, gp_contact: data.gpContact,
          blood_group: data.bloodGroup, blood_pressure: `${data.bpSystolic} systolic`, heart_rate: data.heartRate,
          medicare: data.medicareNum, atsi: data.atsi, hobbies: data.hobbies,
          past_surgeries: data.pastSurgeries, past_medical_history: data.pastMedicalHistory,
          medications: data.medications, allergies: data.allergies, family_history: data.familyHistory,
          smoking: data.smokingStatus === 'Yes' ? `Yes — ${data.smokingPerDay}/day` : data.smokingStatus,
          alcohol_per_week: data.alcoholPerWeek,
          weight_change: `Loss: ${data.weightLoss || '0'}kg  Gain: ${data.weightGain || '0'}kg`,
          health_score: data.healthScore, energy_score: data.energyScore,
          exercise_frequency: data.exerciseFrequency, exercise_routine: data.exerciseRoutine,
          meal_pattern: `Breakfast: ${data.mealBreakfast} | Lunch: ${data.mealLunch} | Dinner: ${data.mealDinner}`,
          typical_diet: data.typicalDiet,
          stress_score: data.stressScore, stress_events: data.stressEvents,
          conditions: data.conditions.join(', ') || 'None selected', other_conditions: data.otherConditions,
          main_condition: data.mainCondition, major_goal: data.majorGoal,
          first_noticed: data.firstNoticed, contributing_factors: data.contributingFactors,
          recent_bloods: data.recentBloods, print_name: data.printName,
        }),
      })
      const json = await res.json()
      if (json.success) { setSubmitted(true); localStorage.removeItem(STORAGE_KEY); scrollTop() }
      else setError('Something went wrong. Please try again.')
    } catch { setError('Network error. Please try again.') }
    finally { setSubmitting(false) }
  }

  const progress = step === 0 ? 0 : Math.round((step / TOTAL) * 100)

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden" style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />

          <div ref={topRef} className="container-tight relative z-10" style={{ maxWidth: 680 }}>

            {step > 0 && !submitted && (
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: '#4890f7' }}>General Consult Intake</span>
                  <span className="text-xs" style={{ color: '#3a4a5a' }}>{progress}%</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #6ba8ff)' }}
                    initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease }} />
                </div>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {STEP_LABELS.map((s, i) => (
                    <span key={s} className="text-[10px] tracking-wide" style={{ color: i + 1 <= step ? '#4890f7' : '#2a3a4a' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {submitted ? (
              <Success name={data.firstName} />
            ) : step === 0 ? (
              <Welcome onStart={() => { setStep(1); scrollTop() }} />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {step === 1 && <S1 d={data} set={(k, v) => set(k, v as string)} />}
                  {step === 2 && <S2 d={data} set={(k, v) => set(k, v as string)} />}
                  {step === 3 && <S3 d={data} set={(k, v) => set(k, v as string)} />}
                  {step === 4 && <S4 d={data} set={(k, v) => set(k, v as string)} toggleCond={toggleCond} />}
                  {step === 5 && <S5 d={data} set={(k, v) => set(k, v as string)} />}
                  {step === 6 && <S6 d={data} set={set} />}
                </AnimatePresence>

                <div className="flex items-center gap-4 mt-10">
                  <button type="button" onClick={back}
                    className="px-5 py-3 rounded-sm text-sm font-semibold transition-all duration-150"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7a8d' }}>
                    ← Back
                  </button>
                  {step < TOTAL ? (
                    <button type="button" onClick={next} disabled={!canNext}
                      className="btn-teal"
                      style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                      Continue →
                    </button>
                  ) : (
                    <button type="button" onClick={submit} disabled={submitting || !step6Valid}
                      className="btn-teal"
                      style={{ opacity: submitting || !step6Valid ? 0.5 : 1, cursor: submitting || !step6Valid ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Submitting…' : 'Submit intake →'}
                    </button>
                  )}
                </div>
                {error && <p className="text-sm mt-4" style={{ color: '#e05c5c' }}>{error}</p>}
                <p className="text-xs mt-5" style={{ color: '#3a4a5a' }}>
                  Progress is saved automatically. Your information is private and confidential.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
