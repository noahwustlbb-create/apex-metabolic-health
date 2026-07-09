import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { injuryRepairConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Injury Repair & Recovery | Apex Metabolic Health',
  description: 'Doctor-led injury repair and recovery program. Clinical assessment of recovery markers, AHPRA-registered doctors, evidence-based protocols.',
}

export default function Page() {
  return <ProgramPageTemplate config={injuryRepairConfig} />
}
