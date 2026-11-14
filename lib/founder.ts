/**
 * The co-founder note on the home page (Noah, 15 Nov 2026: "add a co founder
 * comment to the top as well", AlgoRx founder card as the reference). One
 * card, shown after the Verified section and above the sponsored athletes.
 * `null` renders nothing.
 *
 * Rules:
 *  - the words are the named person's own, and they have approved them. Never
 *    a made-up story (brand platform, decision 3);
 *  - it is the business speaking about how it works, not a testimonial
 *    (National Law s 133(1)(c)): no "it worked for me", no result, no claim
 *    about a treatment, nothing the rest of the site does not already say;
 *  - no "Dr" unless the person is an AHPRA-registered doctor.
 */
export type FounderNote = {
  quote: string
  name: string
  role: string
}

export const FOUNDER_NOTE: FounderNote | null = {
  quote: 'We built Apex to measure first and treat second. A doctor reads your bloods before anything is prescribed.',
  name: 'Noah Wust',
  role: 'Co-founder',
}
