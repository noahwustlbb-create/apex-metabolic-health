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
 * title. Deng's record is his whole record, amateur and pro together, from the
 * bio Noah supplied (amateur 5-0, pro 1-2 = 8 fights, 6 wins), shown on Noah's
 * word 15 Nov 2026; Sherdog and CombatReg listed fewer fights when checked, so
 * recheck it when he next fights. Every card carries four facts so the row stays level.
 */
export type Athlete = {
  name: string
  nickname?: string
  /** Discipline and class, shown in mono under the name. */
  sport: string
  /** Four short sporting facts. Each must fit one line in a phone card at 360 wide (208px at 14.5px type). */
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
    facts: ['65 fights, 45 wins, 20 KOs', 'Ranked WBC world No. 5', 'WBC, WMO Australian titles', 'Fight of the Year 2023'],
    photo: '/athletes/jay-tonkin.webp',
    alt: 'Jay Tonkin in a fighting stance, his right hand bound in rope',
    pos: '50% 0%',
  },
  {
    name: 'Kalob Gray',
    sport: 'Boxing · Professional',
    facts: ['Trainer, NTG Fight & Fitness', 'Australian junior champion', 'Tri-Nations gold medallist', 'Queensland state champion'],
    photo: '/athletes/kalob-gray.webp',
    alt: 'Kalob Gray flexing both arms',
    pos: '50% 20%',
  },
  {
    name: 'Ran Deng',
    nickname: 'The Midnight Samurai',
    sport: 'MMA · Lightweight',
    facts: ['8 fights, 6 wins', 'Undefeated as an amateur', 'Eternal MMA professional', 'Pro debut: first-round TKO'],
    photo: '/athletes/ran-deng.webp',
    alt: 'Ran Deng standing in the cage in fight gloves',
    pos: '50% 0%',
  },
]
