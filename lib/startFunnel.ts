// One source of truth for how long the health quiz (/start/quiz) is.
//
// This existed in three places and disagreed with itself in all three: the hero
// said "Step 1 of 5", the funnel eyebrow said "Question 1 of 8", the interstitial
// said "Two more" with five screens left, and the progress bar reached 100% with
// three screens still to come. For an audience of people who arrived because a
// clinician told them something that wasn't true, the first checkable claim the
// site makes about itself has to be right.
//
// Every screen the visitor must pass through counts as a step. A step the user
// has to tap through is a step, whatever we put on it.

export type StartPhase = 'sex' | 'age' | 'goal' | 'symptoms' | 'email' | 'safety' | 'source'

/**
 * Rebuilt from the program guide (Noah, 12 Nov 2026: "the quiz is pretty weak").
 * Sex (usually carried in from the home hero), age, the main goal, one symptom
 * screen tailored to that goal, the email (third from last, so a visitor who
 * leaves can be followed up), one plain-English safety screen, and the
 * attribution question last. Seven taps, under a minute.
 */
export const START_PHASES: StartPhase[] = ['sex', 'age', 'goal', 'symptoms', 'email', 'safety', 'source']

export type FunnelOpts = { hasSex: boolean }

/** Total steps, the same whether or not anything was answered upstream. */
export const startTotal = () => START_PHASES.length
export const START_TOTAL_STEPS = START_PHASES.length

/** The phases the quiz actually renders. Upstream answers are skipped. */
export function phasesFor({ hasSex }: FunnelOpts): StartPhase[] {
  return START_PHASES.filter(p => !(p === 'sex' && hasSex))
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
