# Astro Nano: Comprehensive Manual

## Table of Contents

1. [Introduction](#introduction)
2. [Features Overview](#features-overview)
3. [Installation & Quick Start](#installation--quick-start)
4. [Project Structure](#project-structure)
5. [Configuration Reference](#configuration-reference)
6. [Content Collections](#content-collections)
7. [Customization Guide](#customization-guide)
8. [Deployment](#deployment)
9. [Best Practices & Patterns](#best-practices--patterns)
10. [Extending Astro Nano](#extending-astro-nano)
11. [Troubleshooting](#troubleshooting)
12. [Related Themes](#related-themes)

---

## Introduction

**Astro Nano** is a static, minimalist, lightweight, and lightning-fast portfolio and blog theme created by Mark Horn. Built with Astro, Tailwind CSS, and TypeScript, it distinguishes itself by having **zero JavaScript frameworks** installed, making it exceptionally performant.

### Key Philosophy

- **Minimalism First**: Stripped down to essentials, no bloat
- **Performance Obsessed**: Perfect 100/100 Lighthouse scores across all metrics
- **Zero Frameworks**: No React, Vue, Svelte, or other JS frameworks
- **Developer Experience**: Full TypeScript support with type safety
- **Modern Stack**: Astro + Tailwind + TypeScript

### Who Is This For?

- Developers wanting a personal portfolio and blog
- Writers who prioritize content over flashy features
- Anyone seeking blazing-fast page loads (~40ms on localhost)
- Minimalists who appreciate clean, functional design

---

## Features Overview

### Core Features

| Feature | Description |
|---------|-------------|
| **100/100 Lighthouse** | Perfect performance, accessibility, best practices, and SEO scores |
| **Responsive Design** | Mobile-first, adapts to all screen sizes |
| **Accessible** | WCAG compliant, semantic HTML |
| **SEO-Friendly** | Meta tags, Open Graph, structured data |
| **Type Safe** | Full TypeScript implementation |
| **Light/Dark Theme** | System preference detection + manual toggle |
| **Animated UI** | Subtle, performant animations |
| **Auto Sitemap** | Generated via `@astrojs/sitemap` |
| **Auto RSS Feed** | Generated via `@astrojs/rss` |
| **Markdown Support** | Native .md file support |
| **MDX Support** | Components in your markdown via `@astrojs/mdx` |

### Built-in Integrations

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), sitemap(), tailwind()],
});
```

---

## Installation & Quick Start

### Method 1: One-Click Deploy

**Vercel:**
```
https://vercel.com/new/clone?repository-url=https://github.com/markhorn-dev/astro-nano
```

**Netlify:**
```
https://app.netlify.com/start/deploy?repository=https://github.com/markhorn-dev/astro-nano
```

### Method 2: Clone Repository

```bash
# Clone the repository
git clone https://github.com/markhorn-dev/astro-nano.git my-portfolio
cd my-portfolio

# Install dependencies (choose your package manager)
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

### Method 3: Use Astro CLI

```bash
# Create new project from template
npm create astro@latest -- --template markhorn-dev/astro-nano
```

### Development Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run dev:network` | Start dev server on local network |
| `npm run sync` | Generate TypeScript types for Astro modules |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run preview:network` | Preview build on local network |
| `npm run astro ...` | Run Astro CLI commands |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |

---

## Project Structure

```
astro-nano/
├── public/
│   ├── favicon.svg
│   └── ... (static assets)
├── src/
│   ├── components/
│   │   ├── ArrowCard.astro
│   │   ├── Button.astro
│   │   ├── Container.astro
│   │   ├── Footer.astro
│   │   ├── FormattedDate.astro
│   │   ├── Header.astro
│   │   ├── Head.astro
│   │   ├── Link.astro
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   ├── blog/
│   │   │   ├── 01-getting-started.md
│   │   │   ├── 02-blog-collection.md
│   │   │   └── 03-projects-collection.md
│   │   ├── projects/
│   │   │   ├── project-1.md
│   │   │   └── project-2.md
│   │   ├── work/
│   │   │   ├── apple.md
│   │   │   └── google.md
│   │   └── config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── work/
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   └── rss.xml.js
│   ├── styles/
│   │   └── global.css
│   ├── consts.ts
│   └── types.ts
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

### Key Directories Explained

- **`public/`**: Static assets served directly (favicon, images)
- **`src/components/`**: Reusable Astro components
- **`src/content/`**: Content collections (blog, projects, work)
- **`src/layouts/`**: Page layouts/templates
- **`src/pages/`**: File-based routing
- **`src/styles/`**: Global CSS and Tailwind customizations

---

## Configuration Reference

### Main Configuration File: `src/consts.ts`

This is the primary configuration file for customizing your Astro Nano site.

#### Site Configuration

```typescript
// src/consts.ts

import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Astro Nano",           // Site name - header, footer, SEO, RSS
  EMAIL: "you@example.com",     // Contact section email
  NUM_POSTS_ON_HOMEPAGE: 3,     // Number of blog posts on homepage
  NUM_WORKS_ON_HOMEPAGE: 2,     // Number of work entries on homepage
  NUM_PROJECTS_ON_HOMEPAGE: 3,  // Number of projects on homepage
};
```

| Field | Required | Description |
|-------|----------|-------------|
| `NAME` | Yes | Displayed in header/footer. Used in SEO and RSS |
| `EMAIL` | Yes | Displayed in contact section |
| `NUM_POSTS_ON_HOMEPAGE` | Yes | Limits blog posts shown on homepage |
| `NUM_WORKS_ON_HOMEPAGE` | Yes | Limits work entries shown on homepage |
| `NUM_PROJECTS_ON_HOMEPAGE` | Yes | Limits projects shown on homepage |

#### Page Metadata

```typescript
// src/consts.ts

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Nano is a minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};
```

| Field | Required | Description |
|-------|----------|-------------|
| `TITLE` | Yes | Browser tab title, SEO title |
| `DESCRIPTION` | Yes | Meta description for SEO |

#### Social Links

```typescript
// src/consts.ts

export const SOCIALS: Socials = [
  { 
    NAME: "twitter-x",
    HREF: "https://twitter.com/your_handle",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/your_username"
  },
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/your_profile",
  }
];
```

| Field | Required | Description |
|-------|----------|-------------|
| `NAME` | Yes | Icon name (displayed as link text in contact section) |
| `HREF` | Yes | Full URL to social media profile |

**Supported Social Icons:** twitter-x, github, linkedin, and more (check `src/components/` for available icons)

### Astro Configuration: `astro.config.mjs`

```javascript
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://your-domain.com",  // IMPORTANT: Set for sitemap/RSS
  integrations: [mdx(), sitemap(), tailwind()],
});
```

### Tailwind Configuration: `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",  // Enable class-based dark mode
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [
    require("@tailwindcss/typography"),  // Prose styling for content
  ],
};
```

### TypeScript Configuration: `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@types": ["./src/types"]
    }
  }
}
```

---

## Content Collections

Astro Nano uses Astro's Content Collections for type-safe content management.

### Content Configuration: `src/content/config.ts`

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

export const collections = { blog, work, projects };
```

### Blog Collection

#### Frontmatter Schema

```yaml
---
title: "Your Blog Post Title"
description: "A brief description of your post for SEO and previews."
date: "2024-03-22"
draft: false  # Optional - set to true to hide from production
---

Your content here in Markdown or MDX...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title for SEO and display |
| `description` | string | Yes | Meta description and preview text |
| `date` | date | Yes | Publication date (parseable string) |
| `draft` | boolean | No | If true, excludes from production |

#### Creating a Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Name it with URL-friendly slug (e.g., `my-first-post.md`)
3. Add frontmatter and content:

```markdown
---
title: "My First Post"
description: "Welcome to my new blog built with Astro Nano!"
date: "2024-01-15"
---

# Welcome

This is my first blog post. I'm excited to share my thoughts!

## Code Examples

```javascript
console.log("Hello, Astro Nano!");
```

### Using MDX

With MDX files, you can import and use components:

```mdx
---
title: "Advanced Post with Components"
description: "Using MDX for enhanced content"
date: "2024-01-20"
---

import CustomComponent from '../../components/CustomComponent.astro';

# My MDX Post

<CustomComponent />

Regular markdown continues here...
```

### Work Collection

#### Frontmatter Schema

```yaml
---
company: "Google"
role: "Staff Software Engineer"
dateStart: "2022-11-01"
dateEnd: "Current"  # Use "Current" for ongoing positions
---

Description of your work, responsibilities, and achievements...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company` | string | Yes | Company/organization name |
| `role` | string | Yes | Your job title |
| `dateStart` | date | Yes | Start date |
| `dateEnd` | date/string | Yes | End date or "Current" |

### Projects Collection

#### Frontmatter Schema

```yaml
---
title: "Project Name"
description: "Brief description of what the project does."
date: "2024-01-10"
draft: false
demoURL: "https://demo.example.com"
repoURL: "https://github.com/user/repo"
---

Detailed project description, technical details, features...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Project name |
| `description` | string | Yes | Short description |
| `date` | date | Yes | Project date |
| `draft` | boolean | No | Hide from production if true |
| `demoURL` | string | No | Live demo link |
| `repoURL` | string | No | Source code repository |

### Querying Collections

```astro
---
// In any .astro file
import { getCollection } from "astro:content";

// Get all blog posts, sorted by date
const posts = (await getCollection("blog"))
  .filter((post) => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

// Get single entry
import { getEntry } from "astro:content";
const post = await getEntry("blog", "my-first-post");
---
```

---

## Customization Guide

### Changing the Theme Colors

Edit `src/styles/global.css` or `tailwind.config.mjs`:

```css
/* src/styles/global.css */
:root {
  --color-primary: #0066cc;
  --color-secondary: #6c757d;
  /* Add custom CSS variables */
}

.dark {
  --color-primary: #66b3ff;
  /* Dark mode overrides */
}
```

### Modifying Dark Mode

The theme uses class-based dark mode with system preference detection:

```astro
<!-- src/components/ThemeToggle.astro -->
<script>
  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  window.localStorage.setItem("theme", theme);
</script>
```

### Adding New Pages

Create a new `.astro` file in `src/pages/`:

```astro
---
// src/pages/about.astro
import Layout from "@layouts/Layout.astro";
import Container from "@components/Container.astro";
import { SITE } from "@consts";
---

<Layout title="About" description="About me page">
  <Container>
    <h1>About Me</h1>
    <p>Your content here...</p>
  </Container>
</Layout>
```

### Adding Navigation Links

Modify `src/components/Header.astro`:

```astro
---
// src/components/Header.astro
import { SITE } from "@consts";
import Link from "@components/Link.astro";
---

<header>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <Link href="/work">Work</Link>
    <Link href="/projects">Projects</Link>
    <Link href="/about">About</Link>  <!-- Add new link -->
  </nav>
</header>
```

### Custom Components

Create reusable components in `src/components/`:

```astro
---
// src/components/Alert.astro
export interface Props {
  type?: "info" | "warning" | "error";
  message: string;
}

const { type = "info", message } = Astro.props;

const styles = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};
---

<div class={`p-4 rounded ${styles[type]}`}>
  {message}
</div>
```

### Custom Fonts

1. Add font files to `public/fonts/` or use Google Fonts
2. Update `tailwind.config.mjs`:

```javascript
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};
```

3. Import in `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Vercel auto-detects Astro and configures build

**Or use CLI:**
```bash
npm i -g vercel
vercel
```

### Netlify

1. Push code to GitHub
2. New site from Git in Netlify
3. Build settings (usually auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`

**Or use CLI:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

1. Update `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://username.github.io",
  base: "/repo-name",  // If deploying to username.github.io/repo-name
});
```

2. Add GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Cloudflare Pages

1. Connect GitHub repository
2. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output: `dist`

---

## Best Practices & Patterns

### Performance Optimization

#### 1. Image Optimization

```astro
---
import { Image } from "astro:assets";
import myImage from "../assets/image.png";
---

<!-- Optimized with automatic format conversion -->
<Image src={myImage} alt="Description" width={800} />
```

#### 2. Lazy Loading

```html
<!-- Native lazy loading for images -->
<img src="/image.jpg" loading="lazy" alt="Description" />
```

#### 3. Preload Critical Resources

```astro
<!-- In Layout.astro head -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

### SEO Best Practices

#### 1. Unique Meta Per Page

```astro
---
// Each page should have unique title/description
const title = `${post.data.title} | ${SITE.NAME}`;
const description = post.data.description;
---

<Layout title={title} description={description}>
```

#### 2. Structured Data

```astro
<!-- Add to Head.astro for blog posts -->
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": {
      "@type": "Person",
      "name": SITE.NAME
    }
  })}
</script>
```

### Content Organization

#### 1. Consistent Naming Conventions

```
src/content/blog/
├── 01-getting-started.md      # Numbered for ordering
├── 02-configuration-guide.md
├── 2024-01-15-new-release.md  # Date prefix for news
└── tutorial-astro-basics.md   # Descriptive for tutorials
```

#### 2. Draft Workflow

```yaml
# Mark as draft during writing
---
title: "Work in Progress"
draft: true
---
```

```astro
<!-- Filter drafts in production -->
const posts = (await getCollection("blog"))
  .filter(post => import.meta.env.PROD ? !post.data.draft : true);
```

### Code Quality

#### 1. Type Safety

```typescript
// src/types.ts - Define your types
export interface Site {
  NAME: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
}

export interface Metadata {
  TITLE: string;
  DESCRIPTION: string;
}

export interface Social {
  NAME: string;
  HREF: string;
}

export type Socials = Social[];
```

#### 2. ESLint Configuration

Astro Nano includes ESLint. Run checks with:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

### Accessibility

#### 1. Semantic HTML

```astro
<main>
  <article>
    <header>
      <h1>{post.data.title}</h1>
      <time datetime={post.data.date.toISOString()}>
        {formatDate(post.data.date)}
      </time>
    </header>
    <section class="prose">
      <Content />
    </section>
  </article>
</main>
```

#### 2. Skip Links

```astro
<!-- Add to Layout.astro -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

---

## Extending Astro Nano

### Adding Search (Pagefind)

```bash
npm install @pagefind/default-ui
```

```astro
---
// src/components/Search.astro
---

<div id="search"></div>

<script>
  import { PagefindUI } from "@pagefind/default-ui";
  new PagefindUI({ element: "#search" });
</script>

<link href="/_pagefind/pagefind-ui.css" rel="stylesheet" />
```

Update build script:
```json
{
  "scripts": {
    "build": "astro build && npx pagefind --site dist"
  }
}
```

### Adding Comments (Giscus)

```astro
---
// src/components/Comments.astro
---

<script
  src="https://giscus.app/client.js"
  data-repo="owner/repo"
  data-repo-id="YOUR_REPO_ID"
  data-category="Comments"
  data-category-id="YOUR_CATEGORY_ID"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

### Adding Analytics

```astro
<!-- src/components/Head.astro - Add before </head> -->

<!-- Plausible Analytics -->
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>

<!-- Or Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

### Adding a Contact Form

```astro
---
// src/pages/contact.astro
import Layout from "@layouts/Layout.astro";
---

<Layout title="Contact">
  <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <label>
      Email:
      <input type="email" name="email" required />
    </label>
    <label>
      Message:
      <textarea name="message" required></textarea>
    </label>
    <button type="submit">Send</button>
  </form>
</Layout>
```

### Adding Tags to Blog

1. Update schema:

```typescript
// src/content/config.ts
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});
```

2. Create tag pages:

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const tags = [...new Set(posts.flatMap(post => post.data.tags || []))];
  
  return tags.map(tag => ({
    params: { tag },
    props: { posts: posts.filter(p => p.data.tags?.includes(tag)) }
  }));
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---

<h1>Posts tagged "{tag}"</h1>
{posts.map(post => <a href={`/blog/${post.slug}`}>{post.data.title}</a>)}
```

---

## Troubleshooting

### Common Issues

#### 1. Build Fails with TypeScript Errors

```bash
# Regenerate types
npm run sync

# Or manually
npx astro sync
```

#### 2. Styles Not Applying

```bash
# Clear cache and rebuild
rm -rf node_modules/.astro
npm run build
```

#### 3. Content Not Updating

```bash
# Restart dev server after content changes
# Or run sync command
npm run sync
```

#### 4. Dark Mode Not Working

Ensure `tailwind.config.mjs` has:
```javascript
darkMode: "class"
```

And check localStorage isn't being blocked.

#### 5. RSS Feed 404

Ensure `site` is set in `astro.config.mjs`:
```javascript
export default defineConfig({
  site: "https://your-actual-domain.com",
});
```

### Performance Debugging

```bash
# Build and analyze
npm run build

# Check bundle sizes
npx astro check
```

### Getting Help

- [Astro Docs](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [GitHub Issues](https://github.com/markhorn-dev/astro-nano/issues)

---

## Related Themes

If Astro Nano doesn't meet all your needs, consider these related themes:

### Astro Micro

Fork of Nano with additional features:
- **Pagefind search** - Client-side search
- **Giscus comments** - GitHub-powered comments
- Same minimalist aesthetic

Repository: [github.com/trevortylerlee/astro-micro](https://github.com/trevortylerlee/astro-micro)

### Astro Sphere

Mark Horn's more feature-rich theme:
- More components
- Enhanced animations
- Additional layouts

Repository: [github.com/markhorn-dev/astro-sphere](https://github.com/markhorn-dev/astro-sphere)

### Astro Micro Academic

Academic-focused variant:
- Publication listings
- CV/Resume pages
- Math support (KaTeX)
- Tags system

Repository: [github.com/jingwu2121/astro-micro-academic](https://github.com/jingwu2121/astro-micro-academic)

### Astro Milidev

Extended version with:
- Enhanced pagination
- Bio component
- License attribution
- Refactored codebase

Repository: [github.com/bartoszlenar/astro-milidev](https://github.com/bartoszlenar/astro-milidev)

---

## Quick Reference Card

### Essential Files to Edit

| File | Purpose |
|------|---------|
| `src/consts.ts` | Site config, metadata, socials |
| `src/content/blog/*.md` | Blog posts |
| `src/content/work/*.md` | Work experience |
| `src/content/projects/*.md` | Project showcase |
| `astro.config.mjs` | Build config, site URL |
| `tailwind.config.mjs` | Styling customization |

### Frontmatter Quick Reference

**Blog Post:**
```yaml
---
title: "Post Title"
description: "Description"
date: "2024-01-15"
draft: false
---
```

**Work Entry:**
```yaml
---
company: "Company Name"
role: "Job Title"
dateStart: "2022-01-01"
dateEnd: "Current"
---
```

**Project:**
```yaml
---
title: "Project Name"
description: "Description"
date: "2024-01-01"
demoURL: "https://demo.com"
repoURL: "https://github.com/..."
---
```

---

*This manual is based on Astro Nano v1.1.1. For the latest updates, visit [github.com/markhorn-dev/astro-nano](https://github.com/markhorn-dev/astro-nano).*