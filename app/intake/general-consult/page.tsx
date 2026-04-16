import type { Metadata } from 'next'
import GeneralConsultForm from './GeneralConsultForm'

export const metadata: Metadata = {
  title: 'General Consult — Apex Metabolic Health',
  description: 'Complete your general consultation intake form.',
  robots: { index: false, follow: false },
}

export default function GeneralConsultPage() {
  return <GeneralConsultForm />
}
