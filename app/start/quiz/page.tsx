import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShortAssessment from '../ShortAssessment'

// The health quiz: the home page's quiet secondary option (Noah, 12 Nov 2026).
// /start itself redirects to /signup; this path is excluded in next.config.mjs.
// Seven taps, built from the program guide (lib/quiz-logic.ts), ending on
// "Create your free account" -> /signup with the programs set for the portal.
export const metadata: Metadata = {
  title: 'Health quiz',
  description: 'Seven quick questions that point you to the right Apex program to read about, before you create a free account.',
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
