/**
 * Apex sponsored athletes (Noah, 15 Nov 2026: "we also have sponsored athletes,
 * leave a space for that, I'll upload tomorrow"). The slot sits in the home
 * Community section, under the LegitScript seal. It is EMPTY until Noah supplies
 * the real photos and names, and while it is empty nothing renders.
 *
 * Rules for every entry (National Law s 133(1)(c), compliance ACTIONS on paid
 * ambassadors): a real person with their written OK, name and sport only, the
 * card always says "Sponsored athlete" so the paid relationship is disclosed,
 * and no quote, no result, no treatment named.
 */
export type Athlete = { name: string; sport: string; photo: string; alt: string }

export const ATHLETES: Athlete[] = []
