import { TheologyCategory } from '../../types.js';

const category_26: TheologyCategory = {
  id: '26',
  title: 'Names of God',
  subtitle: "Understanding God's character through His revealed names in Scripture.",
  overview: "Revealing the identity and nature of the Father through His scriptural names. Last updated on November 22, 2025 (Asia/Karachi Timezone)",
  content: {
    analysis: `### **I. Why the Names of God Matter**
In Scripture, names are not just labels—they reveal identity, nature, authority, and covenant relationship. God reveals His names progressively as His people experience His character through history.

**The Progressive Revelation:**
• **Elohim** → The Mighty Creator.
• **Yahweh** → The Covenant God.
• **Yahweh-Jireh** → The Provider.
• **Yahweh-Rapha** → The Healer.
• **Yahweh-Shalom** → The Peace.

Each name tells a story of how God acts on behalf of His people, providing a specific facet of His infinite nature.

---

### **V. Names of God in the New Testament**
Jesus reveals God’s names in new fullness, primarily shifting the focus to the intimacy of the Fatherhood of God. Through Christ, the distant "Most High" becomes "Abba"—a term of deep familial trust and love.

**Key NT Revelations:**
• **Abba, Father**: Intimate relationship made possible through the Son.
• **Theos**: The standard Greek term for God, used of the Father, Son, and Spirit.
• **Pantokratōr**: The Almighty Ruler who holds all things together.

---

### **VIII. Theological Summary**
God’s names reveal four critical truths:
1. **His Being**: He is eternal, self-existent, and unchanging (*Yahweh*).
2. **His Character**: He is holy, righteous, and loving (*Kadosh*, *Tsidkenu*).
3. **His Covenant**: He binds Himself to His people in faithfulness (*Yahweh-Sabaoth*).
4. **His Mission**: To redeem humanity through Christ, the ultimate "Word" of God.`,
    tables: [
      {
        title: 'II. PRIMARY NAMES OF GOD (CORE OT NAMES)',
        headers: ['Name', 'Meaning', 'Description', 'Key Verse'],
        rows: [
          ['Elohim', 'God, Mighty Creator', 'Emphasizes power in creation. Plural of majesty.', 'Genesis 1:1'],
          ['Yahweh (YHWH)', 'The LORD, “I AM”', 'God’s covenant name; eternal and unchanging.', 'Exodus 3:14–15'],
          ['Adonai', 'Lord, Master', 'Expresses ownership, authority, and submission.', 'Genesis 15:2'],
          ['El Shaddai', 'God Almighty', 'God who is all-sufficient and more than enough.', 'Genesis 17:1'],
          ['El Elyon', 'God Most High', 'Supreme, sovereign God above all powers.', 'Genesis 14:18–22'],
          ['El Olam', 'Everlasting God', 'Emphasizes God\'s eternal and unchanging nature.', 'Genesis 21:33'],
          ['El Roi', 'The God Who Sees Me', 'God sees the oppressed and marginalized (Hagar).', 'Genesis 16:13']
        ]
      },
      {
        title: 'III. COMPOUND YAHWEH NAMES (COVENANT-ACTION)',
        headers: ['Name', 'Meaning', 'Description', 'Key Verse'],
        rows: [
          ['Yahweh-Jireh', 'The LORD Will Provide', 'Revealed to Abraham; foreshadows Christ.', 'Genesis 22:14'],
          ['Yahweh-Rapha', 'The LORD Who Heals', 'God heals physically, spiritually, emotionally.', 'Exodus 15:26'],
          ['Yahweh-Nissi', 'The LORD Is My Banner', 'The LORD is the source of victory in battle.', 'Exodus 17:15'],
          ['Yahweh-Shalom', 'The LORD Is Peace', 'Revealed to Gideon during oppression.', 'Judges 6:24'],
          ['Yahweh-Tsidkenu', 'The LORD Our Righteousness', 'Prophetic title of the coming Messiah.', 'Jeremiah 23:6'],
          ['Yahweh-Ra’ah', 'The LORD My Shepherd', 'God leads, protects, and provides for His own.', 'Psalm 23:1'],
          ['Yahweh-Shammah', 'The LORD Is There', 'God\'s eternal presence with His people.', 'Ezekiel 48:35'],
          ['Yahweh-Sabaoth', 'The LORD of Hosts', 'Commander of angelic armies; unmatched power.', '1 Samuel 1:3']
        ]
      },
      {
        title: 'IV. NEW TESTAMENT NAMES OF GOD',
        headers: ['NT Name', 'Meaning', 'Theological Context', 'Verse'],
        rows: [
          ['Abba', 'Father / Daddy', 'The intimacy of adoption through Christ.', 'Romans 8:15'],
          ['Pater ton Photón', 'Father of Lights', 'God as the source of all good and perfect gifts.', 'James 1:17'],
          ['Pantokratōr', 'Almighty / Ruler of All', 'Used extensively in Revelation to denote sovereignty.', 'Revelation 1:8'],
          ['Ho On', 'The One Who Is', 'The Greek equivalent to the Hebrew "I AM".', 'Revelation 1:4'],
          ['Theos Agapē', 'God is Love', 'The fundamental nature of God’s character.', '1 John 4:8']
        ]
      },
      {
        title: 'VI. SYMBOLIC & POETIC NAMES',
        headers: ['Title', 'Meaning / Metaphor', 'Spiritual Reality', 'Reference'],
        rows: [
          ['Rock', 'Tsur', 'Stability, refuge, and unchanging strength.', 'Psalm 18:2'],
          ['Fortress', 'Metshudah', 'Defense and protection in times of trouble.', 'Psalm 46:1'],
          ['Shield', 'Magen', 'Active protection for the believer.', 'Psalm 3:3'],
          ['Light', 'Or', 'Source of truth, holiness, and guidance.', 'Psalm 27:1'],
          ['Refiner', 'Tsaraph', 'The one who purifies His people through fire.', 'Malachi 3:3'],
          ['Bridegroom', 'Chatan', 'The covenant love between God and His people.', 'Isaiah 62:5']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'name-1',
        title: 'The Burning Bush',
        description: 'God revealing His personal, covenantal name "I AM" to Moses in the wilderness.',
        scripture: 'Exodus 3:14',
        imagePrompt: 'A lone acacia bush engulfed in bright golden flames that do not consume it, Moses bowing his face in the dust, desert mountains in the background, volumetric light.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Exodus'
      },
      {
        id: 'name-2',
        title: 'The Provider on the Mount',
        description: 'Abraham witnessing God’s provision of a ram, a foreshadowing of the Lamb of God.',
        scripture: 'Genesis 22:14',
        imagePrompt: 'A jagged mountain peak at dawn, a ram caught in thickets by its horns, warm sunrise light, biblical epic style, dramatic shadows.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Patriarchs'
      },
      {
        id: 'name-3',
        title: 'The God Who Sees',
        description: 'Hagar experiencing God’s presence and care in her moment of deepest isolation.',
        scripture: 'Genesis 16:13',
        imagePrompt: 'A woman in ancient robes sitting by a desert spring, a soft ethereal light surrounding her, sense of peace and divine presence, oil painting style.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Patriarchs'
      }
    ]
  }
};export default category_26;
