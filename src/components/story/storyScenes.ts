// Painted scene thumbnails for story cards. Each story's SceneGlyph (from
// sceneForStory) resolves to one original painting in public/images/stories/scenes/.
// Volumes whose glyphs are covered automatically get thumbnails; others keep medallions.
const PAINTED = new Set([
  'altar','book','creation','fire','flood','garden','scroll','sheaves','tower','tree'
]);
export function sceneImageFor(glyph: string): string | null {
  return PAINTED.has(glyph) ? `/images/stories/scenes/${glyph}.webp` : null;
}
