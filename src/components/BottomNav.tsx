/**
 * BottomNav — app-style bottom navigation for phones / tablets / installed PWA.
 * Visible < 1024px (the same breakpoint where the desktop nav row is hidden).
 * Surfaces the interactive modules that were previously reachable only from
 * the hamburger drawer: Prophecy Map, Interlinked Bible, Kings of the Bible.
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe2, Network, Crown, BookOpen } from 'lucide-react';

const ITEMS = [
  { to: '/',                   label: 'Home',        icon: Home },
  { to: '/prophecy-map',       label: 'Prophecy',    icon: Globe2 },
  { to: '/cross-references',   label: 'Bible Links', icon: Network },
  { to: '/kings-of-the-bible', label: 'Kings',       icon: Crown },
  { to: '/encyclopedia',       label: 'Volumes',     icon: BookOpen },
] as const;

const BottomNav: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <nav
      id="sp-bottom-nav"
      aria-label="Primary mobile navigation"
      className="lg:hidden fixed inset-x-0 bottom-0 z-[400] bg-[#16060f]/95 backdrop-blur-xl border-t border-[#D4AF37]/30 shadow-[0_-6px_24px_rgba(0,0,0,0.35)] pb-[env(safe-area-inset-bottom)] text-left"
    >
      <ul className="grid grid-cols-5 m-0 p-0 list-none">
        {ITEMS.map(({ to, label, icon: Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`relative flex h-[60px] flex-col items-center justify-center gap-1 text-[10.5px] font-semibold leading-none transition-colors ${
                  active ? 'text-[#E8C96A]' : 'text-white/70 active:text-white'
                }`}
              >
                {active && (
                  <span aria-hidden className="absolute top-0 left-[22%] right-[22%] h-0.5 rounded-b bg-[#D4AF37]" />
                )}
                <Icon className="w-[23px] h-[23px]" strokeWidth={1.9} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
