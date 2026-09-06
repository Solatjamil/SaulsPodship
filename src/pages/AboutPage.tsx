/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Award, Heart, Globe, Compass, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <BookOpen className="w-4 h-4" />
            Our Heritage &amp; Mission
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            About Saul's Podship Scriptorium
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Dedicated to scholarly biblical exegesis, historic Christian theology, and the preservation of indigenous South Asian hymnody.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-gray-800">
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C]">
            The Scriptorium Vision
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-serif font-light">
            Saul's Podship was established as an open-access digital scriptorium. In an era of soundbite theology, we labor to restore depth, historic grounding, and rigorous linguistic exegesis to the study of the Holy Scriptures.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Our encyclopedia spans 50 comprehensive volumes authored with academic discipline, cross-referencing Hebrew, Greek, and Aramaic manuscripts with the ecumenical creeds and historical councils of the church.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#8B1C2E] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#4A152C] mb-2">Expository Rigor</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every doctrine is evaluated under grammatical-historical hermeneutics, prioritizing original linguistic intent over modern eisegesis.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Globe className="w-8 h-8 text-[#8B1C2E] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#4A152C] mb-2">Global &amp; Indigenous</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Preserving the sacred heritage of the South Asian church, including the poetic 150 Punjabi Zaboor and historical Christian archives.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Award className="w-8 h-8 text-[#8B1C2E] mb-3" />
            <h3 className="font-serif font-bold text-lg text-[#4A152C] mb-2">Open Scriptorium</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              All 50 volumes, audio lectures, data tables, and study materials remain completely free and accessible for worldwide research.
            </p>
          </div>
        </section>

        <section className="bg-[#4A152C] text-white p-8 sm:p-10 rounded-3xl shadow-md space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#E8C96A]">
            Explore the Encyclopedia
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Discover all 50 volumes covering Systematic Theology, Messianic Prophecies, Biblical Numerology, the Book of Revelation, and the Five Offerings of Leviticus.
          </p>
          <div className="pt-2">
            <Link
              to="/encyclopedia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1A0812] font-bold text-xs shadow-md"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
