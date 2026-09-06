/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoryPanel } from '../../../types';

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
  summary: string;           // 40–60 word answer-first definition (Phase 9.2 #3)
  keyFacts: string[];        // 4–6 complete, quotable sentences (Phase 9.2 #4)
  faq: VolumeFAQ[];          // 4–6 real questions + 40–80 word answers → FAQPage schema
  content: VolumeContent;
  featured?: boolean;
}
