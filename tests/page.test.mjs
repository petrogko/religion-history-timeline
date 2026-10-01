import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import vm from "node:vm";
import { assertOutsideRepo, buildFragment, buildStandalone } from "../scripts/build.mjs";
import { OUT, ROOT, inlineScript, loadData, readTemplate } from "../scripts/lib.mjs";
import { validate } from "../scripts/validate.mjs";

const template = readTemplate();
const data = loadData();
const fragment = buildFragment();

test("the data validates", () => {
  assert.deepEqual(validate(data), []);
});

test("all 44 religions are present with unique ids", () => {
  const ids = data.religions.map((d) => d.id);
  assert.equal(ids.length, 44);
  assert.equal(new Set(ids).size, ids.length);
});

test("the template and the built page scripts compile", () => {
  assert.doesNotThrow(() => new vm.Script(inlineScript(template)));
  assert.doesNotThrow(() => new vm.Script(inlineScript(fragment)));
});

test("index.html is built from the current template and data", () => {
  assert.equal(readFileSync(OUT, "utf8"), buildStandalone(fragment), "run: npm run build");
});

test("the template and the artifact build stay fragments", () => {
  for (const html of [template, fragment]) {
    assert.ok(html.trimStart().startsWith("<title>"), "the <title> comes first so the artifact host can find it");
    assert.ok(!/<!doctype|<html|<head>|<body/i.test(html), "the artifact host adds the document skeleton");
  }
});

test("external resources stay on hosts the artifact CSP allows", () => {
  const loads = [...template.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
  for (const url of loads) {
    assert.match(url, /^https:\/\/fonts\.(googleapis|gstatic)\.com(\/|$)/, `unexpected external load: ${url}`);
  }
});

test("every colour token is defined on the bare :root, and themes only redefine known tokens", () => {
  const css = template.slice(template.indexOf("<style>"), template.indexOf("</style>"));
  const rootBlock = css.slice(css.indexOf(":root {"), css.indexOf("}", css.indexOf(":root {")));
  const defined = new Set([...rootBlock.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  const used = new Set([...template.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]));
  for (const t of used) assert.ok(defined.has(t), `var(${t}) is used but not defined on :root`);
  const themed = [...css.matchAll(/:root(?::not\(\[data-theme="dark"\]\)|\[data-theme="light"\])\s*\{([^}]*)\}/g)];
  assert.equal(themed.length, 2, "day theme is defined for the media query and for the explicit toggle");
  for (const [, body] of themed) {
    for (const [, t] of body.matchAll(/(--[a-z0-9-]+)\s*:/g)) assert.ok(defined.has(t), `day theme sets unknown token ${t}`);
  }
  assert.equal(themed[0][1].replace(/\s+/g, " ").trim(), themed[1][1].replace(/\s+/g, " ").trim(), "both day-theme blocks match");
});

test("the public build carries no personal links", () => {
  assert.match(fragment, /var NOTES = null;/);
  assert.ok(!/obsidian:\/\/(?!open\?vault=" \+)/.test(fragment), "no hard-coded obsidian:// links");
});

test("private builds refuse to write inside the repo", () => {
  assert.throws(() => assertOutsideRepo(join(ROOT, "index.html")), /inside the repo/);
  assert.throws(() => assertOutsideRepo(join(ROOT, "dist", "x.html")), /inside the repo/);
  assert.doesNotThrow(() => assertOutsideRepo(join(ROOT, "..", "elsewhere.html")));
  const priv = buildFragment({ notes: { vault: "V", files: { christianity: "n/Christianity" } } });
  assert.match(priv, /var NOTES = \{"vault":"V"/);
});

test("validation catches broken lineage, cycles and bad key moments", () => {
  const broken = structuredClone(data);
  broken.religions.find((d) => d.id === "christianity").parents.push(["nonexistent", "grew"]);
  assert.ok(validate(broken).some((e) => e.includes('parent "nonexistent" does not exist')));

  const cyclic = structuredClone(data);
  cyclic.religions.find((d) => d.id === "judaism").parents.push(["christianity", "drew"]);
  assert.ok(validate(cyclic).some((e) => e.startsWith("lineage cycle")));

  const unordered = structuredClone(data);
  unordered.religions.find((d) => d.id === "islam").milestones.reverse();
  assert.ok(validate(unordered).some((e) => e.includes("time order")));
});
