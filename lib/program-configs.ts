import type { ProgramPageConfig } from '@/components/ProgramPageTemplate'

// ─── Shared assets ─────────────────────────────────────────────────────────────

const STEPS_IMAGES = {
  signup: '/team/team-standing.webp',
  bloodTest: '/shoot/consult.jpg',
  consult: '/team/portrait-woman-blonde.webp',
  protocol: '/shoot/lounge.jpg',
}

const STANDARD_STEPS: ProgramPageConfig['processSteps'] = [
  { title: 'Create your account', body: 'Register at app.apexmetabolichealth.com.au in under two minutes. No GP referral required.', time: '2 MIN', image: STEPS_IMAGES.signup },
  { title: 'Complete pathology testing', body: 'We issue your referral electronically. Attend any of 4,000+ accredited collection centres across Australia.', time: '45 MIN', image: STEPS_IMAGES.bloodTest },
  { title: 'Telehealth consultation', body: 'Your AHPRA-registered doctor reviews your results and builds a protocol personalised to your biology.', time: '45–60 MIN', image: STEPS_IMAGES.consult },
  { title: 'Ongoing clinical care', body: 'Protocol dispatched through our TGA-compliant pharmacy partner. 3-monthly reviews built in from day one.', time: 'ONGOING', image: STEPS_IMAGES.protocol },
]

const SHARED_FAQS: ProgramPageConfig['faqs'] = [
  {
    q: 'Do I need a GP referral to get started?',
    a: 'No. You register directly through Apex and we issue a pathology referral the same business day. No GP referral needed.',
  },
  {
    q: 'Are your doctors AHPRA-registered?',
    a: 'Yes, unconditionally. Every consultation is conducted by an AHPRA-registered medical practitioner. You can verify any of our doctors directly on the AHPRA national register.',
  },
  {
    q: 'Where do I get my blood test done?',
    a: 'At any of 4,000+ accredited pathology collection centres across Australia. We send your referral electronically, and most results come back within 24–48 hours.',
  },
  {
    q: 'How does ongoing care work?',
    a: "After your initial consultation, you'll have structured clinical reviews every 3 months: a blood panel followed by a telehealth consultation where your doctor reviews results and adjusts your protocol. It's not a set-and-forget service.",
  },
  {
    q: 'Is this legal in Australia?',
    a: 'Yes. We operate under Australian law with TGA-compliant prescribing and a registered compounding pharmacy partner operating under TGA GMP standards.',
  },
]

// ─── Hormone Optimisation ──────────────────────────────────────────────────────

export const hormoneOptimisationConfig: ProgramPageConfig = {
  slug: 'hormone-optimisation',
  name: 'Hormone Optimisation',
  category: 'Hormonal Health',

  headline: 'Hormonal health.',
  headlineAccent: 'Measured properly.',
  heroBody: 'Most GPs check one or two markers. We run a comprehensive hormonal and metabolic panel, then build a personalised, doctor-prescribed protocol around what your biology actually needs.',
  heroBullets: [
    'Comprehensive hormone & metabolic panel',
    'AHPRA-registered doctors, Australia-wide',
    'Doctor-prescribed, TGA-compliant protocols',
  ],
  heroBentoPortrait: '/shoot/hormone.jpg',
  heroBentoStat: { value: '1 in 4', label: 'men over 35 have suboptimal testosterone' },
  heroBentoLifestyle: '/team/team-sofa.webp',

  empathyHeadline: "You've been told your results look normal. But you don't feel normal.",
  empathyBody: "Standard GP panels check whether you're in a disease range, not an optimal one. Testosterone can sit in the bottom quarter of the reference range and your results will show 'normal.' We look harder.",
  empathyChips: ['Persistent fatigue', 'Poor recovery', 'Brain fog', 'Low drive', 'Body composition changes', 'Sleep disruption'],
  empathyImage: '/team/portrait-man.webp',

  evidenceHeadline: 'The clinical picture behind how you feel.',
  evidencePoints: [
    { value: '1 in 4', label: 'Men over 35 with suboptimal testosterone', detail: 'Most will receive a normal result on a standard GP blood test. Reference ranges are set for disease detection, not optimal function.' },
    { value: '4,000+', label: 'Accredited collection centres nationwide', detail: 'No matter where you are in Australia, your blood work can be collected within a short drive. Results back within 48 hours.' },
    { value: '12+', label: 'Markers in our hormone panel', detail: 'We assess the full endocrine picture: upstream signals, metabolic context, conversion pathways, and nutritional status.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Why your hormones affect more than you think.',
  mechanismBody: 'Testosterone is not a single-purpose hormone. It operates across multiple systems, and when levels are suboptimal, the effects compound across your entire physiology.',
  mechanismFeatures: [
    { title: 'Energy & mitochondrial function', body: 'Testosterone directly influences cellular energy production. Low levels correlate with persistent fatigue that sleep alone cannot resolve.' },
    { title: 'Body composition', body: 'Hormonal imbalance drives fat accumulation, particularly visceral fat, while making muscle retention progressively harder regardless of training volume.' },
    { title: 'Cognitive sharpness', body: 'Brain fog, reduced concentration, and slower recall are recognised downstream effects of suboptimal testosterone and SHBG levels.' },
    { title: 'Mood and drive', body: 'Testosterone influences dopamine receptor sensitivity. Its deficiency is associated with reduced motivation, emotional flatness, and increased irritability.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Marcus T.', date: 'March 2025', highlight: 'Having a doctor actually investigate my free testosterone properly was completely different', full: 'Having a doctor actually investigate my free testosterone properly was completely different to anything I\'d experienced with a GP. The process was thorough and they actually explained every marker.' },
    { name: 'James W.', date: 'January 2025', highlight: 'The intake was more thorough than any GP appointment I\'ve had', full: 'The intake was more thorough than any GP appointment I\'ve had. They actually read what I submitted. The consultation was well-prepared and focused.' },
    { name: 'Daniel R.', date: 'April 2025', highlight: 'Professional, efficient, and they actually explained my results', full: 'Professional, efficient, and they actually explained my results in a way that made sense. First time I understood what my blood work meant beyond "in range" or "out of range."' },
  ],

  faqs: [
    { q: 'Do I need two blood tests for testosterone?', a: 'Yes. AHPRA and TGA guidelines require two separate fasted morning blood draws (7am–11am, on different days) to confirm suboptimal testosterone before treatment can be prescribed. Both referrals are issued as part of your pathway.' },
    { q: 'Can I use recent blood tests from my GP?', a: 'Potentially. Submit them during pre-screen and we\'ll review whether they meet our clinical requirements. If they do, you may not need to retest.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Find out where you actually stand.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your suitability and contacts you directly to confirm next steps. No commitment, no upfront payment.',
  ctaImage: '/team/team-lounge.webp',
  intakeUrl: '/intake/quiz/hormone',
}

// ─── Metabolic Weight Loss ─────────────────────────────────────────────────────

export const metabolicWeightLossConfig: ProgramPageConfig = {
  slug: 'metabolic-weight-loss',
  name: 'Medical Weight Loss',
  category: 'Metabolic Health',

  headline: 'Medical weight loss.',
  headlineAccent: 'Backed by your biology.',
  heroBody: 'If diet and exercise haven\'t moved the needle, there\'s usually a clinical reason. We identify the metabolic and hormonal drivers behind stubborn weight, and treat them properly.',
  heroBullets: [
    'Comprehensive metabolic blood panel',
    'AHPRA-registered doctors, Australia-wide',
    'Personalised protocol around your biomarkers',
  ],
  heroBentoPortrait: '/shoot/hormone.jpg',
  heroBentoStat: { value: '50%+', label: 'of Australian men are overweight or obese' },
  heroBentoLifestyle: '/team/team-armchairs.webp',

  empathyHeadline: "It's not a willpower problem. It's a physiology problem.",
  empathyBody: "Carrying extra weight isn't a character failure. Metabolism, hormones, appetite signalling, insulin sensitivity: these are biological systems that can be assessed, identified, and treated. Most people who struggle with weight have at least one clinical driver that's never been investigated.",
  empathyChips: ['Stubborn belly fat', 'Appetite dysregulation', 'Energy crashes', 'Diet not working', 'Slow metabolism', 'Poor sleep'],
  empathyImage: '/team/portrait-man.webp',

  evidenceHeadline: 'The metabolic picture most GPs miss.',
  evidencePoints: [
    { value: '70%', label: 'Of men have undiagnosed insulin resistance', detail: "Insulin resistance precedes type 2 diabetes by years. It drives fat accumulation, energy crashes, and cravings that no amount of willpower overcomes." },
    { value: '13+', label: 'Markers in our metabolic panel', detail: 'Fasting glucose, HbA1c, HOMA-IR, lipids, thyroid, testosterone, liver function: the full picture that determines what\'s actually driving your weight.' },
    { value: '4,000+', label: 'Accredited collection centres nationwide', detail: 'Your blood work collected near you, when it suits. Results reviewed by your doctor before your consultation.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Effective weight management starts with the right diagnosis.',
  mechanismBody: 'Our approach identifies what\'s actually driving your weight (metabolically, hormonally, and behaviourally) before building any protocol.',
  mechanismFeatures: [
    { title: 'Appetite signalling', body: 'Hormonal imbalances affect the signals your brain receives about hunger and satiety. Clinical protocols can correct these pathways.' },
    { title: 'Insulin sensitivity', body: 'Poor insulin sensitivity makes fat storage more efficient and fat burning harder. Identified through blood testing and addressable through targeted treatment.' },
    { title: 'Metabolic rate', body: 'Thyroid function, testosterone, and cortisol all influence your resting metabolic rate. Suboptimal levels slow fat oxidation even at a calorie deficit.' },
    { title: 'Body composition', body: 'True medical weight management prioritises fat loss while protecting muscle. We track composition markers, not just weight on a scale.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Tom B.', date: 'February 2025', highlight: 'First time a doctor approached this from a metabolic angle', full: 'First time a doctor approached this from a metabolic angle rather than just telling me to eat less and move more. The consultation was thorough and actually explained what was happening with my insulin.' },
    { name: 'Chris H.', date: 'March 2025', highlight: 'My doctor identified specific patterns in my bloodwork I\'d never had explained before', full: 'My doctor identified specific patterns in my bloodwork I\'d never had explained before. The intake process was detailed and the consultation felt prepared. They\'d actually reviewed what I submitted.' },
    { name: 'Sam K.', date: 'April 2025', highlight: 'Completely online and straightforward', full: 'Completely online and straightforward. The doctor was professional and the process from intake to consultation was well-organised. Exactly what I needed.' },
  ],

  faqs: [
    { q: 'Will you just prescribe weight loss injections?', a: 'No. Treatment is only prescribed where clinically appropriate based on your blood results, medical history, and clinical assessment. We don\'t name or discuss specific medications on this website in compliance with TGA guidelines.' },
    { q: 'What if I\'ve tried everything before?', a: 'That\'s exactly who this program is designed for. Most people who haven\'t responded to lifestyle changes have at least one unidentified metabolic or hormonal driver. We investigate those properly.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Find out what\'s actually driving your weight.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your metabolic history and contacts you directly to confirm clinical suitability and next steps.',
  ctaImage: '/team/team-standing.webp',
  intakeUrl: '/intake/quiz/weightloss',
}

// ─── Performance Plus ──────────────────────────────────────────────────────────

export const performancePlusConfig: ProgramPageConfig = {
  slug: 'performance-plus',
  name: 'Performance Optimisation',
  category: 'Performance & Recovery',

  headline: 'Peak performance.',
  headlineAccent: 'Built on your biology.',
  heroBody: 'Training harder isn\'t always the answer. If your recovery, strength response, and energy aren\'t matching your effort, the cause is often measurable, and treatable.',
  heroBullets: [
    'Comprehensive performance blood panel',
    'AHPRA-registered sports medicine approach',
    'Doctor-prescribed recovery and performance protocols',
  ],
  heroBentoPortrait: '/shoot/hormone.jpg',
  heroBentoStat: { value: '40%', label: 'performance drop from suboptimal testosterone in trained men' },
  heroBentoLifestyle: '/shoot/recovery.jpg',

  empathyHeadline: "Training consistently. Recovery not matching your effort.",
  empathyBody: "If your strength plateaus won't shift, recovery is slower than it used to be, and your training sessions feel harder than they should, the problem is rarely technique. Hormonal, metabolic, and nutritional markers often hold the answer.",
  empathyChips: ['Strength plateau', 'Slow recovery', 'Training fatigue', 'Poor sleep quality', 'Low drive', 'Muscle loss'],
  empathyImage: '/shoot/recovery.jpg',

  evidenceHeadline: 'What your training data doesn\'t tell you.',
  evidencePoints: [
    { value: '3×', label: 'Faster recovery with optimised hormonal levels', detail: 'Testosterone, growth factors, and recovery markers all influence how efficiently your body repairs and adapts after training.' },
    { value: '12+', label: 'Performance-specific markers tested', detail: 'Full hormonal panel, inflammatory markers, nutritional status, thyroid: everything that determines how your body responds to training stress.' },
    { value: '100%', label: 'Online, no clinic visits for consultations', detail: 'Your consultation with an AHPRA-registered doctor conducted entirely via telehealth. Blood tests at your nearest collection centre.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Optimise the systems that drive performance.',
  mechanismBody: 'Performance is the output of multiple biological systems working together. We assess all of them.',
  mechanismFeatures: [
    { title: 'Hormonal optimisation', body: 'Testosterone, IGF-1, and cortisol ratios directly determine your body\'s capacity to build, recover, and adapt.' },
    { title: 'Recovery enhancement', body: 'Clinical protocols target the biological pathways that govern muscle protein synthesis, inflammation resolution, and tissue repair.' },
    { title: 'Energy system support', body: 'Mitochondrial efficiency, nutrient partitioning, and metabolic rate all influence sustainable training performance and output quality.' },
    { title: 'Nutritional biomarkers', body: 'Deficiencies in key micronutrients (B12, D, ferritin, zinc) significantly impair performance even when everything else is dialled in.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Luke M.', date: 'February 2025', highlight: 'First time my blood work was looked at through a performance lens', full: 'First time my blood work was looked at through a performance lens rather than just checking I wasn\'t sick. The doctor understood what I was trying to achieve and the protocol reflected that.' },
    { name: 'Alex C.', date: 'March 2025', highlight: 'The consultation was thorough and actually relevant to training', full: 'The consultation was thorough and actually relevant to training. They reviewed my intake properly and the session was focused on what I needed, not generic advice.' },
    { name: 'Jordan P.', date: 'April 2025', highlight: 'Professional from start to finish', full: 'Professional from start to finish. The process is well-designed: intake, bloods, consultation in a logical sequence. And the doctor actually knew their stuff about performance physiology.' },
  ],

  faqs: [
    { q: 'Is this program for elite athletes only?', a: 'No. The program is designed for anyone who trains consistently and feels their performance or recovery isn\'t matching their effort. You don\'t need to be competitive to benefit from understanding your biology.' },
    { q: 'What makes this different from a GP sports medicine consult?', a: 'We run a far more comprehensive panel, our doctors review results against optimal ranges rather than disease ranges, and our protocols are built around your individual markers, not general athletic guidelines.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start training with a full biological picture.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your performance history and contacts you to confirm suitability and next steps.',
  ctaImage: '/team/team-standing.webp',
  intakeUrl: '/intake/quiz/performance',
}

// ─── Hair Restoration ──────────────────────────────────────────────────────────

export const hairRestorationConfig: ProgramPageConfig = {
  slug: 'hair-restoration',
  name: 'Hair Restoration',
  category: 'Hair & Scalp Health',

  headline: 'Hair restoration.',
  headlineAccent: 'Doctor-led.',
  heroBody: 'Hair loss driven by DHT and hormonal factors responds to clinical treatment. We identify the cause through blood work, then build a protocol your doctor designs around your specific biology.',
  heroBullets: [
    'Hormonal and DHT-focused blood panel',
    'AHPRA-registered doctors',
    'Clinically assessed, personalised protocols',
  ],
  heroBentoPortrait: '/team/hair-editorial.webp',
  heroBentoStat: { value: '50%', label: 'of men experience significant hair loss by age 50' },
  heroBentoLifestyle: '/team/team-lounge.webp',

  empathyHeadline: 'Hair loss is a clinical issue. Not an aesthetic one.',
  empathyBody: "DHT-driven hair loss is a recognised medical condition with identifiable causes and evidence-based treatments. Over-the-counter products don't target the underlying biology. A clinical approach does.",
  empathyChips: ['Receding hairline', 'Thinning at crown', 'Rapid progression', 'Family history', 'DHT sensitivity', 'Scalp changes'],
  empathyImage: '/team/portrait-man.webp',

  evidenceHeadline: 'Understanding what drives hair loss.',
  evidencePoints: [
    { value: '95%', label: 'Of male hair loss is androgenetic in origin', detail: 'Driven by DHT (dihydrotestosterone) interacting with genetically sensitive follicles. The mechanism is well-understood and treatable through clinical protocols.' },
    { value: '6–12', label: 'Months for measurable follicle response', detail: 'Clinical hair loss treatment requires consistency. Early intervention typically produces better outcomes. The sooner the clinical driver is addressed, the more follicles remain viable.' },
    { value: '4,000+', label: 'Accredited collection centres for your blood work', detail: 'We assess your hormonal profile before any protocol is built. Testosterone, DHT, thyroid, and nutrient markers all inform the approach.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. No GP referral required.', time: '2 MIN', image: STEPS_IMAGES.signup },
    { title: 'Complete pathology testing', body: 'Hormonal and DHT-focused blood panel at your nearest collection centre. Results within 48 hours.', time: '30 MIN', image: STEPS_IMAGES.bloodTest },
    { title: 'Doctor consultation', body: 'Your AHPRA-registered doctor reviews your panel and builds a protocol specifically around your hormonal profile.', time: '45 MIN', image: STEPS_IMAGES.consult },
    { title: 'Protocol dispatched', body: 'Your treatment coordinated through our TGA-compliant pharmacy partner. Clinical reviews every 3–6 months.', time: 'ONGOING', image: STEPS_IMAGES.protocol },
  ],

  mechanismHeadline: 'Why clinical hair loss treatment is different.',
  mechanismBody: 'Topical products address the surface. Clinical protocols address the biological driver.',
  mechanismFeatures: [
    { title: 'DHT pathway intervention', body: 'Androgenetic alopecia is driven by DHT binding to follicle receptors. Clinical protocols can interrupt this pathway at a systemic level.' },
    { title: 'Scalp microcirculation', body: 'Follicle health depends on adequate blood flow and nutrient delivery to the scalp. This is addressable through clinical means.' },
    { title: 'Hormonal context', body: 'Testosterone, thyroid, iron, and other hormonal factors influence hair cycle length and follicle viability. All assessed in your blood panel.' },
    { title: 'Growth factor signalling', body: 'Clinical protocols can support the molecular signals that determine whether follicles remain in the growth phase of the hair cycle.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Ben A.', date: 'January 2025', highlight: 'Finally approached with a blood test rather than just product recommendations', full: 'Finally approached with a blood test rather than just product recommendations. The doctor actually looked at my DHT and hormonal profile before suggesting anything. That alone was different.' },
    { name: 'Matt S.', date: 'March 2025', highlight: 'The process felt clinical and legitimate', full: 'The process felt clinical and legitimate. The consultation was thorough and the doctor explained the connection between my hormonal markers and what was happening with my hair.' },
    { name: 'Ryan C.', date: 'February 2025', highlight: 'Professional and actually knowledgeable', full: 'Professional and actually knowledgeable. Unlike the various online platforms I\'d tried before, the consultation involved a real doctor who understood the clinical side of hair loss.' },
  ],

  faqs: [
    { q: 'Does this work for all types of hair loss?', a: 'Our program addresses androgenetic alopecia (male pattern hair loss), which represents the vast majority of male hair loss. Other causes (alopecia areata, telogen effluvium) are assessed during consultation and may be referred to a dermatologist where appropriate.' },
    { q: 'When might I start to see a response?', a: 'Clinical hair loss protocols typically require 3–6 months before any measurable changes in follicle activity are observed. The earlier treatment begins, the more follicles remain viable for response. Individual clinical outcomes vary.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start with a proper clinical assessment.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your hormonal profile and contacts you to confirm suitability for the Hair Restoration program.',
  ctaImage: '/team/team-armchairs.webp',
  intakeUrl: '/intake/quiz/hair',
}

// ─── Injury Repair ─────────────────────────────────────────────────────────────

export const injuryRepairConfig: ProgramPageConfig = {
  slug: 'injury-repair',
  name: 'Injury Repair & Recovery',
  category: 'Recovery & Rehabilitation',

  headline: 'Faster recovery.',
  headlineAccent: 'Clinically supported.',
  heroBody: 'Soft tissue injuries, chronic tendon issues, and slow post-surgical recovery often have biological drivers that standard rehabilitation alone cannot address. We assess and treat those drivers.',
  heroBullets: [
    'Comprehensive recovery & inflammatory panel',
    'AHPRA-registered doctors',
    'Evidence-based recovery protocols',
  ],
  heroBentoPortrait: '/shoot/recovery.jpg',
  heroBentoStat: { value: '60%', label: 'of soft tissue injuries are sub-optimally managed' },
  heroBentoLifestyle: '/team/team-armchairs.webp',

  empathyHeadline: "Still not right months after the injury.",
  empathyBody: "Slow healing, persistent inflammation, and incomplete recovery are frequently signs of underlying biological factors, not just the nature of the injury. Nutritional deficiencies, hormonal status, and inflammatory load all influence the speed and completeness of tissue repair.",
  empathyChips: ['Chronic tendon pain', 'Slow healing', 'Persistent inflammation', 'Joint stiffness', 'Post-surgical recovery', 'Recurring injury'],
  empathyImage: '/shoot/hormone.jpg',

  evidenceHeadline: 'The biology of recovery most clinics don\'t assess.',
  evidencePoints: [
    { value: '3×', label: 'Slower healing with vitamin D deficiency', detail: 'Vitamin D plays a critical role in collagen synthesis and inflammatory regulation. Deficiency, common in Australian men despite the climate, significantly impairs soft tissue repair.' },
    { value: '12+', label: 'Recovery markers in our assessment panel', detail: 'Inflammatory markers, hormonal status, nutritional deficiencies, and metabolic factors that collectively determine your body\'s repair capacity.' },
    { value: '4,000+', label: 'Accredited collection centres nationwide', detail: 'Your blood panel collected near you, results reviewed by your doctor before your consultation.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Why clinical recovery protocols work.',
  mechanismBody: 'The body\'s repair capacity is not fixed. It\'s determined by biological conditions that can be assessed, optimised, and supported.',
  mechanismFeatures: [
    { title: 'Tissue repair signalling', body: 'Growth factors and peptide signalling pathways govern the rate and quality of soft tissue repair. Clinical protocols can modulate these pathways.' },
    { title: 'Inflammatory regulation', body: 'Chronic low-grade inflammation impedes healing and perpetuates pain. Identifying and addressing the inflammatory driver is often the missing step.' },
    { title: 'Nutritional support', body: 'Collagen synthesis requires specific nutrients: vitamin C, zinc, glycine, proline. Deficiencies directly slow healing timelines.' },
    { title: 'Hormonal environment', body: 'Testosterone and growth hormone are anabolic hormones that influence protein synthesis and tissue regeneration. Suboptimal levels impair recovery.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Dave N.', date: 'February 2025', highlight: 'First time someone looked at the biological side of why I wasn\'t healing properly', full: 'First time someone looked at the biological side of why I wasn\'t healing properly. The doctor was thorough, understood injury physiology, and the consultation was properly focused.' },
    { name: 'Andrew K.', date: 'March 2025', highlight: 'The process was well-organised and actually clinical', full: 'The process was well-organised and actually clinical. The blood panel was comprehensive and the consultation was clearly informed by what the results showed.' },
    { name: 'Pete M.', date: 'April 2025', highlight: 'Felt like a proper medical consultation, not a supplement recommendation', full: 'Felt like a proper medical consultation, not a supplement recommendation. The doctor actually looked at my inflammatory markers and explained what they meant for recovery.' },
  ],

  faqs: [
    { q: 'Is this a replacement for physiotherapy?', a: 'No. Our program addresses the biological environment in which your injury is healing. It works alongside, not instead of, appropriate physiotherapy and rehabilitation.' },
    { q: 'What types of injuries does this program help with?', a: 'The program is most applicable to soft tissue injuries (tendon, ligament, muscle), post-surgical recovery, and chronic joint conditions with an inflammatory component. Your doctor will assess clinical suitability during consultation.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Understand what\'s slowing your recovery.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your injury history and recovery timeline, and contacts you to confirm suitability.',
  ctaImage: '/team/team-lounge.webp',
  intakeUrl: '/intake/quiz/injury',
}

// ─── Longevity ─────────────────────────────────────────────────────────────────

export const longevityConfig: ProgramPageConfig = {
  slug: 'longevity',
  name: 'Anti-Ageing & Longevity',
  category: 'Longevity & Healthspan',

  headline: 'Live longer.',
  headlineAccent: 'Perform better for longer.',
  heroBody: 'Longevity medicine is not about defying ageing. It\'s about understanding the biological processes that drive it and intervening where the evidence supports doing so.',
  heroBullets: [
    'Comprehensive longevity & metabolic panel',
    'AHPRA-registered doctors',
    'Evidence-based healthspan protocols',
  ],
  heroBentoPortrait: '/team/portrait-man.webp',
  heroBentoStat: { value: '20+', label: 'years between healthspan and lifespan in most men' },
  heroBentoLifestyle: '/team/team-sofa.webp',

  empathyHeadline: "Most people reach their 50s having never optimised their baseline.",
  empathyBody: "The gap between how long you live and how well you live is not inevitable. It\'s the product of biological processes that begin decades earlier, and that are measurable, addressable, and modifiable with the right clinical approach.",
  empathyChips: ['Declining energy', 'Slower recovery', 'Cognitive decline', 'Metabolic drift', 'Hormonal change', 'Inflammatory load'],
  empathyImage: '/team/team-lounge.webp',

  evidenceHeadline: 'The biology of healthspan.',
  evidencePoints: [
    { value: '20yr', label: 'Average gap between healthspan and lifespan', detail: 'Most men spend the last two decades of their lives in chronic ill-health. Longevity medicine aims to compress that period: not just extend life, but extend quality life.' },
    { value: '15+', label: 'Longevity markers in our comprehensive panel', detail: 'Biological age markers, metabolic function, hormonal status, inflammatory load, micronutrient deficiencies, and cardiovascular risk, all assessed together.' },
    { value: '100%', label: 'Online clinical care, Australia-wide', detail: 'Your longevity consultation conducted entirely via telehealth with an AHPRA-registered doctor who specialises in metabolic and preventive medicine.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'The hallmarks of ageing that medicine can address.',
  mechanismBody: 'Modern longevity science has identified the biological processes that drive cellular ageing. Several of these are now clinically addressable.',
  mechanismFeatures: [
    { title: 'Hormonal decline', body: 'Testosterone, DHEA, and growth hormone decline predictably with age. Suboptimal levels accelerate metabolic ageing and reduce vitality years before symptoms appear.' },
    { title: 'Chronic inflammation', body: '"Inflammaging", chronic low-grade inflammation, is now understood as a primary driver of age-related disease. Blood markers can identify it years before clinical presentation.' },
    { title: 'Metabolic function', body: 'Insulin sensitivity, glucose metabolism, and lipid handling all deteriorate with age. Each is measurable and, where appropriate, clinically modifiable.' },
    { title: 'Cellular repair capacity', body: 'DNA repair, mitochondrial function, and autophagic processes decline with age. Clinical interventions can support these pathways.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Richard H.', date: 'January 2025', highlight: 'The most comprehensive clinical review I\'ve ever had', full: 'The most comprehensive clinical review I\'ve ever had. The doctor approached it as optimisation rather than disease detection, which is exactly what I was looking for.' },
    { name: 'Paul M.', date: 'March 2025', highlight: 'Finally someone who looks at biomarkers from a performance standpoint', full: 'Finally someone who looks at biomarkers from a performance standpoint. The consultation was thorough, evidence-based, and the doctor actually understood the longevity literature.' },
    { name: 'Steven L.', date: 'February 2025', highlight: 'Professional and genuinely different to any GP experience', full: 'Professional and genuinely different to any GP experience I\'ve had. The depth of the blood panel alone was worth it. I finally have a proper baseline picture.' },
  ],

  faqs: [
    { q: 'Is longevity medicine evidence-based?', a: 'Yes. Our approach is grounded in peer-reviewed research and uses established clinical markers. We don\'t offer unproven interventions. Where the evidence is emerging, we say so.' },
    { q: 'How is this different from a standard health check?', a: 'A standard health check screens for disease. Our longevity assessment establishes your optimal baseline, identifies biological ageing processes already underway, and builds a protocol to address modifiable factors before disease develops.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start with a proper biological baseline.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your health history and contacts you to confirm suitability for the Longevity program.',
  ctaImage: '/team/team-armchairs.webp',
  intakeUrl: '/intake/quiz/antiageing',
}

// ─── Pathology ─────────────────────────────────────────────────────────────────

export const pathologyConfig: ProgramPageConfig = {
  slug: 'pathology',
  name: 'Comprehensive Blood Panel',
  category: 'Diagnostic Pathology',

  headline: 'Know your numbers.',
  headlineAccent: 'All of them.',
  heroBody: 'A comprehensive blood panel that goes far beyond what a GP typically orders. Doctor-issued, doctor-reviewed, doctor-explained, across 30+ markers that actually tell you where you stand.',
  heroBullets: [
    '30+ clinically relevant blood markers',
    'AHPRA-registered doctor review',
    'Results explained in context, not just in range',
  ],
  heroBentoPortrait: '/shoot/consult.jpg',
  heroBentoStat: { value: '30+', label: 'markers across hormones, metabolism, and health' },
  heroBentoLifestyle: '/shoot/lounge.jpg',

  empathyHeadline: "Your GP checks if you\'re sick. We check how well you\'re functioning.",
  empathyBody: "Standard GP blood panels are designed for disease detection. They tell you if something has gone wrong. Our comprehensive panel tells you how well your systems are actually performing, and identifies what\'s suboptimal before it becomes a problem.",
  empathyChips: ['No symptoms?', 'Annual health check', 'Optimise your baseline', 'Track your markers', 'Get ahead of problems', 'Understand your body'],
  empathyImage: '/team/portrait-woman.webp',

  evidenceHeadline: 'What a real blood panel looks like.',
  evidencePoints: [
    { value: '30+', label: 'Markers across hormones, metabolism, and health', detail: 'Hormone panel, thyroid, metabolic markers, cardiovascular risk, inflammatory markers, nutritional status, liver and kidney function: the complete picture.' },
    { value: '48h', label: 'Results turnaround from pathology collection', detail: 'Results reviewed and explained by your AHPRA-registered doctor in a follow-up consultation. Not just a PDF of numbers.' },
    { value: '4,000+', label: 'Collection centres across Australia', detail: 'Your referral issued electronically. No appointment needed at most collection centres.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. Your doctor referral issued the same business day.', time: '2 MIN', image: STEPS_IMAGES.signup },
    { title: 'Collect your bloods', body: 'Attend any accredited collection centre near you. Most tests require a fasted morning sample.', time: '30 MIN', image: STEPS_IMAGES.bloodTest },
    { title: 'Doctor review', body: 'Your AHPRA-registered doctor reviews every marker in the context of your health history and goals, not just against reference ranges.', time: '45 MIN', image: STEPS_IMAGES.consult },
    { title: 'Your results explained', body: 'Full interpretation of your results with specific recommendations. Follow-up pathway if any markers require clinical attention.', time: 'SAME DAY', image: STEPS_IMAGES.protocol },
  ],

  mechanismHeadline: 'What your blood work actually tells you.',
  mechanismBody: 'Blood markers are not just disease indicators. They\'re a window into how your systems are performing right now.',
  mechanismFeatures: [
    { title: 'Hormonal status', body: 'Testosterone, DHEA, thyroid hormones, cortisol: all influence energy, cognition, body composition, and recovery. All included.' },
    { title: 'Metabolic function', body: 'Fasting glucose, HbA1c, insulin resistance index, lipid panel: identifies metabolic issues years before clinical symptoms appear.' },
    { title: 'Inflammatory load', body: 'hsCRP and inflammatory markers detect chronic low-grade inflammation, a driver of disease that often goes unmeasured for years.' },
    { title: 'Nutritional status', body: 'Vitamin D, B12, iron studies, zinc: deficiencies that significantly affect how you feel, recover, and perform.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Michael T.', date: 'February 2025', highlight: 'First time my results were actually explained to me in full', full: 'First time my results were actually explained to me in full. Not just "looks fine", but a proper review of each marker in context. Worth it for that alone.' },
    { name: 'Jason B.', date: 'March 2025', highlight: 'The scope of the panel surprised me', full: 'The scope of the panel surprised me. I\'ve never had that many markers tested at once. The doctor consultation to interpret them was well-prepared and informative.' },
    { name: 'Craig N.', date: 'April 2025', highlight: 'Exactly what I\'d been looking for', full: 'Exactly what I\'d been looking for: a comprehensive blood test with an actual doctor explaining what it means. The process was smooth from start to finish.' },
  ],

  faqs: [
    { q: 'Do I need to be fasting for the blood test?', a: 'Most markers in our comprehensive panel require a fasted sample, typically 10–12 hours without food or drinks other than water. Your collection centre will confirm this when you attend.' },
    { q: 'What if my results identify something that needs treatment?', a: 'If your panel identifies suboptimal markers that warrant clinical attention, your doctor will discuss treatment options appropriate to your specific results. This may include referral to one of our clinical programs.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Get a proper picture of your health.',
  ctaBody: 'Create your account, receive your referral, and attend your nearest collection centre. Doctor consultation included.',
  ctaImage: '/team/team-standing.webp',
}

// ─── Sexual Health ─────────────────────────────────────────────────────────────

export const sexualHealthConfig: ProgramPageConfig = {
  slug: 'sexual-health',
  name: 'Sexual Health',
  category: 'Men\'s Sexual Health',

  headline: 'Sexual health.',
  headlineAccent: 'Private, clinical, effective.',
  heroBody: 'Sexual health concerns are medical issues, not something to manage in silence. We assess the clinical drivers (hormonal, vascular, and psychological) and treat them properly.',
  heroBullets: [
    'Completely confidential, 100% online',
    'AHPRA-registered doctors',
    'Clinical assessment before any treatment',
  ],
  heroBentoPortrait: '/shoot/sexual.jpg',
  heroBentoStat: { value: '1 in 5', label: 'men experience significant sexual health concerns' },
  heroBentoLifestyle: '/team/team-armchairs.webp',

  empathyHeadline: "Most men wait years before seeking help. You don\'t need to.",
  empathyBody: "Sexual health concerns are among the most under-reported medical issues in men. They are also among the most treatable once the clinical driver is properly identified. A complete assessment, completely online, completely private.",
  empathyChips: ['Erectile dysfunction', 'Low libido', 'Performance anxiety', 'Hormonal cause', 'Vascular factor', 'Premature ejaculation'],
  empathyImage: '/team/portrait-man.webp',

  evidenceHeadline: 'Understanding the clinical drivers.',
  evidencePoints: [
    { value: '1 in 5', label: 'Men affected by significant sexual health concerns', detail: 'Most never receive a proper clinical assessment. The majority of sexual health issues in men have an identifiable, treatable physical driver.' },
    { value: '80%', label: 'Of ED cases have a physical component', detail: 'Vascular function, testosterone levels, and neurological factors account for the majority of erectile dysfunction, not psychological causes as commonly assumed.' },
    { value: '100%', label: 'Confidential, online consultation', detail: 'Your consultation conducted entirely via telehealth. No clinic waiting rooms. No awkward conversations in person.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Sexual health is a function of multiple systems.',
  mechanismBody: 'Effective treatment requires identifying which system is the primary driver, and addressing it clinically.',
  mechanismFeatures: [
    { title: 'Hormonal drivers', body: 'Testosterone and related hormones are the primary regulators of libido and sexual function. Suboptimal levels are identified through blood testing.' },
    { title: 'Vascular function', body: 'Erectile function is primarily a vascular event. Cardiovascular risk markers and blood flow indicators are assessed as part of your panel.' },
    { title: 'Neurological factors', body: 'Nerve signalling governs arousal and sensation. Nutritional status and metabolic function both influence neurological health.' },
    { title: 'Psychological context', body: 'Performance anxiety and psychological factors can compound physical drivers. Your doctor assesses the full clinical picture before any treatment is recommended.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'S.B.', date: 'March 2025', highlight: 'Completely confidential and the doctor didn\'t make it awkward', full: 'Completely confidential and the doctor didn\'t make it awkward. They approached it like any other medical issue, which was exactly what I needed. Very professional.' },
    { name: 'T.N.', date: 'February 2025', highlight: 'First time the issue was actually investigated rather than just treated at face value', full: 'First time the issue was actually investigated rather than just treated at face value. The blood panel revealed something I wasn\'t expecting and the doctor explained it clearly.' },
    { name: 'D.W.', date: 'April 2025', highlight: 'The online process removed the barrier I\'d been putting up for years', full: 'The online process removed the barrier I\'d been putting up for years. The consultation was professional, thorough, and the doctor clearly had clinical expertise in this area.' },
  ],

  faqs: [
    { q: 'Is the consultation truly private?', a: 'Yes. Your consultation is conducted entirely via telehealth and all records are maintained with the same confidentiality obligations as any medical practice. No information is shared without your consent.' },
    { q: 'What if the cause turns out to be psychological?', a: 'Psychological factors are assessed during your consultation. Where indicated, your doctor will discuss appropriate referral pathways alongside any clinical treatment options.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'A clinical assessment. Completely private.',
  ctaBody: 'Complete the pre-screen. Confidential from start to finish. Your doctor reviews your intake and confirms suitability and next steps.',
  ctaImage: '/shoot/sexual.jpg',
  intakeUrl: '/intake/quiz/sexual',
}

// ─── Skin Regeneration ─────────────────────────────────────────────────────────

export const skinRegenerationConfig: ProgramPageConfig = {
  slug: 'skin-regeneration',
  name: 'Skin Regeneration',
  category: 'Skin Health',

  headline: 'Better skin.',
  headlineAccent: 'Clinical grade.',
  heroBody: 'Skin quality is a reflection of internal biology. We assess the hormonal, nutritional, and systemic factors driving skin ageing, then build a protocol around your actual markers.',
  heroBullets: [
    'Hormonal and nutritional skin panel',
    'AHPRA-registered doctors',
    'Clinically assessed, personalised protocols',
  ],
  heroBentoPortrait: '/shoot/skin.jpg',
  heroBentoStat: { value: '70%', label: 'of skin ageing is driven by controllable biological factors' },
  heroBentoLifestyle: '/team/portrait-woman.webp',

  empathyHeadline: "Skin ageing is not just about what you put on it.",
  empathyBody: "Collagen production, cellular turnover, hydration, and elasticity are regulated by hormones, nutrition, and systemic biology. Topical products can support, but they cannot compensate for deficiencies at the biological level.",
  empathyChips: ['Premature ageing', 'Skin laxity', 'Dullness', 'Acne in adults', 'Collagen loss', 'Uneven texture'],
  empathyImage: '/shoot/skin.jpg',

  evidenceHeadline: 'The biology behind skin quality.',
  evidencePoints: [
    { value: '1%', label: 'Collagen lost per year after age 25', detail: 'Collagen loss is hormonally driven. Testosterone, growth factors, and nutritional status all influence the rate of collagen synthesis and degradation.' },
    { value: '10+', label: 'Skin-relevant markers in our panel', detail: 'Hormonal status, vitamin D, zinc, collagen markers, and inflammatory load, all assessed before any protocol is built.' },
    { value: '100%', label: 'Doctor-led and clinically assessed', detail: 'No protocol is recommended without a proper clinical assessment and review of your blood markers. Treatment only where clinically appropriate.' },
  ],
  evidenceImage: '/shoot/consult.jpg',

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. No GP referral required.', time: '2 MIN', image: STEPS_IMAGES.signup },
    { title: 'Complete pathology testing', body: 'Hormonal and skin-relevant blood panel at your nearest collection centre. Results within 48 hours.', time: '30 MIN', image: STEPS_IMAGES.bloodTest },
    { title: 'Doctor consultation', body: 'Your doctor reviews your panel and skin health history to build a protocol addressing your specific biological drivers.', time: '45 MIN', image: STEPS_IMAGES.consult },
    { title: 'Protocol dispatched', body: 'Treatment coordinated through our TGA-compliant pharmacy partner with regular clinical reviews.', time: 'ONGOING', image: STEPS_IMAGES.protocol },
  ],

  mechanismHeadline: 'Why internal biology determines skin quality.',
  mechanismBody: 'Skin quality is a downstream output of multiple biological systems. Addressing the root causes produces more durable outcomes than surface-level treatment.',
  mechanismFeatures: [
    { title: 'Collagen synthesis', body: 'Collagen production is regulated by hormones and nutrition. Growth factors and key nutrients directly influence the rate of new collagen formation.' },
    { title: 'Cellular turnover', body: 'The rate at which skin cells renew is influenced by metabolic function, thyroid status, and growth factor signalling, all assessable through blood testing.' },
    { title: 'Inflammatory control', body: 'Chronic inflammation accelerates skin ageing and drives conditions like adult acne. Identifying and reducing inflammatory load improves skin quality from the inside out.' },
    { title: 'Hydration and barrier function', body: 'Hormonal influences on skin hydration and lipid production are significant, particularly testosterone and DHEA levels in both men and women.' },
  ],
  mechanismImage: '/shoot/focus.jpg',

  testimonials: [
    { name: 'Oliver K.', date: 'March 2025', highlight: 'First time skin health was approached as a medical question', full: 'First time skin health was approached as a medical question rather than a cosmetic one. The doctor identified nutritional deficiencies I wasn\'t aware of. Very different experience.' },
    { name: 'Nathan B.', date: 'February 2025', highlight: 'The blood panel revealed things my dermatologist never tested', full: 'The blood panel revealed things my dermatologist never tested. The consultation was thorough and the doctor connected my results to what was happening with my skin clearly.' },
    { name: 'Liam T.', date: 'April 2025', highlight: 'Professional and evidence-based', full: 'Professional and evidence-based. No promises about what would happen, just a thorough clinical assessment and a protocol that made sense based on what my blood work showed.' },
  ],

  faqs: [
    { q: 'Is this program suitable for acne in adults?', a: 'Yes. Adult acne frequently has hormonal and inflammatory drivers that a comprehensive blood panel can identify. Your doctor will assess suitability during consultation.' },
    { q: 'How is this different from seeing a dermatologist?', a: 'A dermatologist primarily addresses surface-level skin conditions. Our program investigates the internal biological factors (hormonal, nutritional, and systemic) that drive skin quality and ageing.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Skin quality starts from the inside.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your skin history and hormonal markers and contacts you to confirm clinical suitability.',
  ctaImage: '/team/portrait-woman-blonde.webp',
  intakeUrl: '/intake/quiz/skin',
}

// ─── Registry ──────────────────────────────────────────────────────────────────

export const programConfigMap: Record<string, ProgramPageConfig> = {
  'hormone-optimisation': hormoneOptimisationConfig,
  'metabolic-weight-loss': metabolicWeightLossConfig,
  'performance-plus': performancePlusConfig,
  'hair-restoration': hairRestorationConfig,
  'injury-repair': injuryRepairConfig,
  'longevity': longevityConfig,
  'pathology': pathologyConfig,
  'sexual-health': sexualHealthConfig,
  'skin-regeneration': skinRegenerationConfig,
}
