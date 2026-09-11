# LINK RESTORE — Verified Links for all 50 Volumes (FROZEN 2026-09-06)

All `articleLink` values below returned **HTTP 200** on 2026-09-06.

Rules:
- Never generate or guess a blog URL or YouTube ID. If none exists, **omit the field** — the UI hides the button.
- All YouTube videos are currently **scheduled/unlisted** → `youtubeStatus: "scheduled"`; the build-time oEmbed check flips them to `live` automatically.
- Apologetics (#05) has no links **by design**.
- The 4 new volumes have **no published article or video yet** → leave both fields undefined until the owner supplies them.
- Add a build step that fails if any `articleLink` does not return 200.

```ts
export const VERIFIED_LINKS: Record<string, { articleLink?: string; youtubeLink?: string; youtubeStatus?: "scheduled" | "live" }> = {
  "all-bible-stories": { articleLink: "https://goshsays.blogspot.com/2025/12/complete-guide-to-all-bible-stories.html", youtubeLink: "https://youtu.be/7t2Tjo9F_mg", youtubeStatus: "scheduled" },  // #01
  "all-biblical-numerology": { articleLink: "https://goshsays.blogspot.com/2025/12/biblical-numerology-complete-guide-to.html", youtubeLink: "https://youtu.be/Zxviz5oWULY", youtubeStatus: "scheduled" },  // #02
  "all-big-denominations-their-differences": { articleLink: "https://goshsays.blogspot.com/2025/12/christian-denominations-explained.html", youtubeLink: "https://youtu.be/mm0xDEaqytM", youtubeStatus: "scheduled" },  // #03
  "angels-demons-beasts-monsters-in-the-bible": { articleLink: "https://goshsays.blogspot.com/2025/12/angels-demons-beasts-monsters-in-bible.html", youtubeLink: "https://youtu.be/HSI84sTSkKY", youtubeStatus: "scheduled" },  // #04
  "apologetics-40-critical-questions": {},  // #05 — no links by design
  "apostles-creed": { articleLink: "https://goshsays.blogspot.com/2026/01/the-apostles-creed-explained-complete.html", youtubeLink: "https://youtu.be/aVChHWZMaXU", youtubeStatus: "scheduled" },  // #06
  "ark-of-covenant-and-other-biblical-relics": { articleLink: "https://goshsays.blogspot.com/2026/01/the-ark-of-covenant-and-biblical-relics.html", youtubeLink: "https://youtu.be/ia4S7n60tDo", youtubeStatus: "scheduled" },  // #07
  "baptism-sacraments-circumcision": { articleLink: "https://goshsays.blogspot.com/2026/01/baptism-sacraments-and-circumcision.html", youtubeLink: "https://youtu.be/taqcHYihXxY", youtubeStatus: "scheduled" },  // #08
  "bible-book-writers": { articleLink: "https://goshsays.blogspot.com/2026/01/who-wrote-bible-complete-guide-to.html", youtubeLink: "https://youtu.be/X7MUFv5W3OQ", youtubeStatus: "scheduled" },  // #09
  "biblical-creation-vs-scientific-creation": { articleLink: "https://goshsays.blogspot.com/2026/01/biblical-creation-vs-scientific.html", youtubeLink: "https://youtu.be/7aNfDPGh7GI", youtubeStatus: "scheduled" },  // #10
  "biblical-maps": { articleLink: "https://goshsays.blogspot.com/2026/01/biblical-maps-complete-atlas-of-bible.html", youtubeLink: "https://youtu.be/3SMPMEaRgRk", youtubeStatus: "scheduled" },  // #11
  "book-of-revelation": { articleLink: "https://goshsays.blogspot.com/2026/01/the-book-of-revelation-complete-guide.html", youtubeLink: "https://youtu.be/V_KqCj2EfFE", youtubeStatus: "scheduled" },  // #12
  "christianity-in-south-asia-india-pakistan": { articleLink: "https://goshsays.blogspot.com/2026/01/christianity-in-south-asia-complete.html", youtubeLink: "https://youtu.be/r0SqSP1WHlk", youtubeStatus: "scheduled" },  // #13
  "christmas-history": { articleLink: "https://goshsays.blogspot.com/2026/01/the-complete-history-of-christmas-from.html", youtubeLink: "https://youtu.be/UgcFfykVKGo", youtubeStatus: "scheduled" },  // #14
  "comparative-religion": { articleLink: "https://goshsays.blogspot.com/2026/01/comparative-religion-christianity-and.html", youtubeLink: "https://youtu.be/4bd_5F4mEvU", youtubeStatus: "scheduled" },  // #15
  "complete-christian-theology-map": { articleLink: "https://goshsays.blogspot.com/2026/01/complete-christian-theology-map-how.html", youtubeLink: "https://youtu.be/P3fhIF-XPlU", youtubeStatus: "scheduled" },  // #16
  "crusades-historical-theological-analysis": { articleLink: "https://goshsays.blogspot.com/2026/01/the-crusades-complete-historical-and.html", youtubeLink: "https://youtu.be/aiJTZJJkANQ", youtubeStatus: "scheduled" },  // #17
  "early-church-fathers-councils": { articleLink: "https://goshsays.blogspot.com/2026/01/early-church-fathers-and-councils.html", youtubeLink: "https://youtu.be/TXYX1Qo9LPw", youtubeStatus: "scheduled" },  // #18
  "easter-resurrection": { articleLink: "https://goshsays.blogspot.com/2026/01/easter-and-resurrection-cornerstone-of.html", youtubeLink: "https://youtu.be/ACJuPSQXaAA", youtubeStatus: "scheduled" },  // #19
  "family-tree-adam-jesus": { articleLink: "https://goshsays.blogspot.com/2026/01/the-family-tree-adam-to-jesus-complete.html", youtubeLink: "https://youtu.be/Wn_xVTslokI", youtubeStatus: "scheduled" },  // #20
  "forbidden-knowledge-the-watchers": { articleLink: "https://goshsays.blogspot.com/2026/01/forbidden-knowledge-and-watchers-yoga.html", youtubeLink: "https://youtu.be/j4OztR50EFo", youtubeStatus: "scheduled" },  // #21
  "guide-to-christian-living": { articleLink: "https://goshsays.blogspot.com/2026/01/the-complete-guide-to-christian-living.html", youtubeLink: "https://youtu.be/Jl4Y2q_tz5M", youtubeStatus: "scheduled" },  // #22
  "heaven-hell": { articleLink: "https://goshsays.blogspot.com/2026/01/heaven-and-hell-what-bible-actually.html", youtubeLink: "https://youtu.be/UBpKg_FzxUA", youtubeStatus: "scheduled" },  // #23
  "history-of-all-12-disciples": { articleLink: "https://goshsays.blogspot.com/2026/01/history-of-all-12-disciples-of-jesus.html", youtubeLink: "https://youtu.be/cATmSWOuhkI", youtubeStatus: "scheduled" },  // #24
  "holy-communion": { articleLink: "https://goshsays.blogspot.com/2026/01/holy-communion-lords-supper-eucharist.html", youtubeLink: "https://youtu.be/6ZCczLKiQsg", youtubeStatus: "scheduled" },  // #25
  "how-the-world-populated-after-abels-death": { articleLink: "https://goshsays.blogspot.com/2026/01/how-world-populated-after-abels-death.html", youtubeLink: "https://youtu.be/tD6Ww_A8WKc", youtubeStatus: "scheduled" },  // #26
  "jesus-is-god-full-references-ot-nt": { articleLink: "https://goshsays.blogspot.com/2026/01/jesus-is-god-complete-biblical-proof.html", youtubeLink: "https://youtu.be/-wd2WvFWZ64", youtubeStatus: "scheduled" },  // #27
  "lords-prayer": { articleLink: "https://goshsays.blogspot.com/2026/01/the-lords-prayer-how-jesus-taught-us-to.html", youtubeLink: "https://youtu.be/NJ0dlR3b8_I", youtubeStatus: "scheduled" },  // #28
  "messianic-prophecies": { articleLink: "https://goshsays.blogspot.com/2026/01/messianic-prophecies-every-major-old.html", youtubeLink: "https://youtu.be/wrwXpxvtEZk", youtubeStatus: "scheduled" },  // #29
  "miracles-of-jesus-and-the-apostles-complete-catalogue": {},  // #30 — NEW: no real article/video yet, do NOT invent
  "names-of-god": { articleLink: "https://goshsays.blogspot.com/2026/01/names-of-god.html", youtubeLink: "https://youtu.be/GIg4Gnu_vmU", youtubeStatus: "scheduled" },  // #31
  "names-of-jesus": { articleLink: "https://goshsays.blogspot.com/2026/01/names-of-jesus.html", youtubeLink: "https://youtu.be/DgItXgDjaxQ", youtubeStatus: "scheduled" },  // #32
  "non-canonical-books-canon-differences": { articleLink: "https://goshsays.blogspot.com/2026/01/non-canonical-books-canon-differences.html", youtubeLink: "https://youtu.be/TWrDuESFdZM", youtubeStatus: "scheduled" },  // #33
  "not-biblical-quotes-sayings": { articleLink: "https://goshsays.blogspot.com/2026/01/not-biblical-quotes-or-sayings.html", youtubeLink: "https://youtu.be/I10u7W_RR80", youtubeStatus: "scheduled" },  // #34
  "original-scripture-languages": { articleLink: "https://goshsays.blogspot.com/2026/01/original-scripture-languages.html", youtubeLink: "https://youtu.be/GYs7nNqhMyE", youtubeStatus: "scheduled" },  // #35
  "parables-of-jesus-all-40-explained": {},  // #36 — NEW: no real article/video yet, do NOT invent
  "primeval-world-timeline-ancient-civilizations": { articleLink: "https://goshsays.blogspot.com/2026/01/primeval-world-timeline-ancient.html", youtubeLink: "https://youtu.be/VCHTenxDW7M", youtubeStatus: "scheduled" },  // #37
  "psalm-authors": { articleLink: "https://goshsays.blogspot.com/2026/01/psalm-authors.html", youtubeLink: "https://youtu.be/KB6VxCOxTis", youtubeStatus: "scheduled" },  // #38
  "revelation-judgments-timeline": { articleLink: "https://goshsays.blogspot.com/2026/01/revelation-judgments-timeline.html", youtubeLink: "https://youtu.be/A3VyKZHvixs", youtubeStatus: "scheduled" },  // #39
  "sermon-on-the-mount": { articleLink: "https://goshsays.blogspot.com/2026/02/sermon-on-mount.html", youtubeLink: "https://youtu.be/MXxdip2DTiE", youtubeStatus: "scheduled" },  // #40
  "seven-last-words-of-jesus": { articleLink: "https://goshsays.blogspot.com/2026/02/seven-last-words-of-jesus.html", youtubeLink: "https://youtu.be/iF13Hc6ko-4", youtubeStatus: "scheduled" },  // #41
  "systematic-theology-subjects": { articleLink: "https://goshsays.blogspot.com/2026/02/systematic-theology-subjects.html", youtubeLink: "https://youtu.be/-wTgR27MHZs", youtubeStatus: "scheduled" },  // #42
  "ten-commandments-ot-laws": { articleLink: "https://goshsays.blogspot.com/2026/02/ten-commandments-old-testament-laws.html", youtubeLink: "https://youtu.be/17CxbRLDFho", youtubeStatus: "scheduled" },  // #43
  "the-five-offerings-of-leviticus": {},  // #44 — NEW: no real article/video yet, do NOT invent
  "the-magi": { articleLink: "https://goshsays.blogspot.com/2026/02/the-magi-wise-men-from-east.html", youtubeLink: "https://youtu.be/HXQyd1sk7SY", youtubeStatus: "scheduled" },  // #45
  "true-worship-vs-false-worship": { articleLink: "https://goshsays.blogspot.com/2026/02/true-worship-vs-false-worship.html", youtubeLink: "https://youtu.be/T9Ft6bHDJjg", youtubeStatus: "scheduled" },  // #46
  "types-of-bad-spirits-in-the-bible": {},  // #47 — NEW: no real article/video yet, do NOT invent
  "vatican-and-its-history": { articleLink: "https://goshsays.blogspot.com/2026/02/vatican-its-history.html", youtubeLink: "https://youtu.be/pDeMBdYmxCA", youtubeStatus: "scheduled" },  // #48
  "worlds-all-big-churches": { articleLink: "https://goshsays.blogspot.com/2026/02/worlds-all-big-churches.html", youtubeLink: "https://youtu.be/htbG7okSD54", youtubeStatus: "scheduled" },  // #49
  "1-year-sermon-guide-52-gen-z-topics": { articleLink: "https://goshsays.blogspot.com/2026/02/1-year-sermon-guide-52-gen-z-topics.html", youtubeLink: "https://youtu.be/lV4eQ_BrUU4", youtubeStatus: "scheduled" },  // #50
};
```

## Verification Table

| # | Slug | Article | YouTube |
|---|---|---|---|
| 01 | `all-bible-stories` | https://goshsays.blogspot.com/2025/12/complete-guide-to-all-bible-stories.html | https://youtu.be/7t2Tjo9F_mg |
| 02 | `all-biblical-numerology` | https://goshsays.blogspot.com/2025/12/biblical-numerology-complete-guide-to.html | https://youtu.be/Zxviz5oWULY |
| 03 | `all-big-denominations-their-differences` | https://goshsays.blogspot.com/2025/12/christian-denominations-explained.html | https://youtu.be/mm0xDEaqytM |
| 04 | `angels-demons-beasts-monsters-in-the-bible` | https://goshsays.blogspot.com/2025/12/angels-demons-beasts-monsters-in-bible.html | https://youtu.be/HSI84sTSkKY |
| 05 | `apologetics-40-critical-questions` | — | — |
| 06 | `apostles-creed` | https://goshsays.blogspot.com/2026/01/the-apostles-creed-explained-complete.html | https://youtu.be/aVChHWZMaXU |
| 07 | `ark-of-covenant-and-other-biblical-relics` | https://goshsays.blogspot.com/2026/01/the-ark-of-covenant-and-biblical-relics.html | https://youtu.be/ia4S7n60tDo |
| 08 | `baptism-sacraments-circumcision` | https://goshsays.blogspot.com/2026/01/baptism-sacraments-and-circumcision.html | https://youtu.be/taqcHYihXxY |
| 09 | `bible-book-writers` | https://goshsays.blogspot.com/2026/01/who-wrote-bible-complete-guide-to.html | https://youtu.be/X7MUFv5W3OQ |
| 10 | `biblical-creation-vs-scientific-creation` | https://goshsays.blogspot.com/2026/01/biblical-creation-vs-scientific.html | https://youtu.be/7aNfDPGh7GI |
| 11 | `biblical-maps` | https://goshsays.blogspot.com/2026/01/biblical-maps-complete-atlas-of-bible.html | https://youtu.be/3SMPMEaRgRk |
| 12 | `book-of-revelation` | https://goshsays.blogspot.com/2026/01/the-book-of-revelation-complete-guide.html | https://youtu.be/V_KqCj2EfFE |
| 13 | `christianity-in-south-asia-india-pakistan` | https://goshsays.blogspot.com/2026/01/christianity-in-south-asia-complete.html | https://youtu.be/r0SqSP1WHlk |
| 14 | `christmas-history` | https://goshsays.blogspot.com/2026/01/the-complete-history-of-christmas-from.html | https://youtu.be/UgcFfykVKGo |
| 15 | `comparative-religion` | https://goshsays.blogspot.com/2026/01/comparative-religion-christianity-and.html | https://youtu.be/4bd_5F4mEvU |
| 16 | `complete-christian-theology-map` | https://goshsays.blogspot.com/2026/01/complete-christian-theology-map-how.html | https://youtu.be/P3fhIF-XPlU |
| 17 | `crusades-historical-theological-analysis` | https://goshsays.blogspot.com/2026/01/the-crusades-complete-historical-and.html | https://youtu.be/aiJTZJJkANQ |
| 18 | `early-church-fathers-councils` | https://goshsays.blogspot.com/2026/01/early-church-fathers-and-councils.html | https://youtu.be/TXYX1Qo9LPw |
| 19 | `easter-resurrection` | https://goshsays.blogspot.com/2026/01/easter-and-resurrection-cornerstone-of.html | https://youtu.be/ACJuPSQXaAA |
| 20 | `family-tree-adam-jesus` | https://goshsays.blogspot.com/2026/01/the-family-tree-adam-to-jesus-complete.html | https://youtu.be/Wn_xVTslokI |
| 21 | `forbidden-knowledge-the-watchers` | https://goshsays.blogspot.com/2026/01/forbidden-knowledge-and-watchers-yoga.html | https://youtu.be/j4OztR50EFo |
| 22 | `guide-to-christian-living` | https://goshsays.blogspot.com/2026/01/the-complete-guide-to-christian-living.html | https://youtu.be/Jl4Y2q_tz5M |
| 23 | `heaven-hell` | https://goshsays.blogspot.com/2026/01/heaven-and-hell-what-bible-actually.html | https://youtu.be/UBpKg_FzxUA |
| 24 | `history-of-all-12-disciples` | https://goshsays.blogspot.com/2026/01/history-of-all-12-disciples-of-jesus.html | https://youtu.be/cATmSWOuhkI |
| 25 | `holy-communion` | https://goshsays.blogspot.com/2026/01/holy-communion-lords-supper-eucharist.html | https://youtu.be/6ZCczLKiQsg |
| 26 | `how-the-world-populated-after-abels-death` | https://goshsays.blogspot.com/2026/01/how-world-populated-after-abels-death.html | https://youtu.be/tD6Ww_A8WKc |
| 27 | `jesus-is-god-full-references-ot-nt` | https://goshsays.blogspot.com/2026/01/jesus-is-god-complete-biblical-proof.html | https://youtu.be/-wd2WvFWZ64 |
| 28 | `lords-prayer` | https://goshsays.blogspot.com/2026/01/the-lords-prayer-how-jesus-taught-us-to.html | https://youtu.be/NJ0dlR3b8_I |
| 29 | `messianic-prophecies` | https://goshsays.blogspot.com/2026/01/messianic-prophecies-every-major-old.html | https://youtu.be/wrwXpxvtEZk |
| 30 | `miracles-of-jesus-and-the-apostles-complete-catalogue` | — | — |
| 31 | `names-of-god` | https://goshsays.blogspot.com/2026/01/names-of-god.html | https://youtu.be/GIg4Gnu_vmU |
| 32 | `names-of-jesus` | https://goshsays.blogspot.com/2026/01/names-of-jesus.html | https://youtu.be/DgItXgDjaxQ |
| 33 | `non-canonical-books-canon-differences` | https://goshsays.blogspot.com/2026/01/non-canonical-books-canon-differences.html | https://youtu.be/TWrDuESFdZM |
| 34 | `not-biblical-quotes-sayings` | https://goshsays.blogspot.com/2026/01/not-biblical-quotes-or-sayings.html | https://youtu.be/I10u7W_RR80 |
| 35 | `original-scripture-languages` | https://goshsays.blogspot.com/2026/01/original-scripture-languages.html | https://youtu.be/GYs7nNqhMyE |
| 36 | `parables-of-jesus-all-40-explained` | — | — |
| 37 | `primeval-world-timeline-ancient-civilizations` | https://goshsays.blogspot.com/2026/01/primeval-world-timeline-ancient.html | https://youtu.be/VCHTenxDW7M |
| 38 | `psalm-authors` | https://goshsays.blogspot.com/2026/01/psalm-authors.html | https://youtu.be/KB6VxCOxTis |
| 39 | `revelation-judgments-timeline` | https://goshsays.blogspot.com/2026/01/revelation-judgments-timeline.html | https://youtu.be/A3VyKZHvixs |
| 40 | `sermon-on-the-mount` | https://goshsays.blogspot.com/2026/02/sermon-on-mount.html | https://youtu.be/MXxdip2DTiE |
| 41 | `seven-last-words-of-jesus` | https://goshsays.blogspot.com/2026/02/seven-last-words-of-jesus.html | https://youtu.be/iF13Hc6ko-4 |
| 42 | `systematic-theology-subjects` | https://goshsays.blogspot.com/2026/02/systematic-theology-subjects.html | https://youtu.be/-wTgR27MHZs |
| 43 | `ten-commandments-ot-laws` | https://goshsays.blogspot.com/2026/02/ten-commandments-old-testament-laws.html | https://youtu.be/17CxbRLDFho |
| 44 | `the-five-offerings-of-leviticus` | — | — |
| 45 | `the-magi` | https://goshsays.blogspot.com/2026/02/the-magi-wise-men-from-east.html | https://youtu.be/HXQyd1sk7SY |
| 46 | `true-worship-vs-false-worship` | https://goshsays.blogspot.com/2026/02/true-worship-vs-false-worship.html | https://youtu.be/T9Ft6bHDJjg |
| 47 | `types-of-bad-spirits-in-the-bible` | — | — |
| 48 | `vatican-and-its-history` | https://goshsays.blogspot.com/2026/02/vatican-its-history.html | https://youtu.be/pDeMBdYmxCA |
| 49 | `worlds-all-big-churches` | https://goshsays.blogspot.com/2026/02/worlds-all-big-churches.html | https://youtu.be/htbG7okSD54 |
| 50 | `1-year-sermon-guide-52-gen-z-topics` | https://goshsays.blogspot.com/2026/02/1-year-sermon-guide-52-gen-z-topics.html | https://youtu.be/lV4eQ_BrUU4 |
