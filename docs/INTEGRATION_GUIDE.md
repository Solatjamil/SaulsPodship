# INTEGRATION GUIDE — Saul's Podship Encyclopedia (50 Volumes, Frozen)

This guide reflects the **live site as of 6 Sep 2026**, using the per-volume data model (`slug`, `number`, `lastUpdated`, `heroImage`, `cardImage`, `metaDescription`, `summary`, `keyFacts`, `faq`, `youtubeStatus`, `relatedVolumes`, `category`).

## 1. The volume list is FROZEN at 50
See `docs/SEQUENCE_50.md`. Alphabetical by title, "1-Year Sermon Guide" last. Volume number = array index + 1.
**Never add, remove, rename or reorder a volume without the owner's explicit instruction. Never invent topics.**

## 2. Three supplied data files replace what is live

| Live # | Slug | Purpose |
|---|---|---|
| 22 | `guide-to-christian-living` | Expanded sections: How to Pray, Herbs & Medicine in the Bible, Everyday Laws, A Biblical Day, Model Prayers (~2,900 words, 7 tables, 8 panels). |
| 44 | `the-five-offerings-of-leviticus` | Expanded: 4 tables, 5 panels, from the owner's article. |
| 47 | `types-of-bad-spirits-in-the-bible` | Expanded: 4 tables (20 named spirits, 8 ranks, replacement principle, methods), 6 panels. |

## 3. Links — Restored from `docs/LINK_RESTORE.md`
- 45 volumes get their original, verified `articleLink` + `youtubeLink` (all videos `youtubeStatus: "scheduled"` until the oEmbed build check flips them).
- `apologetics-40-critical-questions` (#05) → no links, by design. UI hides the buttons.
- The 4 new volumes (#30, #36, #44, #47) → no links until the owner supplies them. Do not invent.

## 4. URLs — see `docs/URL_MAP_50.md`
- Canonical = `/encyclopedia/<slug>`. Two live slugs deviate from the slug rule (#30, #34) — keep the live ones, 301 the rule-generated variants.
- `/encyclopedia/<NN>` → 301 to slug. `/Pakistanisingersarchive` → 301 to `/music/pakistani-singers-archive`.

## 5. Hero images — see `docs/HERO_IMAGE_PLAN.md` and `docs/PHASE_10_HERO_BANNERS.md`
- Homepage: Last Supper, complete painting visible on mobile (letter-boxed 1080×1920 portrait file).
- Volumes: same `<Hero>` component, same full-bleed height as the homepage.
- `credit` describes the file actually served.
