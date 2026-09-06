/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mic, Music, ExternalLink, Play, ArrowDown, ChevronRight, Calendar, ShieldCheck } from 'lucide-react';
import { Volume } from '../types';
import { SITE } from '../config/site';

interface HeroProps {
  variant: 'home' | 'volume';
  volume?: Volume;
  onStartReading?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ variant, volume, onStartReading }) => {
  if (variant === 'volume' && volume) {
    const heroImg = volume.heroImage?.src || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=85';
    const heroCredit = volume.heroImage?.credit || 'Historical Theological Archive';
    const numPadded = volume.number < 10 ? `0${volume.number}` : `${volume.number}`;

    return (
      <header id="volume-hero" className="relative w-full overflow-hidden min-h-[100svh] md:min-h-[88svh] lg:min-h-[100svh] flex flex-col justify-end items-center bg-[#1a0812] text-white">
        {/* Background Image Layer with adjusted brightness and rich visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt={volume.heroImage?.alt || volume.title}
            className="w-full h-full object-cover object-center transform scale-105 filter saturate-[1.05] contrast-[1.03]"
            referrerPolicy="no-referrer"
          />
          {/* Lighter owner-tunable overlay allowing artwork to stay bright */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content Container with local text scrim - Center Aligned */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-[max(3rem,env(safe-area-inset-bottom))] flex flex-col items-center justify-end text-center hero-content rounded-3xl mb-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-wide text-[#E8C96A]">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <Link to="/encyclopedia" className="hover:text-white transition-colors">Encyclopedia</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-white font-semibold">Volume {numPadded}</span>
          </nav>

          {/* Volume Pill & Category */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1a0812] shadow-lg">
              <BookOpen className="w-3.5 h-3.5" />
              Volume {numPadded} of 50
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/20 text-[#E8C96A]">
              {volume.category}
            </span>
            {volume.lastUpdated && (
              <span className="inline-flex items-center gap-1 text-xs text-white/80 bg-black/30 px-2.5 py-0.5 rounded-full">
                <Calendar className="w-3 h-3" />
                Updated {volume.lastUpdated}
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {volume.title}
          </h1>

          {/* Subtitle */}
          {volume.subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl leading-relaxed font-sans mb-8 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {volume.subtitle}
            </p>
          )}

          {/* Action CTAs - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartReading || (() => {
                const el = document.getElementById('volume-content');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1a0812] font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
            >
              <ArrowDown className="w-4 h-4" />
              Start Reading Manuscript
            </button>

            {volume.articleLink && (
              <a
                href={volume.articleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/40 text-white font-medium text-sm transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4 text-[#E8C96A]" />
                Read Full Blog Article
              </a>
            )}

            {volume.youtubeLink ? (
              <a
                href={volume.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-600 border border-red-400/40 text-white font-medium text-sm transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Video Masterclass
              </a>
            ) : (
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-600 border border-red-400/40 text-white font-medium text-sm transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                YouTube Scriptorium Channel
              </a>
            )}
          </div>

          {/* Artwork Credit Notice */}
          <div className="mt-8 pt-4 border-t border-white/20 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-2">
            <span>Artwork: {heroCredit}</span>
            <span className="text-[#E8C96A] font-medium">Peer-Reviewed Scriptorium Record</span>
          </div>
        </div>
      </header>
    );
  }

  // Home Hero Variant
  return (
    <header id="home-hero" className="relative w-full overflow-hidden min-h-[100svh] md:min-h-[90svh] lg:min-h-[100svh] flex flex-col justify-end items-center bg-[#16060f] text-white">
      {/* Background Image: Leonardo da Vinci's The Last Supper with high visibility */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero/last-supper-portrait.webp" />
          <source media="(max-width: 1280px)" srcSet="/images/hero/last-supper-1280.webp" />
          <img
            src="/images/hero/last-supper-1920.webp"
            alt="The Last Supper by Leonardo da Vinci"
            className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.03]"
          />
        </picture>
        {/* Soft Vignette Overlay allowing artwork to be richly seen */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Hero Content with local text scrim - Center Aligned */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-[max(3.5rem,env(safe-area-inset-bottom))] flex flex-col items-center justify-end text-center hero-content rounded-3xl mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-[#4A152C]/90 text-[#E8C96A] border border-[#D4AF37]/50 shadow-2xl mb-6 backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          Saul's Podship Scriptorium
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          The 50-Volume <br className="hidden sm:inline" />
          Theological Encyclopedia
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#F8F4E3] max-w-3xl leading-relaxed font-sans mb-8 font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
          A rigorous, peer-reviewed digital scriptorium for Christian exegesis, historic theology, indigenous Punjabi Zaboor hymnody, and academic scripture analysis.
        </p>

        {/* Primary Action Buttons - Center Aligned */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Link
            to="/encyclopedia"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1a0812] font-extrabold text-sm tracking-wide shadow-2xl hover:shadow-[#D4AF37]/30 transition-all transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            Explore 50 Volumes
          </Link>

          <Link
            to="/podcast"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/40 text-white font-semibold text-sm transition-all shadow-lg"
          >
            <Mic className="w-4 h-4 text-[#E8C96A]" />
            Listen to Podcast
          </Link>

          <Link
            to="/music"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#4A152C]/90 hover:bg-[#4A152C] border border-[#D4AF37]/40 text-white font-semibold text-sm transition-all shadow-lg"
          >
            <Music className="w-4 h-4 text-[#E8C96A]" />
            Sacred Music &amp; Zaboor
          </Link>

          <a
            href={SITE.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-600 border border-red-400/40 text-white font-semibold text-sm transition-all shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            YouTube Channel
          </a>
        </div>

        {/* Hero Artwork Credit - Centered */}
        <div className="pt-4 border-t border-white/20 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-2">
          <span>Leonardo da Vinci, <em>The Last Supper</em> (c. 1495–98), Santa Maria delle Grazie, Milan — public domain.</span>
          <span className="text-[#E8C96A] font-medium">Free &amp; Open Theological Research</span>
        </div>
      </div>
    </header>
  );
};

export default Hero;
