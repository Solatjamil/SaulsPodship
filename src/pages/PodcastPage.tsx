/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Play, Calendar, Clock, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';
import { EPISODES } from '../data/episodes';

export const PodcastPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <Mic className="w-4 h-4" />
            Audio Scriptorium
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Saul's Podship Theological Podcast
          </h1>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
            In-depth discussions bridging historical theology, manuscript studies, and biblical exegesis.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="font-serif text-2xl font-bold text-[#4A152C]">All Episodes</h2>
          <span className="text-xs text-gray-500 font-semibold">{EPISODES.length} Available Masterclasses</span>
        </div>

        <div className="space-y-6">
          {EPISODES.map((ep) => (
            <article
              key={ep.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#1A0812] text-[#D4AF37]">
                    EPISODE 0{ep.number}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {ep.duration}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ep.publishDate}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#1D2D50] hover:text-[#4A152C] transition-colors">
                  <Link to={`/podcast/${ep.slug}`}>{ep.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {ep.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {ep.topics.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center gap-3 flex-shrink-0">
                <Link
                  to={`/podcast/${ep.slug}`}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A152C] text-[#E8C96A] font-bold text-xs shadow hover:bg-[#681E3E] transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Episode Notes</span>
                </Link>
                {ep.youtubeUrl && (
                  <a
                    href={ep.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow hover:bg-red-500 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Watch Video</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;
