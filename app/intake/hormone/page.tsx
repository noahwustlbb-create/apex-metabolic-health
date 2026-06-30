import type { Metadata } from 'next'
import HormoneIntakeForm from './HormoneIntakeForm'

export const metadata: Metadata = {
  title: 'Hormone Optimisation | Get Started — Apex Metabolic Health',
  description: 'Begin your hormone optimisation journey. Doctor-ordered blood testing and personalised care, Australia-wide.',
  robots: 'noindex, nofollow',
}

export default function HormoneIntakePage() {
  return <HormoneIntakeForm />
}
