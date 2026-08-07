import { TheologyCategory } from '../../types.js';

const category_03: TheologyCategory = {
  id: '03',
  title: 'All Big Denominations & Their Differences',
  subtitle: 'Exploring the various Christian denominations and their unique beliefs and practices.',
  overview: 'A deep exploration of the history, governance, and doctrinal distinctions of the global Christian family. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **Detailed Analysis: What is a Denomination?**
A Christian denomination is a distinct religious body within Christianity, identified by traits such as a common name, structure, leadership, and doctrine. These bodies may be part of a larger branch of Christianity, such as Protestantism or Orthodoxy. 

**The Roots of Diversity:**
The divisions and groupings are a result of historical and theological disagreements that have occurred throughout the history of the Church. While all orthodox denominations agree on the core tenets of Christianity (the Trinity, the deity of Christ, His resurrection), they differ on "secondary" issues like church governance, the sacraments, and the interpretation of certain scriptures.

> "I appeal to you, brothers and sisters, in the name of our Lord Jesus Christ, that all of you agree with one another in what you say and that there be no divisions among you..." — **1 Corinthians 1:10**

---

### **The Three Great Branches**
1. **The Roman Catholic Church**: The largest body, emphasizing apostolic succession through the Pope and a blend of Scripture and Sacred Tradition.
2. **Eastern/Oriental Orthodoxy**: Ancient churches that separated in 1054 AD (Great Schism), emphasizing liturgy, icons, and the "mystery" of faith.
3. **Protestantism**: A diverse movement starting in 1517 AD (Reformation), emphasizing *Sola Scriptura* (Scripture Alone) and *Sola Fide* (Faith Alone).

---

### **Modern Movements & Global Expansion**
Beyond the historical branches, the 20th century saw the rise of **Pentecostalism** and **Evangelicalism**, which focus on personal conversion (being "Born Again") and the active work of the Holy Spirit.`,
    tables: [
      {
        title: 'I. KEY DOCTRINAL DIFFERENCES BY TRADITION',
        headers: ['Doctrine', 'Catholic / Orthodox', 'Reformed / Presbyterian', 'Baptist / Evangelical', 'Pentecostal / Charismatic'],
        rows: [
          ['Church Governance', 'Episcopal (Bishops)', 'Presbyterian (Elders)', 'Congregational (Autonomous)', 'Varies (often Episcopal or Cong.)'],
          ['Baptism', 'Infant baptism; seen as a sacrament that confers grace.', 'Infant baptism; seen as a sign of the covenant.', 'Believer\'s baptism only, by immersion.', 'Believer\'s baptism; emphasis on Spirit baptism.'],
          ['Communion (Eucharist)', 'Transubstantiation (Real Presence).', 'Spiritual presence.', 'Symbolic / Memorial view.', 'Symbolic view; emphasis on healing/power.'],
          ['Spiritual Gifts', 'Present, but often less emphasized in practice.', 'Cessationist (Sign gifts ceased with apostles).', 'Continuationist (Gifts continue).', 'Continuationist (Gifts are a primary focus).'],
          ['Scripture & Tradition', 'Scripture and Tradition are equal authorities.', 'Sola Scriptura (Scripture alone).', 'Sola Scriptura (Scripture alone).', 'Scripture is primary; value on personal experience.']
        ]
      },
      {
        title: 'II. THE GREAT DOCTRINAL MATRIX — 10 MAJOR BRANCHES',
        headers: ['Belief / Doctrine', 'Catholic', 'East. Ortho.', 'Orient. Ortho.', 'Prot. Main.', 'Evangelical', 'Pentecostal', 'LDS (Mormon)', 'Jehovah Witness', 'SDA', 'Unitarian'],
        rows: [
          ['Trinity', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ (3 beings)', '❌ (Jesus ≠ God)', '✔️ Yes', '❌ (One God)'],
          ['Jesus is God', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ No', '✔️ Yes', '❌ No'],
          ['Bible Canon', '73 books', '76–81 books', '81 books', '66 books', '66 books', '66 books', 'Bible + 3', 'Bible (NWT)', '66 books', 'Variable'],
          ['Tradition Authority', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ Bible Only', '❌ Bible Only', '❌ Bible Only', '❌ Extra books', '❌ Watchtower', '❌ Bible Only', '❌ Reason'],
          ['Head of Church', 'Pope', 'Patriarchs', 'Patriarchs', 'Synod', 'Local Pastors', 'Local Leaders', 'Prophet', 'Gov. Body', 'Gen. Conf.', 'None'],
          ['Faith Alone', '❌ No', '❌ No', '❌ No', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ (Faith+Wk)', '❌ No', '✔️ Yes', '❌ No'],
          ['Sacraments', '7', '7', '7', '2', '2 (sym.)', 'Variable', '4+', '1', '2', '0–1'],
          ['Infant Baptism', '✔️ Yes', '✔️ Yes', '✔️ Yes', 'Varies', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Real Presence', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ Symbolic', '❌ Symbolic', 'Varies', '❌ Symbolic', '❌ Symbolic', '❌ Symbolic', '❌ No'],
          ['Mary Veneration', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ No', '❌ No', '❌ No', '❌ Honored', '❌ No', '❌ No', '❌ No'],
          ['Purgatory', '✔️ Yes', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Apostolic Succ.', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ No', '❌ No', '❌ No', '✔️ Restored', '❌ No', '❌ No', '❌ No'],
          ['Tongues', '❌ No', '❌ No', '❌ No', '❌ No', '✔️ Sometimes', '✔️ Essential', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Afterlife', 'Heaven/Hell', 'Heaven/Hell', 'Heaven/Hell', 'Heaven/Hell', 'Heaven/Hell', 'Heaven/Hell', '3 Kingdoms', 'Earthly', 'Heav/Earth', 'Variable'],
          ['Icons/Images', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ No', '✔️ Some', '✔️ Yes', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Sat. Sabbath', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '✔️ Yes', '❌ No']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'tree-1',
        title: 'The Family Tree of Denominations',
        description: 'A visual branching tree showing the historical development of major Christian denominations from the early church to the present day.',
        scripture: 'John 17:21',
        imagePrompt: 'A massive ancient oak tree with glowing roots labeled Jerusalem, the trunk splitting into East and West, and then dozens of smaller branches labeled with denomination names. Ethereal light, parchment style.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'schism-1',
        title: 'The Great Schism of 1054',
        description: 'The moment the Church of the East and West formally parted ways, creating the Roman Catholic and Eastern Orthodox traditions.',
        scripture: 'Ephesians 4:3',
        imagePrompt: 'Two ancient bishops in distinct robes standing back to back in a majestic stone cathedral, a visible crack in the marble floor between them, dramatic lighting.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_03;
