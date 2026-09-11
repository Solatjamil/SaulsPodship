/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Tier = 1 | 2 | 3;
export type DenomKey = 'catholic' | 'orthodox' | 'protestant' | 'anglican' | 'pentecostal';
export type LangKey = 'en' | 'ur' | 'hi' | 'ar';

export interface TraditionView {
  key: DenomKey;
  summary: string;
  detail?: string;
  quote?: { text: string; cite: string };
}

export interface ToughQuestion {
  id: number;
  slug: string;
  q: string;
  tier: Tier;
  region?: string;
  ref: string;
  rv: string;
  common: Record<LangKey, string>;
  views: TraditionView[];
}

export interface ArchiveItem {
  id: string;
  slug: string;
  q: string;
  a: string;
  ref: string;
  note?: string | null;
}

export interface ArchiveCategory {
  slug: string;
  name: string;
  items: ArchiveItem[];
}

export const DENOMINATIONS: Record<DenomKey, string> = {
  catholic: 'Catholic',
  orthodox: 'Orthodox',
  protestant: 'Protestant',
  anglican: 'Anglican',
  pentecostal: 'Pentecostal',
};

export const LANGUAGES: { key: LangKey; label: string; dir: 'ltr' | 'rtl' }[] = [
  { key: 'en', label: 'English', dir: 'ltr' },
  { key: 'ur', label: 'Urdu', dir: 'rtl' },
  { key: 'hi', label: 'Hindi', dir: 'ltr' },
  { key: 'ar', label: 'Arabic', dir: 'rtl' },
];

export const TIER_LABEL: Record<Tier, string> = {
  1: 'Tier 1 (Most Asked)',
  2: 'Tier 2 (Core)',
  3: 'Tier 3 (Specialised)',
};

export const CATEGORY_ICON: Record<string, string> = {
  'Law (Pentateuch)': '📜',
  'History': '🏛️',
  'Wisdom & Songs': '🎵',
  'Prophets': '⚡',
  'Gospels': '🕊️',
  'Acts': '🌍',
  'Letters': '✉️',
  'Apocalypse': '👁️',
  'Apocrypha (RV 1885/1895)': '📚',
  'Cross-Cutting Topics': '🔗',
  'Chronology & History': '⏳',
};
