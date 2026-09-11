/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * StorySceneIcon — tiny hand-drawn SVG "scene medallions" for story panels.
 * Each glyph evokes a biblical scene with 1–3 motifs, drawn in stroke style
 * so it sits elegantly in the wine/gold scriptorium aesthetic.
 */

export type SceneGlyph =
  | 'creation' | 'garden' | 'flood' | 'tower' | 'stars' | 'fire' | 'altar'
  | 'ladder' | 'well' | 'shepherd' | 'coat' | 'sheaves' | 'basket' | 'sea'
  | 'tablets' | 'serpent' | 'walls' | 'sword' | 'scale' | 'harp' | 'temple'
  | 'scroll' | 'whirlwind' | 'lions' | 'fish' | 'star-magi' | 'manger'
  | 'dove' | 'bread' | 'cup' | 'cross' | 'tomb' | 'flame-crowd' | 'ship'
  | 'crown' | 'city' | 'tree' | 'eye' | 'book' | 'sun-moon' | 'keys';

const PATHS: Record<SceneGlyph, React.ReactNode> = {
  creation: <><circle cx="12" cy="12" r="3.2" /><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" /></>,
  garden: <><path d="M12 21v-7" /><path d="M12 14c-3.5 0-5.5-2.2-5.5-5.2 3.4-.4 5.5 1.6 5.5 5.2Z" /><path d="M12 14c3.5 0 5.5-2.2 5.5-5.2-3.4-.4-5.5 1.6-5.5 5.2Z" /><circle cx="8.2" cy="18.8" r="1" /><circle cx="14" cy="19.6" r="1" /></>,
  flood: <><path d="M3.5 15.5c1.4 1.2 3 1.2 4.4 0s3-1.2 4.4 0 3 1.2 4.4 0M3.5 19c1.4 1.2 3 1.2 4.4 0s3-1.2 4.4 0 3 1.2 4.4 0" /><path d="M6.5 12.5h11l-1.6 3h-7.8l-1.6-3Z" /><path d="M8 12.5V9.6h8v2.9M9.6 9.6V7.5h4.8v2.1" /></>,
  tower: <><path d="M8 21h8M9 21l.8-9h4.4L16 21" /><path d="M9.8 12h4.4M10.1 15h3.8" /><path d="M12 12V8.4M10.8 9.4L12 7.6l1.2 1.8" /></>,
  stars: <><path d="M6 6l.7 1.6L8.4 8.3 6.7 9 6 10.6 5.3 9 3.6 8.3 5.3 7.6 6 6Z" /><path d="M16.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" /><path d="M12 11.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" /><path d="M20 13.5a8 8 0 1 1-6.5-6.5 6.4 6.4 0 0 0 6.5 6.5Z" /></>,
  fire: <><path d="M12 21c3.6 0 6-2.4 6-5.6 0-3.8-3.6-5.5-4.4-9.4-2 1.6-2.8 3.2-2.6 5.2-1-.6-1.6-1.6-1.7-3C7.6 9.6 6 11.8 6 15.4 6 18.6 8.4 21 12 21Z" /><path d="M12 21c1.7 0 2.8-1.2 2.8-2.8 0-1.9-1.9-2.7-2.8-4.6-.9 1.9-2.8 2.7-2.8 4.6 0 1.6 1.1 2.8 2.8 2.8Z" /></>,
  altar: <><path d="M5 21h14M6.5 21v-8h11v8" /><path d="M5 13h14l-1.4-2.4H6.4L5 13Z" /><path d="M12 8.8V7M9.4 9l-.7-1.6M14.6 9l.7-1.6" /></>,
  ladder: <><path d="M7 21 17 4M7 21l.4-2.6M17 4l-2.3 1" /><path d="M8.9 15.4l3.9 1.4M10.6 11.6l3.9 1.4M12.3 7.8l3.9 1.4" /><path d="M4 4.5h.01M20 19.5h.01" strokeWidth="2.4" /></>,
  well: <><path d="M6 10h12l-1 10H7l-1-10Z" /><path d="M6 10l1.8-6h8.4L18 10" /><path d="M9.8 4v4.2M14.2 4v4.2M9.8 8.2h4.4" /><path d="M12 13.5v3.5M10.4 15.2 12 17l1.6-1.8" /></>,
  shepherd: <><circle cx="10" cy="5.6" r="1.9" /><path d="M10 7.6v7M10 14.6l-2 5M10 14.6l2 5M6.6 9l3.4-1 3.2 1.4" /><path d="M17 21c-2 0-3.2-1.3-3.2-3.2C13.8 15.6 17 14.6 17 11.4c2 1.6 2.6 3 2.6 5.6 0 2.7-1 4-2.6 4Z" /></>,
  coat: <><path d="M8.4 3.5 12 5l3.6-1.5L19 6l-1.8 2v10.5H6.8V8L5 6l3.4-2.5Z" /><path d="M12 5v13.5M9 8.2c1 .8 5 .8 6 0" /></>,
  sheaves: <><path d="M4.5 21v-7M12 21v-9M19.5 21v-6" /><path d="M2.5 12.5l2 2.5 2-2.5M10 10l2 2.5L14 10M17.5 13l2 2.5 2-2.5" /><path d="M4.5 16.5c2.5-1 2.5-5 0-6M12 14.5c2.5-1 2.5-6 0-7M19.5 17c2-1 2-4 0-4.6" /></>,
  basket: <><path d="M5.5 10h13l-1.3 10H6.8L5.5 10Z" /><path d="M8.8 10c0-4 1.5-6.2 3.2-6.2S15.2 6 15.2 10" /><path d="M5.5 10h13" /></>,
  sea: <><path d="M2.5 9c1.9 1.6 3.9 1.6 5.8 0s3.9-1.6 5.8 0 3.9 1.6 5.4.3M2.5 14c1.9 1.6 3.9 1.6 5.8 0s3.9-1.6 5.8 0 3.9 1.6 5.4.3M2.5 19c1.9 1.6 3.9 1.6 5.8 0s3.9-1.6 5.8 0 3.9 1.6 5.4.3" /><path d="M12 4.5l1 2 2.1.3-1.5 1.5.3 2.1-1.9-1-1.9 1 .3-2.1L8.9 6.8 11 6.5l1-2Z" /></>,
  tablets: <><path d="M4.6 8.5c0-2.3 1.6-3.9 3.6-3.9s3.4 1.6 3.4 3.9V21H4.6V8.5Z" /><path d="M12.4 8.5c0-2.3 1.5-3.9 3.5-3.9s3.5 1.6 3.5 3.9V21h-7V8.5Z" /><path d="M7 11h1.8M7 14h1.8M15.2 11H17M15.2 14H17" /></>,
  serpent: <><path d="M12 20V7" /><path d="M12 7c-3 .4-4.6 2-4.6 4.2" /><path d="M6 14.4c0-1.7 1.4-2.8 3-2.4l-1-2.4h3l-1.2 3" /><path d="M12 4l1.4 1.8L12 7.2 10.6 5.8 12 4Z" /></>,
  walls: <><path d="M4 21V9l4-2.5L12 9l4-2.5L20 9v12" /><path d="M8 21v-6h3v6M14.5 21v-4.5h2.5V21" /><path d="M4 12h16" /></>,
  sword: <><path d="M19 3.5 8.8 13.7M7 21l1.8-7.3 7.3-1.8" /><path d="m5 19 2-2M4.6 14.6l4.8 4.8" /></>,
  scale: <><path d="M12 3v18M7 21h10M12 6l6 1.2-1.6 4.4a2.6 2.6 0 0 1-5 0L9.8 7.2 12 6ZM12 6 6 7.2l1.6 4.4a2.6 2.6 0 0 0 5 0L14.2 7.2 12 6Z" /></>,
  harp: <><path d="M7 3.5c6 0 10 4 10 10v6" /><path d="M7 3.5v16M17 19.5H7" /><path d="M9.5 6v11M12 8v9M14.5 10.5v6.5" /></>,
  temple: <><path d="M12 3 3.8 8h16.4L12 3Z" /><path d="M5.6 8v11M9.4 8v11M14.6 8v11M18.4 8v11" /><path d="M3.8 21h16.4M3.8 19h16.4" /></>,
  scroll: <><path d="M6.5 4.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11" /><path d="M6.5 4.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2c1.6 0 1.6-2 0-2V6.5c1.6 0 1.6-2 0-2Z" /><path d="M10 9h7M10 12.5h7M10 16h4" /></>,
  whirlwind: <><path d="M4 6c5-2.5 11-2.5 16 0M5.5 9.5c4-2 9-2 13 0M7 13c3-1.5 7-1.5 10 0M8.5 16.5c2-1 5-1 7 0M10 20c1.3-.7 2.7-.7 4 0" /><path d="M17.5 3.5 12 8l3-5.5M6.5 4.5 12 8 7.8 2.6" /></>,
  lions: <><path d="M12 20c-4 0-6.5-2.6-6.5-6 0-3 1.6-5 3-6.6" /><path d="M12 20c4 0 6.5-2.6 6.5-6 0-3-1.6-5-3-6.6" /><path d="M8.5 7.4C10 6.4 14 6.4 15.5 7.4" /><path d="M12 10.5v3M9.6 12.6c1.6 1.2 3.2 1.2 4.8 0" /><path d="M12 2.5v3M9.2 4l2.8 1.5L14.8 4" /></>,
  fish: <><path d="M3.5 12c4.6-4.8 10.4-4.8 14.5 0-4.1 4.8-9.9 4.8-14.5 0Z" /><path d="M18 12l2.5-2.6v5.2L18 12Z" /><circle cx="7.5" cy="11.4" r=".8" fill="currentColor" /></>,
  "star-magi": <><path d="M12 2.5l1.4 3.6 3.6 1.3-3.6 1.4-1.4 3.5-1.4-3.5-3.6-1.4 3.6-1.3L12 2.5Z" /><path d="M5 21c4.5-4 9.5-4.6 14-4.6" /><path d="M8.5 13.5v3.6M15 11.5v3.4M11.8 15v2.4" /></>,
  manger: <><path d="M4.5 16.5h15L17 21H7l-2.5-4.5Z" /><path d="M7 16.5c1-4 3-6.5 5-8 2 1.5 4 4 5 8" /><circle cx="12" cy="12" r="1.5" /><path d="M12 4v1.6M10 5.4l.9 1.3M14 5.4l-.9 1.3" /></>,
  dove: <><path d="M20 5.5c-2.5.2-4.6 1-6.3 2.4L4 15.8l4.8-.8 1.6 3.2 2.2-4.2c2.9-.6 5.4-3 7.4-8.5Z" /><path d="M8.8 15l-1.2 3.8M12 11.2c-.5-1.6.3-2.9 1.8-3.6" /><path d="M4 7.5c1-1.6 2.6-2.6 4.4-2.8" /></>,
  bread: <><path d="M4 10.5C4 7.6 7.6 5.5 12 5.5s8 2.1 8 5V17c0 1.4-1.1 2.5-2.5 2.5h-11A2.5 2.5 0 0 1 4 17v-6.5Z" /><path d="M9 7.8c.6.8.6 1.6 0 2.4M12 7v3.2M15 7.8c-.6.8-.6 1.6 0 2.4" /><path d="M4 12.5c2.7 1.4 13.3 1.4 16 0" /></>,
  cup: <><path d="M7 4.5h10l-.8 6.8a4.4 4.4 0 0 1-8.4 0L7 4.5Z" /><path d="M12 18v2.5M8.5 20.5h7" /><path d="M9.6 8c1.6 1 3.2 1 4.8 0" /></>,
  cross: <><path d="M12 3v18M6.5 8.5h11" /><path d="M4.5 21h15" /><path d="M9 5.5c2-2 4-2 6 0" /></>,
  tomb: <><path d="M4 21V11a8 8 0 0 1 16 0v10" /><path d="M12 21v-6.5a2.4 2.4 0 0 1 2.4-2.4H15" /><path d="M4 13.5c2.7-1 13.3-1 16 0" /><path d="M17 5.5 19.5 3M20.5 7.5H23" /></>,
  "flame-crowd": <><path d="M12 3.5l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1 1-2.4Z" /><path d="M8.2 9.6c1 2.4.4 4-1.2 5.4M15.8 9.6c-1 2.4-.4 4 1.2 5.4M12 10.5v4.5" /><path d="M4.5 20.5c1.5-2 2.6-2.8 3.4-4.4M12 20.5c0-2.5.6-4 1.8-5.5M19.5 20.5c-1.3-2-2.2-2.8-2.9-4.2" /></>,
  ship: <><path d="M4 15h16l-2.4 5H6.4L4 15Z" /><path d="M12 15V3M12 3l5 4-5 2.4M12 3 7 7l5 2.4" /><path d="M2.5 21c2-1.4 4-1.4 6 0M15.5 21c2-1.4 4-1.4 6 0" /></>,
  crown: <><path d="M4 18.5h16M4.5 8l3.5 3L12 5l4 6 3.5-3-1 7.5h-13L4.5 8Z" /><circle cx="12" cy="19.6" r=".8" fill="currentColor" /></>,
  city: <><path d="M3.5 21V11h5v10M15.5 21V8h5v13" /><path d="M8.5 21v-7h7v7" /><path d="M10.8 17h2.4M10.8 14.2h2.4" /><path d="M12 2.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z" /></>,
  tree: <><path d="M12 21v-6" /><path d="M12 15c-4.4 0-7.5-2.4-7.5-5.6C4.5 6 7.7 3.5 12 3.5s7.5 2.5 7.5 5.9c0 3.2-3.1 5.6-7.5 5.6Z" /><path d="M12 3.5V2M12 21h-2.5M12 21h2.5" /></>,
  eye: <><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.8" /><path d="M12 3v1.5M4.2 5l1 1.1M19.8 5l-1 1.1" /></>,
  book: <><path d="M12 6.5C10 4.5 6.8 4.4 3.5 5v13.6c3.3-.6 6.5-.5 8.5 1.4 2-1.9 5.2-2 8.5-1.4V5c-3.3-.6-6.5-.5-8.5 1.5Z" /><path d="M12 6.5V20" /></>,
  "sun-moon": <><circle cx="8.5" cy="12" r="4.6" /><path d="M8.5 4v1.4M8.5 18.6V20M4.4 8 3 6.6M12.6 8 14 6.6M3.9 12H2.5M16.1 8 14.7 6.6" /><path d="M21.5 14.5a4.6 4.6 0 0 1-4.6 4.6h-.8a5.2 5.2 0 0 0 3.4-8.8 4.6 4.6 0 0 1 2 4.2Z" /></>,
  keys: <><circle cx="7" cy="7" r="3.2" /><path d="M9.4 9.2 20 19.8M16.6 16.4l1.8-1.8M18.4 18.2l1.8-1.8" /><circle cx="17" cy="7" r="2.4" /><path d="M14.9 8.9 8.6 15.2" /></>,
};

const KEYWORD_MAP: [RegExp, SceneGlyph][] = [
  [/creat|light of day|beginning|firmament|eden's founding/i, 'creation'],
    [/\bgarden of eden\b|\beden\b|\badam\b|\beve\b|forbidden fruit|fig tree|the fall\b|nakedness/i, 'garden'],
  [/noah|flood|ark|rainbow|dove of noah/i, 'flood'],
  [/babel|tower/i, 'tower'],
  [/astronom|signs in the (sky|heavens)|stars/i, 'stars'],
  [/fire|fiery|burning bush|sodom|flame|judgment by fire|glory cloud|furnace|& lot|and lot\b/i, 'fire'],
  [/circumcision|covenant of the sign/i, 'scroll'],
  [/martyr|ston(e|ing)d?|stephen/i, 'sword'],
  [/conversion|damascus|filled with the holy/i, 'dove'],
  [/birth of (jesus|christ)|virgin birth|bethlehem's stable/i, 'manger'],
  [/sacrifice|isaac|altar|lamb of abraham/i, 'altar'],
  [/jacob|ladder|bethel|wrestl/i, 'ladder'],
  [/well|rebekah|servant's journey/i, 'well'],
  [/goliath|valley of elah/i, 'sword'],
  [/shepherd|david's youth|ruth|boaz/i, 'shepherd'],
  [/coat|joseph's favoritism|favoritism/i, 'coat'],
  [/joseph|potiphar|sold into egypt/i, 'sheaves'],
  [/sheaf|sheaves|dream of joseph|prison dream|egypt's dreams/i, 'sheaves'],
  [/moses' birth|basket|nile|pharaoh's daughter/i, 'basket'],
  [/red sea|exodus|escape|sea part|wilderness crossing/i, 'sea'],
  [/law|sinai|commandment|tablets|torah covenant/i, 'tablets'],
  [/serpent|bronze|nehushtan/i, 'serpent'],
  [/jericho|walls|conquest/i, 'walls'],
  [/sword|war|battle|gideon|jephthah|david vs|goliath/i, 'sword'],
  [/judge|deborah|balance|justice|deborah's song/i, 'scale'],
  [/harp|music|psalm sing|worship instrument/i, 'harp'],
  [/temple|solomon's build|dedicat/i, 'temple'],
  [/scroll|scribe|ezra read|book of the law|word of god|scriptur/i, 'scroll'],
  [/elijah|whirlwind|chariot of fire|carmel/i, 'whirlwind'],
  [/daniel|lions/i, 'lions'],
  [/jonah|whale|great fish/i, 'fish'],
  [/magi|wise men|star of betlehem|star of the magi/i, 'star-magi'],
  [/manger|nativity|jesus' birth|christmas/i, 'manger'],
  [/spirit descend|dove at baptism|baptism|holy spirit/i, 'dove'],
  [/bread|feed|manna|loaves|supper's bread|eucharist|last supper/i, 'bread'],
  [/cup|blood of the covenant|communion/i, 'cup'],
  [/cross|crucifix|calvary|passion|good friday/i, 'cross'],
  [/resurrect|empty tomb|third day/i, 'tomb'],
  [/pentecost|tongues/i, 'flame-crowd'],
  [/paul's journey|ship|voyage|missionary travel|storm/i, 'ship'],
  [/kingdom|crown|reign|royal|solomon enthroned|davids throne|throne/i, 'crown'],
  [/new jerusalem|city|zion rebuilt|wall of the city/i, 'city'],
  [/family|lineage|genealog|tree of life| Seth|noah's line|abraham's line/i, 'tree'],
  [/watcher|angel(s)? (see|watch)|enoch (saw|vision)|nephilim/i, 'eye'],
  [/sun.*moon|darkening|eclipse|celestial|day of the lord/i, 'sun-moon'],
  [/key|authority of the keys|gate/i, 'keys'],
];

export function sceneForStory(title: string, era = '', extra = ''): SceneGlyph {
  const hay = `${title} ${era} ${extra}`;
  for (const [re, glyph] of KEYWORD_MAP) if (re.test(hay)) return glyph;
  return 'book';
}

interface Props {
  glyph: SceneGlyph;
  size?: number;
  accent?: string;   // e.g. panel.colorTheme
  className?: string;
}

export const StorySceneIcon: React.FC<Props> = ({ glyph, size = 44, accent, className = '' }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full shrink-0 border ${className}`}
    style={{
      width: size, height: size,
      borderColor: 'rgba(212,175,55,.45)',
      background: 'linear-gradient(160deg, rgba(74,21,44,.06), rgba(212,175,55,.14))',
      color: accent || '#4A152C',
    }}
    aria-hidden="true"
  >
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[glyph] || PATHS.book}
    </svg>
  </span>
);

export default StorySceneIcon;
