import type { Metadata } from 'next'
import QuizAntiageing from './QuizAntiageing'

export const metadata: Metadata = {
  title: 'Anti-Ageing & Longevity | Eligibility Check — Apex Metabolic Health',
  description: 'Check your eligibility for our doctor-led anti-ageing and longevity program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function AntiageingQuizPage() {
  return <QuizAntiageing />
}
