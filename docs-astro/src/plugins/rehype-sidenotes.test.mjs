// ABOUTME: Tests for the rehype-sidenotes plugin that converts GFM footnotes into Tufte-style
// ABOUTME: margin notes: numbered label + checkbox toggle + inline sidenote span, footnote section removed.
import { describe, it, expect } from "vitest";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSidenotes from "./rehype-sidenotes.mjs";

async function render(md) {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSidenotes)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(md);
  return String(file);
}

const DOC = [
  "Information is measured in bits.[^1] More prose here.",
  "",
  "[^1]: **Shannon (1948)**, scoped to engineering.",
].join("\n");

describe("rehype-sidenotes", () => {
  it("replaces the footnote reference with a numbered toggle label", async () => {
    const html = await render(DOC);
    expect(html).toContain('<label class="sn-num" for="sn-1">1</label>');
    expect(html).toContain('<input type="checkbox" id="sn-1" class="sn-toggle"');
  });

  it("inlines the footnote body as a sidenote span next to the reference", async () => {
    const html = await render(DOC);
    const refIndex = html.indexOf('for="sn-1"');
    const noteIndex = html.indexOf('<span class="sidenote">');
    expect(noteIndex).toBeGreaterThan(refIndex);
    expect(noteIndex).toBeLessThan(html.indexOf("More prose here."));
    expect(html).toContain("Shannon (1948)");
  });

  it("flattens paragraph wrappers and drops the backreference link", async () => {
    const html = await render(DOC);
    const note = html.slice(html.indexOf('<span class="sidenote">'));
    expect(note).not.toContain("<p>");
    expect(note).not.toContain("data-footnote-backref");
  });

  it("removes the trailing footnotes section", async () => {
    const html = await render(DOC);
    expect(html).not.toContain("footnote-label");
    expect(html).not.toContain('<section');
  });

  it("numbers multiple sidenotes sequentially", async () => {
    const md = [
      "First.[^a] Second.[^b]",
      "",
      "[^a]: Note a.",
      "[^b]: Note b.",
    ].join("\n");
    const html = await render(md);
    expect(html).toContain('for="sn-1"');
    expect(html).toContain('for="sn-2"');
    expect(html.indexOf("Note a.")).toBeLessThan(html.indexOf("Note b."));
  });

  it("leaves documents without footnotes untouched", async () => {
    const html = await render("Plain paragraph.");
    expect(html).toBe("<p>Plain paragraph.</p>");
  });
});
