# Tasks

## T1 — CTA inventory (M1)

- status: done
- skill: repo-scan
- risk: low
- DoD:
  - `.agent/artifacts/cta-map.md` lists destination → files, generated from source
  - `node .agent/evals/verify.mjs` exits 0
  - queues, status, handoff updated
- verify: verifier + file exists and names at least `/start`, portal signup, and one `/intake/` path
- evidence: `.agent/artifacts/cta-map.md`, `.agent/runs/m1.json`

## T2 — Unify chrome CTAs (M2)

- status: pending
- depends: T1
- DoD: `Nav`, `Hero` / `HeroStartModal`, `CTASection`, `Footer`, `FloatingCTA` point only at portal signup, portal login, or `/start`
- verify: ripgrep those files for `/intake/` returns nothing

## T3 — Catalogue (M3)

- status: pending
- depends: T1
- DoD: `app/api/chat/route.ts` program names and booking URLs match `lib/canonical-programs.ts`
- verify: no chat booking URL that 404s on this site’s intended funnel

## T4 — YOU.md

- status: blocked
- owner: Noah
- DoD: `## Active rules` has content
