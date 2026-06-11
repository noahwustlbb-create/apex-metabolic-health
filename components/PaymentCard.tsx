'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getProduct, ENQUIRY_LABELS, type EnquiryType } from '@/lib/intake-routing'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

const PANEL_STEPS = [
  'Doctor-issued pathology referral sent to your email within 24 hours',
  'Collect at any accredited pathology centre — fasted before 9am, no appointment needed',
  'Results reviewed by your Apex doctor with a full clinical interpretation',
  'Book your consultation once results are back to start your protocol',
]

const CONSULT_STEPS = [
  'Our team confirms your appointment time within 1 business day',
  'Your doctor reviews your blood results and health history before your consultation',
  'Telehealth consultation — your personalised protocol is discussed where clinically appropriate',
  'Coordinated treatment through our TGA-compliant compounding pharmacy partner',
]

export default function PaymentCard() {
  const router = useRouter()
  const [product, setProduct] = useState<ReturnType<typeof getProduct> | null>(null)
  const [enquiryLabel, setEnquiryLabel] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('apex_intake')
      if (!raw) { router.replace('/intake'); return }
      const intake = JSON.parse(raw)
      const p = getProduct(intake.enquiry as EnquiryType, intake.hasBloods)
      setProduct(p)
      setEnquiryLabel(ENQUIRY_LABELS[intake.enquiry as EnquiryType] || intake.enquiry)
    } catch {
      router.replace('/intake')
    }
  }, [router])

  const handlePay = async () => {
    setLoading(true)
    setError('')
    try {
      const raw = sessionStorage.getItem('apex_intake')
      if (!raw) throw new Error('Session expired')

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
      })

      const json = await res.json()
      if (!json.url) throw new Error(json.error || 'Failed to create checkout')
      window.location.href = json.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (!product) return null

  const isPanel = product.type.startsWith('panel')
  const steps = isPanel ? PANEL_STEPS : CONSULT_STEPS

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="w-full max-w-lg"
    >
      {/* Enquiry badge */}
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: ACCENT }}>
        {enquiryLabel}
      </p>

      {/* Product card */}
      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ border: '1px solid rgba(72,144,247,0.18)', background: 'var(--surface)' }}>

        {/* Header */}
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1"
                style={{ color: ACCENT }}>
                {isPanel ? 'Blood Panel' : 'Telehealth Consultation'}
              </p>
              <h2 className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                {product.name}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
                ${product.price}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>AUD inc. GST</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>
            {product.description}
          </p>
        </div>

        {/* What happens next */}
        <div className="px-6 py-5">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>
            What happens next
          </p>
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                  <span className="text-[9px] font-bold" style={{ color: ACCENT }}>{i + 1}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="px-6 py-3 flex flex-wrap gap-x-4 gap-y-1"
          style={{ borderTop: '1px solid rgba(72,144,247,0.08)', background: 'rgba(72,144,247,0.03)' }}>
          {['AHPRA-registered doctors', 'Secure payment via Stripe', 'TGA-compliant protocols'].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
              <span className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm px-4 py-3 rounded-sm mb-4"
          style={{ color: '#dc3545', background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)' }}>
          {error}
        </p>
      )}

      {/* CTA */}
      <button
        type="button" onClick={handlePay} disabled={loading}
        className="w-full py-4 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
        style={{ background: ACCENT, color: '#fff', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Redirecting to payment…
          </>
        ) : (
          <>
            Pay ${product.price} securely
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-primary)', opacity: 0.35 }}>
        Powered by Stripe. Your card details are never stored by Apex.
      </p>
    </motion.div>
  )
}
