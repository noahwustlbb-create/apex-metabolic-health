import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { performancePlusConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Performance Optimisation | Apex Metabolic Health',
  description: 'Doctor-led performance and recovery optimisation. Comprehensive blood panel, AHPRA-registered doctors, evidence-based protocols.',
}

export default function Page() {
  return <ProgramPageTemplate config={performancePlusConfig} />
}
