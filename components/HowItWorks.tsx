'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

const STEPS = [
  {
    step: '01',
    src: '/team/portrait-woman.webp',
    alt: 'Create your account and complete intake online',
    title: 'Sign up and complete intake',
    sub: 'No GP referral required',
    time: '2 MIN',
  },
  {
    step: '02',
    src: '/editorial/blood-vials.webp',
    alt: 'Pathology blood panel collection',
    title: 'Accredited pathology',
    sub: '4,000+ collection centres',
    time: '< 48H',
  },
  {
    step: '03',
    src: '/team/portrait-man.webp',
    alt: 'Doctor-led telehealth consultation',
    title: 'Telehealth consultation',
    sub: 'AHPRA-registered · personalised protocol',
    time: '45–60 MIN',
  },
  {
    step: '04',
    src: '/editorial/athletic-male.webp',
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
      style={{ aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.08)' }}
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
      style={{ backgroundColor: '#0b0d12' }}
      aria-label="How it works"
    >
      {/* Texture bleed: the protocol language carries through, low and cool. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/protocols/weight.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 60%', opacity: 0.18,
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, transparent 0%, black 40%, black 70%, transparent 100%)',
        }}
      />
      <div className="container-tight relative z-10">

        <div ref={headingRef} className="max-w-2xl mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="display-heading"
            style={{ fontSize: 'clamp(36px, 4vw, 62px)', color: '#ffffff' }}
          >
            From intake to protocol.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="text-base leading-relaxed mt-5 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Four steps, each with a stated clock. Intake in two minutes, bloods within 48 hours, a doctor on the phone, then a protocol that is reviewed every three months.
          </motion.p>
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
