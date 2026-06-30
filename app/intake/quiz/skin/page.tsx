import type { Metadata } from 'next'
import QuizSkin from './QuizSkin'

export const metadata: Metadata = {
  title: 'Skin Regeneration | Eligibility Check — Apex Metabolic Health',
  description: 'Check your eligibility for our doctor-led skin regeneration program. Takes 2 minutes.',
  robots: { index: false, follow: false },
}

export default function SkinQuizPage() {
  return <QuizSkin />
}
