'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '8', label: 'Clinical Programs' },
  { value: '50+', label: 'Biomarkers Analysed' },
  { value: '100%', label: 'Online' },
  { value: 'AHPRA', label: 'Registered Doctors' },
]

const TRUST_ITEMS = [
  { label: 'Physician-led clinical care' },
  { label: 'Australia-wide telehealth' },
  { label: 'Evidence-based regenerative protocols' },
  { label: 'Private & confidential' },
]

const ease = [0.22, 1, 0.36, 1] as const

/* Animated particle field */
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
        opacity: Math.random() * 0.3 + 0.04,
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
        ctx.fillStyle = `rgba(72, 144, 247, ${p.opacity * pulse})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(72, 144, 247, ${0.05 * (1 - dist / 120)})`
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

/* Faint biometric body-scan overlay — scan lines + contour ellipses */
function BiometricOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Outer body contour */}
      <ellipse
        cx="50%" cy="44%"
        rx="96" ry="230"
        fill="none"
        stroke="rgba(72,144,247,0.055)"
        strokeWidth="0.8"
      />
      {/* Inner body contour */}
      <ellipse
        cx="50%" cy="44%"
        rx="68" ry="168"
        fill="none"
        stroke="rgba(72,144,247,0.035)"
        strokeWidth="0.5"
      />
      {/* Faint centre-line vertical */}
      <line
        x1="50%" y1="10%"
        x2="50%" y2="78%"
        stroke="rgba(72,144,247,0.025)"
        strokeWidth="0.5"
        strokeDasharray="3 14"
      />
      {/* Horizontal scan lines — subtle sweep through body area */}
      {Array.from({ length: 26 }, (_, i) => (
        <line
          key={i}
          x1="28%" y1={`${10 + i * 2.6}%`}
          x2="72%" y2={`${10 + i * 2.6}%`}
          stroke="rgba(72,144,247,0.022)"
          strokeWidth="0.6"
          strokeDasharray={i % 4 === 0 ? '6 10' : '2 16'}
        />
      ))}
      {/* Corner measurement tick marks */}
      <line x1="36%" y1="12%" x2="38%" y2="12%" stroke="rgba(72,144,247,0.09)" strokeWidth="0.8"/>
      <line x1="62%" y1="12%" x2="64%" y2="12%" stroke="rgba(72,144,247,0.09)" strokeWidth="0.8"/>
      <line x1="36%" y1="76%" x2="38%" y2="76%" stroke="rgba(72,144,247,0.09)" strokeWidth="0.8"/>
      <line x1="62%" y1="76%" x2="64%" y2="76%" stroke="rgba(72,144,247,0.09)" strokeWidth="0.8"/>
      {/* Small crosshair top-center */}
      <line x1="50%" y1="9.2%" x2="50%" y2="10.8%" stroke="rgba(72,144,247,0.12)" strokeWidth="0.8"/>
      <line x1="49.2%" y1="10%" x2="50.8%" y2="10%" stroke="rgba(72,144,247,0.12)" strokeWidth="0.8"/>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0c131f' }}
      aria-label="Hero — Apex Metabolic Health"
    >
      {/* Layer 0 — dot grid base */}
      <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

      {/* Layer 1 — grain / noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Layer 2 — particle canvas */}
      <HeroGrid />

      {/* Layer 3 — biometric scan overlay */}
      <BiometricOverlay />

      {/* Layer 4 — top radial glow (existing) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[800px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(72,144,247,0.13) 0%, rgba(72,144,247,0.04) 40%, transparent 68%)',
        }}
      />

      {/* Layer 5 — NEW: centered glow anchored behind headline text */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(72,144,247,0.10) 0%, rgba(72,144,247,0.04) 35%, transparent 65%)',
        }}
      />

      {/* Layer 6 — bottom-left ambient glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 100%, rgba(72,144,247,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Layer 7 — pulsing decorative rings */}
      <div
        aria-hidden="true"
        className="pulse-ring absolute rounded-full pointer-events-none"
        style={{ width: 600, height: 600, border: '1px solid rgba(72,144,247,0.05)', top: '50%', left: '50%' }}
      />
      <div
        aria-hidden="true"
        className="pulse-ring-slow absolute rounded-full pointer-events-none"
        style={{ width: 950, height: 950, border: '1px solid rgba(72,144,247,0.025)', top: '50%', left: '50%' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 container-tight w-full pt-28 pb-20 text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex justify-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{
              border: '1px solid rgba(72,144,247,0.22)',
              borderRadius: '4px',
              color: '#a9c7ff',
              backgroundColor: 'rgba(72,144,247,0.07)',
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

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease }}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-4"
          style={{ color: '#8899aa' }}
        >
          Standard panels miss what matters. We run advanced biomarker analysis — and act on what we find.
        </motion.p>

        {/* Positioning line */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56, ease }}
          className="text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-11"
          style={{ color: 'rgba(136,153,170,0.6)', letterSpacing: '0.01em' }}
        >
          We don&apos;t just check if you&apos;re in range — we optimise your biological function.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <a
            href="/get-started"
            className="btn-teal text-sm tracking-widest uppercase w-full sm:w-auto"
          >
            Start Your Assessment
          </a>
          <a
            href="/services"
            className="btn-ghost text-sm tracking-widest uppercase w-full sm:w-auto"
          >
            View Programs
          </a>
          <a
            href="/intake/discovery"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-widest uppercase w-full sm:w-auto transition-all duration-200"
            style={{
              border: '1px solid rgba(169,199,255,0.14)',
              borderRadius: '2px',
              color: 'rgba(169,199,255,0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(169,199,255,0.28)'
              e.currentTarget.style.color = 'rgba(169,199,255,0.75)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(169,199,255,0.14)'
              e.currentTarget.style.color = 'rgba(169,199,255,0.5)'
            }}
          >
            Speak to a Clinician
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease }}
          className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 mb-16"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <svg
                viewBox="0 0 10 10"
                fill="none"
                className="w-2.5 h-2.5 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M1.5 5.5L4 8l4.5-5.5"
                  stroke="#4890f7"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="text-[11px] font-medium tracking-[0.14em] uppercase"
                style={{ color: 'rgba(136,153,170,0.65)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82, ease }}
          className="inline-grid grid-cols-2 sm:grid-cols-4 gap-0 overflow-hidden mx-auto"
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-4 text-center"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                backgroundColor: 'rgba(21,28,40,0.7)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="stat-number text-xl md:text-2xl" style={{ color: '#4890f7' }}>
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
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: '#4a5a6a' }}>
          Scroll
        </span>
        <div className="w-px h-8 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <div
            className="scroll-drip absolute left-0 w-full"
            style={{ backgroundColor: '#4890f7', height: '40%' }}
          />
        </div>
      </motion.div>

      {/* Bottom glow rule */}
      <div className="absolute bottom-0 left-0 right-0 glow-rule" aria-hidden="true" />

      {/* Bottom fade — smooth transition into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(12,19,31,0.6))',
        }}
      />
    </section>
  )
}
