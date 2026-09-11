/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AUTHORITATIVE RECORD — Verified Links for all 50 Volumes (FROZEN 2026-09-06)
 * - Apologetics (#05) has no links by design.
 * - The 4 new volumes (#30, #36, #44, #47) have no published article or video yet.
 * - All YouTube videos are currently scheduled/unlisted.
 */

export interface VolumeLinkRecord {
  articleLink?: string;
  youtubeLink?: string;
  youtubeStatus?: 'scheduled' | 'live';
}

export const VERIFIED_LINKS: Record<string, VolumeLinkRecord> = {
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
  "kings-of-the-bible": { articleLink: "https://www.saulspodship.com/kings-of-the-bible", youtubeStatus: "scheduled" },  // #51 — interactive module, added 2026-09-11
};
