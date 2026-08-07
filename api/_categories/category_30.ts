import { TheologyCategory } from '../../types.js';

const category_30: TheologyCategory = {
  id: '30',
  title: 'Original Scripture Languages',
  subtitle: 'Hebrew, Aramaic, Koine Greek, and Latin: The Tongues of Revelation',
  overview: 'A scholarly exploration of the primary languages used in the transmission of the biblical text. Understand the linguistic nuances English translations often miss. Last updated on November 22, 2025.',
  content: {
    analysis: `### **I. Why Study the Bible in Its Original Languages?**
The Bible did not fall from heaven in English. It was written by real people in specific historical and linguistic contexts:
• **Hebrew**: The covenant language of Israel, designed for concrete, poetic, and relational expression.
• **Aramaic**: The language of exile and Jesus’ daily speech; used in later prophetic portions of the OT.
• **Koine Greek**: The "common" language of the 1st-century Mediterranean, incredibly precise and ideal for theological reasoning.
• **Latin**: The language of the Western Church for over 1,000 years, preserved in the Vulgate.

---

### **II. Interactive Polyglot Comparison Tool**
Below you will find the **Sacred Language Search**. This tool allows you to input a single keyword (e.g., "Love"), a phrase, a sentence, or a specific verse (e.g., "John 3:16") to see a side-by-side comparison across all five major biblical tongues.

**How to use:**
1. Type your search into the comparison field below.
2. Select "Analyze Across Tongues".
3. Review the unique scripts and the "Scholar's Nuance" for each result.

---

### **III. Biblical Hebrew (Old Testament)**
Hebrew is a "root-based" language. Most words come from a three-letter root that carries a core concept. It uses physical metaphors to describe spiritual realities (e.g., "patience" is literally "long-nosed").

---

### **IV. Aramaic in Scripture**
Aramaic portions exist in **Daniel 2:4–7:28** and **Ezra 4:8–6:18**. Jesus famously used Aramaic expressions on the cross, such as *"Eloi Eloi lama sabachthani"* (Mark 15:34).

---

### **V. Koine Greek (New Testament)**
Koine ("common") Greek was the trade language of the Roman Empire. Its complex verb system and rich vocabulary for "love" (Agape, Phileo, Storge, Eros) allow for extreme theological clarity.`,
    tables: [
      {
        title: 'VI. DIGITAL SCRIPTORIUM: READ ORIGINAL TEXTS',
        headers: ['Language', 'Source / Version', '📜 Primary Access Link', '📝 Description'],
        rows: [
          [
            'Hebrew',
            'Biblia Hebraica Stuttgartensia (BHS)',
            '[Read Hebrew OT](https://www.academic-bible.com/en/online-bibles/biblia-hebraica-stuttgartensia-bhs/read-the-bhs-online/)',
            'The standard critical edition of the Hebrew Bible (Masoretic Text).'
          ],
          [
            'Greek',
            'SBL Greek New Testament / Nestle-Aland',
            '[Read Greek NT](https://www.academic-bible.com/en/online-bibles/sbl-greek-new-testament/read-the-sblgnt-online/)',
            'High-precision scholarly text used for theological exegesis.'
          ],
          [
            'Aramaic',
            'Syriac Peshitta',
            '[Read Aramaic Scriptures](https://www.peshitta.org/)',
            'The ancient Aramaic version used by the Church of the East.'
          ],
          [
            'Latin',
            'Latin Vulgate (Clementine)',
            '[Read Latin Bible](https://www.biblegateway.com/passage/?search=Genesis+1&version=VULGATE)',
            'St. Jerome\'s historic translation that shaped Western theology.'
          ],
          [
            'English',
            'Interlinear / Cross-Ref',
            '[Step Bible (Multi-Lingual)](https://www.stepbible.org/)',
            'Powerful tool for comparing English with original language parsing.'
          ],
          [
            'Polyglot',
            'Blue Letter Bible',
            '[Strong\'s & Lexicon](https://www.blueletterbible.org/)',
            'Study tools for Greek/Hebrew word origins and definitions.'
          ]
        ]
      },
      {
        title: 'COMPARATIVE LINGUISTIC FEATURES',
        headers: ['Language', 'Script', 'Theological Utility'],
        rows: [
          ['Hebrew', 'Square / Abjad', 'Concrete imagery, covenantal intimacy, root-study.'],
          ['Aramaic', 'Syriac / cursive', 'Context of exile and the historical speech of Jesus.'],
          ['Greek', 'Alpha-Beta', 'Philosophical precision, complex syntax, legal clarity.'],
          ['Latin', 'Roman', 'Liturgical tradition and systematic organization.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'lang-1',
        title: 'The Scribe of the King',
        description: 'An ancient Hebrew scribe carefully inking the letters of the Torah, ensuring every stroke is perfect.',
        scripture: 'Psalm 45:1',
        imagePrompt: 'Close up of an ancient hand holding a reed pen, thick black ink on yellowed parchment, Hebrew calligraphy, warm lamp light, historical macro photography.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Kingdom'
      },
      {
        id: 'lang-2',
        title: 'The Great Translator',
        description: 'Jerome in his study, surrounded by Greek and Hebrew scrolls, translating the Word into Latin.',
        scripture: '2 Timothy 2:15',
        imagePrompt: 'A scholar in a candlelit stone room, stacks of scrolls and large vellum books, focused expression, cinematic Rembrandt-style lighting.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_30;
