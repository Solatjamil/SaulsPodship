/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, BookOpen, ShieldCheck, Music, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Encyclopedia & Doctrine",
      q: "What is the scope of the 50-Volume Theological Encyclopedia?",
      a: "The encyclopedia covers 50 exhaustive volumes spanning Systematic Theology, Biblical Typology, Messianic Prophecy, Patristic Church History, Hebrew/Greek Exegesis, the Tabernacle, and the Book of Revelation. Each volume is complete with structured data tables, historical timelines, and verified scripture citations."
    },
    {
      category: "Encyclopedia & Doctrine",
      q: "Which theological tradition or hermeneutical method does Saul's Podship follow?",
      a: "Our work is grounded in classical grammatical-historical hermeneutics and historic Christian ecumenical orthodoxy (the Nicene, Apostles', and Chalcedonian creeds). We focus on original language analysis in Hebrew, Aramaic, and Greek without sectarian partisanship."
    },
    {
      category: "Sacred Music & Zaboor",
      q: "What is the Punjabi Zaboor and why is it significant?",
      a: "The Punjabi Zaboor consists of all 150 biblical Psalms versified into classical Punjabi metrical poetry (Bahr) by Rev. Imam-ud-Din Shahbaz between 1898 and 1908. Set to classical South Asian ragas, it forms the liturgical heartbeat of millions of Punjabi Christians worldwide."
    },
    {
      category: "Access & Usage",
      q: "Is the theological content freely accessible for churches, seminaries, and students?",
      a: "Yes. All 50 volumes, research monographs, audio masterclasses, and data tables are published freely for personal study, church education, academic research, and sermon preparation."
    },
    {
      category: "Access & Usage",
      q: "How can I cite Saul's Podship volumes in my academic papers or sermons?",
      a: "You may cite any volume using standard academic citation formats (e.g., 'Saul's Podship Scriptorium, Volume [Number]: [Title], www.saulspodship.com/encyclopedia/[slug]'). Full metadata is provided on each volume page."
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <HelpCircle className="w-4 h-4" />
            Scriptorium Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Answers regarding our theological corpus, editorial standards, Punjabi Zaboor history, and scriptorium access.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-serif font-bold text-lg text-[#1D2D50] hover:text-[#4A152C] transition-colors"
                >
                  <span className="flex-1">{faq.q}</span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90 text-[#4A152C]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-700 leading-relaxed border-t border-gray-100 font-sans">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 mb-3">
                      {faq.category}
                    </span>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-gray-500">
            Have a specific theological question not answered here?{' '}
            <Link to="/contact" className="text-[#4A152C] font-bold hover:underline">
              Contact our editorial desk &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
