/**
 * data.js — loaders, parsers and the search index for the Bible Cross-Reference module.
 * Saul's Podship · no dependencies.
 *
 * Data contract (see tools/build_data.py):
 *   meta.json   books / chapters / verse counts / stats
 *   links.bin   every chapter->chapter arc: (u16 src, u16 dst, u16 refs, i16 votes)
 *   refs/<b>.json  verse-level references sourced in book b (parallel arrays v,t,e,w)
 *   kjv/<b>.json   verse text for book b
 */

const cache = new Map();

async function getJSON(url) {
  if (cache.has(url)) return cache.get(url);
  const p = fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to load ${url} (${r.status})`);
    return r.json();
  });
  cache.set(url, p);
  return p;
}

async function getBuffer(url) {
  if (cache.has(url)) return cache.get(url);
  const p = fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to load ${url} (${r.status})`);
    return r.arrayBuffer();
  });
  cache.set(url, p);
  return p;
}

/** Join a base url and a path without doubling slashes. */
export function join(base, path) {
  return String(base).replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '');
}

export async function loadMeta(baseUrl) {
  const meta = await getJSON(join(baseUrl, 'meta.json'));
  const ch = meta.chapters;
  const n = ch.b.length;

  // Derived helpers used everywhere else.
  const bookOf = Int16Array.from(ch.b);
  const chapNum = Int16Array.from(ch.n);
  const verseCount = Int16Array.from(ch.v);
  const verseOffset = Int32Array.from(ch.o);

  const chapterOfVerse = new Int32Array(meta.stats.verses);
  for (let i = 0; i < n; i++) chapterOfVerse.fill(i, verseOffset[i], verseOffset[i] + verseCount[i]);

  const chapterLabel = new Array(n);
  const chapterRef = new Array(n);
  for (let i = 0; i < n; i++) {
    const bk = meta.books[bookOf[i]];
    chapterLabel[i] = `${bk.n} ${chapNum[i]}`;
    chapterRef[i] = `${bk.a}.${chapNum[i]}`;
  }

  // Per-chapter outbound / inbound totals.
  return {
    raw: meta,
    baseUrl,
    chapterCount: n,
    bookOf,
    chapNum,
    verseCount,
    verseOffset,
    chapterOfVerse,
    chapterLabel,
    chapterRef,
    books: meta.books,
    stats: meta.stats,
  };
}

/** Parse links.bin into typed arrays. */
export async function loadLinks(baseUrl) {
  const buf = await getBuffer(join(baseUrl, 'links.bin'));
  const dv = new DataView(buf);
  const magic = String.fromCharCode(dv.getUint8(0), dv.getUint8(1), dv.getUint8(2), dv.getUint8(3));
  if (magic !== 'SPCR') throw new Error('links.bin is not a Saul\u2019s Podship cross-reference file');
  const version = dv.getUint16(4, true);
  const chapters = dv.getUint16(6, true);
  const count = dv.getUint32(8, true);
  const dataOffset = dv.getUint32(12, true) || 16;
  if (version !== 1) throw new Error(`Unsupported links.bin version ${version}`);
  if (buf.byteLength < dataOffset + count * 8) throw new Error('links.bin is truncated');

  // Four contiguous little-endian columns -> zero-copy typed array views.
  const body = buf.slice(dataOffset);
  const src = new Uint16Array(body, 0, count);
  const dst = new Uint16Array(body, count * 2, count);
  const weight = new Uint16Array(body, count * 4, count);
  const votes = new Int16Array(body, count * 6, count);

  // Outbound adjacency: links.bin is sorted by source chapter, so each chapter owns a slice.
  const outStart = new Int32Array(chapters + 1);
  {
    let i = 0;
    for (let c = 0; c < chapters; c++) {
      outStart[c] = i;
      while (i < count && src[i] === c) i++;
    }
    outStart[chapters] = count;
  }

  // Index for fast inbound lookups (dst -> arc ids).
  const inCount = new Int32Array(chapters);
  for (let i = 0; i < count; i++) inCount[dst[i]]++;
  const inStart = new Int32Array(chapters + 1);
  for (let i = 0; i < chapters; i++) inStart[i + 1] = inStart[i] + inCount[i];
  const inIndex = new Int32Array(count);
  const cursor = inStart.slice(0, chapters);
  for (let i = 0; i < count; i++) inIndex[cursor[dst[i]]++] = i;

  return { count, chapters, src, dst, weight, votes, inStart, inIndex, outStart };
}

export async function loadBookRefs(meta, bookIdx) {
  const key = `refs:${bookIdx}`;
  if (cache.has(key)) return cache.get(key);
  const p = getJSON(join(meta.baseUrl, `refs/${bookIdx}.json`));
  cache.set(key, p);
  return p;
}

export async function loadBookText(meta, bookIdx) {
  const key = `kjv:${bookIdx}`;
  if (cache.has(key)) return cache.get(key);
  const p = getJSON(join(meta.baseUrl, `kjv/${bookIdx}.json`));
  cache.set(key, p);
  return p;
}

/* ------------------------------------------------------------------ search */

const NUM_WORDS = new Set(['i', 'ii', 'iii', '1', '2', '3', 'first', 'second', 'third']);

function normBookKey(name) {
  const parts = String(name).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim().split(/\s+/);
  const out = [];
  for (const p of parts) {
    if (NUM_WORDS.has(p)) out.push(p === 'first' ? '1' : p === 'second' ? '2' : p === 'third' ? '3' : p === 'i' ? '1' : p === 'ii' ? '2' : p === 'iii' ? '3' : p);
    else out.push(p);
  }
  return out.join(' ');
}

/** Build a lookup of every accepted spelling of every book -> book index. */
export function buildBookIndex(meta) {
  const map = new Map();
  const add = (key, idx) => {
    const k = normBookKey(key).replace(/\s+/g, '');
    if (k && !map.has(k)) map.set(k, idx);
  };
  meta.books.forEach((b, i) => {
    add(b.n, i);
    add(b.a, i);
    add(b.n.replace(/ /g, ''), i);
    add(b.n.split(' ')[0], i);
  });
  const extra = {
    psalm: 18, psalms: 18, songofsolomon: 21, songofsongs: 21, canticles: 21,
    samuel1: 8, samuel2: 9, kings1: 10, kings2: 11, chronicles1: 12, chronicles2: 13,
    corinthians1: 46, corinthians2: 47, thessalonians1: 52, thessalonians2: 53,
    timothy1: 54, timothy2: 55, peter1: 60, peter2: 61, john1: 62, john2: 63, john3: 64,
    revelationofjohn: 65, apocalypse: 65, rev: 65, song: 21, ecc: 20, qoheleth: 20,
  };
  for (const k in extra) if (!map.has(k)) map.set(k, extra[k]);
  return map;
}

/**
 * Parse free text such as "Isaiah 53", "isa 53:5", "John 3:16", "1 Cor 13", "Psalms 119".
 * Returns { book, chapter, verse } (chapter/verse may be null) or null.
 */
export function parseReference(query, bookIndex) {
  const q = String(query || '').trim();
  if (!q) return null;
  const m = q.match(/^([1-3]?\s?[A-Za-z][A-Za-z.\s]*?)\s*\.?\s*(\d+)?\s*(?::\s*(\d+))?$/);
  if (!m) return null;
  const key = normBookKey(m[1]).replace(/\s+/g, '');
  let book = bookIndex.get(key);
  if (book === undefined) {
    // allow prefixes: "isa", "1co", "songofs"
    let hit = null;
    for (const [k, v] of bookIndex) {
      if (k.startsWith(key)) {
        if (hit !== null && hit !== v) return null;
        hit = v;
      }
    }
    book = hit;
  }
  if (book === undefined || book === null) return null;
  return {
    book,
    chapter: m[2] ? parseInt(m[2], 10) : null,
    verse: m[3] ? parseInt(m[3], 10) : null,
  };
}

/** Resolve a parsed reference to chapter index and/or global verse index. */
export function resolveReference(meta, ref) {
  if (!ref) return null;
  const book = meta.books[ref.book];
  if (!book) return null;
  let chapterIdx = null;
  if (ref.chapter != null) {
    for (let i = book.co; i < book.co + book.c; i++) {
      if (meta.chapNum[i] === ref.chapter) { chapterIdx = i; break; }
    }
    if (chapterIdx === null) return null;
  }
  let verseIdx = null;
  if (chapterIdx !== null && ref.verse != null) {
    if (ref.verse >= 1 && ref.verse <= meta.verseCount[chapterIdx]) {
      verseIdx = meta.verseOffset[chapterIdx] + ref.verse - 1;
    }
  }
  return { book: ref.book, chapterIdx, verseIdx, label: meta.chapterLabel[chapterIdx ?? book.co] };
}

export function formatVerse(meta, globalVerseIdx) {
  const c = meta.chapterOfVerse[globalVerseIdx];
  const v = globalVerseIdx - meta.verseOffset[c] + 1;
  return `${meta.chapterLabel[c]}:${v}`;
}
