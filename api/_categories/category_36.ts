import { TheologyCategory } from '../../types.js';

const category_36: TheologyCategory = {
  id: '36',
  title: 'Ten Commandments & OT Laws',
  subtitle: 'A complete theological, historical, and practical breakdown of the Old Testament Law.',
  overview: 'A complete theological, historical, and practical breakdown of the Old Testament Law. Last updated on November 23, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. The Structure of the Old Testament Law**
The Old Testament contains **613 commandments** (Mitzvot) in Jewish tradition. Theologians traditionally organize them into three distinct categories to understand their application today:

1. **Moral Law**: Eternal and unchanging. Rooted in God’s character and summarized in the **Ten Commandments**.
2. **Civil (Judicial) Law**: Laws for Israel as a nation-state (justice, property, penalties). Underlying principles reflect God's justice but the specific penalties were for the theocracy.
3. **Ceremonial Law**: Rituals, sacrifices, and festivals. Designed to point to Christ and fulfilled in His high priestly work.

---

### **II. The Moral Law (Eternal)**
The Moral Law is the only part of the OT Law that remains strictly binding in its letter and spirit for all people at all times.
• **Rooted in Character**: It reflects God's holiness.
• **Reaffirmed by Jesus**: In the Sermon on the Mount, Jesus deepened the law, showing that it applies to the heart, not just outward actions (**Matthew 5–7**).
• **Summary**: Love for God (Commands 1–4) and Love for Neighbor (Commands 5–10).

---

### **III. The Civil Law (Justice Principles)**
While the specific punishments (like stoning) belonged to the ancient Israelite context, the **principles** remain vital for modern ethics:
• **Human Dignity**: Protection of the weak and marginalized.
• **Equity**: Fair weights and honest business practices.
• **Accountability**: Restitution for theft or negligence.

---

### **IV. The Ceremonial Law (Fulfilled in Christ)**
Jesus fulfilled the ceremonial system by becoming:
• **The True Temple**: The dwelling place of God (**John 2:19**).
• **The Final Sacrifice**: The Lamb who takes away the sin of the world (**Hebrews 10:1–14**).
• **The High Priest**: Our eternal mediator (**Hebrews 4:14–16**).

---

### **VII. Jesus & the Law — Fulfillment, Not Abolition**
Jesus stated: *“I have not come to abolish the Law but to fulfill it”* (**Matthew 5:17**). 
Fulfillment means He completed the sacrificial system, showed perfect obedience, and revealed the true "heart-intent" of the commandments. Under the New Covenant, the Spirit writes these laws on our hearts (**Jeremiah 31:33**).

---

### **X. How Christians Use the OT Law Today**
• **Mirror**: To reveal our sin and need for a Savior.
• **Restraint**: To provide a baseline for civil order in society.
• **Guide**: To show believers the kind of life that pleases God.`,
    tables: [
      {
        title: 'V. THE TEN COMMANDMENTS (DECALOGUE)',
        headers: ['#', 'Commandment', 'NT Confirmation', 'Meaning in Daily Life'],
        rows: [
          ['1', 'No other gods', 'Matthew 4:10', 'God alone deserves ultimate loyalty.'],
          ['2', 'No idols', '1 John 5:21', 'Reject material or emotional idols.'],
          ['3', 'No misusing God’s name', 'Matthew 6:9', 'Honor God in speech and life.'],
          ['4', 'Keep Sabbath holy', 'Hebrews 4:9–11', 'Rest, worship, and trust God\'s provision.'],
          ['5', 'Honor parents', 'Matthew 15:4', 'Respect authority and household order.'],
          ['6', 'Do not murder', 'Matthew 5:21–22', 'Guard life; avoid hatred and violence.'],
          ['7', 'Do not commit adultery', 'Matthew 5:27–28', 'Purity in thought and body.'],
          ['8', 'Do not steal', 'Ephesians 4:28', 'Respect property; be generous.'],
          ['9', 'No false witness', 'Ephesians 4:25', 'Be truthful; reject gossip.'],
          ['10', 'Do not covet', 'Luke 12:15', 'Gratitude; avoid envy and greed.']
        ]
      },
      {
        title: 'VI. NUMBERING DIFFERENCES',
        headers: ['Tradition', 'How They Divide Commandments'],
        rows: [
          ['Jewish', 'Commandment 1 is "I am the LORD your God..."'],
          ['Catholic / Lutheran', 'Combine 1 & 2; split 10 (coveting wife vs. property).'],
          ['Protestant / Orthodox', 'Traditional 10-separations (as listed above).']
        ]
      },
      {
        title: 'VIII. LAW VS. GRACE SUMMARY',
        headers: ['Law', 'Grace'],
        rows: [
          ['Reveals sin', 'Removes sin'],
          ['Shows holiness', 'Empowers holiness'],
          ['Written on stone', 'Written on hearts'],
          ['Points to Christ', 'Fulfilled in Christ'],
          ['Condemns sinner', 'Saves sinner']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'law-1',
        title: 'The Thunder of Sinai',
        description: 'Moses ascending the mountain shrouded in smoke and fire to receive the tablets of the testimony.',
        scripture: 'Exodus 20:18',
        imagePrompt: 'A massive dark mountain peak engulfed in thick smoke and lightning, a tiny figure of a man in robes ascending toward a glowing summit, epic cinematic scale.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Exodus'
      },
      {
        id: 'law-2',
        title: 'The Heart of the Law',
        description: 'Jesus teaching the true depth of the commandments during the Sermon on the Mount.',
        scripture: 'Matthew 5:17',
        imagePrompt: 'Jesus seated on a green hillside, sunlight filtering through trees, a diverse group of listeners looking on in awe, peaceful and profound atmosphere.',
        colorTheme: '#4CAF50',
        // Fix: Added missing era
        era: 'Christ'
      }
    ]
  }
};export default category_36;
