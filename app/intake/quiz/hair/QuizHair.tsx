'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const HORMONE_URL = 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation'

const config: QuizConfig = {
  programName: 'Hair Restoration',
  programSub: 'Doctor-led hair loss treatment',
  estimatedTime: '2 min',
  benefits: [
    'Personalised hair restoration plan',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: HORMONE_URL,
  ineligibleHeading: 'Hair restoration may not be appropriate for you right now.',
  ineligibleBody: "Based on your health history, our doctors need to review certain factors before prescribing a hair restoration protocol. We encourage you to book a free discovery call — our clinical team can help determine the safest pathway for you.",
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'multi',
      id: 'concern',
      question: 'What are you experiencing?',
      sub: 'Select all that apply',
      options: [
        { label: 'General hair thinning across the scalp', value: 'thinning' },
        { label: 'Receding hairline', value: 'receding' },
        { label: 'Bald patches or spots', value: 'patches' },
        { label: 'Hair loss following illness or high stress', value: 'stress_related' },
        { label: 'Excessive daily shedding', value: 'shedding' },
      ],
    },
    {
      type: 'single',
      id: 'duration',
      question: 'How long have you been noticing hair loss?',
      options: [
        { label: 'Less than 6 months', value: 'lt6m' },
        { label: '6 months to 1 year', value: '6to12m' },
        { label: '1 to 3 years', value: '1to3y' },
        { label: 'More than 3 years', value: 'gt3y' },
      ],
    },
    {
      type: 'single',
      id: 'family',
      question: 'Do you have a family history of hair loss?',
      options: [
        { label: "Yes, on my father's side", value: 'fathers' },
        { label: "Yes, on my mother's side", value: 'mothers' },
        { label: 'Yes, on both sides', value: 'both' },
        { label: "No family history I'm aware of", value: 'none' },
      ],
    },
    {
      type: 'single',
      id: 'severity',
      question: 'How would you describe the current severity?',
      options: [
        { label: 'Early stage — noticeable thinning only', value: 'early' },
        { label: 'Moderate — visible thinning or a receding hairline', value: 'moderate' },
        { label: 'Advanced — significant loss or large bald areas', value: 'advanced' },
      ],
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'Hair loss is more treatable than most people think',
      body: 'Our AHPRA-registered doctors take a clinical approach to hair restoration, addressing underlying hormonal and nutritional factors alongside targeted treatments. Your case is assessed individually — not with a generic protocol.',
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'I have active prostate cancer or a recent prostate cancer diagnosis', value: 'prostate_ca', disqualify: true },
        { label: 'I have severe liver disease', value: 'liver', disqualify: true },
        { label: 'I am currently pregnant or planning to become pregnant', value: 'pregnant', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: "List any medications or say 'none'",
      whyWeAsk: 'Some medications can affect hair growth or interact with hair restoration treatments. Our doctors need this to prescribe safely.',
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any known medication allergies?',
      placeholder: 'E.g. none, or list known allergies',
      optional: true,
    },
    {
      type: 'single',
      id: 'tried',
      question: 'Have you tried any hair loss treatment before?',
      options: [
        { label: 'Yes — over-the-counter products (shampoos, topical treatments, etc.)', value: 'otc' },
        { label: 'Yes — prescription medication from a doctor', value: 'rx' },
        { label: "No, I haven't tried anything yet", value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'other',
      question: 'Is there anything else your doctor should know?',
      placeholder: 'E.g. recent stress, illness, diet changes, or other relevant info',
      optional: true,
    },
  ],
}

export default function QuizHair() {
  return <IntakeQuizEngine config={config} />
}
