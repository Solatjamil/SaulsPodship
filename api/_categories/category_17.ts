import { TheologyCategory } from '../../types.js';

const category_17: TheologyCategory = {
  id: '17',
  title: 'Creation vs Science',
  subtitle: 'Genesis vs Modern Scientific Models',
  overview: 'A complete side-by-side comparison of how Scripture describes the origins of the universe versus what modern science concludes. Last updated on November 19, 2025.',
  content: {
    analysis: `### **The Great Inquiry: Origins and Order**
The question of origins is perhaps the most fundamental cross-section of theology and science. While some perceive an inherent conflict between the Genesis account and modern scientific models, many scholars find a profound harmony when considering the literary genres of Scripture and the observational limits of science.

This volume explores the four major Christian interpretations of Genesis, the scientific model of cosmic and biological origins, and how both frameworks understand time, matter, life, and purpose.

---

### **Four Major Theological Frameworks**

**Young Earth Creationism (YEC)**
• **Core Belief**: The Earth was created in six literal 24-hour days as described in Genesis 1.
• **Age Estimate**: ~6,000 to 10,000 years, based on biblical genealogies.
• **Emphasis**: A strict literal reading of the Hebrew word *yom* (day) and a deep commitment to biblical authority.

**Old Earth Creationism (Day-Age View)**
• **Core Belief**: The "days" of Genesis are not literal 24-hour periods but long eras or epochs.
• **Age Estimate**: Billions of years, aligning with modern geological and astronomical data.
• **Emphasis**: Reconciling the sequence of creation with scientific observations while maintaining God's direct intervention.

**Gap Theory (Ruin–Reconstruction)**
• **Core Belief**: A massive "gap" of time exists between Genesis 1:1 and 1:2. The universe is ancient, but the Earth was "re-formed" in a recent six-day period.
• **Emphasis**: Explaining the fossil record and ancient geological layers without sacrificing a literal six-day reconstruction.

**Theistic Evolution (Evolutionary Creation)**
• **Core Belief**: God used the natural process of evolution as His method for creating biological diversity.
• **Age Estimate**: 13.8 billion years for the universe; 4.5 billion for Earth.
• **Emphasis**: Total harmony between biblical theology and the consensus of modern biology.

---

### **Points of Harmonization and Conflict**

*“The Bible tells us how to go to heaven, not how the heavens go.”* — Attributed to Galileo Galilei

**Where Views Overlap:**
✔ **Divine Agency**: All views agree that God is the primary Actor and Creator of all things.
✔ **Teleology**: Creation is not accidental; it has a specific, divine purpose.
✔ **Imago Dei**: Humanity is distinct from animals, bearing the unique image of God.
✔ **Reflection**: Nature is a "second book" of revelation that reflects God’s glory (Psalm 19:1).

**Key Theological Questions:**
• If humans evolved, what does "in God’s image" mean for our spiritual nature?
• Did death exist before the Fall of Adam? (A major point of debate between YEC and OEC).
• Are Genesis 1 and 2 intended to be literal historical logs or poetic, polemical theology against ancient Near Eastern myths?

---

### **Conclusion: The Author of Both Books**
Whether one holds to a young or old universe, the theological center remains: the universe is a created reality, governed by laws established by a Mind that exists outside of matter and time. Science discovers the *mechanisms* of the Creator, while Scripture reveals His *character* and *intent* for His creation.`,
    tables: [
      {
        title: 'I. SIDE-BY-SIDE OVERVIEW: BIBLE VS SCIENCE',
        headers: ['Topic', 'Biblical Creation (Genesis)', 'Scientific Creation (Cosmology/Biology)'],
        rows: [
          ['Origin of Universe', 'God created by divine command (“Let there be…”)', 'Big Bang: expansion from an initial singularity'],
          ['Age of Universe', 'Young: 6k-10k yrs | Old: Billions', '~13.8 billion years'],
          ['Age of Earth', 'Young: ~6,000 yrs | Old: ~4.5 billion', '~4.54 billion years'],
          ['Method', 'God speaks / forms dust / breathes life', 'Physical laws (gravity, fusion, chemistry)'],
          ['Origin of Life', 'Direct creation by God', 'Chemical evolution → first cells (Abiogenesis)'],
          ['Origin of Humans', 'Uniquely in God’s image from dust', 'Evolved from earlier hominins (~300k yrs ago)'],
          ['Purpose', 'Glory of God, relationship, dominion', 'Science focus is on natural "how," not "why"']
        ]
      },
      {
        title: 'II. BIBLICAL DAY VS SCIENTIFIC AGE COMPARISON',
        headers: ['Day', 'Biblical Description', 'Scientific Equivalent', 'Est. Time Length'],
        rows: [
          ['1', 'Light separated from darkness', 'Big Bang → Cosmic Light Formation', '0 – 500 million yrs'],
          ['2', 'Sky & Atmosphere formation', 'Earth cools, water vapor → atmosphere', '500m – 1 billion yrs'],
          ['3', 'Land & Plants appear', 'Continental formation & early life', '1 – 2.5 billion yrs'],
          ['4', 'Sun, Moon, Stars (visible)', 'Atmosphere clears to reveal luminaries', '2.5 – 3.5 billion yrs'],
          ['5', 'Fish & Birds created', 'Cambrian explosion → marine life/birds', '3.5 – 4.5 billion yrs'],
          ['6', 'Land Animals & Humans', 'Mammals → hominins → Homo sapiens', '4.5b yrs – present'],
          ['7', 'God Rests', 'Modern geological era (ongoing)', 'Current Epoch']
        ]
      },
      {
        title: 'III. SUMMARY OF CHRISTIAN VIEWPOINTS',
        headers: ['Question', 'Young Earth', 'Old Earth', 'Gap Theory', 'Theistic Evolution'],
        rows: [
          ['How old is Earth?', 'Young (6k-10k)', 'Old (4.5b)', 'Old (4.5b)', 'Old (4.5b)'],
          ['Genesis days literal?', 'Yes (24hr)', 'Symbolic (Ages)', 'Two-phase', 'Symbolic/Poetic'],
          ['Did humans evolve?', 'No', 'No', 'No', 'Yes'],
          ['Are fossils pre-Adam?', 'No (Flood result)', 'Yes', 'Yes', 'Yes'],
          ['Is Adam historical?', 'Yes', 'Yes', 'Yes', 'Optional/Symbolic']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'cre-1',
        title: 'Fiat Lux',
        description: 'The first command of the Creator: "Let there be light."',
        scripture: 'Genesis 1:3',
        imagePrompt: 'A singular point of brilliant white light exploding into a dark void, gold and violet nebula forming, cinematic space art.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Origins'
      },
      {
        id: 'cre-2',
        title: 'The Breath of Life',
        description: 'God forming man from the dust of the ground and breathing His life into him.',
        scripture: 'Genesis 2:7',
        imagePrompt: 'A figure emerging from golden dust, ethereal breath as a swirl of light, Michelangelo-inspired but with a modern cinematic lighting style.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Origins'
      },
      {
        id: 'cre-3',
        title: 'The Fabric of the Universe',
        description: 'The mathematical precision and design of the cosmos reflecting its Designer.',
        scripture: 'Psalm 19:1',
        imagePrompt: 'A vast galaxy shaped like a geometric pattern, intricate stars, glowing mathematical equations faintly in the background, cosmic scale.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Origins'
      }
    ]
  }
};export default category_17;
