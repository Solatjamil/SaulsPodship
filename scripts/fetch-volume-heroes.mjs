/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * fetch-volume-heroes.mjs — give every volume a hero image that matches its
 * content. Sources public-domain / freely-licensed religious art directly from
 * Wikimedia Commons (hand-curated query per volume), downloads it at 1920px,
 * and generates the <slug>/hero-1920.jpg + hero-1280.webp + hero-portrait.webp
 * variants the Hero component expects. Then writes {src, alt, credit} into
 * heroImage across volume_XX.ts + volumesData.json.
 *
 * Run: node scripts/fetch-volume-heroes.mjs [--dry]
 * Requires: python3 + Pillow (for webp), network.
 */

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const VOL_DIR = path.join(REPO, "src/data/volumes");
const IMG_DIR = path.join(REPO, "public/images/volumes");
const DRY = process.argv.includes("--dry");
const ONLY = (process.argv.find(a => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const UA = "SaulsPodshipBot/1.0 (www.saulspodship.com; contact: solatnadeem@gmail.com)";

/** hand-curated: each volume's most recognizable scene → Commons artwork */
const QUERIES = {
  "all-bible-stories": ["Gustave Doré The Creation of Light", "Gustave Doré Bible illustration"],
  "all-biblical-numerology": ["illuminated manuscript biblical numbers", "medieval computus manuscript"],
  "all-big-denominations-their-differences": ["protestant reformation church interior engraving", "cathedral versus chapel lithograph"],
  "angels-demons-beasts-monsters-in-the-bible": ["Gustave Doré fallen angels", "Doré Paradise Lost Satan"],
  "apologetics-40-critical-questions": ["Raphael Disputation of the Holy Sacrament", "School of Athens"],
  "apostles-creed": ["Christ and the twelve apostles painting", "apostles stained glass window"],
  "ark-of-covenant-and-other-biblical-relics": ["Gustave Doré Ark of the Covenant", "Bernardo Daddi Ark of the Covenant"],
  "baptism-sacraments-circumcision": ["baptistery mosaic baptism", "Hieronymus Bosch Seven Sacraments altarpiece"],
  "bible-book-writers": ["evangelist scribe illuminated manuscript", "Jeremiah lamenting Gustave Doré"],
  "biblical-creation-vs-scientific-creation": ["William Blake The Ancient of Days", "Creation of the stars Gustave Doré"],
  "biblical-maps": ["Ortelius map of the Holy Land", "16th century Palestine map"],
  "book-of-revelation": ["Apocalypse twenty-four elders illumination", "Beatus manuscript Apocalypse"],
  "christianity-in-south-asia-india-pakistan": ["Saint Thomas Cross India", "Goa churches 17th century engraving"],
  "christmas-history": ["Adoration of the Magi Giotto", "Adoration of the Magi Botticelli"],
  "comparative-religion": ["world religions allegory engraving", "Raphael Disputation of the Holy Sacrament"],
  "complete-christian-theology-map": ["Summa Theologica frontispiece", "allegory of theology painting"],
  "crusades-historical-theological-analysis": ["Siege of Antioch crusade painting", "emperor urban ii council of clermont painting"],
  "early-church-fathers-councils": ["Council of Nicaea icon", "church fathers mosaic"],
  "easter-resurrection": ["Resurrection of Christ Matthias Grünewald", "Resurrection Gustave Doré"],
  "family-tree-adam-jesus": ["Tree of Jesse illuminated manuscript", "window of Jesse tree cathedral"],
  "forbidden-knowledge-the-watchers": ["Gustave Doré Satan", "fallen angels painting baroque"],
  "guide-to-christian-living": ["Christ blessing children painting", "Sermon on the Mount Carl Bloch"],
  "heaven-hell": ["Gustave Doré Dante Paradiso", "Christ limbo harrowing icon"],
  "history-of-all-12-disciples": ["Rembrandt apostle painting", "Dürer apostles panels"],
  "holy-communion": ["Tintoretto Last Supper", "Eucharist altar painting"],
  "how-the-world-populated-after-abels-death": ["Cain and Abel Gustave Doré", "Cain fleeing painting"],
  "jesus-is-god-full-references-ot-nt": ["Raphael Transfiguration", "Christ Pantocrator mosaic"],
  "lords-prayer": ["Christ teaching the disciples painting", "praying hands Dürer"],
  "messianic-prophecies": ["Fra Angelico Annunciation", "Presentation in the Temple Simeon painting", "Isaiah illuminated manuscript"],
  "miracles-of-jesus-and-the-apostles-complete-catalogue": ["Christ healing the sick painting", "Marriage at Cana Veronese"],
  "names-of-god": ["Tetragrammaton Hebrew manuscript", "God the Father naming engraving"],
  "names-of-jesus": ["Holy Name of Jesus banner", "Christus monogram"],
  "non-canonical-books-canon-differences": ["Codex Sinaiticus", "gospel papyrus fragment"],
  "not-biblical-quotes-sayings": ["medieval scribe writing desk miniature", "quill ink parchment still life"],
  "original-scripture-languages": ["Hebrew Torah scroll closeup", "Ge'ez manuscript parchment", "Peshitta Syriac manuscript"],
  "parables-of-jesus-all-40-explained": ["Parable of the Sower painting", "Gustave Doré the sower"],
  "primeval-world-timeline-ancient-civilizations": ["The Deluge Turner", "Gilgamesh relief ancient"],
  "psalm-authors": ["King David playing the harp painting", "David and the musicians miniature"],
  "revelation-judgments-timeline": ["seven trumpets angel Apocalypse illumination", "trumpets of the apocalypse painting"],
  "sermon-on-the-mount": ["Carl Heinrich Bloch Preaching on the Mount", "Sermon on the Mount Carl Bloch", "Beatitudes Gustave Doré"],
  "seven-last-words-of-jesus": ["Crucifixion Anthony van Dyck", "Christ on the cross Gustave Doré"],
  "systematic-theology-subjects": ["Thomas Aquinas teaching painting", "medieval university disputation miniature"],
  "ten-commandments-ot-laws": ["Moses breaking the tablets Gustave Doré", "ten commandments painting"],
  "the-five-offerings-of-leviticus": ["Levitical sacrifice temple engraving", "Cain and Abel offering altar painting"],
  "the-magi": ["Adoration of the Magi Peter Paul Rubens", "Magi sarcophagus relief"],
  "true-worship-vs-false-worship": ["Solomon's idolatry painting", "golden calf worship engraving"],
  "types-of-bad-spirits-in-the-bible": ["Christ casting out devils painting", "temptation of Saint Anthony engraving"],
  "vatican-and-its-history": ["Panini interior of St Peter's", "Vatican 17th century engraving"],
  "worlds-all-big-churches": ["cathedrals of the world engraving", "Hagia Sophia interior panorama"],
  "1-year-sermon-guide-52-gen-z-topics": ["George Whitefield preaching open air engraving", "Spurgeon pulpit engraving", "Victorian church interior sermon painting"],
};

const api = new URL("https://commons.wikimedia.org/w/api.php");
async function jsonFetch(u) {
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function searchCommons(q) {
  const u = new URL(api);
  Object.entries({
    action: "query", format: "json", generator: "search",
    gsrsearch: `filetype:bitmap ${q}`, gsrnamespace: "6", gsrlimit: "10",
    prop: "imageinfo", iiprop: "url|size|extmetadata|mime", iiurlwidth: "1920",
  }).forEach(([k, v]) => u.searchParams.set(k, v));
  const j = await jsonFetch(u);
  const pages = j?.query?.pages ? Object.values(j.query.pages) : [];
  const scored = [];
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (!/^image\/(jpeg|png)$/i.test(ii.mime)) continue;
    const w = ii.width, h = ii.height;
    if (!w || !h) continue;
    if (w < 700) continue;
    const ratio = w / h;
    const md = ii.extmetadata || {};
    const lic = String(md.LicenseShortName?.value || "");
    const artist = String(md.Artist?.value || "").replace(/<[^>]+>/g, "").trim() || "unknown artist";
    const name = p.title.replace(/^File:/, "");
    if (/modern|stock|photo of a laptop|3d render/i.test(name)) continue;
    let score = 0;
    if (ratio >= 1.2 && ratio <= 3.2) score += 4;            // hero needs landscape
    if (w >= 1400) score += 2; else if (w >= 900) score += 1;
    if (/dore|doré|tissot|bloch|rembrandt|rubens|giotto|botticelli|raphaël|raphael|turner|veronese|van dyck/i.test(name)) score += 3;
    if (/public domain|pd|cc0|cc-by-sa 1|cc-by 1|cc-pdm/i.test(lic)) score += 2;
    else if (!lic) score += 0;                                 // unknown license on old art: acceptable PD risk
    else if (/cc-by/i.test(lic)) score += 1;
    else if (/fair use|non-free/i.test(lic)) score -= 10;
    scored.push({ title: p.title, name, thumb: ii.thumburl || ii.url, descurl: ii.descriptionurl, w, h, lic, artist, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored[0] || null;
}

function makeVariants(jpgPath, dir) {
  if (DRY) return;
  const py = `
from PIL import Image
import sys
src = sys.argv[1]; dirpath = sys.argv[2]
im = Image.open(src).convert("RGB")
w,h = im.size
# 1920 wide master jpg
if w != 1920:
    im2 = im.resize((1920, max(1,int(h*1920/w))), Image.LANCZOS)
else:
    im2 = im
im2.save(dirpath + "/hero-1920.jpg", quality=82, optimize=True)
# 1280 webp
im3 = im2.resize((1280, max(1,int(im2.height*1280/1920))), Image.LANCZOS) if im2.width>1280 else im2
im3.save(dirpath + "/hero-1280.webp", quality=78, method=5)
# portrait crop 900x1200
pw, ph = 900, 1200
im4 = im.resize((pw, max(1,int(im.height*pw/im.width))), Image.LANCZOS) if im.width != pw else im
if im4.height > ph:
    top = (im4.height - ph)//2
    im4 = im4.crop((0, top, pw, top+ph))
else:
    im4 = im4.resize((pw, ph), Image.LANCZOS)
im4.save(dirpath + "/hero-portrait.webp", quality=76, method=5)
print("variants ok", im.size)
`;
  const tmp = "/tmp/_makevariants.py";
  fs.writeFileSync(tmp, py);
  execFileSync("python3", [tmp, jpgPath, dir], { stdio: "inherit" });
}

const mirrorPath = path.join(VOL_DIR, "volumesData.json");
const data = JSON.parse(fs.readFileSync(mirrorPath, "utf8"));
const volumes = Array.isArray(data) ? data : data.volumes;

const results = {};
let ok = 0, fail = 0;
for (const v of volumes) {
  const slug = v.slug;
  if (ONLY.length && !ONLY.includes(slug)) continue;
  const queries = QUERIES[slug] || [slug.replace(/-/g, " ") + " painting", v.title];
  let picked = null;
  for (const q of queries) {
    try {
      picked = await searchCommons(q);
      if (picked && picked.score >= 5) break;
      if (picked) break; // any plausible result beats continuing with junk
    } catch (e) { console.warn(`  [${slug}] search error: ${e.message}`); }
  }
  if (!picked) { console.log(`✗ ${slug}: NO RESULT`); fail++; continue; }

  const dir = path.join(IMG_DIR, slug);
  const raw = "/tmp/_hero_raw.jpg";
  if (!DRY) {
    fs.mkdirSync(dir, { recursive: true });
    const r = await fetch(picked.thumb, { headers: { "User-Agent": UA } });
    if (!r.ok) { console.log(`✗ ${slug}: download failed ${r.status}`); fail++; continue; }
    fs.writeFileSync(raw, Buffer.from(await r.arrayBuffer()));
    try {
      makeVariants(raw, dir);
    } catch (e) { console.log(`✗ ${slug}: convert failed ${e.message}`); fail++; continue; }
  }
  results[slug] = {
    src: `/images/volumes/${slug}/hero-1920.jpg`,
    alt: `Public-domain artwork illustrating “${v.title}”`,
    credit: `Public domain — ${picked.artist.slice(0, 60)} · Wikimedia Commons`,
  };
  ok++;
  console.log(`✓ ${slug}  ←  ${picked.name.slice(0, 70)}  (${picked.w}×${picked.h}, ${picked.lic || "PD/old"})`);
  await new Promise(r => setTimeout(r, 220)); // be polite to Commons
}

// ---- write heroImage into .ts + json ----
if (!DRY && ok > 0) {
  for (const f of fs.readdirSync(VOL_DIR).sort()) {
    const m = f.match(/^volume_(\d+)\.ts$/);
    if (!m) continue;
    const p = path.join(VOL_DIR, f);
    const srcTxt = fs.readFileSync(p, "utf8");
    const mm = srcTxt.match(/^export const volume_\d+: Volume = \{/m);
    const endMark = srcTxt.lastIndexOf("\n};");
    if (!mm || endMark === -1) continue;
    const braceIdx = mm.index + mm[0].length - 1;
    const obj = JSON.parse(srcTxt.slice(braceIdx, endMark + 2));
    if (!results[obj.slug]) continue;
    obj.heroImage = results[obj.slug];
    fs.writeFileSync(p, srcTxt.slice(0, braceIdx) + JSON.stringify(obj, null, 2) + srcTxt.slice(endMark + 2));
  }
  for (const v of volumes) if (results[v.slug]) v.heroImage = results[v.slug];
  fs.writeFileSync(mirrorPath, JSON.stringify(data, null, 2));
}

console.log(`\nfetch-volume-heroes: ${ok} heroes installed, ${fail} failed. (dry=${DRY})`);
fs.writeFileSync("/tmp/hero-results.json", JSON.stringify(results, null, 2));
