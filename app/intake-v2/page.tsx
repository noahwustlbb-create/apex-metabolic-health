'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import IntakeForm from '@/components/IntakeForm'
import { motion } from 'framer-motion'

export default function IntakePage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
        />
        <div className="container-tight relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="label mb-3">Under 5 minutes · No commitment</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
              Start your intake
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
              Tell us about your goals and health history. Your doctor reviews this before your consultation.
            </p>
          </motion.div>

          <IntakeForm />
        </div>
      </main>
      <Footer />
    </>
  )
}
