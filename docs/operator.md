# Noah, this is you. Then this is the system.

You asked me to go through the files, learn you, rebuild the agents, and point you at people who actually know what they are doing. This file is that. It is not loaded on every turn. Read it once. Then fill `.cursor/YOU.md`. Then go back to shipping.

## 1. What I learned about you

You are **Noah (ndub)**. Australian. You run more than one company. On this machine the live one is Apex Metabolic Health, a doctor-led hormone and metabolic telehealth clinic under Imperial Equity Investments Pty Ltd. GitHub is `noahwustlbb-create`. The patient portal is `app.apexmetabolichealth.com.au`. This repo is the public site.

Your Claude Code numbers (2 Aug to 6 Sep) are not a flex and they are not a cost crisis if you are on a Max plan. They are a diagnosis.

- 3.01 billion tokens in 36 days. 94% cache reads.
- Three sessions did 78% of the volume. Late turns cost ~8x a fresh chat.
- You launch from home, so Apex, 4th Qtr, Lab Built, Justflowz and PROTCL share one brain. The model re-reads 4th Qtr notes on Apex turns.
- Output is tiny. You are not "using a lot of AI". You are dragging a 1,600-turn transcript around to fix a typo.

That is the same pattern as the business.

You have unusually good taste. `PRODUCT.md` and `DESIGN.md` are better than most funded clinics. "Quiet authority." One idea per screen. Inter locked. Process is the proof. The email templates already have compliance rules a lawyer would recognise. You can specify quality.

You cannot keep a single source of truth, and you do not finish the last 20%.

Simon Beard wrote the line that is about you, not about AI: the first 80% takes ten minutes and the dopamine is insane, so you start the next thing. You said it yourself. Billion-dollar ideas. Cannot execute.

The repo is the receipt.

## 2. The mess, with file paths

This is not vibe. I read the tree.

**Four program catalogues that do not agree**

- `lib/canonical-programs.ts` — what Nav uses. Has Sexual Health and Pathology. Calls weight loss "Medical Weight Loss".
- `lib/programs.ts` — has Performance & Recovery and Hair Restoration as their own programs. No Sexual Health. Calls it "Metabolic Weight Loss". Marked like a source of truth. It is leftover.
- `lib/program-configs.ts` — the actual long-form pages.
- `app/api/chat/route.ts` — a fourth list, plus booking URLs the rest of the site has been trying to kill.

**A funnel that was decided and then not deleted**

Commits say: assessment first, public intake redirects to portal signup, confirmation after forms, Patient Portal in the nav.

The tree still has `/intake/*` (hormone, general, hair, injury, metabolic, skin, performance, quizzes, bloods, discovery, fast-track, pre-screen, repeat-order), `/book/*`, `/forms/*`, `/get-started`, `/quiz`, `/assessment`, `/start`, `/signup`, `/programs-select`. CTAs still point at all of them. `FloatingContact` still offers a "Peptide consultation".

**Compliance you wrote, then stepped on**

`lib/email/templates.ts` and the chatbot both say never name compounds. `app/pricing/page.tsx`, `app/book/page.tsx`, `components/Programs.tsx` and several intake forms still say Peptide.

**Brand you locked, then flipped**

- Audience: men 28–45 (`PRODUCT.md`) → gender-neutral commit → hormone / sexual / hair put back to male-aimed.
- Type: Inter locked → Satoshi + new photos → revert.
- Mail: Resend → "stopgap from resend.dev" → Google Workspace SMTP. Resend is still a dependency.
- Bloods: BGT iframe → native flow. Old panel URLs still sit in `lib/intake-routing.ts`.

**Two products in one folder**

This repo is the marketing site. The portal is another app. Copy in this repo still describes portal screens (`/dashboard/bloods`) it cannot see. Agents that do not know that will keep inventing the missing half.

None of this is because you lack potential. It is because every session starts from home, keeps the last 1,500 turns, and treats a new idea as cheaper than deleting the old path.

## 3. The agent system I put in this repo

Not six new projects. Not a 31 KB memory novel. One machine, scoped.

| File | Loads when | Job |
| --- | --- | --- |
| `AGENTS.md` | every chat | The loop. Sources of truth. Stop conditions. |
| `CLAUDE.md` | Claude Code only | Pointer at `AGENTS.md`. Prevents a second brain. |
| `.cursor/rules/compliance.mdc` | every chat | Legal never-list. Short on purpose. |
| `.cursor/rules/design.mdc` | `*.tsx` / `*.css` | Visual locks. |
| `.cursor/rules/funnel.mdc` | `app/`, `lib/`, `components/` | Portal-first. Do not grow the maze. |
| `.cursor/YOU.md` | only if you fill **Active rules** | Your voice. Your pushback. Your businesses. |
| `.cursorignore` | indexer | Stops the Impeccable detector scripts eating tokens. |

Impeccable stays. It is a design tool, not your operating system. Agents are told to leave it closed unless you ask for critique or live edit.

This is Simon Beard's loop, written for this repo:

- Trigger: you name one job.
- Outcome: that job is shipped and checked.
- Context: the small files above, not six businesses and a month of chat.
- Verify: the form works, the claim is legal, both themes pass.
- Stop: done, or a decision only you can make.

Boris Cherny's version of the same sentence: stop prompting. Write the loop. Your job is the loop. The model's job is the work.

## 4. What you do on your side (do this before the next build)

Fifteen minutes. This is the part you said you would do.

1. Open `.cursor/YOU.md`. Fill **Active rules** first. Then the rest. Stay under 80 lines. If you write a memoir I will make the next agent ignore it.
2. Cursor Settings → Rules → User Rules. Paste this and do not add a novel after it:

```
I am Noah. One chat = one job. New business or unrelated task = new chat.
If I start a new idea before the current one is shipped, finish the current one and say so.
Do not add a second source of truth. Do not add a new /intake route on the Apex marketing site.
Never name medications or promise outcomes on Apex.
Read AGENTS.md. Read .cursor/YOU.md only if Active rules has content.
```

3. Open this repo from `apex-metabolic-health`, not from your home folder. Same habit in Claude Code: `cd` into the project, then start.
4. When a chat has done the job, start a new one. `/clear` or a fresh Composer. This is the only token lever that matters. A markdown file will not save you.
5. Pick one unfinished Apex loop and finish it before you open Fourth Qtr. Suggested first loop: **one CTA**. Every "Get started" on the public site goes to portal signup or `/start`. Nothing else. That is a day, not a month.

Do not build Jarvis. Do not stand up six CLAUDE.md files for businesses you have not opened this week. Do not install Gas Town. You do not have a context problem that 30 agents will fix. You have a finish problem.

## 5. The geeks (ignore subscriber count)

You asked for people like Simon Beard. Efficient. Not popular. Proper.

Watch in this order. One talk, then go do the thing in this repo. Do not binge.

### Watch first (this is your course)

1. **Simon Beard** — loops, not prompts. Finish the last 20%. Australian operator, Culture Kings → Beard Capital. Jarvis is the later story. The useful one is the loop framework (trigger, outcome, context, verify, stop, what you want to wake up to).
   - [Prompting AI is dead](https://simonbeard.substack.com/p/prompting-ai-is-dead)
   - YouTube: [Simon Beard](https://www.youtube.com/@simonbeard)
2. **Dex Horthy (HumanLayer)** — why your agents feel messy, in engineering language. Context is the product. Small agents inside deterministic workflows. Not every job wants an agent.
   - [12-Factor Agents (AI Engineer)](https://www.youtube.com/watch?v=8kMaTybvDUw)
   - [Context engineering](https://www.youtube.com/watch?v=Usufn8IQJgw)
   - Text: [github.com/humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents)
3. **Geoffrey Huntley — Ralph** — one job per loop. Persist learning in files, not in the chat. This is the direct fix for your 1,600-turn sessions.
   - [ghuntley.com/ralph](https://ghuntley.com/ralph/)
4. **Hamel Husain** — "done" is a test, not a feeling. Read real traces. One failure mode at a time. This is how the Apex chatbot and the intake maze stop being vibes.
   - [How I AI: evals, screen share](https://www.youtube.com/watch?v=PgzOBNse2EA)
   - [hamel.dev](https://hamel.dev/)

### Then, when the first loop is shipping

5. **Boris Cherny** — the person who built Claude Code. "I don't prompt Claude anymore. I write loops."
   - [Building Claude Code](https://www.youtube.com/watch?v=julbw1JuAz0)
   - [Why coding is solved, and what comes next](https://www.youtube.com/watch?v=SlGRN8jh2RI)
6. **Thorsten Ball (Amp)** — how coding agents actually work. No thumbnail face. Read [registerspill.thorstenball.com](https://registerspill.thorstenball.com/) and search YouTube for "Thorsten Ball Amp" / "Raising an Agent".
7. **Simon Willison** — almost no YouTube, better than most YouTube. Small tools. Honest evals. [simonwillison.net](https://simonwillison.net/). Search his conference talks.
8. **AI Engineer** channel — skip the celebrity keynotes. Watch the engineering talks. [youtube.com/@aiDotEngineer](https://www.youtube.com/@aiDotEngineer)

### Fundamentals, if you want to stop being a passenger

9. **Andrej Karpathy** — ignore the fame. [Software in the era of AI](https://www.youtube.com/watch?v=LCEmiRjPEtQ) and "Let's build GPT" if you want to know what a token actually is. You spend millions of them. You should know.
10. **Jeremy Howard (fast.ai)** — practical, not guru. [course.fast.ai](https://course.fast.ai/). Only if you decide you want to understand models, not just drive them.

### Later. Not now.

- **Steve Yegge — Gas Town / Beads.** 20–30 parallel agents. You will reproduce your home-directory chaos at 30x.
- **Peter Steinberger — OpenClaw.** Interesting. Not your next move.
- **IndyDevDan, Dave Ebbelaar.** Actual builders. After Dex and Ralph, not instead.

### Do not watch

Matt Wolfe, Matthew Berman, Wes Roth, The AI Advantage, All About AI, NetworkChuck "I built an AI army", any thumbnail that says "replace your team this weekend". They will give you another unfinished stack.

## 6. How you get sharp

Talent is not the limiter. You already write briefs most people cannot. The limiter is session design.

- One repo, one chat, one outcome.
- Context lives in small files the agent can load by glob, not in a year of transcripts.
- The agent is allowed to refuse a new surface.
- You measure "did the patient reach the portal" and "did the form submit", not "did I feel productive".

Fill `.cursor/YOU.md`. Start a new chat in this repo. Give it one job. That is the rebuild.
