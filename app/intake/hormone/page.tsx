import type { Metadata } from 'next'
import HormoneIntakeForm from './HormoneIntakeForm'

export const metadata: Metadata = {
  title: 'Hormone Program Intake | Apex Metabolic Health',
  description: 'Complete your hormone program pre-screen intake form. Takes 3–5 minutes.',
  robots: 'noindex, nofollow',
}

export default function HormoneIntakePage() {
  return <HormoneIntakeForm />
}
