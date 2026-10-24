import { pageMetadata } from '@/lib/seo'
import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { performancePlusConfig } from '@/lib/program-configs'

export const metadata = pageMetadata({
  path: '/programs/performance-plus',
  title: 'Performance Optimisation',
  description: 'Doctor-led performance and recovery optimisation. Comprehensive blood panel, AHPRA-registered doctors, evidence-based protocols.',
})

export default function Page() {
  return <ProgramPageTemplate config={performancePlusConfig} />
}
