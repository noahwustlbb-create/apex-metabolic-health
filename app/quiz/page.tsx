import HealthQuiz from '@/components/HealthQuiz'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Assessment | Apex Metabolic Health',
  description: 'Find your clinical program in 2 minutes. Doctor-curated matching across hormone, metabolic, performance, and recovery programs.',
}

export default function QuizPage() {
  return <HealthQuiz />
}
