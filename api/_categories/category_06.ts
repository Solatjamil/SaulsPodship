import { TheologyCategory } from '../../types.js';

const category_06: TheologyCategory = {
  id: '06',
  title: 'Baptism, Sacraments & Circumcision',
  subtitle: 'The Covenant Signs of the Old and New Testaments',
  overview: 'A unified theological exploration of the sacred markers of identity, from the physical mark of the Abrahamic covenant to the spiritual immersion into Christ. Last updated on November 18, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **Baptism — Meaning, Power, Purpose**
Baptism is the New Testament entrance sign into God’s covenant family. It serves as the bridge between personal faith and corporate belonging, representing a profound ontological shift in the believer's standing before the Creator.

It represents:
• **Dying with Christ**: The radical end of the old life and the power of sin.
• **Resurrection**: Being raised by the Spirit to walk in permanent newness of life.
• **Washing**: The symbolic removal of spiritual filth through the blood of the Lamb.
• **Identity**: A public, non-reversible declaration of belonging to the Triune God.

*Key Verses: Matthew 3:13–17; Acts 2:38; Romans 6:3–4; Colossians 2:12; 1 Peter 3:21*

---

### **Sacraments — Visible Words**
Theologians often describe a sacrament as a "Visible Word"—a physical sermon that we taste, touch, or feel.

*“An outward and visible sign of an inward and spiritual grace, instituted by Christ himself.”*

These are not merely empty rituals or social traditions. They are covenant markers through which God, by His Spirit, strengthens the faith of the recipient and confirms His ancient promises. While traditions vary on the total number, **Baptism** and **Communion** are universally recognized as the twin pillars of Christian ordinance.

---

### **Communion — The Table of Remembrance**
The Lord's Supper (Eucharist) acts as a perpetual monument in time to the substitutionary death of Jesus. It is more than a memory; it is a spiritual participation in the life of Christ.

• It remembers the **broken body** of the Savior.
• It seals the **New Covenant** in His blood.
• It anticipates the future **Marriage Supper** of the Lamb.

*Key Verses: Luke 22:19–20; 1 Corinthians 10:16–17; 1 Corinthians 11:23–26*

---

### **Circumcision — The Shadow of the Substance**
Circumcision was the physical mark of Israel’s national and religious identity—a "shadow" of the reality to come. It marked the flesh to indicate that the seed of Abraham was set apart for God's global mission.

However, the New Testament reveals that physical cutting was a signpost for **spiritual transformation**. In Christ, the physical requirement is superseded by the "Circumcision of the Heart"—a work of the Spirit that removes the stubbornness of the sinful nature.

*Key Verses: Genesis 17:10–14; Romans 2:28–29; Colossians 2:11–12; Deuteronomy 10:16*`,
    tables: [
      {
        title: 'I. VIEWS OF COMMUNION ACROSS DENOMINATIONS',
        headers: ['Viewpoint', '📌 Meaning & 📖 Scripture', '💡 Theological Theme'],
        rows: [
          [
            '1',
            '📌 Transubstantiation\n📖 Matthew 26:26',
            '💡 The bread and wine literally become Christ’s body and blood. (Catholic/Orthodox Tradition).'
          ],
          [
            '2',
            '📌 Sacramental Union\n📖 1 Corinthians 10:16',
            '💡 Christ is "in, with, and under" the elements. (Lutheran Tradition).'
          ],
          [
            '3',
            '📌 Spiritual Presence\n📖 John 6:53–58',
            '💡 Christ is spiritually present to nourish the faith of the believer. (Reformed Tradition).'
          ],
          [
            '4',
            '📌 Memorial View\n📖 Luke 22:19',
            '💡 Symbolic remembrance only; "Do this in remembrance of Me." (Baptist/Pentecostal Tradition).'
          ]
        ]
      },
      {
        title: 'II. COVENANT SIGNS: OLD VS. NEW',
        headers: ['Aspect', '📌 Circumcision (Old)', '📌 Baptism (New)'],
        rows: [
          ['1', 'Covenant: Abrahamic (Physical Lineage)', 'Covenant: New (Spiritual Lineage)'],
          ['2', 'Subjects: Male Only', 'Subjects: Men & Women (Gal 3:28)'],
          ['3', 'Age: 8 Days Old', 'Age: Any (Entrance into Faith)'],
          ['4', 'Action: Cutting of Flesh', 'Action: Immersion in Water'],
          ['5', 'Meaning: Physical Separation', 'Meaning: Spiritual Resurrection']
        ]
      },
      {
        title: 'III. SACRAMENTAL TRADITIONS',
        headers: ['Tradition', '📌 Number & 📖 Key Concept', '📝 Names of Sacraments'],
        rows: [
          [
            'Catholic',
            '📌 7 Sacraments\n💡 Means of Grace',
            '📝 Baptism, Eucharist, Confirmation, Reconciliation, Marriage, Holy Orders, Anointing.'
          ],
          [
            'Protestant',
            '📌 2 Ordinances\n💡 Acts of Obedience',
            '📝 Baptism and the Lord\'s Supper (Communion).'
          ],
          [
            'Anglican',
            '📌 2 + 5\n💡 Dominical Sacraments',
            '📝 Primary: Baptism & Eucharist. Others: Confirmation, Marriage, etc.'
          ]
        ]
      }
    ],
    storyPanels: [
      {
        id: 'bap-1',
        title: 'The Jordan Baptism',
        description: 'Jesus descending into the waters as the heavens open and the Dove descends.',
        scripture: 'Matthew 3:16',
        imagePrompt: 'Cinematic wide shot of Jesus standing in the Jordan river, brilliant golden light beam from heavens, white dove descending, photorealistic, serene atmosphere.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'sac-1',
        title: 'The Upper Room',
        description: 'The breaking of bread that changed history; the institution of the New Covenant.',
        scripture: 'Luke 22:19',
        imagePrompt: 'High-contrast painting of the Last Supper, focus on hands breaking bread, warm candlelight, dramatic shadows, Da Vinci inspired but more gritty and historical.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'cir-1',
        title: 'Circumcision of the Heart',
        description: 'A metaphorical representation of the internal transformation from stone to flesh.',
        scripture: 'Ezekiel 36:26',
        imagePrompt: 'Conceptual art, a stone heart breaking open to reveal a living, glowing human heart inside. Ethereal light, surrealism, gold accents.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Prophets'
      }
    ]
  }
};export default category_06;
