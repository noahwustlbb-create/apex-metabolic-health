import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { pathologyConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Comprehensive Blood Panel | Apex Metabolic Health',
  description: '30+ marker comprehensive blood panel. Doctor-issued, doctor-reviewed, doctor-explained. AHPRA-registered practitioners, Australia-wide.',
}

export default function Page() {
  return <ProgramPageTemplate config={pathologyConfig} />
}
