// Check that every external link the page shows answers HTTP 200 (needs network).
//
//   node scripts/check-links.mjs
import { pathToFileURL } from "node:url";
import { readData, readTemplate } from "./lib.mjs";

const WIKI = "https://en.wikipedia.org/wiki/";
const UA = "religion-history-timeline link check";

export function collectUrls(data = readData(), template = readTemplate()) {
  const urls = new Set();
  for (const d of data.religions) {
    urls.add(WIKI + d.wiki);
    for (const [, url] of d.sources || []) urls.add(url);
  }
  if (data.world?.source?.url) urls.add(data.world.source.url);
  for (const m of template.matchAll(/href="(https:\/\/[^"]+)"/g)) {
    if (!m[1].startsWith("https://fonts.")) urls.add(m[1]);
  }
  return [...urls].sort();
}

async function status(url) {
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow", headers: { "User-Agent": UA } });
    return res.status;
  } catch (e) {
    return `error: ${e.cause?.code || e.message}`;
  }
}

async function main() {
  const urls = collectUrls();
  const results = [];
  const queue = [...urls];
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      results.push([await status(url), url]);
    }
  }));
  const bad = results.filter(([s]) => s !== 200);
  for (const [s, u] of bad) console.error(`  ${s}  ${u}`);
  console.log(`${urls.length - bad.length}/${urls.length} links OK.`);
  if (bad.length) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
