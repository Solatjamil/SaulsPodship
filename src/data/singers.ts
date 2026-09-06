/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SingerStatus = 'deceased' | 'veteran' | 'current';
export type SingerCategory = 'composer' | 'singer' | 'both' | 'musicologist';

export interface SingerRecord {
  id: string;
  name: string;
  badge: string;
  role: string;
  status: SingerStatus;
  category: SingerCategory;
  dates?: string;
  academicCredentials?: string;
  lineageNote?: string;
  bio: string;
  majorContributions: string[];
  keyZaboorOrGeet?: string[];
  era: string;
  isHonoredDynasty?: boolean;
}

export const HONORED_DIN_DYNASTY: SingerRecord[] = [
  {
    id: "jamson-j-din",
    name: "Jamson J. Din",
    badge: "Deceased Patriarch & Master Composer",
    role: "Legendary Tabla Artist, Gospel Music Composer, Singer & Choir Director",
    status: "deceased",
    category: "both",
    dates: "Deceased Pioneer",
    academicCredentials: "Master of Tabla Virtuosity, Devotional Harmonium & Classical Choral Conducting",
    lineageNote: "Patriarch of the Din Musical Dynasty; Brother of Robson J. Din; Father of Nadeem Jamil; Grandfather of Solat Nadeem",
    bio: "Patriarch of a revered Pakistani Christian musical family and a legendary pioneer in gospel music composition, devotional singing, and percussion. Jamson J. Din was renowned as a master Tabla Artist whose rhythmic brilliance, intricate bols, and deep spiritual sensitivity anchored decades of worship across Punjab. Alongside his mastery of the harmonium and choral hymnody, his dedication to sacred rhythm set an indelible benchmark for gospel musicians throughout Pakistan.",
    majorContributions: [
      "Master Tabla Artist and percussion virtuoso who defined traditional Punjabi Zaboor accompaniment",
      "Pioneered foundational gospel compositions and choral psalm arrangements in Pakistani churches",
      "Celebrated master of classical harmonium accompaniment, ghazal-style devotional geets, and congregational singing",
      "Trained and mentored early generations of choir masters and vocalists across urban and rural parish communities",
      "Founded a lasting family musical dynasty that continues to lead South Asian gospel hymnody across multiple generations"
    ],
    keyZaboorOrGeet: [
      "Aye Khudawand Tere Huzoor",
      "Rooh-e-Quds Aaja Dil De Vich",
      "Zaboor 23 (Rab Mera Hai Chowanwala - Classical Tabla & Choir Arrangement)",
      "Masihi Geet & Choral Devotionals",
      "Khuda Di Mohabbat Bemisaal"
    ],
    era: "Historic Golden Era (Deceased Veteran)",
    isHonoredDynasty: true
  },
  {
    id: "robson-j-din",
    name: "Robson J. Din",
    badge: "Eminent Master Composer & Musicologist",
    role: "Veteran Master Composer, Classical Vocalist & Music Theorist",
    status: "veteran",
    category: "both",
    dates: "Prominent Veteran Maestro",
    academicCredentials: "Masters in Music (M.Mus) — Immense Authority in Hindustani Classical Music & Ragas",
    lineageNote: "Eminent Classical Maestro; Brother of Jamson J. Din; Father of Nada Jamil; Uncle of Nadeem Jamil",
    bio: "A towering luminary and one of the most intellectually and classically accomplished composers in the history of the Pakistani Christian music industry. Holding an esteemed Masters in Music (M.Mus), Robson J. Din possesses immense, encyclopedic authority in North Indian classical music, the classical Thaat system, microtonal inflection (shruti), raga exegesis, and advanced vocal orchestration. Brother of the late Jamson J. Din, he infused South Asian Christian hymnody with extraordinary harmonic depth, teaching singers the subtleties of classical discipline while penning monumental compositions that unite authentic theological truth with immaculate melodic purity.",
    majorContributions: [
      "Holder of a prestigious Masters in Music (M.Mus) with immense mastery of classical musicology and raga theory",
      "Pioneered advanced classical raga-based gospel compositions fusing biblical theology with authentic South Asian scales",
      "Celebrated vocal coach and classical music professor who trained leading studio artists and church soloists",
      "Composed complex multi-part choral anthems, symphonic spiritual settings, and classical geets",
      "Father and mentor of veteran composer Nada Jamil, perpetuating profound musical craftsmanship"
    ],
    keyZaboorOrGeet: [
      "Classical Raag-Based Devotional Masterworks",
      "Symphonic Setting of Zaboor 91 (Raag Yaman Kalyan)",
      "Zaboor 121 (Classical Des / Pahadi Arrangement)",
      "Teri Hamd-o-Sana Hamesha",
      "Masihi Classical Ghazals & Anthems"
    ],
    era: "Classical Master & Theorist (Veteran)",
    isHonoredDynasty: true
  },
  {
    id: "nadeem-jamil",
    name: "Nadeem Jamil",
    badge: "Veteran Composer & Vocalist",
    role: "Veteran Gospel Music Composer, Singer & Multi-Instrumentalist",
    status: "veteran",
    category: "both",
    dates: "Veteran Artist",
    academicCredentials: "Heritage Classical Vocal Training & Sacred Composition",
    lineageNote: "Son of Patriarch Jamson J. Din; Cousin of Nada Jamil; Nephew of Robson J. Din",
    bio: "Distinguished veteran gospel music composer and vocalist who carries forward the venerable legacy of his father, the late Jamson J. Din. Renowned for his deeply moving, evocative vocal timbre and spiritual sincerity, Nadeem Jamil has contributed extensively to the modern and semi-classical gospel repertoire of Pakistan. His compositions resonate across church conventions, television ministries, and global diasporic gatherings, known for their expressive phrasing, lyrical warmth, and fidelity to sacred biblical truth.",
    majorContributions: [
      "Extensive catalogue of celebrated audio albums and televised worship broadcasts",
      "Carried forward the patriarchal musical tradition of his father Jamson J. Din",
      "Skilled multi-instrumentalist and arranger combining traditional folk beats with classical devotion",
      "Collaborated with leading Christian producers and ensembles across South Asia and abroad",
      "Active mentor inspiring the next generation of worship leaders in vocal technique"
    ],
    keyZaboorOrGeet: [
      "Teri Qudrat De Jalwe",
      "Mera Khuda Wafadar Hai",
      "Pyar Masih Da Kadi Na Mukke",
      "Zaboor 100 (Khushi De Naal Gao)",
      "Asman Te Zameen De Malik"
    ],
    era: "Veteran Gospel Era",
    isHonoredDynasty: true
  },
  {
    id: "nada-jamil",
    name: "Nada Jamil",
    badge: "Veteran Composer & Vocal Harmonies Master",
    role: "Veteran Gospel Music Composer, Arranger & Vocalist",
    status: "veteran",
    category: "both",
    dates: "Veteran Artist",
    academicCredentials: "Advanced Raga & Studio Composition Apprenticeship",
    lineageNote: "Son of Master Composer Robson J. Din (M.Mus); Cousin of Nadeem Jamil; Nephew of Jamson J. Din",
    bio: "Accomplished veteran gospel music composer, arranger, and vocalist, representing the classical pedigree of his father, Maestro Robson J. Din (M.Mus). Nada Jamil is celebrated for his refined melodic sensibility, sophisticated harmonic voicing, and meticulous studio arrangements. His compositions seamlessly bridge the ornate demands of traditional classical raga structures with contemporary gospel aesthetics, producing timeless devotional pieces that touch hearts in congregational worship and international broadcasts.",
    majorContributions: [
      "Arranged and composed seminal Christian studio tracks featuring intricate polyphonic vocal harmonies",
      "Perpetuated the classical musicological lineage established by his father Robson J. Din",
      "Directed musical productions for major Christian conventions, broadcasts, and choral recordings",
      "Pioneered nuanced arrangements of traditional Punjabi Zaboor with refined acoustic instrumentation",
      "Recognized widely among peers for melodic craftsmanship and devotional depth"
    ],
    keyZaboorOrGeet: [
      "Yeshu Di Sana Karo",
      "Rab Di Rehmat Be-Payan",
      "Suna Hai Naam Yeshu Ka",
      "Zaboor 34 (Main Har Vele Rab Di Tareef Karanga)",
      "Roohani Geet & Worship Medleys"
    ],
    era: "Veteran Gospel Era",
    isHonoredDynasty: true
  }
];

export const HISTORIC_PIONEERS_AND_MAESTROS: SingerRecord[] = [
  {
    id: "rev-imam-ud-din-shahbaz",
    name: "Rev. Imam-ud-Din Shahbaz",
    badge: "Pioneer Patriarch of Punjabi Zaboor",
    role: "Translator & Metrical Versifier of the 150 Biblical Psalms",
    status: "deceased",
    category: "composer",
    dates: "1845–1921",
    academicCredentials: "Master of Semitic Languages, Classical Persian/Urdu Prosody & Punjabi Bahr",
    lineageNote: "Foundational Patriarch of Indigenous South Asian Christian Hymnody",
    bio: "The foundational architect of indigenous South Asian Christian hymnody. Blind in his latter years, Rev. Shahbaz versified all 150 biblical Psalms from Hebrew into lyrical Punjabi meters (Bahr) set to native classical ragas between 1898 and 1908. Known as the 'Desi Zaboor', his work gave millions of Punjabi Christians their enduring theological and musical identity.",
    majorContributions: [
      "Complete metrical versification of all 150 Hebrew Psalms into native Punjabi meters (1898–1908)",
      "Deliberate integration of classical North Indian raga structures (Bhairavi, Kafi, Yaman, Khamaj) with Christian scripture",
      "Compilation and publication of the historic Sialkot Song Book (Geet Ki Kitab)",
      "Unbroken liturgical foundation used daily by millions across Pakistan, India, and the global diaspora"
    ],
    keyZaboorOrGeet: [
      "Zaboor 23 (Rab Mera Hai Chowanwala)",
      "Zaboor 121 (Aakhan Chukke Main Dekhan)",
      "Zaboor 100 (Khushi De Naal Gao)",
      "Zaboor 24 (Zameen Te Jo Kujh)",
      "Zaboor 150 (Rab Di Tareef Karo)"
    ],
    era: "Historic Pioneer (19th–20th Century)"
  },
  {
    id: "padri-albert-khokhar",
    name: "Padri Albert Khokhar",
    badge: "Deceased Hymnodist & Lyricist",
    role: "Pioneer Pastor, Poet & Hymn Writer",
    status: "deceased",
    category: "composer",
    dates: "1925–1998",
    academicCredentials: "Theological Scholar & Classical Urdu/Punjabi Poet",
    bio: "Prolific hymn writer, evangelist, and pastor whose devotional Masihi Geet shaped Pakistani church worship for over four decades. His lyrics combined pastoral tenderness with robust biblical doctrine, sung at every major convention and church service in Pakistan.",
    majorContributions: [
      "Composed over 100 classical Masihi Geet sung across five generations",
      "Mentored subsequent generations of choir masters, vocalists, and village evangelists",
      "Pioneered early gospel radio music broadcasts across Pakistan"
    ],
    keyZaboorOrGeet: [
      "Yeshu Mere Naal Naal",
      "Karam Di Nazar Kar",
      "Dil Mere Nu Shanti Bakhsho",
      "Khuda Da Pyar Ajeeb Hai"
    ],
    era: "Golden Era Pioneer (Deceased)"
  },
  {
    id: "dr-bashir-anwar",
    name: "Dr. Bashir Anwar",
    badge: "Deceased Classical Vocal Master",
    role: "Classical Gospel Vocalist & Music Theorist",
    status: "deceased",
    category: "both",
    dates: "1940–2018",
    academicCredentials: "Ph.D. in Musicology & Renowned Classical Ghazal Vocalist",
    bio: "Revered as one of the most accomplished classical vocalists in Pakistani Christian history. Dr. Bashir Anwar brought refined North Indian classical and ghazal disciplines into Masihi Geet and Zaboor singing, elevating the aesthetic and academic standing of Christian music across national media.",
    majorContributions: [
      "Pioneered high-classical raga arrangements for Christian broadcasting on Radio Pakistan and PTV",
      "Recorded hundreds of devotional studio recordings setting the gold standard for vocal intonation",
      "Authored scholarly commentaries on the synthesis of South Asian musical theory and Christian worship"
    ],
    keyZaboorOrGeet: [
      "Aao Sab Milke Gao",
      "Khuda Wand Mera Noor Te Nijaat",
      "Zaboor 34 (Raag Khamaj)",
      "Tere Karke Yeshu Ji"
    ],
    era: "Classical Master (Deceased)"
  },
  {
    id: "a-nayyar",
    name: "Arthur Nayyar (A. Nayyar)",
    badge: "Deceased Legend of Pakistani Music",
    role: "Legendary Playback Singer & Gospel Vocalist",
    status: "deceased",
    category: "singer",
    dates: "1950–2016",
    academicCredentials: "Pride of Performance Laureate & 5-Time Nigar Award Winner",
    bio: "One of the most celebrated and beloved playback vocalists in Pakistani music history, Arthur Nayyar was a devout Christian who dedicated some of his most transcendent vocal recordings to gospel music, Christian festivals, and church anthems.",
    majorContributions: [
      "Over 4,000 film, national television, and studio songs with multiple national honours",
      "Recorded timeless Christian devotional geets for PTV Christmas and Easter specials",
      "Elevated the profile of Pakistani Christian musical artists to the highest national honors",
      "Recipient of the Pride of Performance by the President of Pakistan"
    ],
    keyZaboorOrGeet: [
      "Yeshu Tera Pyar",
      "Mukti Ki Raah",
      "Eid-e-Milad-e-Masiha (Christmas Anthems)",
      "Dua-e-Masihi"
    ],
    era: "National Legend (Deceased)"
  },
  {
    id: "sb-john",
    name: "S. B. John (Samuel Benjamin John)",
    badge: "Deceased Pioneer of Ghazal & Gospel",
    role: "Pioneering Vocalist & Melody Maker",
    status: "deceased",
    category: "both",
    dates: "1930–2021",
    academicCredentials: "Pride of Performance Awardee & Pioneer Radio Pakistan Vocalist",
    bio: "A historic figure in South Asian music and a pioneer of Radio Pakistan Karachi. S.B. John was a Christian musical patriarch whose gentle, melodic phrasing and devotional songs inspired generations of singers across religious and cultural boundaries.",
    majorContributions: [
      "Recorded classic hymns and devotional melodies for early Pakistani broadcasting",
      "Recipient of the Presidential Pride of Performance award in 2011",
      "Father of noted musicians and vocalists who carry on his legacy"
    ],
    keyZaboorOrGeet: [
      "Tu Hi Rab Hai",
      "Yeshu Paak Masih",
      "Classical Ghazal Hymns"
    ],
    era: "Foundational Legend (Deceased)"
  },
  {
    id: "ernest-mall",
    name: "Ernest Mall",
    badge: "Deceased Global Gospel Legend",
    role: "Pioneer Gospel Singer, Songwriter & Global Evangelist",
    status: "deceased",
    category: "both",
    dates: "1956–2008",
    academicCredentials: "Prolific Lyricist, Composer & Worldwide Crusade Worship Leader",
    bio: "An international icon of South Asian Christian music whose songs are sung in every corner of the globe where Urdu, Hindi, and Punjabi are spoken. Ernest Mall revolutionized Masihi Geet with passionate, scripture-based songwriting, producing dozens of gold albums that remain church staples.",
    majorContributions: [
      "Composed and recorded over 30 seminal worship albums distributed globally",
      "Penned world-famous anthems including 'Mera Khuda Bada Hai' and 'Yeshu Masih Deta Khushi'",
      "Conducted massive crusade worship gatherings across Pakistan, North America, Europe, and the Middle East",
      "Inspired an entire modern era of South Asian Christian worship leaders"
    ],
    keyZaboorOrGeet: [
      "Mera Khuda Bada Hai",
      "Yeshu Masih Deta Khushi",
      "Mukti Dilaye",
      "Hallelujah Gao",
      "Zaboor 91 (Jo Khuda Ke Saye Mein)"
    ],
    era: "Global Gospel Icon (Deceased)"
  },
  {
    id: "master-eric-din",
    name: "Master Eric Din",
    badge: "Deceased Pioneer Organist",
    role: "Classical Church Organist, Pianist & Choral Harmonist",
    status: "deceased",
    category: "composer",
    dates: "1935–2010",
    academicCredentials: "Royal Schools of Music Harmony & Pipe Organ Mastery",
    bio: "A venerable classical church organist and pipe organ maestro who presided over cathedral services and choral festivals across Lahore, Sialkot, and Rawalpindi, preserving Anglican and Presbyterian sacred harmony.",
    majorContributions: [
      "Preserved four-part liturgical harmony in Pakistani cathedrals",
      "Arranged classical hymn tunes adapted for Punjabi and Urdu congregations",
      "Trained pipe organists and choir accompanists across major church institutions"
    ],
    keyZaboorOrGeet: [
      "Cathedral Liturgical Responsorials",
      "Choral Canticles & Psalms",
      "Pipe Organ Hymn Preludes"
    ],
    era: "Liturgical Master (Deceased)"
  },
  {
    id: "master-george-abdullah",
    name: "Master George & Master Abdullah",
    badge: "Deceased Scriptorium Choir Pioneers",
    role: "Pioneer Church Choir Directors & Harmonium Maestros",
    status: "deceased",
    category: "both",
    dates: "1920–1985",
    academicCredentials: "Traditional Ustadi Gharana Discipline & Church Hymnody",
    bio: "Pioneering church choir masters of central Punjab who spent half a century teaching rural and urban believers the art of singing metrical Zaboors in authentic raag scales accompanied by harmonium and tabla.",
    majorContributions: [
      "Catalogued village oral traditions of Zaboor singing",
      "Established church choir standards across the Diocese of Raiwind and Lahore",
      "Authored early notation booklets for church instrumentalists"
    ],
    keyZaboorOrGeet: [
      "Zaboor 121 Choral Setting",
      "Zaboor 100 Folk Meter",
      "Traditional Convention Anthems"
    ],
    era: "Pioneer Choir Masters (Deceased)"
  },
  {
    id: "salamat-masih",
    name: "Salamat Masih",
    badge: "Deceased Folk Zaboor Master",
    role: "Folk Gospel Vocalist & Dholak/Chimta Legend",
    status: "deceased",
    category: "singer",
    dates: "1942–2005",
    academicCredentials: "Master of Traditional Punjabi Devotional Folk Rhythm (Dholak/Chimta)",
    bio: "A legendary folk vocalist whose electrifying rhythm, raw vocal power, and mastery of the chimta and dholak brought the Punjabi Zaboor alive in massive rural conventions across Punjab.",
    majorContributions: [
      "Pioneered folk revival of Punjabi Zaboor at open-air village conventions",
      "Famous for unamplified, powerful devotional singing that galvanized thousands",
      "Preserved the rural Punjabi metric tradition of singing scripture"
    ],
    keyZaboorOrGeet: [
      "Zaboor 150 (Taareef Karo)",
      "Zaboor 98",
      "Folk Convention Geets"
    ],
    era: "Folk Revival Pioneer (Deceased)"
  }
];

export const VETERANS_AND_CONTEMPORARY_SINGERS: SingerRecord[] = [
  {
    id: "sarah-albert",
    name: "Sarah Albert",
    badge: "Veteran Female Gospel Patriarch",
    role: "Pioneer Female Gospel Artist & Worship Leader",
    status: "veteran",
    category: "singer",
    dates: "1955–Present",
    academicCredentials: "Four Decades of Studio Excellence & Cassette Ministry",
    bio: "One of the most cherished and recognizable female voices in the history of Pakistani Christian music. Her soaring vocal range, spiritual depth, and historic cassette releases in the 1980s and 1990s established a standard for female worship artists throughout South Asia.",
    majorContributions: [
      "Over 30 bestselling studio worship albums across four decades",
      "Extensive international worship ministry in the UK, United States, Canada, and the Gulf",
      "Pioneered female participation in professional gospel recording in Pakistan",
      "Champion of traditional Punjabi Zaboor vocal execution"
    ],
    keyZaboorOrGeet: [
      "Mukti Dilaye Yeshu Naam",
      "Zaboor 91 (Jehra Rab Di Pannah)",
      "Teri Mahima Howe",
      "Aasmani Khushi"
    ],
    era: "Veteran Gospel Icon"
  },
  {
    id: "benjamin-sisters",
    name: "Benjamin Sisters (Nerissa, Beena & Shabana)",
    badge: "Veteran Vocal Harmony Icons",
    role: "Renowned Vocal Trio & Harmony Legends",
    status: "veteran",
    category: "singer",
    dates: "1980s–Present",
    academicCredentials: "National TV Icons & Master Polyphonic Vocalists",
    bio: "Daughters of the venerable music teacher Victor Benjamin, the Benjamin Sisters captured the hearts of Pakistan on PTV and recorded unforgettable Christian hymns that defined an era of crystalline three-part harmony.",
    majorContributions: [
      "Pioneered polyphonic vocal harmonies on Pakistani national television",
      "Recorded historic Christmas and Easter gospel broadcasts",
      "Inspired multiple generations of female vocalists in sacred harmony"
    ],
    keyZaboorOrGeet: [
      "Khushi Khushi Manao",
      "Yeshu Paida Hua",
      "National & Sacred Harmonies"
    ],
    era: "Golden Era Harmony (Veterans)"
  },
  {
    id: "subhash-gill",
    name: "Subhash Gill",
    badge: "Veteran Gospel Vocalist & Lyricist",
    role: "Veteran Gospel Singer, Lyricist & Evangelist",
    status: "veteran",
    category: "both",
    dates: "1960–Present",
    academicCredentials: "Classical Vocalist & Prolific Geet Writer",
    bio: "A respected veteran singer and lyricist whose introspective devotional compositions and expressive voice have enriched church services and convention stages for over thirty years.",
    majorContributions: [
      "Penned over 150 spiritual geets sung across Pakistani denominations",
      "Championed acoustic harmonium arrangements in modern church ministry",
      "Regular musical contributor to South Asian Christian media networks"
    ],
    keyZaboorOrGeet: [
      "Yeshu Mere Sath Hai",
      "Zaboor 42 (Jiven Harni Labhdi)",
      "Kripa Kar Prabhu"
    ],
    era: "Veteran Composer & Singer"
  },
  {
    id: "isaac-mall",
    name: "Isaac Mall",
    badge: "Veteran Studio Producer & Composer",
    role: "Veteran Music Composer, Studio Producer & Multi-Instrumentalist",
    status: "veteran",
    category: "composer",
    dates: "1965–Present",
    academicCredentials: "Master Audio Engineer & Contemporary Gospel Arranger",
    bio: "Master arranger and producer who shaped the sonic quality of countless bestselling Pakistani Christian audio cassettes, CDs, and YouTube productions across the 1990s and 2000s.",
    majorContributions: [
      "Engineered hundreds of landmark gospel albums in Lahore and Karachi studios",
      "Pioneered modern synthesizer and drum programming for South Asian gospel music",
      "Collaborated with top tier vocalists to produce enduring worship anthems"
    ],
    keyZaboorOrGeet: [
      "Studio Orchestrations for Ernest Mall, Sarah Albert, and Arshad Khalid",
      "Contemporary Zaboor Rhythms",
      "Choral Backing Arrangements"
    ],
    era: "Veteran Producer & Arranger"
  },
  {
    id: "samson-samuel",
    name: "Samson Samuel",
    badge: "Veteran Harmonium & Classical Maestro",
    role: "Classical Harmonium Virtuoso & Gospel Music Director",
    status: "veteran",
    category: "both",
    dates: "1958–Present",
    academicCredentials: "Ustad-grade Harmonium Virtuosity & Indian Classical Raga Mastery",
    bio: "One of the undisputed masters of the harmonium in Pakistani Christian music, accompanying the nation's foremost classical singers and directing convention orchestras with dazzling improvisational skill.",
    majorContributions: [
      "Master accompanist for legendary classical Christian concerts and PTV recordings",
      "Preserved intricate raga gamaks and tans in devotional church singing",
      "Educated hundreds of church keyboardists and harmonium players"
    ],
    keyZaboorOrGeet: [
      "Classical Raga Harmonium Preludes",
      "Improvisations on Raag Bhairavi & Bilawal",
      "Liturgical Zaboor Accompaniments"
    ],
    era: "Veteran Classical Maestro"
  },
  {
    id: "pervaiz-peter",
    name: "Pervaiz Peter",
    badge: "Veteran Keyboardist & Arranger",
    role: "Veteran Music Director, Keyboardist & Arranger",
    status: "veteran",
    category: "composer",
    dates: "1962–Present",
    academicCredentials: "Western Classical Harmony & South Asian Raga Synthesis",
    bio: "Renowned keyboard maestro and musical director who bridged Western chordal voicings with traditional Pakistani Christian melodies across dozens of high-profile albums.",
    majorContributions: [
      "Arranged groundbreaking orchestrations for contemporary worship leaders",
      "Pioneered digital recording workflows for independent Christian artists in Pakistan",
      "Conducted large convention choirs across the nation"
    ],
    keyZaboorOrGeet: [
      "Contemporary Convention Arrangements",
      "Electronic Praise Orchestrations",
      "Zaboor Medleys"
    ],
    era: "Veteran Music Director"
  },
  {
    id: "victor-samuel",
    name: "Victor Samuel",
    badge: "Veteran Violinist & Choral Maestro",
    role: "Classical Violinist, Choral Conductor & Composer",
    status: "veteran",
    category: "both",
    dates: "1960–Present",
    academicCredentials: "Western Classical Violin & Hindustani Instrumental Raga",
    bio: "Eminent Christian violinist whose sweeping string sections and classical violin solos have embellished Pakistan's most revered sacred recordings and cathedral ceremonies.",
    majorContributions: [
      "Featured string soloist on national television and studio gospel tracks",
      "Conducted cathedral choirs in Handel's Messiah and sacred cantatas",
      "Mentored young string players within the Christian community"
    ],
    keyZaboorOrGeet: [
      "Sacred Violin Cantatas",
      "Zaboor 23 String Accompaniment",
      "Easter & Christmas Orchestrations"
    ],
    era: "Veteran Instrumental Maestro"
  },
  {
    id: "morris-gill",
    name: "Morris Gill",
    badge: "Veteran Evangelist & Vocalist",
    role: "Veteran Gospel Singer & Hymn Writer",
    status: "veteran",
    category: "both",
    dates: "1964–Present",
    academicCredentials: "Evangelistic Hymnody & Pastoral Ministry",
    bio: "Passionate gospel vocalist and evangelist known for writing catchy, heartfelt geet that emphasize salvation through grace, repentance, and the imminent return of Christ.",
    majorContributions: [
      "Prolific crusade singer drawing massive crowds across Pakistan's major cities",
      "Authored widely loved convention choruses sung in rural and urban churches alike",
      "Extensive overseas tours serving South Asian immigrant churches"
    ],
    keyZaboorOrGeet: [
      "Yeshu Paak Masih",
      "Khoon-e-Masih Mein Shifa Hai",
      "Zaboor 46 (Khuda Hamara Malja Hai)"
    ],
    era: "Veteran Singer & Songwriter"
  },
  {
    id: "anil-kant",
    name: "Anil Kant",
    badge: "Global Worship Pioneer",
    role: "International Worship Leader, Songwriter & Evangelist",
    status: "current",
    category: "both",
    dates: "1960–Present",
    academicCredentials: "Global Television Broadcaster & International Worship Evangelist",
    bio: "Renowned across Pakistan, India, and the worldwide South Asian diaspora for contemporary Hindi and Urdu worship music that bridges cultural boundaries with uncompromised biblical clarity.",
    majorContributions: [
      "Composer of globally recognized worship anthems like 'Pray For India', 'Ibadat Karo', and 'Yeshu Masih Deta Khushi'",
      "Produced award-winning television and streaming worship broadcasts reaching millions weekly",
      "Extensive worldwide crusade worship ministry uniting South Asian communities globally"
    ],
    keyZaboorOrGeet: [
      "Ibadat Karo",
      "Yeshu Masih Deta Khushi",
      "Tu Hi Rab Hai",
      "Khuda Se Shanti Milti Hai"
    ],
    era: "Contemporary Global Pioneer"
  },
  {
    id: "arshad-khalid",
    name: "Arshad Khalid",
    badge: "Contemporary Veteran & Studio Pioneer",
    role: "Contemporary Worship Leader, Composer & Studio Producer",
    status: "current",
    category: "both",
    dates: "1970–Present",
    academicCredentials: "Contemporary Sound Production & Youth Worship Direction",
    bio: "A dynamic worship leader, vocalist, and producer known for blending traditional Punjabi rhythmic energy with modern contemporary instrumentation, inspiring younger generations in exuberant praise.",
    majorContributions: [
      "Revolutionized youth worship concerts and convention praise across Pakistan",
      "Produced high-impact multi-artist collaboration albums",
      "Established state-of-the-art recording facilities for Christian artists in Lahore"
    ],
    keyZaboorOrGeet: [
      "Zaboor 150 (Taareef Karo)",
      "Yeshu Tere Pyar Di Gall",
      "Ruh Da Chashma",
      "Teri Bandagi Karoon"
    ],
    era: "Contemporary Veteran"
  },
  {
    id: "asher-george",
    name: "Asher George",
    badge: "Contemporary Worship Artist",
    role: "Contemporary Gospel Singer, Songwriter & Musician",
    status: "current",
    category: "both",
    dates: "Contemporary",
    academicCredentials: "Modern Worship Composition & Acoustic Melody",
    bio: "A prominent contemporary voice in Pakistani gospel music whose heartfelt lyrical simplicity and melodic sincerity have made him a favorite across youth conventions and digital streaming platforms.",
    majorContributions: [
      "Produced viral gospel releases on YouTube reaching millions of global listeners",
      "Leading praise and worship across national conventions in Pakistan and the Middle East",
      "Pioneered modern acoustic and piano-led devotional hymnody"
    ],
    keyZaboorOrGeet: [
      "Tere Paas Aate Hain",
      "Yeshu Tu Hi Mera Sahara",
      "Zaboor 121 Modern Arrangement"
    ],
    era: "Current Generation"
  },
  {
    id: "shahzad-gill",
    name: "Shahzad Gill",
    badge: "Contemporary Vocalist & Arranger",
    role: "Contemporary Worship Artist & Recording Soloist",
    status: "current",
    category: "singer",
    dates: "Contemporary",
    academicCredentials: "Modern Studio Vocals & Convention Worship Leadership",
    bio: "Dynamic gospel singer known for his rich vocal tone and powerful live convention worship sets that bring together youth and senior congregants in deep devotion.",
    majorContributions: [
      "Regular headline artist at major national Christian conventions and Easter parades",
      "Released multiple celebrated digital worship albums",
      "Dedicated champion of Punjabi Zaboor revival among youth"
    ],
    keyZaboorOrGeet: [
      "Yeshu Naam Ki Jai",
      "Zaboor 100",
      "Worship Anthems"
    ],
    era: "Current Generation"
  },
  {
    id: "justin-bhatti",
    name: "Justin Bhatti",
    badge: "Contemporary Producer & Bassist",
    role: "Music Producer, Bass Virtuoso & Sound Engineer",
    status: "current",
    category: "composer",
    dates: "Contemporary",
    academicCredentials: "Modern Bass Techniques & Advanced Multi-track Mixing",
    bio: "Acclaimed music producer and session bassist who has produced and engineered breakthrough tracks for leading Pakistani Christian worship artists, bringing international sonic polish to indigenous gospel songs.",
    majorContributions: [
      "Arranged and mixed dozens of high-streaming Christian songs on Spotify and YouTube",
      "Introduced contemporary bass grooves to traditional Punjabi worship rhythms",
      "Operates one of the premier gospel production suites in Lahore"
    ],
    keyZaboorOrGeet: [
      "Studio Productions for Top Tier Worship Artists",
      "Bass Arrangements on Contemporary Zaboor Singles",
      "Convention Live Sound Engineering"
    ],
    era: "Current Generation"
  },
  {
    id: "akash-sagar",
    name: "Akash Sagar",
    badge: "Contemporary Singer & Youth Icon",
    role: "Gospel Singer, Songwriter & Digital Worship Artist",
    status: "current",
    category: "both",
    dates: "Contemporary",
    academicCredentials: "Digital Gospel Music Production & Youth Ministry",
    bio: "Young and influential worship artist whose original compositions and energetic live presentations have engaged hundreds of thousands of youth across Pakistan and the international diaspora.",
    majorContributions: [
      "Multi-million streaming worship tracks on social and streaming platforms",
      "Leading national youth rallies and evangelistic concerts",
      "Collaborations with cross-border South Asian worship leaders"
    ],
    keyZaboorOrGeet: [
      "Barkat De",
      "Yeshu Mera Sab Kujh",
      "Zaboor 23 Contemporary Rhythms"
    ],
    era: "Current Generation"
  },
  {
    id: "rohit-gill",
    name: "Rohit Gill",
    badge: "Contemporary Gospel Vocalist",
    role: "Worship Artist & Devotional Vocalist",
    status: "current",
    category: "singer",
    dates: "Contemporary",
    academicCredentials: "Devotional Vocal Styling & Live Church Ministry",
    bio: "Talented contemporary vocalist whose devotion-filled tracks and emotive voice have become staple features of contemporary church worship across Pakistan.",
    majorContributions: [
      "Recorded soulful renditions of classic Masihi Geet and modern ballads",
      "Active participant in nationwide church revival conferences",
      "Advocate of vocal training for church worship teams"
    ],
    keyZaboorOrGeet: [
      "Mera Sahara",
      "Yeshu Tu Mahan Hai",
      "Aasmani Noor"
    ],
    era: "Current Generation"
  },
  {
    id: "sonia-robin",
    name: "Sonia Robin",
    badge: "Contemporary Female Worship Leader",
    role: "Worship Soloist & Recording Artist",
    status: "current",
    category: "singer",
    dates: "Contemporary",
    academicCredentials: "Soprano Devotional Vocalist & Liturgical Singer",
    bio: "A prominent female voice in the contemporary Pakistani gospel scene, inspiring women and youth in reverent worship with her crystalline soprano delivery.",
    majorContributions: [
      "Released beloved recordings of classical Zaboor and modern geet",
      "Led praise in international diaspora conventions across Europe and UAE",
      "Championed women's worship ministries across Pakistan"
    ],
    keyZaboorOrGeet: [
      "Yeshu Mera Khuda",
      "Zaboor 91 Solos",
      "Rooh-e-Khuda"
    ],
    era: "Current Generation"
  },
  {
    id: "shazia-bashir",
    name: "Shazia Bashir",
    badge: "Classical Gospel Vocalist",
    role: "Classical Gospel Vocalist & Ghazal Singer",
    status: "current",
    category: "singer",
    dates: "Contemporary",
    academicCredentials: "Daughter of Maestro Dr. Bashir Anwar — Classical Gharana Lineage",
    bio: "Daughter of the late classical master Dr. Bashir Anwar, Shazia Bashir preserves her family’s revered classical gharana lineage, singing intricate raga-based Masihi Geet with consummate technical grace.",
    majorContributions: [
      "Carrying forward the classical Christian heritage of Dr. Bashir Anwar",
      "Performs classical raga-based geet for national broadcasts and church festivals",
      "Teaches classical vocal techniques to emerging gospel vocalists"
    ],
    keyZaboorOrGeet: [
      "Classical Raga Selections of Dr. Bashir Anwar",
      "Ghazal-Style Masihi Geet",
      "Zaboor 34 Classical Solo"
    ],
    era: "Current Generation"
  }
];

/**
 * Combined complete registry of all pioneers, veterans, deceased masters, and current artists
 */
export const ALL_GOSPEL_SINGERS: SingerRecord[] = [
  ...HONORED_DIN_DYNASTY,
  ...HISTORIC_PIONEERS_AND_MAESTROS,
  ...VETERANS_AND_CONTEMPORARY_SINGERS
];

// Alias for backward compatibility
export const PIONEERS_AND_SINGERS = ALL_GOSPEL_SINGERS;
