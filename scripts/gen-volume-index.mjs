/**
 * Generates src/data/volumes/volumeIndex.json — the lightweight catalogue
 * (title, slug, images, category, table count…) used by the home page,
 * encyclopedia index and sitemap. The full volume bodies (~1.5 MB) are only
 * loaded on /encyclopedia/:slug via a dynamic import.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/data/volumes');
const files = fs.readdirSync(dir).filter(f => /^volume_\d+\.ts$/.test(f)).sort();

const out = [];
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  // Each volume file is `export const volume_NN: Volume = { ...JSON... };`
  const start = src.indexOf('= {');
  const end = src.lastIndexOf('};');
  const json = JSON.parse(src.slice(start + 2, end + 1));
  out.push({
    id: json.id, number: json.number, slug: json.slug, title: json.title, subtitle: json.subtitle,
    overview: json.overview, summary: json.summary, category: json.category, lastUpdated: json.lastUpdated,
    heroImage: json.heroImage, cardImage: json.cardImage, keywords: json.keywords,
    articleLink: json.articleLink, youtubeLink: json.youtubeLink, youtubeStatus: json.youtubeStatus,
    featured: json.featured, tableCount: (json.content && json.content.tables ? json.content.tables.length : 0),
    faqCount: Array.isArray(json.faq) ? json.faq.length : 0
  });
}
out.sort((a, b) => a.number - b.number);
const target = path.join(dir, 'volumeIndex.json');
const next = JSON.stringify(out);
if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== next) {
  fs.writeFileSync(target, next);
  console.log(`[VOLUME INDEX] wrote ${out.length} entries → src/data/volumes/volumeIndex.json`);
} else {
  console.log(`[VOLUME INDEX] up to date (${out.length} volumes)`);
}
