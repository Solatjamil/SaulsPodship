/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Music, Send, Bot, BookOpen, HelpCircle, ListChecks } from 'lucide-react';
import { GospelComposer } from '../../components/GospelComposer';
import { research, brief, type Hit } from '../lib/studio/researchEngine';

export const StudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'composer' | 'research'>('composer');
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResponse, setResearchResponse] = useState<string | null>(null);
  const [hits, setHits] = useState<Hit[]>([]);
  const [meta, setMeta] = useState<{ total: number; scanned: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleResearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery.trim()) return;
    setIsSearching(true);
    setResearchResponse(null);
    try {
      const r = await research(researchQuery);
      setHits(r.hits); setMeta({ total: r.total, scanned: r.scanned });
      setResearchResponse(r.hits.length ? brief(r.hits) : "Nothing in the Scriptorium matches those words yet. Try a scripture reference (e.g. Isaiah 53), a doctrine (atonement, Trinity, baptism) or a name (Melchizedek, Cyrus).");
    } finally {
      setIsSearching(false);
    }
  };

  const SUGGESTIONS = ['Isaiah 53 suffering servant', 'Where did God come from?', 'Melchizedek priesthood', 'Trinity in the Old Testament', 'Ark of the Covenant', 'Kings of Judah reformers'];

  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Sparkles className="w-4 h-4" />
            Interactive Theological Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Scriptorium Studio &amp; Composer
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Compose, hear and download sacred songs in South Asian ragas and global gospel — and search the Scriptorium's own scholarship. Everything runs in your browser.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('composer')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'composer'
                  ? 'bg-[#D4AF37] text-[#1A0812] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Gospel &amp; Raga Composer
            </button>
            <button
              onClick={() => setActiveTab('research')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'research'
                  ? 'bg-[#D4AF37] text-[#1A0812] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Scriptorium Research
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === 'composer' ? (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#4A152C] flex items-center gap-2">
                <Music className="w-6 h-6 text-[#D4AF37]" />
                Raga-Based Sacred Music Arrangement
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Compose or arrange Christian hymns using traditional South Asian classical scales (Bhairavi, Yaman Kalyan, Bilawal, Khamaj, Kafi) and indigenous metrical rhythms (Dadra, Keherwa, Roopak).
              </p>
            </div>
            <GospelComposer
              brightnessMode="light"
              themeStyles={{
                bg: "#FDFBF7",
                text: "#1D2D50",
                card: "#FFFFFF",
                border: "#E2E8F0"
              }}
            />
          </div>
        ) : (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-[#4A152C] flex items-center gap-2">
              <Bot className="w-6 h-6 text-[#D4AF37]" />
              Scriptorium Research Desk
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ask a question or type a passage. The desk searches the 100 Tough Questions, the 1,000-question archive and all 51 volumes, and quotes what the Scriptorium already teaches — no AI, only the sources.
            </p>

            <form onSubmit={handleResearchSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={4}
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  placeholder="e.g., Explain how the 'Asham' guilt offering in Leviticus 5 points prophetically to the substitutionary atonement in Isaiah 53..."
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#4A152C] focus:ring-1 focus:ring-[#4A152C] text-sm text-gray-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching || !researchQuery.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A152C] hover:bg-[#681E3E] disabled:opacity-50 text-[#E8C96A] font-bold text-xs shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSearching ? 'Searching the Scriptorium…' : 'Search the Scriptorium'}</span>
              </button>
            </form>

            {!researchResponse && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(sg => (
                  <button key={sg} type="button" onClick={() => setResearchQuery(sg)} className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#F8F4E3] border border-[#D4AF37]/40 text-[#4A152C] hover:bg-[#D4AF37]/20">{sg}</button>
                ))}
              </div>
            )}

            {researchResponse && (
              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-[#4A152C]/5 border border-[#4A152C]/20 space-y-3">
                  <h3 className="font-serif font-bold text-sm text-[#4A152C] uppercase tracking-wider">
                    Scriptorium Brief
                  </h3>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                    {researchResponse}
                  </p>
                  {meta && <p className="text-[10px] text-gray-500 uppercase tracking-wider">{meta.total} matching entries · {meta.scanned.toLocaleString()} documents searched · quoted verbatim from the archive</p>}
                </div>
                {hits.length > 0 && (
                  <ul className="grid gap-3">
                    {hits.map((h, i) => {
                      const Icon = h.kind === 'tough' ? HelpCircle : h.kind === 'quiz' ? ListChecks : BookOpen;
                      const label = h.kind === 'tough' ? '100 Tough Questions' : h.kind === 'quiz' ? 'Quiz Archive' : 'Encyclopedia';
                      return (
                        <li key={i} className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-[#D4AF37]/60 transition-colors">
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4A152C]/70"><Icon className="w-3.5 h-3.5 text-[#D4AF37]" />{label}{h.ref && <span className="ml-auto font-mono normal-case text-gray-500">{h.ref}</span>}</div>
                          <h4 className="font-serif font-bold text-[#1D2D50] mt-1">{h.title}</h4>
                          <p className="text-sm text-gray-700 leading-relaxed mt-1">{h.body}</p>
                          {h.extra && h.extra.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">{h.extra.map(e => <span key={e.key} className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8F4E3] border border-[#D4AF37]/30 text-[#4A152C]" title={e.text}>{e.key}</span>)}</div>
                          )}
                          <Link to={h.href} className="inline-block mt-2 text-xs font-bold text-[#4A152C] hover:underline">Open in the Scriptorium →</Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioPage;
