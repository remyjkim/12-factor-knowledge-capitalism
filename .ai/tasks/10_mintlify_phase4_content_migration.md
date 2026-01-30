# Phase 4: Content Migration - The 12 Factors

## Objective
Convert each of the 12 factors from README.md into standalone MDX chapter pages with proper frontmatter, citations, and Mintlify components.

---

## Content Migration Workflow

### Standard Process (Per Factor)

1. **Create MDX File**
   - File naming: `factors/0X-descriptive-slug.mdx`
   - Use kebab-case for URLs
   - Leading zero for single digits (01, 02...)

2. **Add Frontmatter**
   - Title: Full factor title
   - Description: One-sentence summary
   - Icon: Appropriate from Mintlify icon library

3. **Extract Content**
   - Copy factor content from README.md
   - Preserve all scholarly citations
   - Maintain paragraph structure

4. **Enhance with Components**
   - Add `<Info>`, `<Warning>`, `<Tip>` callouts
   - Break up dense text with headings
   - Consider adding visual elements

5. **Validate MDX**
   - Check syntax in dev server
   - Verify all links work
   - Test dark mode rendering

6. **Update Navigation**
   - Add to docs.json under appropriate group
   - Verify page appears in sidebar
   - Test navigation flow

---

## Mintlify Component Patterns

### Frontmatter Template
```mdx
---
title: "X. [Factor Title]"
description: "[One-sentence summary of factor]"
icon: "[icon-name]"
---
```

### Common Components

**Callout Boxes**:
```mdx
<Info>
This factor establishes [key concept].
</Info>

<Warning>
Note that [important caveat].
</Warning>

<Tip>
For deeper understanding, see [related factor].
</Tip>
```

**Card Groups** (for related concepts):
```mdx
<CardGroup cols={2}>
  <Card title="Key Concept 1" icon="lightbulb">
    Brief description
  </Card>
  <Card title="Key Concept 2" icon="book">
    Brief description
  </Card>
</CardGroup>
```

**Accordion** (for optional deep dives):
```mdx
<Accordion title="Technical Details">
Content here...
</Accordion>
```

---

## Factor-by-Factor Migration Plan

### Factor 1: Knowledge is Negative Entropy

**File**: `factors/01-negative-entropy.mdx`

**Icon**: `atom` or `infinity`

**Key Sections**:
- Information theory foundation
- Cybernetics and negative entropy
- Sequential decision-making
- Life as knowledge accumulation

**Citations to Preserve**:
- Shannon: Information theory
- Wiener: Cybernetics
- Howard: Information value theory
- Sondik: POMDP

**Component Suggestions**:
```mdx
<Info>
Knowledge is distinguished from mere information by its actionability—it must reduce uncertainty and improve decision-making.
</Info>

## Key Concepts
- Information reduces uncertainty (Shannon)
- Negative entropy maintains organization (Wiener)
- Value depends on decision impact (Howard)
```

**Acceptance Criteria**:
- [ ] File created at `factors/01-negative-entropy.mdx`
- [ ] Frontmatter complete
- [ ] All 4 citations preserved as links
- [ ] Added to docs.json under "I. Foundations"
- [ ] Renders without errors in browser
- [ ] Dark mode tested

---

### Factor 2: Language Compresses and Carries Knowledge

**File**: `factors/02-language.mdx`

**Icon**: `language` or `comment-dots`

**Key Sections**:
- Algorithmic information theory
- Formal language theory (Chomsky)
- Wittgenstein's arc (early vs late)
- Compression as lossy but efficient

**Citations to Preserve**:
- Kolmogorov: Algorithmic information
- Chomsky: Formal language theory
- Wittgenstein: Tractatus & Philosophical Investigations
- Sperber & Wilson: Relevance theory (if present)

**Component Suggestions**:
```mdx
<Accordion title="Wittgenstein's Evolution">
Early work: Limits of language = limits of thought
Later work: Meaning emerges from use, language as form of life
</Accordion>

## The Compression Trade-off
Language compresses experiential reality into symbols—lossy but remarkably efficient for transmitting knowledge across time and space.
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 4+ citations preserved
- [ ] Wittgenstein arc explained clearly
- [ ] Added to docs.json
- [ ] Renders correctly

---

### Factor 3: The Agency Interface

**File**: `factors/03-agency-interface.mdx`

**Icon**: `brain` or `arrows-turn-to-dots`

**Key Sections**:
- Belief as settled state (Peirce)
- Belief states and POMDP
- Bounded rationality (Simon)
- Dual-process theory (Kahneman)

**Citations to Preserve**:
- Peirce: Belief as action guide
- POMDP: Belief states
- Simon: Bounded rationality
- Kahneman: Thinking Fast and Slow

**Component Suggestions**:
```mdx
<Info>
The agency interface transforms static knowledge into dynamic action through beliefs and frameworks.
</Info>

<CardGroup cols={2}>
  <Card title="System 1" icon="bolt">
    Fast, automatic, intuitive
  </Card>
  <Card title="System 2" icon="gear">
    Slow, deliberate, analytical
  </Card>
</CardGroup>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 4 citations preserved
- [ ] System 1/2 explained
- [ ] Added to docs.json under "II. The Agency Interface"
- [ ] Renders correctly

---

### Factor 4: Cognitive Actors Are the Nodes

**File**: `factors/04-cognitive-actors.mdx`

**Icon**: `users` or `diagram-project`

**Key Sections**:
- Human-AI parity framing
- AlphaFold protein prediction
- AI Scientist automated research
- Artificial life discovery
- Agency and accountability

**Citations to Preserve**:
- Licklider: Man-computer symbiosis
- Turing: Computing machinery
- AlphaFold: Nature paper
- AI Scientist: Sakana AI
- Artificial life: arxiv

**Component Suggestions**:
```mdx
<Warning>
AI systems are no longer mere tools—they create new knowledge and operate as peer nodes in cognitive networks.
</Warning>

## Examples of AI Knowledge Creation
- AlphaFold: 200M+ protein structures
- AI Scientist: Hypothesis → peer-reviewed manuscript
- Artificial life: Novel simulations humans never conceived
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 5 citations preserved
- [ ] Human-AI parity clearly stated
- [ ] Examples compelling
- [ ] Added to docs.json

---

### Factor 5: Evolution Interface

**File**: `factors/05-evolution.mdx`

**Icon**: `rotate` or `arrow-trend-up`

**Key Sections**:
- Omega vs lambda knowledge (Mokyr)
- Paradigm shifts (Kuhn)
- Conjectures and refutations (Popper)
- Good explanations (Deutsch)

**Citations to Preserve**:
- Mokyr: Omega and lambda knowledge
- Kuhn: Structure of Scientific Revolutions
- Popper: Conjectures and Refutations
- Deutsch: The Beginning of Infinity

**Component Suggestions**:
```mdx
<Accordion title="Omega vs Lambda Knowledge">
**Omega (ω)**: Propositional knowledge—understanding *why* things work
**Lambda (λ)**: Prescriptive knowledge—techniques for *how* to manipulate the world
</Accordion>

<Tip>
Language models compress omega knowledge and generate lambda outputs—theory to practice.
</Tip>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 4 citations preserved
- [ ] Omega/lambda explained
- [ ] Added to docs.json under "III. The Evolution Interface"

---

### Factor 6: Exploration

**File**: `factors/06-exploration.mdx`

**Icon**: `compass` or `magnifying-glass`

**Key Sections**:
- Inquiry as self-correction (Dewey)
- Explore-exploit tradeoff (Sutton & Barto)
- Memex and augmentation (Bush, Engelbart)
- Open-ended learning (Silver & Sutton)

**Citations to Preserve**:
- Dewey: Theory of Inquiry
- Sutton & Barto: Reinforcement Learning
- Bush: Memex
- Engelbart: Augmenting Human Intellect
- Silver & Sutton: Era of Experience
- Yiding Jiang: Exploration blog

**Component Suggestions**:
```mdx
<Info>
Exploration is the sovereign act of cognitive agency—the ability to formulate questions, test hypotheses, and navigate information spaces.
</Info>

## The Explore-Exploit Dilemma
Agents must balance:
- **Explore**: Gather new information
- **Exploit**: Act on current knowledge
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 6 citations preserved
- [ ] Explore-exploit explained
- [ ] Added to docs.json

---

### Factor 7: Network Interface

**File**: `factors/07-network-context.mdx`

**Icon**: `network-wired` or `sitemap`

**Key Sections**:
- Graph theory (structure matters)
- Tie strength (Granovetter)
- Epidemiology of representations (Sperber)
- Relevance theory (Sperber & Wilson)
- Medium is message (McLuhan)
- Framing effects (Kahneman & Tversky)

**Citations to Preserve**:
- Graph theory paper
- Granovetter: Weak ties
- Sperber: Epidemiology of representations
- Sperber & Wilson: Relevance Theory
- McLuhan: Medium is message
- Kahneman & Tversky: Prospect theory

**Component Suggestions**:
```mdx
<Warning>
Context is not optional metadata—it is the infrastructure through which knowledge acquires meaning.
</Warning>

<CardGroup cols={2}>
  <Card title="Weak Ties" icon="link-slash">
    Bridge distant communities with novel ideas
  </Card>
  <Card title="Strong Ties" icon="link">
    Reinforce local consensus and trust
  </Card>
</CardGroup>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 6 citations preserved
- [ ] Tie strength explained
- [ ] Added to docs.json under "IV. The Network Interface"

---

### Factor 8: Coordination

**File**: `factors/08-coordination.mdx`

**Icon**: `handshake` or `users-gear`

**Key Sections**:
- Common myths (Harari)
- Common ground (Stalnaker)
- Conventions (Lewis)
- Common knowledge (Aumann)
- Channel richness (Daft & Lengel)
- Prices coordinate (Hayek)
- Institutions (North)

**Citations to Preserve**:
- Harari: Common myths
- Stalnaker: Common ground
- Lewis: Convention
- Aumann: Agreeing to disagree
- Daft & Lengel: Channel richness
- Hayek: Use of knowledge in society
- North: Institutions

**Component Suggestions**:
```mdx
<Info>
Large-scale cooperation requires shared belief systems that exist only in collective imagination yet enable millions to coordinate.
</Info>

## Coordination Mechanisms
- **Myths**: Shared fictions (nations, corporations, money)
- **Common ground**: Mutual presuppositions
- **Conventions**: Stable equilibria
- **Prices**: Dispersed knowledge signals
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 7 citations preserved
- [ ] Coordination mechanisms clear
- [ ] Added to docs.json

---

### Factor 9: Complex Adaptive Systems

**File**: `factors/09-complex-systems.mdx`

**Icon**: `diagram-nested` or `atom-simple`

**Key Sections**:
- CAS definition (proper citation)
- Large numbers of agents
- Distributed control
- Sensitive dependence on initial conditions
- Controllability in complex networks

**Citations to Preserve**:
- Complex Adaptive Systems paper (verified)
- Barabási: Network controllability
- Chaos theory reference

**Component Suggestions**:
```mdx
<Accordion title="Characteristics of Complex Adaptive Systems">
1. Large numbers of interacting agents
2. Distributed control (no central director)
3. Emergent behavior beyond individual contributions
4. Sensitive dependence on initial conditions
5. Adaptation and learning
</Accordion>

<Warning>
Deterministic dynamics can produce fundamentally unpredictable outcomes.
</Warning>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] Correct CAS citation (not Odlyzko)
- [ ] 3+ citations preserved
- [ ] Added to docs.json under "V. The Network Economy"

---

### Factor 10: Value Realization

**File**: `factors/10-value-realization.mdx`

**Icon**: `chart-line` or `coins`

**Key Sections**:
- Real economy (Solow, Corrado)
- Financial economy (Hayek, Fama)
- Knowledge economy (Machlup, Arrow)
- Nonrival goods
- Symbolic systems (Szabo)

**Citations to Preserve**:
- Solow: Technical change
- Corrado: Intangible investments
- Hayek: Price signals
- Fama: Efficient markets
- Machlup: Knowledge production
- Arrow: Economic welfare
- Szabo: Symbolic value systems

**Component Suggestions**:
```mdx
<CardGroup cols={3}>
  <Card title="Real Economy" icon="industry">
    Physical production, technical change
  </Card>
  <Card title="Financial Economy" icon="chart-line">
    Capital allocation, information aggregation
  </Card>
  <Card title="Knowledge Economy" icon="brain">
    Direct knowledge commodification
  </Card>
</CardGroup>

<Info>
Ideas are nonrival—they can be used simultaneously by unlimited parties without depletion.
</Info>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 7 citations preserved
- [ ] Three economies explained
- [ ] Nonrival concept clear
- [ ] Added to docs.json

---

### Factor 11: Knowledge Capital

**File**: `factors/11-knowledge-capital.mdx`

**Icon**: `piggy-bank` or `book-sparkles`

**Key Sections**:
- Intangible investments (Corrado)
- Nonrival and increasing returns (Romer)
- Recombinant growth (Weitzman)
- Creative destruction (Schumpeter)
- Endogenous growth (Aghion & Howitt)
- Positive feedback (Wiener)

**Citations to Preserve**:
- Corrado: Intangible capital
- Romer: Endogenous growth
- Weitzman: Recombinant growth
- Schumpeter: Creative destruction
- Aghion & Howitt: Endogenous growth formalization
- Wiener: Positive feedback (Cybernetics)

**Component Suggestions**:
```mdx
<Info>
Knowledge capital compounds through recombination—new ideas emerge from novel combinations of existing ones.
</Info>

## Properties of Knowledge Capital
- **Non-depleting**: Use doesn't diminish value
- **Recombinant**: Combines to create new ideas
- **Self-reinforcing**: Success compounds through positive feedback

<Tip>
The "flywheel of human progress"—discovery, application, reinvestment—accelerates with each turn.
</Tip>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 6 citations preserved
- [ ] Flywheel metaphor clear
- [ ] Added to docs.json under "VI. Knowledge Capitalism"

---

### Factor 12: Mechanism Design

**File**: `factors/12-mechanism-design.mdx`

**Icon**: `gears` or `network-wired`

**Key Sections**:
- Mechanism design theory (Hurwicz)
- Knowledge spillovers (Aghion)
- Search systems (Brin & Page)
- Decentralized protocols (Nakamoto)
- Programmable platforms (Ethereum)
- Content-addressed systems (IPFS)
- Language models (GPT-3)
- Media of exchange (Kiyotaki)

**Citations to Preserve**:
- Hurwicz: Mechanism design
- Aghion: Knowledge spillovers
- Brin & Page: PageRank
- Nakamoto: Bitcoin
- Buterin: Ethereum
- IPFS: Content addressing
- GPT-3: Language models
- Kiyotaki: Money as medium

**Component Suggestions**:
```mdx
<Info>
The goal is to design mechanisms that maximize aggregate knowledge liquidity—the ease with which knowledge flows to where it creates value.
</Info>

## New Primitives for Knowledge Flow
1. **Search systems**: Route queries to authoritative sources
2. **Decentralized protocols**: Enable trustless coordination
3. **Programmable platforms**: Turing-complete compute
4. **Content-addressed systems**: Permanent retrievability
5. **Language models**: Democratized cognitive capabilities

<Warning>
The ultimate design challenge: minimize friction in knowledge exchange while preserving incentives for knowledge creation.
</Warning>
```

**Acceptance Criteria**:
- [ ] File created
- [ ] 8 citations preserved
- [ ] Primitives clearly listed
- [ ] Added to docs.json

---

## MDX Syntax Validation Checklist

For each factor, verify:

### Links
- [ ] All citation URLs preserved
- [ ] Markdown link syntax correct: `[text](url)`
- [ ] No broken links (use WebFetch to validate if uncertain)

### Components
- [ ] All JSX tags properly closed
- [ ] Component syntax correct (capitalized)
- [ ] Props properly quoted

### Headings
- [ ] Heading hierarchy logical (##, ###, ####)
- [ ] No skipped levels
- [ ] Descriptive heading text

### Lists
- [ ] Bullet points render correctly
- [ ] Numbered lists sequential
- [ ] Nested lists properly indented

### Code Blocks
- [ ] Properly fenced with triple backticks
- [ ] Language specified where applicable

---

## Migration Order

**Recommended sequence**:
1. Start with Factor 1 (foundational, sets pattern)
2. Complete Factors 2-3 (same section)
3. Jump to Factor 12 (test navigation flow end-to-end)
4. Fill in Factors 4-11
5. Review all for consistency

**Rationale**: Early validation of both beginning and end ensures navigation works correctly.

---

## Time Estimate Per Factor

- File creation: 2 minutes
- Content extraction: 5 minutes
- Citation validation: 3 minutes
- Component enhancement: 5 minutes
- MDX validation: 3 minutes
- Navigation update: 2 minutes

**Total per factor**: ~20-30 minutes
**Total for 12 factors**: 4-6 hours

---

## Quality Assurance Checklist

After completing all 12 factors:

### Consistency
- [ ] All factors follow same frontmatter structure
- [ ] Icon style consistent
- [ ] Component usage patterns similar
- [ ] Heading levels consistent

### Completeness
- [ ] All 12 factors migrated
- [ ] No content lost from original README
- [ ] All citations preserved
- [ ] All sections represented

### Navigation
- [ ] All factors appear in sidebar
- [ ] Groups properly organized
- [ ] Sequential reading flow natural
- [ ] Breadcrumbs show correct hierarchy

### Validation
- [ ] Zero MDX syntax errors
- [ ] Zero broken links
- [ ] Dark mode renders correctly
- [ ] Mobile view works

---

## Next Steps

After Phase 4 completion:
1. Proceed to **Phase 5: Supplementary Pages**
2. Create about/inspirations.mdx
3. Create about/contributing.mdx
4. Optional: Create glossary

---

## References

- [MDX Documentation](https://mdxjs.com/)
- [Mintlify Components](https://www.mintlify.com/docs/content/components)
- [Mintlify Pages](https://www.mintlify.com/docs/organize/pages)
