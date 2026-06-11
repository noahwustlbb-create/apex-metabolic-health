'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ENQUIRY_LABELS, type EnquiryType } from '@/lib/intake-routing'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

const CONTRAINDICATIONS = [
  { id: 'prostate_cancer', label: 'Personal history of prostate or breast cancer' },
  { id: 'cardiovascular', label: 'Active cardiovascular event (current chest pain, recent heart attack or stroke)' },
  { id: 'pregnancy', label: 'Currently pregnant or breastfeeding' },
]

const AU_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

interface FormData {
  firstName: string
  lastName: string
  dob: string
  email: string
  phone: string
  state: string
  sex: string
  enquiry: EnquiryType | ''
  medications: string
  contraindications: string[]
  hasBloods: boolean | null
}

function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)' }}>
        {label}{required && <span style={{ color: ACCENT }}> *</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full px-4 py-3 rounded-sm text-sm outline-none transition-all duration-150"
        style={{
          background: 'rgba(72,144,247,0.04)',
          border: `1px solid ${focused ? ACCENT : 'rgba(72,144,247,0.18)'}`,
          color: 'var(--text-primary)',
        }}
      />
    </div>
  )
}

export default function IntakeForm() {
  const router = useRouter()
  const [data, setData] = useState<FormData>({
    firstName: '', lastName: '', dob: '', email: '', phone: '',
    state: '', sex: '', enquiry: '', medications: '', contraindications: [], hasBloods: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const [disqualified, setDisqualified] = useState(false)
  const [error, setError] = useState('')

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData(p => ({ ...p, [k]: v }))

  const toggleContra = (id: string) =>
    setData(p => ({
      ...p,
      contraindications: p.contraindications.includes(id)
        ? p.contraindications.filter(x => x !== id)
        : [...p.contraindications, id],
    }))

  const validate = () => {
    if (!data.firstName.trim()) return 'First name is required'
    if (!data.lastName.trim()) return 'Last name is required'
    if (!data.dob) return 'Date of birth is required'
    if (!data.email.trim() || !data.email.includes('@')) return 'Valid email is required'
    if (!data.phone.trim()) return 'Phone number is required'
    if (!data.state) return 'State is required'
    if (!data.sex) return 'Biological sex is required'
    if (!data.enquiry) return 'Please select a reason for enquiry'
    if (data.hasBloods === null) return 'Please indicate whether you have existing blood results'
    return null
  }

  const submit = async () => {
    if (data.contraindications.length > 0) {
      setDisqualified(true)
      return
    }
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setSubmitting(true)

    try {
      // Store intake data for the checkout page (no sensitive clinical data in URL)
      sessionStorage.setItem('apex_intake', JSON.stringify(data))

      // Fire-and-forget to Web3Forms for admin visibility pre-payment
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
          subject: `New Intake — ${data.firstName} ${data.lastName} — ${data.enquiry}`,
          from_name: 'Apex Metabolic Health',
          ...data,
          contraindications: data.contraindications.join(', ') || 'None',
          hasBloods: data.hasBloods ? 'Yes' : 'No',
          formType: 'Streamlined Intake v2',
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => {})

      router.push('/checkout')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (disqualified) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-w-lg"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6"
          style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)' }}>
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M10 6v4M10 14h.01" stroke="#dc3545" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="10" cy="10" r="8" stroke="#dc3545" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#dc3545' }}>
          Unable to proceed online
        </p>
        <h2 className="text-2xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
          We recommend speaking with a doctor directly.
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
          Based on what you&apos;ve indicated, our online intake pathway is not appropriate. Please consult your regular GP or specialist for an in-person review before pursuing telehealth treatment.
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
          If you believe this is an error or have questions, contact us at{' '}
          <a href="mailto:care@apexmetabolichealth.com.au" style={{ color: ACCENT }}>
            care@apexmetabolichealth.com.au
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="w-full max-w-xl"
    >
      <div className="flex flex-col gap-5">

        {/* Name */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} placeholder="James" required />
          <Field label="Last name" value={data.lastName} onChange={v => set('lastName', v)} placeholder="Smith" required />
        </div>

        {/* DOB + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date of birth" type="date" value={data.dob} onChange={v => set('dob', v)} required />
          <Field label="Mobile" type="tel" value={data.phone} onChange={v => set('phone', v)} placeholder="04XX XXX XXX" required />
        </div>

        {/* Email */}
        <Field label="Email" type="email" value={data.email} onChange={v => set('email', v)} placeholder="you@email.com" required />

        {/* State + Sex */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)' }}>
              State <span style={{ color: ACCENT }}>*</span>
            </label>
            <select
              value={data.state} onChange={e => set('state', e.target.value)}
              className="w-full px-4 py-3 rounded-sm text-sm outline-none appearance-none transition-all duration-150"
              style={{ background: 'rgba(72,144,247,0.04)', border: `1px solid rgba(72,144,247,0.18)`, color: data.state ? 'var(--text-primary)' : 'rgba(255,255,255,0.3)' }}
            >
              <option value="" disabled>Select</option>
              {AU_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)' }}>
              Biological sex <span style={{ color: ACCENT }}>*</span>
            </label>
            <div className="flex gap-2">
              {['Male', 'Female'].map(s => (
                <button key={s} type="button" onClick={() => set('sex', s)}
                  className="flex-1 py-3 rounded-sm text-xs font-semibold transition-all duration-150"
                  style={{
                    background: data.sex === s ? 'rgba(72,144,247,0.08)' : 'rgba(72,144,247,0.04)',
                    border: `1px solid ${data.sex === s ? ACCENT : 'rgba(72,144,247,0.18)'}`,
                    color: data.sex === s ? ACCENT : 'var(--text-primary)',
                  }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Enquiry */}
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
            Reason for enquiry <span style={{ color: ACCENT }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(ENQUIRY_LABELS) as [EnquiryType, string][]).map(([key, label]) => (
              <button key={key} type="button" onClick={() => set('enquiry', key)}
                className="px-3.5 py-2 rounded-sm text-xs font-medium transition-all duration-150"
                style={{
                  background: data.enquiry === key ? 'rgba(72,144,247,0.08)' : 'rgba(72,144,247,0.04)',
                  border: `1px solid ${data.enquiry === key ? ACCENT : 'rgba(72,144,247,0.18)'}`,
                  color: data.enquiry === key ? ACCENT : 'var(--text-primary)',
                }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Existing bloods */}
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
            Do you have blood results from the last 3 months? <span style={{ color: ACCENT }}>*</span>
          </label>
          <div className="flex gap-3">
            {[{ label: 'Yes — I have results', val: true }, { label: 'No — I need testing', val: false }].map(opt => (
              <button key={String(opt.val)} type="button" onClick={() => set('hasBloods', opt.val)}
                className="flex-1 py-3 px-4 rounded-sm text-xs font-semibold text-left transition-all duration-150"
                style={{
                  background: data.hasBloods === opt.val ? 'rgba(72,144,247,0.08)' : 'rgba(72,144,247,0.04)',
                  border: `1px solid ${data.hasBloods === opt.val ? ACCENT : 'rgba(72,144,247,0.18)'}`,
                  color: data.hasBloods === opt.val ? ACCENT : 'var(--text-primary)',
                }}>{opt.label}</button>
            ))}
          </div>
          {data.hasBloods === true && (
            <p className="text-xs mt-2" style={{ color: 'var(--text-primary)', opacity: 0.55 }}>
              Email your results to{' '}
              <a href="mailto:care@apexmetabolichealth.com.au" style={{ color: ACCENT }}>
                care@apexmetabolichealth.com.au
              </a>{' '}
              with your full name — your doctor reviews them before your consultation.
            </p>
          )}
        </div>

        {/* Medications */}
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: 'var(--text-primary)' }}>
            Current medications or supplements
            <span className="ml-1 normal-case font-normal tracking-normal opacity-50">(optional)</span>
          </label>
          <textarea
            value={data.medications} onChange={e => set('medications', e.target.value)}
            placeholder="List any current medications, vitamins, or supplements. Write 'none' if not applicable."
            rows={3}
            className="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none transition-all duration-150"
            style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.18)', color: 'var(--text-primary)' }}
          />
        </div>

        {/* Contraindications */}
        <div>
          <label className="block text-xs font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: 'var(--text-primary)' }}>
            Safety check — select any that apply
          </label>
          <p className="text-[11px] mb-3" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
            If any of the following apply, we may be unable to proceed with online treatment.
          </p>
          <div className="flex flex-col gap-2">
            {CONTRAINDICATIONS.map(c => (
              <label key={c.id} className="flex items-start gap-3 cursor-pointer">
                <button
                  type="button" onClick={() => toggleContra(c.id)}
                  className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center mt-0.5 transition-all duration-150"
                  style={{
                    background: data.contraindications.includes(c.id) ? ACCENT : 'rgba(72,144,247,0.04)',
                    border: `1px solid ${data.contraindications.includes(c.id) ? ACCENT : 'rgba(72,144,247,0.25)'}`,
                  }}
                >
                  {data.contraindications.includes(c.id) && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-sm px-4 py-3 rounded-sm"
              style={{ color: '#dc3545', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)' }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="button" onClick={submit} disabled={submitting}
          className="w-full py-4 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200"
          style={{ background: ACCENT, color: '#fff', opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? 'One moment…' : 'Continue to payment →'}
        </button>

        <p className="text-[11px] text-center" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
          All consultations conducted by AHPRA-registered medical practitioners.
          This form does not constitute a diagnosis or guarantee of treatment.
        </p>
      </div>
    </motion.div>
  )
}
