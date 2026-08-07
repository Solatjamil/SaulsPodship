
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { TheologyCategory } from '../types.js';
import VOLUME_METADATA from './volumeRegistry.js';

import category_01 from './_categories/category_01.js';
import category_02 from './_categories/category_02.js';
import category_03 from './_categories/category_03.js';
import category_04 from './_categories/category_04.js';
import category_05 from './_categories/category_05.js';
import category_06 from './_categories/category_06.js'; 
import category_07 from './_categories/category_07.js'; 
import category_08 from './_categories/category_08.js'; 
import category_09 from './_categories/category_09.js'; 
import category_10 from './_categories/category_10.js'; 
import category_11 from './_categories/category_11.js';
import category_12 from './_categories/category_12.js';
import category_13 from './_categories/category_13.js';
import category_14 from './_categories/category_14.js';
import category_15 from './_categories/category_15.js'; 
import category_16 from './_categories/category_16.js'; 
import category_18 from './_categories/category_18.js';
import category_19 from './_categories/category_19.js';
import category_20 from './_categories/category_20.js';
import category_21 from './_categories/category_21.js';
import category_22 from './_categories/category_22.js';
import category_23 from './_categories/category_23.js';
import category_24 from './_categories/category_24.js';
import category_25 from './_categories/category_25.js';
import category_26 from './_categories/category_26.js';
import category_27 from './_categories/category_27.js';
import category_28 from './_categories/category_28.js';
import category_29 from './_categories/category_29.js';
import category_30 from './_categories/category_30.js';
import category_31 from './_categories/category_31.js';
import category_32 from './_categories/category_32.js';
import category_33 from './_categories/category_33.js';
import category_34 from './_categories/category_34.js';
import category_35 from './_categories/category_35.js'; 
import category_36 from './_categories/category_36.js'; 
import category_37 from './_categories/category_37.js'; 
import category_38 from './_categories/category_38.js'; 
import category_39 from './_categories/category_39.js'; 
import category_40 from './_categories/category_40.js'; 
import category_41 from './_categories/category_41.js';
import category_42 from './_categories/category_42.js';
import category_43 from './_categories/category_43.js'; 
import category_44 from './_categories/category_44.js';
import category_45 from './_categories/category_45.js'; 
import category_46 from './_categories/category_46.js'; 

const CONTENT_MAPPING: Record<string, TheologyCategory> = {
  "All Bible Stories": {
    ...category_02,
    articleLink: "https://goshsays.blogspot.com/2025/12/complete-guide-to-all-bible-stories.html",
    youtubeLink: "https://youtu.be/7t2Tjo9F_mg"
  },
  "All Biblical Numerology": {
    ...category_43,
    articleLink: "https://goshsays.blogspot.com/2025/12/biblical-numerology-complete-guide-to.html",
    youtubeLink: "https://youtu.be/Zxviz5oWULY"
  },
  "All Big Denominations & Their Differences": {
    ...category_03,
    articleLink: "https://goshsays.blogspot.com/2025/12/christian-denominations-explained.html",
    youtubeLink: "https://youtu.be/mm0xDEaqytM"
  },
  "Angels, Demons, Beasts & Monsters in the Bible": {
    ...category_04,
    articleLink: "https://goshsays.blogspot.com/2025/12/angels-demons-beasts-monsters-in-bible.html",
    youtubeLink: "https://youtu.be/HSI84sTSkKY"
  },
  "Apologetics: 40 Critical Questions": category_05,
  "Apostle's Creed": {
    ...category_10,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-apostles-creed-explained-complete.html",
    youtubeLink: "https://youtu.be/aVChHWZMaXU"
  },
  "Ark of Covenant and other Biblical Relics": {
    ...category_46,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-ark-of-covenant-and-biblical-relics.html",
    youtubeLink: "https://youtu.be/ia4S7n60tDo"
  },
  "Baptism, Sacraments & Circumcision": {
    ...category_06,
    articleLink: "https://goshsays.blogspot.com/2026/01/baptism-sacraments-and-circumcision.html",
    youtubeLink: "https://youtu.be/taqcHYihXxY"
  },
  "Bible Book Writers": {
    ...category_07,
    articleLink: "https://goshsays.blogspot.com/2026/01/who-wrote-bible-complete-guide-to.html",
    youtubeLink: "https://youtu.be/X7MUFv5W3OQ"
  },
  "Biblical Creation vs Scientific Creation": {
    ...category_09,
    articleLink: "https://goshsays.blogspot.com/2026/01/biblical-creation-vs-scientific.html",
    youtubeLink: "https://youtu.be/7aNfDPGh7GI"
  },
  "Biblical Maps": {
    ...category_08,
    articleLink: "https://goshsays.blogspot.com/2026/01/biblical-maps-complete-atlas-of-bible.html",
    youtubeLink: "https://youtu.be/3SMPMEaRgRk"
  },
  "Book of Revelation": {
    ...category_11,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-book-of-revelation-complete-guide.html",
    youtubeLink: "https://youtu.be/V_KqCj2EfFE"
  },
  "Christianity in South Asia (India & Pakistan)": {
    ...category_12,
    articleLink: "https://goshsays.blogspot.com/2026/01/christianity-in-south-asia-complete.html",
    youtubeLink: "https://youtu.be/r0SqSP1WHlk"
  },
  "Christmas History": {
    ...category_13,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-complete-history-of-christmas-from.html",
    youtubeLink: "https://youtu.be/UgcFfykVKGo"
  },
  "Comparative Religion": {
    ...category_15,
    articleLink: "https://goshsays.blogspot.com/2026/01/comparative-religion-christianity-and.html",
    youtubeLink: "https://youtu.be/4bd_5F4mEvU"
  },
  "Complete Christian Theology Map": {
    ...category_16,
    articleLink: "https://goshsays.blogspot.com/2026/01/complete-christian-theology-map-how.html",
    youtubeLink: "https://youtu.be/P3fhIF-XPlU"
  },
  "Crusades — Historical + Theological Analysis": {
    ...category_16,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-crusades-complete-historical-and.html",
    youtubeLink: "https://youtu.be/aiJTZJJkANQ"
  },
  "Early Church Fathers & Councils": {
    ...category_14,
    articleLink: "https://goshsays.blogspot.com/2026/01/early-church-fathers-and-councils.html",
    youtubeLink: "https://youtu.be/TXYX1Qo9LPw"
  },
  "Easter & Resurrection": {
    ...category_18,
    articleLink: "https://goshsays.blogspot.com/2026/01/easter-and-resurrection-cornerstone-of.html",
    youtubeLink: "https://youtu.be/ACJuPSQXaAA"
  },
  "Family Tree: Adam → Jesus": {
    ...category_19,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-family-tree-adam-to-jesus-complete.html",
    youtubeLink: "https://youtu.be/Wn_xVTslokI"
  },
  "Forbidden Knowledge & the Watchers": {
    ...category_44,
    articleLink: "https://goshsays.blogspot.com/2026/01/forbidden-knowledge-and-watchers-yoga.html",
    youtubeLink: "https://youtu.be/j4OztR50EFo"
  },
  "Guide to Christian Living": {
    ...category_20,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-complete-guide-to-christian-living.html",
    youtubeLink: "https://youtu.be/Jl4Y2q_tz5M"
  },
  "Heaven & Hell": {
    ...category_45,
    articleLink: "https://goshsays.blogspot.com/2026/01/heaven-and-hell-what-bible-actually.html",
    youtubeLink: "https://youtu.be/UBpKg_FzxUA"
  },
  "History of All 12 Disciples": {
    ...category_41,
    articleLink: "https://goshsays.blogspot.com/2026/01/history-of-all-12-disciples-of-jesus.html",
    youtubeLink: "https://youtu.be/cATmSWOuhkI"
  },
  "Holy Communion": {
    ...category_21,
    articleLink: "https://goshsays.blogspot.com/2026/01/holy-communion-lords-supper-eucharist.html",
    youtubeLink: "https://youtu.be/6ZCczLKiQsg"
  },
  "How The World Populated After Abel's Death": {
    ...category_22,
    articleLink: "https://goshsays.blogspot.com/2026/01/how-world-populated-after-abels-death.html",
    youtubeLink: "https://youtu.be/tD6Ww_A8WKc"
  },
  "Jesus Is God (Full References OT + NT)": {
    ...category_23,
    articleLink: "https://goshsays.blogspot.com/2026/01/jesus-is-god-complete-biblical-proof.html",
    youtubeLink: "https://youtu.be/-wd2WvFWZ64"
  },
  "Lord's Prayer": {
    ...category_24,
    articleLink: "https://goshsays.blogspot.com/2026/01/the-lords-prayer-how-jesus-taught-us-to.html",
    youtubeLink: "https://youtu.be/NJ0dlR3b8_I"
  },
  "Messianic Prophecies": {
    ...category_25,
    articleLink: "https://goshsays.blogspot.com/2026/01/messianic-prophecies-every-major-old.html",
    youtubeLink: "https://youtu.be/wrwXpxvtEZk"
  },
  "Names of God": {
    ...category_26,
    articleLink: "https://goshsays.blogspot.com/2026/01/names-of-god.html",
    youtubeLink: "https://youtu.be/GIg4Gnu_vmU"
  },
  "Names of Jesus": {
    ...category_27,
    articleLink: "https://goshsays.blogspot.com/2026/01/names-of-jesus.html",
    youtubeLink: "https://youtu.be/DgItXgDjaxQ"
  },
  "Non-Canonical Books & Canon Differences": {
    ...category_28,
    articleLink: "https://goshsays.blogspot.com/2026/01/non-canonical-books-canon-differences.html",
    youtubeLink: "https://youtu.be/TWrDuESFdZM"
  },
  "Not Biblical Quotes or Sayings": {
    ...category_29,
    articleLink: "https://goshsays.blogspot.com/2026/01/not-biblical-quotes-or-sayings.html",
    youtubeLink: "https://youtu.be/I10u7W_RR80"
  },
  "Original Scripture Languages": {
    ...category_30,
    articleLink: "https://goshsays.blogspot.com/2026/01/original-scripture-languages.html",
    youtubeLink: "https://youtu.be/GYs7nNqhMyE"
  },
  "Primeval World Timeline & Ancient Civilizations": {
    ...category_42,
    articleLink: "https://goshsays.blogspot.com/2026/01/primeval-world-timeline-ancient.html",
    youtubeLink: "https://youtu.be/VCHTenxDW7M"
  },
  "Psalm Authors": {
    ...category_31,
    articleLink: "https://goshsays.blogspot.com/2026/01/psalm-authors.html",
    youtubeLink: "https://youtu.be/KB6VxCOxTis"
  },
  "Revelation Judgments Timeline": {
    ...category_32,
    articleLink: "https://goshsays.blogspot.com/2026/01/revelation-judgments-timeline.html",
    youtubeLink: "https://youtu.be/A3VyKZHvixs"
  },
  "Sermon on the Mount": {
    ...category_33,
    articleLink: "https://goshsays.blogspot.com/2026/02/sermon-on-mount.html",
    youtubeLink: "https://youtu.be/MXxdip2DTiE"
  },
  "Seven Last Words of Jesus": {
    ...category_34,
    articleLink: "https://goshsays.blogspot.com/2026/02/seven-last-words-of-jesus.html",
    youtubeLink: "https://youtu.be/iF13Hc6ko-4"
  },
  "Systematic Theology Subjects": {
    ...category_35,
    articleLink: "https://goshsays.blogspot.com/2026/02/systematic-theology-subjects.html",
    youtubeLink: "https://youtu.be/-wTgR27MHZs"
  },
  "Ten Commandments & OT Laws": {
    ...category_36,
    articleLink: "https://goshsays.blogspot.com/2026/02/ten-commandments-old-testament-laws.html",
    youtubeLink: "https://youtu.be/17CxbRLDFho"
  },
  "The Magi": {
    ...category_37,
    articleLink: "https://goshsays.blogspot.com/2026/02/the-magi-wise-men-from-east.html",
    youtubeLink: "https://youtu.be/HXQyd1sk7SY"
  },
  "True Worship vs False Worship": {
    ...category_38,
    articleLink: "https://goshsays.blogspot.com/2026/02/true-worship-vs-false-worship.html",
    youtubeLink: "https://youtu.be/T9Ft6bHDJjg"
  },
  "Vatican and its History": {
    ...category_39,
    articleLink: "https://goshsays.blogspot.com/2026/02/vatican-its-history.html",
    youtubeLink: "https://youtu.be/pDeMBdYmxCA"
  },
  "World's All Big Churches": {
    ...category_40,
    articleLink: "https://goshsays.blogspot.com/2026/02/worlds-all-big-churches.html",
    youtubeLink: "https://youtu.be/htbG7okSD54"
  },
  "1-Year Sermon Guide (52 Gen-Z Topics)": {
    ...category_01,
    articleLink: "https://goshsays.blogspot.com/2026/02/1-year-sermon-guide-52-gen-z-topics.html",
    youtubeLink: "https://youtu.be/lV4eQ_BrUU4"
  },
};

export const CATEGORIES: TheologyCategory[] = VOLUME_METADATA.map((meta, index) => {
  const sequenceId = (index + 1).toString().padStart(2, '0');
  const richContent = CONTENT_MAPPING[meta.title];

  if (richContent) {
    return { ...richContent, id: sequenceId, title: meta.title, isPlaceholder: false };
  }

  return {
    id: sequenceId,
    title: meta.title,
    overview: meta.overview,
    isPlaceholder: false,
    content: {
      analysis: `### **Volume ${sequenceId}: Scholarly Exposition of ${meta.title}**

#### **I. Theological and Historical Prolegomena**
The study of **${meta.title}** represents a fundamental locus in Christian theology, historical studies, and biblical exegesis. This volume provides an objective, academically rigorous, and structured examination of its core concepts, scriptural foundations, and development.

#### **II. Biblical and Source-Critical Foundations**
Scriptural investigation of this topic involves a careful analysis of both Old and New Testament passages, taking into account their original linguistic (Hebrew, Greek, and Aramaic) and socio-cultural contexts:
• **Primary Textual Witnesses**: Tracing the thematic and theological threads across the canonical books of Scripture.
• **Socio-Historical Context**: Understanding how ancient Near Eastern and Greco-Roman backgrounds shaped the terminology and concepts.
• **Exegetical Synthesis**: Unpacking the primary interpretations championed by leading historical and contemporary scholars.

#### **III. Historical and Dogmatic Evolution**
Throughout Church history, the understanding of **${meta.title}** has evolved through critical periods, global councils, and seminal theological discourses:
1. **The Patristic Era**: Early Church Fathers laid the baseline definitions, defending orthodox theology against early misinterpretations.
2. **The Scholastic and Reformation Periods**: Rigorous systematic frameworks were developed to structure the doctrine within historical creeds.
3. **The Modern Scholarly Consensus**: Contemporary archaeology, manuscript studies, and systematic theology continue to shed new light on these ancient truths.

#### **IV. Practical and Devotional Relevance**
Beyond its high academic interest, this volume connects systematic concepts to daily Christian living, ethical practices, and the worship life of the global Church, providing a complete bridge from the lecture hall to the pew.`
    }
  };
});
