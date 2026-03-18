import type { Metadata } from 'next'
import GeneralIntakeForm from './GeneralIntakeForm'

export const metadata: Metadata = {
  title: 'General Appointment Request | Apex Metabolic Health',
  description: 'Complete your general appointment intake form. Takes 3–5 minutes.',
  robots: 'noindex, nofollow',
}

export default function GeneralIntakePage() {
  return <GeneralIntakeForm />
}
