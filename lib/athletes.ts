/**
 * Apex sponsored athletes (Noah, 15 Nov 2026). Shown in the home Verified
 * section, under the LegitScript seal. An empty list renders nothing.
 *
 * Rules for every entry (National Law s 133(1)(c), compliance ACTIONS on paid
 * ambassadors):
 *  - a real person with their written OK, and a photo we are allowed to use;
 *  - the card always says "Sponsored athlete", so the paid relationship is disclosed;
 *  - sporting facts only: no quote, no health or treatment claim, nothing that
 *    says or implies the athlete is a patient;
 *  - every fact is either confirmed by a public record or a stable fact the
 *    athlete supplied. Rankings change monthly, so a ranking needs its source
 *    and date before it goes on a card.
 *
 * Checked 15 Nov 2026: Tonkin's WBC Muaythai and WMO Australian titles (WBC
 * Muaythai, wmomuaythai.org); Gray's Australian junior title and Tri-Nations
 * gold (Beaudesert Times, Country to Coast Lawyers, Tapology); Deng's nickname
 * and first-round debut win at Eternal MMA 96 (Sherdog). Held back until Noah
 * gives a source: Tonkin "ranked 5th WBC world rankings" and "Fight of the year
 * 2023"; Deng's exact records (public records disagree).
 */
export type Athlete = {
  name: string
  nickname?: string
  /** Discipline and class, shown in mono under the name. */
  sport: string
  /** Three short sporting facts. */
  facts: string[]
  photo: string
  alt: string
  /** CSS object-position for the 4:5 crop. */
  pos?: string
}

export const ATHLETES: Athlete[] = [
  {
    name: 'Jay Tonkin',
    nickname: 'The Dingo',
    sport: 'Muay Thai · Super middleweight',
    facts: ['65 fights, 45 wins, 20 by knockout', 'WBC Muaythai Australian champion', 'WMO Australian champion'],
    photo: '/athletes/jay-tonkin.webp',
    alt: 'Jay Tonkin in a fighting stance, his right hand bound in rope',
    pos: '50% 0%',
  },
  {
    name: 'Kalob Gray',
    sport: 'Boxing · Professional',
    facts: ['Pro boxer and boxing trainer, NTG Fight & Fitness', 'Australian junior national champion', 'Tri-Nations gold medallist'],
    photo: '/athletes/kalob-gray.webp',
    alt: 'Kalob Gray flexing both arms',
    pos: '50% 20%',
  },
  {
    name: 'Ran Deng',
    nickname: 'The Midnight Samurai',
    sport: 'MMA · Lightweight',
    facts: ['Professional with Eternal MMA', 'Undefeated as an amateur', 'First-round TKO on his pro debut'],
    photo: '/athletes/ran-deng.webp',
    alt: 'Ran Deng standing in the cage in fight gloves',
    pos: '50% 0%',
  },
]
