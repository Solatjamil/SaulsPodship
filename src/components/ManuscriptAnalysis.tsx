/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { ScriptureRef, SCRIPTURE_REGEX } from './ScriptureRef';
import { Sparkles, MapPin, BookOpen, ShieldCheck } from 'lucide-react';

interface ManuscriptAnalysisProps {
  content: string;
  volumeTitle?: string;
  onExploreEra?: (era: string) => void;
}

// Pre-process analysis text to normalize headers, bullets, callouts, and clean markdown artifacts
export const normalizeAnalysis = (raw: string): string => {
  if (!raw) return '';

  let text = raw;

  // 1. Remove literal escaped newlines or tabs
  text = text.replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\t/g, '  ');

  // 2. Fix header bold duplication: ### **Title** -> ### Title
  text = text.replace(/^(#{1,6})\s*\*\*+(.*?)\*\*+\s*$/gm, '$1 $2');
  text = text.replace(/^(#{1,6})\s*\*(.*?)\*\s*$/gm, '$1 $2');

  // 3. Normalize bullet characters: • or ⁃ or ▪ -> -
  text = text.replace(/^[ \t]*[•⁃▪][ \t]+/gm, '- ');

  // 4. Ensure proper spacing around headings and horizontal rules
  text = text.replace(/\n(#{1,6}\s+[^\n]+)/g, '\n\n$1\n\n');
  text = text.replace(/\n(---\s*\n)/g, '\n\n---\n\n');

  // 5. Convert Key Verses lines into styled blockquotes
  text = text.replace(/^\*Key Verses?:\s*(.*?)\*$/gm, '> 📖 **Key Verses:** $1');
  text = text.replace(/^Key Verses?:\s*(.*)$/gm, '> 📖 **Key Verses:** $1');

  // 6. Collapse 3+ consecutive line breaks into 2
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
};

export const ManuscriptAnalysis: React.FC<ManuscriptAnalysisProps> = ({ content, volumeTitle }) => {
  const cleanedContent = useMemo(() => normalizeAnalysis(content), [content]);

  // Extract headings for "On This Page" Table of Contents
  const headings = useMemo(() => {
    const lines = cleanedContent.split('\n');
    const list: { level: number; text: string; id: string }[] = [];
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[*_`]/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        list.push({ level, text, id });
      }
    });
    return list;
  }, [cleanedContent]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-10 text-center font-serif">
      {/* Eyebrow & Main Section Header */}
      <div className="space-y-2 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#D4AF37]/20 text-[#8B1C2E] border border-[#D4AF37]/30">
          <BookOpen className="w-3.5 h-3.5 text-[#8B1C2E]" />
          Academic Archive
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A152C] tracking-tight">
          Scholarly Research Dossier
        </h2>
        {volumeTitle && (
          <p className="text-xs sm:text-sm text-gray-500 font-sans italic">
            Primary exegetical dossier for {volumeTitle}
          </p>
        )}
      </div>

      {/* "On This Page" Quick TOC Navigator */}
      {headings.length > 1 && (
        <nav aria-label="Table of Contents" className="p-4 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm text-center">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#8B1C2E] mb-2.5">
            On This Page
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.id}`}
                className="px-3 py-1 rounded-lg text-xs font-sans font-medium text-[#4A152C] bg-amber-50/60 hover:bg-[#4A152C] hover:text-[#E8C96A] border border-[#D4AF37]/20 transition-colors"
              >
                {h.text}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Main Prose Renderer with ReactMarkdown */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-[1.8] text-[1.05rem] text-center space-y-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            h1: ({ children, ...props }) => {
              const text = String(children || '');
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h1 id={id} className="font-serif text-3xl sm:text-4xl font-black text-[#4A152C] mt-12 mb-4 text-center tracking-tight" {...props}>
                  {children}
                </h1>
              );
            },
            h2: ({ children, ...props }) => {
              const text = String(children || '');
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h2 id={id} className="font-serif text-2xl sm:text-3xl font-black text-[#4A152C] mt-12 mb-4 text-center tracking-tight border-b border-[#D4AF37]/20 pb-2" {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }) => {
              const text = String(children || '');
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <h3 id={id} className="font-serif text-xl sm:text-2xl font-bold text-[#8B1C2E] mt-8 mb-3 text-center" {...props}>
                  {children}
                </h3>
              );
            },
            h4: ({ children, ...props }) => (
              <h4 className="font-serif text-lg font-bold text-[#4A152C] mt-6 mb-2 text-center" {...props}>
                {children}
              </h4>
            ),
            p: ({ children, ...props }) => (
              <p className="mb-4 leading-relaxed text-gray-800 text-center mx-auto" {...props}>
                {children}
              </p>
            ),
            strong: ({ children, ...props }) => (
              <strong className="font-bold text-[#4A152C]" {...props}>
                {children}
              </strong>
            ),
            em: ({ children, ...props }) => (
              <em className="italic text-gray-800 opacity-95" {...props}>
                {children}
              </em>
            ),
            ul: ({ children, ...props }) => (
              <ul className="my-4 space-y-2 list-none text-center px-0 mx-auto max-w-2xl" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="my-4 space-y-2 list-none text-center px-0 mx-auto max-w-2xl" {...props}>
                {children}
              </ol>
            ),
            li: ({ children, ...props }) => (
              <li className="leading-relaxed text-center my-1.5" {...props}>
                <span className="text-[#D4AF37] mr-1.5 font-bold">&bull;</span>
                {children}
              </li>
            ),
            blockquote: ({ children, ...props }) => (
              <blockquote className="my-6 mx-auto max-w-2xl border-y border-[#D4AF37]/40 bg-amber-50/30 py-4 px-6 italic text-[#4A152C] text-center rounded-xl font-serif text-base" {...props}>
                {children}
              </blockquote>
            ),
            hr: () => (
              <div className="my-10 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            ),
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1C2E] hover:text-[#4A152C] underline decoration-dotted underline-offset-4 font-semibold inline-flex items-center gap-1"
                {...props}
              >
                <span>{children}</span>
              </a>
            ),
            table: ({ children, ...props }) => (
              <div className="my-8 overflow-x-auto rounded-2xl border border-[#D4AF37]/30 shadow-sm bg-white">
                <table className="mx-auto border-collapse text-xs sm:text-sm w-full text-center" {...props}>
                  {children}
                </table>
              </div>
            ),
            th: ({ children, ...props }) => (
              <th className="px-4 py-3 bg-[#4A152C] text-white text-xs font-black uppercase tracking-wider text-center align-middle" {...props}>
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td className="px-4 py-3 border-b border-gray-100 text-center align-middle font-sans text-xs sm:text-sm text-gray-700" {...props}>
                {children}
              </td>
            ),
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
      </div>

      {/* Author & Editorial Seal Card - Centered */}
      <section className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#1A0812] to-[#3B0E23] text-white border-2 border-[#D4AF37]/40 shadow-xl relative overflow-hidden font-sans text-center">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F5E296] text-[#1A0812] flex items-center justify-center font-serif font-black text-2xl shadow-lg border-2 border-white/20">
            SN
          </div>
          <div className="space-y-1 text-center">
            <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#E8C96A] bg-white/10 px-3 py-1 rounded-full border border-white/10 mb-1">
              Founder &amp; Exegete
            </span>
            <h3 className="font-serif text-xl font-bold text-white">Solat Nadeem</h3>
            <p className="text-xs text-white/70 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Karachi, Pakistan &bull; Saul's Podship Scriptorium
            </p>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light max-w-lg mx-auto">
            Dedicated to equipping the global Church with historically grounded, theologically rigorous, and visually rich biblical scholarship.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ManuscriptAnalysis;
