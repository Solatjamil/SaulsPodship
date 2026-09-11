/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Music, Award, Calendar, Search, ChevronRight, BookOpen, 
  Layers, Users, Sparkles, GraduationCap, Heart, CheckCircle2,
  Filter, Play, ArrowRight, ShieldCheck, Star
} from 'lucide-react';
import { 
  ALL_GOSPEL_SINGERS, 
  HONORED_DIN_DYNASTY, 
  SingerRecord, 
  SingerStatus, 
  SingerCategory 
} from '../data/singers';

export const SingersArchivePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'dynasty' | 'deceased' | 'veteran' | 'current' | 'composer'>('all');

  const filteredSingers = useMemo(() => {
    return ALL_GOSPEL_SINGERS.filter(s => {
      // Tab filter
      if (activeTab === 'dynasty' && !s.isHonoredDynasty) return false;
      if (activeTab === 'deceased' && s.status !== 'deceased') return false;
      if (activeTab === 'veteran' && s.status !== 'veteran') return false;
      if (activeTab === 'current' && s.status !== 'current') return false;
      if (activeTab === 'composer' && (s.category !== 'composer' && s.category !== 'both')) return false;

      // Text query
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.bio.toLowerCase().includes(q) ||
        (s.academicCredentials && s.academicCredentials.toLowerCase().includes(q)) ||
        (s.lineageNote && s.lineageNote.toLowerCase().includes(q)) ||
        (s.era && s.era.toLowerCase().includes(q)) ||
        (s.keyZaboorOrGeet && s.keyZaboorOrGeet.some(k => k.toLowerCase().includes(q))) ||
        (s.majorContributions && s.majorContributions.some(c => c.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery, activeTab]);

  const deceasedCount = ALL_GOSPEL_SINGERS.filter(s => s.status === 'deceased').length;
  const veteranCount = ALL_GOSPEL_SINGERS.filter(s => s.status === 'veteran').length;
  const currentCount = ALL_GOSPEL_SINGERS.filter(s => s.status === 'current').length;
  const composerCount = ALL_GOSPEL_SINGERS.filter(s => s.category === 'composer' || s.category === 'both').length;

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Header Banner */}
      <section className="bg-[#1A0812] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
              <Award className="w-3.5 h-3.5" />
              Pakistani Christian Music Heritage
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#E8C96A] border border-white/20">
              Historical &amp; Living Archive
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Pakistani Gospel Composers &amp; Singers Archive
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light max-w-3xl mx-auto">
            The definitive historical register of the composers, vocalists, musicologists, and hymn writers who shaped South Asian gospel music and the metrical Punjabi Zaboor tradition.
          </p>

          {/* Quick Stat Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-medium border border-white/10">
              <strong className="text-[#E8C96A]">{ALL_GOSPEL_SINGERS.length}</strong> Registered Masters
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-medium border border-white/10">
              <strong className="text-rose-300">{deceasedCount}</strong> Deceased Patriarchs
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-medium border border-white/10">
              <strong className="text-amber-300">{veteranCount}</strong> Veteran Maestros
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white font-medium border border-white/10">
              <strong className="text-emerald-300">{currentCount}</strong> Current Generation
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link to="/" className="hover:text-[#4A152C]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/music" className="hover:text-[#4A152C]">Sacred Music</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4A152C] font-bold">Singers &amp; Composers Archive</span>
        </div>

        {/* SPECIAL HONORED SECTION: The Din Family Musical Dynasty */}
        <section id="din-dynasty" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A0812] via-[#2D0F1E] to-[#1A0812] text-white border-2 border-[#D4AF37]/50 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
                <Star className="w-3.5 h-3.5 fill-current" />
                Special Memorial Tribute &amp; Musical Dynasty
              </span>
              <span className="text-xs text-[#E8C96A] font-semibold hidden sm:inline">
                Pioneers of Sacred Harmony &amp; Classical Composition
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F8F4E3]">
              The Din Family Musical Dynasty
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-light max-w-4xl">
              Honoring a four-generation lineage that begins with Pastor Jamil-ud-Din, one of the first pastors of the City Church of Montgomery (present-day Sahiwal), and continues through gospel composers, classical scholars and singers whose mastery of Hindustani ragas, sacred harmonium and choral hymnody shaped Christian worship across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {HONORED_DIN_DYNASTY.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-4 border-b border-white/10 pb-3">
                    <div className="shrink-0">
                      {member.photo ? (
                        <img src={member.photo.src} alt={member.photo.alt} title={member.photo.credit} loading="lazy" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover object-top border-2 border-[#D4AF37]/60 shadow" />
                      ) : (
                        <div aria-hidden className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[#D4AF37]/60 bg-[#4A152C] text-[#E8C96A] flex items-center justify-center font-serif text-xl font-bold">
                          {member.name.replace(/^(Rev\.|Dr\.|Padri|Pastor|Master)\s+/, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        member.status === 'deceased' 
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-700/50' 
                          : 'bg-[#D4AF37] text-[#1A0812]'
                      }`}>
                        {member.badge}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs text-[#E8C96A] font-medium">{member.role}</p>
                      <span className="mt-2 inline-block text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                        {member.dates}
                      </span>
                    </div>
                  </div>

                  {member.academicCredentials && (
                    <div className="flex items-start gap-2 text-xs bg-[#D4AF37]/10 p-2.5 rounded-xl border border-[#D4AF37]/20 text-[#E8C96A]">
                      <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" />
                      <div>
                        <span className="font-bold">Credential / Specialization: </span>
                        <span>{member.academicCredentials}</span>
                      </div>
                    </div>
                  )}

                  {member.lineageNote && (
                    <p className="text-[11px] text-white/75 italic bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      <strong>Lineage:</strong> {member.lineageNote}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-serif font-light">
                    {member.bio}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      Historic Contributions:
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
                      Key Works &amp; Compositions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.keyZaboorOrGeet.map((work, wIdx) => (
                        <span key={wIdx} className="px-2 py-0.5 rounded bg-white/10 text-white text-[11px] font-medium border border-white/10">
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Search and Tab Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by name (e.g. Jamson, Robson, Shahbaz), raga, role, song title, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-gray-600 font-bold px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-[#4A152C] text-[#E8C96A] shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>All Registry ({ALL_GOSPEL_SINGERS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dynasty')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dynasty'
                  ? 'bg-[#D4AF37] text-[#1A0812] shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Din Musical Dynasty ({HONORED_DIN_DYNASTY.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('deceased')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'deceased'
                  ? 'bg-rose-900 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Deceased Patriarchs ({deceasedCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('veteran')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'veteran'
                  ? 'bg-amber-800 text-[#E8C96A] shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Veteran Maestros ({veteranCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'current'
                  ? 'bg-emerald-900 text-emerald-100 shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Current Generation ({currentCount})</span>
            </button>

            <button
              onClick={() => setActiveTab('composer')}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'composer'
                  ? 'bg-indigo-900 text-indigo-100 shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Music Composers ({composerCount})</span>
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>Showing <strong>{filteredSingers.length}</strong> record(s)</span>
            {searchQuery && (
              <span>Matching query &ldquo;{searchQuery}&rdquo;</span>
            )}
          </div>

          {filteredSingers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 space-y-3">
              <p className="text-gray-500 font-medium">No composers or singers found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="text-xs font-bold text-[#4A152C] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSingers.map((singer) => (
                <article
                  key={singer.id}
                  className={`p-6 sm:p-8 rounded-3xl bg-white border shadow-sm transition-all hover:shadow-md space-y-6 ${
                    singer.isHonoredDynasty
                      ? 'border-[#D4AF37]/60 bg-amber-50/20 ring-1 ring-[#D4AF37]/20'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-100 pb-4">
                    <div className="shrink-0">
                      {singer.photo ? (
                        <img src={singer.photo.src} alt={singer.photo.alt} title={singer.photo.credit} loading="lazy" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover object-top border-2 border-[#D4AF37]/50 shadow" />
                      ) : (
                        <div aria-hidden className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[#D4AF37]/50 bg-[#F8F4E3] text-[#4A152C] flex items-center justify-center font-serif text-xl font-bold">
                          {singer.name.replace(/^(Rev\.|Dr\.|Padri|Pastor|Master)\s+/, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          singer.status === 'deceased'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : singer.status === 'veteran'
                            ? 'bg-[#1A0812] text-[#D4AF37]'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {singer.badge}
                        </span>

                        <span className="text-xs text-gray-500 font-medium">
                          {singer.era}
                        </span>

                        {singer.isHonoredDynasty && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#4A152C] px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-[#D4AF37]" />
                            Din Musical Dynasty
                          </span>
                        )}
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C]">
                        {singer.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium">
                        {singer.role}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      {singer.dates && (
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg border border-gray-200">
                          {singer.dates}
                        </span>
                      )}
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                        {singer.category === 'both' ? 'Composer & Singer' : singer.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Academic Credentials or Special Distinction */}
                  {singer.academicCredentials && (
                    <div className="flex items-start gap-2 bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900">
                      <GraduationCap className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Distinction / Credentials: </strong>
                        <span>{singer.academicCredentials}</span>
                      </div>
                    </div>
                  )}

                  {/* Lineage Note */}
                  {singer.lineageNote && (
                    <div className="text-xs text-[#4A152C] bg-[#4A152C]/5 px-3.5 py-2 rounded-xl border border-[#4A152C]/10 font-medium">
                      <strong>Lineage &amp; Heritage: </strong>
                      <span>{singer.lineageNote}</span>
                    </div>
                  )}

                  {/* Biography */}
                  <p className="text-sm text-gray-700 leading-relaxed font-serif font-light">
                    {singer.bio}
                  </p>

                  {/* Major Contributions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Major Historical Contributions &amp; Honors
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
                      {singer.majorContributions.map((contrib, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{contrib}</span>
                        </li>
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
                          <span
                            key={wIdx}
                            className="px-3 py-1 rounded-lg bg-[#4A152C]/10 hover:bg-[#4A152C]/15 text-[#4A152C] text-xs font-semibold transition-colors"
                          >
                            {work}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Cross-Link Back to Zaboor and Study Sections */}
        <section className="p-8 rounded-3xl bg-[#4A152C] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8C96A]">
              150 Biblical Psalms in Classical Punjabi Verse
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Explore the Punjabi Zaboor Collection
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Learn how Rev. Imam-ud-Din Shahbaz and classical composers translated and set all 150 Psalms to native North Indian ragas.
            </p>
          </div>
          <Link
            to="/music/punjabi-zaboor"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-bold text-xs tracking-wide shadow whitespace-nowrap transition-all"
          >
            <span>View 150 Punjabi Zaboor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default SingersArchivePage;
