---
target: apex-metabolic-health/app/page.tsx
total_score: 22
p0_count: 2
p1_count: 2
timestamp: 2026-07-09T22-01-40Z
slug: apex-metabolic-health-app-page-tsx
---
# Design Critique — Apex Homepage (app/page.tsx)

Method: dual-agent (A: design review · B: detector evidence). Browser overlay skipped (no dev server).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 7-card carousel has no position indicator; external handoffs give no "leaving site" signal |
| 2 | Match System / Real World | 3 | AHPRA, TGA, compounding pharmacy, HPI-I unexplained on first use |
| 3 | User Control and Freedom | 2 | "Get Started" opens unannounced modal; external jumps lose back-context |
| 4 | Consistency and Standards | 1 | Same label → two destinations; four entry paths; three h2 systems; two easings |
| 5 | Error Prevention | 3 | No on-page forms; external assessment before seeing what it involves |
| 6 | Recognition Rather Than Recall | 3 | Four differently-worded CTAs for one journey |
| 7 | Flexibility and Efficiency | 3 | Good shortcuts: dropdown, program chips, Calendly |
| 8 | Aesthetic and Minimalist Design | 2 | FindTreatmentCard duplicates TreatmentSelector; StatsBar is filler |
| 9 | Error Recovery | n/a | No forms on homepage |
| 10 | Help and Documentation | 3 | FAQ strong; footer emergency block right for healthcare |
| **Total** | | **22/36** | **Acceptable — consistency (1/4) drags it down** |

## Anti-Patterns Verdict

No longer a 15-second tell — a 30–45 second one. Avoided: eyebrows, gradient text, icon-card grids (WhyApex editorial rows are the strongest anti-slop move). Remaining tells: blue-span ending on all 7 headlines (section grammar); StatsBar is the prohibited credentials-as-metrics pattern ("100%" fake stat, "4,000+ centres" is Sonic Healthcare's network); wall-to-wall Unsplash incl. same photo twice (FindTreatmentCard.tsx:30 = HowItWorks.tsx:28); TreatmentSelector's six hue-tinted card blacks vs Mono-Blue Rule.

Detector: 20 findings, 19 REAL, 1 false positive (photo scrim). Convergent load-bearing finding: hard-coded colors breaking dark theme — #6b7280 text (StatsBar:48, TreatmentSelector:144/294, CTASection:143/157), 0.07 black-alpha borders (CTASection:25), emergency "000" in #111827 on dark canvas (Footer.tsx:203). Recurring undocumented #04060d near-black in 5 places; CTA gradient ends #2563eb vs documented #1d4fd8. PRODUCT.md's banned section order: 7 of 9 ingredients survive, reshuffled.

## Priority Issues

- **[P0] Dark-theme legibility failures incl. emergency number.** Footer.tsx:203 "000" in #111827 on #0e1117; #6b7280 text and 0.07 borders across StatsBar/TreatmentSelector/CTASection. Fix: sweep ~12 literals to var(--text-secondary)/var(--border). → /impeccable harden
- **[P0] "Testosterone" named on hormone card (TreatmentSelector.tsx:17).** Schedule 4 compound vs "never name medications" rule. Fix: legal review; interim symptom language. → /impeccable clarify
- **[P1] Conversion path chaos.** Four labels, five destinations; same label "Not sure? Take the assessment" → /start (Nav.tsx:194) vs external app (TreatmentSelector.tsx:142); program cards → /programs/* vs CTA chips → external intake; Footer Get Started → /book. Fix: one canonical verb + route (/start) everywhere. → /impeccable distill
- **[P1] Pricing absent from desktop nav (Nav.tsx:15-19).** Hidden price = sales-funnel smell for a comparing skeptic; pricing is public by decision 2026-07-09. Fix: add Pricing to DESKTOP_LINKS. → /impeccable clarify
- **[P2] Cut/merge FindTreatmentCard + StatsBar.** Duplicate idea in wellness voice over duplicated photo (no reduced-motion guard); named anti-pattern stat bar. Fix: delete FindTreatmentCard, retire StatsBar into HowItWorks captions. → /impeccable distill

## Persona Red Flags

- Jordan: four CTA wordings for one journey; "compounding pharmacy" fear-framing; no visible pricing path on desktop.
- Riley: three irreconcilable timelines (<48h vs same-day vs 24–48h); footer Get Started → /book; duplicate photo; "doctors" plural, one doctor shown as initials.
- Casey: mobile Get Started ~31px tall (spec floor 44px; hamburger complies); 7-card mandatory-snap carousel, no indicator.
- Dave (46, Perth, 3 tabs): wins 0–10s (headline, AHPRA number, LegitScript); loses 10–30s (no nav pricing, doctor as initials, recognizable Unsplash, zero third-party proof since testimonials removed).

## Minor Observations

- Three h2 systems; Space Grotesk leaks into FAQ questions/CTA button, absent from hero (the licensed spot).
- Hero easing differs from all other sections; shared FadeUp unused.
- Hero secondary CTA is "Log in" — returning-user action in new-visitor slot.
- TreatmentSelector.tsx:78 Unsplash ID looks invalid — verify.
- Nav dropdown role="menu" without arrow-key traversal.
- Detector gap: numeric borderRadius:14 literals evade the radius rule (CTASection.tsx:81).

## Questions to Consider

1. Testimonials removed — what replaced their trust function? What can a skeptic audit?
2. Every headline ends blue, every element fades up 24px — restraint or a quieter template? What's the scarcity rule for rhetorical/motion devices?
3. If the page kept one sentence and one button, which are they?
