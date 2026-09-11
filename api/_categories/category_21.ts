import { TheologyCategory } from '../../types.js';

const category_21: TheologyCategory = {
  id: '21',
  title: 'Holy Communion',
  subtitle: 'The Lord’s Supper / Eucharist',
  overview: 'A theological, historical, and devotional exploration of the meal Jesus commanded His followers to remember Him by. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. What Is Holy Communion?**
Holy Communion (also called the Lord’s Supper, Eucharist, or Breaking of Bread) is the sacred meal Jesus instituted on the night before His crucifixion. It is one of the most central practices of the Christian faith.

**Communion is multiple things simultaneously:**
• **A Memorial** — Remembering Christ’s sacrifice.
• **A Proclamation** — Announcing His death until He returns.
• **A Participation** — Spiritually sharing in the benefits of the cross.
• **A Covenant Sign** — The New Covenant in Christ’s blood.

---

### **II. Biblical Foundations**
**1. The Institution of Communion**
Jesus Himself established Communion at Passover:
> “This is my body, given for you. Do this in remembrance of me.” — **Luke 22:19–20**

**2. The Early Church Practice**
“They devoted themselves to... the breaking of bread.” — **Acts 2:42**

**3. Proclaiming the Gospel**
“Whenever you eat this bread and drink this cup, you proclaim the Lord’s death until He comes.” — **1 Corinthians 11:26**

---

### **III. The Meaning of the Elements**

**The Bread: The Body of Christ**
• **His Incarnation**: God became human.
• **His Obedience**: His perfect life on our behalf.
• **His Sacrifice**: His suffering and physical death.
*Key Verses: John 6:35; 1 Peter 2:24; Isaiah 53:5; Matthew 26:26*

**The Cup: The Blood of Christ**
• **Forgiveness**: The price paid for our sins.
• **New Covenant**: The seal of our relationship with God.
• **Redemption**: Buying us back from the power of sin.
*Key Verses: Matthew 26:28; Ephesians 1:7; Hebrews 9:12–14*

---

### **VI. Communion as Covenant**
Communion fulfills Old Testament covenant structures:
1. **The Passover**: Christ becomes the true Passover Lamb.
2. **Sinai Covenant**: Communion is the sign of the New Covenant (**Jeremiah 31:31–34**).
3. **Sacrificial System**: Christ’s final sacrifice ends the need for animal blood.

---

### **VII. Heart Preparation & Participation**
**Who should take it?**
✔ Believers who confess Jesus as Lord and are walking in repentance.
✔ Those reconciled with others (**Matthew 5:23–24**).

**The Biblical Checklist:**
• **Examine yourself** (**1 Corinthians 11:28**).
• **Confess sin** and turn toward God.
• **Forgive others** and seek reconciliation.
• **Meditate** on Christ’s sacrifice with gratitude and awe.

---

### **IX. Communion and the Second Coming**
Communion looks back to the cross and forward to the return of Jesus:
> “I will not drink again of the fruit of the vine until I drink it new with you in my Father’s kingdom.” — **Matthew 26:29**

---

### **XII. Common Misunderstandings**
• ❌ **“Communion forgives sins.”** — *Correction: Only Christ’s death forgives sins; Communion remembers and proclaims it.*
• ❌ **“You must be perfect to take Communion.”** — *Correction: You must be repentant, not perfect. It is for sinners who need a Savior.*
• ❌ **“Communion is optional.”** — *Correction: Jesus commands us to do this “until He comes.”*`,
    tables: [
      {
        title: 'V. THE FOUR MAJOR THEOLOGICAL VIEWS',
        headers: ['View', 'Belief', 'Denominations'],
        rows: [
          ['Transubstantiation', 'Bread and wine become Christ’s literal body and blood.', 'Roman Catholic'],
          ['Consubstantiation', 'Christ is “in, with, and under” the elements.', 'Lutheran'],
          ['Spiritual Presence', 'Christ is spiritually present; believers truly commune with Him.', 'Reformed / Presbyterian'],
          ['Memorialism', 'Communion is a symbolic remembrance / ordinance.', 'Baptist / Evangelical / Pentecostal']
        ]
      },
      {
        title: 'X. OLD TESTAMENT FORESHADOWS',
        headers: ['OT Event', 'Foreshadowing', 'NT Fulfillment'],
        rows: [
          ['Passover', 'Blood saves from death', 'Christ = Passover Lamb (1 Cor 5:7)'],
          ['Manna', 'Heaven-sent bread for life', 'Jesus = Bread of Life (John 6:35)'],
          ['Covenant Meals', 'Meals that seal peace with God', 'New Covenant sealed in His blood'],
          ['Temple Sacrifices', 'Blood atonement for sin', 'Christ\'s final once-for-all sacrifice']
        ]
      },
      {
        title: 'XI. TRADITIONS AT A GLANCE',
        headers: ['Tradition', 'Primary Emphasis', 'Frequency'],
        rows: [
          ['Catholic', 'Liturgy of the Eucharist (Mass)', 'Daily / Weekly'],
          ['Orthodox', 'Divine Mystery', 'Weekly'],
          ['Reformed', 'Spiritual Nourishment', 'Weekly / Monthly'],
          ['Evangelical', 'Memorial & Obedience', 'Monthly / Quarterly'],
          ['Pentecostal', 'Healing & Spiritual Breakthrough', 'Variable']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'com-1',
        title: 'The Upper Room',
        description: 'Jesus instituting the New Covenant meal with His disciples during the Passover Seder.',
        scripture: 'Luke 22:19',
        imagePrompt: 'A dimly lit upper room in ancient Jerusalem, warm candlelight reflecting off a wooden table, Jesus breaking a loaf of bread, emotional disciples in shadow, cinematic chiaroscuro.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'com-2',
        title: 'The Manna in the Desert',
        description: 'God providing bread from heaven to sustain Israel, a type of the Bread of Life to come.',
        scripture: 'Exodus 16:15',
        imagePrompt: 'A vast desert encampment at dawn, white flakes like frost covering the ground, people gathering the manna in baskets, soft morning light.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Exodus'
      },
      {
        id: 'com-3',
        title: 'The Great Banquet',
        description: 'The future Marriage Supper of the Lamb, which Communion anticipates.',
        scripture: 'Revelation 19:9',
        imagePrompt: 'A colossal golden hall, infinite tables set with sparkling glass and white linen, radiant light emanating from the head of the table, ethereal and majestic.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Restoration'
      }
    ]
  }
};export default category_21;
