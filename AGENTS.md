# Apex Metabolic Health — agent brief

This repo is the **marketing site** for Apex Metabolic Health (`www.apexmetabolichealth.com.au`). Next.js 14 App Router, TypeScript, Tailwind, Framer Motion.

The patient portal is a **different app**: `https://app.apexmetabolichealth.com.au`. Do not invent portal pages in this repo.

Operator: **Noah (ndub)**. Australian founder. Multiple businesses. This chat is Apex only.

## The loop (read this before doing anything)

A prompt asks for output. A loop finishes a job.

1. **Trigger** — the user names one job. If they name two, do the first and stop.
2. **Outcome** — a shipped, verified change. Not a plan. Not three options. Not a new idea.
3. **Context** — this file, plus the matching `.cursor/rules/*` file. Read `PRODUCT.md` / `DESIGN.md` only when the job is copy or visual. Read `.cursor/YOU.md` only if the `## Active rules` section has real content.
4. **Verify** — the change does what it claims. Forms submit. Links resolve. Both themes still pass. No new medication names, outcome claims, or intake routes.
5. **Stop** — outcome met, or a decision only Noah can make. Do not start the next idea.

Do not load `.claude/skills/impeccable` unless the user asks for design critique, polish, or live edit.

## One chat, one job

Noah's last five weeks of Claude Code usage were 94% cache reads from 1,600-turn sessions. That made the model worse and the work slower.

- New business or unrelated task = new chat.
- Do not keep a running memoir in this file. Decisions that still bind go in the matching rule file, in 3 lines or fewer.
- If a memory file would grow past ~80 lines, delete what git already knows.

## Sources of truth (do not add a fifth)

| Thing | File | Do not use |
| --- | --- | --- |
| Nav names and slugs | `lib/canonical-programs.ts` | ad-hoc arrays in components |
| Long-form program pages | `lib/program-configs.ts` | `lib/programs.ts` (legacy, do not grow) |
| Prices / Stripe products | `lib/intake-routing.ts` + `app/pricing/page.tsx` | inventing prices |
| Email journey | `lib/email/templates.ts` + `lib/email/shell.ts` | a second mailer |
| Brand / audience | `PRODUCT.md` | rewriting the brand |
| Visual system | `DESIGN.md` + `styles/tokens.css` | raw hex in components |
| Chatbot facts | `app/api/chat/route.ts` | a list that disagrees with canonical |

If two files disagree, **do not silently pick one**. Say so, then follow the table above unless Noah overrides.

## Locked

- Typeface on the site: **Inter**. Display numerals may use Space Grotesk. Do not suggest Satoshi or anything else.
- One accent: Apex Blue. Tokens live in `styles/tokens.css`. Components consume tokens.
- No GP referral. AHPRA-registered doctors. TGA-compliant pharmacy partner.
- Legal entity: Imperial Equity Investments Pty Ltd.
- Admin email: `admin@apexmetabolichealth.com.au`.
- Audience: **men and women, aged 18–80**, Australia-wide. Do not write the site as men-only. A program may discuss a sex-specific condition. The clinic does not.
- Funnel: get people to the portal. Do not add new public intake forms on this site.
- Other businesses (4th Qtr, Justflowz, Lab Built, PROTCL, 3D, Tools) are out of scope here.

## Push back

Noah generates ideas faster than he ships them. If he starts a new surface while the current job is unfinished, say so and finish the current job.

If he asks for something that creates a second source of truth (another program list, another intake path, another email sender), refuse the extra copy and extend the existing one.
