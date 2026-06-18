'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const

export default function ConfirmationPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
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
              Intake Received
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
              className="font-bold tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 38px)', lineHeight: 1.1, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              You&apos;re all set.{' '}
              <span style={{ background: 'linear-gradient(135deg, #4890f7, #6ba8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                We take it from here.
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease }}
              className="text-sm leading-relaxed mb-8"
              style={{ color: 'var(--text-primary)', opacity: 0.65, maxWidth: 440 }}
            >
              Our team will contact you within 1 business day to confirm your next step. Your doctor will review your intake before your consultation.
            </motion.p>

            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              style={{ width: '100%', height: 1, transformOrigin: 'left', background: 'linear-gradient(90deg, rgba(72,144,247,0.12), rgba(255,255,255,0.03) 60%, transparent)', marginBottom: 28 }}
            />

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82, ease }}
              className="flex flex-col gap-4 mb-10"
            >
              {[
                { step: 'Intake reviewed', detail: 'Your AHPRA-registered doctor reviews your intake and health history.' },
                { step: 'Next steps confirmed', detail: 'Our team contacts you within 1 business day to confirm your consultation or blood panel referral.' },
                { step: 'Your protocol', detail: 'Following your consultation, a personalised clinical protocol is prepared where clinically appropriate.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div style={{ minWidth: 20, height: 20, borderRadius: '50%', marginTop: 2, background: 'rgba(72,144,247,0.06)', border: '1px solid rgba(72,144,247,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#4890f7', fontFamily: 'var(--font-space-grotesk)' }}>{i + 1}</div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{item.step}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0, ease }}
              className="p-4 rounded-sm mb-8"
              style={{ background: 'rgba(72,144,247,0.04)', border: '1px solid rgba(72,144,247,0.12)' }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: '#4890f7' }}>Questions? We&apos;re here.</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
                Email us at{' '}
                <a href="mailto:admin@apexmetabolichealth.com.au" style={{ color: '#4890f7' }}>
                  admin@apexmetabolichealth.com.au
                </a>{' '}
                — we respond within 1 business day.
              </p>
            </motion.div>

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
      </main>
      <Footer />
    </>
  )
}
