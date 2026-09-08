/* ============================================================
   ModuleSwitcher — switches the site's interactive scholarship
   modules in place (same embed pattern the atlas page uses).
   The switch buttons sit BELOW the preview, matching the atlas's
   footer row, and each module keeps an open-full-screen escape.
   ============================================================ */
import React, { useEffect, useRef, useState } from 'react';
import { Compass, Crown, ExternalLink, Network } from 'lucide-react';

export type ModuleId = 'map' | 'kings' | 'crossrefs';

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
    full: '/prophecy-map',
    icon: Compass,
  },
  {
    id: 'kings',
    label: 'Kings of the Bible — The Throne Line',
    short: 'Kings & Thrones',
    blurb: 'Every throne from Saul to the Herods in canonical order — reign lengths, synchronisms, wars and prophetic witness charted line by line.',
    src: '/kings-of-the-bible.html',
    full: '/kings-of-the-bible',
    icon: Crown,
  },
  {
    id: 'crossrefs',
    label: 'The Interlinked Bible \u2014 344,799 Threads',
    short: 'Interlinked Bible',
    blurb: 'Every cross-reference in Scripture \u2014 344,799 verse links forming 190,758 chapter threads across all 66 books \u2014 woven into one interactive horseshoe, with a world faith map beneath.',
    src: '/cross-references/',
    full: '/cross-references',
    icon: Network,
  },
];

interface Props { compact?: boolean }

const ModuleSwitcher: React.FC<Props> = ({ compact = false }) => {
  const [active, setActive] = useState<ModuleId>('map');
  const mod = MODULES.find(m => m.id === active)!;
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  // Modules live ON the page: the frame grows to its content's height so the
  // visitor scrolls the page once — never an inner scrollbar plus an outer one.
  useEffect(() => {
    const f = frameRef.current;
    if (!f) return;
    const fit = () => {
      try {
        const d = f.contentDocument;
        if (!d || !d.body) return;
        const h = Math.max(d.documentElement.scrollHeight, d.body.scrollHeight);
        if (h > 120 && Math.abs(h - f.clientHeight) > 2) f.style.height = h + 'px';
      } catch {
        /* cross-origin guard */
      }
    };
    fit();
    f.addEventListener('load', fit);
    const iv = window.setInterval(fit, 700);
    return () => {
      f.removeEventListener('load', fit);
      window.clearInterval(iv);
    };
  }, [active]);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#F8F4E3]">
        <iframe
          ref={frameRef}
          src={mod.src}
          title={`${mod.label} — interactive module`}
          loading="lazy"
          className="w-full border-0 block"
          style={{ height: compact ? '62vh' : '76vh', minHeight: compact ? 440 : 560 }}
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
