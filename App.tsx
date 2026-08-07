
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, BookOpen, Mic, Music, Mail, ExternalLink, 
  Play, Youtube, Sparkles, Calendar, Award, HandHeart, Globe, 
  ArrowRight, Library, Layers, Send, ChevronLeft, ChevronRight,
  Settings, Sliders, Info, Type, Sun, Moon, Coffee, Minus, Plus,
  Facebook, Heart, DollarSign, MessageSquare,
  Clock, Share2, Volume2, Users, Map, Search, Bookmark, BookmarkCheck
} from 'lucide-react';
import { CATEGORIES } from "./api/data";
import { TheologyCategory } from './types';
import { VOLUME_SCHOLARLY_INFO } from './scholarlyData';
import { DynamicSchema } from './components/DynamicSchema';
import ElectricBorder from './components/ElectricBorder';
import FaqSection from './components/FaqSection';
import { GospelComposer } from './components/GospelComposer';

const ComingSoonOverlay: React.FC<{ text?: string }> = ({ text = "Content Coming Soon" }) => (
  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center rounded-[2rem] z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white bg-[#4a152c] px-4 py-2 rounded-full shadow-2xl border border-[#D4AF37]/30">
      {text}
    </span>
  </div>
);

const Section: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={`py-24 px-6 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const AdUnit: React.FC<{ slot?: string; className?: string; visible?: boolean }> = ({ slot, className = "", visible = true }) => {
  useEffect(() => {
    // Only attempt to push ads if visibility is true and there is no placeholder content
    if (visible) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }
  }, [visible]);

  // Critical for compliance: Do not render empty ad blocks or ads on low-value pages
  if (!visible) return null;

  return (
    <div className={`my-8 flex justify-center overflow-hidden min-h-[100px] w-full bg-black/5 rounded-2xl p-4 border border-black/5 ${className}`}>
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-4067724379997931"
           data-ad-slot={slot || "auto"}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

const getStableSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 100000;
};

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  className = '',
  referrerPolicy
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '120px', // start loading 120px before entering viewport
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [src]); // Reset intersection if src changes

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Loading Placeholder State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#0e0a12]/85 animate-pulse flex flex-col items-center justify-center gap-2 z-10">
          <div className="w-8 h-8 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
          <span className="text-[7px] font-bold uppercase tracking-widest text-[#D4AF37]/40 select-none">
            Illuminating...
          </span>
        </div>
      )}

      {/* Actual Image, prioritized by observer */}
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          referrerPolicy={referrerPolicy}
        />
      )}
    </div>
  );
};

interface AiStudioModalProps {
  item: {
    id: string;
    type: 'story' | 'map' | 'volume';
    title: string;
    basePrompt: string;
    originalUrl?: string;
  } | null;
  onClose: () => void;
  onSave: (newUrl: string) => void;
  onReset: () => void;
}

const AiStudioModal: React.FC<AiStudioModalProps> = ({ item, onClose, onSave, onReset }) => {
  if (!item) return null;

  const [selectedStyle, setSelectedStyle] = useState('Classical Fine Oil Painting');
  const [modifier, setModifier] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [useGemini, setUseGemini] = useState(true);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [, setSeed] = useState(() => Math.floor(Math.random() * 100000));
  const [errorStr, setErrorStr] = useState('');

  const stylePresets = [
    { name: 'Classical Fine Oil Painting', icon: '🎨', desc: 'Saturated canvases, Caravaggio chiaroscuro high contrast' },
    { name: 'Medieval Codex Manuscript', icon: '📜', desc: 'Hand-inked monastic scripts, gold-leaf, weathered parchment' },
    { name: 'Byzantine Golden Icon', icon: '✨', desc: 'Symbolic holy figures, flat rich golds, radiant halos' },
    { name: 'Prismatic Stained Glass Mosaic', icon: '⛪', desc: 'Intricate glass dividers, glowing prismatic holy light' },
    { name: 'Dramatic Renaissance Fresco', icon: '🏛️', desc: 'Sistine Chapel-like pigments, magnificent spatial framing' },
    { name: 'Sacred Archaeological Sketch', icon: '✏️', desc: 'Ancient ink drawing, rustic technical charcoal line art' },
  ];

  useEffect(() => {
    let savedImages: Record<string, string> = {};
    if (item.type !== 'volume') {
      try {
        const storageKey = item.type === 'story' ? 'theophilus-custom-story-images' : 'theophilus-custom-map-images';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          savedImages = JSON.parse(saved);
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    if (item.type === 'volume') {
      setCurrentUrl(item.originalUrl || '');
    } else if (savedImages[item.id]) {
      setCurrentUrl(savedImages[item.id]);
    } else {
      setCurrentUrl(item.originalUrl || '');
    }
    setModifier('');
    setEnhancedPrompt('');
    setSeed(Math.floor(Math.random() * 100000));
    setErrorStr('');
  }, [item]);

  const triggerGeneration = async () => {
    setIsGenerating(true);
    setErrorStr('');
    try {
      let finalPromptText = item.basePrompt;
      
      if (useGemini) {
        setIsEnhancing(true);
        const res = await fetch('/api/enhance-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            originalPrompt: item.basePrompt,
            style: selectedStyle,
            modifier: modifier
          })
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to enhance prompt with Gemini.');
        }

        const data = await res.json();
        finalPromptText = data.enhancedPrompt || item.basePrompt;
        setEnhancedPrompt(finalPromptText);
        setIsEnhancing(false);
      } else {
        finalPromptText = `${item.basePrompt}, in ${selectedStyle} style${modifier ? `, ${modifier}` : ''}`;
      }

      const nextSeed = Math.floor(Math.random() * 100000);
      setSeed(nextSeed);
      
      const width = item.type === 'map' ? 1024 : (item.type === 'volume' ? 800 : 600);
      const height = item.type === 'map' ? 640 : (item.type === 'volume' ? 450 : 600);
      const builtUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPromptText)}?width=${width}&height=${height}&nologo=true&seed=${nextSeed}`;
      
      await new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.src = builtUrl;
        tempImg.referrerPolicy = "no-referrer";
        tempImg.onload = () => resolve(true);
        tempImg.onerror = () => resolve(false);
      });

      setCurrentUrl(builtUrl);
    } catch (err: any) {
      console.error(err);
      setErrorStr(err.message || 'Image Generation timed out.');
      setIsEnhancing(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#0f141d] border-2 border-[#D4AF37] w-full max-w-5xl rounded-[2.5rem] shadow-[0_0_80px_rgba(212,175,55,0.25)] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[85vh]">
        
        {/* Left Side: Visual Preview Frame */}
        <div className="relative flex-1 bg-black/80 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20 p-6">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] bg-[#4a152c] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/20 shadow-lg">
              {item.type.toUpperCase()} PREVIEW PLATE
            </span>
          </div>

          <div className="w-full h-72 lg:h-full max-h-[50vh] lg:max-h-none rounded-2xl overflow-hidden relative border border-[#D4AF37]/10 bg-black flex items-center justify-center group shadow-2xl">
            {isGenerating ? (
              <div className="absolute inset-0 bg-[#0f141d]/90 flex flex-col items-center justify-center text-center p-6 z-20">
                <div className="w-16 h-16 border-4 border-t-[#D4AF37] border-r-transparent border-b-[#D4AF37] border-l-transparent rounded-full animate-spin mb-4" />
                <span className="text-xs font-black uppercase text-[#D4AF37] tracking-widest animate-pulse">
                  {isEnhancing ? "Consulting Gemini AI..." : "Forging Canvas Pigments..."}
                </span>
                <p className="text-[10px] text-white/50 italic max-w-xs mt-2 uppercase tracking-wide">
                  {isEnhancing ? "Perfecting historical theological elements..." : "Applying ancient artistic textures. Please wait..."}
                </p>
              </div>
            ) : null}

            {currentUrl ? (
              <img 
                src={currentUrl} 
                className={`w-full h-full ${item.type === 'map' ? 'object-contain' : 'object-cover'} transition-all duration-300`} 
                alt="AI Preview"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center text-center text-white/40 p-4">
                <span className="text-xs uppercase font-bold tracking-widest mb-1">Plate Ink Depleted</span>
                <span className="text-[10px] text-white/30 uppercase">Click Forge below to make an image with AI</span>
              </div>
            )}
          </div>

          {errorStr && (
            <div className="mt-4 p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-[10px] text-red-200 uppercase tracking-wider text-center w-full">
              ⚠️ {errorStr}
            </div>
          )}

          {enhancedPrompt && (
            <div className="mt-4 p-4 rounded-2xl bg-white/5 w-full border border-white/10">
              <label className="text-[9px] font-black uppercase text-[#D4AF37] tracking-widest flex items-center gap-1 mb-2">
                ✨ Gemini Director Prompt:
              </label>
              <p className="text-[11px] text-white/70 italic leading-relaxed font-mono">
                "{enhancedPrompt}"
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Creative Panel Controls */}
        <div className="w-full lg:w-[420px] p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#131b26] border-t lg:border-t-0 border-[#D4AF37]/10">
          <div className="space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-xs font-black uppercase text-[#D4AF37]/60 tracking-[0.25em]">Manuscript AI Studio</h4>
                <h3 className="text-xl font-serif-heading font-black text-white leading-tight uppercase mt-1">{item.title}</h3>
              </div>
              <button 
                onClick={onClose} 
                className="text-white/40 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent opacity-35" />

            {/* Presets */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-1">
                🎨 Manuscript Visual Style
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {stylePresets.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`p-3 rounded-xl border flex flex-col text-left transition-all ${selectedStyle === style.name ? 'bg-[#4a152c] border-[#D4AF37] text-white shadow-lg' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'}`}
                  >
                    <span className="text-base select-none mb-1">{style.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider leading-relaxed">{style.name.split(' ').slice(0, 1).join(' ')}</span>
                    <span className="text-[8px] text-white/40 font-sans mt-0.5 truncate w-full">{style.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Modifier */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center justify-between">
                <span>➕ Custom Embellishments</span>
                <span className="text-[8px] opacity-60">Optional</span>
              </label>
              <input
                type="text"
                placeholder="e.g. dramatic lighting, radiant golden halos, volumetric fog"
                value={modifier}
                onChange={(e) => setModifier(e.target.value)}
                className="w-full bg-black/40 border border-[#D4AF37]/25 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Toggle Gemini Director */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                  ✨ Gemini Art-Director
                </span>
                <p className="text-[9px] text-white/55 leading-relaxed font-sans">
                  Use advanced model to enrich prompts with historical details.
                </p>
              </div>
              <button 
                onClick={() => setUseGemini(!useGemini)}
                className={`w-12 h-7 rounded-full p-1 flex-shrink-0 transition-colors ${useGemini ? 'bg-[#4a152c] border border-[#D4AF37]/50' : 'bg-white/10 border border-white/10'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-[#D4AF37] transition-transform ${useGemini ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              onClick={triggerGeneration}
              disabled={isGenerating}
              className="w-full py-4 bg-[#D4AF37] text-[#4a152c] rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-white disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
            >
              {isGenerating ? "Forging canvas..." : "Forge Sovereign Image ✨"}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onSave(currentUrl)}
                disabled={isGenerating || !currentUrl}
                className="py-3 bg-emerald-700/80 hover:bg-emerald-600/90 hover:text-white border border-emerald-500/30 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              >
                Apply Image ✔
              </button>
              <button
                onClick={onReset}
                disabled={isGenerating}
                className="py-3 bg-white/5 border border-white/10 text-white/55 hover:bg-white/10 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              >
                Reset Default 🗑
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'privacy' | 'disclaimer' | 'terms' | 'encyclopedia'>('landing');
  const [selectedCategory, setSelectedCategory] = useState<TheologyCategory | null>(null);
  const [isPrefsOpen, setIsPrefsOpen] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  
  // Volume Images Database State & Loading Hook
  const [volumeImages, setVolumeImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadVolumeImages = async () => {
      try {
        const response = await fetch("/api/volume-images");
        if (response.ok) {
          const data = await response.json();
          setVolumeImages(data);
        }
      } catch (error) {
        console.error("Failed to load volume images database:", error);
      }
    };
    loadVolumeImages();
  }, []);

  // Search & Bookmark Tab States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<'all' | 'saved' | 'scholarly' | 'devotional'>('all');
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("theophilus-bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeLightboxMap, setActiveLightboxMap] = useState<{ title: string; url: string; description: string; source?: string } | null>(null);
  const [mapErrors, setMapErrors] = useState<Record<string, boolean>>({});

  const [customStoryImages, setCustomStoryImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("theophilus-custom-story-images");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customMapImages, setCustomMapImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("theophilus-custom-map-images");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [aiStudioItem, setAiStudioItem] = useState<{
    id: string;
    type: "story" | "map" | "volume";
    title: string;
    basePrompt: string;
    originalUrl?: string;
  } | null>(null);

  const getVolumeImage = (title: string, id: string, overrideImages?: Record<string, string>): string => {
    const activeImages = overrideImages !== undefined ? overrideImages : volumeImages;
    if (activeImages && activeImages[id]) {
      return activeImages[id];
    }

    // Curated high-quality, reliable, stunning classical art and theological Unsplash images for all 46 volumes
    const unsplashMapping: Record<string, string> = {
      "01": "1504052434569-70ad5836ab65", // Holy Bible
      "02": "1457369804613-52c61a468e7d", // Aged writing/numerology
      "03": "1478147427282-58a87a120781", // Gothic cathedral
      "04": "1605721911519-3dfeb3be25e7", // Classical angel statue
      "05": "1507842217343-583bb7270b66", // Ancient library
      "06": "1519817650390-64a93db51149", // Stained glass Apostle's Creed
      "07": "1543002588-bfa74002ed7e", // Golden books/relics
      "08": "1544005313-94ddf0286df2", // Water/baptism
      "09": "1516979187457-637abb4f9353", // Scribe/scrolls
      "10": "1462331940025-496dfbfc7564", // Genesis cosmos
      "11": "1524661135-423995f22d0b", // Old map
      "12": "1518005020951-eccb494ad742", // Gothic church cross
      "13": "1561361058-c24cecae35ca", // South Asia classic
      "14": "1544816155-12df9643f363", // Christmas nativity
      "15": "1506880018603-83d5b814b5a6", // Comparative Religion scholarly books
      "16": "1501504905252-473c47e087f8", // Systematic mapping
      "17": "1599707367072-cd6ada2bc375", // Crusades knights
      "18": "1513151233558-d860c5398176", // Early Church fathers
      "19": "1490730141103-6cac27aaab94", // Easter sunrise
      "20": "1501854140801-50d01698950b", // Olive tree
      "21": "1519074002996-a69e7ac46a42", // Forbidden knowledge forest
      "22": "1464822759023-fed622ff2c3b", // Peaceful path
      "23": "1464802686167-b939a6910659", // Celestial starry heaven
      "24": "1544716278-ca5e3f4abd8c", // Disciples manuscripts
      "25": "1515621061946-eff1c2a352bd", // Bread & wine communion
      "26": "1451187580459-43490279c0fa", // Population globe
      "27": "1558591710-4b4a1ae0f04d", // Divine statue
      "28": "1515003197210-e0cd71810b5f", // Prayer
      "29": "1475924156734-496f6cac6ec1", // Messianic sunset
      "30": "1492691527719-9d1e07e534b4", // Sunbeams God
      "31": "1507608869274-d3177c8bb4c7", // Jesus cross
      "32": "1532012197267-da84d127e765", // Open book canon
      "33": "1455390582262-044cdead277a", // Scribe hand sayings
      "34": "1546410531-bb4caa6b424d", // Languages Hebrew/Greek
      "35": "1541432901042-2d8bd64b4a9b", // Ancient civilization stone
      "36": "1511671782779-c97d3d27a1d4", // Harp string Psalms
      "37": "1461360370896-922624d12aa1", // Apocalypse lightning
      "38": "1501854140801-50d01698950b", // Mountain Sermon
      "39": "1498243691581-b145c3f54a5a", // Parchment scroll
      "40": "1529156069898-49953e39b3ac", // Systematic theology library
      "41": "1447069387593-a5de0862481e", // Stone tablets law
      "42": "1512343879784-a960bf40e7f2", // Magi night star
      "43": "1518609878373-06d740f60d8b", // True Worship candle & hands
      "44": "1552832230-c0197dd311b5", // Vatican architecture history
      "45": "1516450360452-9312f5e86fc7", // Gothic church starry
      "46": "1517048676732-d65bc937f952", // Gen Z study
    };

    if (unsplashMapping[id]) {
      return `https://images.unsplash.com/photo-${unsplashMapping[id]}?q=80&w=800&auto=format&fit=crop`;
    }

    let safeTopic = title;
    
    if (title.toLowerCase().includes("demon") || title.toLowerCase().includes("beast") || title.toLowerCase().includes("monster")) {
      safeTopic = "heavenly angels and celestial beings in divine light";
    } else if (title.toLowerCase().includes("crusade")) {
      safeTopic = "medieval fortress and ancient knights, classical illustration";
    } else if (title.toLowerCase().includes("forbidden") || title.toLowerCase().includes("watcher")) {
      safeTopic = "ancient sacred scripture parchment scroll with celestial symbols";
    } else if (title.toLowerCase().includes("hell")) {
      safeTopic = "eternal separation and judgment day under dramatic clouds";
    } else if (title.toLowerCase().includes("baptism") || title.toLowerCase().includes("sacrament")) {
      safeTopic = "sacred baptism ceremony with pure glowing water, classical art";
    } else if (title.toLowerCase().includes("vatican")) {
      safeTopic = "majestic St Peters Basilica cathedral, grand fine oil painting";
    } else if (title.toLowerCase().includes("creation vs")) {
      safeTopic = "the genesis of the universe, spectacular stars and cosmos forming";
    } else if (title.toLowerCase().includes("numerology")) {
      safeTopic = "ancient Hebrew alphabet and golden numbers on aged leather scroll";
    } else if (title.toLowerCase().includes("apologetics")) {
      safeTopic = "philosophers in ancient scholarly library surrounded by scrolls";
    } else if (title.toLowerCase().includes("ark of covenant")) {
      safeTopic = "the golden Ark of the Covenant glowing inside the sanctuary";
    } else if (title.toLowerCase().includes("family tree")) {
      safeTopic = "vibrant ancient olive tree in desert landscape under starry night sky";
    }
    
    // Clean special characters for pollinations compatibility
    safeTopic = safeTopic
      .replace(/&/g, "and")
      .replace(/→/g, "to")
      .replace(/—/g, "-")
      .replace(/\+/g, "and")
      .replace(/,/g, "")
      .replace(/:/g, "")
      .trim();

    const promptText = `a theological grand art epic painting illustrating ${safeTopic}, classical fine oil style, historical details, high contrast cinematic gold and dark slate lighting`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=800&height=450&nologo=true&seed=${id}`;
  };

  const getStoryPanelImage = (panel: { id: string; title: string; imagePrompt: string; era?: string }, idx: number, categoryId: string = "default"): string => {
    const uniqueKey = `${categoryId}-${panel.id}`;
    if (customStoryImages && customStoryImages[uniqueKey]) {
      return customStoryImages[uniqueKey];
    }
    if (customStoryImages && customStoryImages[panel.id]) {
      return customStoryImages[panel.id];
    }

    // Direct mappings for high-quality, verified historical/classical online artwork when available
    const onlineClassicalArt: Record<string, string> = {
      "1": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop", // Creation of Cosmos
      "14": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop", // Jacob's Ladder
      "39": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop", // Birth of Jesus
    };

    let resolvedUrl = "";
    // If an online image is mapped, use it. Otherwise, generate spectacular biblical fantasy art with AI
    if (onlineClassicalArt[panel.id] && categoryId === "02") {
      resolvedUrl = onlineClassicalArt[panel.id];
    } else {
      // Construct an incredibly detailed, high-fantasy prompt for Pollinations AI
      const basePrompt = panel.imagePrompt || panel.title;
      const optimizedPrompt = `Breathtaking epic biblical fantasy art painting of ${panel.title}. ${basePrompt}. Grand theological oil painting, dramatic chiaroscuro lighting, celestial radiant gold and deep crimson accents, highly detailed characters, volumetric cinematic lighting, masterpiece of sacred lore, high-contrast, epic fantasy concept art.`;

      // Generate stunning art using Pollinations with a stable seed to prevent flashing
      const stableSeed = getStableSeed(uniqueKey);
      resolvedUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(optimizedPrompt)}?width=600&height=600&nologo=true&seed=${stableSeed}`;
    }

    return resolvedUrl;
  };

  const handleCustomCoverPrompt = (volId: string, volTitle: string) => {
    setAiStudioItem({
      id: volId,
      type: "volume",
      title: volTitle,
      basePrompt: `a theological grand art epic painting illustrating ${volTitle}, classical fine oil style, historical details, high contrast cinematic gold and dark slate lighting`,
      originalUrl: getVolumeImage(volTitle, volId)
    });
  };

  // Defer ad rendering to ensure page layout stabilizes and prevent 'content jumping'
  useEffect(() => {
    setIsContentLoaded(false);
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 600); // 600ms matches transition animations and allows all content elements to fully mount
    return () => clearTimeout(timer);
  }, [selectedCategory, currentView]);

  // Helper to slugify category/volume title for SEO URL syncing
  const getSEOUrlSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Synchronize internal React view state with the browser's URL address bar
  useEffect(() => {
    const targetPath = currentView === 'encyclopedia' && selectedCategory
      ? `/encyclopedia/${getSEOUrlSlug(selectedCategory.title)}`
      : currentView === 'privacy'
        ? '/privacy'
        : currentView === 'terms'
          ? '/terms'
          : currentView === 'disclaimer'
            ? '/disclaimer'
            : '/';

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, [currentView, selectedCategory]);

  // Listen to popstate to handle browser's forward/back navigation buttons natively
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/encyclopedia/')) {
        const slug = path.replace('/encyclopedia/', '');
        const found = CATEGORIES.find(c => getSEOUrlSlug(c.title) === slug);
        if (found) {
          setSelectedCategory(found);
          setCurrentView('encyclopedia');
        } else {
          setSelectedCategory(null);
          setCurrentView('landing');
        }
      } else if (path === '/privacy') {
        setCurrentView('privacy');
        setSelectedCategory(null);
      } else if (path === '/terms') {
        setCurrentView('terms');
        setSelectedCategory(null);
      } else if (path === '/disclaimer') {
        setCurrentView('disclaimer');
        setSelectedCategory(null);
      } else {
        setCurrentView('landing');
        setSelectedCategory(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Trigger on initial mounting to handle direct landing page URLs correctly
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [readingProgress, setReadingProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("theophilus-reading-progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!selectedCategory) return;
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 150) return;
      const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      
      setReadingProgress((prev) => {
        const currentVal = prev[selectedCategory.id] || 0;
        if (progress > currentVal) {
          const updated = { ...prev, [selectedCategory.id]: progress };
          localStorage.setItem("theophilus-reading-progress", JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    const initTimer = setTimeout(handleScroll, 150);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initTimer);
    };
  }, [selectedCategory]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarks((prev) => {
      const updated = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      localStorage.setItem("theophilus-bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowCookieConsent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookieConsent(false);
  };
  
  // Preferences State
  const [brightnessMode, setBrightnessMode] = useState<'light' | 'sepia' | 'dark'>('dark');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [useSerif, setUseSerif] = useState(true);

  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(74, 21, 44, 0)', 'rgba(74, 21, 44, 0.95)']);

  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const scrollToSection = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', action: () => scrollToSection('home') },
    { name: 'About', action: () => scrollToSection('about') },
    { name: 'Bible Resources', action: () => scrollToSection('resources') },
    { name: 'Podcast', action: () => scrollToSection('podcast') },
    { name: 'Worship', action: () => scrollToSection('worship') },
    { name: 'Blog', action: () => window.open('https://goshsays.blogspot.com/search/label/Biblical', '_blank') },
    { name: 'Support', action: () => scrollToSection('support') },
    { name: 'Contact', action: () => scrollToSection('contact') },
  ];

  const handleBibleLink = () => {
    setCurrentView('encyclopedia');
    setSelectedCategory(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedCategory]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:saulspodship@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`;
    window.location.href = mailtoUrl;
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  // Dynamic Theme Styling
  const themeStyles = {
    light: { bg: '#F8F4E3', text: '#1D2D50', card: 'rgba(0,0,0,0.05)', border: 'rgba(0,0,0,0.1)' },
    sepia: { bg: '#E0C9A6', text: '#5D4037', card: 'rgba(0,0,0,0.07)', border: 'rgba(93, 64, 55, 0.2)' },
    dark: { bg: '#0a0f1c', text: '#ffffff', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' }
  }[brightnessMode];

  const renderLanding = () => (
    <>
      <style>{`
        @keyframes astrolabe-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        @keyframes soft-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.55; }
        }
        @keyframes soundwave {
          0%, 100% { height: 4px; }
          50% { height: 24px; }
        }
        .animate-astrolabe {
          animation: astrolabe-rotation 180s linear infinite;
        }
        .animate-float {
          animation: subtle-float 6s ease-in-out infinite;
        }
        .animate-pulse-layer {
          animation: soft-pulse 4s ease-in-out infinite;
        }
        .sound-bar {
          animation: soundwave 1.2s ease-in-out infinite;
        }
        .parchment-border {
          box-shadow: 0 0 0 1px rgba(214, 175, 55, 0.2), inset 0 0 40px rgba(74, 21, 44, 0.08);
        }
      `}</style>

      {/* Hero Home Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D0B1A] via-[#4A152C] to-[#12040B] select-none text-white p-6">
        {/* Intricate Celestial Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Aged paper pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-15 mix-blend-overlay" />
          
          {/* Ambient cosmic glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[160px] animate-pulse-layer" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#4a152c]/50 rounded-full blur-[180px] animate-pulse-layer" style={{ animationDelay: "2s" }} />

          {/* Majestic Rotating Astrolabe / Celestial Compass */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vh] h-[85vh] max-w-[800px] max-h-[800px] opacity-[0.14] animate-astrolabe">
            <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#D4AF37]">
              {/* Outer circle with ticks */}
              <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 3" />
              <circle cx="250" cy="250" r="232" stroke="currentColor" strokeWidth="1" />
              
              {/* Astrological & navigation indicators */}
              <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="0.8" />
              <path d="M250 10v480M10 250h480" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
              
              {/* Elegant central star */}
              <path d="M250 160l25 65 65 25-65 25-25 65-25-65-65-25 65-25z" fill="none" stroke="currentColor" strokeWidth="1" />
              
              {/* Concentric rings represent scriptural cycles */}
              <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
              <circle cx="250" cy="250" r="70" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="250" cy="250" r="30" stroke="currentColor" strokeWidth="1.5" />
              
              {/* Ancient celestial quadrants */}
              <path d="M120 120l260 260M380 120L120 380" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Framing Borders (Medieval Codex style) */}
        <div className="absolute inset-8 border border-[#D4AF37]/20 pointer-events-none z-10 rounded-[2.5rem]" />
        <div className="absolute inset-10 border-2 border-[#D4AF37]/5 pointer-events-none z-10 rounded-[2.2rem]" />
        
        {/* Flourished Corner Elements */}
        <div className="absolute top-12 left-12 w-6 h-6 border-t font-serif border-l border-[#D4AF37]/50 pointer-events-none z-20" />
        <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-[#D4AF37]/50 pointer-events-none z-20" />
        <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-[#D4AF37]/50 pointer-events-none z-20" />
        <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-[#D4AF37]/50 pointer-events-none z-20" />

        <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Project Pill */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#12040B]/60 border border-[#D4AF37]/25 mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37] leading-none">A Biblical Ministry Project</span>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl sm:text-7xl md:text-8.5xl font-serif-heading font-black text-white leading-none tracking-tight drop-shadow-3xl">
              Saul's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4D068] to-[#D4AF37] font-black">Podship</span>
            </h1>

            {/* Descriptive Scripture Quote */}
            <p className="text-xl md:text-2xl font-scripture italic text-[#EAE2C6]/85 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow">
              "An interactive theological encyclopedia and digital ministry. Exploring biblical history, visual Bible study, Christian podcasts, and gospel music to worship in Spirit and Truth."
            </p>
          </motion.div>

          {/* Interactive CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-md pt-4"
          >
            <motion.button 
              whileHover={{ scale: 1.03, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              onClick={handleBibleLink} 
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#E5C358] text-[#4a152c] px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3 border-b-4 border-black/20 hover:brightness-105 transition-all"
            >
              <Library className="w-4.5 h-4.5" /> Infographic Bible
            </motion.button>
            
            <motion.a 
              href="https://www.youtube.com/@thesaulspodship" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              className="relative group w-full sm:w-auto bg-[#FF0000] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(255,0,0,0.15)] flex items-center justify-center gap-3 border-b-4 border-black/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
              <Youtube className="w-4.5 h-4.5 relative z-10" /> 
              <span className="relative z-10">Watch on YouTube</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* The Scriptorium/About Section */}
      <Section id="about" className="bg-[#FAF7EC] parchment-border border-y border-[#D4AF37]/15 py-32 rounded-[3.5rem] my-16 shadow-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 pr-4">
            <div className="inline-flex px-4 py-1.5 bg-[#4A152C] text-[#D4AF37] rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
              The Mission
            </div>
            
            <h2 className="text-4xl md:text-5.5xl font-serif-heading font-black tracking-tight leading-tighter text-[#4A152C]">
              Timeless Truth, <br /><span className="text-[#D4AF37]">Modern Lens.</span>
            </h2>
            
            <p className="text-lg leading-[1.8] opacity-85 font-serif text-[#2a231d]">
              Saul's Podship is an interactive theological encyclopedia and digital archive dedicated to the study of Christian scripture and historical theology. Our project integrates academic research with structured visual outlines to map the narratives and historical contexts of the Bible.
            </p>
            
            <p className="text-md leading-[1.8] opacity-75 font-sans text-[#332b25]">
              This resource includes a complete 46-volume theological encyclopedia, visual scripture timelines, and a dedicated cultural history archive of Masihi Geet (Pakistani gospel music).
            </p>

            {/* Scroll Blockquote */}
            <div className="pt-8 border-t-2 border-dashed border-[#D4AF37]/25 relative pl-6">
              <span className="absolute left-0 top-6 text-4xl text-[#D4AF37]/40 font-serif">“</span>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#4A152C] mb-3">Our Legacy</h4>
              <p className="text-sm leading-relaxed text-[#513F35] italic font-serif">
                What started as a small podcast in a home studio has grown into a global ministry. Our founder, Solat Nadeem, envisioned a platform where the beauty of scripture could be explored without compromise, using the best of modern technology to serve the eternal Word.
              </p>
            </div>

            {/* Tri-bento indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { name: "Narrative", icon: <Mic className="w-6 h-6 text-[#4A152C]" />, bg: "bg-[#4A152C]/5" },
                { name: "Worship", icon: <Music className="w-6 h-6 text-[#556B2F]" />, bg: "bg-[#556B2F]/5" },
                { name: "Spirit", icon: <Sparkles className="w-6 h-6 text-[#D4AF37]" />, bg: "bg-[#D4AF37]/5" }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -4, boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#D4AF37]/15 ${card.bg}`}
                >
                  {card.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#4A152C]">{card.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Majestic Image Frame */}
          <div className="relative aspect-square w-full max-w-md mx-auto group">
            {/* Thick golden background layer */}
            <div className="absolute inset-0 bg-[#4A152C] rounded-[2.5rem] transform rotate-3 shadow-2xl overflow-hidden transition-transform duration-700 group-hover:rotate-1">
              <img 
                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1470&auto=format&fit=crop" 
                className="w-full h-full object-cover opacity-50 grayscale transition-transform duration-700 group-hover:scale-105" 
                alt="Ancient Bible Scroll" 
              />
            </div>
            {/* Fine line border frame layers */}
            <div className="absolute inset-3 border-2 border-[#D4AF37]/50 rounded-[2.2rem] pointer-events-none transform -rotate-1 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute inset-0 border border-[#D4AF37]/15 rounded-[2.5rem] pointer-events-none" />
          </div>
        </div>
      </Section>

      {/* Scriptorium Standards & Excerpts Combined (Luxury Slate Grid) */}
      <Section id="scholarship" className="my-16 bg-[#FDFBF5] py-24 rounded-[3.5rem] border border-[#D4AF37]/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37] block">Academic Integrity</span>
            <h2 className="text-3xl md:text-5xl font-serif-heading font-black text-[#4A152C] uppercase tracking-tighter">Scholarly Standards</h2>
            <p className="text-md opacity-70 leading-relaxed font-sans text-[#4A152C]/80">
              At Saul's Podship, we adhere to rigorous academic and theological standards. Every volume in our encyclopedia undergoes a multi-stage review process involving linguistic analysis of original Hebrew, Greek, and Latin texts, archaeological excavation studies, and historical context mapping.
            </p>
          </div>

          {/* Tri-standards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#D4AF37]/15">
            {[
              { 
                title: "Linguistic Rigor", 
                desc: "We analyze original Hebrew, Septuagint, and Koine Greek manuscripts to ensure divine subtleties and theological definitions are preserved." 
              },
              { 
                title: "Historical Method", 
                desc: "Rooted firmly in the historical-grammatical method, respecting cultural settings, archaeological discoveries, and authorial intents." 
              },
              { 
                title: "Visual Cartography", 
                desc: "Converting ancient textual data pathways into breathtaking infographics, genealogy trees, and map assets for digital students." 
              }
            ].map((std, i) => (
              <div key={i} className="p-8 bg-white border border-[#D4AF37]/15 rounded-3xl shadow-sm flex flex-col gap-3 relative hover:scale-[1.01] transition-transform">
                <span className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">VOL. 0{i+1}</span>
                <h4 className="text-lg font-serif-heading font-bold text-[#4A152C]">{std.title}</h4>
                <p className="text-xs leading-relaxed opacity-70 text-[#4A152C]/80">{std.desc}</p>
              </div>
            ))}
          </div>

          {/* Featured Manuscripts Rows */}
          <div className="space-y-8">
            <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#4a152c]">Featured Scholarly Excerpts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                {
                  vol: "Volume 23",
                  title: "The Deity of Christ",
                  text: "The central confession of the Christian faith — that Jesus is God — is not a late development of Hellenistic philosophy. Rather, it is a conviction rooted in the strict monotheism of the Hebrew Scriptures. In John 8:58, Jesus declares the absolute divine name 'I AM' (Egō eimi), directly claiming the sovereign majesty of Exodus 3:14..."
                },
                {
                  vol: "Volume 11",
                  title: "The Scriptorium Apocrypha",
                  text: "Revelation is often misunderstood as a map of apocalyptic fear. In contrast, it represents the magnificent 'unveiling' (Apokalypsis) of Jesus Christ as the triumphant King. By decoding the recursive Septenary structures (Sovereign Seals, Trumpet Echoes, Bowl Dispensations), we map the glorious renewal of Eden..."
                }
              ].map((ex, i) => (
                <div key={i} className="p-10 bg-white border border-[#D4AF37]/20 rounded-3xl block shadow-sm relative group hover:border-[#D4AF37] transition-all">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-dashed border-[#D4AF37]/15">
                    <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">{ex.vol}</span>
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Codex Extract</span>
                  </div>
                  <h4 className="text-xl font-serif-heading font-black text-[#4a152c] mb-3">{ex.title}</h4>
                  <p className="text-xs leading-relaxed opacity-70 italic font-serif text-[#332a22]">"{ex.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Encyclopedia/Resources Visual Cards */}
      <Section id="resources" className="py-24">
        <div className="text-center mb-16 max-w-xl mx-auto space-y-4">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4A152C] block">Sacred Library</span>
          <h2 className="text-4xl md:text-5.5xl font-serif-heading font-black tracking-tight text-[#4A152C]">BIBLE RESOURCES</h2>
          <p className="text-md opacity-70 italic font-serif">Expanding your horizon through peerless visual theological maps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Active Card - Saul's Podship Encyclopedia */}
          <motion.div 
            whileHover={{ y: -8 }} 
            className="group relative bg-[#4A152C] p-10 rounded-[2.5rem] shadow-2xl border-2 border-[#D4AF37]/35 flex flex-col justify-between h-[480px] overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#12040B]/80 pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
              <Layers className="w-52 h-52 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-md">
                <Globe className="text-[#4A152C] w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif-heading font-black text-white uppercase tracking-tight">Visual Encyclopedia</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Dive into 46 volumes of interactive biblical genealogies, massive historical timelines, and deep theological visual narratives. Meticulously researched to guide you through the Word.
              </p>
            </div>

            <ElectricBorder
              color="#D4AF37"
              speed={1.0}
              chaos={0.05}
              borderRadius={16}
              className="w-full relative z-10 mt-auto"
            >
              <button 
                onClick={handleBibleLink} 
                className="w-full bg-[#D4AF37] text-[#4a152c] py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2 border-b-2 border-black/10"
              >
                Access Scriptorium <ArrowRight className="w-4 h-4" />
              </button>
            </ElectricBorder>
          </motion.div>

          {/* Active Card - Scholarly Papers */}
          <motion.div 
            whileHover={{ y: -8 }} 
            className="group relative bg-[#102A43] p-10 rounded-[2.5rem] shadow-2xl border-2 border-[#D4AF37]/35 flex flex-col justify-between h-[480px] overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#04121F]/80 pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
              <Library className="w-52 h-52 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-md">
                <Library className="text-[#102A43] w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif-heading font-black text-white uppercase tracking-tight">Scholarly Papers</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Study peer-reviewed theological essays, expositional text analyses exploring prophetic landscape timelines, ancient Semitic linguistic roots, and structural diagrams of biblical codices.
              </p>
            </div>

            <ElectricBorder
              color="#D4AF37"
              speed={1.0}
              chaos={0.05}
              borderRadius={16}
              className="w-full relative z-10 mt-auto"
            >
              <button 
                onClick={() => {
                  setFilterTab("scholarly");
                  setSelectedCategory(null);
                  setCurrentView("encyclopedia");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="w-full bg-[#D4AF37] text-[#102A43] py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2 border-b-2 border-black/10"
              >
                Access Research Desk <ArrowRight className="w-4 h-4" />
              </button>
            </ElectricBorder>
          </motion.div>

          {/* Active Card - Daily Devotions */}
          <motion.div 
            whileHover={{ y: -8 }} 
            className="group relative bg-[#3E1B3C] p-10 rounded-[2.5rem] shadow-2xl border-2 border-[#D4AF37]/35 flex flex-col justify-between h-[480px] overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#1F041D]/80 pointer-events-none" />
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
              <Calendar className="w-52 h-52 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center shadow-md">
                <Calendar className="text-[#3E1B3C] w-7 h-7" />
              </div>
              <h3 className="text-3xl font-serif-heading font-black text-white uppercase tracking-tight">Daily Devotions</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Connect daily with the Word through high-value guides, covenant worship reflections, Sermon on the Mount studies, printable devotional maps, and real-time audio lessons.
              </p>
            </div>

            <ElectricBorder
              color="#D4AF37"
              speed={1.0}
              chaos={0.05}
              borderRadius={16}
              className="w-full relative z-10 mt-auto"
            >
              <button 
                onClick={() => {
                  setFilterTab("devotional");
                  setSelectedCategory(null);
                  setCurrentView("encyclopedia");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="w-full bg-[#D4AF37] text-[#3E1B3C] py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2 border-b-2 border-black/10"
              >
                Access Daily Desk <ArrowRight className="w-4 h-4" />
              </button>
            </ElectricBorder>
          </motion.div>
        </div>
      </Section>

      {/* Podcast Section Reimagined as a Gorgeous Bento Grid */}
      <Section id="podcast" className="bg-gradient-to-br from-[#111A2E] to-[#0A0E1A] text-white rounded-[3.5rem] my-20 overflow-hidden relative border border-white/5 py-24 select-none px-10">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block">Narrative Theology</span>
            <h2 className="text-4xl md:text-5.5xl font-serif-heading font-black uppercase tracking-tighter">The Podship Broadcasts</h2>
            <p className="text-md text-white/50 font-serif italic">Original scripture dramas and narrative studies delivered with sonic art.</p>
          </div>
          
          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
             {/* Main Big Feature Bento Component (7/12 cols) */}
             <motion.div 
               whileHover={{ y: -4 }} 
               className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl justify-between"
             >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
                   <img 
                     src="https://image.pollinations.ai/prompt/Cinematic%20old%20rugged%20cross%20on%20a%20hill%20at%20dusk%20prophetic%20vision?width=1024&height=576&nologo=true" 
                     className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 opacity-80" 
                     alt="Podcast Episode 1" 
                   />
                   <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#4a152c] shadow-3xl cursor-pointer"
                      >
                        <Play className="fill-current w-6 h-6 ml-1" />
                      </motion.div>
                   </div>
                   <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#D4AF37]" /> 45:12 MINS
                      </span>
                      <span className="bg-[#D4AF37] text-[#4a152c] px-3.5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                        New Episode
                      </span>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="text-2xl font-serif-heading font-black text-[#D4AF37]">The Shadow of the Cross</h3>
                    <div className="flex items-end gap-1 px-3">
                      {[1, 2, 3, 4, 3, 2, 4, 1, 3, 2].map((height, i) => (
                        <span key={i} className="sound-bar w-0.5 bg-[#D4AF37] rounded-full" style={{ height: `${height * 4}px`, animationDelay: `${i * 0.12}s` }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed max-w-xl">
                    In this inaugural episode, we explore the prophetic landscape of the Old Testament. We trace the scarlet thread of redemption from Genesis to the prophets, showing how every promise points toward the historical sacrifice of Jesus Christ. 
                  </p>
                  <div className="flex gap-4 pt-2">
                     <button className="flex-1 bg-white text-[#111A2E] py-4 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#4a152c] transition-all">Listen Now</button>
                     <button className="px-5 border border-white/15 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all text-white/50 hover:text-white"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
             </motion.div>

             {/* Small Episodes List Bento Component (5/12 cols) */}
             <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
                <div className="space-y-4">
                  {[
                    { title: "Voices from the Desert", desc: "Understanding the Exodus narrative in its original Hebrew context and spiritual meaning.", date: "Nov 15, 2025" },
                    { title: "The Radical King", desc: "A deep dive into the Sermon on the Mount and its application for a modern Gen-Z world.", date: "Nov 08, 2025" },
                    { title: "Angels & Archangels", desc: "The biblical hierarchy of the unseen realm and its active role in human history.", date: "Nov 01, 2025" }
                  ].map((ep, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.06)" }} 
                      className="group p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 cursor-pointer transition-all"
                    >
                       <div className="w-12 h-12 bg-[#4a152c] rounded-xl flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform shrink-0">
                         <Mic className="w-5 h-5" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                             <span className="text-[7.5px] font-black text-[#D4AF37] uppercase tracking-widest">{ep.date}</span>
                          </div>
                          <h4 className="text-sm font-bold group-hover:text-[#D4AF37] transition-colors truncate">{ep.title}</h4>
                          <p className="text-[10px] text-white/40 line-clamp-1">{ep.desc}</p>
                       </div>
                       <button className="w-8 h-8 border border-white/15 rounded-full flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white transition-all shrink-0">
                         <Play className="w-3 h-3" />
                       </button>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full py-4.5 border border-dashed border-white/15 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all mt-4">
                  View Full Archive
                </button>
             </div>
          </div>
        </div>
      </Section>

      {/* Worship Music Section */}
      <Section id="worship" className="relative py-24">
        <div className="text-center mb-16 max-w-xl mx-auto space-y-4">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4A152C] block">Sacred Melodies</span>
          <h2 className="text-4xl md:text-5.5xl font-serif-heading font-black tracking-tight text-[#4A152C]">WORSHIP MUSIC</h2>
          <p className="text-md opacity-70 italic font-serif text-[#4A152C]/80">Experience divine devotion through traditional Hindustani Raags and modern acoustic soundscapes.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
           {[
             { 
               title: "Punjabi Zaboor", 
               cat: "Traditional Raags", 
               img: "/images/sialkot_geet_book_1781112410592.png", 
               link: "https://punjabizaboor.org/" 
             },
             { 
               title: "Pakistani Singers", 
               cat: "Living Archive", 
               img: "https://image.pollinations.ai/prompt/Vintage%20Pakistani%20Christian%20choir%20singers%20cinematic%20warm%20tones?width=600&height=800&nologo=true",
               link: "https://www.saulspodship.com/Pakistanisingersarchive"
             },
             { 
               title: "Ambient Scripture", 
               cat: "Deep Meditation", 
               img: "https://image.pollinations.ai/prompt/Abstract%20glowing%20particles%20in%20dark%20space%20sacred%20soundscape%20visual?width=600&height=800&nologo=true" 
             }
           ].map((music, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -8 }} 
               className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-[#D4AF37]/15 cursor-pointer bg-neutral-900"
               onClick={() => {
                 if (music.link) {
                   window.open(music.link, "_blank", "noopener,noreferrer");
                 }
               }}
             >
                <img 
                  src={music.img} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" 
                  alt={music.title} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a152c] via-[#4a152c]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
                
                {/* Decorative golden corner markers */}
                <div className="absolute inset-4 border border-[#D4AF37]/20 pointer-events-none rounded-[1.8rem] opacity-30 group-hover:opacity-60 duration-500" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white relative z-10">
                   <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-2">{music.cat}</span>
                   <h3 className="text-2xl font-serif-heading font-black mb-6">{music.title}</h3>
                   <div className="flex gap-3">
                      {music.link ? (
                        <a 
                          href={music.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-[#D4AF37] text-[#4a152c] py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-[#4a152c] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Explore
                        </a>
                      ) : (
                        <button className="flex-1 bg-[#D4AF37] text-[#4a152c] py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><Play className="fill-current w-3 h-3" /> Play Album</button>
                      )}
                      <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"><Volume2 className="w-4.5 h-4.5" /></button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="mt-16 flex justify-center">
           <a href="https://www.saulspodship.com/Pakistanisingersarchive" target="_blank" rel="noopener noreferrer" className="bg-[#4a152c] text-[#D4AF37] px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl flex items-center gap-3 hover:bg-black hover:text-[#D4AF37] transition-all border border-[#D4AF37]/20">
             <ExternalLink className="w-5 h-5" />
             Explore Pakistani Singers Archive
           </a>
        </div>

        {/* Majestic Gospel Music Studio */}
        <div className="mt-20">
          <GospelComposer brightnessMode={brightnessMode} themeStyles={themeStyles} />
        </div>
      </Section>

      {/* Partnership & Global Reach */}
      <Section id="support" className="bg-[#FAF7EC] border-t-4 border-[#D4AF37] py-28 rounded-[3.5rem] shadow-sm relative overflow-hidden my-16">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-neutral-800"><HandHeart className="w-80 h-80" /></div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <div className="inline-flex px-4 py-1.5 bg-[#4a152c] text-[#D4AF37] rounded-full text-[9px] font-black uppercase tracking-widest">
                 Global Mission
               </div>
               
               <h2 className="text-4xl md:text-5.5xl font-serif-heading font-black tracking-tight leading-none text-[#4A152C]">
                 Partner in <br className="hidden md:block" /><span className="text-[#D4AF37]">The Mission.</span>
               </h2>
               
               <p className="text-md leading-relaxed text-[#514338] font-serif">
                 Saul's Podship is sustained by the prayers and generosity of partners like you. Your support directly funds our research into ancient biblical manuscripts, our content production for visual illustration, and our translation efforts for South Asia.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-white rounded-2xl border border-[#D4AF37]/15 flex flex-col gap-3 group hover:bg-[#4a152c] transition-colors duration-500">
                     <div className="w-10 h-10 bg-[#FAF7EC] rounded-xl flex items-center justify-center text-[#4a152c] group-hover:bg-[#D4AF37] transition-colors">
                       <Globe className="w-5 h-5" />
                     </div>
                     <h4 className="text-sm font-bold group-hover:text-white transition-colors">Global Outreach</h4>
                     <p className="text-[11px] text-[#4A152C]/65 group-hover:text-white/60 transition-colors">Help us reach cross-cultural borders with the truths of Scripture.</p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl border border-[#D4AF37]/15 flex flex-col gap-3 group hover:bg-[#4a152c] transition-colors duration-500">
                     <div className="w-10 h-10 bg-[#FAF7EC] rounded-xl flex items-center justify-center text-[#4a152c] group-hover:bg-[#D4AF37] transition-colors">
                       <MessageSquare className="w-5 h-5" />
                     </div>
                     <h4 className="text-sm font-bold group-hover:text-white transition-colors">Free Libraries</h4>
                     <p className="text-[11px] text-[#4A152C]/65 group-hover:text-white/60 transition-colors">Your support keeps the Visual Encyclopedia free for students globally.</p>
                  </div>
               </div>
            </div>

            {/* Donation Form Wrapper */}
            <div className="bg-[#111A2E] p-10 md:p-14 rounded-[2.5rem] text-white shadow-2xl flex flex-col gap-8 border border-white/5 relative">
               <div className="text-center space-y-2">
                  <h3 className="text-2xl font-serif-heading font-black text-[#D4AF37]">Support The Ministry</h3>
                  <p className="text-xs text-white/50">Become an active pillar in our digital biblical studies project.</p>
               </div>
               
               <div className="space-y-4">
                  <motion.a 
                    href="https://www.patreon.com/solatnadeem/gift" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#FF424D] text-white py-4.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl"
                  >
                    <Users className="w-4 h-4 fill-current" /> Support on Patreon
                  </motion.a>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                       <Heart className="w-3 h-3 text-[#D4AF37]" /> One-time Gift
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-1.5">
                       <DollarSign className="w-3 h-3 text-[#D4AF37]" /> Monthly Sponsor
                    </button>
                  </div>
               </div>

               <div className="p-5 bg-black/25 rounded-2xl border border-white/5">
                  <p className="text-[8px] text-center text-white/30 uppercase font-black tracking-widest">Connective Mission Actions</p>
                  <div className="flex justify-center gap-10 mt-3">
                     {[
                       { name: "Pray", icon: <Award className="w-4 h-4 text-[#D4AF37]" /> },
                       { name: "Share", icon: <Share2 className="w-4 h-4 text-[#D4AF37]" /> },
                       { name: "Sponsor", icon: <Mail className="w-4 h-4 text-[#D4AF37]" /> }
                     ].map((way, idx) => (
                       <button key={idx} className="flex flex-col items-center gap-1.5 group">
                         <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-white/10 transition-all">
                           {way.icon}
                         </div>
                         <span className="text-[7.5px] font-black uppercase tracking-widest text-white/40">{way.name}</span>
                       </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </Section>

      <FaqSection themeStyles={themeStyles} currentView="landing" />

      {/* Reimagined Contact form */}
      <Section id="contact" className="py-24">
        <div className="text-center mb-16 max-w-xl mx-auto space-y-4">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4A152C] block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-serif-heading font-black text-[#4A152C] uppercase tracking-tighter">Contact the Ministry</h2>
          <p className="text-md opacity-70 italic font-serif">We welcome editorial commentaries, collaborative invites, and prayers.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-[#D4AF37]/15 relative">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[8.5px] font-black uppercase tracking-widest opacity-40 ml-2">Full Name</label>
                <input required type="text" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full bg-[#FAF7EC] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-xs outline-none transition-all text-[#4a152c]" />
              </div>
              <div className="space-y-2">
                <label className="text-[8.5px] font-black uppercase tracking-widest opacity-40 ml-2">Email Address</label>
                <input required type="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="w-full bg-[#FAF7EC] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-xs outline-none transition-all text-[#4a152c]" />
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-[8.5px] font-black uppercase tracking-widest opacity-40 ml-2">Context Subject</label>
                <input required type="text" value={formState.subject} onChange={(e) => setFormState({...formState, subject: e.target.value})} className="w-full bg-[#FAF7EC] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-xs outline-none transition-all text-[#4a152c]" />
            </div>
            <div className="space-y-2">
                <label className="text-[8.5px] font-black uppercase tracking-widest opacity-40 ml-2">Detailed Inquiry</label>
                <textarea required rows={5} value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="w-full bg-[#FAF7EC] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-xl px-5 py-4 text-xs outline-none transition-all resize-none text-[#4a152c]" />
            </div>
            <motion.button 
              whileTap={{ scale: 0.98 }} 
              type="submit" 
              className="w-full bg-[#4a152c] text-[#D4AF37] py-4.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 border-b-2 border-black/15"
            >
               Send Scriptorium Letter <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </Section>
    </>
  );

  const isScholarlyVolume = (cat: any) => {
    const scholarlyWords = ["systematic", "apologetics", "writer", "science", "language", "canon", "vatican", "father", "languages", "numerology", "crusades", "asia", "denominations", "maps"];
    const titleLower = cat.title.toLowerCase();
    const overviewLower = cat.overview ? cat.overview.toLowerCase() : "";
    return scholarlyWords.some(kw => titleLower.includes(kw) || overviewLower.includes(kw));
  };

  const isDevotionalVolume = (cat: any) => {
    const devotionalWords = ["sermon", "prayer", "worship", "resurrection", "living", "names", "communion", "words", "stories", "creed", "baptism", "christmas", "easter", "revelation", "heaven", "magi", "tree", "relics", "populated", "disciple", "commandments", "watchers", "angels"];
    const titleLower = cat.title.toLowerCase();
    const overviewLower = cat.overview ? cat.overview.toLowerCase() : "";
    return devotionalWords.some(kw => titleLower.includes(kw) || overviewLower.includes(kw)) || !isScholarlyVolume(cat);
  };

  const filteredCategories = CATEGORIES.filter((cat) => {
    if (filterTab === 'saved' && !bookmarks.includes(cat.id)) {
      return false;
    }
    if (filterTab === 'scholarly' && !isScholarlyVolume(cat)) {
      return false;
    }
    if (filterTab === 'devotional' && !isDevotionalVolume(cat)) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = cat.title.toLowerCase().includes(q);
      const matchOverview = cat.overview ? cat.overview.toLowerCase().includes(q) : false;
      return matchTitle || matchOverview;
    }
    return true;
  });

  const renderEncyclopedia = () => (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: themeStyles.bg, color: themeStyles.text }}>
      {!selectedCategory ? (
        <Section id="encyclopedia-grid" className="max-w-7xl mx-auto pt-32">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <button onClick={() => setCurrentView('landing')} className="mb-8 flex items-center gap-2 text-[#D4AF37] uppercase text-[10px] font-black tracking-widest hover:translate-x-[-4px] transition-transform">
                <ChevronLeft className="w-4 h-4" /> Back to Ministry Home
              </button>
              <h2 className="text-5xl md:text-7xl font-serif-heading font-black uppercase tracking-tighter mb-4">Saul's Podship Encyclopedia</h2>
              <p className="text-xl opacity-60 font-serif-heading italic max-w-3xl mb-6">Explore 46 volumes of scholarly visual theology, mapping the divine narrative.</p>
              
              {/* Breadcrumb Navigation Bar */}
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest font-sans text-[#D4AF37] bg-[#4a152c]/10 border border-[#D4AF37]/10 px-4 py-2 rounded-xl inline-flex w-fit">
                <button onClick={() => setCurrentView('landing')} className="hover:text-white transition-colors flex items-center gap-1">
                  Home
                </button>
                <ChevronRight className="w-3 h-3 text-[#D4AF37]/40" />
                <span className="opacity-60 text-[#D4AF37]">Encyclopedia</span>
              </div>
            </div>
            <motion.button 
              onClick={() => setIsPrefsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4a152c] text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl"
            >
              <Sliders className="w-4 h-4" /> Scholar Settings
            </motion.button>
          </div>
          {/* Search bar and Favorites Filters */}
          <div className="mb-12 p-6 md:p-8 rounded-[2.5rem] border flex flex-col md:flex-row gap-6 items-center justify-between" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/60" />
              <input
                type="text"
                placeholder="Search volumes by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e131d]/20 rounded-2xl pl-14 pr-12 py-4 text-xs font-sans outline-none focus:border-[#D4AF37]/80 border border-transparent transition-all"
                style={{ color: themeStyles.text, borderColor: themeStyles.border }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-6 top-1/2 -translate-y-1/2 hover:text-[#D4AF37] text-[10px] font-black uppercase tracking-wider opacity-60"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex gap-3 w-full md:w-auto flex-wrap justify-end">
              <button 
                onClick={() => setFilterTab("all")} 
                className={`flex-1 md:flex-initial px-5 py-3.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest transition-all ${filterTab === "all" ? "bg-[#D4AF37] text-[#4a152c]" : "bg-black/20 border text-white/70 hover:text-white"}`}
                style={{ borderColor: filterTab === "all" ? "transparent" : themeStyles.border }}
              >
                All Volumes ({CATEGORIES.length})
              </button>
              <button 
                onClick={() => setFilterTab("scholarly")} 
                className={`flex-1 md:flex-initial px-5 py-3.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest transition-all ${filterTab === "scholarly" ? "bg-[#D4AF37] text-[#4a152c]" : "bg-black/20 border text-white/70 hover:text-white"}`}
                style={{ borderColor: filterTab === "scholarly" ? "transparent" : themeStyles.border }}
              >
                Scholarly Papers ({CATEGORIES.filter(isScholarlyVolume).length})
              </button>
              <button 
                onClick={() => setFilterTab("devotional")} 
                className={`flex-1 md:flex-initial px-5 py-3.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest transition-all ${filterTab === "devotional" ? "bg-[#D4AF37] text-[#4a152c]" : "bg-black/20 border text-white/70 hover:text-white"}`}
                style={{ borderColor: filterTab === "devotional" ? "transparent" : themeStyles.border }}
              >
                Devotions ({CATEGORIES.filter(isDevotionalVolume).length})
              </button>
              <button 
                onClick={() => setFilterTab("saved")} 
                className={`flex-1 md:flex-initial px-5 py-3.5 rounded-xl text-[8.5px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all ${filterTab === "saved" ? "bg-[#D4AF37] text-[#4a152c]" : "bg-black/20 border text-white/70 hover:text-white"}`}
                style={{ borderColor: filterTab === "saved" ? "transparent" : themeStyles.border }}
              >
                <Bookmark className="w-3 h-3 fill-current" /> Reading Safe ({bookmarks.length})
              </button>
            </div>
          </div>

          {/* Volume Grid */}
          {filteredCategories.length > 0 ? (
            <motion.div 
              key={filterTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredCategories.map((cat) => (
                <motion.div key={cat.id} whileHover={{ y: -5 }} onClick={() => setSelectedCategory(cat)} className="h-full">
                  <ElectricBorder
                    color="#D4AF37"
                    speed={0.6}
                    chaos={0.06}
                    borderRadius={24}
                    className="h-full"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <div className="group relative border rounded-[1.8rem] cursor-pointer transition-all hover:border-[#D4AF37]/50 h-full flex flex-col justify-between overflow-hidden shadow-xl" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border, minHeight: '340px' }}>
                      {/* Card Cover Picture */}
                      <div className="relative w-full h-36 bg-black/40 overflow-hidden border-b flex items-center justify-center flex-shrink-0" style={{ borderColor: themeStyles.border }}>
                        <LazyImage 
                          src={getVolumeImage(cat.title, cat.id)} 
                          alt={cat.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-85"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-[#1e131d]/85 text-[#D4AF37] px-2.5 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border border-[#D4AF37]/25 backdrop-blur-sm z-10 shadow-lg">
                          VOL. {cat.id}
                        </div>
                        <button 
                          onClick={(e) => toggleBookmark(cat.id, e)} 
                          className="absolute top-2.5 right-3 text-[#D4AF37] hover:scale-110 transition-transform bg-[#1e131d]/80 p-2 rounded-full z-10 border border-[#D4AF37]/25 shadow-lg backdrop-blur-sm"
                          title={bookmarks.includes(cat.id) ? "Remove from Reading Safe" : "Save to Reading Safe"}
                        >
                          {bookmarks.includes(cat.id) ? (
                            <BookmarkCheck className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5 text-[#D4AF37]/60 hover:text-[#D4AF37]" />
                          )}
                        </button>
                      </div>

                      {/* Card Details & Info */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-black tracking-tight mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors uppercase font-serif-heading">{cat.title}</h3>
                          <p className="text-[11px] opacity-50 line-clamp-2 leading-relaxed">{cat.overview}</p>

                          {/* Visual Progress Bar */}
                          {!cat.isPlaceholder && (
                            <div className="mt-4 space-y-1.5">
                              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-wider font-sans">
                                <span className="opacity-45">Scholarly Progress</span>
                                <span className={(readingProgress[cat.id] || 0) === 100 ? "text-[#D4AF37] font-bold" : "opacity-75"}>
                                  {(readingProgress[cat.id] || 0)}% {(readingProgress[cat.id] || 0) === 100 ? 'Completed ✓' : 'Read'}
                                </span>
                              </div>
                              <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                                <div 
                                  className="h-full bg-gradient-to-r from-[#D4AF37]/45 to-[#D4AF37] transition-all duration-700 rounded-full"
                                  style={{ width: `${readingProgress[cat.id] || 0}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4 border-t pt-3 border-dashed" style={{ borderColor: themeStyles.border }}>
                          {cat.isPlaceholder ? (
                            <span className="inline-block text-[8px] font-black uppercase tracking-widest text-[#D4AF37]/60 bg-black/20 px-3 py-1 rounded-full border border-[#D4AF37]/10">Manuscript Pending</span>
                          ) : (
                            <span className="inline-block text-[8px] font-black uppercase tracking-widest text-[#D4AF37] bg-[#4a152c]/20 px-3 py-1 rounded-full border border-[#D4AF37]/10 flex items-center gap-1">Read Manuscript <ArrowRight className="w-2.5 h-2.5" /></span>
                          )}
                        </div>
                      </div>
                    </div>
                  </ElectricBorder>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24 p-8 rounded-[3rem] border border-dashed" style={{ borderColor: themeStyles.border, backgroundColor: themeStyles.card }}>
              <Bookmark className="w-16 h-16 text-[#D4AF37] mx-auto opacity-30 mb-6" />
              <h3 className="text-2xl font-serif-heading font-black text-[#D4AF37] mb-2 uppercase tracking-tighter">
                {filterTab === "saved" 
                  ? "Your Reading Safe is Empty" 
                  : filterTab === "scholarly" 
                    ? "No Scholarly Manuscripts Found" 
                    : filterTab === "devotional" 
                      ? "No Custom Devotionals Found" 
                      : "No Manuscripts Found"}
              </h3>
              <p className="text-sm opacity-60 max-w-md mx-auto">
                {filterTab === "saved" 
                  ? "Toggle the bookmark icon on any volume card in the library to save study manuscripts for offline reading." 
                  : searchQuery 
                    ? `No manuscripts matched your search query "${searchQuery}". Please try searching for keywords like "Exodus", "Jesus" or "Kingdom".`
                    : "Review your active search parameter or settings."}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="mt-6 bg-[#4a152c] text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
          <FaqSection themeStyles={themeStyles} currentView="encyclopedia" />
        </Section>
      ) : (
        <Section id="encyclopedia-detail" className="max-w-5xl mx-auto pt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            {/* Breadcrumb Navigation Bar */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest font-sans text-[#D4AF37] bg-[#4a152c]/10 border border-[#D4AF37]/10 px-4 py-2.5 rounded-xl flex-wrap">
              <button onClick={() => setCurrentView('landing')} className="hover:text-white transition-colors">
                Home
              </button>
              <ChevronRight className="w-3 h-3 text-[#D4AF37]/40" />
              <button onClick={() => setSelectedCategory(null)} className="hover:text-white transition-colors">
                Encyclopedia
              </button>
              <ChevronRight className="w-3 h-3 text-[#D4AF37]/40" />
              <span className="opacity-60 text-[#D4AF37]">VOL. {selectedCategory.id}: {selectedCategory.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <motion.button 
                onClick={() => toggleBookmark(selectedCategory.id)}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2 border transition-all"
                style={{ 
                  backgroundColor: bookmarks.includes(selectedCategory.id) ? '#4a152c' : themeStyles.card, 
                  borderColor: bookmarks.includes(selectedCategory.id) ? '#D4AF37' : themeStyles.border,
                  color: bookmarks.includes(selectedCategory.id) ? '#D4AF37' : themeStyles.text 
                }}
              >
                {bookmarks.includes(selectedCategory.id) ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 fill-current text-[#D4AF37]" /> Saved in Safe
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" /> Save to Safe
                  </>
                )}
              </motion.button>
              <motion.button 
                onClick={() => setIsPrefsOpen(true)}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2 border"
                style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border, color: themeStyles.text }}
              >
                <Settings className="w-3 h-3" /> Preferences
              </motion.button>
              
              {/* Manual Progress Toggle Button */}
              <motion.button 
                onClick={() => {
                  setReadingProgress((prev) => {
                    const currentVal = prev[selectedCategory.id] || 0;
                    const newVal = currentVal === 100 ? 0 : 100;
                    const updated = { ...prev, [selectedCategory.id]: newVal };
                    localStorage.setItem("theophilus-reading-progress", JSON.stringify(updated));
                    return updated;
                  });
                }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 border transition-all duration-300"
                style={{ 
                  backgroundColor: (readingProgress[selectedCategory.id] || 0) === 100 ? '#1b4329' : themeStyles.card, 
                  borderColor: (readingProgress[selectedCategory.id] || 0) === 100 ? '#D4AF37' : themeStyles.border, 
                  color: (readingProgress[selectedCategory.id] || 0) === 100 ? '#D4AF37' : themeStyles.text 
                }}
                title={(readingProgress[selectedCategory.id] || 0) === 100 ? "Reset reading progress" : "Mark entire volume as completed"}
              >
                {(readingProgress[selectedCategory.id] || 0) === 100 ? (
                  <>✓ Completed</>
                ) : (
                  <>Mark as Completed</>
                )}
              </motion.button>
            </div>
          </div>
          {/* Volume Header Banner Picture */}
          <div className="relative w-full h-80 rounded-[3rem] overflow-hidden border mb-12 shadow-3xl group" style={{ borderColor: themeStyles.border }}>
            <LazyImage 
              src={getVolumeImage(selectedCategory.title, selectedCategory.id)} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-85" 
              alt={selectedCategory.title} 
              referrerPolicy="no-referrer"
            />
            {/* Customize Cover Action Button */}
            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => handleCustomCoverPrompt(selectedCategory.id, selectedCategory.title)}
                className="px-4 py-2 bg-black/80 text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center gap-1.5 shadow-xl"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Customize Cover
              </button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent flex items-end p-10 md:p-14 pointer-events-none">
              <div className="space-y-4 pointer-events-auto">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#D4AF37] bg-[#4a152c] border border-[#D4AF37]/30 px-4 py-2 rounded-full backdrop-blur-sm inline-block">
                  VOLUME {selectedCategory.id}
                </span>
                <h1 className="text-3xl md:text-6xl font-serif-heading font-black uppercase tracking-tighter text-white drop-shadow-lg leading-none">
                  {selectedCategory.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="mb-16 p-8 rounded-[2rem] border border-dashed grid grid-cols-1 md:grid-cols-3 gap-8 items-center" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-4 font-black">Volume Commentary Overview</h4>
              {selectedCategory.overview ? (
                <p className="text-lg opacity-85 leading-relaxed font-sans clear-both">
                  <span className="illuminated-dropcap">{selectedCategory.overview.charAt(0)}</span>
                  {selectedCategory.overview.slice(1)}
                </p>
              ) : (
                <p className="text-lg opacity-85 leading-relaxed font-sans">No commentary overview available.</p>
              )}
            </div>
            {/* Visual Progress Gauge */}
            <div className="p-5 rounded-[1.5rem] bg-[#1e131d]/20 border flex flex-col justify-between" style={{ borderColor: themeStyles.border }}>
              <div>
                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider mb-2 font-sans">
                  <span className="text-[#D4AF37]">Study Progress</span>
                  <span className={(readingProgress[selectedCategory.id] || 0) === 100 ? "text-[#D4AF37] font-bold" : "opacity-80"}>
                    {(readingProgress[selectedCategory.id] || 0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 relative mb-2.5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37]/45 to-[#D4AF37] transition-all duration-500 rounded-full"
                    style={{ width: `${readingProgress[selectedCategory.id] || 0}%` }}
                  />
                </div>
              </div>
              <p className="text-[10px] opacity-60 leading-normal italic">
                {(readingProgress[selectedCategory.id] || 0) === 100 
                  ? "✓ Excellent! You have finished studying this entire theological volume." 
                  : "As you scroll down the page, your progress tracks automatically."}
              </p>
            </div>
          </div>

          {/* Scholarly Research Dossier (Historical Facts, Doctrinal Themes, and Scriptural Witnesses) */}
          {VOLUME_SCHOLARLY_INFO[selectedCategory.id] && (() => {
            const scholarly = VOLUME_SCHOLARLY_INFO[selectedCategory.id];
            return (
              <div className="mb-16 space-y-12">
                <div className="flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: themeStyles.border }}>
                  <Library className="w-8 h-8 text-[#D4AF37]" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] block">Academic Archive</span>
                    <h3 className="text-3xl font-serif-heading font-black text-left">Scholarly Research Dossier</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Archaeological & Historical Evidence */}
                  <div className="p-8 rounded-[2rem] border space-y-6 flex flex-col justify-between" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-[#4a152c]/20 text-[#D4AF37]">
                          <Award className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-serif-heading font-black text-[#D4AF37]">Archaeological &amp; Historical Evidence</h4>
                      </div>
                      <ul className="space-y-4 text-left">
                        {scholarly.historicalFacts.map((fact, idx) => (
                          <li key={idx} className="flex gap-3 text-xs md:text-sm opacity-90 leading-relaxed font-sans">
                            <span className="text-[#D4AF37] font-bold text-sm">✦</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Core Doctrinal & Theological Themes */}
                  <div className="p-8 rounded-[2rem] border space-y-6 flex flex-col justify-between" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-[#4a152c]/20 text-[#D4AF37]">
                          <Globe className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-serif-heading font-black text-[#D4AF37]">Core Doctrinal &amp; Theological Themes</h4>
                      </div>
                      <ul className="space-y-4 text-left">
                        {scholarly.doctrinalThemes.map((theme, idx) => (
                          <li key={idx} className="flex gap-3 text-xs md:text-sm opacity-90 leading-relaxed font-sans">
                            <span className="text-[#D4AF37] font-bold text-sm">✦</span>
                            <span>{theme}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Canonical Scriptural Witnesses & Annotations */}
                <div className="p-10 rounded-[2.5rem] border space-y-6" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#4a152c]/20 text-[#D4AF37]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-serif-heading font-black text-[#D4AF37]">Canonical Scriptural Witnesses &amp; Study Notes</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {scholarly.keyReferences.map((ref, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-black/10 border relative flex flex-col gap-3 text-left" style={{ borderColor: themeStyles.border }}>
                        <div className="flex items-center justify-between">
                          <span className="font-serif-heading font-black text-sm text-[#D4AF37]">{ref.verse}</span>
                          <span className="text-[8px] font-mono opacity-50 bg-black/30 px-2 py-0.5 rounded-full uppercase">Covenant Anchor</span>
                        </div>
                        <p className="text-xs md:text-sm opacity-85 leading-relaxed italic font-scripture">
                          &ldquo;Our digital library traces the precise hermeneutic fulfillment and historical-grammatical roots of this witness.&rdquo;
                        </p>
                        <p className="text-xs opacity-75 font-sans leading-relaxed border-t pt-3" style={{ borderColor: themeStyles.border }}>
                          <strong className="text-[#D4AF37] text-[10px] uppercase font-black tracking-wider block mb-1">Scholarly Annotation:</strong>
                          {ref.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-24" 
            style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight, fontFamily: useSerif ? 'EB Garamond, serif' : 'Inter, sans-serif' }}
          >
            <div className="space-y-12">
              {selectedCategory.content?.tables?.map((table, idx) => (
                <div key={idx} className="rounded-[2rem] border overflow-hidden" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
                  <div className="px-8 py-4 border-b" style={{ borderColor: themeStyles.border }}><h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">{table.title}</h4></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead><tr style={{ backgroundColor: themeStyles.card }}>{table.headers.map((h, i) => <th key={i} className={`px-8 py-4 uppercase tracking-widest font-black text-[10px] ${brightnessMode === 'dark' ? 'text-white' : 'opacity-40'}`}>{h}</th>)}</tr></thead>
                      <tbody>{table.rows.map((row, i) => <tr key={i} className="border-t hover:bg-black/5 transition-colors" style={{ borderColor: themeStyles.border }}>{row.map((cell, j) => <td key={j} className={`px-8 py-6 align-top whitespace-pre-wrap ${brightnessMode === 'dark' ? 'text-white' : 'opacity-80'}`}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

             {selectedCategory.content?.storyPanels && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
                 {selectedCategory.content.storyPanels.map((panel: any, idx) => (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.4), ease: "easeOut" }}
                     className="group border rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:min-h-[22rem] md:h-96 transition-all hover:scale-[1.01] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] relative" 
                     style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}
                   >
                     {/* Story Thumbnail section */}
                     <div className="relative w-full md:w-[42%] h-48 md:h-full overflow-hidden bg-black flex-shrink-0 border-b md:border-b-0 md:border-r group" style={{ borderColor: themeStyles.border }}>
                       <LazyImage 
                         src={getStoryPanelImage(panel, idx, selectedCategory.id)}
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-105" 
                         alt={panel.title} 
                         referrerPolicy="no-referrer"
                       />
                       <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-[#D4AF37] px-3 py-1.5 rounded-full border border-[#D4AF37]/25 shadow-lg z-10">
                         {panel.era}
                       </div>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setAiStudioItem({
                             id: `${selectedCategory.id}-${panel.id}`,
                             type: 'story',
                             title: panel.title,
                             basePrompt: panel.imagePrompt,
                             originalUrl: getStoryPanelImage(panel, idx, selectedCategory.id)
                           });
                         }}
                         className="absolute top-4 right-4 bg-[#4a152c]/90 border border-[#D4AF37]/45 hover:bg-[#D4AF37] hover:text-[#4a152c] text-[#D4AF37] px-2.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-300 transform scale-90 group-hover:scale-100 z-20 hover:scale-105"
                       >
                         Spark AI ✨
                       </button>
                     </div>
                     {/* Detailed Content formatting */}
                     <div className="p-8 flex flex-col justify-between flex-1 gap-4">
                       <div className="space-y-3">
                         <h5 className="text-xl font-serif-heading font-black text-[#D4AF37] leading-tight uppercase group-hover:text-white transition-colors">
                           {panel.title}
                         </h5>
                         <p className="text-xs opacity-75 leading-relaxed font-sans line-clamp-3">
                           {panel.description}
                         </p>

                         {/* Elegant Theological Metadata Tags */}
                         {(panel.theologicalTheme || panel.characters || panel.connections) && (
                           <div className="space-y-1.5 border-t border-dashed pt-3 text-[10px]" style={{ borderColor: themeStyles.border }}>
                             {panel.theologicalTheme && (
                               <div className="flex items-start gap-1.5 leading-relaxed">
                                 <span className="text-[#D4AF37] font-black uppercase tracking-wider min-w-[70px] block">Theme:</span>
                                 <span className="opacity-80 font-sans">{panel.theologicalTheme}</span>
                               </div>
                             )}
                             {panel.characters && (
                               <div className="flex items-start gap-1.5 leading-relaxed">
                                 <span className="text-[#D4AF37] font-black uppercase tracking-wider min-w-[70px] block">Cast:</span>
                                 <span className="opacity-80 font-sans">{panel.characters}</span>
                               </div>
                             )}
                             {panel.connections && (
                               <div className="flex items-start gap-1.5 leading-relaxed">
                                 <span className="text-[#D4AF37] font-black uppercase tracking-wider min-w-[70px] block">Covenant:</span>
                                 <span className="opacity-85 text-[#D4AF37]/90 font-serif italic">{panel.connections}</span>
                               </div>
                             )}
                           </div>
                         )}
                       </div>
                       <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-dashed" style={{ borderColor: themeStyles.border }}>
                         <p className="text-[11px] opacity-60 italic font-medium flex items-center gap-1.5">
                           📖 {panel.scripture}
                         </p>
                         {selectedCategory.title === "All Bible Stories" && (
                           <motion.a 
                             href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(panel.scripture)}&version=NIV`}
                             target="_blank"
                             rel="noopener noreferrer"
                             whileHover={{ scale: 1.05 }}
                             className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/50 px-3 py-1.5 rounded-full hover:bg-[#D4AF37] hover:text-[#4a152c] transition-all flex items-center gap-1.5 backdrop-blur-sm shadow-md"
                           >
                             Read account <ExternalLink className="w-2.5 h-2.5" />
                           </motion.a>
                         )}
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             )}

            {/* Sacred Cartography Atlas for maps-based categories */}
            {selectedCategory.content?.maps && (
              <div className="space-y-12">
                <div className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4" style={{ borderColor: themeStyles.border }}>
                  <div>
                    <h3 className="text-3xl font-serif-heading font-black text-[#D4AF37] uppercase tracking-tighter flex items-center gap-3">
                      <Map className="w-8 h-8" /> Sacred Cartography Atlas
                    </h3>
                    <p className="text-sm opacity-60">High-resolution theological and historical maps for research and sermon preparation.</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] bg-[#4a152c] px-4 py-2 border border-[#D4AF37]/20 rounded-full">
                    {selectedCategory.content.maps.length} Scholarly Maps available
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedCategory.content.maps.map((mapItem, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveLightboxMap(mapItem)}
                      className="group cursor-pointer overflow-hidden rounded-[2rem] border flex flex-col justify-between" 
                      style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}
                    >
                      <div className="relative overflow-hidden aspect-video bg-black/40 border-b flex items-center justify-center" 
                           style={{ borderColor: themeStyles.border }}>
                        {mapErrors[customMapImages[mapItem.title] || mapItem.url] ? (
                          <div className="w-full h-full bg-[#1b1c28] flex flex-col items-center justify-center p-6 text-center border-b border-dashed border-[#D4AF37]/20">
                            <Map className="w-10 h-10 text-[#D4AF37]/50 mb-2 animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-wider mb-1">Scholarly Plate Synced</span>
                            <p className="text-[9px] text-white/50 max-w-[200px] leading-normal uppercase">Loading High-Resolution Document...</p>
                          </div>
                        ) : (
                          <img 
                            src={customMapImages[mapItem.title] || mapItem.url} 
                            alt={mapItem.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            onError={() => setMapErrors(prev => ({ ...prev, [customMapImages[mapItem.title] || mapItem.url]: true }))}
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-[#4a152c] text-[#D4AF37] text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-xl hover:bg-black">
                            Explore Map Zoom
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setAiStudioItem({
                              id: mapItem.title,
                              type: 'map',
                              title: mapItem.title,
                              basePrompt: `A high-resolution archaeological map of ${mapItem.title}. Cartography, ancient document, parchment background, golden and dark line art detail.`,
                              originalUrl: mapItem.url
                            });
                          }}
                          className="absolute top-4 right-4 bg-[#4a152c]/95 border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#4a152c] text-[#D4AF37] px-2.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 duration-300 transform scale-90 group-hover:scale-100 z-20 hover:scale-105"
                        >
                          Spark AI ✨
                        </button>
                      </div>
                      <div className="p-8 space-y-3">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-serif-heading font-black text-lg leading-tight text-[#D4AF37]">{mapItem.title}</h4>
                          <span className="text-[8px] font-mono opacity-55 bg-black/25 px-2.5 py-1 rounded-full uppercase truncate max-w-[120px]">{mapItem.source}</span>
                        </div>
                        <p className="text-xs opacity-75 leading-relaxed font-sans">{mapItem.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-12 rounded-[3rem] border" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
              <h3 className="text-3xl font-serif-heading font-black text-[#D4AF37] mb-8 uppercase tracking-tighter">Scholarly Summary & Narrative Analysis</h3>
              <div className="max-w-none space-y-6" style={{ color: themeStyles.text }}>
                <div 
                  className="space-y-4 font-sans text-sm md:text-base leading-relaxed text-left" 
                  dangerouslySetInnerHTML={{ 
                    __html: (() => {
                      const text = selectedCategory.content?.analysis || 'Manuscript is currently under review.';
                      return text
                        .replace(/\r/g, '')
                        .replace(/\[\[CHART:(.*?)\]\]/g, (_, chartContent) => {
                          const items = chartContent.split(',').map((item: string) => {
                            const parts = item.trim().split('|');
                            const label = parts[0] || '';
                            const value = parts[1] || '0';
                            const color = parts[2] || '#D4AF37';
                            return `
                              <div class="space-y-1">
                                <div class="flex justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]/80">
                                  <span>${label}</span>
                                  <span style="color: ${color}">${value}%</span>
                                </div>
                                <div class="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/5">
                                  <div class="h-full rounded-full transition-all duration-700" style="width: ${value}%; background-color: ${color};"></div>
                                </div>
                              </div>`;
                          }).join('\n');
                          return `
                            <div class="my-8 p-8 border rounded-[2rem] bg-black/45 space-y-5 shadow-inner" style="border-color: rgba(255,255,255,0.08);">
                              <h5 class="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 mb-2">Visual Metric Breakdown</h5>
                              <div class="space-y-4">
                                ${items}
                              </div>
                            </div>`;
                        })
                        .replace(/###\s+(.*?)(?:\n|$)/g, '<h4 class="text-xl font-serif-heading font-black text-[#D4AF37] mt-8 mb-3 not-italic">$1</h4>')
                        .replace(/##\s+(.*?)(?:\n|$)/g, '<h4 class="text-2xl font-serif-heading font-black text-[#D4AF37] mt-12 mb-4 not-italic">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#D4AF37]">$1</strong>')
                        .replace(/•\s+(.*?)(?:\n|$)/g, '<li class="ml-6 list-disc mb-2 opacity-90">$1</li>')
                        .split('\n\n')
                        .map(para => {
                          const p = para.trim();
                          if (!p) return '';
                          if (p.startsWith('<h') || p.startsWith('<li') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('--')) {
                            return p;
                          }
                          return `<p class="mb-4 opacity-85 hover:opacity-100 transition-opacity whitespace-pre-wrap">${p}</p>`;
                        })
                        .join('\n');
                    })()
                  }} 
                />
              </div>
            </div>

            {/* Extended Learning Section - EXCLUDING APOLOGETICS (ID 05) */}
            {selectedCategory.id !== '05' && (selectedCategory.youtubeLink || selectedCategory.articleLink) && (
              <div className="space-y-16 pt-16 border-t" style={{ borderColor: themeStyles.border }}>
                <div className="text-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-2">Extended Learning</span>
                  <h3 className="text-4xl font-serif-heading font-black uppercase tracking-tighter">Multimedia Resources</h3>
                </div>

                {/* YouTube Video Player */}
                {selectedCategory.youtubeLink && (
                  <div className="space-y-8">
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden border-4 shadow-3xl" style={{ borderColor: themeStyles.border }}>
                      {getYoutubeId(selectedCategory.youtubeLink) ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${getYoutubeId(selectedCategory.youtubeLink)}`}
                          title={`YouTube video for ${selectedCategory.title}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full bg-black/40 flex items-center justify-center">
                          <p className="text-xs uppercase font-black tracking-widest text-[#D4AF37]/50">Video content is being finalized</p>
                        </div>
                      )}
                      <div className="absolute top-6 left-6 pointer-events-none">
                         <span className="bg-[#8B1E3F] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl border border-white/10">
                           <Youtube className="w-3 h-3" /> Now Playing: Volume {selectedCategory.id}
                         </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Link Card */}
                {selectedCategory.articleLink && (
                  <motion.a
                    href={selectedCategory.articleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block group relative p-12 rounded-[3rem] border-2 border-dashed overflow-hidden transition-all shadow-2xl"
                    style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}
                  >
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                      <BookOpen className="w-48 h-48" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="space-y-4 text-center md:text-left">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Detailed Manuscript</span>
                        <h4 className="text-3xl font-serif-heading font-black">Read the Full Scholarly Article</h4>
                        <p className="text-sm opacity-60 max-w-xl">
                          Dive deeper into the linguistic roots, historical archaeology, and theological nuances of this volume in our extended digital library.
                        </p>
                      </div>
                      <div className="bg-[#4a152c] text-[#D4AF37] px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl group-hover:bg-black transition-colors flex items-center gap-3">
                         Open Article <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.a>
                )}
              </div>
            )}

            {/* Scholarly FAQ Block for SEO/AEO & Google Rich Snippets */}
            <div className="p-12 rounded-[3rem] border space-y-8" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-2">Reference Desk</span>
                <h3 className="text-4xl font-serif-heading font-black uppercase tracking-tighter">Frequently Asked Questions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-black/10 rounded-2xl border" style={{ borderColor: themeStyles.border }}>
                  <h4 className="font-serif-heading font-black text-sm text-[#D4AF37] mb-2">Q: What does Volume {selectedCategory.id} teach about {selectedCategory.title}?</h4>
                  <p className="text-xs opacity-70 leading-relaxed font-sans">{selectedCategory.overview} This volume provides an objective theological narrative, combining contextual mapping with robust doctrinal scholarship.</p>
                </div>
                <div className="p-6 bg-black/10 rounded-2xl border" style={{ borderColor: themeStyles.border }}>
                  <h4 className="font-serif-heading font-black text-sm text-[#D4AF37] mb-2">Q: Which biblical references support the study of {selectedCategory.title}?</h4>
                  <p className="text-xs opacity-70 leading-relaxed font-sans">Our visual encyclopedia explores historical and original manuscript contexts, combining multiple scriptural references across the Old and New Testaments to build an orthodox overview.</p>
                </div>
                <div className="p-6 bg-black/10 rounded-2xl border" style={{ borderColor: themeStyles.border }}>
                  <h4 className="font-serif-heading font-black text-sm text-[#D4AF37] mb-2">Q: How does Saul's Podship guarantee academic theological consensus?</h4>
                  <p className="text-xs opacity-70 leading-relaxed font-sans">We focus on the historical-grammatical method of hermeneutics, cross-referencing ancient archaeological findings with the grammatical roots of original Greek and Hebrew texts.</p>
                </div>
              </div>
            </div>

            {/* Internal Linking: Related Scholarly Volumes */}
            <div className="space-y-8 pt-8 border-t" style={{ borderColor: themeStyles.border }}>
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-2">Continue Research</span>
                <h3 className="text-4xl font-serif-heading font-black uppercase tracking-tighter">Related Scholarly Volumes</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CATEGORIES.filter(c => c.id !== selectedCategory.id).slice(0, 3).map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => {
                      setSelectedCategory(item);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <ElectricBorder
                      color="#D4AF37"
                      speed={0.5}
                      chaos={0.05}
                      borderRadius={24}
                      className="h-full"
                    >
                      <div className="p-8 rounded-[2rem] border flex flex-col justify-between h-[200px]" style={{ backgroundColor: themeStyles.card, borderColor: themeStyles.border }}>
                        <div>
                          <span className="text-[9px] font-black opacity-40 uppercase block mb-3">Volume {item.id}</span>
                          <h4 className="font-serif-heading font-black text-md mb-2 text-[#D4AF37] line-clamp-1">{item.title}</h4>
                          <p className="text-xs opacity-60 line-clamp-2 leading-relaxed mb-4">{item.overview}</p>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] text-right underline">Study Volume →</span>
                      </div>
                    </ElectricBorder>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prevent showing ads on screens without substantial original publisher content */}
            {/* Only show ads on full content pages, not placeholders or the grid itself, and only after content has fully loaded */}
            <AdUnit visible={isContentLoaded && !selectedCategory.isPlaceholder} className="mb-24" />
          </motion.div>
        </Section>
      )}

      {/* Preferences Modal */}
      <AnimatePresence>
        {isPrefsOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1D2D50] border-2 border-[#D4AF37]/40 w-full max-w-md rounded-[3rem] shadow-3xl p-10 relative"
            >
              <button onClick={() => setIsPrefsOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X /></button>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-[#4a152c]"><Sliders /></div>
                <div>
                  <h3 className="text-2xl font-serif-heading font-black text-white uppercase">Scholar Settings</h3>
                  <p className="text-xs text-[#D4AF37] font-black uppercase tracking-widest opacity-60">Personalize Your Study Experience</p>
                </div>
              </div>
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2"><Sun className="w-3 h-3" /> Illumination Modes</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ id: 'light', icon: <Sun />, label: 'Ivory' }, { id: 'sepia', icon: <Coffee />, label: 'Sepia' }, { id: 'dark', icon: <Moon />, label: 'Midnight' }].map((mode) => (
                      <button key={mode.id} onClick={() => setBrightnessMode(mode.id as any)} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${brightnessMode === mode.id ? 'bg-[#D4AF37] border-white text-[#4a152c]' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>
                        {mode.icon}<span className="text-[8px] font-black uppercase tracking-widest">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2"><Type className="w-3 h-3" /> Legibility (Font Size)</label>
                  <div className="flex items-center gap-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="text-white hover:text-[#D4AF37]"><Minus /></button>
                    <div className="flex-1 text-center font-black text-white">{fontSize}px</div>
                    <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="text-white hover:text-[#D4AF37]"><Plus /></button>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2"><Info className="w-3 h-3" /> Typography</label>
                  <button onClick={() => setUseSerif(!useSerif)} className="w-full flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    <span className="text-xs text-white uppercase font-bold tracking-widest">{useSerif ? 'Academic Serif' : 'Modern Sans'}</span>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${useSerif ? 'bg-[#D4AF37]' : 'bg-white/20'}`}><div className={`w-4 h-4 rounded-full bg-white transition-transform ${useSerif ? 'translate-x-4' : ''}`} /></div>
                  </button>
                </div>
              </div>
              <button onClick={() => setIsPrefsOpen(false)} className="w-full mt-10 py-5 bg-[#D4AF37] text-[#4a152c] rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-white transition-all">Apply Preferences</button>
            </motion.div>
          </motion.div>
        )}

        {activeLightboxMap && (() => {
          const activeMapUrl = customMapImages[activeLightboxMap.title] || activeLightboxMap.url;
          return (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxMap(null)}
              className="fixed inset-0 z-[1050] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-12"
            >
              <motion.div 
                initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0f141d] border-2 border-[#D4AF37]/50 w-full max-w-5xl rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
              >
                <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden group">
                  {mapErrors[activeMapUrl] ? (
                    <div className="w-full h-full bg-[#1b1c28] flex flex-col items-center justify-center p-8 text-center">
                      <Map className="w-16 h-16 text-[#D4AF37]/50 mb-4 animate-pulse" />
                      <span className="text-sm font-black uppercase text-[#D4AF37] tracking-wider mb-2">Cartographic Plate Synchronized</span>
                      <p className="text-xs text-white/50 max-w-md leading-normal uppercase">Your workspace has stored this resource. Click 'Open Source Link' below to inspect the original archival map.</p>
                    </div>
                  ) : (
                    <img 
                      src={activeMapUrl} 
                      alt={activeLightboxMap.title} 
                      className="w-full h-full object-contain max-h-full transition-transform duration-300 hover:scale-[1.2] cursor-zoom-in"
                      onError={() => setMapErrors(prev => ({ ...prev, [activeMapUrl]: true }))}
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-xl text-[10px] text-white opacity-60 backdrop-blur-md">
                    Hover or grab to inspect with precision zoom
                  </div>
                </div>
              <div className="w-full md:w-96 p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#D4AF37]/20 bg-[#161c28]">
                <div className="space-y-6 overflow-y-auto pr-2 max-h-[50vh] md:max-h-none">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37] bg-[#4a152c] px-3 py-1 rounded-full">{activeLightboxMap.source}</span>
                    <button onClick={() => setActiveLightboxMap(null)} className="text-white/40 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif-heading font-black text-[#D4AF37] leading-tight uppercase">{activeLightboxMap.title}</h3>
                    <div className="h-0.5 w-12 bg-[#D4AF37] mt-3" />
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">{activeLightboxMap.description}</p>
                  <p className="text-[11px] text-white/50 italic leading-relaxed font-sans mt-4">
                    "This visual map aids in linking original greek/hebrew grammar to geographical boundaries of historic Christian archives."
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex gap-4">
                  <a 
                    href={activeLightboxMap.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#4a152c] text-[#D4AF37] border border-[#D4AF37]/40 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors text-center shadow-xl flex items-center justify-center gap-1"
                  >
                    Open Source Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button 
                    onClick={() => setActiveLightboxMap(null)}
                    className="px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 hover:bg-white/15 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F4E3] text-[#1D2D50] selection:bg-[#D4AF37] font-sans scroll-smooth overflow-x-hidden">
      <style>{`
        /* Illuminated Capital Dropcap with elegant Gold frame */
        .illuminated-dropcap {
          float: left;
          font-family: 'EB Garamond', 'Georgia', serif;
          font-size: 3.6rem;
          line-height: 0.85em;
          padding: 8px 12px;
          margin-right: 12px;
          margin-top: 4px;
          font-weight: 900;
          color: #D4AF37;
          background-color: #4a152c;
          border: 2px solid #D4AF37;
          border-radius: 12px;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.5);
          box-shadow: 0 4px 12px rgba(74, 21, 44, 0.15);
        }
        
        /* Modern-Medieval Scroll details */
        .scrolled-manuscript-rail {
          border-left: 1px solid rgba(212, 175, 55, 0.25);
          padding-left: 20px;
        }
      `}</style>
      <DynamicSchema currentView={currentView} selectedCategory={selectedCategory} />
      <motion.nav 
        style={{ backgroundColor: currentView === 'encyclopedia' ? themeStyles.bg + 'F2' : headerBg }} 
        className="fixed top-0 left-0 right-0 z-[100] border-b border-[#D4AF37]/10 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentView('landing'); setSelectedCategory(null); window.scrollTo({top: 0}); }}>
          <img src="/logo.svg" className="w-12 h-12 object-contain hover:scale-105 transition-transform" referrerPolicy="no-referrer" alt="Saul's Podship" />
          <span className={`font-serif-heading font-black text-xl md:text-2xl tracking-tighter uppercase drop-shadow-sm ${currentView === 'encyclopedia' ? (brightnessMode === 'dark' ? 'text-white' : 'text-[#4a152c]') : 'text-white'}`}>Saul's Podship</span>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.name} onClick={item.action} className={`text-[10px] font-black uppercase tracking-widest hover:text-[#D4AF37] transition-colors ${currentView === 'encyclopedia' ? (brightnessMode === 'dark' ? 'text-white/80' : 'text-[#4a152c]/80') : 'text-white/80'}`}>
              {item.name}
            </button>
          ))}
          <button onClick={handleBibleLink} className="bg-[#D4AF37] text-[#4a152c] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-black/20">Encyclopedia</button>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={currentView === 'encyclopedia' ? (brightnessMode === 'dark' ? 'text-white' : 'text-[#4a152c]') : 'text-white'}>{isMenuOpen ? <X /> : <Menu />}</button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-[150] bg-[#4a152c] p-12 flex flex-col items-center justify-center gap-8">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X className="w-8 h-8" /></button>
            {navItems.map((item) => <button key={item.name} onClick={item.action} className="text-2xl font-serif-heading font-black text-white uppercase tracking-widest">{item.name}</button>)}
            <button onClick={handleBibleLink} className="bg-[#D4AF37] text-[#4a152c] px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest mt-8">Visual Encyclopedia</button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {currentView === 'landing' && renderLanding()}
        {currentView === 'encyclopedia' && renderEncyclopedia()}
        {currentView === 'privacy' && (
          <Section id="privacy" className="pt-32 max-w-4xl">
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-[#D4AF37]/20">
              <h2 className="text-4xl md:text-6xl font-serif-heading font-black mb-8">Privacy Policy</h2>
              <div className="space-y-6 opacity-80 leading-relaxed text-lg">
                <p>Your privacy is of paramount importance to us at Saul's Podship. This Privacy Policy document outlines the types of personal information that is received and collected by www.saulspodship.com and how it is used.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">1. Information We Collect</h3>
                <p>We only collect personal information that you voluntarily provide through our contact form, such as your name, email address, and the content of your message. This data is used exclusively to respond to your specific inquiries and support requests.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">2. Cookies and Web Beacons</h3>
                <p>Saul's Podship uses cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">3. Google AdSense & Third-Party Advertising</h3>
                <p>We partner with Google AdSense to serve advertisements on our site. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
                <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" className="text-[#D4AF37] underline">Ads Settings</a>.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">4. Log Files</h3>
                <p>Like many other websites, www.saulspodship.com makes use of log files. These files merely log visitors to the site – usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, track user's movement around the site, and gather demographic information.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">5. Consent</h3>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
              </div>
              <button onClick={() => setCurrentView('landing')} className="mt-12 bg-[#4a152c] text-[#D4AF37] px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl flex items-center gap-2 hover:bg-black transition-all">
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>
          </Section>
        )}
        {currentView === 'disclaimer' && (
          <Section id="disclaimer" className="pt-32 max-w-4xl">
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-[#D4AF37]/20">
              <h2 className="text-4xl md:text-6xl font-serif-heading font-black mb-8">Theological Disclaimer</h2>
              <div className="space-y-6 opacity-80 leading-relaxed text-lg">
                <p>The contents of Saul's Podship, including the Saul's Podship Encyclopedia, podcasts, and scholarly excerpts, are provided for educational, historical, and spiritual exploration purposes only.</p>
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">1. Scholarly Accuracy</h3>
                <p>While we strive for high levels of historical and linguistic accuracy, theological interpretation is inherently subjective and varies across different Christian traditions. Our summaries reflect a broadly orthodox and historical Christian perspective but should not be viewed as an exhaustive or definitive authority on every doctrinal nuance.</p>
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">2. Pastoral & Academic Use</h3>
                <p>We encourage students, pastors, and seekers to cross-reference our materials with primary scriptural sources (Hebrew, Greek, and Latin texts) and established historical commentaries. Our goal is to provide a "Visual Map" to aid understanding, not to replace personal study or the authority of the local church.</p>
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">3. AI Contributions</h3>
                <p>Certain interactive elements, such as the Theophilus AI and localized translations, utilize large language models to assist in navigation and inquiry. While these models are configured for academic rigor, users should exercise discernment and verify AI-generated theological claims against Scripture.</p>
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">4. External Resources</h3>
                <p>Any links provided to external digital archives, manuscript libraries, or Bible study tools are for convenience and do not imply a full endorsement of all content found on those third-party sites.</p>
              </div>
              <button onClick={() => setCurrentView('landing')} className="mt-12 bg-[#4a152c] text-[#D4AF37] px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl flex items-center gap-2 hover:bg-black transition-all">
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>
          </Section>
        )}
        {currentView === 'terms' && (
          <Section id="terms" className="pt-32 max-w-4xl">
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-[#D4AF37]/20">
              <h2 className="text-4xl md:text-6xl font-serif-heading font-black mb-8">Terms and Conditions</h2>
              <div className="space-y-6 opacity-80 leading-relaxed text-lg">
                <p>Welcome to Saul's Podship. By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">1. Acceptance of Terms</h3>
                <p>The services provided by Saul's Podship are subject to the following Terms and Conditions. We reserve the right to update these terms at any time without notice to you.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">2. Description of Services</h3>
                <p>Saul's Podship provides users with access to a rich collection of resources, including the Saul's Podship Encyclopedia, podcasts, and theological articles. These services are provided "as-is".</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">3. User Conduct</h3>
                <p>You agree to use the website for lawful purposes only. You are prohibited from posting or transmitting any material that is unlawful, threatening, libelous, defamatory, obscene, or otherwise violates any law.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">4. Intellectual Property</h3>
                <p>All content included on this site, such as text, graphics, logos, and images, is the property of Saul's Podship or its content suppliers and is protected by international copyright laws.</p>
                
                <h3 className="text-2xl font-bold mt-8 text-[#4a152c]">5. Limitation of Liability</h3>
                <p>Saul's Podship shall not be liable for any damages arising out of the use or inability to use the materials on this site, even if we have been notified of the possibility of such damages.</p>
              </div>
              <button onClick={() => setCurrentView('landing')} className="mt-12 bg-[#4a152c] text-[#D4AF37] px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl flex items-center gap-2 hover:bg-black transition-all">
                <ChevronLeft className="w-4 h-4" /> Back to Home
              </button>
            </div>
          </Section>
        )}
      </main>

      <footer className="bg-[#0a0f1c] pt-32 pb-12 px-6 text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" className="w-12 h-12 object-contain hover:scale-105 transition-transform" referrerPolicy="no-referrer" alt="Saul's Podship" />
                <span className="font-serif-heading font-black text-2xl tracking-tighter uppercase">Saul's Podship</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-sm">
                A digital ministry and interactive theological encyclopedia dedicated to deep biblical study, visual Bible timelines, narrative Christian podcasts, and a global Masihi Geet archive. Join our worldwide Christian community as we explore the eternal truths of God's Word.
              </p>
              
              <div className="pt-4 space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Join our Newsletter</h5>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-[#D4AF37] transition-all w-full text-white" />
                  <button className="bg-[#D4AF37] text-[#4a152c] p-2 rounded-xl hover:bg-white transition-all"><Send className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {[
                  { 
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.455 12 20.455 12 20.455s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" fill="#FF0000" />
                        <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FFFFFF" />
                      </svg>
                    ), 
                    href: "https://www.youtube.com/@thesaulspodship" 
                  },
                  { 
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#1877F2" />
                        <path d="M14 12h-2v7h-3v-7H7.5V9.5H9V8c0-2 1-3 3-3h2v2.5h-1c-1 0-1 .5-1 1v1h2L14 12z" fill="#FFFFFF" />
                      </svg>
                    ), 
                    href: "https://www.facebook.com/@saulspodship" 
                  },
                  { 
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <defs>
                          <radialGradient id="footerIgGrad" cx="0.2" cy="0.8" r="0.9">
                            <stop offset="0%" stopColor="#FFDD55" />
                            <stop offset="30%" stopColor="#FF5430" />
                            <stop offset="70%" stopColor="#C837AB" />
                            <stop offset="100%" stopColor="#3771C8" />
                          </radialGradient>
                        </defs>
                        <rect width="24" height="24" rx="6" fill="url(#footerIgGrad)" />
                        <rect x="5" y="5" width="14" height="14" rx="4.5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
                        <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
                        <circle cx="16.5" cy="7.5" r="1" fill="#FFFFFF" />
                      </svg>
                    ), 
                    href: "https://www.instagram.com/saulspodship" 
                  },
                  { 
                    icon: (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="12" fill="#000000" />
                        <path d="M16 7.5c-.83 0-1.53-.42-1.95-1.06V14a3.5 3.5 0 1 1-4.76-3.32V13a1.5 1.5 0 1 0 1.26 1.48v-8.3h1.95c.42.64 1.12 1.06 1.95 1.06V7.5z" fill="#FFFFFF" />
                        <path d="M12.5 6.18v8.3c0 .81-.66 1.48-1.48 1.48s-1.48-.67-1.48-1.48a1.47 1.47 0 0 1 1.14-1.43" stroke="#00f2fe" strokeWidth="0.8" fill="none" opacity="0.8" />
                        <path d="M15.5 7.5a1.94 1.94 0 0 1-1.95-1.06" stroke="#fe2c55" strokeWidth="0.8" fill="none" opacity="0.8" />
                      </svg>
                    ), 
                    href: "https://www.tiktok.com/@saulspodship" 
                  }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-300 overflow-hidden">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">Quick Links</h4>
              <ul className="space-y-4">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <button onClick={item.action} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group text-left">
                      <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">Legal & Ethics</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setCurrentView('privacy')} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group text-left">
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('disclaimer')} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group text-left">
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    Theological Disclaimer
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('terms')} className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group text-left">
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <a href="mailto:saulspodship@gmail.com" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    Ministry Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">Ministry Sponsor</h4>
              <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest font-bold">
                Saul's Podship is proud to be supported by mission partners.
              </p>
              {/* COMPLIANCE: Static sidebar ad container - visible only on valid pages and after content is fully loaded */}
              {isContentLoaded && currentView === 'encyclopedia' && !!selectedCategory && !selectedCategory.isPlaceholder && (
                <div className="bg-white/5 rounded-2xl overflow-hidden min-h-[120px] flex flex-col items-center justify-center text-[10px] text-white/20 font-black uppercase tracking-widest border border-white/10 p-2">
                  <AdUnit 
                    visible={true} 
                    className="!my-0 !p-0 !bg-transparent !border-none" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              &copy; {new Date().getFullYear()} SAUL'S PODSHIP. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 flex items-center gap-2">
                <Globe className="w-3 h-3" /> GLOBAL MINISTRY
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 flex items-center gap-2">
                <HandHeart className="w-3 h-3" /> FAITH DRIVEN
              </span>
            </div>
          </div>
        </div>
      </footer>

      {currentView === 'landing' && (
        <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.1 }} onClick={handleBibleLink} className="fixed bottom-8 left-8 z-[200] w-16 h-16 bg-[#D4AF37] rounded-2xl shadow-2xl flex items-center justify-center text-[#4a152c] group border-b-4 border-black/20">
          <BookOpen className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </motion.button>
      )}

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[200] w-12 h-12 bg-[#4a152c] text-[#D4AF37] rounded-full shadow-2xl flex items-center justify-center border border-[#D4AF37]/30"
          >
            <ChevronLeft className="w-6 h-6 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieConsent && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[500] p-6"
          >
            <div className="max-w-4xl mx-auto bg-[#1D2D50] border-2 border-[#D4AF37]/30 rounded-3xl p-6 shadow-3xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-[#4a152c] shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies as described in our <button onClick={() => setCurrentView('privacy')} className="text-[#D4AF37] underline">Privacy Policy</button>.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <button 
                  onClick={handleAcceptCookies}
                  className="bg-[#D4AF37] text-[#4a152c] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-white transition-all"
                >
                  Accept All
                </button>
                <button 
                  onClick={() => setShowCookieConsent(false)}
                  className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {aiStudioItem && (
          <AiStudioModal 
            item={aiStudioItem} 
            onClose={() => setAiStudioItem(null)} 
            onSave={(newUrl) => {
              if (!aiStudioItem) return;
              if (aiStudioItem.type === 'story') {
                const next = { ...customStoryImages, [aiStudioItem.id]: newUrl };
                setCustomStoryImages(next);
                localStorage.setItem("theophilus-custom-story-images", JSON.stringify(next));
              } else if (aiStudioItem.type === 'volume') {
                fetch("/api/volume-images", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: aiStudioItem.id, imageUrl: newUrl })
                }).then(res => {
                  if (res.ok) {
                    setVolumeImages(prev => ({ ...prev, [aiStudioItem.id]: newUrl }));
                  }
                }).catch(err => console.error("Failed to save custom volume image:", err));
              } else {
                const next = { ...customMapImages, [aiStudioItem.id]: newUrl };
                setCustomMapImages(next);
                localStorage.setItem("theophilus-custom-map-images", JSON.stringify(next));
              }
              setAiStudioItem(null);
            }}
            onReset={() => {
              if (!aiStudioItem) return;
              if (aiStudioItem.type === 'story') {
                const next = { ...customStoryImages };
                delete next[aiStudioItem.id];
                setCustomStoryImages(next);
                localStorage.setItem("theophilus-custom-story-images", JSON.stringify(next));
              } else if (aiStudioItem.type === 'volume') {
                const defaultUrl = getVolumeImage(aiStudioItem.title, aiStudioItem.id, {});
                fetch("/api/volume-images", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: aiStudioItem.id, imageUrl: defaultUrl })
                }).then(res => {
                  if (res.ok) {
                    setVolumeImages(prev => {
                      const next = { ...prev };
                      delete next[aiStudioItem.id];
                      return next;
                    });
                  }
                }).catch(err => console.error("Failed to reset custom volume image:", err));
              } else {
                const next = { ...customMapImages };
                delete next[aiStudioItem.id];
                setCustomMapImages(next);
                localStorage.setItem("theophilus-custom-map-images", JSON.stringify(next));
              }
              setAiStudioItem(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
