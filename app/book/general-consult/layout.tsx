import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  path: '/book/general-consult',
  title: 'Peptide / General Consult',
  description: 'A telehealth consult with an AHPRA-registered doctor who reviews your blood results and history, then sets a plan where clinically appropriate.',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
