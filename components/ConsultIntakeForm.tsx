'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AppFeature from '@/components/AppFeature'

const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const STEPS = ['Personal Details', 'Medical History', 'Lifestyle & Diet', 'Health Conditions', 'Your Concern', 'Confirm & Submit']

const CARDIOVASCULAR_CONDITIONS = [
  'High Blood Pressure', 'High Cholesterol', 'Chest Pain',
  'Frequent Headaches', 'Shortness of Breath', 'Previous Heart Condition',
  'Heart Attack', 'Stroke', 'Palpitations / Irregular Heartbeat',
  'None of the above',
]

const CHRONIC_CONDITIONS = [
  'Heart Failure', 'Renal Failure', 'Liver Failure / Abnormal LFTs',
  'Cancer', 'Prostate Cancer', 'BPH (Benign Prostatic Hyperplasia)',
  'Hyperthyroidism', 'Hypothyroidism', 'Diabetes', 'Hypoglycaemia',
  'Immune Disorders', 'Autoimmune Disorders', 'Endocrine Issues',
  'Mental Health Conditions', 'Anxiety / Agitation', 'Depression',
  'Substance Abuse Disorders', 'Eating Disorders',
  'DVT / Blood Clots', 'Anaemia / Iron Deficiency', 'Seizures',
  'Kidney Stones / Infections', 'Chronic Fatigue / Fibromyalgia',
  'Sleep Apnoea', 'Thyroid Condition', 'Hair Loss',
  'Erectile Dysfunction', 'Low Libido', 'Prostate Issues',
  'Muscle / Joint Pain', 'Other', 'None of the above',
]

const HEALTH_CONCERNS = [
  'Hormone Health / TRT', 'Hormone Replacement',
  'Erectile Dysfunction', 'Low / Poor Libido',
  'Hair Loss', 'Weight Gain', 'Weight Loss',
  'Sleep / Insomnia', 'Snoring / Sleep Apnoea',
  'Fatigue / Low Energy', 'Men\'s Health',
  'Prostate Health', 'Heart Health',
  'Performance & Recovery', 'Skin Health',
  'Injury Repair', 'General Health Review',
  'Other',
]

const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−', 'Unknown']

export interface ConsultConfig {
  storageKey: string
  programName: string
  formTitle: string
  concern: string
  goals?: string[]
  bloodsHref: string
}

interface FormData {
  // Step 1 — Personal Details
  firstName: string; lastName: string; gender: string
  dob: string; weight: string; height: string; nationality: string
  address: string; suburb: string; state: string; postcode: string
  homePhone: string; phone: string; workPhone: string
  email: string; email2: string; occupation: string
  gpName: string; gpPhone: string
  bloodGroup: string; bloodPressure: string; heartRate: string
  medicareNumber: string; medicareExpiry: string; medicareRef: string
  indigenousStatus: string; hobbies: string
  // Step 2 — Medical History
  pastSurgery: string; medicalHistory: string; medications: string
  allergies: string; familyHistory: string
  // Step 3 — Lifestyle & Diet
  smokingStatus: string; smokingAmount: string
  recreationalDrugs: string
  alcohol: string; weightChange: string; weightChangeKg: string
  healthScore: string; energyScore: string; energyLow: string; energyHigh: string
  exerciseFreq: string; exerciseType: string
  stressScore: string; stressEvents: string
  currentDiet: string; currentLifestyle: string
  dietBreakfast: string; dietMorningTea: string; dietLunch: string
  dietAfternoonTea: string; dietDinner: string; dietBeforeBed: string
  // Step 4 — Health Conditions
  cardiovascularConditions: string[]
  conditions: string[]
  // Step 5 — Your Concern
  healthConcerns: string[]
  pathway: string
  mainConcern: string; recentBloods: string
  healthGoals: string
  myHealthRecord: string
  pharmacyPreference: string
  // Step 6 — Confirm
  privacyConsent: boolean; overseasConsent: boolean
  ageConfirm: boolean; notUnderCode: boolean; consent: boolean
  multiClinicDeclaration: boolean
  medicationWaiver: boolean
  agentAgreement: boolean
  regularGPAgreement: boolean
}

const makeInitial = (): FormData => ({
  firstName: '', lastName: '', gender: '',
  dob: '', weight: '', height: '', nationality: '',
  address: '', suburb: '', state: '', postcode: '',
  homePhone: '', phone: '', workPhone: '',
  email: '', email2: '', occupation: '',
  gpName: '', gpPhone: '',
  bloodGroup: '', bloodPressure: '', heartRate: '',
  medicareNumber: '', medicareExpiry: '', medicareRef: '',
  indigenousStatus: '', hobbies: '',
  pastSurgery: '', medicalHistory: '', medications: '',
  allergies: '', familyHistory: '',
  smokingStatus: '', smokingAmount: '',
  recreationalDrugs: '',
  alcohol: '', weightChange: '', weightChangeKg: '',
  healthScore: '', energyScore: '', energyLow: '', energyHigh: '',
  exerciseFreq: '', exerciseType: '',
  stressScore: '', stressEvents: '',
  currentDiet: '', currentLifestyle: '',
  dietBreakfast: '', dietMorningTea: '', dietLunch: '',
  dietAfternoonTea: '', dietDinner: '', dietBeforeBed: '',
  cardiovascularConditions: [],
  conditions: [],
  healthConcerns: [],
  pathway: '',
  mainConcern: '', recentBloods: '',
  healthGoals: '',
  myHealthRecord: '',
  pharmacyPreference: '',
  privacyConsent: false, overseasConsent: false,
  ageConfirm: false, notUnderCode: false, consent: false,
  multiClinicDeclaration: false,
  medicationWaiver: false,
  agentAgreement: false,
  regularGPAgreement: false,
})

// ─── Privacy collection notice (APP 5, Privacy Act 1988 Cth) ─────────────────
function PrivacyNotice() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-8 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}>
        <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: '#4a5a6a' }}>
          Privacy &amp; Collection Notice
        </span>
        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0 transition-transform duration-200" style={{ color: '#3a4a5a', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Who collects your information:</strong>{' '}
            Apex Metabolic Health, operated by Imperial Equity Investments Pty Ltd, collects your personal and sensitive health information for the purpose of providing telehealth medical services and clinical consultation.
          </p>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Why we collect it:</strong>{' '}
            To assess your suitability for a telehealth consultation, to prepare your treating AHPRA-registered practitioner, and to coordinate your clinical care. You are not required to provide all optional information, but incomplete responses may limit what our practitioners can offer.
          </p>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Who we may disclose it to:</strong>{' '}
            Your treating practitioner; our TGA-compliant compounding pharmacy partner (where treatment is prescribed); third-party form processing services operating in the United States (Web3Forms); and, where required by law, regulatory bodies including AHPRA, Medicare Australia, or Queensland Health.
          </p>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Overseas disclosure:</strong>{' '}
            Your submission is processed by Web3Forms Inc., which operates servers outside Australia (United States). Once transferred, your information may not be protected by Australian privacy law. You will be asked to consent to this transfer before submitting.
          </p>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Medicare &amp; QScript:</strong>{' '}
            Your Medicare details are collected solely for the purposes of assessing Medicare eligibility, facilitating billing, and enabling your practitioner to check Queensland&rsquo;s real-time prescription monitoring system (QScript) before prescribing any scheduled medicines, in accordance with the Health Insurance Act 1973 (Cth) and Queensland Health legislation. If you are not eligible for Medicare, enter &ldquo;N/A&rdquo; and we will contact you to discuss private billing.
          </p>
          <p>
            <strong style={{ color: '#6b7a8d' }}>Your rights:</strong>{' '}
            You may request access to, or correction of, your personal information at any time. Complaints may be directed to the Office of the Australian Information Commissioner at{' '}
            <span style={{ color: '#8899aa' }}>oaic.gov.au</span>. Health service complaints in Queensland may be directed to the Office of the Health Ombudsman at{' '}
            <span style={{ color: '#8899aa' }}>oho.org.au</span>, or to AHPRA at{' '}
            <span style={{ color: '#8899aa' }}>ahpra.gov.au</span>.
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Field components ─────────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>
        {label}{required && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: '#4890f7' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(72,144,247,0.5)'; e.target.style.background = 'rgba(72,144,247,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

function SelectField({ label, value, onChange, options, placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void
  options: string[]; placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>
        {label}{required && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150 appearance-none"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: value ? '#f0f4f8' : '#4a5a6a' }}>
        <option value="" disabled style={{ background: '#0d1117', color: '#4a5a6a' }}>{placeholder || 'Select…'}</option>
        {options.map(o => <option key={o} value={o} style={{ background: '#0d1117', color: '#f0f4f8' }}>{o}</option>)}
      </select>
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder, rows = 3, required }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; rows?: number; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#4a5a6a' }}>
        {label}{required && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none transition-all duration-150"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: '#f0f4f8', caretColor: '#4890f7' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(72,144,247,0.5)'; e.target.style.background = 'rgba(72,144,247,0.04)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.background = 'rgba(255,255,255,0.04)' }} />
    </div>
  )
}

function RadioGroup({ label, options, value, onChange, required }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>
        {label}{required && <span style={{ color: '#4890f7' }}> *</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className="px-4 py-2 rounded-sm text-xs font-semibold transition-all duration-150"
            style={{
              background: value === opt ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === opt ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
              color: value === opt ? '#4890f7' : '#8899aa',
            }}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

function ScaleRow({ label, value, onChange }: {
  label: string; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 11 }, (_, i) => String(i)).map(n => (
          <button key={n} type="button" onClick={() => onChange(n)}
            className="w-9 h-9 rounded-sm text-xs font-semibold transition-all duration-150"
            style={{
              background: value === n ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${value === n ? 'rgba(72,144,247,0.45)' : 'rgba(255,255,255,0.07)'}`,
              color: value === n ? '#4890f7' : '#8899aa',
            }}>{n}</button>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px]" style={{ color: '#3a4a5a' }}>Low</span>
        <span className="text-[10px]" style={{ color: '#3a4a5a' }}>High</span>
      </div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.18em] uppercase pt-2 pb-1" style={{ color: '#3a4a5a', borderBottom: '1px solid rgba(255,255,255,0.04)', marginBottom: 12 }}>
      {children}
    </p>
  )
}

function CheckGrid({ label, items, selected, onToggle, columns = 2 }: {
  label: string; items: string[]; selected: string[]; onToggle: (v: string) => void; columns?: number
}) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: '#4a5a6a' }}>{label}</label>
      <div className={`grid gap-2 grid-cols-1 sm:grid-cols-${columns}`}>
        {items.map(item => (
          <button key={item} type="button" onClick={() => onToggle(item)}
            className="px-3 py-2.5 rounded-sm text-xs font-medium transition-all duration-150 text-left"
            style={{
              background: selected.includes(item) ? 'rgba(72,144,247,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${selected.includes(item) ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
              color: selected.includes(item) ? '#4890f7' : '#8899aa',
            }}>{item}</button>
        ))}
      </div>
    </div>
  )
}

// ─── Pathway Selector ─────────────────────────────────────────────────────────
function PathwaySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    {
      id: 'member',
      label: 'Apex Clinical Program',
      badge: 'Recommended',
      description: 'Complete care pathway from consultation through to ongoing treatment.',
      features: [
        'No clinic or admin fees after enrolment',
        'Medications at cost price through our partner pharmacy — zero mark-up',
        'Ongoing nursing team support and review cycles every 6–8 weeks',
        'Dedicated clinical coordination and VIP admin support',
        'Treatment protocols delivered post-consult and updated each review',
      ],
      note: 'Best suited for hormone, metabolic, peptide, or hair programs requiring ongoing management.',
    },
    {
      id: 'casual',
      label: 'Single Consultation',
      description: 'One-time telehealth assessment. Script issued if clinically appropriate.',
      features: [
        'Full medical consultation and assessment',
        'Treatment plan and dosing guidance if treatment is prescribed',
        'Choice of partner pharmacy or your own pharmacy',
        'Ongoing nursing and admin support available separately',
      ],
      note: 'Suitable for assessments, second opinions, or short-term clinical needs. NSW patients — script release is subject to state regulations.',
    },
  ]

  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: '#4a5a6a' }}>
        Choose your care pathway <span style={{ color: '#4890f7' }}>*</span>
      </label>
      <div className="flex flex-col gap-3">
        {options.map(opt => (
          <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
            className="w-full text-left p-5 rounded-sm transition-all duration-200"
            style={{
              background: value === opt.id ? 'rgba(72,144,247,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${value === opt.id ? 'rgba(72,144,247,0.4)' : 'rgba(255,255,255,0.07)'}`,
            }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ border: `1px solid ${value === opt.id ? '#4890f7' : 'rgba(255,255,255,0.2)'}`, background: value === opt.id ? 'rgba(72,144,247,0.15)' : 'transparent' }}>
                {value === opt.id && <div className="w-2 h-2 rounded-full" style={{ background: '#4890f7' }} />}
              </div>
              <span className="text-sm font-bold" style={{ color: '#f0f4f8', fontFamily: 'var(--font-space-grotesk)' }}>{opt.label}</span>
              {opt.badge && (
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm"
                  style={{ background: 'rgba(72,144,247,0.12)', border: '1px solid rgba(72,144,247,0.3)', color: '#4890f7' }}>
                  {opt.badge}
                </span>
              )}
            </div>
            <p className="text-xs mb-3 ml-7" style={{ color: '#6b7a8d' }}>{opt.description}</p>
            <ul className="flex flex-col gap-1 ml-7 mb-3">
              {opt.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs" style={{ color: '#8899aa' }}>
                  <span style={{ color: '#4890f7', flexShrink: 0, marginTop: 1 }}>—</span>{f}
                </li>
              ))}
            </ul>
            <p className="text-[11px] ml-7" style={{ color: '#3a4a5a' }}>{opt.note}</p>
          </button>
        ))}
      </div>
      <p className="text-xs mt-3" style={{ color: '#3a4a5a' }}>
        Our team will contact you with consultation fee details based on your selected pathway and program.
      </p>
    </div>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────
function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 1 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Personal details</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Fields marked <span style={{ color: '#4890f7' }}>*</span> are required for regulatory compliance.</p>

      <div className="flex flex-col gap-5">
        <SectionHeading>Name &amp; Identity</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="James" required />
          <Field label="Last name" value={data.lastName} onChange={v => set('lastName', v)} placeholder="Smith" required />
        </div>
        <RadioGroup label="Biological gender" options={['Male', 'Female']} value={data.gender} onChange={v => set('gender', v)} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Date of birth" type="date" value={data.dob} onChange={v => set('dob', v)} required />
          <Field label="Weight (kg)" value={data.weight} onChange={v => set('weight', v)} placeholder="85" />
          <Field label="Height (cm)" value={data.height} onChange={v => set('height', v)} placeholder="180" />
        </div>
        <Field label="Nationality" value={data.nationality} onChange={v => set('nationality', v)} placeholder="Australian" />
        <RadioGroup label="Aboriginal or Torres Strait Islander?" options={['Yes', 'No', 'Prefer not to say']} value={data.indigenousStatus} onChange={v => set('indigenousStatus', v)} />

        <SectionHeading>Contact &amp; Address</SectionHeading>
        <Field label="Home address" value={data.address} onChange={v => set('address', v)} placeholder="123 Example Street" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Suburb" value={data.suburb} onChange={v => set('suburb', v)} placeholder="Brisbane" />
          <SelectField label="State" value={data.state} onChange={v => set('state', v)} options={AU_STATES} placeholder="Select state" required />
          <Field label="Postcode" value={data.postcode} onChange={v => set('postcode', v)} placeholder="4000" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Mobile" type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" required />
          <Field label="Home phone" type="tel" value={data.homePhone} onChange={v => set('homePhone', v)} placeholder="07XX XXX XXX" />
          <Field label="Work phone" type="tel" value={data.workPhone} onChange={v => set('workPhone', v)} placeholder="07XX XXX XXX" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@email.com" required />
          <Field label="Secondary email" type="email" value={data.email2} onChange={v => set('email2', v)} placeholder="backup@email.com" />
        </div>
        <Field label="Occupation" value={data.occupation} onChange={v => set('occupation', v)} placeholder="e.g. Construction manager" />

        <SectionHeading>GP Details</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="GP name" value={data.gpName} onChange={v => set('gpName', v)} placeholder="Dr. Surname" />
          <Field label="GP phone / practice" value={data.gpPhone} onChange={v => set('gpPhone', v)} placeholder="07XX XXX XXX" />
        </div>

        <SectionHeading>Clinical Measurements</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectField label="Blood group" value={data.bloodGroup} onChange={v => set('bloodGroup', v)} options={BLOOD_GROUPS} placeholder="Unknown" />
          <Field label="Blood pressure" value={data.bloodPressure} onChange={v => set('bloodPressure', v)} placeholder="120/80 mmHg" />
          <Field label="Resting heart rate" value={data.heartRate} onChange={v => set('heartRate', v)} placeholder="70 bpm" />
        </div>

        <SectionHeading>Medicare</SectionHeading>
        <div className="p-3 rounded-sm mb-1" style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.12)' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
            Your Medicare details are required for identity verification and to enable your practitioner to check Queensland&rsquo;s real-time prescription monitoring system (QScript) before prescribing any scheduled medicines. If you are not eligible for Medicare, enter &ldquo;N/A&rdquo; in each field.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Medicare number" value={data.medicareNumber} onChange={v => set('medicareNumber', v)} placeholder="XXXX XXXXX X" required />
          <Field label="Expiry (MM/YY)" value={data.medicareExpiry} onChange={v => set('medicareExpiry', v)} placeholder="12/28" required />
          <Field label="Reference number (IRN)" value={data.medicareRef} onChange={v => set('medicareRef', v)} placeholder="1" required />
        </div>

        <SectionHeading>Identity Verification</SectionHeading>
        <div className="p-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
            <strong style={{ color: '#6b7a8d' }}>Photo ID required.</strong> Your practitioner will require a photo of your driver&rsquo;s licence or passport (showing name and date of birth only — licence number is not required and will not be retained) for identity verification before or during your consultation, in accordance with AHPRA telehealth standards.
          </p>
        </div>

        <SectionHeading>Interests</SectionHeading>
        <Field label="Hobbies and sport" value={data.hobbies} onChange={v => set('hobbies', v)} placeholder="e.g. Weights, trail running, golf" />
      </div>
    </motion.div>
  )
}

function Step2({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 2 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Medical history</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Your doctor reviews this before your consultation. All fields optional.</p>
      <div className="flex flex-col gap-5">
        <TextArea label="Past surgeries" value={data.pastSurgery} onChange={v => set('pastSurgery', v)}
          placeholder="List each surgery and approximate year (e.g. Appendectomy 2018, ACL repair 2021)" rows={3} />
        <TextArea label="Past medical history" value={data.medicalHistory} onChange={v => set('medicalHistory', v)}
          placeholder="List diagnosed conditions and approximate year (e.g. Type 2 Diabetes 2020, Hypertension 2019)" rows={3} />
        <TextArea label="Current medications, vitamins &amp; supplements" value={data.medications} onChange={v => set('medications', v)}
          placeholder="Include prescription scripts, vitamins, minerals, herbals. Note dosage and frequency where known. Write 'none' if not applicable." rows={4} />
        <TextArea label="Allergies" value={data.allergies} onChange={v => set('allergies', v)}
          placeholder="Medications, foods, environmental (e.g. Penicillin — anaphylaxis, Shellfish — hives). Write 'none' if not applicable." rows={2} />
        <TextArea label="Family history" value={data.familyHistory} onChange={v => set('familyHistory', v)}
          placeholder="Include: cardiac disease, high blood pressure, cancer, diabetes, osteoarthritis, RA, MS, mental illness, autoimmune conditions, asthma, psoriasis, eczema, alcoholism. Note relationship (e.g. Father — Type 2 Diabetes, early cardiac disease)." rows={4} />
      </div>
    </motion.div>
  )
}

function Step3({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 3 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Lifestyle &amp; diet</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Helps your doctor build a complete picture. All fields optional.</p>
      <div className="flex flex-col gap-6">

        <SectionHeading>Smoking &amp; Substances</SectionHeading>
        <RadioGroup label="Smoking status" options={['Non-smoker', 'Smoker', 'Casual Smoker', 'Vape User']} value={data.smokingStatus} onChange={v => set('smokingStatus', v)} />
        {(data.smokingStatus === 'Smoker' || data.smokingStatus === 'Casual Smoker') && (
          <Field label="Cigarettes / sessions per day" value={data.smokingAmount} onChange={v => set('smokingAmount', v)} placeholder="e.g. 10" />
        )}
        <RadioGroup label="Do you use recreational drugs?" options={['No', 'Yes']} value={data.recreationalDrugs} onChange={v => set('recreationalDrugs', v)} />
        <Field label="Alcohol — standard drinks per week" value={data.alcohol} onChange={v => set('alcohol', v)} placeholder="e.g. 8" />

        <SectionHeading>Weight</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RadioGroup label="Weight change in past 12 months?" options={['Loss', 'Gain', 'Stable']} value={data.weightChange} onChange={v => set('weightChange', v)} />
          {(data.weightChange === 'Loss' || data.weightChange === 'Gain') && (
            <Field label="Amount (kg)" value={data.weightChangeKg} onChange={v => set('weightChangeKg', v)} placeholder="e.g. 8" />
          )}
        </div>

        <SectionHeading>Health Scores</SectionHeading>
        <ScaleRow label="Current overall health (0 = poor, 10 = excellent)" value={data.healthScore} onChange={v => set('healthScore', v)} />
        <ScaleRow label="Energy level (0 = exhausted, 10 = excellent)" value={data.energyScore} onChange={v => set('energyScore', v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RadioGroup label="Energy lowest point of day" options={['Morning', 'Midday', 'Afternoon', 'Evening']} value={data.energyLow} onChange={v => set('energyLow', v)} />
          <RadioGroup label="Energy highest point of day" options={['Morning', 'Midday', 'Afternoon', 'Evening']} value={data.energyHigh} onChange={v => set('energyHigh', v)} />
        </div>
        <ScaleRow label="Stress level (0 = none, 10 = extreme)" value={data.stressScore} onChange={v => set('stressScore', v)} />
        <TextArea label="Three most significant stressors" value={data.stressEvents} onChange={v => set('stressEvents', v)}
          placeholder="e.g. Work demands, relationship breakdown, financial pressure" rows={2} />

        <SectionHeading>Exercise</SectionHeading>
        <RadioGroup label="Exercise frequency" options={['Never', 'Once or twice / week', 'Every other day', 'Daily']} value={data.exerciseFreq} onChange={v => set('exerciseFreq', v)} />
        <Field label="Exercise type" value={data.exerciseType} onChange={v => set('exerciseType', v)} placeholder="e.g. Resistance training, running, cycling" />

        <SectionHeading>Diet &amp; Lifestyle</SectionHeading>
        <TextArea label="Describe your current lifestyle" value={data.currentLifestyle} onChange={v => set('currentLifestyle', v)}
          placeholder="e.g. Sedentary office job, active on weekends, shift worker, high-stress environment" rows={2} />
        <TextArea label="Describe your current diet" value={data.currentDiet} onChange={v => set('currentDiet', v)}
          placeholder="e.g. High protein, low carb, intermittent fasting, no particular structure" rows={2} />
        <p className="text-xs" style={{ color: '#4a5a6a' }}>Typical daily meals — optional, approximate is fine.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Breakfast" value={data.dietBreakfast} onChange={v => set('dietBreakfast', v)} placeholder="e.g. Eggs, toast, coffee — 7am" />
          <Field label="Morning tea" value={data.dietMorningTea} onChange={v => set('dietMorningTea', v)} placeholder="e.g. Protein bar — 10am" />
          <Field label="Lunch" value={data.dietLunch} onChange={v => set('dietLunch', v)} placeholder="e.g. Chicken salad — 12:30pm" />
          <Field label="Afternoon tea" value={data.dietAfternoonTea} onChange={v => set('dietAfternoonTea', v)} placeholder="e.g. Greek yoghurt — 3pm" />
          <Field label="Dinner" value={data.dietDinner} onChange={v => set('dietDinner', v)} placeholder="e.g. Steak and vegetables — 7pm" />
          <Field label="Before bed" value={data.dietBeforeBed} onChange={v => set('dietBeforeBed', v)} placeholder="e.g. Casein protein shake — 9pm" />
        </div>
      </div>
    </motion.div>
  )
}

function Step4({ data, toggleCardio, toggleCondition }: {
  data: FormData; toggleCardio: (c: string) => void; toggleCondition: (c: string) => void
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 4 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Health conditions</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Select all that apply — past or present.</p>
      <div className="flex flex-col gap-6">
        <CheckGrid
          label="Cardiovascular &amp; Acute"
          items={CARDIOVASCULAR_CONDITIONS}
          selected={data.cardiovascularConditions}
          onToggle={toggleCardio}
        />
        <CheckGrid
          label="Chronic &amp; Other Conditions"
          items={CHRONIC_CONDITIONS}
          selected={data.conditions}
          onToggle={toggleCondition}
        />
      </div>
    </motion.div>
  )
}

function Step5({ data, set, toggleConcern, config }: {
  data: FormData; set: (k: keyof FormData, v: string) => void
  toggleConcern: (c: string) => void; config: ConsultConfig
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 5 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Your concern &amp; pathway</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Tell us what&rsquo;s brought you here, and choose how you&rsquo;d like to proceed.</p>
      <div className="flex flex-col gap-6">

        <CheckGrid
          label="What would you like help with? (select all that apply)"
          items={HEALTH_CONCERNS}
          selected={data.healthConcerns}
          onToggle={toggleConcern}
        />

        <TextArea label="Describe your main symptoms, concerns, and goals" value={data.mainConcern} onChange={v => set('mainConcern', v)}
          placeholder={config.concern} rows={5} />

        <div className="p-3 rounded-sm" style={{ background: 'rgba(255,165,0,0.04)', border: '1px solid rgba(255,165,0,0.15)' }}>
          <p className="text-xs leading-relaxed" style={{ color: '#7a6a4a' }}>
            <strong style={{ color: '#a08a5a' }}>Please note:</strong> Body enhancement or performance enhancement for cosmetic purposes is not a clinical goal and treatment cannot be prescribed for this purpose. Our practitioners assess and treat clinical symptoms and deficiencies only.
          </p>
        </div>

        <TextArea label="What are your health goals?" value={data.healthGoals} onChange={v => set('healthGoals', v)}
          placeholder="e.g. Restore energy levels, lose weight through a clinical approach, improve recovery from training, address low testosterone symptoms..." rows={3} />

        <RadioGroup label="Recent blood tests in the last 3 months?" options={['Yes', 'No', 'Not sure']}
          value={data.recentBloods} onChange={v => set('recentBloods', v)} />

        <RadioGroup
          label="Do you consent to your practitioner accessing your My Health Record during the consultation?"
          options={['Yes', 'No']}
          value={data.myHealthRecord}
          onChange={v => set('myHealthRecord', v)}
        />
        <p className="text-xs -mt-4" style={{ color: '#3a4a5a' }}>
          Consent allows your doctor to view your medical records and current medications for safe clinical decision-making. Access occurs only during active consultation while you are a current patient. Your records remain confidential.
        </p>

        <RadioGroup label="Pharmacy preference (if treatment is prescribed)" options={['Apex Partner Pharmacy', 'My Own Pharmacy']}
          value={data.pharmacyPreference} onChange={v => set('pharmacyPreference', v)} />

        <PathwaySelector value={data.pathway} onChange={v => set('pathway', v)} />

      </div>
    </motion.div>
  )
}

function Step6({ data, set, config }: {
  data: FormData; set: (k: keyof FormData, v: boolean | string) => void; config: ConsultConfig
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <p className="label mb-3">STEP 6 OF 6</p>
      <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Confirm &amp; submit</h2>
      <p className="text-sm mb-8" style={{ color: '#6b7a8d' }}>Review your details and confirm all declarations before submitting.</p>

      <div className="p-5 rounded-sm mb-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-xs font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#3a4a5a' }}>YOUR BOOKING SUMMARY</p>
        <div className="flex flex-col gap-2">
          {([
            ['Name', `${data.firstName} ${data.lastName}`],
            ['Email', data.email],
            ['Mobile', data.phone],
            ['State', data.state],
            ['Medicare', data.medicareNumber ? `${data.medicareNumber} / Ref ${data.medicareRef}` : ''],
            ['Program', config.programName],
            ['Pathway', data.pathway === 'member' ? 'Apex Clinical Program' : data.pathway === 'casual' ? 'Single Consultation' : ''],
          ] as [string, string][]).filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span style={{ color: '#4a5a6a' }}>{k}</span>
              <span style={{ color: '#8899aa' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {([
          {
            key: 'privacyConsent' as keyof FormData,
            label: 'I expressly consent to Apex Metabolic Health collecting, holding, and using my sensitive health information — including medical history, current conditions, medications, and lifestyle data — for the purpose of providing telehealth medical services, in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.',
          },
          {
            key: 'overseasConsent' as keyof FormData,
            label: 'I acknowledge that my personal information will be transmitted to and processed by third-party service providers operating outside Australia, including Web3Forms Inc. (United States). I consent to this cross-border disclosure and understand that Australian privacy laws may not apply to overseas recipients.',
          },
          {
            key: 'multiClinicDeclaration' as keyof FormData,
            label: 'I confirm I am not procuring medication or treatments for the same conditions from multiple clinics simultaneously — whether for personal use or any other purpose. I understand that doing so may be illegal under Australian law, and that discovery of this conduct will result in immediate termination of my relationship with Apex Metabolic Health and may be reported to relevant authorities.',
          },
          {
            key: 'medicationWaiver' as keyof FormData,
            label: 'I agree to use any medication prescribed to me only in the correct and safe manner as directed by my treating practitioner, at the prescribed dose only. I will not sell, share, transfer, or distribute any prescribed medication or protocol to any other person. I will report any side effects or adverse reactions to my practitioner or the dispensing pharmacy promptly.',
          },
          {
            key: 'agentAgreement' as keyof FormData,
            label: 'I consent to Apex Metabolic Health\'s coordination team — which includes administrative staff and registered nurses who are not doctors and do not provide medical advice — acting as my agent in liaising with my treating practitioner, compounding pharmacy, and other health professionals on my behalf, in accordance with the Privacy Act 1988 (Cth).',
          },
          {
            key: 'regularGPAgreement' as keyof FormData,
            label: 'I agree to continue attending my regular GP or specialist for comprehensive health monitoring — including but not limited to blood pressure, cholesterol, cardiac assessment, ECG, physical examination, and any pathology investigations they deem necessary. Apex Metabolic Health does not replace primary care.',
          },
          {
            key: 'ageConfirm' as keyof FormData,
            label: 'I confirm I am 18 years of age or older. I understand that Apex Metabolic Health provides services to adults only and that age verification may be requested by my treating practitioner.',
          },
          {
            key: 'notUnderCode' as keyof FormData,
            label: 'I confirm I am not currently registered under or subject to anti-doping obligations of any sporting or professional organisation — including ASADA, WADA, or any affiliated national code — where treatments prescribed through Apex Metabolic Health may be prohibited.',
          },
          {
            key: 'consent' as keyof FormData,
            label: 'I authorise Apex Metabolic Health and its AHPRA-registered medical practitioners to use the information provided in this form for the purpose of clinical assessment and treatment planning. I understand that: (a) completion of this form does not guarantee a consultation will be provided; (b) my treating practitioner may determine that telehealth is not clinically appropriate for my needs; (c) this form does not constitute a diagnosis or prescription; and (d) this is not an emergency service — if I have a medical emergency, I will call 000.',
          },
        ] as { key: keyof FormData; label: string }[]).map(({ key, label }) => (
          <label key={String(key)} className="flex items-start gap-3 cursor-pointer">
            <div onClick={() => set(key, !(data[key] as boolean))}
              className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-150"
              style={{
                background: data[key] ? 'rgba(72,144,247,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${data[key] ? 'rgba(72,144,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
              }}>
              {data[key] && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#4890f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              <span style={{ color: '#4890f7' }}>* </span>{label}
            </span>
          </label>
        ))}
        <p className="text-xs mt-1" style={{ color: '#3a4a5a' }}>All nine declarations are required to submit.</p>
      </div>
    </motion.div>
  )
}

function Success({ firstName, config }: { firstName: string; config: ConsultConfig }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start"
      style={{ maxWidth: 540 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
        style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(72,144,247,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(72,144,247,0.06)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
          <path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="label mb-5">
        Intake Received
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="font-bold tracking-tight mb-6"
        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1, color: '#f0f4f8', letterSpacing: '-0.02em' }}>
        {firstName ? `Thank you, ${firstName}.` : 'Thank you.'}
        <br />
        <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          We take it from here.
        </span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="text-base leading-relaxed mb-10" style={{ color: '#8899aa', maxWidth: 440 }}>
        Your {config.programName} intake has been received by our clinical team.
        We will review your details and be in touch within one business day with everything you need for your next step.
      </motion.p>
      <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', height: 1, transformOrigin: 'left', background: 'linear-gradient(90deg, rgba(72,144,247,0.15) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)', marginBottom: 32 }} />
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.82, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-4 mb-12">
        {[
          { step: 'Intake review', detail: 'Our clinical team reviews your submission and prepares a case summary for your assigned doctor.' },
          { step: 'Appointment confirmation', detail: 'You will receive direct contact from us confirming your telehealth appointment time and any pre-consultation requirements, including photo ID submission.' },
          { step: 'Medical consultation', detail: 'Your doctor conducts a thorough telehealth consultation, interprets your pathology results, and prescribes your personalised treatment protocol if clinically appropriate.' },
          { step: 'Begin your protocol', detail: 'Your protocol is coordinated through our compounding pharmacy partner and clinical support team. Ongoing reviews are scheduled from day one.' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4 items-start">
            <div style={{ minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#3a4a5a', fontFamily: 'var(--font-space-grotesk)' }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: '#c8d4e0' }}>{item.step}</p>
              <p className="text-sm leading-relaxed" style={{ color: '#4a5a6a' }}>{item.detail}</p>
            </div>
          </div>
        ))}
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }} className="text-[11px] leading-relaxed" style={{ color: '#2a3a4a' }}>
        Apex Metabolic Health &nbsp;·&nbsp; AHPRA-registered practitioners &nbsp;·&nbsp; Private &amp; confidential
      </motion.p>
    </motion.div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ConsultIntakeForm({ config }: { config: ConsultConfig }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      try { return { ...makeInitial(), ...JSON.parse(localStorage.getItem(config.storageKey) || '{}') } } catch { return makeInitial() }
    }
    return makeInitial()
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!submitted) localStorage.setItem(config.storageKey, JSON.stringify(data))
  }, [data, submitted, config.storageKey])

  const set = (k: keyof FormData, v: string | boolean | string[]) => setData(p => ({ ...p, [k]: v }))

  const toggleCardio = (c: string) =>
    setData(p => ({ ...p, cardiovascularConditions: p.cardiovascularConditions.includes(c) ? p.cardiovascularConditions.filter(x => x !== c) : [...p.cardiovascularConditions, c] }))

  const toggleCondition = (c: string) =>
    setData(p => ({ ...p, conditions: p.conditions.includes(c) ? p.conditions.filter(x => x !== c) : [...p.conditions, c] }))

  const toggleConcern = (c: string) =>
    setData(p => ({ ...p, healthConcerns: p.healthConcerns.includes(c) ? p.healthConcerns.filter(x => x !== c) : [...p.healthConcerns, c] }))

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const step1Valid = Boolean(
    data.firstName.trim() && data.lastName.trim() && data.email.trim() &&
    data.phone.trim() && data.dob && data.state &&
    data.medicareNumber.trim() && data.medicareExpiry.trim() && data.medicareRef.trim()
  )

  const step5Valid = Boolean(data.pathway)

  const step6Valid = data.consent && data.ageConfirm && data.notUnderCode &&
    data.privacyConsent && data.overseasConsent &&
    data.multiClinicDeclaration && data.medicationWaiver &&
    data.agentAgreement && data.regularGPAgreement

  const canAdvance = step === 1 ? step1Valid : step === 5 ? step5Valid : true
  const isLastStep = step === STEPS.length

  const submit = async () => {
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${config.programName} Intake — ${data.firstName} ${data.lastName}`,
          from_name: 'Apex Metabolic Health',
          // Personal
          name: `${data.firstName} ${data.lastName}`,
          email: data.email, email_secondary: data.email2,
          phone_mobile: data.phone, phone_home: data.homePhone, phone_work: data.workPhone,
          dob: data.dob, gender: data.gender,
          weight_kg: data.weight, height_cm: data.height,
          nationality: data.nationality, indigenous_status: data.indigenousStatus,
          address: `${data.address}, ${data.suburb} ${data.state} ${data.postcode}`,
          occupation: data.occupation,
          gp_name: data.gpName, gp_phone: data.gpPhone,
          blood_group: data.bloodGroup, blood_pressure: data.bloodPressure, heart_rate: data.heartRate,
          medicare_number: data.medicareNumber, medicare_expiry: data.medicareExpiry, medicare_ref: data.medicareRef,
          hobbies: data.hobbies,
          // Medical
          past_surgery: data.pastSurgery, medical_history: data.medicalHistory,
          medications: data.medications, allergies: data.allergies, family_history: data.familyHistory,
          // Lifestyle
          smoking_status: data.smokingStatus, smoking_amount: data.smokingAmount,
          recreational_drugs: data.recreationalDrugs,
          alcohol_weekly: data.alcohol,
          weight_change: data.weightChange, weight_change_kg: data.weightChangeKg,
          health_score: data.healthScore, energy_score: data.energyScore,
          energy_low: data.energyLow, energy_high: data.energyHigh,
          exercise_freq: data.exerciseFreq, exercise_type: data.exerciseType,
          stress_score: data.stressScore, stress_events: data.stressEvents,
          current_lifestyle: data.currentLifestyle, current_diet: data.currentDiet,
          diet_breakfast: data.dietBreakfast, diet_morning_tea: data.dietMorningTea,
          diet_lunch: data.dietLunch, diet_afternoon_tea: data.dietAfternoonTea,
          diet_dinner: data.dietDinner, diet_before_bed: data.dietBeforeBed,
          // Conditions
          cardiovascular_conditions: data.cardiovascularConditions.join(', '),
          conditions: data.conditions.join(', '),
          // Concern & pathway
          health_concerns: data.healthConcerns.join(', '),
          main_concern: data.mainConcern,
          health_goals: data.healthGoals,
          recent_bloods: data.recentBloods,
          my_health_record_consent: data.myHealthRecord,
          pharmacy_preference: data.pharmacyPreference,
          pathway: data.pathway === 'member' ? 'Apex Clinical Program' : data.pathway === 'casual' ? 'Single Consultation' : '',
          program: config.programName,
          formType: `${config.programName} Consultation Intake`,
        }),
      })
      const json = await res.json()
      if (json.success) { setSubmitted(true); localStorage.removeItem(config.storageKey); scrollTop() }
      else setError('Something went wrong. Please try again.')
    } catch { setError('Network error. Please try again.') }
    finally { setSubmitting(false) }
  }

  const progress = Math.round((step / STEPS.length) * 100)

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden" style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.07) 0%, transparent 60%)' }} />
          <div ref={topRef} className="container-tight relative z-10" style={{ maxWidth: 700 }}>
            {!submitted && <PrivacyNotice />}
            {!submitted && (
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase" style={{ color: '#4890f7' }}>
                    {config.formTitle}
                  </span>
                  <span className="text-xs" style={{ color: '#3a4a5a' }}>{progress}%</span>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #4890f7, #4890f7)' }}
                    initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                </div>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {STEPS.map((s, i) => <span key={s} className="text-[10px] tracking-wide" style={{ color: i + 1 <= step ? '#4890f7' : '#2a3a4a' }}>{s}</span>)}
                </div>
              </div>
            )}
            {submitted ? <Success firstName={data.firstName} config={config} /> : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    {step === 1 && <Step1 data={data} set={(k, v) => set(k, v as string)} />}
                    {step === 2 && <Step2 data={data} set={(k, v) => set(k, v as string)} />}
                    {step === 3 && <Step3 data={data} set={(k, v) => set(k, v as string)} />}
                    {step === 4 && <Step4 data={data} toggleCardio={toggleCardio} toggleCondition={toggleCondition} />}
                    {step === 5 && <Step5 data={data} set={(k, v) => set(k, v as string)} toggleConcern={toggleConcern} config={config} />}
                    {step === 6 && <Step6 data={data} set={set} config={config} />}
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-4 mt-8">
                  {step > 1 && (
                    <button type="button" onClick={() => { setStep(s => s - 1); scrollTop() }}
                      className="px-5 py-3 rounded-sm text-sm font-semibold transition-all duration-150"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7a8d' }}>← Back</button>
                  )}
                  {!isLastStep ? (
                    <button type="button" onClick={() => { setStep(s => s + 1); scrollTop() }}
                      disabled={!canAdvance} className="btn-teal"
                      style={{ opacity: !canAdvance ? 0.4 : 1, cursor: !canAdvance ? 'not-allowed' : 'pointer' }}>Continue →</button>
                  ) : (
                    <button type="button" onClick={submit} disabled={submitting || !step6Valid} className="btn-teal"
                      style={{ opacity: submitting || !step6Valid ? 0.5 : 1, cursor: submitting || !step6Valid ? 'not-allowed' : 'pointer' }}>
                      {submitting ? 'Submitting…' : 'Submit intake form →'}</button>
                  )}
                </div>
                {step === 5 && !step5Valid && (
                  <p className="text-xs mt-3" style={{ color: '#5a4a3a' }}>Please choose a care pathway to continue.</p>
                )}
                {error && <p className="text-sm mt-4" style={{ color: '#e05c5c' }}>{error}</p>}
                <p className="text-xs mt-5" style={{ color: '#3a4a5a' }}>Your information is private and confidential. Used only for your clinical consultation.</p>
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
