import fs from 'fs';
import path from 'path';

const fileContent = fs.readFileSync(path.join(process.cwd(), 'public/singers.html'), 'utf8');

// A basic regex or manual block extractor for card divs
// Each card starts with <div class="card ..."> and ends with </div> (with nested divs)
// Let's split or scan the file contents to find the cards
const cards: any[] = [];
const cardRegex = /<div class="card\s+([^"]+)"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;

let match;
while ((match = cardRegex.exec(fileContent)) !== null) {
  const classes = match[1];
  const innerHtml = match[2];

  // Extract name
  const nameMatch = innerHtml.match(/<div class="card-name">([^<]+)<\/div>/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  // Extract also
  const alsoMatch = innerHtml.match(/<div class="card-also">([^<]+)<\/div>/);
  const also = alsoMatch ? alsoMatch[1].trim() : '';

  // Extract role
  const roleMatch = innerHtml.match(/<div class="card-role">([^<]+)<\/div>/);
  const role = roleMatch ? roleMatch[1].trim() : '';

  // Extract dates
  const datesMatch = innerHtml.match(/<div class="card-dates">([^<]+)<\/div>/);
  const dates = datesMatch ? datesMatch[1].trim() : '';

  // Extract bio
  const bioMatch = innerHtml.match(/<div class="card-bio">([\s\S]*?)<\/div>/);
  const bio = bioMatch ? bioMatch[1].trim() : '';

  // Extract badge
  const badgeMatch = innerHtml.match(/<div class="card-badge[^"]*">([^<]+)<\/div>/);
  const badge = badgeMatch ? badgeMatch[1].trim() : '';

  // Extract links
  const links: Record<string, string> = {};
  const linkRegex = /<a class="link-btn\s+([^"]+)" href="([^"]+)"/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(innerHtml)) !== null) {
    const type = linkMatch[1].replace('link-', '').trim();
    links[type] = linkMatch[2];
  }

  // Create slug ID
  const id = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-'); // replace spaces with hyphens

  if (name) {
    cards.push({
      id,
      name,
      also,
      role,
      dates,
      bio,
      badge,
      links,
      classes
    });
  }
}

console.log('Total artists extracted:', cards.length);
if (cards.length > 0) {
  console.log('Sample artist:', JSON.stringify(cards[0], null, 2));
}
fs.writeFileSync('extracted_artists.json', JSON.stringify(cards, null, 2), 'utf8');
