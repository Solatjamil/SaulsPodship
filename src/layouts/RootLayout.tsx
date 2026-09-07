/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Outlet, Link, useLocation, ScrollRestoration } from 'react-router-dom';
import { 
  BookOpen, Mic, Music, Compass, Info, ShieldCheck, Heart, 
  Menu, X, Search, ChevronRight, ExternalLink, Globe, Award,
  Sparkles, Mail, MessageSquare, Play, Video
} from 'lucide-react';
import ScholarAssistant from '../../components/ScholarAssistant';
import { SITE } from '../config/site';

export const RootLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; isExternal?: boolean; isStatic?: boolean }[] = [
    { name: 'Encyclopedia', href: '/encyclopedia', icon: BookOpen },
    { name: 'Podcast', href: '/podcast', icon: Mic },
    { name: 'Videos', href: '/videos/', icon: Video, isStatic: true },
    { name: 'Sacred Music', href: '/music', icon: Music },
    { name: 'Scriptorium Studio', href: '/studio', icon: Sparkles },
    { name: 'Standards', href: '/scholarly-standards', icon: ShieldCheck },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Support', href: SITE.patreon, icon: Heart, isExternal: true },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1D2D50] font-sans antialiased selection:bg-[#4A152C] selection:text-[#E8C96A]">
      <ScrollRestoration />

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#16060f]/70 backdrop-blur-md border-b border-[#D4AF37]/20 text-white transition-all shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 md:h-20 flex items-center justify-between">
          {/* Brand Logo with Correct SVG */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#D4AF37]/30 p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="Saul's Podship Logo" className="w-8 h-8 object-contain drop-shadow" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#E8C96A] transition-colors">
                Saul's Podship
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#D4AF37]/90">
                Theological Encyclopedia
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              if (item.isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide text-white/80 hover:text-[#E8C96A] hover:bg-white/10 transition-all group"
                    title="Partner on Patreon"
                  >
                    <Icon className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                  </a>
                );
              }
              if (item.isStatic) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide text-white/80 hover:text-white hover:bg-white/10 transition-all"
                    title="Bible video series"
                  >
                    <Icon className="w-3.5 h-3.5 opacity-80" />
                    {item.name}
                  </a>
                );
              }
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#4A152C] text-[#E8C96A] border border-[#D4AF37]/40 shadow-inner'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs tracking-wide shadow transition-all"
              title="Official YouTube Channel"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>YouTube</span>
            </a>

            <Link
              to="/encyclopedia"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E8C96A] text-[#1A0812] font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Browse 50 Volumes</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1A0812] border-b border-[#D4AF37]/20 px-4 pt-3 pb-6 space-y-2 text-left">
            {navLinks.map((item) => {
              const Icon = item.icon;
              if (item.isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-rose-400" />
                      <span>{item.name} (Patreon)</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </a>
                );
              }
              if (item.isStatic) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#D4AF37]" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </a>
                );
              }
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-[#4A152C] text-[#E8C96A] border border-[#D4AF37]/30'
                      : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#D4AF37]" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Routed Content */}
      <main className="flex-1 w-full text-center">
        <Outlet />
      </main>

      {/* Interactive AI Scholar Floating Assistant */}
      <ScholarAssistant />

      {/* Global Scriptorium Footer - Center Aligned */}
      <footer className="w-full bg-[#1A0812] text-white border-t-2 border-[#D4AF37]/30 pt-16 pb-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center">
            {/* Column 1: Ministry Info */}
            <div className="space-y-4 flex flex-col items-center text-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#D4AF37]/30 p-1 flex items-center justify-center">
                  <img src="/logo.svg" alt="Saul's Podship Logo" className="w-7 h-7 object-contain" />
                </div>
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  Saul's Podship
                </span>
              </Link>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-sm mx-auto">
                A digital scriptorium and Christian theological encyclopedia dedicated to rigorous exegesis, historical contextualization, classical biblical hermeneutics, and indigenous South Asian Christian hymnody.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-[#E8C96A]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  50 Peer-Reviewed Volumes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <Award className="w-3.5 h-3.5" />
                  Free &amp; Open Access
                </span>
              </div>
            </div>

            {/* Column 2: Encyclopedia Volumes */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
                Encyclopedia
              </h3>
              <ul className="space-y-2.5 text-xs text-white/70 text-center">
                <li><Link to="/encyclopedia" className="hover:text-[#E8C96A] transition-colors">All 50 Volumes Index</Link></li>
                <li><Link to="/encyclopedia/all-bible-stories" className="hover:text-[#E8C96A] transition-colors">Vol 01: All Bible Stories</Link></li>
                <li><Link to="/encyclopedia/names-of-god" className="hover:text-[#E8C96A] transition-colors">Vol 30: Names of God</Link></li>
                <li><Link to="/encyclopedia/messianic-prophecies" className="hover:text-[#E8C96A] transition-colors">Vol 29: Messianic Prophecies</Link></li>
                <li><Link to="/encyclopedia/guide-to-christian-living" className="hover:text-[#E8C96A] transition-colors">Vol 22: Christian Living</Link></li>
                <li><Link to="/encyclopedia/early-church-fathers-councils" className="hover:text-[#E8C96A] transition-colors">Vol 18: Church Fathers &amp; Councils</Link></li>
              </ul>
            </div>

            {/* Column 3: Sacred Music & Media */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
                Music &amp; Media
              </h3>
              <ul className="space-y-2.5 text-xs text-white/70 text-center">
                <li><Link to="/music" className="hover:text-[#E8C96A] transition-colors">Sacred Music Hub</Link></li>
                <li><Link to="/music/punjabi-zaboor" className="hover:text-[#E8C96A] transition-colors">Punjabi Zaboor (150 Psalms)</Link></li>
                <li><Link to="/music/pakistani-singers-archive" className="hover:text-[#E8C96A] transition-colors">Pakistani Singers Archive</Link></li>
                <li><Link to="/podcast" className="hover:text-[#E8C96A] transition-colors">Theological Podcast</Link></li>
                <li><a href="/videos/" className="hover:text-[#E8C96A] transition-colors">Bible Video Library</a></li>
                <li><Link to="/studio" className="hover:text-[#E8C96A] transition-colors">Scriptorium AI Studio</Link></li>
                <li>
                  <a
                    href={SITE.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold justify-center"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Official YouTube</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Scriptorium & Legal */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif font-bold text-white text-sm uppercase tracking-wider mb-4 border-b border-[#D4AF37]/30 pb-2 inline-block">
                Ministry &amp; Legal
              </h3>
              <ul className="space-y-2.5 text-xs text-white/70 text-center">
                <li><Link to="/about" className="hover:text-[#E8C96A] transition-colors">About the Ministry</Link></li>
                <li><Link to="/scholarly-standards" className="hover:text-[#E8C96A] transition-colors">Scholarly Standards</Link></li>
                <li>
                  <a
                    href={SITE.patreon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E8C96A] transition-colors inline-flex items-center gap-1.5 font-semibold text-rose-300 hover:text-rose-200 justify-center"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                    <span>Support on Patreon</span>
                  </a>
                </li>
                <li><Link to="/support" className="hover:text-[#E8C96A] transition-colors">Partnership &amp; Mission</Link></li>
                <li><Link to="/faq" className="hover:text-[#E8C96A] transition-colors">Frequently Asked Questions</Link></li>
                <li><Link to="/contact" className="hover:text-[#E8C96A] transition-colors">Contact &amp; Submissions</Link></li>
                <li><Link to="/privacy" className="hover:text-[#E8C96A] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#E8C96A] transition-colors">Terms of Service</Link></li>
                <li><Link to="/disclaimer" className="hover:text-[#E8C96A] transition-colors">Theological Disclaimer</Link></li>
                <li><Link to="/sitemap" className="hover:text-[#E8C96A] transition-colors">HTML Sitemap</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Center Aligned */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center text-xs text-white/60 gap-3">
            <p>
              &copy; {new Date().getFullYear()} Saul's Podship. All rights reserved. Scriptorium theological content is freely published for global Christian education and research.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
              <Link to="/privacy" className="hover:text-[#E8C96A]">Privacy Policy</Link>
              <span>&bull;</span>
              <Link to="/terms" className="hover:text-[#E8C96A]">Terms of Service</Link>
              <span>&bull;</span>
              <Link to="/disclaimer" className="hover:text-[#E8C96A]">Theological Disclaimer</Link>
              <span>&bull;</span>
              <Link to="/sitemap" className="hover:text-[#E8C96A]">HTML Sitemap</Link>
              <span>&bull;</span>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                Official YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
