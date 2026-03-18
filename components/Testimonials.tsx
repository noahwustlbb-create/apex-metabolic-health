'use client'

import { Star, Quote } from 'lucide-react'
import FadeUp from './FadeUp'

interface Testimonial {
  name: string
  age: number
  location: string
  rating: number
  program: string
  text: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'James R.',
    age: 42,
    location: 'Brisbane, QLD',
    rating: 5,
    program: 'Hormone Health',
    text: "Six months in, my energy levels are back to what they were in my thirties. Work performance, gym results, and everything in between has improved. I wake up feeling like myself for the first time in years. Best investment I've made.",
  },
  {
    name: 'Michael T.',
    age: 38,
    location: 'Sydney, NSW',
    rating: 5,
    program: 'Performance Protocol',
    text: "The whole process was smoother than I expected. The doctor was thorough, the protocol was explained clearly, and I saw real results within weeks. I now recommend Apex to every man I know over 35. No hesitation.",
  },
  {
    name: 'Daniel W.',
    age: 51,
    location: 'Melbourne, VIC',
    rating: 5,
    program: 'Hormone Health',
    text: "I was sceptical about telehealth — that changed fast. The quality of care here is better than anything I've experienced at a GP in years. I'm operating at full capacity again. The body I thought I'd lost in my forties is back.",
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 bg-[#080808]">
      <div className="divider-top" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeUp className="text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#005F8E] uppercase mb-4">
            Patient Results
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            What our patients say.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div
                className="apex-card p-8 h-full flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  ))}
                </div>

                {/* Quote mark */}
                <Quote size={22} className="text-[#005F8E]/30 mb-3 flex-shrink-0" aria-hidden="true" />

                {/* Text */}
                <p className="text-[#9E9E9E] text-sm md:text-[15px] leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#1E1E1E] pt-5">
                  <div>
                    <p className="font-bold text-white text-sm">
                      {t.name}, {t.age}
                    </p>
                    <p className="text-xs text-[#5A5A5A] mt-0.5">{t.location}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-wider uppercase
                               bg-[#005F8E]/10 text-[#4DB8E8] border border-[#005F8E]/20
                               px-2.5 py-1 rounded-full whitespace-nowrap"
                  >
                    {t.program}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-10">
          <p className="text-xs text-[#3E3E3E] max-w-2xl mx-auto leading-relaxed">
            * Testimonials are indicative only. Individual results may vary. All treatments are prescribed
            by AHPRA-registered Australian medical practitioners at their clinical discretion.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
