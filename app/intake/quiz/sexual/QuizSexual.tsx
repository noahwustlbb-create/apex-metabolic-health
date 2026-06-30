'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const HORMONE_URL = 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation'

const config: QuizConfig = {
  programName: 'Sexual Health',
  programSub: 'Private, judgment-free care',
  estimatedTime: '2 min',
  benefits: [
    'Personalised treatment plan',
    'Confidential consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: HORMONE_URL,
  ineligibleHeading: 'Based on your health history, we need to refer you first.',
  ineligibleBody: 'Some of your answers indicate a need for more specialised cardiac or medical assessment before a sexual health protocol can be safely prescribed. We recommend speaking with your GP, or booking a free discovery call so our clinical team can guide your next steps.',
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'single',
      id: 'concern',
      question: "What best describes what you're experiencing?",
      options: [
        { label: 'Difficulty achieving or maintaining an erection', value: 'ed' },
        { label: 'Reduced sexual desire or libido', value: 'libido' },
        { label: 'Performance anxiety affecting sexual function', value: 'anxiety' },
        { label: 'Other sexual health concerns', value: 'other' },
      ],
    },
    {
      type: 'single',
      id: 'duration',
      question: 'How long have you been experiencing this?',
      options: [
        { label: 'Less than 3 months', value: 'lt3m' },
        { label: '3 to 6 months', value: '3to6m' },
        { label: '6 months to 2 years', value: '6mto2y' },
        { label: 'More than 2 years', value: 'gt2y' },
      ],
    },
    {
      type: 'single',
      id: 'impact',
      question: 'How much is this affecting your quality of life?',
      options: [
        { label: 'Mildly — it bothers me occasionally', value: 'mild' },
        { label: 'Moderately — it affects my confidence and relationships', value: 'moderate' },
        { label: 'Significantly — it is a major concern for me', value: 'significant' },
      ],
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'Your consultation is 100% confidential',
      body: 'Sexual health is a sensitive topic and our doctors approach it without judgment. All information you share is assessed only by our AHPRA-registered medical practitioners under strict medical privacy.',
    },
    {
      type: 'multi',
      id: 'conditions',
      question: 'Do you have any of the following health conditions?',
      sub: 'Select all that apply',
      options: [
        { label: 'Type 2 diabetes', value: 't2dm' },
        { label: 'High blood pressure', value: 'hbp' },
        { label: 'High cholesterol', value: 'cholesterol' },
        { label: 'Anxiety or depression', value: 'anxiety' },
        { label: 'Prostate concerns', value: 'prostate' },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply — this is important for your safety',
      options: [
        { label: 'I currently take nitrate medications (GTN spray, isosorbide, amyl nitrate)', value: 'nitrates', disqualify: true },
        { label: 'I have had a heart attack or stroke in the last 3 months', value: 'recent_cardiac', disqualify: true },
        { label: 'I have unstable chest pain or unstable angina', value: 'angina', disqualify: true },
        { label: 'I have severe heart failure', value: 'heart_failure', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: "List any medications or say 'none'",
      whyWeAsk: 'Some medications can interact with sexual health treatments. Our doctors need this information to prescribe safely.',
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any medication allergies?',
      placeholder: 'E.g. sulfa drugs, or none that you know of',
      optional: true,
    },
    {
      type: 'single',
      id: 'prev_treatment',
      question: 'Have you tried any treatment for this before?',
      options: [
        { label: "Yes, I've been prescribed treatment previously", value: 'yes' },
        { label: "No, I haven't tried any treatment", value: 'no' },
      ],
    },
    {
      type: 'text',
      id: 'other',
      question: "Is there anything else you'd like your doctor to know?",
      placeholder: 'Any additional context that might be relevant',
      optional: true,
    },
  ],
}

export default function QuizSexual() {
  return <IntakeQuizEngine config={config} />
}
