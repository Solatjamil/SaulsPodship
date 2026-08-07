import { TheologyCategory } from '../../types.js';

const category_28: TheologyCategory = {
  id: '28',
  title: 'Non-Canonical Books & Canon Differences',
  subtitle: 'The Standard of Truth: Why Books Were Included or Rejected',
  overview: 'A comprehensive study on the formation of the biblical canon, why some books were excluded, and how various Christian traditions differ in their Old Testament collections. Last updated on November 22, 2025 (Asia/Karachi Timezone)',
  content: {
    analysis: `### **I. What Is a Biblical Canon?**
The word canon (*kanōn*) means "measuring rod" or "standard." In Christianity, it refers to the official list of books recognized as divinely inspired and authoritative for faith and practice.

**Key Criteria Used by the Early Church:**
• **Apostolic Origin**: Was it written by an apostle or a close companion (e.g., Mark, Luke)?
• **Orthodox Teaching**: Does it align with the established "rule of faith" passed down from the apostles?
• **Universal Acceptance**: Was it widely used and recognized by churches across the Roman Empire?
• **Liturgical Usage**: Was it read publicly in worship gatherings alongside the Old Testament?
• **Spirit’s Witness**: Did the corporate body of believers consistently experience God's voice through these texts over centuries?

---

### **III. New Testament Canon Unity**
Unlike the Old Testament, all major Christian traditions (Catholic, Protestant, Orthodox) accept the exact same **27 books** of the New Testament. The only notable exception is the **Ethiopian Orthodox Church**, which includes additional writings such as *1 Enoch*, *Jubilees*, and the *Meqabyan*.

---

### **VII. Why These Books Are Not Canonical**
Scholars and early church fathers rejected hundreds of "gospels" and "acts" for several definitive reasons:
1. **Late Composition**: Most "Gnostic gospels" were written in the 2nd or 3rd century AD, long after the eyewitnesses had died.
2. **Theological Errors**: Many rejected books contradict fundamental doctrines like the Incarnation, the physical Resurrection, or the goodness of creation.
3. **Pseudonymity**: Many books falsely claim the names of famous apostles (e.g., Thomas, Mary, Peter) to gain unearned authority.
4. **Lack of Liturgical Pedigree**: They were never part of the worship life of the mainstream historical church.`,
    tables: [
      {
        title: 'II. OLD TESTAMENT CANON DIFFERENCES',
        headers: ['Tradition', 'Total Books', 'Includes Apocrypha?', 'Notes'],
        rows: [
          ['Jewish (Tanakh)', '24', '❌ No', 'Same content as Protestant OT, different arrangement.'],
          ['Protestant', '39', '❌ No', 'Follows the Jewish (Hebrew) canon; excludes the Deuterocanon.'],
          ['Catholic', '46', '✅ Yes', 'Includes 7 Deuterocanonical books from the Septuagint.'],
          ['Eastern Orthodox', '49–51', '✅ Yes', 'Includes 3 Maccabees, Psalm 151, and the Prayer of Manasseh.']
        ]
      },
      {
        title: 'IV. THE 7 CATHOLIC DEUTEROCANONICAL BOOKS (READ LINKS)',
        headers: ['Book', 'Thematic Description', 'Verified Source'],
        rows: [
          ['Tobit', 'Narrative of Tobias and the angel Raphael.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=Tobit+1&version=NRSVCE)'],
          ['Judith', 'The heroic account of a Jewish widow saving her people.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=Judith+1&version=NRSVCE)'],
          ['Wisdom of Solomon', 'A philosophical treatise on Jewish wisdom and righteousness.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=Wisdom+1&version=NRSVCE)'],
          ['Sirach', 'A large collection of moral and practical wisdom.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=Sirach+1&version=NRSVCE)'],
          ['Baruch', 'Prophetic-style writing attributed to Jeremiah\'s companion.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=Baruch+1&version=NRSVCE)'],
          ['1 Maccabees', 'Historical account of the Jewish revolt against the Greeks.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=1+Maccabees+1&version=NRSVCE)'],
          ['2 Maccabees', 'Parallel history focusing on theology and martyrdom.', '[Read on BibleGateway](https://www.biblegateway.com/passage/?search=2+Maccabees+1&version=NRSVCE)']
        ]
      },
      {
        title: 'VI. MASTER LIST OF NON-CANONICAL BOOKS (READ LINKS)',
        headers: ['Title', 'Category', 'Issue / Reason for Rejection', 'Manuscript Source'],
        rows: [
          ['Book of Enoch (1 Enoch)', 'OT Pseudepigrapha', 'Not by Enoch; excessive angelic mythology.', '[Read on Sacred-Texts](https://www.sacred-texts.com/bib/boe/)'],
          ['2 Enoch (Secrets of Enoch)', 'OT Pseudepigrapha', 'Late writing with mystical/visionary focus.', '[Read on Sacred-Texts](https://www.sacred-texts.com/bib/apo/index.htm)'],
          ['3 Enoch (Hebrew Enoch)', 'OT Mystical', 'Rabbinic mysticism; not ancient.', '[Read on Sacred-Texts](https://sacred-texts.com/jud/etp/index.htm)'],
          ['Jubilees', 'OT Pseudepigrapha', 'Attempts to add laws not found in the Torah.', '[Read on Sacred-Texts](https://www.sacred-texts.com/bib/jub/index.htm)'],
          ['Book of Jasher', 'Fabricated', 'Medieval forgeries claiming ancient authority.', '[Read on Sacred-Texts](https://www.sacred-texts.com/chr/apo/jasher/)'],
          ['Gospel of Thomas', 'Gnostic Gospel', 'Heretical; denies the physical resurrection.', '[Read on Gnosis.org](http://www.gnosis.org/naghamm/gosthom.html)'],
          ['Gospel of Judas', 'Gnostic Gospel', 'Claims Judas was the hero with secret knowledge.', '[Read on Gnosis.org](http://www.gnosis.org/naghamm/gosthom.html)'],
          ['Gospel of Mary', 'Gnostic', 'Focuses on Gnostic cosmology and female rivalry.', '[Read on Gnosis.org](http://www.gnosis.org/naghamm/gospel_mary.html)'],
          ['Gospel of Peter', 'NT Apocrypha', 'Docetic heresy: "Jesus did not actually suffer."', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/gospelpeter.html)'],
          ['Infancy Gospel of Thomas', 'NT Apocrypha', 'Depicts a child Jesus performing cruel miracles.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/infancythomas.html)'],
          ['Protoevangelium of James', 'NT Apocrypha', 'Pious fiction about the childhood of Mary.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/infancyjames.html)'],
          ['Acts of Paul and Thecla', 'NT Apocrypha', 'Legend promoting radical asceticism.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/actstbecla.html)'],
          ['Shepherd of Hermas', 'Early Christian', 'Valued for moral teaching but not apostolic.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/shepherd.html)'],
          ['Didache', 'Manual', 'Church manual; never claimed to be Scripture.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/didache.html)'],
          ['Letter of Barnabas', 'Apostolic Father', 'Highly allegorical; debated authorship.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/barnabas.html)'],
          ['Epistle of Clement', 'Apostolic Father', 'Valuable historical record of early Roman church.', '[Read on EarlyChristianWritings](http://www.earlychristianwritings.com/1clement.html)']
        ]
      },
      {
        title: 'VIII. PRIMARY MANUSCRIPT ARCHIVES (DIGITAL VIEW)',
        headers: ['Archive Name', 'Description', 'Direct Link to Digital Scan'],
        rows: [
          ['Codex Sinaiticus', 'The oldest complete New Testament (4th Century).', '[View Online Archive](https://codexsinaiticus.org/en/manuscript.aspx)'],
          ['Codex Vaticanus', 'One of the most important Greek codices in the Vatican Library.', '[View Digital Library](https://digi.vatlib.it/view/MSS_Vat.gr.1209)'],
          ['Dead Sea Scrolls', 'The oldest existing Old Testament manuscripts (250 BC).', '[View Israel Museum Archive](https://www.deadseascrolls.org.il/explore-the-archive)'],
          ['CSNTM Database', 'A massive database of thousands of Greek NT manuscripts.', '[Explore CSNTM Database](https://www.csntm.org/manuscript)'],
          ['Vatican Library Digital', 'The Holy See\'s project to scan ancient manuscripts.', '[Explore Vatican Library](https://digi.vatlib.it/)']
        ]
      }
    ],
    storyPanels: [
      {
        id: 'can-1',
        title: 'The Council of Carthage',
        description: 'Bishops meeting in North Africa to formally recognize the 27 books of the New Testament.',
        scripture: '2 Timothy 3:16',
        imagePrompt: 'A gathering of early church fathers in a stone basilica, stacks of papyrus scrolls on a table, one man holding up a scroll to the light, serious and scholarly atmosphere.',
        colorTheme: '#1D2D50',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'can-2',
        title: 'The Gnostic Cave',
        description: 'A representation of the secret, "hidden" writings that claimed secret knowledge apart from the apostles.',
        scripture: '2 Peter 1:16',
        imagePrompt: 'A dark cave with a single candle illuminating a jar containing ancient scrolls, shadows on the wall, sense of secrecy and mystery, dramatic lighting.',
        colorTheme: '#8B1E3F',
        // Fix: Added missing era
        era: 'Church'
      },
      {
        id: 'can-3',
        title: 'The Scribe’s Devotion',
        description: 'A monk painstakingly copying canonical texts, ensuring the preservation of the inspired Word.',
        scripture: 'Isaiah 40:8',
        imagePrompt: 'A medieval monk in a scriptorium, warm sunlight through a narrow window, ink and quill, high detail on the parchment and calligraphy, peaceful and holy atmosphere.',
        colorTheme: '#D4AF37',
        // Fix: Added missing era
        era: 'Church'
      }
    ]
  }
};export default category_28;
