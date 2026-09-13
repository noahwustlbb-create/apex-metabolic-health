# Queues

## now

- M2. Unify chrome CTAs. New chat.

## next

1. Unify public CTAs to portal signup or `/start`. Do not add routes. Start with `Nav`, `CTASection`, `CTABanner`, `Footer`, `FloatingCTA`.
2. Collapse program catalogues. Nav = `lib/canonical-programs.ts`. Stop growing `lib/programs.ts`. Align `app/api/chat/route.ts`.
3. Strip leftover Peptide language on pricing/booking to match the email/chat never-list, or get Noah's explicit override.

## blocked

- `.cursor/YOU.md` Active rules is empty. Noah still owes that.
- Portal app is not in this repo. Cannot verify portal screens.

## improve

- Verifier exists. Next: a check that new `/intake/*` pages cannot land without failing CI.
- Chatbot program list is a fourth catalogue. After M3.

## recurring

- Re-read `.agent/OPERATING.md` at the start of any chat longer than one job.
- After each merge to main: run `node .agent/evals/verify.mjs`.
