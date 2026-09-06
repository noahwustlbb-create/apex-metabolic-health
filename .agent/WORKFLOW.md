# Workflow

## Closed loop

1. Read `AGENTS.md` and `.agent/QUEUES.md`.
2. Claim one task from `now` or `next`.
3. Write a Definition of Done on the task before coding.
4. Execute. Leave artifacts in `.agent/artifacts/`.
5. Run `node .agent/evals/verify.mjs` and any task-specific check.
6. Update `tasks.md`, `QUEUES.md`, `status.md`, `handoff.md`.
7. If it failed twice, log it in `FAILURE.md` and add a check. Do not hope.
8. End with a next task. Never finish empty-handed.

## Fixed vs dynamic

- Fixed: compliance, audience, no new intake routes, Inter, one accent.
- Dynamic: how to unify CTAs, what to delete, copy tone.

## Isolation

One agent. One worktree. No parallel editors on the same files.

## Side effects

This repo has no send-email-from-the-harness path. Site mailers stay in `lib/mailer.ts`. Do not add a second one.
