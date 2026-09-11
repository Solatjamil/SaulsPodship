import { TheologyCategory } from '../../types.js';

const category_40: TheologyCategory = {
  id: '40',
  title: "World's All Big Churches",
  subtitle: 'An overview of major Christian denominations and movements worldwide.',
  overview: 'An exhaustive directory of the diverse branches of the global Church, from ancient traditions to modern independent movements. Last updated on November 26, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **The Global Catalog of Christianity**
The Body of Christ is comprised of a vast array of traditions, each with unique histories and organizational structures. Below is a breakdown of the major families and specific denominations.

---

### **I. THE ANCIENT & HISTORIC TRADITIONS**

#### **🇻🇦 Catholic (1)**
• **Roman Catholic Church**: The largest religious body, under the authority of the Pope in Vatican City.

#### **☦️ Eastern Orthodox (10)**
Traditional national and regional churches:
• Russian, Greek, Serbian, Bulgarian, Romanian, Georgian, Antiochian Orthodox Churches.
• Orthodox Church in America, Ukrainian Orthodox Church.

#### **⛪ Oriental Orthodox (6)**
Non-Chalcedonian churches recognizing the first three councils:
• Coptic (Egypt), Syriac, Armenian Apostolic, Ethiopian, Eritrean, and Malankara Orthodox Syrian Church (India).

#### **📜 Church of the East (2)**
• Assyrian Church of the East, Ancient Church of the East.

#### **🇬🇧 Anglican / Episcopalian (4)**
• Church of England, The Episcopal Church (USA), Anglican Church in North America, Continuing Anglican Movement.

---

### **II. THE REFORMATION FAMILIES**

#### **🛡️ Lutheran (4)**
• Evangelical Lutheran Church in America (ELCA), Lutheran Church–Missouri Synod (LCMS), Wisconsin Synod (WELS), Church of Sweden.

#### **🏛️ Reformed / Presbyterian (5)**
• Presbyterian Church (USA), PCA, United Reformed Churches, Christian Reformed Church, Reformed Church in America.

#### **🔥 Methodist (4)**
• United Methodist Church, African Methodist Episcopal (AME), Free Methodist, Wesleyan Church.

#### **🌊 Baptist (5)**
• Southern Baptist Convention, American Baptist Churches USA, National Baptist Convention, Missionary Baptist, Independent Baptist.

---

### **III. MODERN & RESTORATION MOVEMENTS**

#### **🕊️ Pentecostal (6)**
• Assemblies of God, Church of God (Cleveland, TN), COGIC, International Pentecostal Holiness, Foursquare, United Pentecostal Church (Oneness).

#### **🏁 Restorationist (4)**
• Churches of Christ, Disciples of Christ, Christian Church (Independent), Seventh-day Adventist Church.

#### **🌍 African Initiated Churches (3)**
• Zion Christian Church, Church of the Lord (Aladura), Celestial Church of Christ.

#### **🏠 Charismatic & Evangelical Independent (4)**
• Calvary Chapel, Hillsong Church, Vineyard Churches, New Apostolic Reformation (NAR).

---

### **IV. NONTRINITARIAN & OTHER MOVEMENTS**

#### **⚖️ Nontrinitarian (5)**
• Jehovah's Witnesses, The Church of Jesus Christ of Latter-day Saints (Mormons), Unitarian Universalists, Christadelphians, Swedenborgians.

#### **🕊️ Historic Peace Churches (3)**
• Mennonites, Amish, Hutterites.

#### **🌟 Other Movements (7)**
• Quakers, Salvation Army, Christian Science, Unity Church, Messianic Judaism, House Church/Underground Church movements.`,
    tables: [
      {
        title: 'BELIEF / DOCTRINE COMPARISON MATRIX',
        headers: ['Doctrine', 'Catholic', 'East. Ortho.', 'Orient. Ortho.', 'Prot. Mainline', 'Evangelical', 'Pentecostal', 'LDS (Mormon)', 'JW', 'SDA', 'Unitarian'],
        rows: [
          ['Trinity', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ (3 beings)', '❌ (Jesus≠God)', '✔️ Yes', '❌ (No Trinity)'],
          ['Jesus is God', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ No', '✔️ Yes', '❌ No'],
          ['Bible Canon', '73 books', '76–81', '81 books', '66 books', '66 books', '66 books', 'Bible + 3', 'Bible (NWT)', '66 books', 'Variable'],
          ['Tradition', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ Bible Only', '❌ Bible Only', '❌ Bible Only', '❌ Extra books', '❌ Watchtower', '❌ Bible Only', '❌ Reason'],
          ['Salvation', 'Faith+Wks', 'Faith+Wks', 'Faith+Wks', '✔️ Faith Alone', '✔️ Faith Alone', '✔️ Faith Alone', '❌ Faith+Wks', '❌ No', '✔️ Yes', '❌ No'],
          ['Infant Bap.', '✔️ Yes', '✔️ Yes', '✔️ Yes', 'Varies', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Real Pres.', '✔️ Yes', '✔️ Yes', '✔️ Yes', '❌ Symbolic', '❌ Symbolic', 'Varies', '❌ Symbolic', '❌ Symbolic', '❌ Symbolic', '❌ No'],
          ['Purgatory', '✔️ Yes', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Tongues', '❌ No', '❌ No', '❌ No', '❌ No', '✔️ Sometimes', '✔️ Essential', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Afterlife', 'H/H/P', 'H/H', 'H/H', 'H/H', 'H/H', 'H/H', '3 Kingdoms', 'Earthly', 'H/E', 'Variable'],
          ['Icons/Img', '✔️ Yes', '✔️ Icons', '✔️ Yes', '❌ No', '✔️ Some', '✔️ Yes', '❌ No', '❌ No', '❌ No', '❌ No'],
          ['Sat. Sabb.', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '❌ No', '✔️ Yes', '❌ No']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'global-1',
        title: 'The Global Cathedral',
        description: 'Diversity within the Body of Christ, representing every tribe, tongue, and nation gathered in worship.',
        scripture: 'Revelation 7:9',
        imagePrompt: 'A collage of diverse global church architecture and people from all continents in prayer, brilliant sunrise, warm golden light, cinematic scale.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_40;
