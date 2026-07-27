import type { Metadata } from 'next'
import HormoneConsultForm from './HormoneConsultForm'

export const metadata: Metadata = {
  title: 'New Patient | Hormone Consult | Apex Metabolic Health',
  description: 'Request an appointment and complete your consent form for a Hormone Consultation.',
  robots: { index: false, follow: false },
}

export default function HormoneConsultPage() {
  return <HormoneConsultForm />
}
