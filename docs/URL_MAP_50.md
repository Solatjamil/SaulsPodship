# URL MAP — 50 Volume Pages (Canonical Specification)

Slug rule (already in code): `title.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-")`.
⚠️ **Two live slugs deviate from the rule — keep the live slugs (they are what's deployed/indexed) and 301 the rule-generated variant to them:**

| # | Live slug (canonical) | Rule would give → 301 to live |
|---|---|---|
| 30 | `miracles-of-jesus-and-the-apostles-complete-catalogue` | `miracles-of-jesus-the-apostles-complete-catalogue` |
| 34 | `not-biblical-quotes-sayings` | `not-biblical-quotes-or-sayings` (⚠ this was the slug in the *previous* deploy — must redirect) |

Canonical = slug URL. `/encyclopedia/<NN>` → 301 to slug. Never change a slug once published.

| # | Title | Canonical URL | Category |
|---|---|---|---|
| 01 | All Bible Stories | `https://www.saulspodship.com/encyclopedia/all-bible-stories` | reference |
| 02 | All Biblical Numerology | `https://www.saulspodship.com/encyclopedia/all-biblical-numerology` | reference |
| 03 | All Big Denominations & Their Differences | `https://www.saulspodship.com/encyclopedia/all-big-denominations-their-differences` | history |
| 04 | Angels, Demons, Beasts & Monsters in the Bible | `https://www.saulspodship.com/encyclopedia/angels-demons-beasts-monsters-in-the-bible` | scholarly |
| 05 | Apologetics: 40 Critical Questions | `https://www.saulspodship.com/encyclopedia/apologetics-40-critical-questions` | scholarly |
| 06 | Apostle's Creed | `https://www.saulspodship.com/encyclopedia/apostles-creed` | scholarly |
| 07 | Ark of Covenant and other Biblical Relics | `https://www.saulspodship.com/encyclopedia/ark-of-covenant-and-other-biblical-relics` | history |
| 08 | Baptism, Sacraments & Circumcision | `https://www.saulspodship.com/encyclopedia/baptism-sacraments-circumcision` | scholarly |
| 09 | Bible Book Writers | `https://www.saulspodship.com/encyclopedia/bible-book-writers` | reference |
| 10 | Biblical Creation vs Scientific Creation | `https://www.saulspodship.com/encyclopedia/biblical-creation-vs-scientific-creation` | scholarly |
| 11 | Biblical Maps | `https://www.saulspodship.com/encyclopedia/biblical-maps` | reference |
| 12 | Book of Revelation | `https://www.saulspodship.com/encyclopedia/book-of-revelation` | scholarly |
| 13 | Christianity in South Asia (India & Pakistan) | `https://www.saulspodship.com/encyclopedia/christianity-in-south-asia-india-pakistan` | history |
| 14 | Christmas History | `https://www.saulspodship.com/encyclopedia/christmas-history` | history |
| 15 | Comparative Religion | `https://www.saulspodship.com/encyclopedia/comparative-religion` | scholarly |
| 16 | Complete Christian Theology Map | `https://www.saulspodship.com/encyclopedia/complete-christian-theology-map` | scholarly |
| 17 | Crusades — Historical + Theological Analysis | `https://www.saulspodship.com/encyclopedia/crusades-historical-theological-analysis` | history |
| 18 | Early Church Fathers & Councils | `https://www.saulspodship.com/encyclopedia/early-church-fathers-councils` | history |
| 19 | Easter & Resurrection | `https://www.saulspodship.com/encyclopedia/easter-resurrection` | devotional |
| 20 | Family Tree: Adam → Jesus | `https://www.saulspodship.com/encyclopedia/family-tree-adam-jesus` | reference |
| 21 | Forbidden Knowledge & the Watchers | `https://www.saulspodship.com/encyclopedia/forbidden-knowledge-the-watchers` | scholarly |
| 22 | Guide to Christian Living | `https://www.saulspodship.com/encyclopedia/guide-to-christian-living` | devotional |
| 23 | Heaven & Hell | `https://www.saulspodship.com/encyclopedia/heaven-hell` | scholarly |
| 24 | History of All 12 Disciples | `https://www.saulspodship.com/encyclopedia/history-of-all-12-disciples` | history |
| 25 | Holy Communion | `https://www.saulspodship.com/encyclopedia/holy-communion` | scholarly |
| 26 | How The World Populated After Abel's Death | `https://www.saulspodship.com/encyclopedia/how-the-world-populated-after-abels-death` | scholarly |
| 27 | Jesus Is God (Full References OT + NT) | `https://www.saulspodship.com/encyclopedia/jesus-is-god-full-references-ot-nt` | scholarly |
| 28 | Lord's Prayer | `https://www.saulspodship.com/encyclopedia/lords-prayer` | devotional |
| 29 | Messianic Prophecies | `https://www.saulspodship.com/encyclopedia/messianic-prophecies` | scholarly |
| 30 | Miracles of Jesus & the Apostles: Complete Catalogue | `https://www.saulspodship.com/encyclopedia/miracles-of-jesus-and-the-apostles-complete-catalogue` | scholarly |
| 31 | Names of God | `https://www.saulspodship.com/encyclopedia/names-of-god` | scholarly |
| 32 | Names of Jesus | `https://www.saulspodship.com/encyclopedia/names-of-jesus` | devotional |
| 33 | Non-Canonical Books & Canon Differences | `https://www.saulspodship.com/encyclopedia/non-canonical-books-canon-differences` | scholarly |
| 34 | Not Biblical Quotes or Sayings | `https://www.saulspodship.com/encyclopedia/not-biblical-quotes-sayings` | devotional |
| 35 | Original Scripture Languages | `https://www.saulspodship.com/encyclopedia/original-scripture-languages` | scholarly |
| 36 | Parables of Jesus: All 40+ Explained | `https://www.saulspodship.com/encyclopedia/parables-of-jesus-all-40-explained` | scholarly |
| 37 | Primeval World Timeline & Ancient Civilizations | `https://www.saulspodship.com/encyclopedia/primeval-world-timeline-ancient-civilizations` | history |
| 38 | Psalm Authors | `https://www.saulspodship.com/encyclopedia/psalm-authors` | scholarly |
| 39 | Revelation Judgments Timeline | `https://www.saulspodship.com/encyclopedia/revelation-judgments-timeline` | scholarly |
| 40 | Sermon on the Mount | `https://www.saulspodship.com/encyclopedia/sermon-on-the-mount` | devotional |
| 41 | Seven Last Words of Jesus | `https://www.saulspodship.com/encyclopedia/seven-last-words-of-jesus` | devotional |
| 42 | Systematic Theology Subjects | `https://www.saulspodship.com/encyclopedia/systematic-theology-subjects` | scholarly |
| 43 | Ten Commandments & OT Laws | `https://www.saulspodship.com/encyclopedia/ten-commandments-ot-laws` | scholarly |
| 44 | The Five Offerings of Leviticus | `https://www.saulspodship.com/encyclopedia/the-five-offerings-of-leviticus` | scholarly |
| 45 | The Magi | `https://www.saulspodship.com/encyclopedia/the-magi` | history |
| 46 | True Worship vs False Worship | `https://www.saulspodship.com/encyclopedia/true-worship-vs-false-worship` | scholarly |
| 47 | Types of Bad Spirits in the Bible | `https://www.saulspodship.com/encyclopedia/types-of-bad-spirits-in-the-bible` | scholarly |
| 48 | Vatican and its History | `https://www.saulspodship.com/encyclopedia/vatican-and-its-history` | history |
| 49 | World's All Big Churches | `https://www.saulspodship.com/encyclopedia/worlds-all-big-churches` | history |
| 50 | 1-Year Sermon Guide (52 Gen-Z Topics) | `https://www.saulspodship.com/encyclopedia/1-year-sermon-guide-52-gen-z-topics` | devotional |

## Module Pages

| URL | Page |
|---|---|
| `/` | Hub / homepage |
| `/encyclopedia` | Index of all 50 volumes |
| `/about` | Mission, founder, editorial standards |
| `/scholarly-standards` | Academic integrity module |
| `/podcast`, `/podcast/<episode-slug>` | Broadcasts |
| `/music`, `/music/punjabi-zaboor`, `/music/pakistani-singers-archive` | Worship music (old `/Pakistanisingersarchive` → 301) |
| `/studio` | Gospel Composer (Beta) |
| `/support` | Partner in the Mission |
| `/faq` | FAQ + FAQPage schema |
| `/contact` | Contact form |
| `/privacy`, `/terms`, `/disclaimer` | Legal |
| `/sitemap` (HTML), `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt` | Discovery |
| `/encyclopedia/<slug>.md` | Markdown mirror of each volume |
