/**
 * Scriptorium Studio — offline composition engine ("Theophilus").
 *
 * A deterministic, rule-based composer. Given the console settings
 * (style, genre, raag/key, taal, tempo, instruments, loaded Zaboor/Geet
 * context, composer's note) it writes a complete sacred-music sheet:
 * sections with lyrics, chord progressions, melodic measures for the
 * staff renderer, instrument roles and performance tips.
 *
 * No network, no AI — same inputs + same seed always give the same song.
 */

export interface Measure { notes: string[]; durations: string[] }
export interface Section {
  name: string;
  measures: number;
  dynamicMarking: string;
  chordProgression: string[];
  lyrics: string[];
  notes?: string;
  melody: Measure[];
}
export interface SheetPart { part: string; clef: 'treble' | 'bass'; measures: Measure[] }
export interface Composition {
  id: string;
  seed: number;
  createdAt: string;
  title: string;
  subtitle: string;
  key: string;
  timeSig: string;
  raag?: string;
  taal?: string;
  bpm: number;
  beatsPerBar: number;
  style: string;
  genre: string;
  instruments: string[];
  biblicalReference: string;
  moodDescription: string;
  raagDescription?: string;
  sections: Section[];
  sheetNotes: SheetPart[];
  arrangementNotes: string;
  instrumentRoles: { instrument: string; role: string }[];
  performanceTips: string[];
  theka?: string;
  rootMidi: number;
  scale: number[];
}

export interface ComposeInput {
  styleMode: string;
  genre: string;
  keyRaag: string;
  timeSig: string;
  tempo: string;
  instruments: string[];
  prompt?: string;
  zaboor?: { n: number; r: string; p: string; rg: string; bpm: number; tp: string } | null;
  geet?: { id: string; r: string; u: string; t: string; tp: string } | null;
  rhythm?: { nm: string; pt: string; r?: string } | null;
  seed?: number;
}

/* ------------------------------------------------------------------ RNG */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/* ------------------------------------------------------------ raag data */
export const RAAG_SCALES: Record<string, { semis: number[]; swaras: string; vadi: number; samvadi: number; time: string; character: string }> = {
  Kafi:     { semis: [0, 2, 3, 5, 7, 9, 10], swaras: 'Sa Re ga Ma Pa Dha ni', vadi: 4, samvadi: 0, time: 'late evening', character: 'komal Ga and komal Ni give Kafi its sorrowful-yet-hopeful longing — the heart of the 1908 Punjabi Zaboor tradition' },
  Bhairavi: { semis: [0, 1, 3, 5, 7, 8, 10], swaras: 'Sa re ga Ma Pa dha ni', vadi: 3, samvadi: 0, time: 'early morning', character: 'all four komal swaras — deep surrender, penitence and morning devotion; the queen of morning raags' },
  Yaman:    { semis: [0, 2, 4, 6, 7, 9, 11], swaras: 'Sa Re Ga Ma# Pa Dha Ni', vadi: 2, samvadi: 6, time: 'first watch of the night', character: 'teevra Ma lifts the melody upward — majesty, beauty and the glory of creation at evening' },
  Pilu:     { semis: [0, 2, 3, 4, 5, 7, 8, 9, 10], swaras: 'Sa Re ga Ga Ma Pa dha Dha ni', vadi: 0, samvadi: 4, time: 'afternoon', character: 'a light, folk-flavoured raag mixing komal and shuddha notes — playful joy and Punjabi celebration' },
  Sarang:   { semis: [0, 2, 5, 7, 10], swaras: 'Sa Re Ma Pa ni', vadi: 1, samvadi: 4, time: 'midday', character: 'a bright pentatonic frame that omits Ga and Dha — clear midday thanksgiving' },
  Tilang:   { semis: [0, 4, 5, 7, 10, 11], swaras: 'Sa Ga Ma Pa ni Ni', vadi: 2, samvadi: 5, time: 'night', character: 'both Nis in play — passionate, ornamented praise in the Punjabi Christian geet style' },
  Bilawal:  { semis: [0, 2, 4, 5, 7, 9, 11], swaras: 'Sa Re Ga Ma Pa Dha Ni', vadi: 5, samvadi: 2, time: 'morning', character: 'all shuddha swaras — pure, open joy; the natural home of Easter and Christmas Zaboor' },
};

const WESTERN: Record<string, number[]> = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  Minor: [0, 2, 3, 5, 7, 8, 10],
};
const ROOTS: Record<string, number> = { C: 60, 'C#': 61, Db: 61, D: 62, Eb: 63, E: 64, F: 65, 'F#': 66, G: 67, Ab: 68, A: 69, Bb: 70, B: 71 };
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const midiToName = (m: number) => `${NOTE_NAMES[m % 12]}${Math.floor(m / 12) - 1}`;
export const nameToMidi = (n: string) => {
  const m = /^([A-G])([#b]?)(-?\d)$/.exec(n); if (!m) return 60;
  let v = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1] as 'C'] + (parseInt(m[3], 10) + 1) * 12;
  if (m[2] === '#') v++; if (m[2] === 'b') v--; return v;
};

/* --------------------------------------------------------- lyric banks */
type Theme = 'praise' | 'prayer' | 'christmas' | 'easter' | 'peace' | 'trust' | 'guidance' | 'cross' | 'kingship' | 'hope' | 'lament' | 'invitation' | 'thanks';
interface Bank { ref: string; en: string[]; sa: string[]; title: string[] }
const BANK: Record<Theme, Bank> = {
  praise: { ref: 'Psalm 150:6', title: ['Har Saah Tareef Kare', 'Let Every Breath Praise', 'Hallelujah Di Awaaz'],
    en: ['Let everything that breathes praise the Lord', 'From the rising sun to its going down', 'Lift up your hands in the sanctuary', 'His name is high above the heavens', 'Sing to Him a new song, O earth', 'Clap your hands, all you peoples'],
    sa: ['Har saah Rab di tareef kare', 'Hallelujah, Hallelujah, Yessu Naam', 'Uchi awaaz naal gao, oh lokon', 'Khudawand di hamd sada rahe', 'Tera naam buland hai asmaan ton', 'Aao ral ke sifat karo'] },
  prayer: { ref: 'Psalm 5:3', title: ['Meri Pukar Sun Lai', 'Hear My Morning Cry', 'Dua De Bol'],
    en: ['In the morning You will hear my voice', 'I lift my prayer like incense before You', 'Bow down Your ear and hear my cry', 'My soul waits for You in the silence', 'Teach my heart to seek Your face', 'You are near to all who call on You'],
    sa: ['Subah savere meri awaaz sun', 'Mere Rabba, meri dua qabool kar', 'Tere hazoor main jhuk ke aaya', 'Meri jaan teri raah takdi', 'Apna mukh mainu vikha de', 'Tu nere hai jo tainu pukaare'] },
  christmas: { ref: 'Luke 2:11', title: ['Aman Da Shehzada Aaya', 'The Prince of Peace Is Born', 'Bethlehem Di Raat'],
    en: ['Unto us a Child is born this night', 'Glory to God in the highest heaven', 'Shepherds run to Bethlehem', 'A manger holds the Light of the world', 'Wise men kneel with gold and myrrh', 'Emmanuel, our God is with us'],
    sa: ['Aaj Bethlehem vich noor aaya', 'Aman da Shehzada zameen te aaya', 'Charwahe daude, farishte gaave', 'Khudawand da jalaal asmaan te', 'Yessu Masih janam liya hai', 'Emmanuel, Khuda saade naal'] },
  easter: { ref: '1 Corinthians 15:55', title: ['Qabar Khali Hai', 'The Tomb Is Empty', 'Yessu Ji Utthe'],
    en: ['O death, where is your sting now', 'The stone is rolled, the grave is bare', 'He is risen as He said', 'Death is swallowed up in victory', 'Go and tell His disciples', 'The Lamb who was slain now reigns'],
    sa: ['Yessu Masih ji utthe, Hallelujah', 'Qabar khali, pathar hat gaya', 'Maut te fatah paayi Yessu ne', 'Jaa ke chelian nu dasso', 'Zinda hai Rab, sada zinda', 'Jai ho, jai ho, Yessu di jai'] },
  peace: { ref: 'John 14:27', title: ['Aman Da Darya', 'Rivers of Peace', 'Sukoon Tere Naal'],
    en: ['Peace I leave with you, not as the world gives', 'Be still and know that I am God', 'He leads me beside the quiet waters', 'Let not your heart be troubled', 'His peace passes all understanding', 'Rest, my soul, in His arms tonight'],
    sa: ['Apna aman main tainu dinda haan', 'Chup kar ke jaan, main Khuda haan', 'Sheetal paniyan kol le jaave', 'Dil na ghabraye, oh meri jaan', 'Sukoon Yessu de naal milda', 'Aaram kar, meri rooh, us de baazu'] },
  trust: { ref: 'Proverbs 3:5', title: ['Bharosa Rab Te', 'Trust in the Lord', 'Tere Te Tikya Dil'],
    en: ['Trust in the Lord with all your heart', 'Lean not on your own understanding', 'Though the nations rage, He reigns', 'He is my rock and my fortress', 'The Lord is my light, whom shall I fear', 'Under His wings I find refuge'],
    sa: ['Saare dil naal Rab te bharosa rakh', 'Apni samajh te tikya na kar', 'Qaumaan garjan, Rab hi raja', 'Oh mera pathar, mera qila', 'Rab meri roshni, kis ton daraan', 'Us de paran hethaan panah'] },
  guidance: { ref: 'Psalm 119:105', title: ['Tera Kalaam Charag', 'Lamp Unto My Feet', 'Raah Vikha De'],
    en: ['Your word is a lamp unto my feet', 'A light shining on my path', 'Lead me in Your truth and teach me', 'Order my steps in Your word', 'Show me the way I should walk', 'Guide me, O Great Jehovah'],
    sa: ['Tera kalaam mere pairan da charag', 'Meri raah te roshni tera noor', 'Apni sachai vich mainu chala', 'Mere qadam tere kalaam vich', 'Raah vikha de, mere Khudawand', 'Mainu chala, Khudawand azeem'] },
  cross: { ref: 'Isaiah 53:5', title: ['Saleeb De Kol', 'Near the Cross', 'Lahu Da Chhitta'],
    en: ['He was wounded for our transgressions', 'By His stripes we are healed', 'Nothing but the blood of Jesus', 'At the cross where I first saw the light', 'The Lamb of God takes away our sin', 'His love was poured out on Calvary'],
    sa: ['Saadi khataawan lai oh zakhmi hoya', 'Us de zakhman naal asi changhe', 'Yessu da lahu, bas Yessu da lahu', 'Saleeb de kol main noor vekhya', 'Khuda da Lela gunaah utthaave', 'Kalvari te pyaar vahaya'] },
  kingship: { ref: 'Revelation 19:16', title: ['Badshahaan Da Badshah', 'King of Kings', 'Takht Te Bethya Rab'],
    en: ['King of kings and Lord of lords', 'Every knee shall bow before Him', 'He reigns from everlasting to everlasting', 'Worthy is the Lamb upon the throne', 'Crown Him with many crowns', 'His kingdom shall have no end'],
    sa: ['Badshahaan da Badshah Yessu', 'Har goda us de agge jhukega', 'Azal ton abad tak oh raja', 'Takht te Lela laayak hai', 'Us nu taaj pehnaao, oh lokon', 'Us di badshahi sadaa rahegi'] },
  hope: { ref: 'Romans 15:13', title: ['Ummeed Da Sooraj', 'Sun of Hope', 'Nawi Subah'],
    en: ['The God of hope fill you with joy', 'Weeping may endure for a night', 'But joy comes in the morning', 'Those who wait on the Lord renew their strength', 'They shall mount up with wings as eagles', 'His mercies are new every morning'],
    sa: ['Ummeed da Rab khushi naal bhare', 'Raat nu rona ho sakda', 'Par subah nu khushi aandi', 'Jo Rab di raah takde, taqat paande', 'Ukaab wangu udd jaande', 'Us diyan rehmatan har subah naviyan'] },
  lament: { ref: 'Psalm 42:5', title: ['Meri Jaan Kyun Udaas', 'Why So Downcast', 'Doonghe Paani Ton'],
    en: ['Why are you cast down, O my soul', 'Out of the depths I cry to You', 'My tears have been my food day and night', 'Hope in God, for I shall yet praise Him', 'He heard my cry from the pit', 'You have turned my mourning into dancing'],
    sa: ['Meri jaan, tu kyun udaas hai', 'Doonghe paani ton main pukaraan', 'Mere hanju din raat meri roti', 'Rab te ummeed rakh, main phir gaawan', 'Toye vichon meri awaaz suni', 'Mera sog naach vich badal ditta'] },
  invitation: { ref: 'Matthew 11:28', title: ['Aao Yessu Kol', 'Come Unto Me', 'Thake Hoye Aao'],
    en: ['Come unto Me, all you who labour', 'I will give you rest', 'Whosoever will may come', 'The door is open, the table spread', 'Taste and see that the Lord is good', 'Today if you hear His voice'],
    sa: ['Aao, aao, Yessu kol aao', 'Thake hoye nu aaram devanga', 'Jo chahve, oh aa jaave', 'Darwaza khula, mez sajji', 'Chakh ke vekho, Rab changa hai', 'Aj je us di awaaz suno'] },
  thanks: { ref: 'Psalm 100:4', title: ['Shukar Karo', 'Enter With Thanksgiving', 'Us Da Fazal'],
    en: ['Enter His gates with thanksgiving', 'And His courts with praise', 'Give thanks, for He is good', 'His mercy endures forever', 'Bless the Lord, O my soul', 'Forget not all His benefits'],
    sa: ['Shukar karde us de darwaze aao', 'Sifat karde us de sehan vich', 'Shukar karo, oh changa hai', 'Us di rehmat sada rehndi', 'Meri jaan, Rab nu mubarak keh', 'Us de ehsaan na bhulaeen'] },
};

function pickTheme(input: ComposeInput, rnd: () => number): Theme {
  const text = `${input.prompt || ''} ${input.zaboor?.tp || ''} ${input.geet?.tp || ''}`.toLowerCase();
  const rules: [RegExp, Theme][] = [
    [/christmas|nativity|bethlehem|born|manger|advent/, 'christmas'], [/easter|risen|resurrect|tomb|victory/, 'easter'],
    [/cross|blood|calvary|atone|lamb|sacrific|passion/, 'cross'], [/king|throne|reign|crown|majest/, 'kingship'],
    [/peace|rest|still|quiet|calm|sooth/, 'peace'], [/trust|refuge|rock|fortress|fear|nations rage/, 'trust'],
    [/guid|path|way|lamp|teach|word|law/, 'guidance'], [/lament|sorrow|tear|weep|downcast|deep|cry/, 'lament'],
    [/thank|grateful|gratitude|benefit/, 'thanks'], [/invit|come|evangel|call/, 'invitation'],
    [/hope|morning|new|wait|renew/, 'hope'], [/prayer|pray|devotion|morning cry|evening/, 'prayer'],
    [/praise|worship|hallelujah|glory|sing|identity/, 'praise'],
  ];
  for (const [re, t] of rules) if (re.test(text)) return t;
  const all = Object.keys(BANK) as Theme[]; return all[Math.floor(rnd() * all.length)];
}

/* ------------------------------------------------------------ helpers */
const TEMPO_BPM: Record<string, number> = { Largo: 52, Adagio: 62, Andante: 72, Moderato: 92, Allegretto: 104, Allegro: 124, Vivace: 140, Presto: 168 };
function tempoToBpm(t: string, fallback?: number) {
  if (fallback) return fallback;
  const m = /(\d+)\s*-\s*(\d+)/.exec(t); if (m) return Math.round((+m[1] + +m[2]) / 2);
  const k = Object.keys(TEMPO_BPM).find(k => t.toLowerCase().startsWith(k.toLowerCase())); return k ? TEMPO_BPM[k] : 76;
}
function beatsPerBar(ts: string) { const n = parseInt(ts.split('/')[0], 10) || 4; if (n === 16) return 4; if (n === 12) return 6; if (n === 8) return 4; return n; }
const TAAL_NAME: Record<string, string> = { '16/16': 'Teentaal (16)', '12/8': 'Ektal (12)', '7/8': 'Rupak (7)', '8/8': 'Kaherva (8)', '6/8': 'Dadra (6)', '4/4': 'Kaherva / common time', '3/4': 'Dadra (waltz)' };
const THEKA: Record<string, string> = {
  '16/16': 'DHA DHIN DHIN DHA | DHA DHIN DHIN DHA | NA TIN TIN NA | TA DHIN DHIN DHA',
  '12/8': 'DHIN DHIN | DHAGE TIRKIT | TU NA | KAT TA | DHAGE TIRKIT | DHIN NA',
  '7/8': 'TIN TIN NA | DHIN NA | DHIN NA', '8/8': 'DHA GE NA TI | NA KA DHIN NA', '6/8': 'DHA DHIN NA | DHA TIN NA',
  '4/4': 'DHA GE NA TI | NA KA DHIN NA', '3/4': 'DHA DHIN NA | DHA TIN NA',
};

/** rhythm templates (in quarter-note units) for a given number of beats */
function rhythmFor(beats: number, rnd: () => number, calm: boolean): string[] {
  const T: Record<number, string[][]> = {
    4: calm ? [['h', 'h'], ['w'], ['q', 'q', 'h'], ['h', 'q', 'q']] : [['q', 'q', 'q', 'q'], ['q', 'e', 'e', 'h'], ['e', 'e', 'q', 'q', 'q'], ['h', 'q', 'q'], ['q', 'q', 'h']],
    3: calm ? [['h', 'q'], ['q', 'h']] : [['q', 'q', 'q'], ['q', 'e', 'e', 'q'], ['h', 'q']],
    6: calm ? [['h', 'h', 'h'], ['w', 'h']] : [['q', 'q', 'q', 'q', 'q', 'q'], ['h', 'q', 'q', 'h'], ['q', 'q', 'h', 'h']],
    7: calm ? [['h', 'h', 'q', 'h']] : [['q', 'q', 'q', 'q', 'q', 'h'], ['e', 'e', 'q', 'q', 'q', 'h']],
    5: [['q', 'q', 'q', 'h'], ['h', 'q', 'q', 'q']], 2: [['q', 'q'], ['h']],
  };
  const opts = T[beats] || T[4]; return opts[Math.floor(rnd() * opts.length)];
}

function buildScale(input: ComposeInput): { scale: number[]; rootMidi: number; raag?: string; keyLabel: string } {
  const kr = input.keyRaag || 'Kafi raag';
  const rm = /^(\w+)\s+raag$/i.exec(kr);
  if (rm && RAAG_SCALES[rm[1]]) {
    const root = { Kafi: 62, Bhairavi: 60, Yaman: 62, Pilu: 62, Sarang: 60, Tilang: 60, Bilawal: 60 }[rm[1]] || 60;
    return { scale: RAAG_SCALES[rm[1]].semis, rootMidi: root, raag: rm[1], keyLabel: `${midiToName(root).replace(/\d/, '')} = Sa (Raag ${rm[1]})` };
  }
  const wm = /^([A-G][#b]?)\s+(Major|Minor)$/i.exec(kr);
  if (wm) { const root = ROOTS[wm[1]] ?? 60; return { scale: WESTERN[wm[2][0].toUpperCase() + wm[2].slice(1).toLowerCase()] || WESTERN.Major, rootMidi: root, keyLabel: kr }; }
  return { scale: WESTERN.Major, rootMidi: 67, keyLabel: 'G Major' };
}

/** generate one phrase of `bars` measures as a shaped random walk over scale degrees */
function phrase(bars: number, beats: number, scale: number[], root: number, rnd: () => number, opts: { calm: boolean; peakDeg: number; endDeg: number; startDeg: number; low: number; high: number }): Measure[] {
  const out: Measure[] = []; let deg = opts.startDeg;
  const totalSteps = bars * 4; let step = 0;
  for (let b = 0; b < bars; b++) {
    const durs = rhythmFor(beats, rnd, opts.calm); const notes: string[] = [];
    for (let i = 0; i < durs.length; i++) {
      const progress = step / totalSteps; const target = progress < 0.6 ? opts.peakDeg : opts.endDeg;
      const pull = Math.sign(target - deg) * (rnd() < 0.55 ? 1 : 0);
      let move = pull + (rnd() < 0.25 ? (rnd() < 0.5 ? -1 : 1) : 0);
      if (rnd() < 0.12) move += rnd() < 0.5 ? -2 : 2; // occasional leap
      deg = Math.max(opts.low, Math.min(opts.high, deg + move));
      if (b === bars - 1 && i === durs.length - 1) deg = opts.endDeg; // cadence
      const oct = Math.floor(deg / scale.length); const idx = ((deg % scale.length) + scale.length) % scale.length;
      notes.push(midiToName(root + oct * 12 + scale[idx])); step++;
    }
    out.push({ notes, durations: durs });
  }
  return out;
}

function chordsFor(scale: number[], root: number, isRaag: boolean, rnd: () => number, n: number): string[] {
  const name = (deg: number, minor: boolean) => `${NOTE_NAMES[(root + scale[deg % scale.length]) % 12]}${minor ? 'm' : ''}`;
  const isMinorThird = (deg: number) => { const a = scale[deg % scale.length]; const b = scale[(deg + 2) % scale.length]; return (((b - a) + 12) % 12) === 3; };
  if (isRaag) { const sa = name(0, isMinorThird(0)); const pa = NOTE_NAMES[(root + 7) % 12]; const ma = name(3 % scale.length, isMinorThird(3 % scale.length)); const pool = [sa, `${sa} (drone)`, ma, `${pa}5`, sa]; return Array.from({ length: n }, (_, i) => pool[(i + Math.floor(rnd() * 2)) % pool.length]); }
  const prog = [[0, 3, 4, 0], [0, 5, 3, 4], [5, 3, 0, 4], [0, 4, 5, 3]][Math.floor(rnd() * 4)];
  return Array.from({ length: n }, (_, i) => name(prog[i % 4], isMinorThird(prog[i % 4])));
}

/* ------------------------------------------------------------- main */
export function compose(input: ComposeInput): Composition {
  const seed = input.seed ?? (hash(JSON.stringify({ ...input, seed: undefined })) % 1e9);
  const rnd = mulberry32(seed);
  const { scale, rootMidi, raag, keyLabel } = buildScale(input);
  const isSouthAsian = ['punjabi', 'raag', 'urdu-ghazal'].includes(input.styleMode) || /sialkot|masihi|desi|punjabi|urdu|qawwali/.test(input.genre);
  const bpm = tempoToBpm(input.tempo, input.zaboor?.bpm);
  const beats = beatsPerBar(input.timeSig);
  const calm = bpm < 70 || input.styleMode === 'soothing';
  const theme = pickTheme(input, rnd); const bank = BANK[theme];
  const title = input.zaboor ? `Zaboor ${input.zaboor.n} — ${input.zaboor.r}` : input.geet ? input.geet.r : bank.title[Math.floor(rnd() * bank.title.length)];
  const subtitle = input.zaboor ? `A new setting in Raag ${input.zaboor.rg} · ${input.zaboor.tp}` : input.geet ? `After the Sialkot Geet Ki Kitab · ${input.geet.tp}` : `${theme[0].toUpperCase() + theme.slice(1)} · ${STYLE_LABEL[input.styleMode] || input.styleMode}`;

  const lines = (n: number, sa: boolean) => { const src = sa ? bank.sa : bank.en; const start = Math.floor(rnd() * src.length); return Array.from({ length: n }, (_, i) => src[(start + i) % src.length]); };
  const stanza = (n = 4) => isSouthAsian ? (rnd() < 0.5 ? [...lines(2, true), ...lines(2, false)] : lines(n, true)) : lines(n, false);
  const refrain = stanza(4);

  const sectionPlan: { name: string; bars: number; dyn: string; peak: number; start: number; end: number; lyrics: string[]; note: string; calm?: boolean }[] = [
    { name: isSouthAsian ? 'Alaap (Intro)' : 'Intro', bars: 2, dyn: 'p — free, unmetred feel', peak: 4, start: 0, end: 0, lyrics: isSouthAsian ? ['Aa… Sa… Re… (vocalise on the raag)'] : ['(instrumental — establish the key and mood)'], note: isSouthAsian ? 'Slow unfolding of the raag over the tanpura drone; harmonium doubles the voice.' : 'Sparse; piano or guitar outlines the progression.', calm: true },
    { name: isSouthAsian ? 'Asthai (Verse 1)' : 'Verse 1', bars: 4, dyn: 'mp', peak: 4, start: 0, end: 0, lyrics: stanza(), note: 'Lower tetrachord; stay near Sa. Ornament the long notes with gentle meend.' },
    { name: isSouthAsian ? 'Antara (Chorus)' : 'Chorus', bars: 4, dyn: 'mf — congregation joins', peak: 8, start: 4, end: 7, lyrics: refrain, note: 'Rises to the upper Sa; call-and-response between lead and congregation.' },
    { name: 'Verse 2', bars: 4, dyn: 'mp', peak: 5, start: 2, end: 0, lyrics: stanza(), note: 'Same melodic frame as Verse 1 with a varied cadence.' },
    { name: 'Chorus', bars: 4, dyn: 'f', peak: 8, start: 4, end: 7, lyrics: refrain, note: 'Full ensemble; percussion opens to the full theka.' },
    { name: isSouthAsian ? 'Taan / Bridge' : 'Bridge', bars: 2, dyn: 'f — rubato', peak: 9, start: 7, end: 4, lyrics: stanza(2), note: isSouthAsian ? 'Fast sargam or taan phrases over a held chord.' : 'Modulate the texture — drop percussion, voices only.' },
    { name: 'Final Chorus & Tihai', bars: 4, dyn: 'ff → p (fade)', peak: 8, start: 4, end: 0, lyrics: [...refrain.slice(0, 2), ...refrain.slice(0, 2)], note: 'Close on Sa with a threefold tihai cadence.' },
  ];

  const sections: Section[] = sectionPlan.map(p => ({
    name: p.name, measures: p.bars, dynamicMarking: p.dyn,
    chordProgression: chordsFor(scale, rootMidi, !!raag, rnd, p.bars),
    lyrics: p.lyrics, notes: p.note,
    melody: phrase(p.bars, beats, scale, rootMidi, rnd, { calm: p.calm ?? calm, peakDeg: p.peak, startDeg: p.start, endDeg: p.end, low: -1, high: 10 }),
  }));

  const leadMeasures = sections.flatMap(s => s.melody);
  const bassMeasures: Measure[] = sections.flatMap(s => s.melody.map((m, i) => {
    const chordRoot = s.chordProgression[i % s.chordProgression.length].replace(/[m5].*| \(drone\)/g, '');
    const midi = 36 + ((NOTE_NAMES.indexOf(chordRoot) + 12) % 12) + (NOTE_NAMES.indexOf(chordRoot) > 7 ? 0 : 12);
    return beats >= 6 ? { notes: [midiToName(midi), midiToName(midi + 7), midiToName(midi)], durations: ['h', 'h', 'h'] } : { notes: [midiToName(midi), midiToName(midi + 7)], durations: ['h', 'h'] };
  }));
  const lead = input.instruments.find(i => ['Harmonium', 'Violin', 'Flute', 'Bansuri', 'Sitar', 'Sarangi', 'Piano', 'Organ', 'Guitar', 'Trumpet', 'Rabab'].includes(i)) || 'Voice';
  const bassInst = input.instruments.find(i => ['Bass Guitar', 'Cello', 'Piano', 'Organ', 'Tanpura', 'Shruti Box'].includes(i)) || 'Bass';
  const sheetNotes: SheetPart[] = [
    { part: `${lead} & Voice (melody)`, clef: 'treble', measures: leadMeasures },
    { part: `${bassInst} (${raag ? 'Sa–Pa drone / bass' : 'bass line'})`, clef: 'bass', measures: bassMeasures },
  ];

  const roles = input.instruments.map(instrument => ({ instrument, role: ROLE[instrument] || 'Supports the melody with sustained harmony; enters at the first chorus.' }));
  const tips = [
    raag ? `Keep the ${raag} swaras pure: ${RAAG_SCALES[raag].swaras}. Vadi is ${RAAG_SCALES[raag].swaras.split(' ')[RAAG_SCALES[raag].vadi]} — rest on it.` : `Stay in ${keyLabel}; let the melody breathe on the tonic at each cadence.`,
    `${TAAL_NAME[input.timeSig] || input.timeSig} at about ${bpm} BPM — count the sam (beat 1) clearly before the voice enters.`,
    isSouthAsian ? 'Sing the Punjabi/Urdu lines with open vowels; congregation answers each refrain line.' : 'Build dynamics section by section; hold the final chord for a full bar.',
    input.prompt ? `Composer's vision: "${input.prompt.slice(0, 140)}${input.prompt.length > 140 ? '…' : ''}"` : 'Load a Zaboor or Geet context for a themed setting.',
  ];

  return {
    id: `comp-${seed.toString(36)}-${Date.now().toString(36)}`, seed, createdAt: new Date().toISOString(),
    title, subtitle, key: keyLabel, timeSig: input.timeSig, raag, taal: isSouthAsian ? (input.rhythm?.nm.split(' — ')[0] || TAAL_NAME[input.timeSig]) : undefined,
    bpm, beatsPerBar: beats, style: input.styleMode, genre: input.genre, instruments: input.instruments,
    biblicalReference: bank.ref,
    moodDescription: `${MOOD[input.styleMode] || 'Devotional and sincere'} — a ${theme} setting${raag ? ` in Raag ${raag} (${RAAG_SCALES[raag].time})` : ''}, ${bpm} BPM.`,
    raagDescription: raag ? `Raag ${raag}: ${RAAG_SCALES[raag].character}. Aroha/avaroha on ${RAAG_SCALES[raag].swaras}.` : undefined,
    sections, sheetNotes,
    arrangementNotes: `${sections.length} sections, ${leadMeasures.length} bars. ${isSouthAsian ? 'Tanpura/shruti drone throughout; percussion enters at the Asthai and plays the full theka from the first Antara.' : 'Rhythm section enters at Verse 1; strings and choir swell at the chorus.'} Ends with a tihai on Sa.`,
    instrumentRoles: roles, performanceTips: tips,
    theka: input.rhythm?.pt || THEKA[input.timeSig] || THEKA['4/4'],
    rootMidi, scale,
  };
}

const STYLE_LABEL: Record<string, string> = { punjabi: 'Punjabi Masihi', raag: 'Desi Raag / Zaboor', soothing: 'Soothing Beats', orchestral: 'Mighty Orchestral', 'urdu-ghazal': 'Urdu Ghazal Gospel', contemporary: 'Contemporary Gospel' };
const MOOD: Record<string, string> = { punjabi: 'Warm, communal and joyful in the Sialkot Convention spirit', raag: 'Meditative, ornamented and deeply devotional', soothing: 'Gentle, still and consoling', orchestral: 'Triumphant and majestic', 'urdu-ghazal': 'Poetic, longing and reverent', contemporary: 'Modern, driving and uplifting' };
const ROLE: Record<string, string> = {
  Harmonium: 'Doubles the vocal line with sustained bellows; fills between phrases.', Tabla: 'Plays the theka; opens the bols at each chorus and marks the tihai.', Dholak: 'Kaherva/dadra groove under the congregation; accents the sam.', Dhol: 'Reserved for the final chorus — loud open strokes on beat 1.',
  Sitar: 'Alaap introduction and taan fills between vocal lines.', Sarangi: 'Shadows the voice a beat behind with meend slides.', Bansuri: 'Introduces the raag in the alaap; long held notes in the chorus.', Chimta: 'Bright offbeat clang through the choruses.', Duff: 'Steady frame-drum pulse on every beat.', Rabab: 'Rhythmic strummed drone on Sa–Pa.', Tanpura: 'Continuous Sa–Pa drone from the first bar to the last.', 'Shruti Box': 'Sustains Sa and Pa under the whole piece.',
  Piano: 'Chords on the beat; arpeggios in the verses, block chords in the chorus.', Violin: 'Counter-melody a third above the voice in the chorus.', Cello: 'Sustained roots and fifths — the bass foundation.', Guitar: 'Fingerpicked verses, strummed choruses.', Organ: 'Pads under everything; full stops at the final chorus.', Flute: 'Intro motif and echoes of the vocal line.', Trumpet: 'Fanfare in the intro and the final chorus only.', Harp: 'Glissandi into each chorus.', Choir: 'Unison on the refrain, four-part harmony in the final chorus.', Drums: 'Enters at Verse 1 with brushes; full kit from Chorus 2.', Viola: 'Inner harmony between violin and cello.', 'Bass Guitar': 'Root–fifth pattern locking with the percussion.',
};

/** Human-readable duration of the whole piece in seconds */
export function durationSeconds(c: Composition) { const bars = c.sections.reduce((n, s) => n + s.measures, 0); return Math.round(bars * c.beatsPerBar * 60 / c.bpm); }
