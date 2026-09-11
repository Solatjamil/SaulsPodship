/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, BookOpen, Globe, Award, ShieldCheck, ArrowRight, 
  ExternalLink, Sparkles, CheckCircle2, Gift, Users, Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SupportPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Heart className="w-4 h-4 text-rose-700 fill-current" />
            Partner in Scriptorium Research
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Support Saul's Podship on Patreon
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light max-w-2xl mx-auto">
            Empower global Christian education, free academic biblical research, and the digital preservation of South Asian sacred music through our official Patreon community.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://www.patreon.com/solatnadeem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FF424D] hover:bg-[#E0323D] text-white font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>Join on Patreon &rarr;</span>
            </a>

            <a
              href="https://www.patreon.com/solatnadeem/gift"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm shadow-md transition-all"
            >
              <Gift className="w-4 h-4 text-[#E8C96A]" />
              <span>Gift a Membership</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-gray-800">
        
        {/* Patreon Direct Banner Card */}
        <section className="bg-gradient-to-br from-[#1A0812] to-[#4A152C] text-white p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#E8C96A] border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            Official Patreon Portal: @solatnadeem
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Fueling Open-Access Christian Scholarship
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light max-w-2xl mx-auto">
            Your monthly pledge directly finances independent theological research, original Greek/Hebrew linguistic parsing, podcast studio production, and the archival scanning of rare South Asian Christian hymnody.
          </p>

          <div className="pt-2">
            <a
              href="https://www.patreon.com/solatnadeem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-black text-sm shadow-lg transition-all"
            >
              <span>Become a Scriptorium Patron</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Why Your Partnership Matters */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A152C] text-center">
            Where Your Support Goes
          </h2>
          <p className="text-base text-gray-700 leading-relaxed font-serif font-light text-center max-w-2xl mx-auto">
            Every volume in our 51-volume encyclopedia, every podcast masterclass, and every digital hymn archive is provided completely free of charge to pastors, students, missionaries, and believers worldwide.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
              <BookOpen className="w-5 h-5 text-[#8B1C2E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">Open Theological Publishing</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Keeping all 51 encyclopedia volumes and scholarly reference tables free from commercial paywalls.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
              <Globe className="w-5 h-5 text-[#8B1C2E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">Sacred Hymnody Preservation</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Digitizing and archiving 150 classical Punjabi Zaboor, historic meters, and Pakistani Christian artists.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
              <Headphones className="w-5 h-5 text-[#8B1C2E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">Audio Masterclasses</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Producing high-fidelity expository podcast episodes and video lessons for global distribution.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-[#8B1C2E] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">Peer-Reviewed Rigor</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Funding linguistic tools, ancient manuscript access, and academic peer review workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prayer & Editorial Inquiries */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-[#4A152C]">
            Prayer &amp; Academic Inquiries
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
            If you represent a seminary, library, church, or translation collective and wish to collaborate directly with Solat Nadeem, please reach out to our editorial desk.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A152C] hover:bg-[#681E3E] text-[#E8C96A] font-bold text-xs shadow transition-all"
            >
              <span>Contact Editorial Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
