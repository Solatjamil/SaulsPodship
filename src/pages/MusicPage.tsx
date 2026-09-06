/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight, Mic, BookOpen, Compass, Award } from 'lucide-react';
import { PIONEERS_AND_SINGERS } from '../data/singers';

export const MusicPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Music className="w-4 h-4" />
            Sacred Musicology &amp; Hymnody
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Sacred Music &amp; South Asian Hymnody
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Preserving the indigenous heritage of the 150 Punjabi Zaboor and the living historical archive of Pakistani Christian gospel singers.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Punjabi Zaboor */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Classical Versification (1898–1908)
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
                The Punjabi Zaboor (150 Psalms)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover how Rev. Imam-ud-Din Shahbaz translated and versified all 150 biblical Psalms into native Punjabi meters (Bahr) paired with classical North Indian ragas, establishing the liturgical foundation of millions.
              </p>
            </div>
            <Link
              to="/music/punjabi-zaboor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A152C] hover:bg-[#681E3E] text-[#E8C96A] font-bold text-xs shadow transition-all w-fit"
            >
              <span>Explore Punjabi Zaboor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Pakistani Gospel Singers Archive */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B1C2E]">
                Living Research Record
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
                Pakistani Gospel Singers Archive
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                A comprehensive biographical and musical archive documenting historic patriarchs, master classical vocalists, pioneer hymn writers, and contemporary worship artists of Pakistan.
              </p>
            </div>
            <Link
              to="/music/pakistani-singers-archive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-bold text-xs shadow transition-all w-fit"
            >
              <span>View Singers Archive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Patriarch Showcase */}
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
