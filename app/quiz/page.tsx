import HealthQuiz from '@/components/HealthQuiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Assessment | Apex Metabolic Health',
  description: 'Find out if you\'re eligible and which program fits your goals. Takes 2 minutes.',
}

export default function QuizPage() {
  return <HealthQuiz />
}
