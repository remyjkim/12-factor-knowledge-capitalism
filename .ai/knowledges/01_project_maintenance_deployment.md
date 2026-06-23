# 12 Factors of Knowledge Capitalism: Maintenance & Deployment Guide

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Local Development](#local-development)
5. [Content Management](#content-management)
6. [Media Management](#media-management)
7. [Styling and Theme](#styling-and-theme)
8. [Building for Production](#building-for-production)
9. [Deployment to Cloudflare Pages](#deployment-to-cloudflare-pages)
10. [Common Maintenance Tasks](#common-maintenance-tasks)
11. [Configuration Reference](#configuration-reference)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

This is a static website built with Astro Nano presenting the 12 Factors of Knowledge Capitalism as a manifesto-style site. The site is designed as a comprehensive, citable resource with scholarly references and sequential navigation through the factors.

### Key Characteristics

- **Static Site**: All pages are pre-rendered at build time for optimal performance
- **Table of Contents Homepage**: Organized into six sections with ArrowCard navigation
- **Sequential Factor Navigation**: Previous/Next navigation through all 12 factors
- **Scholarly References**: Extensive inline citations with hyperlinks
- **Multimedia Support**: Videos and images embedded in content
- **Deployed on**: Cloudflare Pages at https://knowledgecapitalism.com

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Astro** | Static site generator | 5.17.1 |
| **Astro Nano** | Minimalist theme/template | 1.1.1 |
| **Tailwind CSS** | Styling framework | 3.4.19 |
| **MDX** | Markdown with component support | 4.3.13 |
| **pnpm** | Package manager | 10.16.0 |
| **Cloudflare Pages** | Hosting & deployment | - |
| **Wrangler** | Cloudflare CLI | 4.54.0+ |

---

## Project Structure

```
12-factor-info-capitalism/
├── .ai/
│   ├── analyses/          # Reference documentation
│   ├── knowledges/        # Project guides (this file)
│   └── tasks/             # Task planning files
├── public/
│   ├── entropy02.mp4      # Video assets served statically
│   ├── favicon.svg
│   └── _headers           # (Optional) Cloudflare headers config
├── src/
│   ├── components/        # Reusable Astro components
│   │   ├── ArrowCard.astro      # Card component for factors
│   │   ├── BackToPrev.astro     # Back navigation
│   │   ├── Container.astro      # Layout wrapper
│   │   ├── Footer.astro         # Site footer
│   │   ├── Header.astro         # Site header
│   │   ├── FormattedDate.astro  # Date display
│   │   └── Link.astro           # Link component
│   ├── content/
│   │   ├── blog/          # Factor content (uses blog collection)
│   │   │   ├── 01-knowledge-negative-entropy/
│   │   │   │   ├── index.md
│   │   │   │   └── entropy02.mp4  # Factor-specific media
│   │   │   ├── 02-language-compresses-knowledge/
│   │   │   │   └── index.md
│   │   │   └── ... (03 through 12)
│   │   ├── projects/      # Unused (from template)
│   │   ├── work/          # Unused (from template)
│   │   └── config.ts      # Content collections schema
│   ├── layouts/
│   │   └── PageLayout.astro     # Main page layout
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro      # Factor listing page
│   │   │   └── [...slug].astro  # Individual factor pages
│   │   ├── projects/      # Unused (from template)
│   │   ├── work/          # Unused (from template)
│   │   ├── index.astro    # Homepage with TOC
│   │   ├── robots.txt.ts
│   │   └── rss.xml.ts     # RSS feed generator
│   ├── styles/
│   │   └── global.css     # Global styles + Tailwind
│   ├── consts.ts          # Site configuration
│   └── types.ts           # TypeScript types
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── README.md              # Original manifesto text

```

---

## Local Development

### Prerequisites

- **Node.js**: v18.14.1 or later
- **pnpm**: v10.16.0 or later
- **Wrangler**: v4.54.0 or later (for deployment)

### Installation

```bash
# Clone or navigate to the project
cd 12-factor-info-capitalism

# Install dependencies
pnpm install
```

### Development Server

```bash
# Start dev server (default: http://localhost:4321)
pnpm run dev

# Start dev server accessible on local network
pnpm run dev:network
```

### Development Workflow

1. Start the dev server: `pnpm run dev`
2. Make changes to content or components
3. Browser auto-refreshes on save
4. Check console for any errors

**Hot Module Replacement (HMR)** is enabled - changes appear instantly without full page reload.

---

## Content Management

### Factor Structure

Each factor is a separate directory under `src/content/blog/` with the naming pattern:
```
01-knowledge-negative-entropy/
02-language-compresses-knowledge/
...
12-mechanism-design/
```

### Editing a Factor

1. Navigate to the factor directory (e.g., `src/content/blog/01-knowledge-negative-entropy/`)
2. Open `index.md`
3. Edit the content

**Frontmatter structure:**
```yaml
---
title: "Factor 1: Knowledge is Negative Entropy"
description: "Brief description for SEO and previews"
date: "2026-01-01"
---
```

**Important**:
- Factor 1 uses `2026-01-01`, Factor 2 uses `2026-01-02`, etc. (sequential dates for ordering)
- The `title` should include "Factor N:" prefix
- `description` is used in meta tags and card previews

### Content Formatting

The content uses Markdown with support for:

**Links:**
```markdown
[Information theory](https://example.com/paper.pdf)
```

**Inline HTML (for videos):**
```html
<video controls style="width: 100%; max-width: 800px; margin: 2rem 0;">
  <source src="/entropy02.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

**Headings:**
```markdown
## Section Heading
### Subsection Heading
```

### Adding a New Factor

If you need to add a 13th factor:

1. Create directory: `src/content/blog/13-new-factor-name/`
2. Create `index.md` with proper frontmatter:
   ```yaml
   ---
   title: "Factor 13: New Factor Name"
   description: "Description here"
   date: "2026-01-13"
   ---
   ```
3. Update `src/pages/index.astro` to include it in the appropriate section
4. The navigation will automatically include it

### Editing Homepage Sections

The homepage (`src/pages/index.astro`) organizes factors into six sections:

```javascript
const sections = [
  {
    title: "I. Foundations",
    factors: allPosts.filter(p => p.slug.startsWith("01-") || p.slug.startsWith("02-"))
  },
  {
    title: "II. The Agency Interface",
    factors: allPosts.filter(p => p.slug.startsWith("03-") || p.slug.startsWith("04-"))
  },
  // ... etc
];
```

To reorganize sections, edit the `sections` array in `src/pages/index.astro`.

### Editing Introduction Text

The homepage introduction is in `src/pages/index.astro` around lines 35-50:

```astro
<article class="space-y-4">
  <p class="animate">
    Inspired by the original <Link href="https://12factor.net/">12-Factor App</Link>...
  </p>
  <!-- Edit these paragraphs -->
</article>
```

---

## Media Management

### Video Files

**Location**: Videos should be placed in `/public/` directory

**Example**: The Factor 1 video is at:
- Source: `public/entropy02.mp4`
- Referenced in markdown as: `/entropy02.mp4`

**Adding a video to a factor:**

1. Copy video to `public/`:
   ```bash
   cp /path/to/video.mp4 public/my-video.mp4
   ```

2. Reference in factor's `index.md`:
   ```html
   <video controls style="width: 100%; max-width: 800px; margin: 2rem 0;">
     <source src="/my-video.mp4" type="video/mp4" />
     Your browser does not support the video tag.
   </video>
   ```

**Note**: Files in `public/` are served at the root URL. A file at `public/video.mp4` is accessible as `https://knowledgecapitalism.com/video.mp4`

### Image Files

**For images**, you can use either:

1. **Public directory** (for static images):
   ```markdown
   ![Alt text](/image.png)
   ```

2. **Astro's optimized images** (recommended for better performance):
   ```astro
   ---
   import { Image } from 'astro:assets';
   import myImage from '../assets/image.png';
   ---
   <Image src={myImage} alt="Description" />
   ```

---

## Styling and Theme

### Color Scheme

The site uses **Tailwind CSS** with a light/dark mode toggle. Colors are defined in:
- `src/styles/global.css` - CSS custom properties
- `tailwind.config.mjs` - Tailwind theme extensions

### Dark Mode

Managed by `src/components/Footer.astro` with three modes:
- **Light mode**
- **Dark mode**
- **System preference** (follows OS setting)

Users can toggle between modes using the footer icons.

### Typography

The site uses:
- `@fontsource/inter` - Main sans-serif font
- `@fontsource/lora` - Serif font for headings
- `@tailwindcss/typography` - Prose styling for content

### Customizing Styles

**Global styles**: Edit `src/styles/global.css`

**Tailwind configuration**: Edit `tailwind.config.mjs`

**Component-specific styles**: Use Tailwind classes directly in `.astro` files

---

## Building for Production

### Build Command

```bash
pnpm run build
```

**Build process:**
1. TypeScript type checking (`astro check`)
2. Content collection syncing
3. Static page generation
4. Asset optimization
5. Output to `dist/` directory

### Build Output

The `dist/` folder contains:
```
dist/
├── _astro/           # Bundled CSS/JS with hashed filenames
├── blog/             # Factor pages as static HTML
│   ├── 01-knowledge-negative-entropy/index.html
│   ├── 02-language-compresses-knowledge/index.html
│   └── ...
├── entropy02.mp4     # Static assets from public/
├── favicon.svg
├── index.html        # Homepage
├── robots.txt
├── rss.xml
└── sitemap-index.xml
```

### Verifying the Build

```bash
# Preview the production build locally
pnpm run preview

# Or preview on local network
pnpm run preview:network
```

Visit the URL shown (usually `http://localhost:4321`) to test the built site.

### Build Artifacts

**Important files generated:**
- `sitemap-index.xml` - For search engines
- `rss.xml` - RSS feed of factors
- `robots.txt` - Search engine directives

---

## Deployment to Cloudflare Pages

### Prerequisites

1. **Cloudflare account** with domain `knowledgecapitalism.com`
2. **Wrangler CLI** installed and authenticated
3. **Built site** in `dist/` directory

### Authentication Check

```bash
# Verify you're logged in
wrangler whoami
```

If not authenticated:
```bash
wrangler login
```

### Deployment Workflow

**Standard deployment process:**

```bash
# 1. Build the site
pnpm run build

# 2. Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name knowledge-capitalism --branch main
```

**Deployment outputs:**
- Unique deployment URL: `https://[hash].knowledge-capitalism.pages.dev`
- Production URL: `https://knowledge-capitalism.pages.dev`
- Custom domain: `https://knowledgecapitalism.com`

### Branch Deployments (Preview)

For testing changes before production:

```bash
# Deploy to a preview branch
git checkout -b feature-branch
pnpm run build
wrangler pages deploy dist --project-name knowledge-capitalism --branch feature-branch
```

This creates a preview URL: `https://feature-branch.knowledge-capitalism.pages.dev`

### Deployment Verification

After deployment:

1. **Check the deployment URL** provided by Wrangler
2. **Visit the site** and verify:
   - Homepage loads correctly
   - All 12 factors are accessible
   - Navigation works (Previous/Next)
   - Media files load (video on Factor 1)
   - Dark mode toggle works
3. **Check production domain**: https://knowledgecapitalism.com

### Viewing Deployment History

```bash
# List recent deployments
wrangler pages deployment list --project-name knowledge-capitalism
```

### Rollback Procedure

If a deployment has issues:

1. **Keep previous build artifacts** - Git tag important releases
2. **Redeploy a previous build**:
   ```bash
   git checkout <previous-tag>
   pnpm run build
   wrangler pages deploy dist --project-name knowledge-capitalism --branch main
   ```

---

## Common Maintenance Tasks

### Updating a Factor's Content

```bash
# 1. Edit the factor
vim src/content/blog/05-intelligence-interface/index.md

# 2. Test locally
pnpm run dev

# 3. Build and deploy
pnpm run build
wrangler pages deploy dist --project-name knowledge-capitalism --branch main
```

### Updating Site Metadata

**Site name, email, social links**: Edit `src/consts.ts`

```typescript
export const SITE: Site = {
  NAME: "12 Factors of Knowledge Capitalism",
  EMAIL: "contact@example.com",
  NUM_POSTS_ON_HOMEPAGE: 6,
  NUM_WORKS_ON_HOMEPAGE: 0,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A framework for understanding how knowledge creates value...",
};

export const SOCIALS: Socials = [
  { NAME: "twitter-x", HREF: "https://twitter.com/example" },
  { NAME: "github", HREF: "https://github.com/example" },
  { NAME: "linkedin", HREF: "https://www.linkedin.com/in/example" },
];
```

### Updating Copyright Year

Edit `src/components/Footer.astro`:

```astro
<div>
  &copy; 2026 {`|`} {SITE.NAME}
</div>
```

### Adding New Dependencies

```bash
# Install a new package
pnpm add package-name

# For development dependencies
pnpm add -D package-name
```

Then rebuild and deploy.

### Updating Dependencies

```bash
# Update all dependencies to latest versions
pnpm update

# Update specific package
pnpm update astro

# Check for outdated packages
pnpm outdated
```

**Important**: Test thoroughly after updating dependencies.

---

## Configuration Reference

### astro.config.mjs

```javascript
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://knowledgecapitalism.com",  // Production URL
  integrations: [mdx(), sitemap(), tailwind()],
});
```

**Key settings:**
- `site` - Used for sitemap and RSS feed URLs
- `integrations` - Plugins enabled for the site

### src/consts.ts

Primary configuration file for site content:

```typescript
export const SITE: Site = {
  NAME: "12 Factors of Knowledge Capitalism",
  EMAIL: "contact@example.com",
  NUM_POSTS_ON_HOMEPAGE: 6,        // Factors shown on homepage
  NUM_WORKS_ON_HOMEPAGE: 0,         // Not used
  NUM_PROJECTS_ON_HOMEPAGE: 0,      // Not used
};
```

### package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "dev:network": "astro dev --host",
    "sync": "astro sync",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "preview:network": "astro preview --host"
  }
}
```

---

## Troubleshooting

### Build Errors

**Error: TypeScript errors during `astro check`**

```bash
# Regenerate types
pnpm run sync

# Then rebuild
pnpm run build
```

**Error: Module not found**

```bash
# Clear cache and reinstall
rm -rf node_modules/.astro
pnpm install
pnpm run build
```

### Deployment Errors

**Error: "Project not found"**

```bash
# Verify project exists
wrangler pages project list

# Create if needed
wrangler pages project create knowledge-capitalism --production-branch main
```

**Error: "Authentication error"**

```bash
# Re-authenticate
wrangler login

# Verify authentication
wrangler whoami
```

### Content Issues

**Factor not appearing in correct order**

- Check the `date` field in frontmatter - factors are sorted by date (descending)
- Factor 1 should be `2026-01-01`, Factor 2 `2026-01-02`, etc.

**Navigation (Previous/Next) incorrect**

- The navigation is based on date sort order
- Verify dates are sequential in `src/content/blog/*/index.md`

**Video not loading**

- Ensure video is in `public/` directory
- Check the path starts with `/` (e.g., `/entropy02.mp4` not `./entropy02.mp4`)
- Verify file was included in build: `ls dist/entropy02.mp4`

### Performance Issues

**Slow build times**

- Clear `.astro` cache: `rm -rf node_modules/.astro`
- Check for circular imports in components

**Large bundle size**

- Videos should be in `public/`, not imported in components
- Use optimized images via Astro's `Image` component

---

## Quick Reference

### Common Commands

```bash
# Development
pnpm install           # Install dependencies
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Deployment
wrangler whoami                                              # Check auth
wrangler pages project list                                  # List projects
wrangler pages deploy dist --project-name knowledge-capitalism --branch main

# Git workflow
git status                    # Check changes
git add .                     # Stage changes
git commit -m "Update content"  # Commit
git push                      # Push to remote
```

### File Locations

| What | Where |
|------|-------|
| Factor content | `src/content/blog/NN-factor-name/index.md` |
| Homepage | `src/pages/index.astro` |
| Site config | `src/consts.ts` |
| Video assets | `public/` |
| Footer (copyright) | `src/components/Footer.astro` |
| Navigation | `src/pages/blog/[...slug].astro` |

### URLs

- **Production**: https://knowledgecapitalism.com
- **Pages URL**: https://knowledge-capitalism.pages.dev
- **Dashboard**: https://dash.cloudflare.com (Workers & Pages → knowledge-capitalism)

---

## Additional Resources

- **Astro Documentation**: https://docs.astro.build
- **Astro Nano GitHub**: https://github.com/markhorn-dev/astro-nano
- **Cloudflare Pages Docs**: https://developers.cloudflare.com/pages
- **Wrangler CLI Docs**: https://developers.cloudflare.com/workers/wrangler
- **Tailwind CSS Docs**: https://tailwindcss.com/docs

---

**Last Updated**: January 31, 2026
**Site Version**: 1.0.0
**Astro Version**: 5.17.1
