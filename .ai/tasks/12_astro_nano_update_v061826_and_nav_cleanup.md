# Task: Update Astro Nano Site to the v061826 Factors and Remove Demo Tabs

## Overview

The live site is the **Astro Nano** app under `src/`. Its content is the **pre-restructure** version of the 12 factors and still carries the Astro Nano template's demo `work` and `projects` sections in the header. This task brings the site fully in line with the current canonical draft, `12F_v061826.md`, and strips the unneeded navigation.

Two goals:
1. **Content** — replace the 12 blog posts and the homepage with the latest factor set, structure, titles, and de-AI-voiced prose from `12F_v061826.md`.
2. **Navigation** — remove the demo `work` and `projects` tabs and all code/content/collections that support them.

**Source of truth for all factor text:** `/12F_v061826.md` (root of repo). Do not re-edit prose here; copy each factor's body verbatim.

This task assumes we continue on **Astro Nano**. The Mintlify conversion (tasks 08–11) is a separate, parallel track and is out of scope here.

---

## Current State (as investigated)

### Stack
- Astro 5, `@astrojs/mdx`, sitemap, tailwind. Config: `astro.config.mjs` (`site: https://knowledgecapitalism.com`).
- Content collections (`src/content/config.ts`): **`blog`** (the factors), **`work`** (demo: apple/facebook/google/mcdonalds), **`projects`** (demo: project-1/project-2).

### The blog is stale (old structure)
`src/content/blog/` holds 12 folders, each `index.md` with frontmatter (`title`, `description`, `date`) + body. The structure is the **old** one:

| Old slug | Old title | Status vs. v061826 |
|---|---|---|
| 01-knowledge-negative-entropy | Knowledge is Negative Entropy | content rewrite |
| 02-language-compresses-knowledge | Language Compresses and Carries Knowledge | content rewrite |
| 03-agency-interface | The Agency Interface Translates Knowledge into Action | → becomes **Factor 5** (Action) |
| 04-cognitive-actors | Cognitive Actors Are the Nodes of Agency | → becomes **Factor 6** (heavily updated) |
| 05-intelligence-interface | The Intelligence Interface Expands Knowledge… | **REMOVED** (interface renamed Evolution; split into new 3/4) |
| 06-exploration-discovery | Exploration is the Sovereign Act… | → folds into **Factor 3** (Exploration) |
| 07-network-interface | The Network Interface Routes Knowledge Through Context | → becomes **Factor 7** (Transmission) |
| 08-coordination-communication | Coordination Requires Shared Beliefs… | → becomes **Factor 8** (Shared Structures) |
| 09-complex-adaptive-systems | Networks Form Complex Adaptive Systems | **REMOVED** (folded into Capital's bridge line) |
| 10-value-realization | Value Realization Spans… | **REMOVED** (folded into Capital) |
| 11-knowledge-capital | Knowledge Capital is the Emerging Asset Class | → becomes **Factor 9** (Capital, reframed) |
| 12-mechanism-design | The Ultimate Objective is Mechanism Design… | → becomes **Factor 12** (reframed) |

New factors **10 (Market)** and **11 (Coordination Mechanisms)** have **no old equivalent** — they are net-new posts.

### Ordering mechanics (important)
- **Homepage** (`src/pages/index.astro`): sorts blog by `slug.localeCompare` and slices sections by **slug prefix** (`01-`, `02-`, …). Section titles + intro paragraph are hardcoded here and are **old** (six sections; "agency, intelligence, and network").
- **Blog listing** (`src/pages/blog/index.astro`): groups by year, sorts by **date DESC** → currently shows factors **12 → 1** (reverse). Likely undesirable for a sequential framework.
- **Post page** (`src/pages/blog/[...slug].astro`): prev/next computed from **date DESC**. So sequential dates must ascend with factor number for prev/next to read correctly.
- Net: **both slug order and date order must agree** with factor order.

### Media
- Only `01-…/index.md` references media in-body: a `<video src="/entropy02.mp4">` (file lives in `public/entropy02.mp4`).
- **Unused** image/video files sitting in blog folders (not referenced anywhere): `01/entropy01.jpeg`, `02/capital_layers.jpeg`, `02/capital_layers_02.jpeg`, `02/capital_layers.mp4`, `02/capital_tiles.jpeg`, `02/chess_loop.jpeg`, `02/language_limit_world.mp4`, `07/Machines-connections-kathy-lee.jpeg`.

### Demo tabs (`work` + `projects`) — exhaustive reference map
| File | What references work/projects |
|---|---|
| `src/components/Header.astro` | nav links `/work` and `/projects` (lines 22–30) |
| `src/consts.ts` | `WORK` + `PROJECTS` metadata; `NUM_WORKS_ON_HOMEPAGE`, `NUM_PROJECTS_ON_HOMEPAGE` |
| `src/types.ts` | `NUM_WORKS_ON_HOMEPAGE`, `NUM_PROJECTS_ON_HOMEPAGE` in `Site` type |
| `src/content/config.ts` | `work` + `projects` collections; `collections` export |
| `src/components/ArrowCard.astro` | type union `CollectionEntry<"projects">` |
| `src/pages/rss.xml.ts` | imports `projects`, merges into feed `items` |
| `src/pages/projects/index.astro`, `src/pages/projects/[...slug].astro` | whole pages |
| `src/pages/work/index.astro` | whole page |
| `src/content/work/*`, `src/content/projects/*` | demo content |

(`src/pages/index.astro:51` "excellent work on" is prose — not a reference.)

---

## Target Factor Structure (12F_v061826)

5 sections, 12 factors. Proposed slugs (numbered to drive order) and frontmatter:

| New # | Folder slug | Frontmatter title | Section | Content source |
|---|---|---|---|---|
| 1 | `01-knowledge-negative-entropy` | Factor 1: Knowledge is Negative Entropy | I. Foundations | v061826 §1 |
| 2 | `02-language-compresses-knowledge` | Factor 2: Language Compresses and Carries Knowledge | I. Foundations | v061826 §2 |
| 3 | `03-exploration-conjectures` | Factor 3: Exploration Creates New Conjectures | II. The Evolution Interface | v061826 §3 |
| 4 | `04-criticism-knowledge` | Factor 4: Criticism Hardens Conjecture into Knowledge | II. The Evolution Interface | v061826 §4 |
| 5 | `05-action-survival` | Factor 5: Action is the Only Causal Chain to Survival | III. The Agency Interface | v061826 §5 |
| 6 | `06-cognitive-actors` | Factor 6: Cognitive Actors Are the Nodes of Agency | III. The Agency Interface | v061826 §6 |
| 7 | `07-transmission-context-noise` | Factor 7: Transmission Adds Context and Noise to the Core Message | IV. The Network Interface | v061826 §7 |
| 8 | `08-shared-structures-coordination` | Factor 8: Shared Structures Enable Coordination at Scale | IV. The Network Interface | v061826 §8 |
| 9 | `09-capital-scoring-system` | Factor 9: Capital is a Path-Dependent Scoring System | V. Knowledge Capitalism | v061826 §9 |
| 10 | `10-market-knowledge-utilization` | Factor 10: The Market is a Knowledge-Utilization Machine | V. Knowledge Capitalism | v061826 §10 |
| 11 | `11-coordination-mechanisms` | Factor 11: Coordination Mechanisms Scale Civilization | V. Knowledge Capitalism | v061826 §11 |
| 12 | `12-mechanism-design-welfare` | Factor 12: Mechanism Design and the Tools to Maximize Welfare | V. Knowledge Capitalism | v061826 §12 |

- **Body** = the factor's de-voiced prose from `12F_v061826.md` (citation markdown links drop in unchanged). Do **not** include the `### N.` heading in the body (the title comes from frontmatter).
- **`description`** = the factor's opening sentence (de-voiced), shown on the ArrowCard.
- **`date`** = sequential `2026-01-01` … `2026-01-12` so slug order, listing order, and prev/next all agree.

---

## Workstreams

### A. Remove demo `work` + `projects` (do this first — yields a clean, building blog-only site)
1. `src/components/Header.astro` — delete the `/work` and `/projects` `<Link>`s and their `/` separators. Leave the single `blog` link (or rename to "the 12 factors" — see Decisions).
2. `src/content/config.ts` — delete `work` and `projects` collections; `export const collections = { blog }`.
3. `src/consts.ts` — delete `WORK` and `PROJECTS` exports and the `NUM_WORKS_ON_HOMEPAGE` / `NUM_PROJECTS_ON_HOMEPAGE` fields of `SITE`.
4. `src/types.ts` — remove `NUM_WORKS_ON_HOMEPAGE` and `NUM_PROJECTS_ON_HOMEPAGE` from the `Site` type.
5. `src/components/ArrowCard.astro` — change `Props.entry` to `CollectionEntry<"blog">` only.
6. `src/pages/rss.xml.ts` — remove the `projects` collection import and merge; feed = blog only.
7. **Delete files/dirs:** `src/pages/projects/`, `src/pages/work/`, `src/content/projects/`, `src/content/work/`.
8. Build to confirm no dangling imports (`PROJECTS`/`WORK` were only imported by the now-deleted pages).

### B. Migrate blog content (12 factors)
1. Delete all 12 **old** factor folders under `src/content/blog/`.
2. Create the 12 **new** folders per the Target table, each with `index.md` (frontmatter + de-voiced body from `12F_v061826.md`).
3. Media: each post embeds its bespoke SVG figure (Workstream F). Remove the old raster media from blog folders (`entropy01.jpeg`, the `<video>` reference, and the 8 unused files under `02/` and `07/`).

### C. Update the homepage (`src/pages/index.astro`)
1. Replace the hardcoded intro `<p>` blocks with the **new de-voiced intro** from `12F_v061826.md` (split into 2–3 paragraphs around the existing `/assets/hand-in-hand.jpeg`). Note the old intro says "(agency, intelligence, and network)" — new is "(evolution, agency, and network)".
2. Replace the 6-entry `sections` array with **5 sections** and updated slug-prefix filters:
   - `I. Foundations` → `01-`, `02-`
   - `II. The Evolution Interface` → `03-`, `04-`
   - `III. The Agency Interface` → `05-`, `06-`
   - `IV. The Network Interface` → `07-`, `08-`
   - `V. Knowledge Capitalism` → `09-`, `10-`, `11-`, `12-`

### D. Ordering fix + metadata polish
1. **`src/pages/blog/index.astro`** — current sort is date DESC (shows 12→1). Change to **ascending** (date or slug) so the listing reads 1→12. (Recommended; confirm in Decisions.)
2. `src/consts.ts` — optionally refresh `BLOG.DESCRIPTION` / `HOME.DESCRIPTION` to the new language; replace placeholder `EMAIL` (`contact@example.com`) and `SOCIALS` (`example.com`) or remove the Connect/socials block.

### F. Per-factor SVG figures
Design and embed one bespoke **inline SVG** per factor that illustrates that factor's core idea. Astro markdown renders raw HTML, so the SVG goes inline at the top of each `index.md` (the same mechanism the old Factor 1 used for its `<video>`).

**Technical + consistency rules:**
- **Inline `<svg>`** with a `viewBox` and a `width:100%; max-width` wrapper; `role="img"` plus `<title>`/`<desc>` for accessibility.
- **Theme-aware:** colors via `currentColor` (or Tailwind `text-*` / `dark:` utility classes), never hardcoded black/white, so figures read in both light and dark mode.
- **Shared visual language:** one consistent stroke weight, node/edge motif, type scale, and a small accent palette across all 12, so the set feels like a single system.
- Schematic and legible at mobile width.

**Per-factor figure concept (starting point, refine during design):**

| # | Factor | Figure concept |
|---|---|---|
| 1 | Negative Entropy | Scattered/noisy dots resolving into an ordered lattice; arrow from high to low entropy |
| 2 | Language | Encoder→decoder: rich reality compressed to symbols, reconstructed in another mind |
| 3 | Exploration / Conjectures | A seeker branching outward into unknown space; a tree of candidate guesses |
| 4 | Criticism | A funnel/sieve: many conjectures enter, few survive; the "hard-to-vary" core remains |
| 5 | Action / Survival | The perception–action loop: belief → action → reality → feedback |
| 6 | Cognitive Actors | A monad node holding its own world-model; carbon and silicon nodes side by side |
| 7 | Transmission | A signal crossing a channel and accreting context + noise between sender and receiver |
| 8 | Shared Structures | Divergent nodes snapping into alignment around a shared reference frame |
| 9 | Capital / Scoring | A path-dependent trajectory accumulating score; a ratchet / lock-in |
| 10 | Market | A query routed to matching knowledge; a price aggregating dispersed signals |
| 11 | Coordination Mechanisms | Many autonomous nodes woven into a coherent whole by connective mechanisms |
| 12 | Mechanism Design | The flywheel: discovery → application → reinvestment, accelerating each turn |

Recommended: establish the shared visual system first (optionally via the `frontend-design` skill), then hand-tune each of the 12 figures.

### E. Optional template cleanup (low priority)
- Unused `public/` template assets: `astro-nano.png`, `astro-sphere.jpg`, `patrick.webp`, `deploy_netlify.svg`, `deploy_vercel.svg`, `lighthouse.png`.
- Unused blog-folder media listed under Current State → Media.

---

## Decisions (Resolved)

1. **Visual media → bespoke SVG figures.** Each factor page gets a custom-designed SVG diagram (Workstream F). All old raster media is dropped (the Factor 1 video and the 8 unused blog-folder images).
2. **Header nav →** keep a single `blog` link.
3. **Blog listing order →** ascending (1→12).
4. **Socials/email →** replace placeholders with real Curation Labs handles where known; otherwise remove the Connect/socials block (confirm handles at implementation).
5. **Slugs →** use the new numbered slugs from the Target table (accept that URLs change).
6. **Dates →** sequential `2026-01-01` … `2026-01-12`.

---

## Verification
- `pnpm build` (runs `astro check && astro build`) passes with **no type errors** — confirms `work`/`projects` removal left no dangling imports and the blog schema validates.
- Homepage renders **5 section groups** with **12 cards** in order; intro text is the new copy.
- Each `/blog/<slug>` renders; prev/next reads 1↔12 in sequence; "Back to home" works.
- `/work` and `/projects` now **404**; `rss.xml` builds from blog only; `sitemap` regenerates.
- Grep check: `grep -rniE "intelligence interface|value realization|complex adaptive|cognitive equity" src` returns nothing in shipped content.
- Each factor page shows its SVG figure, legible in **both light and dark mode** (no hardcoded colors).

## Suggested Execution Order
A (remove demo tabs) → build → B (blog content) → C (homepage) → D (ordering/metadata) → verify → E (optional cleanup).
