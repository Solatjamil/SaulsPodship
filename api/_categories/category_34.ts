import { TheologyCategory } from '../../types.js';

const category_34: TheologyCategory = {
  id: '39',
  title: 'Seven Last Words of Jesus',
  subtitle: 'The Seven Utterances of Jesus on the Cross',
  overview: 'A devotional and theological journey through the seven final statements uttered by Jesus during His crucifixion, as recorded in the four Gospels.',
  backgroundPrompt: 'Crucifixion scene at Golgotha, dramatic dark sky, sacred rays of light breaking through heavy clouds, Caravaggio style chiaroscuro oil painting',
  content: {
    analysis: `### **The Final Utterances of the Incarnate Word**

The final statements of Jesus Christ from the cross represent the pinnacle of His earthly ministry, revealing His heart, His mission, and His divine identity. Referred to as the **“Seven Last Words,”** these sayings are not recorded in a single Gospel but are gathered from all four testimonies (Matthew, Mark, Luke, and John). Taken together, they form a cohesive, magnificent theological tapestry of redemption, reconciliation, and triumph.

Historically and liturgically, they have been studied for centuries as a window into the dual nature of Christ—displaying both His profound human suffering and His absolute sovereign divinity.

---

### **Theological and Historical Hierarchy**

These seven utterances follow a progression that moves from Jesus’ concern for others to His internal spiritual struggle, and finally to His victorious submission:

1. **Word of Forgiveness**: *"Father, forgive them, for they know not what they do."*
   In the amidst of unbearable agony, Jesus acts as the supreme Intercessor, practicing the radical love He preached during the Sermon on the Mount. He advocates for His executioners and humanity.
   
2. **Word of Salvation**: *"Truly, I say to you, today you will be with me in Paradise."*
   Responding to the repentant thief, Jesus demonstrates His immediate authority to grant salvation. He reveals that redemption is by grace through faith alone, independent of ritual or work.
   
3. **Word of Relationship**: *"Woman, behold your son... Behold your mother."*
   Jesus establishes a new spiritual family (the Church) centered on obedience to God rather than mere biological ties, entrusting His mother Mary to the care of the Beloved Disciple.
   
4. **Word of Abandonment**: *"My God, My God, why have you forsaken me?"*
   Quoting Psalm 22:1, Jesus experiences the ultimate cost of bearing human sin—the breaking of relational communion with the Father as He becomes the sacrificial substitute.
   
5. **Word of Distress**: *"I thirst."*
   The shortest statement highlights the physical reality of the Incarnation. Jesus did not merely appear to suffer; He suffered fully in the flesh, fulfilling Psalm 69:21.
   
6. **Word of Victory**: *"It is finished."*
   Translating the Greek word **Tetelestai**—a commercial term meaning “paid in full.” The sacrificial debt of humanity is permanently cleared; the Old Covenant temple system is replaced by perfect reconciliation.
   
7. **Word of Reunion**: *"Father, into your hands I commit my spirit."*
   Quoting Psalm 31:5, Jesus dies not as a victim whose life is taken, but voluntarily surrendering His spirit in perfect communion with the Father, anticipating the resurrection.

---

### **Deep Historical Context & The Greek "Tetelestai"**

The sixth saying (*"It is finished"*) is encapsulated by the single Greek word **Τετέλεσται (Tetelestai)**. In the ancient world, this word carried deep practical and legal implications:
• **In Business**: Servants used it when a task was fully accomplished, and merchants stamped it on bills to indicate a debt was *paid in full*.
• **In the Temple**: High priests would utter a similar exclamation when examining a sacrificial lamb and finding it completely free of blemishes.

By crying out *Tetelestai*, Christ declared that the moral debt of sin was fully paid, all messianic prophecies of the suffering servant were accomplished, and the ultimate sacrifice was completed forever.`,
    tables: [
      {
        title: 'I. THE SEVEN LAST WORDS: GOSPEL SYNCHRONIZATION',
        headers: ['Order', 'The Utterance of Christ', 'Scripture Reference', 'Theological Theme', 'Audience/Recipient'],
        rows: [
          ['First', '“Father, forgive them, for they know not what they do.”', 'Luke 23:34', 'Divine Grace & Intercession', 'The Executioners & Humanity'],
          ['Second', '“Truly, I say to you, today you will be with me in Paradise.”', 'Luke 23:43', 'Immediate Salvation by Grace', 'The Repentant Thief'],
          ['Third', '“Woman, behold your son... Behold your mother.”', 'John 19:26-27', 'Covenantal Family & Church Care', 'Mary & the Disciple John'],
          ['Fourth', '“Eli, Eli, lema sabachthani?” (My God, my God, why have you forsaken me?)', 'Matt 27:46 / Mark 15:34', 'Sacrificial Atonement & Separation', 'The Father (Psalm 22:1 Fulfillment)'],
          ['Fifth', '“I thirst.”', 'John 19:28', 'Humanity of the Incarnate Word', 'The Witnesses (Psalm 69:21 Fulfillment)'],
          ['Sixth', '“It is finished.” (Tetelestai)', 'John 19:30', 'Accomplishment of Redemption', 'Cosmic Proclamation'],
          ['Seventh', '“Father, into your hands I commit my spirit.”', 'Luke 23:46', 'Perfect Trust & Sovereign Yielding', 'The Father (Psalm 31:5 Fulfillment)']
        ]
      },
      {
        title: 'II. PROPHECY FULFILLMENT MATRIX',
        headers: ['Saying', 'Old Testament Prophecy / Type', 'New Testament Fulfillment Reference', 'Theological Legacy'],
        rows: [
          ['1st Word', 'Isaiah 53:12 (“Made intercession for the transgressors”)', 'Luke 23:34', 'Christ’s role as the Great High Priest'],
          ['2nd Word', 'Zechariah 9:12 (“Return to your stronghold, prisoners of hope”)', 'Luke 23:43', 'Salvation is instant and sovereignly granted'],
          ['4th Word', 'Psalm 22:1 (“My God, my God, why have you forsaken me?”)', 'Matthew 27:46', 'The exact spiritual weight of penal substitution'],
          ['5th Word', 'Psalm 69:21 (“For my thirst they gave me sour wine”)', 'John 19:28-29', 'True bodily thirst validating Christ’s humanity'],
          ['7th Word', 'Psalm 31:5 (“Into your hand I commit my spirit”)', 'Luke 23:46', 'Death is conquered by conscious, royal surrender']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'slw-1',
        title: 'The Intercession',
        description: 'While being nailed to the wood, Jesus prays for His executioners: "Father, forgive them, for they know not what they do." Roman soldiers cast lots for His seamless tunic at the base of the cross, unaware of the cosmic salvation unfolding above them.',
        scripture: 'Luke 23:34',
        imagePrompt: 'Crucifixion close-up, Roman soldiers casting dice for a tunic at the base of a great wooden cross, dark stormy light, fine historical oil painting',
        colorTheme: '#8B1E3F',
        era: 'New Testament Era'
      },
      {
        id: 'slw-2',
        title: 'The Paradise Promise',
        description: 'Two criminals hang beside Him. While one mocks, the other confesses his sins and asks: "Lord, remember me when You come into Your kingdom." Jesus turns His head and promises: "Truly, today you will be with me in Paradise."',
        scripture: 'Luke 23:43',
        imagePrompt: 'Two crosses side by side, detailed view of Christ looking kindly at a repentant criminal, dramatic lighting, Byzantine elements, divine light rays',
        colorTheme: '#D4AF37',
        era: 'New Testament Era'
      },
      {
        id: 'slw-3',
        title: 'The New Family',
        description: 'Gazing down through blood and sweat, Jesus sees His grieving mother Mary and His beloved disciple John. Reorganizing earthly bonds into covenant loyalty, He commands Mary: "Behold your son," and John: "Behold your mother."',
        scripture: 'John 19:26-27',
        imagePrompt: 'Virgin Mary crying, comforted by disciple John, looking up at Jesus on the cross, dramatic chiaroscuro oil painting, high contrast',
        colorTheme: '#1E3A8A',
        era: 'New Testament Era'
      },
      {
        id: 'slw-4',
        title: 'The Great Cry',
        description: 'At the ninth hour, a supernatural darkness covers the land. Jesus cries out in Aramaic: "Eli, Eli, lema sabachthani?"—experiencing the raw weight of spiritual isolation as He takes on the sins of the world.',
        scripture: 'Matthew 27:46',
        imagePrompt: 'Supernatural dark sky over Calvary, cross silhouette against a dark crimson eclipse, apocalyptic mood, heavy impasto painting technique',
        colorTheme: '#0F172A',
        era: 'New Testament Era'
      },
      {
        id: 'slw-6',
        title: 'Tetelestai',
        description: 'Knowing all things are now accomplished, Jesus drinks sour wine to moisten His throat, cries out with a loud triumphant voice, "It is finished!" and bows His head. The curtain in the Temple rips from top to bottom, opening access to God.',
        scripture: 'John 19:30',
        imagePrompt: 'The veil of the temple torn in half, brilliant holy light exploding from the Holy of Holies, dust and architectural ruins, grand cinematic painting',
        colorTheme: '#10B981',
        era: 'New Testament Era'
      }
    ]
  }
};
export default category_34;
