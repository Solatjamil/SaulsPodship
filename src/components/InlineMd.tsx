/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { renderWithScriptureLinks } from './ScriptureRef';

/**
 * InlineMd — minimal, safe inline-markdown renderer for plain-text fields
 * (table cells, timeline events, scripture texts, story panel blurbs).
 *
 * Renders [label](url) as real links, **bold** as <strong>, *italics* as
 * <em> — so literal asterisks, brackets and URLs never surface as UI text.
 * Falls back to plain text for anything it cannot parse; never injects HTML.
 */

const TOKEN = /(\[[^\]]{1,120}\]\((?:https?:\/\/[^)\s]+)\)|\*\*[^*]{1,200}\*\*|\*[^*\n]{1,160}\*)/g;

const isSafeUrl = (u: string) => /^https?:\/\/[^\s"'<>]+$/i.test(u);

export const InlineMd: React.FC<{ text: string; linkClassName?: string }> = ({
  text,
  linkClassName = 'text-[#8B1C2E] hover:text-[#4A152C] font-semibold underline decoration-[#D4AF37]/60 underline-offset-2'
}) => {
  if (!text) return null;

  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  const src = String(text);
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(src)) !== null) {
    if (m.index > last) nodes.push(src.slice(last, m.index));
    const tok = m[0];
    const link = tok.match(/^\[([^\]]+)\]\((\S+)\)$/);
    if (link && isSafeUrl(link[2])) {
      nodes.push(
        <a key={key++} href={link[2]} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {link[1]}
        </a>
      );
    } else if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>);
    } else {
      nodes.push(tok);
    }
    last = m.index + tok.length;
  }
  if (last < src.length) nodes.push(src.slice(last));

  // Any plain-text segments still get automatic scripture deep-links.
  return (
    <>
      {nodes.map((n, i) =>
        typeof n === 'string' ? <React.Fragment key={i}>{renderWithScriptureLinks(n)}</React.Fragment> : n
      )}
    </>
  );
};

export default InlineMd;
