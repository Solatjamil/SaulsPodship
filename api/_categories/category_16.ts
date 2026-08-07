import { TheologyCategory } from '../../types.js';

const category_16: TheologyCategory = {
  id: '16',
  title: 'Crusades Analysis',
  subtitle: 'History, Theology & Modern Critique',
  overview: 'A complete, unbiased exploration of the Crusades from Christian history and theology. Last updated on November 20, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. Overview of the Crusades**
The Crusades were a series of military-religious campaigns from the 11th–13th centuries. They were driven by a complex mixture of religious devotion, political ambition, the defense of pilgrims, and Byzantine requests for help against the Seljuk Turks. They remain one of the most debated events in Christian history due to the tension between "Holy War" and the teachings of Jesus.

---

### **III. Historical Context & Key Epochs**
• **1095 – First Crusade**: Launched by Pope Urban II to liberate Jerusalem and help Eastern Christians. Resulted in the capture of the Holy City in 1099.
• **1187 – The Rise of Saladin**: After the failure of the Second Crusade, Saladin retakes Jerusalem, triggering the Third Crusade.
• **1190 – The Third Crusade**: Led by Richard the Lionheart. While failing to retake the city, a truce secured access for Christian pilgrims.
• **1204 – The Fourth Crusade Tragedy**: Instead of Jerusalem, crusaders sacked Constantinople, the capital of Eastern Orthodoxy, creating a deep rupture between East and West.

---

### **V. Theological Critique (Modern Perspective)**
Most theologians today view the violent expansion of faith as a departure from the New Testament.
1. **Misuse of Christ’s Name**: Jesus taught, "My kingdom is not of this world" (John 18:36). Violence done in His name contradicts the core of the Gospel.
2. **Unholy Alliances**: Spiritual motives were often hijacked by the desire for land, wealth, and political power.
3. **The Way of the Cross**: The Gospel is spread through sacrifice, love, and witness—not through the sword or coercion.

---

### **IX. What Christians Should Learn Today**
• **Teaching over Force**: The Gospel spreads by compassion and service.
• **Kingdom Distinction**: We must distinguish the Kingdom of God from earthly political systems.
• **Blessed are the Peacemakers**: Faith must be used to heal divisions, not to justify nationalist or violent agendas.`,
    maps: [
      {
        title: "The Crusader Voyages & Mediterranean Expeditions",
        url: "/images/map_crusades_middle_ages_1781113765250.png",
        description: "Tracing the major geographical routes of the medieval Crusades spanning from Western Europe, crossing the Mediterranean Sea, and converging upon Constantinople, Antioch, Acre, and Jerusalem.",
        source: "Theophilus Cartography Division"
      }
    ],
    tables: [
      {
        title: 'I. CRUSADER MOTIVATIONS (REALISTIC BREAKDOWN)',
        headers: ['Motivation Type', '📌 Description', '📜 Historical Evidence'],
        rows: [
          ['Religious', 'Defend pilgrims, free Jerusalem, earn indulgences.', 'Sermons of Pope Urban II'],
          ['Political', 'Expand influence, unify feudal lords under one cause.', 'Letters of Crusader kings'],
          ['Economic', 'Desire for new land, wealth, and trade routes.', 'Venetian and Genoese records'],
          ['Personal', 'Honor, adventure, and the "vow of the cross."', 'Crusader testimonies']
        ]
      },
      {
        title: 'II. CRUSADES: A BALANCED ASSESSMENT',
        headers: ['Positive Aspects', 'Negative Aspects'],
        rows: [
          ['Protected pilgrims temporarily', 'Massacres and brutal violence'],
          ['Strengthened contacts between East & West', 'Deepened the Great Schism (1054)'],
          ['Led to cultural and scientific exchange', 'Motivations often political/greedy'],
          ['Preserved some Byzantine lands for a time', 'Long-term Muslim–Christian tensions']
        ]
      },
      {
        title: 'III. WHAT THE BIBLE ACTUALLY TEACHES',
        headers: ['Scripture', '📖 Core Teaching'],
        rows: [
          ['Matthew 5:44', 'Love your enemies and pray for those who persecute you.'],
          ['John 18:36', 'Jesus rejects the idea of an earthly military kingdom.'],
          ['2 Corinthians 10:4', 'The weapons of our warfare are not physical/carnal.'],
          ['Romans 12:18', 'As far as it depends on you, live at peace with all.'],
          ['Ephesians 6:12', 'Our true battle is spiritual, not against flesh and blood.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'cru-1',
        title: 'The Council of Clermont',
        description: 'Pope Urban II calling the knights of Europe to take up the cross, sparking the First Crusade.',
        scripture: 'Matthew 5:9',
        imagePrompt: 'A medieval pope standing on a high wooden platform, thousands of knights kneeling with red crosses on their chests, atmospheric dust and sunlight, epic cinematic style.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'cru-2',
        title: 'The Truce of Kings',
        description: 'Richard the Lionheart and Saladin, representing two worlds meeting in conflict and eventually a fragile respect.',
        scripture: 'Matthew 5:44',
        imagePrompt: 'Two powerful kings in armor meeting in a desert tent, one in chainmail with a lion crest, the other in silk robes and turban, golden sand light, high detail.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'cru-3',
        title: 'The Sacking of the City',
        description: 'The tragic diversion of the Fourth Crusade to Constantinople, a dark day for Christian unity.',
        scripture: 'John 18:36',
        imagePrompt: 'Burning city walls of a grand Byzantine capital, smoke rising over golden domes, soldiers in armor entering through broken gates, dramatic and tragic atmosphere.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_16;
