/**
 * ui.js — DOM chrome for the module: toolbar, detail panel, tooltip, search, status read-out.
 * Framework-free so the same shell works in React, Vue, plain HTML or an iframe.
 */

import { LAYOUTS } from './geometry.js';
import { THEMES, COLOR_MODES } from './render.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = (n) => Number(n).toLocaleString('en-US');

export const SCOPES = [
  { id: 'all', label: 'All links' },
  { id: 'otnt', label: 'OT \u2192 NT', hint: 'The scarlet thread: prophecy and its fulfilment' },
  { id: 'ot', label: 'OT only' },
  { id: 'nt', label: 'NT only' },
];

const PRESETS = [
  { label: 'Genesis 1', ref: 'Gen 1' },
  { label: 'Psalm 119', ref: 'Ps 119' },
  { label: 'Isaiah 53', ref: 'Isa 53' },
  { label: 'John 3:16', ref: 'John 3:16' },
  { label: 'Romans 8', ref: 'Rom 8' },
  { label: 'Revelation 22', ref: 'Rev 22' },
];

export function buildUI(root, viz) {
  root.classList.add('spcr');
  root.innerHTML = `
  <div class="spcr__bar" role="toolbar" aria-label="Cross-reference controls">
    <div class="spcr__group spcr__group--layout" role="group" aria-label="Layout">
      ${Object.keys(LAYOUTS).map((k, i) => `
        <button type="button" class="spcr__btn spcr__layout" data-layout="${k}"
                title="${esc(LAYOUTS[k].hint)}" aria-pressed="${i === 0}">
          <span class="spcr__glyph" data-glyph="${k}"></span>${esc(LAYOUTS[k].label)}
        </button>`).join('')}
    </div>

    <div class="spcr__group spcr__group--strength">
      <label class="spcr__label" for="spcr-strength">Thread strength</label>
      <input id="spcr-strength" class="spcr__range" type="range" min="1" max="12" step="1" value="2" />
      <output class="spcr__output" data-out="strength">63,407 arcs</output>
    </div>

    <div class="spcr__group spcr__group--color">
      <label class="spcr__label" for="spcr-color">Colour by</label>
      <select id="spcr-color" class="spcr__select" data-role="color">
        ${Object.keys(COLOR_MODES).map((k) => `<option value="${k}">${esc(COLOR_MODES[k].label)}</option>`).join('')}
      </select>
    </div>

    <div class="spcr__group spcr__group--scope" role="group" aria-label="Scope">
      ${SCOPES.map((s, i) => `<button type="button" class="spcr__btn spcr__chip" data-scope="${s.id}" title="${esc(s.hint || '')}" aria-pressed="${i === 0}">${esc(s.label)}</button>`).join('')}
    </div>

    <div class="spcr__group spcr__group--search">
      <input class="spcr__search" type="search" placeholder="Search Isaiah 53, John 3:16\u2026" aria-label="Search a reference" data-role="search" autocomplete="off" />
      <div class="spcr__suggest" data-role="suggest" hidden></div>
    </div>

    <div class="spcr__group spcr__group--actions">
      <button type="button" class="spcr__btn spcr__icon" data-act="replay" title="Replay the weaving animation">\u27F3</button>
      <button type="button" class="spcr__btn spcr__icon" data-act="reset" title="Reset zoom">\u2316</button>
      <button type="button" class="spcr__btn spcr__icon" data-act="png" title="Download a PNG poster">\u2913</button>
      <button type="button" class="spcr__btn spcr__icon" data-act="theme" title="Switch theme">\u263E</button>
      <button type="button" class="spcr__btn spcr__icon" data-act="full" title="Full screen">\u26F6</button>
    </div>
  </div>

  <div class="spcr__body">
    <div class="spcr__stage" data-role="stage" tabindex="0" role="application"
         aria-label="Interactive map of Bible cross-references. Use left and right arrow keys to move between chapters, Enter to pin a chapter, Escape to clear.">
      <canvas class="spcr__canvas" data-role="base" aria-hidden="true"></canvas>
      <canvas class="spcr__canvas" data-role="over" aria-hidden="true"></canvas>
      <div class="spcr__tip" data-role="tip" hidden></div>
      <div class="spcr__status" data-role="status"></div>
      <div class="spcr__loader" data-role="loader"><div class="spcr__loader-ring"></div><span>Loading the concordance\u2026</span></div>
      <div class="spcr__legend" data-role="legend"></div>
      <div class="spcr__hint" data-role="hint">Click any chapter on the bowl \u00b7 drag to pan \u00b7 scroll to zoom</div>
    </div>
    <aside class="spcr__panel" data-role="panel" aria-live="polite"></aside>
  </div>`;

  const $ = (sel) => root.querySelector(sel);
  const els = {
    bar: $('.spcr__bar'),
    stage: $('[data-role=stage]'),
    base: $('[data-role=base]'),
    over: $('[data-role=over]'),
    tip: $('[data-role=tip]'),
    status: $('[data-role=status]'),
    loader: $('[data-role=loader]'),
    legend: $('[data-role=legend]'),
    hint: $('[data-role=hint]'),
    panel: $('[data-role=panel]'),
    strength: $('#spcr-strength'),
    strengthOut: $('[data-out=strength]'),
    color: $('[data-role=color]'),
    search: $('[data-role=search]'),
    suggest: $('[data-role=suggest]'),
  };

  /* ------------------------------------------------------------- toolbar */
  root.addEventListener('click', (e) => {
    const lay = e.target.closest('[data-layout]');
    if (lay) {
      root.querySelectorAll('[data-layout]').forEach((b) => b.setAttribute('aria-pressed', String(b === lay)));
      viz.setLayout(lay.dataset.layout);
      return;
    }
    const scope = e.target.closest('[data-scope]');
    if (scope) {
      root.querySelectorAll('[data-scope]').forEach((b) => b.setAttribute('aria-pressed', String(b === scope)));
      viz.setScope(scope.dataset.scope);
      return;
    }
    const act = e.target.closest('[data-act]');
    if (act) {
      const a = act.dataset.act;
      if (a === 'replay') viz.replay();
      if (a === 'reset') viz.resetView();
      if (a === 'png') viz.exportPNG();
      if (a === 'theme') {
        const order = ['rainbow', 'scriptorium', 'podship'];
        viz.setTheme(order[(order.indexOf(viz.state.style.theme) + 1) % order.length]);
      }
      if (a === 'full') viz.toggleFullscreen();
      return;
    }
    const preset = e.target.closest('[data-preset]');
    if (preset) { viz.search(preset.dataset.preset); return; }
    const pick = e.target.closest('[data-pick]');
    if (pick) {
      const kind = pick.dataset.pick;
      if (kind === 'chapter') viz.selectChapter(+pick.dataset.chapter);
      if (kind === 'verse') viz.selectVerse(+pick.dataset.verse);
      if (kind === 'book') viz.selectBook(+pick.dataset.book);
      if (kind === 'corridor') viz.setCorridor(+pick.dataset.a, +pick.dataset.b);
      if (kind === 'clearcorridor') viz.setCorridor(null, null);
      if (kind === 'clear') viz.clearSelection();
      return;
    }
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      root.querySelectorAll('[data-tab]').forEach((b) => b.setAttribute('aria-selected', String(b === tab)));
      viz.setPanelTab(tab.dataset.tab);
      return;
    }
    if (e.target.closest('[data-close-panel]')) viz.clearSelection();
  });

  els.strength.addEventListener('input', () => viz.setMinWeight(+els.strength.value));
  els.color.addEventListener('change', () => viz.setColorMode(els.color.value));

  /* ------------------------------------------------------------- search */
  let suggestTimer = 0;
  els.search.addEventListener('input', () => {
    clearTimeout(suggestTimer);
    suggestTimer = setTimeout(() => {
      const items = viz.suggest(els.search.value, 8);
      if (!items.length) { els.suggest.hidden = true; els.suggest.innerHTML = ''; return; }
      els.suggest.innerHTML = items
        .map((it) => `<button type="button" class="spcr__suggest-item" data-preset="${esc(it.query)}">
            <span class="spcr__suggest-ref">${esc(it.label)}</span>
            <span class="spcr__suggest-meta">${esc(it.meta)}</span></button>`)
        .join('');
      els.suggest.hidden = false;
    }, 90);
  });
  els.search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { els.suggest.hidden = true; viz.search(els.search.value); }
    if (e.key === 'Escape') { els.suggest.hidden = true; els.search.blur(); }
  });
  els.search.addEventListener('blur', () => setTimeout(() => { els.suggest.hidden = true; }, 160));

  /* ------------------------------------------------------------- panels */
  function renderIntro() {
    const s = viz.state;
    const st = s.meta.stats;
    const strongest = st.strongest.slice(0, 10).map((r) => {
      const a = s.meta.chapterLabel[r.s], b = s.meta.chapterLabel[r.d];
      return `<button type="button" class="spcr__row" data-pick="corridor" data-a="${s.meta.bookOf[r.s]}" data-b="${s.meta.bookOf[r.d]}">
        <span class="spcr__row-ref">${esc(a)} <em>\u2192</em> ${esc(b)}</span>
        <span class="spcr__row-val">${nf(r.w)}</span></button>`;
    }).join('');
    els.panel.innerHTML = `
      <header class="spcr__panel-head">
        <div>
          <p class="spcr__eyebrow">Saul\u2019s Podship \u00b7 Visual Concordance</p>
          <h2 class="spcr__title">${nf(st.references)} cross-references</h2>
        </div>
      </header>
      <div class="spcr__panel-scroll">
        <p class="spcr__lede">Every thread in this bowl is a real cross-reference between two chapters of
          Scripture \u2014 ${nf(st.arcs)} chapter-to-chapter links drawn from ${nf(st.references)} verse-level
          references across all 66 books. Nothing here is invented: hover, click and follow the web.</p>
        <div class="spcr__statgrid">
          <div><b>${nf(st.references)}</b><span>verse references</span></div>
          <div><b>${nf(st.arcs)}</b><span>chapter links</span></div>
          <div><b>${nf(st.otToNt)}</b><span>OT \u2192 NT threads</span></div>
          <div><b>${st.chapters}</b><span>chapters mapped</span></div>
        </div>
        <h3 class="spcr__subhead">Begin here</h3>
        <div class="spcr__presets">
          ${PRESETS.map((p) => `<button type="button" class="spcr__preset" data-preset="${esc(p.ref)}">${esc(p.label)}</button>`).join('')}
        </div>
        <h3 class="spcr__subhead">Strongest corridors</h3>
        <div class="spcr__rows">${strongest}</div>
        <p class="spcr__foot">Data \u00a9 openbible.info (CC-BY) \u00b7 scripture: King James Version.
          Inspired by Christoph R\u00f6mhild &amp; Chris Harrison, <i>Visualizing the Bible</i> (2007).</p>
      </div>`;
    els.panel.classList.add('is-open');
  }

  function renderChapter(sel) {
    const s = viz.state;
    const c = sel.chapter;
    const meta = s.meta;
    const bk = meta.books[meta.bookOf[c]];
    const out = sel.out || [], inn = sel.inn || [];
    const tab = sel.tab || 'out';
    const rows = (list, dir) => list.slice(0, 400).map((r) => {
      const target = dir === 'out' ? r.dst : r.src;
      const tb = meta.books[meta.bookOf[target]];
      const cross = (tb.t !== bk.t);
      return `<button type="button" class="spcr__row${cross ? ' is-cross' : ''}" data-pick="chapter" data-chapter="${target}">
        <span class="spcr__row-ref">${esc(meta.chapterLabel[target])}</span>
        <span class="spcr__row-bar"><i style="width:${Math.min(100, (r.w / sel.maxW) * 100).toFixed(1)}%"></i></span>
        <span class="spcr__row-val">${r.w}${r.v ? ` <em title="community confidence">${r.v > 0 ? '+' : ''}${r.v}</em>` : ''}</span>
      </button>`;
    }).join('') || `<p class="spcr__empty">No links at this strength. Lower the thread-strength slider.</p>`;

    const verses = sel.verses
      ? sel.verses.map((v) => `
        <div class="spcr__verse">
          <button type="button" class="spcr__verse-no" data-pick="verse" data-verse="${v.idx}">${v.no}</button>
          <div class="spcr__verse-body">
            <p class="spcr__verse-text">${esc(v.text)}</p>
            <div class="spcr__chips">
              ${v.refs.slice(0, 14).map((r) => `<button type="button" class="spcr__chip-ref" data-pick="verse" data-verse="${r.verse}" title="${esc(r.label)}">${esc(r.label)}</button>`).join('')}
              ${v.refs.length > 14 ? `<span class="spcr__chip-more">+${v.refs.length - 14} more</span>` : ''}
            </div>
          </div>
        </div>`).join('')
      : `<div class="spcr__loading">Loading verse text\u2026</div>`;

    els.panel.innerHTML = `
      <header class="spcr__panel-head">
        <div>
          <p class="spcr__eyebrow">${esc(bk.t ? 'New Testament' : 'Old Testament')} \u00b7 ${esc(bk.n)}</p>
          <h2 class="spcr__title">${esc(meta.chapterLabel[c])}</h2>
          <p class="spcr__subtitle">${meta.verseCount[c]} verses \u00b7 ${nf(out.length)} links out \u00b7 ${nf(inn.length)} links in</p>
        </div>
        <button type="button" class="spcr__close" data-close-panel aria-label="Close">\u2715</button>
      </header>
      <div class="spcr__tabs" role="tablist">
        <button type="button" role="tab" data-tab="out" aria-selected="${tab === 'out'}">Points to <b>${nf(out.length)}</b></button>
        <button type="button" role="tab" data-tab="in" aria-selected="${tab === 'in'}">Referenced by <b>${nf(inn.length)}</b></button>
        <button type="button" role="tab" data-tab="verses" aria-selected="${tab === 'verses'}">Verse by verse</button>
      </div>
      <div class="spcr__panel-scroll">
        ${tab === 'out' ? `<div class="spcr__rows">${rows(out, 'out')}</div>` : ''}
        ${tab === 'in' ? `<div class="spcr__rows">${rows(inn, 'in')}</div>` : ''}
        ${tab === 'verses' ? `<div class="spcr__verses">${verses}</div>` : ''}
      </div>`;
    els.panel.classList.add('is-open');
  }

  function renderBook(sel) {
    const s = viz.state;
    const bk = s.meta.books[sel.book];
    const rows = sel.partners.slice(0, 60).map((p) => `<button type="button" class="spcr__row" data-pick="book" data-book="${p.book}">
        <span class="spcr__row-ref">${esc(s.meta.books[p.book].n)}</span>
        <span class="spcr__row-bar"><i style="width:${Math.min(100, (p.w / sel.maxW) * 100).toFixed(1)}%"></i></span>
        <span class="spcr__row-val">${nf(p.w)}</span></button>`).join('');
    els.panel.innerHTML = `
      <header class="spcr__panel-head">
        <div>
          <p class="spcr__eyebrow">${bk.t ? 'New Testament' : 'Old Testament'}</p>
          <h2 class="spcr__title">${esc(bk.n)}</h2>
          <p class="spcr__subtitle">${bk.c} chapters \u00b7 ${nf(bk.v)} verses \u00b7 ${nf(sel.total)} links</p>
        </div>
        <button type="button" class="spcr__close" data-close-panel aria-label="Close">\u2715</button>
      </header>
      <div class="spcr__panel-scroll">
        <h3 class="spcr__subhead">Most-linked books</h3>
        <div class="spcr__rows">${rows}</div>
        <p class="spcr__foot">Tip: click a book above to isolate the corridor between the two.</p>
      </div>`;
    els.panel.classList.add('is-open');
  }

  return {
    els,
    root,
    renderIntro,
    renderChapter,
    renderBook,
    setStatus(html) { els.status.innerHTML = html; },
    setLoader(on, msg) {
      els.loader.hidden = !on;
      if (msg) els.loader.querySelector('span').textContent = msg;
    },
    setStrengthOut(text) { els.strengthOut.textContent = text; },
    setLegend(html) { els.legend.innerHTML = html; els.legend.hidden = !html; },
    tip(html, x, y) {
      if (html == null) { els.tip.hidden = true; return; }
      els.tip.innerHTML = html;
      els.tip.hidden = false;
      const r = els.stage.getBoundingClientRect();
      const tw = els.tip.offsetWidth, th = els.tip.offsetHeight;
      els.tip.style.left = `${Math.min(Math.max(8, x + 14), r.width - tw - 8)}px`;
      els.tip.style.top = `${Math.min(Math.max(8, y - th - 12), r.height - th - 8)}px`;
    },
    syncControls(style) {
      els.strength.value = String(style.minWeight);
      els.color.value = style.colorMode;
      root.querySelectorAll('[data-layout]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.layout === style.layout)));
      root.querySelectorAll('[data-scope]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.scope === style.scope)));
      root.dataset.theme = style.theme;
    },
  };
}
