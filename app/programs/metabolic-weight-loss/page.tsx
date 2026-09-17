import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { metabolicWeightLossConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Medical Weight Loss',
  description: 'Doctor-led medical weight loss. Metabolic and hormonal blood panel, AHPRA-registered doctors, personalised clinical protocol.',
}

export default function Page() {
  return <ProgramPageTemplate config={metabolicWeightLossConfig} />
}
