# CLAUDE.md — Apex Metabolic Health

## Project Overview

Next.js 14 website for **Apex Metabolic Health** — a Brisbane-based doctor-led men's telehealth
clinic. Single-page scroll site with section-based navigation. No routing. No CMS. No backend.

Deploy target: Vercel or Netlify. All content is hardcoded in components.

---

## Tech Stack

| Layer      | Tech                                      |
|------------|-------------------------------------------|
| Framework  | Next.js 14 (App Router)                   |
| Language   | TypeScript                                |
| Styling    | Tailwind CSS v3 + CSS custom properties   |
| Animation  | Framer Motion v11                         |
| Icons      | lucide-react + inline SVGs                |
| Fonts      | Google Fonts via next/font (Inter, Space Grotesk) |
| Deploy     | Static export / Vercel                    |

**Never introduce additional libraries** without asking first. Keep the bundle lean.

---

## File Structure

```
app/
  layout.tsx          ← HTML shell, font variables, metadata, global CSS import
  page.tsx            ← Page composition — imports and orders all sections
  globals.css         ← CSS variables, Tailwind layers, utility classes, animations

components/
  Nav.tsx             ← Fixed header, desktop nav, mobile drawer, scroll logic
  Hero.tsx            ← Full-viewport hero, particle canvas, stat strip, CTAs
  ProblemSection.tsx  ← Pain-point section (id="problem")
  HowItWorks.tsx      ← 3-step process section (id="how-it-works")
  ProgramsGrid.tsx    ← 8-program card grid (id="programs")
  WhyApex.tsx         ← Differentiators section (id="why-apex")
  StatsBar.tsx        ← Stats/social proof bar
  CTASection.tsx      ← Final CTA / booking section (id="cta")
  Footer.tsx          ← Footer links and legal copy
  FadeUp.tsx          ← Reusable fade-up animation wrapper
  FloatingContact.tsx ← Floating contact widget (not currently in page.tsx)
  CTABanner.tsx       ← Inline CTA banner component (id="book-consultation")
  Testimonials.tsx    ← Testimonials component (not currently in page.tsx)
  Programs.tsx        ← Alternate programs component (not currently in page.tsx)
  TheProblem.tsx      ← Alternate problem component (not currently in page.tsx)
```

### Active page composition (page.tsx order)
```
Nav → Hero → ProblemSection → HowItWorks → ProgramsGrid → WhyApex → StatsBar → CTASection → Footer
```

---

## Design System

### CSS Custom Properties (globals.css :root)

```css
--bg:             #070a0d    /* page background — near-black navy */
--surface:        #0d1117    /* raised surface — cards, sections */
--elevated:       #111820    /* elevated elements */
--border:         #1e2d3d    /* all borders */
--teal:           #00c2b8    /* PRIMARY brand accent — teal */
--teal-glow:      rgba(0, 194, 184, 0.15)
--gold:           #c9a84c    /* secondary accent — use sparingly */
--text-primary:   #f0f4f8    /* headings, key content */
--text-secondary: #8899aa    /* body copy, descriptions */
--text-muted:     #4a5a6a    /* labels, eyebrows, meta */
```

### Font Variables (from next/font, loaded in layout.tsx)
```
--font-inter         → body copy, general text
--font-space-grotesk → headings (h1, h2, h3), stats, brand wordmark
```

### Typography Patterns
- **Eyebrow labels**: `.label` class — `text-xs font-semibold tracking-[0.2em] uppercase`, color `--teal`, font Space Grotesk
- **Section headings**: `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight`, font Space Grotesk, color `--text-primary`
- **Gradient headings**: `<span className="text-teal-gradient">` — teal gradient on key words
- **Body copy**: `text-base md:text-lg leading-relaxed`, color `--text-secondary`
- **Stat numbers**: `.stat-number` class — Space Grotesk, font-weight 700, letter-spacing -0.02em

### Component Patterns
- **Cards**: `.apex-card` — `background: --surface`, `border: 1px solid --border`, `border-radius: 12px`. Hover: border shifts to `--teal`, teal box-shadow, `translateY(-2px)`
- **Section spacing**: `.section-pad` → `py-20 md:py-28 lg:py-32`
- **Container**: `.container-tight` → `mx-auto max-w-6xl px-6 md:px-10`
- **Divider**: `.glow-rule` — 1px gradient line `transparent → --teal → transparent`

### Button Classes (defined in globals.css @layer utilities)

```css
.btn-teal   /* filled teal — primary CTA */
.btn-ghost  /* teal border + teal text, fills teal on hover */
```

Both: `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-sm font-semibold tracking-wide`

### Animations (CSS-only, defined in globals.css)
- `.pulse-ring` / `.pulse-ring-slow` — scale pulse for decorative rings
- `.scroll-drip` — animated scroll indicator drip
- Framer Motion `useInView` — scroll-triggered fade-in on all section content

### Aesthetic Rules
- Dark, clinical, premium — think Bloomberg Terminal meets medical grade
- **Teal (`#00c2b8`) is the only colour pop** — use for accents, borders, icons, CTA fills only
- Gold (`#c9a84c`) is reserved for trust signals / credentials — use sparingly
- `border-radius` on cards: `12px`. On buttons/labels: `rounded-sm` (2px)
- Glow effects: `box-shadow: 0 0 30px rgba(0,194,184,0.4)` on hover states
- All new sections must have a `.glow-rule` divider at the top

---

## Section IDs (for nav scroll targets)

| ID              | Component          |
|-----------------|--------------------|
| `#hero`         | Hero.tsx           |
| `#problem`      | ProblemSection.tsx |
| `#how-it-works` | HowItWorks.tsx     |
| `#programs`     | ProgramsGrid.tsx   |
| `#why-apex`     | WhyApex.tsx        |
| `#cta`          | CTASection.tsx     |

---

## Scroll / Navigation Rules

**Critical — do not break.**

All scroll navigation uses offset-aware `window.scrollTo`, NOT `scrollIntoView`.
The fixed nav is `80px` tall. Every scroll target must account for this offset.

### Correct scroll pattern (use everywhere):
```tsx
const scrollTo = (href: string) => {
  const el = document.querySelector(href)
  if (!el) return
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 80,
    behavior: 'smooth',
  })
}
```

### Why not scrollIntoView:
- Conflicts with Next.js hydration timing
- CSS `scroll-behavior: smooth` has been intentionally removed from `html`
- `scroll-padding-top: 80px` is set on `html` as a fallback for anchor links only

### Nav links (Nav.tsx navLinks array):
```ts
{ label: 'Programs',     href: '#programs'     }
{ label: 'How It Works', href: '#how-it-works' }
{ label: 'Why Apex',     href: '#why-apex'     }
{ label: 'Get Started',  href: '#cta'          }
```

### Mobile menu behaviour:
- Opens: `body.overflow = 'hidden'`, hamburger animates to X via Framer Motion
- Closes: wait `150ms` before firing scroll (allows drawer exit animation to complete)
- `AnimatePresence` wraps the mobile drawer for enter/exit animation

---

## Framer Motion Usage

All components are `'use client'`. Animation pattern across the site:

```tsx
// Scroll-triggered reveal (standard pattern)
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-80px' })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 28 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
>
```

Standard easing: `[0.22, 1, 0.36, 1]` (custom spring-like ease).
Stagger cards: `delay: index * 0.08`.
Hero entrance: `initial={{ opacity: 0, y: 20/30 }}`, `animate` fires immediately (no `isInView`).

---

## Background / Texture Patterns

These repeat throughout sections — copy them exactly:

```tsx
{/* Dot grid */}
<div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />

{/* Glow — top right */}
<div
  aria-hidden="true"
  className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
  style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,194,184,0.06) 0%, transparent 60%)' }}
/>

{/* Glow — bottom center */}
<div
  aria-hidden="true"
  className="absolute inset-0 pointer-events-none"
  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,194,184,0.08) 0%, transparent 60%)' }}
/>

{/* Decorative pulse rings */}
<div
  aria-hidden="true"
  className="pulse-ring absolute rounded-full pointer-events-none"
  style={{ width: 500, height: 500, border: '1px solid rgba(0,194,184,0.07)', top: '50%', left: '50%' }}
/>
```

---

## Programs (ProgramsGrid.tsx)

8 programs hardcoded in `PROGRAMS` array. Each has `icon` (inline SVG), `name`, `description`.

Current programs:
1. Hormone Optimisation
2. Performance & Recovery
3. Metabolic Weight Management
4. Hair Restoration
5. Skin Regeneration
6. Injury Repair & Recovery
7. Comprehensive Blood Panels
8. General Telehealth

Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`

---

## Brand & Compliance Notes

- **Never name specific medications** in marketing copy (TGA compliance). Use "hormone optimisation", "clinical protocols", "doctor-prescribed treatment".
- **Never use patient testimonials** with before/after imagery tied to specific treatments.
- Doctor must be referred to as "AHPRA-registered" — not by name in marketing contexts.
- Company trades as **Apex Metabolic Health** under Imperial Equity Investments Pty Ltd.
- Brand colours: teal `#00c2b8` / deep navy `#070a0d`. No other brand colours exist.

---

## Common Tasks

### Add a new section
1. Create `components/NewSection.tsx` — mark `'use client'` at top
2. Add `id="new-section"` to the outer `<section>` element
3. Import and add to `app/page.tsx` in the correct order
4. Add to `navLinks` in `Nav.tsx` if it needs a nav entry
5. Use `.section-pad` and `.container-tight` for spacing/layout
6. Add `.glow-rule` divider at top of section
7. Wrap animated elements with `useInView` pattern above

### Add a nav link
Edit `navLinks` array in `Nav.tsx`:
```ts
{ label: 'New Label', href: '#new-section' }
```
The `handleNavClick` function handles scroll automatically.

### Change CTA button destination
Search for `#cta` across all components. Buttons in Hero.tsx, Nav.tsx, and CTASection.tsx all target `#cta`.

### Modify programs
Edit the `PROGRAMS` array in `ProgramsGrid.tsx`. Each entry: `{ icon: ReactNode, name: string, description: string }`.
