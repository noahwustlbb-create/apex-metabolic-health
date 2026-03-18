'use client'

import { Zap, TrendingUp, Target, Sparkles, Wind, ShieldPlus, ArrowRight } from 'lucide-react'
import FadeUp from './FadeUp'
import type { LucideIcon } from 'lucide-react'

interface Program {
  icon: LucideIcon
  name: string
  description: string
  tag?: string
}

const PROGRAMS: Program[] = [
  {
    icon: Zap,
    name: 'Hormone Health Optimisation',
    description:
      'Restore hormonal balance for energy, body composition, libido, and long-term vitality. Fully pathology-guided and physician-supervised.',
    tag: 'Most Popular',
  },
  {
    icon: TrendingUp,
    name: 'Performance & Peptide Protocols',
    description:
      'Advanced doctor-prescribed protocols to accelerate recovery, enhance muscle performance, and support cellular repair from the inside out.',
  },
  {
    icon: Target,
    name: 'Weight Loss Program',
    description:
      'Clinically supervised metabolic intervention. Evidence-based, personalised to your biomarkers, and built for sustainable results — not crash diets.',
  },
  {
    icon: Sparkles,
    name: 'Skin Regeneration',
    description:
      'Doctor-prescribed treatments to restore skin quality, reduce the visible signs of ageing, and improve texture and tone.',
  },
  {
    icon: Wind,
    name: 'Hair Restoration',
    description:
      'Medical-grade protocols to halt hair loss and stimulate regrowth at the follicular level. Early intervention matters.',
  },
  {
    icon: ShieldPlus,
    name: 'Injury Repair',
    description:
      'Regenerative protocols to accelerate healing, reduce recovery time, and restore peak physical performance post-injury.',
  },
]

export default function Programs() {
  return (
    <section id="programs" className="relative py-24 md:py-32 bg-[#080808]">
      <div className="divider-top" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeUp className="text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#005F8E] uppercase mb-4">
            Our Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Every program. One goal.
            <br />
            <span className="text-[#9E9E9E] font-light">Your best performance.</span>
          </h2>
          <p className="text-[#9E9E9E] max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Each protocol is built around your pathology results and overseen by a doctor.
            No guessing. No generics. No cookie-cutter plans.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon
            return (
              <FadeUp key={program.name} delay={i * 0.07}>
                <div className="group relative apex-card p-7 h-full flex flex-col">

                  {/* Popular badge */}
                  {program.tag && (
                    <span
                      className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.12em] uppercase
                                 bg-[#005F8E]/15 text-[#4DB8E8] border border-[#005F8E]/30
                                 px-3 py-1 rounded-full"
                    >
                      {program.tag}
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#005F8E]/14 to-[#0A3D8F]/08
                               border border-[#005F8E]/20 flex items-center justify-center mb-5
                               group-hover:border-[#005F8E]/45 group-hover:from-[#005F8E]/20
                               transition-all duration-300"
                  >
                    <Icon size={22} className="text-[#005F8E]" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 leading-snug pr-8">
                    {program.name}
                  </h3>
                  <p className="text-sm text-[#9E9E9E] leading-relaxed flex-1 mb-5">
                    {program.description}
                  </p>

                  <a
                    href="#book-consultation"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold
                               text-[#005F8E] hover:text-[#4DB8E8] transition-colors duration-200"
                  >
                    Learn More
                    <ArrowRight
                      size={14}
                      className="group-hover/link:translate-x-1 transition-transform duration-200"
                    />
                  </a>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
