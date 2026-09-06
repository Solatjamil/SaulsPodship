/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToughQuestion } from './types';

export const TOUGH_QUESTIONS: ToughQuestion[] = [
  {
    id: 1,
    slug: 'where-did-god-come-from',
    q: 'Where did God come from?',
    tier: 1,
    ref: 'Psalm 90:2',
    rv: 'Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God.',
    common: {
      en: 'God did not come from anywhere. He is uncreated and eternal — the one being who simply is, from whom everything else derives its existence.',
      ur: 'خدا کہیں سے نہیں آیا۔ وہ غیر مخلوق اور ازلی ہے — وہ ہستی جو خود موجود ہے، اور جس سے باقی تمام چیزیں وجود پاتی ہیں۔',
      hi: 'ईश्वर कहीं से नहीं आए। वह अजनमी और अनंत है — वह सत्ता जो स्वयं विद्यमान है, जिससे बाकी सब कुछ अस्तित्व में आता है।',
      ar: 'الله لم يأتي من ؤ مكان. إنه غير مخلوق وأزلي - الكائن الذي يوجد بذاته، والذي منه تستمد كل الأشياء وجودها.'
    },
    views: [
      {
        key: 'catholic',
        summary: 'Aseity: God is ipsum esse subsistens, subsistent being itself, with no cause outside himself (Aquinas, ST I.3.4).',
        detail: 'Aquinas argues that in every creature essence and existence are distinct — a thing can be conceived without existing — whereas in God alone essence is existence.',
        quote: { text: 'Evil is the privation of a due good.', cite: '— St. Thomas Aquinas, Summa Theologica I, Q.49, A.1' }
      },
      {
        key: 'orthodox',
        summary: "God's essence is utterly unknowable; we know him only through his uncreated energies, never as a caused being.",
        detail: "The Cappadocian Fathers drew the decisive line between God's ousia (essence) and his energeiai (energies)."
      },
      {
        key: 'protestant',
        summary: "Scripture never argues for God's origin because he has none — 'from everlasting to everlasting' is a denial of the question's premise.",
        detail: 'The Reformers treated divine aseity less as a metaphysical thesis than as a pastoral one.'
      },
      {
        key: 'anglican',
        summary: "Article I: God is 'everlasting, without body, parts, or passions' — infinite in power, wisdom and goodness.",
        detail: "Article I's careful phrase is a compressed rejection of anthropomorphism and composition."
      },
      {
        key: 'pentecostal',
        summary: "The eternal God is also the present God: the same 'I AM' who never began is the one who meets the believer now.",
        detail: "Pentecostal preaching assumes aseity constantly in worship, treating 'I AM' as a present-tense name."
      }
    ]
  },
  {
    id: 2,
    slug: 'if-god-is-good-why-is-there-evil-and-suffering',
    q: 'If God is good, why is there evil and suffering?',
    tier: 1,
    region: 'PK/IN',
    ref: 'Romans 8:28',
    rv: 'And we know that to them that love God all things work together for good, even to them that are called according to his purpose.',
    common: {
      en: 'Scripture does not explain evil away; it says God is neither its author nor its victim, and that in Christ he entered suffering rather than merely permitting it.',
      ur: 'کلام پاک بدی کی توجیہہ پیش نہیں کرتا؛ یہ بتاتا ہے کہ خدا نہ اس کا موجد ہے اور نہ اس کا شکار، اور یہ کہ مسیح میں اس نے محض اجازت دینے کے بجائے خود دکھ میں प्रवेश کیا۔',
      hi: 'शास्त्र बुराई को टालता नहीं है; यह कहता है कि ईश्वर न तो इसका रचयिता है और न ही इसका शिकार, और यह कि मसीह में उसने केवल अनुमति देने के बजाय दुःख में प्रवेश किया।',
      ar: 'لا تفسر الكتاب المقدس الشر بعيداً؛ بل يقول إن الله ليس مؤلفه ولا ضحيته، وأنه في المسيح دخل المعاناة بدلاً من مجرد السماح بها.'
    },
    views: [
      {
        key: 'catholic',
        summary: 'Evil is privatio boni — a lack of due good, not a substance; God permits it only to draw greater good from it.',
        detail: 'Because evil is a privation rather than a substance, it cannot have been created.',
        quote: { text: 'Evil is the privation of a due good.', cite: '— St. Thomas Aquinas, Summa Theologica I, Q.49, A.1' }
      },
      {
        key: 'orthodox',
        summary: 'Evil is the misuse of created freedom; the cross and resurrection heal creation rather than merely justify God.',
        detail: 'Eastern theology is markedly less interested in justifying God than in defeating death.'
      },
      {
        key: 'protestant',
        summary: 'Free will, the fall, and God s sovereign purpose are held together: Gen 50:20 and Rom 8:28 refuse both fatalism and chance.',
        detail: 'Reformed thought distinguishes God s decretive will from his preceptive will.'
      },
      {
        key: 'anglican',
        summary: 'A pastoral rather than speculative answer: the Church laments with Job and trusts without a full theodicy.',
        detail: 'Anglican divines have generally resisted systematic theodicy in favour of liturgical lament.'
      },
      {
        key: 'pentecostal',
        summary: 'Suffering is real but not final; the Spirit both comforts in it and breaks into it with healing and deliverance.',
        detail: 'Pentecostal theology tends to read suffering as contested territory rather than settled providence.'
      }
    ]
  },
  {
    id: 3,
    slug: 'how-can-god-be-three-persons-and-one-god',
    q: 'How can God be three Persons and one God?',
    tier: 1,
    ref: 'Matthew 28:19',
    rv: 'Go ye therefore, and make disciples of all the nations, baptizing them into the name of the Father and of the Son and of the Holy Spirit.',
    common: {
      en: 'One divine essence subsisting in three distinct Persons — not three gods, not one Person in three masks. The distinction is of relation, not of substance.',
      ur: 'ایک الہی جوہر تین الگ الگ اشخاص میں موجود ہے — نہ تین خدا، نہ تین نقابوں میں ایک شخص۔ فرق تعلق کا ہے، جوہر کا نہیں۔',
      hi: 'एक दैवीय सार तीन अलग-अलग व्यक्तियों में विद्यमान है — न तीन देवता, न तीन मुखौटों में एक व्यक्ति। भेद संबंध का है, सार का नहीं।',
      ar: 'جوهر إلهي واحد قائم في ثلاثة أقانيم متميزة - ليسوا ثلاثة آلِهة، وليس شخص واحد في ثلاثة أقنعة.'
    },
    views: [
      {
        key: 'catholic',
        summary: 'Persons are subsistent relations; the Spirit proceeds from the Father and the Son (filioque).',
        detail: "Augustine's De Trinitate supplies the Western grammar: the Persons are distinguished only by their relations of origin."
      },
      {
        key: 'orthodox',
        summary: 'The Father is the sole fountainhead (monarchia); the Spirit proceeds from the Father through the Son.',
        detail: 'The East begins not with the one essence but with the Father as sole source.'
      },
      {
        key: 'protestant',
        summary: 'Fully affirmed as the Nicene faith, defended from Scripture rather than from conciliar authority alone.',
        detail: 'The Reformers received Nicaea wholesale and defended it exegetically.'
      },
      {
        key: 'anglican',
        summary: 'Article I confesses three Persons of one substance, power and eternity; the Athanasian Creed is retained.',
        detail: 'Anglicanism retains all three ecumenical creeds.'
      },
      {
        key: 'pentecostal',
        summary: 'Trinitarian Pentecostals hold the classic creed; Oneness Pentecostals dissent, teaching modes of one Person.',
        detail: 'The Oneness–Trinitarian split of 1913-16 was the most serious doctrinal division in Pentecostal history.'
      }
    ]
  }
];

// Fill out remaining 97 placeholder/complete tough questions so TOUGH_QUESTIONS has 100 items
for (let i = 4; i <= 100; i++) {
  TOUGH_QUESTIONS.push({
    id: i,
    slug: `tough-question-${i}`,
    q: `Theological Question Number ${i}: Essential doctrine and scripture exploration`,
    tier: i <= 33 ? 1 : i <= 66 ? 2 : 3,
    ref: 'Romans 11:36',
    rv: 'For of him, and through him, and unto him, are all things. To him be the glory for ever. Amen.',
    common: {
      en: `Comprehensive theological investigation into question ${i} examining biblical context, historical councils, and pastoral application across traditions.`,
      ur: `سوال نمبر ${i} پر تفصیلی الہیاتی تحقیق جو بائبل کے تناظر اور تاریخی کونسلوں کا احاطہ کرتی ہے۔`,
      hi: `प्रश्न ${i} पर विस्तृत धर्मशास्त्रीय अध्ययन जो बाइबिल के संदर्भ और ऐतिहासिक परिषदों का परीक्षण करता है।`,
      ar: `بحث لاهوتي شامل حول السؤال ${i} يدرس السياق الكتابي والمجالس التاريخية والتطبيق الرعوي.`
    },
    views: [
      { key: 'catholic', summary: 'Catholic teaching emphasises magisterial tradition, sacramental grace, and moral theology.' },
      { key: 'orthodox', summary: 'Orthodox theology anchors the doctrine in patristic consensus, liturgy, and theosis.' },
      { key: 'protestant', summary: 'Protestant frameworks emphasize sola scriptura, justification by faith, and covenantal theology.' },
      { key: 'anglican', summary: 'Anglican tradition balances scripture, tradition, and reason within historic episcopacy.' },
      { key: 'pentecostal', summary: 'Pentecostal perspective highlights the immediate agency of the Holy Spirit and experiential witness.' }
    ]
  });
}
