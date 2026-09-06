/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Music, BookOpen, Send, Bot, MessageSquare, Layers, ShieldCheck } from 'lucide-react';
import { GospelComposer } from '../../components/GospelComposer';

export const StudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'composer' | 'research'>('composer');
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResponse, setResearchResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleResearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQuery.trim()) return;

    setIsSearching(true);
    setResearchResponse(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: researchQuery })
      });
      if (res.ok) {
        const data = await res.json();
        setResearchResponse(data.reply || data.text || "Scriptorium analysis generated successfully.");
      } else {
        setResearchResponse("The theological research assistant is currently optimizing query parameters. Please consult our 50 volumes in the Encyclopedia.");
      }
    } catch (err) {
      setResearchResponse("The Scriptorium research assistant operates on our 50-volume corpus. You may browse all topics directly in the Encyclopedia.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Sparkles className="w-4 h-4" />
            Interactive Theological Studio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Scriptorium AI Studio &amp; Composer
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Interactive hymn arrangement tools based on South Asian classical ragas and biblical research intelligence.
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
              Theological Exegesis Assistant
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
              Expositional Scripture Assistant
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ask deep questions concerning biblical Greek and Hebrew terms, covenantal theology, typology in the Tabernacle, or historical Christian doctrine.
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
                <span>{isSearching ? 'Analyzing Manuscript Data...' : 'Run Exegetical Query'}</span>
              </button>
            </form>

            {researchResponse && (
              <div className="p-6 rounded-2xl bg-[#4A152C]/5 border border-[#4A152C]/20 space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#4A152C] uppercase tracking-wider">
                  Scriptorium Analysis
                </h3>
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                  {researchResponse}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudioPage;
