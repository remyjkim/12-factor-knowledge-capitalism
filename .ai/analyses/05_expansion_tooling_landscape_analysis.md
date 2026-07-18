# Expansion Tooling Landscape: Extensions, Libraries, and Plugins

Companion to `04_blog_enhancement_analysis.md`. Before designing the delivery
UI/UX for the full factor-page expansion (Option B), this catalogs every
relevant tool at our disposal — Astro ecosystem plugins, authoring formats,
reading-experience components, figure/OG tooling, and the local toolchain —
with fit assessments and a recommended stack.

Baseline: Astro 5.x + Astro Nano, `@astrojs/mdx` installed (unused), Tailwind
3 + `@tailwindcss/typography`, Inter/Lora via fontsource, class-toggled dark
mode, zero client JS except the theme toggle, 640px column, Cloudflare Pages
static output.

Guiding constraint throughout: the site's identity is austere, fast, and
zero-JS-by-default. Every tool below is judged against that posture, not just
capability.

---

## 1. Authoring Format (the root decision)

The expansion template needs repeatable structures: principle epigraph,
"In brief" box, sectioned prose, figures with captions, related-factor links,
references. Three ways to author them:

### 1a. Plain `.md` + remark/rehype plugins (recommended default)

Custom block syntax via `remark-directive` (`:::brief`, `:::figure`), with a
small remark plugin mapping directives to HTML. Astro's pipeline accepts any
unified plugin in `astro.config.mjs` (`markdown.remarkPlugins` /
`rehypePlugins`).

- Pros: content stays portable markdown (README/drafts could render the same
  source); authoring friction lowest; no component imports in content; the
  entire template is enforceable by convention.
- Cons: directive→HTML mapping is ~50–100 lines of our own plugin code;
  syntax is less discoverable than components.

### 1b. MDX (`.mdx` per factor, already installed)

A component library (`<Brief>`, `<Figure>`, `<Related>`, `<Epigraph>`) imported
in content.

- Pros: full component power inside prose; type-checked props; the natural
  home for any future interactive island; zero custom plugin code.
- Cons: content married to component names (less portable); heavier authoring;
  easy to drift from markdown purity toward JSX soup.

### 1c. Markdoc (`@astrojs/markdoc`)

Attribute-tag syntax (`{% brief %}`) with schema validation.

- Pros: validates content structure against schema — strongest guarantee all
  12 pages follow the template.
- Cons: third syntax to learn; smaller ecosystem than remark/MDX; would
  replace, not extend, the current pipeline. Overkill for 12 pages.

**Assessment**: 1a for the repeatable template; 1b held in reserve per-factor
if an interactive figure ever needs an island (MDX and .md coexist fine in one
collection). Reject 1c.

---

## 2. The remark/rehype Toolbox (citations, structure, math)

### Citations — the biggest UX lever after structure

| Tool | What it does | Fit |
|------|-------------|-----|
| `remark-gfm` footnotes | `[^1]` syntax; ships with Astro by default | Baseline — works today, zero install |
| **`rehype-citation`** | BibTeX/CSL-JSON/CFF sources; `[@shannon1948]` inline; auto-generates a styled references section; APA/Chicago/MLA/Harvard CSL styles | **Strongest fit.** Citations become structured data in a `.bib` file: authors, titles, years render properly everywhere, the references section is generated not hand-maintained, and the same `.bib` could later emit a citable BibTeX block for the whole manifesto |
| `rehype-sidenotes` / custom rehype | Restructures gfm footnotes into Tufte margin notes on wide viewports; CSS checkbox toggle on mobile (no JS) | Pairs with either of the above for display. At 640px column, margin notes need the column to sit left-of-center on desktop — a layout decision, not a blocker |

Note the composition: `rehype-citation` produces footnote-like citation marks
→ a sidenote transform can then float them into the margin. Inline scholarly
links disappear from the prose line entirely, which is the single largest
readability win available for the current text.

### Structure & wayfinding

| Tool | What it does | Fit |
|------|-------------|-----|
| Native `render()` `headings` | Astro returns the heading tree per entry — no plugin | TOC/mini-map component costs ~20 lines; use once pages have sections |
| `rehype-slug` + `rehype-autolink-headings` | Stable heading ids + anchor links | Standard; enables deep-linking to `#the-mechanism` per factor |
| `remark-directive` (+ our mapping) | `:::brief`, `:::related` blocks | The template's backbone under option 1a |
| `rehype-callouts` | Obsidian-style `> [!note]` blockquote callouts, prebuilt themes | Alternative to directives with zero custom code, but the syntax reads as "note/warning" admonitions — docs-flavored, weaker fit for essay prose |
| `rehype-figure` | Auto-wraps markdown images in `<figure>`/`<figcaption>` from alt text | Useful for raster images; our inline SVGs need a `Figure` wrapper (directive or component) regardless |

### Math

`remark-math` + `rehype-katex` render LaTeX at build time (zero client JS with
the KaTeX stylesheet). Genuinely relevant: F1 could show Shannon entropy
H = −Σp·log p, F2 compression ratios. YAGNI-flagged: adopt only if the
expanded drafts actually use formulas; ~140KB of CSS/fonts otherwise wasted.

---

## 3. Reading Experience & Navigation

| Tool | What it does | Fit |
|------|-------------|-----|
| Native CSS `@view-transition` | Cross-document view transitions in pure CSS — no router, no JS | Preferred over Astro's `<ClientRouter />` (which swaps in a JS router and its failure modes). Smooth prev/next factor navigation while preserving the zero-JS posture; progressive enhancement (older browsers just navigate) |
| Astro `<ClientRouter />` | SPA-style transitions + lifecycle events | More control (persistent elements, custom animations) at the cost of client JS; ecosystem has begun moving back to the native CSS approach. Hold unless native proves insufficient |
| Reading progress bar | ~15 lines vanilla scroll listener, or `astro-loading-indicator` with ClientRouter | Nice-to-have; cheap either way; fits "long read" pages post-expansion |
| **Native Popover API / `<details>`** | Baseline-supported, attribute-driven popovers with zero JS | The glossary answer: coined terms ("cognitive capital", "knowledge activation") get a `<dfn>`-styled trigger revealing a definition popover, plus a link to the defining factor. No tooltip library needed |
| Pagefind (`astro-pagefind`) | Rust-built static search, index loaded on demand | Excellent tool, wrong size: 12 essay pages don't need search. Revisit if the site grows (glossary page, appendices, future essays) |
| Variable fonts | `@fontsource-variable/inter` / `lora` | Swap-in replacement; finer weight control for the epigraph/heading hierarchy at similar payload; low-priority polish |
| `@tailwindcss/typography` customization | Theme-level prose overrides in `tailwind.config.mjs` | Where epigraph, figcaption, references, and callout styling should live — extend the existing system rather than adding CSS files |

Wayfinding beyond tools: part breadcrumb + factor number come from the schema
additions already specified in doc 04 (frontmatter `factor`, `part`,
`principle`) — no library involved.

---

## 4. Figures & Interactivity

Doc 04 settled the core strategy (inline SVG in-article; diagram-foundry for
OG cards + homepage map). The tooling additions this investigation surfaces:

| Tool | What it does | Fit |
|------|-------------|-----|
| `Figure.astro` + SVG-as-Astro-components | Each diagram an `.astro` file (SVG + props), imported via directive/MDX; caption slot; currentColor theming | The delivery vehicle for the ~30-figure inventory; makes figures reviewable code rather than markdown blobs |
| CSS scroll-driven animations (`animation-timeline: view()`) | Figures draw in / stages reveal as they enter the viewport — pure CSS, baseline in modern browsers | The zero-JS path to "the figure builds up as you reach it"; respects `prefers-reduced-motion` trivially. The tasteful ceiling for a manifesto site |
| Astro islands (React already available via foundry familiarity; Preact/Svelte lighter) | Distill-style explorable widgets (e.g., drag a slider, watch entropy drop) | Highest ceiling, real cost: first island adds a framework runtime to a zero-JS site. Reserve for at most 1–2 flagship interactions (F1 entropy, F10 price-signal routing) and only after static figures ship. If adopted: Preact or Svelte for bundle size, `client:visible` hydration |
| AstroAnimate / animation libraries | Prebuilt entry/scroll animation patterns | Unnecessary — the site's `.animate` class + CSS scroll timelines cover it without a dependency |
| SVG `<animate>`/SMIL or CSS keyframes inside figures | Self-contained animated diagrams (e.g., F7's signal traversing the channel) | Zero-JS motion inside the existing figure system; underused option worth prototyping in the pilot |

---

## 5. OG / Social Card Tooling (three viable pipelines)

| | satori (+ resvg) | astro-og-canvas | diagram-foundry |
|---|---|---|---|
| Model | JSX/HTML+CSS → SVG → PNG at build | Declarative config → CanvasKit PNG at build | React scene → Playwright capture, out-of-repo |
| Integration | In-repo endpoint (`/og/[slug].png`) — cards regenerate on every build from frontmatter | Same, less flexible layout (no JSX) | Manual export, copy into `public/` |
| Fidelity/control | High (flexbox subset, font quirks) | Medium | Highest (full browser render, foundry quality bar) |
| Maintenance | Auto-syncs with titles | Auto-syncs | Regenerate by hand when titles change |
| Fit | Best ongoing ergonomics | Simplest setup | Best visual ceiling + reuses the factor-card design for decks/print |

**Assessment**: genuine either/or between satori-in-repo (self-maintaining)
and foundry (higher craft, manual sync). Twelve mostly-stable titles make the
sync cost trivial, and doc 04 already plans a foundry `factor-card` creator —
so foundry remains the recommendation, with satori noted as the fallback if
card content ever becomes dynamic (e.g., per-section cards, future essays).

---

## 6. Local Toolchain (non-npm assets we already hold)

- **diagram-foundry** — figure/OG pipeline (fully assessed in doc 04).
- **Chrome DevTools MCP + Lighthouse + a11y audit** — verification loop for
  the redesign: screenshot factor pages in both themes at mobile/desktop
  widths, contrast checks on the new prose styles, CWV regression checks
  after adding KaTeX/fonts/transitions.
- **Design-pass skills** (frontend-design, impeccable suite: typeset, arrange,
  critique, polish) — structured design iterations on the new page template
  before rolling it across all 12 factors.
- **Deployment** — existing Wrangler/Cloudflare Pages flow unchanged; preview
  branches give a review URL for the pilot factors.

---

## 7. Holistic Alternatives Considered and Rejected

- **Starlight** — sidebar/TOC/search/dark-mode out of the box, but it is
  documentation chrome: persistent sidebar nav, doc-site information scent.
  The manifesto's genre is an essay sequence; retrofitting Starlight means
  fighting its shell. Its *patterns* (TOC, asides) are worth borrowing as
  ~50-line components, not as a framework adoption.
- **Mintlify** — already evaluated and abandoned (tasks 08–11) in favor of
  Astro Nano; nothing in this investigation changes that call.
- **Theme migration (AstroPaper, Cactus, etc.)** — the current Nano base is
  customized, deployed, and liked; swapping themes replays sunk work for
  marginal gain.
- **Docusaurus/Next.js** — heavier runtimes against the site's core virtue.

---

## 8. Recommended Stack (maps to the Option B template)

**Adopt in the pilot (2 factors):**

1. `remark-directive` + ~80-line custom mapping — `:::brief`, `:::related`,
   `:::figure` blocks (template backbone).
2. `rehype-citation` + shared `references.bib` — `[@key]` citations,
   generated per-page references section (Chicago author-date suggested).
3. `rehype-slug` + `rehype-autolink-headings` — anchors for sections.
4. `Figure.astro` + figures as SVG components with captions.
5. Schema additions (`factor`, `part`, `principle`) + epigraph/breadcrumb in
   the page template.
6. Prose styling pass via `@tailwindcss/typography` theme extension.
7. Native CSS `@view-transition` for prev/next continuity.

**Adopt in full rollout (if pilot validates):**

8. Sidenote rendering of citations on wide viewports (custom rehype, Tufte
   pattern).
9. Glossary terms via native Popover API + a small glossary data file.
10. CSS scroll-driven reveals on figures; SMIL/CSS motion inside 2–3 figures.
11. Foundry `factor-card` OG creator + `framework-map` homepage hero (doc 04
    Phase 3).

**Deliberately deferred (YAGNI until a trigger):**

- KaTeX (trigger: expanded drafts actually need formulas).
- Pagefind (trigger: content grows beyond the 12 essays).
- Islands/explorables (trigger: static figures shipped and a flagship
  interaction has a proven story; then Preact/Svelte, `client:visible`).
- Variable fonts, reading progress bar (polish batch, any time).
- satori OG endpoint (trigger: card content becomes dynamic).

**Rejected:** Markdoc, rehype-callouts (docs-flavored), Starlight/Mintlify/
theme migration, ClientRouter (unless native transitions prove insufficient),
AstroAnimate.

---

## 9. Sources

- Astro docs: render()/headings, remark/rehype config, view transitions —
  docs.astro.build
- rehype-citation — github.com/timlrx/rehype-citation
- remark-directive — github.com/remarkjs/remark-directive
- rehype-callouts — github.com/lin-stephanie/rehype-callouts
- Tufte sidenotes in Astro — keith.is/post/tufte-sidenotes-in-astro
- Footnotes in Astro — andrewhoog.com (how-to-annotate-blog-posts)
- Useful markdown plugins for Astro — ryanwelch.co.uk
- OG images: astro-og-canvas — fullmetalbrackets.com; satori build-time —
  dietcode.io/p/astro-og, knaap.dev
- Dropping ClientRouter for native view transitions — joost.blog
- astro-loading-indicator — github.com/florian-lefebvre/astro-loading-indicator
- Pagefind for Astro — github.com/shishkin/astro-pagefind
- Starlight — starlight.astro.build
- Interactive demos with Astro islands — avikdas.com
