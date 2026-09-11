import { TheologyCategory } from '../../types.js';

const category_04: TheologyCategory = {
  id: '04',
  title: 'Angels, Demons, Beasts & Monsters',
  subtitle: 'The Supernatural Hierarchy & Prophetic Creatures',
  overview: 'An immersive study of the unseen realm, from the burning Seraphim before the Throne to the chaotic Leviathan of the deep. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `**THE ARCHITECTURE OF THE UNSEEN**
The Bible does not just speak of a physical world, but a high-stakes spiritual reality populated by diverse hierarchies of beings. These are not "mythological" in the secular sense but are described as objective realities that interact with human history.

[[CHART: Angelic Guidance|90|#D4AF37, Demonic Opposition|45|#8B1E3F, Celestial Stability|100|#1D2D50]]

**Key Scholarly Distinctions:**
1. **The Divine Council**: God is the Creator of all, but He often works through a "heavenly host" (Ps 82).
2. **Cosmic Conflict**: The rebellion of "The Watchers" (Gen 6) and Lucifer (Is 14) introduced a war for human souls.
3. **The Prophetic Beasts**: Beings like the Four Living Creatures (Ezekiel) represent the fullness of God's attributes or the forces of historical chaos.

*Note: These categories are intended to bridge ancient Near Eastern context with modern theological inquiry.*`,
    tables: [
      {
        title: 'I. THE CELESTIAL HIERARCHY — The Heavenly Host',
        headers: ['Rank', '📌 Entity & 📖 Scripture', '📝 Description & 💡 Theological Theme'],
        rows: [
          [
            '1',
            '📌 Seraphim\n📖 Isaiah 6:1–7',
            '📝 Highest rank of angels, "The Burning Ones." Six-winged beings who attend God\'s throne.\n💡 Theme: The Transcendental Holiness of God.'
          ],
          [
            '2',
            '📌 Cherubim\n📖 Genesis 3:24; Ezekiel 10',
            '📝 Guardians of holy spaces. Multiformed beings with four faces (Lion, Ox, Eagle, Man).\n💡 Theme: Divine Protection & Presence.'
          ],
          [
            '3',
            '📌 Archangels (Michael)\n📖 Jude 1:9; Rev 12:7',
            '📝 Chief principalities. Michael is the "Prince of Israel" and commander of the heavenly army.\n💡 Theme: God\'s Sovereign Power over Rebellion.'
          ],
          [
            '4',
            '📌 Messenger Angels (Gabriel)\n📖 Luke 1:19; Daniel 8:16',
            '📝 Figures sent to convey specific, world-altering divine decrees to humanity.\n💡 Theme: God’s Direct Communication with His People.'
          ]
        ]
      },
      {
        title: 'II. THE FALLEN & DEMONIC HIERARCHY — Cosmic Rebellion',
        headers: ['Rank', '📌 Entity & 📖 Scripture', '📝 Description & 💡 Theological Theme'],
        rows: [
          [
            '1',
            '📌 Lucifer / Satan\n📖 Isaiah 14:12–15; Revelation 12:7–9',
            '📝 Originally a high-ranking cherub who rebelled through pride, now the adversary.\n💡 Theme: Spiritual Warfare & the Limits of Evil.'
          ],
          [
            '2',
            '📌 The Watchers / Nephilim\n📖 Genesis 6:1–4; Jude 1:6',
            '📝 Spiritual beings who left their proper dwelling to intermingle with humanity.\n💡 Theme: Boundary Crossings & Divine Boundaries.'
          ],
          [
            '3',
            '📌 Unclean Spirits / Legion\n📖 Mark 5:1–20; Luke 8:30',
            '📝 Entities of torment that bind humans, operating in multitudes (Legion).\n💡 Theme: Christ’s Authority to Deliver & Restore.'
          ],
          [
            '4',
            '📌 Principalities & Powers\n📖 Ephesians 6:12; Colossians 2:15',
            '📝 Structured dark spiritual rulers governing territories and systems of opposition.\n💡 Theme: Unseen Rulers & Christ’s Cosmic Triumph.'
          ]
        ]
      },
      {
        title: 'III. PROPHETIC BEASTS & CREATURES — Symbolic Sovereignty',
        headers: ['Rank', '📌 Entity & 📖 Scripture', '📝 Description & 💡 Theological Theme'],
        rows: [
          [
            '1',
            '📌 The Four Living Creatures\n📖 Ezekiel 1:4–28; Revelation 4:6–8',
            '📝 Multiformed creatures with faces of Man, Lion, Ox, and Eagle, covered in eyes.\n💡 Theme: The Fullness of Divine Attributes & Creation.'
          ],
          [
            '2',
            '📌 The Beast of the Sea\n📖 Revelation 13:1–10',
            '📝 A seven-headed, ten-horned composite beast representing oppressive geopolitical systems.\n💡 Theme: State Deification & the Patience of the Saints.'
          ],
          [
            '3',
            '📌 Leviathan & Behemoth\n📖 Job 40:15–41:34; Psalm 104:26',
            '📝 Primeval creatures of supreme land/sea strength, untamable by man but ruled by God.\n💡 Theme: Human Limitations & Divine Supremacy.'
          ],
          [
            '4',
            '📌 The Great Red Dragon\n📖 Revelation 12:3–17',
            '📝 A celestial dragon with seven heads and ten horns, embodying Satanic persecution.\n💡 Theme: Cosmic Conflict & the Victory of the Lamb\'s Blood.'
          ]
        ]
      }
    ],
    storyPanels: [
      {
        id: 'ang-1',
        title: 'The Seraphim',
        description: 'Burning six-winged beings circling the throne, crying "Holy, Holy, Holy!"',
        scripture: 'Isaiah 6:2',
        imagePrompt: 'Biblical Seraphim with six wings, two covering face, two covering feet, two flying. Radiant white and gold fire, atmospheric smoke, cinematic lighting.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Prophets'
      },
      {
        id: 'mon-1',
        title: 'Leviathan of the Deep',
        description: 'A massive, armored sea creature breathing fire and churning the depths.',
        scripture: 'Job 41:1',
        imagePrompt: 'Ancient sea dragon Leviathan, giant scales, bioluminescent fire from mouth, dark churning ocean, biblical epic scale.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Origins'
      }
    ]
  }
};export default category_04;
