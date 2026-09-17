import ProgramPageTemplate from '@/components/ProgramPageTemplate'
import { sexualHealthConfig } from '@/lib/program-configs'

export const metadata = {
  title: 'Sexual Health',
  description: 'Confidential, doctor-led sexual health program for men. Clinical assessment, AHPRA-registered doctors, 100% online.',
}

export default function Page() {
  return <ProgramPageTemplate config={sexualHealthConfig} />
}
