import { pageMetadata } from '@/lib/seo'
import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { pathologyConfig } from '@/lib/program-configs'

export const metadata = pageMetadata({
  path: '/programs/pathology',
  title: 'Comprehensive Blood Panel',
  description: '23+ marker comprehensive blood panel. Doctor-issued, doctor-reviewed, doctor-explained. AHPRA-registered practitioners, Australia-wide.',
})

export default function Page() {
  return <ProgramPageTemplate config={pathologyConfig} />
}
