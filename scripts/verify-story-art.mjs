/* Verifies every Vol-1 story card's thumbnail by UNIQUE CODE:
   rebuilds the app's real art-mapping (VOL1_PAINTED -> vol1/<id>.webp, else
   KEYWORD_MAP glyph -> scenes/<glyph>.webp), reads the hidden XMP code out of
   each file, asserts code matches the story that should use it, lists shared
   art (duplicates), unused art, and with --live re-reads the code from the
   bytes served on the production CDN.
   Usage: node scripts/verify-story-art.mjs [--live] */
import { readFileSync } from 'fs';
const LIVE = process.argv.includes('--live');
const BASE = 'https://www.saulspodship.com';
const codeOf = buf => {
  let p = 12;
  while (p + 8 <= buf.length) {
    const fourcc = buf.toString('latin1', p, p + 4);
    const size = buf.readUInt32LE(p + 4);
    if (fourcc === 'XMP ') return buf.slice(p + 8, p + 8 + size).toString('utf8').match(/<sp:Code>([^<]+)<\/sp:Code>/)?.[1] ?? null;
    p += 8 + size + (size & 1);
  }
  return null;
};
const icon = readFileSync('src/components/story/StorySceneIcon.tsx', 'utf8');
const block = icon.slice(icon.indexOf('const KEYWORD_MAP'), icon.indexOf('];', icon.indexOf('const KEYWORD_MAP')));
const rules = [...block.matchAll(/\[\/(.*?)\/([a-z]*)\s*,\s*'([a-z-]+)'\]/g)].map(m => [new RegExp(m[1], m[2]), m[3]]);
const sc = readFileSync('src/components/story/storyScenes.ts', 'utf8');
const UNI = new Set((sc.match(/VOL1_PAINTED[\s\S]*?\]\)/)[0].match(/'\d+'/g) || []).map(s => s.slice(1, -1)));
const PAINTED = new Set((sc.match(/const PAINTED = new Set\(\[([\s\S]*?)\]\)/)[1].match(/'[a-z-]+'/g) || []).map(s => s.slice(1, -1)));
const vol = readFileSync('src/data/volumes/volume_01.ts', 'utf8');
const panels = [...vol.matchAll(/\{\s*"id": "(\d+)",\s*"era": "[^"]*",\s*"title": "([^"]*)",\s*"description": "([^"]*)"/g)].slice(0, 100).map(m => ({ id: m[1], title: m[2], desc: m[3] }));
const map = {};
for (const p of panels) {
  if (UNI.has(p.id)) { map[p.id] = { f: `public/images/stories/vol1/${p.id}.webp`, code: `sp:vol1:${p.id}`, title: p.title }; continue; }
  const hay = p.title + ' ' + p.desc;
  let gl = rules.find(([re]) => re.test(hay))?.[1] || 'book';
  if (!PAINTED.has(gl)) gl = 'book';
  map[p.id] = { f: `public/images/stories/scenes/${gl}.webp`, code: `sp:scene:${gl}`, title: p.title };
}
let ok = 0, fail = [];
for (const [id, m] of Object.entries(map)) {
  let code;
  if (LIVE) {
    const res = await fetch(`${BASE}/${m.f.replace('public', '')}`);
    if (!res.ok) { fail.push(`${id} ${m.title}: live HTTP ${res.status} for ${m.f}`); continue; }
    code = codeOf(Buffer.from(await res.arrayBuffer()));
  } else code = codeOf(readFileSync(m.f));
  if (code === m.code) ok++; else fail.push(`${id} ${m.title}: ${LIVE ? 'LIVE' : 'local'} code is ${code ?? 'MISSING'}, expected ${m.code}`);
}
const share = {};
for (const [id, m] of Object.entries(map)) (share[m.f] = share[m.f] || []).push(id);
const dups = Object.values(share).filter(v => v.length > 1);
const used = new Set(Object.values(map).map(m => m.f));
import { readdirSync } from 'fs';
const all = [...readdirSync('public/images/stories/vol1').map(f => `public/images/stories/vol1/${f}`), ...readdirSync('public/images/stories/scenes').map(f => `public/images/stories/scenes/${f}`)];
const unused = all.filter(f => !used.has(f));
console.log(`${LIVE ? 'LIVE ' : ''}code check: ${ok}/100 stories resolve to art carrying their exact unique code`);
if (fail.length) { console.log('FAILURES:\n' + fail.join('\n')); process.exitCode = 1; }
console.log(`shared (still-duplicate) art: ${dups.length ? dups.map(v => v.join('+')).join(' ') : 'NONE'}`);
console.log(`unused art files: ${unused.length ? unused.join(' ') : 'none'}`);
