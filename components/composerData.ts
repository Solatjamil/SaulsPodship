export interface CompositionStyle {
  v: string;
  i: string;
  n: string;
  d: string;
}

export interface RhythmPattern {
  id: string;
  nm: string;
  tgs: string[];
  dc: string;
  pt: string;
  ts: string;
  tmp: string;
  g: string;
  r?: string;
  tp: "t_" | "m_" | "g_";
}

export interface ZaboorItem {
  n: number;
  r: string;
  p: string;
  rg: string;
  bpm: number;
  tp: string;
}

export interface GeetItem {
  id: string;
  r: string;
  u: string;
  t: "geet" | "zaboor";
  tp: string;
}

export const STYLES: CompositionStyle[] = [
  { v: 'punjabi', i: '🌿', n: 'Punjabi Masihi', d: 'Dholak & Harmonium — Sialkot spirit' },
  { v: 'raag', i: '🪘', n: 'Desi Raag / Zaboor', d: 'Classical Raag — 1908 Punjabi style' },
  { v: 'soothing', i: '🕊️', n: 'Soothing Beats', d: 'Gentle, meditative — rivers of peace' },
  { v: 'orchestral', i: '👑', n: 'Mighty Orchestral', d: 'Triumphant, majestic — His throne' },
  { v: 'urdu-ghazal', i: '🌙', n: 'Urdu Ghazal Gospel', d: 'Poetic, qawwali — deep Urdu praise' },
  { v: 'contemporary', i: '🎸', n: 'Contemporary Gospel', d: 'Modern worship — Hillsong/Kirk Franklin' },
];

export const WI: [string, string][] = [
  ['Piano', '🎹'], ['Violin', '🎻'], ['Cello', '🎻'], ['Guitar', '🎸'],
  ['Organ', '🎹'], ['Flute', '🎵'], ['Trumpet', '🎺'], ['Harp', '🎵'],
  ['Choir', '🎼'], ['Drums', '🥁'], ['Viola', '🎻'], ['Bass Guitar', '🎸']
];

export const SAI: [string, string][] = [
  ['Harmonium', '🎹'], ['Tabla', '🥁'], ['Dholak', '🥁'], ['Dhol', '🥁'],
  ['Sitar', '🎸'], ['Sarangi', '🎻'], ['Bansuri', '🎵'], ['Chimta', '🎵'],
  ['Duff', '🥁'], ['Rabab', '🎸'], ['Tanpura', '🎸'], ['Shruti Box', '🎵']
];

export const RI: Record<string, { m: string }> = {
  Kafi: { m: 'Sorrowful yet hopeful · longing for God' },
  Bhairavi: { m: 'Deep surrender · morning devotion' },
  Yaman: { m: 'Majestic serenity · evening praise' },
  Pilu: { m: 'Playful joy · folk celebration' },
  Sarang: { m: 'Midday devotion · thanksgiving' },
  Tilang: { m: 'Passionate praise · dedication' },
  Bilawal: { m: 'Pure joy · Easter & Christmas' }
};

export const RMp: Record<string, string> = {
  Kafi: 'Kafi raag',
  Bhairavi: 'Bhairavi raag',
  Yaman: 'Yaman raag',
  Pilu: 'Pilu raag',
  Sarang: 'Sarang raag',
  Tilang: 'Tilang raag',
  Bilawal: 'Bilawal raag'
};

export const RHYTHMS: RhythmPattern[] = [
  {
    id: 'tk', nm: 'Teentaal — Raag Kafi', tgs: ['16-beat Teentaal', '60-80 BPM', 'Desi Raag'],
    dc: "The 16-beat teentaal in Raag Kafi — most beloved raag of Punjabi devotional music. Kafi's flat 3rd and 7th create sorrowful-yet-hopeful quality. The rhythmic heart of the 1908 Punjabi Zaboor tradition.",
    pt: 'DHA DHIN DHIN DHA | DHA DHIN DHIN DHA | NA TIN TIN NA | TA DHIN DHIN DHA',
    ts: '16/16', tmp: 'Andante (66-76 BPM)', g: 'desi-raag-psalm', r: 'Kafi', tp: 't_'
  },
  {
    id: 'be', nm: 'Ektal — Raag Bhairavi', tgs: ['12-beat Ektal', '50-70 BPM', 'Bhairavi Raag'],
    dc: "The 12-beat Ektal in Raag Bhairavi — 'queen of morning raags.' All five swaras komal (flat): deep devotion, surrender, longing. For lamenting Psalms and early morning worship at Sialkot.",
    pt: 'DHA DHIN | DHA DHIN | NA TIN | TA KIT | DHA DHA | TIN NA',
    ts: '12/8', tmp: 'Largo (40-60 BPM)', g: 'desi-raag-psalm', r: 'Bhairavi', tp: 't_'
  },
  {
    id: 'yr', nm: 'Rupak Taal — Raag Yaman', tgs: ['7-beat Rupak', '70-90 BPM', 'Yaman Raag'],
    dc: "The 7-beat Rupak in Raag Yaman — raised 4th (Teevra Ma). Evening raag expressing beauty, majesty, and God's creation. Used for praise Psalms in the 1908 tradition.",
    pt: 'TIN TIN NA | DHA NA | DHA NA',
    ts: '7/8', tmp: 'Andante (66-76 BPM)', g: 'desi-raag-psalm', r: 'Yaman', tp: 't_'
  },
  {
    id: 'pk', nm: 'Kaherva — Raag Pilu', tgs: ['8-beat Kaherva', '80-100 BPM', 'Pilu Raag'],
    dc: '8-beat Kaherva in Raag Pilu — playful folk character mixing Kafi and Khamaj. Ideal for joyful praise songs with natural Punjabi folk feel. Used in many Sialkot Convention geet.',
    pt: 'DHA GE NA TI | NA KE DHA NA',
    ts: '8/8', tmp: 'Moderato (108-120 BPM)', g: 'punjabi-christian', r: 'Pilu', tp: 't_'
  },
  {
    id: 'sd', nm: 'Dadra — Raag Sarang', tgs: ['6-beat Dadra', '75-95 BPM', 'Sarang Raag'],
    dc: 'The 6-beat Dadra in Raag Sarang — bright afternoon raag of devotion and thanksgiving. Natural 7th gives uplifting, resolved feeling ideal for praise Psalms.',
    pt: 'DHA DHA TIN | NA DHA DHA',
    ts: '6/8', tmp: 'Andante (66-76 BPM)', g: 'desi-raag-psalm', r: 'Sarang', tp: 't_'
  },
  {
    id: 'tk2', nm: 'Keherwa — Raag Tilang', tgs: ['8-beat Keherwa', '90-110 BPM', 'Tilang Raag'],
    dc: 'Energetic Keherwa in Raag Tilang — passionate with Hindustani and Carnatic influences. Used for intense praise and dedication songs. Common in Sialkot Convention celebrations.',
    pt: 'DHA GE NA TI | NA KE DHA GE',
    ts: '8/8', tmp: 'Moderato (108-120 BPM)', g: 'south-asian-masihi', r: 'Tilang', tp: 't_'
  },
  {
    id: 'bj', nm: 'Jhaptaal — Raag Bilawal', tgs: ['10-beat Jhaptaal', '70-90 BPM', 'Bilawal Raag'],
    dc: '10-beat Jhaptaal in Raag Bilawal — pure bright raag close to C major. Joyful and celebratory, ideal for Easter, Christmas and Hallelujah Psalms.',
    pt: 'DHA NA | DHA TI NA | TI NA | DHA TI NA',
    ts: '10/8', tmp: 'Moderato (108-120 BPM)', g: 'desi-raag-psalm', r: 'Bilawal', tp: 't_'
  },
  {
    id: 'sd2', nm: 'Sialkot Dholak Geet', tgs: ['4/4 or 6/8', '80-100 BPM', 'Sialkot Masihi'],
    dc: "The iconic rhythmic feel of Sialkot Convention since 1904. Dholak's 'dha-gi-na' pattern, harmonium drone and melody, chimta accents. The sound of thousands praising in Punjab.",
    pt: 'Dholak: DHA gi-NA | DHA gi-NA | Harmonium: ~~~melody~~~ | Chimta: _♩_♩',
    ts: '4/4', tmp: 'Moderato (108-120 BPM)', g: 'sialkot-convention', tp: 'm_'
  },
  {
    id: 'pj', nm: 'Punjabi Masihi Jhumar', tgs: ['8/8', '110-130 BPM', 'Punjabi Folk Gospel'],
    dc: 'Fast celebratory Punjabi folk-gospel. Dhol drives an energetic dance-like feel, chimta clanging, congregation clapping on offbeats. Used for processional hymns and Easter/Christmas celebrations.',
    pt: 'Dhol: DHA DHA KINA DHA | Chimta: _ ♩ _ ♩ | Clap: ♩♩♩♩♩♩',
    ts: '4/4', tmp: 'Allegro (132-168 BPM)', g: 'punjabi-christian', tp: 'm_'
  },
  {
    id: 'qg', nm: 'Gospel Qawwali', tgs: ['4/4 ecstatic', '90-140 BPM', 'Qawwali Gospel'],
    dc: 'Qawwali-style ecstatic Christian praise as heard at Sialkot Convention. Call-and-response, harmonium leading, tabla and dholak building intensity. Builds to climactic shout of praise.',
    pt: 'Lead: solo phrase | Chorus: response xN | Clap: ♩♩♩♩ | Build: ↑↑↑',
    ts: '4/4', tmp: 'Moderato (108-120 BPM)', g: 'qawwali-gospel', tp: 'm_'
  },
  {
    id: 'ug', nm: 'Urdu Gospel Ghazal', tgs: ['Free / 4/4', '55-75 BPM', 'Urdu Christian'],
    dc: 'Classical Urdu devotional ghazal tradition with Christian content. Sarangi or harmonium sustaining long melodic phrases, gentle tabla theka, deep emotive ornamented vocals.',
    pt: 'Harmonium: melodic phrases | Tabla: light theka | Voice: ornamented meend',
    ts: '4/4', tmp: 'Largo (40-60 BPM)', g: 'urdu-christian', tp: 'm_'
  },
  {
    id: 'gs', nm: 'Gospel Shuffle', tgs: ['12/8', '~72 BPM', 'Black Gospel'],
    dc: 'The heartbeat of Black Gospel. Swung triplet groove — organ stabs on 2 & 4, walking bass, lush choir swells. The rhythm that makes congregations rise and shout.',
    pt: 'Bass: ♩ ♩♩ | Clap: _ ♩ _ ♩ | Gospel: ♩♩♩ ♩♩♩',
    ts: '12/8', tmp: 'Andante (66-76 BPM)', g: 'black-gospel', tp: 'g_'
  },
  {
    id: 'ps', nm: 'Pentecostal Stomp & Shout', tgs: ['4/4', '120-140 BPM', 'Pentecostal'],
    dc: 'High-energy foot-stomping shout music. Syncopated piano runs, explosive drum hits, brass stabs. The sound of COGIC and Pentecostal churches in full praise.',
    pt: 'Kick: ♩ _ ♩ ♩ | Snare: _ ♩ _ ♩ | Piano: ♪♪♩ ♪♪♩',
    ts: '4/4', tmp: 'Allegro (132-168 BPM)', g: 'black-gospel', tp: 'g_'
  },
  {
    id: 'hm', nm: 'Traditional Hymn March', tgs: ['4/4', '80-96 BPM', 'Traditional'],
    dc: 'Stately European hymn tradition. Steady quarter-note pulse, four-part SATB harmony, organ or piano. Dignified and reverent — the sound of great hymnals.',
    pt: 'Bass: ♩ ♩ ♩ ♩ | SATB: block chords | Organ: sustained pedal',
    ts: '4/4', tmp: 'Andante (66-76 BPM)', g: 'traditional-gospel', tp: 'g_'
  },
  {
    id: 'wh', nm: 'Hymn Waltz', tgs: ['3/4', '80-100 BPM', 'Southern / Traditional'],
    dc: "The lilting 3/4 feel of Southern Gospel and classics like Amazing Grace. One chord per measure. Gentle and contemplative — old country church Sunday morning.",
    pt: 'Bass: ♩ _ _ | Chord: _ ♩♩ | Melody: ♩. ♩ ♪',
    ts: '3/4', tmp: 'Andante (66-76 BPM)', g: 'southern-gospel', tp: 'g_'
  },
  {
    id: 'cg', nm: 'Contemporary Praise Groove', tgs: ['4/4', '100-125 BPM', 'Modern Worship'],
    dc: 'Upbeat modern church praise — Hillsong/Elevation/Bethel style. Driving eighth-note groove, syncopated guitar, punchy kick, massive chorus dynamics. Builds to overwhelming praise.',
    pt: 'Drums: ♩♪♩_♩♪ | Guitar: chunk_chunk | Bass: syncopated',
    ts: '4/4', tmp: 'Moderato (108-120 BPM)', g: 'worship-praise', tp: 'g_'
  },
  {
    id: 'ag', nm: 'Afro-Gospel Polyrhythm', tgs: ['12/8', '100-120 BPM', 'African Gospel'],
    dc: 'Polyrhythmic West African gospel. Interlocking djembe, shaker, talking drum, call-and-response vocals, rich communal harmony. Deeply celebratory — the whole village praising God.',
    pt: 'Djembe: ♩♩♩ ♩_♩ | Shaker: ♪♪♪♪♪♪ | Call: ♩♩_ ♩',
    ts: '12/8', tmp: 'Moderato (108-120 BPM)', g: 'african-gospel', tp: 'g_'
  }
];

export const ZB: ZaboorItem[] = [
  { n: 1, r: 'Oh Dhan Hai Jo Na Manda Hai', p: 'ਓਹ ਧੰਨ ਹੈ ਜੋ ਨਾ ਮੰਦਾ ਹੈ', rg: 'Bilawal', bpm: 72, tp: 'Blessed Man / Two Paths' },
  { n: 2, r: 'Lok Kahde Lai Pande Dand', p: 'ਲੋਕ ਕਹਿੰਦੇ ਲੈ ਪਾਂਦੇ ਦੰਡ', rg: 'Kafi', bpm: 68, tp: 'Nations Rage / God Reigns' },
  { n: 3, r: 'Oh Kide Wadhe Aye Khuda', p: 'ਓਹ ਕਿੱਦੇ ਵਧੇ ਆਏ ਖੁਦਾ', rg: 'Bhairavi', bpm: 60, tp: 'Morning Cry / Trust in God' },
  { n: 4, r: 'Zadon Tenu Pukaran Mein', p: 'ਜਦੋਂ ਤੈਨੂੰ ਪੁਕਾਰਾਂ ਮੈਂ', rg: 'Pilu', bpm: 65, tp: 'Evening Prayer / Peace' },
  { n: 5, r: 'Jo Mere Munh Dian Gallan', p: 'ਜੋ ਮੇਰੇ ਮੂੰਹ ਦੀਆਂ ਗੱਲਾਂ', rg: 'Bhairavi', bpm: 58, tp: 'Morning Prayer / Guidance' },
  { n: 6, r: 'Gusse Hoke Na Jhirak Mainun', p: 'ਗੁੱਸੇ ਹੋਕੇ ਨਾ ਝਿੜਕ ਮੈਨੂੰ', rg: 'Kafi', bpm: 55, tp: 'Plea for Mercy / Distress' },
  { n: 7, r: 'Mera Bhrosa Tere Hi Utte', p: 'ਮੇਰਾ ਭਰੋਸਾ ਤੇਰੇ ਹੀ ਉੱਤੇ', rg: 'Yaman', bpm: 70, tp: 'Refuge in God / Justice' },
  { n: 8, r: 'Sabb Dharti De Utte Vi', p: 'ਸੱਭ ਧਰਤੀ ਦੇ ਉੱਤੇ ਵੀ', rg: 'Yaman', bpm: 78, tp: 'Majesty of God / Creation' },
  { n: 9, r: 'Daiam Yehova Ya Rabb', p: 'ਦਾਇਮ ਯਹੋਵਾ ਯਾ ਰੱਬ', rg: 'Kafi', bpm: 72, tp: 'Praise / God Judges Nations' },
  { n: 10, r: 'Khudaya Apne Tain', p: 'ਖੁਦਾਇਆ ਆਪਣੇ ਤੈਂ', rg: 'Bhairavi', bpm: 58, tp: 'Why Does God Hide / Justice' },
  { n: 11, r: 'Aas Meri Rabb De Utte Hai', p: 'ਆਸ ਮੇਰੀ ਰੱਬ ਦੇ ਉੱਤੇ ਹੈ', rg: 'Kafi', bpm: 65, tp: 'Trust in God / Refuge' },
  { n: 12, r: 'De Mukti Sanu Rabb Hamare', p: 'ਦੇ ਮੁਕਤੀ ਸਾਨੂੰ ਰੱਬ ਹਮਾਰੇ', rg: 'Bhairavi', bpm: 60, tp: 'Help Against the Wicked' },
  { n: 13, r: 'Kad Tikar Mainun Ai Khuda', p: 'ਕਦ ਤਿੱਕਰ ਮੈਨੂੰ ਆਈ ਖੁਦਾ', rg: 'Kafi', bpm: 62, tp: 'How Long O Lord / Lament' },
  { n: 14, r: 'Ahmaq Kahdna Hai Dil Wich', p: 'ਅਹਮਕ ਕਹਿੰਦਾ ਹੈ ਦਿਲ ਵਿੱਚ', rg: 'Kafi', bpm: 68, tp: 'Fool Says No God / Corruption' },
  { n: 15, r: 'Kaun Salamat Rahega Tere Ghar', p: 'ਕੌਣ ਸਲਾਮਤ ਰਹੇਗਾ ਤੇਰੇ ਘਰ', rg: 'Bilawal', bpm: 72, tp: 'Who May Dwell with God' },
  { n: 16, r: 'Aye Khudawand Mere Rakhwali', p: 'ਆਏ ਖੁਦਾਵੰਦ ਮੇਰੇ ਰਖਵਾਲੀ', rg: 'Bhairavi', bpm: 60, tp: 'Preserve Me O God / Heritage' },
  { n: 17, r: 'Rakh Dhiyan Faryad Te Meri', p: 'ਰੱਖ ਧਿਆਨ ਫਰਿਆਦ ਤੇ ਮੇਰੀ', rg: 'Kafi', bpm: 65, tp: 'Prayer for Protection' },
  { n: 18, r: 'Ai Khudawand Zor Tun Mera', p: 'ਆਈ ਖੁਦਾਵੰਦ ਜ਼ੋਰ ਤੂੰ ਮੇਰਾ', rg: 'Yaman', bpm: 84, tp: 'I Love You Lord / Strength & Victory' },
  { n: 19, r: 'Asman Byan Karde Khuda De Kam', p: 'ਆਸਮਾਨ ਬਿਆਨ ਕਰਦੇ ਖੁਦਾ ਦੇ ਕੰਮ', rg: 'Bilawal', bpm: 76, tp: 'Heavens Declare / Law of God' },
  { n: 20, r: 'Dukhan De Wele Teri', p: 'ਦੁੱਖਾਂ ਦੇ ਵੇਲੇ ਤੇਰੀ', rg: 'Sarang', bpm: 68, tp: 'God Answer in Day of Trouble' },
  { n: 21, r: 'Tere Zor Thin Khudaya', p: 'ਤੇਰੇ ਜ਼ੋਰ ਥੀਂ ਖੁਦਾਇਆ', rg: 'Yaman', bpm: 80, tp: 'The King Rejoices in God' },
  { n: 22, r: 'Yaad Yehova Di Sab Karange', p: 'ਯਾਦ ਯਹੋਵਾ ਦੀ ਸੱਭ ਕਰਨਗੇ', rg: 'Kafi', bpm: 58, tp: 'My God Why Forsaken / Cross Psalm' },
  { n: 23, r: 'Rabb Ayali Mere Kol', p: 'ਰੱਬ ਅਯਾਲੀ ਮੇਰੇ ਕੋਲ', rg: 'Bhairavi', bpm: 62, tp: 'The Lord Is My Shepherd' },
  { n: 24, r: 'Rabb Khudawand Badshah Hai', p: 'ਰੱਬ ਖੁਦਾਵੰਦ ਬਾਦਸ਼ਾਹ ਹੈ', rg: 'Yaman', bpm: 88, tp: "The Earth Is the Lord's / King of Glory" },
  { n: 25, r: 'Aas Tere Uttey Rakhda Mein', p: 'ਆਸ ਤੇਰੇ ਉੱਤੇ ਰੱਖਦਾ ਮੈਂ', rg: 'Kafi', bpm: 64, tp: 'To You I Lift My Soul / Trust' },
  { n: 26, r: 'Nian Kar Mera Aye Khuda', p: 'ਨਿਆਂ ਕਰ ਮੇਰਾ ਆਏ ਖੁਦਾ', rg: 'Bilawal', bpm: 70, tp: 'Vindicate Me O Lord' },
  { n: 27, r: 'Hai Dar Mainun Kis Da', p: 'ਹੈ ਡਰ ਮੈਨੂੰ ਕਿਸ ਦਾ', rg: 'Yaman', bpm: 80, tp: 'Lord Is My Light / Whom Shall I Fear' },
  { n: 28, r: 'Mangnan Taithon Mein Dua', p: 'ਮੰਗਣਾਂ ਤੈਥੋਂ ਮੈਂ ਦੁਆ', rg: 'Kafi', bpm: 62, tp: 'To You I Call / Hear My Supplication' },
  { n: 29, r: 'Zor Waleo Zahir Karo', p: 'ਜ਼ੋਰ ਵਾਲਿਓ ਜ਼ਾਹਰ ਕਰੋ', rg: 'Bilawal', bpm: 92, tp: 'Ascribe to the Lord / Voice of Thunder' },
  { n: 30, r: 'Karanga Teri Wadyai Khudaya', p: 'ਕਰਾਂਗਾ ਤੇਰੀ ਵਡਿਆਈ ਖੁਦਾਇਆ', rg: 'Tilang', bpm: 84, tp: 'I Will Extol You / Mourning to Dancing' },
  { n: 31, r: 'Meri Aas Hai Teri Uttey', p: 'ਮੇਰੀ ਆਸ ਹੈ ਤੇਰੇ ਉੱਤੇ', rg: 'Kafi', bpm: 65, tp: 'In You I Take Refuge' },
  { n: 32, r: 'Oh Dhan Jis De Bukhshe Gaye', p: 'ਓਹ ਧੰਨ ਜਿਸ ਦੇ ਬਖਸ਼ੇ ਗਏ', rg: 'Pilu', bpm: 72, tp: 'Blessed Is He Forgiven / Confession' },
  { n: 33, r: 'Tusi Ai Sadiqo', p: 'ਤੁਸੀ ਆਈ ਸਦੀਕੋ', rg: 'Bilawal', bpm: 84, tp: 'Shout for Joy / Word of Lord' },
  { n: 34, r: 'Mein Har Wele Rabb Nun Mubarak', p: 'ਮੈਂ ਹਰ ਵੇਲੇ ਰੱਬ ਨੂੰ ਮੁਬਾਰਕ', rg: 'Pilu', bpm: 76, tp: 'I Will Bless the Lord Always' },
  { n: 35, r: 'Jo Jhagra Karde Mere Nal', p: 'ਜੋ ਝਗੜਾ ਕਰਦੇ ਮੇਰੇ ਨਾਲ', rg: 'Kafi', bpm: 68, tp: 'Contend O Lord / Vindication' },
  { n: 36, r: 'Mera Dil Soch Karda Hai', p: 'ਮੇਰਾ ਦਿਲ ਸੋਚ ਕਰਦਾ ਹੈ', rg: 'Bhairavi', bpm: 60, tp: 'Transgression / Lovingkindness of God' },
  { n: 37, r: 'Dukh Burean Lokan De Na Kariye', p: 'ਦੁੱਖ ਬੁਰਿਆਂ ਲੋਕਾਂ ਦੇ ਨਾ ਕਰੀਏ', rg: 'Yaman', bpm: 75, tp: 'Do Not Fret / Trust and Do Good' },
  { n: 38, r: 'Ghuse Nal Na Jhirkin Mainun', p: 'ਗੁੱਸੇ ਨਾਲ ਨਾ ਝਿੜਕੀਂ ਮੈਨੂੰ', rg: 'Kafi', bpm: 58, tp: 'Rebuke Me Not in Wrath / Confession' },
  { n: 39, r: 'Rakhi Rah Di Mein Apni Karanga', p: 'ਰੱਖੀ ਰਾਹ ਦੀ ਮੈਂ ਆਪਣੀ ਕਰਾਂਗਾ', rg: 'Bhairavi', bpm: 60, tp: "Guard My Ways / Life's Brevity" },
  { n: 40, r: 'Hai Kasrat Nal Khudawanda', p: 'ਹੈ ਕਸਰਤ ਨਾਲ ਖੁਦਾਵੰਦਾ', rg: 'Tilang', bpm: 72, tp: 'I Waited Patiently / New Song' },
  { n: 41, r: 'Mubarik Hai Jo Fikr Ajiz Di', p: 'ਮੁਬਾਰਕ ਹੈ ਜੋ ਫ਼ਿਕਰ ਅਜ਼ੀਜ਼ ਦੀ', rg: 'Pilu', bpm: 68, tp: 'Blessed Is He Who Considers the Poor' },
  { n: 42, r: 'Digdi Dhaindi Hai Te Bechain', p: 'ਡਿੱਗਦੀ ਢਾਈਂਦੀ ਹੈ ਤੇ ਬੇਚੈਨ', rg: 'Kafi', bpm: 60, tp: 'As Deer Pants / Longing for God' },
  { n: 43, r: 'Kar Adalat Meri Khudawanda', p: 'ਕਰ ਅਦਾਲਤ ਮੇਰੀ ਖੁਦਾਵੰਦਾ', rg: 'Bhairavi', bpm: 62, tp: 'Vindicate Me / Send Your Light' },
  { n: 44, r: 'Asan Sabho Suniya Hai Sade Khudaya', p: 'ਅਸਾਂ ਸੱਭੋ ਸੁਣਿਆ ਹੈ ਸਾਡੇ ਖੁਦਾਇਆ', rg: 'Kafi', bpm: 65, tp: 'We Have Heard / National Lament' },
  { n: 45, r: 'Sunn Aiye Beti Tun Aye Soch', p: 'ਸੁਣ ਆਈਏ ਬੇਟੀ ਤੂੰ ਆਏ ਸੋਚ', rg: 'Sarang', bpm: 72, tp: 'Royal Wedding Song / Messiah' },
  { n: 46, r: 'Rabb Sada Zor Hai Te Sadi Panah', p: 'ਰੱਬ ਸਾਡਾ ਜ਼ੋਰ ਹੈ ਤੇ ਸਾਡੀ ਪਨਾਹ', rg: 'Yaman', bpm: 80, tp: 'God Is Our Refuge / Be Still' },
  { n: 47, r: 'Sab Loko Mahnge Maro Hun', p: 'ਸੱਭ ਲੋਕੋ ਮਹਿੰਗੇ ਮਾਰੋ ਹੁਣ', rg: 'Bilawal', bpm: 96, tp: 'Clap Your Hands / God Reigns' },
  { n: 48, r: 'Asade Rabb De Shahr Wich', p: 'ਅਸਾਡੇ ਰੱਬ ਦੇ ਸ਼ਹਿਰ ਵਿੱਚ', rg: 'Bilawal', bpm: 80, tp: 'Great Is the Lord / Zion' },
  { n: 49, r: 'Sune Dhar Kan Adna Ala', p: 'ਸੁਣੇ ਧਰ ਕੰਨ ਅਦਨਾ ਅਲਾ', rg: 'Bhairavi', bpm: 62, tp: 'Hear This All Peoples / Riches Fade' },
  { n: 50, r: 'Khudawand Khdratwale Ne Oh Gal', p: 'ਖੁਦਾਵੰڈ ਕਾਦਰਤਵਾਲੇ ਨੇ ਓਹ ਗੱਲ', rg: 'Yaman', bpm: 75, tp: 'The Mighty One Speaks / True Worship' },
  { n: 51, r: 'Fazal Nal Aye Rabb Bakhsh', p: 'ਫਜ਼ਲ ਨਾਲ ਆਏ ਰੱਬ ਬਖਸ਼', rg: 'Kafi', bpm: 58, tp: 'Have Mercy on Me / Create Clean Heart' },
  { n: 52, r: 'Karke Buriai Tun Kyun Phulda', p: 'ਕਰਕੇ ਬੁਰਿਆਈ ਤੂੰ ਕਿਉਂ ਫੁੱਲਦਾ', rg: 'Bhairavi', bpm: 60, tp: 'Why Boast of Evil / Trust in God' },
  { n: 53, r: 'Eh Ji Wich Kiha Ahmaq Ne', p: 'ਏਹ ਜੀ ਵਿੱਚ ਕਿਹਾ ਅਹਮਕ ਨੇ', rg: 'Kafi', bpm: 65, tp: 'Fool Says No God' },
  { n: 54, r: 'Rabba Apne Nan De Waste', p: 'ਰੱਬਾ ਆਪਣੇ ਨਾਂ ਦੇ ਵਾਸਤੇ', rg: 'Pilu', bpm: 68, tp: 'Save Me O God by Your Name' },
  { n: 55, r: 'Tun Mere Wall Kan Dharke Sunn', p: 'ਤੂੰ ਮੇਰੇ ਵੱਲ ਕੰਨ ਧਰਕੇ ਸੁਣ', rg: 'Kafi', bpm: 62, tp: 'Listen to My Prayer / Betrayal' },
  { n: 56, r: 'Khudawanda Tun Rahm Farma', p: 'ਖੁਦਾਵੰਦਾ ਤੂੰ ਰਹਿਮ ਫਰਮਾ', rg: 'Bhairavi', bpm: 60, tp: 'Be Gracious to Me O God / Trust' },
  { n: 57, r: 'Mere Utte Kar Rahm Mere Khudaya', p: 'ਮੇਰੇ ਉੱਤੇ ਕਰ ਰਹਿਮ ਮੇਰੇ ਖੁਦਾਇਆ', rg: 'Kafi', bpm: 65, tp: 'Be Merciful O God / Heart Fixed' },
  { n: 58, r: 'Kyun Sach De Wele Manukh', p: 'ਕਿਉਂ ਸੱਚ ਦੇ ਵੇਲੇ ਮਾਨੁੱਖ', rg: 'Bhairavi', bpm: 62, tp: 'Do You Rulers Speak Justly' },
  { n: 59, r: 'Tun Mainun Mere Wairian Thon', p: 'ਤੂੰ ਮੈਨੂੰ ਮੇਰੇ ਵੈਰੀਆਂ ਥੋਂ', rg: 'Yaman', bpm: 76, tp: 'Deliver Me from My Enemies' },
  { n: 60, r: 'Sanun Tun Hai Radd Kar Ditta', p: 'ਸਾਨੂੰ ਤੂੰ ਹੈ ਰੱਦ ਕਰ ਦਿੱਤਾ', rg: 'Kafi', bpm: 62, tp: 'You Have Rejected Us / Lament' },
  { n: 61, r: 'Dua Meri Tun Sunn Lai Hunn', p: 'ਦੁਆ ਮੇਰੀ ਤੂੰ ਸੁਣ ਲੈ ਹੁਣ', rg: 'Bhairavi', bpm: 60, tp: 'Hear My Cry / Lead Me to the Rock' },
  { n: 62, r: 'Khudawand Nun Udikdi Rah', p: 'ਖੁਦਾਵੰਦ ਨੂੰ ਉਡੀਕਦੀ ਰਹਿ', rg: 'Kafi', bpm: 60, tp: 'My Soul Waits for God Alone' },
  { n: 63, r: 'Tarke Main Tainun Dhundhan Ya Rabb', p: 'ਤੜਕੇ ਮੈਂ ਤੈਨੂੰ ਢੁੰਢਾਂ ਯਾ ਰੱਬ', rg: 'Bhairavi', bpm: 58, tp: 'You Are My God / Early Morning Thirsting' },
  { n: 64, r: 'Jad Taithon Karan Main Faryad', p: 'ਜਦ ਤੈਥੋਂ ਕਾਰਾਂ ਮੈਂ ਫਰਿਆਦ', rg: 'Kafi', bpm: 64, tp: 'Hear My Voice O God / Hidden Attack' },
  { n: 65, r: 'Saihun De Wich Chup Kite Udikde', p: 'ਸਾਈਹੁਨ ਦੇ ਵਿੱਚ ਚੁੱਪ ਕੀਤੇ ਉਡੀਕਦੇ', rg: 'Sarang', bpm: 76, tp: "Praise Awaits You / God's Bounty" },
  { n: 66, r: 'Khudawand De Wall Kull Zamin', p: 'ਖੁਦਾਵੰਦ ਦੇ ਵੱਲ ਕੁੱਲ ਜ਼ਮੀਨ', rg: 'Yaman', bpm: 88, tp: 'Shout for Joy to God All Earth' },
  { n: 67, r: 'Rabb Asad Sade Utte Apna Rahm', p: 'ਰੱਬ ਅਸਾਡ ਸਾਡੇ ਉੱਤੇ ਆਪਣਾ ਰਹਿਮ', rg: 'Pilu', bpm: 76, tp: 'God Be Gracious / All Nations Praise' },
  { n: 68, r: 'Rabb Utte Ohde Wairi Sab', p: 'ਰੱਬ ਉੱਠੇ ਓਹਦੇ ਵੈਰੀ ਸੱਭ', rg: 'Bilawal', bpm: 92, tp: 'Let God Arise / Triumphal Procession' },
  { n: 69, r: 'Meri Jan De Tik Khudawanda', p: 'ਮੇری ਜਾਨ ਦੇ ਟਿੱਕ ਖੁਦਾਵੰਦਾ', rg: 'Kafi', bpm: 62, tp: 'Save Me O God / Deep Waters' },
  { n: 70, r: 'Mere Chuddane Nun Ya Rabba', p: 'ਮੇਰੇ ਛੁਡਾਣੇ ਨੂੰ ਯਾ ਰੱਬਾ', rg: 'Bhairavi', bpm: 60, tp: 'Hasten O God to Deliver Me' },
  { n: 71, r: 'Mera Bhrosa Tere Hi Utte Hai', p: 'ਮੇਰਾ ਭਰੋਸਾ ਤੇਰੇ ਹੀ ਉੱਤੇ ਹੈ', rg: 'Kafi', bpm: 65, tp: 'In You I Take Refuge / Old Age' },
  { n: 72, r: 'Tun Apne Badshan Nun Ya Rabb', p: 'ਤੂੰ ਆਪਣੇ ਬਾਦਸ਼ਾਹ ਨੂੰ ਯਾ ਰੱਬ', rg: 'Yaman', bpm: 80, tp: 'Prayer for the King / Messianic' },
  { n: 73, r: 'Jo Israelian De Wich Saf Dil', p: 'ਜੋ ਇਸਰਾਈਲੀਆਂ ਦੇ ਵਿੱਚ ਸਾਫ਼ ਦਿਲ', rg: 'Bhairavi', bpm: 62, tp: 'God Is Good to Israel / Why Wicked Prosper' },
  { n: 74, r: 'Tun Asanun Sada Tikar Kyun Radd', p: 'ਤੂੰ ਅਸਾਨੂੰ ਸਦਾ ਤਿੱਕਰ ਕਿਉਂ ਰੱਦ', rg: 'Kafi', bpm: 60, tp: 'O God Why Have You Rejected Us' },
  { n: 75, r: 'Tarif Hun Teri Karde Han', p: 'ਤਾਰੀਫ਼ ਹੁਣ ਤੇਰੀ ਕਰਦੇ ਹਾਂ', rg: 'Yaman', bpm: 80, tp: 'We Give Thanks / God Judges' },
  { n: 76, r: 'Rabb Yahudah Wich Mashhur Hai', p: 'ਰੱਬ ਯਹੂਦਾਹ ਵਿੱਚ ਮਸ਼ਹੂਰ ਹੈ', rg: 'Bilawal', bpm: 84, tp: 'God Known in Judah / Glorious' },
  { n: 77, r: 'Khudawand De Wall Zor De Nal', p: 'ਖੁਦਾਵੰਦ ਦੇ ਵੱਲ ਜ਼ੋਰ ਦੇ ਨਾਲ', rg: 'Kafi', bpm: 65, tp: 'I Cried Out to God / Remembering Wonders' },
  { n: 78, r: 'Kan Rakh Ai Meri Umaat', p: 'ਕੰਨ ਰੱਖ ਆਈ ਮੇਰੀ ਉੱਮਤ', rg: 'Bhairavi', bpm: 62, tp: 'Give Ear O People / History of Israel' },
  { n: 79, r: 'Jiun Nind Thon Koi Jage', p: 'ਜਿਉਂ ਨੀਂਦ ਥੋਂ ਕੋਈ ਜਾਗੇ', rg: 'Kafi', bpm: 62, tp: 'O God Nations Have Invaded / Lament' },
  { n: 80, r: 'Ai Ayali Israil De', p: 'ਆਈ ਅਯਾਲੀ ਇਸਰਾਈਲ ਦੇ', rg: 'Kafi', bpm: 65, tp: 'Hear Us Shepherd of Israel' },
  { n: 81, r: 'Pukar Ke Khdawand Di Gao Sana', p: 'ਪੁਕਾਰ ਕੇ ਖੁਦਾਵੰਦ ਦੀ ਗਾਓ ਸਨਾ', rg: 'Tilang', bpm: 92, tp: 'Sing for Joy to God Our Strength' },
  { n: 82, r: 'Jamaat Wich Khuda Di Khalota', p: 'ਜਮਾਅਤ ਵਿੱਚ ਖੁਦਾ ਦੀ ਖਲੋਤਾ', rg: 'Yaman', bpm: 76, tp: 'God Presides in Great Assembly' },
  { n: 83, r: 'Khudaya Mere Chup Na Ho', p: 'ਖੁਦਾਇਆ ਮੇਰੇ ਚੁੱਪ ਨਾ ਹੋ', rg: 'Kafi', bpm: 68, tp: 'O God Do Not Keep Silent / Enemies' },
  { n: 84, r: 'Khdawanda Tun Lashkaran Da Khuda', p: 'ਖੁਦਾਵੰਦਾ ਤੂੰ ਲਸ਼ਕਰਾਂ ਦਾ ਖੁਦਾ', rg: 'Bhairavi', bpm: 60, tp: 'How Lovely Is Your Dwelling / Longing' },
  { n: 85, r: 'Rehmat Teri Es Dharti De Utte', p: 'ਰਹਿਮਤ ਤੇਰੀ ਏਸ ਧਰਤੀ ਦੇ ਉੱਤੇ', rg: 'Pilu', bpm: 72, tp: 'You Showed Favor / Revive Us Again' },
  { n: 86, r: 'Khudaya Tun Kan Dharke Sun', p: 'ਖੁਦਾਇਆ ਤੂੰ ਕੰਨ ਧਰਕੇ ਸੁਣ', rg: 'Kafi', bpm: 65, tp: 'Hear O Lord / Prayer of the Afflicted' },
  { n: 87, r: 'Bunyad Tan Ohdi Qaim Hai', p: 'ਬੁਨਿਆਦ ਤਾਂ ਓਹਦੀ ਕਾਇਮ ਹੈ', rg: 'Bilawal', bpm: 76, tp: 'Foundations on Holy Mountain / Zion' },
  { n: 88, r: 'Khudaya Kyun Jan Meri Mardud', p: 'ਖੁਦਾਇਆ ਕਿਉਂ ਜਾਨ ਮੇਰੀ ਮਰਦੂਦ', rg: 'Kafi', bpm: 55, tp: 'Darkest Psalm / Unanswered Prayer' },
  { n: 89, r: 'Khuda Di Rehmattan De Git Main', p: 'ਖੁਦਾ ਦੀ ਰਹਿਮਤਾਂ ਦੇ ਗਿੱਤ ਮੈਂ', rg: 'Sarang', bpm: 72, tp: 'Mercies of the Lord / Davidic Covenant' },
  { n: 90, r: 'Tun Pusht Dar Pusht Khudaya', p: 'ਤੂੰ ਪੁਸ਼ਤ ਦਰ ਪੁਸ਼ਤ ਖੁਦਾਇਆ', rg: 'Bhairavi', bpm: 58, tp: 'Lord You Have Been Our Dwelling' },
  { n: 91, r: 'Khuda De Par De Hethan Jo Koi', p: 'ਖੁਦਾ ਦੇ ਪਰ ਦੇ ਹੇਠਾਂ ਜੋ ਕੋਈ', rg: 'Yaman', bpm: 76, tp: 'Shelter of the Most High / Refuge' },
  { n: 92, r: 'Terian Siftan De Gaone Git Karna', p: 'ਤੇਰੀਆਂ ਸਿਫ਼ਤਾਂ ਦੇ ਗਾਉਣੇ ਗਿੱਤ ਕਰਨਾ', rg: 'Tilang', bpm: 80, tp: 'Sabbath Song / Good to Praise the Lord' },
  { n: 93, r: 'Badhshahi Karda Hai Khuda', p: 'ਬਾਦਸ਼ਾਹੀ ਕਰਦਾ ਹੈ ਖੁਦਾ', rg: 'Yaman', bpm: 84, tp: 'The Lord Reigns / Robed in Majesty' },
  { n: 94, r: 'Ai Badla Lainewale Rabb Ai', p: 'ਆਈ ਬਦਲਾ ਲੈਣਵਾਲੇ ਰੱਬ ਆਈ', rg: 'Kafi', bpm: 68, tp: 'God of Vengeance / Justice' },
  { n: 95, r: 'Ao Rabb Di Waddiai Gaiye', p: 'ਆਓ ਰੱਬ ਦੀ ਵਡਿਆਈ ਗਾਈਏ', rg: 'Bilawal', bpm: 88, tp: 'Come Let Us Sing / Do Not Harden Hearts' },
  { n: 96, r: 'Ao Ik Nawan Rabb Lai Gao', p: 'ਆਓ ਇੱਕ ਨਵਾਂ ਰੱਬ ਲਈ ਗਾਓ', rg: 'Tilang', bpm: 96, tp: 'Sing to the Lord a New Song / All Nations' },
  { n: 97, r: 'Badhshahi Karda Hai Khuda Sab Lok', p: 'ਬਾਦਸ਼ਾਹੀ ਕਰਦਾ ਹੈ ਖੁਦਾ ਸੱਭ ਲੋਕ', rg: 'Yaman', bpm: 88, tp: 'The Lord Reigns / Righteousness & Joy' },
  { n: 98, r: 'Git Nawan Gao Ik Nawan Gao', p: 'ਗਿੱਤ ਨਵਾਂ ਗਾਓ ਇੱਕ ਨਵਾਂ ਗਾਓ', rg: 'Bilawal', bpm: 92, tp: 'Sing a New Song / Salvation' },
  { n: 99, r: 'Badhshahi Karda Hai Khuda Kul Lok', p: 'ਬਾਦਸ਼ਾਹੀ ਕਰਦਾ ਹੈ ਖੁਦਾ ਕੁੱਲ ਲੋਕ', rg: 'Yaman', bpm: 88, tp: 'The Lord Reigns / Let Nations Tremble' },
  { n: 100, r: 'Aye Sab Zamin De Loko Tarif', p: 'ਆਏ ਸੱਭ ਜ਼ਮੀਨ ਦੇ ਲੋਕੋ ਤਾਰੀਫ਼', rg: 'Pilu', bpm: 96, tp: 'Shout for Joy / Enter His Gates with Praise' },
  { n: 101, r: 'Git Tere Nian De Main Gawan', p: 'ਗਿੱਤ ਤੇਰੇ ਨਿਆਂ ਦੇ ਮੈਂ ਗਾਵਾਂ', rg: 'Bilawal', bpm: 76, tp: 'I Will Sing of Loyalty and Justice' },
  { n: 102, r: 'Meri Dua Hun Paunhche Tere Huzur', p: 'ਮੇਰੀ ਦੁਆ ਹੁਣ ਪਹੁੰਚੇ ਤੇਰੇ ਹੁਜ਼ੂਰ', rg: 'Kafi', bpm: 58, tp: 'Prayer of an Afflicted Person' },
  { n: 103, r: 'Tun Aakh Ai Meri Jan Mubarak', p: 'ਤੂੰ ਆਖ ਆਈ ਮੇਰੀ ਜਾਨ ਮੁਬਾਰਕ', rg: 'Tilang', bpm: 84, tp: 'Bless the Lord O My Soul / Merciful' },
  { n: 104, r: 'Dhan Kaho Khuda Nun Tuen Hi', p: 'ਧੰਨ ਕਹੋ ਖੁਦਾ ਨੂੰ ਤੁਏਂ ਹੀ', rg: 'Yaman', bpm: 80, tp: 'Bless the Lord / Creation Hymn' },
  { n: 105, r: 'Shukr Karo Rabb Da Te Mehman', p: 'ਸ਼ੁਕਰ ਕਰੋ ਰੱਬ ਦਾ ਤੇ ਮਹਿਮਾਨ', rg: 'Bilawal', bpm: 84, tp: 'Give Thanks to God / History of Israel' },
  { n: 106, r: 'Karo Shukr-o-Sana Tusi Rabb Hi', p: 'ਕਰੋ ਸ਼ੁਕਰੋ-ਸਨਾ ਤੁਸੀ ਰੱਬ ਹੀ', rg: 'Kafi', bpm: 72, tp: "Praise the Lord / Israel's Failures" },
  { n: 107, r: 'Tusi Khuda Di Karo Shukar-Guzari', p: 'ਤੁਸੀ ਖੁਦਾ ਦੀ ਕਰੋ ਸ਼ੁਕਰਗੁਜ਼ਾਰੀ', rg: 'Pilu', bpm: 80, tp: 'Give Thanks / Redeemed from Trouble' },
  { n: 108, r: 'Mazbut Mera Dil Hai Shaukat De Nal', p: 'ਮਜ਼ਬੂਤ ਮੇਰਾ دਿਲ ਹੈ ਸ਼ੌਕਤ ਦੇ ਨਾਲ', rg: 'Bilawal', bpm: 84, tp: 'My Heart Is Steadfast / Praise' },
  { n: 109, r: 'Chup Na Rah Tun Ai Khuda', p: 'ਚੁੱਪ ਨਾ ਰਹਿ ਤੂੰ ਆਈ ਖੁਦਾ', rg: 'Kafi', bpm: 65, tp: 'O God of My Praise / Against Enemies' },
  { n: 110, r: 'Khudawand Ne Farmaya Hai', p: 'ਖੁਦਾਵੰਦ ਨੇ ਫ਼ਰਮਾਇਆ ਹੈ', rg: 'Yaman', bpm: 88, tp: 'Sit at My Right Hand / Messianic Psalm' },
  { n: 111, r: 'Tusi Gao Sana Gao Sana Tusi', p: 'ਤੁਸੀ ਗਾਓ ਸਨਾ ਗਾਓ ਸਨਾ ਤੁਸੀ', rg: 'Tilang', bpm: 92, tp: 'Praise the Lord / Great Works' },
  { n: 112, r: 'Saraho Rabb Nun Dil De Nal', p: 'ਸਰਾਹੋ ਰੱਬ ਨੂੰ دਿਲ ਦੇ ਨਾਲ', rg: 'Pilu', bpm: 76, tp: 'Blessed Is Man Who Fears the Lord' },
  { n: 113, r: 'Khudawand Di Tarifan Har Dam Sunao', p: 'ਖੁਦਾਵੰਦ ਦੀ ਤਾਰੀਫ਼ਾਂ ਹਰ ਦਮ ਸੁਣਾਓ', rg: 'Bilawal', bpm: 88, tp: 'Praise the Lord / He Lifts the Needy' },
  { n: 114, r: 'Jad Israeli Misr Thon Tar Nikle', p: 'ਜਦ ਇਸਰਾਈਲੀ ਮਿਸਰ ਥੋਂ ਤਰ ਨਿੱਕਲੇ', rg: 'Bilawal', bpm: 84, tp: 'When Israel Came Out of Egypt' },
  { n: 115, r: 'Na Sanun Rabb Na Sanun Rabb', p: 'ਨਾ ਸਾਨੂੰ ਰੱਬ ਨਾ ਸਾਨੂੰ ਰੱਬ', rg: 'Kafi', bpm: 68, tp: 'Not to Us Lord but to Your Name / Idols' },
  { n: 116, r: 'Khuda De Nal Muhabbat Main Dil', p: 'ਖੁਦਾ ਦੇ ਨਾਲ ਮੁਹੱਬਤ ਮੈਂ ਦਿਲ', rg: 'Bhairavi', bpm: 62, tp: 'I Love the Lord / He Heard My Voice' },
  { n: 117, r: 'Rabb Di Buzurgi Karo Qaum Sari', p: 'ਰੱਬ ਦੀ ਬੁਜ਼ੁਰਗੀ ਕਰੋ ਕੌਮ ਸਾਰੀ', rg: 'Tilang', bpm: 96, tp: 'Praise the Lord All Nations / Shortest Psalm' },
  { n: 118, r: 'Sada Tikar Hai Rehmat Sade Rabb', p: 'ਸਦਾ ਤਿੱਕਰ ਹੈ ਰਹਿਮਤ ਸਾਡੇ ਰੱਬ', rg: 'Bilawal', bpm: 92, tp: 'His Love Endures / This Is the Day' },
  { n: 119, r: 'Dhan Hal Ohnanda Hai Jo', p: 'ਧੰਨ ਹਾਲ ਓਹਨੰਦਾ ਹੈ ਜੋ', rg: 'Bhairavi', bpm: 62, tp: 'Blessed Are Those Whose Ways / Word of God' },
  { n: 120, r: 'Sun Lai Rabb Meri Tangi Wich', p: 'ਸੁਣ ਲੈ ਰੱਬ ਮੇਰੀ ਤੰਗੀ ਵਿੱਚ', rg: 'Kafi', bpm: 60, tp: 'In My Distress I Called to the Lord' },
  { n: 121, r: 'Akkhian Chukna Han Main Wall Paharan', p: 'ਅੱਖੀਆਂ ਚੁੱਕਣਾ ਹਾਂ ਮੈਂ ਵੱਲ ਪਹਾੜਾਂ', rg: 'Bhairavi', bpm: 4, tp: 'I Lift My Eyes / My Help Comes from Lord' },
  { n: 122, r: 'Dua Mango Eh Milke Sab', p: 'ਦੁਆ ਮੰਗੋ ਏਹ ਮਿਲਕੇ ਸੱਭ', rg: 'Pilu', bpm: 72, tp: 'I Was Glad / Pray for Peace of Jerusalem' },
  { n: 123, r: 'Tun Baitha Takht Utte Asmanan Par', p: 'ਤੂੰ ਬੈਠਾ ਤਖ਼ਤ ਉੱਤੇ ਆਸਮਾਨਾਂ ਪਰ', rg: 'Bhairavi', bpm: 60, tp: 'I Lift Up My Eyes / Mercy' },
  { n: 124, r: 'Tun Je Na Hundon Madad Utte Asadi', p: 'ਤੂੰ ਜੇ ਨਾ ਹੁੰਦਾ ਮਦਦ ਉੱਤੇ ਅਸਾਡੀ', rg: 'Yaman', bpm: 76, tp: 'If Lord Had Not Been on Our Side' },
  { n: 125, r: 'As Jinhandi Tun Hain Oh Te Wang', p: 'ਅਸ ਜਿਨ੍ਹਾਂਦੀ ਤੂੰ ਹੈਂ ਓਹ ਤੇ ਵਾਂਗ', rg: 'Bilawal', bpm: 76, tp: 'Those Who Trust in Lord Like Zion' },
  { n: 126, r: 'Qaudu Sauhuni Yahova Na Leande', p: 'ਕੌੜੂ ਸੌਹੁਣੀ ਯਹੋਵਾ ਨਾ ਲੈਂਦੇ', rg: 'Pilu', bpm: 72, tp: 'When Lord Restored Zion / Sow in Tears' },
  { n: 127, r: 'Jekar Rabb Hi Na Ghar Nun Banawe', p: 'ਜੇਕਰ ਰੱਬ ਹੀ ਨਾ ਘਰ ਨੂੰ ਬਣਾਵੇ', rg: 'Kafi', bpm: 68, tp: 'Unless Lord Builds the House / Family' },
  { n: 128, r: 'Hal Mubarak Os Manukh Da', p: 'ਹਾਲ ਮੁਬਾਰਕ ਓਸ ਮਾਨੁੱਖ ਦਾ', rg: 'Pilu', bpm: 72, tp: 'Blessed Is Everyone Who Fears the Lord' },
  { n: 129, r: 'Mainun Meri Jawani Thin Laike', p: 'ਮੈਨੂੰ ਮੇਰੀ ਜਵਾਨੀ ਥੀਂ ਲਾਇਕੇ', rg: 'Bhairavi', bpm: 62, tp: 'They Have Greatly Oppressed Me' },
  { n: 130, r: 'Aye Yehova De Lok Os Te Rakho', p: 'ਆਏ ਯਹੋਵਾ ਦੇ ਲੋਕ ਓਸ ਤੇ ਰੱਖੋ', rg: 'Kafi', bpm: 62, tp: 'Out of the Depths I Cry / Forgiveness' },
  { n: 131, r: 'Dil Mera Nahin Hai Magrur', p: 'ਦਿਲ ਮੇਰਾ ਨਹੀਂ ਹੈ ਮਗਰੂਰ', rg: 'Bhairavi', bpm: 58, tp: 'My Heart Is Not Lifted Up / Humble' },
  { n: 132, r: 'Daud Dian Khudaya Tun Kar', p: 'ਦਾਊਦ ਦੀਆਂ ਖੁਦਾਇਆ ਤੂੰ ਕਰ', rg: 'Yaman', bpm: 76, tp: 'Remember David / Davidic Covenant' },
  { n: 133, r: 'Wekh Kya Hi Changi Gal Hai Eh', p: 'ਵੇਖ ਕਿਆ ਹੀ ਚੰਗੀ ਗੱਲ ਹੈ ਏਹ', rg: 'Pilu', bpm: 76, tp: 'How Good and Pleasant / Brothers Together' },
  { n: 134, r: 'Khudawand De Ai Bandeo Jo', p: 'ਖੁਦਾਵੰਦ ਦੇ ਆਈ ਬੰਦਿਓ ਜੋ', rg: 'Bilawal', bpm: 80, tp: 'Bless Lord All Servants / Night Service' },
  { n: 135, r: 'Khuda Hi Karo Hun Sana', p: 'ਖੁਦਾ ਹੀ ਕਰੋ ਹੁਣ ਸਨਾ', rg: 'Bilawal', bpm: 88, tp: "Praise the Lord / His Works & Name" },
  { n: 136, r: 'Shukar Yehova Da Hi Karo', p: 'ਸ਼ੁਕਰ ਯਹੋਵਾ ਦਾ ਹੀ ਕਰੋ', rg: 'Tilang', bpm: 88, tp: 'Give Thanks / His Love Endures Forever' },
  { n: 137, r: 'Babul Dian Nahran Te Jadon Baithe', p: 'ਬਾਬੁਲ ਦੀਆਂ ਨਹਿਰਾਂ ਤੇ ਜਦੋਂ ਬੈਠੇ', rg: 'Kafi', bpm: 58, tp: 'By Rivers of Babylon / Exile & Longing' },
  { n: 138, r: 'Main Dil De Nal Khudawanda Teri', p: 'ਮੈਂ ਦਿਲ ਦੇ ਨਾਲ ਖੁਦਾਵੰਦਾ ਤੇਰੀ', rg: 'Tilang', bpm: 80, tp: 'I Give Thanks with My Whole Heart' },
  { n: 139, r: 'Tun Yehova Mainun Jachda Mera Hal', p: 'ਤੂੰ ਯਹੋਵਾ ਮੈਨੂੰ ਜਾਚਦਾ ਮੇਰਾ ਹਾਲ', rg: 'Yaman', bpm: 76, tp: 'You Have Searched Me Lord / Omniscience' },
  { n: 140, r: 'Khudaya Shariran Thin Mainun', p: 'ਖੁਦਾਇਆ ਸ਼ਰੀਰਾਂ ਥੀਂ ਮੈਨੂੰ', rg: 'Kafi', bpm: 65, tp: 'Deliver Me from Evil Men' },
  { n: 141, r: 'Yehova Mein Pukarda Han Mere Wall', p: 'ਯਹੋਵਾ ਮੈਂ ਪੁਕਾਰਦਾ ਹਾਂ ਮੇਰੇ ਵੱਲ', rg: 'Bhairavi', bpm: 60, tp: 'O Lord I Call / Prayer as Incense' },
  { n: 142, r: 'Pukarda Han Khudawand Nun Buland', p: 'ਪੁਕਾਰਦਾ ਹਾਂ ਖੁਦਾਵੰਦ ਨੂੰ ਬੁਲੰਦ', rg: 'Kafi', bpm: 62, tp: 'I Cry to Lord / Cave Prayer of David' },
  { n: 143, r: 'Sunun Ai Khudawanda Meri Tun Dua', p: 'ਸੁਣੁਣ ਆਈ ਖੁਦਾਵੰਦਾ ਮੇਰੀ ਤੂੰ ਦੁਆ', rg: 'Bhairavi', bpm: 60, tp: 'Hear My Prayer / Thirsting Soul' },
  { n: 144, r: 'Mubarik Khudawand Jo Meri', p: 'ਮੁਬਾਰਕ ਖੁਦਾਵੰਦ ਜੋ ਮੇਰੀ', rg: 'Yaman', bpm: 80, tp: 'Blessed be the Lord My Rock' },
  { n: 145, r: 'Aye Mere Khudawanda Waddiai Teri', p: 'ਆਏ ਮੇਰੇ ਖੁਦਾਵੰਦਾ ਵਡਿਆਈ ਤੇਰੀ', rg: 'Tilang', bpm: 88, tp: 'I Will Exalt You / Great Is the Lord' },
  { n: 146, r: 'Ai Jan Meri Kar Rabb Di Waddiai', p: 'ਆਈ ਜਾਨ ਮੇਰੀ ਕਰ ਰੱਬ ਦੀ ਵਡਿਆਈ', rg: 'Pilu', bpm: 84, tp: 'Praise the Lord O My Soul / Trust' },
  { n: 147, r: 'Asade Khudawand Di Tarif Gao', p: 'ਅਸਾਡੇ ਖੁਦਾਵੰਦ ਦੀ ਤਾਰੀਫ਼ ਗਾਓ', rg: 'Bilawal', bpm: 88, tp: 'Praise the Lord / Heals Broken Hearts' },
  { n: 148, r: 'Karo Rabb Di Hun Waddiai', p: 'ਕਰੋ ਰੱਬ ਦੀ ਹੁਣ ਵਡਿਆਈ', rg: 'Bilawal', bpm: 92, tp: 'Praise Lord from Heavens / All Creation' },
  { n: 149, r: 'Haileluya Pak Khuda Da Nawan', p: 'ਹੈਲੇਲੂਯਾ ਪਾਕ ਖੁਦਾ ਦਾ ਨਵਾਂ', rg: 'Tilang', bpm: 96, tp: 'Praise the Lord / Sing a New Song' },
  { n: 150, r: 'Haleluya Sana Gao Osdi Haikal', p: 'ਹਲੇਲੂਯਾ ਸਨਾ ਗਾਓ ਓਸਦੀ ਹੈਕਲ', rg: 'Bilawal', bpm: 100, tp: 'Praise God in His Sanctuary / All Creation' },
];

export const KB: GeetItem[] = [
  { id: 'a1', r: 'Aaj Roshan Is Jahan Main', u: 'آج روشن اس جہاں میں', t: 'geet', tp: 'Praise' },
  { id: 'a2', r: 'Aata Hon Tere Hazoor', u: 'آتا ہوں تیرے حضور', t: 'geet', tp: 'Prayer / Devotion' },
  { id: 'a3', r: 'Aha Yessu Aya Zameen Par', u: 'آہا یسوع آیا زمین پر', t: 'geet', tp: 'Christmas' },
  { id: 'a4', r: 'Aman Ka Shehzada Aya', u: 'امن کا شہزادہ آیا', t: 'geet', tp: 'Christmas' },
  { id: 'a5', r: 'Ao Ao Yessu Pas Aao', u: 'آؤ آؤ یسوع پاس آؤ', t: 'geet', tp: 'Invitation / Evangelism' },
  { id: 'a6', r: 'Asi Rab De Banday Han', u: 'اسی ربّ دے بندے ہاں', t: 'geet', tp: 'Punjabi / Identity' },
  { id: 'a7', r: 'Aya Yessu Yar Saday Pas', u: 'آیا یسوع یار سادے پاس', t: 'geet', tp: 'Punjabi / Christmas' },
  { id: 'a8', r: 'Aye Chotay Shehar Bethlehem', u: 'اے چھوٹے شہر بیت اللحم', t: 'geet', tp: 'Christmas' },
  { id: 'a9', r: 'Aye Humaray Baap', u: 'اے ہمارے باپ', t: 'geet', tp: "Lord's Prayer" },
  { id: 'a10', r: 'Aye Lashkaron Ke Rab', u: 'اے لشکروں کے رب', t: 'geet', tp: 'Praise / Majesty' },
  { id: 'a11', r: 'Aye Rooh-e-Paak Utar Aa', u: 'اے روحِ پاک اتر آ', t: 'geet', tp: 'Holy Spirit' },
  { id: 'a12', r: 'Aye Sab Imandaro', u: 'اے سب ایماندارو', t: 'geet', tp: 'Call to Worship' },
  { id: 'b1', r: 'Bacho Taray Ki Manind Tum Chamko', u: 'بچو تاروں کی مانند تم چمکو', t: 'geet', tp: "Children's / Witness" },
  { id: 'c1', r: 'Calvery De Saharay', u: 'کلوری دے سہارے', t: 'geet', tp: 'Punjabi / Cross / Easter' },
  { id: 'c2', r: 'Choti Choti Jeevan Gari', u: 'چھوٹی چھوٹی جیون گاڑی', t: 'geet', tp: 'Life Journey' },
  { id: 'd1', r: 'Dekho Dekho Koi Araha Hai', u: 'دیکھو دیکھو کوئی آرہا ہے', t: 'geet', tp: 'Second Coming' },
  { id: 'd2', r: 'Dekho Jerusalem Mein Kon A Raha Hai', u: 'دیکھو یروشلیم میں کون آ رہا ہے', t: 'geet', tp: 'Palm Sunday' },
  { id: 'd3', r: 'Dil Da Mein Kamzor', u: 'دل دا میں کمزور', t: 'geet', tp: 'Punjabi / Surrender' },
  { id: 'd4', r: 'Dil Le Le Mera Pyaray Yessu', u: 'دل لے لے میرا پیارے یسوع', t: 'geet', tp: 'Surrender / Love' },
  { id: 'g1', r: 'Ghar Ghar Mein Injeel Sunaingay', u: 'گھر گھر میں انجیل سنائیں گے', t: 'geet', tp: 'Evangelism / Mission' },
  { id: 'g2', r: 'Gungunati Hain Aj Fizain', u: 'گنگناتی ہیں آج فضائیں', t: 'geet', tp: 'Praise / Nature' },
  { id: 'h1', r: 'Hallelujah Bolo Yessu Zindagi Ho Gaya', u: 'ہیللویاہ بولو یسوع زندگی ہو گیا', t: 'geet', tp: 'Easter / Resurrection' },
  { id: 'h2', r: 'Hallelujah Hallelujah Hallelujah', u: 'ہیللویاہ ہیللویاہ ہیللویاہ', t: 'geet', tp: 'Praise' },
  { id: 'h3', r: 'Hallelujah Tareef Kerain Gey', u: 'ہیللویاہ تعریف کریں گے', t: 'geet', tp: 'Praise / Future Hope' },
  { id: 'h4', r: 'Hathan Pairan Wich Kil', u: 'ہتھاں پیراں وچ کِل', t: 'geet', tp: 'Punjabi / Easter' },
  { id: 'h5', r: 'Hum Teen Badshah', u: 'ہم تین بادشاہ', t: 'geet', tp: 'Christmas / Magi' },
  { id: 'i1', r: 'Ibn-e-Khuda Ki Aj Wiladat', u: 'ابنِ خدا کی آج ولادت', t: 'geet', tp: 'Christmas' },
  { id: 'i2', r: 'Injeel Ko Phailana Yeh Kaam Humara Hai', u: 'انجیل کو پھیلانا یہ کام ہمارا ہے', t: 'geet', tp: 'Mission / Evangelism' },
  { id: 'j1', r: 'Jab Se Pyara Yessu Aya', u: 'جب سے پیارا یسوع آیا', t: 'geet', tp: 'Testimony' },
  { id: 'j2', r: 'Je Je Yessu', u: 'جے جے یسوع', t: 'geet', tp: 'Praise / Punjabi' },
  { id: 'j3', r: 'Janta Hon Yessu Ko', u: 'جانتا ہوں یسوع کو', t: 'geet', tp: 'Faith / Personal Relationship' },
  { id: 'k1', r: 'Karoos Hai Tera Nishan', u: 'صلیب ہے تیرا نشان', t: 'geet', tp: 'Cross / Identity' },
  { id: 'k2', r: 'Khushi Khushi Manao', u: 'خوشی خوشی مناؤ', t: 'geet', tp: 'Celebration / Joy' },
  { id: 'k3', r: 'Kitni Pyari Muqadas Haseen Raat', u: 'کتنی پیاری مقدس حسین رات', t: 'geet', tp: 'Christmas / Silent Night' },
  { id: 'k4', r: 'Koi Narsingah Phonk Raha He', u: 'کوئی نرسنگا پھونک رہا ہے', t: 'geet', tp: 'Second Coming / Trumpet' },
  { id: 'm1', r: 'Masihi Jawano Zamanah Badal Do', u: 'مسیحی جوانو زمانہ بدل دو', t: 'geet', tp: 'Youth / Mission' },
  { id: 'm2', r: 'Masih Tu Mera Pyara Hai', u: 'مسیح تو میرا پیارا ہے', t: 'geet', tp: 'Love / Devotion' },
  { id: 'm3', r: 'Mein Yessu Ke Noor Mein', u: 'میں یسوع کے نور میں', t: 'geet', tp: 'Light / Walking in Christ' },
  { id: 'm4', r: 'Mera Khuda Har Roz Mujhe', u: 'میرا خدا ہر روز مجھے', t: 'geet', tp: 'Faithfulness of God' },
  { id: 'm5', r: 'Mukti Dilaye Yessu Naam', u: 'مکتی دلائے یسوع نام', t: 'geet', tp: 'Salvation' },
  { id: 'n1', r: 'Nachain Choomain Eid Manain', u: 'ناچیں چومیں عید منائیں', t: 'geet', tp: 'Easter / Celebration' },
  { id: 'n2', r: 'Naray Lagao Aur Gao Rey', u: 'نعرے لگاؤ اور گاؤ رے', t: 'geet', tp: 'Praise / Shout' },
  { id: 'p1', r: 'Pechay Masih Ke Chaltay Rahain', u: 'پیچھے مسیح کے چلتے رہیں', t: 'geet', tp: 'Discipleship' },
  { id: 'p2', r: 'Pyare Masih Ke Pas Aao', u: 'پیارے مسیح کے پاس آؤ', t: 'geet', tp: 'Invitation' },
  { id: 'r1', r: 'Rab Di Marzi Teri', u: 'رب دی مرضی تیری', t: 'geet', tp: 'Punjabi / Will of God' },
  { id: 's1', r: 'Sipahi Yessu Ke Kadam Barhata Ja', u: 'سپاہی یسوع کے قدم بڑھاتا جا', t: 'geet', tp: 'Spiritual Warfare' },
  { id: 's2', r: 'Sabse Pehle Yessu Ko', u: 'سب سے پہلے یسوع کو', t: 'geet', tp: 'Priority / Devotion' },
  { id: 't1', r: 'Tere Naam Per Yessu', u: 'تیرے نام پر یسوع', t: 'geet', tp: 'Name of Jesus' },
  { id: 't2', r: 'Tu Hi Hai Meri Umeed', u: 'تو ہی ہے میری امید', t: 'geet', tp: 'Hope in God' },
  { id: 't3', r: 'Tujhey Dhundta Hoon Main', u: 'تجھے ڈھونڈتا ہوں میں', t: 'geet', tp: 'Seeking God' },
  { id: 'w1', r: 'Woh Agaya Woh Aagaya', u: 'وہ آگیا وہ آگیا', t: 'geet', tp: 'Resurrection / Easter' },
  { id: 'y1', r: 'Yessu Mera Pyara Hai', u: 'یسوع میرا پیارا ہے', t: 'geet', tp: 'Love / Personal Devotion' },
  { id: 'y2', r: 'Ye Mera Yessu', u: 'یہ میرا یسوع', t: 'geet', tp: 'Praise / Personal' },
  { id: 'kz1', r: 'Zaboor 023 - Khudawand Mera Chowaha', u: 'زبور ۲۳ – خداوند میرا چرواہا ہے', t: 'zaboor', tp: 'Psalm 23 / Shepherd' },
  { id: 'kz2', r: 'Zaboor 046 - Khuda Hamara Panah', u: 'زبور ۴۶ – خدا ہمارا پناہ ہے', t: 'zaboor', tp: 'Psalm 46 / Refuge' },
  { id: 'kz3', r: 'Zaboor 100 - Khushee Se Rab Ko Pukaro', u: 'زبور ۱۰۰ – خوشی سے رب کو پکارو', t: 'zaboor', tp: 'Psalm 100 / Praise' },
  { id: 'kz4', r: 'Zaboor 121 - Mein Paharon Ki Taraf', u: 'زبور ۱۲۱ – میں پہاڑوں کی طرف نظر کرتا', t: 'zaboor', tp: 'Psalm 121 / Help' },
  { id: 'kz5', r: 'Zaboor 150 - Rab Ki Tarif Karo', u: 'زبور ۱۵۰ – رب کی تعریف کرو', t: 'zaboor', tp: 'Psalm 150 / Praise All' },
];

export const SD: Record<string, string> = {
  punjabi: 'authentic South Asian Punjabi Masihi style - harmonium and dholak, call-and-response vocals, Sialkot Convention devotional spirit since 1904, ornamented Punjabi Christian folk melody with genuine devotional feeling',
  raag: "classical 1908 Punjabi Zaboor Desi Raag style - ornamented melody in the specified raag, tabla or dholak, harmonium drone, meditative and deeply devotional in the spirit of Dr. Imam Din Shahbaz's Punjabi Zaboor Desi Ragan Vich. Detailed melodic characteristics, swaras, gamaks, and emotional character of the assigned Raag.",
  soothing: 'gentle, soothing, meditative, peaceful gospel - soft dynamics, intimate feeling, contemplative spirit that draws the listener into God\'s presence',
  orchestral: 'mighty, triumphant, majestic orchestral gospel - grand sweeping arrangements, powerful dynamics, full choir and orchestra building to glorious climax',
  'urdu-ghazal': 'classical Urdu devotional ghazal/qawwali - tabla, sarangi, harmonium, deeply poetic Urdu phrasing, contemplative and emotive with microtonal meend ornaments',
  contemporary: 'modern worship gospel - Hillsong/Kirk Franklin style, driving band arrangement, builds from intimate verse to explosive chorus praise'
};
