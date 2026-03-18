import { notFound } from 'next/navigation'
import { programs, getProgramBySlug } from '@/lib/programs'
import ProgramPageClient from './ProgramPageClient'

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }))
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug)

  if (!program) {
    notFound()
  }

  return <ProgramPageClient program={program} />
}
