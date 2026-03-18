'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ─── Config ───────────────────────────────────────────────────────────────────
const WEB3FORMS_KEY = 'c874640f-184f-446d-8a27-5c614097d8a2'
const STORAGE_KEY = 'apex-general-intake-v1'

// ─── Constants ────────────────────────────────────────────────────────────────
const STEPS = [
  'Personal Details',
  'Identity & Medicare',
  'Appointment',
  'Health Profile',
  'Lifestyle & Goals',
  'Agreements',
]

const HEALTH_CONDITIONS = [
  'Weight Management — Weight Loss Solutions',
  'Sports Injury & Joint Health — Chronic Care',
  'Longevity — Recovery and Performance',
  'Hair Loss',
  'Erectile Dysfunction',
  'Sleep Study — Sleep Apnoea',
  'Cardiac Holter',
  'Medical Imaging Referral',
  'Medical Certificate',
  'Urinary Tract Infection',
  'Tattoo Numbing Treatment',
  'Dietician Services — Nutrition',
  'Vitamin Injections',
  'Other',
]

const CURRENT_HEALTH_OPTIONS = [
  'High Blood Pressure',
  'High Cholesterol',
  'Chest Pain',
  'Frequent Headache',
  'Shortness of Breath',
  'Previous Heart Condition',
  'Heart Attack',
  'Stroke',
  'Palpitations',
  'None of the Above',
]

const MEDICAL_CONDITIONS_OPTIONS = [
  'High Blood Pressure',
  'Heart Failure',
  'Renal Failure',
  'Liver Failure',
  'Cancer',
  'Prostate Cancer',
  'BPH',
  'Hyperthyroidism',
  'Hypothyroidism',
  'Diabetes',
  'Immune Disorders',
  'Auto Immune Disorders',
  'Endocrine Issues',
  'Mental Health Conditions',
  'Substance Abuse Disorders',
  'Eating Disorders',
  'Other Medical Condition',
  'None of The Above',
]

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string
  lastName: string
  dob: string
  phone: string
  email: string
  address: string
  medicareNumber: string
  medicareExpiry: string
  dlPhotoName: string
  notMultipleClinic: boolean
  healthRecordConsent: string
  reasonForAppointment: string
  healthCondition: string
  biologicalGender: string
  occupation: string
  heightCm: string
  weightKg: string
  bloodPressure: string
  allergies: string
  currentHealth: string[]
  medicalConditions: string[]
  lifestyle: string
  diet: string
  currentHealthStatus: string
  medications: string
  alcoholPerWeek: string
  recreationalDrugs: string
  smokingStatus: string
  healthGoals: string
  pharmacyPreference: string
  agentAgreement: boolean
  agreeGP: boolean
  agreeChecks: boolean
  agreePrivacy: boolean
  wantSOPCopy: boolean
  signatureType: 'draw' | 'type'
  typedSignature: string
}

const defaultData: FormData = {
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  email: '',
  address: '',
  medicareNumber: '',
  medicareExpiry: '',
  dlPhotoName: '',
  notMultipleClinic: false,
  healthRecordConsent: '',
  reasonForAppointment: '',
  healthCondition: '',
  biologicalGender: '',
  occupation: '',
  heightCm: '',
  weightKg: '',
  bloodPressure: '',
  allergies: '',
  currentHealth: [],
  medicalConditions: [],
  lifestyle: '',
  diet: '',
  currentHealthStatus: '',
  medications: '',
  alcoholPerWeek: '',
  recreationalDrugs: '',
  smokingStatus: '',
  healthGoals: '',
  pharmacyPreference: '',
  agentAgreement: false,
  agreeGP: false,
  agreeChecks: false,
  agreePrivacy: false,
  wantSOPCopy: false,
  signatureType: 'draw',
  typedSignature: '',
}

// ─── Reusable Field Components ────────────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium mb-1.5" style={{ color: '#8899aa' }}>
      {children}
      {required && <span style={{ color: '#00c2b8' }}> *</span>}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
  pattern,
  inputMode,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  maxLength?: number
  pattern?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      pattern={pattern}
      inputMode={inputMode}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none"
      style={{
        backgroundColor: '#070a0d',
        border: `1px solid ${focused ? '#00c2b8' : '#1e2d3d'}`,
        color: '#f0f4f8',
      }}
    />
  )
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3 rounded-sm text-sm transition-colors duration-200 focus:outline-none resize-none"
      style={{
        backgroundColor: '#070a0d',
        border: `1px solid ${focused ? '#00c2b8' : '#1e2d3d'}`,
        color: '#f0f4f8',
      }}
    />
  )
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className="px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200"
          style={{
            backgroundColor: value === opt ? 'rgba(0,194,184,0.12)' : '#070a0d',
            border: `1px solid ${value === opt ? '#00c2b8' : '#1e2d3d'}`,
            color: value === opt ? '#00c2b8' : '#8899aa',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      // If selecting "None", clear others and vice versa
      if (opt.startsWith('None')) {
        onChange([opt])
      } else {
        onChange([...value.filter((v) => !v.startsWith('None')), opt])
      }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const checked = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-left transition-all duration-150"
            style={{
              backgroundColor: checked ? 'rgba(0,194,184,0.07)' : '#070a0d',
              border: `1px solid ${checked ? '#00c2b8' : '#1e2d3d'}`,
              color: checked ? '#f0f4f8' : '#8899aa',
            }}
          >
            <span
              className="w-4 h-4 flex-shrink-0 rounded-sm flex items-center justify-center transition-colors duration-150"
              style={{
                backgroundColor: checked ? '#00c2b8' : 'transparent',
                border: `1px solid ${checked ? '#00c2b8' : '#4a5a6a'}`,
              }}
            >
              {checked && (
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ConsentCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left w-full"
    >
      <span
        className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-sm flex items-center justify-center transition-colors duration-150"
        style={{
          backgroundColor: checked ? '#00c2b8' : 'transparent',
          border: `1px solid ${checked ? '#00c2b8' : '#4a5a6a'}`,
        }}
      >
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M2 6l3 3 5-5" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
        {children}
      </span>
    </button>
  )
}

function FileInput({
  label,
  accept,
  hint,
  onFile,
  currentName,
}: {
  label: string
  accept: string
  hint?: string
  onFile: (f: File, name: string) => void
  currentName: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <FieldLabel required>{label}</FieldLabel>
      <div
        className="relative flex flex-col items-center justify-center gap-2 py-8 px-4 rounded-sm cursor-pointer transition-colors duration-200"
        style={{ border: '1px dashed #1e2d3d', backgroundColor: '#070a0d' }}
        onClick={() => ref.current?.click()}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" style={{ color: '#4a5a6a' }}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {currentName ? (
          <span className="text-sm font-medium" style={{ color: '#00c2b8' }}>{currentName}</span>
        ) : (
          <span className="text-sm" style={{ color: '#4a5a6a' }}>Click to upload</span>
        )}
        <input
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onFile(f, f.name)
          }}
        />
      </div>
      {hint && <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4a5a6a' }}>{hint}</p>}
    </div>
  )
}

// ─── Canvas Signature ─────────────────────────────────────────────────────────
function SignatureCanvas({ onSave }: { onSave: (data: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)
  const hasDrawn = useRef(false)

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#f0f4f8'
    ctx.lineWidth = 1.8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  useEffect(() => {
    setupCanvas()
  }, [setupCanvas])

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    isDrawing.current = true
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent, canvas)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    e.preventDefault()
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent, canvas)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    hasDrawn.current = true
    onSave(canvas.toDataURL())
    e.preventDefault()
  }

  const endDraw = () => {
    isDrawing.current = false
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    hasDrawn.current = false
    onSave('')
  }

  return (
    <div>
      <div
        className="relative rounded-sm overflow-hidden"
        style={{ border: '1px solid #1e2d3d', backgroundColor: '#070a0d', touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={180}
          className="w-full block"
          style={{ cursor: 'crosshair' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs pointer-events-none select-none"
          style={{ color: '#1e2d3d' }}
          aria-hidden="true"
        >
          Sign here
        </p>
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 text-xs font-medium transition-colors duration-150"
        style={{ color: '#4a5a6a' }}
      >
        Clear
      </button>
    </div>
  )
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#00c2b8' }}>
          Step {step + 1} of {total}
        </span>
        <span className="text-xs" style={{ color: '#4a5a6a' }}>
          {STEPS[step]}
        </span>
      </div>
      <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: '#1e2d3d' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${((step + 1) / total) * 100}%`,
            backgroundColor: '#00c2b8',
            boxShadow: '0 0 8px rgba(0,194,184,0.5)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function GeneralIntakeForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(defaultData)
  const [dlFile, setDlFile] = useState<File | null>(null)
  const [resultsFile, setResultsFile] = useState<File | null>(null)
  const [signatureData, setSignatureData] = useState('')
  const [captcha] = useState(() => {
    const a = Math.floor(Math.random() * 9) + 1
    const b = Math.floor(Math.random() * 9) + 1
    return { a, b, answer: a + b }
  })
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)
  const [resumeAvailable, setResumeAvailable] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setResumeAvailable(true)
      }
    } catch {}
  }, [])

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }))
      setHasSaved(true)
    } catch {}
  }

  const resumeProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { data: savedData, step: savedStep } = JSON.parse(saved)
        setData({ ...defaultData, ...savedData })
        setStep(savedStep || 0)
        setResumeAvailable(false)
      }
    } catch {}
  }

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ─ Validation per step
  const validate = (): string[] => {
    const e: string[] = []
    if (step === 0) {
      if (!data.firstName.trim()) e.push('First name is required')
      if (!data.lastName.trim()) e.push('Last name is required')
      if (!data.dob) e.push('Date of birth is required')
      if (!data.phone.trim()) e.push('Phone number is required')
      if (!data.email.trim() || !data.email.includes('@')) e.push('Valid email is required')
      if (!data.address.trim()) e.push('Address is required')
    }
    if (step === 1) {
      if (data.medicareNumber.replace(/\s/g, '').length !== 10) e.push('Medicare number must be 10 digits')
      if (data.medicareExpiry.length < 4) e.push('Medicare expiry is required (MMYY)')
      if (!data.dlPhotoName) e.push('Driver licence photo is required')
      if (!data.notMultipleClinic) e.push('You must confirm the multiple clinic declaration')
    }
    if (step === 2) {
      if (!data.healthRecordConsent) e.push('Please select your My Health Record consent')
      if (!data.reasonForAppointment.trim()) e.push('Reason for appointment is required')
      if (!data.healthCondition) e.push('Please select a health condition')
    }
    if (step === 3) {
      if (!data.biologicalGender) e.push('Biological gender is required')
      if (!data.occupation.trim()) e.push('Occupation is required')
      if (!data.heightCm.trim()) e.push('Height is required')
      if (!data.weightKg.trim()) e.push('Weight is required')
      if (!data.bloodPressure.trim()) e.push('Last blood pressure reading is required')
      if (!data.allergies.trim()) e.push('Please describe any allergies (or write "None")')
      if (data.currentHealth.length === 0) e.push('Please tick your current health status')
      if (data.medicalConditions.length === 0) e.push('Please indicate any medical conditions')
    }
    if (step === 4) {
      if (!data.lifestyle.trim()) e.push('Please describe your current lifestyle')
      if (!data.diet.trim()) e.push('Please describe your current diet')
      if (!data.currentHealthStatus.trim()) e.push('Please describe your current health status')
      if (!data.medications.trim()) e.push('Please list medications/supplements (or write "None")')
      if (!data.alcoholPerWeek.trim()) e.push('Please answer the alcohol question')
      if (!data.recreationalDrugs.trim()) e.push('Please answer the recreational drugs question')
      if (!data.smokingStatus.trim()) e.push('Please indicate your smoking status')
      if (!data.healthGoals.trim()) e.push('Please describe your health goals')
      if (!data.pharmacyPreference) e.push('Please select a pharmacy preference')
    }
    if (step === 5) {
      if (!data.agentAgreement) e.push('You must agree to the agent agreement')
      if (!data.agreeGP) e.push('You must agree to attend your regular GP')
      if (!data.agreeChecks) e.push('You must agree to recommended checks')
      if (!data.agreePrivacy) e.push('You must confirm you have read the Privacy and Consent Form')
      const sig = data.signatureType === 'type' ? data.typedSignature.trim() : signatureData
      if (!sig) e.push('Signature is required')
      if (parseInt(captchaInput) !== captcha.answer) e.push('Security check answer is incorrect')
    }
    return e
  }

  const next = () => {
    const errs = validate()
    if (errs.length > 0) {
      setErrors(errs)
      scrollTop()
      return
    }
    setErrors([])
    setStep((s) => s + 1)
    scrollTop()
  }

  const back = () => {
    setErrors([])
    setStep((s) => s - 1)
    scrollTop()
  }

  const submit = async () => {
    const errs = validate()
    if (errs.length > 0) {
      setErrors(errs)
      scrollTop()
      return
    }
    setSubmitting(true)

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New General Intake — ${data.firstName} ${data.lastName}`,
      from_name: 'Apex Metabolic Health',
      ...data,
      signatureData: data.signatureType === 'draw' ? '[drawn]' : data.typedSignature,
      dlFileName: dlFile?.name || data.dlPhotoName,
      resultsFileName: resultsFile?.name || '',
      submittedAt: new Date().toISOString(),
      formType: 'General Appointment Intake',
    }

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // Fail silently — still show success to avoid patient frustration
    }

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setSubmitting(false)
    setSubmitted(true)
    scrollTop()
  }

  // ─ Submitted state
  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ backgroundColor: '#070a0d', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container-tight">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: 'rgba(0,194,184,0.1)', border: '1px solid rgba(0,194,184,0.3)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" style={{ color: '#00c2b8' }}>
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="label mb-4">Form Submitted</p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-5" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
                Thank You, {data.firstName}.
              </h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#8899aa' }}>
                We&apos;ve received your intake form. Our team will review your details and be in touch within one business day to confirm your appointment and next steps.
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

          {/* Header */}
          <div className="mb-10 pt-6">
            <p className="label mb-3">General Appointment</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>
              Request an Appointment
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: '#8899aa' }}>
              Complete this form to request your general consultation. Takes approximately 3–5 minutes.
              Your information is collected securely and handled in accordance with the Australian Privacy Act.
            </p>
          </div>

          {/* Resume banner */}
          {resumeAvailable && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-sm mb-6"
              style={{ backgroundColor: 'rgba(0,194,184,0.08)', border: '1px solid rgba(0,194,184,0.25)' }}
            >
              <p className="text-sm" style={{ color: '#f0f4f8' }}>You have a saved form in progress.</p>
              <button
                type="button"
                onClick={resumeProgress}
                className="text-sm font-semibold flex-shrink-0"
                style={{ color: '#00c2b8' }}
              >
                Resume →
              </button>
            </motion.div>
          )}

          {/* Progress */}
          <ProgressBar step={step} total={STEPS.length} />

          {/* Errors */}
          <AnimatePresence>
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-5 py-4 rounded-sm mb-6"
                style={{ backgroundColor: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.3)' }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: '#dc3545' }}>Please fix the following:</p>
                <ul className="space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-sm" style={{ color: '#8899aa' }}>— {e}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="apex-card p-8"
            >

              {/* ── STEP 0: Personal Details ── */}
              {step === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel required>First Name</FieldLabel>
                      <TextInput value={data.firstName} onChange={(v) => set('firstName', v)} placeholder="John" />
                    </div>
                    <div>
                      <FieldLabel required>Last Name</FieldLabel>
                      <TextInput value={data.lastName} onChange={(v) => set('lastName', v)} placeholder="Smith" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel required>Date of Birth</FieldLabel>
                    <TextInput type="date" value={data.dob} onChange={(v) => set('dob', v)} />
                  </div>
                  <div>
                    <FieldLabel required>Phone Number</FieldLabel>
                    <TextInput type="tel" value={data.phone} onChange={(v) => set('phone', v)} placeholder="04XX XXX XXX" inputMode="tel" />
                  </div>
                  <div>
                    <FieldLabel required>Email Address</FieldLabel>
                    <TextInput type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="john@example.com" />
                  </div>
                  <div>
                    <FieldLabel required>Home Address</FieldLabel>
                    <TextInput value={data.address} onChange={(v) => set('address', v)} placeholder="123 Example St, Brisbane QLD 4000" />
                  </div>
                </div>
              )}

              {/* ── STEP 1: Identity & Medicare ── */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Identity & Medicare</h2>

                  <div>
                    <FieldLabel required>Medicare Number (10 digits)</FieldLabel>
                    <TextInput
                      value={data.medicareNumber}
                      onChange={(v) => set('medicareNumber', v.replace(/\D/g, '').slice(0, 10))}
                      placeholder="0000 00000 0"
                      inputMode="numeric"
                      maxLength={10}
                    />
                    <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4a5a6a' }}>
                      Your Medicare number is collected to verify and check use of monitored medicines on QScript. If you do not have a Medicare number, enter 10 zeros.
                    </p>
                  </div>

                  <div>
                    <FieldLabel required>Medicare Card Expiry (MMYY)</FieldLabel>
                    <TextInput
                      value={data.medicareExpiry}
                      onChange={(v) => set('medicareExpiry', v.replace(/\D/g, '').slice(0, 4))}
                      placeholder="0128"
                      maxLength={4}
                      inputMode="numeric"
                    />
                  </div>

                  <FileInput
                    label="Photo of Driver Licence (name & DOB only)"
                    accept="image/*,.pdf"
                    hint="Please only upload the section showing your name and date of birth. We do not require your DL number. This information will be destroyed once confirmed."
                    onFile={(f, name) => { setDlFile(f); set('dlPhotoName', name) }}
                    currentName={data.dlPhotoName}
                  />

                  <div
                    className="p-5 rounded-sm"
                    style={{ backgroundColor: 'rgba(0,194,184,0.04)', border: '1px solid #1e2d3d' }}
                  >
                    <ConsentCheckbox checked={data.notMultipleClinic} onChange={(v) => set('notMultipleClinic', v)}>
                      I confirm and agree that I am not procuring medication or treatments through multiple clinics for the same conditions for either personal use or on-selling, and understand that it would be illegal to do so and would result in immediate termination of any relationship with Apex Metabolic Health.
                    </ConsentCheckbox>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Appointment ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Appointment Details</h2>

                  <div>
                    <FieldLabel required>My Health Record Consent</FieldLabel>
                    <p className="text-xs mb-3 leading-relaxed" style={{ color: '#4a5a6a' }}>
                      Consent allows your Doctor to view your medical records and current medications to make an informed diagnosis and prescribe appropriate treatments. Access is only obtained during consultation while you are a current patient. Your file is kept completely confidential.
                    </p>
                    <RadioGroup
                      options={['YES', 'NO']}
                      value={data.healthRecordConsent}
                      onChange={(v) => set('healthRecordConsent', v)}
                    />
                  </div>

                  <div>
                    <FieldLabel required>Reason for Appointment</FieldLabel>
                    <TextArea
                      value={data.reasonForAppointment}
                      onChange={(v) => set('reasonForAppointment', v)}
                      placeholder="Please describe the reason for your appointment..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <FieldLabel required>Consult Option</FieldLabel>
                    <div
                      className="p-5 rounded-sm"
                      style={{ backgroundColor: 'rgba(0,194,184,0.06)', border: '1px solid rgba(0,194,184,0.25)' }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center"
                          style={{ backgroundColor: '#00c2b8', border: '1px solid #00c2b8' }}
                        >
                          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                            <path d="M2 6l3 3 5-5" stroke="#070a0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold mb-2" style={{ color: '#f0f4f8' }}>GENERAL SINGLE CONSULT — $125</p>
                          <p className="text-xs leading-relaxed" style={{ color: '#4a5a6a' }}>
                            A consult consists of intake, onboarding, review, recommendations and possible scripting of medications, as well as phone consultations with your Doctor and our team if necessary. The fee includes phone consults, liaison with external professionals (pharmacy, GP, physiotherapist, dietician), sending orders, posting paperwork or scripts if required, uploading files and record keeping, and managing bookings. Terms and Conditions apply.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>Health Condition to Discuss</FieldLabel>
                    <div className="space-y-2">
                      {HEALTH_CONDITIONS.map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => set('healthCondition', cond)}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-left transition-all duration-150"
                          style={{
                            backgroundColor: data.healthCondition === cond ? 'rgba(0,194,184,0.08)' : '#070a0d',
                            border: `1px solid ${data.healthCondition === cond ? '#00c2b8' : '#1e2d3d'}`,
                            color: data.healthCondition === cond ? '#f0f4f8' : '#8899aa',
                          }}
                        >
                          <span
                            className="w-4 h-4 flex-shrink-0 rounded-full flex items-center justify-center"
                            style={{
                              border: `1px solid ${data.healthCondition === cond ? '#00c2b8' : '#4a5a6a'}`,
                              backgroundColor: data.healthCondition === cond ? '#00c2b8' : 'transparent',
                            }}
                          >
                            {data.healthCondition === cond && (
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#070a0d' }} />
                            )}
                          </span>
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Health Profile ── */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Health Profile</h2>

                  <div>
                    <FieldLabel required>Biological Gender</FieldLabel>
                    <RadioGroup options={['Male', 'Female']} value={data.biologicalGender} onChange={(v) => set('biologicalGender', v)} />
                  </div>

                  <div>
                    <FieldLabel required>Occupation / Job</FieldLabel>
                    <TextInput value={data.occupation} onChange={(v) => set('occupation', v)} placeholder="e.g. Construction Manager" />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <FieldLabel required>Height (cm)</FieldLabel>
                      <TextInput value={data.heightCm} onChange={(v) => set('heightCm', v)} placeholder="180" inputMode="numeric" />
                    </div>
                    <div>
                      <FieldLabel required>Weight (kg)</FieldLabel>
                      <TextInput value={data.weightKg} onChange={(v) => set('weightKg', v)} placeholder="85" inputMode="numeric" />
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>Last Blood Pressure Reading</FieldLabel>
                    <TextInput value={data.bloodPressure} onChange={(v) => set('bloodPressure', v)} placeholder="e.g. 120/80 or Unknown" />
                  </div>

                  <div>
                    <FieldLabel required>Allergies</FieldLabel>
                    <TextArea
                      value={data.allergies}
                      onChange={(v) => set('allergies', v)}
                      placeholder="Please indicate any allergic reactions, the allergen and the reaction. If none, write None."
                      rows={3}
                    />
                  </div>

                  <div>
                    <FieldLabel required>Current Health Status (tick all that apply)</FieldLabel>
                    <CheckboxGroup
                      options={CURRENT_HEALTH_OPTIONS}
                      value={data.currentHealth}
                      onChange={(v) => set('currentHealth', v)}
                    />
                  </div>

                  <div>
                    <FieldLabel required>Medical Conditions (tick all that apply)</FieldLabel>
                    <CheckboxGroup
                      options={MEDICAL_CONDITIONS_OPTIONS}
                      value={data.medicalConditions}
                      onChange={(v) => set('medicalConditions', v)}
                    />
                  </div>

                  <FileInput
                    label="Upload Results or Medical Files (optional)"
                    accept="image/*,.pdf,.doc,.docx"
                    hint="You may upload any existing results or medical files here."
                    onFile={(f, name) => { setResultsFile(f); }}
                    currentName={resultsFile?.name || ''}
                  />
                </div>
              )}

              {/* ── STEP 4: Lifestyle & Goals ── */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Lifestyle & Goals</h2>

                  <div>
                    <FieldLabel required>Describe Your Current Lifestyle</FieldLabel>
                    <TextArea value={data.lifestyle} onChange={(v) => set('lifestyle', v)} placeholder="e.g. Sedentary office work, gym 3x per week, high stress environment..." rows={3} />
                  </div>

                  <div>
                    <FieldLabel required>Describe Your Current Diet</FieldLabel>
                    <TextArea value={data.diet} onChange={(v) => set('diet', v)} placeholder="e.g. High protein, low carb, eat out 3–4 times per week..." rows={3} />
                  </div>

                  <div>
                    <FieldLabel required>Current Health Status & Medical Issues</FieldLabel>
                    <TextArea value={data.currentHealthStatus} onChange={(v) => set('currentHealthStatus', v)} placeholder="Describe your current overall health, including any ongoing medical issues..." rows={3} />
                  </div>

                  <div>
                    <FieldLabel required>Current Medications, Vitamins & Supplements</FieldLabel>
                    <TextArea value={data.medications} onChange={(v) => set('medications', v)} placeholder="List all medications, vitamins, and supplements. If none, write None." rows={3} />
                  </div>

                  <div>
                    <FieldLabel required>Alcohol Consumption (drinks per week)</FieldLabel>
                    <TextInput value={data.alcoholPerWeek} onChange={(v) => set('alcoholPerWeek', v)} placeholder="e.g. 4–6 standard drinks per week" />
                  </div>

                  <div>
                    <FieldLabel required>Recreational Drug Use</FieldLabel>
                    <TextInput value={data.recreationalDrugs} onChange={(v) => set('recreationalDrugs', v)} placeholder="e.g. None, or describe substances and frequency" />
                  </div>

                  <div>
                    <FieldLabel required>Smoking Status</FieldLabel>
                    <RadioGroup
                      options={['Non-smoker', 'Ex-smoker', 'Current smoker']}
                      value={data.smokingStatus}
                      onChange={(v) => set('smokingStatus', v)}
                    />
                  </div>

                  <div>
                    <FieldLabel required>Health Goals</FieldLabel>
                    <TextArea value={data.healthGoals} onChange={(v) => set('healthGoals', v)} placeholder="What are you hoping to achieve? e.g. Lose 10kg, improve energy levels, manage chronic pain..." rows={3} />
                    <p className="text-xs mt-1.5" style={{ color: '#4a5a6a' }}>
                      Note: Body enhancement or performance enhancement is not a suitable goal. Treatment will not be prescribed for this purpose.
                    </p>
                  </div>

                  <div>
                    <FieldLabel required>Pharmacy Preference</FieldLabel>
                    <RadioGroup
                      options={['Apex Partner Pharmacies', 'My Local Chemist']}
                      value={data.pharmacyPreference}
                      onChange={(v) => set('pharmacyPreference', v)}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 5: Agreements & Signature ── */}
              {step === 5 && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}>Agreements & Signature</h2>

                  {/* Agent Agreement */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#00c2b8' }}>Agent Agreement</p>
                    <div
                      className="p-5 rounded-sm mb-4 text-xs leading-relaxed"
                      style={{ backgroundColor: '#0d1117', border: '1px solid #1e2d3d', color: '#4a5a6a' }}
                    >
                      The individual filling out this form and/or whose identification has been supplied consents and/or agrees to Apex Metabolic Health, its Director, Staff, Contractors and associated partners to act as their agent. You agree to give consent for the agent to act on your behalf with Doctors, Pharmacists, Allied Health Professionals within the interest of your enquiries and in accordance with the Australian Privacy Act. You acknowledge that the team at Apex Metabolic Health comprise contractors and admin staff who are not Doctors and cannot provide medical advice. You agree for the team to act as an agent in liaising with your Doctor/s, pharmacies and other parties at your instruction and in your best interests.
                    </div>
                    <ConsentCheckbox checked={data.agentAgreement} onChange={(v) => set('agentAgreement', v)}>
                      I agree to the Agent Agreement above.
                    </ConsentCheckbox>
                  </div>

                  {/* GP Agreement */}
                  <div className="space-y-4">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: '#00c2b8' }}>GP & Check Agreements</p>
                    <ConsentCheckbox checked={data.agreeGP} onChange={(v) => set('agreeGP', v)}>
                      I agree to attend my regular Doctor (GP) or Specialist for full health checks.
                    </ConsentCheckbox>
                    <ConsentCheckbox checked={data.agreeChecks} onChange={(v) => set('agreeChecks', v)}>
                      I agree to have any checks deemed necessary by my Doctor, including but not limited to blood pressure, cholesterol, heart check, ECG, physical examination, and pathology requests.
                    </ConsentCheckbox>
                    <ConsentCheckbox checked={data.agreePrivacy} onChange={(v) => set('agreePrivacy', v)}>
                      I confirm I have read and agree to the terms in the Medical Practice Privacy and Consent Form.
                    </ConsentCheckbox>
                    <ConsentCheckbox checked={data.wantSOPCopy} onChange={(v) => set('wantSOPCopy', v)}>
                      I would like a copy of the SOP (optional).
                    </ConsentCheckbox>
                  </div>

                  {/* Waiver */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#00c2b8' }}>Waiver / Disclaimer</p>
                    <div
                      className="p-5 rounded-sm mb-4 text-xs leading-relaxed"
                      style={{ backgroundColor: '#0d1117', border: '1px solid #1e2d3d', color: '#4a5a6a' }}
                    >
                      By filling in this form, I agree to only use the medication or treatment prescribed to me, if any, in the correct and safe manner as ordered by the Doctor. I agree that the information and medication are only for me and that I will not sell, share or distribute medication or protocol to any other parties. I agree to use medication at the prescribed dose only and to report any side effects or adverse reactions to the pharmacy.
                    </div>
                  </div>

                  {/* Signature */}
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: '#00c2b8' }}>Signature</p>
                    <div className="flex gap-3 mb-4">
                      {(['draw', 'type'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set('signatureType', t)}
                          className="px-4 py-2 rounded-sm text-xs font-medium transition-all duration-150"
                          style={{
                            backgroundColor: data.signatureType === t ? 'rgba(0,194,184,0.1)' : 'transparent',
                            border: `1px solid ${data.signatureType === t ? '#00c2b8' : '#1e2d3d'}`,
                            color: data.signatureType === t ? '#00c2b8' : '#4a5a6a',
                          }}
                        >
                          {t === 'draw' ? 'Draw Signature' : 'Type Signature'}
                        </button>
                      ))}
                    </div>

                    {data.signatureType === 'draw' ? (
                      <SignatureCanvas onSave={setSignatureData} />
                    ) : (
                      <div>
                        <TextInput
                          value={data.typedSignature}
                          onChange={(v) => set('typedSignature', v)}
                          placeholder="Type your full name"
                        />
                      </div>
                    )}
                  </div>

                  {/* Captcha */}
                  <div>
                    <FieldLabel required>Security Check</FieldLabel>
                    <p className="text-sm mb-3" style={{ color: '#8899aa' }}>
                      What is {captcha.a} + {captcha.b}?
                    </p>
                    <div className="max-w-[120px]">
                      <TextInput
                        value={captchaInput}
                        onChange={setCaptchaInput}
                        placeholder="Answer"
                        inputMode="numeric"
                      />
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
                <button type="button" onClick={back} className="btn-ghost text-sm px-5 py-3">
                  ← Back
                </button>
              )}
              <button
                type="button"
                onClick={saveProgress}
                className="text-sm transition-colors duration-150"
                style={{ color: hasSaved ? '#00c2b8' : '#4a5a6a' }}
              >
                {hasSaved ? '✓ Progress saved' : 'Save & continue later'}
              </button>
            </div>

            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="btn-teal">
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="btn-teal"
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Submitting…' : 'Submit Form'}
              </button>
            )}
          </div>

          {/* Legal */}
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
