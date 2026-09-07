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
 *
 * Default version is the RSV (id 2020) — the Revised Standard Version
 * published in Pakistan by the Pakistan Bible Society ("Common Bible")
 * and the standard English text of Presbyterian churches in Pakistan.
 * Returns null for unparseable books so callers can fall back to search.
 */

/** bible.com numeric version ids (verified against bible.com/versions, Sep 2026) */
export const BIBLE_COM_VERSIONS = {
  RSV:     { id: "2020", abbr: "RSV",      name: "Revised Standard Version" },
  KJV:     { id: "1",    abbr: "KJV",      name: "King James Version" },
  NIV:     { id: "111",  abbr: "NIV",      name: "New International Version" },
  NRSVUE:  { id: "3523", abbr: "NRSVUE",   name: "New Revised Standard Version Updated Edition" },
} as const;

export type BibleVersion = keyof typeof BIBLE_COM_VERSIONS;

/** The RSV(-2020) is our house text, mirroring Pakistani Presbyterian usage. */
export const SITE_VERSION: BibleVersion = "RSV";

/**
 * Deuterocanonical / apocryphal books — hosted on bible.com under the
 * NRSV-CI edition (id 2015, "New Revised Standard Version Catholic
 * Interconfessional"), the same RSV-family text the PBS Common Bible
 * prints in its Apocrypha section.
 */
export const APOCRYPHA_CODES: Record<string, { code: string; chapters: number }> = {
  tobit:               { code: "TOB", chapters: 14 },
  judith:              { code: "JDT", chapters: 16 },
  wisdome:             { code: "WIS", chapters: 19 },
  "wisdom of solomon": { code: "WIS", chapters: 19 },
  wisdom:              { code: "WIS", chapters: 19 },
  sirach:              { code: "SIR", chapters: 51 },
  ecclesiasticus:      { code: "SIR", chapters: 51 },
  baruch:              { code: "BAR", chapters: 6 },
  "letter of jeremiah": { code: "LJE", chapters: 1 },
  "1 maccabees":       { code: "1MA", chapters: 16 },
  "2 maccabees":       { code: "2MA", chapters: 15 },
  "3 maccabees":       { code: "3MA", chapters: 7 },
  "4 maccabees":       { code: "4MA", chapters: 18 },
};
export const APOCRYPHA_VERSION_ID = "2015";

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
  luke: "LUK", john: "JHN", acts: "ACT", romans: "ROM",
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
  mat: "MAT", mrk: "MRK", luk: "LUK", joh: "JHN", jhn: "JHN", act: "ACT",
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
  isApocrypha?: boolean;
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
  if (!code) {
    // try the deuterocanon table
    const apo = APOCRYPHA_CODES[key] || APOCRYPHA_CODES[name];
    if (!apo) return null;
    const chapter = parseInt(m[3], 10);
    if (!chapter || chapter < 1) return null;
    return { code: apo.code, chapter, verse: m[4] ? parseInt(m[4], 10) : undefined, isApocrypha: true };
  }

  const chapter = parseInt(m[3], 10);
  const verse = m[4] ? parseInt(m[4], 10) : undefined;
  if (!chapter || chapter < 1) return null;
  return { code, chapter, verse };
}

/** Bible.com passage URL for a chosen version, or null if not parseable. */
export function bibleComUrl(raw: string, version: BibleVersion | string = SITE_VERSION): string | null {
  const p = parseReference(raw);
  if (!p) return null;
  if (p.isApocrypha) {
    const passage = [p.code, String(p.chapter), ...(p.verse ? [String(p.verse)] : [])].join(".");
    return `https://www.bible.com/bible/${APOCRYPHA_VERSION_ID}/${passage}.NRSV-CI`;
  }
  const meta = (BIBLE_COM_VERSIONS as Record<string, { id: string; abbr: string }>)[String(version).toUpperCase()]
    || BIBLE_COM_VERSIONS[SITE_VERSION];
  const passage = [p.code, String(p.chapter), ...(p.verse ? [String(p.verse)] : [])].join(".");
  return `https://www.bible.com/bible/${meta.id}/${passage}.${meta.abbr}`;
}

/** BibleGateway fallback search link for anything we cannot map ( pseudepigrapha etc.). */
export function bibleGatewayUrl(raw: string, version = "NRSVUE"): string {
  return `https://www.biblegateway.com/passage/?search=${encodeURIComponent(raw)}&version=${encodeURIComponent(version)}`;
}

/** Best-effort: Bible.com deep link when parseable, otherwise gateway search. */
export function scriptureUrl(raw: string, version: BibleVersion | string = SITE_VERSION): string {
  return bibleComUrl(raw, version) ?? bibleGatewayUrl(raw);
}

export default scriptureUrl;
