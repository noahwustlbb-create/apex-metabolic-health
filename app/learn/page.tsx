'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as const
const ACCENT = '#4890f7'

const ARTICLES = [
  {
    category: 'Hormones',
    readTime: '6 min read',
    title: 'Low Testosterone: What GPs Don\'t Test For',
    summary: 'A standard testosterone test tells you almost nothing. Total testosterone, reference ranges, and why the gap between "normal" and "optimal" is larger than most men realise.',
    slug: 'low-testosterone-what-gps-dont-test-for',
    featured: true,
    tags: ['Testosterone', 'Blood panels', 'GPs'],
  },
  {
    category: 'Diagnostics',
    readTime: '5 min read',
    title: 'How to Read a Hormone Panel',
    summary: 'Free vs total testosterone. SHBG. LH, FSH, and what they tell you about the cause — not just the symptom. A plain-English guide to interpreting your own results.',
    slug: 'how-to-read-a-hormone-panel',
    featured: false,
    tags: ['Blood panels', 'Interpretation', 'SHBG'],
  },
  {
    category: 'Metabolic Health',
    readTime: '7 min read',
    title: 'The Gap Between Normal and Optimal',
    summary: 'Reference ranges are designed to identify disease in large populations. They were never intended to define what "optimal" means for an individual. Here\'s why that distinction matters.',
    slug: 'normal-vs-optimal-metabolic-health',
    featured: false,
    tags: ['Reference ranges', 'Optimisation', 'Metabolic'],
  },
  {
    category: 'Monitoring',
    readTime: '4 min read',
    title: 'What Is Biomarker Tracking — and Why Does It Matter?',
    summary: 'A single blood test is a snapshot. Biomarker tracking over time reveals trends, responses to protocol changes, and the biological levers that actually move your results.',
    slug: 'what-is-biomarker-tracking',
    featured: false,
    tags: ['Tracking', 'Biomarkers', 'Data'],
  },
  {
    category: 'Clinical Care',
    readTime: '4 min read',
    title: 'The 4-Month Review Cycle: Why Oversight Isn\'t Optional',
    summary: 'Protocol optimisation is not a one-time event. Why ongoing clinical reviews — and the data they generate — are what separates real outcomes from guesswork.',
    slug: 'the-4-month-review-cycle',
    featured: false,
    tags: ['Reviews', 'Protocol', 'Ongoing care'],
  },
  {
    category: 'Longevity',
    readTime: '5 min read',
    title: 'Biological Age vs Chronological Age',
    summary: 'Your birth year and your biology are two different numbers. What drives the gap between them, and which biomarkers are most predictive of how your body is actually aging.',
    slug: 'biological-age-vs-chronological-age',
    featured: false,
    tags: ['Longevity', 'Biological age', 'Markers'],
  },
]

const TOPICS = [
  { label: 'All', count: ARTICLES.length },
  { label: 'Hormones', count: 1 },
  { label: 'Diagnostics', count: 1 },
  { label: 'Metabolic Health', count: 1 },
  { label: 'Monitoring', count: 1 },
  { label: 'Longevity', count: 1 },
]

export default function LearnPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  const featured = ARTICLES.find(a => a.featured)!
  const rest = ARTICLES.filter(a => !a.featured)

  return (
    <>
      <Nav />
      <main>

        {/* Hero */}
        <section
          ref={heroRef}
          className="relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg)', paddingTop: '160px', paddingBottom: '80px' }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(72,144,247,0.06) 0%, transparent 60%)' }}
          />
          <div className="container-tight relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              className="label mb-5"
            >
              Clinical Education
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-bold tracking-tight mb-6"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(38px, 5vw, 68px)',
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                color: 'var(--text-primary)',
              }}
            >
              Understand your{' '}
              <span style={{
                background: 'linear-gradient(135deg, #4890f7, #6ba8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                biology.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.18, ease }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-primary)', maxWidth: '520px', opacity: 0.75 }}
            >
              Clinical articles written by the Apex medical team. No supplements. No headlines. Just the science behind how your hormones, metabolism, and biomarkers actually work.
            </motion.p>
          </div>
        </section>

        {/* Featured article */}
        <section className="relative" style={{ backgroundColor: 'var(--surface)', paddingBottom: '60px' }}>
          <div className="glow-rule" aria-hidden="true" />
          <div className="container-tight">
            {(() => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, ease }}
                >
                  <Link
                    href={`/learn/${featured.slug}`}
                    className="block rounded-2xl overflow-hidden transition-all duration-300 group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(72,144,247,0.06) 0%, var(--bg) 100%)',
                      border: '1px solid rgba(72,144,247,0.18)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.35)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(72,144,247,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.18)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <span
                            className="text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(72,144,247,0.1)', color: ACCENT, border: '1px solid rgba(72,144,247,0.2)' }}
                          >
                            {featured.category}
                          </span>
                          <span className="text-[11px]" style={{ color: 'var(--text-primary)', opacity: 0.45 }}>
                            {featured.readTime}
                          </span>
                          <span
                            className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm"
                            style={{ background: 'rgba(72,144,247,0.06)', color: ACCENT, border: '1px solid rgba(72,144,247,0.15)' }}
                          >
                            Featured
                          </span>
                        </div>
                        <h2
                          className="font-bold tracking-tight mb-4"
                          style={{
                            fontFamily: 'var(--font-space-grotesk)',
                            fontSize: 'clamp(22px, 2.5vw, 34px)',
                            lineHeight: 1.12,
                            letterSpacing: '-0.02em',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {featured.title}
                        </h2>
                        <p className="text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.7 }}>
                          {featured.summary}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <span
                          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                          style={{ color: ACCENT }}
                        >
                          Read article
                          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })()}
          </div>
        </section>

        {/* Article grid */}
        <section
          className="relative section-pad"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          <div className="warm-rule" aria-hidden="true" />
          <div ref={gridRef} className="container-tight">
            <div className="flex items-center justify-between mb-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={gridInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, ease }}
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)', opacity: 0.5 }}
              >
                {rest.length} more articles
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((article, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: '-40px' })
                return (
                  <motion.div
                    key={article.slug}
                    ref={ref}
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  >
                    <Link
                      href={`/learn/${article.slug}`}
                      className="flex flex-col h-full rounded-2xl p-6 transition-all duration-200"
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid rgba(72,144,247,0.1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.28)'; e.currentTarget.style.background = 'var(--elevated)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(72,144,247,0.1)'; e.currentTarget.style.background = 'var(--surface)' }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className="text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(72,144,247,0.08)', color: ACCENT, border: '1px solid rgba(72,144,247,0.16)' }}
                        >
                          {article.category}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--text-primary)', opacity: 0.4 }}>
                          {article.readTime}
                        </span>
                      </div>
                      <h3
                        className="text-base font-semibold mb-3 flex-1"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', lineHeight: 1.3 }}
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-primary)', opacity: 0.65 }}>
                        {article.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full" style={{ background: 'var(--elevated-high)', color: 'var(--text-primary)', opacity: 0.6 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="relative" style={{ backgroundColor: 'var(--surface)', paddingTop: '0', paddingBottom: '80px' }}>
          <div className="container-tight">
            {(() => {
              const ref = useRef(null)
              const inView = useInView(ref, { once: true, margin: '-40px' })
              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease }}
                  className="rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(72,144,247,0.05) 0%, transparent 100%)',
                    border: '1px solid rgba(72,144,247,0.14)',
                  }}
                >
                  <div>
                    <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      Ready to get your own results?
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)', opacity: 0.6 }}>
                      Start with a 5-minute assessment. We&apos;ll match you to the right program and panel.
                    </p>
                  </div>
                  <Link
                    href="/intake/pre-screen"
                    className="btn-primary whitespace-nowrap flex-shrink-0"
                  >
                    Start assessment
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </motion.div>
              )
            })()}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
