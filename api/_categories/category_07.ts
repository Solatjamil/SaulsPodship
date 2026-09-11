import { TheologyCategory } from '../../types.js';

const category_07: TheologyCategory = {
  id: '09',
  title: 'Bible Book Writers',
  subtitle: 'The 40+ Hands that Penned the Sacred Text',
  overview: 'A comprehensive visual exploration of the prophets, priests, kings, and apostles who authored the 66 books of the Bible over 1,500 years. Tracing the human element from the tablets of Moses to the letters of Paul.',
  backgroundPrompt: 'An ancient dusty library with shafts of golden light, stacks of weathered papyrus scrolls, quills in ink pots, a focused scribe in shadows, cinematic atmosphere, 8k resolution.',
  content: {
    analysis: `### **The Architecture of Authorship**
The Bible is a divine-human synthesis. While traditionally held to be inspired by the Holy Spirit, it was written by men of diverse backgrounds: from the high-court education of **Moses** to the rugged fishing villages of **Peter**.

---

### **Major Literary Epochs**
Understanding authorship requires recognizing the different "schools" and periods of writing:
• **1. The Mosaic Core**: The foundations of Law and Narrative.
• **2. The Royal Golden Age**: The peak of Wisdom and Poetry under the Davidic line.
• **3. The Exilic Lament**: Prophetic voices speaking from the ruins of Babylon.
• **4. The Apostolic Witness**: The sudden, concentrated burst of New Testament writing in the 1st century.`,
    storyPanels: [
      {
        id: 'bw-1',
        era: 'Old Testament',
        title: 'The Mosaic Core',
        description: 'Moses, educated in the courts of Egypt, recording the foundations of the world and the Law of God.',
        scripture: 'Exodus 24:4',
        imagePrompt: 'Moses writing on a large stone tablet inside a tent, the glowing pillar of cloud visible outside, dramatic lighting, epic historical style.',
        colorTheme: '#4CAF50'
      },
      {
        id: 'bw-2',
        era: 'Old Testament',
        title: 'The Royal Poets',
        description: 'David and Solomon, the father and son who filled the Bible with the music of the Psalms and the grit of Proverbs.',
        scripture: 'Psalm 45:1',
        imagePrompt: 'A kingly figure playing a harp and reciting to a scribe in a golden palace hall, soft afternoon sun, elegant and creative atmosphere.',
        colorTheme: '#D4AF37'
      },
      {
        id: 'bw-3',
        era: 'Old Testament',
        title: 'The Visionary Prophets',
        description: 'Isaiah, Ezekiel, and Daniel: the men who saw the future and recorded the weight of divine judgment and hope.',
        scripture: '2 Peter 1:21',
        imagePrompt: 'An elderly prophet looking into a swirling storm of celestial light and fire, writing frantically on a long scroll, cinematic apocalyptic style.',
        colorTheme: '#8B1E3F'
      },
      {
        id: 'bw-4',
        era: 'New Testament',
        title: 'The Evangelists',
        description: 'Four distinct perspectives on the Life of Jesus: Matthew the Tax Collector, Mark the Scribe, Luke the Physician, and John the Beloved.',
        scripture: 'Luke 1:1-4',
        imagePrompt: 'Four men at different desks in a sun-drenched stone room, each writing in a different style, 1st century Mediterranean setting.',
        colorTheme: '#2196F3'
      },
      {
        id: 'bw-5',
        era: 'New Testament',
        title: 'The Apostle Paul',
        description: 'The prolific letter-writer who articulated the theology of grace to the Gentile world.',
        scripture: '2 Peter 3:15-16',
        imagePrompt: 'A man in chains in a dark Roman cell, writing by the light of a single candle, a pile of parchment at his feet, intense focus.',
        colorTheme: '#1D2D50'
      },
      {
        id: 'bw-6',
        era: 'New Testament',
        title: 'The Beloved John',
        description: 'The final survivor of the Twelve, recording the cosmic visions of Revelation on the island of Patmos.',
        scripture: 'Revelation 1:19',
        imagePrompt: 'An old man on a rocky island cliff at night, looking at a city of gold descending from the stars, writing in a book, surreal and majestic.',
        colorTheme: '#FF5722'
      }
    ],
    tables: [
      {
        title: 'I. THE TORAH & HISTORY',
        headers: ['Book Group', 'Primary Authors', 'Composition Context'],
        rows: [
          ['The Pentateuch', 'Moses (Traditional)', 'Written during the 40-year wilderness wandering.'],
          ['The Deuteronomists', 'Samuel / Jeremiah (Traditional)', 'Records of the rise and fall of the Monarchy.'],
          ['The Post-Exilic History', 'Ezra / Nehemiah', 'Rebuilding the identity of Israel after the return from Babylon.']
        ]
      },
      {
        title: 'II. WISDOM & PROPHECY',
        headers: ['Literary Genre', 'Key Figures', 'Manuscript Notes'],
        rows: [
          ['Wisdom Literature', 'Solomon, Job, Agur', 'Focuses on the "Fear of the LORD" and practical living.'],
          ['The Major Prophets', 'Isaiah, Jeremiah, Ezekiel', 'Lengthy scrolls containing national and global warnings.'],
          ['The Minor Prophets', 'The Twelve', 'A unified collection of shorter prophetic oracles.']
        ]
      },
      {
        title: 'III. THE GOSPELS & ACTS — Apostolic Testimony',
        headers: ['Book Group', 'Primary Authors', 'Composition Context'],
        rows: [
          ['The Gospels', 'Matthew, Mark, Luke, John', 'Four multi-perspective eyewitness accounts of Jesus’ life, death, resurrection, and divinity.'],
          ['Acts of the Apostles', 'Luke', 'A historical chronicle of the early church, apostolic mission, and global expansion of the Gospel.']
        ]
      },
      {
        title: 'IV. THE PAULINE EPISTLES — Systemic Theology',
        headers: ['Book Group', 'Primary Authors', 'Composition Context'],
        rows: [
          ['The Journey Epistles', 'Paul the Apostle', 'Thirteen pastoral, theological, and corrections-focused letters written to local churches.'],
          ['The Pastoral Epistles', 'Paul the Apostle', 'Direct apostolic instructions to young leaders (Timothy, Titus) on church order and oversight.']
        ]
      },
      {
        title: 'V. THE GENERAL EPISTLES & REVELATION — Global Endurance',
        headers: ['Book Group', 'Primary Authors', 'Composition Context'],
        rows: [
          ['The General Epistles', 'Peter, John, James, Jude, Hebrews Writer', 'Epistles addressed to the global church focusing on perseverance, theology, and ethical faith.'],
          ['The Apocalypse', 'John the Beloved', 'A comfort-giving, highly symbolic prophetic record of Christ\'s final victory over all evil kingdoms.']
        ]
      }
    ]
  }
};export default category_07;
