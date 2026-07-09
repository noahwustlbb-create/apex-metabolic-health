import type { Metadata } from 'next'
import GeneralConsultForm from './GeneralConsultForm'

export const metadata: Metadata = {
  title: 'New Patient | General & Peptide Consult — Apex Metabolic Health',
  description: 'Request an appointment and complete your consent form for a General or Peptide consultation.',
  robots: { index: false, follow: false },
}

export default function GeneralConsultPage() {
  return <GeneralConsultForm />
}
