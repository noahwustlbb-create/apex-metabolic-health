import { notFound } from 'next/navigation'
import { programs, getProgramBySlug } from '@/lib/programs'
import ProgramPageClient from './ProgramPageClient'

// Slugs with their own folder render ProgramPageTemplate (AlgoRx system). Prerendering
// them here as well writes two pages to the same output path, and on `next start` the
// legacy page could win. Only slugs without a dedicated folder are generated here.
const DEDICATED = new Set([
  'hormone-optimisation', 'metabolic-weight-loss', 'longevity', 'hair-restoration', 'skin-regeneration',
  'injury-repair', 'performance-plus', 'sexual-health', 'pathology',
])

export async function generateStaticParams() {
  return programs.filter((p) => !DEDICATED.has(p.slug)).map((p) => ({ slug: p.slug }))
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = getProgramBySlug(slug)

  if (!program) {
    notFound()
  }

  return <ProgramPageClient program={program} />
}
