# Comparative Apologetics Codex — install package for saulspodship.com

This folder is a **drop-in add-on** for the Saul's Podship Vite + React + Tailwind
site (React Router `createHashRouter`, lucide-react icons, wine `#4A152C` /
gold `#E8C96A` / cream `#F8F4E3` palette).

It adds a **fifth pillar** — "400 Comparative Questions" — to the
*Four Pillars of Saul's Podship Scriptorium* section on the home page, plus a
new route `/comparative-apologetics` that hosts the complete interactive codex
(100 questions each on Islam, Judaism, Hinduism, Sikhism).

## What the agent must do (summary — full steps in `.agent/workflows/`)

1. Copy `public/comparative-apologetics/` → project `public/` (static codex HTML, ~1.5 MB).
2. Copy `src/components/pillars/ComparativeApologeticsPillar.jsx`,
   `src/pages/ComparativeApologeticsPage.jsx`,
   `src/data/comparativeApologeticsIndex.json` into the same paths in the project.
3. Register the route `{ path: "comparative-apologetics", element: <ComparativeApologeticsPage /> }`
   in the router **before** the `path: "*"` 404 route.
4. On the home page, insert `<ComparativeApologeticsPillar />` as the **5th card** of the
   pillar grid, directly after the "Tough Questions" card, and change
   `lg:grid-cols-4` → `lg:grid-cols-5` (or `xl:grid-cols-5 lg:grid-cols-3`).
5. Update the section intro text to read "Five Pillars of Saul's Podship Scriptorium".
6. Add `/comparative-apologetics` to the Sitemap page and `sitemap.xml` (if present).
7. Run `npm run build` and confirm `dist/comparative-apologetics/index.html` exists.

## Hard rules

- **Do not** edit, minify, re-format, or "clean up" `public/comparative-apologetics/index.html`.
  It is a verified, self-contained document: 400 `article.qcard` elements with stable IDs
  (`q-islam-1` … `q-sikhism-100`), its own CSS/JS toolbar, and tested behaviour.
  Any change there must go through `scripts/verify-codex.mjs` and pass 400/400.
- **Do not** import the codex HTML into the React bundle. It is served as a static asset
  and embedded via `<iframe>` — this is intentional (bundle size, style isolation).
- **Do not** rename the route slug `comparative-apologetics`; `canonical`, JSON-LD and
  deep links (`?q=q-islam-83`, `?rel=hinduism`) depend on it.
- Match the existing pillar card markup exactly (same Tailwind classes) so the fifth card
  is visually identical to the other four. Do not introduce new colours.
- Keep the existing four pillars, their links, and their copy unchanged.
- Preserve `createHashRouter`; do not switch to `createBrowserRouter`.

## Verify before finishing

```bash
node scripts/verify-codex.mjs      # 400 cards, 4×100, unique IDs, toolbar present
npm run build
ls dist/comparative-apologetics/index.html
```
Then open `/#/comparative-apologetics`, click a religion chip (it filters **and**
scrolls to that section), click a question title (it expands), and change the sort to
"Most asked in Pakistan & India".
