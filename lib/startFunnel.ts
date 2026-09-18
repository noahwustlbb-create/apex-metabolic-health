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

export type StartPhase =
  | 'q0' | 'pick' | 'q1' | 'place' | 'exp' | 'q2' | 'q3' | 'bloods' | 'source' | 'privacy'

/** The full journey, in order. `pick` is answered by the hero chips upstream. */
export const START_PHASES: StartPhase[] = [
  'q0', 'pick', 'q1', 'place', 'exp', 'q2', 'q3', 'bloods', 'source', 'privacy',
]

/** Total steps, identical whether or not the visitor entered from a hero chip. */
export const START_TOTAL_STEPS = START_PHASES.length

/** The phases /start actually renders. A hero chip has already answered `pick`. */
export function phasesFor(hasPredefinedType: boolean): StartPhase[] {
  return hasPredefinedType ? START_PHASES.filter(p => p !== 'pick') : [...START_PHASES]
}

/** 1-indexed position in the whole journey, counting anything answered upstream. */
export function stepNumber(phase: StartPhase, hasPredefinedType: boolean): number {
  const idx = phasesFor(hasPredefinedType).indexOf(phase)
  if (idx < 0) return 1
  return (hasPredefinedType ? 1 : 0) + idx + 1
}

/** Screens still to come after this one, for honest "N more" copy. */
export function stepsRemaining(phase: StartPhase, hasPredefinedType: boolean): number {
  return Math.max(0, START_TOTAL_STEPS - stepNumber(phase, hasPredefinedType))
}
