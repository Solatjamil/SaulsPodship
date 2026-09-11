/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * build-kjv-corpus.mjs — parse the public-domain King James Version text
 * (Project Gutenberg eBook #10, Cambridge 1769 text) into a compact
 * { bookCode: { chapter: { verse: text } } } JSON corpus used by
 * scripts/verify-scripture.mjs for offline quotation auditing.
 *
 * Usage: node scripts/build-kjv-corpus.mjs [path-to-pg10.txt] [out.json]
 *   (defaults: /tmp/pg10.txt → /tmp/kjv-corpus.json)
 */

import fs from "fs";

const SRC = process.argv[2] || "/tmp/pg10.txt";
const OUT = process.argv[3] || "/tmp/kjv-corpus.json";

// heading patterns → bible.com/book codes (matched against lowercased short lines)
const HEADINGS = [
  [/called genesis/, "GEN"], [/called exodus/, "EXO"], [/called leviticus/, "LEV"],
  [/called numbers/, "NUM"], [/called deuteronomy/, "DEU"], [/book of joshua/, "JOS"],
  [/book of judges/, "JDG"], [/ruth$/i, "RUT"], [/first book of samuel/, "1SA"],
  [/second book of samuel/, "2SA"], [/first book of (?:the )?kings/, "1KI"],
  [/second book of (?:the )?kings/, "2KI"], [/first book of (?:the )?chronicles/, "1CH"],
  [/second book of (?:the )?chronicles/, "2CH"], [/ezra$/i, "EZR"], [/nehemiah$/i, "NEH"],
  [/esther$/i, "EST"], [/job$/i, "JOB"], [/book of psalms|^psalms/, "PSA"],
  [/proverbs/i, "PRO"], [/ecclesiastes$/i, "ECC"], [/song of solomon/, "SNG"],
  [/isaiah/, "ISA"], [/jeremiah/, "JER"], [/lamentations/, "LAM"], [/ezekiel/, "EZK"],
  [/daniel$/i, "DAN"], [/hosea$/i, "HOS"], [/joel$/i, "JOL"], [/amos$/i, "AMO"],
  [/obadiah$/i, "OBA"], [/jonah$/i, "JON"], [/micah$/i, "MIC"], [/nahum$/i, "NAM"],
  [/habakkuk$/i, "HAB"], [/zephaniah$/i, "ZEP"], [/haggai$/i, "HAG"], [/zechariah$/i, "ZEC"],
  [/malachi$/i, "MAL"],
  [/matthew/i, "MAT"], [/marke?$/i, "MRK"],
  [/luke/i, "LUK"], [/john the evangelist|according to (?:st\.? )?john$/i, "JOH"],
  [/acts of the apostles|^acts/i, "ACT"], [/romans/, "ROM"], [/first epistle.*corinthians/, "1CO"],
  [/second epistle.*corinthians/, "2CO"], [/galatians/, "GAL"], [/ephesians/, "EPH"],
  [/philippians/, "PHP"], [/colossians/, "COL"], [/thessalonians/, (l) => l.includes("first") ? "1TH" : "2TH"],
  [/first epistle.*timothy/, "1TI"], [/second epistle.*timothy/, "2TI"],
  [/^titus/, "TIT"], [/philemon/, "PHM"], [/hebrews/, "HEB"], [/james$/i, "JAS"],
  [/first epistle (?:general )?of peter/i, "1PE"], [/second epistle (?:general )?of peter/i, "2PE"],
  [/first epistle (?:general )?of john/i, "1JN"],
  [/second epistle (?:general )?of john/i, "2JN"], [/third epistle (?:general )?of john/i, "3JN"],
  [/jude$/i, "JUD"], [/revelation/i, "REV"],
];

const ORDER = ["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JOH","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"];

const raw = fs.readFileSync(SRC, "utf8").replace(/\r\n/g, "\n");
const start = raw.indexOf("START OF THE PROJECT GUTENBERG");
const lines = (start > -1 ? raw.slice(start) : raw).split("\n");
const VERSE = /^(\d{1,3}):(\d{1,3})\s+(.*)$/;

// Book boundaries in Gutenberg's KJV: a line starting "1:1 " preceded only by
// a short heading line (or blank) — every canonical book has exactly one.
const bounds = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trim();
  if (!/^1:1\s/.test(l)) continue;
  let k = i - 1;
  while (k >= 0 && !lines[k].trim()) k--;
  if (k < 0) continue;
  if (VERSE.test(lines[k].trim())) continue;           // mid-book? a heading must precede
  if (lines[k].trim().length > 130) continue;          // not heading-like
  bounds.push(i);
}
if (bounds.length !== ORDER.length) console.warn(`NOTE: found ${bounds.length} book starts (expected ${ORDER.length}).`);
const n = Math.min(bounds.length, ORDER.length);

const corpus = {};
for (let b = 0; b < n; b++) {
  const code = ORDER[b];
  const from = bounds[b];
  const to = b + 1 < n ? bounds[b + 1] - 1 : lines.length - 1;
  const book = (corpus[code] = {});
  // whole book text, then split on every C:V marker (covers in-paragraph verses)
  const chunks = [];
  for (let j = from; j <= to; j++) {
    const l = lines[j].trim();
    if (l && !/^\d{1,3}:\d{1,3}\s/.test(l) && l.length < 130 && !/[.]$/.test(l) && j === from) continue; // heading line
    chunks.push(l);
  }
  const text = chunks.join(" ").replace(/\s+/g, " ");
  const re = /(\d{1,3}):(\d{1,3})\s+/g;
  let m2, prev = null;
  while ((m2 = re.exec(text)) !== null) {
    if (prev) {
      const body = text.slice(prev.end, m2.index).trim();
      if (body) (book[prev.ch] ||= {})[prev.vs] = body;
    }
    prev = { ch: m2[1], vs: m2[2], end: m2.index + m2[0].length };
  }
  if (prev) {
    const body = text.slice(prev.end).trim();
    if (body) (book[prev.ch] ||= {})[prev.vs] = body;
  }
  // strip accidental non-verse tails (license markers)
  for (const ch of Object.keys(book)) {
    const last = Object.keys(book[ch]).pop();
    if (last && /PROJECT GUTENBERG|START OF/.test(book[ch][last])) delete book[ch][last];
  }
}

const books = Object.keys(corpus);
let verses = 0;
for (const b of books) for (const c of Object.keys(corpus[b])) verses += Object.keys(corpus[b][c]).length;
fs.writeFileSync(OUT, JSON.stringify(corpus));
console.log(`KJV corpus: ${books.length} books, ${verses} verses → ${OUT}`);
const missing = ORDER.filter(c => !corpus[c]);
if (missing.length) console.warn("WARNING missing books:", missing.join(","));
// sanity checks vs known verse counts
const expect = { GEN: 1533, PSA: 2461, MAT: 1071, REV: 404 };
for (const [c, ev] of Object.entries(expect)) {
  let got = 0;
  for (const ch of Object.keys(corpus[c] || {})) got += Object.keys(corpus[c][ch]).length;
  const ok = Math.abs(got - ev) <= 5;
  console.log(`  ${c}: ${got}/${ev} verses ${ok ? "OK" : "CHECK"}`);
  if (!ok) process.exitCode = 1;
}
