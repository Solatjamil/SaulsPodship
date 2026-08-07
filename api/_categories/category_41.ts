import { TheologyCategory } from '../../types.js';

const category_41: TheologyCategory = {
  id: '41',
  title: 'History of All 12 Disciples',
  subtitle: 'The Apostolic Mission from Jerusalem to the Ends of the Earth',
  overview: 'The complete historical and traditional account of the lives, missions, and martyrdoms of the original twelve apostles following the Resurrection of Jesus. Last updated on November 27, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. The Apostolic Mandate: The Great Commission**
After the resurrection, the disciples were transformed from fearful hiders into bold world-changers. Empowered by the Holy Spirit at Pentecost, they moved out from Jerusalem to fulfill Jesus' command to be His witnesses "to the ends of the earth" (Acts 1:8).

[[CHART: Roman Empire Reach|85|#8B1E3F, Indian Reach|40|#D4AF37, African Reach|30|#4CAF50, Middle Eastern Reach|100|#1D2D50]]

**The Apostolic Transformation:**
• **Shift in Character**: Peter, who denied Christ, becomes the pillar of the Church. Thomas, the doubter, becomes the pioneer to India.
• **Global Dispersion**: The "Dispersion" (Diaspora) allowed the Gospel to travel along Roman roads and Silk Road trade routes.
• **Legacy of Martyrdom**: With the exception of John, every apostle sealed their testimony with their own blood, proving they were not dying for a myth but for a Reality they had personally touched.

---

### **II. Detailed Apostolic Biographies**

#### **1. Simon Peter (The Rock)**
Peter led the early church in Jerusalem and later traveled to Antioch and Rome. Traditional history (Eusebius) records that he was crucified in Rome during Nero's persecution. He requested to be **crucified upside down**, feeling unworthy to die in the same manner as his Lord.

#### **2. Andrew (The First Called)**
Peter's brother, Andrew, is said to have preached in Scythia (modern Russia/Ukraine) and Greece. He was martyred in Patras by being tied to an **X-shaped cross** (Saint Andrew's Cross), where he continued to preach to onlookers for two days before expiring.

#### **3. James, Son of Zebedee (The First Martyr)**
The only apostle whose death is explicitly recorded in the New Testament (Acts 12:2). He was **beheaded** by Herod Agrippa I in Jerusalem around 44 AD.`,
    tables: [
      {
        title: 'III. THE APOSTOLIC FATE SUMMARY MATRIX',
        headers: ['Apostle', 'Primary Mission Field', 'Manner of Death', 'Location', 'Approx. Date'],
        rows: [
          ['Simon Peter', 'Jerusalem, Antioch, Rome', 'Crucified Upside Down', 'Rome, Italy', '64–67 AD'],
          ['Andrew', 'Scythia, Greece, Turkey', 'X-Shaped Cross', 'Patras, Greece', '60 AD'],
          ['James (Zebedee)', 'Judea, Jerusalem', 'Beheading (Sword)', 'Jerusalem', '44 AD'],
          ['John', 'Ephesus, Patmos', 'Natural Causes', 'Ephesus, Turkey', '100 AD'],
          ['Thomas', 'Parthia, India', 'Speared to Death', 'Chennai, India', '72 AD']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'dis-1',
        title: 'The Upper Room Fire',
        description: 'The moment of Pentecost where the disciples were emboldened for their global mission.',
        scripture: 'Acts 2:3',
        imagePrompt: 'A group of 12 men in an ancient stone room, tongues of radiant fire hovering over their heads, bright ethereal light filling the room, emotional and powerful atmosphere.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'dis-2',
        title: 'The Apostle in the East',
        description: 'Thomas reaching the Malabar Coast, bringing the Gospel to the shores of ancient India.',
        scripture: 'Matthew 28:19',
        imagePrompt: 'A bearded man in dusty Middle Eastern robes standing on a tropical palm-fringed shore at sunset, holding a wooden staff, a simple cross around his neck, ancient sailing ships in the distance.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_41;
