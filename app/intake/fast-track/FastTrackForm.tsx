'use client'

import { useState, Suspense, useId } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, ChevronRight, ArrowLeft } from 'lucide-react'

type SelectField    = { key: string; label: string; type: 'select';      options: string[]; helper?: string; optional?: boolean }
type MultiField     = { key: string; label: string; type: 'multiselect'; options: string[]; helper?: string }
type DateField      = { key: string; label: string; type: 'date';        helper?: string }
type TextareaField  = { key: string; label: string; type: 'textarea';    optional?: boolean }
type ExtraField     = SelectField | MultiField | DateField | TextareaField

type Program = {
  title: string
  eyebrow: string
  heading: [string, string]
  sub: string
  fields: string[]
  extra: ExtraField[]
  cta: string
  trust: string[]
  isOrderForm?: boolean
}

const PROGRAMS: Record<string, Program> = {
  hormone: {
    title: 'Hormone Optimisation',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['Feel like yourself.', 'Backed by data.'],
    sub: "Low energy, low drive, low motivation aren't things to just push through. Tell us what's going on and we'll get you in front of a doctor.",
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'symptoms', label: "WHAT'S BEEN OFF LATELY?", type: 'multiselect', options: ['Low energy', 'Low libido', 'Mood / motivation', 'Poor sleep', 'Muscle loss'], helper: 'Select all that apply.' },
      { key: 'currentTrt', label: 'ARE YOU CURRENTLY ON HORMONE THERAPY?', type: 'select', options: ['Yes, currently on treatment', 'No, never been on treatment', 'Used to be, not currently'] },
      { key: 'bloods', label: 'HAVE YOU HAD BLOOD WORK DONE RECENTLY?', type: 'select', options: ["Yes, recently", "No, it's been a while", 'Never had bloods'], helper: 'Helps our doctors prepare before your first consultation.' },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  weightloss: {
    title: 'Weight Loss & Metabolic',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['A metabolic reset.', 'Doctor-led.'],
    sub: "Real results come from understanding your biology, not counting calories. Tell us about yourself and we'll take it from there.",
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'triedGlp1', label: 'HAVE YOU USED A PRESCRIPTION WEIGHT LOSS MEDICATION BEFORE?', type: 'select', options: ['Yes, currently using one', 'Yes, in the past', 'No, never'] },
      { key: 'goal', label: "WHAT'S YOUR MAIN GOAL?", type: 'select', options: ['Lose weight', 'Improve metabolic health markers', 'Both'] },
      { key: 'bloods', label: 'HAVE YOU HAD BLOOD WORK DONE RECENTLY?', type: 'select', options: ["Yes, recently", "No, it's been a while", 'Never had bloods'], helper: 'Helps our doctors prepare before your first consultation.' },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  sexual: {
    title: 'Sexual Health',
    eyebrow: 'FAST TRACK ENQUIRY · CONFIDENTIAL',
    heading: ['Private. Judgment-free.', 'Doctor-led.'],
    sub: 'A confidential, doctor-led conversation about sexual health, on your terms. Tell us what\'s going on.',
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'concern', label: 'WHAT WOULD YOU LIKE TO DISCUSS?', type: 'select', options: ['Performance / function', 'STI testing or treatment', 'Libido or desire', 'General sexual health check-in'] },
      { key: 'triedBefore', label: 'HAVE YOU BEEN TREATED FOR THIS BEFORE?', type: 'select', options: ['Yes, currently treated', 'Yes, in the past', 'No, first time seeking help'] },
    ],
    cta: 'Request My Confidential Consult',
    trust: ['AHPRA-registered doctors', '100% confidential', '24hr response'],
  },
  recovery: {
    title: 'Recovery & Injury Repair',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['Recover faster.', 'Train harder.'],
    sub: "Peptide therapy designed around the injury, not a generic protocol. Tell us what you're dealing with.",
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'injuryArea', label: 'WHAT ARE YOU DEALING WITH?', type: 'select', options: ['Joint pain / injury', 'Tendon or ligament injury', 'Muscle strain or tear', 'Post-surgical recovery', 'General recovery / performance'] },
      { key: 'duration', label: 'HOW LONG HAS THIS BEEN GOING ON?', type: 'select', options: ['Less than 2 weeks', '2 weeks – 3 months', 'More than 3 months'] },
      { key: 'training', label: 'ARE YOU CURRENTLY TRAINING?', type: 'select', options: ['Yes, training through it', 'Modified training', 'Not training at all'] },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  antiageing: {
    title: 'Anti-Ageing & Longevity',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['Optimise for the', 'next decade.'],
    sub: "Longevity isn't one thing. It's energy, recovery, cognition and biomarkers working together. Tell us what matters most to you.",
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'priority', label: 'WHAT MATTERS MOST TO YOU RIGHT NOW?', type: 'multiselect', options: ['Energy & vitality', 'Skin, hair & recovery', 'Cognitive performance', 'Full longevity biomarker panel'], helper: 'Select all that apply.' },
      { key: 'bloods', label: 'HAVE YOU HAD BLOOD WORK DONE RECENTLY?', type: 'select', options: ["Yes, recently", "No, it's been a while", 'Never had bloods'], helper: 'Helps our doctors prepare before your first consultation.' },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  skinhair: {
    title: 'Skin & Hair',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['Look the way', 'you feel.'],
    sub: 'Hair loss and skin concerns are often hormonal or nutritional, not just topical. Tell us what\'s going on.',
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'concern', label: "WHAT'S YOUR MAIN CONCERN?", type: 'multiselect', options: ['Hair loss / thinning', 'Skin concerns', 'Both'] },
      { key: 'duration', label: 'HOW LONG HAS THIS BEEN HAPPENING?', type: 'select', options: ['Less than 6 months', '6 months – 2 years', 'More than 2 years'] },
      { key: 'triedBefore', label: 'HAVE YOU TRIED TREATMENT FOR THIS BEFORE?', type: 'select', options: ['Yes, currently treating', 'Yes, in the past', 'No, first time'] },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  bloods: {
    title: 'Comprehensive Blood Tests',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ["Know what's", 'really going on.'],
    sub: '40+ biomarkers covering hormones, metabolic health and more. Order your panel and we\'ll talk you through the results.',
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'reason', label: 'WHY ARE YOU LOOKING TO TEST?', type: 'select', options: ['General health check', 'Investigating specific symptoms', 'Monitoring existing treatment', 'Not sure, just curious'] },
      { key: 'lastTest', label: 'WHEN DID YOU LAST HAVE BLOOD WORK DONE?', type: 'select', options: ['Within 6 months', '6 months – 2 years', 'More than 2 years', 'Never'] },
    ],
    cta: 'Order My Blood Panel',
    trust: ['AHPRA-registered doctors', 'No referral needed', 'Results reviewed by a doctor'],
  },
  telehealth: {
    title: 'General Telehealth',
    eyebrow: 'FAST TRACK ENQUIRY',
    heading: ['Not sure where', 'to start?'],
    sub: "Tell us a bit about what's going on and we'll point you to the right doctor and pathway.",
    fields: ['name', 'email', 'phone'],
    extra: [
      { key: 'concern', label: "WHAT'S THE MAIN THING YOU'D LIKE HELP WITH?", type: 'textarea' },
    ],
    cta: 'Request My Consultation',
    trust: ['AHPRA-registered doctors', 'No referral needed', '24hr response'],
  },
  repeat: {
    title: 'Repeat Order',
    eyebrow: 'EXISTING PATIENT',
    heading: ['Reorder in', 'under a minute.'],
    sub: "Already a patient? Skip the intake, just tell us what you need.",
    fields: ['name', 'email'],
    isOrderForm: true,
    extra: [
      { key: 'dob', label: 'DATE OF BIRTH', type: 'date', helper: 'Used to confirm your patient record.' },
      { key: 'product', label: 'WHAT ARE YOU REORDERING?', type: 'select', options: ['Compounded testosterone', 'Peptide therapy', 'Weight loss / metabolic medication', 'Not sure: check my last order'] },
      { key: 'notes', label: 'ANYTHING ELSE WE SHOULD KNOW?', type: 'textarea', optional: true },
    ],
    cta: 'Submit Reorder',
    trust: ['No new consult needed', 'Existing patients only', '24hr response'],
  },
}

type Values = Record<string, string | string[]>

function FieldInput({ label, placeholder, type = 'text', value, onChange }: { label: string; placeholder?: string; type?: string; value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] tracking-widest text-gray-500 font-semibold mb-2 uppercase">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-400 transition-colors text-[15px]"
      />
    </div>
  )
}

function SelectPills({ label, options, helper, value, onChange }: { label: string; options: string[]; helper?: string; value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div role="group" aria-labelledby={id}>
      <span id={id} className="block text-[10px] tracking-widest text-gray-500 font-semibold mb-3 uppercase">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${value === opt ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-400'}`}>
            {opt}
          </button>
        ))}
      </div>
      {helper && <p className="text-xs text-gray-500 mt-2">{helper}</p>}
    </div>
  )
}

function MultiSelectPills({ label, options, helper, value = [], onChange }: { label: string; options: string[]; helper?: string; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  const id = useId()
  return (
    <div role="group" aria-labelledby={id}>
      <span id={id} className="block text-[10px] tracking-widest text-gray-500 font-semibold mb-3 uppercase">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => {
          const active = value.includes(opt)
          return (
            <button key={opt} type="button" onClick={() => toggle(opt)}
              className={`px-4 py-3 rounded-xl text-sm font-medium border transition-colors flex items-center gap-1.5 ${active ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:border-gray-400'}`}>
              {active && <Check size={13} className="text-blue-400" />}
              {opt}
            </button>
          )
        })}
      </div>
      {helper && <p className="text-xs text-gray-500 mt-2">{helper}</p>}
    </div>
  )
}

function FieldTextarea({ label, optional, value, onChange }: { label: string; optional?: boolean; value: string; onChange: (v: string) => void }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="block text-[10px] tracking-widest text-gray-500 font-semibold mb-2 uppercase">
        {label} {optional && <span className="text-gray-500 normal-case tracking-normal">(optional)</span>}
      </label>
      <textarea
        id={id} value={value} onChange={e => onChange(e.target.value)} rows={3}
        className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-400 transition-colors resize-none text-[15px]"
      />
    </div>
  )
}

function FormInner() {
  const params = useSearchParams()
  const key = params.get('program') ?? 'hormone'
  const p = PROGRAMS[key] ?? PROGRAMS.hormone

  const [values, setValues] = useState<Values>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: string | string[]) => setValues(s => ({ ...s, [k]: v }))

  const canSubmit = !!(values.name && values.email)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')
    try {
      const body: Record<string, string> = {
        access_key: 'c874640f-184f-446d-8a27-5c614097d8a2',
        subject: `Fast Track Enquiry - ${p.title}`,
        from_name: 'Apex Fast Track',
        Program: p.title,
        Name: (values.name as string) || '',
        Email: (values.email as string) || '',
        Phone: (values.phone as string) || 'Not provided',
      }
      p.extra.forEach(f => {
        const val = values[f.key]
        if (val) body[f.label] = Array.isArray(val) ? val.join(', ') : val
      })

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Fast Track Enquiry - ${p.title}`,
          name: values.name || 'Not provided',
          email: values.email || '',
          program: p.title,
          details: Object.entries(body).filter(([k]) => !['access_key', 'subject', 'from_name'].includes(k)).map(([k, v]) => `${k}: ${v}`).join('\n'),
        }),
      })

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-400/40 flex items-center justify-center mb-6">
          <Check size={28} className="text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Got it.</h2>
        <p className="text-gray-500 max-w-xs mb-8 leading-relaxed">
          {p.isOrderForm
            ? "We've received your reorder request and will confirm by email shortly."
            : "We'll be in touch within 24 hours to book your consultation."}
        </p>
        <a href="/" className="text-blue-400 text-sm font-semibold flex items-center gap-1 no-underline">
          <ArrowLeft size={16} /> Back to home
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-900" style={{ backgroundColor: '#f9fafb' }}>

      {/* Top bar */}
      <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <a href="/" className="text-gray-500 flex items-center gap-1 text-sm no-underline hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back
        </a>
        <div className="text-right">
          <div className="font-bold tracking-widest text-sm text-gray-900">APEX</div>
          <div className="text-blue-400 text-[10px] tracking-widest">{p.title.toUpperCase()}</div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pt-8 pb-14 max-w-md mx-auto">
        <div className="text-blue-400 text-[10px] font-bold tracking-widest mb-3">{p.eyebrow}</div>
        <h1 className="text-3xl font-extrabold leading-tight mb-4" style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}>
          {p.heading[0]}<br />
          <span className="text-blue-400">{p.heading[1]}</span>
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed text-[15px]">{p.sub}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {p.fields.includes('name') && (
            <FieldInput label="FIRST NAME" placeholder="Your first name" value={(values.name as string) || ''} onChange={v => set('name', v)} />
          )}
          {p.fields.includes('email') && (
            <FieldInput label="EMAIL ADDRESS" placeholder="your@email.com" type="email" value={(values.email as string) || ''} onChange={v => set('email', v)} />
          )}
          {p.fields.includes('phone') && (
            <FieldInput label="PHONE (optional)" placeholder="04xx xxx xxx" type="tel" value={(values.phone as string) || ''} onChange={v => set('phone', v)} />
          )}

          {p.extra.map(f => {
            if (f.type === 'select') return (
              <SelectPills key={f.key} label={f.label} options={f.options} helper={f.helper} value={(values[f.key] as string) || ''} onChange={v => set(f.key, v)} />
            )
            if (f.type === 'multiselect') return (
              <MultiSelectPills key={f.key} label={f.label} options={f.options} helper={f.helper} value={(values[f.key] as string[]) || []} onChange={v => set(f.key, v)} />
            )
            if (f.type === 'date') return (
              <FieldInput key={f.key} label={f.label} type="date" value={(values[f.key] as string) || ''} onChange={v => set(f.key, v)} />
            )
            if (f.type === 'textarea') return (
              <FieldTextarea key={f.key} label={f.label} optional={'optional' in f ? f.optional : false} value={(values[f.key] as string) || ''} onChange={v => set(f.key, v)} />
            )
            return null
          })}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || !canSubmit}
            className={`w-full rounded-2xl py-4 font-bold flex items-center justify-center gap-2 mt-2 transition-colors ${canSubmit ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600/30 cursor-not-allowed'}`}
          >
            {loading ? 'Sending...' : p.cta}
            {!loading && <ChevronRight size={18} />}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500 pt-1">
            {p.trust.map(t => (
              <span key={t} className="flex items-center gap-1">
                <Check size={12} className="text-blue-400" /> {t}
              </span>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}

export default function FastTrackForm() {
  return (
    <Suspense>
      <FormInner />
    </Suspense>
  )
}
