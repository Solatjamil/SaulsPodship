import { TheologyCategory } from '../../types.js';

const category_08: TheologyCategory = {
  id: '11',
  title: 'Biblical Maps',
  subtitle: 'A Visual Atlas of Sacred History',
  overview: 'A complete atlas of the biblical world with historical notes, verse references, geography, and archaeology. Last updated on November 28, 2025.',
  backgroundPrompt: 'Antique cartography, weathered parchment map with ink drawings of ancient cities, compass rose, nautical lines, sepia and gold tones.',
  content: {
    // Fix: Escaped backticks inside the template literal to prevent the compiler from interpreting them as the end of the string followed by arithmetic division
    analysis: `### **The Geography of Redemption**
The Bible is grounded in real geography. From the mountain peaks of Sinai to the bustling ports of the Mediterranean, the physical landscape shaped the narrative of God's people.

---

### **Patriarchal Journeys**
The patriarchal narratives in Genesis (chapters 12–50) are not placeless myths; they follow highly specific ancient Near Eastern trade routes.
• **Ur of the Chaldees**: Located in southern Mesopotamia, Abraham’s departure from this highly developed urban center represents a radical break from pagan lunar-deity worship.
• **The Fertile Crescent Route**: Traveling northwest along the Euphrates to Haran, then south into Canaan, Abraham followed well-established nomadic pathways.
• **Canaanite High Places**: The altars built at Shechem, Bethel, and Hebron marked specific geographic points as covenantally belonging to Yahweh.

---

### **The Exodus Route & Wilderness Wandering**
The Exodus represents the ultimate geographical transition—from the fertile Nile Delta (Goshen) to the arid Sinai Peninsula, and finally across the Jordan River.
• **The Red Sea Crossing**: While the exact site remains a subject of debate (ranging from the Bitter Lakes to the Gulf of Aqaba), the event represents a physical crossing from Egypt’s sovereign jurisdiction into the wild desert of freedom.
• **Sinai Covenant Site**: Mount Sinai functions as a cosmic axis where heaven and earth met, transforming a crowd of former slaves into a covenantal nation.
• **Kadesh Barnea**: This oasis served as the primary staging area where Israel spent 38 of their 40 years of wandering due to unbelief.

---

### **The Divided Kingdom Geography**
Following the death of Solomon, Israel split into two distinct geopolitical entities, a division heavily influenced by natural topography.
• **Northern Kingdom (Israel)**: Geographically larger, covering Samaria and Galilee. It held fertile plains but lacked a central spiritual sanctuary, leading to the establishment of rival altars at Dan and Bethel.
• **Southern Kingdom (Judah)**: Smaller, mountainous, and geographically isolated. Judah's strength lay in its possession of Jerusalem—the mountain fortress containing the Temple and the Davidic throne.

---

### **Jesus's Ministry Geography**
The Gospels place Jesus's earthly life within a highly charged geographical, socio-political grid under Roman occupation.
• **Galilee of the Gentiles**: A fertile, multicultural region populated by working-class fishermen and farmers. Most of Jesus’s ministry, parables, and miracles took place here, far from the religious elite of Judea.
• **The Jordan River Rift**: The lowest place on Earth, where Jesus was baptized by John, symbolizing a descent into the waters of death and a resurrection to new ministry.
• **The Ascent to Jerusalem**: Traveling from Galilee through Samaria or Perea, the physical climb up to Jerusalem (at ~750m elevation) mirrored the theological climax of the Cross.`,
    maps: [
      {
        title: "Ancient Near East (Cradle of Civilization)",
        url: "/images/map_ancient_near_east_1781113209213.png",
        description: "Overview of the ancient fertile crescent spanning Anatolia, Mesopotamia, Babylonia, Assyria, Persia, and Egypt.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "Abraham's Journeys of Faith",
        url: "/images/map_abraham_journey_1781113113027.png",
        description: "The historic route of Abraham leaving Ur of the Chaldees, traveling to Haran, of Mesopotamia, into the land of Canaan, and down to Egypt.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Exodus from Egypt to the Promised Land",
        url: "/images/map_exodus_egypt_1781113135812.png",
        description: "Tracing the proposed path of the Hebrew people departing from Rameses, crossing the Red Sea, surviving the Sinai Wilderness, and entering Canaan.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Twelve Tribes of Israel division",
        url: "/images/map_twelve_tribes_1781113307554.png",
        description: "The allotment of Canaan's territories to the tribal descendants of Jacob, following the conquest led by Joshua.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Divided Kingdoms: Israel & Judah",
        url: "/images/map_divided_kingdom_1781113187486.png",
        description: "The historical division of the Hebrew nation into the northern kingdom (Israel, 10 tribes governed from Samaria) and the southern kingdom (Judah, based in Jerusalem).",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Holy Land in the Time of Jesus",
        url: "/images/map_jesus_holyland_1781113164934.png",
        description: "A detailed geographical atlas of Judea, Samaria, and Galilee under Rome's governance during the ministry of Savior Christ.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Roman Empire in Jesus' Time",
        url: "/images/map_roman_empire_1781113263505.png",
        description: "The vast Mediterranean expanse under Roman imperial order, mapping key provinces from Gallia and Hispania to Judea and Aegyptus.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "St. Paul's Missionary Journeys",
        url: "/images/map_paul_journeys_1781113238369.png",
        description: "The historic global apostolic expansion charting Saint Paul's travels throughout Cyprus, Asia Minor, Greece, and eventually Rome.",
        source: "Theophilus Cartography Division"
      },
      {
        title: "The Seven Churches of Revelation",
        url: "/images/map_seven_churches_1781113285827.png",
        description: "Mapping the seven specific Christian assemblies of Asia Minor (Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, Laodicea) addressed in the prophetic vision.",
        source: "Theophilus Cartography Division"
      }
    ],
    interactiveMapPoints: [
      {
        id: 'jerusalem',
        x: 56.5,
        y: 45.5,
        label: 'Jerusalem',
        era: 'First Century',
        description: 'The center of the biblical world. The location of the Temple, the Crucifixion, and the Birth of the Church.',
        scripture: 'Psalm 122:3'
      },
      {
        id: 'rome',
        x: 28.1,
        y: 20.2,
        label: 'Rome',
        era: 'Apostolic Era',
        description: 'The capital of the Empire where Paul and Peter eventually gave their lives for the Gospel.',
        scripture: 'Acts 28:30'
      }
    ],
    storyPanels: [
      {
        id: 'map-p1',
        era: 'Church',
        title: 'The Road to Damascus',
        description: 'A transformative journey that turned a persecutor into an apostle.',
        scripture: 'Acts 9:3',
        imagePrompt: 'A dusty ancient road under a blinding midday sun, a man falling to his knees as a beam of light strikes from heaven, cinematic lighting.',
        colorTheme: '#8B1E3F'
      }
    ],
    tables: [
      {
        title: 'I. KEY CITIES IN PAUL\'S JOURNEYS',
        headers: ['City', 'Event', 'Scripture'],
        rows: [
          ['Antioch', 'Launch point of missions', 'Acts 13:1–3'],
          ['Ephesus', 'Riot of silversmiths', 'Acts 19:23–41'],
          ['Rome', 'Preaching under arrest', 'Acts 28:30–31']
        ]
      }
    ]
  }
};export default category_08;
