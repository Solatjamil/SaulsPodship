# PHASE 10 — Hero Banners: Last Supper on the Homepage, and Full-Size Matching Heroes on Every Volume Page

## 10.1 Shared `<Hero>` component — one component, two variants

Build a single `src/components/Hero.tsx` used by **both** the homepage (`variant="home"`) and every volume page (`variant="volume"`). Same dimensions, same overlay, same behaviour — only the content slot differs.

**Dimensions (identical for both variants):**
```css
.hero        { position:relative; width:100%; overflow:hidden; }
/* Desktop ≥1024px */
.hero        { min-height: 100svh; }             /* full viewport, like the current home hero */
/* Tablet 640–1023px */
.hero        { min-height: 80svh; }
/* Mobile <640px */
.hero        { min-height: 100svh; }             /* full screen so the whole painting fits */
```

- Content block: `absolute inset-0 flex items-end md:items-center` — bottom-aligned on mobile, centred on desktop.
- Reserve a safe area at the bottom on mobile for the "scroll" hint / progress bar: `pb-[max(2rem,env(safe-area-inset-bottom))]`.

## 10.2 Homepage: The Last Supper visible in full on mobile
- Source file: Leonardo da Vinci, *The Last Supper* (c. 1495–98), Santa Maria delle Grazie, Milan — public domain.
- `last-supper-portrait.webp` — 1080 × 1920 canvas containing the entire uncropped painting, letter-boxed with blurred darkened padding.
- Credit line: *Leonardo da Vinci, The Last Supper (c. 1495–98), Santa Maria delle Grazie, Milan — public domain.*

## 10.3 Volume Pages: Same Hero, Same Size
- Full-bleed hero banner matching homepage height.
- Content slot: Breadcrumbs, volume pill, h1 title, subtitle, meta row, action buttons (`Start Reading`, `Read Article`, `Watch Video`).
- Sticky study toolbar under the hero.
- Credits matching artwork.
