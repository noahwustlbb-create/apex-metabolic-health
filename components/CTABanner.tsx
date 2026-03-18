'use client'

import { ArrowRight, Phone } from 'lucide-react'
import FadeUp from './FadeUp'

export default function CTABanner() {
  return (
    <section
      id="book-consultation"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Book a consultation"
    >
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#005F8E] via-[#004d74] to-[#0A3D8F]"
      />

      {/* Grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial highlight centre */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Bottom left decorative ring */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full
                   border border-white/10 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full
                   border border-white/08 pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6 text-white/55">
            Take the First Step
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Ready to optimise?
          </h2>
          <p className="text-lg md:text-xl text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
            Book a free consultation with an Apex doctor.
            No obligations. Real answers. Measurable results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href="https://calendly.com/apex-metabolic-health"   /* ← swap for real booking URL */
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 bg-white text-[#005F8E] font-black
                         px-8 py-4 rounded-md text-base
                         hover:bg-[#E8E8E8] transition-all duration-200
                         shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.35)]
                         hover:scale-[1.04]"
            >
              Book a Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            {/* Secondary — phone */}
            <a
              href="tel:+611300000000"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium
                         text-sm border border-white/20 hover:border-white/50
                         px-6 py-4 rounded-md transition-all duration-200"
            >
              <Phone size={15} />
              1300 000 000
            </a>
          </div>

          {/* Micro-trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10">
            {[
              'No referral required',
              'AHPRA-registered doctors',
              'Results within weeks',
              '100% online',
            ].map(item => (
              <span key={item} className="text-xs text-white/50 font-medium tracking-wide">
                ✓ {item}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
