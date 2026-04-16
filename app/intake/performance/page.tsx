import type { Metadata } from 'next'
import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export const metadata: Metadata = {
  title: 'Performance Optimisation — Intake Form | Apex Metabolic Health',
  description: 'Consultation intake form for the Performance Optimisation program.',
  robots: 'noindex, nofollow',
}

export default function PerformanceIntakePage() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-performance-intake-v1',
      programName: 'Performance Optimisation',
      formTitle: 'PERFORMANCE OPTIMISATION — CONSULTATION INTAKE',
      concern: 'Describe your performance goals — recovery, strength, endurance, energy, mental output. What\'s holding you back right now?',
      bloodsHref: '/intake/bloods-performance',
    }} />
  )
}
