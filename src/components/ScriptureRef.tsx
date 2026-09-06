/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ScriptureRefProps {
  reference: string;
  className?: string;
  version?: string;
  children?: React.ReactNode;
}

// Regex matching common biblical book citations
const BIBLE_BOOKS = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
  '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job',
  'Psalms?', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Song of Songs',
  'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea',
  'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
  '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
  'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
  'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
].join('|');

export const SCRIPTURE_REGEX = new RegExp(
  `\\b(?:(?:1|2|3)\\s)?(?:${BIBLE_BOOKS})\\s\\d{1,3}(?::\\d{1,3}(?:[–\\-]\\d{1,3})?)?(?:,\\s?\\d{1,3}(?:[–\\-]\\d{1,3})?)*\\b`,
  'gi'
);

export const ScriptureRef: React.FC<ScriptureRefProps> = ({
  reference,
  className = '',
  version = 'NIV',
  children
}) => {
  const cleanRef = reference.replace(/[[\]*]/g, '').trim();
  const url = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(cleanRef)}&version=${encodeURIComponent(version)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Read ${cleanRef} on BibleGateway (${version})`}
      className={`text-[#D4AF37] hover:text-[#E8C96A] underline decoration-dotted underline-offset-4 font-semibold inline-flex items-center gap-1 transition-colors ${className}`}
    >
      <span>{children || cleanRef}</span>
      <ExternalLink className="w-3 h-3 inline opacity-70" />
    </a>
  );
};

// Helper that replaces text occurrences of scriptures with ScriptureRef
export const renderWithScriptureLinks = (text: string, version: string = 'NIV'): React.ReactNode => {
  if (!text) return text;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(SCRIPTURE_REGEX.source, 'gi');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const citation = match[0];
    parts.push(
      <ScriptureRef key={`${match.index}-${citation}`} reference={citation} version={version} />
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

export default ScriptureRef;
