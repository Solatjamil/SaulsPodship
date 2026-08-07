import { TheologyCategory } from '../../types.js';

const category_13: TheologyCategory = {
  id: '13',
  title: 'Christmas History',
  subtitle: 'The Incarnation and the Evolution of the Feast',
  overview: 'The complete biblical, historical, cultural, and theological evolution of Christmas—tracing the promise of the Messiah from ancient prophecy to the modern global celebration. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    timeline: [
      { year: '700 BC', event: 'Isaiah prophesies the Virgin Birth and the arrival of "Mighty God" (Isaiah 7:14, 9:6).' },
      { year: '5 BC', event: 'The Incarnation: Jesus is born in Bethlehem during the reign of Herod the Great.' },
      { year: '33 AD', event: 'The Apostolic Era: Focus remains on the Resurrection; no formal Nativity feast exists yet.' },
      { year: '200 AD', event: 'Clement of Alexandria mentions various proposed dates for Christ’s birth (May 20, April 20).' },
      { year: '336 AD', event: 'First recorded celebration of December 25th in Rome in the Philocalian Calendar.' },
      { year: '380 AD', event: 'Gregory of Nazianzus brings the Christmas celebration to Constantinople.' },
      { year: '1223 AD', event: 'St. Francis of Assisi creates the first live Nativity scene (Crèche) in Greccio, Italy.' },
      { year: '1647 AD', event: 'Puritans in England ban Christmas, viewing it as a man-made "popish" invention.' },
      { year: '1843 AD', event: 'Charles Dickens publishes "A Christmas Carol," shaping modern secular traditions of charity.' }
    ],
    analysis: `### **I. The Mystery of the Incarnation**
At its core, Christmas is the celebration of the **Incarnation**—the moment the infinite Creator took on finite human flesh (**John 1:14**). It is the "Theological Fortress" that protects the doctrines of Christ's dual nature: fully God and fully Man.

### **II. The Evolution of the Date**
Why December 25th? Historians and theologians point to two primary reasons:
• **The Calculation Hypothesis**: Early Christians believed that great prophets died on the same day they were conceived (March 25th). Adding nine months leads to December 25th.
• **The Strategic Proclamation**: The Church chose to celebrate the arrival of the "True Light" (Jesus) during the winter solstice, directly challenging the darkness of pagan winter festivals.

### **III. Cultural Symbols vs. Theological Truth**
Many modern symbols have ancient roots that have been "baptized" into Christian meaning:
• **The Evergreen Tree**: Symbolic of the Tree of Life and the eternal life promised through Christ.
• **St. Nicholas**: A 4th-century bishop from Myra (modern Turkey) famous for his secret gift-giving and defense of the deity of Christ at the Council of Nicaea.
• **The Star**: A celestial fulfillment of the "Star of Jacob" prophecy in **Numbers 24:17**.`,
    tables: [
      {
        title: 'PROPHETIC FULMENT MATRIX',
        headers: ['Prophecy (700-1000 BC)', 'Topic', 'New Testament Fulfillment'],
        rows: [
          ['Isaiah 7:14', 'Virgin Birth', 'Matthew 1:22–23'],
          ['Micah 5:2', 'Birthplace (Bethlehem)', 'Luke 2:4–7'],
          ['Genesis 49:10', 'Tribe of Judah', 'Luke 3:33'],
          ['Hosea 11:1', 'Out of Egypt', 'Matthew 2:14–15'],
          ['Psalm 72:10', 'Kings bringing gifts', 'Matthew 2:11']
        ]
      },
      {
        title: 'CULTURAL SYMBOLS & ORIGINS',
        headers: ['Symbol', 'Theological Meaning', 'Historical Origin'],
        rows: [
          ['The Wreath', 'The eternal, never-ending love of God.', 'Ancient victory symbols.'],
          ['The Candy Cane', 'The Shepherd’s crook; red for blood, white for purity.', '17th Century Germany.'],
          ['Mistletoe', 'Peace and reconciliation in Christ.', 'Ancient Celtic folklore.'],
          ['The Bells', 'Proclaiming the Good News to the world.', 'Medieval Church tradition.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'chr-1',
        title: 'The Annunciation',
        description: 'Gabriel bringing the world-altering news to Mary in Nazareth.',
        scripture: 'Luke 1:26–38',
        imagePrompt: 'A humble stone dwelling, soft morning light, a young woman kneeling as a radiant angelic figure appears, ethereal glow, Renaissance style lighting.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'chr-2',
        title: 'The Shepherds’ Field',
        description: 'The first announcement of the King given to the outcasts of society.',
        scripture: 'Luke 2:8–20',
        imagePrompt: 'Shepherds on a dark hillside, brilliant explosion of light in the sky, thousands of angels visible in the clouds, terrified but awe-struck shepherds.',
        colorTheme: '#4CAF50',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'chr-3',
        title: 'The Flight to Egypt',
        description: 'The Holy Family fleeing to protect the Child from the wrath of Herod.',
        scripture: 'Matthew 2:13–15',
        imagePrompt: 'A desert landscape at night under a full moon, a man leading a donkey with a mother and child, silhouettes against a deep blue sky, sense of urgency and protection.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Christ'
      }
    ]
  }
};export default category_13;
