// ABOUTME: Remark plugin mapping factor-page container directives (:::brief, :::related,
// ABOUTME: :::canonical, :::references) to the template's HTML structure.
import { visit } from "unist-util-visit";

const ARROW_SVG =
  '<svg class="r-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

function escapeHtml(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function collectText(node) {
  if (node.type === "text") return node.value;
  if (Array.isArray(node.children)) return node.children.map(collectText).join("");
  return "";
}

function wrapContainer(node, className, labelHtml) {
  node.data = node.data ?? {};
  node.data.hName = "div";
  node.data.hProperties = { className: [className] };
  node.children.unshift({ type: "html", value: labelHtml });
}

function relatedCard(listItem) {
  let link = null;
  visit(listItem, "link", (found) => {
    if (!link) link = found;
  });
  if (!link) return "";
  const title = collectText(link);
  const trailing = collectText(listItem).slice(title.length);
  const why = trailing.replace(/^[\s—–-]+/, "").trim();
  const whyHtml = why
    ? `<br/><span class="r-why">${escapeHtml(why)}</span>`
    : "";
  return (
    `<a href="${link.url}"><span><span class="r-title">${escapeHtml(title)}</span>${whyHtml}</span>${ARROW_SVG}</a>`
  );
}

export default function remarkBlocks() {
  return (tree) => {
    visit(tree, "containerDirective", (node, index, parent) => {
      if (node.name === "brief") {
        wrapContainer(node, "inbrief", '<span class="label">In brief</span>');
      } else if (node.name === "canonical") {
        wrapContainer(node, "canonical", '<span class="label">The factor, in full</span>');
      } else if (node.name === "references") {
        wrapContainer(node, "refs", "<h2>References</h2>");
      } else if (node.name === "related") {
        const cards = [];
        visit(node, "listItem", (item) => {
          cards.push(relatedCard(item));
        });
        parent.children[index] = {
          type: "html",
          value: `<div class="related"><h2 class="label">Related factors</h2>${cards.join("")}</div>`,
        };
      }
    });
  };
}
