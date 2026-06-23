# Task Completion: Astro Site Update to v061826 and Navigation Cleanup

Companion record to `12_astro_nano_update_v061826_and_nav_cleanup.md`. Documents the executed outcome.

## Status: Complete

Every workstream in the plan is implemented and the site builds clean (`astro check` + `astro build`, 14 pages, no type errors).

## What was done

### A. Removed the demo `work` and `projects` tabs
Deleted the header nav links, the `work`/`projects` collections (`content/config.ts`), their metadata and homepage counts (`consts.ts`, `types.ts`), the `projects` union in `ArrowCard.astro`, the `projects` feed in `rss.xml.ts`, and the page + content directories (`pages/projects`, `pages/work`, `content/projects`, `content/work`).

### B. Rebuilt the 12 factor posts
Cleared the old (pre-restructure) factor folders and recreated all twelve with new slugs, titles, descriptions, and the de-voiced prose from the canonical document. New structure: Foundations (1–2), Evolution Interface (3 Exploration, 4 Criticism), Agency Interface (5 Action, 6 Cognitive Actors), Network Interface (7 Transmission, 8 Shared Structures), Knowledge Capitalism (9 Capital, 10 Market, 11 Coordination Mechanisms, 12 Mechanism Design). The removed factors (Intelligence Interface, Complex Adaptive Systems, Value Realization) are gone; Market and Coordination Mechanisms are new.

### C. Homepage
Replaced the hardcoded six-section / old-interface layout and intro with the new five-section layout and the current intro copy (including the evolution/agency/network interfaces, cognitive capital, and coordination mechanisms). Removed the broken `example.com` Connect/socials block.

### D. Ordering and metadata
Switched the blog listing sort to ascending so the index reads 1 to 12. Slug order, listing order, and prev/next now agree via sequential dates.

### E. Cleanup
Removed unused template assets from `public/` (`astro-nano.png`, `astro-sphere.jpg`, `deploy_netlify.svg`, `deploy_vercel.svg`, `lighthouse.png`, `patrick.webp`) and the now-unused `entropy02.mp4`. Kept the Curation OG image, logos, favicons, fonts, and `assets/`.

### F. Per-factor SVG figures
Authored one bespoke inline SVG per factor in a single visual system: `currentColor` plus opacity only (correct in light and dark mode), a node-and-edge line-art motif, `role="img"` with `<title>`/`<desc>`, responsive to `max-width:640px`. Concepts: entropy lattice (1), encoder/decoder (2), conjecture tree (3), criticism funnel (4), perception-action loop (5), two monad nodes (6), noisy channel (7), alignment to a shared frame (8), path-dependent staircase (9), query routing (10), woven mesh (11), and the flywheel (12). The rotation indicators on the loop (5) and flywheel (12) were corrected to read unambiguously clockwise.

## Verification
- `pnpm build` (which runs `astro check`) passes with no type errors, 14 pages built.
- All 12 factor routes render with their figure present in the output HTML.
- `/work` and `/projects` now 404; `rss.xml` and the sitemap build from blog only.
- Grep confirms no stale framework terms (`intelligence interface`, `value realization`, `complex adaptive systems`, `cognitive equity`, `cognitive stock`) remain in `src`.

## Notes
- Mid-task the Astro app was relocated from the repo root `src/` into `docs-astro/`; all changes carried over intact.
- Optional follow-ups left open: wiring real Curation Labs social/contact links into `consts.ts` (placeholders were removed from the homepage rather than shipped), and removing the `_`-prefixed leftover template images at the `docs-astro/` root.
