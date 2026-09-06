/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, Award, Calendar, Search, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { PIONEERS_AND_SINGERS } from '../data/singers';

export const SingersArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSingers = PIONEERS_AND_SINGERS.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      s.bio.toLowerCase().includes(q) ||
      (s.keyZaboorOrGeet && s.keyZaboorOrGeet.some(k => k.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Award className="w-4 h-4" />
            Historical Biographical Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Pakistani Gospel Singers &amp; Pioneers
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Biographical records and musical legacies of the composers, vocalists, and patriarchs of South Asian Christian music.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pioneers, artists, or classic geet/zaboor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm text-gray-800 focus:outline-none"
          />
        </div>

        {/* List of Pioneers and Artists */}
        <div className="space-y-8">
          {filteredSingers.map((singer) => (
            <article
              key={singer.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#1A0812] text-[#D4AF37]">
                      {singer.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{singer.era}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#4A152C]">{singer.name}</h2>
                  <p className="text-xs text-gray-500 font-medium">{singer.role}</p>
                </div>
                {singer.dates && (
                  <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 self-start sm:self-auto">
                    {singer.dates}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed font-serif font-light">
                {singer.bio}
              </p>

              {/* Major Contributions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Major Contributions &amp; Honors
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                  {singer.majorContributions.map((c, idx) => (
                    <li key={idx} className="leading-relaxed">{c}</li>
                  ))}
                </ul>
              </div>

              {/* Key Works */}
              {singer.keyZaboorOrGeet && (
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Key Zaboor &amp; Geet Compositions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {singer.keyZaboorOrGeet.map((work, wIdx) => (
                      <span key={wIdx} className="px-3 py-1 rounded-lg bg-[#4A152C]/10 text-[#4A152C] text-xs font-semibold">
                        {work}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingersArchivePage;
