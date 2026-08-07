
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

export interface TheologyCategory {
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
