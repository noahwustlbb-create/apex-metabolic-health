import type { Metadata } from 'next'
import QuizSexual from './QuizSexual'

export const metadata: Metadata = {
  title: 'Sexual Health | Eligibility Check — Apex Metabolic Health',
  description: 'Confidential eligibility check for our sexual health program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function SexualQuizPage() {
  return <QuizSexual />
}
