/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, BookOpen } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <ShieldCheck className="w-4 h-4" />
            Scriptorium Notice
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Theological &amp; Editorial Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-white/70">Last Updated: September 6, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-gray-800">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#4A152C]">Ecumenical Perspective</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Saul's Podship strives to present rigorous, historically informed biblical scholarship. While our editorial board operates within classical historic Christian orthodoxy (creedal Christianity), interpretations of complex prophetic texts, millenarian viewpoints, or ceremonial typology represent careful exegesis intended to stimulate academic inquiry and spiritual devotion.
          </p>
          <h2 className="font-serif text-xl font-bold text-[#4A152C]">External Citations &amp; Links</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            External links to companion blog articles, research archives, and YouTube masterclasses are provided for educational enrichments and verified for accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
