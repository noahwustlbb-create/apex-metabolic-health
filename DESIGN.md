---
name: Apex Metabolic Health
description: Doctor-led hormone and metabolic telehealth for Australian adults 18–80 — quiet clinical authority, dark by default.
colors:
  accent-blue: "#4890f7"
  accent-blue-deep: "#1d4fd8"
  accent-blue-bright: "#60a5fa"
  accent-blue-link-light: "#1d4ed8"
  canvas-night: "#0e1117"
  surface-night: "#171e2e"
  surface-raised-night: "#1e2640"
  surface-overlay-night: "#242d44"
  ink-night: "#e8eef5"
  slate-muted-night: "#94a3b8"
  slate-subtle-night: "#868b91"
  canvas-day: "#f9fafb"
  surface-day: "#ffffff"
  ink-day: "#111827"
  slate-muted-day: "#374151"
  slate-subtle-day: "#4b5563"
  success-night: "#34d399"
  warning-night: "#fbbf24"
  danger-night: "#f87171"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    letterSpacing: "0.22em"
rounded:
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  gutter: "24px"
  gutter-wide: "40px"
  section-y: "96px"
  section-y-lg: "160px"
components:
  button-primary:
    backgroundColor: "{colors.accent-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  button-outline:
    backgroundColor: "#4890f70f"
    textColor: "{colors.accent-blue}"
    rounded: "{rounded.md}"
    padding: "14px 32px"
  card:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.md}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface-night}"
    textColor: "{colors.ink-night}"
    rounded: "{rounded.md}"
    padding: "14px 20px"
---

# Design System: Apex Metabolic Health

## 1. Overview

**Creative North Star: "Quiet Authority"**

The site is the waiting room of a specialist who doesn't need to convince you. Dark by default — a deep blue-black night canvas (#0e1117), not a trend but a register: premium, clinical, unhurried. Serves men and women, 18–80. A single blue accent carries every interactive signal. Nothing pulses for attention; the patient controls the pacing, and the scroll earns the trust. The visual system explicitly rejects supplement-brand energy (Biov8), startup gloss (Hormn), corporate safety (Everlab), and the default AI-designed healthcare template.

The theme system is real, not cosmetic: a three-layer token architecture (`styles/tokens.css` — primitives → semantics → themes) drives both a dark default (`data-theme="dark"`, also the OS-preference fallback) and a full light theme behind the nav toggle. Every foreground token is contrast-verified ≥ 4.5:1 against its paired canvas in **both** themes; the ratios are documented inline in the token file, which is the single source of truth. Layout is mobile-first (`max-w-6xl` container, 24px gutters), with generous vertical sections (96–160px) that give each screen one idea.

**Key Characteristics:**
- Dark-first, dual-theme, token-driven — components never hard-code color
- One accent (blue #4890f7); status colors exist only as semantic states
- Motion is scroll-driven and restrained (Framer Motion, expo-out easing, `reducedMotion` honored)
- Clinical process imagery only — never outcome imagery

## 2. Colors

A mono-accent system on a blue-black night canvas, with a mirrored light theme.

### Primary
- **Apex Blue** (#4890f7): the only voice in the room. Interactive elements, focus rings, icons, solid CTAs, the eyebrow label. As body-text-sized link color it steps to **Bright Blue** (#60a5fa, 6.8:1) on dark and **Deep Link Blue** (#1d4ed8, 5.9:1) on light — never raw #4890f7 for small text.
- **Deep Blue** (#1d4fd8): gradient end of the primary button, hover states.

### Neutral
- **Night Canvas** (#0e1117): the default page background. Deepest layer.
- **Night Surface** (#171e2e) / **Raised** (#1e2640) / **Overlay** (#242d44): the dark elevation ramp — cards, popovers, modals, in that order.
- **Night Ink** (#e8eef5, 14.9:1): primary text on dark. **Muted Slate** (#94a3b8, 7.1:1) secondary; **Subtle Slate** (#868b91, 5.0:1) captions — the AA floor, nothing dimmer for text.
- **Day Canvas** (#f9fafb) / **Day Surface** (#ffffff) / **Day Ink** (#111827, 17.4:1) with muted #374151 and subtle #4b5563: the light theme mirror.
- Borders are alpha, not hex: rgba(255,255,255,0.10) on dark, rgba(0,0,0,0.10) on light.

### Tertiary (status only)
- **Success Green** (#34d399 dark / #047857 light), **Warning Amber** (#fbbf24 / #92400e), **Danger Red** (#f87171 / #b91c1c): semantic states exclusively — form validation, alerts, eligibility flags. Never decoration, never category color-coding.

### Named Rules
**The Mono-Blue Rule.** One accent. If a section needs a second color to feel designed, the section is wrong, not the palette. Status colors appear only when something *is* a status.

**The Token Rule.** Components consume semantic tokens (`--color-*` or the legacy `--bg`/`--surface`/`--text-*` aliases) — never raw hex. `styles/tokens.css` is the only file where a color value may be born. Both themes must pass AA before a token ships.

## 3. Typography

**Display Font:** Space Grotesk (with system-ui fallback) — display headings, stat numerals, brand wordmark only
**Body Font:** Inter (with system-ui fallback) — everything else. Locked; do not suggest alternatives.

**Character:** Inter carries the clinical calm; Space Grotesk supplies the technical edge in numerals and hero moments. The pairing is engineered, not decorative — a lab report, not a lifestyle magazine.

### Hierarchy
- **Display** (Space Grotesk 700, clamp to 6rem ceiling, lh 1.05, -0.03em): hero headlines and brand numerals. Never exceeds 96px.
- **Headline** (Inter 800, clamp, lh 1.04, -0.04em — the floor, no tighter): section headings via the `display-serif` utility.
- **Title** (Inter 600, 18px, -0.01em): card and subsection headings.
- **Body** (Inter 400, 16px, lh 1.6, max 65–75ch): prose. `text-wrap: balance` on h1–h3, `pretty` on prose.
- **Label** (Inter 600, 10px, 0.22em tracking, uppercase, Apex Blue): the `.label` eyebrow — a scarce brand kicker, not section grammar.

### Named Rules
**The One-Kicker Rule.** At most one `.label` eyebrow per viewport of scroll. An eyebrow above every section heading is prohibited AI scaffolding.

## 4. Elevation

A dual system keyed to theme. In light theme, depth is cast: a five-step shadow ramp from whisper (`--shadow-xs`) to modal (`--shadow-xl`). In dark theme, depth is *tonal first* — surfaces step up the night ramp (#0e1117 → #171e2e → #1e2640 → #242d44) — with the same shadow ramp darkened to hold silhouettes. Cards sit flat at rest; shadow and a 2px lift appear only on hover.

### Shadow Vocabulary
- **Card rest → hover** (`--shadow-md`: 0 4px 12px rgba(0,0,0,0.08/0.45) + minor): the default elevation response.
- **Popover** (`--shadow-lg`), **Modal** (`--shadow-xl`): reserved for true overlays.
- **CTA glow** (0 4px 16px rgba(72,144,247,0.32)): the primary button's blue-tinted shadow — the one place shadow carries brand color.

### Named Rules
**The Flat-At-Rest Rule.** Surfaces are flat until the user acts. Elevation is feedback, not decoration.

## 5. Components

### Buttons
- **Shape:** softly squared (12px radius), 14×32px padding, 13px/600 Inter, subtle inset highlight.
- **Primary:** blue gradient (135deg, #4890f7 → #1d4fd8), white text, blue-tinted shadow. Hover: −1px lift, deeper glow.
- **Outline:** blue-tinted ghost (rgba(72,144,247,0.06) bg, 1.5px rgba(72,144,247,0.28) border, blue text). Hover: border solidifies to full blue.
- **White:** solid white with deep-blue text — reserved for placement over photography or saturated panels.
- **Ghost (frosted):** rgba(255,255,255,0.72) + 10px backdrop blur — *only* over imagery, never on flat canvas (see Don'ts).

### Cards / Containers
- **Corner Style:** 12px
- **Background:** `--card-bg` (Night Surface / Day Surface)
- **Border:** 1px `--border`; hover shifts toward accent (rgba(72,144,247,0.3))
- **Shadow Strategy:** flat at rest; `--shadow-card` + translateY(-2px) on hover, 250–300ms ease
- **Internal Padding:** 24px

### Inputs / Fields
- **Style:** `--input-bg` surface, 1px `--border`, 12–16px radius, 14×20px padding
- **Focus:** border shifts to `--state-focus-ring` (blue; bright blue on dark), visible ring — never `outline: none` without replacement
- **Error:** `--color-danger-fg` text + `--color-danger-border`; message adjacent to field

### Navigation
- Fixed translucent bar: 70px mobile / 88px desktop, `--nav-bg` (rgba canvas at 0.92 → 0.98 scrolled) with backdrop blur, 1px bottom border that strengthens on scroll. Mobile: full-screen overlay menu, 44×44px minimum touch targets. Includes the theme toggle.

### Motion (applies across components)
- Framer Motion v11. Scroll reveals: opacity 0→1, y 28px→0, 650ms, expo-out `[0.22, 1, 0.36, 1]` via the shared `FadeUp` component; stagger 70–80ms inside lists only.
- `MotionConfig reducedMotion="user"` at the app root plus the global CSS `prefers-reduced-motion` block: every animation collapses to instant final state.
- 150–250ms for state feedback; no bounce, no elastic, no time-driven autoplay sequences.

## 6. Do's and Don'ts

### Do:
- **Do** source every color from `styles/tokens.css` semantic tokens and verify AA in both themes before shipping a new one.
- **Do** keep one idea per screen — 96–160px section padding is the pacing device, per PRODUCT.md's "scroll earns trust."
- **Do** show the clinical *process* (pathology → consult → protocol) in imagery and motion; the process is the proof.
- **Do** design mobile-first; desktop is the scale-up, not the other way around.
- **Do** confine pricing to the dedicated /pricing and /membership pages and booking/intake flows (decision 2026-07-09).

### Don't:
- **Don't** ship supplement-brand energy or loud CTAs — the **Biov8** failure mode; nor startup gloss (**Hormn**), corporate-safe blandness (**Everlab**), or the "generic Framer/shadcn wellness template" look. These are PRODUCT.md's named anti-references.
- **Don't** use gradient text (`background-clip: text`), side-stripe accent borders, bento grids, or glassmorphism on flat canvas — `btn-ghost`'s frosted treatment is licensed for photography overlays only.
- **Don't** put an eyebrow label above every section (The One-Kicker Rule), or format credentials as a stat bar — AHPRA registration is a sentence, not a metric.
- **Don't** imply clinical outcomes: no before/after visuals, no guaranteed-result language, no imagery that promises a body. Compliance is a design principle here, not a footer.
- **Don't** hard-code hex values in components, dim text below the documented AA floors (#868b91 dark / #4b5563 light), or animate without a reduced-motion path.
- **Don't** name specific medications or compounds anywhere on the site.
