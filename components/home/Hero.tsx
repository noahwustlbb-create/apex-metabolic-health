import Image from 'next/image'
import Link from 'next/link'

/**
 * HOOK. One photograph, one line, one button.
 *
 * The image is the LCP element and is server-painted (next/image priority);
 * the copy enters after it in the order the eye should read: headline,
 * line, button, practicalities. Entrance is CSS (.hero-in / .hero-media) so
 * nothing waits on hydration.
 *
 * `#hero-anatomy-slot` is reserved for the interactive human-anatomy piece
 * (Noah is sourcing the reference). It sits over the right half of the
 * photograph on desktop and is empty until that lands.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="band-dark relative overflow-hidden"
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'flex-end' }}
      aria-label="Introduction"
    >
      {/* Media */}
      <div className="absolute inset-0 hero-media" aria-hidden="true">
        <div className="absolute inset-0 hero-drift">
          {/* Portrait crop under 768px, the wide frame above it. */}
          <Image
            src="/photos/hero-window-portrait.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
            style={{ objectPosition: '50% 30%' }}
          />
          <Image
            src="/photos/hero-window-wide.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover hidden md:block"
            style={{ objectPosition: '62% 50%' }}
          />
        </div>
        {/* Legibility: a left-to-right and bottom-up ramp, both quiet. */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,9,14,0.78) 0%, rgba(7,9,14,0.55) 38%, rgba(7,9,14,0.12) 70%, rgba(7,9,14,0) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,9,14,0.35) 0%, rgba(7,9,14,0) 30%, rgba(7,9,14,0.2) 70%, rgba(11,13,18,0.96) 100%)' }} />
      </div>

      {/* Reserved for the interactive anatomy piece. */}
      <div id="hero-anatomy-slot" className="absolute inset-y-0 right-0 hidden lg:block" style={{ width: '46%' }} aria-hidden="true" />

      <div className="container-x relative z-10" style={{ paddingTop: 'clamp(140px, 18vh, 200px)', paddingBottom: 'clamp(120px, 14vh, 140px)' }}>
        <div style={{ maxWidth: 880 }}>
          <p className="t-mono hero-in" style={{ animationDelay: '0ms', color: 'rgba(242,244,247,0.72)', marginBottom: 22 }}>
            Doctor-led telehealth · Australia-wide · No GP referral
          </p>

          <h1 className="t-display hero-in" style={{ animationDelay: '90ms', color: '#f2f4f7', marginBottom: 26 }}>
            Your biology isn&apos;t broken.
            <br />
            <span style={{ color: 'var(--blue)' }}>It isn&apos;t being measured.</span>
          </h1>

          <p className="t-lead hero-in" style={{ animationDelay: '220ms', color: 'rgba(242,244,247,0.82)', maxWidth: '46ch', marginBottom: 40 }}>
            Hormone and metabolic care for adults who already know something is off. A full panel, an AHPRA-registered doctor, and a protocol built on your numbers.
          </p>

          <div className="hero-in flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: '340ms', marginBottom: 34 }}>
            <Link
              href="/start"
              className="btn-primary"
              style={{ fontSize: 15, padding: '18px 36px', borderRadius: 999 }}
            >
              Start your assessment
              <svg viewBox="0 0 16 16" fill="none" width={15} height={15} aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href="#pathway" className="link-draw text-[14px] font-medium" style={{ color: 'rgba(242,244,247,0.85)' }}>
              See how it works
            </a>
          </div>

          <p className="hero-in text-[12.5px] leading-relaxed" style={{ animationDelay: '460ms', color: 'rgba(242,244,247,0.6)', letterSpacing: '0.02em' }}>
            Two-minute assessment · Bloods within 48 hours · Consult by phone or video
          </p>

          <div className="scroll-cue hero-in hidden md:block" style={{ animationDelay: '900ms', marginTop: 44, color: 'rgba(242,244,247,0.5)' }} aria-hidden="true">
            <span className="t-mono" style={{ fontSize: 9.5 }}>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}
