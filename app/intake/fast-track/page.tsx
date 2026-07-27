import type { Metadata } from 'next'
import FastTrackForm from './FastTrackForm'

export const metadata: Metadata = {
  title: 'Fast Track Enquiry | Apex Metabolic Health',
  description: 'Start your consultation with Apex Metabolic Health. Takes less than 60 seconds.',
  robots: { index: false, follow: false },
}

export default function FastTrackPage() {
  return <FastTrackForm />
}
