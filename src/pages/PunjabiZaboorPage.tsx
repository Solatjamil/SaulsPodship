/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Music, BookOpen, ShieldCheck, ArrowRight, Layers, FileText, ChevronRight } from 'lucide-react';

export const PunjabiZaboorPage: React.FC = () => {
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
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Music className="w-4 h-4" />
            150 Biblical Psalms in Punjabi Verse
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            The Punjabi Zaboor Heritage
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            The historic metrical translation of the biblical Psalms by Rev. Imam-ud-Din Shahbaz (1898–1908), preserving sacred scripture in South Asian classical ragas.
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

        {/* Famous Zaboor Examples Table */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
            Iconic Punjabi Zaboor Selections
          </h2>
          <div className="rounded-2xl bg-white border border-[#4A152C]/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#4A152C] text-[#E8C96A]">
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Psalm #</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Punjabi Title</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">English Translation</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Classical Raga / Meter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {famousZaboors.map((z) => (
                    <tr key={z.number} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-[#4A152C]">Zaboor {z.number}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-900">{z.title}</td>
                      <td className="px-4 py-3.5 text-gray-600">{z.englishTitle}</td>
                      <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">{z.raga} &bull; {z.meter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Link to Pakistani Singers */}
        <section className="bg-[#4A152C] text-white p-8 sm:p-10 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-[#E8C96A]">Pakistani Gospel Singers Archive</h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Explore the biographies and contributions of the master vocalists who carried the Zaboor across generations.
            </p>
          </div>
          <Link
            to="/music/pakistani-singers-archive"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1A0812] font-bold text-xs shadow whitespace-nowrap"
          >
            <span>Open Singers Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PunjabiZaboorPage;
