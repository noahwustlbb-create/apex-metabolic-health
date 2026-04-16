import type { Metadata } from 'next'
import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export const metadata: Metadata = {
  title: 'Injury Repair & Recovery — Intake Form | Apex Metabolic Health',
  description: 'Consultation intake form for the Injury Repair & Recovery program.',
  robots: 'noindex, nofollow',
}

export default function InjuryIntakePage() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-injury-intake-v1',
      programName: 'Injury Repair & Recovery',
      formTitle: 'INJURY REPAIR & RECOVERY — CONSULTATION INTAKE',
      concern: 'Describe your injury or recovery concern — what happened, how long ago, current symptoms, what treatment you\'ve had, and what\'s not improving...',
      bloodsHref: '/intake/bloods-injury',
    }} />
  )
}
