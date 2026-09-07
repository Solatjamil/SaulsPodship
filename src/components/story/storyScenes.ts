// Story artwork resolution. Preferred: unique per-story painting in
// public/images/stories/vol1/<id>.webp (VOL1_PAINTED). Fallback: shared scene
// painting by glyph in public/images/stories/scenes/<glyph>.webp.
const VOL1_PAINTED = new Set(['2','3','4','5','6','14','15','16','17',
  '18','19','23','25','29','44','47','76']); // 13, 73, 74 next
const PAINTED = new Set([
  'altar','book','bread','city','creation','cross','crown','dove','fish','fire','flood',
  'garden','ladder','lions','manger','scale','scroll','sea','serpent','sheaves','shepherd','well',
  'sword','tablets','temple','tomb','tower','tree','walls','whirlwind','keys','ship'
]);
export function storyArt(id?: string): string | null {
  return id && VOL1_PAINTED.has(id) ? `/images/stories/vol1/${id}.webp` : null;
}
export function sceneImageFor(glyph: string): string | null {
  return PAINTED.has(glyph) ? `/images/stories/scenes/${glyph}.webp` : null;
}