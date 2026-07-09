import type { Metadata } from 'next'
import QuizHormone from './QuizHormone'

export const metadata: Metadata = {
  title: 'Hormone Optimisation | Eligibility Check — Apex Metabolic Health',
  description: 'Check your suitability for our doctor-led hormone optimisation program. Takes 3 minutes.',
  robots: { index: false, follow: false },
}

export default function HormoneQuizPage() {
  return <QuizHormone />
}
