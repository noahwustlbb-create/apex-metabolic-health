import type { Metadata } from 'next'
import QuizWeightloss from './QuizWeightloss'

export const metadata: Metadata = {
  title: 'Medical Weight Management | Eligibility Check',
  description: 'Check your eligibility for our doctor-led metabolic weight management program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function WeightlossQuizPage() {
  return <QuizWeightloss />
}
