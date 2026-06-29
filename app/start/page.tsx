import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShortAssessment from './ShortAssessment'

export const metadata: Metadata = {
  title: 'Find My Treatment — Apex Metabolic Health',
  description: 'Answer a few quick questions and our clinical team will guide you to the right doctor-led treatment pathway.',
  robots: { index: false, follow: false },
}

export default function StartPage() {
  return (
    <Suspense fallback={<div style={{ background: '#04060d', minHeight: '100vh' }} />}>
      <ShortAssessment />
    </Suspense>
  )
}
