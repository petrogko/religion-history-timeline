// Build the page: inline data/religions.json into src/template.html.
//
//   node scripts/build.mjs            write dist/religions-through-time.html (artifact fragment) and index.html
//   node scripts/build.mjs --check    exit 1 if index.html is out of date
//
// Private build with links to a local Obsidian vault (written outside the repo only):
//   node scripts/build.mjs --notes <notes.json> --fragment-out <file> --page-out <file>
//   notes.json: { "vault": "<vault name>", "files": { "<religion id>": "<path of the note in the vault>" } }
//
// The claude.ai artifact host wraps a fragment in its own <!doctype>/<head>/<body> skeleton and adds a
// small reset. The standalone page does the same, for GitHub Pages and for opening the file from disk.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { DATA_MARKER, FRAGMENT, NOTES_MARKER, OUT, ROOT, readData, readTemplate } from "./lib.mjs";

// Mirrors the parts of the artifact skeleton the page relies on: zero body margin,
// and [hidden] beating component display rules (e.g. the flex caption bar).
const RESET = "body{margin:0}img{max-width:100%}[hidden]{display:none!important}";
const DESCRIPTION = "Interactive star-chart timeline of world religions: when each came out, whether a founder started it or it grew from tradition, its key moments, and which faiths grew out of which.";

// JSON that is safe inside an inline <script>.
export function jsonForScript(value) {
  const LS = String.fromCharCode(0x2028), PS = String.fromCharCode(0x2029);
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .split(LS).join("\\u2028")
    .split(PS).join("\\u2029");
}

export function buildFragment({ template = readTemplate(), data = readData(), notes = null } = {}) {
  for (const marker of [DATA_MARKER, NOTES_MARKER]) {
    if (template.split(marker).length !== 2) throw new Error(`the template must contain ${marker} exactly once`);
  }
  return template
    .replace(DATA_MARKER, () => jsonForScript(data))
    .replace(NOTES_MARKER, () => (notes ? jsonForScript(notes) : "null"));
}

export function buildStandalone(fragment = buildFragment()) {
  const cut = fragment.indexOf("</style>");
  if (cut < 0) throw new Error("expected the page's <style> block");
  const head = fragment.slice(0, cut + "</style>".length).trim();
  const body = fragment.slice(cut + "</style>".length).trim();
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
    `<meta name="description" content="${DESCRIPTION}">`,
    `<style>${RESET}</style>`,
    head,
    "</head>",
    "<body>",
    body,
    "</body>",
    "</html>",
    ""
  ].join("\n");
}

// Private builds carry personal links, so they may never land inside the (public) repo.
export function assertOutsideRepo(path) {
  const abs = resolve(path);
  if (abs === ROOT || abs.startsWith(ROOT + sep)) {
    throw new Error(`refusing to write a private build inside the repo: ${relative(ROOT, abs)}`);
  }
  return abs;
}

function write(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  console.log(`Wrote ${relative(ROOT, path).startsWith("..") ? path : relative(ROOT, path)} (${text.length.toLocaleString()} bytes).`);
}

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
}

function main() {
  const notesFile = arg("--notes");
  if (notesFile) {
    const notes = JSON.parse(readFileSync(notesFile, "utf8"));
    const fragOut = arg("--fragment-out"), pageOut = arg("--page-out");
    if (!fragOut && !pageOut) throw new Error("a --notes build needs --fragment-out and/or --page-out (outside the repo)");
    const fragment = buildFragment({ notes });
    if (fragOut) write(assertOutsideRepo(fragOut), fragment);
    if (pageOut) write(assertOutsideRepo(pageOut), buildStandalone(fragment));
    return;
  }
  const fragment = buildFragment();
  const page = buildStandalone(fragment);
  if (process.argv.includes("--check")) {
    const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
    if (current !== page) {
      console.error("index.html is out of date. Run: npm run build");
      process.exit(1);
    }
    console.log("index.html is up to date.");
    return;
  }
  write(FRAGMENT, fragment);
  write(OUT, page);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
