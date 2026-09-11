import { TheologyCategory } from '../../types.js';

const category_44: TheologyCategory = {
  id: '44',
  title: 'Forbidden Knowledge & the Watchers',
  subtitle: 'Yoga, Meditation & Altered States: The Ethics of Ancient Power',
  overview: 'Ancient teachings attributed to fallen beings, their textual sources, and why similar knowledge domains raise ethical red flags today.',
  content: {
    analysis: `### **Introduction: Knowledge Without Moral Containment**
This category explores a specific ancient idea found in biblical-adjacent and Second Temple Jewish literature: that certain forms of knowledge were not neutral, but were introduced prematurely to humanity by celestial rebels known as the **Watchers**. According to these traditions, human civilization experienced a "forced acceleration" of power that outpaced its moral and spiritual maturity.

> **⚠️ Academic Guardrail**: This study examines what ancient sources say was taught, why those teachings were considered dangerous, and how similar knowledge domains today (AI, CRISPR, total surveillance) raise parallel ethical risks.

### **I. Primary Ancient Sources**
1. **Genesis 6:1–4**: Mentions the "sons of God," Nephilim, and "mighty men of old."
2. **1 Enoch (Chapters 6–16; 69)**: Lists forbidden teachings given by the Watchers.
3. **The Book of Jubilees**: Emphasizes corruption through illicit spiritual and physical instruction.

### **II. Civilizational Chronology & Durations to Babel**
Historical and scholarly reconstructions (based on Philo, Appian, and Callisthenes) attempt to map the emergence of post-flood "forbidden" civilizations:
• **The Flood (Ussher)**: ~2348 BC.
• **Foundation of Babel**: ~2234/3 BC.
• **Linguistic and Observational Records**: Callisthenes noted 1,903 years of astronomical observations before Alexander, suggesting a sophisticated (and perhaps illicitly obtained) science emerging very early in the Mesopotamian basin.

---

### **III. The Watcher’s Curse: Power Without Restraint**
The Watchers tradition frames a repeating human vulnerability: knowledge that accelerates power faster than character produces collapse. Whether through the manipulation of matter (Metallurgy), the manipulation of life (Genetics), or the manipulation of consciousness (Trance), the danger remains the same—acting as gods without the moral formation to handle the power.`,
    tables: [
      {
        title: 'IV. CHRONOLOGY OF ANCIENT CIVILIZATIONS',
        headers: ['Era / Event', 'Approx. Date', 'Biblical Connection', 'Historical Context'],
        rows: [
          ['Flood (Ussher)', '2348 BC', 'Genesis 7', 'Global reset of human civilization.'],
          ['Babel Founded', '2234 BC', 'Genesis 11', 'Concentrated rebellion; linguistic split.'],
          ['Astronomical Records', '1903 yrs pre-Alex', 'Enochic Astronomy', 'Early sophisticated cosmic mapping.'],
          ['Sargon’s Death', '705 BC', 'Assyrian Rise', 'Peak of Mesopotamian military dominance.'],
          ['Alexander the Great', '331 BC', 'Greek Hegemony', 'End of the Ancient Near Eastern period.']
        ]
      },
      {
        title: 'V. CATEGORIES OF FORBIDDEN KNOWLEDGE',
        headers: ['Ancient Domain', 'Watcher / Source', 'Why Forbidden', 'Modern Parallel'],
        rows: [
          ['Weaponry & Violence', 'Azazel (1 Enoch 8:1)', 'Rapid escalation of destructive capacity.', 'Autonomous AI Weapons'],
          ['Metallurgy & Alchemy', 'Azazel (1 Enoch 8:1)', 'Wealth inequality; dominance over survival.', 'Nanotechnology'],
          ['Sorcery & Psych-Control', 'Semjaza (1 Enoch 7–8)', 'Manipulation of perception and agency.', 'Neuromarketing / Deepfakes'],
          ['Genetic Boundary Crossing', 'Genesis 6 narrative', 'Violation of created orders of life.', 'CRISPR / Gene Editing'],
          ['Divine Secrets', '1 Enoch 69', 'Revealing power meant for divine timing.', 'Geoengineering']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'watch-1',
        title: 'Descent on Mt. Hermon',
        description: 'The ancient account of celestial beings descending to trade hidden secrets for human influence.',
        scripture: 'Genesis 6:1–2',
        imagePrompt: 'A group of tall radiant figures descending on a jagged mountain peak under a violet stormy sky, ancient people looking up in shadows, cinematic scale.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Origins'
      },
      {
        id: 'watch-2',
        title: 'The Tower of Chronos',
        description: 'Babel as a nexus of forbidden science and political consolidation.',
        scripture: 'Genesis 11:4',
        imagePrompt: 'A massive, swirling stone tower reaching into the clouds, half-ancient half-otherworldly, surrounded by ancient workers and scaffolding, sunset lighting.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Origins'
      },
      {
        id: 'watch-3',
        title: 'The Scriptorium of the Fallen',
        description: 'Visual representation of the forbidden scrolls given to humanity before the flood.',
        scripture: '1 Enoch 8:1',
        imagePrompt: 'A dark cave filled with glowing scrolls and strange mechanical tools, shadows of giants on the walls, dramatic chiaroscuro.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Origins'
      }
    ]
  }
};export default category_44;
