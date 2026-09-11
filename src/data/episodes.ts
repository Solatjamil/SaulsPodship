/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Episode {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  publishDate: string;
  spotifyUrl?: string;
  applePodcastsUrl?: string;
  youtubeUrl?: string;
  topics: string[];
  scriptureReferences: string[];
}

export const EPISODES: Episode[] = [
  {
    id: "ep-01",
    slug: "creation-to-redemption-the-grand-narrative",
    number: 1,
    title: "Creation to Redemption: The Grand Narrative of Scripture",
    subtitle: "Understanding the thematic unity of the 66 books from Genesis to Revelation",
    description: "An in-depth exploration of how the biblical covenants trace a single, unbroken line of divine redemption. We analyze the literary structures, ancient Near Eastern cultural contexts, and theological turning points that bind the Old and New Testaments.",
    duration: "48:15",
    publishDate: "2026-01-15",
    youtubeUrl: "https://youtu.be/7t2Tjo9F_mg",
    topics: ["Biblical Theology", "Covenants", "Hermeneutics"],
    scriptureReferences: ["Genesis 1-3", "Luke 24:27", "Revelation 21-22"]
  },
  {
    id: "ep-02",
    slug: "the-five-sacrifices-of-leviticus-shadow-to-substance",
    number: 2,
    title: "The Five Sacrifices of Leviticus: From Shadow to Substance",
    subtitle: "Unlocking Olah, Minchah, Shelamim, Chatat, and Asham in light of Christ",
    description: "Leviticus is often considered the most difficult book for modern readers, yet it holds the theological DNA of the entire New Testament. In this masterclass, we break down each of the five Levitical offerings and trace their prophetic fulfillment in the cross of Christ.",
    duration: "54:30",
    publishDate: "2026-01-29",
    topics: ["Leviticus", "Typology", "Atonement"],
    scriptureReferences: ["Leviticus 1-7", "Hebrews 9-10"]
  },
  {
    id: "ep-03",
    slug: "angels-demons-and-unseen-realms",
    number: 3,
    title: "Angels, Demons, and the Unseen Realm: Scriptural Demonology",
    subtitle: "Separating biblical truth from medieval folklore and modern myth",
    description: "What does the Bible actually teach about the spiritual realm? We examine the divine council, the Cherubim and Seraphim, the fall of Lucifer, the Nephilim controversy of Genesis 6, and Christ's definitive victory over territorial spirits.",
    duration: "51:40",
    publishDate: "2026-02-12",
    youtubeUrl: "https://youtu.be/HSI84sTSkKY",
    topics: ["Angelology", "Demonology", "Spiritual Warfare"],
    scriptureReferences: ["Psalm 82", "Colossians 2:15", "Ephesians 6:10-18"]
  },
  {
    id: "ep-04",
    slug: "punjabi-zaboor-the-indigenous-psalms-of-south-asia",
    number: 4,
    title: "Punjabi Zaboor: The Indigenous Psalms of South Asia",
    subtitle: "How 150 biblical Psalms were preserved in classical Punjabi metrical poetry",
    description: "In 1908, missionary Imam-ud-Din Shahbaz completed the translation and poetic versification of all 150 biblical Psalms into indigenous Punjabi meters (Bahr). We explore the history, musical ragas, and profound spiritual impact of the Zaboor on millions across Pakistan and the diaspora.",
    duration: "45:20",
    publishDate: "2026-02-26",
    topics: ["Church History", "Musicology", "South Asian Christianity"],
    scriptureReferences: ["Psalm 23", "Psalm 121", "Psalm 150"]
  },
  {
    id: "ep-05",
    slug: "messianic-prophecies-mathematical-and-historical-proofs",
    number: 5,
    title: "Messianic Prophecies: Historical and Theological Proofs",
    subtitle: "Examining the probability of 300+ Old Testament predictions fulfilled in Yeshua",
    description: "From the seed of the woman in Genesis 3:15 to the suffering servant of Isaiah 53 and the exact timing of Daniel's 70 weeks, we investigate the staggering precision of Messianic prophecies with rigorous textual evidence.",
    duration: "58:10",
    publishDate: "2026-03-05",
    youtubeUrl: "https://youtu.be/wrwXpxvtEZk",
    topics: ["Apologetics", "Messianic Prophecy", "Old Testament"],
    scriptureReferences: ["Isaiah 53", "Daniel 9:24-27", "Micah 5:2", "Psalm 22"]
  }
];
