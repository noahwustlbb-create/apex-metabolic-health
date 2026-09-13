# Implementation contract

## Mission

Wrap Cursor with a file-based harness so Apex work survives a new chat. Expand later. Do not demo-build a general computer OS in a clinic marketing repo.

## Runtime profile

- Host: Cursor (cloud or local). Strong coding agent already exists.
- Mode: harness-wrapper. Cursor is the replaceable engine.
- State: markdown in `.agent/`. Chat is disposable.
- First domain: this site. Not Fourth Qtr. Not a portfolio control plane.

## First milestone

Closed loop on a real job:

1. Accept goal: map the funnel maze.
2. Decompose into tasks in `.agent/tasks.md`.
3. Execute: generate `.agent/artifacts/cta-map.md`.
4. Verify: `.agent/evals/verify.mjs` exits 0.
5. Record: update queues, decisions, handoff.
6. Learn: one eval (the verifier) plus one next job queued.

## Non-goals for v1

SQLite, WebSockets, worker daemons, browser/desktop platform, science OS, multi-company UI, copying leaked vendor prompts, installing OpenClaw or Gas Town.

## Safety

AHPRA/TGA copy rules in `.cursor/rules/compliance.mdc`. No side effects outside this repo. No deploys. No emails.

## Proof metrics

- Verifier pass (pass@1 on this machine)
- CTA destinations counted from source, not guessed
- Next three milestones written before the run ends

## Verification

`node .agent/evals/verify.mjs`
