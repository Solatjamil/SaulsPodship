import { TheologyCategory } from '../../types.js';

const category_12: TheologyCategory = {
  id: '12',
  title: 'Christianity in South Asia',
  subtitle: 'From the Apostle Thomas to the Modern Era',
  overview: 'A complete historical, cultural, theological, and sociological overview of Christianity in the Indian Subcontinent — from the Apostle Thomas to modern-day Pakistan and India. Last updated on November 20, 2025.',
  content: {
    analysis: `### **Ancient Roots: Christianity Before Colonialism**
Christianity in South Asia is not a product of European colonialism; it is one of the oldest forms of the faith in the world. According to ancient tradition and historical evidence, the **Apostle Thomas** arrived on the Malabar Coast (modern-day Kerala) in 52 AD. He established seven churches and was eventually martyred in Chennai in 72 AD.

**The St. Thomas Christians**:
These early believers maintained a distinctively Eastern Christian identity, using Syriac (Aramaic) as their liturgical language. They were part of the "Church of the East" long before Portuguese or British ships ever touched Indian shores.

---

### **The Missionary Eras: Translation and Transformation**
The landscape of South Asian Christianity shifted with the arrival of the Portuguese (1500s) and later the British (1800s). This period saw massive efforts in Bible translation and social reform.

• **The Serampore Trio**: William Carey and his team translated the Bible into dozens of Indian languages, including Hindi, Bengali, and Sanskrit, while also campaigning against social injustices like *sati* (widow burning).
• **Education and Healthcare**: Missionaries established thousands of schools and hospitals, such as Christian Hospital Taxila and Forman Christian College, which have played a central role in the development of the region.

---

### **Pakistan: The Sialkot Revival and the Punjabi Zaboor**
One of the most significant spiritual events in South Asian history was the **Sialkot Revival (1904–1905)**. This indigenous movement led to a massive expansion of the faith in the Punjab region.

A crown jewel of this era is the **Punjabi Zaboor**—the metrical translation of the Psalms into the Punjabi language by **Imam-ud-Din Shahbaz (I.D. Shahbaz)**. These Psalms are sung in a traditional *Raag* style and remain the heart of worship for millions of Punjabi Christians today, bridging the gap between Semitic theology and South Asian musical culture.

---

### **Modern Challenges and Resilience**
Today, Christianity in South Asia is a vibrant, diverse community that faces significant challenges. From political extremism and blasphemy laws in Pakistan to social marginalization in parts of India, the "South Asian Church" remains a community of profound resilience. It is a church that is often poor in worldly terms but rich in spiritual zeal, holding fast to the promise that "blessed are those who are persecuted for righteousness' sake" (Matthew 5:10).`,
    tables: [
      {
        title: 'I. TIMELINE OF CHRISTIANITY IN SOUTH ASIA',
        headers: ['Date', '📌 Key Historical Event', '🌍 Significance'],
        rows: [
          ['52 AD', 'Arrival of Apostle Thomas', 'Establishment of the first Christian communities in India.'],
          ['345 AD', 'Knai Thoma Migration', 'Reinforcement of the Syriac-Christian community in Kerala.'],
          ['1498', 'Portuguese Arrival (Vasco da Gama)', 'Introduction of Roman Catholic influence and Latin rites.'],
          ['1706', 'First Protestant Mission (Tranquebar)', 'Ziegenbalg translates the first Tamil Bible.'],
          ['1818', 'William Carey\'s Serampore Mission', 'Pioneer of mass Bible translation and social reform.'],
          ['1904', 'Sialkot Revival', 'A major indigenous spiritual awakening in modern-day Pakistan.'],
          ['1947', 'Partition of India and Pakistan', 'The church splits geographically between the two new nations.'],
          ['Present', 'Expansion of Pentecostal Movements', 'Rapid growth among marginalized and rural communities.']
        ]
      },
      {
        title: 'II. KEY SOUTH ASIAN CHRISTIAN FIGURES',
        headers: ['Figure', '📌 Contribution & 📖 Legacy', '💡 Theme'],
        rows: [
          ['Apostle Thomas', 'Traditional founder of the church in India; martyred in Mylapore.', '💡 Apostolic Roots'],
          ['I.D. Shahbaz', 'The "Punjabi Psalmist" who translated the Psalms into metrical verse.', '💡 Cultural Indigenization'],
          ['William Carey', 'Translated the Bible into dozens of languages; "Father of Modern Missions."', '💡 Bible Translation'],
          ['Pandita Ramabai', 'Christian reformer who fought for women’s education and rights.', '💡 Social Justice'],
          ['Sadhu Sundar Singh', 'Evangelist who used the "Saffron Robe" to bridge Gospel and Indian culture.', '💡 Contextualization'],
          ['Henry Martyn', 'Translated the New Testament into Urdu and Persian.', '💡 Linguistic Outreach']
        ]
      },
      {
        title: 'III. CONTRIBUTIONS TO THE REGION',
        headers: ['Sector', '📌 Institutions & 📝 Notable Impact'],
        rows: [
          ['Education', '📌 Forman Christian College, St. Stephen’s Delhi.\n📝 Pioneered literacy and modern scientific education.'],
          ['Healthcare', '📌 Taxila Christian Hospital, Sahiwal Mission Hospital.\n📝 Specialized care in leprosy, ophthalmology, and rural health.'],
          ['Literature', '📌 The Punjabi Zaboor, Urdu/Hindi Bible translations.\n📝 Preserved and elevated local languages through printing.'],
          ['Social Reform', '📌 Anti-sati movements, Dalit empowerment.\n📝 Fought for the dignity of the marginalized and oppressed.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'asia-1',
        title: 'The Apostle at Malabar',
        description: 'St. Thomas arriving on the shores of Kerala, greeted by local merchants and fishermen.',
        scripture: 'John 20:28',
        imagePrompt: 'An ancient wooden boat approaching a tropical palm-fringed shore, a bearded man in Middle Eastern robes standing at the bow, golden sunset lighting, historical epic style.',
        colorTheme: '#2196F3',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'asia-2',
        title: 'The Punjabi Psalmist',
        description: 'Imam-ud-Din Shahbaz composing the metrical Punjabi Psalms (Zaboor) under a banyan tree.',
        scripture: 'Psalm 100:1-2',
        imagePrompt: 'An elderly man with a white beard and turban writing on parchment, sitting under a large ancient tree, local villagers listening, traditional Punjab setting, warm morning light.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'asia-3',
        title: 'Light in the Valley',
        description: 'The Sialkot Revival, where thousands gathered for prayer and spiritual awakening.',
        scripture: 'Acts 1:8',
        imagePrompt: 'A vast crowd of South Asian people in white garments praying in an open field, a soft ethereal glow descending from the sky, spiritual atmosphere, cinematic wide shot.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_12;
