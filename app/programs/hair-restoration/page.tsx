import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { hairRestorationConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Hair Restoration | Apex Metabolic Health',
  description: 'Doctor-led hair restoration program. Hormonal blood panel, AHPRA-registered doctors, clinically assessed protocols.',
}

export default function Page() {
  return <ProgramPageTemplate config={hairRestorationConfig} />
}
