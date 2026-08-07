
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export type SupportedLang = 'English' | 'Hindi' | 'Urdu';

// Metadata for Sidebars and Header Overviews
export const VOLUME_TRANSLATIONS: Record<string, Record<string, { title: string; overview: string }>> = {
  "01": {
    Hindi: { title: "1-वर्षीय धर्मोपदेश मार्गदर्शिका", overview: "जेन-जेड के लिए 52 विषयों पर आधारित मार्गदर्शिका।" },
    Urdu: { title: "1 سالہ خطبہ گائیڈ", overview: "جنریشن زیڈ کے لیے 52 موضوعات پر مبنی گائیڈ۔" }
  },
  "02": {
    Hindi: { title: "बाइबिल की सभी कहानियाँ", overview: "उत्पत्ति से लेकर प्रकाशितवाक्य तक उद्धार की एकीकृत कहानी।" },
    Urdu: { title: "بائبل کی تمام کہانیاں", overview: "پیدائش سے مکاشفہ تک نجات کی متحدہ کہانی۔" }
  },
  "03": {
    Hindi: { title: "बाइबिल अंक ज्योतिष", overview: "पवित्र शास्त्र में संख्याओं के अर्थ और पैटर्न का पुस्तकालय।" },
    Urdu: { title: "بائبل کی عددی علامتیں", overview: "مقدس صحیفوں میں اعداد کے معنی اور پیٹرن کی لائبریری۔" }
  },
  "04": {
    Hindi: { title: "सभी संप्रदाय और अंतर", overview: "वैश्विक ईसाई परिवार के इतिहास और सैद्धांतिक भेदों की खोज।" },
    Urdu: { title: "تمام فرقے اور اختلافات", overview: "عالمی مسیحی خاندان کی تاریخ اور عقائد کے فرق کی تلاش۔" }
  },
  "05": {
    Hindi: { title: "स्वर्गदूत और राक्षस", overview: "अलौकिक पदानुक्रम और शास्त्रों में वर्णित भविष्यसूचक जीव।" },
    Urdu: { title: "فرشتے اور شیاطین", overview: "مافوق الفطرت درجہ بندی اور صحیفوں میں بیان کردہ نبوی مخلوق۔" }
  },
  "06": {
    Hindi: { title: "बपतिस्मा और संस्कार", overview: "पुराने और नए नियम में वाचा के संकेत और पहचान के निशान।" },
    Urdu: { title: "بپتسمہ اور رسومات", overview: "پرانے اور نئے عہد نامے میں عہد کے نشانات۔" }
  },
  "08": {
    Hindi: { title: "वाचा का संदूक और अवशेष", overview: "पवित्र वस्तुएं: वाचा का संदूक और मसीह के अवशेष।" },
    Urdu: { title: "عہد کا صندوق اور تبرکات", overview: "مقدس اشیاء: عہد کا صندوق اور مسیح کے تبرکات۔" }
  },
  "10": {
    Hindi: { title: "यीशु ही परमेश्वर है", overview: "मसीह की दिव्यता का एक व्यापक बाइबिल प्रमाण।" },
    Urdu: { title: "یسوع ہی خدا ہے", overview: "مسیح کی الوہیت کا ایک جامع بائبل ثبوت۔" }
  },
  "21": {
    Hindi: { title: "पवित्र कम्युनियन", overview: "प्रभु का भोज: एक धार्मिक और ऐतिहासिक अन्वेषण।" },
    Urdu: { title: "عشائے ربانی", overview: "خداوند کا کھانا: ایک الٰہیاتی اور تاریخی مطالعہ۔" }
  }
};

// Structural Dictionary for Tables, Analysis Headers, and UI Labels
export const CONTENT_DICTIONARY: Record<string, Record<string, string>> = {
  // Volume UI
  "THEOPHILUS": { Hindi: "थियोफिलस", Urdu: "تھیوفیلس" },
  "MANUSCRIPT INDEX": { Hindi: "पांडुलिपि सूचकांक", Urdu: "مخطوطہ انڈیکس" },
  "Search Archive...": { Hindi: "आर्काइव खोजें...", Urdu: "آرکائیو تلاش کریں..." },
  "Archive Search": { Hindi: "आर्काइव खोज", Urdu: "آرکائیو تلاش" },
  "Volume": { Hindi: "वॉल्यूम", Urdu: "والیوم" },
  "Historical Sequence": { Hindi: "ऐतिहासिक क्रम", Urdu: "تاریخی تسلسل" },
  "Academic Analysis": { Hindi: "शैक्षणिक विश्लेषण", Urdu: "علمی تجزیہ" },

  // Specific Table Content (From screenshots)
  "VIEWPOINT": { Hindi: "दृष्टिकोण", Urdu: "نقطہ نظر" },
  "MEANING &": { Hindi: "अर्थ और", Urdu: "معنی اور" },
  "SCRIPTURE": { Hindi: "शास्त्र", Urdu: "صحیفہ" },
  "THEOLOGICAL THEME": { Hindi: "धार्मिक विषय", Urdu: "الٰہیاتی تھیم" },
  "I. VIEWS OF COMMUNION ACROSS DENOMINATIONS": { Hindi: "I. विभिन्न संप्रदायों में कम्युनियन के विचार", Urdu: "I. مختلف فرقوں میں عشائے ربانی کے نظریات" },
  "Transubstantiation": { Hindi: "ट्रांसबस्टेंशिएशन", Urdu: "تبدیلی جوہر" },
  "Sacramental Union": { Hindi: "संस्कार संघ", Urdu: "اتحادِ بپتسمہ" },
  "Spiritual Presence": { Hindi: "आध्यात्मिक उपस्थिति", Urdu: "روحانی موجودگی" },
  "Memorial View": { Hindi: "स्मारक दृश्य", Urdu: "یادگاری نظریہ" },
  "The bread and wine literally become Christ’s body and blood. (Catholic/Orthodox Tradition).": { 
    Hindi: "रोटी और दाखमधु सचमुच मसीह का शरीर और रक्त बन जाते हैं। (कैथोलिक/रूढ़िवादी परंपरा)।", 
    Urdu: "روٹی اور مے لفظی طور پر مسیح کا بدن اور خون بن جاتے ہیں۔ (کیتھولک/آرتھوڈوکس روایت)۔" 
  },
  "Christ is \"in, with, and under\" the elements. (Lutheran Tradition).": {
    Hindi: "मसीह तत्वों के \"में, साथ और नीचे\" है। (लूथरन परंपरा)।",
    Urdu: "مسیح عناصر کے \"اندر، ساتھ اور نیچے\" موجود ہے۔ (لوتھرن روایت)۔"
  },
  "Christ is spiritually present to nourish the faith of the believer. (Reformed Tradition).": {
    Hindi: "मसीह आस्तिक के विश्वास को पोषण देने के लिए आध्यात्मिक रूप से उपस्थित है। (सुधारित परंपरा)।",
    Urdu: "مسیح مومن کے ایمان کی پرورش کے لیے روحانی طور پر موجود ہے۔ (ریفارمڈ روایت)۔"
  },
  "Symbolic remembrance only; \"Do this in remembrance of Me.\" (Baptist/Pentecostal Tradition).": {
    Hindi: "केवल प्रतीकात्मक स्मरण; \"मेरी याद में ऐसा करो।\" (बैपटिस्ट/पेंटाकोस्टल परंपरा)।",
    Urdu: "صرف علامتی یادگار؛ \"میری یاد میں یہ کیا کرو۔\" (بپٹسٹ/پینٹی کوسٹل روایت)۔"
  },
  
  // Logic markers
  "Summary": { Hindi: "सारांश", Urdu: "خلاصہ" },
  "Theme": { Hindi: "विषय", Urdu: "موضوع" },
  "Read Full Story": { Hindi: "पूरी कहानी पढ़ें", Urdu: "مکمل کہانی پڑھیں" }
};

/**
 * Standard text translator
 */
export const t = (text: string, lang: string): string => {
  if (lang === 'English' || !text) return text;
  
  const cleanText = text.trim();
  if (CONTENT_DICTIONARY[cleanText] && CONTENT_DICTIONARY[cleanText][lang]) {
    return CONTENT_DICTIONARY[cleanText][lang];
  }

  // Handle nested fragments
  let output = text;
  for (const [key, map] of Object.entries(CONTENT_DICTIONARY)) {
    if (text.includes(key) && map[lang]) {
      output = output.split(key).join(map[lang]);
    }
  }
  return output;
};

/**
 * Compiles a full localized "Shadow Page" for a category
 */
export const deepTranslateObject = (obj: any, lang: string): any => {
  if (lang === 'English' || !obj) return obj;

  if (typeof obj === 'string') {
    // Leave Scripture references and Links untranslated for technical stability
    if (obj.startsWith('http') || /^[A-Z][a-z]+\s\d+:\d+$/.test(obj)) return obj;
    return t(obj, lang);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepTranslateObject(item, lang));
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      // Logic: Skip translating technical property keys, only values
      const technicalKeys = ['id', 'color', 'x', 'y', 'imagePrompt', 'backgroundPrompt', 'colorTheme', 'era'];
      if (technicalKeys.includes(key)) {
        newObj[key] = obj[key];
      } else {
        newObj[key] = deepTranslateObject(obj[key], lang);
      }
    }
    return newObj;
  }

  return obj;
};

/**
 * The high-level factory that retrieves the localized "Background Page"
 */
export const translateCategoryLocally = (category: any, lang: string) => {
  if (lang === 'English') return category;
  
  // Clone to avoid mutating original data
  const pageClone = JSON.parse(JSON.stringify(category));
  
  // Apply Volume Metadata
  const meta = VOLUME_TRANSLATIONS[pageClone.id];
  if (meta && meta[lang]) {
    pageClone.title = meta[lang].title;
    pageClone.overview = meta[lang].overview;
  }

  // Compile full localized content (Shadow Page generation)
  return deepTranslateObject(pageClone, lang);
};
