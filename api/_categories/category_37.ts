import { TheologyCategory } from '../../types.js';

const category_37: TheologyCategory = {
  id: '37',
  title: 'The Magi',
  subtitle: "A historical and theological exploration of the 'Wise Men' from the East.",
  overview: 'A deep dive into the identity of the Magi, their origins in the Persian/Babylonian courts, and the cosmic significance of their journey to the Messiah. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. Who Were the Magi?**
The Magi (Greek: **μάγοι**, *magoi*) were a priestly caste from the ancient East, likely Persia (modern Iran) or Babylon (modern Iraq). In antiquity, they were the "scientists" and "philosophers" of their day. They were known for:
• **Astronomy & Astrology**: Mapping the stars to understand divine decrees.
• **Dream Interpretation**: Acting as bridge-builders between the spiritual and physical realms.
• **Political Counsel to Kings**: They were high-level advisors and "king-makers."
• **Studying Ancient Prophecies**: They kept records of various nations' sacred texts.

They were not kings themselves, but held significant political influence. The Prophet **Daniel** was appointed "chief of the magicians, enchanters, astrologers and diviners" (Magi) in Babylon (**Daniel 2:48**).

---

### **II. The Daniel Connection**
The most likely reason Persian Magi were searching for a "King of the Jews" is the influence of Daniel. While in exile, Daniel became the head of the Babylonian/Persian Magian order. He likely shared the prophecy of the **Seventy Weeks** (**Daniel 9**), which provided a specific timeline for the arrival of the "Anointed One, the ruler." The Magi of Jesus' day were likely the intellectual descendants of Daniel's students.

---

### **III. The Star of Bethlehem**
The Magi followed a "star" (*aster* in Greek). Biblical scholars and astronomers have debated its nature:
• **Natural Explanation**: A rare conjunction of Jupiter and Saturn, or a supernova.
• **Supernatural Explanation**: The **Shekinah Glory** of God—the same pillar of cloud and fire that led Israel in the Exodus—appearing as a localized celestial light to guide the Magi to the exact house.

---

### **IV. The Three Gifts and Their Meaning**
The Bible does not state there were exactly three Magi, but tradition infers this from the three types of gifts offered, which carry deep theological weight:
1. **Gold**: A gift for a **King**. Recognizing Jesus' royal sovereignty and right to rule.
2. **Frankincense**: A gift for a **Priest**. An incense used in temple worship, recognizing His role as mediator.
3. **Myrrh**: A gift for a **Sacrifice**. An embalming spice, prophetically pointing to His future death and burial for the sins of the world.

---

### **V. The Significance of the Visit**
The visit of the Magi represents the **Gentile Epiphany**. It demonstrates that Jesus is not just the Messiah of Israel, but the Light of the World, sought and worshiped by the ends of the earth.`,
    tables: [
      {
        title: 'TRADITION VS. SCRIPTURE',
        headers: ['Topic', 'Popular Tradition', 'Biblical Record'],
        rows: [
          ['Number', 'Exactly Three', 'Unspecified (likely a large caravan)'],
          ['Names', 'Caspar, Melchior, Balthazar', 'Anonymous'],
          ['Timing', 'At the stable on Christmas night', 'Months or years later in a house'],
          ['Status', 'Three Kings', 'Wise Men / Magi (Priestly Class)'],
          ['Ages', 'Representing three stages of life', 'Not mentioned']
        ]
      },
      {
        title: 'THE PROPHETIC GIFTS',
        headers: ['Gift', 'Symbolism', 'Sacred Office'],
        rows: [
          ['Gold', 'Purity, Value, Royalty', 'Kingship (Son of David)'],
          ['Frankincense', 'Prayer, Worship, Divinity', 'Priesthood (High Priest)'],
          ['Myrrh', 'Bitterness, Suffering, Embalming', 'Savior (The Atonement)']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'magi-1',
        title: 'The Great Observation',
        description: 'Magi in an ancient Persian observatory, surrounded by celestial maps and the scrolls of Daniel, witnessing the rising of the Star.',
        scripture: 'Matthew 2:2',
        imagePrompt: 'Ornately dressed Persian scholars on a stone observatory roof at night, glowing astrolabes, ancient Hebrew scrolls open on tables, a brilliant white-blue star reflecting in their eyes, epic atmosphere.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'magi-2',
        title: 'The Long Journey',
        description: 'The caravan of the Magi crossing the vast Arabian desert, guided by the singular radiant light in the night sky.',
        scripture: 'Matthew 2:1',
        imagePrompt: 'A massive caravan of camels with rich silk canopies moving across golden sand dunes under a giant silver moon and a radiant guiding star, cinematic scale.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'magi-3',
        title: 'The Royal Adoration',
        description: 'The Magi bowing in a simple Judean home, opening their treasures before the young Child.',
        scripture: 'Matthew 2:11',
        imagePrompt: 'Inside a simple stone house, the Magi in vibrant robes kneeling on the floor, holding out golden boxes, a young child on Mary\'s lap bathed in warm golden light, emotional and sacred atmosphere.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Christ'
      }
    ]
  }
};export default category_37;
