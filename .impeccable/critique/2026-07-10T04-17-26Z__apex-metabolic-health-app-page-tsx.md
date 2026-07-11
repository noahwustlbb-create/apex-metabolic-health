---
target: apex-metabolic-health/app/page.tsx
total_score: 23
p0_count: 2
p1_count: 2
timestamp: 2026-07-10T04-17-26Z
slug: apex-metabolic-health-app-page-tsx
---
# Design Critique — Apex Homepage (re-run)

Method: dual-agent (A: design review · B: detector + rendered-page evidence). Browser overlay skipped (no automation; rendered-HTML checks used).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of Status | 3 | Ledger destination microcopy best-in-class; Calendly/portal handoffs ignore it; carousel thumb geometry hardcoded |
| 2 | Real-World Match | 3 | Raw MED0001201298 unglossed; "Accredited pathology" clinic-speak |
| 3 | User Control | 2 | GetStartedModal: no role=dialog/focus trap/Escape/scroll lock; carousel no prev/next |
| 4 | Consistency | 2 | canonical-programs.ts structural fix; footer twin "Start your assessment" survives |
| 5 | Error Prevention | 2 | /contact 404 from FAQ escape hatch (verified) |
| 6 | Recognition vs Recall | 3 | 30 MIN (modal) vs 45–60 MIN (HowItWorks) consult contradiction |
| 7 | Flexibility | 3 | Three entry paths; keyboard dropdown |
| 8 | Minimalist | 3 | 9-option close; one argument ×6; 11 stock photos |
| 9 | Error Recovery | n/a | No homepage forms |
| 10 | Help/Docs | 2 | Excellent FAQ, broken exit |
| **Total** | **23/36** | (was 22) |

## Anti-Patterns Verdict
15s test PASS (first time). Detector: 1 finding, the verified scrim false positive (was 20). Rendered checks clean; AHPRA/LegitScript URLs 200. Residual tells: 11 Unsplash images across two back-to-back uniform photo-card grids; interpunct-triad formula ×10+; banned section-order spine (cards→steps→doctor→FAQ) denoised not restructured. GetStartedModal ships a third blue-span headline.

## Priority Issues
- **[P0] /contact 404** — FAQSection.tsx:147 "Still have questions?" dead-ends. Fix: mailto or minimal /contact. → clarify
- **[P0] Footer twin labels** — "Start your assessment" link→/start (Footer.tsx:13) vs same-label button→signup modal (Footer.tsx:167). Fix: button→/start. → clarify
- **[P1] Two funnels, three verbs** — Get Started→modal→account-first vs /start assessment; modal timings (30 MIN, 45 MIN) contradict HowItWorks (45–60 MIN, <48H); account-gate before pricing = "sold-to". Fix: Get Started→/start or themed consistent pre-flight. → distill
- **[P1] CTA close = 9-option wall** — primary + 7 duplicate chips + Calendly. End on one verb. → distill
- **[P2] HowItWorks captions below AA** — 11px rgba(255,255,255,0.5) on photos, mobile 2-up; stock-texture reduction pending shoot. → harden

## Persona Red Flags
- Riley: /contact 404; footer twins; 30 vs 45–60 MIN; crossed verbs (/start page titled "Find My Treatment"; hero "Find your treatment"→anchor); mobile nav has NO program links (flat /services vs desktop 7-program dropdown); 45 MIN vs <48H unit switch.
- Casey: 44px targets pass; dark→white modal flash worst mobile moment.
- Dave: screen 1 wins; Register closes IF ahpra ?q= prefills — unverified in real browser; no human face anywhere; recognizable stock.

## Minor Observations
Space Grotesk creep (FAQ questions, GetStartedModal body); btn gradient hardcoded ×6 despite .btn-primary; card glow at rest (Flat-At-Rest breach); footer badge chips; six h2 clamp recipes; argument repeated six times (two near-verbatim).

## Questions
1. Which funnel is the business betting on — assessment-first or account-first?
2. What's the brand's second idea?
3. Who clicks the Register links from a clean browser weekly?
