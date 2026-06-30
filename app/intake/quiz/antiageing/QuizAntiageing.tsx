'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const HORMONE_URL = 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation'

const config: QuizConfig = {
  programName: 'Anti-Ageing & Longevity',
  programSub: 'Doctor-led longevity optimisation',
  estimatedTime: '2 min',
  benefits: [
    'Personalised longevity protocol',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: HORMONE_URL,
  ineligibleHeading: 'Our longevity program needs further assessment for your situation.',
  ineligibleBody: 'Based on your health history, our doctors need to conduct a more specialised review before recommending a longevity protocol. Please book a free discovery call — we can help you find the right pathway.',
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'multi',
      id: 'goals',
      question: 'What matters most to you right now?',
      sub: 'Select all that apply',
      options: [
        { label: 'Sustained energy and mental clarity', value: 'energy' },
        { label: 'Healthy body composition as I age', value: 'body_comp' },
        { label: 'Optimising longevity biomarkers', value: 'biomarkers' },
        { label: 'Skin, hair and physical appearance', value: 'appearance' },
        { label: 'Sleep quality and stress resilience', value: 'sleep' },
        { label: 'Cognitive performance and focus', value: 'cognitive' },
      ],
    },
    {
      type: 'single',
      id: 'age_feel',
      question: 'How do you feel relative to your age?',
      options: [
        { label: 'I feel significantly older than my age', value: 'older' },
        { label: 'I feel about my age', value: 'average' },
        { label: 'I feel reasonably good but want to optimise', value: 'good' },
        { label: "I feel great but want to stay ahead of the curve", value: 'great' },
      ],
    },
    {
      type: 'single',
      id: 'health_status',
      question: 'How would you describe your current health?',
      options: [
        { label: 'I have several ongoing health conditions', value: 'multiple' },
        { label: 'I have one or two health concerns', value: 'some' },
        { label: 'Generally healthy with minor issues', value: 'mostly_healthy' },
        { label: "Excellent health — I'm here to optimise", value: 'excellent' },
      ],
    },
    {
      type: 'info',
      id: 'info',
      heading: 'Longevity medicine is proactive, not reactive',
      body: 'Our anti-ageing protocols go beyond symptom management. Using comprehensive biomarker assessment, our doctors design personalised protocols targeting the biological drivers of accelerated ageing — from cellular energy decline to hormonal imbalance.',
      stat: 'Evidence-based · Doctor-designed · Clinically monitored',
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'Ageing is a biological process — and it can be optimised',
      body: 'Our AHPRA-registered doctors take a data-driven approach to longevity. Every protocol is informed by your pathology results, not guesswork. Your health and safety are always the first consideration.',
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'I have been diagnosed with active cancer or a malignancy', value: 'cancer', disqualify: true },
        { label: 'I have a serious cardiac condition (recent heart attack, severe heart failure)', value: 'cardiac', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications or supplements?',
      placeholder: 'List all prescription medications and any supplements you take',
      whyWeAsk: 'Many longevity protocols interact with existing medications. A complete picture helps our doctors design a safe and optimised plan.',
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any known medication allergies?',
      optional: true,
    },
    {
      type: 'text',
      id: 'other',
      question: "Is there anything else your doctor should know?",
      placeholder: 'E.g. recent test results, family history, or specific longevity goals',
      optional: true,
    },
  ],
}

export default function QuizAntiageing() {
  return <IntakeQuizEngine config={config} />
}
