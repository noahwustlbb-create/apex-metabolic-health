export type ProgramTrack = 'hormone' | 'general'
export type ProgramStatus = 'active' | 'coming-soon'

export interface Program {
  slug: string
  name: string
  tagline: string
  bio: string
  track: ProgramTrack
  status: ProgramStatus
  badge?: string
  image?: string
  symptoms: string[]
  includes: string[]
  howItWorks: Array<{ number: string; title: string; description: string }>
  ctaLabel: string
  ctaHref: string
  sasDisclosure?: boolean
}

const defaultHormoneHowItWorks = [
  {
    number: '01',
    title: 'Create your account',
    description:
      'Sign up at app.apexmetabolichealth.com.au. Takes two minutes. No GP referral required.',
  },
  {
    number: '02',
    title: 'Complete your intake',
    description:
      'Answer a short set of clinical questions about your health history and goals directly in the patient portal.',
  },
  {
    number: '03',
    title: 'Get your blood work done',
    description:
      'We arrange your pathology referral. Attend any of 4,000+ accredited collection centres near you, with no appointment needed at most locations. Results back within 48 hours.',
  },
  {
    number: '04',
    title: 'Telehealth consultation',
    description:
      'Your AHPRA-registered doctor reviews your results and builds your personalised protocol. Video or phone, your choice.',
  },
  {
    number: '05',
    title: 'Protocol begins',
    description:
      'Your prescription is coordinated through our TGA-compliant compounding pharmacy partner and dispatched directly to you. 3-monthly reviews and script renewals are built in.',
  },
]

const defaultGeneralHowItWorks = [
  {
    number: '01',
    title: 'Create your account',
    description:
      'Sign up at app.apexmetabolichealth.com.au. No GP referral required.',
  },
  {
    number: '02',
    title: 'Complete your intake',
    description:
      'Answer a short set of clinical questions about your health history and goals in the patient portal.',
  },
  {
    number: '03',
    title: 'Telehealth consultation',
    description:
      'An AHPRA-registered doctor reviews your intake, issues pathology referrals where indicated, and builds your personalised protocol.',
  },
  {
    number: '04',
    title: 'Protocol begins',
    description:
      'Treatment is arranged through our TGA-compliant pharmacy partner and dispatched directly to you. Your doctor manages your protocol ongoing.',
  },
  {
    number: '05',
    title: 'Review and adjust',
    description:
      'Follow-up consultations every 3 months track your progress and adjust your protocol based on results.',
  },
]

export const programs: Program[] = [
  {
    slug: 'hormone-optimisation',
    name: 'Hormone Optimisation',
    image: '/img-hormone-optimisation.svg',
    tagline: 'Understand your hormones. Optimise your baseline.',
    bio: "Hormonal imbalances don't always announce themselves loudly. Fatigue, poor recovery, changes in body composition and mood are often the first signs something is off. Our Hormone Optimisation program starts with comprehensive pathology to establish your clinical baseline, followed by a doctor consultation to interpret your results and build a treatment plan around your actual biology, not a generic protocol.",
    track: 'hormone',
    status: 'active',
    symptoms: [
      'Persistent fatigue that doesn\'t resolve with adequate sleep',
      'Changes in body composition: gaining weight or losing muscle',
      'Brain fog, poor concentration, or declining cognitive sharpness',
      'Low drive, reduced motivation, or emotional flatness',
      'Disrupted sleep patterns and poor recovery',
    ],
    includes: [
      'Comprehensive hormone blood panel referral',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Personalised clinical protocol based on your pathology',
      'Coordinated treatment through our TGA-compliant pharmacy partner',
      'Scheduled follow-up reviews',
    ],
    howItWorks: defaultHormoneHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  },
  {
    slug: 'performance-plus',
    name: 'Performance & Recovery',
    image: '/img-performance-plus.svg',
    tagline: 'Optimise output, recovery speed, and physical resilience with data-driven clinical protocols.',
    bio: "Training harder doesn't always mean recovering better. This program combines hormonal and performance-specific markers to identify the clinical drivers limiting your output, whether that's recovery, energy systems, or hormonal interference. Your doctor reviews the full picture and builds a protocol targeted to your biology and your goals.",
    track: 'hormone',
    status: 'active',
    symptoms: [
      'Plateaued training results despite consistent effort',
      'Poor recovery between sessions',
      'Suboptimal body composition despite diet and exercise',
      'Low energy affecting training quality and consistency',
      'Reduced strength or endurance output',
    ],
    includes: [
      'IGF-1, cortisol, CK and inflammatory marker assessment',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Biomarker-driven protocol: strength, recovery and endurance focus',
      'Treatment coordination through our TGA-compliant pharmacy partner',
      'Scheduled review cycles with clinical progress tracking',
    ],
    howItWorks: defaultHormoneHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
    sasDisclosure: true,
  },
  {
    slug: 'injury-repair',
    name: 'Injury Repair & Recovery',
    image: '/img-injury-repair.svg',
    tagline:
      'Clinically supported protocols to accelerate tissue repair and get you back performing.',
    bio: "The body has a remarkable capacity to heal, but the right clinical environment makes the difference between slow recovery and real progress. Our Injury Repair program takes a doctor-led approach to tissue repair and recovery, using evidence-based protocols tailored to your injury history and health markers. No guesswork. Just a clear, medically supervised pathway back to full function.",
    track: 'general',
    status: 'active',
    symptoms: [
      'Soft tissue injuries: tendons, ligaments, and muscle',
      'Slow or incomplete healing following injury or surgery',
      'Chronic musculoskeletal conditions limiting activity',
      'Recurring injuries in the same sites',
      'Post-surgical recovery support needs',
    ],
    includes: [
      'Targeted pathology referral where clinically indicated',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Personalised injury recovery protocol',
      'Treatment coordination through our TGA-compliant pharmacy partner',
      'Follow-up review consultations',
    ],
    howItWorks: defaultGeneralHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  sasDisclosure: true,
  },
  {
    slug: 'skin-regeneration',
    name: 'Skin Regeneration',
    image: '/img-skin-regeneration.svg',
    tagline: 'Doctor-prescribed anti-ageing. Built on what your bloodwork actually shows.',
    bio: "Skin quality is a direct reflection of what's happening internally: hormones, inflammation markers, nutrient status. Our Skin Regeneration program goes beyond surface treatments by identifying the underlying clinical drivers of skin changes and addressing them through doctor-prescribed protocols. The outcome is healthier skin built from the inside out, not just managed from the outside.",
    track: 'general',
    status: 'active',
    symptoms: [
      'Declining skin quality, texture, or firmness',
      'Visible signs of hormonal changes on the skin',
      'Acne or hormonally-driven skin conditions',
      'Post-injury or post-procedural skin recovery',
      'General skin health optimisation',
    ],
    includes: [
      'Skin and hormonal pathology referral where indicated',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Personalised skin regeneration protocol',
      'Doctor-prescribed treatment via our TGA-compliant pharmacy partner',
      'Follow-up review consultation',
    ],
    howItWorks: defaultGeneralHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  sasDisclosure: true,
  },
  {
    slug: 'hair-restoration',
    name: 'Hair Restoration',
    image: '/img-hair-restoration.svg',
    tagline: 'Evidence-based treatment for hair loss. Not guesswork, not off-the-shelf.',
    bio: "Hair loss has real clinical causes (hormonal, nutritional, and metabolic) and real clinical solutions. This program uses pathology to identify the specific drivers of hair loss in your case, and your doctor builds a treatment plan targeted to those causes. Evidence-based, doctor-prescribed, and monitored over time to ensure it's working.",
    track: 'general',
    status: 'active',
    symptoms: [
      'Androgenic alopecia (pattern hair loss)',
      'Diffuse thinning across the scalp',
      'Hairline recession',
      'Hair loss associated with hormonal changes',
      'Suboptimal scalp health',
    ],
    includes: [
      'Targeted hair and hormonal pathology referral',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Personalised hair restoration protocol',
      'Doctor-prescribed treatment via our TGA-compliant pharmacy partner',
      'Follow-up review consultation',
    ],
    howItWorks: defaultGeneralHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  },
  {
    slug: 'metabolic-weight-loss',
    name: 'Metabolic Weight Loss',
    image: '/img-weight-loss.svg',
    tagline:
      'Address the real drivers of weight resistance: hormonal, metabolic, and clinical.',
    bio: "Resistance to weight loss is rarely about willpower. Hormonal dysfunction, metabolic disruption, and underlying clinical factors are the most common culprits, and the most overlooked. Our Metabolic Weight Loss program uses pathology and a doctor consultation to understand your body's specific barriers, then builds a medically supervised protocol to address them directly.",
    track: 'general',
    status: 'active',
    symptoms: [
      'Weight that doesn\'t respond to diet or exercise',
      'Metabolic slowdown or insulin resistance markers',
      'Hormonal contributors to body composition changes',
      'Low energy limiting physical activity',
      'Previous weight loss attempts with unsustained results',
    ],
    includes: [
      'Metabolic and hormonal pathology referral',
      'Telehealth consultation with an AHPRA-registered doctor',
      'Personalised metabolic management protocol',
      'Access to doctor-prescribed treatment via our TGA-compliant pharmacy partner',
      'Ongoing monitoring and review consultations',
    ],
    howItWorks: [
      {
        number: '01',
        title: 'Create your account',
        description:
          'Sign up at app.apexmetabolichealth.com.au. No blood work required before your first consultation.',
      },
      {
        number: '02',
        title: 'Complete your intake',
        description:
          'Tell us about your weight history, previous attempts, energy patterns, and goals in the patient portal.',
      },
      {
        number: '03',
        title: 'Doctor consultation',
        description:
          'A telehealth consultation to review your full health profile, identify metabolic drivers, and create your personalised treatment plan.',
      },
      {
        number: '04',
        title: 'Protocol begins',
        description:
          'Treatment is coordinated through our TGA-compliant pharmacy partner. Your doctor manages your protocol ongoing.',
      },
      {
        number: '05',
        title: 'Monitor and review',
        description:
          'Regular follow-up consultations every 3 months track your progress and refine your protocol as needed.',
      },
    ],
    ctaLabel: 'Get Started',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  },
  {
    slug: 'longevity',
    name: 'Longevity Protocol',
    image: '/img-longevity.svg',
    tagline: 'Comprehensive health optimisation for the long game.',
    bio: "A comprehensive health optimisation program for people thinking long-term. The Longevity Protocol uses our most extensive pathology panel to build a complete picture of your hormonal, metabolic, cardiovascular, and cellular health. Your doctor uses this data to identify where you are today and create a protocol designed to keep you performing at your best for the long haul. Coming soon.",
    track: 'hormone',
    status: 'coming-soon',
    badge: 'Coming Soon',
    symptoms: [
      'Optimising long-term health markers',
      'Preventive assessment of cardiovascular and metabolic risk',
      'Hormonal and metabolic baseline tracking over time',
      'Performance and cognitive longevity',
      'Proactive health management, not just reactive care',
    ],
    includes: [
      'Comprehensive multi-system blood panel referral',
      'Extended telehealth consultation with an AHPRA-registered doctor',
      'Long-horizon clinical protocol',
      'Periodic review and pathology monitoring schedule',
      'Coordinated treatment through our TGA-compliant pharmacy partner',
    ],
    howItWorks: defaultHormoneHowItWorks,
    ctaLabel: 'Join the Waitlist',
    ctaHref: 'https://app.apexmetabolichealth.com.au/signup',
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
