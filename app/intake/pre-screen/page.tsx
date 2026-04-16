import type { Metadata } from 'next'
import PreScreenForm from './PreScreenForm'

export const metadata: Metadata = {
  title: 'Get Started | Apex Metabolic Health',
  description: 'Start your health assessment. Takes 60 seconds.',
  robots: 'noindex, nofollow',
}

export default function PreScreenPage() {
  return <PreScreenForm />
}
