// One source of truth for how long the /start funnel is.
//
// This existed in three places and disagreed with itself in all three: the hero
// said "Step 1 of 5", the funnel eyebrow said "Question 1 of 8", the interstitial
// said "Two more" with five screens left, and the progress bar reached 100% with
// three screens still to come. For an audience of people who arrived because a
// clinician told them something that wasn't true, the first checkable claim the
// site makes about itself has to be right.
//
// Every screen the visitor must pass through counts as a step, including the
// two that aren't questions (the pathway interstitial and the privacy screen).
// A step the user has to tap through is a step, whatever we put on it.

export type StartPhase = 'sex' | 'age' | 'pick' | 'email' | 'q1' | 'source'

/**
 * The 45-second check (Noah, 24 Oct 2026: "the 2 minute quiz is not optimal").
 * Sex first (usually answered in the homepage hero and carried in), then age,
 * then the goal, then the email (still the third question, so a visitor who
 * leaves can be followed up), then one symptom and the attribution question.
 * Retired: who-is-this-for (now a link on the age step), the pathway
 * interstitial, experience, duration, barrier, bloods and privacy screens.
 */
export const START_PHASES: StartPhase[] = ['sex', 'age', 'pick', 'email', 'q1', 'source']

export type FunnelOpts = { hasType: boolean; hasSex: boolean }

/** Total steps, the same whether or not anything was answered upstream. */
export const startTotal = () => START_PHASES.length
export const START_TOTAL_STEPS = START_PHASES.length

/** The phases /start actually renders. Upstream answers are skipped. */
export function phasesFor({ hasType, hasSex }: FunnelOpts): StartPhase[] {
  return START_PHASES.filter(p => !(p === 'pick' && hasType) && !(p === 'sex' && hasSex))
}

/** 1-indexed position in the whole journey, counting anything answered upstream. */
export function stepNumber(phase: StartPhase, opts: FunnelOpts): number {
  const idx = phasesFor(opts).indexOf(phase)
  if (idx < 0) return 1
  return START_PHASES.length - phasesFor(opts).length + idx + 1
}

/** Screens still to come after this one, for honest "N more" copy. */
export function stepsRemaining(phase: StartPhase, opts: FunnelOpts): number {
  return Math.max(0, START_TOTAL_STEPS - stepNumber(phase, opts))
}
