import type { Metadata } from 'next'
import GeneralIntakeForm from './GeneralIntakeForm'

export const metadata: Metadata = {
  title: 'General Appointment Request | Apex Metabolic Health',
  description: 'Request an Appointment & Pre-Screen Intake Form for a General Appointment. Takes 3–5 minutes.',
  robots: 'noindex, nofollow',
}

export default function GeneralIntakePage() {
  return <GeneralIntakeForm />
}
