/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, CheckCircle, Scale, FileText, ArrowRight } from 'lucide-react';

export const ScholarlyStandardsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <ShieldCheck className="w-4 h-4" />
            Hermeneutical Framework
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Scholarly &amp; Peer-Review Standards
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Our academic criteria for biblical exegesis, primary source attribution, and theological objectivity.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-gray-800">
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
            Core Exegetical Principles
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#4A152C]/10 text-[#4A152C] flex items-center justify-center flex-shrink-0 mt-1">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">1. Grammatical-Historical Method</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We interpret every passage in light of its original historical context, grammatical structure, and authorial intent. We reject speculative eisegesis and allegorization that disconnects scripture from its covenantal setting.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#4A152C]/10 text-[#4A152C] flex items-center justify-center flex-shrink-0 mt-1">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">2. Original Language Grounding</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All doctrinal definitions in our 50 volumes reference original Hebrew (Masoretic Text), Aramaic (Targums / Daniel), and Greek (Novum Testamentum Graece / Septuagint) terms with precise transliterations and morphological breakdowns.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#4A152C]/10 text-[#4A152C] flex items-center justify-center flex-shrink-0 mt-1">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">3. Canonical &amp; Historical Creeds Harmony</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our exegesis is framed by the historic ecumenical orthodoxy of the historic church — including the Apostles' Creed (Vol. 06), the Nicene-Constantinopolitan Creed (Vol. 18), and the Chalcedonian Definition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#4A152C]">
            Verified Link Policy
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Every external blog article link and YouTube video reference across the 50 volumes is audited for active status. Broken links and speculative URLs are strictly forbidden from our public records.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ScholarlyStandardsPage;
