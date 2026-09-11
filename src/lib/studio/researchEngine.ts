/**
 * Scriptorium Studio — offline research assistant.
 * Full-text search over the site's own scholarship (100 Tough Questions,
 * the 1000-question quiz archive and the 51 encyclopedia volumes).
 * No network, no AI: a weighted keyword index built in the browser on demand.
 */
import type { ToughQuestion, ArchiveCategory } from '../../data/theology/types';
import { VOLUME_INDEX } from '../../data/volumes/index-lite';

export interface Hit {
  kind: 'tough' | 'quiz' | 'volume';
  title: string;
  body: string;
  ref?: string;
  href: string;
  score: number;
  extra?: { key: string; text: string }[];
}

const STOP = new Set('the a an and or of to in on for is are was were be been by with as at from that this it its his her their our your what who whom whose why how does did do can could should would will shall about into unto than then there these those which when where'.split(' '));
export const tokenize = (s: string) => (s.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}\s-]/gu, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)));
const stem = (w: string) => w.replace(/(ings?|edly|ed|es|s|ly|tion|ness)$/,'');

interface Doc { hit: Omit<Hit, 'score'>; terms: Map<string, number>; titleTerms: Set<string> }
let DOCS: Doc[] | null = null;

async function build(): Promise<Doc[]> {
  if (DOCS) return DOCS;
  const [{ TOUGH_QUESTIONS }, { ARCHIVE_CATEGORIES }] = await Promise.all([
    import('../../data/theology/tough'), import('../../data/theology/archive'),
  ]);
  const docs: Doc[] = [];
  const add = (hit: Omit<Hit, 'score'>, text: string) => {
    const terms = new Map<string, number>(); tokenize(text).forEach(t => { const k = stem(t); terms.set(k, (terms.get(k) || 0) + 1); });
    docs.push({ hit, terms, titleTerms: new Set(tokenize(hit.title).map(stem)) });
  };
  (TOUGH_QUESTIONS as ToughQuestion[]).forEach(q => add(
    { kind: 'tough', title: q.q, body: q.common.en, ref: q.ref, href: `/theological-archive#tough-${q.slug}`, extra: q.views.map(v => ({ key: v.key, text: v.summary })) },
    `${q.q} ${q.common.en} ${q.ref} ${q.rv} ${q.views.map(v => `${v.summary} ${v.detail || ''}`).join(' ')}`,
  ));
  (ARCHIVE_CATEGORIES as ArchiveCategory[]).forEach(c => c.items.forEach(i => add(
    { kind: 'quiz', title: i.q, body: i.a + (i.note ? ` — ${i.note}` : ''), ref: i.ref, href: `/theological-archive#quiz-${i.slug}` },
    `${c.name} ${i.q} ${i.a} ${i.ref} ${i.note || ''}`,
  )));
  VOLUME_INDEX.forEach(v => add(
    { kind: 'volume', title: `Vol. ${v.number} · ${v.title}`, body: v.summary || v.overview, href: `/encyclopedia/${v.slug}` },
    `${v.title} ${v.subtitle} ${v.overview} ${v.summary} ${(v.keywords || []).join(' ')}`,
  ));
  DOCS = docs; return docs;
}

export async function research(query: string, limit = 12): Promise<{ hits: Hit[]; total: number; scanned: number }> {
  const docs = await build();
  const qt = Array.from(new Set(tokenize(query).map(stem)));
  if (!qt.length) return { hits: [], total: 0, scanned: docs.length };
  // scripture reference boost: "John 3:16", "Isa 53", "Gen 1"
  const refM = /\b([1-3]?\s?[A-Za-z]{2,}\.?)\s+(\d{1,3})(?::(\d{1,3}))?/.exec(query);
  const refKey = refM ? `${refM[1].replace(/\W/g, '').toLowerCase().slice(0, 3)} ${refM[2]}` : null;
  const scored: Hit[] = [];
  for (const d of docs) {
    let s = 0;
    for (const t of qt) { const n = d.terms.get(t) || 0; if (n) s += 1 + Math.log(n); if (d.titleTerms.has(t)) s += 2; }
    if (s === 0) continue;
    const covered = qt.filter(t => d.terms.has(t)).length / qt.length; s *= 0.5 + covered;
    if (refKey && d.hit.ref && d.hit.ref.replace(/\W/g, ' ').toLowerCase().includes(refKey.split(' ')[0]) && d.hit.ref.includes(refKey.split(' ')[1])) s += 6;
    if (d.hit.kind === 'tough') s *= 1.25; // richer answers first
    scored.push({ ...d.hit, score: s });
  }
  scored.sort((a, b) => b.score - a.score);
  return { hits: scored.slice(0, limit), total: scored.length, scanned: docs.length };
}

/** Compose a short "brief" from the top hits — quotes only, nothing generated. */
export function brief(hits: Hit[]): string {
  const t = hits.find(h => h.kind === 'tough'); const q = hits.filter(h => h.kind === 'quiz').slice(0, 3); const v = hits.filter(h => h.kind === 'volume').slice(0, 2);
  const out: string[] = [];
  if (t) { out.push(`${t.body} (${t.ref})`); if (t.extra?.length) out.push(`Traditions: ${t.extra.slice(0, 3).map(e => `${e.key[0].toUpperCase() + e.key.slice(1)} — ${e.text}`).join(' · ')}`); }
  if (q.length) out.push(`From the archive: ${q.map(x => `${x.title} ${x.body} (${x.ref})`).join(' ')}`);
  if (v.length) out.push(`Read further: ${v.map(x => x.title).join('; ')}.`);
  return out.join('\n\n');
}
