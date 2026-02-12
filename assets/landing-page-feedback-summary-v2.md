# Landing Page Feedback — Aggregated Summary (Updated)

**Reviewers:** Faisal, Tristan, JP, Saul
**Sources:** Written feedback (Linear) + Group call (Feb 12)

---

## Final Decisions (Confirmed in Call)

These items were explicitly agreed on during the group call and are no longer up for debate:

1. **Authority is the base.** Use the Authority draft as the starting point and incorporate the best elements from the other drafts into it.
2. **Light mode.** No dark mode. Clean, white, flowing feel.
3. **No pricing on the site.** Pricing scares people off — it's not a SaaS product. Prepare a separate one-pager for after the first sales call instead.
4. **Authority's colour palette (blue).** The more premium, corporate blue. Not the modern/trendy blue. Sharp corners stay.
5. **Change the font.** JP and others dislike Authority's current font. Provide a few font options in the next iteration.
6. **Mobile first.** Prospects are decision-makers on the move, sending to other people on the move. Everything must work well on mobile.
7. **CTA = 30-minute intro call.** Not a full discovery phase. Just a casual "what do you want?" conversation. Discovery comes later for enterprise.
8. **Diagnostic as a hero button → popup/modal.** Not embedded on the page. A "Take our diagnostic" button on the hero that opens a quick form, returns immediate benchmark feedback. Secondary to the main CTA — it's for people who want to engage more, not the fast scrollers.
9. **No FAQs for now.** Team doesn't know what the FAQs would be yet, and the goal is to get people to call, not self-serve answers. Can revisit later.
10. **Competitor table = Us vs Databricks vs DIY.** Simple ticks and crosses. Include cost as a row (dollar signs, not exact numbers) but don't make cost the selling point.

---

## Design Principles (From Call Discussion)

These emerged as guiding principles for the next iteration:

- **Non-AI aesthetic.** The site must NOT look AI-generated. Avoid: isolated sections with their own backgrounds, generic GPT-style icons, cookie-cutter block layouts. Instead: sections should flow naturally into each other, feeling like one continuous scrollable page.
- **Custom icons/visuals.** Replace all generic AI-style icons with custom SVGs or recognizable brand icons. If showing integrations, use real logos (Salesforce, SAP, etc.).
- **No programming/code visuals.** We're selling to business execs, not developers. Remove anything that looks too technical (code snippets, terminal screenshots, etc.).
- **Animated hero, but NOT scroll-based.** Something moving in the hero section is important, but scroll-triggered animations won't work on mobile. Use Framer Motion for entrance/loop animations instead.
- **Compact sections.** Key sections (especially the process/timeline) should be visible on a single screen. No long vertical scrolls for a single concept.

---

## Recommended Site Structure

Based on JP's written structure + call consensus:

| # | Section | Notes |
|---|---------|-------|
| 1 | **Hero** | Premium animated visual (not code/programmer stuff). Dashboard screenshot or abstract data-flow animation. "Take diagnostic" button as secondary CTA. |
| 2 | **The Problem** | Framed as questions. Strong copy (Straight Shooter's messaging was praised). |
| 3 | **The Solution / Product** | "How Your Data Flows Through Hyper" visual (from Authority). Static or simple animation — NOT scroll-based. Use real integration logos on left side. Add brief explainer text around it. |
| 4 | **Testimonials / Case Studies** | Need more than currently shown. Better styling than current versions. |
| 5 | **The Process / Timeline** | Compact, single-screen. Frame as "how our customers have experienced us" (past tense, not promises). Avoid committing to specific timelines like "5 weeks" — use "typically" language. |
| 6 | **Competitor Comparison** | Us vs Databricks vs DIY. Simple ticks/crosses table. Cost as one row ($ symbols) but not emphasized. |
| 7 | **Data Safety** | Important — will come up a lot in conversations. Also prepare a branded one-pager as leave-behind material. |
| 8 | **CTA Section** | "Book a 30-minute intro call." |

---

## Per-Draft: What to Keep vs Discard

### From Authority (THE BASE)
**Keep:** Colour palette, sharp corners, premium feel, "How data flows" visual, grid asset in hero, grid background in footer, "time saved" section design.
**Change:** Font (everyone dislikes it), comparison table (too boring — simplify to ticks/crosses), security section (concept good, execution boring), reduce FAQ count (or remove entirely for now).

### From Straight Shooter
**Pull in:** Strong above-the-fold messaging/copy, animated counting numbers, clean product descriptions.
**Leave behind:** The overall design (too samey across sections, cards too simple), programmer-style visuals.

### From Storyteller
**Pull in:** Animation concept (Framer Motion entrance animations, not scroll-based), "From chaos to clarity" storytelling idea.
**Leave behind:** Colour scheme, dark mode, duplicate build process sections, simple testimonials.

### From Consultant
**Pull in:** Diagnostic/assessment concept (as hero button → modal), interactive chart idea for hero, "Get full assessment" CTA pattern.
**Leave behind:** On-page questionnaire, overall colour scheme, hero visual.

### From Business Case
**Pull in:** Interactive engagement concept (calculator idea in principle — what it calculates TBD).
**Leave behind:** Everything else. Colour scheme, hero, font, cost-focused messaging. Calculator as cost-of-ownership is infeasible.

---

## Action Items for Next Iteration

### Must Do
- [ ] Start from Authority as base, apply light mode
- [ ] Swap the font — provide 2–3 options
- [ ] Add animated hero element (Framer Motion, no scroll triggers)
- [ ] Add "Take diagnostic" button on hero → opens modal
- [ ] Remove all pricing
- [ ] Remove FAQs
- [ ] Replace generic icons with custom SVGs / real logos
- [ ] Remove any code/programming visuals
- [ ] Redesign comparison table (ticks/crosses, Us vs Databricks vs DIY)
- [ ] Add "How data flows" visual (static or simple animation, not scroll-based)
- [ ] Compact the timeline/process section to fit one screen
- [ ] Ensure full mobile responsiveness

### Content Needed (Not Design)
- [ ] Competitor research: Us vs Databricks vs DIY feature comparison data
- [ ] Testimonials: at least 3 (can be placeholder for now)
- [ ] Data safety messaging + plan for branded one-pager
- [ ] Finalise copy for problem/solution sections (Straight Shooter's copy as starting point)

### Parking Lot (Discuss Later)
- Company name (everyone to suggest options with available domains, .com preferred)
- Usage-based pricing model (Saul to share thoughts — for one-pager, not website)
- What the interactive calculator should actually calculate
- Value/IP creation messaging
- Logo design
