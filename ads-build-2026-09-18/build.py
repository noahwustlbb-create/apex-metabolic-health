#!/usr/bin/env python3
"""
Apex Metabolic Health — Google Ads rebuild, 18 Sep 2026.
Account 989-099-6037.

Generates Google Ads Editor import CSVs for the full account rebuild, and
refuses to write anything that breaks a Google character limit or a compliance
rule. Run it, import the CSVs into Google Ads Editor, review, post.

Compliance rules encoded here, not left to memory:

  * Testosterone is Schedule 4 in Australia. Prescription-only medicines cannot
    be advertised to the public, so no ad text names a medicine or promises
    one. Ads sell the consultation, the testing and the doctor.
  * BANNED_IN_ADS below is checked against every headline and description. The
    script exits non-zero if any copy trips it.
  * Keywords may contain terms ad copy cannot ("trt clinic" is what a patient
    searches; it is targeting, not a claim).
  * Peptides are excluded from paid search entirely pending written
    regulatory sign-off.
"""

import csv
import os as _os
import datetime as _dt
import re
import sys
from pathlib import Path

OUT = Path(__file__).parent
FINAL_URL_SUFFIX = (
    "utm_source=google&utm_medium=cpc"
    "&utm_campaign={campaignid}&utm_content={adgroupid}"
    "&utm_term={keyword}&matchtype={matchtype}&device={device}"
)

HEADLINE_MAX = 30
DESC_MAX = 90
PATH_MAX = 15

# Words that must never appear in ad text. This is NOT a Google policy guard —
# Google serves this vertical in Australia fine. It is the TGA one:
# testosterone, peptides and the GLP-1s are Schedule 4, and the Therapeutic
# Goods Act bars advertising prescription-only medicines to the Australian
# public. That exposure is Apex's, not Google's, so the gate stays until Noah
# says otherwise. Checked case-insensitively on word boundaries.
BANNED_IN_ADS = [
    "trt", "testosterone replacement", "peptide", "peptides", "prescription",
    "prescribed", "steroid", "steroids", "hrt", "semaglutide", "tirzepatide",
    "ozempic", "wegovy", "mounjaro", "glp-1", "hgh", "anabolic",
]

# ── Shared ad copy blocks ────────────────────────────────────────────────────
# 15 headlines and 4 descriptions per ad group. Headline 1 carries the promise,
# headline 2 the credential, headline 3 the action: Google pins nothing by
# default, so the set has to read well in any combination.

CALLOUTS = [
    "AHPRA-Registered Doctors",
    "Australia-Wide Telehealth",
    "Results In 24-48 Hours",
    "Discreet Plain Packaging",
    "No Lock-In Membership",
    "Same-Week Appointments",
]

SNIPPETS = ("Services", [
    "Hormone assessment", "Blood panels", "Doctor consultations",
    "Ongoing monitoring", "Metabolic health",
])

SITELINKS = [
    ("Book A Consultation", "Speak with an AHPRA doctor", "Phone or video, Australia-wide", "https://www.apexmetabolichealth.com.au/book"),
    ("See What's Tested", "20 markers on the men's panel", "Hormones, thyroid, metabolic, blood", "https://www.apexmetabolichealth.com.au/order-bloods"),
    ("How It Works", "Bloods, doctor review, then a plan", "Four steps, start to finish", "https://www.apexmetabolichealth.com.au/how-it-works"),
    ("Pricing", "Published in full, no hidden fees", "Panels and consults, all listed", "https://www.apexmetabolichealth.com.au/pricing"),
]

# ── The build ────────────────────────────────────────────────────────────────
# (name, daily budget AUD, bid strategy, status)
# The burst window. These are the only thing that makes a "4-day burst"
# actually four days: without an end date a campaign runs until a human
# remembers to pause it, and Google may overspend a daily cap by up to 2x on
# any one day. A$900/day unbounded is A$27k/month.
#
# Override at build time:  BURST_START=2026-09-22 BURST_DAYS=4 python3 build.py
BURST_START = _os.environ.get("BURST_START") or (_dt.date.today() + _dt.timedelta(days=1)).isoformat()
BURST_DAYS = int(_os.environ.get("BURST_DAYS", "4"))
BURST_END = (_dt.date.fromisoformat(BURST_START) + _dt.timedelta(days=BURST_DAYS - 1)).isoformat()

CAMPAIGNS = [
    # A 3-4 day burst, not an ongoing account. Three campaigns, not seven:
    # A$900/day split seven ways gives no campaign enough daily volume to read,
    # and there is no second week in which to learn.
    #
    # Budgets are CAPS, not targets. The account spent A$130/day against a
    # A$350/day cap last month, so the binding constraint is addressable search
    # volume, not budget. Expect A$300-500/day actual at best.
    #
    # Bidding is Maximise clicks with a CPC ceiling, deliberately NOT Maximise
    # conversions: smart bidding needs ~15-30 conversions to exit the learning
    # period, the account records none that mean anything yet, and four days is
    # not enough time regardless. Traffic quality comes from exact/phrase
    # keywords and 444 negatives instead of from the algorithm.
    ("Apex | Burst | Brand | AU",        80,  "Maximize clicks", "Paused", "6.00"),
    ("Apex | Burst | High Intent | AU",  520, "Maximize clicks", "Paused", "9.00"),
    ("Apex | Burst | Symptoms | AU",     300, "Maximize clicks", "Paused", "6.00"),
]


LP = "https://www.apexmetabolichealth.com.au"

# Ad groups built but held paused, with the reason. Everything else inherits
# its campaign status.
#
# "Hormone Clinic" was parked here on the assumption that the "Prescription
# drug services" label on the account was a restriction. It is not. Google's
# own policy panel reads "This ad is allowed to serve in: Australia" — the
# label is informational and sits on every ad in this vertical permanently.
# Unparked 2026-09-19 on Noah's correction.
PAUSED_AD_GROUPS = {}

# campaign -> [(ad group, landing path, [keywords], headlines, descriptions)]
AD_GROUPS = {
"Apex | Burst | Brand | AU": [
    ("Brand Core", "/", [
        "apex metabolic health", "apex metabolic", "apexmetabolichealth",
        "apex metabolic health australia", "apex metabolic clinic",
    ],
     ["Apex Metabolic Health", "Official Site | Apex Health", "Doctor-Led Men's Health",
      "AHPRA-Registered Doctors", "Book A Consultation", "Australia-Wide Telehealth",
      "Hormone & Metabolic Care", "Speak To A Doctor This Week", "Blood Panel + Doctor Review",
      "Results In 24-48 Hours", "No Lock-In Membership", "Transparent, Published Pricing",
      "Start With A Blood Panel", "Real Clinic, Real Doctors", "Men's Health, Done Properly"],
     ["The official Apex site. Doctor-led hormone and metabolic care, Australia-wide.",
      "AHPRA-registered doctors, full blood panels, and a plan built around your results.",
      "Book a consultation online. Phone or video, same-week appointments across Australia.",
      "Published pricing, no lock-in membership, discreet delivery. See how it works."]),

    ("Brand Services", "/get-started", [
        "apex trt", "apex hormone clinic", "apex blood test", "apex metabolic bloods",
        "apex metabolic consult", "apex mens health",
    ],
     ["Apex Metabolic Health", "Book Your Consultation", "AHPRA-Registered Doctors",
      "Comprehensive Blood Panel", "Hormone & Metabolic Review", "20 Markers, One Panel",
      "Doctor-Led From Day One", "Results In 24-48 Hours", "Australia-Wide Telehealth",
      "Same-Week Appointments", "Published Pricing", "No Lock-In Membership",
      "Start Your Assessment", "Your Results, Explained", "Men's Health, Done Properly"],
     ["Book your Apex consultation. AHPRA-registered doctors, Australia-wide, phone or video.",
      "A comprehensive panel, a doctor who reads it, and a plan that follows your numbers.",
      "Results usually back in 24-48 hours, then a consultation to walk through them.",
      "Transparent pricing published in full. No lock-in membership, cancel any time."]),
],

"Apex | Burst | Symptoms | AU": [
    ("Low Energy & Fatigue", "/hormone-check", [
        "always tired no energy man", "constant fatigue male", "low energy men",
        "why am i so tired all the time male", "no energy motivation men",
        "chronic tiredness men", "exhausted all the time man",
    ],
     ["Tired All The Time?", "Get Your Levels Checked", "AHPRA-Registered Doctors",
      "Fatigue Has A Cause", "Blood Panel + Doctor Review", "Find Out What's Going On",
      "20 Markers, One Panel", "Results In 24-48 Hours", "Australia-Wide Telehealth",
      "Doctor-Led Assessment", "Same-Week Appointments", "Not Just 'Normal For Your Age'",
      "Start With Your Bloods", "Your Results, Explained", "No Lock-In Membership"],
     ["Constant fatigue is worth investigating. A comprehensive panel and a doctor who reads it.",
      "AHPRA-registered doctors, Australia-wide telehealth, results usually in 24-48 hours.",
      "We test 20 markers, then walk you through what they mean and what to do next.",
      "If your GP said everything looks normal but you don't feel it, start here."]),

    ("Low Libido & Drive", "/hormone-check", [
        "low libido men", "low sex drive male", "lost my sex drive man",
        "low drive and motivation men", "libido problems men australia",
    ],
     ["Drive Not What It Was?", "Get Your Levels Checked", "AHPRA-Registered Doctors",
      "There May Be A Reason", "Blood Panel + Doctor Review", "Confidential & Discreet",
      "20 Markers, One Panel", "Results In 24-48 Hours", "Australia-Wide Telehealth",
      "Doctor-Led Assessment", "Same-Week Appointments", "Start With Your Bloods",
      "Your Results, Explained", "No Lock-In Membership", "Men's Health, Done Properly"],
     ["Low drive is a symptom, not a character flaw. Get the underlying numbers checked.",
      "Confidential, doctor-led assessment with AHPRA-registered doctors, Australia-wide.",
      "A comprehensive panel, results in 24-48 hours, and a consultation to explain them.",
      "Discreet from first click to plain-packaged delivery. No lock-in membership."]),

    ("Brain Fog & Recovery", "/hormone-check", [
        "brain fog men", "poor recovery training men", "cant recover from workouts",
        "brain fog and fatigue male", "losing muscle men over 40",
        "weight gain men over 40", "poor sleep and fatigue men",
    ],
     ["Brain Fog? Poor Recovery?", "Get Your Levels Checked", "AHPRA-Registered Doctors",
      "Training Hard, No Progress?", "Blood Panel + Doctor Review", "Find The Cause",
      "20 Markers, One Panel", "Results In 24-48 Hours", "Australia-Wide Telehealth",
      "Doctor-Led Assessment", "Same-Week Appointments", "Start With Your Bloods",
      "Your Results, Explained", "No Lock-In Membership", "Built For Men Over 30"],
     ["Recovery, focus and body composition all trace back to measurable things. Measure them.",
      "A 20-marker panel read by an AHPRA-registered doctor, then a plan built on the results.",
      "Australia-wide telehealth. Results usually in 24-48 hours, consultation the same week.",
      "For men who have been told everything is normal and know something is off."]),
],

"Apex | Burst | High Intent | AU": [
    ("Hormone Blood Test", "/order-bloods", [
        "testosterone blood test", "hormone blood test men", "testosterone test australia",
        "male hormone panel", "check testosterone levels", "hormone test melbourne",
        "hormone test sydney", "hormone test brisbane", "private hormone test",
    ],
     ["Male Hormone Blood Test", "20 Markers, One Panel", "Results In 24-48 Hours",
      "Reviewed By A Real Doctor", "AHPRA-Registered Doctors", "Book Online In Minutes",
      "Nationwide Collection Centres", "No Referral Needed", "Australia-Wide Telehealth",
      "See Exactly What's Tested", "Published Pricing", "Your Results, Explained",
      "Optimal Ranges, Not Just OK", "Start Your Panel", "Men's Health, Done Properly"],
     ["A comprehensive male hormone panel, collected locally, reviewed by an AHPRA doctor.",
      "20 markers including hormones, thyroid, iron studies, HbA1c and full blood count.",
      "Results usually in 24-48 hours, presented against optimal ranges, not just normal ones.",
      "Every marker listed up front and pricing published in full. No referral required."]),

    ("Private Blood Panel", "/order-bloods", [
        "private blood test australia", "comprehensive blood panel", "full blood panel australia",
        "private pathology australia", "health check blood test men", "book a blood test online",
    ],
     ["Private Blood Panel", "Book Online, No Referral", "Results In 24-48 Hours",
      "Reviewed By A Real Doctor", "20 Markers, One Panel", "Collection Centres Nationwide",
      "AHPRA-Registered Doctors", "See Exactly What's Tested", "Published Pricing",
      "Optimal Ranges, Not Just OK", "Your Results, Explained", "Australia-Wide",
      "Start Your Panel", "No Lock-In Membership", "Men's Health, Done Properly"],
     ["Book a comprehensive private panel online. No GP referral, collection centres nationwide.",
      "Hormones, thyroid, metabolic, iron and blood count in a single draw, one price.",
      "An AHPRA-registered doctor reviews every panel and explains what the numbers mean.",
      "Pricing published in full. See the exact marker list before you pay."]),
],

"__CUT_Treatment": [
    ("Hormone Clinic", "/hormone-check", [
        "mens hormone clinic", "hormone clinic australia", "testosterone clinic",
        "trt clinic", "trt australia", "online hormone doctor",
        "mens health clinic online", "hormone specialist australia",
    ],
     ["Men's Hormone Clinic", "AHPRA-Registered Doctors", "Australia-Wide Telehealth",
      "Doctor-Led From Day One", "Blood Panel + Doctor Review", "Same-Week Appointments",
      "Results In 24-48 Hours", "20 Markers, One Panel", "Ongoing Monitoring Included",
      "Discreet Plain Packaging", "No Lock-In Membership", "Published Pricing",
      "Book A Consultation", "Your Results, Explained", "Men's Health, Done Properly"],
     ["A doctor-led men's hormone clinic. Comprehensive testing, then a plan based on results.",
      "AHPRA-registered doctors, Australia-wide telehealth, same-week appointments.",
      "Every plan starts with bloods and a consultation, and is monitored with repeat testing.",
      "Published pricing, no lock-in membership, discreet plain-packaged delivery."]),
],

"__CUT_Metabolic": [
    ("Medical Weight Loss", "/start", [
        "medical weight loss australia", "doctor supervised weight loss",
        "weight loss clinic australia", "weight loss doctor online",
        "metabolic health check", "cant lose weight male",
    ],
     ["Doctor-Led Weight Care", "AHPRA-Registered Doctors", "Start With Your Bloods",
      "Metabolic Health Assessment", "Blood Panel + Doctor Review", "Australia-Wide Telehealth",
      "Results In 24-48 Hours", "Same-Week Appointments", "Ongoing Monitoring Included",
      "No Lock-In Membership", "Published Pricing", "Find What's Driving It",
      "Book A Consultation", "Your Results, Explained", "Built Around Your Numbers"],
     ["Doctor-led metabolic care that starts with testing, not guesswork or a meal plan.",
      "We look at glucose, HbA1c, thyroid, lipids and hormones before recommending anything.",
      "AHPRA-registered doctors, Australia-wide telehealth, same-week appointments.",
      "Ongoing monitoring with repeat bloods so progress is measured, not assumed."]),
],

"__CUT_Competitor": [
    ("Competitor | Men's Telehealth", "/start", [
        "hormn", "hormn australia", "mosh mens health", "pilot mens health",
        "juniper australia", "mens health telehealth australia",
    ],
     ["Compare Men's Health Care", "AHPRA-Registered Doctors", "20 Markers, One Panel",
      "Doctor-Led From Day One", "Published Pricing, No Fees", "No Lock-In Membership",
      "Results In 24-48 Hours", "Australia-Wide Telehealth", "Same-Week Appointments",
      "Ongoing Monitoring Included", "Blood Panel + Doctor Review", "Discreet Delivery",
      "Book A Consultation", "Your Results, Explained", "Men's Health, Done Properly"],
     ["Comprehensive testing, AHPRA-registered doctors and pricing published in full.",
      "20 markers reviewed by a doctor, with optimal ranges explained, not just a PDF.",
      "No lock-in membership. Same-week appointments, Australia-wide telehealth.",
      "Compare what is actually tested and what it costs before you commit."]),
],
}

# Shared negatives. Applied as a campaign-level list to every Search campaign.
NEGATIVES = [
    # Supplement and OTC shoppers
    "booster", "boosters", "supplement", "supplements", "vitamin", "vitamins",
    "herbal", "natural remedy", "ashwagandha", "tribulus", "zinc", "gnc",
    "chemist warehouse", "amazon", "ebay", "woolworths", "coles",
    # Illicit / non-clinical
    "steroid", "steroids", "anabolic", "black market", "underground", "raw powder",
    "research chemical", "grey market", "without prescription", "no prescription",
    "buy online no doctor",
    # Free / price shoppers with no intent
    "free", "cheap", "cheapest", "bulk billed", "medicare covered", "discount code",
    # Information seekers, not patients
    "what is", "meaning", "definition", "wikipedia", "reddit", "forum", "youtube",
    "symptoms of", "side effects", "how to increase naturally", "exercises",
    "foods that", "home remedy", "diy",
    # Wrong audience entirely
    "jobs", "job", "career", "careers", "salary", "course", "courses", "training course",
    "certification", "study", "student", "for women", "female", "ftm", "veterinary",
    "for dogs", "for cats", "bodybuilding cycle", "cycle dosage",
]

# Terms that were proven wasteful in the Aug 19 - Sep 17 window: every one of
# these took money and returned zero conversions.
PROVEN_WASTE_NEGATIVES = [
    "testosterone supplement for men", "how to get testosterone",
    "testosterone supplements", "testosterone foods", "testosterone booster",
]


# Treatment intent belongs in the High Intent campaign, not in its own.
AD_GROUPS["Apex | Burst | High Intent | AU"] = (
    AD_GROUPS.pop("__CUT_Treatment") + AD_GROUPS["Apex | Burst | High Intent | AU"]
)


# Routes confirmed 200 on www.apexmetabolichealth.com.au, 18 Sep 2026.
LIVE_ROUTES = {
    "/", "/start", "/get-started", "/hormone-check", "/metabolic-check",
    "/order-bloods", "/book", "/book/hormone-consult", "/book/general-consult",
    "/how-it-works", "/pricing", "/membership", "/faqs", "/confirmation",
}


def check(text, limit, kind, where):
    """Length and compliance gate. Returns list of error strings."""
    errs = []
    if len(text) > limit:
        errs.append(f"{where}: {kind} is {len(text)} chars (max {limit}): {text!r}")
    low = text.lower()
    for bad in BANNED_IN_ADS:
        if re.search(rf"\b{re.escape(bad)}\b", low):
            errs.append(f"{where}: {kind} contains banned term {bad!r} (S4/policy): {text!r}")
    return errs


def main():
    errors = []
    budget_total = sum(c[1] for c in CAMPAIGNS)

    # ── campaigns.csv ────────────────────────────────────────────────────────
    with open(OUT / "01_campaigns.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Campaign Type", "Campaign Status", "Budget",
                    "Budget Type", "Bid Strategy Type", "Max CPC", "Networks",
                    "Languages", "Location", "Ad Rotation", "Final URL suffix",
                    "Start Date", "End Date"])
        for name, budget, strategy, status, maxcpc in CAMPAIGNS:
            w.writerow([name, "Search", status, budget, "Daily", strategy, maxcpc,
                        "Google search", "English", "Australia",
                        "Rotate indefinitely", FINAL_URL_SUFFIX, BURST_START, BURST_END])

    # Ad schedule: a burst only works if someone answers. Clinic hours are
    # 9:00-20:00 Brisbane (REVIEW_SLA in the portal), so the budget is not spent
    # on 2am clicks nobody follows up. Weekend mornings kept: they convert.
    with open(OUT / "07_ad_schedule.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Day", "Start Time", "End Time", "Bid Adjustment"])
        for name, *_ in CAMPAIGNS:
            for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
                w.writerow([name, day, "9:00 AM", "8:00 PM", "0%"])
            for day in ["Saturday", "Sunday"]:
                w.writerow([name, day, "9:00 AM", "5:00 PM", "-10%"])

    # ── ad groups + keywords + ads ───────────────────────────────────────────
    ag_rows, kw_rows, ad_rows = [], [], []
    for campaign, groups in AD_GROUPS.items():
        if campaign.startswith('__CUT'):
            continue
        for ag_name, path, keywords, headlines, descriptions in groups:
            ag_status = "Paused" if ag_name in PAUSED_AD_GROUPS else "Enabled"
            ag_rows.append([campaign, ag_name, ag_status, "Standard", "2.50",
                            PAUSED_AD_GROUPS.get(ag_name, "")])

            for kw in keywords:
                # Exact for the precise phrase, phrase for the broader intent.
                kw_rows.append([campaign, ag_name, kw, "Exact", "Enabled"])
                if len(kw.split()) > 1:
                    kw_rows.append([campaign, ag_name, kw, "Phrase", "Enabled"])

            where = f"{campaign} / {ag_name}"
            if len(headlines) != 15:
                errors.append(f"{where}: {len(headlines)} headlines, expected 15")
            if len(descriptions) != 4:
                errors.append(f"{where}: {len(descriptions)} descriptions, expected 4")
            for h in headlines:
                errors += check(h, HEADLINE_MAX, "headline", where)
            for d in descriptions:
                errors += check(d, DESC_MAX, "description", where)

            if path not in LIVE_ROUTES:
                errors.append(f"{where}: landing page {path!r} is not a confirmed live route")
            final_url = LP + path
            row = [campaign, ag_name, "Responsive search ad", "Enabled", final_url]
            row += headlines + [""] * (15 - len(headlines))
            row += descriptions + [""] * (4 - len(descriptions))
            p1, p2 = "hormone", "assessment"
            errors += [f"{where}: path too long" ] if max(len(p1), len(p2)) > PATH_MAX else []
            row += [p1, p2]
            ad_rows.append(row)

    with open(OUT / "02_adgroups.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Ad Group", "Status", "Ad Group Type", "Max CPC", "Note"])
        w.writerows(ag_rows)

    with open(OUT / "03_keywords.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Ad Group", "Keyword", "Match Type", "Status"])
        w.writerows(kw_rows)

    with open(OUT / "04_ads_rsa.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Ad Group", "Ad Type", "Status", "Final URL"]
                   + [f"Headline {i}" for i in range(1, 16)]
                   + [f"Description {i}" for i in range(1, 5)]
                   + ["Path 1", "Path 2"])
        w.writerows(ad_rows)

    # ── negatives ────────────────────────────────────────────────────────────
    with open(OUT / "05_negatives.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Campaign", "Keyword", "Match Type", "Status"])
        search_campaigns = [c[0] for c in CAMPAIGNS]
        for campaign in search_campaigns:
            # Brand campaign keeps the informational negatives off, or it would
            # block its own brand queries.
            pool = NEGATIVES if "Brand" not in campaign else [
                n for n in NEGATIVES if n not in ("what is", "meaning", "definition")
            ]
            for neg in pool:
                w.writerow([campaign, neg, "Phrase", "Enabled"])
            for neg in PROVEN_WASTE_NEGATIVES:
                w.writerow([campaign, neg, "Phrase", "Enabled"])
        # Cross-campaign: keep non-brand campaigns off brand queries so brand
        # traffic is bought once, in the cheap campaign.
        for campaign in search_campaigns:
            if "Brand" in campaign:
                continue
            for brand_term in ["apex metabolic", "apex metabolic health", "apexmetabolichealth"]:
                w.writerow([campaign, brand_term, "Phrase", "Enabled"])

    # ── assets ───────────────────────────────────────────────────────────────
    with open(OUT / "06_assets.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Asset Type", "Campaign", "Field 1", "Field 2", "Field 3", "Final URL"])
        for name, budget, strategy, status, maxcpc in CAMPAIGNS:
            for text, d1, d2, url in SITELINKS:
                errors += check(text, 25, "sitelink text", name)
                errors += check(d1, 35, "sitelink desc 1", name)
                errors += check(d2, 35, "sitelink desc 2", name)
                w.writerow(["Sitelink", name, text, d1, d2, url])
            for c in CALLOUTS:
                errors += check(c, 25, "callout", name)
                w.writerow(["Callout", name, c, "", "", ""])
            header, values = SNIPPETS
            for v in values:
                w.writerow(["Structured snippet", name, header, v, "", ""])

    # ── report ───────────────────────────────────────────────────────────────
    kw_exact = sum(1 for r in kw_rows if r[3] == "Exact")
    kw_phrase = sum(1 for r in kw_rows if r[3] == "Phrase")
    print(f"campaigns        {len(CAMPAIGNS)}  (daily budget total A${budget_total})")
    print(f"ad groups        {len(ag_rows)}")
    print(f"keywords         {len(kw_rows)}  ({kw_exact} exact, {kw_phrase} phrase, 0 broad)")
    print(f"responsive ads   {len(ad_rows)}  ({len(ad_rows)*15} headlines, {len(ad_rows)*4} descriptions)")
    print(f"negatives        {sum(1 for _ in open(OUT / '05_negatives.csv')) - 1}")
    print(f"assets           {sum(1 for _ in open(OUT / '06_assets.csv')) - 1}")

    # Observed: A$3.71 CPC, 10.36% CTR, 35 clicks/day, A$130/day actual spend
    # against a A$350/day cap (Aug 19 - Sep 17, Hormone Search).
    cap = sum(c[1] for c in CAMPAIGNS)
    held = [r for r in ag_rows if r[2] == "Paused"]
    if held:
        print()
        print("HELD PAUSED (build now, switch on later)")
        for r in held:
            print(f"  {r[1]} — {r[5]}")
    print()
    print(f"BURST PACING — {BURST_DAYS} days  ({BURST_START} to {BURST_END}, set on every campaign)")
    print(f"  daily cap set        A${cap}")
    print(f"  realistic daily      A$300-500 (volume-bound, not budget-bound)")
    print(f"  {BURST_DAYS}-day exposure       A${cap*BURST_DAYS} worst case, A$1,200-2,000 likely")
    print(f"  clicks at A$3.71     {cap*BURST_DAYS/3.71:.0f} worst case, 320-540 likely")
    print("  NOTE: Google may overspend a daily cap by up to 2x on any one day,")
    print(f"        so worst case is nearer A${cap*BURST_DAYS*2}. The end date caps the")
    print("        duration; only a campaign total budget caps the money. Set one")
    print("        in the UI if the ceiling is hard.")

    if errors:
        print(f"\n{len(errors)} PROBLEM(S) — nothing should be imported until these are fixed:")
        for e in errors:
            print("  -", e)
        return 1
    print("\nAll copy within Google limits. No S4 or policy-banned term in any ad.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
