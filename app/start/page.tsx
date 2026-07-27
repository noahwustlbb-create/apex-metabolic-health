import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShortAssessment from './ShortAssessment'

export const metadata: Metadata = {
  title: 'Start Your Assessment | Apex Metabolic Health',
  description: 'Answer a few quick questions and our clinical team will guide you to the right doctor-led treatment pathway.',
  robots: { index: false, follow: false },
}

export default function StartPage() {
  return (
    <Suspense fallback={<div style={{ background: '#f9fafb', minHeight: '100vh' }} />}>
      <ShortAssessment />
    </Suspense>
  )
}
