/**
 * index.js — CrossRefViz: the interactive Bible cross-reference module.
 *
 *   const viz = new CrossRefViz(el, { baseUrl: '/bible-crossrefs', theme: 'rainbow' });
 *   await viz.init();
 *
 * Framework-free (ES module, no dependencies). React wrapper: ../components/BibleCrossReferences.tsx
 */

import {
  loadMeta, loadLinks, loadBookRefs, loadBookText,
  buildBookIndex, parseReference, resolveReference,
} from './data.js';
import {
  WORLD, LAYOUTS, buildScale, computeLayout, morphLayouts, computeArcGeometry, chapterAtT, controlPoint,
} from './geometry.js';
import {
  THEMES, COLOR_MODES, assignBuckets, paintArcs, paintRevealStep, paintMorphFrame, buildMorphSample,
  paintChrome, paintHighlights, clearCanvas, applyView, fitView, screenToWorld, worldToScreen, versePoint,
  NUM_BUCKETS,
} from './render.js';
import { buildUI } from './ui.js';
import { injectStyles } from './styles.js';

const nf = (n) => Number(n).toLocaleString('en-US');
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export class CrossRefViz {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) throw new Error('CrossRefViz: container not found');
    const o = this.options = {
      baseUrl: 'bible-crossrefs',
      theme: 'rainbow',
      layout: 'horseshoe',
      colorMode: 'distance',
      minWeight: 2,
      scope: 'all',
      curve: 0.26,
      intro: true,
      panel: true,
      onSelect: null,
      ...options,
    };

    this.state = {
      meta: null, links: null, scale: null, layouts: {}, layout: null, geo: null,
      buckets: null, view: { k: 1, x: 0, y: 0, home: { k: 1, x: 0, y: 0 } },
      size: { width: 0, height: 0 }, dpr: 1, theme: THEMES[o.theme] || THEMES.rainbow,
      style: {
        theme: o.theme, layout: o.layout, colorMode: o.colorMode,
        minWeight: o.minWeight, scope: o.scope, corridor: null, curve: o.curve,
      },
      hoverChapter: null, reveal: 1, verseThreads: [],
      selection: { chapter: null, book: null, verse: null, tab: 'out' },
    };

    this._reduceMotion = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
    if (this._reduceMotion) this.options.intro = false;
    this._baseDirty = true;
    this._overlayDirty = true;
    this._raf = 0;
    this._morph = null;
    this._intro = null;
    this._gesture = null;
    this._destroyed = false;
  }

  /* ------------------------------------------------------------------ setup */

  async init() {
    injectStyles(this.container.ownerDocument || (typeof document !== 'undefined' ? document : null));
    this.ui = buildUI(this.container, this);
    this.stage = this.ui.els.stage;
    this.baseCanvas = this.ui.els.base;
    this.overCanvas = this.ui.els.over;
    this.ctxBase = this.baseCanvas.getContext('2d');
    this.ctxOver = this.overCanvas.getContext('2d');
    this.blit = document.createElement('canvas');
    this.ctxBlit = this.blit.getContext('2d');
    this.state.baseCanvas = this.baseCanvas;
    this.state.overCanvas = this.overCanvas;
    this.state.ctxBase = this.ctxBase;
    this.state.ctxOver = this.ctxOver;

    this.ui.setLoader(true, 'Loading the concordance\u2026');
    try {
      const [meta, links] = await Promise.all([loadMeta(this.options.baseUrl), loadLinks(this.options.baseUrl)]);
      this.state.meta = meta;
      this.state.links = links;
      this.bookIndex = buildBookIndex(meta);
      this.state.scale = buildScale(meta, { gapVerses: 10 });
      for (const key of Object.keys(LAYOUTS)) this.state.layouts[key] = computeLayout(this.state.scale, key);
      this.state.layout = this.state.layouts[this.state.style.layout];
    } catch (err) {
      this.ui.setLoader(false);
      this.ui.els.panel.innerHTML = `<div class="spcr__panel-scroll"><h2 class="spcr__title">Could not load the data</h2>
        <p class="spcr__lede">${String(err && err.message || err)}</p>
        <p class="spcr__foot">Make sure <code>meta.json</code> and <code>links.bin</code> are served from
        <code>${this.options.baseUrl}</code>.</p></div>`;
      this.ui.els.panel.classList.add('is-open');
      throw err;
    }

    this._resize();
    this._observe();
    this._bindPointer();
    this._bindKeyboard();
    this._hintTimer = setTimeout(() => this.ui.els.hint.classList.add('is-hidden'), 14000);
    assignBuckets(this.state);
    this._syncLinearScale();
    this.state.geo = computeArcGeometry(this.state.layout, this.state.links, this.state.style.curve);
    this.ui.syncControls(this.state.style);
    this._updateStatus();
    this._updateLegend();
    this.ui.setLoader(false);
    if (this.options.panel) this.ui.renderIntro();
    fitView(this.state);
    this._snapshotBlit();

    if (this.options.intro) this.replay();
    else this._wake();
    return this;
  }

  _observe() {
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this.stage);
    this._onFullscreen = () => this._resize();
    document.addEventListener('fullscreenchange', this._onFullscreen);
  }

  _resize() {
    const rect = this.stage.getBoundingClientRect();
    const w = Math.max(320, Math.round(rect.width));
    const h = Math.max(260, Math.round(rect.height));
    const dpr = Math.min(2.5, window.devicePixelRatio || 1);
    this.state.size = { width: w, height: h };
    this.state.dpr = dpr;
    for (const c of [this.baseCanvas, this.overCanvas, this.blit]) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      if (c !== this.blit) { c.style.width = `${w}px`; c.style.height = `${h}px`; }
    }
    fitView(this.state);
    this._baseDirty = true;
    this._paint = null;
    this._overlayDirty = true;
    this._snapshotBlit();
    this._wake();
  }

  /* ------------------------------------------------------- render scheduling */

  _wake() {
    if (this._destroyed) return;
    if (!this._raf) this._raf = requestAnimationFrame(this._frame);
  }

  _frame = () => {
    this._raf = 0;
    if (this._destroyed) return;
    const s = this.state;
    let more = false;

    if (this._intro) {
      const t = Math.min(1, (performance.now() - this._intro.t0) / this._intro.dur);
      const prev = s.reveal;
      s.reveal = easeOut(t);
      if (s.reveal > prev || prev === 0) {
        const cut = s.reveal * s.meta.chapterCount;
        paintRevealStep(s, cut);
        more = true;
      }
      if (t >= 1) {
        this._intro = null;
        s.reveal = 1;
        this._baseDirty = true;
        this._paint = null;
        this._updateStatus();
      }
      this._overlayDirty = true;
    }

    if (this._morph) {
      const m = this._morph;
      const t = Math.min(1, (performance.now() - m.t0) / m.dur);
      const k = easeInOut(t);
      s.layout = morphLayouts(m.A, m.B, k);
      paintMorphFrame(s, m.sample, k);
      this._overlayDirty = true;
      more = true;
      if (t >= 1) {
        this._morph = null;
        s.layout = m.B;
        s.style.layout = m.B.key;
        this.state.geo = computeArcGeometry(s.layout, s.links, s.style.curve);
        this._baseDirty = true;
        this._paint = null;
        fitView(s);
      }
    }

    if (this._baseDirty) {
      const done = paintArcs(s, this._morph ? 6 : 13);
      if (done) {
        this._baseDirty = false;
        this._snapshotBlit();
      } else more = true;
      this._overlayDirty = true;
    }

    if (this._overlayDirty) {
      clearCanvas(this.ctxOver, this.overCanvas, null, s.dpr);
      if (!s.layout.morphing) {
        paintChrome(s);
        paintHighlights(s);
      }
      this._overlayDirty = false;
    }

    if (more) this._wake();
  };

  _snapshotBlit() {
    const s = this.state;
    if (!this.blit.width) return;
    this.ctxBlit.setTransform(1, 0, 0, 1, 0, 0);
    this.ctxBlit.clearRect(0, 0, this.blit.width, this.blit.height);
    this.ctxBlit.drawImage(this.baseCanvas, 0, 0);
    this.blitView = { k: s.view.k, x: s.view.x, y: s.view.y };
  }

  _blit() {
    const s = this.state;
    if (!this.blitView) return;
    const dpr = s.dpr;
    const ratio = s.view.k / this.blitView.k;
    const ctx = this.ctxBase;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.baseCanvas.width, this.baseCanvas.height);
    ctx.setTransform(
      ratio, 0, 0, ratio,
      dpr * s.view.x - dpr * this.blitView.x * ratio,
      dpr * s.view.y - dpr * this.blitView.y * ratio,
    );
    ctx.drawImage(this.blit, 0, 0, this.blit.width / dpr, this.blit.height / dpr);
  }

  /* ------------------------------------------------------------- public API */

  setLayout(key, animate = true) {
    if (!LAYOUTS[key] || !this.state.layout) return;
    const B = this.state.layouts[key];
    if (this.state.style.layout === key && !this._morph) return;
    if (!animate || this._reduceMotion || this.state.layout.morphing) {
      this._morph = null;
      this.state.layout = B;
      this.state.style.layout = key;
      this.state.geo = computeArcGeometry(B, this.state.links, this.state.style.curve);
      fitView(this.state);
      this._baseDirty = true; this._paint = null; this._overlayDirty = true;
      this._wake();
      this._updateStatus();
      return;
    }
    const A = this.state.layouts[this.state.style.layout];
    this._morph = { A, B, t0: performance.now(), dur: this._reduceMotion ? 1 : 900, sample: buildMorphSample(this.state, A, B) };
    this.state.style.layout = key;
    this.ui.syncControls(this.state.style);
    this._wake();
  }

  setTheme(name) {
    if (!THEMES[name]) return;
    this.state.style.theme = name;
    this.state.theme = THEMES[name];
    this.container.dataset.theme = name;
    assignBuckets(this.state);
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this.ui.syncControls(this.state.style);
    this._updateStatus();
    this._wake();
  }

  setColorMode(mode) {
    if (!COLOR_MODES[mode]) return;
    this.state.style.colorMode = mode;
    assignBuckets(this.state);
    this._syncLinearScale();
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this._updateStatus(); this._updateLegend();
    this._wake();
  }

  setMinWeight(w) {
    this.state.style.minWeight = Math.max(1, Math.min(12, +w || 1));
    assignBuckets(this.state);
    this._syncLinearScale();
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this._updateStatus();
    this._wake();
  }

  setScope(scope) {
    this.state.style.scope = scope;
    assignBuckets(this.state);
    this._syncLinearScale();
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this._updateStatus(); this._updateLegend();
    this._wake();
  }

  setCorridor(a, b) {
    this.state.style.corridor = a == null || b == null ? null : [a, b];
    assignBuckets(this.state);
    this._syncLinearScale();
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this._updateStatus();
    this._wake();
    if (this.state.style.corridor) this._renderCorridor(a, b);
    else if (this.state.selection.chapter == null && this.state.selection.book == null && this.options.panel) {
      this.ui.renderIntro();
    }
  }

  resetView() {
    fitView(this.state);
    this._baseDirty = true; this._paint = null; this._overlayDirty = true;
    this._wake();
  }

  replay() {
    const s = this.state;
    clearCanvas(this.ctxBase, this.baseCanvas, s.theme, s.dpr);
    applyView(this.ctxBase, s, s.dpr);
    s.reveal = 0;
    this._intro = { t0: performance.now(), dur: 3200 };
    s._revealCur = new Int32Array(NUM_BUCKETS);
    this._baseDirty = false;
    this._paint = null;
    this._updateStatus('weaving');
    this._wake();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) this.container.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /** Render the current view to a 2x PNG poster and download it. */
  async exportPNG(fileName = 'bible-cross-references.png', factor = 2) {
    const s = this.state;
    const { width, height } = s.size;
    const saved = {
      dpr: s.dpr, baseCanvas: s.baseCanvas, overCanvas: s.overCanvas,
      ctxBase: s.ctxBase, ctxOver: s.ctxOver,
      realBase: this.baseCanvas, realOver: this.overCanvas,
      realCtxBase: this.ctxBase, realCtxOver: this.ctxOver,
    };
    const off = document.createElement('canvas');
    off.width = Math.round(width * factor);
    off.height = Math.round(height * factor);
    const octx = off.getContext('2d');
    try {
      // Paint the whole scene into the offscreen surface at higher resolution.
      s.baseCanvas = off; s.overCanvas = off; s.ctxBase = octx; s.ctxOver = octx;
      this.ctxBase = octx; this.ctxOver = octx;
      s.dpr = factor;
      this._paint = null;
      let guard = 0;
      while (!paintArcs(s, 2000) && guard++ < 400) { /* synchronous poster render */ }
      if (!s.layout.morphing) { paintChrome(s); paintHighlights(s); }
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.font = `600 ${13 * factor}px "Iowan Old Style",Georgia,serif`;
      octx.fillStyle = s.theme.ink;
      octx.globalAlpha = 0.8;
      const cap = `${nf(s.meta.stats.references)} cross-references \u00b7 ${nf(s.buckets.visible)} shown \u00b7 saulspodship.com \u00b7 data: openbible.info (CC-BY), KJV`;
      octx.fillText(cap, 20 * factor, (height - 18) * factor);
      octx.globalAlpha = 1;

      const url = off.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      s.dpr = saved.dpr; s.baseCanvas = saved.baseCanvas; s.overCanvas = saved.overCanvas;
      s.ctxBase = saved.ctxBase; s.ctxOver = saved.ctxOver;
      this.baseCanvas = saved.realBase; this.overCanvas = saved.realOver;
      this.ctxBase = saved.realCtxBase; this.ctxOver = saved.realCtxOver;
      this._paint = null;
      this._baseDirty = true;
      this._overlayDirty = true;
      this._wake();
    }
  }

  /** Keep the linear plate's height normalised to the longest visible thread. */
  _syncLinearScale() {
    const s = this.state;
    const lin = s.layouts.linear;
    if (!lin || !s.buckets) return;
    const pxPerChapter = lin.span / s.meta.chapterCount;
    lin.distMaxPx = Math.max(60, s.buckets.maxDist * pxPerChapter);
    if (s.layout && s.layout.key === 'linear' && !s.layout.morphing) {
      s.geo = computeArcGeometry(s.layout, s.links, s.style.curve);
      this._baseDirty = true;
      this._paint = null;
    }
  }

  /* --------------------------------------------------------------- selection */

  selectChapter(idx, opts = {}) {
    const s = this.state;
    if (idx == null || idx < 0 || idx >= s.meta.chapterCount) return;
    this.ui.els.hint.classList.add('is-hidden');
    s.selection = { chapter: idx, book: null, verse: null, tab: opts.tab || s.selection.tab || 'out' };
    s.verseThreads = [];
    const out = [];
    for (let i = s.links.outStart[idx]; i < s.links.outStart[idx + 1]; i++) {
      out.push({ dst: s.links.dst[i], w: s.links.weight[i], v: s.links.votes[i] });
    }
    const inn = [];
    for (let k = s.links.inStart[idx]; k < s.links.inStart[idx + 1]; k++) {
      const i = s.links.inIndex[k];
      inn.push({ src: s.links.src[i], w: s.links.weight[i], v: s.links.votes[i] });
    }
    out.sort((a, b) => b.w - a.w);
    inn.sort((a, b) => b.w - a.w);
    const maxW = Math.max(1, out[0]?.w || 0, inn[0]?.w || 0);
    this._sel = { chapter: idx, out, inn, maxW, verses: null, tab: s.selection.tab };
    this.ui.renderChapter(this._sel);
    this.baseCanvas.parentElement.classList.add('has-selection');
    this._overlayDirty = true;
    this._wake();
    if (opts.tab === 'verses') this._loadVerses(idx);
    this.options.onSelect?.({ type: 'chapter', index: idx, label: s.meta.chapterLabel[idx] });
    if (!opts.silent) this._focusViewOn(idx);
  }

  setPanelTab(tab) {
    const s = this.state;
    if (!this._sel || s.selection.chapter == null) return;
    s.selection.tab = tab;
    this._sel.tab = tab;
    if (tab === 'verses' && !this._sel.verses) { this.ui.renderChapter(this._sel); this._loadVerses(s.selection.chapter); }
    else this.ui.renderChapter(this._sel);
  }

  async _loadVerses(chapterIdx) {
    const s = this.state;
    const b = s.meta.bookOf[chapterIdx];
    const [refs, text] = await Promise.all([loadBookRefs(s.meta, b), loadBookText(s.meta, b)]);
    if (!this._sel || s.selection.chapter !== chapterIdx) return;
    const bookVerseOffset = s.meta.books[b].o;
    const start = s.meta.verseOffset[chapterIdx];
    const count = s.meta.verseCount[chapterIdx];
    const byVerse = new Map();
    for (let i = 0; i < refs.v.length; i++) {
      const localVerse = refs.v[i];
      const gv = bookVerseOffset + localVerse;
      if (gv < start || gv >= start + count) continue;
      let list = byVerse.get(gv);
      if (!list) { list = []; byVerse.set(gv, list); }
      list.push({ verse: refs.t[i], end: refs.e[i], votes: refs.w[i], label: this._verseLabel(refs.t[i], refs.e[i]) });
    }
    const verses = [];
    for (let gv = start; gv < start + count; gv++) {
      const list = byVerse.get(gv) || [];
      list.sort((a, b2) => b2.votes - a.votes);
      verses.push({ idx: gv, no: gv - start + 1, text: text[gv - bookVerseOffset] || '', refs: list });
    }
    this._sel.verses = verses;
    if (s.selection.tab === 'verses') this.ui.renderChapter(this._sel);
  }

  _verseLabel(gv, ge) {
    const s = this.state;
    const c = s.meta.chapterOfVerse[gv];
    const v = gv - s.meta.verseOffset[c] + 1;
    const base = `${s.meta.books[s.meta.bookOf[c]].a} ${s.meta.chapNum[c]}:${v}`;
    if (ge && ge !== gv) {
      const c2 = s.meta.chapterOfVerse[ge];
      const v2 = ge - s.meta.verseOffset[c2] + 1;
      return c2 === c ? `${base}\u2013${v2}` : `${base}\u2013${s.meta.books[s.meta.bookOf[c2]].a} ${s.meta.chapNum[c2]}:${v2}`;
    }
    return base;
  }

  async selectVerse(globalVerse) {
    const s = this.state;
    if (globalVerse == null || globalVerse < 0) return;
    const chapterIdx = s.meta.chapterOfVerse[globalVerse];
    if (s.selection.chapter !== chapterIdx) {
      this.selectChapter(chapterIdx, { tab: 'verses', silent: true });
      await this._loadVerses(chapterIdx);
    }
    s.selection.verse = globalVerse;
    s.selection.tab = 'verses';
    if (this._sel) { this._sel.tab = 'verses'; this.ui.renderChapter(this._sel); }
    const b = s.meta.bookOf[chapterIdx];
    const refs = await loadBookRefs(s.meta, b);
    const local = globalVerse - s.meta.books[b].o;
    const threads = [];
    for (let i = 0; i < refs.v.length; i++) {
      if (refs.v[i] !== local) continue;
      const p1 = versePoint(s, globalVerse);
      const midTarget = refs.e[i] && refs.e[i] !== refs.t[i] ? Math.round((refs.t[i] + refs.e[i]) / 2) : refs.t[i];
      const p2 = versePoint(s, midTarget);
      const cp = controlPoint(s.layout, p1[0], p1[1], p2[0], p2[1], s.style.curve);
      threads.push([p1[0], p1[1], p2[0], p2[1], cp[0], cp[1]]);
    }
    s.verseThreads = threads;
    this._overlayDirty = true;
    this._wake();
    const panelVerse = this._sel?.verses?.find((v) => v.idx === globalVerse);
    if (panelVerse) {
      const el = this.ui.els.panel.querySelector(`[data-verse="${globalVerse}"]`);
      el?.closest('.spcr__verse')?.classList.add('is-active');
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    this.options.onSelect?.({ type: 'verse', index: globalVerse, label: this._verseLabel(globalVerse), refs: threads.length });
  }

  selectBook(bookIdx) {
    const s = this.state;
    const bk = s.meta.books[bookIdx];
    if (!bk) return;
    s.selection = { chapter: null, book: bookIdx, verse: null, tab: 'out' };
    s.verseThreads = [];
    const partners = new Map();
    let total = 0;
    for (let c = bk.co; c < bk.co + bk.c; c++) {
      for (let i = s.links.outStart[c]; i < s.links.outStart[c + 1]; i++) {
        const pb = s.meta.bookOf[s.links.dst[i]];
        if (pb === bookIdx) continue;
        partners.set(pb, (partners.get(pb) || 0) + s.links.weight[i]);
        total += s.links.weight[i];
      }
      for (let k = s.links.inStart[c]; k < s.links.inStart[c + 1]; k++) {
        const i = s.links.inIndex[k];
        const pb = s.meta.bookOf[s.links.src[i]];
        if (pb === bookIdx) continue;
        partners.set(pb, (partners.get(pb) || 0) + s.links.weight[i]);
        total += s.links.weight[i];
      }
    }
    const list = [...partners.entries()].map(([book, w]) => ({ book, w })).sort((a, b) => b.w - a.w);
    this._sel = { book: bookIdx, partners: list, total, maxW: Math.max(1, list[0]?.w || 1) };
    this.ui.renderBook(this._sel);
    this.baseCanvas.parentElement.classList.add('has-selection');
    this._overlayDirty = true;
    this._wake();
    this.options.onSelect?.({ type: 'book', index: bookIdx, label: bk.n });
  }

  clearSelection() {
    const s = this.state;
    s.selection = { chapter: null, book: null, verse: null, tab: 'out' };
    s.verseThreads = [];
    this._sel = null;
    this.baseCanvas.parentElement.classList.remove('has-selection');
    this.ui.renderIntro();
    this._overlayDirty = true;
    this._wake();
  }

  _renderCorridor(a, b) {
    const s = this.state;
    const pairs = new Map();
    let total = 0;
    for (let i = 0; i < s.links.count; i++) {
      const ba = s.meta.bookOf[s.links.src[i]];
      const bb = s.meta.bookOf[s.links.dst[i]];
      const ok = (ba === a && bb === b) || (ba === b && bb === a);
      if (!ok) continue;
      const key = `${s.links.src[i]}|${s.links.dst[i]}`;
      pairs.set(key, (pairs.get(key) || 0) + 1);
      total += s.links.weight[i];
    }
    const list = [...pairs.entries()].map(([k, n]) => {
      const [c1, c2] = k.split('|').map(Number);
      return { s: c1, d: c2, n };
    }).sort((x, y) => y.n - x.n);
    const maxW = Math.max(1, list[0]?.n || 1);
    this.ui.els.panel.innerHTML = `
      <header class="spcr__panel-head">
        <div>
          <p class="spcr__eyebrow">Corridor isolated</p>
          <h2 class="spcr__title">${s.meta.books[a].n} \u2194 ${s.meta.books[b].n}</h2>
          <p class="spcr__subtitle">${nf(total)} verse references \u00b7 ${nf(list.length)} chapter pairs</p>
        </div>
        <button type="button" class="spcr__close" data-pick="clearcorridor" aria-label="Clear">\u2715</button>
      </header>
      <div class="spcr__panel-scroll"><div class="spcr__rows">
        ${list.slice(0, 200).map((r) => `<button type="button" class="spcr__row" data-pick="chapter" data-chapter="${r.s}">
          <span class="spcr__row-ref">${s.meta.chapterLabel[r.s]} <em>\u2192</em> ${s.meta.chapterLabel[r.d]}</span>
          <span class="spcr__row-bar"><i style="width:${((r.n / maxW) * 100).toFixed(1)}%"></i></span>
          <span class="spcr__row-val">${r.n}</span></button>`).join('')}
      </div><p class="spcr__foot">Click \u2715 to release the corridor and see the whole web again.</p></div>`;
    this.ui.els.panel.classList.add('is-open');
  }

  /* ------------------------------------------------------------------ search */

  suggest(query, limit = 8) {
    const s = this.state;
    const q = String(query || '').trim();
    if (!q) return [];
    const parsed = parseReference(q, this.bookIndex);
    const out = [];
    if (parsed) {
      const bk = s.meta.books[parsed.book];
      if (parsed.chapter == null) {
        out.push({ label: bk.n, meta: `${bk.c} chapters \u00b7 whole book`, query: bk.a });
        for (let c = bk.co; c < bk.co + Math.min(bk.c, limit); c++) {
          out.push({ label: `${bk.a} ${s.meta.chapNum[c]}`, meta: `${s.meta.verseCount[c]} verses`, query: `${bk.a} ${s.meta.chapNum[c]}` });
        }
      } else {
        const res = resolveReference(s.meta, parsed);
        if (res && res.chapterIdx != null) {
          out.push({
            label: s.meta.chapterLabel[res.chapterIdx] + (parsed.verse ? `:${parsed.verse}` : ''),
            meta: res.verseIdx != null ? 'verse-level threads' : `${s.meta.verseCount[res.chapterIdx]} verses`,
            query: q,
          });
        } else {
          out.push({ label: `${bk.n} ${parsed.chapter}`, meta: 'chapter not found', query: bk.a });
        }
      }
    }
    if (!out.length) {
      const ql = q.toLowerCase().replace(/[^a-z0-9]/g, '');
      s.meta.books.forEach((b, i) => {
        if (out.length >= limit) return;
        if (b.n.toLowerCase().startsWith(ql) || b.a.toLowerCase().startsWith(ql)) {
          out.push({ label: b.n, meta: `${b.c} chapters`, query: b.a });
        }
      });
    }
    return out.slice(0, limit);
  }

  search(query) {
    const s = this.state;
    const parsed = parseReference(query, this.bookIndex);
    if (!parsed) return false;
    const res = resolveReference(s.meta, parsed);
    if (!res) return false;
    if (res.verseIdx != null) this.selectVerse(res.verseIdx);
    else if (res.chapterIdx != null) this.selectChapter(res.chapterIdx);
    else this.selectBook(res.book);
    return true;
  }

  _focusViewOn(chapterIdx) {
    const s = this.state;
    const L = s.layout;
    if (L.morphing) return;
    const [wx, wy] = [L.mx[chapterIdx], L.my[chapterIdx]];
    const [sx, sy] = worldToScreen(s, wx, wy);
    const { width, height } = s.size;
    const panelW = this.ui.els.panel.classList.contains('is-open') ? Math.min(420, width * 0.34) : 0;
    const cxTarget = (width - panelW) / 2;
    const cyTarget = height / 2;
    const zoom = Math.max(s.view.home.k, Math.min(s.view.home.k * 2.2, s.view.k * 1.35));
    const from = { ...s.view };
    const to = { k: zoom, x: cxTarget - wx * zoom, y: cyTarget - wy * zoom };
    const t0 = performance.now();
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / 620);
      const e = easeInOut(t);
      s.view.k = from.k + (to.k - from.k) * e;
      s.view.x = from.x + (to.x - from.x) * e;
      s.view.y = from.y + (to.y - from.y) * e;
      this._blit();
      this._overlayDirty = true;
      this._wake();
      if (t < 1) requestAnimationFrame(step);
      else { this._baseDirty = true; this._paint = null; this._wake(); }
    };
    requestAnimationFrame(step);
  }

  /* --------------------------------------------------------------- pointers */

  _bindPointer() {
    const stage = this.stage;
    const pointers = new Map();
    let drag = null;
    let pinch = null;

    const local = (e) => {
      const r = stage.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };

    stage.addEventListener('pointerdown', (e) => {
      stage.setPointerCapture?.(e.pointerId);
      pointers.set(e.pointerId, local(e));
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { dist: Math.hypot(a[0] - b[0], a[1] - b[1]), k: this.state.view.k };
        drag = null;
      } else if (pointers.size === 1) {
        drag = { p: local(e), moved: 0, view: { ...this.state.view }, t: performance.now() };
      }
    });

    stage.addEventListener('pointermove', (e) => {
      const [sx, sy] = local(e);
      if (pointers.has(e.pointerId)) pointers.set(e.pointerId, [sx, sy]);

      if (pinch && pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        const k = clampZoom(this.state, pinch.k * (d / pinch.dist));
        zoomAbout(this.state, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, k);
        this._blit(); this._overlayDirty = true; this._wake();
        return;
      }

      if (drag) {
        const dx = sx - drag.p[0], dy = sy - drag.p[1];
        drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
        if (drag.moved > 3) {
          this.state.view.x = drag.view.x + dx;
          this.state.view.y = drag.view.y + dy;
          this._blit();
          this._overlayDirty = true;
          this._wake();
          this.ui.tip(null);
        }
        return;
      }
      this._hover(sx, sy);
    });

    const endPointer = (e) => {
      const wasDrag = drag;
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 0) drag = null;
      if (wasDrag) {
        this._baseDirty = true; this._paint = null; this._wake();
        if (wasDrag.moved <= 4 && performance.now() - wasDrag.t < 600) {
          const [sx, sy] = local(e);
          this._click(sx, sy);
        }
      }
    };
    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);
    stage.addEventListener('pointerleave', () => {
      if (this.state.hoverChapter != null) {
        this.state.hoverChapter = null;
        this._overlayDirty = true;
        this._wake();
      }
      this.ui.tip(null);
    });

    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const [sx, sy] = local(e);
      const factor = Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0016));
      const k = clampZoom(this.state, this.state.view.k * factor);
      zoomAbout(this.state, sx, sy, k);
      this._blit();
      this._overlayDirty = true;
      this._wake();
      clearTimeout(this._wheelTimer);
      this._wheelTimer = setTimeout(() => { this._baseDirty = true; this._paint = null; this._wake(); }, 130);
    }, { passive: false });
  }

  /** Keyboard access: arrows walk chapters, Enter pins, Escape clears. */
  _bindKeyboard() {
    const stage = this.stage;
    stage.addEventListener('keydown', (e) => {
      const s = this.state;
      if (!s.meta) return;
      const max = s.meta.chapterCount - 1;
      const step = e.shiftKey ? 10 : 1;
      let handled = true;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        const base = s.hoverChapter ?? s.selection.chapter ?? -1;
        s.hoverChapter = Math.min(max, base + step);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        const base = s.hoverChapter ?? s.selection.chapter ?? 1;
        s.hoverChapter = Math.max(0, base - step);
      } else if (e.key === 'Enter' || e.key === ' ') {
        if (s.hoverChapter != null) this.selectChapter(s.hoverChapter);
      } else if (e.key === 'Escape') {
        this.clearSelection();
        s.hoverChapter = null;
      } else handled = false;
      if (handled) {
        e.preventDefault();
        if (s.hoverChapter != null) {
          const i = s.hoverChapter;
          this.ui.tip(`<b>${s.meta.chapterLabel[i]}</b><span>${s.meta.verseCount[i]} verses \u00b7 Enter to pin</span>`,
            ...this._screenOfChapter(i));
        }
        this._overlayDirty = true;
        this._wake();
      }
    });
    stage.addEventListener('blur', () => { this.ui.tip(null); });
  }

  _screenOfChapter(i) {
    const s = this.state;
    const [wx, wy] = [s.layout.mx[i], s.layout.my[i]];
    return worldToScreen(s, wx, wy);
  }

  _hitTest(sx, sy) {
    const s = this.state;
    const L = s.layout;
    if (L.morphing || !L.tAtPoint) return null;
    const [wx, wy] = screenToWorld(s, sx, sy);
    if (L.radial) {
      const tNear = L.tAtPoint(wx, wy, 70);
      if (tNear != null) return { type: 'chapter', index: chapterAtT(s.scale, tNear), t: tNear };
      const tBook = L.tAtPoint(wx, wy, 150);
      if (tBook != null) {
        const c = chapterAtT(s.scale, tBook);
        return { type: 'book', index: s.meta.bookOf[c], t: tBook };
      }
      return null;
    }
    const t = L.tAtPoint(wx, wy, 26);
    if (t == null) return null;
    const c = chapterAtT(s.scale, t);
    const zone = wy > L.base + 8 ? 'book' : 'chapter';
    return { type: zone, index: zone === 'book' ? s.meta.bookOf[c] : c, t };
  }

  _hover(sx, sy) {
    const s = this.state;
    const hit = this._hitTest(sx, sy);
    const chap = hit && hit.type === 'chapter' ? hit.index : null;
    if (chap !== s.hoverChapter) {
      s.hoverChapter = chap;
      this._overlayDirty = true;
      this._wake();
    }
    this.stage.style.cursor = hit ? 'pointer' : 'grab';
    if (!hit) { this.ui.tip(null); return; }
    if (hit.type === 'book') {
      const bk = s.meta.books[hit.index];
      this.ui.tip(`<b>${bk.n}</b><span>${bk.c} chapters \u00b7 ${nf(bk.v)} verses \u00b7 click to explore</span>`, sx, sy);
      return;
    }
    const i = hit.index;
    const outs = s.links.outStart[i + 1] - s.links.outStart[i];
    const ins = s.links.inStart[i + 1] - s.links.inStart[i];
    this.ui.tip(`<b>${s.meta.chapterLabel[i]}</b><span>${nf(outs)} links out \u00b7 ${nf(ins)} links in \u00b7 ${s.meta.verseCount[i]} verses</span>`, sx, sy);
  }

  _click(sx, sy) {
    const hit = this._hitTest(sx, sy);
    if (!hit) { this.clearSelection(); return; }
    if (hit.type === 'book') this.selectBook(hit.index);
    else this.selectChapter(hit.index);
  }

  /* ------------------------------------------------------------------ status */

  _updateStatus(mode) {
    const s = this.state;
    if (!s.buckets) return;
    const visible = s.buckets.visible;
    const c = s.style.corridor;
    this.ui.setStatus(
      `${mode === 'weaving' ? '<em class="spcr__pulse">Weaving</em>' : 'Showing'}
       <b>${nf(visible)}</b> of ${nf(s.meta.stats.arcs)} chapter links
       <span class="spcr__sep">\u00b7</span> ${nf(s.meta.stats.references)} verse references
       ${c ? `<span class="spcr__sep">\u00b7</span> corridor: ${s.meta.books[c[0]].a} \u2194 ${s.meta.books[c[1]].a}` : ''}
       <span class="spcr__sep">\u00b7</span> ${COLOR_MODES[s.style.colorMode].label}`);
    this.ui.setStrengthOut(`${nf(visible)} arcs`);
  }

  _updateLegend() {
    const s = this.state;
    const m = s.style.colorMode;
    if (m === 'testament') {
      this.ui.setLegend(`<span><i style="background:#e8b23a"></i>Old Testament</span>
        <span><i style="background:#4aa3e8"></i>New Testament</span>
        <span><i style="background:#e85aa8"></i>OT \u2192 NT thread</span>`);
    } else if (m === 'confidence') {
      this.ui.setLegend(`<span class="spcr__grad" style="background:linear-gradient(90deg,hsl(210,40%,45%),hsl(40,85%,70%))"></span>
        <span>weak \u2192 strongly attested</span>`);
    } else {
      this.ui.setLegend(`<span class="spcr__grad" style="background:linear-gradient(90deg,hsl(244,92%,58%),hsl(160,92%,58%),hsl(60,92%,58%),hsl(0,92%,58%))"></span>
        <span>nearby chapters \u2192 far apart</span>`);
    }
  }

  destroy() {
    this._destroyed = true;
    clearTimeout(this._hintTimer);
    if (this._raf) cancelAnimationFrame(this._raf);
    this._ro?.disconnect();
    document.removeEventListener('fullscreenchange', this._onFullscreen);
    this.container.innerHTML = '';
  }
}

function clampZoom(s, k) {
  return Math.max(s.view.home.k * 0.55, Math.min(s.view.home.k * 16, k));
}

function zoomAbout(s, sx, sy, k) {
  const [wx, wy] = screenToWorld(s, sx, sy);
  s.view.k = k;
  s.view.x = sx - wx * k;
  s.view.y = sy - wy * k;
}

export default CrossRefViz;
export { THEMES, COLOR_MODES, LAYOUTS, WORLD };

export { renderWorldReligionMap } from './worldmap.js';
