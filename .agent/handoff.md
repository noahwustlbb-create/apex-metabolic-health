# Handoff

M1 is done. Start a **new chat** for M2. Do not continue this one.

## What exists

- Harness in `.agent/`. Cursor is the engine. No hub, no SQLite, no second OS.
- CTA map: `.agent/artifacts/cta-map.md`
- Verifier: `node .agent/evals/verify.mjs` (20 checks, green)

## What the map showed

The site already has the right door: **26 files** hit portal signup. The maze is still open:

- `/start` in Nav, Footer, Hero-adjacent chrome
- `/intake/*` still linked from book pages, CTASection, CTABanner, hormone form, pre-screen, repeat-order
- `/signup` on confirmation
- portal `/assessment` and portal `/intake` from the hormone form
- one leftover `apexmetabolic.com.au/get-started` in `app/api/quiz-confirmation/route.ts`

## Next action (M2 / T2)

In `Nav`, `HeroStartModal`, `CTASection`, `Footer`, `FloatingCTA`, `CTABanner`: only portal signup, portal login, or `/start`. Grep those files for `/intake/` and expect nothing.

Do not add a route. Do not open Fourth Qtr.

## Blocked

- Noah has not filled `.cursor/YOU.md` Active rules.
- Portal is not in this repo.

## Command to resume

```
node .agent/evals/inventory-ctas.mjs
node .agent/evals/verify.mjs
```
