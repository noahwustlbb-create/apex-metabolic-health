import type { ProgramPageConfig } from '@/components/ProgramPageTemplate'

const STANDARD_STEPS: ProgramPageConfig['processSteps'] = [
  { title: 'Create your account', body: 'Register at app.apexmetabolichealth.com.au in under two minutes. No GP referral required.', time: '2 MIN' },
  { title: 'Complete pathology testing', body: 'We issue your referral electronically. Attend an accredited collection centre near you.', time: '45 MIN' },
  { title: 'Telehealth consultation', body: 'Your AHPRA-registered doctor reviews your results with you and, if treatment is suitable, builds a plan around them.', time: '45–60 MIN' },
  { title: 'Ongoing clinical care', body: 'Protocol dispatched through our Australian pharmacy partner. 3-monthly reviews built in from day one.', time: 'ONGOING' },
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
    a: 'At an accredited pathology collection centre near you. We send your referral electronically, and most results are back in about 48 hours.',
  },
  {
    q: 'How does ongoing care work?',
    a: "After your initial consultation, you'll have structured clinical reviews every 3 months: a blood panel followed by a telehealth consultation where your doctor reviews results and adjusts your protocol. It's not a set-and-forget service.",
  },
  {
    q: 'Is this legal in Australia?',
    a: 'Yes. Every doctor is AHPRA-registered, prescriptions follow Australian prescribing rules, and anything prescribed is dispensed by an Australian compounding pharmacy partner.',
  },
]

// ─── Hormone Optimisation ──────────────────────────────────────────────────────

export const hormoneOptimisationConfig: ProgramPageConfig = {
  slug: 'hormone-optimisation',
  name: 'Hormone Optimisation',
  category: 'Hormonal Health',

  headline: 'Hormonal health.',
  headlineAccent: 'Measured properly.',
  heroBody: 'A standard check often looks at one or two markers. We run a 23+ marker hormone and metabolic panel, then your doctor reads it with you and builds a plan around what it shows.',
  heroBullets: [
    'Comprehensive hormone & metabolic panel',
    'AHPRA-registered doctors, Australia-wide',
    'Doctor-prescribed protocols, Australian pharmacy partner',
  ],

  empathyHeadline: "You've been told your results look normal. But you don't feel normal.",
  empathyBody: "Standard panels check whether you sit inside a reference range. A hormone marker can sit near the bottom of that range and still read 'normal'. Your doctor looks at the whole picture, not one line.",
  empathyChips: ['Persistent fatigue', 'Poor recovery', 'Brain fog', 'Low drive', 'Body composition changes', 'Sleep disruption'],

  evidenceHeadline: 'The clinical picture behind how you feel.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Hormone markers, thyroid, metabolic, heart, liver, kidney and nutrient markers, read together rather than one at a time.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Collected at an accredited collection centre near you. Your results land in your portal before your consultation.' },
    { value: '3 mo', label: 'Reviews about every three months', detail: 'A repeat panel and a telehealth review with your doctor, so any plan is checked against your numbers over time.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Why your hormones affect more than you think.',
  mechanismBody: 'Hormones are not single-purpose. They work across several systems at once, which is why your doctor reads your hormone markers alongside your metabolic, thyroid and nutrient results.',
  mechanismFeatures: [
    { title: 'Energy & mitochondrial function', body: 'Hormone markers sit alongside thyroid, iron and B12 in how your body makes and uses energy. Persistent fatigue is a reason to test all of them.' },
    { title: 'Body composition', body: 'Hormone and metabolic markers are linked to where the body stores fat and how it holds muscle. Your panel shows where yours sit today.' },
    { title: 'Cognitive sharpness', body: 'Brain fog and poor concentration have many possible causes, including hormone, thyroid and nutrient markers. Testing helps your doctor narrow them down.' },
    { title: 'Mood and drive', body: 'Low drive, flat mood and irritability can have a hormonal component. Your doctor reviews your markers and history together before suggesting anything.' },
  ],

  testimonials: [
    { name: 'Marcus T.', date: 'March 2025', highlight: 'Having a doctor actually investigate my free testosterone properly was completely different', full: 'Having a doctor actually investigate my free testosterone properly was completely different to anything I\'d experienced with a GP. The process was thorough and they actually explained every marker.' },
    { name: 'James W.', date: 'January 2025', highlight: 'The intake was more thorough than any GP appointment I\'ve had', full: 'The intake was more thorough than any GP appointment I\'ve had. They actually read what I submitted. The consultation was well-prepared and focused.' },
    { name: 'Daniel R.', date: 'April 2025', highlight: 'Professional, efficient, and they actually explained my results', full: 'Professional, efficient, and they actually explained my results in a way that made sense. First time I understood what my blood work meant beyond "in range" or "out of range."' },
  ],

  faqs: [
    { q: 'Why might I need two blood tests?', a: 'For some hormone markers, clinical guidelines call for two separate fasted morning blood draws (7am to 11am, on different days) before treatment can be considered. Where that applies, both referrals are issued as part of your pathway.' },
    { q: 'Can I use recent blood tests from my GP?', a: 'Potentially. Submit them during pre-screen and we\'ll review whether they meet our clinical requirements. If they do, you may not need to retest.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Find out where you actually stand.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your suitability and contacts you directly to confirm next steps. No commitment, no upfront payment.',
  intakeUrl: '/signup',
}

// ─── Metabolic Weight Loss ─────────────────────────────────────────────────────

export const metabolicWeightLossConfig: ProgramPageConfig = {
  slug: 'metabolic-weight-loss',
  name: 'Medical Weight Loss',
  category: 'Metabolic Health',

  headline: 'Medical weight loss.',
  headlineAccent: 'Backed by your biology.',
  heroBody: 'If diet and exercise haven\'t moved the needle, there\'s usually a clinical reason. We test the metabolic and hormonal markers behind stubborn weight, and your doctor talks you through what they show.',
  heroBullets: [
    'Comprehensive metabolic blood panel',
    'AHPRA-registered doctors, Australia-wide',
    'Personalised protocol around your biomarkers',
  ],

  empathyHeadline: "It's not a willpower problem. It's a physiology problem.",
  empathyBody: "Carrying extra weight isn't a character failure. Metabolism, hormones, appetite signalling, insulin sensitivity: these are biological systems that can be measured. Many people who struggle with weight have never had them tested together.",
  empathyChips: ['Stubborn belly fat', 'Appetite dysregulation', 'Energy crashes', 'Diet not working', 'Slow metabolism', 'Poor sleep'],

  evidenceHeadline: 'The metabolic picture most GPs miss.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Fasting glucose, HbA1c, lipids, thyroid, hormone markers and liver function, read together.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Collected at an accredited collection centre near you, then reviewed by your doctor before your consultation.' },
    { value: '3 mo', label: 'Reviews about every three months', detail: 'A repeat panel and a telehealth review, so any plan is checked against your numbers, not just the scale.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Weight management starts with the right tests.',
  mechanismBody: 'Our approach identifies what\'s actually driving your weight (metabolically, hormonally, and behaviourally) before building any protocol.',
  mechanismFeatures: [
    { title: 'Appetite signalling', body: 'Hunger and fullness are regulated by hormonal and metabolic signals. Your panel gives your doctor a view of the markers involved.' },
    { title: 'Insulin sensitivity', body: 'Poor insulin sensitivity makes fat storage more efficient and fat burning harder. It shows up in blood testing, which is why it is part of your panel.' },
    { title: 'Metabolic rate', body: 'Thyroid and hormone markers are linked to resting metabolic rate. If they sit outside range, your doctor will talk you through what that means.' },
    { title: 'Body composition', body: 'Weight on a scale is only one number. We track the markers that sit behind body composition, and your doctor reviews them with you.' },
  ],

  testimonials: [
    { name: 'Tom B.', date: 'February 2025', highlight: 'First time a doctor approached this from a metabolic angle', full: 'First time a doctor approached this from a metabolic angle rather than just telling me to eat less and move more. The consultation was thorough and actually explained what was happening with my insulin.' },
    { name: 'Chris H.', date: 'March 2025', highlight: 'My doctor identified specific patterns in my bloodwork I\'d never had explained before', full: 'My doctor identified specific patterns in my bloodwork I\'d never had explained before. The intake process was detailed and the consultation felt prepared. They\'d actually reviewed what I submitted.' },
    { name: 'Sam K.', date: 'April 2025', highlight: 'Completely online and straightforward', full: 'Completely online and straightforward. The doctor was professional and the process from intake to consultation was well-organised. Exactly what I needed.' },
  ],

  faqs: [
    { q: 'Will you just prescribe something for weight loss?', a: 'No. Treatment is only prescribed where clinically appropriate based on your blood results, medical history, and clinical assessment. We don\'t name or discuss specific medications on this website in compliance with TGA guidelines.' },
    { q: 'What if I\'ve tried everything before?', a: 'That\'s exactly who this program is designed for. If lifestyle changes haven\'t shifted things, your panel can show whether a metabolic or hormonal factor is worth a closer look.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Find out what\'s actually driving your weight.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your metabolic history and contacts you directly to confirm clinical suitability and next steps.',
  intakeUrl: '/signup',
}

// ─── Performance Plus ──────────────────────────────────────────────────────────

export const performancePlusConfig: ProgramPageConfig = {
  slug: 'performance-plus',
  name: 'Performance Optimisation',
  category: 'Performance & Recovery',

  headline: 'Performance, measured.',
  headlineAccent: 'Built on your biology.',
  heroBody: 'Training harder isn\'t always the answer. If your recovery, strength response, and energy aren\'t matching your effort, the cause is often measurable.',
  heroBullets: [
    'Comprehensive performance blood panel',
    'AHPRA-registered doctors',
    'A plan built around your results',
  ],

  empathyHeadline: "Training consistently. Recovery not matching your effort.",
  empathyBody: "If your strength plateaus won't shift, recovery is slower than it used to be, and your training sessions feel harder than they should, it is worth looking past technique. Hormonal, metabolic and nutritional markers are part of the picture.",
  empathyChips: ['Strength plateau', 'Slow recovery', 'Training fatigue', 'Poor sleep quality', 'Low drive', 'Muscle loss'],

  evidenceHeadline: 'What your training data doesn\'t tell you.',
  evidencePoints: [
    { value: '01', label: 'Recovery markers read with your doctor', detail: 'Hormone, inflammatory and nutrient markers are part of how your body repairs after training. Your doctor reviews them with your training history.' },
    { value: '23+', label: 'Markers in your panel', detail: 'Hormone markers, inflammatory markers, nutrient status and thyroid, tested together in one panel.' },
    { value: '100%', label: 'Online, no clinic visits for consultations', detail: 'Your consultation with an AHPRA-registered doctor conducted entirely via telehealth. Blood tests at your nearest collection centre.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'The systems behind performance.',
  mechanismBody: 'Performance is the output of multiple biological systems working together. We assess all of them.',
  mechanismFeatures: [
    { title: 'Hormone markers', body: 'Hormone markers are part of how the body builds, recovers and adapts. Your panel shows where yours sit today.' },
    { title: 'Recovery markers', body: 'We test the hormonal and inflammatory markers involved in muscle repair and recovery, so your doctor can see what may be holding you back.' },
    { title: 'Energy system support', body: 'Thyroid, iron and metabolic markers are linked to energy during training. Your doctor reads them together.' },
    { title: 'Nutritional biomarkers', body: 'Low B12, vitamin D, ferritin or zinc can sit behind fatigue in people who train. All are in your panel.' },
  ],

  testimonials: [
    { name: 'Luke M.', date: 'February 2025', highlight: 'First time my blood work was looked at through a performance lens', full: 'First time my blood work was looked at through a performance lens rather than just checking I wasn\'t sick. The doctor understood what I was trying to achieve and the protocol reflected that.' },
    { name: 'Alex C.', date: 'March 2025', highlight: 'The consultation was thorough and actually relevant to training', full: 'The consultation was thorough and actually relevant to training. They reviewed my intake properly and the session was focused on what I needed, not generic advice.' },
    { name: 'Jordan P.', date: 'April 2025', highlight: 'Professional from start to finish', full: 'Professional from start to finish. The process is well-designed: intake, bloods, consultation in a logical sequence. And the doctor actually knew their stuff about performance physiology.' },
  ],

  faqs: [
    { q: 'Is this program for elite athletes only?', a: 'No. The program is designed for anyone who trains consistently and feels their performance or recovery isn\'t matching their effort. You don\'t need to be competitive to benefit from understanding your biology.' },
    { q: 'What makes this different from a GP sports medicine consult?', a: 'We run a far more comprehensive panel, your doctor reads every result with your training history, and any plan is built around your own markers, not general guidelines.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start training with a full biological picture.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your performance history and contacts you to confirm suitability and next steps.',
  intakeUrl: '/signup',
}

// ─── Hair Restoration ──────────────────────────────────────────────────────────

export const hairRestorationConfig: ProgramPageConfig = {
  slug: 'hair-restoration',
  name: 'Hair Restoration',
  category: 'Hair & Scalp Health',

  headline: 'Hair restoration.',
  headlineAccent: 'Doctor-led.',
  heroBody: 'Hair loss often has a hormonal component. We start with blood work, then your doctor reviews the results with you and talks through options that suit you.',
  heroBullets: [
    'Hormone-focused blood panel',
    'AHPRA-registered doctors',
    'Clinically assessed, personalised protocols',
  ],

  empathyHeadline: 'Hair loss is a clinical issue. Not an aesthetic one.',
  empathyBody: "Pattern hair loss is a recognised medical condition with identifiable causes. A doctor-led assessment looks at the underlying biology, not just the scalp.",
  empathyChips: ['Receding hairline', 'Thinning at crown', 'Rapid progression', 'Family history', 'Hormonal factors', 'Scalp changes'],

  evidenceHeadline: 'Understanding what drives hair loss.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Hormone markers, thyroid, iron and nutrient markers, all reviewed before any plan is discussed.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Collected at an accredited collection centre near you, then reviewed by your doctor in your consultation.' },
    { value: '3 mo', label: 'Clinical reviews built in', detail: 'Hair changes slowly. Your doctor reviews progress with you at regular intervals rather than once.' },
  ],

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. No GP referral required.', time: '2 MIN' },
    { title: 'Complete pathology testing', body: 'Hormone-focused blood panel at a collection centre near you. Most results back in about 48 hours.', time: '30 MIN' },
    { title: 'Doctor consultation', body: 'Your AHPRA-registered doctor reviews your panel and builds a protocol specifically around your hormonal profile.', time: '45 MIN' },
    { title: 'Protocol dispatched', body: 'Your treatment coordinated through our Australian pharmacy partner. Clinical reviews every 3–6 months.', time: 'ONGOING' },
  ],

  mechanismHeadline: 'Why clinical hair loss treatment is different.',
  mechanismBody: 'Topical products work on the surface. A doctor-led assessment starts with the biology underneath.',
  mechanismFeatures: [
    { title: 'Hormonal pathway', body: 'Pattern hair loss is linked to how hair follicles respond to hormones. Your doctor assesses this with your history and blood results.' },
    { title: 'Scalp microcirculation', body: 'Follicle health depends on adequate blood flow and nutrient delivery to the scalp. Your doctor considers this as part of your assessment.' },
    { title: 'Hormonal context', body: 'Hormone markers, thyroid and iron are linked to the hair growth cycle. All are assessed in your blood panel.' },
    { title: 'Hair cycle', body: 'Hair moves through growth, rest and shedding phases. Your doctor explains where your results fit and what your options are.' },
  ],

  testimonials: [
    { name: 'Ben A.', date: 'January 2025', highlight: 'Finally approached with a blood test rather than just product recommendations', full: 'Finally approached with a blood test rather than just product recommendations. The doctor actually looked at my DHT and hormonal profile before suggesting anything. That alone was different.' },
    { name: 'Matt S.', date: 'March 2025', highlight: 'The process felt clinical and legitimate', full: 'The process felt clinical and legitimate. The consultation was thorough and the doctor explained the connection between my hormonal markers and what was happening with my hair.' },
    { name: 'Ryan C.', date: 'February 2025', highlight: 'Professional and actually knowledgeable', full: 'Professional and actually knowledgeable. Unlike the various online platforms I\'d tried before, the consultation involved a real doctor who understood the clinical side of hair loss.' },
  ],

  faqs: [
    { q: 'Does this work for all types of hair loss?', a: 'Our program addresses androgenetic alopecia (male pattern hair loss), which represents the vast majority of male hair loss. Other causes (alopecia areata, telogen effluvium) are assessed during consultation and may be referred to a dermatologist where appropriate.' },
    { q: 'When might I start to see a response?', a: 'Hair changes slowly, so any plan is reviewed over months, not weeks. Your doctor will explain what to expect for you. Individual results vary.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start with a proper clinical assessment.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your hormonal profile and contacts you to confirm suitability for the Hair Restoration program.',
  intakeUrl: '/signup',
}

// ─── Injury Repair ─────────────────────────────────────────────────────────────

export const injuryRepairConfig: ProgramPageConfig = {
  slug: 'injury-repair',
  name: 'Injury Repair & Recovery',
  category: 'Recovery & Rehabilitation',

  headline: 'Recovery, measured.',
  headlineAccent: 'Clinically supported.',
  heroBody: 'Soft tissue injuries, chronic tendon issues, and slow post-surgical recovery can have biological factors behind them. We test for those factors, alongside your rehabilitation.',
  heroBullets: [
    'Comprehensive recovery & inflammatory panel',
    'AHPRA-registered doctors',
    'A plan that works alongside your physio',
  ],

  empathyHeadline: "Still not right months after the injury.",
  empathyBody: "Slow healing, persistent inflammation, and incomplete recovery can have biological factors behind them as well as the injury itself. Nutrient status, hormone markers and inflammation are all part of how tissue repairs.",
  empathyChips: ['Chronic tendon pain', 'Slow healing', 'Persistent inflammation', 'Joint stiffness', 'Post-surgical recovery', 'Recurring injury'],

  evidenceHeadline: 'The biology of recovery most clinics don\'t assess.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Inflammatory markers, vitamin D, iron, hormone markers and metabolic markers, read together by your doctor.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Your blood panel collected at an accredited centre near you, then reviewed by your doctor before your consultation.' },
    { value: '3 mo', label: 'Reviews about every three months', detail: 'A repeat panel and a telehealth review, alongside your rehabilitation.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'What sits behind slow recovery.',
  mechanismBody: 'Repair depends on more than the injury. Several of the biological conditions involved can be measured in a blood panel.',
  mechanismFeatures: [
    { title: 'Tissue repair signalling', body: 'Hormones, inflammation and nutrient status all play a part in how soft tissue repairs. We test for them so your doctor can see what is going on.' },
    { title: 'Inflammatory regulation', body: 'Chronic low-grade inflammation impedes healing and perpetuates pain. Inflammatory markers are part of your panel.' },
    { title: 'Nutritional support', body: 'Collagen synthesis requires specific nutrients: vitamin C, zinc, glycine, proline. Your panel checks the nutrient markers involved.' },
    { title: 'Hormonal environment', body: 'Hormone markers are linked to how the body builds and repairs tissue. Your doctor reviews them with the rest of your results.' },
  ],

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
  intakeUrl: '/signup',
}

// ─── Longevity ─────────────────────────────────────────────────────────────────

export const longevityConfig: ProgramPageConfig = {
  slug: 'longevity',
  name: 'Anti-Ageing & Longevity',
  category: 'Longevity & Healthspan',

  headline: 'Longevity, measured.',
  headlineAccent: 'Read with your doctor.',
  heroBody: 'Longevity medicine is not about defying ageing. It\'s about understanding the biological processes that drive it and acting where the evidence supports it.',
  heroBullets: [
    'Comprehensive longevity & metabolic panel',
    'AHPRA-registered doctors',
    'A plan reviewed over time',
  ],

  empathyHeadline: "Most people reach their 50s having never measured their baseline.",
  empathyBody: "The gap between how long you live and how well you live is not inevitable. It\'s the product of biological processes that begin decades earlier, and many of which can be measured.",
  empathyChips: ['Declining energy', 'Slower recovery', 'Cognitive decline', 'Metabolic drift', 'Hormonal change', 'Inflammatory load'],

  evidenceHeadline: 'The biology of healthspan.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Metabolic, heart, inflammatory, hormone and nutrient markers, assessed together to give you a baseline.' },
    { value: '3 mo', label: 'Reviews about every three months', detail: 'A repeat panel and a telehealth review, so changes are tracked against your own baseline over time.' },
    { value: '100%', label: 'Online clinical care, Australia-wide', detail: 'Your longevity consultation conducted entirely via telehealth with an AHPRA-registered doctor who specialises in metabolic and preventive medicine.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'The hallmarks of ageing that medicine can address.',
  mechanismBody: 'Modern longevity science has identified the biological processes that drive cellular ageing. Several of these are now clinically addressable.',
  mechanismFeatures: [
    { title: 'Hormonal decline', body: 'Several hormone markers change with age. Testing shows where yours sit today, so changes can be tracked over time.' },
    { title: 'Chronic inflammation', body: '"Inflammaging", chronic low-grade inflammation, is now understood as a primary driver of age-related disease. Blood markers can identify it years before clinical presentation.' },
    { title: 'Metabolic function', body: 'Insulin sensitivity, glucose metabolism, and lipid handling all deteriorate with age. Each is measurable in a blood panel.' },
    { title: 'Nutrient status', body: 'Vitamin D, B12, iron and other nutrient markers are part of your baseline and are rechecked at each review.' },
  ],

  testimonials: [
    { name: 'Richard H.', date: 'January 2025', highlight: 'The most comprehensive clinical review I\'ve ever had', full: 'The most comprehensive clinical review I\'ve ever had. The doctor approached it as optimisation rather than disease detection, which is exactly what I was looking for.' },
    { name: 'Paul M.', date: 'March 2025', highlight: 'Finally someone who looks at biomarkers from a performance standpoint', full: 'Finally someone who looks at biomarkers from a performance standpoint. The consultation was thorough, evidence-based, and the doctor actually understood the longevity literature.' },
    { name: 'Steven L.', date: 'February 2025', highlight: 'Professional and genuinely different to any GP experience', full: 'Professional and genuinely different to any GP experience I\'ve had. The depth of the blood panel alone was worth it. I finally have a proper baseline picture.' },
  ],

  faqs: [
    { q: 'Is longevity medicine evidence-based?', a: 'Yes. Our approach is grounded in peer-reviewed research and uses established clinical markers. We don\'t offer unproven interventions. Where the evidence is emerging, we say so.' },
    { q: 'How is this different from a standard health check?', a: 'A standard health check screens for disease. Our longevity assessment sets your baseline across 23+ markers, and your doctor reviews it with you and tracks it over time.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Start with a proper biological baseline.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your health history and contacts you to confirm suitability for the Longevity program.',
  intakeUrl: '/signup',
}

// ─── Pathology ─────────────────────────────────────────────────────────────────

export const pathologyConfig: ProgramPageConfig = {
  slug: 'pathology',
  name: 'Comprehensive Blood Panel',
  category: 'Diagnostic Pathology',

  headline: 'Know your numbers.',
  headlineAccent: 'All of them.',
  heroBody: 'A comprehensive blood panel that goes far beyond what a GP typically orders. Doctor-issued, doctor-reviewed, doctor-explained, across 23+ markers that actually tell you where you stand.',
  heroBullets: [
    '23+ clinically relevant blood markers',
    'AHPRA-registered doctor review',
    'Results explained in context, not just in range',
  ],

  empathyHeadline: "Your GP checks if you\'re sick. We check how well you\'re functioning.",
  empathyBody: "Standard GP blood panels are designed for disease detection. They tell you if something has gone wrong. Our comprehensive panel tells you how well your systems are actually performing, and shows what is worth a closer look.",
  empathyChips: ['No symptoms?', 'Annual health check', 'Know your baseline', 'Track your markers', 'Get ahead of problems', 'Understand your body'],

  evidenceHeadline: 'What a real blood panel looks like.',
  evidencePoints: [
    { value: '23+', label: 'Markers across hormones, metabolism, and health', detail: 'Hormone panel, thyroid, metabolic markers, cardiovascular risk, inflammatory markers, nutritional status, liver and kidney function: the complete picture.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Results reviewed and explained by your AHPRA-registered doctor in a follow-up consultation. Not just a PDF of numbers.' },
    { value: 'Near you', label: 'Accredited collection centres near you', detail: 'Your referral issued electronically. No appointment needed at most collection centres.' },
  ],

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. Your doctor referral issued the same business day.', time: '2 MIN' },
    { title: 'Collect your bloods', body: 'Attend any accredited collection centre near you. Most tests require a fasted morning sample.', time: '30 MIN' },
    { title: 'Doctor review', body: 'Your AHPRA-registered doctor reviews every marker in the context of your health history and goals, not just against reference ranges.', time: '45 MIN' },
    { title: 'Your results explained', body: 'Full interpretation of your results with specific recommendations. Follow-up pathway if any markers require clinical attention.', time: 'SAME DAY' },
  ],

  mechanismHeadline: 'What your blood work actually tells you.',
  mechanismBody: 'Blood markers are not just disease indicators. They\'re a window into how your systems are performing right now.',
  mechanismFeatures: [
    { title: 'Hormonal status', body: 'Hormone markers and thyroid markers, linked to energy, focus, body composition and recovery. All included.' },
    { title: 'Metabolic function', body: 'Fasting glucose, HbA1c, insulin resistance index, lipid panel: shows how your metabolism is running today.' },
    { title: 'Inflammatory load', body: 'hsCRP and inflammatory markers detect chronic low-grade inflammation, a driver of disease that often goes unmeasured for years.' },
    { title: 'Nutritional status', body: 'Vitamin D, B12, iron studies, zinc: deficiencies that are worth knowing about.' },
  ],

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
}

// ─── Sexual Health ─────────────────────────────────────────────────────────────

export const sexualHealthConfig: ProgramPageConfig = {
  slug: 'sexual-health',
  name: 'Sexual Health',
  category: 'Men\'s Sexual Health',

  headline: 'Sexual health.',
  headlineAccent: 'Private, clinical, doctor-led.',
  heroBody: 'Sexual health concerns are medical issues, not something to manage in silence. We assess the clinical drivers (hormonal, vascular and psychological) with you, privately.',
  heroBullets: [
    'Completely confidential, 100% online',
    'AHPRA-registered doctors',
    'Clinical assessment before any treatment',
  ],

  empathyHeadline: "Most men wait years before seeking help. You don\'t need to.",
  empathyBody: "Sexual health concerns are among the most under-reported medical issues in men. A doctor can help work out the clinical driver. A complete assessment, completely online, completely private.",
  empathyChips: ['Erectile dysfunction', 'Low libido', 'Performance anxiety', 'Hormonal cause', 'Vascular factor', 'Premature ejaculation'],

  evidenceHeadline: 'Understanding the clinical drivers.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Hormone markers, heart and metabolic markers, read by your doctor before any treatment is discussed.' },
    { value: '01', label: 'A full clinical assessment first', detail: 'Erectile dysfunction can have vascular, hormonal, neurological or psychological factors. Your doctor looks at all of them.' },
    { value: '100%', label: 'Confidential, online consultation', detail: 'Your consultation conducted entirely via telehealth. No clinic waiting rooms. No awkward conversations in person.' },
  ],

  processSteps: STANDARD_STEPS,

  mechanismHeadline: 'Sexual health is a function of multiple systems.',
  mechanismBody: 'Your doctor works out which system is most likely involved before any treatment is discussed.',
  mechanismFeatures: [
    { title: 'Hormonal drivers', body: 'Hormone markers are linked to libido and sexual function. They are measured in your blood panel.' },
    { title: 'Vascular function', body: 'Erectile function is primarily a vascular event. Cardiovascular risk markers and blood flow indicators are assessed as part of your panel.' },
    { title: 'Neurological factors', body: 'Nerve signalling governs arousal and sensation. Nutritional status and metabolic function both influence neurological health.' },
    { title: 'Psychological context', body: 'Performance anxiety and psychological factors can compound physical drivers. Your doctor assesses the full clinical picture before any treatment is recommended.' },
  ],

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
  intakeUrl: '/signup',
}

// ─── Skin Regeneration ─────────────────────────────────────────────────────────

export const skinRegenerationConfig: ProgramPageConfig = {
  slug: 'skin-regeneration',
  name: 'Skin Regeneration',
  category: 'Skin Health',

  headline: 'Skin, from the inside.',
  headlineAccent: 'Doctor-led.',
  heroBody: 'Skin quality is a reflection of internal biology. We assess the hormonal, nutritional, and systemic factors driving skin ageing, then build a protocol around your actual markers.',
  heroBullets: [
    'Hormonal and nutritional skin panel',
    'AHPRA-registered doctors',
    'Clinically assessed, personalised protocols',
  ],

  empathyHeadline: "Skin ageing is not just about what you put on it.",
  empathyBody: "Collagen production, cellular turnover, hydration, and elasticity are regulated by hormones, nutrition, and systemic biology. Topical products can support, but they cannot compensate for deficiencies at the biological level.",
  empathyChips: ['Premature ageing', 'Skin laxity', 'Dullness', 'Acne in adults', 'Collagen loss', 'Uneven texture'],

  evidenceHeadline: 'The biology behind skin quality.',
  evidencePoints: [
    { value: '23+', label: 'Markers in your panel', detail: 'Hormone markers, vitamin D, zinc, iron and inflammatory markers, all assessed before any plan is discussed.' },
    { value: '48h', label: 'Most results back in about 48 hours', detail: 'Collected at an accredited collection centre near you, then reviewed by your doctor in your consultation.' },
    { value: '100%', label: 'Doctor-led and clinically assessed', detail: 'No protocol is recommended without a proper clinical assessment and review of your blood markers. Treatment only where clinically appropriate.' },
  ],

  processSteps: [
    { title: 'Create your account', body: 'Register in under two minutes. No GP referral required.', time: '2 MIN' },
    { title: 'Complete pathology testing', body: 'Hormone and skin-relevant blood panel at a collection centre near you. Most results back in about 48 hours.', time: '30 MIN' },
    { title: 'Doctor consultation', body: 'Your doctor reviews your panel and skin health history to build a protocol addressing your specific biological drivers.', time: '45 MIN' },
    { title: 'Protocol dispatched', body: 'Treatment coordinated through our Australian pharmacy partner with regular clinical reviews.', time: 'ONGOING' },
  ],

  mechanismHeadline: 'Why internal biology determines skin quality.',
  mechanismBody: 'Skin quality is a downstream output of multiple biological systems. Your doctor looks at those systems as well as the skin itself.',
  mechanismFeatures: [
    { title: 'Collagen synthesis', body: 'Collagen production is regulated by hormones and nutrition. Your panel includes the nutrient markers involved.' },
    { title: 'Cellular turnover', body: 'The rate at which skin cells renew is linked to metabolic function and thyroid status, both assessable through blood testing.' },
    { title: 'Inflammatory control', body: 'Inflammation is linked to skin ageing and to conditions like adult acne. We test inflammatory markers so your doctor can see whether they are part of the picture.' },
    { title: 'Hydration and barrier function', body: 'Hormone markers are linked to skin hydration and oil production in both men and women. Your panel includes them.' },
  ],

  testimonials: [
    { name: 'Oliver K.', date: 'March 2025', highlight: 'First time skin health was approached as a medical question', full: 'First time skin health was approached as a medical question rather than a cosmetic one. The doctor identified nutritional deficiencies I wasn\'t aware of. Very different experience.' },
    { name: 'Nathan B.', date: 'February 2025', highlight: 'The blood panel revealed things my dermatologist never tested', full: 'The blood panel revealed things my dermatologist never tested. The consultation was thorough and the doctor connected my results to what was happening with my skin clearly.' },
    { name: 'Liam T.', date: 'April 2025', highlight: 'Professional and evidence-based', full: 'Professional and evidence-based. No promises about what would happen, just a thorough clinical assessment and a protocol that made sense based on what my blood work showed.' },
  ],

  faqs: [
    { q: 'Is this program suitable for acne in adults?', a: 'Yes. Adult acne can have hormonal and inflammatory factors that a blood panel can show. Your doctor will assess suitability during consultation.' },
    { q: 'How is this different from seeing a dermatologist?', a: 'A dermatologist primarily addresses surface-level skin conditions. Our program investigates the internal biological factors (hormonal, nutritional, and systemic) that drive skin quality and ageing.' },
    ...SHARED_FAQS,
  ],

  ctaHeadline: 'Skin quality starts from the inside.',
  ctaBody: 'Complete the pre-screen. Your doctor reviews your skin history and hormonal markers and contacts you to confirm clinical suitability.',
  intakeUrl: '/signup',
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
