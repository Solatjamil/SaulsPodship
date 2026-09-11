import { TheologyCategory } from '../../types.js';

const category_43: TheologyCategory = {
  id: '43',
  title: 'All Biblical Numerology',
  subtitle: 'The Mathematical Signature of Scripture',
  overview: 'A data-first library of Bible numbers: counts, patterns, and what the text actually says across the Protestant, Catholic, and Orthodox canons.',
  content: {
    analysis: `### **Introduction: Numbers as Narrative Scaffolding**
In the biblical world, numbers are rarely accidental. They function as literary scaffolding, structural markers, and theological symbols. However, "Biblical Numerology" is often a source of confusion because the "Total Counts" of the Bible vary depending on which historical canon and translation you are utilizing.

> "Teach us to number our days, that we may gain a heart of wisdom." — **Psalm 90:12**

### **I. How to Use Numbers Responsibly**
Scholars generally distinguish between three layers of biblical numbers:
1. **Textual Totals**: The physical count of books, chapters, and verses (varies by canon).
2. **Textual Motifs**: Numbers mentioned explicitly in the text as repeating patterns (e.g., 7, 40, 12).
3. **Assigned Patterns**: Numbers discovered through pattern-hunting or "Gematria." While interesting, these should be viewed with academic caution as results change based on the specific edition or language used.

---

### **II. The "Sevens" Framework of Revelation**
Nowhere is the numerical structure of the Bible more explicit than in the Book of Revelation. The judgments are not merely a list but a **nested sequence**:
• **7 Seals**: The opening of the scroll of destiny.
• **7 Trumpets**: Warning judgments that emerge from the opening of the 7th Seal.
• **7 Bowls**: The final outpouring of wrath that emerges from the 7th Trumpet.

This "7-7-7" structure emphasizes the completeness (*Heptadic* pattern) of God's sovereign plan for history.

---

### **III. Symbolic Motifs Outside Revelation**
• **7 (Completion)**: The Sabbath, the Lampstand, the Seven Spirits of God. It represents divine perfection.
• **12 (Governance)**: 12 Tribes, 12 Apostles, 12 Gates of the City. It represents the "people of God" under His authority.
• **40 (Testing)**: 40 days of rain (Noah), 40 years in the desert, 40 days of fasting (Jesus). It represents a period of transition or trial.
• **10 (Completeness in sets)**: 10 Commandments, 10 plagues. It represents a full or complete set of divine requirements.`,
    tables: [
      {
        title: 'IV. CORE BIBLE COUNTS (PROTESTANT 66-BOOK CANON)',
        headers: ['Metric', 'Total', 'Notes / Proof'],
        rows: [
          ['Total Books', '66', '39 Old Testament + 27 New Testament. [Source: Wikipedia](https://en.wikipedia.org/wiki/Biblical_canon)'],
          ['Total Chapters', '1,189', '929 OT + 260 NT. [Source: S. Conn. Church of Christ](https://www.sccoc.org/bible-facts)'],
          ['Total Verses (KJV)', '31,102', '23,145 OT + 7,957 NT. [Source: Bible Memory Goal](https://www.biblememorygoal.com/facts/)'],
          ['Shortest Verse', 'John 11:35', '“Jesus wept.” Shortest in English KJV. [Source: Wikipedia](https://en.wikipedia.org/wiki/John_11:35)'],
          ['Longest Verse', 'Esther 8:9', 'Often cited as longest in English translation. [Source: GotQuestions.org](https://www.gotquestions.org/longest-verse-in-the-Bible.html)']
        ]
      },
      {
        title: 'V. CROSS-CANON COMPARISON (TOTAL BOOKS)',
        headers: ['Tradition', 'Book Count', 'Notes'],
        rows: [
          ['Protestant', '66', 'Standard 39 OT + 27 NT structure.'],
          ['Catholic', '73', 'Includes 46 OT (with Deuterocanon) + 27 NT.'],
          ['Eastern Orthodox', 'Varies (76-81+)', 'Includes Psalm 151 and other additional writings like 3 Maccabees.'],
          ['Ethiopian Orthodox', '81', 'The broadest collection, including 1 Enoch and Jubilees.']
        ]
      },
      {
        title: 'VI. KEY REVELATION NUMBERS',
        headers: ['Number', 'Ref', 'Context & Link'],
        rows: [
          ['144,000', 'Rev 7:4', 'Those "sealed" from the tribes of Israel. [Study on 144,000](https://www.gotquestions.org/144000.html)'],
          ['666', 'Rev 13:18', 'The "number of the beast." [Study on 666](https://www.gotquestions.org/number-of-the-beast.html)'],
          ['1,000', 'Rev 20', 'The "thousand years" of the Millennial Reign. [Study on Millennium](https://www.gotquestions.org/millennium.html)'],
          ['24', 'Rev 4', 'The 24 Elders sitting on thrones before God.'],
          ['12', 'Rev 21', '12 gates, 12 foundations of the New Jerusalem.']
        ]
      },
      {
        title: 'VII. STORY UNITS (METHOD-BASED COUNTS)',
        headers: ['Method', 'Est. Total', 'Scholarly Rationale'],
        rows: [
          ['Pericope-Based', '~2,000+', 'Counts every distinct "thought unit" or sub-heading in modern Bibles.'],
          ['Major Event-Based', '100 - 150', 'Focuses only on world-altering events (Creation, Flood, Exodus, etc.).'],
          ['Parables Only', '35 - 40', 'Specific narrative units taught by Jesus in the Synoptic Gospels.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'num-1',
        title: 'The Nested Sevens',
        description: 'Visualizing the 7-7-7 recursive structure of the Revelation judgments.',
        scripture: 'Revelation 8:1',
        imagePrompt: 'A glowing golden scroll with 7 wax seals; as the 7th seal breaks, 7 angels with trumpets emerge; from the 7th trumpet, 7 golden bowls overflow. Abstract structural representation.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Restoration'
      },
      {
        id: 'num-2',
        title: 'The 12 Foundations',
        description: 'The New Jerusalem showing the perfection of divine governance in numbers.',
        scripture: 'Revelation 21:14',
        imagePrompt: 'A massive city gate made of a single giant pearl, resting on 12 distinct layers of colorful precious gemstones, translucent gold architecture.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Restoration'
      }
    ]
  }
};export default category_43;
