/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Bible.com deep-link helper.
 *
 * Converts reference strings like "Genesis 1:1–31", "1 Samuel 17:1-58",
 * "Psalms 22" or "Revelation 21–22" into a Bible.com passage URL
 * (https://www.bible.com/bible/<versionId>/<CODE>.<chapter>[.<verse>].<abbr>).
 * Returns null for non-canonical books (e.g. "Enoch 6") so callers can
 * fall back to a search link.
 */

const BOOK_CODES: Record<string, string> = {
  genesis: "GEN", exodus: "EXO", leviticus: "LEV", numbers: "NUM",
  deuteronomy: "DEU", joshua: "JOS", judges: "JDG", ruth: "RUT",
  "1 samuel": "1SA", "2 samuel": "2SA", "1 kings": "1KI", "2 kings": "2KI",
  "1 chronicles": "1CH", "2 chronicles": "2CH", ezra: "EZR", nehemiah: "NEH",
  esther: "EST", job: "JOB", psalm: "PSA", psalms: "PSA", proverbi: "PRO",
  proverbs: "PRO", ecclesiastes: "ECC", "song of solomon": "SNG",
  "song of songs": "SNG", isaiah: "ISA", jeremiah: "JER",
  lamentations: "LAM", ezekiel: "EZK", daniel: "DAN", hosea: "HOS",
  joel: "JOL", amos: "AMO", obadiah: "OBA", jonah: "JON", micah: "MIC",
  nahum: "NAM", habakkuk: "HAB", zephaniah: "ZEP", haggai: "HAG",
  zechariah: "ZEC", malachi: "MAL", matthew: "MAT", mark: "MRK",
  luke: "LUK", john: "JOH", acts: "ACT", romans: "ROM",
  "1 corinthians": "1CO", "2 corinthians": "2CO", galatians: "GAL",
  ephesians: "EPH", philippians: "PHP", colossians: "COL",
  "1 thessalonians": "1TH", "2 thessalonians": "2TH", "1 timothy": "1TI",
  "2 timothy": "2TI", titus: "TIT", philemon: "PHM", hebrews: "HEB",
  james: "JAS", "1 peter": "1PE", "2 peter": "2PE", "1 john": "1JN",
  "2 john": "2JN", "3 john": "3JN", jude: "JUD", revelation: "REV",
  // common abbreviations used inside prose
  gen: "GEN", exo: "EXO", lev: "LEV", num: "NUM", deu: "DEU", jos: "JOS",
  jdg: "JDG", "1sa": "1SA", "2sa": "2SA", "1ki": "1KI", "2ki": "2KI",
  "1ch": "1CH", "2ch": "2CH", Neh: "NEH", est: "EST", psa: "PSA",
  pro: "PRO", ecc: "ECC", sng: "SNG", isa: "ISA", jer: "JER", lam: "LAM",
  ezk: "EZK", dan: "DAN", hos: "HOS", jon: "JON", mic: "MIC", hab: "HAB",
  mat: "MAT", mrk: "MRK", luk: "LUK", joh: "JOH", jhn: "JOH", act: "ACT",
  rom: "ROM", "1co": "1CO", "2co": "2CO", gal: "GAL", eph: "EPH",
  php: "PHP", col: "COL", "1th": "1TH", "2th": "2TH", "1ti": "1TI",
  "2ti": "2TI", heb: "HEB", Jas: "JAS", "1pe": "1PE", "2pe": "2PE",
  "1jn": "1JN", "2jn": "2JN", "3jn": "3JN", rev: "REV",
};

const BOOK_ALIAS: Record<string, string> = {
  "1st samuel": "1 samuel", "2nd samuel": "2 samuel",
  "1st kings": "1 kings", "2nd kings": "2 kings",
  "1st chronicles": "1 chronicles", "2nd chronicles": "2 chronicles",
  "song": "song of songs", "wisdom of solomon": "", // apocrypha guard
};

// e.g. "Genesis 1:1–31", "1 Sam. 17:1-58", "Psalms 22", "Revelation 21:1"
const REF_RE =
  /^\s*(1|2|3)?\s*([A-Za-z][A-Za-z .]*)?\s*(\d{1,3})\s*(?::\s*(\d{1,3}))?\b/;

export interface ParsedRef {
  code: string;
  chapter: number;
  verse?: number;
}

export function parseReference(raw: string): ParsedRef | null {
  if (!raw) return null;
  // take the FIRST citation before any ';' or second space-separated citation
  const first = String(raw).split(/[;,]/)[0];
  const m = first.match(REF_RE);
  if (!m) return null;

  const num = m[1] || "";
  let name = (m[2] || "").trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
  name = BOOK_ALIAS[name] ?? name;
  const key = (num ? `${num} ${name}` : name).trim().replace(/\s+/g, " ");
  const code = BOOK_CODES[key] || BOOK_CODES[name];
  if (!code) return null;

  const chapter = parseInt(m[3], 10);
  const verse = m[4] ? parseInt(m[4], 10) : undefined;
  if (!chapter || chapter < 1) return null;
  return { code, chapter, verse };
}

/** Bible.com NIV (111) passage URL, or null if not parseable. */
export function bibleComUrl(raw: string, versionId = "111", versionAbbr = "NIV"): string | null {
  const p = parseReference(raw);
  if (!p) return null;
  const passage = [p.code, String(p.chapter), ...(p.verse ? [String(p.verse)] : [])].join(".");
  return `https://www.bible.com/bible/${versionId}/${passage}.${versionAbbr}`;
}

/** BibleGateway fallback search link for anything we cannot map (Apocrypha etc.). */
export function bibleGatewayUrl(raw: string, version = "NIV"): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(raw)}&version=${encodeURIComponent(version)}`;
}

/** Best-effort: Bible.com deep link when parseable, otherwise gateway search. */
export function scriptureUrl(raw: string): string {
  return bibleComUrl(raw) ?? bibleGatewayUrl(raw);
}

export default scriptureUrl;
