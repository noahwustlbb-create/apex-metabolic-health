/**
 * Apex sponsored athletes (Noah, 15 Nov 2026). Shown on the home page in their
 * own "Sponsored athletes." section, after Verified. Never inside a proof or
 * review section: paid athletes shown as proof of the clinic is an implied
 * endorsement. An empty list renders nothing.
 *
 * Rules for every entry (National Law s 133(1)(c), compliance ACTIONS on paid
 * ambassadors):
 *  - a real person with their written OK, and a photo we are allowed to use;
 *  - the card always says "Sponsored athlete", so the paid relationship is disclosed;
 *  - sporting facts only: no quote, no health or treatment claim, nothing that
 *    says or implies the athlete is a patient;
 *  - every fact is either confirmed by a public record or a stable fact the
 *    athlete or Noah supplied. Rankings change, so a ranking carries the date
 *    it was put on the card (below) and gets rechecked when it is next touched.
 *
 * Checked 15 Nov 2026: Tonkin's WBC Muaythai and WMO Australian titles (WBC
 * Muaythai, wmomuaythai.org); Gray's Australian junior title and Tri-Nations
 * gold (Beaudesert Times, Country to Coast Lawyers, Tapology); Deng's nickname
 * and first-round debut win at Eternal MMA 96 (Sherdog). Added 15 Nov 2026 on Noah's
 * word, no public source found: Tonkin "ranked 5th WBC world rankings" and
 * "Fight of the year 2023". Supplied by the athletes: Gray's Queensland state
 * title, Deng's gym. Still held back: Deng's exact records (public records
 * disagree). Every card carries four facts so the row stays level.
 */
export type Athlete = {
  name: string
  nickname?: string
  /** Discipline and class, shown in mono under the name. */
  sport: string
  /** Four short sporting facts, each short enough for one line at 360 wide. */
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
    facts: ['65 fights, 45 wins, 20 by knockout', 'Ranked 5th in the world by the WBC', 'WBC and WMO Australian champion', 'Fight of the Year 2023'],
    photo: '/athletes/jay-tonkin.webp',
    alt: 'Jay Tonkin in a fighting stance, his right hand bound in rope',
    pos: '50% 0%',
  },
  {
    name: 'Kalob Gray',
    sport: 'Boxing · Professional',
    facts: ['Boxing trainer, NTG Fight & Fitness', 'Australian junior national champion', 'Tri-Nations gold medallist', 'Queensland state champion'],
    photo: '/athletes/kalob-gray.webp',
    alt: 'Kalob Gray flexing both arms',
    pos: '50% 20%',
  },
  {
    name: 'Ran Deng',
    nickname: 'The Midnight Samurai',
    sport: 'MMA · Lightweight',
    facts: ['Professional with Eternal MMA', 'Fights out of NTG Fight & Fitness', 'Undefeated as an amateur', 'First-round TKO on his pro debut'],
    photo: '/athletes/ran-deng.webp',
    alt: 'Ran Deng standing in the cage in fight gloves',
    pos: '50% 0%',
  },
]
