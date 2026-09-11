import { TheologyCategory } from '../../types.js';

const category_18: TheologyCategory = {
  id: '18',
  title: 'Easter & Resurrection',
  subtitle: 'The Cornerstone of the Christian Faith',
  overview: 'The cornerstone doctrine of Christianity, explored historically, theologically, and apologetically. Last updated on November 21, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. Overview: The Turning Point of History**
Easter is not merely a holiday; it is the cosmic turning point of history. The death, burial, and resurrection of Jesus Christ are the foundation of the Christian faith, the fulfillment of prophecy, the defeat of sin, and the guarantee of eternal life. Every sermon in Acts, every epistle of Paul, and every Christian hope flows out of the empty tomb.

---

### **II. Why the Resurrection Is the Core of Christianity**
If Christ has not been raised:
• Our preaching is useless.
• Your faith is useless.
• We are still in our sins.
• The dead have perished.
• Christians are the most pitied of all people.
*(1 Corinthians 15:14–19)*

**The resurrection is:**
- The proof that Jesus is God (**Romans 1:4**).
- The validation of everything He taught.
- The guarantee of our future resurrection.
- The defeat of Satan, sin, and death.
- The inauguration of the New Creation.

---

### **III. Key Scriptural Witnesses (Selected Verses)**
**On His Death & Resurrection:**
• **1 Corinthians 15:3–8**: Christ died for our sins, was buried, and rose on the third day.
• **Romans 4:25**: He was delivered over to death for our sins and raised to life for our justification.
• **Romans 1:4**: Appointed the Son of God in power by His resurrection from the dead.
• **Matthew 28:1–10**: The angelic announcement: "He is not here; he has risen."

**On the Necessity of the Resurrection:**
• **John 11:25–26**: "I am the resurrection and the life."
• **1 Peter 1:3**: Given a living hope through the resurrection of Jesus.
• **Revelation 1:17–18**: "I am the Living One; I was dead, and now look, I am alive for ever and ever!"

---

### **VIII. The Theology of Resurrection: A Deep Dive**
1. **Victory Over Death**: The resurrection reverses the curse given in Eden. Death entered through Adam, but resurrection life enters through Christ (**1 Corinthians 15:21–22**).
2. **Firstborn of the New Creation**: Jesus is the prototype of what believers will become—possessing a resurrected body with no decay, sickness, or mortality (**1 Corinthians 15:42–49**).
3. **Foundation of Christian Hope**: Christianity is the only worldview with a resurrected Savior and a physical eternal restoration.
4. **Vindication of Identity**: It confirms His deity, authority, and the truth of His sinless life.

---

### **IX. Cultural & Global Impact**
• **World History Pivoted**: The resurrection launched the apostolic missions that transformed the Roman Empire and the world.
• **Weekly Worship**: The primary day of worship shifted from Saturday (Sabbath) to Sunday (The Lord's Day) to celebrate the resurrection morning.
• **Global Unity**: Easter remains the most significant shared celebration across all branches of Christianity.

---

### **X. Apologetics: Counter-Questions for Dialogue**
When discussing the historical reality of the empty tomb, consider these questions for thoughtful reflection:
• *“If Jesus didn’t rise, how do you explain the empty tomb?”*
• *“Why did all eyewitnesses willingly die for a lie they would have known was false?”*
• *“How did Christianity start in Jerusalem, the very place where Jesus was publicly crucified and buried?”*
• *“What alternative explanation fits all the historical data better than the resurrection?”*`,
    tables: [
      {
        title: 'IV. THE EVENTS OF EASTER WEEK',
        headers: ['Day', 'Event', 'Significance'],
        rows: [
          ['Palm Sunday', 'Triumphal Entry', 'Jesus enters Jerusalem as the Messianic King.'],
          ['Monday', 'Cleansing of the Temple', 'Jesus asserts authority over God\'s house.'],
          ['Tuesday', 'Teaching in Jerusalem', 'Final public warnings and parables.'],
          ['Wednesday', 'Silent Day', 'Preparation; Judas agrees to betray Jesus.'],
          ['Thursday', 'Last Supper & Gethsemane', 'Institution of Communion; the agony of prayer.'],
          ['Friday', 'The Crucifixion', 'Jesus dies for the sins of the world (6 hours on cross).'],
          ['Saturday', 'Tomb Sealed', 'The body of Christ remains in the grave.'],
          ['Sunday', 'Resurrection Morning', 'The empty tomb; the victory over death.'],
          ['40 Days', 'Appearances', 'Jesus proves He is alive to over 500 witnesses.'],
          ['Ascension', 'Return to Glory', 'Jesus returns to the right hand of the Father.']
        ]
      },
      {
        title: 'VI. HISTORICAL EVIDENCE: THE MINIMAL FACTS',
        headers: ['Fact', 'Description', 'Sources / Evidence'],
        rows: [
          ['1. The Death', 'Jesus died by Roman crucifixion.', 'Tacitus, Josephus, Lucian, Medical Analysis.'],
          ['2. Disciples\' Belief', 'Disciples believed He appeared to them alive.', 'Early Creeds (1 Cor 15:3-5), Eyewitness testimony.'],
          ['3. Transformation', 'Apostles were radically transformed.', 'From fearful hiders to bold martyrs for the faith.'],
          ['4. The Empty Tomb', 'The body was gone; location was well known.', 'Early Jewish polemic admits it; discovered by women.'],
          ['5. Skeptics', 'Conversion of James and Paul.', 'James (unbelieving brother) and Paul (former enemy).'],
          ['6. Proclamation', 'Resurrection was preached immediately.', 'Earliest sermons (Acts 2, 3, 10) center on this event.']
        ]
      },
      {
        title: 'VII. ALTERNATIVE THEORIES VS. REALITY',
        headers: ['Theory', 'The Claim', 'Why It Fails'],
        rows: [
          ['Theft Theory', 'Disciples stole the body.', '❌ Guards + Sealed tomb. ❌ Fearful disciples. ❌ No motive for a lie.'],
          ['Swoon Theory', 'Jesus only fainted.', '❌ Roman execution was professional/fatal. ❌ Spear wound confirmed death.'],
          ['Hallucination', 'Disciples had visions.', '❌ Groups cannot hallucinate collectively. ❌ Doesn\'t explain empty tomb.'],
          ['Legend Theory', 'Story evolved over time.', '❌ Preached immediately. ❌ Early creeds date to 3-5 years after event.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'eas-1',
        title: 'The Triumphal Entry',
        description: 'Jesus entering Jerusalem on a donkey, fulfilling the prophecy of the humble King.',
        scripture: 'Matthew 21:1-11',
        imagePrompt: 'Jesus riding a young donkey into Jerusalem, crowds waving palm branches and laying cloaks on the road, bright morning sun, epic cinematic style.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'eas-2',
        title: 'The Sacrifice at Calvary',
        description: 'The moment of atonement where the Lamb of God bore the sins of the world.',
        scripture: 'John 19:30',
        imagePrompt: 'The three crosses on Golgotha at dusk, storm clouds in the sky, a single shaft of light striking the central cross, dramatic chiaroscuro painting.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Christ'
      },
      {
        id: 'eas-3',
        title: 'The Victorious Dawn',
        description: 'The empty tomb at sunrise, signifying the defeat of death and the hope of new life.',
        scripture: 'Matthew 28:6',
        imagePrompt: 'A massive stone rolled away from a tomb, brilliant white light emanating from within, sunrise over the hills of Jerusalem, ethereal and hopeful.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Christ'
      }
    ]
  }
};export default category_18;
