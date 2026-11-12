// Field Notes (Noah, 13 Nov 2026): short, plain-English notes on testing, training, recovery and longevity, after
// the AlgoRx "Field Notes." section. The one source for the home section, the longevity page section and the
// /field-notes pages.
//
// Advertising rules (.cursor/rules/compliance.mdc) bind every line: no medication, compound, hormone product or
// dose; no outcome promises; no personal advice. Every note ends by sending the reader to a doctor, not to a
// treatment. General information only.

export type FieldNoteTag = 'Hormones' | 'Blood tests' | 'Longevity' | 'Recovery'

export type FieldNote = {
  slug: string
  tag: FieldNoteTag
  title: string
  /** One line under the title on the card and the article. */
  dek: string
  img: { src: string; srcSet?: string; alt: string; pos?: string }
  minutes: number
  body: string[]
  /** Where the note is shown as a card, besides /field-notes. */
  on: ('home' | 'longevity')[]
}

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: 'normal-is-a-range',
    tag: 'Hormones',
    title: 'Normal is a range, not a verdict.',
    dek: 'Why a result inside the reference range can still be worth a conversation.',
    img: { src: '/photos/field-mountain-1800.webp', srcSet: '/photos/field-mountain-900.webp 900w, /photos/field-mountain-1800.webp 1800w', alt: 'A dark mountain at night with a thin line of light climbing to the summit', pos: '58% 40%' },
    minutes: 3,
    on: ['home'],
    body: [
      'Every marker on a blood report sits beside a reference range. That range is built from a large group of people. It tells you where most results fall. It does not tell you where you feel and function best.',
      'Two people can both be "normal" and sit at opposite ends of the same range. One feels fine. The other has been tired, flat and slow to recover for a year. On paper, nothing is wrong with either of them.',
      'That is why one number rarely tells the story. A doctor reads markers together: hormone markers alongside thyroid, iron, metabolic and inflammatory markers. They look at the pattern, at how you feel, and at how results move over time.',
      'Timing matters too. Some hormone markers change through the day, so the collection centre may ask for a morning draw. A single result taken at the wrong time, or after a rough week, can mislead. A repeat test is often part of a careful read.',
      'If you have been told your results look normal but you still do not feel right, that is a fair reason to look properly. Bring your symptoms, your history and any past results to a doctor who will read the whole picture with you.',
    ],
  },
  {
    slug: 'from-blood-draw-to-consult',
    tag: 'Blood tests',
    title: 'What happens between your blood draw and your consult.',
    dek: 'The path from the collection centre to a plan, step by step.',
    img: { src: '/photos/amber-dropper-1400.webp', srcSet: '/photos/amber-dropper-800.webp 800w, /photos/amber-dropper-1400.webp 1400w', alt: 'A single amber drop falling from a glass dropper between two stones', pos: '50% 45%' },
    minutes: 3,
    on: ['home'],
    body: [
      'Once you create your account and order your panel, your referral is issued electronically. You do not need a GP referral first.',
      'You take that referral to an accredited collection centre near you. A morning visit is usually best. Ask the centre if you need to fast and follow what they tell you.',
      'Your sample goes to a NATA-accredited laboratory. Most results come back in about 48 hours. They land in your portal, and a doctor reviews them before your consultation.',
      'In the consult, your AHPRA-registered doctor goes through your results with you, marker by marker, alongside your history and how you have been feeling. If treatment is suitable, they explain the options and build a plan around your own numbers. If it is not, they tell you that too.',
      'From there, follow-up bloods and a review about every three months keep the plan honest. Each panel adds to your trend, so changes are measured, not guessed.',
    ],
  },
  {
    slug: 'before-your-blood-test',
    tag: 'Recovery',
    title: 'Before your blood test: a short checklist.',
    dek: 'Small things in the day before that can change what your results show.',
    img: { src: '/photos/flatlay-1800.webp', srcSet: '/photos/flatlay-900.webp 900w, /photos/flatlay-1800.webp 1800w', alt: 'A folded jumper, worn trail shoes, a water bottle, a notebook, glasses and a pouch laid out on linen', pos: '50% 50%' },
    minutes: 2,
    on: ['home', 'longevity'],
    body: [
      'A blood test is a snapshot of one morning. A few simple habits make that snapshot more useful.',
      'Skip the hard session the day before. Heavy or unusual exercise can temporarily lift some muscle and liver markers. A walk is fine.',
      'Go in the morning, and fast only if the collection centre asks you to. Drink water as normal unless told otherwise.',
      'Tell your doctor about every supplement you take, including powders and gummies. Some, such as biotin, can interfere with certain lab tests. Do not stop anything a doctor has prescribed without asking them first.',
      'Write down how you have been feeling, how you have been sleeping, and any questions. Bring the list to your consult. It turns a set of numbers into a conversation about you.',
    ],
  },
  {
    slug: 'baseline-in-your-forties',
    tag: 'Longevity',
    title: 'Your forties are the decade to get a baseline.',
    dek: 'You cannot track a change you never measured.',
    img: { src: '/photos/man-bench-dusk-1400.webp', srcSet: '/photos/man-bench-dusk-800.webp 800w, /photos/man-bench-dusk-1400.webp 1400w', alt: 'A man in his forties in a grey hoodie resting on a park bench at dusk', pos: '50% 24%' },
    minutes: 3,
    on: ['longevity'],
    body: [
      'Many people reach their fifties without ever having had a full set of bloods taken while they felt well. Then, when something changes, there is nothing to compare it to.',
      'A baseline is simply a record of your markers today: metabolic, heart, hormone, thyroid, iron, nutrient and inflammatory markers, taken together. On its own it may show nothing unusual. Its value is in what comes next.',
      'Repeat the same panel over time and you can see your own trend, not just whether you sit inside a population range. A slow drift in one marker is easier to discuss early than late.',
      'Your forties are a sensible time to start. Energy, recovery, sleep and body composition often begin to shift, and the habits you build now carry into the decades after.',
      'A doctor can help you decide what to measure and how often, based on your history and your goals.',
    ],
  },
  {
    slug: 'inflammation-you-cannot-feel',
    tag: 'Longevity',
    title: 'Inflammation you cannot feel.',
    dek: 'What a low-grade inflammation marker can and cannot tell you.',
    img: { src: '/photos/driftwood.webp', srcSet: '/photos/driftwood-800.webp 800w, /photos/driftwood.webp 880w', alt: 'Close-up of weathered driftwood with deep flowing grain', pos: '50% 50%' },
    minutes: 3,
    on: ['longevity'],
    body: [
      'Some inflammation is obvious: a sprained ankle, a fever. Low-grade inflammation is quieter. You usually cannot feel it, and it can sit in the background for years.',
      'A blood marker such as high-sensitivity CRP gives a read on it. It is one of the markers a doctor may look at when thinking about long-term heart and metabolic health.',
      'One result is never the whole story. A cold, an injury, poor sleep or a hard training block can lift it for a while. That is why it is read alongside your other markers, your history and, often, a repeat test.',
      'What moves it over time is mostly the unglamorous stuff: sleep, movement, body composition, alcohol, stress and diet. Measuring it lets you and your doctor see whether the changes you make are showing up.',
      'If a result comes back raised, the next step is a conversation with your doctor, not a guess.',
    ],
  },
  {
    slug: 'fitness-is-a-long-game',
    tag: 'Longevity',
    title: 'Fitness is a long game.',
    dek: 'Strength and aerobic fitness are two of the most studied markers of healthy ageing.',
    img: { src: '/photos/woman-trail-run.webp', srcSet: '/photos/woman-trail-run-800.webp 800w, /photos/woman-trail-run.webp 880w', alt: 'A woman running up a grassy volcanic hillside under a grey sky', pos: '50% 50%' },
    minutes: 3,
    on: ['longevity'],
    body: [
      'If there is one habit with strong evidence behind it for ageing well, it is staying active. Two kinds of fitness matter most: aerobic fitness, the engine, and strength, the frame.',
      'Both tend to decline with age if left alone. Both respond to training at any age. The goal is not a personal best. It is being able to carry the shopping, climb the hill and get up off the floor with ease for decades to come.',
      'A sensible week mixes steady aerobic work you can hold a conversation through, some harder efforts, and two or more strength sessions that work the major muscle groups.',
      'Bloods add another layer. Iron, thyroid, metabolic and hormone markers can all affect energy and recovery. If training feels harder than it should, it may be worth measuring rather than pushing through.',
      'If you have a heart condition, a recent injury or another health concern, talk to your doctor before you change your training.',
    ],
  },
  {
    slug: 'desk-days-and-metabolic-health',
    tag: 'Longevity',
    title: 'Desk days and metabolic health.',
    dek: 'Long hours sitting show up in more places than your back.',
    img: { src: '/photos/woman-laptop-1400.webp', srcSet: '/photos/woman-laptop-800.webp 800w, /photos/woman-laptop-1400.webp 1400w', alt: 'A woman in her forties working on a laptop at a marble kitchen bench', pos: '50% 22%' },
    minutes: 2,
    on: ['longevity'],
    body: [
      'Many of us sit for most of the working day, then sit again at night. Long unbroken sitting is linked with poorer metabolic health, even in people who exercise.',
      'The fix is less dramatic than it sounds. Stand or walk for a few minutes every half hour. Take calls on your feet. Walk after meals when you can.',
      'Metabolic health shows up in your bloods. Fasting glucose, HbA1c and your lipid profile give a picture of how your body handles energy, long before anything feels wrong.',
      'Measuring them gives you a starting point, and repeat tests show whether small changes in your day are adding up.',
      'Your doctor will read these markers with your history, your family history and your goals.',
    ],
  },
  {
    slug: 'power-fades-first',
    tag: 'Longevity',
    title: 'Power fades first.',
    dek: 'Why a little speed work is worth keeping as you get older.',
    img: { src: '/photos/woman-sprint-night.webp', srcSet: '/photos/woman-sprint-night-800.webp 800w, /photos/woman-sprint-night.webp 880w', alt: 'A woman sprinting on a track at night', pos: '50% 35%' },
    minutes: 2,
    on: ['longevity'],
    body: [
      'Strength is how much force you can produce. Power is how quickly you can produce it. Research suggests power tends to decline earlier and faster than strength as we age.',
      'Power is what catches you when you trip, gets you up the stairs two at a time, and lets you move quickly when you need to.',
      'Keeping it does not mean racing. Short, controlled efforts help: a few brisk hill repeats, step-ups done with intent, or lifting a moderate weight with speed. Build up slowly, warm up well and rest fully between efforts.',
      'Recovery from fast work takes longer after forty. Sleep, food and an honest look at markers such as iron and thyroid all play a part in how well you bounce back.',
      'If you have a heart condition, joint problem or recent injury, check with your doctor before adding fast work.',
    ],
  },
  {
    slug: 'keep-a-health-log',
    tag: 'Longevity',
    title: 'Keep a simple health log.',
    dek: 'A few lines a week make every consult more useful.',
    img: { src: '/photos/man-sprint-track.webp', srcSet: '/photos/man-sprint-track-800.webp 800w, /photos/man-sprint-track.webp 880w', alt: 'A man sprinting on a running track, seen from above', pos: '78% 40%' },
    minutes: 2,
    on: ['longevity'],
    body: [
      'Your blood results are one record of your health. How you feel day to day is another, and it is easy to forget by the time you see a doctor.',
      'Keep it short. Once a week, note your sleep, your energy, your training, anything that hurt and anything that changed. A notes app is enough.',
      'Add the dates of illnesses, injuries, big stressful weeks and any new supplement. These are exactly the things that can explain an odd result.',
      'Over months, the log and your blood trend sit side by side. Patterns appear that neither shows on its own.',
      'Bring it to every consult. It helps your doctor understand you, not just your numbers.',
    ],
  },
]

export const fieldNote = (slug: string) => FIELD_NOTES.find(n => n.slug === slug)
export const notesFor = (where: 'home' | 'longevity') => FIELD_NOTES.filter(n => n.on.includes(where))
