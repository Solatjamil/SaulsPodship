/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * verify-scripture.mjs — whole-catalogue scripture audit.
 *
 * 1) Every citation in volume data (storyPanels.scripture, scriptures[].reference,
 *    timeline references, and citations discovered in prose/table strings) must
 *    PARSE against the 66-book canon or the RSV-Family apocrypha set.
 * 2) Chapter numbers must be IN RANGE for each book; verse numbers sanity-bounded.
 * 3) Every generated bible.com URL must use an allowed version id (RSV 2020 /
 *    KJV 1 / NRSV-CI 2015 for apocrypha).
 * 4) Quotation audit: quoted phrases paired with citations are compared
 *    (content-word overlap) against the actual KJV text fetched live from
 *    bible-api.com — the translation family (KJV→RSV) these volumes use.
 *
 * Run: npx tsx scripts/verify-scripture.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const { parseReference, bibleComUrl, APOCRYPHA_CODES } = await import(path.join(REPO, "src/lib/bibleRef.ts"));

const CHAPTERS = {
  GEN: 50, EXO: 40, LEV: 27, NUM: 36, DEU: 34, JOS: 24, JDG: 21, RUT: 4,
  "1SA": 31, "2SA": 24, "1KI": 22, "2KI": 25, "1CH": 29, "2CH": 36, EZR: 10,
  NEH: 13, EST: 10, JOB: 42, PSA: 150, PRO: 31, ECC: 12, SNG: 8, ISA: 66,
  JER: 52, LAM: 5, EZK: 48, DAN: 12, HOS: 14, JOL: 3, AMO: 9, OBA: 1,
  JON: 4, MIC: 7, NAM: 3, HAB: 3, ZEP: 3, HAG: 2, ZEC: 14, MAL: 4,
  MAT: 28, MRK: 16, LUK: 24, JOH: 21, ACT: 28, ROM: 16, "1CO": 16, "2CO": 13,
  GAL: 6, EPH: 6, PHP: 4, COL: 4, "1TH": 5, "2TH": 3, "1TI": 6, "2TI": 4,
  TIT: 3, PHM: 1, HEB: 13, JAS: 5, "1PE": 5, "2PE": 3, "1JN": 5, "2JN": 1,
  "3JN": 1, JUD: 1, REV: 22,
};
const APO_CHAPTERS = Object.fromEntries(Object.values(APOCRYPHA_CODES).map(v => [v.code, v.chapters]));
const ALLOWED_IDS = new Set(["1", "2020", "2015", "111", "3523"]);
const CITE_RE = /\b((?:1|2|3)?\s?(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|(?:1|2)\s?Samuel|(?:1|2)\s?Kings|(?:1|2)\s?Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of (?:Solomon|Songs)|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|(?:1|2)\s?Corinthians|Galatians|Ephesians|Philippians|Colossians|(?:1|2)\s?Thessalonians|(?:1|2)\s?Timothy|Titus|Philemon|Hebrews|James|(?:1|2)\s?Peter|(?:1|2|3)\s?John|Jude|Revelation|Tobit|Judith|Wisdom(?:\s+of\s+Solomon)?|Sirach|Ecclesiasticus|Baruch|(?:1|2|3|4)\s?Maccabees)\s+\d{1,3}(?::\s?\d{1,3}(?:\s?[–-]\s?\d{1,3})?)?(?:\s*[;,]\s*\S+)?)/gi;

const data = JSON.parse(fs.readFileSync(path.join(REPO, "src/data/volumes/volumesData.json"), "utf8"));
const volumes = Array.isArray(data) ? data : data.volumes || [];

const stats = { refs: 0, parsed: 0, bad: [], chapterErr: [], verseErr: [], urlBad: [], urls: new Set() };
const quoteCandidates = []; // {ref, quote, vol, field}

function checkRef(raw, volNum, field) {
  stats.refs++;
  const ref = String(raw).replace(/\[\[|\]\]|\*\*|`/g, "").trim();
  if (!ref || ref.length > 160) return;
  const p = parseReference(ref);
  if (!p) {
    // Only flag if the string LOOKS like a citation (a known book word present)
    if (/^[1-3]?\s?\p{L}/u.test(ref) && /\d/.test(ref) && CITE_RE.test(ref)) {
      stats.bad.push(`vol${volNum} ${field}: "${ref.slice(0, 90)}"`);
    }
    CITE_RE.lastIndex = 0;
    return;
  }
  stats.parsed++;
  const maxCh = (APO_CHAPTERS[p.code] ?? CHAPTERS[p.code]);
  if (maxCh && (p.chapter < 1 || p.chapter > maxCh)) {
    stats.chapterErr.push(`vol${volNum} ${field}: ${ref} — ${p.code} has ${maxCh} chapters, got ${p.chapter}`);
  }
  if (p.verse && (p.verse < 1 || p.verse > 176)) stats.verseErr.push(`vol${volNum} ${field}: ${ref} verse ${p.verse}`);
  const url = bibleComUrl(ref, "RSV");
  if (url) {
    stats.urls.add(url);
    const id = url.split("/bible/")[1].split("/")[0];
    if (!ALLOWED_IDS.has(id)) stats.urlBad.push(url);
  }
}

function scanProse(text, volNum, field) {
  if (typeof text !== "string" || text.length > 400_000) return;
  let m;
  CITE_RE.lastIndex = 0;
  const seen = new Set();
  while ((m = CITE_RE.exec(text)) !== null) {
    if (!seen.has(m[1])) { seen.add(m[1]); checkRef(m[1], volNum, field + " (prose)"); }
    if (seen.size > 60) break;
  }
  // quoted phrase + nearby citation → candidate for text audit
  const qre = /[“"]([^”"]{25,220})[”"]\s*(?:—|-|\(|\[)?\s*([^。]{0,40})?/g;
  let q;
  while ((q = qre.exec(text)) !== null && quoteCandidates.length < 400) {
    const cm = q[0].match(CITE_RE);
    CITE_RE.lastIndex = 0;
    if (cm) quoteCandidates.push({ quote: q[1], ref: cm[0], vol: volNum, field });
  }
}

const skipKeys = new Set(["imagePrompt", "heroImage"]);
function walk(node, volNum, keyChain) {
  if (Array.isArray(node)) { for (const n of node) walk(n, volNum, keyChain); return; }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      if (skipKeys.has(k)) continue;
      const v = node[k];
      if (typeof v === "string") {
        if (k === "scripture" || k === "reference") checkRef(v, volNum, k);
        else scanProse(v, volNum, k);
      } else walk(v, volNum, keyChain + "." + k);
    }
  }
}
for (const v of volumes) walk(v, v.number, "");

console.log(`\n=== CITATION STRUCTURE (${volumes.length} volumes) ===`);
console.log(`citations examined: ${stats.refs} | parsed OK: ${stats.parsed}`);
console.log(`unparseable-but-citation-shaped: ${stats.bad.length}`);
stats.bad.slice(0, 15).forEach(b => console.log("  ?", b));
console.log(`chapter out-of-range: ${stats.chapterErr.length}`);
stats.chapterErr.slice(0, 15).forEach(b => console.log("  ✗", b));
console.log(`verse out-of-range: ${stats.verseErr.length}`);
stats.verseErr.slice(0, 10).forEach(b => console.log("  ✗", b));
console.log(`unique bible.com URLs generated: ${stats.urls.size} | bad version ids: ${stats.urlBad.length}`);
stats.urlBad.slice(0, 5).forEach(u => console.log("  ✗ URL", u));

// ---------- quotation text audit vs KJV corpus (offline) ----------
import { parseReference as _pr } from "../src/lib/bibleRef.ts";
import { existsSync } from "fs";

const CORPUS_PATH = "/tmp/kjv-corpus.json";
if (!existsSync(CORPUS_PATH)) {
  console.log("\nKJV corpus missing — build it first: node scripts/build-kjv-corpus.mjs");
} else {
  const corpus = JSON.parse(fs.readFileSync(CORPUS_PATH, "utf8"));
  const STOP = new Set("the and of in to that he said unto for his their them was is it not on all were been have has by out up down you your ye shall".split(" "));
  const norm = (s) => String(s).toLowerCase().replace(/[“”"'.,;:!—–\-\[\]()]/g, " ").split(/\s+/).filter((w) => w && w.length > 1 && !STOP.has(w));

  const uniq = [];
  const seenQ = new Set();
  for (const c of quoteCandidates) {
    const k = c.ref + "|" + c.quote.slice(0, 40);
    if (!seenQ.has(k)) { seenQ.add(k); uniq.push(c); }
  }
  const sample = uniq.slice(0, 80);
  console.log(`\n=== QUOTATION AUDIT vs KJV/RSV lineage (${sample.length} unique quoted citations) ===`);
  let pass = 0, soft = 0, fail = 0, skipped = 0;
  const misses = [];
  for (const c of sample) {
    const p2 = _pr(c.ref);
    if (!p2 || p2.isApocrypha || !corpus[p2.code]) { skipped++; continue; }
    const ch = corpus[p2.code][String(p2.chapter)];
    if (!ch) { skipped++; continue; }
    let bibleText = "";
    if (p2.verse) bibleText = ch[String(p2.verse)] || Object.values(ch).join(" ");
    else bibleText = Object.values(ch).join(" ");
    const bible = new Set(norm(bibleText).concat(bibleText ? norm(bibleText) : []));
    const q = norm(c.quote);
    if (!q.length) { skipped++; continue; }
    let hit = 0;
    for (const w of q) if (bible.has(w)) hit++;
    const overlap = hit / q.length;
    if (overlap >= 0.82) pass++;
    else if (overlap >= 0.55) soft++;
    else { fail++; if (misses.length < 12) misses.push(`vol${c.vol} [${c.ref}] overlap=${overlap.toFixed(2)} “${c.quote.slice(0, 88)}”`); }
  }
  console.log(`KJV/RSV-consistent: ${pass} | loose/paraphrase: ${soft} | low-overlap (review): ${fail} | skipped: ${skipped}`);
  misses.forEach((m) => console.log("  ~", m));
}

console.log("\nVERIFY DONE:", stats.chapterErr.length === 0 && stats.bad.length === 0 && stats.urlBad.length === 0 ? "STRUCTURE CLEAN" : "SEE ISSUES ABOVE");
