import { TheologyCategory } from '../../types.js';

const category_14: TheologyCategory = {
  id: '14',
  title: 'Early Church Fathers & Councils',
  subtitle: 'The Architects of Christian Orthodoxy',
  overview: 'How the earliest Christian leaders and global councils shaped the doctrine we believe today. Last updated on November 21, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. Overview of the Formative Centuries**
The Early Church Fathers and Ecumenical Councils represent the foundation of Christian doctrine, occurring between the 1st and 5th centuries. These leaders battled heresies, clarified the Trinity, defended the deity and humanity of Jesus, shaped the Bible canon, and created the creeds that all major Christian groups still affirm today.

---

### **II. Timeline of Early Church History (100–500 AD)**
• **33–100 AD** — Apostolic Era: The age of the original apostles.
• **100–200 AD** — Apostolic Fathers: Direct disciples of the apostles (The bridge era).
• **200–325 AD** — Ante-Nicene Fathers: Defenders of the faith before the official councils.
• **325–451 AD** — Ecumenical Councils: Period where core doctrine was formally defined.
• **451 AD** — Council of Chalcedon: Finalization of orthodox Christology.

---

### **III. The Four Eras of Church Fathers**

#### **🟦 1. Apostolic Fathers (100–150 AD)**
*Direct students of the apostles—the bridge between the Bible and Church history.*
• **Ignatius of Antioch**: Bishop taught by Apostle John. Defender of Christ's Deity and Church unity. Famous quote: *“I am God’s wheat, ground by beasts to become pure bread.”*
• **Polycarp of Smyrna**: Disciple of John. Martyr who served Christ for 86 years.
• **Clement of Rome**: Likely the Clement from Philippians 4:3.

#### **🟩 2. Ante-Nicene Fathers (150–325 AD)**
*Defenders of the faith before official councils existed.*
• **Irenaeus of Lyons**: Refuted Gnosticism in *Against Heresies*. Emphasized the four-fold Gospel.
• **Tertullian**: The "Father of Latin Theology." First to use the term **"Trinity"** (*Trinitas*).
• **Origen of Alexandria**: Prolific scholar who created the *Hexapla* Bible study tool.

#### **🟥 3. Nicene Fathers (325–381 AD)**
*The defenders of the Trinity after Nicaea.*
• **Athanasius of Alexandria**: The "Black Dwarf" who stood *Athanasius contra mundum* (against the world) defending Christ's divinity.
• **The Cappadocian Fathers**: Refined the doctrine of the Holy Spirit's divinity.

#### **🟧 4. Post-Nicene Fathers (381–500 AD)**
*Shaped Western and Eastern Christian theology.*
• **Augustine of Hippo**: Most influential Western theologian. Taught on Grace and Original Sin.
• **Jerome**: Translator of the **Latin Vulgate**.
• **John Chrysostom**: The "Golden-Mouth" preacher.

---

### **IV. Summary of Major Ecumenical Councils**
1. **Nicaea (325 AD)**: Confirmed Jesus is fully God (*Homoousios*). Address Arianism.
2. **Constantinople (381 AD)**: Confirmed the Holy Spirit is God. Expanded the Creed.
3. **Ephesus (431 AD)**: Confirmed Jesus is one person, not two. Addressed Nestorianism.
4. **Chalcedon (451 AD)**: Confirmed Jesus has two natures (100% God, 100% Man) in one person.

---

### **V. Additional Insights**
1. **The Canon**: Athanasius’ 39th Festal Letter (367 AD) was the first to list the exact 27 NT books we use today.
2. **Councils vs Scripture**: Councils did not replace Scripture; they clarified its meaning against distortions.`,
    tables: [
      {
        title: 'TABLE 1 — KEY EARLY CHURCH FATHERS',
        headers: ['Father', 'Era', 'Major Contribution', 'Opposed Heresy'],
        rows: [
          ['Ignatius', '🟦 Apostolic', 'Christ’s deity, unity of Church', 'Docetism'],
          ['Polycarp', '🟦 Apostolic', 'Faithfulness, martyrdom', 'Gnosticism'],
          ['Irenaeus', '🟩 Ante-Nicene', 'Canon defense, four Gospels', 'Gnosticism'],
          ['Tertullian', '🟩 Ante-Nicene', 'Coined the term "Trinity"', 'Roman paganism'],
          ['Athanasius', '🟥 Nicene', 'Trinity defense, Nicene Creed', 'Arianism'],
          ['Augustine', '🟧 Post-Nicene', 'Grace, original sin, theology', 'Pelagianism']
        ]
      },
      {
        title: 'TABLE 2 — THE ECUMENICAL COUNCILS',
        headers: ['Council', 'Year', 'Issue', 'Decision'],
        rows: [
          ['Nicaea I', '325', 'Is Jesus God?', 'Yes, fully God (Homoousios)'],
          ['Constantinople I', '381', 'Is Holy Spirit God?', 'Yes, fully God'],
          ['Ephesus', '431', 'Is Jesus 1 person?', 'Yes, one person'],
          ['Chalcedon', '451', 'Nature of Christ?', 'Two natures, one person']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'ignatius',
        title: 'The Wheat of God',
        description: 'Ignatius of Antioch, facing martyrdom in Rome, describes his sacrifice as becoming pure bread for Christ.',
        scripture: '2 Timothy 4:6',
        imagePrompt: 'Ignatius of Antioch in the Roman Coliseum, lions in shadow, serene expression, dramatic lighting, epic historical style.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'nicaea-concl',
        title: 'The Battle for the Creed',
        description: 'Bishops at Nicaea debate the nature of Christ, standing firm against the Arian heresy.',
        scripture: 'John 1:1',
        imagePrompt: 'Ancient church council room, bishops in robes holding scrolls, intense debate, central glowing light, cinematic scale.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'augustine-grace',
        title: 'Augustine and the Doctor of Grace',
        description: 'St. Augustine writing "The City of God" during the fall of the Roman Empire, anchoring hope in eternity.',
        scripture: 'Romans 5:1',
        imagePrompt: 'A scholar writing by candlelight in an ancient library, ruins of Rome visible through window at sunset, high contrast.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_14;
