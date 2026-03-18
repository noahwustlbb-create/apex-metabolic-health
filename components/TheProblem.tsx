'use client'

import FadeUp from './FadeUp'

const PROBLEMS = [
  {
    number: '01',
    heading: "You're doing everything right — and still exhausted.",
    body: "Quality sleep. Clean diet. Regular training. But you wake up depleted. Brain fog by mid-morning. Energy crashes by 3pm. You've optimised your habits and you're still running on empty. Something isn't adding up.",
  },
  {
    number: '02',
    heading: 'Your body composition has shifted. Against you.',
    body: "Muscle is harder to build and harder to keep. Fat is creeping in around the midsection despite the effort you're putting into the gym. You're working harder for diminishing returns. The feedback loop is broken.",
  },
  {
    number: '03',
    heading: 'Your edge is fading — and you feel it.',
    body: "Drive. Focus. Libido. Competitive fire. The qualities that define a high-performing man don't disappear overnight — they erode quietly. And then one day you notice the gap between who you were and who you are.",
  },
]

export default function TheProblem() {
  return (
    <section id="problem" className="relative py-24 md:py-32 bg-[#080808] overflow-hidden">
      <div className="divider-top" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeUp className="text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#005F8E] uppercase mb-4">
            The Reality
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Sound familiar?
          </h2>
          <p className="text-[#9E9E9E] text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            After 35, biological decline doesn&apos;t announce itself. It accumulates.
            Quietly. Until you can&apos;t ignore it.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROBLEMS.map((p, i) => (
            <FadeUp key={p.number} delay={i * 0.1}>
              <div
                className="relative apex-card p-8 h-full group cursor-default"
              >
                {/* Decorative number watermark */}
                <span
                  className="absolute top-5 right-6 text-[72px] font-black leading-none
                             text-[#181818] select-none group-hover:text-[#1c2530] transition-colors duration-300"
                  aria-hidden="true"
                >
                  {p.number}
                </span>

                {/* Accent bar */}
                <div className="w-10 h-0.5 bg-gradient-to-r from-[#005F8E] to-[#0A3D8F] mb-7" />

                <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-4 pr-8">
                  {p.heading}
                </h3>
                <p className="text-sm md:text-base text-[#9E9E9E] leading-relaxed">
                  {p.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-14">
          <p className="text-base md:text-lg text-[#9E9E9E] max-w-2xl mx-auto">
            This isn&apos;t about getting older.{' '}
            <span className="text-white font-semibold">
              It&apos;s about declining hormones. And hormones can be optimised.
            </span>
          </p>
          <a
            href="#book-consultation"
            className="inline-block mt-7 text-sm font-semibold text-[#4DB8E8]
                       hover:text-white border-b border-[#005F8E]/40 hover:border-white
                       transition-all duration-200 pb-0.5 tracking-wide"
          >
            Find out what&apos;s driving your decline →
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
