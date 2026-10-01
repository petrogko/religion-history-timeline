// Check data/religions.json for structural mistakes.
//
//   node scripts/validate.mjs
//
// Exit code 1 when anything is wrong. See AI/DATA-MODEL.md for the field rules.
import { pathToFileURL } from "node:url";
import { loadData } from "./lib.mjs";

const REQUIRED = ["id", "label", "name", "fam", "ds", "date", "how", "size", "status",
  "story", "beliefs", "texts", "followers", "wiki", "origin", "founders"];
const HOW = ["founded", "grew"];
const SIZE = ["xl", "l", "m", "s", "none"];
const STATUS = ["Living", "Historical", "Revived"];
const KINDS = ["grew", "drew", "kin"];
const PRE_SLOTS = 5;
const MOMENTS = [2, 6];
const MOMENT_LABEL_MAX = 80;
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;
const isHttps = (u) => typeof u === "string" && /^https:\/\/[^\s]+$/.test(u);

export function validate(data) {
  const { families, religions, world, Y0, Y1, NOW } = data;
  const errors = [];
  const err = (id, msg) => errors.push(`${id}: ${msg}`);
  const famIds = new Set((families || []).map((f) => f.id));
  const byId = new Map();

  for (const f of families || []) {
    if (!nonEmpty(f.id) || !nonEmpty(f.name)) errors.push("families: every family needs an id and a name");
  }

  for (const d of religions) {
    const id = d.id || "(missing id)";
    if (byId.has(d.id)) err(id, "duplicate id");
    byId.set(d.id, d);
    if (!/^[a-z][a-z0-9]*$/.test(d.id || "")) err(id, "id must be lowercase letters and digits");
    for (const k of REQUIRED) if (!nonEmpty(d[k])) err(id, `missing or empty "${k}"`);
    if (typeof d.branches !== "string") err(id, '"branches" must be a string (empty when there are none)');
    if (!famIds.has(d.fam)) err(id, `unknown family "${d.fam}"`);
    if (!HOW.includes(d.how)) err(id, `how must be one of ${HOW.join(", ")}`);
    if (!SIZE.includes(d.size)) err(id, `size must be one of ${SIZE.join(", ")}`);
    if (!STATUS.includes(d.status)) err(id, `status must be one of ${STATUS.join(", ")}`);
    if ((d.size === "none") !== (d.status === "Historical")) err(id, 'size "none" is used exactly for Historical religions');
    if (d.followersSource != null && !nonEmpty(d.followersSource)) err(id, "followersSource, when present, must be text");

    const hasPre = d.pre != null, hasY = d.y != null;
    if (hasPre === hasY) err(id, "set exactly one of `pre` (undated slot) or `y` (year)");
    if (hasPre && !(Number.isInteger(d.pre) && d.pre >= 0 && d.pre < PRE_SLOTS)) err(id, `pre must be an integer 0–${PRE_SLOTS - 1}`);
    if (hasY && !(typeof d.y === "number" && d.y >= Y0 && d.y <= NOW)) err(id, `y must be a year between ${Y0} and ${NOW}`);

    if ((d.end != null) !== nonEmpty(d.endLabel)) err(id, "end and endLabel go together");
    if (d.end != null) {
      if (!hasY) err(id, "end needs a dated start (y)");
      else if (!(d.end > d.y && d.end <= NOW)) err(id, `end must be after y and no later than ${NOW}`);
      if (d.status !== "Historical") err(id, "only Historical religions have an end");
    }
    if ((d.range != null) !== nonEmpty(d.rangeLabel)) err(id, "range and rangeLabel go together");
    if (d.range != null) {
      const [a, b] = d.range;
      if (!(Array.isArray(d.range) && d.range.length === 2 && a <= b && a >= Y0 && b <= Y1)) err(id, "range must be [from, to] inside the time axis");
      else if (hasY && !(d.y >= a && d.y <= b)) err(id, "y must fall inside range");
    }
    if (/^https?:|\s/.test(d.wiki || "")) err(id, "wiki is an article slug (no scheme, no spaces)");

    if (!Array.isArray(d.eras) || !d.eras.length || !d.eras.every(nonEmpty)) err(id, "eras must be a non-empty list of era names");
    const ms = d.milestones;
    if (!Array.isArray(ms) || ms.length < MOMENTS[0] || ms.length > MOMENTS[1]) {
      err(id, `milestones must list ${MOMENTS[0]}–${MOMENTS[1]} key moments`);
    } else {
      ms.forEach((m, i) => {
        const [y, label, approx] = Array.isArray(m) ? m : [];
        if (!Number.isInteger(y) || y < Y0 || y > NOW) err(id, `milestone ${i + 1}: year must be an integer from ${Y0} to ${NOW}`);
        if (!nonEmpty(label) || label.length > MOMENT_LABEL_MAX) err(id, `milestone ${i + 1}: label must be 1–${MOMENT_LABEL_MAX} characters`);
        if (typeof approx !== "boolean") err(id, `milestone ${i + 1}: third value (approximate?) must be true or false`);
        if (i > 0 && Number.isInteger(y) && y < ms[i - 1][0]) err(id, "milestones must be in time order");
      });
    }
    if (!Array.isArray(d.sources) || !d.sources.length) err(id, "sources must list at least one [title, url]");
    else d.sources.forEach((s, i) => { if (!Array.isArray(s) || !nonEmpty(s[0]) || !isHttps(s[1])) err(id, `source ${i + 1} must be [title, https url]`); });
  }

  const slots = religions.filter((d) => d.pre != null).map((d) => d.pre);
  if (new Set(slots).size !== slots.length) errors.push("pre: two religions share an undated slot");

  // lineage: parents exist, sensible kinds, parent not later than child, no cycles
  const start = (d) => (d.pre != null ? -Infinity : d.y);
  for (const d of religions) {
    const seen = new Set();
    for (const p of d.parents || []) {
      const [pid, kind] = Array.isArray(p) ? p : [];
      if (!byId.has(pid)) { err(d.id, `parent "${pid}" does not exist`); continue; }
      if (pid === d.id) err(d.id, "cannot be its own parent");
      if (seen.has(pid)) err(d.id, `parent "${pid}" listed twice`);
      seen.add(pid);
      if (!KINDS.includes(kind)) err(d.id, `parent kind must be one of ${KINDS.join(", ")}`);
      if (start(byId.get(pid)) > start(d)) err(d.id, `parent "${pid}" starts later than the child`);
    }
  }
  const state = new Map();
  const visit = (id, path) => {
    if (state.get(id) === "done") return;
    if (state.get(id) === "open") { errors.push(`lineage cycle: ${[...path, id].join(" → ")}`); return; }
    state.set(id, "open");
    for (const [pid] of byId.get(id)?.parents || []) if (byId.has(pid)) visit(pid, [...path, id]);
    state.set(id, "done");
  };
  for (const d of religions) visit(d.id, []);

  for (const f of families || []) {
    if (!religions.some((d) => d.fam === f.id)) errors.push(`family "${f.name}" has no religions`);
  }

  // the world today
  if (!world || !Array.isArray(world.groups) || !world.groups.length) errors.push("world: groups are missing");
  else {
    const total = world.groups.reduce((s, g) => s + g.share, 0);
    if (Math.abs(total - 100) > 0.5) errors.push(`world: shares add up to ${total.toFixed(1)}%, not 100%`);
    for (const g of world.groups) {
      if (!nonEmpty(g.name) || typeof g.share !== "number" || !nonEmpty(g.people)) errors.push(`world: "${g.name}" needs a name, a share and a people count`);
      if (g.id != null && !byId.has(g.id)) errors.push(`world: "${g.name}" links to unknown religion "${g.id}"`);
    }
    if (!world.source || !nonEmpty(world.source.title) || !isHttps(world.source.url)) errors.push("world: source needs a title and an https url");
  }
  return errors;
}

function main() {
  const data = loadData();
  const errors = validate(data);
  if (errors.length) {
    console.error(`${errors.length} problem(s):`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  const r = data.religions;
  const count = (f) => r.reduce((s, d) => s + f(d), 0);
  console.log(`OK: ${r.length} religions, ${data.families.length} families, ${count((d) => d.parents.length)} lineage links, ` +
    `${count((d) => d.milestones.length)} key moments, ${count((d) => d.sources.length)} sources.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
