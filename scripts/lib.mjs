// Shared helpers: project paths, loading the data, reading the template.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const TEMPLATE = join(ROOT, "src", "template.html");
export const DATA_FILE = join(ROOT, "data", "religions.json");
export const OUT = join(ROOT, "index.html");
export const FRAGMENT = join(ROOT, "dist", "religions-through-time.html");

export const DATA_MARKER = "/*@DATA@*/null";
export const NOTES_MARKER = "/*@NOTES@*/null";

export function readTemplate() {
  return readFileSync(TEMPLATE, "utf8");
}

export function readData() {
  return JSON.parse(readFileSync(DATA_FILE, "utf8"));
}

// The time-axis constants live in the page script; the validator needs the same values.
export function timeConstants(template = readTemplate()) {
  const m = template.match(/var Y0 = (-?\d+), Y1 = (-?\d+), NOW = (-?\d+);/);
  if (!m) throw new Error("time constants (Y0, Y1, NOW) not found in the template");
  return { Y0: Number(m[1]), Y1: Number(m[2]), NOW: Number(m[3]) };
}

export function loadData() {
  return { ...readData(), ...timeConstants() };
}

export function inlineScript(html) {
  const a = html.indexOf("<script>");
  const b = html.lastIndexOf("</script>");
  if (a < 0 || b < 0) throw new Error("inline <script> not found");
  return html.slice(a + "<script>".length, b);
}
