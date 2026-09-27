# Hero benchmark, 27 Sep 2026

What the leading clinic and health-testing sites do above the fold, measured live
(Playwright, 1440x900 and 390x844) on 27 Sep 2026, and what the Apex redesign took
from each. The wider market sweep, with sources, is in
`~/Clients/Apex/research/STARTUP-SWEEP-2026-09-27.md`. This file is the design
read of it.

## Measured

| Site | Market | H1 | Face, size, weight | Primary actions in fold | Hero visual |
| --- | --- | --- | --- | --- | --- |
| Neko Health | SE / UK | A completely new healthcare experience | Orleans serif, 100px, 400 | 1 (Discover the scan) + nav waitlist | Full-bleed soft photo |
| Function Health | US | Check your health. | Financier Display serif, 80px, 300 | 1 (Start testing) | Full-bleed film, 3-item proof row at the bottom (160+ tests, whole body, $1 a day) |
| Superpower | US | Your new health membership | NB International, 56px, 400 | 2 (Become a member, See what we test) | Silhouette on one flat colour field, price in the sub line |
| Ahead Health | CH / DE | Your health, tracked over time. | Aeonik, 64px, 400 | 2 (Start from CHF 299/year, How it works) | Portrait, 3-item proof row |
| Aware | DE / AT / NL | Gain deep insights into your health | ABC Diatype, 59px, 500 | 1 (Start now) | Photo with floating system chips (Immunity, Heart, Blood) |
| Everlab | AU | The new home for your health. | Tobias serif, 56px, 400 | 1 (Learn more) + nav Get started | Film, 3-item proof row (1000+ data points) |
| Lucis | FR / EU | Healthy tomorrow starts with the habits you build today | GT Alpina, 75px, 400 | 2 | Photo; body-systems map lower down |
| Longevium | Dubai | Your longevity starts here | Zapus Sans, 80px, 600 | 1 (WhatsApp concierge) | Pale DNA helix, desaturated, high key |
| Testmottagningen | SE | Health checks for increased insight into your health | Suisse Intl, 64px, 500 | Search + cart, discount tiles | Colour block bento, promo stickers |
| Numan | UK | OWN YOUR HEALTH | Custom condensed, 128px | 6 | Product tiles with packshots |
| Cerascreen | DE | Moderne Laboranalyse. | ChevinPro, 28px | 2 + product carousel | Stock lifestyle photo, press logos |
| Bloedwaardentest.nl | NL | Request your own lab test | Ruda, 25px, 900 | 6+ | Stock photo, symptom link list |
| Ottonova | DE | Deine digitale Krankenversicherung | Figtree, 40px, 850 | 3 | Stock portrait, promo badge |
| TeleClinic, Werlabs, Fernarzt | DE / SE | (cookie walls dominate the first screen) | | | |

## The pattern

1. **One flat promise, 3 to 7 words, declarative.** No question hooks, no chips. The premium group
   (Neko, Function, Superpower, Ahead, Everlab) sets it at 56 to 100px in a light weight (300 to 500).
   The shops (Numan, Cerascreen, Bloedwaardentest) shout in heavy weights and look cheaper for it.
2. **One primary action, at most one quiet secondary.** Every site above that reads as premium has
   one or two. The ones with six read as a shop.
3. **A three-item proof row** at the foot of the hero: a number, a scope, a price (Function,
   Ahead, Everlab). Defendable numbers only.
4. **The body shown as systems, not anatomy.** Aware floats system chips over a photo, Lucis organises
   the offer by 11 body systems, Everlab uses a biomarker wheel. Nobody leads with a textbook x-ray.
5. **Pale, high-key, low-contrast visuals** (Longevium, Neko). Premium health reads as light and quiet.
6. **Section count 10 to 13, but each section does one job.** The cheap sites repeat themselves.

## What Apex took

| From | Taken | Where |
| --- | --- | --- |
| Function, Ahead, Everlab | Declarative H1, one primary CTA, three-item proof row | Hero: "Measure first. Then treat." / proof row: 4,000+ centres, 48 hours, $280 ($199 members) |
| Superpower, Ahead | Price visible on the first screen | Proof row |
| Aware, Lucis, Everlab | The body as a system map you can touch | Hero figure: four systems (hormones, metabolic health, recovery, longevity), hover or tap one to see what is measured, and it carries into /start |
| Longevium, Neko | Pale, desaturated, high-key imagery | The figure is a ghost; colour appears only through the lens where you look |
| Neverland / TAWWD | A scroll-linked reveal, a differential-depth ring, an object that travels the page | Scanner ring (back half behind the body, front half in front), the statement brightening word by word, figure crops on the pillar cards, the figure again at the close |
| docmo ATLAS (RDL playbook §9) | Anatomy with rings, hot spots that choose a protocol, on white | Hero figure, kept on white, no bloom, no dark band |

## What Apex refused

- Testimonials, star ratings, review counts, "% of users" outcomes: standard in the US and on Numan
  and Cerascreen, prohibited for Apex (AHPRA s133).
- Product shots, packshots, vials or compound names: Numan and every US peptide site do it. The TGA
  peptide advisory (April 2026) and the Four Corners story (July 2026) make restraint the
  differentiator. Apex names areas (Recovery, Longevity), never compounds.
- Discount stickers, flash sales, newsletter pop-ups (Testmottagningen, Aware, Lucis).
- Serif display type: the premium group mostly uses it, but Inter is locked. Light weights (500)
  and tight tracking (-0.05em) get Inter most of the way there.
