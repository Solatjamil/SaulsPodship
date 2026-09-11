import { TheologyCategory } from '../../types.js';

const category_29: TheologyCategory = {
  id: '29',
  title: 'Not Biblical Quotes or Sayings',
  subtitle: 'Discernment: Truth vs. Spiritual-Sounding Lies',
  overview: 'A collection of famous quotes and sayings often attributed to the Bible, alongside a master list of external books mentioned by name within the Holy Scriptures. Last updated on November 27, 2025.',
  content: {
    analysis: `### **I. Why This Category Exists**
Many people—including Christians—frequently repeat "quotes" that sound wise or kind, often introducing them with: *"You know, the Bible says..."* However, many of these are not in Scripture. Furthermore, the Bible itself often points to external "Books" that are not part of the 66-book canon. This volume helps believers discern between "cultural wisdom" and the revealed Word, while also providing a map to the "Lost Books" cited by the prophets and apostles.

---

### **II. The Anatomy of a Misquote**
Misquotes usually fall into three categories:
1. **🟡 Half-Truths**: Quotes that reflect a biblical concept but are worded in a way that shifts the focus (e.g., "Money is the root of all evil").
2. **🔴 Dangerous Theology**: Sayings that contradict the Gospel by promoting self-salvation (e.g., "God helps those who help themselves").
3. **⚪ Neutral Proverbs**: General wise sayings that have no biblical origin (e.g., "This too shall pass").

---

### **III. The "Lost Books" of the Bible**
Did you know the Bible explicitly mentions over 20 books that are not included in the modern Bible? These are "Lost Books" or external historical records that the biblical authors used as references. While these books are not considered divinely inspired "Scripture," their mention in the Bible is an **authentic reference** to their historical existence.

**Key Examples:**
• **The Book of Jashar**: Mentioned during the sun standing still and for the bow-song of David.
• **The Book of the Wars of the LORD**: An ancient collection of victory songs.
• **The Acts of Solomon**: A detailed historical record of Solomon's reign.`,
    tables: [
      {
        title: 'I. POPULAR MISQUOTES & CORRECTIONS',
        headers: ['❌ The Saying', '⚠️ The Problem', '✅ Biblical Correction & 📖 Scripture'],
        rows: [
          [
            '“God helps those who help themselves.”',
            'Implies God only saves the strong and self-sufficient.',
            '✅ God helps the broken and the helpless who cry out to Him.\n📖 Romans 5:6 — "Christ died for the ungodly."'
          ],
          [
            '“Money is the root of all evil.”',
            'Blames the tool (money) rather than the heart.',
            '✅ It is the *love* of money that causes the issue.\n📖 1 Timothy 6:10'
          ],
          [
            '“God will never give you more than you can handle.”',
            'Often used to minimize suffering; makes the weak feel like failures.',
            '✅ God often allows us to be overwhelmed so we depend on His strength.\n📖 2 Corinthians 1:8–9'
          ],
          [
            '“Follow your heart.”',
            'Suggests the human heart is a perfect guide.',
            '✅ The heart is deceitful; we must follow God’s Spirit.\n📖 Jeremiah 17:9 / Proverbs 3:5–6'
          ]
        ]
      },
      {
        title: 'II. EXTERNAL BOOKS MENTIONED IN THE BIBLE (Lost or Non-Canonical)',
        headers: ['📖 Book Title Mentioned', '📍 Authentic Biblical Reference', '📝 Description in Context'],
        rows: [
          ['The Book of the Wars of the LORD', 'Numbers 21:14', 'An ancient collection of poems or songs describing Israel’s victories.'],
          ['The Book of Jashar', 'Joshua 10:13; 2 Samuel 1:18', 'Literally "The Book of the Upright." Contains the account of the Sun standing still.'],
          ['The Acts of Solomon', '1 Kings 11:41', 'A biographical record of King Solomon’s deeds and wisdom.'],
          ['The Annals of the Kings of Israel', '1 Kings 14:19', 'A state record of the northern kingdom, cited 18 times in Kings.'],
          ['The Annals of the Kings of Judah', '1 Kings 14:29', 'The official court records for the Davidic line in Jerusalem.'],
          ['The Book of Samuel the Seer', '1 Chronicles 29:29', 'A primary source for the life of King David.'],
          ['The Book of Nathan the Prophet', '1 Chronicles 29:29; 2 Chron 9:29', 'Historical records from David and Solomon’s court prophet.'],
          ['The Book of Gad the Seer', '1 Chronicles 29:29', 'Written by Gad, David’s companion during his flight from Saul.'],
          ['The Prophecy of Ahijah', '2 Chronicles 9:29', 'A record of the Shilonite prophet regarding the division of the kingdom.'],
          ['The Visions of Iddo the Seer', '2 Chronicles 9:29; 12:15; 13:22', 'Prophetic visions concerning Jeroboam and Abijah.'],
          ['The Annals of Shemaiah the Prophet', '2 Chronicles 12:15', 'A source detailing the reign of Rehoboam.'],
          ['The Book of the Kings of Israel and Judah', '2 Chronicles 27:7; 35:27', 'A likely source for the canonical Books of Chronicles.'],
          ['The Sayings of the Seers', '2 Chronicles 33:19', 'Records of the prophets who spoke to King Manasseh.'],
          ['The Book of Enoch', 'Jude 1:14–15', 'Jude quotes explicitly from this ancient Jewish writing (1 Enoch 1:9).'],
          ['The Assumption of Moses', 'Jude 1:9', 'Alluded to by Jude regarding the dispute over Moses’ body.'],
          ['Epistle to the Laodiceans', 'Colossians 4:16', 'A letter from Paul mentioned to be read in the church at Colossae.'],
          ['The Earlier Letter to the Corinthians', '1 Corinthians 5:9', 'Paul refers to a "previous letter" he wrote before 1 Corinthians.']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'disc-1',
        title: 'The Sifting of Silver',
        description: 'A visual metaphor for discernment: sifting through cultural sayings to find the pure silver of God’s Word.',
        scripture: 'Psalm 12:6',
        imagePrompt: 'Hands holding an ancient sieve over a dark table, shimmering silver grains falling through while gray dust is caught above, soft focused light, cinematic macro shot.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'disc-2',
        title: 'The Deceitful Compass',
        description: 'A hiker looking at a compass that is spinning wildly, representing the "Follow your heart" philosophy.',
        scripture: 'Jeremiah 17:9',
        imagePrompt: 'A first-person view of hands holding a brass compass in a misty, dark forest; the needle is blurred and spinning, sense of disorientation, moody lighting.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_29;
