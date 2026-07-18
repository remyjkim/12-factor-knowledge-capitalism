# Task: Factor Page Pilot — Expanded Template on Factors 1 and 9

Executes the approved direction from `analyses/04` (Option B content template,
piloted on two factors), `analyses/05` (pilot tooling stack), and
`analyses/06` (visual target mockup, approved 2026-07-18). Branch:
`factor-page-pilot`.

## Scope

Two factor pages rebuilt to the mockup design; the other ten untouched and
unbroken. Factors: **01** (entry point, content approved via mockup) and
**09** (density stress test, new expansion).

## Workstreams

### A. Pipeline (docs-astro)
- Dependencies: `remark-directive`, `rehype-slug`, `rehype-autolink-headings`,
  `vitest` (dev).
- `src/plugins/remark-blocks.mjs` — maps `:::brief` and `:::related`
  directives to the template's HTML containers. Unit-tested (vitest) before
  implementation.
- `src/plugins/rehype-sidenotes.mjs` — restructures GFM footnotes into
  Tufte sidenote markup (superscript label + checkbox toggle + inline note
  span), matching the mockup's ≥1280px margin float / mobile toggle CSS.
  Unit-tested before implementation.

### B. Schema and template
- `content/config.ts`: optional `factor: number`, `part: string`,
  `principle: string` fields (optional so legacy factor pages keep building).
- `pages/blog/[...slug].astro`: render part breadcrumb + "Factor N of 12" and
  the principle epigraph when the fields are present.
- `styles/global.css`: brief box, sidenotes (both breakpoints), figure +
  figcaption, canonical block, references list, glossary popover, heading
  anchors, `@view-transition` opt-in.

### C. Content
- `01-knowledge-negative-entropy/index.md`: prose from the approved mockup;
  Figure 1 upgraded (contrast/labels/caption), Figure 2 (activation filter)
  added; five sidenoted citations; references section; canonical closing
  paragraph verbatim.
- `09-capital-scoring-system/index.md`: new ~850-word expansion following the
  same template; staircase figure upgraded; new disclosure-paradox loop
  figure; sidenoted citations (David, Menger, Demsetz, Romer, Weitzman,
  Arrow, Becker); canonical closing paragraph verbatim.

### D. Verification
- `pnpm build` green (runs `astro check`).
- Plugin tests green.
- Screenshots: both pilot pages, light + dark, desktop (≥1280 margin notes)
  and mobile (toggle notes); one non-pilot factor page confirmed unchanged.

## Deliberate deltas from analyses/05

- Citations in the pilot are GFM footnotes carrying an authored gloss (as the
  approved mockup shows) with a hand-authored references section.
  `rehype-citation`/`references.bib` remains the rollout plan for the data
  layer; the pilot validates the reading UX first. Rationale: the mockup's
  margin notes contain editorial glosses no bibliography generator can emit,
  and hand-authoring five references per pilot page is cheaper than wiring
  the bib pipeline before the UX is validated.
- Glossary popover ships on Factor 1 only (single term, native Popover API).

## Out of scope (rollout, after pilot review)

Remaining ten factors; scroll-driven figure reveals; foundry OG cards and
homepage framework map; sidenote generation from bib data; variable fonts.
