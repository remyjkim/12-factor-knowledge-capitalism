// ABOUTME: Tests for the remark-blocks plugin that maps :::brief/:::related/:::canonical/:::references
// ABOUTME: container directives to the factor-page template's HTML structure.
import { describe, it, expect } from "vitest";
import { remark } from "remark";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkBlocks from "./remark-blocks.mjs";

async function render(md) {
  const file = await remark()
    .use(remarkDirective)
    .use(remarkBlocks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

describe("remark-blocks", () => {
  it("wraps :::brief content in the inbrief container with its label", async () => {
    const html = await render(":::brief\n- one\n- two\n:::");
    expect(html).toContain('<div class="inbrief">');
    expect(html).toContain('<span class="label">In brief</span>');
    expect(html).toContain("<li>one</li>");
    expect(html).toContain("<li>two</li>");
  });

  it("renders :::related list items as card links with title and reason", async () => {
    const md = [
      ":::related",
      "- [Factor 2 — Language Compresses and Carries Knowledge](/blog/02-language-compresses-knowledge) — How order survives transmission",
      ":::",
    ].join("\n");
    const html = await render(md);
    expect(html).toContain('<div class="related">');
    expect(html).toContain('<h2 class="label">Related factors</h2>');
    expect(html).toContain('href="/blog/02-language-compresses-knowledge"');
    expect(html).toContain('<span class="r-title">Factor 2 — Language Compresses and Carries Knowledge</span>');
    expect(html).toContain('<span class="r-why">How order survives transmission</span>');
  });

  it("wraps :::canonical prose in the canonical container with its label", async () => {
    const html = await render(":::canonical\nKnowledge is not mere information.\n:::");
    expect(html).toContain('<div class="canonical">');
    expect(html).toContain('<span class="label">The factor, in full</span>');
    expect(html).toContain("Knowledge is not mere information.");
  });

  it("wraps :::references list in the refs container with heading", async () => {
    const html = await render(":::references\n1. Shannon, C. E. 1948.\n:::");
    expect(html).toContain('<div class="refs">');
    expect(html).toContain("<h2>References</h2>");
    expect(html).toContain("Shannon, C. E. 1948.");
  });

  it("leaves markdown without directives untouched", async () => {
    const html = await render("Just a **paragraph** with a [link](https://example.com).");
    expect(html).toBe('<p>Just a <strong>paragraph</strong> with a <a href="https://example.com">link</a>.</p>');
  });

  it("ignores unknown directive names", async () => {
    const html = await render(":::mystery\ncontent\n:::");
    expect(html).toContain("content");
    expect(html).not.toContain("inbrief");
  });
});
