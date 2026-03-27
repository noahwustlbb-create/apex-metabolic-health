'use client'

const HEALTH_CONDITIONS = [
  'Weight Management — Weight Loss Solutions',
  'Sports Injury & Joint Health — Chronic Care',
  'Longevity — Recovery and Performance',
  'Hair Loss', 'Erectile Dysfunction', 'Sleep Study — Sleep Apnoea',
  'Cardiac Holter', 'Medical Imaging Referral', 'Medical Certificate',
  'Urinary Tract Infection', 'Tattoo Numbing Treatment',
  'Dietician Services — Nutrition', 'Vitamin Injections', 'Other',
]

const CURRENT_HEALTH_OPTIONS = [
  'High Blood Pressure', 'High Cholesterol', 'Chest Pain',
  'Frequent Headache', 'Shortness of Breath', 'Previous Heart Condition',
  'Heart Attack', 'Stroke', 'Palpitations', 'None of the Above',
]

const MEDICAL_CONDITIONS_OPTIONS = [
  'High Blood Pressure', 'Heart Failure', 'Renal Failure', 'Liver Failure',
  'Cancer', 'Prostate Cancer', 'BPH', 'Hyperthyroidism', 'Hypothyroidism',
  'Diabetes', 'Immune Disorders', 'Auto Immune Disorders', 'Endocrine Issues',
  'Mental Health Conditions', 'Substance Abuse Disorders', 'Eating Disorders',
  'Other Medical Condition', 'None of The Above',
]

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
        backgroundColor: '#1a1a2e', color: 'white',
        padding: '5px 10px', fontSize: '10px', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px',
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

function CheckList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
      {items.map(c => (
        <label key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', fontSize: '9px' }}>
          <div style={{ width: '11px', height: '11px', border: '1px solid #999', flexShrink: 0, marginTop: '1px' }} /> {c}
        </label>
      ))}
    </div>
  )
}

export default function GeneralFormPDF() {
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
          General Appointment — Request an Appointment & Pre-Screen Intake Form
        </span>
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#4890f7', color: 'white', border: 'none',
            padding: '10px 28px', borderRadius: '4px', fontWeight: 700,
            fontSize: '13px', cursor: 'pointer', letterSpacing: '0.08em',
          }}
        >
          ⬇ Download PDF
        </button>
      </div>

      {/* Form */}
      <div className="page" style={{ maxWidth: '794px', margin: '0 auto', padding: '80px 48px 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #1a1a2e' }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1a1a2e', letterSpacing: '0.05em' }}>APEX METABOLIC HEALTH</div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '3px' }}>Doctor-Led Telehealth — Australia-Wide</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#4890f7' }}>GENERAL APPOINTMENT</div>
            <div style={{ fontSize: '10px', color: '#555' }}>Request an Appointment & Pre-Screen Intake Form</div>
            <div style={{ fontSize: '9px', color: '#999', marginTop: '4px' }}>Date: ___________________</div>
          </div>
        </div>

        {/* Step 1: Personal Details */}
        <Section title="1. Personal Details">
          <Grid cols={3}>
            <Field label="First Name" />
            <Field label="Last Name" />
            <Field label="Date of Birth" />
          </Grid>
          <Grid cols={2}>
            <Field label="Phone" />
            <Field label="Email" />
          </Grid>
          <Field label="Home Address" />
          <Grid cols={2}>
            <Field label="Biological Gender" />
            <Field label="Occupation" />
          </Grid>
        </Section>

        {/* Step 2: Identity & Medicare */}
        <Section title="2. Identity & Medicare">
          <Grid cols={2}>
            <Field label="Medicare Number" />
            <Field label="Medicare Expiry" />
          </Grid>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Driver's Licence / ID (attach copy)</div>
            <div style={{ border: '1px solid #ddd', height: '40px', borderRadius: '3px', backgroundColor: '#fafafa' }} />
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              'I confirm I am not currently attending multiple clinics for the same condition.',
              'I consent to my health records being accessed if required.',
            ].map(text => (
              <label key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '9px', flex: 1, minWidth: '200px' }}>
                <div style={{ width: '12px', height: '12px', border: '1px solid #999', flexShrink: 0, marginTop: '1px' }} /> {text}
              </label>
            ))}
          </div>
        </Section>

        {/* Step 3: Appointment */}
        <Section title="3. Appointment Details">
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Reason for Appointment</div>
            {[1,2,3].map(i => <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '18px', marginBottom: '4px' }} />)}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', color: '#444' }}>Health Condition / Service Required (tick all that apply)</div>
            <CheckList items={HEALTH_CONDITIONS} />
          </div>
        </Section>

        {/* Step 4: Health Profile */}
        <Section title="4. Health Profile">
          <Grid cols={3}>
            <Field label="Height (cm)" />
            <Field label="Weight (kg)" />
            <Field label="Blood Pressure" />
          </Grid>
          <Field label="Known Allergies" />
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', color: '#444' }}>Current Health Concerns (tick all that apply)</div>
            <CheckList items={CURRENT_HEALTH_OPTIONS} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', color: '#444' }}>Medical Conditions (tick all that apply)</div>
            <CheckList items={MEDICAL_CONDITIONS_OPTIONS} />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Current Medications & Supplements</div>
            {[1,2,3].map(i => <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '18px', marginBottom: '4px' }} />)}
          </div>
        </Section>

        {/* Step 5: Lifestyle */}
        <Section title="5. Lifestyle & Goals">
          <Grid cols={2}>
            <Field label="Alcohol units per week" />
            <Field label="Smoking status" />
          </Grid>
          <Field label="Recreational drugs (if any)" />
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Lifestyle Description</div>
            {[1,2].map(i => <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '18px', marginBottom: '4px' }} />)}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', color: '#444' }}>Health Goals</div>
            {[1,2,3].map(i => <div key={i} style={{ borderBottom: '1px solid #ddd', minHeight: '18px', marginBottom: '4px' }} />)}
          </div>
          <Field label="Preferred Pharmacy (name & suburb)" />
        </Section>

        {/* Step 6: Agreements */}
        <Section title="6. Agreements & Authorisation">
          <div style={{ backgroundColor: '#f8f8f8', border: '1px solid #ddd', padding: '8px 10px', fontSize: '9px', color: '#555', marginBottom: '12px', lineHeight: 1.6 }}>
            By signing this form, you agree to Apex Metabolic Health's terms of service and privacy policy. All consultations are conducted by AHPRA-registered medical practitioners. Treatment is only prescribed where clinically appropriate.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            {[
              'I agree to Apex Metabolic Health acting as my healthcare agent for the purposes of this consultation.',
              'I agree for results/reports to be forwarded to my nominated GP.',
              'I agree to have any checks deemed necessary by my Doctor (blood pressure, cholesterol, pathology, etc.).',
              'I have read and agree to the Privacy Policy.',
              'I would like a copy of the Standard of Practice.',
            ].map(text => (
              <label key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '9px' }}>
                <div style={{ width: '12px', height: '12px', border: '1px solid #999', flexShrink: 0, marginTop: '1px' }} /> {text}
              </label>
            ))}
          </div>

          <Grid cols={2}>
            <Field label="Promo Code (if applicable)" />
            <Field label="Print Name" />
          </Grid>

          <div style={{ marginTop: '10px' }}>
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
