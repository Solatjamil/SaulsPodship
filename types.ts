
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface MapPoint {
  id: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  label: string;
  description: string;
  scripture?: string;
  era: string;
  relatedStories?: string[];
}

export interface StoryPanel {
  id: string;
  title: string;
  description: string;
  scripture: string;
  imagePrompt: string;
  colorTheme: string; // Hex code for visual distinction
  era: string; // The specific biblical era
  characters?: string;
  connections?: string;
  theologicalTheme?: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string; // e.g., Patriarch, Prophet, King, Apostle
  lineage?: string;
  struggles?: string;
  significance?: string;
  description: string;
  keyActions: string[];
  relationships: string[]; // e.g., "Father of Isaac", "Husband of Sarah"
  scriptureReference: string;
  imagePrompt: string; 
}

export interface VolumeHeroImage {
  src: string;
  alt: string;
  credit?: string;
}

export interface VolumeCardImage {
  src: string;
  alt: string;
}

export interface VolumeFAQ {
  q: string;
  a: string;
}

export interface VolumeContent {
  analysis: string;
  tables?: { title: string; headers: string[]; rows: string[][] }[];
  storyPanels?: StoryPanel[];
  timeline?: { year: string; event: string; color?: string; era?: string }[];
  scriptures?: { reference: string; text: string }[];
  interactiveMapPoints?: MapPoint[];
  characterProfiles?: CharacterProfile[];
  maps?: { title: string; url: string; description: string; source?: string }[];
}

export interface Volume {
  id: string;                 // "01".."50", zero-padded
  number: number;            // 1..50
  slug: string;              // kebab-case, stable, used in the URL
  title: string;             // Exact canonical title matching across all representations
  subtitle: string;
  overview: string;          // Clean prose without "Last updated on..."
  category: "scholarly" | "devotional" | "history" | "reference";
  lastUpdated: string;       // ISO "2026-09-06"
  heroImage: VolumeHeroImage;
  cardImage: VolumeCardImage;
  metaDescription: string;   // 140–160 chars, unique per volume
  keywords: string[];
  articleLink?: string;
  youtubeLink?: string;
  youtubeStatus: "live" | "scheduled";
  youtubePublishDate?: string;
  relatedVolumes: string[];  // slugs
  summary: string;           // 40–60 word answer-first definition
  keyFacts: string[];        // 4–6 complete, quotable sentences
  faq: VolumeFAQ[];          // 4–6 real questions + 40–80 word answers
  content: VolumeContent;
  featured?: boolean;
}

export interface TheologyCategory extends Partial<Volume> {
  id: string;
  title: string;
  subtitle?: string;
  overview: string;
  articleLink?: string; // Link to detailed blog post
  youtubeLink?: string; // Link to YouTube video
  isPlaceholder?: boolean; // Flag for AdSense compliance to avoid showing ads on empty screens
  backgroundPrompt?: string; // New field for atmospheric background images
  content?: {
    analysis: string;
    scriptures?: { reference: string; text: string }[];
    infographicPrompt?: string;
    mapPrompt?: string;
    timeline?: { year: string; event: string; color?: string; era?: string }[];
    tables?: { title: string; headers: string[]; rows: string[][] }[];
    interactiveMapPoints?: MapPoint[];
    storyPanels?: StoryPanel[];
    characterProfiles?: CharacterProfile[];
    maps?: { title: string; url: string; description: string; source?: string }[];
  };
}

export interface BibleSearchResult {
  reference: string;
  text: string;
  version: string;
  hebrew?: string;
  greek?: string;
  strongs?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
