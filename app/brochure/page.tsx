import Image from 'next/image'

export const metadata = {
  title: 'Apex Metabolic Health — Clinical Brochure',
}

const PROGRAMS = [
  {
    name: 'Hormone Optimisation',
    color: '#2C74E8',
    desc: 'Comprehensive hormonal assessment and optimisation targeting testosterone, thyroid, and cortisol pathways for restored energy, body composition, and vitality.',
  },
  {
    name: 'Hormone & Performance',
    color: '#e05252',
    desc: 'Combined hormonal and performance biomarker analysis designed for men who train hard and demand more from their recovery and physical output.',
  },
  {
    name: 'Performance+',
    color: '#e8872c',
    desc: 'Our flagship program. Deep hormonal, metabolic, and performance analysis — the most complete clinical picture available. Built for high performers.',
  },
  {
    name: 'Metabolic Weight Loss',
    color: '#7c52e8',
    desc: 'Clinically supervised metabolic optimisation addressing the hormonal and cellular drivers of weight resistance that diet and exercise alone cannot fix.',
  },
  {
    name: 'Hair Restoration',
    color: '#2e9e52',
    desc: 'Evidence-based medical management of androgenic alopecia and follicular miniaturisation — targeted treatment based on what your bloodwork actually shows.',
  },
  {
    name: 'Skin Regeneration',
    color: '#c9a84c',
    desc: 'Doctor-prescribed regenerative protocols addressing the internal hormonal and cellular drivers of skin quality, texture, and visible ageing.',
  },
  {
    name: 'Injury Repair & Recovery',
    color: '#1a9e8f',
    desc: 'Medically supervised regenerative protocols that accelerate tissue repair, cellular healing, and recovery from soft tissue injury and surgery.',
  },
  {
    name: 'Advanced Biomarker Analysis',
    color: '#4890f7',
    desc: 'Comprehensive blood panel profiling going far beyond the standard GP screen — delivering a precise hormonal, metabolic, and cellular health picture.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Complete Your Assessment',
    desc: 'Answer our short health questionnaire online. Takes 3–5 minutes. No referral required.',
  },
  {
    n: '02',
    title: 'Advanced Biomarker Analysis',
    desc: 'We refer you to a local accredited pathology centre. Results are reviewed by your Apex doctor.',
  },
  {
    n: '03',
    title: 'Telehealth Consultation',
    desc: 'Your AHPRA-registered doctor interprets your results and builds a personalised clinical protocol.',
  },
  {
    n: '04',
    title: 'Ongoing Optimisation',
    desc: 'Treatment is coordinated through our TGA-compliant pharmacy partner. Scheduled reviews built in.',
  },
]

const WHY = [
  { label: 'No GP Referral Required', desc: 'Direct access to specialist doctors. No waiting rooms, no gatekeeping.' },
  { label: 'AHPRA-Registered Doctors', desc: 'Every consultation is conducted by a fully registered Australian medical practitioner.' },
  { label: 'Clinically Indicated Treatment', desc: 'Every protocol is based on your pathology — never generic, never guesswork.' },
  { label: 'TGA-Compliant Dispensary', desc: 'Medication fulfilment through our accredited compounding pharmacy partner.' },
  { label: '100% Online, Australia-Wide', desc: 'Accessible from anywhere in Australia via secure telehealth platform.' },
  { label: 'Ongoing Clinical Relationship', desc: 'Scheduled reviews and biological monitoring built into every program.' },
]

export default function BrochurePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f0f0f0;
          font-family: 'Inter', sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto 24px;
          background: #0c131f;
          position: relative;
          overflow: hidden;
          page-break-after: always;
        }

        @media print {
          body { background: #0c131f; }
          .no-print { display: none !important; }
          .page { margin: 0; box-shadow: none; }
          @page { size: A4; margin: 0; }
        }

        h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{
        position: 'fixed', top: 20, right: 20, zIndex: 999,
        display: 'flex', gap: 10,
      }}>
        <button
          onClick={() => window.print()}
          style={{
            background: '#2C74E8', color: '#fff', border: 'none',
            padding: '10px 24px', borderRadius: 999, fontWeight: 700,
            fontSize: 13, letterSpacing: '0.1em', cursor: 'pointer',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          Print / Save PDF
        </button>
      </div>

      {/* ─── PAGE 1: COVER ─── */}
      <div className="page" style={{ display: 'flex', flexDirection: 'column' }}>

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(44,116,232,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        {/* Top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', height: '320px', zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(44,116,232,0.18) 0%, transparent 65%)',
        }} />

        {/* Bottom glow */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '280px', height: '280px', zIndex: 0,
          background: 'radial-gradient(ellipse at 100% 100%, rgba(44,116,232,0.12) 0%, transparent 65%)',
        }} />

        {/* Header bar */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '28px 36px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(44,116,232,0.15)',
        }}>
          <Image src="/logo.png" alt="Apex Metabolic Health" width={160} height={64}
            style={{ mixBlendMode: 'screen', filter: 'brightness(0) invert(1)', height: 38, width: 'auto' }}
            unoptimized
          />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, letterSpacing: '0.2em', color: '#4890f7', textTransform: 'uppercase', fontWeight: 700 }}>
              Clinical Brochure
            </div>
            <div style={{ fontSize: 7, color: '#4a5a6a', marginTop: 3, letterSpacing: '0.1em' }}>
              apexmetabolichealth.com.au
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '52px 36px 0', flex: 1 }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 2,
            border: '1px solid rgba(72,144,247,0.25)',
            backgroundColor: 'rgba(72,144,247,0.07)',
            marginBottom: 28,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4890f7' }} />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: '#a9c7ff', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}>
              Doctor-Led Telehealth — Australia-Wide
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontSize: 44, fontWeight: 800, lineHeight: 1.03,
            color: '#f0f4f8', letterSpacing: '-0.02em',
            maxWidth: '130mm', marginBottom: 20,
          }}>
            Your GP Said<br />
            <span style={{
              background: 'linear-gradient(135deg, #7AB8FF 0%, #2C74E8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Everything Looks Normal.
            </span>
          </h1>
          <h1 style={{
            fontSize: 44, fontWeight: 800, lineHeight: 1.03,
            color: '#f0f4f8', letterSpacing: '-0.02em',
            maxWidth: '130mm', marginBottom: 32,
          }}>
            You Know It Doesn't.
          </h1>

          {/* Mission copy */}
          <p style={{ fontSize: 11, lineHeight: 1.8, color: '#8899aa', maxWidth: '120mm', marginBottom: 12 }}>
            Our mission is to simplify access to advanced, clinically guided therapies beyond traditional healthcare. We've built a modern healthcare model that streamlines patient access to prescription treatment and medication designed to support hormonal optimisation, recovery, and performance — positioning us at the forefront of next-generation healthcare.
          </p>
          <p style={{ fontSize: 10, lineHeight: 1.7, color: 'rgba(136,153,170,0.6)', maxWidth: '110mm', marginBottom: 48 }}>
            No referrals. No waitlists. No compromise — a streamlined process from assessment to treatment, delivered entirely online.
          </p>

          {/* Stat strip */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8,
            overflow: 'hidden', maxWidth: '148mm',
          }}>
            {[
              { v: '< 48h', l: 'To First Consult' },
              { v: '50+', l: 'Biomarkers Analysed' },
              { v: '100%', l: 'Online' },
              { v: 'AHPRA', l: 'Registered Doctors' },
            ].map((s, i) => (
              <div key={s.l} style={{
                padding: '14px 12px', textAlign: 'center',
                backgroundColor: 'rgba(21,28,40,0.8)',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4890f7', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}>{s.v}</div>
                <div style={{ fontSize: 7, color: '#4a5a6a', marginTop: 4, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cover footer */}
        <div style={{
          position: 'relative', zIndex: 1,
          margin: '40px 36px 28px',
          padding: '16px 20px',
          borderRadius: 8,
          backgroundColor: 'rgba(21,28,40,0.6)',
          border: '1px solid rgba(44,116,232,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: '#4890f7', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4 }}>Get Started Today</div>
            <div style={{ fontSize: 10, color: '#8899aa' }}>apexmetabolichealth.com.au</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, color: '#4a5a6a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>AHPRA-Registered Doctors</div>
            <div style={{ fontSize: 8, color: '#4a5a6a', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Australia-Wide Telehealth</div>
          </div>
        </div>

        {/* Glow rule bottom */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(44,116,232,0.4), transparent)' }} />
      </div>

      {/* ─── PAGE 2: PROGRAMS + HOW IT WORKS ─── */}
      <div className="page">

        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(44,116,232,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', zIndex: 0,
          background: 'radial-gradient(ellipse at 100% 0%, rgba(44,116,232,0.1) 0%, transparent 65%)',
        }} />

        {/* Header */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '22px 36px 18px',
          borderBottom: '1px solid rgba(44,116,232,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Image src="/logo.png" alt="Apex Metabolic Health" width={120} height={48}
            style={{ mixBlendMode: 'screen', filter: 'brightness(0) invert(1)', height: 30, width: 'auto' }}
            unoptimized
          />
          <span style={{ fontSize: 7, color: '#4a5a6a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Clinical Programs</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '28px 36px' }}>

          {/* Section: Programs */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.22em', color: '#4890f7', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
              Eight Clinical Programs
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f0f4f8', letterSpacing: '-0.01em', marginBottom: 6 }}>
              Evidence-Based Protocols.{' '}
              <span style={{ background: 'linear-gradient(135deg, #7AB8FF 0%, #2C74E8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Individually Prescribed.
              </span>
            </h2>
            <p style={{ fontSize: 9, color: '#8899aa', lineHeight: 1.7, maxWidth: '140mm' }}>
              Every protocol begins with advanced biomarker analysis. All treatment is clinically indicated and doctor-prescribed based on your pathology — never generic, never off-the-shelf.
            </p>
          </div>

          {/* Programs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 32 }}>
            {PROGRAMS.map((p) => (
              <div key={p.name} style={{
                padding: '12px 14px',
                backgroundColor: 'rgba(21,28,40,0.7)',
                borderRadius: 8,
                border: `1px solid ${p.color}22`,
                borderLeft: `3px solid ${p.color}`,
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#f0f4f8', marginBottom: 5, fontFamily: 'Space Grotesk, sans-serif' }}>{p.name}</div>
                <div style={{ fontSize: 8, color: '#8899aa', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(44,116,232,0.25), transparent)', marginBottom: 28 }} />

          {/* How It Works */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.22em', color: '#4890f7', textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>
              The Process
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4f8', letterSpacing: '-0.01em', marginBottom: 16 }}>
              How It Works
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{ position: 'relative' }}>
                  {i < STEPS.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 12, left: '60%', right: -4,
                      height: 1, background: 'rgba(44,116,232,0.2)',
                    }} />
                  )}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    backgroundColor: 'rgba(44,116,232,0.15)',
                    border: '1px solid rgba(44,116,232,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 8,
                  }}>
                    <span style={{ fontSize: 7, fontWeight: 800, color: '#4890f7', fontFamily: 'Space Grotesk, sans-serif' }}>{s.n}</span>
                  </div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#f0f4f8', marginBottom: 4, fontFamily: 'Space Grotesk, sans-serif' }}>{s.title}</div>
                  <div style={{ fontSize: 7.5, color: '#8899aa', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── PAGE 3: WHY APEX + CTA ─── */}
      <div className="page">
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(44,116,232,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', height: '300px', zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(44,116,232,0.15) 0%, transparent 60%)',
        }} />

        {/* Header */}
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '22px 36px 18px',
          borderBottom: '1px solid rgba(44,116,232,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Image src="/logo.png" alt="Apex Metabolic Health" width={120} height={48}
            style={{ mixBlendMode: 'screen', filter: 'brightness(0) invert(1)', height: 30, width: 'auto' }}
            unoptimized
          />
          <span style={{ fontSize: 7, color: '#4a5a6a', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Why Apex</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: '32px 36px' }}>

          <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.22em', color: '#4890f7', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Space Grotesk, sans-serif' }}>
            Why Apex Metabolic Health
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#f0f4f8', letterSpacing: '-0.01em', marginBottom: 8 }}>
            A Different Kind of Clinic.
          </h2>
          <p style={{ fontSize: 9.5, color: '#8899aa', lineHeight: 1.7, maxWidth: '135mm', marginBottom: 32 }}>
            We are not a wellness brand. We are a medical clinic — accessible, modern, and built for men who want real answers, not reassurance.
          </p>

          {/* Why grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36 }}>
            {WHY.map((w) => (
              <div key={w.label} style={{
                display: 'flex', gap: 12, padding: '14px 16px',
                backgroundColor: 'rgba(21,28,40,0.6)',
                borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  backgroundColor: 'rgba(44,116,232,0.15)',
                  border: '1px solid rgba(44,116,232,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5.5L4 8l4.5-5.5" stroke="#4890f7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: '#f0f4f8', marginBottom: 3, fontFamily: 'Space Grotesk, sans-serif' }}>{w.label}</div>
                  <div style={{ fontSize: 7.5, color: '#8899aa', lineHeight: 1.6 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(44,116,232,0.25), transparent)', marginBottom: 32 }} />

          {/* CTA block */}
          <div style={{
            padding: '28px 32px',
            backgroundColor: 'rgba(21,28,40,0.8)',
            borderRadius: 12,
            border: '1px solid rgba(44,116,232,0.2)',
            textAlign: 'center',
            marginBottom: 32,
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#f0f4f8', letterSpacing: '-0.01em', marginBottom: 10 }}>
              Get Answers.{' '}
              <span style={{ background: 'linear-gradient(135deg, #7AB8FF 0%, #2C74E8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Not Reassurance.
              </span>
            </h2>
            <p style={{ fontSize: 9.5, color: '#8899aa', lineHeight: 1.7, maxWidth: '110mm', margin: '0 auto 20px' }}>
              Start your assessment online today. No referral required. First consultation available within 48 hours.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              padding: '8px 8px 8px 24px', borderRadius: 999,
              backgroundColor: 'rgba(44,116,232,0.12)',
              border: '1px solid rgba(44,116,232,0.4)',
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#f0f4f8', letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif' }}>
                apexmetabolichealth.com.au
              </span>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                backgroundColor: '#2C74E8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Legal footer */}
          <div style={{
            padding: '14px 0 0',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            <p style={{ fontSize: 6.5, color: '#4a5a6a', lineHeight: 1.7, textAlign: 'center' }}>
              All consultations conducted by AHPRA-registered medical practitioners. This brochure does not constitute medical advice.<br />
              Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd. Treatment is subject to clinical assessment and individual suitability.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
