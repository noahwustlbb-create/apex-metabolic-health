'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const PEPTIDE_URL = 'https://calendly.com/admin-apexmetabolichealth/quick-check-up-general-consult'

const config: QuizConfig = {
  programName: 'Injury Repair & Recovery',
  programSub: 'Doctor-led tissue repair',
  estimatedTime: '2 min',
  benefits: [
    'Personalised injury recovery protocol',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: PEPTIDE_URL,
  ineligibleHeading: 'Our injury repair program may not be right for you right now.',
  ineligibleBody: 'Based on your answers, there are health factors that need specialist review before we can safely prescribe an injury recovery protocol. Book a free discovery call so our clinical team can help point you in the right direction.',
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'single',
      id: 'injury_type',
      question: 'What are you dealing with?',
      options: [
        { label: 'Joint pain or injury (knee, shoulder, hip, etc.)', value: 'joint' },
        { label: 'Tendon or ligament injury', value: 'tendon' },
        { label: 'Muscle strain or tear', value: 'muscle' },
        { label: 'Post-surgical recovery', value: 'post_surgery' },
        { label: 'Chronic pain or persistent inflammation', value: 'chronic' },
        { label: 'General recovery and injury prevention', value: 'prevention' },
      ],
    },
    {
      type: 'single',
      id: 'duration',
      question: 'How long have you been dealing with this?',
      options: [
        { label: 'Less than 2 weeks (acute injury)', value: 'acute' },
        { label: '2 weeks to 3 months', value: 'subacute' },
        { label: '3 to 12 months', value: '3to12m' },
        { label: 'More than 12 months (chronic)', value: 'chronic' },
      ],
    },
    {
      type: 'single',
      id: 'treatment',
      question: 'Have you received any treatment for this so far?',
      options: [
        { label: 'Yes — physiotherapy or sports medicine', value: 'physio' },
        { label: 'Yes — surgery', value: 'surgery' },
        { label: 'Yes — other treatment', value: 'other' },
        { label: "No, I haven't sought treatment yet", value: 'none' },
      ],
    },
    {
      type: 'single',
      id: 'impact',
      question: 'How is this affecting your training or daily life?',
      options: [
        { label: "I can't train or exercise at all", value: 'stopped' },
        { label: 'I can train but it is significantly limited', value: 'limited' },
        { label: 'I can train with modifications', value: 'modified' },
        { label: "I'm not training but daily life is affected", value: 'daily_life' },
      ],
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'Injury repair is a clinical discipline',
      body: 'Our doctors use targeted clinical protocols to accelerate tissue repair and reduce inflammation at a cellular level. Every protocol is designed around your specific injury, history, and goals by AHPRA-registered practitioners.',
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'I have been diagnosed with active cancer or a malignancy', value: 'cancer', disqualify: true },
        { label: 'I have a blood clotting disorder (e.g. haemophilia)', value: 'clotting', disqualify: true },
        { label: 'I am currently on blood thinners (e.g. warfarin)', value: 'anticoagulants', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: 'Include pain medications, anti-inflammatories, or other drugs',
      whyWeAsk: 'Some medications affect tissue healing and can interact with clinical protocols. Our doctors need a full picture.',
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
      question: "Is there anything else your doctor should know about your injury?",
      placeholder: 'E.g. imaging results, previous treatments, activity level, or specific goals',
      optional: true,
    },
  ],
}

export default function QuizInjury() {
  return <IntakeQuizEngine config={config} />
}
