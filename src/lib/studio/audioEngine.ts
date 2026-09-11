/**
 * Scriptorium Studio — Web Audio playback engine.
 * Synthesises the composition in the browser: tanpura/shruti drone,
 * a lead voice (harmonium-like additive tone), a bass line and a
 * simple tabla/dholak kit derived from the taal. Also renders the
 * same score offline to a WAV blob for download.
 */
import type { Composition } from './composeEngine';
import { nameToMidi } from './composeEngine';

const DUR: Record<string, number> = { w: 4, h: 2, q: 1, e: 0.5, s: 0.25 };
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export interface ScheduledNote { t: number; d: number; midi: number; part: 'lead' | 'bass'; section: number; bar: number }

/** Flatten the composition into an absolute-time event list */
export function schedule(c: Composition): { notes: ScheduledNote[]; total: number; barTimes: number[]; beat: number } {
  const beat = 60 / c.bpm; const notes: ScheduledNote[] = []; const barTimes: number[] = [];
  let t = 0; let bar = 0;
  c.sections.forEach((s, si) => {
    s.melody.forEach((m, mi) => {
      barTimes.push(t); let tt = t;
      m.notes.forEach((n, i) => { const d = (DUR[m.durations[i]] || 1) * beat; notes.push({ t: tt, d, midi: nameToMidi(n), part: 'lead', section: si, bar }); tt += d; });
      const barLen = c.beatsPerBar * beat;
      // bass part shares the bar index
      const bm = c.sheetNotes[1]?.measures[bar]; let bt = t;
      if (bm) bm.notes.forEach((n, i) => { const d = (DUR[bm.durations[i]] || 1) * beat; if (bt - t < barLen) notes.push({ t: bt, d: Math.min(d, barLen - (bt - t)), midi: nameToMidi(n), part: 'bass', section: si, bar }); bt += d; });
      t += Math.max(barLen, tt - t); bar++;
    });
  });
  return { notes, total: t + beat * 2, barTimes, beat };
}

type Ctx = AudioContext | OfflineAudioContext;

function leadVoice(ctx: Ctx, out: AudioNode, f: number, t0: number, d: number, style: string) {
  const g = ctx.createGain(); g.connect(out);
  const a = Math.min(0.06, d * 0.3); const r = Math.min(0.25, d * 0.5);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.22, t0 + a); g.gain.setValueAtTime(0.22, t0 + d - r); g.gain.linearRampToValueAtTime(0, t0 + d);
  const partials = style === 'orchestral' || style === 'contemporary' ? [[1, 1, 'sawtooth'], [2, 0.25, 'sine']] : [[1, 1, 'triangle'], [2, 0.35, 'sine'], [3, 0.18, 'sine'], [4, 0.08, 'sine']];
  partials.forEach(([mul, amp, type]) => {
    const o = ctx.createOscillator(); o.type = type as OscillatorType; o.frequency.value = f * (mul as number);
    // gentle meend (slide) into the note for the South Asian styles
    if (mul === 1 && (style === 'raag' || style === 'punjabi' || style === 'urdu-ghazal')) { o.frequency.setValueAtTime(f * 0.97, t0); o.frequency.exponentialRampToValueAtTime(f, t0 + Math.min(0.08, d / 3)); }
    const pg = ctx.createGain(); pg.gain.value = amp as number; o.connect(pg).connect(g); o.start(t0); o.stop(t0 + d + 0.05);
  });
  // vibrato
  const lfo = ctx.createOscillator(); const lg = ctx.createGain(); lfo.frequency.value = 5.5; lg.gain.value = f * 0.004; lfo.connect(lg);
  // (vibrato only on the fundamental is enough for the ear) — attach to nothing if unsupported
  lfo.start(t0); lfo.stop(t0 + d + 0.05);
}

function bassVoice(ctx: Ctx, out: AudioNode, f: number, t0: number, d: number) {
  const g = ctx.createGain(); g.connect(out);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.28, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + d);
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(g); o.start(t0); o.stop(t0 + d + 0.05);
  const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2; const g2 = ctx.createGain(); g2.gain.value = 0.15; o2.connect(g2).connect(g); o2.start(t0); o2.stop(t0 + d + 0.05);
}

function drone(ctx: Ctx, out: AudioNode, rootMidi: number, t0: number, t1: number) {
  const g = ctx.createGain(); g.connect(out); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.07, t0 + 1.5); g.gain.setValueAtTime(0.07, t1 - 1.5); g.gain.linearRampToValueAtTime(0, t1);
  [rootMidi - 12, rootMidi - 5, rootMidi, rootMidi + 7].forEach((m, i) => {
    const o = ctx.createOscillator(); o.type = i % 2 ? 'sawtooth' : 'triangle'; o.frequency.value = mtof(m);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; const pg = ctx.createGain(); pg.gain.value = i === 2 ? 0.6 : 0.35;
    o.connect(f).connect(pg).connect(g); o.start(t0); o.stop(t1);
  });
}

/** Tabla-ish kit: "dha/dhin" = tuned low hit, "na/tin/ta" = high tick, "ge" = bayan boom */
function perc(ctx: Ctx, out: AudioNode, kind: 'low' | 'high' | 'boom', t0: number, vel = 1) {
  const g = ctx.createGain(); g.connect(out);
  if (kind === 'high') {
    const n = noise(ctx, 0.08); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = 6;
    g.gain.setValueAtTime(0.18 * vel, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08); n.connect(f).connect(g); n.start(t0);
    return;
  }
  const o = ctx.createOscillator(); o.type = 'sine';
  const f0 = kind === 'boom' ? 75 : 180; o.frequency.setValueAtTime(f0 * 1.6, t0); o.frequency.exponentialRampToValueAtTime(f0, t0 + (kind === 'boom' ? 0.18 : 0.06));
  g.gain.setValueAtTime((kind === 'boom' ? 0.5 : 0.3) * vel, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + (kind === 'boom' ? 0.45 : 0.22));
  o.connect(g); o.start(t0); o.stop(t0 + 0.5);
}
function noise(ctx: Ctx, dur: number) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(); s.buffer = buf; return s;
}

function thekaPattern(theka: string | undefined, beatsPerBar: number): ('low' | 'high' | 'boom' | null)[] {
  const bols = (theka || 'DHA GE NA TI NA KA DHIN NA').replace(/\|/g, ' ').trim().split(/\s+/);
  const map = (b: string) => /^DHA|DHIN/i.test(b) ? 'low' : /^GE|GHE|KAT/i.test(b) ? 'boom' : /^NA|TIN|TA|TI|KA|TU|TIRKIT|DHAGE/i.test(b) ? 'high' : null;
  const pat = bols.map(map);
  // fit to bar: if pattern longer than beats*2 it's a 16-beat theka expressed in half-beats
  return pat;
}

function renderInto(ctx: Ctx, master: AudioNode, c: Composition, startAt: number, muted: { drone: boolean; perc: boolean; bass: boolean }) {
  const { notes, total, barTimes, beat } = schedule(c);
  const isSA = ['punjabi', 'raag', 'urdu-ghazal'].includes(c.style) || !!c.raag;
  if (!muted.drone && (isSA || c.style === 'soothing')) drone(ctx, master, c.rootMidi, startAt, startAt + total);
  notes.forEach(n => { if (n.part === 'lead') leadVoice(ctx, master, mtof(n.midi), startAt + n.t, n.d, c.style); else if (!muted.bass) bassVoice(ctx, master, mtof(n.midi), startAt + n.t, n.d); });
  if (!muted.perc) {
    const pat = thekaPattern(c.theka, c.beatsPerBar); const barLen = c.beatsPerBar * beat;
    const sub = pat.length / c.beatsPerBar; // hits per beat
    barTimes.forEach((bt, bi) => {
      const sec = c.sections.findIndex((s, i, arr) => { const start = arr.slice(0, i).reduce((n, x) => n + x.measures, 0); return bi >= start && bi < start + s.measures; });
      if (sec <= 0) return; // no percussion in the intro
      const vel = sec === 2 || sec === 4 || sec === 6 ? 1 : 0.7;
      pat.forEach((k, i) => { if (!k) return; const t = startAt + bt + (i / sub) * beat; if (t < startAt + bt + barLen) perc(ctx, master, k, t, i === 0 ? 1 : vel * 0.8); });
    });
  }
  return total;
}

export class StudioPlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private startedAt = 0; private total = 0; private raf = 0;
  onProgress?: (elapsed: number, total: number, bar: number) => void;
  onEnd?: () => void;
  muted = { drone: false, perc: false, bass: false };
  private barTimes: number[] = [];

  get playing() { return !!this.ctx; }

  play(c: Composition) {
    this.stop();
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext; const ctx = new AC();
    const master = ctx.createGain(); master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; master.connect(comp).connect(ctx.destination);
    this.ctx = ctx; this.master = master; this.barTimes = schedule(c).barTimes;
    const t0 = ctx.currentTime + 0.1; this.total = renderInto(ctx, master, c, t0, this.muted); this.startedAt = t0;
    const tick = () => { if (!this.ctx) return; const el = this.ctx.currentTime - this.startedAt; const bar = this.barTimes.filter(b => b <= el).length - 1; this.onProgress?.(Math.max(0, el), this.total, Math.max(0, bar)); if (el >= this.total) { this.stop(); this.onEnd?.(); return; } this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);
  }
  stop() { cancelAnimationFrame(this.raf); if (this.ctx) { try { this.master?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05); const c = this.ctx; setTimeout(() => c.close().catch(() => {}), 200); } catch { /* noop */ } } this.ctx = null; this.master = null; }
}

/** Render to a 44.1 kHz stereo WAV blob */
export async function renderWav(c: Composition, muted = { drone: false, perc: false, bass: false }): Promise<Blob> {
  const { total } = schedule(c); const sr = 44100;
  const ctx = new OfflineAudioContext(2, Math.ceil((total + 1) * sr), sr);
  const master = ctx.createGain(); master.gain.value = 0.9; const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; master.connect(comp).connect(ctx.destination);
  renderInto(ctx, master, c, 0.05, muted);
  const buf = await ctx.startRendering();
  return encodeWav(buf);
}

function encodeWav(buf: AudioBuffer): Blob {
  const ch = buf.numberOfChannels, len = buf.length, sr = buf.sampleRate; const bytes = 44 + len * ch * 2;
  const ab = new ArrayBuffer(bytes); const v = new DataView(ab); let p = 0;
  const w32 = (s: string) => { for (let i = 0; i < 4; i++) v.setUint8(p++, s.charCodeAt(i)); };
  w32('RIFF'); v.setUint32(p, bytes - 8, true); p += 4; w32('WAVE'); w32('fmt '); v.setUint32(p, 16, true); p += 4; v.setUint16(p, 1, true); p += 2; v.setUint16(p, ch, true); p += 2; v.setUint32(p, sr, true); p += 4; v.setUint32(p, sr * ch * 2, true); p += 4; v.setUint16(p, ch * 2, true); p += 2; v.setUint16(p, 16, true); p += 2; w32('data'); v.setUint32(p, len * ch * 2, true); p += 4;
  const chans = Array.from({ length: ch }, (_, i) => buf.getChannelData(i));
  for (let i = 0; i < len; i++) for (let c = 0; c < ch; c++) { const s = Math.max(-1, Math.min(1, chans[c][i])); v.setInt16(p, s < 0 ? s * 0x8000 : s * 0x7FFF, true); p += 2; }
  return new Blob([ab], { type: 'audio/wav' });
}

/* ------------------------------------------------------------ library */
const KEY = 'sp-studio-library-v1';
export function loadLibrary(): Composition[] { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } }
export function saveToLibrary(c: Composition) { const lib = loadLibrary().filter(x => x.id !== c.id); lib.unshift(c); localStorage.setItem(KEY, JSON.stringify(lib.slice(0, 60))); return lib; }
export function removeFromLibrary(id: string) { const lib = loadLibrary().filter(x => x.id !== id); localStorage.setItem(KEY, JSON.stringify(lib)); return lib; }

/** Export lyrics + chords as a plain text lead sheet */
export function leadSheetText(c: Composition) {
  const out = [`${c.title}`, `${c.subtitle}`, `Key: ${c.key} · ${c.timeSig}${c.taal ? ` · ${c.taal}` : ''} · ${c.bpm} BPM`, `Scripture: ${c.biblicalReference}`, ''];
  c.sections.forEach(s => { out.push(`[${s.name}]  (${s.dynamicMarking})`); out.push(`   ${s.chordProgression.join('  |  ')}`); s.lyrics.forEach(l => out.push(`   ${l}`)); out.push(''); });
  if (c.theka) out.push(`Theka: ${c.theka}`); out.push('', 'Saul’s Podship · Scriptorium Studio');
  return out.join('\n');
}
