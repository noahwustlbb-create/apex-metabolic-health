import type { Metadata } from 'next'
import QuizHair from './QuizHair'

export const metadata: Metadata = {
  title: 'Hair Restoration | Eligibility Check — Apex Metabolic Health',
  description: 'Check your eligibility for our doctor-led hair restoration program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function HairQuizPage() {
  return <QuizHair />
}
