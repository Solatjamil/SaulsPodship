/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * retarget-rsv-links.mjs — rewrite BibleGateway passage links inside the
 * volume data (both .ts modules and the JSON mirror) so they deep-link to
 * bible.com in the RSV family — RSV (id 2020) for the canon, NRSV-CI
 * (id 2015) for the deuterocanon/Apocrypha section of the Pakistan Bible
 * Society "Common Bible". Links we cannot confidently parse are left alone.
 *
 * Run: node scripts/retarget-rsv-links.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const VOL_DIR = path.join(REPO, "src/data/volumes");

const { bibleComUrl } = await import(path.join(REPO, "src/lib/bibleRef.ts"));

// --- mirror bibleRef parsing in plain data structures for rewrite decisions ---
const BG_LINK_RE = /\[([^\]\n]{1,140})\]\((https:\/\/www\.biblegateway\.com\/passage\/\?search=([^)\s"&]+)(?:&(?:amp;)?version=([A-Za-z]+))?)\)/g;

let changed = 0;

const rewriteString = (s) => {
  if (!s.includes("biblegateway.com/passage")) return s;
  return s.replace(BG_LINK_RE, (whole, label, url, searchParam, version) => {
    // ONLY retarget NIV / NRSVCE links; leave special editions (Vulgate etc.) untouched
    const v = String(version || "NIV");
    if (!/^(NIV|NRSVCE)$/i.test(v)) return whole;
    const ref = decodeURIComponent(String(searchParam).replace(/&amp;/g, "&")).replace(/\+/g, " ");
    const isApocryphaVersion = /^NRSVCE$/i.test(v);
    const target = bibleComUrl(ref, isApocryphaVersion ? "NRSV-CI-AP" : "RSV");
    if (!target) return whole; // unparsable → keep original gateway link
    changed++;
    return `[${label}](${target})`;
  });
};

const walk = (node) => {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      if (typeof node[i] === "string") {
        const c = rewriteString(node[i]);
        if (c !== node[i]) node[i] = c;
      } else walk(node[i]);
    }
  } else if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      const v = node[k];
      if (typeof v === "string") {
        const c = rewriteString(v);
        if (c !== v) node[k] = c;
      } else walk(v);
    }
  }
};

for (const f of fs.readdirSync(VOL_DIR).sort()) {
  if (!/^volume_\d+\.ts$/.test(f)) continue;
  const p = path.join(VOL_DIR, f);
  const src = fs.readFileSync(p, "utf8");
  if (!src.includes("biblegateway.com/passage")) continue;
  const m = src.match(/^export const (volume_\d+): Volume = \{/m);
  const endMark = src.lastIndexOf("\n};");
  if (!m || endMark === -1) { console.warn("skip (shape):", f); continue; }
  const braceIdx = m.index + m[0].length - 1;
  const body = src.slice(braceIdx, endMark + 2);
  let obj;
  try { obj = JSON.parse(body); } catch { console.warn("skip (unparsable):", f); continue; }
  walk(obj);
  fs.writeFileSync(p, src.slice(0, braceIdx) + JSON.stringify(obj, null, 2) + src.slice(endMark + 2), "utf8");
}

const mirrorPath = path.join(VOL_DIR, "volumesData.json");
const data = JSON.parse(fs.readFileSync(mirrorPath, "utf8"));
walk(data);
fs.writeFileSync(mirrorPath, JSON.stringify(data, null, 2), "utf8");

console.log(`retarget-rsv-links: ${changed} links rewritten to bible.com RSV / NRSV-CI`);
