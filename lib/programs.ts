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
    title: 'Complete the Form',
    description:
      'Fill out our Get Started form. Takes 3–5 minutes. Our team will contact you to confirm your pathway.',
  },
  {
    number: '02',
    title: 'Get Your Blood Work',
    description:
      'We refer you to a local accredited pathology centre. No appointment needed at most locations.',
  },
  {
    number: '03',
    title: 'Consult With Your Doctor',
    description:
      'A telehealth consultation with an AHPRA-registered doctor reviews your results and builds your personalised protocol.',
  },
  {
    number: '04',
    title: 'Begin Your Protocol',
    description:
      'Treatment is coordinated through our partner pharmacy or your own — whatever suits you. Ongoing reviews are built in.',
  },
]

const defaultGeneralHowItWorks = [
  {
    number: '01',
    title: 'Complete the Form',
    description:
      'Fill out our Get Started form and describe your injury or recovery needs. Our team will be in touch.',
  },
  {
    number: '02',
    title: 'Doctor Consultation',
    description:
      'A telehealth consultation with an AHPRA-registered doctor to assess your needs and build a protocol.',
  },
  {
    number: '03',
    title: 'Begin Your Protocol',
    description:
      'Treatment is arranged through our pharmacy partner or your own. Your doctor will guide you through each phase.',
  },
  {
    number: '04',
    title: 'Monitor & Adjust',
    description:
      'Follow-up consultations track your progress and adjust the protocol as you recover.',
  },
]

export const programs: Program[] = [
  {
    slug: 'hormone-optimisation',
    name: 'Hormone Optimisation',
    image: '/img-hormone-optimisation.svg',
    tagline: 'Understand your hormones. Optimise your baseline.',
    bio: "Hormonal imbalances don't always announce themselves loudly. Fatigue, poor recovery, changes in body composition and mood are often the first signs something is off. Our Hormone Optimisation program starts with comprehensive pathology to establish your clinical baseline, followed by a doctor consultation to interpret your results and build a treatment plan around your actual biology — not a generic protocol.",
    track: 'hormone',
    status: 'active',
    symptoms: [
      'Persistent fatigue that doesn\'t resolve with adequate sleep',
      'Changes in body composition — gaining weight or losing muscle',
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
    ctaHref: '/get-started',
  },
  {
    slug: 'hormone-performance',
    name: 'Hormone & Performance',
    image: '/img-hormone-performance.svg',
    tagline: 'Hormonal health meets physical output.',
    bio: "Designed for those who train hard and expect their body to keep up. This program combines hormonal assessment with performance-specific markers to identify what's limiting your output — whether that's recovery, energy, or hormonal interference. Your doctor reviews the full picture and builds a protocol that supports both your health and your physical goals.",
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
      'Full hormone and performance blood panel referral',
      'Telehealth consultation with a performance-focused AHPRA-registered doctor',
      'Combined hormonal and performance clinical protocol',
      'Treatment coordination through our TGA-compliant pharmacy partner',
      '4-monthly review consultations',
    ],
    howItWorks: defaultHormoneHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: '/get-started',
  sasDisclosure: true,
  },
  {
    slug: 'performance-plus',
    name: 'Performance+',
    image: '/img-performance-plus.svg',
    tagline:
      'Our flagship program. Hormone optimisation specialised for performance and body composition.',
    bio: "Our flagship program. Built for people who treat their body like a system to be optimised, not just maintained. Performance+ combines deep hormonal analysis with performance and metabolic markers, giving your doctor the most complete picture possible. The result is a protocol engineered around your biology, your goals, and your lifestyle — with ongoing monitoring built in.",
    track: 'hormone',
    status: 'active',
    badge: 'Flagship',
    symptoms: [
      'Advanced performance plateau despite optimised training',
      'Body composition resistance — fat gain, muscle loss',
      'Hormonal environment limiting physical capacity',
      'Long-term sustainability concerns around health and performance',
      'High-output demands requiring clinical-grade support',
    ],
    includes: [
      'Advanced hormone and performance blood panel referral',
      'Extended consultation with a performance-specialist AHPRA-registered doctor',
      'Comprehensive combined protocol — hormonal + performance focus',
      'Priority pharmacy coordination through our TGA-compliant partner',
      '4-monthly review schedule with clinical progress tracking',
    ],
    howItWorks: defaultHormoneHowItWorks,
    ctaLabel: 'Get Started',
    ctaHref: '/get-started',
  sasDisclosure: true,
  },
  {
    slug: 'injury-repair',
    name: 'Injury Repair & Recovery',
    image: '/img-injury-repair.svg',
    tagline:
      'Clinically supported protocols to accelerate tissue repair and get you back performing.',
    bio: "The body has a remarkable capacity to heal — but the right clinical environment makes the difference between slow recovery and real progress. Our Injury Repair program takes a doctor-led approach to tissue repair and recovery, using evidence-based protocols tailored to your injury history and health markers. No guesswork. Just a clear, medically supervised pathway back to full function.",
    track: 'general',
    status: 'active',
    symptoms: [
      'Soft tissue injuries — tendons, ligaments, and muscle',
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
    ctaHref: '/get-started',
  sasDisclosure: true,
  },
  {
    slug: 'skin-regeneration',
    name: 'Skin Regeneration',
    image: '/img-skin-regeneration.svg',
    tagline: 'Doctor-prescribed anti-ageing. Built on what your bloodwork actually shows.',
    bio: "Skin quality is a direct reflection of what's happening internally — hormones, inflammation markers, nutrient status. Our Skin Regeneration program goes beyond surface treatments by identifying the underlying clinical drivers of skin changes and addressing them through doctor-prescribed protocols. The outcome is healthier skin built from the inside out, not just managed from the outside.",
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
    ctaHref: '/get-started',
  sasDisclosure: true,
  },
  {
    slug: 'hair-restoration',
    name: 'Hair Restoration',
    image: '/img-hair-restoration.svg',
    tagline: 'Evidence-based treatment for hair loss — not guesswork, not off-the-shelf.',
    bio: "Hair loss has real clinical causes — hormonal, nutritional, and metabolic — and real clinical solutions. This program uses pathology to identify the specific drivers of hair loss in your case, and your doctor builds a treatment plan targeted to those causes. Evidence-based, doctor-prescribed, and monitored over time to ensure it's working.",
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
    ctaHref: '/get-started',
  },
  {
    slug: 'metabolic-weight-loss',
    name: 'Metabolic Weight Loss',
    image: '/img-weight-loss.svg',
    tagline:
      'Address the real drivers of weight resistance — hormonal, metabolic, and clinical.',
    bio: "Resistance to weight loss is rarely about willpower. Hormonal dysfunction, metabolic disruption, and underlying clinical factors are the most common culprits — and the most overlooked. Our Metabolic Weight Loss program uses pathology and a doctor consultation to understand your body's specific barriers, then builds a medically supervised protocol to address them directly.",
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
        title: 'Complete the Form',
        description:
          'Fill out our Get Started form. No blood work required upfront for this program.',
      },
      {
        number: '02',
        title: 'Doctor Consultation ($125)',
        description:
          'A telehealth consultation to review your full health profile and create your personalised treatment plan.',
      },
      {
        number: '03',
        title: 'Begin Your Protocol',
        description:
          'Treatment is coordinated through our partner pharmacy or your own. Your doctor manages your protocol ongoing.',
      },
      {
        number: '04',
        title: 'Monitor & Review',
        description:
          'Regular follow-up consultations track your progress and refine your protocol as needed.',
      },
    ],
    ctaLabel: 'Get Started',
    ctaHref: '/get-started',
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
      'Proactive health management — not just reactive care',
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
    ctaHref: '/get-started',
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug)
}
