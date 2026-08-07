import { TheologyCategory } from '../../types.js';

const category_45: TheologyCategory = {
  id: '45',
  title: 'Heaven & Hell',
  subtitle: 'Biblical Afterlife vs. Cultural Folklore',
  overview: 'What the Bible actually says about the afterlife — places, states, imagery, judgment, and hope — separated from later tradition, art, and speculation.',
  content: {
    analysis: `### **Introduction: Grounding the Afterlife in Text**
Popular imagination is often more influenced by Dante’s *Inferno* or Hieronymus Bosch’s surreal landscapes than by the actual biblical text. This category presents only what can be grounded in Scripture, distinguishing between direct statements, metaphors, and later cultural additions.

---

### **PART I — HEAVEN IN THE BIBLE**
Scripture implies a layered understanding of "heaven" (Atmospheric, Cosmic, and Divine). Heaven is portrayed as both a present reality of divine governance and a future restoration—the **New Heaven and New Earth**.

---

### **PART II — HELL & THE INTERMEDIARY STATES**
The Bible maps the progression of the dead through different "states" depending on the covenantal era:

• **Old Testament Era**: The dead reside in an *Intermediate State*. The righteous go to "Heaven or Paradise," while the wicked and those awaiting judgment go to "Sheol" or "The Pit." A third, deeper realm, "Abaddon," is associated with fallen angels.
• **New Testament Era**: The terminology shifts. The grave/realm of the wicked is termed "Hades." The deeper abyss or prison for rebellious spirits is "Tartarus" or "The Abyss."
• **The Final State (Eternity)**: Following resurrection and the Great White Throne Judgment, the righteous enter the **New Heaven and New Earth**, while Death, Hades, and the wicked are cast into the **Lake of Fire (Hell)**.

---

### **PART III — THE VISUAL IMAGINATION OF THE AFTERLIFE**
Artworks like Hieronymus Bosch's *The Garden of Earthly Delights* capture the biblical tension of the Afterlife:
• **Eden (The Past)**: The original state of innocence.
• **The World (The Present)**: a middle ground of pleasure and chaotic choices.
• **Hell (The Future)**: A dark, surreal landscape of consequence and sensory overwhelming.

> **⚠️ FINAL EDITORIAL SAFEGUARD**: This category presents every major biblical term and marks where textual certainty ends and artistic interpretation begins.`,
    tables: [
      {
        title: 'I. THE AFTERLIFE STATE MAP (CHRONOLOGICAL PROGRESSION)',
        headers: ['State', 'Old Testament (Intermediate)', 'New Testament (Intermediate)', 'Eternity (Final)'],
        rows: [
          ['Upper Realm', 'Heaven or Paradise (Righteous dead)', 'Heaven or Paradise (Righteous dead)', 'New Heaven and New Earth'],
          ['Middle Realm', 'Sheol & The Pit (Grave/Wicked)', 'Hades (Grave/Wicked)', 'Hell or Lake of Fire'],
          ['Lower Abyss', 'Abaddon (Fallen Angels)', 'Abaddon, Abyss, or Tartarus', 'Hell or Lake of Fire']
        ]
      },
      {
        title: 'II. THE THREE LEVELS OF HEAVEN',
        headers: ['Level', 'Description', 'Scriptural Basis'],
        rows: [
          ['First Heaven', 'Atmosphere: Clouds, birds, wind.', 'Genesis 1:20'],
          ['Second Heaven', 'Cosmos: Stars, planets, expanse.', 'Psalm 19:1'],
          ['Third Heaven', 'God’s Throne: Spiritual realm of God.', '2 Corinthians 12:2']
        ]
      },
      {
        title: 'III. AFTERLIFE TERMINOLOGY MATRIX',
        headers: ['Term', 'Meaning', 'Scripture', 'Confidence'],
        rows: [
          ['Sheol', 'Old Testament realm of the dead.', 'Psalm 6:5', 'High'],
          ['Hades', 'New Testament equivalent of Sheol.', 'Luke 16:23', 'High'],
          ['Paradise', 'State of bliss with God post-death.', 'Luke 23:43', 'High'],
          ['Gehenna', 'Jesus’ image of fiery judgment.', 'Matthew 10:28', 'High'],
          ['Lake of Fire', 'Final, eternal separation from God.', 'Revelation 20:14', 'Medium-High']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'afterlife-1',
        title: 'The Bosch Triptych',
        description: 'A surreal visual meditation on the state of creation, the chaos of human choice, and the darkness of judgment.',
        scripture: 'Revelation 20:12',
        imagePrompt: 'A surrealist triptych painting style; left side a garden of strange pink towers, center a chaotic green field with many figures, right side a dark cityscape with fires and bizarre musical instruments.',
        colorTheme: '#4CAF50',
        // Fix: Added missing era
        era: 'Restoration'
      },
      {
        id: 'afterlife-2',
        title: 'The Great White Throne',
        description: 'The final moment where the Sea, Death, and Hades give up their dead for universal justice.',
        scripture: 'Revelation 20:11',
        imagePrompt: 'A colossal, blindingly white throne in a void of space, the universe fleeing from its presence, countless silhouettes of people standing before it.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Restoration'
      },
      {
        id: 'afterlife-3',
        title: 'The New Jerusalem',
        description: 'Heaven coming down to earth; the restoration of all things where God dwells with man.',
        scripture: 'Revelation 21:2',
        imagePrompt: 'A city of light and translucent gold descending from a prismatic sky to a lush green earth, river of life flowing.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Restoration'
      }
    ]
  }
};export default category_45;
