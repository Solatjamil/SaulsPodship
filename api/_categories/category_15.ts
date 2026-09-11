import { TheologyCategory } from '../../types.js';

const category_15: TheologyCategory = {
  id: '15',
  title: 'Comparative Religion',
  subtitle: 'Christianity in a Pluralistic World',
  overview: 'A side-by-side analysis of Christianity and other major world religions, focusing on core claims, sacred texts, and the unique person of Jesus Christ. Last updated on November 24, 2025.',
  content: {
    analysis: `### **I. Overview of Comparative Religion**
This category provides a fair, accurate, and respectful comparison of Christianity with other major world religions. The goal is not to focus on rituals but the fundamental mechanism of salvation.

[[CHART: Grace (God's Effort)|100|#1D2D50, Works (Human Effort)|0|#8B1E3F, Ritual Fidelity|25|#D4AF37]]

---

### **IV. Visual Logic: The Salvation Ladder**
• **Timeline of Major Religions**: Tracing the origins from Judaism (2000 BC) to the New Age movement (1960s).
• **The "Jesus Question" Chart**: A bold comparison of how every religion answers: *“Who is Jesus?”*
• **Mechanism of Restoration**: 
  - *Other Religions*: Humanity climbing up to God through effort, ritual, or enlightenment.
  - *Christianity*: God coming down to humanity through the Incarnation and the Cross.

---

### **V. Apologetics Counter-Questions**
> *“If all religions contradict each other on fundamental points (like the nature of God or the afterlife), how can they all be equally true?”*

---

### **IX. The Biggest Difference: Jesus**
Christianity stands alone in the history of religion by affirming:
• **✅ God became human**: The Creator entered His own creation.
• **✅ Jesus died for sins**: Substitutionary atonement, not just a moral example.
• **✅ The Empty Tomb**: A verifiable historical event, not just a spiritual myth.
• **✅ Salvation is a gift**: It is received by faith (Ephesians 2:8–9), not achieved by merit.`,
    tables: [
      {
        title: '1. VIEW OF GOD & ULTIMATE REALITY',
        headers: ['Religion', '📌 Description & 📖 Key Concept'],
        rows: [
          ['Christianity', '📌 One God in three Persons—Father, Son, Holy Spirit (Trinity). God is personal, relational, and eternal.'],
          ['Islam', '📌 Strict monotheism (Tawhid); God (Allah) is one, not triune; no incarnation or "Son of God."'],
          ['Judaism', '📌 One God (YHWH), non-Trinitarian; the personal Creator who entered into covenant with Israel.'],
          ['Hinduism', '📌 Many gods (polytheism) OR One divine reality (Brahman) that is impersonal and all-encompassing.'],
          ['Buddhism', '📌 No personal Creator God; ultimate reality is the cessation of suffering and enlightenment (Nirvana).'],
          ['Sikhism', '📌 One God (Ik Onkar), formless, eternal, and found within all creation.'],
          ['Atheism', '📌 No God or supernatural realm; the material universe is all there is.'],
          ['New Age', '📌 "God" is an impersonal cosmic energy; all humans possess divine potential.']
        ]
      },
      {
        title: '2. FOUNDER & HISTORICAL ORIGIN',
        headers: ['Religion', '👤 Founder', '⏳ Date'],
        rows: [
          ['Christianity', 'Jesus Christ', '30–33 AD'],
          ['Islam', 'Prophet Muhammad', '610 AD'],
          ['Judaism', 'Abraham / Moses', '2000–1400 BC'],
          ['Hinduism', 'No single founder', 'Ancient / Pre-historic'],
          ['Buddhism', 'Siddhartha Gautama', '500 BC'],
          ['Sikhism', 'Guru Nanak', '1500s'],
          ['Atheism', 'Modern philosophical movement', '1700s+'],
          ['New Age', 'Blended movement', '1960s+']
        ]
      },
      {
        title: '3. SACRED TEXTS',
        headers: ['Religion', '📜 Primary Scriptures'],
        rows: [
          ['Christianity', 'The Holy Bible (Old & New Testaments)'],
          ['Islam', 'Qur’an (revealed word) and Hadith (traditions)'],
          ['Judaism', 'Tanakh (Hebrew Bible) and Talmud'],
          ['Hinduism', 'Vedas, Upanishads, Bhagavad Gita'],
          ['Buddhism', 'Tripitaka (Pali Canon), various Sutras'],
          ['Sikhism', 'Guru Granth Sahib'],
          ['Atheism', 'No sacred text (relies on scientific reason)'],
          ['New Age', 'Channelings, metaphysical texts, "A Course in Miracles"']
        ]
      },
      {
        title: '4. THE "JESUS QUESTION": WHO IS HE?',
        headers: ['Religion', '📌 View of Jesus'],
        rows: [
          ['Christianity', 'God the Son, Savior, and King of Kings.'],
          ['Islam', 'A highly respected Prophet; not divine, and not crucified.'],
          ['Judaism', 'A historical teacher; traditional view rejects Him as Messiah.'],
          ['Hinduism', 'An Avatar or "Enlightened Master" among many.'],
          ['Buddhism', 'An enlightened teacher or Bodhisattva.'],
          ['Sikhism', 'A holy teacher or saint, but not the unique Son of God.'],
          ['Atheism', 'A historical figure or influential moral philosopher.'],
          ['New Age', 'An "Ascended Master" who realized His own divinity.']
        ]
      },
      {
        title: '5. SALVATION & AFTERLIFE',
        headers: ['Religion', '💡 How Salvation is Achieved', '🌅 View of Afterlife'],
        rows: [
          ['Christianity', 'By grace through faith in Jesus Christ.', 'Heaven/New Earth or Hell.'],
          ['Islam', 'Good deeds outweighing bad + Allah’s mercy.', 'Paradise (Jannah) or Hell.'],
          ['Judaism', 'Repentance, obedience to Torah, and good works.', 'Varied (Olam Ha-Ba, Sheol).'],
          ['Hinduism', 'Karma, devotion, and knowledge to end rebirth.', 'Reincarnation until Moksha.'],
          ['Buddhism', 'Enlightenment via the Eightfold Path.', 'Rebirth until Nirvana.'],
          ['Sikhism', 'Union with God through devotion and service.', 'Rebirth until union.'],
          ['Atheism', 'No salvation needed; life ends at death.', 'No afterlife.'],
          ['New Age', 'Higher consciousness through meditation/evolution.', 'Astral planes or reincarnation.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'comp-1',
        title: 'The Salvation Ladder',
        description: 'A visual contrast between the world’s attempt to reach God and God’s descent to reach us.',
        scripture: 'John 3:16',
        imagePrompt: 'A split-screen illustration. Left side: people struggling to climb a giant stone ladder to a distant light. Right side: A brilliant beam of light descending from heaven into a dark valley where people are being lifted up. Epic lighting, cinematic.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'comp-2',
        title: 'The World Assembly',
        description: 'The major symbols of world faiths gathered, with the Cross at the center of the historical timeline.',
        scripture: 'Acts 17:26-27',
        imagePrompt: 'Stylized ancient map with symbols of various religions (Crescent, Star of David, Dharma Wheel, Om). At the center is a glowing radiant Cross. Warm parchment texture, historical aesthetic.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_15;
