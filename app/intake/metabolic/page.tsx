import type { Metadata } from 'next'
import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export const metadata: Metadata = {
  title: 'Metabolic & Weight Management — Intake Form | Apex Metabolic Health',
  description: 'Consultation intake form for the Metabolic & Weight Management program.',
  robots: 'noindex, nofollow',
}

export default function MetabolicIntakePage() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-metabolic-intake-v1',
      programName: 'Metabolic & Weight Management',
      formTitle: 'METABOLIC & WEIGHT MANAGEMENT — CONSULTATION INTAKE',
      concern: 'Describe your situation — weight gain, difficulty losing weight, energy crashes, cravings, previous attempts, anything your GP has told you...',
      bloodsHref: '/intake/bloods-metabolic',
    }} />
  )
}
