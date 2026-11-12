import Link from 'next/link'
import Nav from '@/components/Nav'
import ImageryNote from '@/components/ImageryNote'
import TrustChips from '@/components/TrustChips'
import TreatmentsGrid from '@/components/home/TreatmentsGrid'
import { TREATMENT_CARDS } from '@/lib/treatments-grid'
import { InnerHero, Head, HowBand, CtaBand, InnerFoot, Arrow, PROGRAM_STEPS, SHOTS } from '@/components/inner/InnerSections'

/**
 * /treatments in the AlgoRx system (12 Nov 2026). Black nav, short dark hero
 * band, trust chips, the same nine-program bento grid as home (hover-isolate
 * on desktop, flat image cards on phones), a plain list of every program,
 * How it works on black, photo CTA band, black footer. Names and links come
 * from lib/treatments-grid.ts (lib/canonical-programs.ts). Areas only, never
 * a medicine. The old framer-motion cards never animated in (empty gap).
 */

// One line per program. Areas and the process only, no medicines, no outcomes.
const LINES: Record<string, string> = {
  'hormone-optimisation': 'Energy, drive and recovery, starting from your hormone markers.',
  'metabolic-weight-loss': 'A doctor-led plan for metabolic health and weight, built on your bloods.',
  pathology: 'One panel, 23+ markers, read by a doctor with you.',
  'performance-plus': 'Training output and recovery, measured and managed.',
  'injury-repair': 'Joints, tissue and recovery, under a doctor’s care.',
  longevity: 'Healthspan and prevention, tracked over time.',
  'sexual-health': 'Private, doctor-led care for confidence and function.',
  'skin-regeneration': 'Skin quality, texture and hair, assessed properly.',
  'hair-restoration': 'Scalp and density, with a doctor-led plan.',
}

export default function TreatmentsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="al-page">
        <InnerHero
          kicker="Programs"
          title="Choose your program."
          lead="Nine doctor-led programs. Every one starts with a blood panel and a doctor who reads it with you."
          cap={['Nine programs', 'Measure first', 'Doctor-led, online']}
          sidePhoto={SHOTS.duskWoman}
        />
        <TrustChips />

        <TreatmentsGrid />

        <section className="al-sec" aria-labelledby="tp-list">
          <div className="container-x">
            <Head id="tp-list" kicker="All programs" title="Every program." cap={['01 to 09', 'One panel covers them all', 'Pick what fits']} />
            <ol className="ip-list" role="list">
              {TREATMENT_CARDS.map(c => (
                <li key={c.slug}>
                  <Link href={c.href}>
                    <span className="ip-list-n">{c.n}</span>
                    <span className="ip-list-t">
                      <span className="ip-list-name">{c.name}</span>
                      <span className="ip-list-sub">{LINES[c.slug] ?? c.sub}</span>
                    </span>
                    <span className="ip-list-arrow" aria-hidden="true"><Arrow size={16} /></span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <HowBand rows={[{ label: 'Programs', steps: PROGRAM_STEPS }]} cap={['Bloods first', 'Then a plan', 'Review every 3 months']} />

        <CtaBand shot={SHOTS.womanStairs} kicker="Ready to start" title="Not sure which program?" lead="Create your free account and order one panel. Your doctor reads it with you and points you to the right program. No GP referral." />
        <ImageryNote />
      </main>
      <InnerFoot />
    </>
  )
}
