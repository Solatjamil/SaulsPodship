/* Embeds a hidden unique code (XMP chunk, invisible to browsers) into every
   story thumbnail: "sp:<kind>:<name>" — e.g. sp:vol1:42 or sp:scene:sword.
   Usage: node scripts/embed-story-codes.mjs */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
const xmp = code => `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:sp="http://saulspodship.com/stories/"><sp:Code>${code}</sp:Code></rdf:Description></rdf:RDF></x:xmpmeta><?xpacket end="w"?>`;
const u32 = n => { const b = Buffer.alloc(4); b.writeUInt32LE(n); return b; };
function embed(path, code) {
  const buf = readFileSync(path);
  if (buf.toString('latin1', 0, 4) !== 'RIFF' || buf.toString('latin1', 8, 12) !== 'WEBP') throw new Error('not webp: ' + path);
  const [w, h] = execSync(`identify -format "%w %h" "${path}"`).toString().trim().split(/\s+/).map(Number);
  const chunks = [];
  let p = 12;
  while (p + 8 <= buf.length) {
    const fourcc = buf.toString('latin1', p, p + 4);
    const size = buf.readUInt32LE(p + 4);
    if (fourcc === 'XMP ') { p += 8 + size + (size & 1); continue; } // replace old
    if (fourcc !== 'VP8X') chunks.push(buf.slice(p, p + 8 + size + (size & 1)));
    p += 8 + size + (size & 1);
  }
  const vp8x = Buffer.concat([Buffer.from('VP8X'), u32(10), Buffer.from([0, 0, 0, 0]),
    Buffer.from([(w - 1) & 0xff, (w - 1) >> 8 & 0xff, (w - 1) >> 16 & 0xff]),
    Buffer.from([(h - 1) & 0xff, (h - 1) >> 8 & 0xff, (h - 1) >> 16 & 0xff])]);
  const x = Buffer.from(xmp(code), 'utf8');
  const xpad = x.length & 1 ? Buffer.concat([x, Buffer.alloc(1)]) : x;
  const payload = Buffer.concat([Buffer.from('WEBP'), vp8x, ...chunks.map(c => c), Buffer.concat([Buffer.from('XMP '), u32(x.length), xpad])]);
  writeFileSync(path, Buffer.concat([Buffer.from('RIFF'), u32(payload.length), payload]));
  return true;
}
let n = 0;
for (const f of readdirSync('public/images/stories/vol1')) if (f.endsWith('.webp')) { embed(`public/images/stories/vol1/${f}`, `sp:vol1:${f.replace('.webp', '')}`); n++; }
for (const f of readdirSync('public/images/stories/scenes')) if (f.endsWith('.webp')) { embed(`public/images/stories/scenes/${f}`, `sp:scene:${f.replace('.webp', '')}`); n++; }
console.log(`embedded unique codes in ${n} thumbnails`);
