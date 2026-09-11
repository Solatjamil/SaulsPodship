import { TheologyCategory } from '../../types.js';

const category_10: TheologyCategory = {
  id: '10',
  title: "Apostle's Creed",
  subtitle: 'The Rule of Faith and Apostolic Confession',
  overview: 'The foundational confession of Christian doctrine, outlining the Triune God, the Incarnation, the Passion, and the eternal hope of believers. Last updated on November 18, 2025.',
  content: {
    analysis: `### **Introduction: The Regula Fidei (Rule of Faith)**
The **Apostle's Creed** (Latin: *Symbolum Apostolorum*) is the oldest and most widely accepted confession of faith in the history of the Christian Church. Dating back to the 2nd century in its earliest form (the Old Roman Symbol), it served as the baseline baptismal confession for the early believers, functioning as an intellectual and spiritual armor against early heresies like Gnosticism and Marcionism.

Contrary to the medieval legend that each of the twelve apostles authored one of the twelve clauses, modern scholarship confirms it was a communal, organic synthesis of apostolic preaching (*Kerygma*).

[[CHART: Historical Continuity|95|#1D2D50, Triune Structure|100|#8B1E3F, Christological Focus|60|#D4AF37]]

---

### **Clause-by-Clause Exegetical Breakdown**

#### **1. I believe in God, the Father almighty, creator of heaven and earth.**
• **Theological Focus**: God's absolute sovereignty and loving Fatherhood.
• **Anti-Heresy**: Gnostics claimed a lesser evil deity (the Demiurge) created the physical world. This clause affirms that the supreme Father is the direct Creator of all matter.
• *Scripture: Genesis 1:1; Isaiah 44:24; Romans 8:15*

#### **2. And in Jesus Christ, his only Son, our Lord.**
• **Theological Focus**: Affirmation of the Messiahship (*Christos*), divine Sonship, and ultimate Lordship (*Kyrios*) of Jesus.
• *Scripture: Matthew 16:16; John 3:16; Philippians 2:11*

#### **3. Who was conceived by the Holy Spirit and born of the virgin Mary.**
• **Theological Focus**: The mystery of the Incarnation—fully God (conceived of the Spirit) and fully man (born of Mary).
• **Anti-Heresy**: Docetism (the belief that Jesus only *seemed* human). The physical birth verifies His genuine humanity.
• *Scripture: Luke 1:35; Galatians 4:4*

#### **4. Suffered under Pontius Pilate, was crucified, died, and was buried.**
• **Theological Focus**: The historical reality of Jesus' life and death.
• **Historical Reality**: Mentioning "Pontius Pilate" tethers the cosmic atonement to a specific, verifiable date in human history.
• *Scripture: John 19:16; 1 Corinthians 15:3–4*

#### **5. He descended into hell. The third day he rose again from the dead.**
• **Theological Focus**: Christ's victory over death and the grave (*Hades* / *Sheol*), followed by His bodily, historical resurrection.
• *Scripture: 1 Peter 3:18-19; Ephesians 4:9; Acts 2:24*

#### **6. He ascended into heaven and is seated at the right hand of God the Father almighty.**
• **Theological Focus**: The exaltation and session of Christ, ruling as cosmic King until all enemies are subdued.
• *Scripture: Luke 24:51; Hebrews 1:3; Colossians 3:1*

#### **7. From there he will come to judge the living and the dead.**
• **Theological Focus**: Eschatological accountability and the promise of ultimate justice.
• *Scripture: Matthew 25:31–32; 2 Timothy 4:1*

#### **8. I believe in the Holy Spirit.**
• **Theological Focus**: Affirming the personality and divinity of the third Person of the Trinity.
• *Scripture: John 14:26; Acts 5:3–4*

#### **9. The holy catholic church, the communion of saints.**
• **Theological Focus**: "Catholic" refers to the universal, global body of Christ across all generations, bound in mystical fellowship.
• *Scripture: Ephesians 4:4–6; Revelation 7:9*

#### **10. The forgiveness of sins.**
• **Theological Focus**: The heart of the Gospel—justification and reconciliation by grace through faith.
• *Scripture: Colossians 1:13–14; Ephesians 1:7*

#### **11. The resurrection of the body.**
• **Theological Focus**: The physical restoration of the human person, refuting Gnostic views that the body is inherently evil.
• *Scripture: Philippians 3:21; 1 Corinthians 15:51–53*

#### **12. And the life everlasting. Amen.**
• **Theological Focus**: The ultimate *telos*—everlasting communion with God in a renewed creation.
• *Scripture: Revelation 21:3–4*`,
    tables: [
      {
        title: 'I. THE THREE GREAT CREEDS COMPARISON',
        headers: ['Creed', '📌 Historical Context & Focus', '💡 Core Theological Contribution'],
        rows: [
          [
            "1",
            "📌 Apostles' Creed\n📖 2nd Century AD (Old Roman Symbol).\n📝 Baptismal confession in Rome.",
            "💡 Foundational rule of faith; structured around the Father, Son, and Holy Spirit. Simple and narrative-driven."
          ],
          [
            "2",
            "📌 Nicene Creed\n📖 325 AD (Nicaea) & 381 AD (Constantinople).\n📝 Written to combat Arianism.",
            "💡 Strictly defines the consubstantiality (*homoousios*) of the Son with the Father, and the full deity of the Holy Spirit."
          ],
          [
            "3",
            "📌 Athanasian Creed\n📖 Late 5th / early 6th Century AD.\n📝 Defends against modalism & tritheism.",
            "💡 A highly precise, exhaustive definition of the Trinity and the dual natures of Christ (fully God, fully man)."
          ]
        ]
      }
    ],
    storyPanels: [
      {
        id: 'creed-1',
        title: 'God the Creator',
        description: 'The Father almighty shaping the heavens and the earth out of nothing.',
        scripture: 'Genesis 1:1',
        imagePrompt: 'Ethereal cosmic painting, God’s creative power forming galaxies and earth, dark space filled with sparkling stars, golden and blue light, deep shadows.',
        colorTheme: '#1D2D50',
        era: 'Creation'
      },
      {
        id: 'creed-2',
        title: 'Conceived of the Holy Spirit',
        description: 'The angel announcing the incarnation to the virgin Mary as a divine light overshadows her.',
        scripture: 'Luke 1:35',
        imagePrompt: 'The Annunciation, Virgin Mary kneeling, an ambient divine warm light beam descending from heaven, Renaissance atmosphere, serene and soft textures.',
        colorTheme: '#D4AF37',
        era: 'Christ'
      },
      {
        id: 'creed-3',
        title: 'The Session of Christ',
        description: 'Jesus Christ seated in glory at the right hand of the Father, ruling over all creation.',
        scripture: 'Hebrews 1:3',
        imagePrompt: 'Glorified Jesus Christ seated on a majestic throne of pure light, brilliant golden aura, angels in deep reverence, cinematic rendering, awe-inspiring.',
        colorTheme: '#8B1E3F',
        era: 'Christ'
      }
    ]
  }
};

export default category_10;
