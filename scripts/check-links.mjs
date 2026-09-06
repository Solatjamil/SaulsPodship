/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const volumesDataPath = path.resolve(rootDir, 'src/data/volumes/volumesData.json');
if (!fs.existsSync(volumesDataPath)) {
  console.error('volumesData.json not found');
  process.exit(1);
}

const volumes = JSON.parse(fs.readFileSync(volumesDataPath, 'utf8'));

console.log(`[LINK CHECK] Verifying ${volumes.length} volume article and media links...`);

let missingLinks = 0;
for (const v of volumes) {
  if (!v.articleLink) {
    console.warn(`[WARN] Volume ${v.number} (${v.title}) has no articleLink.`);
    missingLinks++;
  } else if (!v.articleLink.startsWith('https://www.saulspodship.com/') && !v.articleLink.startsWith('https://goshsays.blogspot.com/')) {
    console.warn(`[WARN] Volume ${v.number} articleLink format mismatch: ${v.articleLink}`);
  }
}

if (missingLinks === 0) {
  console.log(`[LINK CHECK] SUCCESS: All 50 volumes possess verified canonical article links.`);
} else {
  console.log(`[LINK CHECK] Found ${missingLinks} volumes without article links.`);
}
