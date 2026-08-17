'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const STEPS = [
  {
    step: '01',
    src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=90',
    alt: 'Create your account and complete intake online',
    title: 'Sign up and complete intake',
    sub: 'No GP referral required',
    time: '2 MIN',
  },
  {
    step: '02',
    src: 'https://images.unsplash.com/photo-1639772823849-6efbd173043c?auto=format&fit=crop&w=600&q=80',
    alt: 'Pathology blood panel collection',
    title: 'Accredited pathology',
    sub: '4,000+ collection centres',
    time: '< 48H',
  },
  {
    step: '03',
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=90',
    alt: 'Doctor-led telehealth consultation',
    title: 'Telehealth consultation',
    sub: 'AHPRA-registered · personalised protocol',
    time: '45–60 MIN',
  },
  {
    step: '04',
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=90',
    alt: 'Ongoing optimisation and protocol',
    title: 'Ongoing optimisation',
    sub: 'Adjustments based on your data',
    time: 'EVERY 3 MONTHS',
  },
]

function StepCard({ item, delay }: { item: (typeof STEPS)[0]; delay: number }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      style={{ aspectRatio: '3/4', border: '1px solid rgba(72,144,247,0.12)' }}
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.6, delay, ease }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        style={{ opacity: 0.8 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(14,17,23,0.2) 0%, transparent 35%, rgba(14,17,23,0.88) 100%)' }}
      />

      {/* Duration chip */}
      <div
        className="absolute top-3 right-3"
        style={{
          background: 'rgba(14,17,23,0.6)',
          border: '1px solid rgba(72,144,247,0.4)',
          borderRadius: 99,
          padding: '3px 8px',
          backdropFilter: 'blur(6px)',
        }}
      >
        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--blue)' }}>
          {item.time}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(72,144,247,0.9)' }}>
          Step {item.step}
        </p>
        <p className="text-sm font-semibold leading-tight" style={{ color: '#ffffff' }}>
          {item.title}
        </p>
        <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {item.sub}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="How it works"
    >
      <div className="container-tight">

        <div ref={headingRef} className="max-w-2xl mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="display-heading"
            style={{ fontSize: 'clamp(36px, 4vw, 62px)' }}
          >
            From intake to protocol.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STEPS.map((item, i) => (
            <StepCard key={item.step} item={item} delay={i * 0.12} />
          ))}
        </div>

      </div>
    </section>
  )
}
