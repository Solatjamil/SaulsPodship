/* ============================================================
   ModuleSwitcher — switches the site's interactive scholarship
   modules in place (same embed pattern the atlas page uses).
   The switch buttons sit BELOW the preview, matching the atlas's
   footer row, and each module keeps an open-full-screen escape.
   ============================================================ */
import React, { useState } from 'react';
import { Compass, Crown, BookOpen, ExternalLink } from 'lucide-react';

export type ModuleId = 'map' | 'kings' | 'stories';

const MODULES: {
  id: ModuleId; label: string; short: string; blurb: string;
  src: string; full: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'map',
    label: 'Biblical Prophecy Map',
    short: 'Prophecy Map',
    blurb: '247 prophecies — 107 fulfilled, 88 in part, 52 awaiting — woven by 1,063 cross-links on a rotatable 3D globe. Every thread opens the passage on bible.com.',
    src: '/prophecy-map.html',
    full: '/prophecy-map.html',
    icon: Compass,
  },
  {
    id: 'kings',
    label: 'Kings of the Bible — The Throne Line',
    short: 'Kings & Thrones',
    blurb: 'Every throne from Saul to the Herods in canonical order — reign lengths, synchronisms, wars and prophetic witness charted line by line.',
    src: '/kings-of-the-bible.html',
    full: '/kings-of-the-bible.html',
    icon: Crown,
  },
  {
    id: 'stories',
    label: 'The 100 All Bible Stories',
    short: '100 Bible Stories',
    blurb: 'Volume 1\u2019s painted collection — one hundred narrative cards in canonical order, from Creation to the New Heaven, each with verses, theme, cross-references and title-matched art.',
    src: '/encyclopedia/all-bible-stories',
    full: '/encyclopedia/all-bible-stories',
    icon: BookOpen,
  },
];

interface Props { compact?: boolean }

const ModuleSwitcher: React.FC<Props> = ({ compact = false }) => {
  const [active, setActive] = useState<ModuleId>('map');
  const mod = MODULES.find(m => m.id === active)!;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#F8F4E3]">
        <iframe
          src={mod.src}
          title={`${mod.label} — interactive module`}
          loading="lazy"
          className={`w-full border-0 block ${compact ? 'h-[62vh] min-h-[440px] md:h-[700px]' : 'h-[80vh] min-h-[560px] md:h-[820px]'}`}
        />
      </div>

      {/* module switch buttons — below the preview, as on the atlas */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
        {MODULES.map(m => {
          const Icon = m.icon;
          const isOn = m.id === active;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(m.id)}
              aria-pressed={isOn}
              className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all ${
                isOn
                  ? 'bg-[#D4AF37] text-[#1A0812] ring-2 ring-[#E8C96A]/60 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-[#E8C96A] border border-[#D4AF37]/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {isOn ? `Viewing \u00b7 ${m.short}` : m.short}
            </button>
          );
        })}
        <a
          href={mod.full}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs text-[#E8C96A] bg-white/5 hover:bg-white/10 border border-[#D4AF37]/30 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open Full-Screen
        </a>
      </div>

      {!compact && (
        <p className="text-white/65 text-[11px] sm:text-xs max-w-2xl text-center pt-3 leading-relaxed">{mod.blurb}</p>
      )}
    </div>
  );
};

export { MODULES };
export default ModuleSwitcher;
