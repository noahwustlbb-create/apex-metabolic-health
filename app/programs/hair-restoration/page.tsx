import { pageMetadata } from '@/lib/seo'
import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { hairRestorationConfig } from '@/lib/program-configs'

export const metadata = pageMetadata({
  path: '/programs/hair-restoration',
  title: 'Hair Restoration',
  description: 'Doctor-led hair restoration program. Hormonal blood panel, AHPRA-registered doctors, clinically assessed protocols.',
})

export default function Page() {
  return <ProgramPageTemplate config={hairRestorationConfig} />
}
