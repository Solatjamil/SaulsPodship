import { TheologyCategory } from '../../types.js';

const category_46: TheologyCategory = {
  id: '46',
  title: 'Ark of Covenant and other Biblical Relics',
  subtitle: 'Sacred Objects: History, Mystery, and Modern Locations',
  overview: 'A scholarly examination of the Ark of the Covenant and other primary biblical relics, including artifacts associated with Jesus, their historical journey, and current claims of preservation.',
  content: {
    analysis: `### **I. The Ark of the Covenant (Aron HaBerit)**
The Ark of the Covenant is the most sacred object in the Old Testament, representing the localized presence of YHWH among His people. Constructed at Sinai according to divine specification (Exodus 25:1-22), it was a wooden chest overlaid with pure gold, topped by the Mercy Seat (*Kapporet*) and two gold Cherubim.

**The Contents of the Ark:**
• **The Ten Commandments**: The stone tablets given to Moses (Deuteronomy 10:1-5).
• **The Pot of Manna**: A reminder of God’s provision in the wilderness (Exodus 16:33-34).
• **Aaron’s Rod**: The staff that budded to confirm the Levitical priesthood (Numbers 17:1-11).

**Where is it now?**
The Ark disappeared from the historical record after the Babylonian siege of Jerusalem in 586 BC. 
1. **Mount Nebo (Apocryphal)**: 2 Maccabees 2:4–8 claims Jeremiah hid it in a cave.
2. **Aksum, Ethiopia**: The Ethiopian Orthodox Church claims the Ark resides in the Chapel of the Tablet at the Church of Our Lady Mary of Zion.
3. **Temple Mount (Tunnels)**: Some Jewish traditions suggest it was buried in a secret chamber beneath the Temple Mount before the exile.

---

### **II. The Passion Relics (Relics of Jesus)**
Relics associated with the life, death, and resurrection of Jesus are categorized as "Relics of the Passion." 

• **The Shroud of Turin**: A linen cloth bearing the negative image of a man who appears to have suffered physical trauma consistent with crucifixion. Located in the **Cathedral of Saint John the Baptist, Turin, Italy**.
• **The True Cross**: Fragments of the cross found by Saint Helena in the 4th century. Pieces are distributed across various cathedrals, primarily **Santa Croce in Gerusalemme, Rome**.
• **The Crown of Thorns**: Traditionally the crown placed on Jesus' head (John 19:2). Long housed in the Notre-Dame de Paris, it was rescued from the 2019 fire and is currently held in the **Louvre Museum** for safekeeping.
• **The Holy Lance (Spear of Destiny)**: The spear used by Longinus to pierce Jesus' side (John 19:34). Several claim to exist, the most famous being in the **Imperial Treasury (Hofburg), Vienna, Austria**.

---

### **III. Theological Caution & Relic Categories**
Theologically, the Church distinguishes between levels of relics:
1. **First Class**: Physical remains of a saint or parts of objects associated with Jesus’ life (e.g., the Cross).
2. **Second Class**: Items worn or used by a saint (e.g., a garment).
3. **Third Class**: Objects touched to a first-class relic.

> **⚠️ Academic Guardrail**: While these relics hold immense historical and devotional value, faith is grounded in the Person of Christ and the living Word, not in the physical verification of ancient artifacts. Many relics have faced intense carbon-dating scrutiny with varying results.`,
    scriptures: [
      { reference: "Exodus 25:10-22", text: "Have them make an ark of acacia wood... Overlaid with pure gold... I will meet with you and give you all my commands for the Israelites." },
      { reference: "Hebrews 9:3-5", text: "Behind the second curtain was a room called the Most Holy Place, which had the golden altar of incense and the gold-covered ark of the covenant." },
      { reference: "Revelation 11:19", text: "Then God’s temple in heaven was opened, and within his temple was seen the ark of his covenant." },
      { reference: "Deuteronomy 10:1-5", text: "At that time the Lord said to me, 'Chisel out two stone tablets... and come up to me on the mountain.' ... I put the tablets in the ark I had made." },
      { reference: "John 19:34", text: "Instead, one of the soldiers pierced Jesus’ side with a spear, bringing a sudden flow of blood and water." }
    ],
    tables: [
      {
        title: 'I. THE ARK OF THE COVENANT: HISTORICAL JOURNEY',
        headers: ['Era', 'Location / Event', 'Scripture Reference'],
        rows: [
          ['The Wilderness', 'Carried by Levites; led the march.', 'Exodus 25:10-22'],
          ['Crossing Jordan', 'River dried up as Ark entered.', 'Joshua 3:15-17'],
          ['The Philistine Exile', 'Captured at the Battle of Aphek; plagues in Philistia.', '1 Samuel 4:11-5:12'],
          ['Davidic Jerusalem', 'Brought to the City of David with dancing.', '2 Samuel 6:12-15'],
          ['Solomon’s Temple', 'Placed in the Holy of Holies; Shekinah glory filled the house.', '1 Kings 8:1-11'],
          ['The Disappearance', 'Likely lost or hidden during the Babylonian invasion.', '2 Kings 25:1-30']
        ]
      },
      {
        title: 'II. MAJOR RELICS OF JESUS & PRESERVATION SITES',
        headers: ['Artifact', 'Traditional Identification', 'Current Location'],
        rows: [
          ['Shroud of Turin', 'Jesus’ Burial Cloth', 'Turin, Italy'],
          ['Sudarium of Oviedo', 'Jesus’ Face Cloth', 'Oviedo, Spain'],
          ['The Holy Tunic', 'The seamless robe of Jesus', 'Trier Cathedral, Germany'],
          ['The Holy Nails', 'Nails from the Crucifixion', 'Rome / Paris (claimed)'],
          ['The Title (Titulus)', 'The "INRI" sign from the Cross', 'Rome, Italy (Santa Croce)'],
          ['The Holy Stairs', 'Steps Jesus climbed at Pilate\'s palace', 'Rome, Italy (Scala Sancta)']
        ]
      }
    ]
  }
};export default category_46;
