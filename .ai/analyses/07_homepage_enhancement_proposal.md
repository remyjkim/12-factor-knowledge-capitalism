# Homepage Enhancement Proposal

Companion to `04_blog_enhancement_analysis.md` (factor pages) and the approved
`06_factor_page_target_mockup.html`. Proposes strategies for the main page
(`docs-astro/src/pages/index.astro`), aligned with the pilot's design system.

## 1. Current state and diagnosis

The homepage is: an h4 title → one credit line (12factor.net, 12-factor
agents) → `hand-in-hand.jpeg` → two dense intro paragraphs → "The 12 Factors"
→ five Roman-numeral sections of ArrowCards (title + description).

Issues, in priority order:

1. **No framework picture.** The page describes a five-part architecture in
   prose but never shows it. Doc 04 already identified the homepage system
   map as the single highest-value missing figure on the site. The
   `hand-in-hand.jpeg` occupies the hero slot without carrying framework
   information.
2. **The intro has the old factor-page problem.** Two dense paragraphs, four
   bolded coined terms, no progressive disclosure — exactly what the pilot
   just fixed at the factor level.
3. **Card inconsistency (introduced by the pilot, must fix at rollout).**
   Pilot pages dropped the "Factor N:" title prefix (the number moved to
   frontmatter + breadcrumb), so cards now mix "Knowledge is Negative
   Entropy" with "Factor 7: Transmission Adds Context…".
4. **The five parts have names but no narrative.** "II. The Evolution
   Interface" gives a first-time reader no idea what that part does in the
   argument. The TOC reads as a list, not an arc.
5. **No entry guidance.** Nothing says "read sequentially, start here," even
   though the whole site is built around sequential prev/next reading.
6. **Citability is claimed, not offered.** A manifesto positioned as a
   citable resource has no cite-this affordance.

## 2. Proposed strategies

### S1 — Framework map hero (the keystone)

Replace `hand-in-hand.jpeg` with an inline SVG system map in the established
line-art language (currentColor + opacity, node-and-edge):

```
     I. FOUNDATIONS
   (1) knowledge ─ (2) language          ← what knowledge is, how it travels
        │
   ┌────┴─────────────┬──────────────┐
   II. EVOLUTION      III. AGENCY    IV. NETWORK      ← the three interfaces
   (3) explore        (5) action     (7) transmission
   (4) criticize      (6) actors     (8) shared structures
   └────┬─────────────┴──────────────┘
        ▼
   V. KNOWLEDGE CAPITALISM
   (9) capital → (10) market → (11) coordination → (12) mechanism design
```

Composition: foundations feed three parallel interface columns which converge
into the capitalism layer; factor numbers as small nodes; each part label
links to its section below (same-page anchors). Theme-adaptive for free,
zero JS, and it doubles as the source design for the Phase 3 foundry OG card.

`hand-in-hand.jpeg`: move below the intro as an accent, or retire it —
Remy's call at review.

### S2 — Intro restructure (reuse the pilot's vocabulary)

- One-sentence definition under the title, styled like the factor pages'
  principle epigraph: *"A framework for how knowledge creates, compounds,
  and captures value in networked systems."*
- The two dense paragraphs become: a two-sentence manifesto lede + an
  "In brief"-styled box (same `.inbrief` CSS) with three bullets — the
  objective (survival under uncertainty), the method (knowledge activation),
  the claim (knowledge as the primary form of capital, i.e. cognitive
  capital). Coined terms link to the factors that define them.
- Credit line moves to a smaller footnote-style line under the intro.

### S3 — Parts as narrative arc

Each section heading gains a one-line role description, muted, under the
Roman-numeral title:

- I. Foundations — *what knowledge is, and how it is carried*
- II. The Evolution Interface — *how conjecture and criticism create it*
- III. The Agency Interface — *how it converts into action*
- IV. The Network Interface — *how it moves between actors*
- V. Knowledge Capitalism — *how networks score, trade, and design for it*

This turns the TOC into the argument's outline. (Exact wording to be settled
in the mockup.)

### S4 — Card normalization and enrichment

- Rollout removes "Factor N:" from all remaining titles; frontmatter
  `factor`/`part`/`principle` become universal.
- ArrowCard renders a small number chip (from `entry.data.factor`, falling
  back to slug prefix) before the title; description line stays.
- Optional (decide at mockup): show `principle` instead of `description` on
  cards once all factors have one — the principle is the stronger hook.

### S5 — Entry affordances

- A "Begin with Factor 1" arrow-link directly under the framework map, plus
  total corpus size ("twelve factors · ~60 minutes") so readers know the
  shape of the commitment.
- Footer of the list: "Read sequentially — each factor builds on the last."

### S6 — Cite-this block (citability made concrete)

Small `.canonical`-styled block at the page bottom: formatted citation +
copyable BibTeX entry for the manifesto (static HTML, no JS beyond
select-on-click, or plain text). Reinforces the site's stated purpose.

### S7 — Deferred / Phase 3 ties

- Foundry-rendered framework map as the homepage OG image (doc 04 Phase 3).
- Social links wiring in consts.ts (placeholders were removed in task 13;
  needs real URLs from Remy).
- Homepage search (Pagefind) still YAGNI at 12 essays.

## 3. Sequencing

1. **With the factor rollout** (same branch): S4 normalization — title
   prefixes, universal frontmatter, card chips. The mixed-title
   inconsistency ships otherwise.
2. **Homepage redesign proper**: S1 map + S2 intro + S3 arc + S5 affordances
   — one coherent visual change, mocked first as HTML (same review flow as
   the factor pilot), then implemented.
3. **Polish**: S6 cite-this, S7 items with Phase 3.

## 4. Risks / constraints

- The map is the only genuinely hard design artifact: five groups, twelve
  nodes, and three converging columns in a 640px column without clutter.
  Mitigation: mock it first; fall back to a simplified three-band map
  (foundations → interfaces → capitalism) if the full node map crowds.
- Homepage is `.astro`, not markdown — S2 reuses the pilot's CSS classes
  directly; no new pipeline work.
- Keep the manifesto restraint: no new colors, no cards-with-icons, no
  marketing hero patterns.
