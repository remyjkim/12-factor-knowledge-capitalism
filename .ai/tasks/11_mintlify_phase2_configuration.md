# Phase 2: Core Configuration

## Objective
Configure docs.json with branding, theme, navigation structure, and all essential settings to establish the foundation for the documentation site.

---

## docs.json Structure Overview

The docs.json file controls:
- **Global settings**: Name, theme, colors, logo
- **Navigation**: Groups, pages, tabs, anchors
- **Styling**: Layout, eyebrows, drilldown behavior
- **Features**: Search, analytics, versioning
- **Metadata**: SEO, social sharing

---

## Task 2.1: Basic Settings

**Edit**: `docs.json`

```json
{
  "$schema": "https://mintlify.com/docs.json",
  "name": "12 Factors of Knowledge Capitalism",
  "theme": "mint",
  "logo": {
    "light": "/public/logo-light.svg",
    "dark": "/public/logo-dark.svg",
    "href": "/"
  },
  "favicon": "/public/favicon.png"
}
```

**Key Decisions**:
- **Name**: "12 Factors of Knowledge Capitalism" (matches README title)
- **Theme**: `mint` (clean, modern, good for long-form content)
- **Logo**: Will need to create or source

**Alternative Themes**:
- `quill` - Book-focused, elegant
- `venus` - Modern, bold
- `prism` - Code-focused (less suitable)

**Acceptance Criteria**:
- [ ] Basic settings configured
- [ ] Schema validation passes
- [ ] Name displays correctly in browser

---

## Task 2.2: Color Scheme

**Color Strategy**: Use blues/cyans to evoke knowledge, networks, information flow

**Recommended Palette**:
```json
{
  "colors": {
    "primary": "#0369a1",
    "light": "#38bdf8",
    "dark": "#0c4a6e",
    "background": {
      "light": "#ffffff",
      "dark": "#0f172a"
    },
    "anchors": {
      "from": "#0369a1",
      "to": "#06b6d4"
    }
  }
}
```

**Color Meanings**:
- **Primary** (#0369a1): Sky blue 700 - knowledge, clarity
- **Light** (#38bdf8): Sky 400 - accessibility
- **Dark** (#0c4a6e): Sky 900 - depth, seriousness
- **Background Light**: Pure white - clean reading
- **Background Dark**: Slate 950 - comfortable night reading

**Alternative: Purple/Violet** (knowledge, wisdom):
```json
{
  "colors": {
    "primary": "#7c3aed",
    "light": "#a78bfa",
    "dark": "#5b21b6"
  }
}
```

**Decision Point**: Which color scheme?
- [ ] Blue/Cyan (recommended)
- [ ] Purple/Violet
- [ ] Custom (specify):

**Acceptance Criteria**:
- [ ] Colors configured in docs.json
- [ ] Primary color visible in UI
- [ ] Dark mode colors tested
- [ ] Anchor gradient looks good

---

## Task 2.3: Navigation Structure

**Full Navigation Configuration**:

```json
{
  "navigation": {
    "pages": ["introduction"],
    "groups": [
      {
        "group": "I. Foundations",
        "pages": [
          "factors/01-negative-entropy",
          "factors/02-language"
        ]
      },
      {
        "group": "II. The Agency Interface",
        "pages": [
          "factors/03-agency-interface",
          "factors/04-cognitive-actors"
        ]
      },
      {
        "group": "III. The Evolution Interface",
        "pages": [
          "factors/05-evolution",
          "factors/06-exploration"
        ]
      },
      {
        "group": "IV. The Network Interface",
        "pages": [
          "factors/07-network-context",
          "factors/08-coordination"
        ]
      },
      {
        "group": "V. The Network Economy",
        "pages": [
          "factors/09-complex-systems",
          "factors/10-value-realization"
        ]
      },
      {
        "group": "VI. Knowledge Capitalism",
        "pages": [
          "factors/11-knowledge-capital",
          "factors/12-mechanism-design"
        ]
      },
      {
        "group": "About",
        "pages": [
          "about/inspirations",
          "about/contributing"
        ]
      }
    ]
  }
}
```

**Navigation Design Decisions**:
1. **Single-level groups**: No nested groups (keeps navigation clean)
2. **Roman numerals**: Matches README section style
3. **Sequential pages**: Reading flow is linear
4. **About section**: Supplementary material grouped at end

**Acceptance Criteria**:
- [ ] All 7 groups defined
- [ ] All 12 factor pages listed
- [ ] About group included
- [ ] Introduction page at top level
- [ ] File paths match future file structure

---

## Task 2.4: Styling Configuration

```json
{
  "styling": {
    "eyebrows": "breadcrumbs",
    "drilldown": false,
    "feedback": {
      "thumbsRating": true,
      "suggestEdit": true,
      "raiseIssue": true
    }
  }
}
```

**Setting Explanations**:
- **eyebrows**: `"breadcrumbs"` shows navigation path at top of page
  - Alternative: `"section"` shows just section name
  - Recommendation: `"breadcrumbs"` for book-like navigation

- **drilldown**: `false` prevents auto-navigation on group click
  - Keep false for book structure (users choose chapters)

- **feedback**: Enable reader engagement
  - thumbsRating: Was this helpful?
  - suggestEdit: Link to GitHub edit
  - raiseIssue: Link to GitHub issues

**Acceptance Criteria**:
- [ ] Styling section configured
- [ ] Breadcrumbs display correctly
- [ ] Feedback widgets appear (if enabled)
- [ ] Drilldown behavior tested

---

## Task 2.5: Footer Configuration

```json
{
  "footerSocials": {
    "github": "https://github.com/pureicis/12-factor-info-capitalism",
    "twitter": "https://twitter.com/[handle]",
    "linkedin": "https://linkedin.com/in/[profile]"
  }
}
```

**Optional Footer Settings**:
```json
{
  "footer": {
    "links": [
      {
        "name": "Original 12-Factor App",
        "href": "https://12factor.net/"
      },
      {
        "name": "12-Factor Agents",
        "href": "https://github.com/humanlayer/12-factor-agents"
      }
    ]
  }
}
```

**Decision Point**: Which social links to include?
- [ ] GitHub (repository)
- [ ] Twitter (updates)
- [ ] LinkedIn (professional)
- [ ] Custom links (inspirations)

**Acceptance Criteria**:
- [ ] Footer socials configured
- [ ] Links tested and working
- [ ] Icons display correctly

---

## Task 2.6: SEO and Metadata

```json
{
  "metadata": {
    "og:site_name": "12 Factors of Knowledge Capitalism",
    "og:description": "A framework for understanding how knowledge creates, compounds, and captures value in networked systems.",
    "og:image": "https://[domain]/public/og-image.png",
    "twitter:site": "@[handle]"
  }
}
```

**SEO Best Practices**:
1. **Description**: Clear, 150-160 characters
2. **OG Image**: 1200×630px recommended
3. **Twitter Card**: Large image format

**To Create**:
- [ ] Open Graph image (1200×630px)
- [ ] Favicon (32×32px, 16×16px)
- [ ] Logo files (SVG preferred)

**Acceptance Criteria**:
- [ ] Metadata configured
- [ ] Description compelling
- [ ] OG image created (or placeholder)
- [ ] Preview works in link sharing

---

## Task 2.7: Search Configuration

```json
{
  "search": {
    "prompt": "Search the 12 factors..."
  }
}
```

**Search Features** (built-in):
- Full-text search across all pages
- Keyboard shortcut (Cmd+K / Ctrl+K)
- AI-powered search (on Mintlify hosting)

**Acceptance Criteria**:
- [ ] Search prompt customized
- [ ] Search bar visible
- [ ] Keyboard shortcut works
- [ ] Results relevant (test after content migration)

---

## Task 2.8: Additional Features

### Topbar (Optional)
```json
{
  "topbar": {
    "style": "default"
  },
  "topbarLinks": [
    {
      "name": "GitHub",
      "url": "https://github.com/pureicis/12-factor-info-capitalism"
    }
  ]
}
```

### Anchors (Optional - External Resources)
```json
{
  "global": {
    "anchors": [
      {
        "anchor": "12-Factor App",
        "icon": "link",
        "href": "https://12factor.net/"
      },
      {
        "anchor": "12-Factor Agents",
        "icon": "link",
        "href": "https://github.com/humanlayer/12-factor-agents"
      }
    ]
  }
}
```

**Decision Point**: Include global anchors?
- **Pros**: Quick access to inspirations
- **Cons**: Sidebar clutter

**Recommendation**: Add to About section instead of global anchors

**Acceptance Criteria**:
- [ ] Optional features decided
- [ ] If included, properly configured
- [ ] UI not cluttered

---

## Task 2.9: Create Public Assets

**Required Assets**:

1. **Favicon** (`public/favicon.png`)
   - Size: 32×32px (with 16×16 version)
   - Format: PNG or ICO
   - Simple, recognizable icon

2. **Logo Light** (`public/logo-light.svg`)
   - For light mode
   - SVG preferred (scales perfectly)
   - Height: ~40px recommended

3. **Logo Dark** (`public/logo-dark.svg`)
   - For dark mode
   - Sufficient contrast on dark background

4. **OG Image** (`public/og-image.png`)
   - Size: 1200×630px
   - Shows preview when shared
   - Include title and key visual

**Logo Concepts**:
- **Option 1**: Typography-based "12FC" monogram
- **Option 2**: Network node diagram
- **Option 3**: Knowledge graph visualization
- **Option 4**: Just text "12 Factors"

**Asset Creation Options**:
- **Design yourself**: Figma, Sketch, Illustrator
- **AI generation**: Midjourney, DALL-E
- **Simple text**: Use SVG text for MVP
- **Skip for now**: Use Mintlify defaults

**Acceptance Criteria**:
- [ ] public/ directory created
- [ ] Favicon exists (or placeholder)
- [ ] Logo exists (or text-based temporary)
- [ ] OG image exists (or placeholder)
- [ ] Files referenced correctly in docs.json

---

## Task 2.10: Validation and Testing

**Validation Checklist**:

### Schema Validation
```bash
# Mintlify validates automatically on dev server start
mint dev
```
- [ ] No schema errors in terminal
- [ ] docs.json loads successfully

### Visual Inspection
- [ ] Open http://localhost:3000
- [ ] Logo displays (if added)
- [ ] Colors correct in light mode
- [ ] Colors correct in dark mode
- [ ] Navigation sidebar shows groups
- [ ] Introduction page loads

### Navigation Testing
- [ ] All groups appear in sidebar
- [ ] Groups in correct order (I-VI, About)
- [ ] Pages listed under correct groups
- [ ] Clicking group expands/collapses

### Styling Testing
- [ ] Breadcrumbs show at top
- [ ] Footer appears with links
- [ ] Search bar visible
- [ ] Theme toggle works (light/dark)

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browser (responsive)

---

## Complete docs.json Template

**Full configuration for copy-paste**:

```json
{
  "$schema": "https://mintlify.com/docs.json",
  "name": "12 Factors of Knowledge Capitalism",
  "theme": "mint",
  "logo": {
    "light": "/public/logo-light.svg",
    "dark": "/public/logo-dark.svg",
    "href": "/"
  },
  "favicon": "/public/favicon.png",
  "colors": {
    "primary": "#0369a1",
    "light": "#38bdf8",
    "dark": "#0c4a6e",
    "background": {
      "light": "#ffffff",
      "dark": "#0f172a"
    },
    "anchors": {
      "from": "#0369a1",
      "to": "#06b6d4"
    }
  },
  "navigation": {
    "pages": ["introduction"],
    "groups": [
      {
        "group": "I. Foundations",
        "pages": [
          "factors/01-negative-entropy",
          "factors/02-language"
        ]
      },
      {
        "group": "II. The Agency Interface",
        "pages": [
          "factors/03-agency-interface",
          "factors/04-cognitive-actors"
        ]
      },
      {
        "group": "III. The Evolution Interface",
        "pages": [
          "factors/05-evolution",
          "factors/06-exploration"
        ]
      },
      {
        "group": "IV. The Network Interface",
        "pages": [
          "factors/07-network-context",
          "factors/08-coordination"
        ]
      },
      {
        "group": "V. The Network Economy",
        "pages": [
          "factors/09-complex-systems",
          "factors/10-value-realization"
        ]
      },
      {
        "group": "VI. Knowledge Capitalism",
        "pages": [
          "factors/11-knowledge-capital",
          "factors/12-mechanism-design"
        ]
      },
      {
        "group": "About",
        "pages": [
          "about/inspirations",
          "about/contributing"
        ]
      }
    ]
  },
  "footerSocials": {
    "github": "https://github.com/pureicis/12-factor-info-capitalism"
  },
  "styling": {
    "eyebrows": "breadcrumbs",
    "drilldown": false,
    "feedback": {
      "thumbsRating": true,
      "suggestEdit": true,
      "raiseIssue": true
    }
  },
  "search": {
    "prompt": "Search the 12 factors..."
  },
  "metadata": {
    "og:site_name": "12 Factors of Knowledge Capitalism",
    "og:description": "A framework for understanding how knowledge creates, compounds, and captures value in networked systems.",
    "og:image": "https://[your-domain]/public/og-image.png"
  }
}
```

---

## Phase 2 Completion Checklist

### Configuration
- [ ] docs.json fully configured
- [ ] Schema validation passes
- [ ] All required fields present
- [ ] Color scheme chosen
- [ ] Theme selected

### Navigation
- [ ] All 7 groups defined
- [ ] All pages listed correctly
- [ ] File paths follow convention
- [ ] Order matches reading flow

### Assets
- [ ] public/ directory created
- [ ] Favicon added (or placeholder)
- [ ] Logo files added (or placeholder)
- [ ] OG image created (or placeholder)

### Features
- [ ] Search configured
- [ ] Footer links working
- [ ] Styling preferences set
- [ ] Feedback widgets enabled (optional)

### Testing
- [ ] Dev server runs without errors
- [ ] Colors display correctly
- [ ] Dark mode works
- [ ] Navigation renders properly
- [ ] Mobile responsive

---

## Common Configuration Issues

### Issue 1: "Invalid schema" error
**Cause**: Malformed JSON or missing required fields
**Solution**:
- Validate JSON syntax (use VS Code JSON validator)
- Ensure `name`, `theme`, `colors.primary` exist
- Check for trailing commas

### Issue 2: Pages not appearing in navigation
**Cause**: File path mismatch
**Solution**:
- File paths in `pages` must match actual file locations
- Don't include `.mdx` extension in paths
- Paths are relative to project root

### Issue 3: Logo/favicon not loading
**Cause**: Incorrect path reference
**Solution**:
- Paths start with `/public/`
- Files must actually exist
- Use correct file extensions
- Check browser console for 404 errors

### Issue 4: Colors not applying
**Cause**: Invalid hex values or wrong format
**Solution**:
- Use 6-digit hex codes: `#0369a1` not `#09a1`
- Include `#` prefix
- Check `colors.primary` is set at minimum

---

## Next Steps

After Phase 2 completion:
1. Proceed to **Phase 3: Introduction Page**
2. Create introduction.mdx with framework overview
3. Set up navigation cards to factors

---

## Time Estimate

- Task 2.1-2.2: 15 minutes (basic settings, colors)
- Task 2.3: 20 minutes (navigation structure)
- Task 2.4-2.5: 10 minutes (styling, footer)
- Task 2.6-2.8: 15 minutes (SEO, search, features)
- Task 2.9: 30-60 minutes (create assets, or skip for MVP)
- Task 2.10: 15 minutes (validation)

**Total**: 1.5-2 hours (or 1 hour if skipping custom assets initially)

---

## References

- [Mintlify Settings](https://www.mintlify.com/docs/organize/settings)
- [Mintlify Navigation](https://www.mintlify.com/docs/organize/navigation)
- [Mintlify Styling](https://www.mintlify.com/docs/styling)
- [JSON Schema Validator](https://jsonschemavalidator.net/)
