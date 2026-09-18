---
name: Apex Metabolic Health
description: Doctor-led hormone and metabolic telehealth — a white clinical page with framed photography, glass panels and one blue instrument light.
colors:
  canvas: "#ffffff"
  canvas-subtle: "#f5f7fa"
  canvas-inset: "#e5e7eb"
  surface-tinted: "#f8f9ff"
  glass-card: "rgba(255,255,255,0.72)"
  glass-panel: "rgba(255,255,255,0.78)"
  nav-glass: "rgba(255,255,255,0.86)"
  nav-glass-scrolled: "rgba(255,255,255,0.96)"
  ink: "#111827"
  ink-muted: "#374151"
  ink-subtle: "#4b5563"
  ink-placeholder: "#9ca3af"
  hairline: "rgba(0,0,0,0.10)"
  hairline-muted: "rgba(0,0,0,0.06)"
  hairline-strong: "rgba(0,0,0,0.20)"
  accent: "#4890f7"
  accent-fg: "#1d4ed8"
  accent-pressed: "#2563eb"
  accent-gradient-end: "#1d4fd8"
  accent-light: "#6ba8ff"
  accent-muted: "rgba(72,144,247,0.08)"
  accent-border: "rgba(72,144,247,0.28)"
  success-fg: "#047857"
  success-emphasis: "#059669"
  warning-fg: "#92400e"
  warning-emphasis: "#f59e0b"
  danger-fg: "#b91c1c"
  danger-emphasis: "#dc2626"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(38px, 5vw, 72px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
    fontFeature: "\"cv11\", \"ss03\", \"cv05\""
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(32px, 4vw, 58px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.032em"
    fontFeature: "\"cv11\", \"ss03\", \"cv05\""
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(20px, 1.8vw, 26px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontFeature: "\"cv11\""
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.35vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.18em"
  mono:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "10.5px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
  figure:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(36px, 3.6vw, 50px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  readout:
    fontFamily: "Doto, Space Grotesk, monospace"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "\"ROND\" 100, \"wght\" 700"
rounded:
  sm: "10px"
  md: "12px"
  lg: "16px"
  card: "28px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  gutter: "clamp(20px, 5vw, 64px)"
  section-y: "clamp(88px, 9vw, 150px)"
  section-y-sm: "clamp(64px, 7vw, 110px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    size: "13px"
  button-primary-hover:
    backgroundColor: "{colors.accent-gradient-end}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "rgba(72,144,247,0.06)"
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    size: "13px"
  button-white:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.accent-gradient-end}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    size: "13px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,0.72)"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
    size: "13px"
  button-pill:
    backgroundColor: "rgba(72,144,247,0.07)"
    textColor: "{colors.accent-fg}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 5px 5px 22px"
  button-pill-hover:
    backgroundColor: "rgba(72,144,247,0.12)"
    textColor: "{colors.accent-fg}"
  card-glass:
    backgroundColor: "{colors.glass-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  card-flat:
    backgroundColor: "{colors.canvas-subtle}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px"
  nav-bar:
    backgroundColor: "{colors.nav-glass}"
    textColor: "{colors.ink}"
    height: "70px"
    width: "100%"
  nav-bar-desktop:
    backgroundColor: "{colors.nav-glass}"
    height: "88px"
---

# Design System: Apex Metabolic Health

## Overview

**Creative North Star: "The Bright Consulting Room"** *(inferred from the shipped build and PRODUCT.md's "clinical, unhurried, direct"; not user-confirmed.)*

**This file replaces a stale DESIGN.md.** The version committed 2026-09-06 described a dark product (`#0e1117` canvas, Space Grotesk display type) and prohibited bento grids, glassmorphism and homepage pricing. The 2026-09-17 revamp removed all of that. `app/globals.css` states it plainly at the chapter-band rule: *"The site is white only."* Do not restore the dark system from git history; it is not a fallback, a theme, or an option.

The shipped site is a white page that gets its depth from photography, translucent panels and motion rather than from dark bands. Inter carries every word at three sizes — display, headline, body — and everything else is a label. One blue does all the interactive work: as a saturated fill and icon colour at display size, and as a darker, AA-passing blue the moment it becomes small text. Numerals split in two: the ones a visitor acts on are set in Inter with tabular figures, and a dot-matrix face carries atmosphere numerals only.

Density is low and vertical: chapter-length sections (88–150px of padding) inside a 1280px column, one idea each, revealed on scroll. Motion is scroll-driven and reduced-motion-guarded throughout. *(Inferred voice: precise, unhurried, evidential.)*

**Key Characteristics:**
- White canvas (`#ffffff`) only — no dark register, no theme toggle.
- Inter everywhere for words; Doto for atmosphere numerals; Space Grotesk survives only as the uppercase micro-label face.
- One accent blue in two weights: display blue for fills and icons, `accent-fg` for anything small.
- Glass panels over pastel mesh fields are the primary container; a hairline-and-radius flat card is the quiet alternative.
- Motion is scroll- and hover-driven, with a `prefers-reduced-motion` branch on every animation.
- Compliance is a visual constraint, not a footer (see Regulatory Constraints).

## Colors

A white clinical field articulated in ink-alpha hairlines, with one blue instrument light and a four-colour AA-safe status set. `styles/tokens.css` is the live source of truth; `app/globals.css` and `tailwind.config.ts` consume it.

### Primary
- **Apex Blue** (`{colors.accent}`): the display brand blue. Solid CTA fills, icons, rings, borders, dot grids, and large type. It measures 3.18:1 on white, so it is a *fill and shape* colour, not a small-text colour.
- **Deep Link Blue** (`{colors.accent-fg}`, 5.9:1 on canvas): the normative colour for every piece of small blue text — `.t-eyebrow`, `.label`, `.btn-pill` and inline links. Changed from raw Apex Blue on 2026-09-18; the AA failure it fixed is closed.
- **Pressed Blue** (`{colors.accent-pressed}`) and **Gradient End** (`{colors.accent-gradient-end}`): hover fill and the terminating stop of the primary button's 135° gradient. Never a resting fill on their own.
- **Sky Blue** (`{colors.accent-light}`): the one tint used on blue-on-blue surfaces and gradient highlights.

### Neutral
- **Paper** (`{colors.canvas}`): the page. Every section sits on it.
- **Porcelain** (`{colors.canvas-subtle}`): recessed panels and flat cards. A second tinted surface (`{colors.surface-tinted}`) survives in `tailwind.config.ts`; porcelain is the system value.
- **Ink** (`{colors.ink}`, 17.4:1): all primary text. **Ink Muted** (`{colors.ink-muted}`, 8.1:1) for secondary copy, **Ink Subtle** (`{colors.ink-subtle}`, 6.4:1) for captions — that is the floor for text. **Ink Placeholder** (`{colors.ink-placeholder}`) is decorative/disabled only and WCAG-exempt.
- **Hairline** (`{colors.hairline}`): the default divider and card edge, with muted and strong steps either side.

### Tertiary (status only)
- **Clinical Green / Amber / Red** (`{colors.success-fg}`, `{colors.warning-fg}`, `{colors.danger-fg}`): the AA-verified foreground values for validation, eligibility and alert text. Their `-emphasis` siblings are for fills and icons at display size only. Status colour appears only when something *is* a status — never as category coding or decoration.

### Named Rules

**The Two-Weight Blue Rule.** Apex Blue fills shapes; Deep Link Blue carries words. If blue text is under 24px or under 19px bold, it is `accent-fg` (`#1d4ed8`). Raw `#4890f7` on small text is a contrast defect, not a style choice.

**The Token Rule.** Colour is born in `styles/tokens.css` and consumed as `--color-*` or the legacy `--bg`/`--surface`/`--text-*` aliases. A new hex literal in a component is a bug.

**The One Light Rule.** Blue is the only saturated non-status colour on a screen. If a section needs a second hue to feel designed, the section is wrong.

*Divergence from the owner-signed brief:* the brief lists Ink `#0a0e1a`, Secondary `#4a5878`, Muted `#7a90a8` and Dark `#2563eb`/`#1d4ed8`. The live tokens ship `#111827` / `#374151` / `#4b5563` for text, and the brief's three values survive only as unused `tailwind.config.ts` keys (`primary`, `secondary`, `muted`). The live CSS is normative here; `band-light` additionally pins a third ink (`#0f172a`). Converge on the token values.

## Typography

**Display / Body Font:** Inter (with `system-ui` fallback), feature settings `"cv11", "ss03", "cv05"` on headings
**Label / Mono Font:** Space Grotesk — uppercase micro-labels (`.t-mono`) only
**Readout Font:** Doto, variable (`ROND 100`, `wght 700`), tabular figures

**Character:** One voice for language, one for instruments. Inter is large and calm rather than heavy and loud; the dot-matrix readout appears only where the page is imitating a device.

### Hierarchy
- **Display** (`.t-display`, 600, `clamp(38px, 5vw, 72px)`, 1.02, `-0.035em`): the hero sentence. One per page.
- **Headline** (`.t-h2`, 600, `clamp(32px, 4vw, 58px)`, 1.04, `-0.032em`): the one idea a section carries.
- **Title** (`.t-h3`, 600, `clamp(20px, 1.8vw, 26px)`, 1.2): card and sub-section headings.
- **Lead** (`.t-lead`, `clamp(17px, 1.35vw, 21px)`, 1.5): the paragraph under a headline.
- **Body** (`.t-body`, 16.5px, 1.65, `text-wrap: pretty`): prose, held to roughly 62–75ch.
- **Label** (`.t-eyebrow`, 600, 11px, `0.18em`, uppercase, Deep Link Blue): section kicker.
- **Micro-label** (`.t-mono`, Space Grotesk 500, 10.5px, `0.14em`, uppercase): margin notes, captions, counters beside a headline.
- **Figure** (`.t-figure`, Inter 700, tabular, `-0.02em`): numbers the visitor acts on.
- **Readout** (`.t-readout`, Doto 700, tabular): atmosphere numerals.

### Named Rules

**The Two-Numeral Rule.** A number the visitor must read and act on — a price, a step counter, a panel count in a decision — is `.t-figure` (Inter, tabular). `.t-readout` (Doto) is reserved for atmosphere numerals that set a scene: `48h`, `Day 03`, `90d`, mock-dashboard values. This split is the fix for prices that the dot-matrix face rendered illegible; do not move a price back into Doto.

**The Twelve-Pixel Floor Rule.** No text below 12px on any surface a visitor must read. `.t-mono` at 10.5px is the single licensed exception, and only for decorative margin labels that repeat information available elsewhere. The build does not yet meet this floor (see Do's and Don'ts).

**The Kicker Budget Rule.** At most one `.t-eyebrow` per chapter section, and never more than three per page. An eyebrow is a chapter marker, not section grammar; if two adjacent sections both carry one, the second is decoration. The homepage currently ships 7 (of 12 in the app) — that is debt against this rule, not the rule.

## Layout

A single centred column: `.container-x` at `max-width: 1280px` with a fluid gutter of `clamp(20px, 5vw, 64px)`; the older `.container-tight` (`max-w-6xl`, 24–40px gutters) still carries several sections and the nav runs wider at `max-w-[1440px]`. Sections are chapters — `.section-y` gives `clamp(88px, 9vw, 150px)` of vertical padding, `.section-y-sm` gives `clamp(64px, 7vw, 110px)` — and each holds one idea.

Inside a section the rhythm is a 4px grid expressed through Tailwind steps, concentrated at 8 / 12 / 16 / 20 (`gap-2`, `gap-3`, `gap-4`, `gap-5`). Card padding is 28–32px on glass panels, 14–20px on compact rows.

Grids are mobile-first and collapse to one or two columns: the protocol bento is `grid-cols-2` on phones and `lg:grid-cols-3` above 1024px, on fixed 108px / 88px auto-rows with dense flow; pricing is `grid-cols-1 md:grid-cols-3`. `scroll-padding-top: 96px` clears the fixed nav, and `overflow-x: clip` (not `hidden`) keeps sticky descendants working.

**The Chapter Rule.** Vertical space is the pacing device. A section that needs a divider line to separate it from the next one has not been given enough padding.

## Elevation & Depth

Hybrid, leaning atmospheric. Depth comes from translucency and light, not from a shadow ramp: a glass panel floats over a pastel mesh field or a photograph, and everything else is flat, separated by 1px ink-alpha hairlines. The five-step `--shadow-xs … --shadow-xl` ramp survives in the tokens but the shipped surfaces use the three values below. Cards are flat at rest; `.apex-card` is the one surface that lifts (−2px) on hover.

### Shadow Vocabulary
- **Glass lift** (`box-shadow: 0 1px 0 rgba(255,255,255,1) inset, 0 20px 50px rgba(15,23,42,0.10)`): the resting state of `.glass-card`. A lit top rim plus a wide, very soft throw.
- **Accent throw** (`box-shadow: 0 4px 16px rgba(72,144,247,0.32), inset 0 1px 0 rgba(255,255,255,0.15)`): under the primary button only, so the one action on a screen reads as lit. Deepens to `0 8px 32px rgba(72,144,247,0.48)` on hover.
- **Card hover** (`box-shadow: 0 8px 32px var(--shadow-card)`): the flat card's response to the cursor. Never present at rest.

### Named Rules

**The Lit-Not-Raised Rule.** Surfaces get depth from translucency and a lit edge, not from a stack of shadows. There are three shadow values in the shipped system, and that is the whole vocabulary — a fourth needs a reason no hairline or blur can satisfy.

**The Glass-Needs-A-Field Rule.** `.glass-card` only makes sense over something: a `.mesh` gradient, a photograph, or a tinted band. Frosted white on flat white is a blur with nothing to blur.

## Shapes

Softly curved rectangles throughout, with no sharp corners on any interactive surface. Four radii carry the system: 10px on small inline marks and the skip link, 12px on buttons, inputs and the flat card (`rounded-xl`, the dominant step at 82 occurrences), 16px on panels and thumbnails (`rounded-2xl`, 57), and 28px on the glass card. Pills (`rounded-full`, 175 occurrences) carry chips, avatars, icon bubbles, the nav CTA and `.btn-pill`.

Borders are always 1px (1.5px on outline controls) and always ink-alpha or accent-alpha — never a solid grey line. Icon containers are circles; photography is clipped by the container radius with `overflow-hidden` and faded into the surface with a white gradient. Horizontal rules, where they exist, are 1px gradients that fade at both ends (`.glow-rule`), never a full-width grey line.

**The Hairline-Not-Box Rule.** Structure is drawn with radius and 1px ink-alpha rules, never with a heavy outline or a filled grey chrome.

## Components

### Buttons
- **Shape:** 12px radius on the four rectangular variants; `.btn-pill` is fully rounded with a 36px circle on its trailing edge.
- **Primary:** a 135° gradient from Apex Blue to Gradient End, white 13px/600 label, 14×32px padding, accent throw shadow. Hover lifts 1px and deepens the glow. Exactly one per view.
- **Outline:** accent at 6% fill, 1.5px accent border at 28%, Apex Blue label. Hover solidifies the border to full blue.
- **White:** solid white with Gradient End text — reserved for placement over photography or a saturated panel.
- **Ghost (frosted):** `rgba(255,255,255,0.72)` with a 10px backdrop blur and a near-white rim. Licensed over imagery and mesh fields; on flat white it is a no-op.
- **Pill:** the quiet, wide-tracked CTA — 11px/700 uppercase in Deep Link Blue on a 7% accent wash, with a solid blue circle carrying the arrow. Hover deepens the wash to 12%.

### Cards / Containers
- **Glass card (primary):** `rgba(255,255,255,0.72)` with `blur(18px) saturate(1.3)`, a 1px `rgba(255,255,255,0.95)` rim, 28px radius, 28–32px internal padding, glass lift shadow. 25 occurrences; this is the default content container.
- **Flat card:** porcelain fill, 12px radius, 1px hairline, 20–24px padding; border shifts toward accent at 30% and the card lifts 2px on hover.
- **Discipline:** glass over a field, flat card everywhere else. A third vocabulary (glass card with an inline radius override, as in the pricing quick-links at 20px) is drift — use the token radius.

### Navigation
- Fixed bar, 70px on mobile and 88px on desktop, inside a 1440px row with 20/40px gutters. Transparent over the hero; on scroll it fills to `nav-glass` (then `nav-glass-scrolled`) with a 20px backdrop blur and a hairline base that strengthens. Mobile is a full-screen overlay with 22px/600 links on hairline rows and 44×44px minimum touch targets.
- The nav's own CTA is a pill with a 1.5px accent border at 35%, filling to an 8% accent wash on hover.

### The Bento (signature)
`ProtocolBento` is the site's one non-linear grid: nine protocol cards on fixed rows, two open at rest on desktop, the card under the cursor opening while the others fold to compact rows; phones get one open card and a tap-to-open, tap-again-to-navigate contract. Compact cards drift (`float-a/b/c`), the open card tilts toward the cursor, and everything collapses to a static grid under `prefers-reduced-motion`. A bento is licensed *here*, as an index of parallel options; it is not a general layout device for prose sections.

### The Mesh Field (signature)
Three pastel radial gradients (sage, sky, peach) over porcelain, with rose and blue variants. It is the ground that makes glass legible, always full-bleed behind a section, never a card fill.

### Motion (applies across components)
- Framer Motion plus CSS. Scroll reveals: opacity 0→1 with 14–28px of rise, 0.6–0.9s, expo-out `[0.22, 1, 0.36, 1]`; `.blur-in` adds a 10px defocus that resolves on arrival.
- Ambient loops are slow and small: 7–9s float, 9s breathe, 24s hero drift, 48s ticker, 2.6s hotspot pulse.
- `MotionConfig reducedMotion="user"` plus a global `prefers-reduced-motion` block; every ambient animation has an explicit `animation: none` branch.
- 150–250ms for state feedback. No bounce, no elastic, no time-driven autoplay.

## Regulatory Constraints

These are not style preferences. They come from `~/Projects/studio/playbooks/ghl-healthcare-au/PLAYBOOK.md`, which encodes the AHPRA, TGA and Privacy Act rules this clinic builds under, and they match the constraints recorded in the portal's DESIGN.md. A design that breaks one of these is wrong however good it looks.

- **No testimonials about clinical care.** AHPRA prohibits them in advertising a regulated health service. A disclaimer does not cure a testimonial. Star ratings and review widgets count.
- **No before-and-after** imagery, and nothing that creates an unreasonable expectation of benefit.
- **Never imply a clinical outcome.** Mock dashboards, sample reports and score trends must show the *layout*, never a result improving. A fabricated score going up is a different object from a fabricated score.
- **Don't name prescription-only medicines** in marketing surfaces (TGA). Naming a hormone or analyte as something *measured* on a pathology panel is not the same thing and is fine.
- **No clinical data in the CRM.** GHL holds identity, contact preference, booking and stage only. Symptoms, results, prescriptions and intake answers live in the portal. Integrations send events and IDs, never form contents.
- **Consent copy** must state its purpose, link the Privacy Policy, and ask patients not to include medical details in free-text fields.
- **Booking forms** collect first name, last name, email and mobile. No clinical free text; warn if a Notes field must exist.
- **Telehealth consult copy** must say how the call happens, that it may come from a private number, and to be somewhere private.

## Do's and Don'ts

### Do:
- **Do** take colour from `styles/tokens.css` and use `--color-accent-fg` (`#1d4ed8`) for every small blue string; `#4890f7` is for fills, icons, borders and large type.
- **Do** set prices, step counters and any actionable number in `.t-figure`, and keep `.t-readout` for atmosphere numerals.
- **Do** put `.glass-card` over a `.mesh` field or a photograph, and use the flat porcelain card everywhere else.
- **Do** give a section one idea and `clamp(88px, 9vw, 150px)` of air around it.
- **Do** pair every trust claim with the third party that could refute it. `components/DoctorCard.tsx` is the reference pattern: a verification ledger where each row links to the regulator or registry that confirms it (AHPRA, NATA, ABN), and a `REVIEWS_LIVE = false` gate that keeps the reviews row dormant until the Google Business Profile genuinely holds 10+ reviews. No proof surface ships ahead of its proof.
- **Do** ship a `prefers-reduced-motion` branch with every animation, ambient loops included.
- **Do** keep hero and section imagery to the clinical process — pathology, consult, protocol — never the outcome.
- **Do** compress raster imagery before it ships: a single page-level PNG belongs under ~300KB, and anything over 1MB needs a reason no `next/image` treatment can remove.

### Don't:
- **Don't** reintroduce a dark canvas, a dark theme block, or a theme toggle. The site is white only (`app/globals.css`); the dark tokens still sitting in `styles/tokens.css` are dead weight, not an option.
- **Don't** set small text in raw `#4890f7`. It measures 3.18:1 on white and fails AA; that rule was closed on 2026-09-18 and does not get reopened.
- **Don't** put a `.t-eyebrow` above every section (The Kicker Budget Rule), or format credentials as a stat bar — AHPRA registration is a sentence, not a metric.
- **Don't** ship visible text below 12px. `.t-mono` at 10.5px is the only licensed exception, and it may never carry information that appears nowhere else.
- **Don't** put a disclaimer, a consent line or any compliance copy in micro-type. If it is small enough to be missed, it is not a disclosure.
- **Don't** imply a clinical outcome anywhere in a mock surface: a sample dashboard shows the layout, never a number going up.
- **Don't** add a fourth container vocabulary or a fourth shadow. Glass card, flat card, hairline — that is the whole set.
- **Don't** hard-code hex values in components, or dim text past Ink Subtle (`#4b5563`).
- **Don't** use a bento outside `ProtocolBento`'s job (an index of parallel choices), and don't extend `.mesh` to a new surface without checking it against PRODUCT.md's SaaS-dashboard anti-reference.

### Recorded debt (not house style)

These are conditions the build currently carries. They are documented here so nobody mistakes them for rules to copy.

- **Sub-12px type at scale.** 123 visible elements render below 12px, including 9px and 8px uppercase brand micro-labels; the smallest string in the build is a 7px uppercase label in `app/order-bloods/BgtOrderPage.tsx`. The Twelve-Pixel Floor is the rule; these are violations of it.
- **Kicker density.** 12 `.t-eyebrow` instances ship, 7 of them on the homepage (`Intro`, `Pathway`, `PortalPeek`, `ReportPreview`, `PanelMarkers`, `Pricing`, `Values`). The Kicker Budget Rule allows three per page.
- **Asset weight.** `public/` totals 15MB. Three unoptimised PNGs — `img-injury-repair.png` (2.5MB), `img-skin-regeneration.png` (2.4MB), `img-hair-restoration.png` (2.2MB) — are roughly half of it.
- **Outcome implication in a mock surface — FIXED 2026-09-18.** `components/home/PortalPeek.tsx` captioned its mock score "Up 6 since June": a fabricated result improving, which the Regulatory Constraints section prohibits. Now reads "Trended per retest". Kept here as the worked example of the rule, because this is the easiest constraint to breach by accident — a mock may show the layout, never a win.
- **Colour drift.** Three inks ship (`#111827` in tokens, `#0f172a` in `.band-light`, `#0a0e1a` as Tailwind `primary`), plus two tinted surfaces (`#f5f7fa`, `#f8f9ff`) and unused `secondary`/`muted` Tailwind keys. The token values are the system; the rest are drift.
- **Dead dark tokens.** `styles/tokens.css` still ships a full `[data-theme="dark"]` block and a `prefers-color-scheme: dark` mirror on a white-only site.
- **PRODUCT.md conflict.** PRODUCT.md design principle 4 still forbids glassmorphism and bento grids, and the 2026-07-09 decision confined pricing to `/pricing`. The build ships all three, confirmed by the owner as the system. PRODUCT.md is the file that needs reconciling, not the build.
