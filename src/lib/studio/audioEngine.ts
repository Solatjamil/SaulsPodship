/**
 * Scriptorium Studio — Web Audio playback engine.
 * Synthesises the composition in the browser: tanpura/shruti drone,
 * a formant-shaped sung lead with vibrato and meend, harmonium doubling,
 * chord pad, bass line, tabla/dholak kit from the taal, and a hall reverb. Also renders the
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

/* ------------------------------------------------------------ voices */
/** Sung lead: a bright pulse/saw source shaped by two vowel formant filters,
 *  with a real (connected) vibrato LFO and a meend (slide) into each note. */
function leadVoice(ctx: Ctx, out: AudioNode, f: number, t0: number, d: number, style: string, vel = 1) {
  const g = ctx.createGain(); g.connect(out);
  const a = Math.min(0.09, d * 0.3); const r = Math.min(0.3, d * 0.45); const lvl = 0.5 * vel;
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(lvl, t0 + a); g.gain.setValueAtTime(lvl, t0 + Math.max(a, d - r)); g.gain.linearRampToValueAtTime(0, t0 + d);
  const sa = ['raag', 'punjabi', 'urdu-ghazal'].includes(style);
  // two detuned sources = natural chorus
  const srcs: OscillatorNode[] = [];
  [[0, 1], [7, 0.6]].forEach(([cents, amp]) => {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.detune.value = cents as number;
    o.frequency.setValueAtTime(sa ? f * 0.965 : f * 0.985, t0); o.frequency.exponentialRampToValueAtTime(f, t0 + Math.min(sa ? 0.12 : 0.05, d / 3));
    const pg = ctx.createGain(); pg.gain.value = amp as number; o.connect(pg);
    srcs.push(o); o.start(t0); o.stop(t0 + d + 0.05);
    // formants: vowel "aa" (700 / 1200 Hz) drifting to "ee/o" on long notes
    const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 700; f1.Q.value = 5;
    const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1200; f2.Q.value = 7;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3400;
    if (d > 1.2) { f1.frequency.linearRampToValueAtTime(520, t0 + d); f2.frequency.linearRampToValueAtTime(1000, t0 + d); }
    const mix = ctx.createGain(); mix.gain.value = 1.6;
    pg.connect(f1).connect(mix); pg.connect(f2).connect(mix); pg.connect(lp); const lpg = ctx.createGain(); lpg.gain.value = 0.25; lp.connect(lpg).connect(mix);
    mix.connect(g);
  });
  // connected vibrato, fading in after the onset like a singer
  const lfo = ctx.createOscillator(); lfo.frequency.value = sa ? 5.2 : 5.8; const lg = ctx.createGain();
  lg.gain.setValueAtTime(0, t0); lg.gain.linearRampToValueAtTime(f * 0.012, t0 + Math.min(0.35, d * 0.5));
  lfo.connect(lg); srcs.forEach(o => lg.connect(o.frequency)); lfo.start(t0); lfo.stop(t0 + d + 0.05);
}

/** Harmonium / organ doubling of the melody — sustained reeds an octave around the voice */
function harmonium(ctx: Ctx, out: AudioNode, f: number, t0: number, d: number) {
  const g = ctx.createGain(); g.connect(out);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.11, t0 + 0.04); g.gain.setValueAtTime(0.11, t0 + d - 0.05); g.gain.linearRampToValueAtTime(0, t0 + d + 0.02);
  [[1, 1, 'square'], [2, 0.3, 'sawtooth'], [0.5, 0.35, 'square']].forEach(([mul, amp, type]) => {
    const o = ctx.createOscillator(); o.type = type as OscillatorType; o.frequency.value = f * (mul as number); o.detune.value = (Math.random() - 0.5) * 6;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1800; const pg = ctx.createGain(); pg.gain.value = amp as number;
    o.connect(lp).connect(pg).connect(g); o.start(t0); o.stop(t0 + d + 0.1);
  });
}

/** Soft chord pad under each bar (strings / synth pad) */
function chordPad(ctx: Ctx, out: AudioNode, midis: number[], t0: number, d: number, style: string) {
  const g = ctx.createGain(); g.connect(out);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.07, t0 + 0.5); g.gain.setValueAtTime(0.07, t0 + d - 0.4); g.gain.linearRampToValueAtTime(0, t0 + d + 0.05);
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = style === 'contemporary' ? 2200 : 1400; lp.connect(g);
  midis.forEach(m => [-6, 6].forEach(det => { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = det; const pg = ctx.createGain(); pg.gain.value = 0.35; o.connect(pg).connect(lp); o.start(t0); o.stop(t0 + d + 0.1); }));
}

function bassVoice(ctx: Ctx, out: AudioNode, f: number, t0: number, d: number) {
  const g = ctx.createGain(); g.connect(out);
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.32, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t0 + d);
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.connect(g); o.start(t0); o.stop(t0 + d + 0.05);
  const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = f * 2; const g2 = ctx.createGain(); g2.gain.value = 0.18; o2.connect(g2).connect(g); o2.start(t0); o2.stop(t0 + d + 0.05);
}

function drone(ctx: Ctx, out: AudioNode, rootMidi: number, t0: number, t1: number) {
  const g = ctx.createGain(); g.connect(out); g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.09, t0 + 1.5); g.gain.setValueAtTime(0.09, t1 - 1.5); g.gain.linearRampToValueAtTime(0, t1);
  [rootMidi - 12, rootMidi - 5, rootMidi, rootMidi + 7].forEach((m, i) => {
    const o = ctx.createOscillator(); o.type = i % 2 ? 'sawtooth' : 'triangle'; o.frequency.value = mtof(m);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; const pg = ctx.createGain(); pg.gain.value = i === 2 ? 0.6 : 0.35;
    // slow tanpura shimmer
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1 + i * 0.07; const lg = ctx.createGain(); lg.gain.value = 250; lfo.connect(lg).connect(f.frequency); lfo.start(t0); lfo.stop(t1);
    o.connect(f).connect(pg).connect(g); o.start(t0); o.stop(t1);
  });
}

/** Tabla-ish kit: "dha/dhin" = tuned low hit, "na/tin/ta" = high tick, "ge" = bayan boom */
function perc(ctx: Ctx, out: AudioNode, kind: 'low' | 'high' | 'boom', t0: number, vel = 1) {
  const g = ctx.createGain(); g.connect(out);
  if (kind === 'high') {
    const n = noise(ctx, 0.08); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = 6;
    g.gain.setValueAtTime(0.22 * vel, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.08); n.connect(f).connect(g); n.start(t0);
    return;
  }
  const o = ctx.createOscillator(); o.type = 'sine';
  const f0 = kind === 'boom' ? 75 : 180; o.frequency.setValueAtTime(f0 * 1.6, t0); o.frequency.exponentialRampToValueAtTime(f0, t0 + (kind === 'boom' ? 0.18 : 0.06));
  g.gain.setValueAtTime((kind === 'boom' ? 0.55 : 0.34) * vel, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + (kind === 'boom' ? 0.45 : 0.22));
  o.connect(g); o.start(t0); o.stop(t0 + 0.5);
  if (kind === 'low') { const n = noise(ctx, 0.03); const ng = ctx.createGain(); ng.gain.setValueAtTime(0.12 * vel, t0); ng.gain.exponentialRampToValueAtTime(0.001, t0 + 0.03); n.connect(ng).connect(out); n.start(t0); }
}
function noise(ctx: Ctx, dur: number) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const s = ctx.createBufferSource(); s.buffer = buf; return s;
}

/** Simple hall: exponentially-decaying stereo noise convolution */
function reverb(ctx: Ctx, seconds = 2.2): ConvolverNode {
  const sr = ctx.sampleRate; const len = Math.ceil(sr * seconds); const buf = ctx.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
  const cv = ctx.createConvolver(); cv.buffer = buf; return cv;
}

function thekaPattern(theka: string | undefined): ('low' | 'high' | 'boom' | null)[] {
  const bols = (theka || 'DHA GE NA TI NA KA DHIN NA').replace(/\|/g, ' ').trim().split(/\s+/);
  const map = (b: string) => /^DHA|DHIN/i.test(b) ? 'low' : /^GE|GHE|KAT/i.test(b) ? 'boom' : /^NA|TIN|TA|TI|KA|TU|TIRKIT|DHAGE/i.test(b) ? 'high' : null;
  return bols.map(map);
}

/** Chord symbol → MIDI triad around the melody register */
function chordMidis(sym: string, rootMidi: number): number[] {
  const m = /^([A-G]#?)(m)?/.exec((sym || '').trim()); if (!m) return [rootMidi - 12, rootMidi - 5, rootMidi];
  const NOTE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; const pc = NOTE.indexOf(m[1]); if (pc < 0) return [rootMidi - 12, rootMidi - 5, rootMidi];
  let r = rootMidi - 12 + ((pc - (rootMidi % 12) + 12) % 12); if (r > rootMidi - 5) r -= 12;
  return /5$/.test(sym) ? [r, r + 7, r + 12] : [r, r + (m[2] ? 3 : 4), r + 7];
}

function renderInto(ctx: Ctx, master: AudioNode, c: Composition, startAt: number, muted: { drone: boolean; perc: boolean; bass: boolean }) {
  const { notes, total, barTimes, beat } = schedule(c);
  const isSA = ['punjabi', 'raag', 'urdu-ghazal'].includes(c.style) || !!c.raag;
  // send bus: everything gets a little hall, the voice a bit more
  const wet = ctx.createGain(); wet.gain.value = 0.28; const cv = reverb(ctx, isSA ? 2.6 : 1.9); wet.connect(cv).connect(master);
  const dry = master;
  const voiceBus = ctx.createGain(); voiceBus.connect(dry); const vSend = ctx.createGain(); vSend.gain.value = 0.7; voiceBus.connect(vSend).connect(wet);
  const bandBus = ctx.createGain(); bandBus.connect(dry); const bSend = ctx.createGain(); bSend.gain.value = 0.35; bandBus.connect(bSend).connect(wet);
  const percBus = ctx.createGain(); percBus.connect(dry); const pSend = ctx.createGain(); pSend.gain.value = 0.15; percBus.connect(pSend).connect(wet);

  if (!muted.drone && (isSA || c.style === 'soothing')) drone(ctx, bandBus, c.rootMidi, startAt, startAt + total);
  const barLen = c.beatsPerBar * beat;
  const sectionOf = (bi: number) => c.sections.findIndex((s, i, arr) => { const start = arr.slice(0, i).reduce((n, x) => n + x.measures, 0); return bi >= start && bi < start + s.measures; });
  // chord pad per bar (skips the intro bar 0 so the alaap breathes)
  barTimes.forEach((bt, bi) => {
    const si = sectionOf(bi); if (si < 0) return; const sec = c.sections[si];
    const start = c.sections.slice(0, si).reduce((n, x) => n + x.measures, 0);
    const sym = sec.chordProgression[(bi - start) % Math.max(1, sec.chordProgression.length)];
    chordPad(ctx, bandBus, chordMidis(sym, c.rootMidi), startAt + bt, barLen, c.style);
  });
  notes.forEach(n => {
    if (n.part === 'lead') {
      const f = mtof(n.midi); const vel = n.section === 0 ? 0.7 : (n.section === 2 || n.section === 4 || n.section === 6 ? 1 : 0.85);
      leadVoice(ctx, voiceBus, f, startAt + n.t, n.d, c.style, vel);
      if (isSA || c.style === 'soothing') harmonium(ctx, bandBus, f, startAt + n.t, n.d);
    } else if (!muted.bass) bassVoice(ctx, bandBus, mtof(n.midi), startAt + n.t, n.d);
  });
  if (!muted.perc) {
    const pat = thekaPattern(c.theka); const sub = pat.length / c.beatsPerBar; // hits per beat
    barTimes.forEach((bt, bi) => {
      const sec = sectionOf(bi);
      if (sec < 0) return;
      // intro: light "na" ticks only so the arrangement is never silent; full theka from the verse
      const light = sec === 0;
      const vel = sec === 2 || sec === 4 || sec === 6 ? 1 : 0.7;
      pat.forEach((k, i) => { if (!k) return; if (light && k !== 'high') return; const t = startAt + bt + (i / sub) * beat; if (t < startAt + bt + barLen) perc(ctx, percBus, k, t, (i === 0 ? 1 : vel * 0.8) * (light ? 0.5 : 1)); });
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
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    const master = ctx.createGain(); master.gain.value = 0.8;
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.knee.value = 12; master.connect(comp).connect(ctx.destination);
    this.ctx = ctx; this.master = master; this.barTimes = schedule(c).barTimes;
    const t0 = ctx.currentTime + 0.25; this.total = renderInto(ctx, master, c, t0, this.muted); this.startedAt = t0;
    const tick = () => { if (!this.ctx) return; const el = this.ctx.currentTime - this.startedAt; const bar = this.barTimes.filter(b => b <= el).length - 1; this.onProgress?.(Math.max(0, el), this.total, Math.max(0, bar)); if (el >= this.total) { this.stop(); this.onEnd?.(); return; } this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);
  }
  stop() { cancelAnimationFrame(this.raf); if (this.ctx) { try { this.master?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05); const c = this.ctx; setTimeout(() => c.close().catch(() => {}), 200); } catch { /* noop */ } } this.ctx = null; this.master = null; }
}

/** Render to a 44.1 kHz stereo WAV blob */
export async function renderWav(c: Composition, muted = { drone: false, perc: false, bass: false }): Promise<Blob> {
  const { total } = schedule(c); const sr = 44100;
  const ctx = new OfflineAudioContext(2, Math.ceil((total + 3) * sr), sr);
  const master = ctx.createGain(); master.gain.value = 0.8; const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.knee.value = 12; master.connect(comp).connect(ctx.destination);
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
