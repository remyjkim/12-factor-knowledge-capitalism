# Blog Enhancement Analysis: Factor Pages and Figures

Investigation into reader feedback on the deployed site (knowledgecapitalism.com):
(1) individual factor pages are under-explained and unstructured, hard to read;
(2) the site lacks adequate diagrams and figures to deliver its ideas visually.
Covers a diagnosis of the current pages, structural and figure options, an
assessment of `~/dev/diagram-foundry` as the figure pipeline, and a prioritized
roadmap.

---

## 1. Diagnosis: Why the Pages Read Hard

Verified against both the repo (`docs-astro/src/content/blog/`) and the live
site (identical content).

### 1.1 Every factor page is a single unbroken paragraph

| Factor | Prose words | Headings | Inline links |
|--------|------------|----------|--------------|
| 01 Negative Entropy | 365 | 0 | 6 |
| 02 Language Compresses | 374 | 0 | ~8 |
| 03 Exploration | 250 | 0 | ~7 |
| 04 Criticism | 275 | 0 | ~7 |
| 05 Action | 274 | 0 | ~7 |
| 06 Cognitive Actors | 416 | 0 | 5 |
| 07 Transmission | 398 | 0 | 8 |
| 08 Shared Structures | 276 | 0 | ~7 |
| 09 Capital Scoring | 395 | 0 | 10 |
| 10 Market | 319 | 0 | ~8 |
| 11 Coordination | 327 | 0 | ~8 |
| 12 Mechanism Design | 305 | 0 | 8 |

Each page is one 250–416 word paragraph. Factor 9 alone packs path dependency,
subjective value, ownership-as-convention, nonrivalry, recombination, Arrow's
disclosure paradox, human-capital theory, and the coined term "cognitive
capital" into a single block. There is no progressive disclosure: no thesis
statement on the page (the frontmatter `description` holds one but only feeds
meta tags and homepage cards), no sections, no summary, no examples.

The word count is not the problem. The original 12factor.net — the site's
declared inspiration — runs ~450–500 words per factor, but split into a bolded
principle statement, 4–6 short paragraphs, bulleted examples, and a
problem→solution arc. Same length, entirely different readability.

### 1.2 Citation density fights the prose

8–16 scholarly links per paragraph, each underlined mid-sentence, with
anchor-text-only labels ("[tie strength](…)", "[value is subjective](…)").
Readers can't tell what the source is without hovering, and the underlines
fragment every sentence. For a site positioning itself as a "comprehensive,
citable resource," the citations are ironically illegible — no author, no
title, no year visible anywhere.

### 1.3 Figures are emblems, not explanations

Task 13 built a genuinely good foundation: one bespoke inline SVG per factor,
single visual system (`currentColor` + opacity line art), correct in both
themes, accessible (`role="img"`, `<title>`/`<desc>`). But:

- They are **abstract motifs** (a lattice, a wavy line, a flywheel), not
  explanatory diagrams. They set mood; they don't teach the mechanism.
- Internal opacities of 0.3–0.6 stack on the prose text color, so strokes and
  labels render washed out in both themes.
- 12px labels at 640px column width are at the floor of legibility.
- No `<figcaption>` — the reader gets no guidance on what the figure claims.
- One figure per page, always at the top. Dense mid-argument concepts
  (disclosure paradox, weak vs. strong ties, encoder/decoder) go unillustrated.

### 1.4 No wayfinding

The homepage groups factors into five parts (Foundations, Evolution, Agency,
Network, Knowledge Capitalism), but a factor page never says which part it
belongs to. Prev/next shows only titles. Terms coined earlier ("knowledge
activation", "cognitive capital", "shared structures") are used later with no
link back to their definitions.

### 1.5 Minor: UI text contrast

`body` text is `text-black/50 dark:text-white/75`. Article prose gets adequate
contrast from `@tailwindcss/typography` defaults, but dates, card descriptions,
and nav render at 50% black. Worth a pass, not the core issue.

---

## 2. What Good Looks Like (References)

- **12factor.net** — same corpus size per factor, structured as: bold
  principle → problem → solution → examples. The direct structural model.
- **`.ai/analyses/03_error_correcting_civ.md`** — Remy's own deep-explanation
  format ("The Idea in One Paragraph" → pillars → defining properties →
  failure modes → summary). The factor pages should read like this, not like
  the compressed manifesto.
- **Distill.pub-style explainers** — figures carry the argument; every major
  conceptual move gets a diagram anchored beside the text that makes it.
- **Tufte/Gwern sidenotes** — the standard answer to citation-heavy prose:
  move sources out of the reading line into margin notes or a references
  block. Astro supports this today: `remark-gfm` footnote syntax is built in,
  and `rehype-sidenotes` (or a ~50-line custom rehype plugin) renders footnotes
  as margin notes on wide viewports, tap-to-expand on mobile.

---

## 3. Content Restructuring Options (the primary lever)

### Option A — Typographic restructure only

Split each paragraph into 4–6 short paragraphs, bold the principle sentence,
add one bulleted list where the prose enumerates. No new writing.

- Effort: ~half a day for all 12.
- Fixes "unstructured," does nothing for "under-explained."

### Option B — Structured expansion per factor (recommended)

Rewrite each factor into a repeatable template, ~700–1000 words:

```markdown
> *Principle epigraph — the factor in one sentence (from frontmatter).*

**In brief** — 2–3 bullets: the claim, the mechanism, the consequence.

## The claim          ← what the factor asserts and why it's non-obvious
## The mechanism      ← how it works; where the figure(s) live
## Why it matters     ← implications for the framework / design consequences
## Related factors    ← links: builds on F_n, feeds F_m

The factor, in full   ← the original manifesto paragraph, verbatim, as the
                        canonical citable statement

### References        ← numbered footnotes with author, title, year
```

- Effort: ~1–2 hours of writing per factor; the raw material already exists —
  every sentence in the current paragraphs is a compressed section.
- Directly answers both feedback points; each `## The mechanism` section
  creates the natural anchor for an explanatory figure.

### Option C — Layered manifesto (Option B's closing move, standalone)

Keep the dense paragraph as the page's only prose but add scaffolding around
it (epigraph, In-brief bullets, references). Half-measure: the paragraph is
still the reading experience.

**Recommendation: Option B, which subsumes C** — the manifesto paragraph is
preserved verbatim as the closing canonical statement, so the README and the
site never diverge on the citable text, while the page above it actually
explains. Citation conversion (inline links → footnotes with full titles,
rendered as sidenotes) rides along with whichever option is chosen.

Supporting schema/template changes (small):

- `config.ts`: add `factor: number`, `part: string`, `principle: string` to
  the blog collection schema.
- `[...slug].astro`: render part breadcrumb ("Part IV · The Network
  Interface"), principle epigraph under the title.
- Global CSS: `figcaption` styling, footnote/sidenote styling.
- MDX is already installed (`@astrojs/mdx`) if pages need components later;
  plain `.md` + remark/rehype covers everything above without conversion.

---

## 4. Figure Strategy

### 4.1 What diagram-foundry is (from direct exploration)

`~/dev/diagram-foundry` (Bun + Vite + React 19 + Playwright + sharp/pdf-lib):

- **Creator families** own a typed data model, JSX scene, tests, and a
  manifest (`creators/<id>/creator.manifest.ts` — id, kind, entry, canvas
  w/h/scale 1–3x, formats). `packages/core` serves the entry with Vite,
  captures `#figure-canvas` in headless Chromium at 2x, validates dimensions,
  writes **PNG + WebP + PDF** (no SVG export — output is raster capture even
  for the `editorial-svg` creator kind).
- Two shipped families: `integrations-diagram` (landing-page integration map)
  and `comparison-diagram` (dark before/after panels). Both are polished,
  dark, product-marketing aesthetics — a deliberate visual language, and a
  **mismatch with the blog's austere scholarly line art** as-is.
- Authoring a new family is a real (small) software project: manifest → typed
  data model → scene components → data/geometry/label tests → `bun run check`.
  Roughly a focused day for the first family; per-figure cost after that is
  just a typed data file. Documented lifecycle in
  `docs/guides/05_creator_creation_guide.md`; quality bar in `01_quality_bar.md`;
  the workflow is brief-driven (`examples/briefs/`).
- Deterministic exports, font-wait, output validation — built to make figures
  *reusable and revisable*, which 12 hand-tuned inline SVGs currently are not.

### 4.2 The dark-mode constraint

The site's dark mode is class-toggled (`html.dark`), not media-query. Inline
`currentColor` SVGs adapt for free — this is a real advantage of the current
system. Raster exports don't; using foundry for in-article figures requires a
light/dark variant pair per figure (a `theme` input on the creator, two
exports) embedded as:

```html
<img src="/figures/f9-disclosure-light.webp" class="dark:hidden" … />
<img src="/figures/f9-disclosure-dark.webp" class="hidden dark:block" … />
```

Alt text must live in the markdown (raster loses the SVG `<title>/<desc>`).

### 4.3 Options

1. **Evolve the inline SVG system** — componentize (`Figure.astro` wrapping
   svg + `<figcaption>`), raise stroke/label opacity and size, and add 1–2
   *explanatory* diagrams per factor at the point of argument. Keeps theme
   adaptivity, zero build deps, crisp at any size. Cost: hand-authoring SVG
   remains slow and unsystematic; no reuse, no tests, no exports for decks.

2. **New foundry creator family for in-article figures** — an `editorial-svg`
   kind family ("concept-figure") encoding the blog's visual language (thin
   strokes, node-and-edge motifs, generous whitespace, Inter labels), with
   per-figure typed data and light/dark dual export. Cost: initial build + the
   dark-mode pair dance; figures become durable, testable, reusable assets
   (site, decks, README, PDF).

3. **Foundry for social/OG cards** — today every page shares one
   `/curation-og-image.png` (`Head.astro`). A "factor-card" creator (1200×630,
   factor number + title + motif) gives all 12 pages distinct share cards.
   Foundry's polished aesthetic is *right* for this surface, dark mode is
   irrelevant, and it exercises the intended brief→export workflow. Lowest
   friction, immediately visible payoff.

4. **Mermaid/D2 build-time diagrams** — rejected: generic look would break the
   site's visual system, and the diagrams needed are compositional, not
   graph-layout.

**Recommendation: hybrid.**
- In-article figures stay **inline SVG** (theme-adaptive, accessible), but
  componentized with captions and legibility fixes — and grow from 12 emblems
  to ~30 explanatory figures placed at the argument they illustrate.
- **Foundry** takes the surfaces where raster is fine and polish pays:
  per-factor OG cards, a homepage "map of the 12 factors" hero (the five-part
  framework as one system diagram — the single highest-value missing figure),
  and any deck/PDF reuse. If the inline workload proves painful, promote the
  concept-figure family (option 2) and adopt the dual-export pattern; the
  foundry authoring contract is genuinely good, so this is a low-risk fallback.
- Worth raising upstream: an SVG export mode for `editorial-svg` creators
  (serialize the rendered SVG DOM instead of screenshotting) would dissolve
  the dark-mode constraint entirely and make foundry the obvious pipeline for
  this blog. Noted in foundry's "Future Direction"-adjacent gap list.

### 4.4 Per-factor figure inventory (proposed additions)

| Factor | Existing motif (keep) | Add |
|--------|----------------------|-----|
| 01 | entropy→lattice | information vs. knowledge filter (bitstream → model update → action) |
| 02 | encoder/decoder | compression/decompression round-trip with loss annotations |
| 03 | conjecture tree | search-space frontier: exploit vs. explore branches |
| 04 | criticism funnel | conjecture → criticism → surviving knowledge pipeline |
| 05 | perception-action loop | knowledge → action → consequence → survival causal chain |
| 06 | carbon/silicon monads | spectrum of cognitive actors (human, model, org) over shared substrate |
| 07 | noisy channel | Shannon diagram with context added at encode, noise in channel, inference at decode |
| 08 | shared-frame alignment | coordination cost with vs. without shared structure (two-panel) |
| 09 | path staircase | disclosure paradox loop; stock vs. capability split of cognitive capital |
| 10 | query routing | market as knowledge router: local signals → prices → allocation |
| 11 | woven mesh | coordination mechanism ladder: firms → markets → protocols |
| 12 | flywheel | mechanism-design toolkit stack (storage, protocols, search, models, reputation) |

The homepage additionally gets the 12-factor system map (foundry, option 3).

---

## 5. Prioritized Roadmap

**Phase 1 — structure (fixes feedback #1; no new systems):**
1. Restructure all 12 factor pages per the Option B template.
2. Convert inline citations to footnotes with author/title/year; add sidenote
   rendering (rehype) with graceful fallback to end-of-page references.
3. Schema + template: part breadcrumb, principle epigraph, figcaption styles,
   related-factors block.

**Phase 2 — figures (fixes feedback #2 in-article):**
4. `Figure.astro` + legibility pass on the 12 existing SVGs (opacity, label
   size, captions).
5. Author the ~18 additional explanatory inline SVGs from the inventory, placed
   mid-argument.

**Phase 3 — foundry integration (polish + reuse):**
6. `factor-card` creator in diagram-foundry → 12 OG images, wired through
   `Head.astro` frontmatter.
7. `framework-map` figure for the homepage hero.
8. Optional, if figure demand keeps growing: `concept-figure` creator family +
   light/dark dual-export pattern; propose SVG export mode upstream.

Each phase is independently shippable; Phase 1 alone likely resolves the
majority of the feedback.

---

## 6. Open Questions for Remy

1. **Voice**: Option B expands ~350-word manifesto paragraphs into ~900-word
   explained chapters. The de-voiced compression was deliberate (task 13). Is
   expansion on the site acceptable so long as README + closing paragraph stay
   canonical?
2. **Canonical source**: after divergence, README stays the manifesto and the
   site becomes the explained edition — confirm that's the intent.
3. **LICENSE**: the uncommitted working-tree change replaces "Copyright (c)
   2025 remyjkim" with "Copyright (c) 2024-2025 Mark Horn" (the Astro Nano
   theme author) — this looks like an accidental overwrite from the theme
   update, and the repo root license should presumably remain yours (with
   theme attribution living under `docs-astro/` if desired). Left untouched;
   needs your call.
4. **Foundry upstream**: want the SVG-export idea filed as a task in
   diagram-foundry's `.ai/`?
