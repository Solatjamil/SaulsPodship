/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ZaboorItem {
  number: number;
  title: string;
  englishTheme: string;
  raga: string;
  url: string;
}

const specialSlugs: Record<number, { title: string; slug: string; raga: string; englishTheme: string }> = {
  1: { title: "Dhan Hai Oh Manukh", slug: "zaboor-1", raga: "Bhairavi", englishTheme: "Blessed is the man" },
  2: { title: "Lok Kahde Lai Pande Dand", slug: "zaboor-2-lok-kahde-lai-pande-dand", raga: "Yaman", englishTheme: "Why do the nations rage" },
  3: { title: "Oh Kide Wadhe Aye Khuda", slug: "zaboor-3-oh-kide-wadhe-aye-khuda", raga: "Kafi", englishTheme: "Lord, how many are my foes" },
  4: { title: "Zadon Tenu Pukaran Mein", slug: "zaboor-4-zadon-tenu-pukaran-mein", raga: "Pahadi", englishTheme: "Answer me when I call" },
  5: { title: "Jo Mere Munh Dian Gallan", slug: "zaboor-5-jo-mere-munh-dian-gallan", raga: "Bilawal", englishTheme: "Give ear to my words, O Lord" },
  6: { title: "Gusse Hoke Na Jhirak Mainun", slug: "zaboor-6-gusse-hoke-na-jhirak-mainun", raga: "Bhairav", englishTheme: "O Lord, do not rebuke me in anger" },
  7: { title: "Mera Bhrosa Tere Hi Utte Hai", slug: "zaboor-7-mera-bhrosa-tere-hi-utte-hai", raga: "Khamaj", englishTheme: "O Lord my God, in you do I take refuge" },
  8: { title: "Sabb Dharti De Utte Vi", slug: "zaboor-8-sabb-dharti-de-utte-vi", raga: "Des", englishTheme: "O Lord, how majestic is your name" },
  9: { title: "Daiam Yehova Ya Rabb", slug: "zaboor-9-daiam-yehova-ya-rabb", raga: "Yaman Kalyan", englishTheme: "I will give thanks to the Lord with my whole heart" },
  11: { title: "Aas Meri Rabb De Utte Hai", slug: "zaboor-11-aas-meri-rabb-de-utte-hai", raga: "Pahadi", englishTheme: "In the Lord I take refuge" },
  12: { title: "De Mukti Sanu Rabb Hamare", slug: "zaboor-12-de-mukti-sanu-rabb-hamare", raga: "Kafi", englishTheme: "Save, O Lord, for the godly one is gone" },
  13: { title: "Kad Tikar Mainun Ai Khuda", slug: "zaboor-13-kad-tikar-mainun-ai-khuda", raga: "Bhairavi", englishTheme: "How long, O Lord? Will you forget me forever?" },
  14: { title: "Ahmaq Kahdna Hai Dil Wich", slug: "zaboor-14-ahmaq-kahdna-hai-dil-wich", raga: "Bilawal", englishTheme: "The fool says in his heart, There is no God" },
  15: { title: "Kaun Salamat Rahega Tere Ghar", slug: "zaboor-15-kaun-salamat-rahega-tere-ghar", raga: "Khamaj", englishTheme: "O Lord, who shall sojourn in your tent" },
  16: { title: "Aye Khudawand Mere Tuen Kar Rakhwali", slug: "zaboor-16-aye-khudawand-mere-tuen-kar-rakhwali", raga: "Yaman", englishTheme: "Preserve me, O God, for in you I take refuge" },
  17: { title: "Rakh Dhiyan Faryad Te Meri", slug: "zaboor-17-rakh-dhiyan-faryad-te-meri", raga: "Pahadi", englishTheme: "Hear a just cause, O Lord; attend to my cry" },
  18: { title: "Ai Khudawand Zor Tun Mera", slug: "zaboor-18-ai-khudawand-zor-tun-mera", raga: "Des", englishTheme: "I love you, O Lord, my strength" },
  19: { title: "Lok Kahde Lai Pande Dand", slug: "zaboor-19-lok-kahde-lai-pande-dand", raga: "Bhairav", englishTheme: "The heavens declare the glory of God" },
  20: { title: "Dukhan De Wele Teri", slug: "zaboor-20-dukhan-de-wele-teri", raga: "Kafi", englishTheme: "May the Lord answer you in the day of trouble" },
  21: { title: "Tere Zor Thin Khudaya", slug: "zaboor-21-tere-zor-thin-khudaya", raga: "Bilawal", englishTheme: "O Lord, in your strength the king rejoices" },
  22: { title: "Aye Khudawand Aye Rabb Mere", slug: "zaboor-22-aye-khudawand-aye-rabb-mere", raga: "Bhairavi", englishTheme: "My God, my God, why have you forsaken me" },
  23: { title: "Rab Mera Hai Chowanwala", slug: "zaboor-23-rabb-ayali-mere-kol", raga: "Bhairavi / Pahadi", englishTheme: "The Lord is my shepherd; I shall not want" },
  24: { title: "Zameen Te Jo Kujh Ohde Vich", slug: "zaboor-24-rabb-khdawand-badshah-hai", raga: "Bilawal", englishTheme: "The earth is the Lord's and the fullness thereof" },
  25: { title: "Aas Tere Uttey Rakhda Mein", slug: "zaboor-25-aas-tere-uttey-rakhda-mein", raga: "Khamaj", englishTheme: "To you, O Lord, I lift up my soul" },
  26: { title: "Nina Kar Mera Aye Khuda", slug: "zaboor-26-nina-kar-mera-aye-khuda", raga: "Yaman", englishTheme: "Vindicate me, O Lord, for I have walked in my integrity" },
  27: { title: "Hai Dar Mainun Kis Da", slug: "zaboor-27-hai-dar-mainun-kis-da", raga: "Pahadi", englishTheme: "The Lord is my light and my salvation" },
  28: { title: "Hai Dar Mainun Kis Da (Part 2)", slug: "zaboor-28-hai-dar-mainun-kis-da", raga: "Des", englishTheme: "To you, O Lord, I call; my rock, be not deaf" },
  29: { title: "Zor Waleo Zahir Karo", slug: "zaboor-29-zor-waleo-zahir-karo", raga: "Bhairav", englishTheme: "Ascribe to the Lord, O heavenly beings" },
  30: { title: "Karanga Teri Wadyai Khudaya", slug: "zaboor-30-karanga-teri-wadyai-khudaya", raga: "Kafi", englishTheme: "I will extol you, O Lord, for you have drawn me up" },
  31: { title: "Meri Aas Hai Teri Uttey", slug: "zaboor-31-meri-aas-hai-teri-uttey", raga: "Bilawal", englishTheme: "In you, O Lord, do I take refuge" },
  32: { title: "Oh Dhan Jis De Bakhshe", slug: "zaboor-32-oh-dhan-jis-de-bakhshe", raga: "Bhairavi", englishTheme: "Blessed is the one whose transgression is forgiven" },
  34: { title: "Main Har Vele Rab Di Tareef Karanga", slug: "zaboor-34", raga: "Khamaj", englishTheme: "I will bless the Lord at all times" },
  35: { title: "Jo Jhagra Karde Mere Nal", slug: "zaboor-35-jo-jhagra-karde-mere-nal", raga: "Yaman", englishTheme: "Contend, O Lord, with those who contend with me" },
  36: { title: "Mera Dil Soch Karda Hai", slug: "zaboor-36-mera-dil-soch-karda-hai", raga: "Pahadi", englishTheme: "Transgression speaks to the wicked deep in his heart" },
  37: { title: "Dukh Burean Lokan De Na Kariye", slug: "zaboor-37-dukh-burean-lokan-de-na-kariye", raga: "Des", englishTheme: "Fret not yourself because of evildoers" },
  38: { title: "Ghuse Nal Na Jhirkin Mainun", slug: "zaboor-38-ghuse-nal-na-jhirkin-mainun-ai-khuda", raga: "Bhairav", englishTheme: "O Lord, rebuke me not in your anger" },
  39: { title: "Rakhi Rah Di Mein Apni Karanga", slug: "zaboor-39-rakhi-rah-di-mein-apni-karanga", raga: "Kafi", englishTheme: "I said, I will guard my ways" },
  40: { title: "Hai Kasrat Nal Khudawanda", slug: "zaboor-40-hai-kasrat-nal-khudawanda", raga: "Bilawal", englishTheme: "I waited patiently for the Lord" },
  41: { title: "Mubarik Hai Jo Fikr Ajiz Di Kakhe", slug: "zaboor-41-mubarik-hai-jo-fikr-ajiz-di-kakhe", raga: "Bhairavi", englishTheme: "Blessed is the one who considers the poor!" },
  42: { title: "Digdi Dhaindi Hai Te Bechain Hai", slug: "zaboor-42-digdi-dhaindi-hai-te-bechain-hai", raga: "Pahadi", englishTheme: "As a deer pants for flowing streams" },
  43: { title: "Kar Adalat Meri Khudawanda", slug: "zaboor-43-kar-adalat-meri-khudawanda", raga: "Yaman", englishTheme: "Vindicate me, O God, and defend my cause" },
  44: { title: "Asan Sabho Suniya Hai", slug: "zaboor-44-asan-sabho-suniya-hai-sade-khudaya", raga: "Des", englishTheme: "O God, we have heard with our ears" },
  45: { title: "Sunn Aiye Beti Tun Aye Soch Lai", slug: "zaboor-45-sunn-aiye-beti-tun-aye-soch-lai", raga: "Khamaj", englishTheme: "My heart overflows with a pleasing theme" },
  46: { title: "Rabb Sada Zor Hai Te Panah", slug: "zaboor-46-rabb-sada-zor-hai-te-nale-sadi-hai-panah", raga: "Bhairav", englishTheme: "God is our refuge and strength" },
  47: { title: "Sab Loko Mahnge Maro Hun", slug: "zaboor-47-sab-loko-mahnge-maro-hun", raga: "Bilawal", englishTheme: "Clap your hands, all peoples!" },
  48: { title: "Asade Rabb De Shahr Wich", slug: "zaboor-48-asade-rabb-de-shahr-wich", raga: "Kafi", englishTheme: "Great is the Lord and greatly to be praised" },
  49: { title: "Sune Dhar Kan Adna Ala", slug: "zaboor-49-sune-dhar-kan-adna-ala", raga: "Pahadi", englishTheme: "Hear this, all peoples; give ear, all inhabitants of the world" },
  50: { title: "Khudwand Khdratwale Ne", slug: "zaboor-50-khudwand-khdratwale-ne-oh-gal-farmai-hai", raga: "Yaman", englishTheme: "The Mighty One, God the Lord, speaks" },
  51: { title: "Fazal Nal Aye Rabb Bakhsh", slug: "zaboor-51-fazal-nal-aye-rabb-bakhsh", raga: "Bhairavi", englishTheme: "Have mercy on me, O God, according to your steadfast love" },
  52: { title: "Karke Buriai Tun Kyun Phulda Hain", slug: "zaboor-52-karke-buriai-tun-kyun-phulda-hain", raga: "Des", englishTheme: "Why do you boast of evil, O mighty man?" },
  53: { title: "Eh Ji Wich Kiha Ahmaq Ne", slug: "zaboor-53-eh-ji-wich-kiha-ahmaq-ne", raga: "Bilawal", englishTheme: "The fool says in his heart, There is no God" },
  54: { title: "Rabba Apne Nan De Waste", slug: "zaboor-54-rabba-apne-nan-de-waste", raga: "Khamaj", englishTheme: "O God, save me by your name" },
  55: { title: "Tun Mere Wall Kan Dharke Sunn", slug: "zaboor-55-tun-mere-wall-kan-dharke-sunn", raga: "Bhairav", englishTheme: "Give ear to my prayer, O God" },
  56: { title: "Khudawanda Tun Rahm Farma", slug: "zaboor-56-khudawanda-tun-rahm-farma", raga: "Kafi", englishTheme: "Be gracious to me, O God, for man tramples on me" },
  57: { title: "Mere Utte Kar Rahm", slug: "zaboor-57-mere-utte-kar-rahm-mere-khudaya", raga: "Pahadi", englishTheme: "Be merciful to me, O God, be merciful to me" },
  58: { title: "Kyun Sach De Wele Manukh", slug: "zaboor-58-kyun-sach-de-wele-manukh", raga: "Yaman", englishTheme: "Do you indeed decree what is right, you gods?" },
  59: { title: "Tun Mainun Mere Wairian Thon", slug: "zaboor-59-tun-mainun-mere-wairian-thon", raga: "Des", englishTheme: "Deliver me from my enemies, O my God" },
  60: { title: "Sanun Tun Hai Radd Kar Ditta", slug: "zaboor-60-sanun-tun-hai-radd-kar-ditta", raga: "Bhairavi", englishTheme: "O God, you have rejected us, broken our defenses" },
  61: { title: "Dua Meri Tun Sunn Lai Hunn", slug: "zaboor-61-dua-meri-tun-sunn-lai-hunn", raga: "Bilawal", englishTheme: "Hear my cry, O God, listen to my prayer" },
  62: { title: "Khudawand Nun Udikdi Rah", slug: "zaboor-62-khudawand-nun-udikdi-rah", raga: "Khamaj", englishTheme: "For God alone my soul waits in silence" },
  63: { title: "Tarke Main Tainun Dhundhan", slug: "zaboor-63-tarke-main-tainun-dhundhan-ya-rabb", raga: "Pahadi", englishTheme: "O God, you are my God; earnestly I seek you" },
  64: { title: "Jad Taithon Karan Main Faryad", slug: "zaboor-64-jad-taithon-karan-main-faryad", raga: "Bhairav", englishTheme: "Hear my voice, O God, in my complaint" },
  65: { title: "Saihun De Wich Chup Kite Udikde", slug: "zaboor-65-saihun-de-wich-chup-kite-udikde", raga: "Yaman", englishTheme: "Praise is due to you, O God, in Zion" },
  66: { title: "Khudawand De Wall Kull Zamin", slug: "zaboor-66-khudawand-de-wall-kull-zamin-lalkare", raga: "Des", englishTheme: "Shout for joy to God, all the earth" },
  67: { title: "Rabb Asad Sade Utte Apna Rahm", slug: "zaboor-67-rabb-asad-sade-utte-apna-rahm", raga: "Kafi", englishTheme: "May God be gracious to us and bless us" },
  68: { title: "Rabb Utte Ohde Wairi Sab", slug: "zaboor-68-rabb-utte-ohde-wairi-sab", raga: "Bilawal", englishTheme: "God shall arise, his enemies shall be scattered" },
  69: { title: "Meri Jan De Tik Khudawanda", slug: "zaboor-69-meri-jan-de-tik-khudawanda", raga: "Bhairavi", englishTheme: "Save me, O God, for the waters have come up to my neck" },
  70: { title: "Mere Chuddane Nun Ya Rabba", slug: "zaboor-70-mere-chuddane-nun-ya-rabba", raga: "Pahadi", englishTheme: "Make haste, O God, to deliver me!" },
  71: { title: "Mera Bhrosa Tere Utte Hai", slug: "zaboor-71-mera-bhrosa-tere-hi-utte-hai", raga: "Yaman", englishTheme: "In you, O Lord, do I take refuge" },
  72: { title: "Tun Apne Badshan Nun Ya Rabb", slug: "zaboor-72-tun-apne-badshan-nun-ya-rabb", raga: "Khamaj", englishTheme: "Give the king your justice, O God" },
  73: { title: "Jo Israelian De Wich Saf Dil", slug: "zaboor-73-jo-israelian-de-wich-saf-dil", raga: "Bhairav", englishTheme: "Truly God is good to Israel" },
  74: { title: "Tun Asanun Sada Tikar Kyun Radd", slug: "zaboor-74-tun-asanun-sada-tikar-kyun-radd", raga: "Des", englishTheme: "O God, why do you cast us off forever?" },
  75: { title: "Tarif Hun Teri Karde Han", slug: "zaboor-75-tarif-hun-teri-karde-han-te", raga: "Kafi", englishTheme: "We give thanks to you, O God" },
  76: { title: "Rabb Yahudah Wich Mashhur Hai", slug: "zaboor-76-rabb-yahudah-wich-mashhur-hai", raga: "Bilawal", englishTheme: "In Judah God is known; his name is great in Israel" },
  77: { title: "Khudawand De Wall Zor De Nal", slug: "zaboor-77-khudawand-de-wall-zor-de-nal", raga: "Bhairavi", englishTheme: "I cry aloud to God, aloud to God, and he will hear me" },
  78: { title: "Kan Rakh Ai Meri Umaat", slug: "zaboor-78-kan-rakh-ai-meri-umaat", raga: "Pahadi", englishTheme: "Give ear, O my people, to my teaching" },
  79: { title: "Jiun Nind Thon Koi Jage", slug: "zaboor-79-jiun-nind-thon-koi-jage", raga: "Yaman", englishTheme: "O God, the nations have come into your inheritance" },
  80: { title: "Ai Ayali Israil De", slug: "zaboor-80-ai-ayali-israil-de", raga: "Des", englishTheme: "Give ear, O Shepherd of Israel" },
  82: { title: "Jamaat Wich Khuda Di Khalota", slug: "zaboor-82-jamaat-wich-khuda-di-khalota", raga: "Bhairav", englishTheme: "God has taken place in the divine council" },
  83: { title: "Khudaya Mere Chup Na Ho", slug: "zaboor-83-khudaya-mere-chup-na-ho", raga: "Kafi", englishTheme: "O God, do not keep silence" },
  84: { title: "Khdawanda Tun Lashkaran Da", slug: "zaboor-84-khdawanda-tun-lashkaran-da-khuda", raga: "Bilawal", englishTheme: "How lovely is your dwelling place, O Lord of hosts!" },
  85: { title: "Rehmat Teri Es Dharti De Utte", slug: "zaboor-85-rehmat-teri-es-dharti-de-utte", raga: "Bhairavi", englishTheme: "Lord, you were favorable to your land" },
  86: { title: "Khudaya Tun Kan Dharke Sun", slug: "zaboor-86-khudaya-tun-kan-dharke-sun", raga: "Pahadi", englishTheme: "Incline your ear, O Lord, and answer me" },
  87: { title: "Bunyad Tan Ohdi Qaim Hai", slug: "zaboor-87-bunyad-tan-ohdi-qaim-hai", raga: "Yaman", englishTheme: "On the holy mount stands the city he founded" },
  88: { title: "Khudaya Kuyn Jan Meri Mardud", slug: "zaboor-88-khudaya-kuyn-jan-meri-mardud", raga: "Des", englishTheme: "O Lord, God of my salvation, I cry out day and night" },
  89: { title: "Khuda Di Rehmatan De Git", slug: "zaboor-89-khuda-di-rehmatan-de-git-main", raga: "Khamaj", englishTheme: "I will sing of the steadfast love of the Lord forever" },
  90: { title: "Tun Pusht Dar Pusht Khudaya", slug: "zaboor-90-tun-pusht-dar-pusht-khudaya", raga: "Bhairav", englishTheme: "Lord, you have been our dwelling place in all generations" },
  91: { title: "Khuda De Par De Hethan", slug: "zaboor-91-khuda-de-par-de-hethan-jo-koi", raga: "Pahadi", englishTheme: "He who dwells in the shelter of the Most High" },
  92: { title: "Terian Siftan De Gaone Git", slug: "zaboor-92-terian-siftan-de-gaone-git-karna", raga: "Kafi", englishTheme: "It is good to give thanks to the Lord" },
  93: { title: "Khurme De Darkht De Wangar Sadiq", slug: "zaboor-93-khurme-de-darkht-de-wangar-sadiq", raga: "Bilawal", englishTheme: "The Lord reigns; he is robed in majesty" },
  94: { title: "Ai Badla Lainewale Rabb Ai", slug: "zaboor-94-ai-badla-lainewale-rabb-ai", raga: "Bhairavi", englishTheme: "O Lord, God of vengeance, shine forth!" },
  95: { title: "Ao Rabb Di Waddiai Gaiye", slug: "zaboor-95-ao-rabb-di-waddiai-gaiye-dil-de-zor", raga: "Yaman", englishTheme: "Oh come, let us sing to the Lord!" },
  96: { title: "Ao Ik Nawan Rabb Lai Gao", slug: "zaboor-96-ao-ik-nawan-rabb-lai-gao", raga: "Des", englishTheme: "Oh sing to the Lord a new song!" },
  97: { title: "Badhshahi Karda Hai Khuda", slug: "zaboor-97-badhshahi-karda-hai-khuda", raga: "Khamaj", englishTheme: "The Lord reigns, let the earth rejoice" },
  98: { title: "Git Nawan Gao Gao Ik Nawan", slug: "zaboor-98-git-nawan-gao-gao-ik-nawan-gao", raga: "Bhairav", englishTheme: "Oh sing to the Lord a new song, for he has done marvelous things!" },
  99: { title: "Badhshahi Karda Hai Khuda Kul Lok", slug: "zaboor-99-badhshahi-karda-hai-khuda-kul-lok", raga: "Pahadi", englishTheme: "The Lord reigns; let the peoples tremble!" },
  100: { title: "Khushi De Naal Gao Rab Di Janab Vich", slug: "zaboor-100", raga: "Bhairav", englishTheme: "Make a joyful noise to the Lord, all the earth!" },
  121: { title: "Aakhan Chukke Main Dekhan Paharan Wal", slug: "zaboor-121-akkhian-chukna-han-main-wall-paharan", raga: "Pahadi / Des", englishTheme: "I lift up my eyes to the hills" },
  150: { title: "Rab Di Tareef Karo Ohdi Pavitarta Vich", slug: "zaboor-150-haleluya-sana-gao-osdi-haikal", raga: "Kafi / Dadra", englishTheme: "Praise the Lord! Praise God in his sanctuary" }
};

export const getZaboorUrl = (num: number): string => {
  if (specialSlugs[num]) {
    return `https://punjabizaboor1908.com/${specialSlugs[num].slug}/`;
  }
  return `https://punjabizaboor1908.com/zaboor-${num}/`;
};

export const getZaboorTitle = (num: number): string => {
  if (specialSlugs[num]) {
    return specialSlugs[num].title;
  }
  return `Zaboor ${num} (Punjabi Metrical Version)`;
};

export const getZaboorEnglishTheme = (num: number): string => {
  if (specialSlugs[num]) {
    return specialSlugs[num].englishTheme;
  }
  return `Psalm ${num} in Classical Punjabi Bahr`;
};

export const getZaboorRaga = (num: number): string => {
  if (specialSlugs[num]) {
    return specialSlugs[num].raga;
  }
  const ragas = ["Bhairavi", "Yaman", "Pahadi", "Kafi", "Bilawal", "Bhairav", "Khamaj", "Des"];
  return ragas[num % ragas.length];
};
