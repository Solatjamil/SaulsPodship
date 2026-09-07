/**
 * Type declarations for the framework-free canvas engine (engine/index.js).
 * Hand-written so the module ships TypeScript support without a build step.
 */

export type CrossRefLayout = 'horseshoe' | 'circle' | 'linear';
export type CrossRefTheme = 'rainbow' | 'scriptorium' | 'podship';
export type CrossRefColorMode = 'distance' | 'confidence' | 'testament';
export type CrossRefScope = 'all' | 'otnt' | 'ot' | 'nt';

export interface VizSelection {
  type: 'chapter' | 'verse' | 'book';
  index: number;
  label: string;
  refs?: number;
}

export interface CrossRefVizOptions {
  baseUrl?: string;
  theme?: CrossRefTheme;
  layout?: CrossRefLayout;
  colorMode?: CrossRefColorMode;
  minWeight?: number;
  scope?: CrossRefScope;
  curve?: number;
  intro?: boolean;
  panel?: boolean;
  corridor?: [number, number];
  onSelect?: (selection: VizSelection) => void;
}

export interface VizStats {
  books: number;
  chapters: number;
  verses: number;
  references: number;
  arcs: number;
  otToNt: number;
  maxArcWeight: number;
}

export declare class CrossRefViz {
  constructor(container: HTMLElement | string, options?: CrossRefVizOptions);
  readonly state: {
    meta: { stats: VizStats; books: Array<{ n: string; a: string; t: 0 | 1; c: number; v: number }> } | null;
    style: {
      theme: CrossRefTheme; layout: CrossRefLayout; colorMode: CrossRefColorMode;
      minWeight: number; scope: CrossRefScope; corridor: [number, number] | null;
    };
    selection: { chapter: number | null; book: number | null; verse: number | null };
    buckets: { visible: number } | null;
  };
  init(): Promise<this>;
  setLayout(layout: CrossRefLayout, animate?: boolean): void;
  setTheme(theme: CrossRefTheme): void;
  setColorMode(mode: CrossRefColorMode): void;
  setMinWeight(minReferences: number): void;
  setScope(scope: CrossRefScope): void;
  setCorridor(bookA: number | null, bookB: number | null): void;
  selectChapter(chapterIndex: number, opts?: { tab?: 'out' | 'in' | 'verses'; silent?: boolean }): void;
  selectVerse(globalVerseIndex: number): Promise<void>;
  selectBook(bookIndex: number): void;
  clearSelection(): void;
  setPanelTab(tab: 'out' | 'in' | 'verses'): void;
  search(query: string): boolean;
  suggest(query: string, limit?: number): Array<{ label: string; meta: string; query: string }>;
  resetView(): void;
  replay(): void;
  toggleFullscreen(): void;
  exportPNG(fileName?: string): Promise<void>;
  destroy(): void;
}

export declare const THEMES: Record<CrossRefTheme, { label: string; hint: string }>;
export declare const COLOR_MODES: Record<CrossRefColorMode, { label: string; hint: string }>;
export declare const LAYOUTS: Record<CrossRefLayout, { label: string; hint: string }>;
export declare const WORLD: { w: number; h: number };
