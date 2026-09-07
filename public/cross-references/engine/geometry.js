/**
 * geometry.js — scales, the three layouts (horseshoe / circle / linear), morphing and hit-testing.
 * Everything lives in a fixed 1600x1000 "world" box; the renderer fits that box to the canvas.
 */

export const WORLD = { w: 1600, h: 1000 };

export const LAYOUTS = {
  horseshoe: { label: 'Horseshoe', hint: 'The classic half-circle bowl' },
  circle: { label: 'Circle', hint: 'Full radial mandala' },
  linear: { label: 'Linear', hint: 'Flat arc chart with chapter bars' },
};

/**
 * Chapters are laid out along a 0..1 spine whose length is proportional to verse count
 * (so Psalm 119 is visibly the longest chapter), with a small gap after each book.
 */
export function buildScale(meta, opts = {}) {
  const gapVerses = opts.gapVerses ?? 10;
  const n = meta.chapterCount;
  const t0 = new Float64Array(n);
  const t1 = new Float64Array(n);
  let total = 0;
  for (let i = 0; i < n; i++) total += meta.verseCount[i] + gapVerses;

  let acc = 0;
  let prevBook = -1;
  const bookStartT = new Float64Array(meta.books.length);
  const bookEndT = new Float64Array(meta.books.length);
  for (let i = 0; i < n; i++) {
    const b = meta.bookOf[i];
    if (b !== prevBook) {
      if (prevBook >= 0) acc += gapVerses; // gap between books only
      bookStartT[b] = acc / total;
      prevBook = b;
    }
    t0[i] = acc / total;
    acc += meta.verseCount[i];
    t1[i] = acc / total;
    bookEndT[b] = acc / total;
  }
  return { n, t0, t1, total, bookStartT, bookEndT, gapVerses };
}

/** Binary search: the chapter containing normalized position t. */
export function chapterAtT(scale, t) {
  const { t0, t1, n } = scale;
  if (t <= 0) return 0;
  if (t >= 1) return n - 1;
  let lo = 0;
  let hi = n - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (t < t0[mid]) hi = mid - 1;
    else if (t > t1[mid]) lo = mid + 1;
    else return mid;
  }
  // fall back to the nearest chapter (handles book gaps)
  let best = lo;
  let bestD = Infinity;
  for (let i = Math.max(0, lo - 2); i <= Math.min(n - 1, lo + 2); i++) {
    const d = t < t0[i] ? t0[i] - t : t > t1[i] ? t - t1[i] : 0;
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

/* ------------------------------------------------------------------ layouts */

function alloc(n) {
  return {
    x0: new Float32Array(n), y0: new Float32Array(n),
    x1: new Float32Array(n), y1: new Float32Array(n),
    mx: new Float32Array(n), my: new Float32Array(n),
    nx: new Float32Array(n), ny: new Float32Array(n), // outward normal
  };
}

function radialLayout(scale, key) {
  const n = scale.n;
  const g = alloc(n);
  const half = key === 'horseshoe';
  const cx = 800;
  const cy = half ? 880 : 500;
  const R = half ? 730 : 400;

  // Horseshoe: Genesis at the far left, over the top, Revelation at the far right.
  //   angle a runs PI -> 0 and the bowl is drawn ABOVE the centre (canvas y grows down).
  // Circle: Genesis at 12 o'clock, sweeping clockwise to Revelation.
  const ang = (t) => (half ? Math.PI * (1 - t) : -Math.PI / 2 + Math.PI * 2 * t);
  const pt = (t) => {
    const a = ang(t);
    return half
      ? [cx + R * Math.cos(a), cy - R * Math.sin(a), a]
      : [cx + R * Math.cos(a), cy + R * Math.sin(a), a];
  };
  const nrm = (a) => (half ? [Math.cos(a), -Math.sin(a)] : [Math.cos(a), Math.sin(a)]);

  for (let i = 0; i < n; i++) {
    const [ax, ay] = pt(scale.t0[i]);
    const [bx, by] = pt(scale.t1[i]);
    const [mxv, myv, ma] = pt((scale.t0[i] + scale.t1[i]) / 2);
    g.x0[i] = ax; g.y0[i] = ay; g.x1[i] = bx; g.y1[i] = by;
    g.mx[i] = mxv; g.my[i] = myv;
    const [nxv, nyv] = nrm(ma);
    g.nx[i] = nxv; g.ny[i] = nyv;
  }

  const pad = 66;
  const bbox = half
    ? { x: cx - R - pad, y: cy - R - pad, w: (R + pad) * 2, h: R + pad * 2 }
    : { x: cx - R - pad, y: cy - R - pad, w: (R + pad) * 2, h: (R + pad) * 2 };
  const L = {
    key, radial: true, half, cx, cy, R, bbox,
    world: WORLD, ...g,
    pointAtT: (t) => { const [x, y] = pt(t); return [x, y]; },
    /** world point -> normalized t, or null when outside the interactive band */
    tAtPoint(px, py, band) {
      const r = Math.hypot(px - cx, py - cy);
      if (r < R - band || r > R + band) return null;
      if (half) {
        const a = Math.atan2(cy - py, px - cx); // 0..PI across the top
        if (a < -0.05 || a > Math.PI + 0.05) return null;
        return Math.min(1, Math.max(0, 1 - a / Math.PI));
      }
      let rel = Math.atan2(py - cy, px - cx) + Math.PI / 2;
      const two = Math.PI * 2;
      rel = ((rel % two) + two) % two;
      return rel / two;
    },
    labelAnchor(t, offset) {
      const a = ang(t);
      return half
        ? [cx + (R + offset) * Math.cos(a), cy - (R + offset) * Math.sin(a), a]
        : [cx + (R + offset) * Math.cos(a), cy + (R + offset) * Math.sin(a), a];
    },
  };
  return L;
}

function linearLayout(scale) {
  const n = scale.n;
  const g = alloc(n);
  const left = 70;
  const right = 1530;
  const base = 800;
  const span = right - left;
  const pt = (t) => [left + t * span, base];

  for (let i = 0; i < n; i++) {
    const [ax] = pt(scale.t0[i]);
    const [bx] = pt(scale.t1[i]);
    const [mxv] = pt((scale.t0[i] + scale.t1[i]) / 2);
    g.x0[i] = ax; g.y0[i] = base; g.x1[i] = bx; g.y1[i] = base;
    g.mx[i] = mxv; g.my[i] = base;
    g.nx[i] = 0; g.ny[i] = -1;
  }

  const maxVerses = 176; // Psalm 119
  return {
    key: 'linear', radial: false, left, right, base, span,
    bbox: { x: left - 60, y: base - 800, w: (right - left) + 120, h: 800 + 250 },
    distMaxPx: span,
    world: WORLD, ...g, maxVerses,
    pointAtT: (t) => pt(t),
    tAtPoint(px, py, band) {
      if (py < base - band * 3 || py > base + 240) return null;
      const t = (px - left) / span;
      return t < -0.01 || t > 1.01 ? null : Math.min(1, Math.max(0, t));
    },
    labelAnchor(t, offset) { return [left + t * span, base + offset, 0]; },
  };
}

export function computeLayout(scale, key) {
  if (key === 'linear') return linearLayout(scale);
  return radialLayout(scale, key);
}

/** Interpolated point arrays used while morphing between two layouts. */
export function morphLayouts(A, B, k) {
  const n = A.mx.length;
  const mx = new Float32Array(n);
  const my = new Float32Array(n);
  const x0 = new Float32Array(n);
  const y0 = new Float32Array(n);
  const x1 = new Float32Array(n);
  const y1 = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    mx[i] = A.mx[i] + (B.mx[i] - A.mx[i]) * k;
    my[i] = A.my[i] + (B.my[i] - A.my[i]) * k;
    x0[i] = A.x0[i] + (B.x0[i] - A.x0[i]) * k;
    y0[i] = A.y0[i] + (B.y0[i] - A.y0[i]) * k;
    x1[i] = A.x1[i] + (B.x1[i] - A.x1[i]) * k;
    y1[i] = A.y1[i] + (B.y1[i] - A.y1[i]) * k;
  }
  return {
    key: k < 0.5 ? A.key : B.key, morphing: true, radial: k < 0.5 ? A.radial : B.radial,
    world: WORLD, mx, my, x0, y0, x1, y1,
    nx: k < 0.5 ? A.nx : B.nx, ny: k < 0.5 ? A.ny : B.ny,
    cx: A.cx, cy: A.cy, R: A.R, base: A.base, left: A.left, span: A.span,
    pointAtT: k < 0.5 ? A.pointAtT : B.pointAtT,
    tAtPoint: () => null,
    labelAnchor: (k < 0.5 ? A : B).labelAnchor,
  };
}

/* ------------------------------------------------------- arc geometry cache */

/**
 * Control point for the quadratic thread between two chapter anchors.
 * Radial layouts bow inward toward the centre; the linear chart arcs upward.
 */
export function controlPoint(layout, x1, y1, x2, y2, curve = 0.26) {
  const midx = (x1 + x2) / 2;
  const midy = (y1 + y2) / 2;
  if (layout.key === 'linear' && !layout.morphing) {
    // Height is normalised to the longest *visible* thread with a sqrt ease, so the
    // plate always fills the frame no matter how hard the strength filter is set.
    const maxPx = layout.distMaxPx || layout.span || 1460;
    const t = Math.min(1, Math.abs(x2 - x1) / maxPx);
    return [midx, layout.base - (28 + 1420 * Math.sqrt(t))];
  }
  const cx = layout.cx ?? 800;
  const cy = layout.cy ?? (layout.base != null ? layout.base - 380 : 500);
  return [midx + (cx - midx) * (1 - curve), midy + (cy - midy) * (1 - curve)];
}


/**
 * Pre-compute the six control numbers for every arc so painting is a tight typed-array loop.
 *   [x1, y1, x2, y2, cx, cy] per arc  -> Float32Array(count * 6)
 * `curve` (0..1) pulls radial chords toward the centre: 0 = through the centre, 1 = straight chord.
 */
export function computeArcGeometry(layout, links, curve = 0.08) {
  const n = links.count;
  const geo = new Float32Array(n * 6);
  const { src, dst } = links;
  const mx = layout.mx, my = layout.my;
  for (let i = 0; i < n; i++) {
    const a = src[i], b = dst[i], o = i * 6;
    const x1 = mx[a], y1 = my[a], x2 = mx[b], y2 = my[b];
    geo[o] = x1; geo[o + 1] = y1; geo[o + 2] = x2; geo[o + 3] = y2;
    const c = controlPoint(layout, x1, y1, x2, y2, curve);
    geo[o + 4] = c[0]; geo[o + 5] = c[1];
  }
  return geo;
}
