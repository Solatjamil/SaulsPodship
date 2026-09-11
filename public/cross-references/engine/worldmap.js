/* worldmap.js — flat equirectangular choropleth of majority religion by territory,
   with world adherent totals and per-country populations.
   Data: package/data/world.json (Natural Earth 110 m · UN 2024/25 populations ·
   Pew / World Religion Database 2023 majority shares). See tools/build_worldmap.py. */

import { injectStyles } from './styles.js';

const SVGNS = 'http://www.w3.org/2000/svg';

function fmtPop(n) {
  if (!n) return '—';
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, '') + ' B';
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e8 ? 0 : 1).replace(/\.0$/, '') + ' M';
  if (n >= 1e3) return Math.round(n / 1e3) + ' k';
  return String(n);
}

function ringCentroid(flat) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < flat.length; i += 2) {
    const x1 = flat[i], y1 = flat[i + 1];
    const x2 = flat[(i + 2) % flat.length], y2 = flat[(i + 3) % flat.length];
    const f = x1 * y2 - x2 * y1;
    a += f; cx += (x1 + x2) * f; cy += (y1 + y2) * f;
  }
  if (!a) return [flat[0], flat[1]];
  return [cx / (3 * a), cy / (3 * a)];
}

function pathOf(rings) {
  let d = '';
  for (const r of rings) {
    d += 'M' + r[0] + ' ' + r[1];
    for (let i = 2; i < r.length; i += 2) d += 'L' + r[i] + ' ' + r[i + 1];
    d += 'Z';
  }
  return d;
}

/**
 * Render the world religion map into `el`.
 * @param {HTMLElement} el
 * @param {{baseUrl?: string, title?: string, minLabelPop?: number}} [opts]
 * @returns {Promise<{data: object, svg: SVGElement}>}
 */
export async function renderWorldReligionMap(el, opts = {}) {
  const doc = el.ownerDocument || document;
  injectStyles(doc);
  const baseUrl = String(opts.baseUrl || 'data').replace(/\/+$/, '');
  const url = new URL(baseUrl + '/world.json', doc.location ? doc.location.href : undefined);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error('world.json: HTTP ' + res.status);
  const data = await res.json();

  const cats = data.cats;
  const order = Object.keys(cats);
  el.classList.add('spcrmap');
  el.innerHTML = '';

  /* ---- head ---- */
  const head = doc.createElement('div');
  head.className = 'spcrmap__head';
  const h = doc.createElement('h3');
  h.textContent = opts.title || 'The world by faith — every territory filled by its majority religion';
  const sub = doc.createElement('p');
  sub.textContent = 'Christianity in green; each other faith in its own colour. ' +
    'World population ' + fmtPop(data.worldPop) + '. Hover a territory for its population and majority share.';
  head.append(h, sub);

  /* ---- svg ---- */
  const wrap = doc.createElement('div');
  wrap.className = 'spcrmap__wrap';
  const svg = doc.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + data.w + ' ' + data.h);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Flat world map coloured by majority religion: ' +
    order.map((k) => cats[k].label).join(', ') + '.');
  const ocean = doc.createElementNS(SVGNS, 'rect');
  ocean.setAttribute('width', data.w); ocean.setAttribute('height', data.h);
  ocean.setAttribute('class', 'spcrmap__ocean');
  svg.appendChild(ocean);

  const tip = doc.createElement('div');
  tip.className = 'spcrmap__tip';
  tip.hidden = true;

  const gCountries = doc.createElementNS(SVGNS, 'g');
  const gLabels = doc.createElementNS(SVGNS, 'g');
  const minLabelPop = opts.minLabelPop || 90e6;
  const labelQueue = [];

  for (const c of data.countries) {
    const cat = cats[c.c] || cats[order[0]];
    const p = doc.createElementNS(SVGNS, 'path');
    p.setAttribute('d', pathOf(c.rings));
    p.setAttribute('fill', cat.color);
    p.setAttribute('class', 'spcrmap__country');
    p.dataset.name = c.n;
    const t = doc.createElementNS(SVGNS, 'title');
    t.textContent = c.n + ' — ' + cat.label + ' ' + c.pct + '% · pop ' + fmtPop(c.pop);
    p.appendChild(t);
    p.addEventListener('pointerenter', () => {
      tip.hidden = false;
      tip.innerHTML = '<b>' + c.n + '</b>' +
        '<span style="background:' + cat.color + '"></span>' + cat.label + ' majority (' + c.pct + '%)<br>' +
        'Population ' + fmtPop(c.pop) + (c.pop ? ' (' + c.pop.toLocaleString('en-US') + ')' : '');
      p.classList.add('is-hot');
    });
    p.addEventListener('pointermove', (ev) => {
      const r = wrap.getBoundingClientRect();
      const x = ev.clientX - r.left, y = ev.clientY - r.top;
      tip.style.left = Math.min(x + 14, r.width - 190) + 'px';
      tip.style.top = Math.max(8, y - 54) + 'px';
    });
    p.addEventListener('pointerleave', () => { tip.hidden = true; p.classList.remove('is-hot'); });
    gCountries.appendChild(p);

    if (c.pop >= minLabelPop) {
      labelQueue.push(c);
    }
  }
  labelQueue.sort((a, b) => b.pop - a.pop);
  const placed = [];
  for (const c of labelQueue) {
    let best = null, bestA = -1;
    for (const r of c.rings) {
      let a = 0;
      for (let i = 0; i < r.length; i += 2) {
        const x1 = r[i], y1 = r[i + 1], x2 = r[(i + 2) % r.length], y2 = r[(i + 3) % r.length];
        a += x1 * y2 - x2 * y1;
      }
      a = Math.abs(a);
      const cc = ringCentroid(r);
      if (cc[0] < 0 || cc[0] > data.w) continue;  // skip antimeridian mirrors
      if (a > bestA) { bestA = a; best = r; }
    }
    if (!best) continue;
    let [cx, cy] = ringCentroid(best);
    const txt = fmtPop(c.pop);
    const bw = txt.length * 5.4, bh = 10;
    let done = false;
    for (const dy of [0, 11, -11, 22, -22, 33, -33]) {
      const y = cy + dy;
      const box = [cx - bw / 2, y - bh / 2, cx + bw / 2, y + bh / 2];
      if (!placed.some((p) => box[0] < p[2] && p[0] < box[2] && box[1] < p[3] && p[1] < box[3])) {
        placed.push(box); cy = y; done = true; break;
      }
    }
    if (!done) continue;
    const tx = doc.createElementNS(SVGNS, 'text');
    tx.setAttribute('x', cx); tx.setAttribute('y', cy);
    tx.setAttribute('class', 'spcrmap__pop');
    tx.textContent = txt;
    gLabels.appendChild(tx);
  }

  svg.append(gCountries, gLabels);
  wrap.append(svg, tip);

  /* ---- legend with adherent populations ---- */
  const legend = doc.createElement('ul');
  legend.className = 'spcrmap__legend';
  const perCat = {};
  for (const c of data.countries) perCat[c.c] = (perCat[c.c] || 0) + 1;
  for (const k of order) {
    const li = doc.createElement('li');
    const sw = doc.createElement('i');
    sw.style.background = cats[k].color;
    const b = doc.createElement('b');
    b.textContent = fmtPop(cats[k].adherents);
    const span = doc.createElement('span');
    span.textContent = cats[k].label + ' · ' + (perCat[k] || 0) + ' territories';
    li.append(sw, b, span);
    li.title = cats[k].label + ': ≈' + cats[k].adherents.toLocaleString('en-US') + ' adherents worldwide';
    legend.appendChild(li);
  }

  const src = doc.createElement('p');
  src.className = 'spcrmap__src';
  src.textContent = 'Boundaries: Natural Earth 1:110 m (public domain). Populations: Wikipedia list of countries '
    + 'by population (national statistical-office & UN estimates, 2025-26). Majority religion & share: Pew Research / '
    + 'World Religion Database, 2023. Adherent totals are global estimates.';

  el.append(head, wrap, legend, src);
  return { data, svg };
}
