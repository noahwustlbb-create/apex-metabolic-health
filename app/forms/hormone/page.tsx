'use client'

const MEDICAL_CONDITIONS = [
  'Cancer', 'Hypoglycaemia', 'Diabetes', 'Kidney Stones / Infections',
  'Abnormal Liver Function Tests', 'Seizures', 'High Blood Pressure',
  'Palpitations or Irregular Heartbeat', 'Deep Vein Thrombosis (DVT)',
  'Anaemia', 'Iron Deficiency', 'Agitation or Anxiety', 'Depression',
  'Muscle Pain', 'Hair Loss',
]

const SCORES = Array.from({ length: 11 }, (_, i) => i)

function Field({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px', color: '#444' }}>{label}</div>
      <div style={{ borderBottom: '1px solid #999', minHeight: '20px', width: '100%' }} />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: '5px 10px',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        marginBottom: '12px',
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function Grid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px 16px', marginBottom: '10px' }}>
      {children}
    </div>
  )
}

export default function HormoneFormPDF() {
  const handlePrint = () => window.print()

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          @page { margin: 15mm; size: A4; }
        }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .page { background: white; }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: '#1a1a2e', padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ color: 'white', fontWeight: 700, fontSize: '14px', fontFamily: 'Arial' }}>
          Hormone Program Intake Form — Print / Save as PDF
        </span>
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#2b7be0', color: 'white', border: 'none',
            padding: '10px 28px', borderRadius: '4px', fontWeight: 700,
            fontSize: '13px', cursor: 'pointer', letterSpacing: '0.08em',
          }}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* Form */}
      <div className="page" style={{ maxWidth: '794px', margin: '0 auto', padding: '60px 48px 48px', paddingTop: '80px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #1a1a2e' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1a1a2e', letterSpacing: '0.05em' }}>APEX METABOLIC HEALTH</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '3px' }}>Doctor-Led Telehealth — Australia-Wide</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#2b7be0' }}>HORMONE PROGRAM</div>
            <div style={{ fontSize: '10px', color: '#555' }}>Pre-Screen Intake Form</div>
            <div style={{ fontSize: '9px', color: '#999', marginTop: '4px' }}>Date: ___________________</div>
          </div>
        </div>

        {/* Step 1: Personal Details */}
        <Section title="1. Personal Details">
          <Grid cols={3}>
            <Field label="Surname" />
            <Field label="First Name" />
            <Field label="Gender" />
          </Grid>
          <Grid cols={3}>
            <Field label="Date of Birth" />
            <Field label="Nationality" />
            <Field label="Occupation" />
          </Grid>
          <Grid cols={1}>
            <Field label="Home Address" wide />
          </Grid>
          <Grid cols={3}>
            <Field label="Suburb" />
            <Field label="State" />
            <Field label="Postcode" />
          </Grid>
          <Grid cols={3}>
            <Field label="Home Phone" />
            <Field label="Work Phone" />
            <Field label="Mobile" />
          </Grid>
          <Grid cols={2}>
            <Field label="Email" />
            <Field label="Confirm Email" />
          </Grid>
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Are you of Aboriginal or Torres Strait Islander origin?</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Yes', 'No', 'Prefer not to say'].map(o => (
                <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px' }}>
                  <div style={{ width: '12px', height: '12px', border: '1px solid #999', flexShrink: 0 }} /> {o}
                </label>
              ))}
            </div>
          </div>
        </Section>

        {/* Step 2: Medical Background */}
        <Section title="2. Medical Background">
          <Grid cols={3}>
            <Field label="GP Name" />
            <Field label="GP Contact" />
            <Field label="Blood Group" />
          </Grid>
          <Grid cols={3}>
            <Field label="Blood Pressure" />
            <Field label="Heart Rate" />
            <Field label="Medicare Number" />
          </Grid>
          <Grid cols={2}>
            <Field label="Medicare Expiry" />
            <Field label="Medicare Reference #" />
          </Grid>
          <div style={{ marginTop: '6px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Do you have previous test results to upload? (attach copy)</div>
            <div style={{ borderBottom: '1px solid #999', minHeight: '20px' }} />
          </div>
        </Section>

        {/* Step 3: Health History */}
        <Section title="3. Health History">
          {[
            { label: 'Past Surgery / Procedures', rows: 3 },
            { label: 'Past Medical History', rows: 3 },
            { label: 'Current Medications & Supplements', rows: 3 },
            { label: 'Known Allergies', rows: 2 },
            { label: 'Family Medical History', rows: 3 },
          ].map(({ label, rows }) => (
            <div key={label} style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px', color: '#444' }}>{label}</div>
              {Array.from({ length: rows }).map((_, i) => (
                <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '18px', marginBottom: '4px' }} />
              ))}
            </div>
          ))}
        </Section>

        {/* Step 4: Lifestyle */}
        <Section title="4. Lifestyle & Physical">
          <Grid cols={2}>
            <Field label="Hobbies / Interests" />
            <Field label="Exercise Frequency" />
          </Grid>
          <Field label="Types of Exercise" />
          <Grid cols={2}>
            <Field label="Do you smoke? (Y/N)" />
            <Field label="Cigarettes per day" />
          </Grid>
          <Grid cols={2}>
            <Field label="Alcohol units per week" />
            <Field label="Weight changes (gain/loss)" />
          </Grid>

          <div style={{ marginTop: '10px', marginBottom: '6px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#444' }}>Daily Meal Log</div>
          <div style={{ border: '1px solid #ddd', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', backgroundColor: '#f0f0f0', padding: '4px 8px', fontSize: '9px', fontWeight: 700 }}>
              <span>Meal</span><span>Food & Description</span><span>Time</span>
            </div>
            {['Breakfast', 'Morning Tea', 'Lunch', 'Afternoon Tea', 'Dinner', 'Before Bed'].map((meal) => (
              <div key={meal} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px', padding: '6px 8px', borderTop: '1px solid #eee', fontSize: '10px' }}>
                <span style={{ color: '#555' }}>{meal}</span>
                <div style={{ borderBottom: '1px solid #ccc' }} />
                <div style={{ borderBottom: '1px solid #ccc' }} />
              </div>
            ))}
          </div>
        </Section>

        {/* Step 5: Health Scores */}
        <Section title="5. Health Scores & Conditions">
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#444', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rate 0 (lowest) to 10 (highest)</div>
            {['Current level of health', 'Current energy level', 'Current stress level'].map((label) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', width: '170px', flexShrink: 0 }}>{label}</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {SCORES.map(n => (
                    <div key={n} style={{ width: '20px', height: '20px', border: '1px solid #999', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#666' }}>{n}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Grid cols={2}>
            <Field label="Energy lowest at what time?" />
            <Field label="Energy highest at what time?" />
          </Grid>
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Three most significant stressful events in your life</div>
            {[1,2,3].map(n => (
              <div key={n} style={{ display: 'flex', gap: '8px', marginBottom: '4px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '10px', color: '#555' }}>{n}.</span>
                <div style={{ flex: 1, borderBottom: '1px solid #ddd' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', color: '#444' }}>Have you had any of the following? (tick all that apply)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
              {MEDICAL_CONDITIONS.map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px' }}>
                  <div style={{ width: '11px', height: '11px', border: '1px solid #999', flexShrink: 0 }} /> {c}
                </label>
              ))}
            </div>
          </div>
        </Section>

        {/* Step 6: Main Concern */}
        <Section title="6. Main Concern & Authorisation">
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Main Condition, Symptoms & Goals</div>
            <div style={{ fontSize: '9px', color: '#777', marginBottom: '6px' }}>What is the main condition you are coming to us for? What are the symptoms? What is your major goal? When did you first notice it?</div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '20px', marginBottom: '4px' }} />
            ))}
          </div>

          <div style={{ backgroundColor: '#f8f8f8', border: '1px solid #ddd', padding: '8px 10px', fontSize: '9px', color: '#555', marginBottom: '12px', lineHeight: 1.5 }}>
            I hereby authorise the Apex Metabolic Health medical team and staff to perform examinations and/or treatment deemed necessary. I agree to have any checks deemed necessary by my Doctor, including but not limited to blood pressure, cholesterol, heart check, ECG, physical examination, and pathology requests.
          </div>

          <Grid cols={2}>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px', color: '#444' }}>Promo Code (if applicable)</div>
              <div style={{ borderBottom: '1px solid #999', minHeight: '20px' }} />
            </div>
            <Field label="Print Name" />
          </Grid>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
            {['I declare that I am over 18 years of age.', 'I declare that I am NOT under any sporting or professional code where treatments offered are prohibited.'].map(text => (
              <label key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '9px', flex: 1 }}>
                <div style={{ width: '12px', height: '12px', border: '1px solid #999', flexShrink: 0, marginTop: '1px' }} /> {text}
              </label>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '3px', color: '#444' }}>Signature</div>
            <div style={{ border: '1px solid #999', height: '60px', borderRadius: '3px' }} />
            <div style={{ fontSize: '8px', color: '#999', marginTop: '3px' }}>Sign above</div>
          </div>
        </Section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', fontSize: '8px', color: '#999', textAlign: 'center', lineHeight: 1.5 }}>
          All consultations conducted by AHPRA-registered medical practitioners. This form does not constitute medical advice.<br />
          Apex Metabolic Health operates under Imperial Equity Investments Pty Ltd. | apexmetabolichealth.com.au
        </div>
      </div>
    </>
  )
}
