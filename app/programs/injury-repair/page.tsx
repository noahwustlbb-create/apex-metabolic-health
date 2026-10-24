import { pageMetadata } from '@/lib/seo'
import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { injuryRepairConfig } from '@/lib/program-configs'

export const metadata = pageMetadata({
  path: '/programs/injury-repair',
  title: 'Injury Repair & Recovery',
  description: 'Doctor-led injury repair and recovery program. Clinical assessment of recovery markers, AHPRA-registered doctors, evidence-based protocols.',
})

export default function Page() {
  return <ProgramPageTemplate config={injuryRepairConfig} />
}
