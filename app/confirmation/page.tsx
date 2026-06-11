'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

function ConfirmationContent() {
  const params = useSearchParams()
  const [verified, setVerified] = useState<boolean | null>(null)
  const [productName, setProductName] = useState('')
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    const sessionId = params.get('session_id')
    if (!sessionId) { setVerified(false); return }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setVerified(true)
          setProductName(data.productName || '')
          setFirstName(data.firstName || '')
          sessionStorage.removeItem('apex_intake')
        } else {
          setVerified(false)
        }
      })
      .catch(() => setVerified(false))
  }, [params])

  if (verified === null) {
    return (
      <div className="container-tight max-w-md mx-auto text-center" style={{ paddingTop: '120px' }}>
        <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto"
          style={{ borderColor: '#4890f7', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="container-tight max-w-md mx-auto text-center" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <p className="text-sm mb-4" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
          We couldn&apos;t verify your payment. If you completed a payment, check your email for a confirmation receipt.
        </p>
        <a href="mailto:care@apexmetabolichealth.com.au" className="btn-teal">Contact support</a>
      </div>
    )
  }

  const isPanel = productName.toLowerCase().includes('panel')

  return (
    <div className="container-tight relative z-10 max-w-lg" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, ease }} className="flex flex-col">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="w-10 h-10 rounded-full flex items-center justify-center mb-8"
          style={{ background: 'rgba(72,144,247,0.08)', border: '1px solid rgba(72,144,247,0.25)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M5 12l5 5L19 7" stroke="#4890f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }} className="label mb-4">
          Payment Confirmed
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="font-bold tracking-tight mb-5"
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 38px)', lineHeight: 1.1, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          {firstName ? `You're all set, ${firstName}.` : "You're all set."}
          <br />
          <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            We take it from here.
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease }}
          className="text-sm leading-relaxed mb-8"
          style={{ color: 'var(--text-primary)', opacity: 0.65, maxWidth: 440 }}
        >
          {isPanel
            ? 'Your doctor-issued pathology referral will be sent to your email within 24 hours. Collect at any accredited collection centre — no GP or appointment required.'
            : 'Our team will contact you within 1 business day to confirm your telehealth appointment. Your doctor will review your history before the consultation.'}
        </motion.p>

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
          style={{ width: '100%', height: 1, transformOrigin: 'left', background: 'linear-gradient(90deg, rgba(72,144,247,0.12), rgba(255,255,255,0.03) 60%, transparent)', marginBottom: 28 }}
        />

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease }}
          className="flex flex-col gap-4 mb-10"
        >
          {(isPanel ? [
            { step: 'Referral issued', detail: 'An AHPRA-registered doctor reviews your intake and issues your pathology referral within 24 hours.' },
            { step: 'Blood collection', detail: 'Visit any accredited collection centre — fasted before 9am. No appointment needed. 4,000+ locations nationally.' },
            { step: 'Results review', detail: 'Your Apex doctor reviews your results and provides a clinical interpretation with next recommended steps.' },
          ] : [
            { step: 'Appointment confirmed', detail: 'Our team contacts you within 1 business day to confirm your telehealth consultation time.' },
            { step: 'Doctor review', detail: 'Your doctor reviews your health history and blood results before the consultation.' },
            { step: 'Your protocol', detail: 'Treatment is coordinated through our TGA-compliant compounding pharmacy partner where clinically appropriate.' },
          ]).map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div style={{ minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2, background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#4890f7', fontFamily: 'var(--font-space-grotesk)' }}>{i + 1}</div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{item.step}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {isPanel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease }}
            className="p-4 rounded-sm mb-8"
            style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.12)' }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: '#4890f7' }}>Have existing results to share?</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
              Email them to{' '}
              <a href="mailto:care@apexmetabolichealth.com.au" style={{ color: '#4890f7' }}>
                care@apexmetabolichealth.com.au
              </a>{' '}
              with your full name in the subject line.
            </p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.05, ease }}>
          <Link href="/" className="btn-ghost">Back to home</Link>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease }}
          className="text-[11px] mt-6" style={{ color: 'var(--text-primary)', opacity: 0.3 }}
        >
          Apex Metabolic Health · AHPRA-registered practitioners · Private & confidential
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <Suspense fallback={
          <div style={{ paddingTop: '120px', textAlign: 'center' }}>
            <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto"
              style={{ borderColor: '#4890f7', borderTopColor: 'transparent' }} />
          </div>
        }>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
