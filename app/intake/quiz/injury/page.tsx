import type { Metadata } from 'next'
import QuizInjury from './QuizInjury'

export const metadata: Metadata = {
  title: 'Injury Repair & Recovery | Eligibility Check — Apex Metabolic Health',
  description: 'Check your eligibility for our doctor-led injury repair program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function InjuryQuizPage() {
  return <QuizInjury />
}
