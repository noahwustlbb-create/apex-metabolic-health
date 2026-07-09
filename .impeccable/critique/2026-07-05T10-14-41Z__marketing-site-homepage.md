---
target: marketing site homepage
total_score: 27
p0_count: 1
p1_count: 2
timestamp: 2026-07-05T10-14-41Z
slug: marketing-site-homepage
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No async ops on marketing pages; signup modal shows process clearly |
| 2 | Match System / Real World | 3 | "Pathology" unexplained for non-medical users; otherwise plain language throughout |
| 3 | User Control and Freedom | 3 | Modal has close; mobile drawer has close; no traps found |
| 4 | Consistency and Standards | 2 | Hero hardcodes hex (#111827, #f9fafb) instead of CSS tokens; some components use `var(--text-primary)`, others don't — token system bypassed |
| 5 | Error Prevention | 3 | Signup gate prevents premature commitment; no form errors on marketing pages |
| 6 | Recognition Rather Than Recall | 3 | Treatments discoverable via dropdown and TreatmentSelector section |
| 7 | Flexibility and Efficiency | 2 | One path for all users; quiz alternative exists but buried; no keyboard shortcuts |
| 8 | Aesthetic and Minimalist Design | 3 | Hero and WhyApex are clean; DoctorCard placeholder ruins its section |
| 9 | Error Recovery | 2 | Contact email in footer; no contextual help or live chat |
| 10 | Help and Documentation | 2 | FAQ at bottom only; no contextual tooltips or inline help |
| **Total** | | **27/40** | **Acceptable — significant improvements needed** |

## Anti-Patterns Verdict

**LLM assessment**: Does not immediately read as AI-generated — the hero copy ("Your biology isn't broken. It isn't being measured.") is genuinely specific and empathy-driven, the WhyApex section uses a differentiated two-column rule-row layout instead of icon cards, and no gradient text or side-stripe borders were found. However, two AI grammar tells are present: (1) the section order on the homepage exactly matches the anti-reference pattern PRODUCT.md explicitly calls out (Hero → StatsBar → card grid → numbered steps → doctor card → FAQ → CTA), and (2) Space Grotesk used on all display headings — it's on the brand.md reflex-reject list and reads "SaaS premium" not "clinical specialist." The numbered 01–04 steps in HowItWorks are a legitimate ordered sequence (an exception), but in context they reinforce the AI grammar read.

**Deterministic scan**: 7 findings, all confirmed false positives. Five `overused-font` hits in server-side API route handlers generating transactional email HTML — Helvetica Neue/Arial in email HTML is the industry-standard fallback, not a UI decision. Two `gray-on-color` hits in `FastTrackForm.tsx:174,194` where the detector read conditional Tailwind class branches as co-occurring states; they are mutually exclusive. Net real detector findings: 0.

## Overall Impression

The site's bones are good — the copy is the strongest thing on it, the signup gate is smart, and the WhyApex layout is differentiated. The critical problems are strategic: the site defaults to light mode despite the brief calling for "dark, premium, masculine, clinical" (making it look Everlab-corporate in a tab comparison), a real doctor photo is missing in production (catastrophic for a medical site targeting skeptical men), and the page structure follows the exact template PRODUCT.md says to move away from. The score of 27 reflects a site that is functional and competent but hasn't yet made the moves that would make it undeniably Apex.

## What's Working

1. **Hero copy is category-best.** "Your biology isn't broken. It isn't being measured." — empathetic, specific, non-supplement, directly targets the GP-dismissed frustration of the target user. Nothing in Biov8 or Everlab's copy is this precise.

2. **WhyApex section layout.** Horizontal rule rows with title/body columns rather than icon card grids. Differentiated and editorial without falling into magazine-serif affectation. The copy ("A GP manages disease. A wellness brand sells supplements. We build clinical protocols around your biology") is the strongest trust argument on the page.

3. **Signup gate architecture.** Showing the clinical process (GetStartedModal) before account creation is genuinely smart UX — it builds confidence rather than asking for commitment before context. The `onConfirm` callback system is elegantly implemented.

## Priority Issues

**[P0] Doctor photo is a live placeholder in production**
- **What**: `DoctorCard` contains a dashed-border box labeled "PHOTO PENDING" and `title="[NEEDS: real headshot — Dr Cameron Chen]"` shipping in the live site.
- **Why it matters**: The entire credibility of a doctor-led telehealth clinic targeting skeptical GP-dismissed men rests on the doctor being real and identifiable. The AHPRA number and HPI-I badges are present but have no face attached to them. Marcus comparing tabs has no reason to trust Apex over a competitor who shows a real doctor.
- **Fix**: Block the next deploy until a real headshot is in place. This is the only item on this list that should happen before anything else.
- **Suggested command**: No command — this is a content gap, not a design problem.

**[P1] Site defaults to light mode; brief calls for dark**
- **What**: `<html>` has no `data-theme="dark"` attribute. The `Hero.tsx` component hardcodes `backgroundColor: '#f9fafb'` and `color: '#111827'` inline, bypassing the token system entirely. The dark theme exists in CSS but isn't activated.
- **Why it matters**: In a tab comparison against Biov8, Hormn, and Everlab, the light Apex looks indistinguishable from Everlab ("corporate and safe" — the anti-reference). The dark theme would create immediate visual differentiation and match the "dark, premium, masculine" brief.
- **Fix**: Set `data-theme="dark"` as default on `<html>` in `app/layout.tsx`. Replace Hero's hardcoded colors with `var(--bg)` / `var(--text-primary)`. Audit all components that hardcode light hex values.
- **Suggested command**: `/impeccable polish`

**[P1] Section order matches the exact anti-reference template**
- **What**: Homepage structure is Hero → StatsBar → TreatmentSelector (cards) → WhyApex → HowItWorks (numbered steps) → DoctorCard → FAQ → CTA — PRODUCT.md calls this exact pattern "the pattern to move away from."
- **Why it matters**: The order teaches users they're on a template. The strongest trust-builder (WhyApex — the differentiated competitor comparison) is section 4 of 9; many users will bounce before seeing it.
- **Fix**: Promote WhyApex content earlier. Consider leading with the "GP vs wellness brand vs Apex" argument immediately after the hero. Move social proof (currently absent) into the upper half. Push FAQ toward the bottom.
- **Suggested command**: `/impeccable shape`

**[P2] Space Grotesk on the reflex-reject list used for all display headings**
- **What**: Space Grotesk handles hero h1, stat numbers, section headings, and the brand wordmark. It's explicitly on brand.md's reflex-reject list — it reads "SaaS premium" not "clinical specialist."
- **Why it matters**: Marcus comparing tabs needs Apex's typography to signal medical authority, not fintech/startup. Space Grotesk undermines the clinical register the brief requires.
- **Fix**: Inter (locked per PRODUCT.md) works as a single-family system at committed weights. Consider a more clinical display alternative for headings only — or lean harder into Inter at heavier weights for a more clinical read.
- **Suggested command**: `/impeccable typeset`

**[P2] AHPRA credential bar rendered at 10px — #1 trust signal is invisible**
- **What**: The hero credential row (AHPRA-registered practitioners, TGA-regulated, Australian clinicians) is 10px / #6b7280 — the smallest text on the page, rendered in muted gray.
- **Why it matters**: For a skeptical GP-dismissed man, AHPRA registration is the thing that separates a real clinic from a supplement brand. Burying it in footnote-weight text means the user's most important question ("is this a real medical practice?") isn't answered at first glance.
- **Fix**: Bring the credential signals up in visual weight. Even 12px / #4b5563 and a small shield icon would materially improve legibility. Consider a dedicated trust bar with slightly more presence between the hero CTA and the scroll indicator.
- **Suggested command**: `/impeccable layout`

## Persona Red Flags

**Jordan (Confused First-Timer)**
- "Not sure? Take the assessment" is buried inside the treatments dropdown — Jordan won't open that dropdown looking for a quiz path.
- "Pathology" used in StatsBar ("4,000+ Pathology centres") without explanation. First-timers may not know what this means in Australian medical context.
- FAQ only visible at page bottom — Jordan, who wants reassurance, has no help access until the very end of the page.

**Casey (Distracted Mobile User)**
- AHPRA credential bar at 10px is unreadable on small screens.
- TreatmentSelector loads 4+ Unsplash images at 800px width + HowItWorks loads 4 at 600px — 8 heavy images early in scroll, likely unoptimized for mobile connections.
- StatsBar 3-column grid: 10px stat labels may wrap badly at 375px.

**Marcus (GP-Dismissed Skeptic — project-specific)**
- "PHOTO PENDING" DoctorCard is the single largest trust destroyer for this persona. He is specifically evaluating whether this clinic has a real doctor.
- Light-mode default makes Apex look Everlab-adjacent in a tab comparison — visual differentiation is zero.
- No testimonials from men in his situation anywhere on the homepage. He wants peer validation ("someone like me got results") as much as clinical credentials.
- The strongest argument for Apex (WhyApex copy: "A GP manages disease...") is section 4 of 9. Marcus, comparing 4 clinics simultaneously, may not reach it.

## Minor Observations

- The treatments dropdown exposes 8+ items at once — above the 4-item working memory guideline. Grouping into 2-3 categories (Hormones / Body / Recovery) would reduce cognitive load.
- Mobile StatsBar labels are 10px tracked uppercase — borderline legible at small sizes.
- "Find your treatment" primary CTA links to `#treatments` anchor — appropriate for research mode, but there's no direct "Book a consultation" fast-path for users who are ready to commit.
- No testimonials or social proof anywhere on the homepage. For the target persona (skeptical researcher), peer validation is a significant conversion signal.

## Questions to Consider

- "The WhyApex section has Apex's strongest argument — what if it were the first thing a visitor read after the hero?"
- "If a skeptical man had 45 seconds on this site before switching to a competitor tab, what would he remember?"
- "Does a light-mode clinical site communicate 'specialist' or 'startup'?"
