'use client'

import IntakeQuizEngine, { type QuizConfig } from '@/components/IntakeQuizEngine'

const HORMONE_URL = 'https://calendly.com/admin-apexmetabolichealth/comprehensive-hormone-consultation'

const config: QuizConfig = {
  programName: 'Medical Weight Management',
  programSub: 'Doctor-led metabolic treatment',
  estimatedTime: '2–3 min',
  benefits: [
    'Personalised treatment plan',
    'Consultation with an AHPRA-registered doctor',
    'Doctor-coordinated pharmacy delivery',
  ],
  consultUrl: HORMONE_URL,
  ineligibleHeading: 'Our weight management program may not be right for you at this time.',
  ineligibleBody: 'Based on your answers, your health history includes factors that our doctors need to assess more carefully before recommending a weight management protocol. We encourage you to book a free discovery call — our clinical team can help determine the safest next step for you.',
  ineligibleAlt: { label: 'Explore other programs', href: '/#programs' },
  steps: [
    {
      type: 'bmi',
      id: 'bmi',
      question: 'What is your current height and weight?',
      minBmi: 25,
      bmiIneligibleMsg: 'Our weight management program is designed for patients with a clinical need for metabolic support. Based on your measurements, your weight appears to be within a healthy range — another Apex program may be a better fit for your goals.',
    },
    {
      type: 'single',
      id: 'goal',
      question: 'What are your current weight loss goals?',
      options: [
        { label: 'Lose 5–10 kg', value: '5to10' },
        { label: 'Lose 10–20 kg', value: '10to20' },
        { label: 'Lose more than 20 kg', value: 'over20' },
        { label: 'Improve metabolic health and prevent future weight gain', value: 'maintain' },
      ],
    },
    {
      type: 'info',
      id: 'expect',
      heading: 'What clinical weight management can achieve',
      body: 'With doctor-supervised metabolic treatment, patients typically experience meaningful improvements in weight, energy, and metabolic markers over 3–6 months. Your doctor will design a protocol based on your pathology results.',
      stat: 'Clinically supervised · Doctor-led · TGA compliant',
    },
    {
      type: 'multi',
      id: 'motivation',
      question: 'What motivates you most to reach a healthier weight?',
      sub: 'Select all that apply',
      options: [
        { label: 'Improve energy and daily functioning', value: 'energy' },
        { label: 'Reduce risk of health problems', value: 'health' },
        { label: 'Look better or feel more confident', value: 'confidence' },
        { label: 'Improve mental health', value: 'mental' },
        { label: 'Be more active or mobile', value: 'active' },
        { label: 'Doctor recommended it', value: 'doctor' },
      ],
    },
    {
      type: 'single',
      id: 'duration',
      question: 'How long have you been struggling with your weight?',
      options: [
        { label: 'Less than 6 months', value: 'lt6m' },
        { label: '6 months to 1 year', value: '6to12m' },
        { label: '1 to 3 years', value: '1to3y' },
        { label: 'More than 3 years', value: 'gt3y' },
      ],
    },
    {
      type: 'multi',
      id: 'tried',
      question: 'Which of these have you tried before to lose weight?',
      sub: 'Select all that apply',
      options: [
        { label: 'Exercise and calorie tracking', value: 'exercise' },
        { label: 'Commercial diets (keto, intermittent fasting, etc.)', value: 'diets' },
        { label: 'Prescription medications', value: 'rx' },
        { label: 'Weight loss shakes or supplements', value: 'supplements' },
        { label: 'Bariatric surgery', value: 'surgery' },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'single',
      id: 'history',
      question: 'How much weight have you been able to lose and keep off in the past?',
      options: [
        { label: "I haven't been able to lose any weight", value: 'none' },
        { label: 'I lost weight but regained it', value: 'regained' },
        { label: "I've lost some and kept most of it off", value: 'partial' },
        { label: "I've successfully lost weight and maintained it", value: 'maintained' },
      ],
    },
    {
      type: 'trust',
      id: 'trust',
      heading: 'We take your health seriously',
      body: 'Before we recommend any treatment, our doctors review your full health background. Your answers are confidential and assessed only by our AHPRA-registered medical practitioners.',
    },
    {
      type: 'multi',
      id: 'conditions',
      question: 'Do you have any of the following health conditions?',
      sub: 'Select all that apply — these may actually support your eligibility',
      options: [
        { label: 'Type 2 diabetes', value: 't2dm' },
        { label: 'High blood pressure', value: 'hbp' },
        { label: 'High cholesterol', value: 'cholesterol' },
        { label: 'Fatty liver disease', value: 'fatty_liver' },
        { label: 'Sleep apnoea', value: 'sleep_apnoea' },
        { label: 'PCOS (Polycystic Ovary Syndrome)', value: 'pcos' },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'multi',
      id: 'contraindications',
      question: 'Have you been diagnosed with any of the following?',
      sub: 'Select all that apply',
      options: [
        { label: 'Type 1 diabetes', value: 't1dm', disqualify: true },
        { label: 'Personal or family history of medullary thyroid cancer', value: 'thyroid_ca', disqualify: true },
        { label: 'Multiple endocrine neoplasia syndrome type 2 (MEN2)', value: 'men2', disqualify: true },
        { label: 'History of pancreatitis', value: 'pancreatitis', disqualify: true },
        { label: 'Severe kidney disease or kidney failure', value: 'kidney', disqualify: true },
        { label: 'Severe liver disease or liver failure', value: 'liver', disqualify: true },
        { label: 'None of the above', value: 'none' },
      ],
    },
    {
      type: 'text',
      id: 'medications',
      question: 'Are you currently taking any medications?',
      placeholder: "List any medications, doses, or say 'none'",
      whyWeAsk: "It's important our doctors know your current medications to check for any interactions with your treatment plan.",
      optional: true,
    },
    {
      type: 'text',
      id: 'allergies',
      question: 'Do you have any medication allergies?',
      placeholder: 'E.g. penicillin, sulfa drugs, or none that you know of',
      whyWeAsk: 'Our clinicians need to know your allergies to ensure any prescribed treatment is safe for you.',
      optional: true,
    },
    {
      type: 'single',
      id: 'prev_rx',
      question: 'Have you ever been prescribed weight loss medication before?',
      options: [
        { label: "Yes, I've taken weight loss medication in the past", value: 'yes' },
        { label: "No, I've never taken any weight loss medication", value: 'no' },
      ],
    },
    {
      type: 'single',
      id: 'exercise',
      question: 'What is your current exercise level?',
      options: [
        { label: "I don't currently exercise", value: 'none' },
        { label: '1–2 times a week', value: '1to2' },
        { label: '3–4 times a week', value: '3to4' },
        { label: '5 or more times a week', value: '5plus' },
      ],
    },
    {
      type: 'single',
      id: 'eating',
      question: 'What best describes your eating habits?',
      options: [
        { label: 'Mostly healthy, but I struggle with portion control', value: 'portions' },
        { label: 'I tend to snack or eat emotionally', value: 'snacking' },
        { label: 'Unhealthy meals or fast food most of the time', value: 'unhealthy' },
        { label: 'I try diets but struggle to stay consistent', value: 'diets' },
        { label: "I'm not sure", value: 'unsure' },
      ],
    },
    {
      type: 'single',
      id: 'alcohol',
      question: 'How much alcohol do you drink?',
      options: [
        { label: "I don't drink alcohol", value: 'none' },
        { label: 'Rarely — less than 1 drink per week', value: 'rarely' },
        { label: 'Sometimes — 1 to 5 drinks per week', value: 'sometimes' },
        { label: 'Often — 6 to 10 drinks per week', value: 'often' },
        { label: 'Very often — more than 10 drinks per week', value: 'heavy' },
      ],
    },
    {
      type: 'text',
      id: 'other',
      question: "Is there anything else you'd like your doctor to know?",
      placeholder: 'Any additional context that might be relevant to your care',
      whyWeAsk: 'Sharing any extra detail, even if it seems small, helps our doctors tailor your treatment with more care.',
      optional: true,
    },
  ],
}

export default function QuizWeightloss() {
  return <IntakeQuizEngine config={config} />
}
