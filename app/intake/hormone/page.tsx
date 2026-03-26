import type { Metadata } from 'next'
import HormoneIntakeForm from './HormoneIntakeForm'

export const metadata: Metadata = {
  title: 'Hormone Program Intake | Apex Metabolic Health',
  description: 'Request an Appointment & Pre-Screen Intake Form for the Hormone Program. Takes 3–5 minutes.',
  robots: 'noindex, nofollow',
}

export default function HormoneIntakePage() {
  return <HormoneIntakeForm />
}
