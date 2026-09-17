import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { skinRegenerationConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Skin Regeneration',
  description: 'Doctor-led skin regeneration program. Hormonal and nutritional assessment, AHPRA-registered doctors, clinically assessed protocols.',
}

export default function Page() {
  return <ProgramPageTemplate config={skinRegenerationConfig} />
}
