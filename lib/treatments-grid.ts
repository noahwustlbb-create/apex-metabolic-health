/**
 * Home treatments grid (AlgoRx bento, Noah 11 Nov 2026, ASKS item 22).
 * Names and links come from lib/canonical-programs.ts where the program is
 * listed there. hair-restoration and performance-plus have live pages under
 * app/programs/ but are not in the canonical list yet, so they carry their
 * page titles here.
 *
 * IMAGES: Apex originals, GPT Image 2.5 macro textures made 11 Nov 2026
 * (prompts: ~/Clients/Apex/research/hero-athlete-2026-11-11/grid-final/prompts.json).
 * Every image path lives in IMG below.
 *
 * Sub-lines name areas, never a medicine or a medicine class (TGA).
 */
import { CANONICAL_PROGRAMS } from './canonical-programs'

const IMG: Record<string, string> = {
  'hormone-optimisation': '/programs-grid/hormone-optimisation',
  'metabolic-weight-loss': '/programs-grid/metabolic-weight-loss',
  'pathology': '/programs-grid/pathology',
  'performance-plus': '/programs-grid/performance-plus',
  'injury-repair': '/programs-grid/injury-repair',
  'longevity': '/programs-grid/longevity',
  'sexual-health': '/programs-grid/sexual-health',
  'skin-regeneration': '/programs-grid/skin-regeneration',
  'hair-restoration': '/programs-grid/hair-restoration',
}

const canon = (slug: string) => CANONICAL_PROGRAMS.find(p => p.slug === slug)

type Row = { slug: string; name?: string; sub: string }
const ROWS: Row[] = [
  { slug: 'hormone-optimisation', sub: 'Energy · drive · hormones' },
  { slug: 'metabolic-weight-loss', sub: 'Metabolic health · weight' },
  { slug: 'pathology', sub: 'One panel · doctor read' },
  { slug: 'performance-plus', name: 'Performance Optimisation', sub: 'Training · output · recovery' },
  { slug: 'injury-repair', sub: 'Joints · tissue · recovery' },
  { slug: 'longevity', sub: 'Healthspan · prevention' },
  { slug: 'sexual-health', sub: 'Confidence · function' },
  { slug: 'skin-regeneration', sub: 'Skin quality · texture' },
  { slug: 'hair-restoration', name: 'Hair Restoration', sub: 'Scalp · density' },
]

export type GridCard = { n: string; slug: string; name: string; sub: string; href: string; img: string }

export const TREATMENT_CARDS: GridCard[] = ROWS.map((r, i) => {
  const c = canon(r.slug)
  return {
    n: String(i + 1).padStart(2, '0'),
    slug: r.slug,
    name: c?.name ?? r.name ?? r.slug,
    sub: r.sub,
    href: c?.websiteHref ?? `/programs/${r.slug}`,
    img: IMG[r.slug],
  }
})

/** Cards shown as features when nothing is hovered (one per column, a diagonal). */
export const DEFAULT_FEATURES = ['hormone-optimisation', 'injury-repair', 'hair-restoration']
