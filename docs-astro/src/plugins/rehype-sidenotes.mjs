// ABOUTME: Rehype plugin converting GFM footnotes into Tufte-style sidenotes: each reference
// ABOUTME: becomes a numbered toggle label plus an inline note span; the footnote section is removed.
import { visit } from "unist-util-visit";

function isBackref(node) {
  return (
    node.type === "element" &&
    node.tagName === "a" &&
    node.properties &&
    node.properties.dataFootnoteBackref !== undefined
  );
}

function flattenDefinition(children) {
  const inline = [];
  for (const child of children) {
    if (child.type === "element" && child.tagName === "p") {
      if (inline.length > 0) inline.push({ type: "text", value: " " });
      inline.push(...child.children.filter((n) => !isBackref(n)));
    } else if (!isBackref(child) && !(child.type === "text" && child.value.trim() === "")) {
      inline.push(child);
    }
  }
  while (inline.length > 0) {
    const last = inline[inline.length - 1];
    if (last.type === "text" && last.value.trim() === "") inline.pop();
    else break;
  }
  return inline;
}

export default function rehypeSidenotes() {
  return (tree) => {
    const definitions = new Map();

    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "section" && node.properties?.dataFootnotes !== undefined) {
        visit(node, "element", (li) => {
          if (li.tagName === "li" && typeof li.properties?.id === "string") {
            definitions.set(li.properties.id, flattenDefinition(li.children));
          }
        });
        parent.children.splice(index, 1);
        return index;
      }
    });

    if (definitions.size === 0) return;

    const refs = [];
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "sup" || !parent) return;
      const anchor = node.children.find(
        (child) =>
          child.type === "element" &&
          child.tagName === "a" &&
          child.properties?.dataFootnoteRef !== undefined,
      );
      if (!anchor) return;
      const target = String(anchor.properties.href ?? "").replace(/^#/, "");
      if (!definitions.has(target)) return;
      refs.push({ parent, node, target });
    });

    refs.forEach(({ parent, node, target }, i) => {
      const n = i + 1;
      const replacement = [
        {
          type: "element",
          tagName: "label",
          properties: { className: ["sn-num"], htmlFor: `sn-${n}` },
          children: [{ type: "text", value: String(n) }],
        },
        {
          type: "element",
          tagName: "input",
          properties: { type: "checkbox", id: `sn-${n}`, className: ["sn-toggle"] },
          children: [],
        },
        {
          type: "element",
          tagName: "span",
          properties: { className: ["sidenote"] },
          children: definitions.get(target),
        },
      ];
      const at = parent.children.indexOf(node);
      parent.children.splice(at, 1, ...replacement);
    });
  };
}
