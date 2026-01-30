# Task: Convert README to Mintlify Documentation Site

## Overview

Convert the 12 Factors of Knowledge Capitalism from a single README.md into a comprehensive Mintlify documentation site structured as an online ebook. Each of the 6 sections will be a navigation group, and each of the 12 factors will be individual chapter pages.

**Project Type**: Book-like documentation with sequential reading flow
**Target Structure**: 6 section groups → 12 factor chapters → supplementary pages

---

## Research Summary

### Key Mintlify Findings

1. **Navigation Architecture**: docs.json uses a recursive structure allowing tabs → groups → pages hierarchy ([Mintlify Navigation](https://www.mintlify.com/docs/organize/navigation))

2. **Migration Process**: Content lives in MDX files with frontmatter; docs.json controls navigation and settings ([Mintlify Migration Guide](https://hackmamba.io/technical-documentation/mintlify-documentation-migration-guide/))

3. **Book-like Structure**: Best practice is nested groups within a single organizational pattern, with `expanded: true/false` controlling section visibility ([Mintlify Blog](https://www.mintlify.com/blog/refactoring-mint-json-into-docs-json))

4. **MDX Requirements**: Strict syntax compared to Markdown; requires line-by-line validation ([Dev.to Guide](https://dev.to/therealmrmumba/a-step-by-step-guide-to-creating-a-beautiful-documentation-site-with-mintlify-532m))

### Current Content Structure

From README.md:
- **I. Foundations**: Factors #1-2 (Knowledge as Entropy, Language)
- **II. The Agency Interface**: Factors #3-4 (Agency Interface, Cognitive Actors)
- **III. The Evolution Interface**: Factors #5-6 (Evolution, Exploration)
- **IV. The Network Interface**: Factors #7-8 (Network Context, Coordination)
- **V. The Network Economy**: Factors #9-10 (Complex Systems, Value Realization)
- **VI. Knowledge Capitalism**: Factors #11-12 (Knowledge Capital, Mechanism Design)

---

## Proposed Site Structure

### Navigation Hierarchy

```
docs.json
├── Home (introduction.mdx)
├── I. Foundations (group)
│   ├── 1. Knowledge is Negative Entropy (factors/01-negative-entropy.mdx)
│   └── 2. Language Compresses Knowledge (factors/02-language.mdx)
├── II. The Agency Interface (group)
│   ├── 3. The Agency Interface (factors/03-agency-interface.mdx)
│   └── 4. Cognitive Actors (factors/04-cognitive-actors.mdx)
├── III. The Evolution Interface (group)
│   ├── 5. Evolution Interface (factors/05-evolution.mdx)
│   └── 6. Exploration (factors/06-exploration.mdx)
├── IV. The Network Interface (group)
│   ├── 7. Network Interface (factors/07-network-context.mdx)
│   └── 8. Coordination (factors/08-coordination.mdx)
├── V. The Network Economy (group)
│   ├── 9. Complex Adaptive Systems (factors/09-complex-systems.mdx)
│   └── 10. Value Realization (factors/10-value-realization.mdx)
├── VI. Knowledge Capitalism (group)
│   ├── 11. Knowledge Capital (factors/11-knowledge-capital.mdx)
│   └── 12. Mechanism Design (factors/12-mechanism-design.mdx)
└── About (group)
    ├── Inspirations (about/inspirations.mdx)
    └── Contributing (about/contributing.mdx)
```

### File Organization

```
/
├── docs.json
├── introduction.mdx
├── factors/
│   ├── 01-negative-entropy.mdx
│   ├── 02-language.mdx
│   ├── 03-agency-interface.mdx
│   ├── 04-cognitive-actors.mdx
│   ├── 05-evolution.mdx
│   ├── 06-exploration.mdx
│   ├── 07-network-context.mdx
│   ├── 08-coordination.mdx
│   ├── 09-complex-systems.mdx
│   ├── 10-value-realization.mdx
│   ├── 11-knowledge-capital.mdx
│   └── 12-mechanism-design.mdx
├── about/
│   ├── inspirations.mdx
│   └── contributing.mdx
└── public/
    └── (images, logos, etc.)
```

---

## Implementation Phases

### Phase 1: Project Initialization
**Goal**: Set up Mintlify project structure and tooling

**Tasks**:
1. Install Mintlify CLI globally (`npm i -g mint`)
2. Initialize new Mintlify project (`mint new 12-factor-info-capitalism`)
3. Verify local dev server works (`mint dev`)
4. Set up git branch for Mintlify work
5. Document Node.js version requirements

**Acceptance Criteria**:
- [ ] CLI installed and `mint version` shows valid version
- [ ] Local preview runs at `http://localhost:3000`
- [ ] docs.json exists with minimal valid configuration
- [ ] Git branch created and clean working directory

---

### Phase 2: Core Configuration
**Goal**: Configure docs.json with theme, branding, and navigation structure

**Tasks**:
1. Configure basic settings (name, theme, colors)
2. Add logo and favicon to public/
3. Set up navigation groups for 6 sections
4. Configure SEO metadata (description, og:image)
5. Set up footer links (GitHub, Twitter, etc.)
6. Configure search settings

**docs.json Template**:
```json
{
  "$schema": "https://mintlify.com/docs.json",
  "theme": "mint",
  "name": "12 Factors of Knowledge Capitalism",
  "logo": {
    "light": "/public/logo-light.svg",
    "dark": "/public/logo-dark.svg"
  },
  "favicon": "/public/favicon.png",
  "colors": {
    "primary": "#0369a1",
    "light": "#38bdf8",
    "dark": "#0c4a6e",
    "background": {
      "light": "#ffffff",
      "dark": "#0f172a"
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
    "drilldown": false
  }
}
```

**Acceptance Criteria**:
- [ ] docs.json passes schema validation
- [ ] All navigation groups defined
- [ ] Branding elements (logo, colors) configured
- [ ] Footer and social links work

---

### Phase 3: Content Migration - Introduction
**Goal**: Create homepage that introduces the framework

**Tasks**:
1. Create `introduction.mdx` with frontmatter
2. Extract introduction paragraph from README
3. Add overview of the 6 sections
4. Create visual section map (consider using Mintlify Cards)
5. Add "inspired by" attribution section
6. Link to 12-Factor App and 12-Factor Agents

**introduction.mdx Template**:
```mdx
---
title: "Introduction"
description: "Understanding how knowledge creates, compounds, and captures value in networked systems"
---

# 12 Factors of Knowledge Capitalism

Inspired by the original [12-Factor App](https://12factor.net/) and [12-Factor Agents](https://github.com/humanlayer/12-factor-agents).

Knowledge Capitalism is a framework for understanding how knowledge creates, compounds, and captures value in networked systems...

## Framework Structure

<CardGroup cols={2}>
  <Card title="I. Foundations" icon="foundation" href="/factors/01-negative-entropy">
    The nature of knowledge and its transmission mechanisms
  </Card>
  <Card title="II. The Agency Interface" icon="brain" href="/factors/03-agency-interface">
    How knowledge translates to action through cognitive actors
  </Card>
  ...
</CardGroup>
```

**Acceptance Criteria**:
- [ ] introduction.mdx renders without errors
- [ ] All links work
- [ ] Cards display correctly (if used)
- [ ] Introduction flows naturally

---

### Phase 4: Content Migration - The 12 Factors
**Goal**: Convert each factor into a standalone MDX chapter

**Process (repeat for each factor)**:
1. Create MDX file in `factors/` directory
2. Add frontmatter (title, description, icon)
3. Extract factor content from README
4. Validate all citations render as links
5. Add navigation elements (previous/next chapter)
6. Validate MDX syntax

**Factor Template**:
```mdx
---
title: "1. Knowledge is Negative Entropy"
description: "Knowledge as information that enables effective action"
icon: "atom"
---

# 1. Knowledge is Negative Entropy

Knowledge is not mere information—it is information that enables effective action...

<Info>
This factor establishes the foundational definition of knowledge as actionable intelligence.
</Info>

## Key Concepts

- Information theory and uncertainty reduction
- Cybernetics and negative entropy
- Sequential decision-making under uncertainty

## Further Reading

- [Shannon: A Mathematical Theory of Communication](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)
- [Wiener: Cybernetics](https://uberty.org/wp-content/uploads/2015/07/Norbert_Wiener_Cybernetics.pdf)
```

**Per-Factor Checklist** (×12):
- [ ] Factor #1: Knowledge is Negative Entropy
- [ ] Factor #2: Language Compresses Knowledge
- [ ] Factor #3: The Agency Interface
- [ ] Factor #4: Cognitive Actors
- [ ] Factor #5: Evolution Interface
- [ ] Factor #6: Exploration
- [ ] Factor #7: Network Context
- [ ] Factor #8: Coordination
- [ ] Factor #9: Complex Adaptive Systems
- [ ] Factor #10: Value Realization
- [ ] Factor #11: Knowledge Capital
- [ ] Factor #12: Mechanism Design

**Content Migration Guidelines**:
- Preserve all scholarly citations as hyperlinks
- Use Mintlify components (`<Info>`, `<Warning>`, `<Tip>`, `<Card>`)
- Break dense paragraphs with headings
- Add visual hierarchy (## Key Concepts, ## Further Reading)
- Validate external links (use WebFetch if uncertain)

---

### Phase 5: Supplementary Pages
**Goal**: Create additional context and navigation pages

**Tasks**:
1. Create `about/inspirations.mdx` listing intellectual sources
2. Create `about/contributing.mdx` for collaboration guidelines
3. Optional: Create glossary page for key terms
4. Optional: Create references page with all citations

**Acceptance Criteria**:
- [ ] All about/* pages render correctly
- [ ] Navigation includes About group
- [ ] Pages follow consistent styling

---

### Phase 6: Enhancement & Polish
**Goal**: Add visual elements and optimize reading experience

**Tasks**:
1. Add icons to each factor (using Mintlify icon library)
2. Create visual diagrams for complex concepts (Mermaid or images)
3. Add callout boxes (`<Info>`, `<Warning>`) for key insights
4. Implement code blocks for formulas/algorithms (if applicable)
5. Add image assets to public/
6. Configure syntax highlighting themes
7. Test dark mode rendering

**Visual Enhancement Ideas**:
- **Factor #1**: Diagram showing information → knowledge → action
- **Factor #7**: Network graph visualization
- **Factor #9**: Complex adaptive systems illustration
- **Factor #12**: Mechanism design flowchart

**Acceptance Criteria**:
- [ ] All factors have appropriate icons
- [ ] Visual elements enhance comprehension
- [ ] Dark mode works correctly
- [ ] Images load and scale properly

---

### Phase 7: Testing & Validation
**Goal**: Ensure site works correctly across all scenarios

**Test Cases**:
1. **Navigation Testing**
   - [ ] All internal links work
   - [ ] Breadcrumbs display correctly
   - [ ] Group expansion/collapse works
   - [ ] Mobile navigation works

2. **Content Testing**
   - [ ] All external citation links are valid
   - [ ] MDX syntax is error-free
   - [ ] Search finds relevant content
   - [ ] No broken images

3. **Cross-browser Testing**
   - [ ] Chrome/Edge
   - [ ] Firefox
   - [ ] Safari
   - [ ] Mobile browsers

4. **Performance Testing**
   - [ ] Page load times < 2s
   - [ ] Search responds quickly
   - [ ] No console errors

**Validation Commands**:
```bash
# Start dev server
mint dev

# Check for broken links (using external tool)
npx broken-link-checker http://localhost:3000

# Validate docs.json schema
# (Built into Mintlify CLI)
```

---

### Phase 8: Deployment Setup
**Goal**: Deploy to production hosting

**Deployment Options**:
1. **Mintlify Hosting** (recommended)
   - Sign up at mintlify.com
   - Connect GitHub repository
   - Configure custom domain
   - Automatic deploys on git push

2. **Self-Hosted** (alternative)
   - Build static site
   - Deploy to Vercel/Netlify/Cloudflare Pages
   - Configure DNS

**Tasks**:
1. Create Mintlify account
2. Connect GitHub repo
3. Configure build settings
4. Set up custom domain (if desired)
5. Enable analytics (optional)
6. Test production deployment

**Acceptance Criteria**:
- [ ] Site deploys successfully
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Analytics tracking works (if enabled)

---

## Technical Considerations

### Node.js Version
- Required: Node.js v20.17.0+ ([Mintlify Installation](https://www.mintlify.com/docs/installation))
- Recommended: Use `nvm` for version management

### MDX Syntax Strictness
- MDX is stricter than Markdown
- Common issues:
  - Unclosed JSX tags
  - Incorrect component syntax
  - Inline HTML without proper escaping
- Solution: Use linting tools and validate incrementally

### Citation Link Preservation
- All scholarly links MUST be preserved
- Use markdown link syntax: `[text](url)`
- For long URLs, consider URL shortening or footnotes

### Search Optimization
- Mintlify includes built-in search
- Optimize with:
  - Clear page titles
  - Descriptive frontmatter
  - Semantic headings
  - Keyword-rich descriptions

---

## Risk Mitigation

### Risk 1: MDX Conversion Errors
**Impact**: High - Site won't build
**Mitigation**:
- Migrate one factor at a time
- Test after each migration
- Keep README.md as reference

### Risk 2: Broken Citation Links
**Impact**: Medium - Credibility loss
**Mitigation**:
- Validate all links before migration
- Use WebFetch to check link validity
- Create backup archive of cited sources

### Risk 3: Navigation Complexity
**Impact**: Low - User confusion
**Mitigation**:
- Use clear group names
- Add breadcrumbs
- Include introduction with roadmap

### Risk 4: Content Licensing
**Impact**: Low - Attribution issues
**Mitigation**:
- Preserve all original attributions
- Add license file
- Credit original 12-Factor App inspiration

---

## Success Metrics

### Quantitative
- [ ] All 12 factors migrated (100%)
- [ ] Zero broken links
- [ ] Zero MDX syntax errors
- [ ] Page load time < 2 seconds
- [ ] Lighthouse score > 90

### Qualitative
- [ ] Reading flow feels natural
- [ ] Navigation is intuitive
- [ ] Visual hierarchy aids comprehension
- [ ] Mobile experience is excellent
- [ ] Dark mode is readable

---

## Timeline Estimate

**Phase 1-2**: Project setup and configuration (2-3 hours)
**Phase 3**: Introduction page (1 hour)
**Phase 4**: 12 factor pages (6-8 hours, ~30-40 min each)
**Phase 5**: Supplementary pages (1-2 hours)
**Phase 6**: Enhancement & polish (2-3 hours)
**Phase 7**: Testing (1-2 hours)
**Phase 8**: Deployment (1 hour)

**Total**: 14-20 hours of focused work

---

## Next Steps

1. Review this plan with Remy
2. Create feature branch: `git checkout -b feature/mintlify-conversion`
3. Begin Phase 1: Project Initialization
4. Track progress in .ai/tasks/ directory
5. Commit incrementally after each phase

---

## References

- [Mintlify Documentation](https://www.mintlify.com/docs)
- [Mintlify Navigation Guide](https://www.mintlify.com/docs/organize/navigation)
- [Mintlify Migration Guide](https://hackmamba.io/technical-documentation/mintlify-documentation-migration-guide/)
- [MDX Documentation](https://mdxjs.com/)
- [12-Factor App](https://12factor.net/)
- [12-Factor Agents](https://github.com/humanlayer/12-factor-agents)

---

## Notes

- Keep README.md as canonical source until migration complete
- Consider creating `/docs` subdirectory to keep root clean
- May want to set up CI/CD for automated testing
- Could add version control for future framework updates
