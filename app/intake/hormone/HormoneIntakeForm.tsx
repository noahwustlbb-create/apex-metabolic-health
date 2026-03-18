'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Config ───────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const STORAGE_KEY = 'apex-hormone-intake-v1'

const STEPS = [
  'Personal Details',
  'Medical Background',
  'Health History',
  'Lifestyle & Physical',
  'Health Scores & Conditions',
  'Main Concern & Sign',
]

const MEDICAL_CONDITIONS = [
  'Cancer',
  'Hypoglycaemia',
  'Diabetes',
  'Kidney Stones / Infections',
  'Abnormal Liver Function Tests',
  'Seizures',
  'High Blood Pressure',
  'Palpitations or Irregular Heartbeat',
  'Deep Vein Thrombosis (DVT)',
  'Anaemia',
  'Iron Deficiency',
  'Agitation or Anxiety',
  'Depression',
  'Muscle Pain',
  'Hair Loss',
]

const EXERCISE_FREQUENCY = ['Never', 'Once or twice a week', 'Every other day', 'Daily']

// ─── Types ────────────────────────────────────────────────────────────────────
interface MealEntry {
  food: string
  time: string
}

interface FormData {
  // Step 1
  surname: string
  firstName: string
  gender: string
  dob: string
  nationality: string
  address: string
  suburb: string
  state: string
  postcode: string
  homePh: string
  workPh: string
  mobile: string
  email: string
  email2: string
  occupation: string
  // Step 2
  gpName: string
  gpContact: string
  bloodGroup: string
  bloodPressure: string
  heartRate: string
  medicareNumber: string
  medicareExpiry: string
  medicareRef: string
  isIndigenous: string
  previousTestsFileName: string
  // Step 3
  pastSurgery: string
  pastMedicalHistory: string
  medications: string
  allergies: string
  familyHistory: string
  // Step 4
  hobbies: string
  smokes: string
  smokesPerDay: string
  smokedPast: string
  smokedQuitYear: string
  alcoholPerWeek: string
  weightLoss: string
  weightGain: string
  exerciseFrequency: string
  exerciseTypes: string
  mealBreakfast: MealEntry
  mealMorningTea: MealEntry
  mealLunch: MealEntry
  mealAfternoonTea: MealEntry
  mealDinner: MealEntry
  mealBeforeBed: MealEntry
  // Step 5
  healthScore: string
  energyScore: string
  energyLowest: string
  energyHighest: string
  stressScore: string
  stressEvents: string
  conditions: string[]
  // Step 6
  mainCondition: string
  signatureType: 'draw' | 'type'
  typedSignature: string
  printName: string
  isOver18: boolean
  notProhibited: boolean
}

const defaultData: FormData = {
  surname: '', firstName: '', gender: '', dob: '', nationality: '',
  address: '', suburb: '', state: '', postcode: '',
  homePh: '', workPh: '', mobile: '', email: '', email2: '', occupation: '',
  gpName: '', gpContact: '', bloodGroup: '', bloodPressure: '', heartRate: '',
  medicareNumber: '', medicareExpiry: '', medicareRef: '', isIndigenous: '',
  previousTestsFileName: '',
  pastSurgery: '', pastMedicalHistory: '', medications: '', allergies: '', familyHistory: '',
  hobbies: '', smokes: '', smokesPerDay: '', smokedPast: '', smokedQuitYear: '',
  alcoholPerWeek: '', weightLoss: '', weightGain: '',
  exerciseFrequency: '', exerciseTypes: '',
  mealBreakfast: { food: '', time: '' },
  mealMorningTea: { food: '', time: '' },
  mealLunch: { food: '', time: '' },
  mealAfternoonTea: { food: '', time: '' },
  mealDinner: { food: '', time: '' },
  mealBeforeBed: { food: '', time: '' },
  healthScore: '', energyScore: '', energyLowest: '', energyHighest: '',
  stressScore: '', stressEvents: '',
  conditions: [],
  mainCondition: '', signatureType: 'draw', typedSignature: '', printName: '',
  isOver18: false, notProhibited: false,
}

// ─── Reusable Components ──────────────────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium mb-1.5" style={{ color: '#8899aa' }}>
      {children}{required && <span style={{ color: '#2b7be0' }}> *</span>}
    </label>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text', inputMode, maxLength }: {
  value: string; onChange: (v: string) => void; placeholder?: string
  type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; maxLength?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} inputMode={inputMode} maxLength={maxLength}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none"
      style={{ backgroundColor: '#070a0d', border: `1px solid ${focused ? '#2b7be0' : '#1e2d3d'}`, color: '#f0f4f8' }}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none resize-none"
      style={{ backgroundColor: '#070a0d', border: `1px solid ${focused ? '#2b7be0' : '#1e2d3d'}`, color: '#f0f4f8' }}
    />
  )
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className="px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: value === opt ? 'rgba(43,123,224,0.12)' : '#070a0d',
            border: `1px solid ${value === opt ? '#2b7be0' : '#1e2d3d'}`,
            color: value === opt ? '#2b7be0' : '#8899aa',
          }}>
          {opt}
        </button>
      ))}
    </div>
  )
}

function ScoreSelector({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div>
      <FieldLabel required>{label}</FieldLabel>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => String(i)).map((n) => (
          <button key={n} type="button" onClick={() => onChange(n)}
            className="w-10 h-10 rounded-sm text-sm font-semibold transition-all duration-150"
            style={{
              backgroundColor: value === n ? '#2b7be0' : '#070a0d',
              border: `1px solid ${value === n ? '#2b7be0' : '#1e2d3d'}`,
              color: value === n ? '#070a0d' : '#8899aa',
            }}>
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxGroup({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    value.includes(opt) ? onChange(value.filter((v) => v !== opt)) : onChange([...value, opt])
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = value.includes(opt)
        return (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-left transition-all duration-150"
            style={{
              backgroundColor: checked ? 'rgba(43,123,224,0.07)' : '#070a0d',
              border: `1px solid ${checked ? '#2b7be0' : '#1e2d3d'}`,
              color: checked ? '#f0f4f8' : '#8899aa',
            }}>
            <span className="w-4 h-4 flex-shrink-0 rounded-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: checked ? '#2b7be0' : 'transparent', border: `1px solid ${checked ? '#2b7be0' : '#4a5a6a'}` }}>
              {checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ConsentCheckbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-start gap-3 text-left w-full">
      <span className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-sm flex items-center justify-center transition-colors"
        style={{ backgroundColor: checked ? '#2b7be0' : 'transparent', border: `1px solid ${checked ? '#2b7be0' : '#4a5a6a'}` }}>
        {checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>{children}</span>
    </button>
  )
}

function FileInput({ label, accept, hint, onFile, currentName }: {
  label: string; accept: string; hint?: string; onFile: (f: File, name: string) => void; currentName: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative flex flex-col items-center justify-center gap-2 py-6 px-4 rounded-sm cursor-pointer"
        style={{ border: '1px dashed #1e2d3d', backgroundColor: '#070a0d' }}
        onClick={() => ref.current?.click()}>
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" style={{ color: '#4a5a6a' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {currentName ? (
          <span className="text-sm font-medium" style={{ color: '#2b7be0' }}>{currentName}</span>
        ) : (
          <span className="text-sm" style={{ color: '#4a5a6a' }}>Click to upload (optional)</span>
        )}
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f, f.name) }} />
      </div>
      {hint && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4a5a6a' }}>{hint}</p>}
    </div>
  )
}

// ─── Canvas Signature ─────────────────────────────────────────────────────────
function SignatureCanvas({ onSave }: { onSave: (data: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#f0f4f8'
    ctx.lineWidth = 1.8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    isDrawing.current = true
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent, canvas)
    ctx.beginPath(); ctx.moveTo(pos.x, pos.y); e.preventDefault()
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent, canvas)
    ctx.lineTo(pos.x, pos.y); ctx.stroke()
    onSave(canvas.toDataURL()); e.preventDefault()
  }

  const clear = () => {
    const canvas = canvasRef.current; if (!canvas) return
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
    onSave('')
  }

  return (
    <div>
      <div className="relative rounded-sm overflow-hidden" style={{ border: '1px solid #1e2d3d', backgroundColor: '#070a0d', touchAction: 'none' }}>
        <canvas ref={canvasRef} width={800} height={180} className="w-full block" style={{ cursor: 'crosshair' }}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={() => { isDrawing.current = false }}
          onMouseLeave={() => { isDrawing.current = false }}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={() => { isDrawing.current = false }} />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs pointer-events-none select-none" style={{ color: '#1e2d3d' }}>Sign here</p>
      </div>
      <button type="button" onClick={clear} className="mt-2 text-xs font-medium" style={{ color: '#4a5a6a' }}>Clear</button>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#2b7be0' }}>Step {step + 1} of {total}</span>
        <span className="text-xs" style={{ color: '#4a5a6a' }}>{STEPS[step]}</span>
      </div>
      <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: '#1e2d3d' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((step + 1) / total) * 100}%`, backgroundColor: '#2b7be0', boxShadow: '0 0 8px rgba(43,123,224,0.5)' }} />
      </div>
    </div>
  )
}

// ─── Meal Row ─────────────────────────────────────────────────────────────────
function MealRow({ label, value, onChange }: { label: string; value: { food: string; time: string }; onChange: (v: { food: string; time: string }) => void }) {
  const [focusedFood, setFocusedFood] = useState(false)
  const [focusedTime, setFocusedTime] = useState(false)
  return (
    <div className="grid grid-cols-[120px_1fr_100px] gap-3 items-center">
      <span className="text-sm font-medium" style={{ color: '#8899aa' }}>{label}</span>
      <input value={value.food} onChange={(e) => onChange({ ...value, food: e.target.value })}
        placeholder="Food description and amount"
        onFocus={() => setFocusedFood(true)} onBlur={() => setFocusedFood(false)}
        className="px-3 py-2.5 rounded-sm text-sm focus:outline-none transition-colors"
        style={{ backgroundColor: '#070a0d', border: `1px solid ${focusedFood ? '#2b7be0' : '#1e2d3d'}`, color: '#f0f4f8' }} />
      <input value={value.time} onChange={(e) => onChange({ ...value, time: e.target.value })}
        placeholder="Time"
        onFocus={() => setFocusedTime(true)} onBlur={() => setFocusedTime(false)}
        className="px-3 py-2.5 rounded-sm text-sm focus:outline-none transition-colors"
        style={{ backgroundColor: '#070a0d', border: `1px solid ${focusedTime ? '#2b7be0' : '#1e2d3d'}`, color: '#f0f4f8' }} />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HormoneIntakeForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(defaultData)
  const [previousTestsFile, setPreviousTestsFile] = useState<File | null>(null)
  const [signatureData, setSignatureData] = useState('')
  const [captcha] = useState(() => { const a = Math.floor(Math.random() * 9) + 1; const b = Math.floor(Math.random() * 9) + 1; return { a, b, answer: a + b } })
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try { if (localStorage.getItem(STORAGE_KEY)) setResumeAvailable(true) } catch {}
  }, [])

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const setMeal = (meal: keyof FormData, value: { food: string; time: string }) => {
    setData((prev) => ({ ...prev, [meal]: value }))
  }

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const saveProgress = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step })); setHasSaved(true) } catch {}
  }

  const resumeProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) { const { data: d, step: s } = JSON.parse(saved); setData({ ...defaultData, ...d }); setStep(s || 0); setResumeAvailable(false) }
    } catch {}
  }

  const validate = (): string[] => {
    const e: string[] = []
    if (step === 0) {
      if (!data.surname.trim()) e.push('Surname is required')
      if (!data.firstName.trim()) e.push('First name is required')
      if (!data.gender) e.push('Gender is required')
      if (!data.dob) e.push('Date of birth is required')
      if (!data.mobile.trim()) e.push('Mobile number is required')
      if (!data.email.trim() || !data.email.includes('@')) e.push('Valid email is required')
      if (!data.address.trim()) e.push('Address is required')
      if (!data.suburb.trim()) e.push('Suburb is required')
      if (!data.state.trim()) e.push('State is required')
      if (!data.postcode.trim()) e.push('Postcode is required')
      if (!data.occupation.trim()) e.push('Occupation is required')
    }
    if (step === 1) {
      if (!data.gpName.trim()) e.push('GP name is required')
      if (!data.medicareNumber.trim()) e.push('Medicare number is required')
      if (!data.isIndigenous) e.push('Please answer the Aboriginal/Torres Strait Islander question')
    }
    if (step === 2) {
      if (!data.pastSurgery.trim()) e.push('Please list past surgery (or write "None")')
      if (!data.pastMedicalHistory.trim()) e.push('Please list past medical history (or write "None")')
      if (!data.medications.trim()) e.push('Please list medications (or write "None")')
      if (!data.allergies.trim()) e.push('Please list allergies (or write "None")')
      if (!data.familyHistory.trim()) e.push('Please describe family history (or write "None")')
    }
    if (step === 3) {
      if (!data.smokes) e.push('Please answer the smoking question')
      if (!data.alcoholPerWeek.trim()) e.push('Please answer the alcohol question')
      if (!data.exerciseFrequency) e.push('Please select your exercise frequency')
    }
    if (step === 4) {
      if (!data.healthScore) e.push('Please rate your current health')
      if (!data.energyScore) e.push('Please rate your energy level')
      if (!data.stressScore) e.push('Please rate your stress level')
      if (!data.stressEvents.trim()) e.push('Please list your most significant stressful events')
    }
    if (step === 5) {
      if (!data.mainCondition.trim()) e.push('Please describe your main condition and goals')
      if (!data.printName.trim()) e.push('Print name is required')
      if (!data.isOver18) e.push('You must confirm you are over 18')
      if (!data.notProhibited) e.push('You must confirm you are not under a prohibited sporting or professional code')
      const sig = data.signatureType === 'type' ? data.typedSignature.trim() : signatureData
      if (!sig) e.push('Signature is required')
      if (parseInt(captchaInput) !== captcha.answer) e.push('Security check answer is incorrect')
    }
    return e
  }

  const next = () => {
    const errs = validate()
    if (errs.length > 0) { setErrors(errs); scrollTop(); return }
    setErrors([]); setStep((s) => s + 1); scrollTop()
  }

  const back = () => { setErrors([]); setStep((s) => s - 1); scrollTop() }

  const submit = async () => {
    const errs = validate()
    if (errs.length > 0) { setErrors(errs); scrollTop(); return }
    setSubmitting(true)

    const mealLog = {
      breakfast: data.mealBreakfast,
      morningTea: data.mealMorningTea,
      lunch: data.mealLunch,
      afternoonTea: data.mealAfternoonTea,
      dinner: data.mealDinner,
      beforeBed: data.mealBeforeBed,
    }

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New Hormone Intake — ${data.firstName} ${data.surname}`,
      from_name: 'Apex Metabolic Health',
      ...data,
      mealLog: JSON.stringify(mealLog),
      signatureData: data.signatureType === 'draw' ? '[drawn]' : data.typedSignature,
      previousTestsFileName: previousTestsFile?.name || data.previousTestsFileName,
      submittedAt: new Date().toISOString(),
      formType: 'Hormone Program Pre-Screen Intake',
    }

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {}

    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setSubmitting(false)
    setSubmitted(true)
    scrollTop()
  }

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: 'rgba(43,123,224,0.1)', border: '1px solid rgba(43,123,224,0.3)' }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" style={{ color: '#2b7be0' }}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="label mb-4">Form Submitted</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
                Thank You, {data.firstName}.
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#8899aa' }}>
                We&apos;ve received your hormone program intake form. Our clinical team will review your details and be in touch within one business day to confirm your next steps.
              </p>
              <p className="text-sm mb-10" style={{ color: '#4a5a6a' }}>
                All consultations are conducted by AHPRA-registered medical practitioners. Your information is handled in accordance with the Australian Privacy Act.
              </p>
              <Link href="/" className="btn-teal">Back to Home</Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div ref={topRef} className="container-tight max-w-3xl">

          <div className="mb-10 pt-6">
            <p className="label mb-3">Hormone Program</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
              Pre-Screen Intake Form
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              Please ensure each question is answered. If something does not apply, write &ldquo;N/A&rdquo; or &ldquo;Nil&rdquo;. Takes approximately 3–5 minutes.
            </p>
          </div>

          {resumeAvailable && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-sm mb-6"
              style={{ backgroundColor: 'rgba(43,123,224,0.08)', border: '1px solid rgba(43,123,224,0.25)' }}>
              <p className="text-sm" style={{ color: '#f0f4f8' }}>You have a saved form in progress.</p>
              <button type="button" onClick={resumeProgress} className="text-sm font-semibold flex-shrink-0" style={{ color: '#2b7be0' }}>Resume →</button>
            </motion.div>
          )}

          <ProgressBar step={step} total={STEPS.length} />

          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="px-5 py-4 rounded-sm mb-6"
                style={{ backgroundColor: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.3)' }}>
                <p className="text-sm font-semibold mb-2" style={{ color: '#dc3545' }}>Please fix the following:</p>
                <ul className="space-y-1">
                  {errors.map((e, i) => <li key={i} className="text-sm" style={{ color: '#8899aa' }}>— {e}</li>)}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="apex-card p-8">

              {/* ── STEP 0: Personal Details ── */}
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><FieldLabel required>Surname</FieldLabel><TextInput value={data.surname} onChange={(v) => set('surname', v)} placeholder="Smith" /></div>
                    <div><FieldLabel required>First Name</FieldLabel><TextInput value={data.firstName} onChange={(v) => set('firstName', v)} placeholder="John" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel required>Gender</FieldLabel>
                      <RadioGroup options={['Male', 'Female']} value={data.gender} onChange={(v) => set('gender', v)} />
                    </div>
                    <div><FieldLabel required>Date of Birth</FieldLabel><TextInput type="date" value={data.dob} onChange={(v) => set('dob', v)} /></div>
                  </div>
                  <div><FieldLabel>Nationality</FieldLabel><TextInput value={data.nationality} onChange={(v) => set('nationality', v)} placeholder="Australian" /></div>
                  <div><FieldLabel required>Home Address</FieldLabel><TextInput value={data.address} onChange={(v) => set('address', v)} placeholder="123 Example St" /></div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="col-span-2"><FieldLabel required>Suburb</FieldLabel><TextInput value={data.suburb} onChange={(v) => set('suburb', v)} placeholder="Brisbane" /></div>
                    <div><FieldLabel required>State</FieldLabel><TextInput value={data.state} onChange={(v) => set('state', v)} placeholder="QLD" maxLength={3} /></div>
                    <div><FieldLabel required>Postcode</FieldLabel><TextInput value={data.postcode} onChange={(v) => set('postcode', v)} placeholder="4000" maxLength={4} inputMode="numeric" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div><FieldLabel>Home Phone</FieldLabel><TextInput type="tel" value={data.homePh} onChange={(v) => set('homePh', v)} placeholder="07 XXXX XXXX" /></div>
                    <div><FieldLabel>Work Phone</FieldLabel><TextInput type="tel" value={data.workPh} onChange={(v) => set('workPh', v)} placeholder="07 XXXX XXXX" /></div>
                    <div><FieldLabel required>Mobile</FieldLabel><TextInput type="tel" value={data.mobile} onChange={(v) => set('mobile', v)} placeholder="04XX XXX XXX" /></div>
                  </div>
                  <div><FieldLabel required>Email Address</FieldLabel><TextInput type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="john@example.com" /></div>
                  <div><FieldLabel>Second Email (optional)</FieldLabel><TextInput type="email" value={data.email2} onChange={(v) => set('email2', v)} placeholder="secondary@example.com" /></div>
                  <div><FieldLabel required>Occupation</FieldLabel><TextInput value={data.occupation} onChange={(v) => set('occupation', v)} placeholder="e.g. Construction Manager" /></div>
                </div>
              )}

              {/* ── STEP 1: Medical Background ── */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Medical Background</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><FieldLabel required>Name of Your GP</FieldLabel><TextInput value={data.gpName} onChange={(v) => set('gpName', v)} placeholder="Dr. Jane Smith" /></div>
                    <div><FieldLabel>GP Contact Number</FieldLabel><TextInput type="tel" value={data.gpContact} onChange={(v) => set('gpContact', v)} placeholder="07 XXXX XXXX" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div><FieldLabel>Blood Group</FieldLabel><TextInput value={data.bloodGroup} onChange={(v) => set('bloodGroup', v)} placeholder="e.g. A+" /></div>
                    <div><FieldLabel>Blood Pressure</FieldLabel><TextInput value={data.bloodPressure} onChange={(v) => set('bloodPressure', v)} placeholder="120/80" /></div>
                    <div><FieldLabel>Heart Rate (bpm)</FieldLabel><TextInput value={data.heartRate} onChange={(v) => set('heartRate', v)} placeholder="72" inputMode="numeric" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <FieldLabel required>Medicare Number</FieldLabel>
                      <TextInput value={data.medicareNumber} onChange={(v) => set('medicareNumber', v.replace(/\D/g, '').slice(0, 10))} placeholder="0000000000" inputMode="numeric" maxLength={10} />
                    </div>
                    <div><FieldLabel>Medicare Expiry</FieldLabel><TextInput value={data.medicareExpiry} onChange={(v) => set('medicareExpiry', v.replace(/\D/g, '').slice(0, 4))} placeholder="MMYY" maxLength={4} inputMode="numeric" /></div>
                    <div><FieldLabel>Medicare Ref No.</FieldLabel><TextInput value={data.medicareRef} onChange={(v) => set('medicareRef', v)} placeholder="1" maxLength={2} inputMode="numeric" /></div>
                  </div>
                  <div>
                    <FieldLabel required>Are you an Aboriginal or Torres Strait Islander?</FieldLabel>
                    <RadioGroup options={['Yes', 'No', 'Prefer not to say']} value={data.isIndigenous} onChange={(v) => set('isIndigenous', v)} />
                  </div>
                  <FileInput
                    label="Upload Previous Blood Tests, Hair Tests, Salivary Tests, DEXA Scans, etc. (optional)"
                    accept="image/*,.pdf,.doc,.docx"
                    hint="Please forward any previous test reports that may be relevant to your consultation."
                    onFile={(f, name) => { setPreviousTestsFile(f); set('previousTestsFileName', name) }}
                    currentName={data.previousTestsFileName}
                  />
                </div>
              )}

              {/* ── STEP 2: Health History ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Health History</h2>
                  <div>
                    <FieldLabel required>Past Surgery</FieldLabel>
                    <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>List all surgery you have had and the year it occurred. Write &ldquo;None&rdquo; if not applicable.</p>
                    <TextArea value={data.pastSurgery} onChange={(v) => set('pastSurgery', v)} placeholder="e.g. Appendectomy — 2018&#10;Knee reconstruction — 2021" rows={4} />
                  </div>
                  <div>
                    <FieldLabel required>Past Medical History</FieldLabel>
                    <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>List all medical problems and the year they began. Mark * for work-related injuries and note if workers comp.</p>
                    <TextArea value={data.pastMedicalHistory} onChange={(v) => set('pastMedicalHistory', v)} placeholder="e.g. Hypertension — 2019&#10;Lower back injury — 2020" rows={4} />
                  </div>
                  <div>
                    <FieldLabel required>All Medications, Vitamins & Supplements</FieldLabel>
                    <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>Include all script medications, vitamins, minerals, herbals, etc. Include dosage and time taken. Write &ldquo;None&rdquo; if not applicable.</p>
                    <TextArea value={data.medications} onChange={(v) => set('medications', v)} placeholder="e.g. Metformin 500mg — twice daily&#10;Vitamin D 5000IU — morning" rows={4} />
                  </div>
                  <div>
                    <FieldLabel required>Allergies</FieldLabel>
                    <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>List all allergies to medications, vitamins, minerals, herbs, food, etc. Write &ldquo;None&rdquo; if not applicable.</p>
                    <TextArea value={data.allergies} onChange={(v) => set('allergies', v)} placeholder="e.g. Penicillin — hives&#10;Shellfish — anaphylaxis" rows={3} />
                  </div>
                  <div>
                    <FieldLabel required>Family History</FieldLabel>
                    <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>Indicate any family history of: heart disease, high blood pressure, cancer, diabetes, osteoarthritis, mental illness, auto-immune disorders, asthma, allergies, alcoholism, drug abuse, or other relevant conditions.</p>
                    <TextArea value={data.familyHistory} onChange={(v) => set('familyHistory', v)} placeholder="e.g. Father — Type 2 diabetes, high blood pressure&#10;Grandfather — Heart disease" rows={4} />
                  </div>
                </div>
              )}

              {/* ── STEP 3: Lifestyle & Physical ── */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Lifestyle & Physical Health</h2>
                  <div><FieldLabel>Hobbies & Sport</FieldLabel><TextArea value={data.hobbies} onChange={(v) => set('hobbies', v)} placeholder="e.g. Golf, fishing, gym, cycling..." rows={2} /></div>
                  <div>
                    <FieldLabel required>Do You Smoke?</FieldLabel>
                    <RadioGroup options={['No', 'Yes']} value={data.smokes} onChange={(v) => set('smokes', v)} />
                  </div>
                  {data.smokes === 'Yes' && (
                    <div><FieldLabel>How many cigarettes per day?</FieldLabel><TextInput value={data.smokesPerDay} onChange={(v) => set('smokesPerDay', v)} placeholder="e.g. 10" inputMode="numeric" /></div>
                  )}
                  <div>
                    <FieldLabel>Have you smoked in the past?</FieldLabel>
                    <RadioGroup options={['No', 'Yes']} value={data.smokedPast} onChange={(v) => set('smokedPast', v)} />
                  </div>
                  {data.smokedPast === 'Yes' && (
                    <div><FieldLabel>What year did you quit?</FieldLabel><TextInput value={data.smokedQuitYear} onChange={(v) => set('smokedQuitYear', v)} placeholder="e.g. 2015" maxLength={4} inputMode="numeric" /></div>
                  )}
                  <div><FieldLabel required>Alcohol — average drinks per week</FieldLabel><TextInput value={data.alcoholPerWeek} onChange={(v) => set('alcoholPerWeek', v)} placeholder="e.g. 6 standard drinks" /></div>
                  <div className="grid grid-cols-2 gap-5">
                    <div><FieldLabel>Weight loss in past 12 months (kg)</FieldLabel><TextInput value={data.weightLoss} onChange={(v) => set('weightLoss', v)} placeholder="e.g. 5" inputMode="numeric" /></div>
                    <div><FieldLabel>Weight gain in past 12 months (kg)</FieldLabel><TextInput value={data.weightGain} onChange={(v) => set('weightGain', v)} placeholder="e.g. 3" inputMode="numeric" /></div>
                  </div>
                  <div>
                    <FieldLabel required>How often do you exercise per week?</FieldLabel>
                    <RadioGroup options={EXERCISE_FREQUENCY} value={data.exerciseFrequency} onChange={(v) => set('exerciseFrequency', v)} />
                  </div>
                  <div><FieldLabel>What exercises are part of your typical routine?</FieldLabel><TextInput value={data.exerciseTypes} onChange={(v) => set('exerciseTypes', v)} placeholder="e.g. Weights, running, swimming" /></div>

                  <div>
                    <p className="text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Typical Daily Meals</p>
                    <div className="space-y-3">
                      {([
                        ['Breakfast', 'mealBreakfast'],
                        ['Morning Tea', 'mealMorningTea'],
                        ['Lunch', 'mealLunch'],
                        ['Afternoon Tea', 'mealAfternoonTea'],
                        ['Dinner', 'mealDinner'],
                        ['Before Bed', 'mealBeforeBed'],
                      ] as const).map(([label, key]) => (
                        <MealRow key={key} label={label} value={data[key] as { food: string; time: string }} onChange={(v) => setMeal(key, v)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Health Scores & Conditions ── */}
              {step === 4 && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Health Scores & Conditions</h2>
                  <div className="space-y-6">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#2b7be0' }}>Physical Health (0 = lowest, 10 = highest)</p>
                    <ScoreSelector label="Current level of health" value={data.healthScore} onChange={(v) => set('healthScore', v)} />
                    <ScoreSelector label="Current energy level" value={data.energyScore} onChange={(v) => set('energyScore', v)} />
                    <div className="grid grid-cols-2 gap-5">
                      <div><FieldLabel>Energy lowest at what time of day?</FieldLabel><TextInput value={data.energyLowest} onChange={(v) => set('energyLowest', v)} placeholder="e.g. 2pm" /></div>
                      <div><FieldLabel>Energy highest at what time of day?</FieldLabel><TextInput value={data.energyHighest} onChange={(v) => set('energyHighest', v)} placeholder="e.g. 10am" /></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#2b7be0' }}>Mental Health (0 = lowest, 10 = highest)</p>
                    <ScoreSelector label="Current stress level" value={data.stressScore} onChange={(v) => set('stressScore', v)} />
                    <div>
                      <FieldLabel required>Three most significant stressful events in your life</FieldLabel>
                      <p className="text-xs mb-2" style={{ color: '#4a5a6a' }}>Indicate those that are still impacting your life today.</p>
                      <TextArea value={data.stressEvents} onChange={(v) => set('stressEvents', v)} placeholder="1.&#10;2.&#10;3." rows={4} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#2b7be0' }}>Have You Had Any of the Following? (tick all that apply)</p>
                    <CheckboxGroup options={MEDICAL_CONDITIONS} value={data.conditions} onChange={(v) => set('conditions', v)} />
                  </div>
                </div>
              )}

              {/* ── STEP 5: Main Concern & Signature ── */}
              {step === 5 && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Main Concern & Authorisation</h2>
                  <div>
                    <FieldLabel required>Main Condition, Symptoms & Goals</FieldLabel>
                    <p className="text-xs mb-2 leading-relaxed" style={{ color: '#4a5a6a' }}>
                      What is the main condition you are coming to us for? What are the symptoms or problems? What is your major goal? List the very first time you noticed the condition and describe anything that may have played a role in its development.
                    </p>
                    <TextArea value={data.mainCondition} onChange={(v) => set('mainCondition', v)} placeholder="Describe your main concern, when it started, what you think caused it, and what you are hoping to achieve..." rows={8} />
                  </div>

                  <div className="p-5 rounded-sm text-xs leading-relaxed" style={{ backgroundColor: '#0d1117', border: '1px solid #1e2d3d', color: '#4a5a6a' }}>
                    I hereby authorise the Apex Metabolic Health medical team and staff to perform examinations and/or treatment deemed necessary.
                  </div>

                  <div className="space-y-4">
                    <ConsentCheckbox checked={data.isOver18} onChange={(v) => set('isOver18', v)}>
                      I declare that I am over 18 years of age.
                    </ConsentCheckbox>
                    <ConsentCheckbox checked={data.notProhibited} onChange={(v) => set('notProhibited', v)}>
                      I declare that I am NOT under any sporting or professional code where the treatments or medicines offered are prohibited.
                    </ConsentCheckbox>
                  </div>

                  <div>
                    <FieldLabel required>Print Name</FieldLabel>
                    <TextInput value={data.printName} onChange={(v) => set('printName', v)} placeholder="Your full name" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#2b7be0' }}>Signature</p>
                    <div className="flex gap-3 mb-4">
                      {(['draw', 'type'] as const).map((t) => (
                        <button key={t} type="button" onClick={() => set('signatureType', t)}
                          className="px-4 py-2 rounded-sm text-xs font-medium transition-all duration-150"
                          style={{
                            backgroundColor: data.signatureType === t ? 'rgba(43,123,224,0.1)' : 'transparent',
                            border: `1px solid ${data.signatureType === t ? '#2b7be0' : '#1e2d3d'}`,
                            color: data.signatureType === t ? '#2b7be0' : '#4a5a6a',
                          }}>
                          {t === 'draw' ? 'Draw Signature' : 'Type Signature'}
                        </button>
                      ))}
                    </div>
                    {data.signatureType === 'draw' ? (
                      <SignatureCanvas onSave={setSignatureData} />
                    ) : (
                      <TextInput value={data.typedSignature} onChange={(v) => set('typedSignature', v)} placeholder="Type your full name" />
                    )}
                  </div>

                  <div>
                    <FieldLabel required>Security Check</FieldLabel>
                    <p className="text-sm mb-3" style={{ color: '#8899aa' }}>What is {captcha.a} + {captcha.b}?</p>
                    <div className="max-w-[120px]">
                      <TextInput value={captchaInput} onChange={setCaptchaInput} placeholder="Answer" inputMode="numeric" />
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 gap-4">
            <div className="flex items-center gap-4">
              {step > 0 && (
                <button type="button" onClick={back} className="btn-ghost text-sm px-5 py-3">← Back</button>
              )}
              <button type="button" onClick={saveProgress} className="text-sm transition-colors duration-150"
                style={{ color: hasSaved ? '#2b7be0' : '#4a5a6a' }}>
                {hasSaved ? '✓ Progress saved' : 'Save & continue later'}
              </button>
            </div>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="btn-teal">Continue →</button>
            ) : (
              <button type="button" onClick={submit} disabled={submitting} className="btn-teal" style={{ opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Submitting…' : 'Submit Form'}
              </button>
            )}
          </div>

          <p className="text-xs mt-8 text-center leading-relaxed" style={{ color: '#4a5a6a' }}>
            All consultations are conducted by AHPRA-registered medical practitioners. This form does not constitute medical advice.
            Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
