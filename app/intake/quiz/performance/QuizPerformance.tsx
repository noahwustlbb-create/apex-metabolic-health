'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const PEPTIDE_URL = 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult'

const config: QuizConfig = {
  programName: 'Performance & Recovery',
  programSub: 'Doctor-led performance optimisation',
  estimatedTime: '2 min',
  benefits: [
    'Personalised performance protocol',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: PEPTIDE_URL,
  ineligibleHeading: 'A performance protocol may not be appropriate right now.',
  ineligibleBody: 'Based on your answers, there are health factors that need to be reviewed before we can safely recommend a performance optimisation protocol. Please book a free discovery call so our doctors can guide you.',
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'multi',
      id: 'goals',
      question: 'What are your primary performance goals?',
      sub: 'Select all that apply',
      options: [
        { label: 'Build muscle and improve body composition', value: 'muscle' },
        { label: 'Increase athletic performance and output', value: 'performance' },
        { label: 'Improve recovery between training sessions', value: 'recovery' },
        { label: 'Reduce body fat', value: 'fat_loss' },
        { label: 'Improve sleep and hormonal recovery', value: 'sleep' },
        { label: 'Enhance cognitive performance and focus', value: 'cognitive' },
      ],
    },
    {
      type: 'single',
      id: 'training',
      question: 'What is your current training level?',
      options: [
        { label: "Beginner — I'm just getting started", value: 'beginner' },
        { label: 'Intermediate — I train 2–3 times per week', value: 'intermediate' },
        { label: 'Advanced — I train 4+ times per week', value: 'advanced' },
        { label: 'Elite or competitive athlete', value: 'elite' },
      ],
    },
    {
      type: 'single',
      id: 'plateau',
      question: 'Have you hit a plateau with your current approach?',
      options: [
        { label: 'Yes — my results have stalled despite consistent effort', value: 'yes' },
        { label: 'Somewhat — progress has slowed significantly', value: 'somewhat' },
        { label: "No — I'm looking to optimise further from a solid base", value: 'no' },
      ],
    },
    {
      type: 'info',
      id: 'info',
      heading: 'A clinical edge for serious athletes',
      body: 'Our performance protocols combine targeted clinical therapies with hormonal assessment to address the biological factors limiting your output — from recovery capacity and tissue repair to sleep architecture and hormonal function.',
      stat: 'Doctor-designed · TGA-compliant compounding · Clinically monitored',
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'Performance medicine requires precision',
      body: 'Our AHPRA-registered doctors conduct a thorough assessment before prescribing any protocol. Your safety and clinical appropriateness come first — performance optimisation is a medical discipline, not a shortcut.',
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'I have been diagnosed with an active cancer or malignancy', value: 'cancer', disqualify: true },
        { label: 'I have an autoimmune condition requiring immunosuppression', value: 'autoimmune', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications or supplements?',
      placeholder: 'Include prescription medications, hormones, or supplements',
      whyWeAsk: 'Our doctors need to know your current stack to avoid interactions and design an optimised protocol.',
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any known medication or substance allergies?',
      optional: true,
    },
    {
      type: 'text',
      id: 'other',
      question: "Is there anything else your doctor should know?",
      placeholder: 'E.g. previous labs, injuries, goals, or other context',
      optional: true,
    },
  ],
}

export default function QuizPerformance() {
  return <IntakeQuizEngine config={config} />
}
