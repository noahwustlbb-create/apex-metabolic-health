'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '2,400+', label: 'Consultations' },
  { value: '8', label: 'Clinical Programs' },
  { value: '100%', label: 'Online' },
  { value: 'AHPRA', label: 'Registered Doctors' },
]

const ease = [0.22, 1, 0.36, 1] as const

function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }> = []

    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.35 + 0.05,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.005

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const pulse = Math.sin(time + p.x * 0.01) * 0.5 + 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(43, 123, 224, ${p.opacity * pulse})`
        ctx.fill()
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(43, 123, 224, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Hero — Apex Metabolic Health"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden="true" />

      {/* Particle canvas */}
      <HeroGrid />

      {/* Radial glow — top center */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(43,123,224,0.12) 0%, rgba(43,123,224,0.04) 35%, transparent 65%)',
        }}
      />

      {/* Radial glow — bottom left */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 100%, rgba(43,123,224,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Pulsing rings — CSS-only animation */}
      <div
        aria-hidden="true"
        className="pulse-ring absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, border: '1px solid rgba(43,123,224,0.06)', top: '50%', left: '50%' }}
      />
      <div
        aria-hidden="true"
        className="pulse-ring-slow absolute rounded-full pointer-events-none"
        style={{ width: 900, height: 900, border: '1px solid rgba(43,123,224,0.03)', top: '50%', left: '50%' }}
      />

      {/* Content */}
      <div className="relative z-10 container-tight w-full pt-28 pb-20 text-center">
        {/* Clinical eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex justify-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{
              border: '1px solid rgba(43,123,224,0.3)',
              borderRadius: '2px',
              color: '#2b7be0',
              backgroundColor: 'rgba(43,123,224,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            Doctor-Led Telehealth — Australia-Wide
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-4xl mx-auto mb-7">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="font-bold leading-[1.02] tracking-tight"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(42px, 7.5vw, 88px)',
              color: '#f0f4f8',
            }}
          >
            Your GP Said
            <br />
            <span className="text-teal-gradient">Everything Looks Normal.</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-bold leading-[1.02] tracking-tight mt-2"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(42px, 7.5vw, 88px)',
              color: '#f0f4f8',
            }}
          >
            You Know It Doesn&apos;t.
          </motion.h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease }}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-11"
          style={{ color: '#8899aa' }}
        >
          Apex Metabolic Health is a doctor-led telehealth clinic built for adults who want real
          answers — not reassurance. Evidence-based hormonal and metabolic medicine, delivered
          online across Australia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => {
              const el = document.querySelector('#cta')
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
            }}
            className="btn-teal text-sm tracking-widest uppercase w-full sm:w-auto"
          >
            Start Your Program
          </button>
          <a
            href="/services"
            className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto"
          >
            Choose a Program
          </a>
          <a
            href="/get-started"
            className="btn-teal text-sm tracking-widest uppercase w-full sm:w-auto"
          >
            Request an Appointment
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="inline-grid grid-cols-2 sm:grid-cols-4 gap-0 overflow-hidden mx-auto"
          style={{ border: '1px solid #1e2d3d', borderRadius: '4px' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-4 text-center"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid #1e2d3d' : 'none',
                backgroundColor: 'rgba(13,17,23,0.7)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p
                className="stat-number text-xl md:text-2xl"
                style={{ color: '#2b7be0' }}
              >
                {stat.value}
              </p>
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-medium mt-1"
                style={{ color: '#4a5a6a' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#4a5a6a' }}>
          Scroll
        </span>
        <div className="w-px h-8 relative overflow-hidden" style={{ backgroundColor: '#1e2d3d' }}>
          <div
            className="scroll-drip absolute left-0 w-full"
            style={{ backgroundColor: '#2b7be0', height: '40%' }}
          />
        </div>
      </motion.div>

      {/* Bottom glow rule */}
      <div className="absolute bottom-0 left-0 right-0 glow-rule" aria-hidden="true" />
    </section>
  )
}
