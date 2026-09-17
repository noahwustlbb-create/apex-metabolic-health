import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { hormoneOptimisationConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Hormone Optimisation',
  description: 'Doctor-led testosterone and hormonal health assessment. Comprehensive blood panel, AHPRA-registered doctors, personalised protocol.',
}

export default function Page() {
  return <ProgramPageTemplate config={hormoneOptimisationConfig} />
}
