import type { Metadata } from 'next'
import HormoneConsultForm from './HormoneConsultForm'

export const metadata: Metadata = {
  title: 'Hormone Consult Intake — Apex Metabolic Health',
  description: 'Complete your hormone consultation intake form.',
  robots: { index: false, follow: false },
}

export default function HormoneConsultPage() {
  return <HormoneConsultForm />
}
