/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, ArrowRight, Mic, BookOpen, Compass, Award, 
  GraduationCap, Star, CheckCircle2, Search, Users, ChevronRight,
  Sparkles, Layers
} from 'lucide-react';
import { 
  ALL_GOSPEL_SINGERS, 
  HONORED_DIN_DYNASTY 
} from '../data/singers';

export const MusicPage: React.FC = () => {
  const [quickSearch, setQuickSearch] = useState('');

  const filteredPreview = ALL_GOSPEL_SINGERS.filter(s => {
    if (!quickSearch.trim()) return true;
    const q = quickSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.role.toLowerCase().includes(q) ||
      (s.academicCredentials && s.academicCredentials.toLowerCase().includes(q)) ||
      (s.keyZaboorOrGeet && s.keyZaboorOrGeet.some(k => k.toLowerCase().includes(q)))
    );
  }).slice(0, 8);

  const sampleZaboors = [
    { number: 23, title: "Rab Mera Hai Chowanwala", raga: "Bhairavi / Pahadi", meter: "Hazaj Musamman Salim", theme: "The Lord is My Shepherd" },
    { number: 24, title: "Zameen Te Jo Kujh Ohde Vich", raga: "Bilawal", meter: "Ramal Musamman Mahzuf", theme: "The Earth is the Lord's" },
    { number: 34, title: "Main Har Vele Rab Di Tareef Karanga", raga: "Khamaj", meter: "Khafif Musaddas", theme: "Taste and See That the Lord is Good" },
    { number: 91, title: "Jehra Rab Di Pannah Vich Rahnda Hai", raga: "Yaman Kalyan", meter: "Mutaqarib Musamman", theme: "Under His Wings" },
    { number: 100, title: "Khushi De Naal Gao Rab Di Janab Vich", raga: "Bhairav", meter: "Hazaj Musamman", theme: "Make a Joyful Noise" },
    { number: 121, title: "Aakhan Chukke Main Dekhan Paharan Wal", raga: "Pahadi / Des", meter: "Hazaj Musamman Salim", theme: "I Lift Up My Eyes" },
    { number: 150, title: "Rab Di Tareef Karo Ohdi Pavitarta Vich", raga: "Kafi / Dadra", meter: "Ramal Musamman", theme: "Praise Him with All Instruments" }
  ];

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Hero Header */}
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Music className="w-4 h-4" />
            Sacred Musicology, Zaboor &amp; Hymnody
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Sacred Music &amp; Pakistani Gospel Heritage
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light max-w-3xl mx-auto">
            Preserving the sacred 150 Punjabi Zaboor and the living archive of Pakistani Christian gospel composers, classical vocalists, and musical patriarchs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#din-dynasty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-bold text-xs shadow-md transition-all"
            >
              <Star className="w-3.5 h-3.5 fill-[#1A0812]" />
              <span>Din Family Musical Dynasty</span>
            </a>

            <Link
              to="/music/pakistani-singers-archive"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Full Singers &amp; Composers Archive ({ALL_GOSPEL_SINGERS.length})</span>
            </Link>

            <Link
              to="/music/punjabi-zaboor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>150 Punjabi Zaboor</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* SPECIAL HONORED SECTION: The Din Family Musical Dynasty */}
        <section id="din-dynasty" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A0812] via-[#2D0F1E] to-[#1A0812] text-white border-2 border-[#D4AF37]/50 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
              <Star className="w-3.5 h-3.5 fill-current" />
              Special Memorial Tribute &amp; Musical Dynasty
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F8F4E3]">
              The Jamson &amp; Robson Din Musical Dynasty
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Celebrating the multi-generational family of veteran gospel music composers, classical scholars, and singers who enriched Pakistani church worship with classical mastery, sacred harmonium, and choral hymnody.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {HONORED_DIN_DYNASTY.map((member) => (
              <div
                key={member.id}
                className="p-6 sm:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        member.status === 'deceased'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-700/50'
                          : 'bg-[#D4AF37] text-[#1A0812]'
                      }`}>
                        {member.badge}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#E8C96A] font-medium">{member.role}</p>
                    </div>
                    <span className="text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      {member.dates}
                    </span>
                  </div>

                  {member.academicCredentials && (
                    <div className="flex items-start gap-2 text-xs bg-[#D4AF37]/10 p-3 rounded-xl border border-[#D4AF37]/30 text-[#E8C96A]">
                      <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" />
                      <div>
                        <span className="font-bold">Credential / Distinction: </span>
                        <span>{member.academicCredentials}</span>
                      </div>
                    </div>
                  )}

                  {member.lineageNote && (
                    <p className="text-xs text-white/75 italic bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <strong>Lineage:</strong> {member.lineageNote}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-serif font-light">
                    {member.bio}
                  </p>

                  <div className="space-y-1 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      Major Achievements:
                    </h4>
                    <ul className="space-y-1 text-xs text-white/80">
                      {member.majorContributions.slice(0, 3).map((contrib, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{contrib}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {member.keyZaboorOrGeet && (
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block mb-1.5">
                      Key Compositions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.keyZaboorOrGeet.map((work, wIdx) => (
                        <span key={wIdx} className="px-2.5 py-0.5 rounded bg-white/10 text-white text-[11px] font-medium border border-white/10">
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 text-center relative z-10">
            <Link
              to="/music/pakistani-singers-archive"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#E8C96A] hover:underline"
            >
              <span>Explore all {ALL_GOSPEL_SINGERS.length} historical records in the complete archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Two Core Portals: Punjabi Zaboor & Full Singers Archive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Punjabi Zaboor */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Classical Versification (1898–1908)
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C]">
                The 150 Punjabi Zaboor
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover how Rev. Imam-ud-Din Shahbaz translated and versified all 150 biblical Psalms into native Punjabi meters (Bahr) paired with classical North Indian ragas, establishing the liturgical foundation of millions.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">150 Psalms</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Classical Raags</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Sialkot Tradition</span>
              </div>
            </div>
            <Link
              to="/music/punjabi-zaboor"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4A152C] hover:bg-[#681E3E] text-[#E8C96A] font-bold text-xs shadow transition-all w-fit"
            >
              <span>Explore 150 Punjabi Zaboor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Pakistani Gospel Singers Archive */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Living Research Record
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C]">
                Pakistani Gospel Singers Archive
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                A comprehensive biographical and musical archive documenting historic patriarchs, master classical vocalists, pioneer hymn writers, and contemporary worship artists of Pakistan across every decade.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Deceased Patriarchs</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Veteran Maestros</span>
                <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">Contemporary Leaders</span>
              </div>
            </div>
            <Link
              to="/music/pakistani-singers-archive"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-bold text-xs shadow transition-all w-fit"
            >
              <span>Open Singers &amp; Composers Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Search & Quick Preview of Gospel Artists */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Instant Registry Search
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A152C]">
                Search Gospel Composers &amp; Singers
              </h3>
            </div>
            <Link
              to="/music/pakistani-singers-archive"
              className="text-xs font-bold text-[#4A152C] hover:underline inline-flex items-center gap-1"
            >
              <span>View All {ALL_GOSPEL_SINGERS.length} Masters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by name (e.g. Jamson J Din, Robson J Din, Bashir Anwar, Ernest Mall)..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A152C]/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPreview.map((artist) => (
              <div
                key={artist.id}
                className="p-4 rounded-2xl bg-gray-50 hover:bg-amber-50/40 border border-gray-100 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A0812] text-[#D4AF37]">
                      {artist.badge}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {artist.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#4A152C]">
                    {artist.name}
                  </h4>
                  <p className="text-[11px] text-gray-600 line-clamp-2 mt-0.5">
                    {artist.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-200/60">
                  <Link
                    to={`/music/pakistani-singers-archive?q=${encodeURIComponent(artist.name)}`}
                    className="text-[11px] font-bold text-[#4A152C] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Biography</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Iconic Punjabi Zaboor Selections Table */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Traditional Hymnody
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#4A152C]">
                Iconic Punjabi Zaboor Selections
              </h3>
            </div>
            <Link
              to="/music/punjabi-zaboor"
              className="text-xs font-bold text-[#4A152C] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore Complete 150 Zaboor History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-[#4A152C]/15 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#4A152C] text-[#E8C96A]">
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Psalm #</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Punjabi Title</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Biblical Theme</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-wider text-[11px]">Classical Raga / Meter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleZaboors.map((z) => (
                    <tr key={z.number} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3.5 font-bold text-[#4A152C]">Zaboor {z.number}</td>
                      <td className="px-4 py-3.5 font-medium text-gray-900">{z.title}</td>
                      <td className="px-4 py-3.5 text-gray-600">{z.theme}</td>
                      <td className="px-4 py-3.5 text-gray-500 font-mono text-[11px]">
                        {z.raga} &bull; {z.meter}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Featured Patriarch Showcase: Rev. Imam-ud-Din Shahbaz */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#1A0812] text-white border border-[#D4AF37]/30 shadow-lg">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8C96A]">
              Pioneering Architect of South Asian Hymnody
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Rev. Imam-ud-Din Shahbaz (1845–1921)
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Blind in his latter years, Rev. Shahbaz worked tirelessly in the late 19th century to render the complete Hebrew Psalter into classical Punjabi poetic meters. His work lives on every Sunday across churches worldwide.
            </p>
            <div className="pt-2">
              <Link
                to="/music/punjabi-zaboor"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline"
              >
                <span>Read his complete biographical monograph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default MusicPage;
