/**
 * render.js — canvas painting: batched arc rendering, chrome (books, ticks, bars, labels),
 * and the highlight overlay. Zero dependencies, tuned for 190k arcs.
 */

import { WORLD, controlPoint } from './geometry.js';

export const THEMES = {
  rainbow: {
    label: 'Revelation Rainbow',
    hint: 'The classic 2007 poster look',
    bg: '#04060c',
    bgGlow: 'rgba(24,34,64,0.55)',
    ink: '#e9edf5',
    inkDim: '#8b95ab',
    rule: 'rgba(233,237,245,0.16)',
    bookA: '#2b3242',
    bookB: '#3d4557',
    bookFirst: '#f2f4f8',
    accent: '#ffd479',
    highlight: '#ffffff',
    verse: '#ffe9a8',
    panel: 'rgba(9,12,20,0.86)',
    sat: 0.9,
    light: 0.56,
    baseAlpha: 0.17,
  },
  podship: {
    label: 'Podship Parchment',
    hint: 'saulspodship.com parchment, burgundy & gold',
    bg: '#F8F4E3',
    bgGlow: 'rgba(212,175,55,0.20)',
    ink: '#4A152C',
    inkDim: 'rgba(74,21,44,0.62)',
    rule: 'rgba(74,21,44,0.26)',
    bookA: '#e7dfc6',
    bookB: '#d8cfae',
    bookFirst: '#4A152C',
    accent: '#b5952f',
    highlight: '#4A152C',
    verse: '#8a6a12',
    panel: 'rgba(250,247,236,0.94)',
    sat: 0.78,
    light: 0.34,
    baseAlpha: 0.3,
    blend: 'multiply',
  },
  scriptorium: {
    label: 'Scriptorium',
    hint: 'Saul\u2019s Podship parchment & gold',
    bg: '#0a1020',
    bgGlow: 'rgba(70,52,20,0.35)',
    ink: '#f0e6cf',
    inkDim: '#9b927c',
    rule: 'rgba(212,175,55,0.22)',
    bookA: '#2a2418',
    bookB: '#3a3222',
    bookFirst: '#d4af37',
    accent: '#d4af37',
    highlight: '#ffe6a3',
    verse: '#ffd479',
    panel: 'rgba(12,16,28,0.88)',
    sat: 0.68,
    light: 0.6,
    baseAlpha: 0.19,
  },
};

export const COLOR_MODES = {
  distance: { label: 'Canonical distance', hint: 'Hue = how far apart the two chapters are' },
  confidence: { label: 'Confidence', hint: 'Hue = community vote strength of the link' },
  testament: { label: 'Testament', hint: 'OT, NT and the OT\u2192NT scarlet thread' },
};

const HUE_STEPS = 44;
const ALPHA_STEPS = 5;
const NUM_BUCKETS = HUE_STEPS * ALPHA_STEPS;

/* ------------------------------------------------------------------ palette */

function arcColor(theme, mode, ci, ai) {
  const t = (ci + 0.5) / HUE_STEPS;
  let h, s = theme.sat, l = theme.light;
  if (mode === 'distance') {
    h = 244 * (1 - t); // near = violet/blue, far = red (as in the original poster)
  } else if (mode === 'confidence') {
    h = 210 - 170 * t; // cool = weak, warm gold = strong
    s = 0.35 + 0.5 * t;
    l = 0.42 + 0.28 * t;
  } else {
    // testament buckets are assigned directly (0..2), spread them over the hue table
    const pick = [46, 205, 322][ci % 3];
    h = pick;
    s = 0.8;
    l = 0.6;
  }
  const a = (0.04 + (theme.baseAlpha - 0.04) * (ai / (ALPHA_STEPS - 1))).toFixed(3);
  return `hsla(${h.toFixed(1)},${(s * 100).toFixed(0)}%,${(l * 100).toFixed(0)}%,${a})`;
}

function buildBucketColors(theme, mode) {
  const colors = new Array(NUM_BUCKETS);
  const hues = mode === 'testament' ? 3 : HUE_STEPS;
  for (let ci = 0; ci < hues; ci++) {
    for (let ai = 0; ai < ALPHA_STEPS; ai++) colors[ci * ALPHA_STEPS + ai] = arcColor(theme, mode, ci, ai);
  }
  return colors;
}

/* ------------------------------------------------------------- bucket sorting */

/**
 * Group arcs into (colour x alpha) buckets, honouring the active filters.
 * Returns { starts, order, visible } — a counting sort, ~10 ms for 190k arcs.
 */
export function assignBuckets(state) {
  const { links, meta, style } = state;
  const n = links.count;
  const { src, dst, weight, votes } = links;
  const { minWeight, colorMode, scope, corridor } = style;
  const nCh = meta.chapterCount;
  const wmax = meta.stats.maxArcWeight || 100;
  const logMax = Math.log(wmax + 1);
  const ot = meta.bookOf;

  const bucketOf = new Int32Array(n);
  const counts = new Int32Array(NUM_BUCKETS + 1);
  let visible = 0;

  const cA = corridor ? corridor[0] : -1;
  const cB = corridor ? corridor[1] : -1;
  let maxDist = 1;

  for (let i = 0; i < n; i++) {
    const w = weight[i];
    if (w < minWeight) { bucketOf[i] = -1; continue; }
    const s = src[i], d = dst[i];
    const sOT = ot[s] < 39, dOT = ot[d] < 39;
    if (scope === 'otnt' && sOT === dOT) { bucketOf[i] = -1; continue; }
    if (scope === 'ot' && !(sOT && dOT)) { bucketOf[i] = -1; continue; }
    if (scope === 'nt' && !(!sOT && !dOT)) { bucketOf[i] = -1; continue; }
    if (cA >= 0 && cB >= 0) {
      const bs = ot[s], bd = ot[d];
      const ok = (bs === cA && bd === cB) || (bs === cB && bd === cA);
      if (!ok) { bucketOf[i] = -1; continue; }
    }
    const dist = Math.abs(s - dst[i]);
    if (dist > maxDist) maxDist = dist;
    const ai = Math.min(ALPHA_STEPS - 1, Math.floor((Math.log(w + 1) / logMax) * ALPHA_STEPS));
    let ci;
    if (colorMode === 'distance') {
      const t = Math.abs(s - d) / (nCh - 1);
      ci = Math.min(HUE_STEPS - 1, Math.floor(t * HUE_STEPS));
    } else if (colorMode === 'confidence') {
      const v = votes[i];
      const t = Math.max(0, Math.min(1, (v + 40) / 340));
      ci = Math.min(HUE_STEPS - 1, Math.floor(t * HUE_STEPS));
    } else {
      ci = sOT ? (dOT ? 0 : 2) : dOT ? 2 : 1;
    }
    const b = ci * ALPHA_STEPS + ai;
    bucketOf[i] = b;
    counts[b]++;
    visible++;
  }

  const starts = new Int32Array(NUM_BUCKETS + 1);
  for (let b = 0; b < NUM_BUCKETS; b++) starts[b + 1] = starts[b] + counts[b];
  const order = new Int32Array(visible);
  const cursor = starts.slice(0, NUM_BUCKETS);
  for (let i = 0; i < n; i++) {
    const b = bucketOf[i];
    if (b >= 0) order[cursor[b]++] = i;
  }

  // Signature threads: the longest visible links, stroked crisply on top of the soft
  // mound so the eye gets the poster's distinct rainbow arcs (and the bowl its spokes).
  const K = Math.min(visible, 1600);
  let signature = new Int32Array(0);
  if (K > 0) {
    const cand = [];
    for (let i = 0; i < n; i++) if (bucketOf[i] >= 0) cand.push(i);
    cand.sort((a, b) => Math.abs(src[b] - dst[b]) - Math.abs(src[a] - dst[a]));
    const top = cand.slice(0, K);
    top.sort((a, b) => bucketOf[a] - bucketOf[b]);
    signature = Int32Array.from(top);
  }

  state.buckets = { starts, order, visible, bucketId: bucketOf, maxDist, signature, colors: buildBucketColors(state.theme, colorMode) };
  return state.buckets;
}

/* ------------------------------------------------------------------ painting */

export function applyView(ctx, state, dpr) {
  const v = state.view;
  ctx.setTransform(dpr * v.k, 0, 0, dpr * v.k, dpr * v.x, dpr * v.y);
}

export function clearCanvas(ctx, canvas, theme, dpr) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (theme) {
    const w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, Math.max(w, h) * 0.75);
    g.addColorStop(0, theme.bgGlow);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
}

/**
 * Paint the arc field. Draws bucket-by-bucket inside a time budget so the UI never freezes;
 * returns true when finished.
 */
export function alphaBoost(state) {
  const key = state.layout?.key;
  if (key === 'linear') return 3.6;
  if (state.layout?.morphing) return 2.2;
  return 1;
}

export function paintArcs(state, budgetMs = 14) {
  const { ctxBase, buckets, geo, view } = state;
  if (!buckets) return true;
  const t0 = performance.now();
  const ctx = state.ctxBase;

  if (!state._paint || state._paint.reset) {
    clearCanvas(ctx, state.baseCanvas, state.theme, state.dpr);
    applyView(ctx, state, state.dpr);
    const lw = Math.max(0.12, Math.min(2.4, 0.62 / view.k));
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    state._paint = { bucket: 0, reset: false, total: 0 };
  }

  const starts = buckets.starts;
  const order = buckets.order;
  const reveal = state.reveal ?? 1;
  const srcArr = state.links.src;
  const nCh = state.meta.chapterCount;
  const revealCut = reveal < 1 ? reveal * nCh : Infinity;

  ctx.lineJoin = 'round';
  ctx.globalCompositeOperation = state.theme.blend || 'source-over';
  let b = state._paint.bucket;
  while (b < NUM_BUCKETS) {
    const s0 = starts[b], s1 = starts[b + 1];
    if (s1 > s0) {
      ctx.strokeStyle = buckets.colors[b] || 'rgba(255,255,255,0.2)';
      ctx.globalAlpha = alphaBoost(state);
      ctx.beginPath();
      for (let k = s0; k < s1; k++) {
        const i = order[k];
        if (revealCut !== Infinity && srcArr[i] > revealCut) continue;
        const o = i * 6;
        ctx.moveTo(geo[o], geo[o + 1]);
        ctx.quadraticCurveTo(geo[o + 4], geo[o + 5], geo[o + 2], geo[o + 3]);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      state._paint.total += s1 - s0;
    }
    b++;
    if (performance.now() - t0 > budgetMs) break;
  }
  ctx.globalCompositeOperation = 'source-over';
  state._paint.bucket = b;
  if (b >= NUM_BUCKETS) {
    drawSignature(state);
    state._paint.reset = true;
    return true;
  }
  return false;
}

/** Crisp overlay of the longest threads; gives the mound its readable rainbow envelope. */
export function drawSignature(state) {
  const sig = state.buckets && state.buckets.signature;
  if (!sig || !sig.length) return;
  const ctx = state.ctxBase;
  ctx.globalCompositeOperation = state.theme.blend ? 'source-over' : 'source-over';
  const { geo, view, buckets } = state;
  const radial = state.layout.key !== 'linear' && !state.layout.morphing;
  applyView(ctx, state, state.dpr);
  ctx.globalAlpha = radial ? 0.3 : 0.55;
  ctx.lineWidth = radial ? Math.max(0.15, 0.8 / view.k) : Math.max(0.25, 1 / view.k);
  ctx.lineCap = 'round';
  let current = -1;
  ctx.beginPath();
  for (let j = 0; j < sig.length; j++) {
    const i = sig[j];
    const b = buckets.bucketId[i];
    if (b !== current) {
      if (current >= 0) ctx.stroke();
      ctx.strokeStyle = buckets.colors[b] || 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      current = b;
    }
    const o = i * 6;
    ctx.moveTo(geo[o], geo[o + 1]);
    ctx.quadraticCurveTo(geo[o + 4], geo[o + 5], geo[o + 2], geo[o + 3]);
  }
  if (current >= 0) ctx.stroke();
  ctx.globalAlpha = 1;
}

/* ------------------------------------------------- progressive intro reveal */

/**
 * Append only the arcs that have newly come into view during the weaving intro.
 * Works because links.bin is sorted by source chapter, so each bucket is ordered too.
 */
export function paintRevealStep(state, cut) {
  const ctx = state.ctxBase;
  const { starts, order, colors } = state.buckets;
  if (!state._revealCur) state._revealCur = new Int32Array(NUM_BUCKETS);
  const cur = state._revealCur;
  const srcArr = state.links.src;
  const geo = state.geo;
  applyView(ctx, state, state.dpr);
  ctx.lineWidth = state.layout?.key === 'linear'
    ? Math.max(0.2, Math.min(3, 0.95 / state.view.k))
    : Math.max(0.12, Math.min(2.4, 0.62 / state.view.k));
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalCompositeOperation = state.theme.blend || 'source-over';
  ctx.globalAlpha = alphaBoost(state);
  for (let b = 0; b < NUM_BUCKETS; b++) {
    let c = cur[b];
    const s1 = starts[b + 1];
    if (c >= s1) continue;
    let e = c;
    while (e < s1 && srcArr[order[e]] <= cut) e++;
    if (e === c) continue;
    ctx.strokeStyle = colors[b] || 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    for (let k = c; k < e; k++) {
      const o = order[k] * 6;
      ctx.moveTo(geo[o], geo[o + 1]);
      ctx.quadraticCurveTo(geo[o + 4], geo[o + 5], geo[o + 2], geo[o + 3]);
    }
    ctx.stroke();
    cur[b] = e;
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
  if (cut >= state.meta.chapterCount) drawSignature(state);
}

/* ------------------------------------------------------------- layout morph */

/** Pre-compute a ~15k-arc sample in both layouts so morphing stays at 60fps. */
export function buildMorphSample(state, A, B) {
  const { src, dst } = state.links;
  const { starts, order } = state.buckets;
  const stride = Math.max(1, Math.round(order.length / 15000));
  const curve = state.style.curve;
  const buckets = [];
  let total = 0;
  for (let b = 0; b < NUM_BUCKETS; b++) {
    const s0 = starts[b], s1 = starts[b + 1];
    if (s1 <= s0) continue;
    const cnt = Math.max(1, Math.ceil((s1 - s0) / stride));
    const idx = new Int32Array(cnt);
    for (let k = 0; k < cnt; k++) idx[k] = order[Math.min(s1 - 1, s0 + k * stride)];
    buckets.push({ b, idx });
    total += cnt;
  }
  const gA = new Float32Array(total * 6);
  const gB = new Float32Array(total * 6);
  const fill = (g, L, p, i) => {
    const a = src[i], d = dst[i];
    const x1 = L.mx[a], y1 = L.my[a], x2 = L.mx[d], y2 = L.my[d];
    const c = controlPoint(L, x1, y1, x2, y2, curve);
    const o = p * 6;
    g[o] = x1; g[o + 1] = y1; g[o + 2] = x2; g[o + 3] = y2; g[o + 4] = c[0]; g[o + 5] = c[1];
  };
  let p = 0;
  for (const { idx } of buckets) for (let j = 0; j < idx.length; j++) { fill(gA, A, p, idx[j]); fill(gB, B, p, idx[j]); p++; }
  return { buckets, total, gA, gB };
}

export function paintMorphFrame(state, sample, k) {
  const ctx = state.ctxBase;
  const { gA, gB, buckets } = sample;
  const colors = state.buckets.colors;
  clearCanvas(ctx, state.baseCanvas, state.theme, state.dpr);
  applyView(ctx, state, state.dpr);
  ctx.lineWidth = Math.max(0.14, 0.75 / state.view.k);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.globalAlpha = alphaBoost(state);
  ctx.globalCompositeOperation = state.theme.blend || 'source-over';
  const ik = 1 - k;
  let p = 0;
  for (const { b, idx } of buckets) {
    ctx.strokeStyle = colors[b] || 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    for (let j = 0; j < idx.length; j++) {
      const o = p * 6;
      const x1 = gA[o] * ik + gB[o] * k;
      const y1 = gA[o + 1] * ik + gB[o + 1] * k;
      const x2 = gA[o + 2] * ik + gB[o + 2] * k;
      const y2 = gA[o + 3] * ik + gB[o + 3] * k;
      const cx = gA[o + 4] * ik + gB[o + 4] * k;
      const cy = gA[o + 5] * ik + gB[o + 5] * k;
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      p++;
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'source-over';
}

/* -------------------------------------------------------------------- chrome */

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Books, chapter ticks, chapter bars (linear) and the 66 book labels. */
export function paintChrome(state, opts = {}) {
  const ctx = state.ctxOver;
  const { layout, scale, meta, theme, view } = state;
  const showLabels = opts.labels !== false;
  applyView(ctx, state, state.dpr);

  const books = meta.books;
  const nb = books.length;

  if (layout.key === 'linear' && !layout.morphing) {
    const base = layout.base;
    const barMax = 132;
    // chapter bars — length = verses in the chapter, exactly like the 2007 poster
    for (let i = 0; i < scale.n; i++) {
      const b = meta.bookOf[i];
      const x = layout.x0[i], w = Math.max(0.6, layout.x1[i] - layout.x0[i]);
      const h = Math.max(1.5, (meta.verseCount[i] / layout.maxVerses) * barMax);
      ctx.fillStyle = b === 0 || b === 39 ? theme.bookFirst : (b % 2 ? theme.bookB : theme.bookA);
      ctx.globalAlpha = 0.95;
      ctx.fillRect(x, base + 8, w, h);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = theme.rule;
    ctx.lineWidth = 1 / view.k;
    ctx.beginPath();
    ctx.moveTo(layout.left, base);
    ctx.lineTo(layout.right, base);
    ctx.stroke();

    // OT / NT divider
    if (showLabels) {
      const xNT = layout.left + ((scale.bookStartT[39] + scale.bookEndT[38]) / 2) * layout.span;
      ctx.strokeStyle = theme.rule;
      ctx.setLineDash([4 / view.k, 4 / view.k]);
      ctx.beginPath();
      ctx.moveTo(xNT, base - 740);
      ctx.lineTo(xNT, base + 8 + barMax + 6);
      ctx.stroke();
      ctx.setLineDash([]);
      drawBookLabels(state, { linear: true });
    }
    return;
  }

  // ---- radial chrome
  const { cx, cy, R } = layout;
  const inner = R - 7, outer = R + 7;
  const angOf = (t) => (layout.half ? Math.PI * (1 - t) : -Math.PI / 2 + Math.PI * 2 * t);

  ctx.lineWidth = 1 / view.k;
  for (let b = 0; b < nb; b++) {
    const a0 = angOf(scale.bookStartT[b]);
    const a1 = angOf(scale.bookEndT[b]);
    ctx.beginPath();
    if (layout.half) {
      ctx.arc(cx, cy, outer, -a0, -a1);
      ctx.arc(cx, cy, inner, -a1, -a0, true);
    } else {
      ctx.arc(cx, cy, outer, a0, a1);
      ctx.arc(cx, cy, inner, a1, a0, true);
    }
    ctx.closePath();
    ctx.fillStyle = b === 0 || b === 39 ? theme.bookFirst : (b % 2 ? theme.bookB : theme.bookA);
    ctx.globalAlpha = 0.95;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // chapter ticks (only when there is room)
  const pxPerT = (layout.half ? Math.PI * R : 2 * Math.PI * R) * view.k;
  if (pxPerT / scale.n > 1.4) {
    ctx.strokeStyle = theme.rule;
    ctx.beginPath();
    for (let i = 0; i < scale.n; i++) {
      const a = angOf((scale.t0[i] + scale.t1[i]) / 2);
      const len = 4 + Math.min(10, meta.verseCount[i] / 12);
      const c = Math.cos(a), s = Math.sin(a);
      const sg = layout.half ? -1 : 1;
      ctx.moveTo(cx + (R - 6) * c, cy + sg * (R - 6) * s);
      ctx.lineTo(cx + (R - 6 - len) * c, cy + sg * (R - 6 - len) * s);
    }
    ctx.stroke();
  }

  if (showLabels) drawBookLabels(state, {});
}

/**
 * Book names are drawn in screen space (crisper, and easy to measure) with collision
 * avoidance: a book whose slice of the rim cannot fit its name falls back to its
 * abbreviation, and if even that will not fit the label is dropped until you zoom or hover.
 */
function drawBookLabels(state, opts) {
  const ctx = state.ctxOver;
  const { layout, scale, meta, theme, view } = state;
  const dpr = state.dpr;
  const books = meta.books;
  const hoverBook = state.hoverChapter != null ? meta.bookOf[state.hoverChapter] : -1;
  const selBook = state.selection.book;

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.textBaseline = 'middle';
  ctx.font = `600 10.5px "Iowan Old Style","Palatino Linotype",Georgia,serif`;

  if (opts.linear) {
    // Two/three staggered rows under the chapter bars, exactly like a scholarly plate.
    const rows = [-Infinity, -Infinity, -Infinity, -Infinity];
    for (let b = 0; b < books.length; b++) {
      const mid = (scale.bookStartT[b] + scale.bookEndT[b]) / 2;
      const sx = view.x + (layout.left + mid * layout.span) * view.k;
      const avail = (scale.bookEndT[b] - scale.bookStartT[b]) * layout.span * view.k;
      let text = books[b].n;
      let w = ctx.measureText(text).width * 0.6 + 8;
      if (w > avail * 2.1) { text = books[b].a; w = ctx.measureText(text).width * 0.6 + 8; }
      let row = 0;
      while (row < 3 && sx - w < rows[row]) row++;
      rows[row] = sx + w;
      const sy = view.y + (layout.base + 8 + 132 + 18) * view.k + row * 17;
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(-Math.PI / 3.05);
      ctx.textAlign = 'right';
      ctx.fillStyle = b === 0 || b === 39 ? theme.accent : theme.inkDim;
      ctx.globalAlpha = 0.95;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  /* Radial: stagger the 66 names across up to three concentric rings so every book is
     named, exactly like the poster; thin leader lines tie pushed-out names to their slice. */
  const sweep = layout.half ? Math.PI : Math.PI * 2;
  const rim = sweep * layout.R * view.k;          // rim length in screen px
  const rings = 4;
  const ringEnd = new Array(rings).fill(-Infinity);
  const maxShift = rim * 0.1;
  const zoomed = view.k > view.home.k * 1.5;

  for (let b = 0; b < books.length; b++) {
    const isFocus = b === hoverBook || b === selBook;
    const spanPx = (scale.bookEndT[b] - scale.bookStartT[b]) * rim;
    let text = books[b].n;
    let w = ctx.measureText(text).width + 8;
    if (!zoomed && w > spanPx * 1.04 && !isFocus) { text = books[b].a; w = ctx.measureText(text).width + 8; }
    const mid = (scale.bookStartT[b] + scale.bookEndT[b]) / 2;
    const uNatural = mid * rim;

    let placed = null;
    for (let r = 0; r < rings; r++) {
      const u = Math.max(uNatural, ringEnd[r] + w / 2);
      if (u - uNatural <= maxShift || r === rings - 1) {
        placed = { r, u: Math.min(u, rim - w / 2) };
        ringEnd[r] = placed.u + w / 2 + 5;
        break;
      }
    }
    if (!placed) continue;

    const t = Math.min(1, Math.max(0, placed.u / rim));
    const [wx, wy, a] = layout.labelAnchor(t, (20 + placed.r * 12.5) / view.k);
    const sx = wx * view.k + view.x;
    const sy = wy * view.k + view.y;

    // leader line from the slice to the label when the label was pushed
    if (placed.r > 0 || Math.abs(placed.u - uNatural) > 3) {
      const [ax, ay] = layout.labelAnchor(mid, 12 / view.k);
      ctx.strokeStyle = theme.inkDim;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(ax * view.k + view.x, ay * view.k + view.y);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.save();
    ctx.translate(sx, sy);
    if (layout.half) {
      ctx.rotate(Math.PI / 2 - a);
      ctx.textAlign = 'center';
    } else {
      const flip = Math.cos(a) < 0;
      ctx.rotate(a + Math.PI / 2 + (flip ? Math.PI : 0));
      ctx.textAlign = flip ? 'right' : 'left';
      ctx.translate(flip ? -7 : 7, 0);
    }
    ctx.fillStyle = isFocus || b === 0 || b === 39 ? theme.accent : theme.ink;
    ctx.globalAlpha = isFocus ? 1 : 0.9;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

/** Highlight overlay    ctx.globalAlpha = 1;
  }
}

/** Highlight overlay: hovered chapter, pinned selection, verse-level threads. */
export function paintHighlights(state) {
  const ctx = state.ctxOver;
  const { theme, layout, view, meta, links } = state;
  applyView(ctx, state, state.dpr);
  const hover = state.hoverChapter;
  const sel = state.selection.chapter;
  const lw = Math.max(0.2, 1 / view.k);

  // Outbound slice (links are sorted by source) + inbound index: no full scans on hover.
  const drawChapterArcs = (chapIdx, color, width, alpha) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    let drawn = 0;
    const minW = state.style.minWeight;
    const a0 = links.outStart[chapIdx], a1 = links.outStart[chapIdx + 1];
    for (let i = a0; i < a1; i++) {
      if (links.weight[i] < minW) continue;
      const o = i * 6;
      ctx.moveTo(state.geo[o], state.geo[o + 1]);
      ctx.quadraticCurveTo(state.geo[o + 4], state.geo[o + 5], state.geo[o + 2], state.geo[o + 3]);
      drawn++;
    }
    const i0 = links.inStart[chapIdx], i1 = links.inStart[chapIdx + 1];
    for (let k = i0; k < i1; k++) {
      const i = links.inIndex[k];
      if (links.weight[i] < minW) continue;
      const o = i * 6;
      ctx.moveTo(state.geo[o], state.geo[o + 1]);
      ctx.quadraticCurveTo(state.geo[o + 4], state.geo[o + 5], state.geo[o + 2], state.geo[o + 3]);
      drawn++;
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    return drawn;
  };

  if (sel != null) {
    drawChapterArcs(sel, theme.accent, lw * 2.1, 0.85);
    markChapter(state, sel, theme.accent, 9 / view.k);
  }
  if (hover != null && hover !== sel) {
    drawChapterArcs(hover, theme.highlight, lw * 1.5, 0.55);
    markChapter(state, hover, theme.highlight, 6 / view.k);
  }
  // verse-level golden threads
  if (state.verseThreads && state.verseThreads.length) {
    ctx.strokeStyle = theme.verse;
    ctx.lineWidth = lw * 1.7;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    for (const th of state.verseThreads) {
      ctx.moveTo(th[0], th[1]);
      ctx.quadraticCurveTo(th[4], th[5], th[2], th[3]);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    for (const th of state.verseThreads) {
      ctx.fillStyle = theme.verse;
      ctx.beginPath(); ctx.arc(th[2], th[3], 2.2 / view.k, 0, 6.284); ctx.fill();
    }
  }
  const bookSel = state.selection.book;
  if (bookSel != null && !layout.morphing) {
    markBook(state, bookSel, theme.accent);
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = lw * 1.3;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    const ot = meta.bookOf;
    for (let i = 0; i < links.count; i++) {
      if (links.weight[i] < state.style.minWeight) continue;
      if (ot[links.src[i]] !== bookSel && ot[links.dst[i]] !== bookSel) continue;
      const o = i * 6;
      ctx.moveTo(state.geo[o], state.geo[o + 1]);
      ctx.quadraticCurveTo(state.geo[o + 4], state.geo[o + 5], state.geo[o + 2], state.geo[o + 3]);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  if (state.selection.verse != null) {
    const p = versePoint(state, state.selection.verse);
    ctx.fillStyle = theme.verse;
    ctx.beginPath(); ctx.arc(p[0], p[1], 4 / view.k, 0, 6.284); ctx.fill();
  }
}

export function markBook(state, bookIdx, color) {
  const ctx = state.ctxOver;
  const { layout, scale } = state;
  if (!layout.radial || layout.morphing) return;
  const a0 = layout.half ? Math.PI * (1 - scale.bookStartT[bookIdx]) : -Math.PI / 2 + Math.PI * 2 * scale.bookStartT[bookIdx];
  const a1 = layout.half ? Math.PI * (1 - scale.bookEndT[bookIdx]) : -Math.PI / 2 + Math.PI * 2 * scale.bookEndT[bookIdx];
  const { cx, cy, R } = layout;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, 3 / state.view.k);
  ctx.beginPath();
  if (layout.half) ctx.arc(cx, cy, R, -a0, -a1);
  else ctx.arc(cx, cy, R, a0, a1);
  ctx.stroke();
}

export function markChapter(state, chapIdx, color, size) {
  const ctx = state.ctxOver;
  const { layout } = state;
  const mx = layout.mx[chapIdx], my = layout.my[chapIdx];
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(mx, my, size * 0.42, 0, 6.284);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = Math.max(0.2, 0.8 / state.view.k);
  ctx.beginPath();
  ctx.arc(mx, my, size, 0, 6.284);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/** World-space point for a global verse index (interpolated inside its chapter). */
export function versePoint(state, globalVerse) {
  const { meta, layout } = state;
  const c = meta.chapterOfVerse[globalVerse];
  const f = (globalVerse - meta.verseOffset[c] + 0.5) / meta.verseCount[c];
  const t = scale_t(state, c, f);
  if (layout.pointAtT) {
    const p = layout.pointAtT(t);
    return [p[0], p[1]];
  }
  return [layout.mx[c], layout.my[c]];
}

function scale_t(state, chapterIdx, f) {
  const s = state.scale;
  return s.t0[chapterIdx] + (s.t1[chapterIdx] - s.t0[chapterIdx]) * f;
}

/** Fit the world box into the canvas (CSS pixels). */
export function fitView(state) {
  const { width, height } = state.size;
  const b = state.layout?.bbox || { x: 0, y: 0, w: WORLD.w, h: WORLD.h };
  const pad = 10;
  const k = Math.min((width - pad * 2) / b.w, (height - pad * 2) / b.h);
  const x = (width - b.w * k) / 2 - b.x * k;
  const y = (height - b.h * k) / 2 - b.y * k;
  state.view = { k, x, y, home: { k, x, y } };
}

export function screenToWorld(state, sx, sy) {
  const v = state.view;
  return [(sx - v.x) / v.k, (sy - v.y) / v.k];
}

export function worldToScreen(state, wx, wy) {
  const v = state.view;
  return [wx * v.k + v.x, wy * v.k + v.y];
}

export { roundRect, HUE_STEPS, ALPHA_STEPS, NUM_BUCKETS };
