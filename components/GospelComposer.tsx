import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music, Sliders, Hash, Activity, Sparkles, Book, Save, Trash, Play,
  Search, ChevronLeft, ArrowRight, CornerDownRight, Volume2, Globe, FileText
} from "lucide-react";
import {
  STYLES, WI, SAI, RHYTHMS, ZB, KB, RI, RMp, SD,
  ZaboorItem, GeetItem, RhythmPattern
} from "./composerData";

interface GospelComposerProps {
  brightnessMode: "light" | "sepia" | "dark";
  themeStyles: {
    bg: string;
    text: string;
    card: string;
    border: string;
  };
}

export const GospelComposer: React.FC<GospelComposerProps> = ({
  brightnessMode,
  themeStyles
}) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<"c" | "r" | "z" | "k" | "saved">("c");
  const [activeOutputTab, setActiveSubTab] = useState<"comp" | "sheet" | "arr">("comp");

  // State Management
  const [styleMode, setStyleMode] = useState<string>("punjabi");
  const [selectedInstrs, setSelectedInstrs] = useState<string[]>(["Harmonium", "Dholak", "Piano"]);
  const [genre, setGenre] = useState<string>("sialkot-convention");
  const [keyRaag, setKeyRaag] = useState<string>("Kafi raag");
  const [timeSig, setTimeSig] = useState<string>("16/16");
  const [tempo, setTempo] = useState<string>("Andante (66-76 BPM)");
  const [promptTxt, setPromptTxt] = useState<string>("");

  // Context Items
  const [ctxH, setCtxH] = useState<GeetItem | null>(null);
  const [ctxZ, setCtxZ] = useState<ZaboorItem | null>(null);
  const [selectedRhythmId, setSelectedRhythmId] = useState<string | null>(null);

  // Search Filters
  const [zaboorSearch, setZaboorFilter] = useState<string>("");
  const [activeZaboorRange, setActiveZaboorRange] = useState<string | null>(null);
  const [geetSearch, setGeetFilter] = useState<string>("");
  const [activeGeetAlpha, setActiveGeetAlpha] = useState<string | null>(null);

  // AI & Server Communication
  const [loading, setLoading] = useState<boolean>(false);
  const [composition, setComposition] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [savedCompositions, setSavedCompositions] = useState<any[]>([]);
  const [recentlySavedId, setRecentlySavedId] = useState<string | null>(null);

  // Sync Compositions list from Backend DB
  const loadSavedCompositions = async () => {
    try {
      const res = await fetch("/api/compositions");
      if (res.ok) {
        const list = await res.json();
        setSavedCompositions(list);
      }
    } catch (e) {
      console.error("Failed to load compositions list:", e);
    }
  };

  useEffect(() => {
    loadSavedCompositions();
  }, []);

  // Save composition to custom backend database
  const saveToLibrary = async (compToSave: any) => {
    if (!compToSave) return;
    try {
      const res = await fetch("/api/compositions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compToSave),
      });
      if (res.ok) {
        const result = await res.json();
        setRecentlySavedId(result.item.id);
        loadSavedCompositions();
        setTimeout(() => setRecentlySavedId(null), 3000);
      } else {
        alert("Failed to save. Make sure the server backend is fully online.");
      }
    } catch (e: any) {
      alert("Error saving: " + e.message);
    }
  };

  // Delete composition from custom backend database
  const deleteFromLibrary = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this composition?")) return;
    try {
      const res = await fetch(`/api/compositions/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadSavedCompositions();
        if (composition && composition.id === id) {
          setComposition(null);
        }
      }
    } catch (e: any) {
      alert("Error deleting: " + e.message);
    }
  };

  // Helper toggle functions
  const handleToggleInstrument = (instrName: string) => {
    setSelectedInstrs((prev) =>
      prev.includes(instrName)
        ? prev.filter((i) => i !== instrName)
        : [...prev, instrName]
    );
  };

  const handleUseRhythm = (r: RhythmPattern) => {
    setSelectedRhythmId(r.id);
    setGenre(r.g);
    setTimeSig(r.ts);
    setTempo(r.tmp);
    if (r.r && RMp[r.r]) {
      setKeyRaag(RMp[r.r]);
    }
    setActiveTab("c");
  };

  const handleUseZaboor = (z: ZaboorItem) => {
    setCtxZ(z);
    setGenre("desi-raag-psalm");
    if (RMp[z.rg]) {
      setKeyRaag(RMp[z.rg]);
    }
    setPromptTxt(
      `Compose a new devotative song inspired by Zaboor ${z.n} "${z.r}" set in traditional Raag ${z.rg}. Theme: ${z.tp}. Deliver beautiful classical Indian style using harmonium, tabla, and bansuri.`
    );
    setActiveTab("c");
  };

  const handleUseGeet = (g: GeetItem) => {
    setCtxH(g);
    setGenre("sialkot-convention");
    setPromptTxt(
      `Compose a majestic Masihi geet inspired by "${g.r}" (${g.u}). Theme: ${g.tp}. Focus on an emotional call-and-response Sialkot Convention aesthetic with dholak and synchronised harmonium.`
    );
    setActiveTab("c");
  };

  // Safe HTML sheet rendering inside canvas/Vect-graphics
  const n2Y = (note: string, clef: string) => {
    const trebleMap: any = {
      C3: 160, D3: 152, E3: 144, F3: 136, G3: 128, A3: 120, B3: 112,
      C4: 104, D4: 96, E4: 88, F4: 80, G4: 72, A4: 64, B4: 56,
      C5: 48, D5: 40, E5: 32, F5: 24, G5: 16, A5: 8, B5: 0, C6: -8
    };
    const bassMap: any = {
      E2: 160, F2: 152, G2: 144, A2: 136, B2: 128, C3: 120, D3: 112,
      E3: 104, F3: 96, G3: 88, A3: 80, B3: 72, C4: 64, D4: 56, E4: 48
    };
    return (clef === "bass" ? (bassMap[note] ?? 80) : (trebleMap[note] ?? 72)) + 10;
  };

  const dX = (d: string) => {
    const distMap: any = { w: 76, h: 52, q: 33, e: 21, s: 13 };
    return distMap[d] || 33;
  };

  const drawStaff = (part: any, beats: number, bv: number) => {
    const W = 780;
    const st = 30;
    const sg = 10;
    const clef = part.clef || "treble";

    let lines = [];
    for (let l = 0; l < 5; l++) {
      lines.push(
        <line
          key={`l-${l}`}
          x1={6}
          y1={st + l * sg}
          x2={W - 8}
          y2={st + l * sg}
          stroke="#2C1F0A"
          strokeWidth="1"
        />
      );
    }

    let notesElements: any[] = [];
    let xc = 70;

    (part.measures || []).slice(0, 6).forEach((meas: any, mi: number) => {
      const notes = meas.notes || ["C4", "E4", "G4"];
      const durs = meas.durations || ["q", "q", "h"];

      notes.forEach((note: string, ni: number) => {
        const d = durs[ni] || "q";
        const y = n2Y(note, clef);
        const xi = dX(d);

        // Ledger lines
        if (y > st + 4 * sg + 4) {
          for (let ll = st + 5 * sg; ll <= y + 2; ll += sg) {
            notesElements.push(
              <line
                key={`ledger-b-${mi}-${ni}-${ll}`}
                x1={xc - 7}
                y1={ll}
                x2={xc + 7}
                y2={ll}
                stroke="#2C1F0A"
                strokeWidth="0.8"
              />
            );
          }
        }
        if (y < st - 4) {
          for (let ll = st - sg; ll >= y - 2; ll -= sg) {
            notesElements.push(
              <line
                key={`ledger-t-${mi}-${ni}-${ll}`}
                x1={xc - 7}
                y1={ll}
                x2={xc + 7}
                y2={ll}
                stroke="#2C1F0A"
                strokeWidth="0.8"
              />
            );
          }
        }

        // Note head drawing
        if (d === "w") {
          notesElements.push(
            <ellipse
              key={`note-${mi}-${ni}`}
              cx={xc}
              cy={y}
              rx="7"
              ry="5"
              fill="none"
              stroke="#2C1F0A"
              strokeWidth="1.5"
            />
          );
        } else if (d === "h") {
          notesElements.push(
            <ellipse
              key={`note-${mi}-${ni}`}
              cx={xc}
              cy={y}
              rx="6"
              ry="4.5"
              fill="none"
              stroke="#2C1F0A"
              strokeWidth="1.5"
            />
          );
          notesElements.push(
            <line
              key={`stem-${mi}-${ni}`}
              x1={xc + 6}
              y1={y}
              x2={xc + 6}
              y2={y - 30}
              stroke="#2C1F0A"
              strokeWidth="1.2"
            />
          );
        } else {
          notesElements.push(
            <ellipse
              key={`note-${mi}-${ni}`}
              cx={xc}
              cy={y}
              rx="6"
              ry="4.5"
              fill="#2C1F0A"
            />
          );
          notesElements.push(
            <line
              key={`stem-${mi}-${ni}`}
              x1={xc + 6}
              y1={y}
              x2={xc + 6}
              y2={y - 30}
              stroke="#2C1F0A"
              strokeWidth="1.2"
            />
          );
          if (d === "e") {
            notesElements.push(
              <path
                key={`flag-${mi}-${ni}`}
                d={`M${xc + 6} ${y - 30} Q${xc + 16} ${y - 20} ${xc + 6} ${y - 10}`}
                stroke="#2C1F0A"
                strokeWidth="1.2"
                fill="none"
              />
            );
          }
        }

        if (ni === 0 && meas.dynamic) {
          notesElements.push(
            <text
              key={`dyn-${mi}-${ni}`}
              x={xc}
              y={st + 66}
              textAnchor="middle"
              fontSize="9"
              fontStyle="italic"
              fill="#8B6914"
            >
              {meas.dynamic}
            </text>
          );
        }

        xc += xi;
      });

      // Measure divider
      notesElements.push(
        <line
          key={`bar-${mi}`}
          x1={xc + 4}
          y1={st}
          x2={xc + 4}
          y2={st + 4 * sg}
          stroke="#2C1F0A"
          strokeWidth="1.1"
        />
      );
      xc += 11;
    });

    return (
      <svg
        viewBox={`0 0 ${W} ${st + 5 * sg + 46}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full min-w-[560px] h-auto"
      >
        {/* Clefs */}
        {clef === "treble" ? (
          <text
            x="8"
            y={st + 35}
            fontSize="50"
            fill="#2C1F0A"
            fontFamily="serif"
            dominantBaseline="middle"
          >
            &#119070;
          </text>
        ) : (
          <text
            x="8"
            y={st + 25}
            fontSize="38"
            fill="#2C1F0A"
            fontFamily="serif"
            dominantBaseline="middle"
          >
            &#119074;
          </text>
        )}
        {/* Time Signature */}
        <text
          x="50"
          y={st + 13}
          fontSize="15"
          fontWeight="bold"
          fill="#2C1F0A"
          fontFamily="serif"
        >
          {beats}
        </text>
        <text
          x="50"
          y={st + 34}
          fontSize="15"
          fontWeight="bold"
          fill="#2C1F0A"
          fontFamily="serif"
        >
          {bv}
        </text>

        {lines}
        {notesElements}

        {/* Double bar line at the end */}
        <line
          x1={W - 12}
          y1={st}
          x2={W - 12}
          y2={st + 4 * sg}
          stroke="#2C1F0A"
          strokeWidth="1.4"
        />
        <line
          x1={W - 8}
          y1={st}
          x2={W - 8}
          y2={st + 4 * sg}
          stroke="#2C1F0A"
          strokeWidth="3"
        />
      </svg>
    );
  };

  // Call Server-Side API endpoint
  const handleCompose = async () => {
    if (!selectedInstrs.length) {
      setErrorMessage("Please select at least one instrument.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setComposition(null);

    const styleDesc = SD[styleMode] || SD.punjabi;
    const hCtx = ctxH
      ? `\nSIALKOT GEET KI KITAB HYMN: "${ctxH.r}" (${ctxH.u}) — ${
          ctxH.t === "zaboor" ? "Zaboor setting" : "Masihi Geet"
        }, Theme: ${ctxH.tp}. Capture the devotional spirit of this beloved South Asian Christian hymn.`
      : "";
    const zCtx = ctxZ
      ? `\nPUNJABI ZABOOR ${ctxZ.n}: "${ctxZ.r}" (${ctxZ.p}) — Raag: ${ctxZ.rg}, ${
          ctxZ.bpm
        } BPM, Theme: ${ctxZ.tp}. Compose in authentic Desi Raag style. Describe raag characteristics in the raagDescription field.`
      : "";
    const rCtx = selectedRhythmId
      ? (() => {
          const r = RHYTHMS.find((x) => x.id === selectedRhythmId);
          return r
            ? `\nRHYTHM/TAAL PATTERN: "${r.nm}" — ${r.tgs.join(", ")}${
                r.r ? " — Raag: " + r.r : ""
              }. Pattern: ${r.pt}`
            : "";
        })()
      : "";

    const systemPrompt = `You are 'Theophilus', the world's premier sacred music composer with deep mastery of both Western Gospel and South Asian devotional music — especially the Punjabi Zaboor (1908 Desi Ragan Vich tradition by Dr. Imam Din Shahbaz) and the Sialkot Convention Geet Ki Kitab.
    
Return a response conforming STRICTLY to the specified output XML/JSON schema. Keep romanized Punjabi/Urdu for South Asian styles. Remove any single quotes inside string fields (use "dont" instead of "don't" etc.) to guarantee perfect JSON parser output.`;

    const userPrompt = `Compose a ${styleMode.toUpperCase()} sacred music piece with these specifications:
    Genre: ${genre.replace(/-/g, " ")}
    Musical Key / Raag: ${keyRaag}
    Time Signature / Taal: ${timeSig}
    Tempo: ${tempo}
    Instruments available: ${selectedInstrs.join(", ")}
    Style direction: ${styleDesc}
    ${hCtx}${zCtx}${rCtx}
    ${promptTxt ? `Composer's vision: "${promptTxt}"` : ""}

    Requirements:
    - At least 5 distinct sections with heartfelt, scripture-inspired lyrics (minimum 4 lines each).
    - If South Asian: naturally weave in romanized Punjabi or Urdu phrases.
    - Provide sheetNotes for at least 2 instrument parts with real melodic content.
    - Make the composition intellectually, historically, and spiritually coherent.`;

    try {
      const res = await fetch("/api/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userPrompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Generation endpoint returned an error");
      }

      const data = await res.json();
      setComposition(data);
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Searching logic for Zaboors and Hymns
  const filteredZaboors = ZB.filter((z) => {
    const query = zaboorSearch.toLowerCase().trim();
    if (query) {
      return (
        z.r.toLowerCase().includes(query) ||
        z.rg.toLowerCase().includes(query) ||
        z.tp.toLowerCase().includes(query) ||
        z.n.toString() === query
      );
    }
    if (activeZaboorRange) {
      const parts = activeZaboorRange.split("-").map(Number);
      if (parts.length === 2) {
        return z.n >= parts[0] && z.n <= parts[1];
      }
      return z.rg === activeZaboorRange;
    }
    return true;
  });

  const uniqueRaags = Array.from(new Set(ZB.map((z) => z.rg))).sort();

  const filteredHymns = KB.filter((k) => {
    const query = geetSearch.toLowerCase().trim();
    if (query) {
      return (
        k.r.toLowerCase().includes(query) ||
        k.u.includes(query) ||
        k.tp.toLowerCase().includes(query)
      );
    }
    if (activeGeetAlpha) {
      return k.r[0].toUpperCase() === activeGeetAlpha;
    }
    return true;
  });

  return (
    <div
      className="p-8 rounded-[3.5rem] shadow-2xl border-4 transition-all duration-300"
      style={{
        backgroundColor: themeStyles.bg === "#F8F4E3" ? "#FDFAF0" : "rgba(10, 15, 28, 0.95)",
        borderColor: "rgba(212, 175, 55, 0.2)",
        color: themeStyles.text,
      }}
    >
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 mb-8 gap-4 border-[#D4AF37]/20">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-2">
            Sacred Studio Engine
          </span>
          <h2 className="text-3xl font-serif-heading font-black tracking-tight text-[#D4AF37] uppercase">
            SACRED STRINGS &amp; GOSPEL COMPOSER
          </h2>
          <p className="text-xs opacity-60 mt-1 max-w-xl font-serif-heading italic">
            Durable full-stack AI melody generator set to traditional 1908 Punjabi Zaboor Raags, Sialkot hymns, &amp; global gospel.
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "c", label: "Compose", icon: <Sparkles className="w-4 h-4" /> },
            { id: "r", label: "Raag Patterns", icon: <Music className="w-4 h-4" /> },
            { id: "z", label: "Punjabi Zaboor", icon: <Book className="w-4 h-4" /> },
            { id: "k", label: "Geet Kitab", icon: <FileText className="w-4 h-4" /> },
            { id: "saved", label: "Devotional Library", icon: <Save className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all duration-200 border ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] border-transparent text-[#4a152c] shadow-lg scale-105"
                  : "bg-white/5 border-white/10 hover:bg-white/10 opacity-70"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE CONTEXT LINE */}
      <AnimatePresence>
        {(ctxH || ctxZ || selectedRhythmId) && activeTab === "c" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-3xl border bg-[#4a152c]/5 border-[#D4AF37]/20 flex flex-col gap-3"
          >
            <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">
              Active Melodic Context loaded:
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-serif-heading">
              {ctxH && (
                <div className="bg-[#4a152c]/10 border border-[#4a152c]/30 px-4 py-2 rounded-2xl flex items-center justify-between gap-4">
                  <span>
                    🌿 Hymn: <strong>{ctxH.r}</strong> ({ctxH.u})
                  </span>
                  <button
                    onClick={() => setCtxH(null)}
                    className="text-[#4a152c] font-bold text-xs hover:scale-110 active:scale-95 transition-transform"
                  >
                    ×
                  </button>
                </div>
              )}
              {ctxZ && (
                <div className="bg-[#4a152c]/10 border border-[#D4AF37]/30 px-4 py-2 rounded-2xl flex items-center justify-between gap-4">
                  <span>
                    🪘 Zaboor: <strong>{ctxZ.n}</strong> — {ctxZ.r} (Raag {ctxZ.rg})
                  </span>
                  <button
                    onClick={() => setCtxZ(null)}
                    className="text-[#4a152c] font-bold text-xs hover:scale-110 active:scale-95 transition-transform"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedRhythmId && (
                <div className="bg-[#1D2D50]/10 border border-[#1D2D50]/30 px-4 py-2 rounded-2xl flex items-center justify-between gap-4">
                  <span>
                    🥁 Rhythm: <strong>{RHYTHMS.find((r) => r.id === selectedRhythmId)?.nm}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedRhythmId(null)}
                    className="text-[#1D2D50] font-bold text-xs hover:scale-110 active:scale-95 transition-transform"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main tab sections */}
      <div className="space-y-6">
        {/* COMPOSE MUSIC TAB */}
        {activeTab === "c" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* COMPOSER CONTROLS (LEFT Form Panel) */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              {/* Choose Aesthetic style */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
                  1. Sacred Melody Style
                </span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STYLES.map((st) => (
                    <button
                      key={st.v}
                      onClick={() => setStyleMode(st.v)}
                      className={`p-4 rounded-3xl text-left border flex flex-col justify-between transition-all duration-300 ${
                        styleMode === st.v
                          ? "bg-[#D4AF37]/10 border-[#D4AF37] scale-[1.02]"
                          : "bg-black/5 hover:bg-black/10 border-white/10"
                      }`}
                    >
                      <span className="text-2xl mb-2">{st.i}</span>
                      <div>
                        <h4 className="text-xs uppercase font-black tracking-widest">{st.n}</h4>
                        <p className="text-[9px] opacity-60 leading-tight mt-1">{st.d}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Musical spec configurations */}
              <div className="bg-black/10 p-6 rounded-[2rem] border border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">
                    Genre style
                  </label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 outline-none text-xs bg-black/40 text-inherit cursor-pointer"
                  >
                    <option value="sialkot-convention">Sialkot Convention Style</option>
                    <option value="south-asian-masihi">South Asian Masihi Geet</option>
                    <option value="desi-raag-psalm">Desi Raag Psalm (1908)</option>
                    <option value="punjabi-christian">Punjabi Christian / Zaboor</option>
                    <option value="urdu-christian">Urdu Christian Ghazal</option>
                    <option value="qawwali-gospel">Qawwali-Gospel Fusion</option>
                    <option value="contemporary-gospel">Contemporary Gospel</option>
                    <option value="traditional-gospel">Traditional Gospel</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">
                    Key / Desi Raag
                  </label>
                  <select
                    value={keyRaag}
                    onChange={(e) => setKeyRaag(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 outline-none text-xs bg-black/40 text-inherit cursor-pointer"
                  >
                    <optgroup label="Desi Raags (1908 Zaboor)">
                      <option value="Kafi raag">Kafi — Sorrowful Devotion</option>
                      <option value="Bhairavi raag">Bhairavi — Morning Surrender</option>
                      <option value="Yaman raag">Yaman — Evening Majesty</option>
                      <option value="Pilu raag">Pilu — Joyful Folk</option>
                      <option value="Sarang raag">Sarang — Midday Devotion</option>
                      <option value="Tilang raag">Tilang — Passionate Praise</option>
                      <option value="Bilawal raag">Bilawal — Pure Joy / Easter</option>
                    </optgroup>
                    <optgroup label="Western Major/Minor Keys">
                      <option value="G Major">G Major</option>
                      <option value="C Major">C Major</option>
                      <option value="D Major">D Major</option>
                      <option value="E Minor">E Minor</option>
                      <option value="A Minor">A Minor</option>
                    </optgroup>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">
                    Time signature
                  </label>
                  <select
                    value={timeSig}
                    onChange={(e) => setTimeSig(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 outline-none text-xs bg-black/40 text-inherit cursor-pointer"
                  >
                    <optgroup label="Taal beats">
                      <option value="16/16">16-beat Teentaal</option>
                      <option value="12/8">12-beat Ektal</option>
                      <option value="7/8">7-beat Rupak Baal</option>
                      <option value="8/8">8-beat Kaherva</option>
                      <option value="6/8">6-beat Dadra</option>
                    </optgroup>
                    <optgroup label="Western Times">
                      <option value="4/4">4/4 Common</option>
                      <option value="3/4">3/4 Waltz / Hymn</option>
                    </optgroup>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">
                    Tempo BPM
                  </label>
                  <select
                    value={tempo}
                    onChange={(e) => setTempo(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-white/10 outline-none text-xs bg-black/40 text-inherit cursor-pointer"
                  >
                    <option value="Largo (40-60 BPM)">Largo — Solemn (40-60)</option>
                    <option value="Andante (66-76 BPM)">Andante — Flowing (66-76)</option>
                    <option value="Moderato (108-120 BPM)">Moderato — Moderate (108)</option>
                    <option value="Allegro (132-168 BPM)">Allegro — Joyful (132+)</option>
                  </select>
                </div>
              </div>

              {/* Select Instruments */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
                  2. Orchestrate &amp; Sing
                </span>
                <div className="border border-white/5 p-5 rounded-[2rem] bg-black/10">
                  <span className="text-[9px] block uppercase font-bold tracking-wider opacity-60 mb-2">
                    Western/Orchestral:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                    {WI.map(([v, i]) => (
                      <button
                        key={v}
                        onClick={() => handleToggleInstrument(v)}
                        className={`p-2 rounded-xl text-center text-xs border flex items-center gap-1.5 justify-center transition-all ${
                          selectedInstrs.includes(v)
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 opacity-70"
                        }`}
                      >
                        <span>{i}</span>
                        <span className="text-[10px] uppercase font-bold tracking-tight">{v}</span>
                      </button>
                    ))}
                  </div>

                  <span className="text-[9px] block uppercase font-bold tracking-wider opacity-60 mb-2">
                    Traditional Desi (South Asian):
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {SAI.map(([v, i]) => (
                      <button
                        key={v}
                        onClick={() => handleToggleInstrument(v)}
                        className={`p-2 rounded-xl text-center text-xs border flex items-center gap-1.5 justify-center transition-all ${
                          selectedInstrs.includes(v)
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                            : "bg-white/5 border-white/10 hover:bg-white/10 opacity-70"
                        }`}
                      >
                        <span>{i}</span>
                        <span className="text-[10px] uppercase font-bold tracking-tight">{v}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inspiration Text Area */}
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37]">
                  3. Describe Your Spiritual Vision
                </span>
                <textarea
                  value={promptTxt}
                  onChange={(e) => setPromptTxt(e.target.value)}
                  className="w-full p-4 rounded-2xl outline-none border transition-all text-xs bg-black/10 focus:border-[#D4AF37]/40 text-inherit placeholder-white/20 font-serif-heading block leading-relaxed"
                  rows={3}
                  placeholder="Describe your vision (e.g. 'A beautiful, prayerful song of comforting peace on Psalm 23 with harmonium, bansuri, and tanpura'...)"
                />
              </div>

              {/* Error displaying message */}
              {errorMessage && (
                <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/10 text-red-100 text-xs leading-relaxed">
                  <strong>General Error: </strong> {errorMessage}
                  <p className="opacity-60 text-[10px] mt-1">
                    Tip: Try writing smaller descriptions without raw special characters, and make sure the server database configuration is online in Secrets.
                  </p>
                </div>
              )}

              {/* Click to compose button */}
              <button
                onClick={handleCompose}
                disabled={loading}
                className="w-full py-4 text-center rounded-2xl text-xs uppercase font-serif-heading font-black tracking-[0.25em] text-[#4a152c] transition-all bg-gradient-to-r from-[#D4AF37] to-[#E8C97A] hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "✦ Composing spiritual music in the archives... ✦" : "✦ Compose Sacred Music ✦"}
              </button>
            </div>

            {/* AI COMPOSITION DISPLAY (RIGHT Output Panel) */}
            <div className="lg:col-span-12 xl:col-span-5 h-full">
              {/* If loading display animation */}
              {loading && (
                <div className="h-[430px] rounded-3xl border border-[#D4AF37]/15 bg-black/20 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-t-2 border-[#D4AF37] animate-spin flex items-center justify-center">
                    <span className="text-[#D4AF37] animate-pulse">⚜</span>
                  </div>
                  <h4 className="text-[#D4AF37] uppercase font-black text-xs tracking-widest">
                    AI Theological Musician Active
                  </h4>
                  <p className="text-[10px] opacity-70 leading-relaxed font-serif-heading max-w-xs">
                    Sifting through the 1908 Desi Raag manuscripts and the Sialkot Convening databases to formulate deep chords, authentic Punjabi-Urdu meter, and vector staffs...
                  </p>
                </div>
              )}

              {/* If composition loaded render cleanly */}
              {!loading && composition && (
                <div className="space-y-6">
                  {/* Save to library banner */}
                  <div className="flex items-center justify-between border border-[#D4AF37]/20 p-4 rounded-3xl bg-[#D4AF37]/5">
                    <span className="text-[10px] font-black tracking-widest text-[#D4AF37]">
                      Composition Generated successfully!
                    </span>
                    <button
                      onClick={() => saveToLibrary(composition)}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] uppercase font-bold tracking-wider transition-all duration-300 ${
                        recentlySavedId
                          ? "bg-green-600 border-green-500 text-white"
                          : "bg-white/10 hover:bg-[#D4AF37] hover:text-[#4a152c] border-white/20"
                      }`}
                    >
                      <Save className="w-3 h-3" />
                      {recentlySavedId ? "Saved successfully!" : "Save to Library"}
                    </button>
                  </div>

                  {/* output tabs */}
                  <div className="flex border-b border-white/10">
                    {[
                      { id: "comp", label: "Lyrics & Chords" },
                      { id: "sheet", label: "Melodic Sheet" },
                      { id: "arr", label: "Arrangement Guide" },
                    ].map((stb) => (
                      <button
                        key={stb.id}
                        onClick={() => setActiveSubTab(stb.id as any)}
                        className={`flex-1 text-center py-2 text-[10px] uppercase tracking-wider font-bold transition-all border-b-2 ${
                          activeOutputTab === stb.id
                            ? "text-[#D4AF37] border-[#D4AF37]"
                            : "text-inherit opacity-40 hover:opacity-100 border-transparent"
                        }`}
                      >
                        {stb.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab contents */}
                  <div className="max-h-[460px] overflow-y-auto p-2 bg-black/10 rounded-2xl pr-4">
                    {/* Chords, Lyrics & Details */}
                    {activeOutputTab === "comp" && (
                      <div className="space-y-6 text-xs">
                        <div className="border-b pb-4 border-white/10 space-y-2">
                          <h3 className="text-xl font-serif-heading font-black text-[#D4AF37]">
                            {composition.title}
                          </h3>
                          <p className="font-serif-heading italic opacity-60">
                            {composition.subtitle}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] uppercase tracking-wider opacity-70">
                            <span>Key: {composition.key}</span>
                            <span>Sig: {composition.timeSig}</span>
                            {composition.raag && <span className="text-[#D4AF37]">Raag: {composition.raag}</span>}
                            {composition.taal && <span className="text-[#D4AF37]">Taal: {composition.taal}</span>}
                            <span>Tempo: {composition.bpm} BPM</span>
                          </div>
                          {composition.biblicalReference && (
                            <span className="text-[10px] block font-bold text-[#E8C97A] font-serif-heading">
                              📖 Scripture: {composition.biblicalReference}
                            </span>
                          )}
                        </div>

                        {composition.moodDescription && (
                          <p className="italic leading-relaxed font-serif-heading text-neutral-300">
                            "{composition.moodDescription}"
                          </p>
                        )}

                        {composition.raagDescription && (
                          <div className="p-4 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[11px] leading-relaxed text-[#D4AF37]">
                            <strong>Melodic Analysis:</strong> {composition.raagDescription}
                          </div>
                        )}

                        {/* Song structure blocks */}
                        <div className="space-y-6 mt-4">
                          {(composition.sections || []).map((sec: any, si: number) => (
                            <div
                              key={si}
                              className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2"
                            >
                              <div className="flex items-center justify-between border-b pb-1.5 border-white/10">
                                <span className="font-serif-heading font-bold uppercase tracking-wider text-[#D4AF37]">
                                  {sec.name}
                                </span>
                                <span className="text-[9px] uppercase tracking-widest opacity-60">
                                  {sec.measures} Bars • {sec.dynamicMarking}
                                </span>
                              </div>
                              {sec.chordProgression && (
                                <div className="flex flex-wrap gap-1">
                                  {sec.chordProgression.map((ch: string, ci: number) => (
                                    <span
                                      key={ci}
                                      className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37]"
                                    >
                                      {ch}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="pl-4 border-l-2 border-[#D4AF37] italic py-2 space-y-1.5 text-neutral-200">
                                {sec.lyrics?.map((lyr: string, li: number) => (
                                  <p key={li}>{lyr}</p>
                                ))}
                              </div>
                              {sec.notes && (
                                <p className="text-[10px] font-serif-heading italic opacity-50 pl-0.5">
                                  🎼 {sec.notes}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Vector Sheet Music Renderer */}
                    {activeOutputTab === "sheet" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-3xl shadow-lg text-[#2C1F0A] overflow-x-auto pr-8">
                          <h4 className="text-center font-serif-heading font-black text-sm">
                            {composition.title}
                          </h4>
                          <p className="text-center text-[10px] italic opacity-60 pb-3 border-b border-[#2C1F0A]/20 mb-4">
                            {composition.subtitle} • Key: {composition.key}
                            {composition.raag && ` (Raag ${composition.raag})`}
                          </p>

                          {(composition.sheetNotes || []).map((part: any, pi: number) => (
                            <div key={pi} className="space-y-1 py-4 border-b border-neutral-100 last:border-b-0">
                              <span className="text-[10px] font-sans font-black uppercase text-[#2C1F0A]/70 pl-2">
                                🎻 {part.part} ({part.clef} clef)
                              </span>
                              <div className="overflow-x-auto">
                                {drawStaff(part, 4, 4)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Music arrangements details */}
                    {activeOutputTab === "arr" && (
                      <div className="space-y-4 text-xs font-serif-heading leading-relaxed">
                        <div className="space-y-2">
                          <h4 className="uppercase font-bold tracking-wider text-[#D4AF37]">
                            Orchestral Arrangement
                          </h4>
                          <p className="opacity-80 pr-2">{composition.arrangementNotes}</p>
                        </div>

                        {composition.instrumentRoles && (
                          <div className="pt-4 space-y-3">
                            <h4 className="uppercase font-bold tracking-wider text-[#D4AF37]">
                              Instrument Roles &amp; Character
                            </h4>
                            <div className="grid gap-3">
                              {(composition.instrumentRoles || []).map((ir: any, idx: number) => (
                                <div key={idx} className="flex gap-4 items-start pl-2">
                                  <span className="font-serif-heading font-black text-[#D4AF37] uppercase min-w-[90px] text-[10px] tracking-wide pt-0.5">
                                    • {ir.instrument}
                                  </span>
                                  <p className="opacity-70 text-[11px] leading-relaxed">{ir.role}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {composition.performanceTips && (
                          <div className="pt-4 space-y-2">
                            <h4 className="uppercase font-bold tracking-wider text-[#D4AF37]">
                              Devotional Performance Tips
                            </h4>
                            <ul className="list-inside space-y-1 opacity-70 leading-relaxed pr-2">
                              {(composition.performanceTips || []).map((tip: string, idx: number) => (
                                <li key={idx} className="list-disc pl-2">
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Default scratchpad preview placeholder if no composition */}
              {!loading && !composition && (
                <div className="h-[430px] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center bg-black/5">
                  <Music className="w-12 h-12 text-[#D4AF37]/30 mb-4" />
                  <span className="text-[10px] font-black uppercase text-[#D4AF37]/50 tracking-wider">
                    Composer Console Idle
                  </span>
                  <p className="text-[10px] opacity-40 font-serif-heading leading-relaxed max-w-xs mt-1">
                    Select a style, choose instruments, or load a preset historical Zaboor/Geet context, then click "Compose" to write majestic scripture musical notation.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BRIGHT RHYTHMS TAB */}
        {activeTab === "r" && (
          <div className="space-y-6">
            <div className="p-4 rounded-3xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex flex-col md:flex-row items-center gap-4 text-xs font-serif-heading leading-relaxed">
              <span className="text-2xl">🪘</span>
              <p className="opacity-80">
                Traditional Indo-Pak rhythmic beats (<em>Taals</em>) and structural ragas. Every rhythmic segment can be instantly injected into the AI Composer Engine as context!
              </p>
            </div>

            {/* Rhythms display grids */}
            {[
              { title: "Desi Raag Configurations — 1908 Zaboor tradition", type: "t_" },
              { title: "Punjabi Sialkot Conventions Folk Beats", type: "m_" },
              { title: "Traditional Global Gospel Grooves", type: "g_" },
            ].map((section) => (
              <div key={section.type} className="space-y-3">
                <h4 className="text-xs uppercase font-serif-heading font-black tracking-widest text-[#D4AF37]">
                  {section.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RHYTHMS.filter((r) => r.tp === section.type).map((r) => (
                    <div
                      key={r.id}
                      className={`p-6 rounded-3xl border bg-black/10 flex flex-col justify-between h-full gap-4 transition-all duration-300 ${
                        selectedRhythmId === r.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/5"
                          : "border-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif-heading font-bold text-[#D4AF37] uppercase text-sm">
                            {r.nm}
                          </h4>
                          {r.r && (
                            <span className="px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37]">
                              {r.r}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {r.tgs.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] uppercase font-bold tracking-tight px-2 py-0.5 bg-white/5 rounded border border-white/5 opacity-70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs font-serif-heading opacity-70 leading-relaxed pr-2">
                          {r.dc}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] tracking-wide text-neutral-300">
                          {r.pt}
                        </div>
                        <button
                          onClick={() => handleUseRhythm(r)}
                          className="w-full py-2.5 rounded-xl text-[10px] uppercase font-black tracking-widest border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#4a152c] transition-all"
                        >
                          Use This Preset Rhythm
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PUNJABI ZABOOR ARCHIVES TAB */}
        {activeTab === "z" && (
          <div className="space-y-6">
            <div className="p-4 rounded-3xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex gap-4 text-xs items-center leading-relaxed">
              <span className="text-2xl">📜</span>
              <div className="font-serif-heading">
                <strong>Gurmukhi &amp; Romanized Classical Psalms:</strong> imam Din Shahbaz translated the Psalter in 1908. Select a psalm below to explore its specific Raag and load it contextually.
              </div>
            </div>

            {/* Quick search input */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 opacity-40" />
                <input
                  type="text"
                  value={zaboorSearch}
                  onChange={(e) => {
                    setZaboorFilter(e.target.value);
                    setActiveZaboorRange(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl outline-none border transition-all text-xs bg-black/10 border-white/10 text-inherit focus:border-[#D4AF37]/30"
                  placeholder="Search 150 Punjabi Psalms by number, Gurmukhi text, or theme..."
                />
              </div>

              {/* Clear button if range selected */}
              {activeZaboorRange && (
                <button
                  onClick={() => setActiveZaboorRange(null)}
                  className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider whitespace-nowrap hover:underline"
                >
                  Clear filter ranges
                </button>
              )}
            </div>

            {/* Ranges list */}
            <div className="flex flex-wrap gap-1">
              {[
                "1-25", "26-50", "51-75", "76-100", "101-125", "126-150"
              ].map((rng) => (
                <button
                  key={rng}
                  onClick={() => {
                    setActiveZaboorRange(rng);
                    setZaboorFilter("");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold border transition-colors ${
                    activeZaboorRange === rng
                      ? "bg-[#D4AF37] border-transparent text-[#4a152c]"
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
                >
                  Zaboor {rng}
                </button>
              ))}
            </div>

            {/* Raags preset metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {uniqueRaags.map((rg) => (
                <button
                  key={rg}
                  onClick={() => {
                    setActiveZaboorRange(rg);
                    setZaboorFilter("");
                  }}
                  className={`p-3 rounded-2xl text-left border flex flex-col justify-between transition-colors ${
                    activeZaboorRange === rg
                      ? "bg-[#D4AF37]/15 border-[#D4AF37]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="text-[10px] font-sans font-black uppercase text-[#D4AF37]">
                    {rg}
                  </span>
                  <span className="text-[8px] mt-1 text-inherit opacity-60">
                    {ZB.filter((z) => z.rg === rg).length} Psalms
                  </span>
                </button>
              ))}
            </div>

            {/* Zaboors catalog display */}
            <div className="max-h-[500px] overflow-y-auto space-y-6 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredZaboors.map((z) => (
                  <div
                    key={z.n}
                    onClick={() => handleUseZaboor(z)}
                    className="p-4 rounded-2xl border text-left bg-black/10 flex items-start gap-4 cursor-pointer hover:border-[#D4AF37]/40 hover:bg-black/20 transition-all font-serif-heading"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4a152c] text-[#D4AF37] flex items-center justify-center font-bold text-sm tracking-widest shrink-0 border border-[#D4AF37]/20">
                      {z.n}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black truncate">{z.r}</h4>
                      <p className="text-[11px] text-[#D4AF37] font-bold leading-normal truncate">
                        {z.p}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[8px] font-black uppercase tracking-wider text-inherit opacity-60">
                        <span>Raag {z.rg}</span>
                        <span>•</span>
                        <span>{z.bpm} BPM</span>
                      </div>
                      <p className="text-[9px] opacity-40 mt-0.5 truncate italic">{z.tp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SIALKOT CONVENTIONAL HYMNS TAB */}
        {activeTab === "k" && (
          <div className="space-y-6">
            <div className="p-4 rounded-3xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex gap-4 text-xs items-center leading-relaxed font-serif-heading">
              <span className="text-2xl">📖</span>
              <div>
                <strong>Sialkot Convention Geet Ki Kitab:</strong> Beloved historical hymnals sung at Punjab Conventions since 1904. Filter alphabetically and load hymns as direct melodic AI seeds.
              </div>
            </div>

            {/* Quick search geet input */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 opacity-40" />
                <input
                  type="text"
                  value={geetSearch}
                  onChange={(e) => {
                    setGeetFilter(e.target.value);
                    setActiveGeetAlpha(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl outline-none border transition-all text-xs bg-black/10 border-white/10 text-inherit focus:border-[#D4AF37]/30"
                  placeholder="Search hymns by Roman text, Urdu alphabet, or theme..."
                />
              </div>

              {activeGeetAlpha && (
                <button
                  onClick={() => setActiveGeetAlpha(null)}
                  className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider whitespace-nowrap hover:underline"
                >
                  Clear alpha filters
                </button>
              )}
            </div>

            {/* Alpha index slider */}
            <div className="flex flex-wrap gap-1 leading-none">
              {"ABCDEFGHIJKLMNOPRSTUWYZ".split("").map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setActiveGeetAlpha(letter);
                    setGeetFilter("");
                  }}
                  className={`w-6 h-6 rounded flex items-center justify-center text-[9px] uppercase font-bold border transition-colors ${
                    activeGeetAlpha === letter
                      ? "bg-[#D4AF37] border-transparent text-[#4a152c]"
                      : "bg-white/5 border-white/5 hover:bg-white/10 opacity-70"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Geets catalog displays */}
            <div className="max-h-[500px] overflow-y-auto space-y-6 pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredHymns.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => handleUseGeet(k)}
                    className="p-4 rounded-2xl border text-left bg-black/10 flex items-start justify-between cursor-pointer hover:border-[#D4AF37]/40 hover:bg-black/20 transition-all font-serif-heading"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-black truncate">{k.r}</h4>
                      <p className="text-xs text-[#D4AF37] font-bold leading-normal truncate text-right mt-1 opacity-90">
                        {k.u}
                      </p>
                      <p className="text-[9px] opacity-40 mt-1 uppercase tracking-tight">{k.tp}</p>
                    </div>
                    <span
                      className={`text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded border shrink-0 ${
                        k.t === "zaboor"
                          ? "bg-[#1D2D50]/20 border-[#1D2D50] text-[#7BAFD4]"
                          : "bg-green-600/10 border-green-500/20 text-green-400"
                      }`}
                    >
                      {k.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DEVOTIONAL LIBRARY TAB (COMPO CATALOG DB SAVES) */}
        {activeTab === "saved" && (
          <div className="space-y-6 font-serif-heading">
            <div className="p-4 rounded-3xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex gap-4 text-xs items-center leading-relaxed">
              <span className="text-2xl">🔒</span>
              <div>
                <strong>Saved Devotional Compositions:</strong> These items are persistent-stored on the backend using the local database registry. Read them, pull sheet notations, or prune records directly.
              </div>
            </div>

            {savedCompositions.length === 0 ? (
              <div className="h-[250px] border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center text-xs opacity-50 bg-black/5">
                <Save className="w-8 h-8 text-[#D4AF37]/20 mb-3" />
                <span className="uppercase font-bold tracking-widest">Library is currently empty</span>
                <p className="text-[10px] max-w-xs mt-1">
                  Once you compose a piece of music in the "Compose" tab, click "Save to Library" to secure its notations and lyrical structures.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCompositions.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-6 rounded-[2.5rem] border border-white/10 bg-black/15 flex flex-col justify-between hover:border-[#D4AF37]/40 hover:bg-black/25 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <h4 className="text-sm font-black text-[#D4AF37] truncate">
                            {comp.title}
                          </h4>
                          <p className="text-[10px] opacity-50 italic truncate">
                            {comp.subtitle || "No subtitle"}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteFromLibrary(comp.id)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[9px] uppercase tracking-wide opacity-60">
                        <span>Key: {comp.key}</span>
                        <span>{comp.timeSig}</span>
                        <span>{comp.bpm} BPM</span>
                      </div>

                      {comp.biblicalReference && (
                        <p className="text-[10px] text-[#E8C97A] truncate font-bold">
                          📖 {comp.biblicalReference}
                        </p>
                      )}

                      <p className="text-[11px] opacity-75 line-clamp-3 leading-relaxed">
                        {comp.moodDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-4">
                      <button
                        onClick={() => {
                          setComposition(comp);
                          setActiveTab("c");
                        }}
                        className="w-full py-2 bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all"
                      >
                        Load Composition To Studio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
