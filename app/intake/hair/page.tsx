import type { Metadata } from 'next'
import ConsultIntakeForm from '@/components/ConsultIntakeForm'

export const metadata: Metadata = {
  title: 'Hair & Skin Restoration — Intake Form | Apex Metabolic Health',
  description: 'Consultation intake form for the Hair & Skin Restoration program.',
  robots: 'noindex, nofollow',
}

export default function HairSkinIntakePage() {
  return (
    <ConsultIntakeForm config={{
      storageKey: 'apex-hair-skin-intake-v1',
      programName: 'Hair & Skin Restoration',
      formTitle: 'HAIR & SKIN RESTORATION — CONSULTATION INTAKE',
      concern: 'Describe your concerns — hair loss, skin changes, or both. Include when it started, any family history, what you\'ve tried, and anything else your doctor should know...',
      bloodsHref: '/intake/bloods-hair',
    }} />
  )
}
