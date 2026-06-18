'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BookingCard from '@/components/BookingCard'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="container-tight relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="label mb-3">Almost there</p>
            <h1 className="text-3xl font-bold tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
              Your next step
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
              Based on your intake, here&apos;s what happens next.
            </p>
          </motion.div>

          <BookingCard />
        </div>
      </main>
      <Footer />
    </>
  )
}
