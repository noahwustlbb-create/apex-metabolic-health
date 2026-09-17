import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { longevityConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Anti-Ageing & Longevity',
  description: 'Doctor-led longevity and healthspan program. Comprehensive biological panel, AHPRA-registered doctors, evidence-based protocols.',
}

export default function Page() {
  return <ProgramPageTemplate config={longevityConfig} />
}
