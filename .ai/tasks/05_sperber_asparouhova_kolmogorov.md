# Task: Add Sperber, Asparouhova, and Kolmogorov References

## Overview

This task adds four key references that strengthen Factors #2 and #7:

**Factor #2 (Language):**
1. **Kolmogorov** - Compression as description length (algorithmic information theory)
2. **Wittgenstein** - Named explicitly as backbone (early → later work arc)
3. **Sperber & Wilson** - Relevance theory: communication as inference, not decoding

**Factor #7 (Network Interface):**
4. **Sperber** - Epidemiology of representations (why some ideas spread)
5. **Asparouhova** - Antimemetics (why some ideas resist spreading)

---

## Current State

### Factor #2: Language Compresses and Carries Knowledge

```markdown
Among all the vessels humanity has invented to carry knowledge across time and space, language remains the most versatile. It compresses vast experiential reality into transmissible symbols, enabling one mind to reconstruct the mental states of another. [One view](https://people.umass.edu/klement/tlp/tlp.pdf) holds that the limits of language are the limits of thought—what cannot be expressed cannot be known. [Another](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf) reveals that meaning is not fixed but emerges from use: language is a form of life, a set of games whose rules are learned through practice. This compression is lossy but remarkably efficient, allowing complex ideas to propagate across generations and continents with sufficient fidelity to build cumulative understanding.
```

**Issue:** The claim "compresses vast experiential reality" lacks formal grounding. Kolmogorov's algorithmic information theory provides the rigorous foundation: compression as minimal description length.

---

### Factor #7: The Network Interface Routes Knowledge Through Context

```markdown
Knowledge cannot traverse networks without context—the edges between cognitive actors are not neutral conduits but active shapers of meaning. Graph theory reveals that [what matters is the structure of connections](https://jlmartin.ku.edu/courses/math105-F11/Lectures/chapter5-part1.pdf), not the physical terrain. [Tie strength](https://snap.stanford.edu/class/cs224w-readings/granovetter73weakties.pdf) determines what information flows: weak ties bridge distant communities with novel ideas, strong ties reinforce local consensus. From oral myths passed across generations to cuneiform tablets to printed treatises to digital networks, each transmission medium shapes what knowledge survives and how it transforms. [The medium is the message](https://web.mit.edu/allanmc/www/mcluhan.mediummessage.pdf)—form and content are inseparable. [Framing effects](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Behavioral_Decision_Theory/Kahneman_Tversky_1979_Prospect_theory.pdf) demonstrate the stakes: identical information presented as gain versus loss produces opposite decisions. Context is not optional metadata; it is the infrastructure through which knowledge acquires meaning.
```

**Issues:**
1. Discusses what flows through networks but not what *fails* to flow
2. Missing the cognitive-cultural mechanism for why some ideas spread and others don't
3. Asparouhova's antimemetics adds the critical flip side: ideas that resist propagation

---

## Citation Sources

### A. Algorithmic Information Theory (Factor #2)

| Source | URL | Key Insight |
|--------|-----|-------------|
| Kolmogorov (1965), "Three approaches to the quantitative definition of information" | https://knowen-production.s3.amazonaws.com/uploads/attachment/file/3520/Three%2Bapproaches%2Bto%2Bthe%2Bquantitative%2Bdefinition%2Bof%2Binformation.pdf | Information as description length; compression formalized as finding shortest adequate description |

### B. Epidemiology of Representations (Factor #7)

| Source | URL | Key Insight |
|--------|-----|-------------|
| Sperber (1996), "Towards an Epidemiology of Representations" | https://cognitionandculture.net/wp-content/uploads/Towards-an-Epidemiology-of-Representations.pdf | Culture as differential spread and stabilization of mental/public representations; why some ideas propagate with fidelity and others mutate or die |

### C. Antimemetics (Factor #7)

| Source | URL | Key Insight |
|--------|-----|-------------|
| Asparouhova (2024), "Antimemetics" | https://www.generalist.com/p/antimemetics-nadia-asparouhova | Some ideas resist spreading due to structural properties: complexity, lack of emotional hooks, absence of natural advocates, or active suppression by competing memes |

### D. Relevance Theory (Factor #2)

| Source | URL | Key Insight |
|--------|-----|-------------|
| Sperber & Wilson, *Relevance: Communication and Cognition* | https://danielwharris.com/teaching/spring16/readings/SperberWilsonRelevance.pdf | Communication is ostensive-inferential: speakers provide evidence of intent, listeners infer meaning by maximizing relevance. Language is not a code to decode but a prompt for inference. |

---

## Proposed Revisions

### Factor #2: Revised

Center Wittgenstein as the backbone, add Kolmogorov for formal grounding, and Sperber & Wilson for the cognitive mechanism:

```markdown
### 2. Language Compresses and Carries Knowledge

Among all the vessels humanity has invented to carry knowledge across time and space, language remains the most versatile. It compresses vast experiential reality into transmissible symbols, enabling one mind to reconstruct the mental states of another. [Algorithmic information theory](https://knowen-production.s3.amazonaws.com/uploads/attachment/file/3520/Three%2Bapproaches%2Bto%2Bthe%2Bquantitative%2Bdefinition%2Bof%2Binformation.pdf) formalizes this: the information content of an object is the length of its shortest description. Wittgenstein traced the arc of this insight across his career: his [early work](https://people.umass.edu/klement/tlp/tlp.pdf) held that the limits of language are the limits of thought—what cannot be expressed cannot be known; his [later work](https://static1.squarespace.com/static/54889e73e4b0a2c1f9891289/t/564b61a4e4b04eca59c4d232/1447780772744/Ludwig.Wittgenstein.-.Philosophical.Investigations.pdf) revealed that meaning is not fixed but emerges from use—language is a form of life, a set of games whose rules are learned through practice. [Relevance theory](https://danielwharris.com/teaching/spring16/readings/SperberWilsonRelevance.pdf) extends this insight: communication is not decoding but inference—listeners reconstruct meaning by seeking the interpretation that yields maximum cognitive effect for minimum processing effort. This compression is lossy but remarkably efficient, allowing complex ideas to propagate across generations and continents with sufficient fidelity to build cumulative understanding.
```

**Changes:**
- Added Kolmogorov sentence after "reconstruct the mental states of another"
- Named Wittgenstein explicitly and framed his two works as an intellectual arc ("early work" → "later work")
- Added Sperber & Wilson's Relevance theory after Wittgenstein, extending the "meaning from use" insight to the cognitive mechanism of inference
- Unified flow: compression (Kolmogorov) → limits of expression (early Wittgenstein) → meaning from use (later Wittgenstein) → inference mechanism (Relevance theory) → propagation

---

### Factor #7: Revised

Add Sperber's epidemiology and Asparouhova's antimemetics to explain both successful and failed propagation:

```markdown
### 7. The Network Interface Routes Knowledge Through Context

Knowledge cannot traverse networks without context—the edges between cognitive actors are not neutral conduits but active shapers of meaning. Graph theory reveals that [what matters is the structure of connections](https://jlmartin.ku.edu/courses/math105-F11/Lectures/chapter5-part1.pdf), not the physical terrain. [Tie strength](https://snap.stanford.edu/class/cs224w-readings/granovetter73weakties.pdf) determines what information flows: weak ties bridge distant communities with novel ideas, strong ties reinforce local consensus. Ideas spread through networks as an [epidemiology of representations](https://cognitionandculture.net/wp-content/uploads/Towards-an-Epidemiology-of-Representations.pdf)—some propagate with high fidelity, others mutate or die out based on cognitive and social factors. Yet not all knowledge seeks transmission; [antimemetic ideas](https://www.generalist.com/p/antimemetics-nadia-asparouhova) resist spreading due to complexity, lack of emotional resonance, or absence of natural advocates. From oral myths passed across generations to cuneiform tablets to printed treatises to digital networks, each transmission medium shapes what knowledge survives and how it transforms. [The medium is the message](https://web.mit.edu/allanmc/www/mcluhan.mediummessage.pdf)—form and content are inseparable. [Framing effects](https://web.mit.edu/curhan/www/docs/Articles/15341_Readings/Behavioral_Decision_Theory/Kahneman_Tversky_1979_Prospect_theory.pdf) demonstrate the stakes: identical information presented as gain versus loss produces opposite decisions. Context is not optional metadata; it is the infrastructure through which knowledge acquires meaning.
```

**Changes:**
- Added Sperber's "epidemiology of representations" after the tie strength discussion
- Added Asparouhova's "antimemetic ideas" as the critical counterpoint

---

## Implementation Checklist

### Research Phase
- [ ] Verify Kolmogorov URL accessibility
- [ ] Verify Sperber "Epidemiology" URL accessibility
- [ ] Verify Asparouhova URL accessibility (nadia.xyz/antimemetics)
- [ ] Verify Sperber & Wilson URL accessibility

### Writing Phase
- [ ] Review proposed revisions with user
- [ ] Apply Factor #2 revision to README
- [ ] Apply Factor #7 revision to README
- [ ] Update saam.kim cross-post if desired

### Quality Check
- [ ] Ensure phrase-embedded link style consistency
- [ ] Verify conceptual coherence with surrounding factors
- [ ] Final verification of all links

---

## Design Decisions

### Placement Rationale

1. **Kolmogorov in #2**: Placed early (third sentence) because it provides the formal grounding for "compresses" before the philosophical discussion of Wittgenstein. Creates a bridge back to #1's information theory.

2. **Wittgenstein as backbone in #2**: Named explicitly and framed as an intellectual arc (early → later work). The Tractatus gives the limits of expression; Philosophical Investigations reveals meaning from use.

3. **Sperber & Wilson in #2**: Placed after Wittgenstein because Relevance theory extends the "meaning from use" insight—it provides the cognitive mechanism (inference, not decoding) that explains how language-games actually work in minds.

4. **Sperber (Epidemiology) in #7**: Placed after tie strength because it explains the *mechanism* of differential spread—why structure matters for what propagates.

5. **Asparouhova in #7**: Placed immediately after Sperber's epidemiology as the critical counterpoint. Sperber explains successful spread; Asparouhova explains resistance to spread.

### Flow of #2

The revised Factor #2 has a unified intellectual arc:
1. **Compression claim** (opening) → 2. **Formal grounding** (Kolmogorov) → 3. **Limits of expression** (early Wittgenstein) → 4. **Meaning from use** (later Wittgenstein) → 5. **Cognitive mechanism** (Relevance theory) → 6. **Propagation outcome** (closing)

### Alternative Approaches

**Option A (Primary - recommended):** Both factors revised as described above.

**Option B (Minimal):** Only Asparouhova in #7. This adds the most novel insight (antimemetics) with minimal disruption.

**Option C (Extended):** Add Chomsky (1956) to #2 as well, grounding grammar as compression. This would require more restructuring.

---

## Notes

The Sperber references now both land in the language/communication domain:
- **#2**: Sperber & Wilson's Relevance theory (how individual communication works via inference)
- **#7**: Sperber's epidemiology (how representations spread through populations)

This creates a micro → macro arc: individual inference (#2) enables population-level spread (#7).

Asparouhova's antimemetics is particularly valuable because the document currently has a "success bias"—it discusses how knowledge flows but not what prevents flow. This adds the critical negative case.
