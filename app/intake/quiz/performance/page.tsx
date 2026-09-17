import type { Metadata } from 'next'
import QuizPerformance from './QuizPerformance'

export const metadata: Metadata = {
  title: 'Performance & Recovery | Eligibility Check',
  description: 'Check your eligibility for our doctor-led performance optimisation program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function PerformanceQuizPage() {
  return <QuizPerformance />
}
