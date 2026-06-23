# Cloudflare Wrangler CLI: Comprehensive Manual for Deploying Astro Apps to Cloudflare Pages

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites and Initial Setup](#prerequisites-and-initial-setup)
3. [Understanding Cloudflare Pages Architecture](#understanding-cloudflare-pages-architecture)
4. [Configuring Astro for Cloudflare Pages](#configuring-astro-for-cloudflare-pages)
5. [Wrangler Configuration Deep Dive](#wrangler-configuration-deep-dive)
6. [Deployment Commands and Workflows](#deployment-commands-and-workflows)
7. [Environment Variables and Secrets Management](#environment-variables-and-secrets-management)
8. [Custom Domains and Routing](#custom-domains-and-routing)
9. [Functions and Server-Side Rendering](#functions-and-server-side-rendering)
10. [Build Optimization Strategies](#build-optimization-strategies)
11. [Preview and Production Deployment Patterns](#preview-and-production-deployment-patterns)
12. [Monitoring and Debugging](#monitoring-and-debugging)
13. [CI/CD Integration](#cicd-integration)
14. [Best Practices and Patterns](#best-practices-and-patterns)
15. [Troubleshooting Guide](#troubleshooting-guide)
16. [Command Reference](#command-reference)

---

## Introduction

Wrangler is Cloudflare's official CLI tool for managing and deploying applications to Cloudflare's edge network. When combined with Astro—a modern, content-focused web framework—you get a powerful deployment pipeline that leverages Cloudflare Pages' global CDN, edge functions, and seamless integration with other Cloudflare services.

This manual assumes you have already authenticated with Wrangler using `wrangler login` and have appropriate permissions in your Cloudflare account.

### Why Astro + Cloudflare Pages?

Astro's hybrid rendering capabilities pair exceptionally well with Cloudflare Pages because Astro can generate static content for the CDN while also supporting server-side rendering (SSR) through Cloudflare Workers at the edge. This results in near-instant page loads for static content and dynamic capabilities when needed, all running on Cloudflare's global network spanning 300+ cities worldwide.

---

## Prerequisites and Initial Setup

### System Requirements

Ensure you have Node.js 18.14.1 or later installed. Wrangler 3.x is recommended for all new projects.

```bash
# Verify Node.js version
node --version

# Verify Wrangler installation and version
wrangler --version

# Verify authentication status
wrangler whoami
```

### Project Initialization

For a new Astro project destined for Cloudflare Pages:

```bash
# Create new Astro project
npm create astro@latest my-astro-site

# Navigate to project
cd my-astro-site

# Install the Cloudflare adapter
npm install @astrojs/cloudflare
```

For existing projects, simply install the adapter:

```bash
npm install @astrojs/cloudflare
```

---

## Understanding Cloudflare Pages Architecture

### How Pages Works

Cloudflare Pages consists of two primary components. First, there is a static asset hosting layer where HTML, CSS, JavaScript, images, and other static files are distributed across Cloudflare's global CDN. Second, there is a Functions layer powered by Cloudflare Workers that handles dynamic requests, API routes, and server-side rendering.

When you deploy an Astro site, static pages are served directly from the CDN with near-zero latency, while SSR routes are handled by Workers functions at the edge closest to your users.

### Deployment Model

Pages uses a build-and-deploy model where your source code is built (either locally or via CI), then the output is uploaded to Cloudflare's infrastructure. Each deployment gets a unique URL, enabling preview deployments for branches and pull requests alongside your production deployment.

---

## Configuring Astro for Cloudflare Pages

### Basic Configuration

Create or modify your `astro.config.mjs` file:

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
```

### Output Modes

Astro supports three output modes that affect how your site deploys to Cloudflare Pages.

**Static Mode** generates a fully static site with no server-side rendering. All pages are pre-rendered at build time. This is ideal for blogs, documentation, and marketing sites.

```javascript
export default defineConfig({
  output: 'static',
  // No adapter needed for purely static sites
});
```

**Server Mode** enables full SSR where every request is handled by a Worker function. Use this for highly dynamic applications.

```javascript
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
```

**Hybrid Mode** (recommended for most use cases) allows you to choose per-page whether to pre-render or use SSR. Static pages serve from CDN while dynamic pages use Workers.

```javascript
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
});
```

In hybrid mode, pages are static by default. Add `export const prerender = false;` to any page that needs SSR.

### Adapter Configuration Options

The Cloudflare adapter accepts several configuration options:

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    // Platform proxy for local development with bindings
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.toml',
      persist: {
        path: '.wrangler/state/v3'
      }
    },
    
    // Image service configuration
    imageService: 'cloudflare',
    
    // Routes configuration
    routes: {
      strategy: 'auto', // 'auto' | 'include' | 'exclude'
      include: ['/api/*'],
      exclude: ['/static/*']
    },
    
    // Session/cookie configuration for KV-based sessions
    session: {
      enabled: false
    }
  }),
});
```

### TypeScript Configuration for Cloudflare Runtime

Update your `src/env.d.ts` to include Cloudflare runtime types:

```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Env {
  // Add your bindings here
  MY_KV_NAMESPACE: KVNamespace;
  MY_D1_DATABASE: D1Database;
  MY_R2_BUCKET: R2Bucket;
  MY_SECRET: string;
}
```

---

## Wrangler Configuration Deep Dive

### The wrangler.toml File

Create a `wrangler.toml` file in your project root for Pages configuration:

```toml
# Project name (used for the *.pages.dev subdomain)
name = "my-astro-site"

# Compatibility settings
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Pages-specific configuration
pages_build_output_dir = "dist"

# Environment variables (non-sensitive)
[vars]
API_BASE_URL = "https://api.example.com"
SITE_NAME = "My Astro Site"

# KV Namespace bindings
[[kv_namespaces]]
binding = "CACHE_KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# D1 Database bindings
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# R2 Bucket bindings
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "my-assets-bucket"

# Durable Objects (if needed)
[[durable_objects.bindings]]
name = "COUNTER"
class_name = "Counter"

# Environment-specific overrides
[env.staging]
vars = { API_BASE_URL = "https://staging-api.example.com" }

[env.production]
vars = { API_BASE_URL = "https://api.example.com" }
```

### Compatibility Dates and Flags

The `compatibility_date` determines which version of the Workers runtime your code runs on. Always use a recent date for new projects to get the latest features and security updates.

Common compatibility flags include `nodejs_compat` which enables Node.js API compatibility for using Node.js built-in modules, `nodejs_compat_v2` which provides enhanced Node.js compatibility with additional APIs, and `streams_enable_constructors` which enables Web Streams constructors.

```toml
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
```

### Understanding Bindings

Bindings connect your Pages functions to other Cloudflare services.

**KV Namespaces** are ideal for caching, session storage, and configuration data. They provide key-value storage with global replication.

```toml
[[kv_namespaces]]
binding = "SESSION_STORE"
id = "your-kv-namespace-id"
```

**D1 Databases** provide SQLite at the edge, perfect for structured data, user accounts, and content management.

```toml
[[d1_databases]]
binding = "DB"
database_name = "production-db"
database_id = "your-d1-database-id"
```

**R2 Buckets** offer S3-compatible object storage for large files, user uploads, and media.

```toml
[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "user-uploads"
```

**Service Bindings** allow you to call other Workers services directly.

```toml
[[services]]
binding = "AUTH_SERVICE"
service = "authentication-worker"
```

---

## Deployment Commands and Workflows

### Initial Project Creation

If you haven't created a Pages project yet:

```bash
# Create a new Pages project (interactive)
wrangler pages project create my-astro-site

# Or with options
wrangler pages project create my-astro-site --production-branch main
```

### Building Your Astro Site

Before deploying, build your Astro site:

```bash
# Standard build
npm run build

# Or with environment-specific settings
ASTRO_ENV=production npm run build
```

This generates output in the `dist` directory (configurable in `astro.config.mjs`).

### Deploying to Pages

**Direct Deploy (Recommended for CI/CD)**

```bash
# Deploy to production
wrangler pages deploy dist --project-name my-astro-site

# Deploy as a preview (branch deployment)
wrangler pages deploy dist --project-name my-astro-site --branch feature-branch

# Deploy with a custom commit message
wrangler pages deploy dist --project-name my-astro-site --commit-message "Deploy v1.2.3"

# Deploy with commit hash for traceability
wrangler pages deploy dist --project-name my-astro-site --commit-hash abc123def
```

**Interactive Deploy**

```bash
# Prompts for project selection if multiple exist
wrangler pages deploy dist
```

### Deployment Output

After a successful deployment, Wrangler outputs deployment information including the unique deployment URL (e.g., `abc123.my-astro-site.pages.dev`), the production URL if deploying to production branch, deployment ID for reference, and upload statistics.

---

## Environment Variables and Secrets Management

### Types of Environment Variables

Cloudflare Pages distinguishes between plain text variables for non-sensitive configuration and secrets for sensitive data like API keys.

### Setting Variables via Wrangler

**Plain Text Variables**

```bash
# Set a variable for production
wrangler pages secret put API_KEY --project-name my-astro-site

# Set via wrangler.toml (non-sensitive only)
# Add to [vars] section
```

**Secrets (Sensitive Data)**

```bash
# Interactive (prompts for value)
wrangler pages secret put DATABASE_URL --project-name my-astro-site

# From file
wrangler pages secret put PRIVATE_KEY --project-name my-astro-site < private-key.pem

# List all secrets
wrangler pages secret list --project-name my-astro-site

# Delete a secret
wrangler pages secret delete OLD_SECRET --project-name my-astro-site
```

### Environment-Specific Variables

Pages supports different variables for preview and production environments:

```bash
# Production only
wrangler pages secret put API_KEY --project-name my-astro-site --env production

# Preview only
wrangler pages secret put API_KEY --project-name my-astro-site --env preview
```

### Accessing Variables in Astro

In your Astro pages and API routes:

```typescript
// In an API route or SSR page
export async function GET({ locals }) {
  const env = locals.runtime.env;
  
  // Access environment variables
  const apiKey = env.API_KEY;
  const dbUrl = env.DATABASE_URL;
  
  // Access bindings
  const kv = env.MY_KV_NAMESPACE;
  const db = env.DB;
  
  return new Response(JSON.stringify({ status: 'ok' }));
}
```

### Best Practices for Secrets

Never commit secrets to version control. Use `.env` files only for local development and add them to `.gitignore`. Use `wrangler pages secret` for all production secrets. Rotate secrets regularly, especially after team member departures. Use different secrets for preview and production environments.

---

## Custom Domains and Routing

### Adding Custom Domains

Custom domains are managed through the Cloudflare dashboard or API, but you can verify configuration via Wrangler:

```bash
# List current deployments and their URLs
wrangler pages deployment list --project-name my-astro-site
```

### Configuring Routes in Astro

Control which routes are handled by Workers vs served statically using a `_routes.json` file in your `public` directory:

```json
{
  "version": 1,
  "include": ["/api/*", "/dashboard/*"],
  "exclude": ["/static/*", "/*.ico", "/*.png"]
}
```

Or configure via the adapter:

```javascript
adapter: cloudflare({
  routes: {
    strategy: 'include',
    include: ['/api/*', '/ssr/*'],
    exclude: []
  }
})
```

### Redirect and Header Rules

Create a `_redirects` file in your `public` directory:

```
# Redirect old URLs
/old-page /new-page 301
/blog/* /articles/:splat 301

# Single-page app fallback (for client-side routing)
/* /index.html 200
```

Create a `_headers` file for custom headers:

```
# Security headers for all routes
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

# Cache static assets
/static/*
  Cache-Control: public, max-age=31536000, immutable

# No cache for HTML
/*.html
  Cache-Control: no-cache
```

---

## Functions and Server-Side Rendering

### API Routes in Astro

Create API endpoints in `src/pages/api/`:

```typescript
// src/pages/api/users/[id].ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
  const { id } = params;
  const db = locals.runtime.env.DB;
  
  const user = await db
    .prepare('SELECT * FROM users WHERE id = ?')
    .bind(id)
    .first();
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const body = await request.json();
  
  const result = await db
    .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
    .bind(body.name, body.email)
    .run();
  
  return new Response(JSON.stringify({ id: result.lastRowId }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
};
```

### SSR Pages with Bindings

```astro
---
// src/pages/dashboard.astro
export const prerender = false; // Required for SSR in hybrid mode

const env = Astro.locals.runtime.env;
const kv = env.CACHE_KV;
const db = env.DB;

// Check cache first
let dashboardData = await kv.get('dashboard-data', 'json');

if (!dashboardData) {
  // Fetch from database
  const stats = await db
    .prepare('SELECT COUNT(*) as count FROM users')
    .first();
  
  dashboardData = { userCount: stats.count, lastUpdated: new Date().toISOString() };
  
  // Cache for 5 minutes
  await kv.put('dashboard-data', JSON.stringify(dashboardData), { expirationTtl: 300 });
}
---

<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  <h1>Dashboard</h1>
  <p>Total Users: {dashboardData.userCount}</p>
  <p>Last Updated: {dashboardData.lastUpdated}</p>
</body>
</html>
```

### Middleware

Create middleware for request processing in `src/middleware.ts`:

```typescript
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  // Add timing
  const start = Date.now();
  
  // Authentication check
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    // Validate token using your auth service
    locals.user = await validateToken(token, locals.runtime.env);
  }
  
  // Continue to route handler
  const response = await next();
  
  // Add custom headers
  response.headers.set('X-Response-Time', `${Date.now() - start}ms`);
  
  return response;
});

async function validateToken(token: string, env: Env) {
  // Your validation logic here
  return { id: 'user-123', role: 'admin' };
}
```

---

## Build Optimization Strategies

### Astro Build Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  
  build: {
    // Inline stylesheets smaller than this
    inlineStylesheets: 'auto',
    
    // Split output for better caching
    assets: '_assets'
  },
  
  vite: {
    build: {
      // Adjust chunk size warnings
      chunkSizeWarningLimit: 1000,
      
      rollupOptions: {
        output: {
          // Manual chunk splitting
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'utils': ['lodash-es', 'date-fns']
          }
        }
      }
    }
  }
});
```

### Asset Optimization

```javascript
// Using Astro's built-in image optimization with Cloudflare Images
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({
    imageService: 'cloudflare' // Uses Cloudflare Image Resizing
  }),
  
  image: {
    domains: ['images.example.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});
```

### Reducing Bundle Size

Use dynamic imports for heavy components, leverage Astro's partial hydration with `client:*` directives, split routes into separate chunks, and tree-shake unused code.

```astro
---
// Only load heavy component when visible
---

<HeavyComponent client:visible />

<!-- Or load on interaction -->
<InteractiveWidget client:idle />
```

---

## Preview and Production Deployment Patterns

### Branch Deployments

Every branch can have its own preview deployment:

```bash
# Deploy current branch
wrangler pages deploy dist --project-name my-astro-site --branch $(git branch --show-current)

# Deploy specific branch
wrangler pages deploy dist --project-name my-astro-site --branch feature/new-design
```

Preview URLs follow the pattern `branch-name.project-name.pages.dev` where special characters in branch names are replaced with hyphens.

### Production Deployment Strategy

**Manual Production Deploys**

```bash
# Build and deploy
npm run build
wrangler pages deploy dist --project-name my-astro-site --branch main
```

**Staged Rollout Pattern**

```bash
# 1. Deploy to staging branch first
wrangler pages deploy dist --project-name my-astro-site --branch staging

# 2. Test the staging URL
curl -I https://staging.my-astro-site.pages.dev

# 3. If tests pass, deploy to production
wrangler pages deploy dist --project-name my-astro-site --branch main
```

### Rollback Procedures

```bash
# List recent deployments
wrangler pages deployment list --project-name my-astro-site

# Each deployment ID can be used to identify the deployment
# Rollback is done by redeploying a previous build
# Keep build artifacts or use git tags for reproducible builds
```

---

## Monitoring and Debugging

### Local Development with Wrangler

```bash
# Run local dev server with Cloudflare bindings simulation
wrangler pages dev dist --compatibility-date=2024-01-01

# With specific bindings
wrangler pages dev dist --kv=MY_KV --d1=MY_DB

# With local persistence
wrangler pages dev dist --persist-to=.wrangler/state
```

### Viewing Logs

```bash
# Tail real-time logs from production
wrangler pages deployment tail --project-name my-astro-site

# Filter logs
wrangler pages deployment tail --project-name my-astro-site --status error

# Tail specific deployment
wrangler pages deployment tail --project-name my-astro-site --deployment-id abc123
```

### Debug Logging in Your Code

```typescript
// Use console.log - it appears in wrangler tail output
export async function GET({ locals }) {
  console.log('Request received', {
    timestamp: new Date().toISOString(),
    cf: locals.runtime.cf // Cloudflare request properties
  });
  
  try {
    const result = await someOperation();
    console.log('Operation succeeded', { result });
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error('Operation failed', { error: error.message });
    throw error;
  }
}
```

### Performance Monitoring

Access Cloudflare's built-in analytics via the request context:

```typescript
export async function GET({ locals, request }) {
  const cf = locals.runtime.cf;
  
  // Available request metadata
  const metrics = {
    colo: cf?.colo,           // Data center handling request
    country: cf?.country,      // Request origin country
    city: cf?.city,           // Request origin city
    asn: cf?.asn,             // Autonomous System Number
    httpProtocol: cf?.httpProtocol,
    tlsVersion: cf?.tlsVersion
  };
  
  console.log('Request metrics', metrics);
  
  return new Response('OK');
}
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          ASTRO_ENV: ${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=my-astro-site --branch=${{ github.head_ref || github.ref_name }}
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "20"

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy_preview:
  stage: deploy
  image: node:${NODE_VERSION}
  script:
    - npm install -g wrangler
    - wrangler pages deploy dist --project-name=my-astro-site --branch=$CI_COMMIT_REF_NAME
  environment:
    name: preview/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.my-astro-site.pages.dev
  rules:
    - if: $CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH

deploy_production:
  stage: deploy
  image: node:${NODE_VERSION}
  script:
    - npm install -g wrangler
    - wrangler pages deploy dist --project-name=my-astro-site --branch=main
  environment:
    name: production
    url: https://my-astro-site.pages.dev
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

### Required Secrets

Create these secrets in your CI/CD platform. `CLOUDFLARE_API_TOKEN` should be an API token with "Cloudflare Pages:Edit" permissions. `CLOUDFLARE_ACCOUNT_ID` is your Cloudflare account ID found in the dashboard URL.

Generate an API token at dash.cloudflare.com with the "Edit Cloudflare Pages" permission.

---

## Best Practices and Patterns

### Project Structure

```
my-astro-site/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/             # Page layouts
│   ├── pages/
│   │   ├── api/            # API routes (SSR)
│   │   ├── index.astro     # Static home page
│   │   └── dashboard.astro  # SSR page
│   ├── middleware.ts        # Request middleware
│   └── env.d.ts            # TypeScript declarations
├── public/
│   ├── _headers            # Cloudflare headers config
│   ├── _redirects          # Cloudflare redirects
│   └── robots.txt
├── astro.config.mjs
├── wrangler.toml
├── package.json
└── tsconfig.json
```

### Hybrid Rendering Strategy

Use static rendering by default for marketing pages, blog posts, documentation, and any content that doesn't need real-time updates. Use SSR selectively for user dashboards, personalized content, real-time data, and authenticated routes.

```astro
---
// Static by default in hybrid mode
// This page will be pre-rendered at build time
---

<html>
  <body>
    <h1>Welcome</h1>
    <p>This is a static page, served from CDN.</p>
  </body>
</html>
```

```astro
---
// SSR when needed
export const prerender = false;

const user = await getUser(Astro.locals);
---

<html>
  <body>
    <h1>Hello, {user.name}</h1>
    <p>This is rendered on each request.</p>
  </body>
</html>
```

### Caching Strategies

**Static Asset Caching**

```
# public/_headers
/static/*
  Cache-Control: public, max-age=31536000, immutable

/_assets/*
  Cache-Control: public, max-age=31536000, immutable
```

**Dynamic Response Caching**

```typescript
export async function GET({ locals }) {
  const kv = locals.runtime.env.CACHE;
  const cacheKey = 'expensive-operation';
  
  // Check cache
  let data = await kv.get(cacheKey, 'json');
  
  if (!data) {
    // Compute and cache
    data = await expensiveOperation();
    await kv.put(cacheKey, JSON.stringify(data), {
      expirationTtl: 3600 // 1 hour
    });
  }
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60' // Browser cache
    }
  });
}
```

### Error Handling

Create custom error pages:

```astro
---
// src/pages/404.astro
---

<html>
<head>
  <title>Page Not Found</title>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <a href="/">Return Home</a>
</body>
</html>
```

```astro
---
// src/pages/500.astro
export const prerender = false;
---

<html>
<head>
  <title>Server Error</title>
</head>
<body>
  <h1>500 - Server Error</h1>
  <p>Something went wrong. Please try again later.</p>
</body>
</html>
```

### Security Best Practices

Set secure headers in `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

Validate all user input, use parameterized queries for D1, implement rate limiting using Workers KV or Durable Objects, and store sensitive data in secrets rather than environment variables.

### Performance Patterns

**Edge-Side Includes (ESI) Pattern**

```astro
---
// Static shell with dynamic content
export const prerender = false;
---

<html>
<head>
  <title>My Site</title>
</head>
<body>
  <header>Static Header</header>
  
  <!-- Dynamic content fetched at edge -->
  <main>
    {await fetchDynamicContent(Astro.locals)}
  </main>
  
  <footer>Static Footer</footer>
</body>
</html>
```

**Request Coalescing**

```typescript
// Prevent thundering herd on cache miss
async function getWithCoalescing(kv: KVNamespace, key: string, compute: () => Promise<any>) {
  let data = await kv.get(key, 'json');
  
  if (!data) {
    // Use a lock key to prevent multiple computations
    const lockKey = `${key}:lock`;
    const lock = await kv.get(lockKey);
    
    if (!lock) {
      // Set lock (short TTL)
      await kv.put(lockKey, '1', { expirationTtl: 10 });
      
      // Compute and store
      data = await compute();
      await kv.put(key, JSON.stringify(data), { expirationTtl: 3600 });
      
      // Release lock
      await kv.delete(lockKey);
    } else {
      // Wait and retry
      await new Promise(r => setTimeout(r, 100));
      return getWithCoalescing(kv, key, compute);
    }
  }
  
  return data;
}
```

---

## Troubleshooting Guide

### Common Issues and Solutions

**Build Failures**

"Error: Could not resolve entry module" typically means the adapter isn't configured correctly. Verify `astro.config.mjs` has the cloudflare adapter and output mode set.

```bash
# Check build output
npm run build -- --verbose

# Verify output structure
ls -la dist/
```

**Deployment Failures**

"Error: Project not found" means the project doesn't exist yet or you're using the wrong project name.

```bash
# List your projects
wrangler pages project list

# Create if needed
wrangler pages project create my-astro-site
```

"Error: Authentication error" indicates token issues.

```bash
# Re-authenticate
wrangler login

# Or check token permissions
wrangler whoami
```

**Runtime Errors**

"Error: Bindings not available" means bindings aren't configured in `wrangler.toml` or the local dev server isn't using the right config.

```bash
# Local dev with bindings
wrangler pages dev dist --compatibility-date=2024-01-01

# Verify wrangler.toml is in project root
cat wrangler.toml
```

**SSR Pages Returning 404**

Ensure `prerender = false` is set for SSR pages and check `_routes.json` includes the SSR routes.

```json
{
  "version": 1,
  "include": ["/*"],
  "exclude": ["/static/*", "/_assets/*"]
}
```

### Debugging Steps

1. Check build output by running `npm run build` and inspecting the `dist` directory.
2. Test locally using `wrangler pages dev dist` to simulate the Pages environment.
3. Check logs by running `wrangler pages deployment tail` after deployment.
4. Verify bindings by testing with simple logging before complex operations.
5. Check compatibility flags in `wrangler.toml` if using Node.js APIs.

### Getting Help

For additional support, consult the Cloudflare Workers Discord server, Cloudflare Community forums at community.cloudflare.com, Astro Discord server's #deploy-cloudflare channel, and GitHub issues for @astrojs/cloudflare adapter.

---

## Command Reference

### Project Management

| Command | Description |
|---------|-------------|
| `wrangler pages project list` | List all Pages projects |
| `wrangler pages project create <name>` | Create a new project |

### Deployment

| Command | Description |
|---------|-------------|
| `wrangler pages deploy <directory>` | Deploy build output |
| `wrangler pages deploy <dir> --project-name <name>` | Deploy to specific project |
| `wrangler pages deploy <dir> --branch <branch>` | Deploy as branch preview |
| `wrangler pages deploy <dir> --commit-message "msg"` | Add commit message |
| `wrangler pages deployment list --project-name <name>` | List deployments |

### Secrets and Variables

| Command | Description |
|---------|-------------|
| `wrangler pages secret put <name>` | Add a secret |
| `wrangler pages secret list` | List all secrets |
| `wrangler pages secret delete <name>` | Remove a secret |

### Development

| Command | Description |
|---------|-------------|
| `wrangler pages dev <directory>` | Start local dev server |
| `wrangler pages dev <dir> --port 8788` | Custom port |
| `wrangler pages dev <dir> --local` | Fully local mode |
| `wrangler pages dev <dir> --persist-to <path>` | Persist KV/D1 data |

### Monitoring

| Command | Description |
|---------|-------------|
| `wrangler pages deployment tail` | Stream real-time logs |
| `wrangler pages deployment tail --status error` | Filter by status |

### Global Options

| Flag | Description |
|------|-------------|
| `--config <path>` | Custom wrangler.toml path |
| `--env <environment>` | Target environment |
| `--help` | Show command help |

---

## Conclusion

Deploying Astro apps to Cloudflare Pages using Wrangler provides a powerful, scalable, and cost-effective hosting solution. By leveraging Astro's hybrid rendering capabilities alongside Cloudflare's global edge network and rich ecosystem of services like KV, D1, and R2, you can build modern web applications that are both fast and feature-rich.

Key takeaways for successful deployments: use hybrid mode to maximize CDN benefits while enabling SSR where needed; leverage Cloudflare bindings for serverless database, storage, and caching; implement proper caching strategies at both the CDN and application levels; use preview deployments for safe testing before production; monitor your deployments using `wrangler tail` and Cloudflare analytics; and automate deployments with CI/CD for consistent, reproducible builds.

For the most up-to-date information, always refer to the official Cloudflare Workers documentation at developers.cloudflare.com and the Astro documentation at docs.astro.build.