import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShortAssessment from '../ShortAssessment'

// The 45-second health quiz: the home page's secondary option (Noah, 12 Nov
// 2026). /start itself redirects to /signup; this path is excluded in
// next.config.mjs. The quiz ends on "Create your free account" -> /signup.
export const metadata: Metadata = {
  title: 'Health quiz',
  description: 'A few quick questions to see what your blood panel looks at before you create a free account.',
  alternates: { canonical: '/start/quiz' },
  robots: { index: false, follow: false },
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--bg)', minHeight: '100vh' }} />}>
      <ShortAssessment />
    </Suspense>
  )
}
