/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SingerRecord {
  id: string;
  name: string;
  badge: string;
  role: string;
  dates?: string;
  bio: string;
  majorContributions: string[];
  keyZaboorOrGeet?: string[];
  era: string;
}

export const PIONEERS_AND_SINGERS: SingerRecord[] = [
  {
    id: "rev-imam-ud-din-shahbaz",
    name: "Rev. Imam-ud-Din Shahbaz",
    badge: "Pioneer Patriarch",
    role: "Translator & Versifier of the Punjabi Zaboor (1845–1921)",
    dates: "1845–1921",
    bio: "The foundational architect of indigenous South Asian Christian hymnody. Blind in his latter years, Rev. Shahbaz versified all 150 biblical Psalms into lyrical Punjabi meters (Bahr) with native South Asian classical ragas (1898–1908). His work, known as the 'Desi Zaboor', gave millions of Punjabi Christians their permanent musical identity.",
    majorContributions: [
      "Versification of all 150 Psalms into native Punjabi poetry (1898–1908)",
      "Integration of classical North Indian raga structures with Christian theology",
      "Publication of the historic Sialkot Song Book",
      "Enduring liturgical foundation for millions across Pakistan and North India"
    ],
    keyZaboorOrGeet: ["Zaboor 23 (Rab Mera Hai Chowanwala)", "Zaboor 121 (Aakhan Chukke Main Dekhan)", "Zaboor 100", "Zaboor 24"],
    era: "Historic Pioneer (19th–20th Century)"
  },
  {
    id: "padri-albert-khokhar",
    name: "Padri Albert Khokhar",
    badge: "Gospel Composer & Hymnodist",
    role: "Hymn Writer & Pioneer Pastor",
    dates: "1925–1998",
    bio: "Prolific hymn writer and evangelist whose soulful Masihi Geet shaped Pakistani church worship for over four decades. His deep devotional lyrics combined pastoral intimacy with profound biblical doctrine.",
    majorContributions: [
      "Composed over 100 classical Masihi Geet sung across generations",
      "Mentored subsequent generations of choir masters and vocalists",
      "Pioneered radio gospel music broadcasts in Pakistan"
    ],
    keyZaboorOrGeet: ["Yeshu Mere Naal Naal", "Karam Di Nazar Kar", "Dil Mere Nu Shanti Bakhsho"],
    era: "Golden Era Pioneer"
  },
  {
    id: "dr-bashir-anwar",
    name: "Dr. Bashir Anwar",
    badge: "Master Vocalist & Composer",
    role: "Classical Gospel Vocalist & Music Theorist",
    dates: "1940–2018",
    bio: "Revered as one of the finest classical voices in Pakistani Christian history. Dr. Anwar brought refined semi-classical and Ghazal stylings to Masihi Geet, elevating the artistic standard of South Asian Christian music.",
    majorContributions: [
      "Pioneered classical raga-based arrangements for Masihi Geet",
      "Recorded hundreds of iconic studio tracks with Radio Pakistan and PTV",
      "Authored treatises on indigenous Christian hymnody"
    ],
    keyZaboorOrGeet: ["Aao Sab Milke Gao", "Khuda Wand Mera Noor Te Nijaat", "Zaboor 34"],
    era: "Classical Master"
  },
  {
    id: "sarah-albert",
    name: "Sarah Albert",
    badge: "Distinguished Vocalist",
    role: "Pioneer Female Gospel Artist",
    dates: "1950–Present",
    bio: "One of the most beloved female voices in Urdu and Punjabi Christian worship. Her soaring vocals and devotional sensitivity on historic cassette releases in the 1980s and 1990s set the benchmark for female worship leaders across Pakistan.",
    majorContributions: [
      "Over 30 bestselling gospel albums across four decades",
      "Extensive international worship ministry in the UK, USA, and Gulf",
      "Champion of traditional Punjabi Zaboor recitation"
    ],
    keyZaboorOrGeet: ["Mukti Dilaye Yeshu Naam", "Zaboor 91", "Teri Mahima Howe"],
    era: "Contemporary Master"
  },
  {
    id: "anil-kant",
    name: "Anil Kant",
    badge: "Global Worship Leader",
    role: "Singer, Songwriter & Evangelist",
    dates: "1960–Present",
    bio: "Renowned across India, Pakistan, and the worldwide South Asian diaspora for contemporary Hindi and Urdu worship music that bridges cultural boundaries with gospel clarity.",
    majorContributions: [
      "Composer of globally recognized worship anthems like 'Pray For India' and 'Ibadat Karo'",
      "Produced award-winning television and streaming worship broadcasts",
      "Extensive global crusade worship ministry"
    ],
    keyZaboorOrGeet: ["Ibadat Karo", "Yeshu Masih Deta Khushi", "Tu Hi Rab Hai"],
    era: "Contemporary Global Pioneer"
  },
  {
    id: "arshad-khalid",
    name: "Arshad Khalid",
    badge: "Contemporary Icon",
    role: "Gospel Artist & Producer",
    dates: "1970–Present",
    bio: "A dynamic worship leader and producer known for blending traditional Punjabi rhythmic energy with contemporary instrumentation, inspiring younger generations in vibrant praise.",
    majorContributions: [
      "Revolutionized youth worship concerts across Pakistan",
      "Produced multi-artist collaboration albums",
      "Established modern Christian audio recording studios in Lahore"
    ],
    keyZaboorOrGeet: ["Zaboor 150 (Taareef Karo)", "Yeshu Tere Pyar Di Gall", "Ruh Da Chashma"],
    era: "Contemporary"
  }
];
