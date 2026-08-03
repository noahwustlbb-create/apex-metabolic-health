'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const config: QuizConfig = {
  programName: 'Hormone Optimisation',
  programSub: 'Doctor-led hormonal health program',
  estimatedTime: '3 min',
  scoreLabel: 'Hormonal Health Score',
  requiresBloodTest: true,
  bloodTestUrl: '/order-bloods',
  signupUrl: 'https://app.apexmetabolichealth.com.au/signup',
  benefits: [
    'Personalised hormonal assessment',
    'AHPRA-registered doctor consultation',
    'Doctor-prescribed, TGA-compliant protocol',
  ],
  consultUrl: 'https://app.apexmetabolichealth.com.au/signup',
  ineligibleHeading: 'We need more information before recommending a hormonal program.',
  ineligibleBody: 'Based on your answers, our doctors need to review your situation carefully before recommending a hormonal protocol. Request a free discovery call to speak with our clinical team.',
  ineligibleAlt: { label: 'Request a free discovery call', href: '/discovery-call' },
  steps: [
    {
      type: 'single', id: 'age',
      question: 'What is your age?',
      options: [
        { label: 'Under 25', value: 'u25', score: 0 },
        { label: '25–34', value: '25to34', score: 1 },
        { label: '35–44', value: '35to44', score: 2 },
        { label: '45–54', value: '45to54', score: 3 },
        { label: '55 or older', value: '55plus', score: 3 },
      ],
    },
    {
      type: 'single', id: 'energy',
      question: 'Has your energy declined noticeably in the past 6–12 months?',
      options: [
        { label: 'Yes, significantly lower than before', value: 'yes', score: 3 },
        { label: 'Somewhat, noticeable but manageable', value: 'somewhat', score: 2 },
        { label: 'Mildly, a subtle change', value: 'mildly', score: 1 },
        { label: 'No, my energy is generally fine', value: 'no', score: 0 },
      ],
    },
    {
      type: 'single', id: 'libido',
      question: 'Has your sex drive decreased compared to a few years ago?',
      options: [
        { label: 'Yes, significantly reduced', value: 'yes', score: 3 },
        { label: 'Somewhat, noticeably lower', value: 'somewhat', score: 2 },
        { label: 'Mildly, a slight change', value: 'mildly', score: 1 },
        { label: 'No, no change', value: 'no', score: 0 },
      ],
    },
    {
      type: 'single', id: 'mood',
      question: 'Do you experience mood changes such as irritability, low motivation, or mental fog?',
      options: [
        { label: 'Yes, regularly and noticeably', value: 'yes', score: 3 },
        { label: 'Sometimes, comes and goes', value: 'sometimes', score: 2 },
        { label: 'Rarely, only under stress', value: 'rarely', score: 1 },
        { label: 'No, my mood is stable', value: 'no', score: 0 },
      ],
    },
    {
      type: 'single', id: 'strength',
      question: 'Have you noticed a decline in physical strength, muscle mass, or recovery?',
      options: [
        { label: 'Yes, noticeable reduction', value: 'yes', score: 3 },
        { label: 'Somewhat, harder to maintain than before', value: 'somewhat', score: 2 },
        { label: 'Mildly, subtle changes', value: 'mildly', score: 1 },
        { label: 'No, no change', value: 'no', score: 0 },
      ],
    },
    {
      type: 'single', id: 'sleep',
      question: 'Do you struggle with sleep quality, such as waking tired or difficulty staying asleep?',
      options: [
        { label: 'Yes, frequently', value: 'yes', score: 3 },
        { label: 'Sometimes, a few nights a week', value: 'sometimes', score: 2 },
        { label: 'Rarely, occasional issues', value: 'rarely', score: 1 },
        { label: 'No, I sleep well', value: 'no', score: 0 },
      ],
    },
    {
      type: 'single', id: 'weight',
      question: 'Has weight or body composition become harder to manage despite no major lifestyle changes?',
      options: [
        { label: 'Yes, noticeably more difficult', value: 'yes', score: 3 },
        { label: 'Somewhat, gradually harder', value: 'somewhat', score: 2 },
        { label: 'Mildly, slight changes', value: 'mildly', score: 1 },
        { label: 'No, no change', value: 'no', score: 0 },
      ],
    },
    {
      type: 'info', id: 'info',
      heading: 'Why these symptoms matter',
      body: 'The symptoms above align with validated clinical screening criteria for hormonal imbalance. They are assessed alongside pathology results by our AHPRA-registered doctors, not to diagnose you, but to identify men who would benefit most from a full clinical assessment.',
      stat: 'AHPRA-registered doctors · Comprehensive pathology · TGA-compliant protocols',
    },
    {
      type: 'single', id: 'gp_normal',
      question: 'Have you been told by a GP that your results look "normal" but you still feel off?',
      options: [
        { label: 'Yes, multiple times', value: 'yes_multiple', score: 2 },
        { label: 'Yes, once or twice', value: 'yes_once', score: 1 },
        { label: "No, I haven't raised this with a GP", value: 'no_gp', score: 0 },
        { label: 'No, my GP found something concerning', value: 'no_found', score: 0 },
      ],
    },
    {
      type: 'trust', id: 'trust',
      heading: 'Your safety comes first',
      body: 'Hormonal therapy is a medical treatment requiring proper diagnosis. Our doctors conduct a comprehensive pathology assessment before prescribing any protocol. We do not prescribe based on symptoms alone. Blood results are mandatory.',
    },
    {
      type: 'multi', id: 'contraindications',
      question: 'Do any of the following apply to you?',
      sub: 'Select all that apply',
      options: [
        { label: 'Prostate cancer (current or history)', value: 'prostate_ca', disqualify: true },
        { label: 'Breast cancer (current or history)', value: 'breast_ca', disqualify: true },
        { label: 'Polycythaemia or very high red blood cell count', value: 'polycy', disqualify: true },
        { label: 'Untreated severe obstructive sleep apnoea', value: 'sleep_apnoea' },
        { label: 'Heart failure (diagnosed)', value: 'heart_failure' },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text', id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: "List medications or say 'none'",
      whyWeAsk: 'Our doctors review all medications for interactions with hormonal therapies before prescribing.',
      optional: true,
    },
    {
      type: 'text', id: 'other',
      question: 'Anything else your doctor should know?',
      placeholder: 'Previous lab results, symptoms, or any other context',
      optional: true,
    },
  ],
}

export default function QuizHormone() {
  return <IntakeQuizEngine config={config} />
}
