import { TheologyCategory } from '../../types.js';

const category_39: TheologyCategory = {
  id: '39',
  title: 'Vatican & Its History',
  subtitle: 'From the Early Church to the modern Sovereign City-State.',
  overview: 'A deep dive into how the Vatican came into existence, how it gained power, its role in councils and church history, why the Protestant Reformation reacted against it, and how to think about modern scandals and conspiracy claims. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. What Is the Vatican?**
The word “Vatican” today refers to two intertwined realities:
• **Vatican City**: A tiny independent sovereign state (approx. 44 hectares) located within Rome, established in 1929. It is the political home of the Pope.
• **The Holy See**: The spiritual and administrative leadership of the global Roman Catholic Church, centered in the Bishop of Rome.

### **II. Origins of Papal Authority**
In the first three centuries, there was no "Vatican State." Local bishops led churches, but the Bishop of Rome gained prestige because Rome was the capital of the Empire and the traditional site of the martyrdom of Peter and Paul.
> **Key Scripture**: "And I tell you that you are Peter, and on this rock I will build my church..." — **Matthew 16:18**

### **III. The Road to Political Power**
**1. The Papal States (756–1870)**: For over 1,100 years, popes were secular monarchs ruling a large territory in central Italy. This "Donation of Pepin" mixed spiritual authority with political and military power, leading to both great art (The Sistine Chapel) and significant moral compromise.
**2. The 1929 Lateran Treaty**: After losing its territories to the unification of Italy, the Church signed an agreement with Italy recognizing the current tiny Vatican City as a sovereign state, ending the "Prisoner in the Vatican" era.

---

### **IV. Martin Luther vs. Martin Luther King Jr.**
It is vital for students of history to distinguish between these two influential figures:
• **Martin Luther (1483–1546)**: A German monk who sparked the **Protestant Reformation** by challenging the Vatican’s teachings on salvation and authority.
• **Martin Luther King Jr. (1929–1968)**: An American Baptist minister and **Civil Rights Leader** who fought against racial segregation using non-violent protest. He was inspired by Jesus but did not seek to reform Catholic doctrine.

---

### **V. The Reformation Critique**
In 1517, Martin Luther wrote the **95 Theses**, primarily protesting:
• **Indulgence Abuse**: The practice of paying money to "reduce punishment" for sins.
• **Authority**: Placing Church tradition/popes on the same level as the Bible.
• **Clarity of the Gospel**: Luther argued that salvation is a free gift received by **Faith Alone** (*Sola Fide*), not through human rituals or merits.

---

### **VI. Wealth, Scandals, and Conspiracies**
> **⚠️ Honest Assessment**: The Vatican is often criticized for its immense wealth (art and real estate) while millions live in poverty. Furthermore, the Church has faced documented crises regarding sexual abuse by clergy. It is necessary to condemn these sins and support transparency.
> 
> **🛑 Conspiracy Check**: While documented abuses are real, claims that "popes are secret satanists" belong to the realm of fiction and propaganda. There is no historical evidence to support claims that the institution worships anything other than the Triune God.`,
    tables: [
      {
        title: 'MARTIN LUTHER VS. MARTIN LUTHER KING JR.',
        headers: ['Feature', 'Martin Luther', 'Martin Luther King Jr.'],
        rows: [
          ['Era', '1500s (Renaissance)', '1900s (Modern)'],
          ['Location', 'Germany', 'United States'],
          ['Main Role', 'Theological Reformer', 'Civil Rights Leader'],
          ['Primary Opponent', 'Papal Authority / Indulgences', 'Systemic Racism / Segregation'],
          ['Legacy', 'The Protestant Church', 'Civil Rights Legislation']
        ]
      },
      {
        title: 'THE FIVE "SOLAS" OF THE REFORMATION',
        headers: ['Sola', 'Meaning', 'Scripture'],
        rows: [
          ['Sola Scriptura', 'Scripture Alone is the final authority.', '2 Timothy 3:16'],
          ['Sola Fide', 'Faith Alone is the means of salvation.', 'Romans 3:28'],
          ['Sola Gratia', 'Grace Alone is the source of salvation.', 'Ephesians 2:8'],
          ['Solus Christus', 'Christ Alone is the only mediator.', '1 Timothy 2:5'],
          ['Soli Deo Gloria', 'Glory to God Alone is the purpose of life.', '1 Corinthians 10:31']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'vat-1',
        title: 'The Fortress of Faith',
        description: 'St. Peter’s Basilica standing as the monumental center of the Vatican, built over the traditional burial site of the Apostle Peter.',
        scripture: 'Matthew 16:18',
        imagePrompt: 'The grand St. Peters Square in Rome at dusk, the massive dome of the Basilica glowing, architectural masterpiece, cinematic wide shot, historical atmosphere.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'vat-2',
        title: 'The Protesting Monk',
        description: 'Martin Luther pinning his 95 Theses to the door of the Castle Church in Wittenberg, sparking the Reformation.',
        scripture: 'Romans 1:17',
        imagePrompt: 'A monk in dark robes nailing a parchment scroll to a large wooden cathedral door, crowds of medieval people watching in the shadows, dramatic chiaroscuro lighting.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'vat-3',
        title: 'The Apostolic Archive',
        description: 'The vast, climate-controlled corridors of the Vatican archives, holding the recorded history of western civilization.',
        scripture: 'Psalm 145:4',
        imagePrompt: 'An endless hallway with floor-to-ceiling wooden shelves filled with ancient leather-bound books and scrolls, soft glowing lamps, sense of immense history and mystery.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_39;
