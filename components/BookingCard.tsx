'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import BookingChoice from '@/components/BookingChoice'
import { ENQUIRY_LABELS, PANEL_URLS, type EnquiryType } from '@/lib/intake-routing'

const ease = [0.22, 1, 0.36, 1] as const

const HORMONE_ENQUIRIES = new Set(['trt', 'sexual-health', 'anti-aging', 'sleep', 'performance'])

export default function BookingCard() {
  const router = useRouter()
  const [enquiryLabel, setEnquiryLabel] = useState('')
  const [hasBloods, setHasBloods] = useState(false)
  const [panelUrl, setPanelUrl] = useState('')
  const [calendlyType, setCalendlyType] = useState<'hormone' | 'general'>('general')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('apex_intake')
      if (!raw) { router.replace('/intake-v2'); return }
      const intake = JSON.parse(raw)
      const enquiry = intake.enquiry as EnquiryType
      setEnquiryLabel(ENQUIRY_LABELS[enquiry] || enquiry)
      setHasBloods(intake.hasBloods === true)
      setPanelUrl(PANEL_URLS[enquiry] || '')
      setCalendlyType(HORMONE_ENQUIRIES.has(enquiry) ? 'hormone' : 'general')
      setReady(true)
    } catch {
      router.replace('/intake-v2')
    }
  }, [router])

  if (!ready) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <p className="text-[11px] font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: '#4890f7' }}>
        {enquiryLabel}
      </p>

      {hasBloods ? (
        // Has existing bloods → book a consultation
        <>
          <div className="rounded-2xl p-5 mb-6"
            style={{ border: '1px solid rgba(72,144,247,0.18)', background: 'var(--surface)' }}>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: '#4890f7' }}>
              Telehealth Consultation
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
              Your doctor will review your existing results and build a personalised protocol during your consultation.
            </p>
            <div className="mt-4 pt-3 flex flex-wrap gap-x-4 gap-y-1"
              style={{ borderTop: '1px solid rgba(72,144,247,0.08)' }}>
              {['AHPRA-registered doctors', 'Australia-wide telehealth', 'Private & confidential'].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full" style={{ background: '#4890f7' }} />
                  <span className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <BookingChoice type={calendlyType} showDiscovery delay={0} />
        </>
      ) : (
        // No bloods yet → order the correct panel
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(72,144,247,0.18)', background: 'var(--surface)' }}
        >
          <div className="px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(72,144,247,0.08)' }}>
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: '#4890f7' }}>
              Blood Panel Required
            </p>
            <h2 className="text-lg font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
              Order your panel first
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>
              Your doctor needs current blood results before your consultation. Order your matched panel below — collect at any accredited pathology centre, fasted before 9am, no appointment needed.
            </p>
          </div>

          <div className="px-6 py-5">
            <div className="flex flex-col gap-3 mb-5">
              {[
                { n: 1, text: 'Order your panel via the button below' },
                { n: 2, text: 'Collect at any accredited centre near you — fasted before 9am' },
                { n: 3, text: 'Email your results to admin@apexmetabolichealth.com.au to book your consultation' },
              ].map(s => (
                <div key={s.n} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.2)' }}>
                    <span className="text-[9px] font-bold" style={{ color: '#4890f7' }}>{s.n}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>{s.text}</p>
                </div>
              ))}
            </div>

            <a
              href={panelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal w-full justify-center"
            >
              Order your blood panel →
            </a>

            <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-primary)', opacity: 0.35 }}>
              Powered by Bloody Good Tests · Results delivered digitally
            </p>
          </div>

          <div className="px-6 py-3 flex flex-wrap gap-x-4 gap-y-1"
            style={{ borderTop: '1px solid rgba(72,144,247,0.08)', background: 'rgba(72,144,247,0.03)' }}>
            {['AHPRA-registered doctors', '4,000+ collection centres', 'Private & confidential'].map(t => (
              <div key={t} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full" style={{ background: '#4890f7' }} />
                <span className="text-[10px]" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
