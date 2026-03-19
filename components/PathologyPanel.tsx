'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const HORMONE_PANEL = [
  'Free & Total Testosterone',
  'Oestradiol (E2)',
  'SHBG',
  'FSH / LH',
  'Prolactin',
  'Thyroid Function — TSH / FT3 / FT4',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Full Blood Count (FBC)',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c',
  'High Sensitivity CRP',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

const METABOLIC_PANEL = [
  'Full Blood Count (FBC)',
  'Kidney Function (UEC) — Creatinine, eGFR, Electrolytes',
  'Liver Function (LFT) — ALT, AST, GGT, ALP, Bilirubin, Albumin',
  'Lipid Studies — Cholesterol, HDL, LDL, Triglycerides',
  'Glucose + HbA1c + Insulin',
  'Iron Studies',
  'Thyroid Function — TSH / FT3 / FT4',
  'High Sensitivity CRP',
  'Vitamin D',
  'Vitamin B12',
  'Magnesium, Calcium, Phosphate, Uric Acid',
]

export default function PathologyPanel() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const panelsRef = useRef(null)
  const panelsInView = useInView(panelsRef, { once: true, margin: '-60px' })

  return (
    <section
      id="pathology"
      className="relative section-pad overflow-hidden"
      style={{ backgroundColor: '#070a0d' }}
      aria-label="Pathology panels"
    >
      <div className="glow-rule" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(43,123,224,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container-tight relative z-10">
        <div ref={headingRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label mb-4"
          >
            PATHOLOGY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
          >
            What We Test
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#8899aa' }}
          >
            Every clinical decision is built on objective pathology data — not guesswork, not
            GP-standard screens. We test what&apos;s actually relevant.
          </motion.p>
        </div>

        <div ref={panelsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hormone Health Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(43,123,224,0.08)',
                  border: '1px solid rgba(43,123,224,0.2)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35M16 7l3-3m0 0h-3m3 0v3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  Hormone Health Panel
                </h3>
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase"
                  style={{ color: '#2b7be0' }}
                >
                  Hormone Programs
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {HORMONE_PANEL.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: '#2b7be0' }}
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="https://imedical.com.au/order/blood-tests/apexmeta-trt-panel&tracking=69bae136964db"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal w-full text-center text-xs"
            >
              Order Hormone Panel
            </a>
          </motion.div>

          {/* Metabolic Health Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={panelsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="apex-card p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-sm flex-shrink-0"
                style={{
                  backgroundColor: 'rgba(43,123,224,0.08)',
                  border: '1px solid rgba(43,123,224,0.2)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="#2b7be0" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#f0f4f8' }}
                >
                  Metabolic Health Panel
                </h3>
                <span
                  className="text-[10px] font-semibold tracking-wider uppercase"
                  style={{ color: '#2b7be0' }}
                >
                  Metabolic Programs
                </span>
              </div>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {METABOLIC_PANEL.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: '#2b7be0' }}
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed" style={{ color: '#8899aa' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="https://imedical.com.au/order/blood-tests/apex-meta-weightloss&tracking=69bae136964db"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal w-full text-center text-xs"
            >
              Order Metabolic Panel
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={panelsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-center text-xs mt-8"
          style={{ color: '#4a5a6a' }}
        >
          Panels are tailored by your doctor based on your program and clinical history. Additional
          markers may be requested where clinically indicated.
        </motion.p>
      </div>
    </section>
  )
}
