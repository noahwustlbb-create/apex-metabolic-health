'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const PEPTIDE_URL = 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult'

const config: QuizConfig = {
  programName: 'Skin Regeneration',
  programSub: 'Doctor-led skin restoration',
  estimatedTime: '2 min',
  benefits: [
    'Personalised skin regeneration plan',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: PEPTIDE_URL,
  ineligibleHeading: "Our skin program isn't the right fit right now.",
  ineligibleBody: "Based on your answers, there are factors that need to be assessed before we can prescribe a skin regeneration protocol. Book a free discovery call and our clinical team will help determine the safest pathway for you.",
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'multi',
      id: 'concerns',
      question: 'What are your main skin concerns?',
      sub: 'Select all that apply',
      options: [
        { label: 'Fine lines and wrinkles', value: 'wrinkles' },
        { label: 'Uneven skin texture or tone', value: 'texture' },
        { label: 'Acne or acne scarring', value: 'acne' },
        { label: 'Dull or tired-looking complexion', value: 'dull' },
        { label: 'Sun damage or pigmentation', value: 'pigmentation' },
        { label: 'Loss of skin firmness or elasticity', value: 'firmness' },
      ],
    },
    {
      type: 'single',
      id: 'duration',
      question: 'How long have you been concerned about your skin?',
      options: [
        { label: 'Less than 1 year', value: 'lt1y' },
        { label: '1 to 3 years', value: '1to3y' },
        { label: '3 to 5 years', value: '3to5y' },
        { label: 'More than 5 years', value: 'gt5y' },
      ],
    },
    {
      type: 'multi',
      id: 'tried',
      question: 'What have you tried previously for your skin?',
      sub: 'Select all that apply',
      options: [
        { label: 'Over-the-counter skincare products', value: 'otc' },
        { label: 'Prescription topical treatments', value: 'rx_topical' },
        { label: 'Professional treatments (peels, laser, etc.)', value: 'professional' },
        { label: "Nothing yet — this is my first step", value: 'nothing' },
      ],
    },
    {
      type: 'single',
      id: 'skin_type',
      question: 'How would you describe your skin?',
      options: [
        { label: 'Normal — balanced, no major issues', value: 'normal' },
        { label: 'Dry — often tight or flaky', value: 'dry' },
        { label: 'Oily — prone to shine or breakouts', value: 'oily' },
        { label: 'Combination — oily in some areas, dry in others', value: 'combo' },
        { label: 'Sensitive — reactive to products or sun', value: 'sensitive' },
      ],
    },
    {
      type: 'info',
      id: 'info',
      heading: 'Skin regeneration at a cellular level',
      body: 'Our approach combines clinical therapy with targeted nutritional support to stimulate collagen synthesis, accelerate cellular repair, and address the underlying biological factors driving visible skin ageing.',
      stat: 'Doctor-prescribed · Clinically formulated · Personalised protocols',
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'I have active skin infections or open wounds', value: 'infection', disqualify: true },
        { label: 'I have been diagnosed with active skin cancer', value: 'skin_cancer', disqualify: true },
        { label: 'I am currently pregnant or breastfeeding', value: 'pregnant', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: 'Include any topical treatments, isotretinoin, steroids, or other medications',
      whyWeAsk: 'Certain medications can affect skin sensitivity and interact with treatment protocols.',
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any known skin or medication allergies?',
      optional: true,
    },
    {
      type: 'text',
      id: 'other',
      question: 'Anything else your doctor should know about your skin?',
      placeholder: 'E.g. previous reactions, sensitive areas, or specific concerns',
      optional: true,
    },
  ],
}

export default function QuizSkin() {
  return <IntakeQuizEngine config={config} />
}
