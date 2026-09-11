/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, BookOpen, ExternalLink, ArrowRight, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { getZaboorUrl, getZaboorTitle, getZaboorEnglishTheme, getZaboorRaga } from '../data/zaboorsList';

export const PunjabiZaboorPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const allZaboors = Array.from({ length: 150 }, (_, i) => {
    const num = i + 1;
    return {
      number: num,
      title: getZaboorTitle(num),
      englishTheme: getZaboorEnglishTheme(num),
      raga: getZaboorRaga(num),
      url: getZaboorUrl(num)
    };
  });

  const filteredZaboors = allZaboors.filter(z => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      z.number.toString() === q ||
      z.title.toLowerCase().includes(q) ||
      z.englishTheme.toLowerCase().includes(q) ||
      z.raga.toLowerCase().includes(q)
    );
  });

  const famousZaboors = [
    { number: 23, title: "Rab Mera Hai Chowanwala", englishTitle: "The Lord is My Shepherd (Psalm 23)", raga: "Bhairavi / Pahadi", meter: "Hazaj Musamman Salim" },
    { number: 24, title: "Zameen Te Jo Kujh Ohde Vich", englishTitle: "The Earth is the Lord's (Psalm 24)", raga: "Bilawal", meter: "Ramal Musamman Mahzuf" },
    { number: 34, title: "Main Har Vele Rab Di Tareef Karanga", englishTitle: "I Will Bless the Lord at All Times (Psalm 34)", raga: "Khamaj", meter: "Khafif Musaddas" },
    { number: 91, title: "Jehra Rab Di Pannah Vich Rahnda Hai", englishTitle: "He Who Dwells in the Shelter of the Most High (Psalm 91)", raga: "Yaman Kalyan", meter: "Mutaqarib Musamman" },
    { number: 100, title: "Khushi De Naal Gao Rab Di Janab Vich", englishTitle: "Make a Joyful Noise (Psalm 100)", raga: "Bhairav", meter: "Hazaj Musamman" },
    { number: 121, title: "Aakhan Chukke Main Dekhan Paharan Wal", englishTitle: "I Lift Up My Eyes to the Hills (Psalm 121)", raga: "Pahadi / Des", meter: "Hazaj Musamman Salim" },
    { number: 150, title: "Rab Di Tareef Karo Ohdi Pavitarta Vich", englishTitle: "Praise the Lord in His Sanctuary (Psalm 150)", raga: "Kafi / Rhythmic Dadra", meter: "Ramal Musamman" },
  ];

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Music className="w-4 h-4" />
            150 Biblical Psalms in Punjabi Verse
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            The Punjabi Zaboor Heritage
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light max-w-2xl mx-auto">
            The historic metrical translation of all 150 biblical Psalms by Rev. Imam-ud-Din Shahbaz (1898–1908), preserving sacred scripture in South Asian classical ragas with direct links to <a href="https://punjabizaboor1908.com/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline font-semibold">punjabizaboor1908.com</a>.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-gray-800">
        
        {/* Monograph Overview */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C]">
            Historical &amp; Musicological Context
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-serif font-light">
            Between 1898 and 1908, the Sialkot Mission in undivided Punjab saw the miraculous creation of the <em>Punjabi Zaboor</em>. Translating directly from the Hebrew Masoretic text, Rev. Imam-ud-Din Shahbaz versified all 150 Psalms into traditional Punjabi poetic meters (Bahr).
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Rather than imposing Western hymn tunes, these metrical psalms were intentionally married to native classical ragas (Bhairavi, Yaman, Pahadi, Kafi), allowing Punjabi Christians to worship the God of Abraham, Isaac, and Jacob in their indigenous mother tongue.
          </p>
        </section>

        {/* Iconic Punjabi Zaboor Selections Table with Official Links */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">Featured Directory</span>
              <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
                Iconic Punjabi Zaboor Selections &amp; Official Links
              </h2>
            </div>
            <a
              href="https://punjabizaboor1908.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A152C] hover:text-[#8B1C2E] bg-amber-100/70 px-3.5 py-2 rounded-xl border border-amber-300 transition-all"
            >
              <span>Visit Official punjabizaboor1908.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl bg-white border border-[#4A152C]/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#4A152C] text-[#E8C96A]">
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Psalm #</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Punjabi Title</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">English Translation</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Classical Raga</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px] text-right">Official Website Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {famousZaboors.map((z) => {
                    const officialUrl = getZaboorUrl(z.number);
                    return (
                      <tr key={z.number} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3.5 font-bold text-[#4A152C]">Zaboor {z.number}</td>
                        <td className="px-4 py-3.5 font-medium text-gray-900">{z.title}</td>
                        <td className="px-4 py-3.5 text-gray-600">{z.englishTitle}</td>
                        <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">{z.raga}</td>
                        <td className="px-4 py-3.5 text-right">
                          <a
                            href={officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#4A152C] text-[#E8C96A] text-xs font-bold hover:bg-[#681E3E] transition-all shadow-xs"
                          >
                            <span>Open on punjabizaboor1908.com</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Complete 1-150 Zaboor Mapped Directory */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">Complete 150 Archive Mappings</span>
              <h3 className="font-serif text-2xl font-bold text-[#4A152C]">
                All 150 Punjabi Zaboors Mapped to punjabizaboor1908.com
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Browse or search all 150 metrical Psalms with direct secure links to the official Sialkot 1908 digital repository.
              </p>
            </div>
            <div className="relative sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search Zaboor #, Title, or Raga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A152C]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredZaboors.map((z) => (
              <div
                key={z.number}
                className="p-4 rounded-xl bg-gray-50 hover:bg-amber-50/50 border border-gray-200/80 hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#4A152C] text-[#E8C96A]">
                      Zaboor {z.number}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Raag: {z.raga}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-[#4A152C] line-clamp-1">
                    {z.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                    {z.englishTheme}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">1908 Sialkot Version</span>
                  <a
                    href={z.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4A152C] hover:text-[#8B1C2E]"
                  >
                    <span>View on punjabizaboor1908.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Classical Composers and The Din Family Mention */}
        <section className="bg-amber-50/70 p-6 sm:p-8 rounded-3xl border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#1A0812] text-[#D4AF37]">
              Classical Raga Arrangers &amp; Tabla Masters
            </span>
            <span className="text-xs text-[#4A152C] font-semibold">Living Heritage</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A152C]">
            Composing &amp; Transmitting the Zaboor Through the Generations
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-serif font-light">
            While Rev. Imam-ud-Din Shahbaz versified the Psalms, the living musical tradition was cultivated by eminent Christian classical music theorists, choir masters, and composers—such as <strong>Robson J. Din (M.Mus)</strong>, revered for his masterly command of classical raga structures; his brother the late patriarch <strong>Jamson J. Din</strong> (17 February 1942 – October 2020), legendary master Tabla Artist and pioneer harmonium choir director; alongside <strong>Dr. Bashir Anwar</strong>, <strong>Nadeem Jamil</strong>, and <strong>Nada Jamil</strong>.
          </p>
          <div className="pt-1">
            <Link
              to="/music/pakistani-singers-archive#din-dynasty"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4A152C] hover:text-[#8B1C2E] underline"
            >
              <span>Read about the Din Family Musical Dynasty &amp; Veteran Composers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Link to Pakistani Singers */}
        <section className="bg-[#4A152C] text-white p-8 sm:p-10 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-[#E8C96A]">Pakistani Gospel Singers &amp; Composers Archive</h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Explore the complete biographical register of 25+ deceased patriarchs, veteran maestros, classical scholars, and contemporary worship leaders.
            </p>
          </div>
          <Link
            to="/music/pakistani-singers-archive"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1A0812] font-bold text-xs shadow whitespace-nowrap"
          >
            <span>Open Singers &amp; Composers Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PunjabiZaboorPage;
