import { TheologyCategory } from '../../types.js';

const category_24: TheologyCategory = {
  id: '24',
  title: "The Lord's Prayer",
  subtitle: 'How Jesus Taught Us to Pray',
  overview: 'A theological, practical, and devotional exploration of the prayer Jesus gave His disciples as a blueprint for kingdom-centered life. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. Why Did Jesus Teach This Prayer?**
The Lord’s Prayer is not just a script to memorize—it is a blueprint for the Christian life. Jesus gave it because people had lost the heart of prayer, turning it into showy ritualism. When the disciples asked, *“Lord, teach us to pray”* (**Luke 11:1**), He provided this pattern to teach the correct posture, priorities, and pattern of kingdom-centered communication with God.

---

### **II. The Prayer (Matthew 6:9–13)**
> “Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from evil.”

---

### **III. The Seven Pillars of the Prayer**

**1. “Our Father in Heaven” — Identity & Relationship**
Jesus begins with relationship, not ritual. It teaches that God is not a distant force but an intimate Father (*Abba*), yet one who resides in "heaven"—reminding us of His supreme authority and majesty. It is "Our" Father, emphasizing the community of the church.
*Key Verses: Romans 8:15; Galatians 4:6; Psalm 103:19*

**2. “Hallowed Be Your Name” — Worship First**
To “hallow” means to honor as holy. Prayer begins with reverence. Before we ask for anything, we acknowledge that God’s character and reputation are the most important realities in the universe.
*Key Verses: Psalm 96:8–9; 1 Peter 1:15–16*

**3. “Your Kingdom Come” — Aligning With Mission**
This is a prayer of surrender. We are asking for God’s reign to expand in hearts, families, and nations, and for the ultimate return of Christ to establish His visible kingdom.
*Key Verse: Matthew 6:33*

**4. “Your Will Be Done” — Obedience Before Request**
Jesus modeled this perfectly in Gethsemane (*“Not my will, but yours”*). Prayer is not about bending God to our will, but bending our will to His perfect, sovereign plan.
*Key Verse: Luke 22:42*

**5. “Give Us This Day Our Daily Bread” — Dependence**
“Bread” represents everything necessary for physical and spiritual life. It teaches daily dependence—relying on God’s provision one day at a time rather than hoarding for self-sufficiency.
*Key Verses: Philippians 4:19; Psalm 37:25*

**6. “Forgive Us… as We Forgive” — Healing Relationships**
Sin breaks fellowship. This line reminds us that we cannot truly receive the grace we refuse to give to others. Bitterness is a block to effective prayer.
*Key Verses: 1 John 1:9; Matthew 18:21–35*

**7. “Deliver Us From Evil” — Spiritual Warfare**
We acknowledge our weakness. We ask God to protect us from the "evil one" (Satan) and to provide escape routes when we are tested.
*Key Verses: 1 Corinthians 10:13; James 4:7*

---

### **VI. Common Misunderstandings**
• ❌ **“It’s just a ritual prayer.”** — *Correction: It is a model for the heart's posture, not just words to repeat.*
• ❌ **“God already knows, so why pray?”** — *Correction: Prayer shapes us and invites us into God's active work; it is about relationship, not just information.*
• ❌ **“Forgiveness is optional.”** — *Correction: Jesus explicitly ties our experience of God’s forgiveness to our willingness to forgive others.*`,
    tables: [
      {
        title: 'THE TWO HALVES OF THE PRAYER',
        headers: ['Section', 'Focus', 'Theological Theme'],
        rows: [
          ['God\'s Glory (Thy-section)', 'The Name, Kingdom, and Will of God', 'Vertical: Priority of God\'s Honor'],
          ['Our Needs (Us-section)', 'Provision, Pardon, and Protection', 'Horizontal: Human Dependence on Grace']
        ]
      },
      {
        title: 'EARLY CHURCH USAGE',
        headers: ['Context', 'Application'],
        rows: [
          ['Liturgical', 'Recited three times daily in many early communities (Didache).'],
          ['Baptismal', 'Taught to new converts as the "Prayer of the Faithful."'],
          ['Warfare', 'Used as a shield against demonic oppression and temptation.'],
          ['Communal', 'The primary prayer that united diverse house churches.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'lp-1',
        title: 'Lord, Teach Us',
        description: 'The disciples gathered around Jesus on a quiet hillside, hungering to know how to communicate with the Father.',
        scripture: 'Luke 11:1',
        imagePrompt: 'Jesus sitting on a grassy knoll with twelve attentive men, soft afternoon sun, intimate atmosphere, oil painting style with warm tones.',
        colorTheme: '#4CAF50',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'lp-2',
        title: 'The Fatherly Embrace',
        description: 'A visual representation of the intimacy of "Abba, Father" combined with the majesty of the "King in Heaven."',
        scripture: 'Romans 8:15',
        imagePrompt: 'A small child holding the hand of a radiant, majestic King whose robes fill a celestial throne room, blend of intimate and epic scales, glowing light.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'lp-3',
        title: 'Deliverance from Darkness',
        description: 'A believer standing at a crossroads, protected by a pillar of light from a lurking shadow.',
        scripture: 'Matthew 6:13',
        imagePrompt: 'A lone traveler on a dark forest path, a brilliant column of light descending from heaven to surround them, dark shadowy figures recoiling in the background.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_24;
