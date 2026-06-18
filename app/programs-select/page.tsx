'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { EnquiryType } from '@/lib/intake-routing'

const ease = [0.22, 1, 0.36, 1] as const

type View = 'programs' | 'prescreen' | 'confirm'
type PrescreenStep = 'symptoms' | 'bloods'

interface Program {
  id: string
  category: string
  name: string
  tagline: string
  accent: string
  accentBg: string
  accentBorder: string
  glowColor: string
  tag: string | null
  symptoms: string[]
  enquiry: EnquiryType
  intakePath: string
  isPeptide?: boolean
  icon: React.ReactNode
}

const PROGRAMS: Program[] = [
  {
    id: 'hormone',
    category: 'Hormonal Health',
    name: 'Hormone Optimisation',
    tagline: "Low drive, poor recovery, body composition changes — often rooted in hormonal dysfunction that standard testing misses.",
    accent: '#4890f7',
    accentBg: 'rgba(72,144,247,0.05)',
    accentBorder: 'rgba(72,144,247,0.15)',
    glowColor: 'rgba(72,144,247,0.06)',
    tag: 'Most common',
    symptoms: [
      'Low energy or fatigue',
      'Reduced libido or drive',
      'Brain fog or poor focus',
      'Poor sleep quality',
      'Body composition changes',
      'Mood changes or irritability',
    ],
    enquiry: 'trt',
    intakePath: '/intake/hormone-consult',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" strokeLinecap="round" />
        <circle cx="10" cy="10" r="4" />
      </svg>
    ),
  },
  {
    id: 'performance',
    category: 'Athletic Optimisation',
    name: 'Performance & Recovery',
    tagline: "Output has stalled, recovery is slow — and something clinical is likely limiting what your training can produce.",
    accent: '#f97316',
    accentBg: 'rgba(249,115,22,0.06)',
    accentBorder: 'rgba(249,115,22,0.18)',
    glowColor: 'rgba(249,115,22,0.05)',
    tag: null,
    symptoms: [
      'Training plateau despite consistent effort',
      'Poor recovery between sessions',
      'Declining strength or endurance',
      'Suboptimal body composition',
    ],
    enquiry: 'performance',
    intakePath: '/intake-v2',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 10h3l2-5 3 10 2-7 2 4 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'weight-loss',
    category: 'Metabolic Health',
    name: 'Metabolic & Weight Loss',
    tagline: "Stubborn weight gain and body fat that doesn't respond to diet or exercise usually has a clinical driver.",
    accent: '#00a89e',
    accentBg: 'rgba(0,168,158,0.06)',
    accentBorder: 'rgba(0,168,158,0.18)',
    glowColor: 'rgba(0,168,158,0.05)',
    tag: null,
    symptoms: [
      'Stubborn weight and body fat accumulation',
      'Insulin resistance or metabolic dysfunction',
      'Low energy despite adequate sleep',
      "Weight that doesn't respond to diet or exercise",
    ],
    enquiry: 'weight-loss',
    intakePath: '/intake-v2',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 17l4-8 4 4 3-6 3 4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="6" r="2" />
      </svg>
    ),
  },
  {
    id: 'hair',
    category: 'Hair & Scalp Health',
    name: 'Hair Restoration',
    tagline: "Shedding, thinning density, or hairline recession — address the biology driving hair loss, not just the surface.",
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.06)',
    accentBorder: 'rgba(167,139,250,0.18)',
    glowColor: 'rgba(167,139,250,0.05)',
    tag: null,
    symptoms: [
      'Pattern hair loss or diffuse thinning',
      'Shedding and reduced density',
      'Hairline recession',
      'Hormonally driven scalp changes',
    ],
    enquiry: 'hair',
    intakePath: '/intake/general-consult',
    isPeptide: true,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M10 3c0 0-5 4-5 8a5 5 0 0010 0c0-4-5-8-5-8z" strokeLinejoin="round" />
        <path d="M10 11v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'skin',
    category: 'Skin & Dermal Health',
    name: 'Skin Regeneration',
    tagline: "Declining texture, firmness, and skin quality — driven by internal biology that topical products can't reach.",
    accent: '#38bdf8',
    accentBg: 'rgba(56,189,248,0.06)',
    accentBorder: 'rgba(56,189,248,0.18)',
    glowColor: 'rgba(56,189,248,0.05)',
    tag: null,
    symptoms: [
      'Declining skin texture, firmness, or quality',
      'Hormonally driven skin changes',
      'Acne or persistent skin conditions',
      'Post-injury or post-procedural skin repair',
    ],
    enquiry: 'skin',
    intakePath: '/intake/general-consult',
    isPeptide: true,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" />
        <path d="M7 10c0-1.66 1.34-3 3-3s3 1.34 3 3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'injury',
    category: 'Musculoskeletal Health',
    name: 'Injury Repair & Recovery',
    tagline: "Slow healing, recurring injury, or post-surgical recovery — a clinical protocol supports what the body can't do alone.",
    accent: '#4ade80',
    accentBg: 'rgba(74,222,128,0.06)',
    accentBorder: 'rgba(74,222,128,0.18)',
    glowColor: 'rgba(74,222,128,0.05)',
    tag: null,
    symptoms: [
      'Soft tissue injury — tendons, ligaments, muscle',
      'Slow or incomplete healing post-injury',
      'Recurring injury at the same sites',
      'Return-to-training clinical support',
    ],
    enquiry: 'injury-repair',
    intakePath: '/intake/general-consult',
    isPeptide: true,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 10h8M10 6v8" strokeLinecap="round" />
        <rect x="3" y="3" width="14" height="14" rx="3" />
      </svg>
    ),
  },
]

const BLOODS_OPTIONS_STANDARD = [
  { label: 'Yes — within 6 months', value: true },
  { label: 'No — I need a blood panel', value: false },
]

const BLOODS_OPTIONS_PEPTIDE = [
  { label: 'Yes — I have recent blood work', value: true },
  { label: 'No / not recently', value: false },
]

function ProgramCard({ prog, index, onSelect }: { prog: Program; index: number; onSelect: (p: Program) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const stepNum = String(index + 1).padStart(2, '0')

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease }}
      className="group text-left w-full flex flex-col relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
      }}
      onClick={() => onSelect(prog)}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 0 0 1.5px ${prog.accent}, 0 20px 60px ${prog.glowColor}, 0 8px 24px rgba(0,0,0,0.12)`
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = 'transparent'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'
      }}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${prog.accent}, ${prog.accent}66)` }} />

      {/* Hover glow layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${prog.accentBg.replace(/[\d.]+\)$/, '0.18)')} 0%, transparent 55%)` }}
      />

      {/* Large backdrop number */}
      <span
        className="absolute pointer-events-none select-none leading-none"
        style={{
          top: '-8px',
          right: '12px',
          fontSize: '130px',
          fontWeight: 900,
          color: prog.accent,
          opacity: 0.04,
          fontFamily: 'var(--font-space-grotesk)',
          letterSpacing: '-0.05em',
        }}
        aria-hidden="true"
      >
        {stepNum}
      </span>

      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Icon + category */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}`, color: prog.accent }}
            >
              {prog.icon}
            </div>
            <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: prog.accent }}>
              {prog.category}
            </span>
          </div>
          {prog.tag && (
            <span
              className="text-[8px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm flex-shrink-0"
              style={{ color: prog.accent, background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}
            >
              {prog.tag}
            </span>
          )}
        </div>

        {/* Program name */}
        <h3
          className="font-bold leading-tight mb-2.5"
          style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '19px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
        >
          {prog.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
          {prog.tagline}
        </p>

        {/* Symptom chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {prog.symptoms.slice(0, 4).map(s => (
            <span
              key={s}
              className="text-[10px] font-medium px-2.5 py-1 rounded-full leading-none"
              style={{
                color: prog.accent,
                background: prog.accentBg,
                border: `1px solid ${prog.accentBorder}`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div
          className="mt-auto flex items-center justify-between pt-4"
          style={{ borderTop: `1px solid ${prog.accentBorder}` }}
        >
          <span
            className="text-[11px] font-bold tracking-[0.12em] uppercase"
            style={{ color: prog.accent }}
          >
            Select program
          </span>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}`, color: prog.accent }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default function ProgramsSelectPage() {
  const router = useRouter()
  const [view, setView] = useState<View>('programs')
  const [step, setStep] = useState<PrescreenStep>('symptoms')
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [hasBloods, setHasBloods] = useState<boolean | null>(null)
  const [advancing, setAdvancing] = useState(false)

  function handleSelectProgram(prog: Program) {
    setSelectedProgram(prog)
    setSelectedSymptoms([])
    setHasBloods(null)
    setStep('symptoms')
    setView('prescreen')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function toggleSymptom(s: string) {
    setSelectedSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  function handleSymptomsNext() {
    setStep('bloods')
  }

  function handleBloods(value: boolean) {
    if (advancing) return
    setAdvancing(true)
    setHasBloods(value)
    setTimeout(() => {
      setAdvancing(false)
      setView('confirm')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 280)
  }

  function handleStartIntake() {
    if (!selectedProgram) return
    sessionStorage.setItem(
      'apex_intake',
      JSON.stringify({ enquiry: selectedProgram.enquiry, hasBloods: hasBloods ?? false })
    )
    router.push(selectedProgram.intakePath)
  }

  function handleBack() {
    if (view === 'confirm') {
      setView('prescreen')
      setStep('bloods')
    } else if (view === 'prescreen' && step === 'bloods') {
      setStep('symptoms')
    } else {
      setView('programs')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prog = selectedProgram

  return (
    <>
      <Nav />
      <main style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="absolute inset-0 dot-grid opacity-[0.12] pointer-events-none" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.05) 0%, transparent 60%)' }}
        />

        <AnimatePresence mode="wait">

          {/* Programs grid view */}
          {view === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <div className="container-tight relative z-10" style={{ paddingTop: '100px', paddingBottom: '80px' }}>

                {/* Header */}
                <div className="max-w-2xl mb-12">
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="text-[10px] font-bold tracking-[0.22em] uppercase mb-4"
                    style={{ color: '#4890f7' }}
                  >
                    Clinical Programs · Doctor-led · Australia-wide
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.06, ease }}
                    className="font-bold tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(30px, 4.5vw, 52px)', lineHeight: 1.05, color: 'var(--text-primary)' }}
                  >
                    Which program{' '}
                    <span style={{ color: 'rgba(var(--text-primary-rgb),0.2)' }}>fits your goals?</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.14, ease }}
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-primary)', opacity: 0.6, maxWidth: 520 }}
                  >
                    Select a program to run a quick 2-question check. It takes under 30 seconds and routes you directly to the right intake form.
                  </motion.p>
                </div>

                {/* Programs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {PROGRAMS.map((prog, i) => (
                    <ProgramCard key={prog.id} prog={prog} index={i} onSelect={handleSelectProgram} />
                  ))}
                </div>

                {/* Footer note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease }}
                  className="text-xs mt-8 text-center"
                  style={{ color: 'var(--text-primary)', opacity: 0.3 }}
                >
                  Not sure? <a href="/intake/pre-screen" style={{ color: '#4890f7', opacity: 1 }}>Take the full pre-screen assessment</a> and we&apos;ll recommend the right fit.
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Pre-screen view */}
          {view === 'prescreen' && prog && (
            <motion.div
              key="prescreen"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <div className="container-tight relative z-10 max-w-xl" style={{ paddingTop: '100px', paddingBottom: '80px' }}>

                {/* Back */}
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 mb-8 text-xs font-medium transition-opacity duration-150"
                  style={{ color: 'var(--text-primary)', opacity: 0.45 }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.45' }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {step === 'bloods' ? 'Back' : 'All programs'}
                </button>

                {/* Program badge */}
                <div
                  className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full"
                  style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}
                >
                  <div style={{ color: prog.accent }}>{prog.icon}</div>
                  <span className="text-[11px] font-semibold" style={{ color: prog.accent }}>{prog.name}</span>
                </div>

                <AnimatePresence mode="wait">

                  {/* Q1: Symptoms */}
                  {step === 'symptoms' && (
                    <motion.div
                      key="q1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <p
                        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                        style={{ color: prog.accent }}
                      >
                        Quick check · 1 of 2
                      </p>
                      <h2
                        className="font-bold tracking-tight mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}
                      >
                        Which of these sounds like you?
                      </h2>
                      <p className="text-sm mb-7" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                        Select all that apply — or skip if none match.
                      </p>

                      <div className="flex flex-col gap-2 mb-8">
                        {prog.symptoms.map(s => {
                          const selected = selectedSymptoms.includes(s)
                          return (
                            <button
                              key={s}
                              onClick={() => toggleSymptom(s)}
                              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-150"
                              style={{
                                background: selected ? prog.accentBg : 'var(--surface)',
                                border: `1px solid ${selected ? prog.accentBorder : 'rgba(72,144,247,0.1)'}`,
                                color: 'var(--text-primary)',
                              }}
                            >
                              <div
                                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all duration-150"
                                style={{
                                  background: selected ? prog.accent : 'transparent',
                                  border: `1.5px solid ${selected ? prog.accent : 'rgba(255,255,255,0.2)'}`,
                                }}
                              >
                                {selected && (
                                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                                    <path d="M1.5 5l3 3 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm">{s}</span>
                            </button>
                          )
                        })}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleSymptomsNext}
                          className="btn-primary"
                          style={{ fontSize: '13px', padding: '13px 32px' }}
                        >
                          {selectedSymptoms.length > 0 ? 'Continue' : 'Skip — none apply'}
                          <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Q2: Blood work */}
                  {step === 'bloods' && (
                    <motion.div
                      key="q2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <p
                        className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3"
                        style={{ color: prog.accent }}
                      >
                        Quick check · 2 of 2
                      </p>
                      <h2
                        className="font-bold tracking-tight mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--text-primary)', lineHeight: 1.15 }}
                      >
                        Any recent blood work?
                      </h2>
                      <p className="text-sm mb-7" style={{ color: 'var(--text-primary)', opacity: 0.5 }}>
                        {prog.isPeptide
                          ? 'Not required for this program — but useful context for your doctor.'
                          : 'Within the last 6 months — a GP or private blood panel.'}
                      </p>

                      <div className="flex flex-col gap-2">
                        {(prog.isPeptide ? BLOODS_OPTIONS_PEPTIDE : BLOODS_OPTIONS_STANDARD).map(opt => (
                          <button
                            key={opt.label}
                            onClick={() => handleBloods(opt.value)}
                            className="flex items-center justify-between w-full text-left px-5 py-4 rounded-xl transition-all duration-150"
                            style={{
                              background: hasBloods === opt.value ? prog.accentBg : 'var(--surface)',
                              border: `1px solid ${hasBloods === opt.value ? prog.accentBorder : 'rgba(72,144,247,0.1)'}`,
                              color: 'var(--text-primary)',
                            }}
                          >
                            <span className="text-sm font-medium">{opt.label}</span>
                            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" style={{ color: prog.accent }} aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Confirm view */}
          {view === 'confirm' && prog && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="container-tight relative z-10 max-w-lg" style={{ paddingTop: '100px', paddingBottom: '80px' }}>

                {/* Check icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease }}
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-7"
                  style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M5 12l5 5L19 7" stroke={prog.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.18, ease }}
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full"
                  style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}` }}
                >
                  <div style={{ color: prog.accent }}>{prog.icon}</div>
                  <span className="text-[11px] font-semibold" style={{ color: prog.accent }}>{prog.name}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.24, ease }}
                  className="font-bold tracking-tight mb-4"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: 'clamp(26px, 3.5vw, 38px)', lineHeight: 1.1, color: 'var(--text-primary)' }}
                >
                  You&apos;re a strong fit.{' '}
                  <span style={{ background: `linear-gradient(135deg, ${prog.accent}, ${prog.accent}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Let&apos;s get started.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease }}
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: 'var(--text-primary)', opacity: 0.6, maxWidth: 420 }}
                >
                  {hasBloods
                    ? "Your intake form will take under 10 minutes. Bring your recent blood results — your doctor will review them before your consultation."
                    : "Your intake form will take under 10 minutes. We'll issue a referral for your blood panel — collected at any of 4,000+ accredited centres Australia-wide."}
                </motion.p>

                {selectedSymptoms.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.38, ease }}
                    className="mb-8 p-4 rounded-xl"
                    style={{ background: 'var(--surface)', border: '1px solid rgba(72,144,247,0.08)' }}
                  >
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--text-primary)', opacity: 0.35 }}>
                      Symptoms noted
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map(s => (
                        <span
                          key={s}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                          style={{ background: prog.accentBg, border: `1px solid ${prog.accentBorder}`, color: prog.accent }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.42, ease }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <button
                    onClick={handleStartIntake}
                    className="btn-primary"
                    style={{ fontSize: '14px', padding: '15px 36px' }}
                  >
                    Start {prog.name} intake
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={handleBack}
                    className="text-sm font-medium transition-opacity duration-150"
                    style={{ color: 'var(--text-primary)', opacity: 0.4 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.4' }}
                  >
                    ← Back
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6, ease }}
                  className="text-[11px] mt-6"
                  style={{ color: 'var(--text-primary)', opacity: 0.3 }}
                >
                  AHPRA-registered practitioners · Private & confidential · No lock-in contracts
                </motion.p>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
