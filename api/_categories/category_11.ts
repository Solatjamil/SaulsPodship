
import { TheologyCategory } from '../../types.js';

const category_11: TheologyCategory = {
  id: '11',
  title: 'Book of Revelation',
  subtitle: 'The Apocalypse of Jesus Christ',
  overview: 'A comprehensive exploration of the structure, symbolism, prophetic timeline, and major interpretive views of the Book of Revelation. Last updated on November 20, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **Detailed Analysis: Overview**
The Book of Revelation (*Apokalypsis Iōannou*) is the final book of the Christian Bible, written by John while exiled on Patmos. It reveals God’s plan for the end of the age through visions, symbols, judgments, beasts, angels, and the triumphant return of Jesus Christ.

**Revelation combines three literary genres:**
• **Apocalyptic literature**: Using symbolic visions to reveal spiritual reality.
• **Prophecy**: Direct declarations of future events.
• **Epistle**: A structured letter sent to seven specific churches.

**Theme**: Jesus Christ is the victorious King who defeats evil and restores creation.

---

### **Key Themes**
1. **Jesus Christ Revealed as King**: From the Lamb that was slain to the Lion of Judah.
2. **Cosmic Conflict**: The ultimate struggle of God vs Satan.
3. **Judgment & Justice**: God vindicates His people.
4. **New Creation**: The eternal restoration of heaven and earth.

---

### **Explore Further Within the Library**
• **Angels, Demons, Beasts & Monsters**: A study of supernatural beings and prophetic creatures mentioned throughout the Apocalypse.
• **Messianic Prophecies**: See how every major Old Testament promise finds its ultimate fulfillment in the Lion of Judah.
• **Revelation Judgments Timeline**: The complete chronological guide to the Seals, Trumpets, and Bowls of the end times.`,
    tables: [
      {
        title: 'I. MAJOR INTERPRETIVE FRAMEWORKS',
        headers: ['View', 'Core Belief', 'Strength', 'Weakness'],
        rows: [
          ['Preterist', 'Most prophecies were fulfilled in the 1st century.', 'Historical grounding', 'Minimizes future prophecy'],
          ['Historicist', 'Describes the entire span of church history.', 'Broad historical sweep', 'Hard to match details'],
          ['Futurist', 'Most events are yet to happen in a future tribulation.', 'Clear timeline', 'Complex symbolism'],
          ['Idealist', 'A symbolic depiction of the struggle between good and evil.', 'Timeless symbolism', 'Lacks concrete events']
        ]
      },
      {
        title: 'II. SYMBOL BREAKDOWN',
        headers: ['Symbol', 'Meaning'],
        rows: [
          ['Dragon', 'Satan (The Ancient Serpent)'],
          ['Lamb', 'Jesus Christ (The Sacrifice)'],
          ['Beast from the Sea', 'Antichrist-like world ruler'],
          ['Babylon the Great', 'Evil world system'],
          ['New Jerusalem', 'Eternal dwelling of God with His people']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'rev-1',
        title: 'The Throne Room',
        description: 'A vision of God on His throne, surrounded by the four living creatures and twenty-four elders.',
        scripture: 'Revelation 4:2-11',
        imagePrompt: 'A glowing throne made of jasper and carnelian, four diverse living creatures worshiping, 24 elders casting gold crowns, epic cinematic wide shot.',
        colorTheme: '#D4AF37',
        era: 'Restoration'
      },
      {
        id: 'rev-2',
        title: 'The Four Horsemen',
        description: 'The opening of the first four seals, releasing conquest, war, famine, and death.',
        scripture: 'Revelation 6:1-8',
        imagePrompt: 'Four distinct horses (white, red, black, pale) galloping through dark clouds. Moody oil painting style.',
        colorTheme: '#8B1E3F',
        era: 'Restoration'
      }
    ]
  }
};
export default category_11;
