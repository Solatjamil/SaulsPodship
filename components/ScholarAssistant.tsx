
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, BookOpen, Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Lightweight catalogue (title/overview only) — keeps the 51 volume bodies out of the home-page bundle.
import { VOLUME_INDEX as CATEGORIES } from "../src/data/volumes/index-lite";
import { ChatMessage } from '../types';

const ScholarAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Peace be with you. I am your local Scholar Assistant. I can help you navigate the ${CATEGORIES.length} volumes of this library. What topic are you looking for today?` }
  ]);
  const [input, setInput] = useState('');
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const threshold = window.innerHeight * 0.7;
        setScrolledPastHero(window.scrollY > threshold);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage: ChatMessage = { role: 'user', text: userText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Local Search Logic
    setTimeout(() => {
      const query = userText.toLowerCase();
      const results = CATEGORIES.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.overview.toLowerCase().includes(query)
      );

      let responseText = "";
      if (results.length > 0) {
        responseText = `I found ${results.length} related volume(s) in our archive:\n\n` + 
          results.slice(0, 3).map(r => `• Volume ${r.id}: ${r.title}`).join('\n') +
          (results.length > 3 ? `\n...and ${results.length - 3} more.` : "") +
          `\n\nClick on a card in the main grid to explore the full analysis.`;
      } else if (query.includes("help") || query.includes("how")) {
        responseText = `You can browse the ${CATEGORIES.length} volumes by scrolling through the main library grid. Each volume contains data tables, visual story panels, and a full theological narrative summary.`;
      } else {
        responseText = "I couldn't find a specific volume for that query. Try searching for 'Prophecy', 'Jesus', 'Revelation', or 'Creation'.";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    }, 300);
  };

  return (
    <div className={`fixed bottom-[calc(72px+env(safe-area-inset-bottom))] right-4 lg:bottom-8 lg:right-8 z-[100] flex flex-col items-end transition-all duration-300 ${
      scrolledPastHero
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 translate-y-4 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto'
    }`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-96 bg-[#F8F4E3] border-2 border-[#1D2D50] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
          >
            {/* Header */}
            <div className="bg-[#1D2D50] p-4 flex justify-between items-center border-b border-[#D4AF37]/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-inner">
                  <BookOpen className="w-4 h-4 text-[#1D2D50]" />
                </div>
                <div>
                  <h3 className="font-serif-heading font-bold text-white text-sm tracking-widest leading-none">SCHOLAR ASSISTANT</h3>
                  <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest opacity-80">Local Guide</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth bg-[#F8F4E3] custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#1D2D50] text-white rounded-tr-none'
                        : 'bg-white text-[#1D2D50] rounded-tl-none border border-[#D4AF37]/20'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div className="h-2" />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#1D2D50]/10 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#F8F4E3] text-[#1D2D50] placeholder-[#1D2D50]/30 text-sm focus:outline-none border border-[#D4AF37]/40 rounded-xl px-4 py-2.5 transition-colors focus:border-[#1D2D50]"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-[#1D2D50] p-3 rounded-xl hover:bg-[#2a406b] transition-all shadow-lg disabled:opacity-30 disabled:shadow-none group"
                >
                  <Search className={`w-4 h-4 text-[#D4AF37] ${input.trim() ? 'group-hover:scale-110' : ''} transition-transform`} />
                </button>
              </div>
              <div className="mt-2 text-[8px] text-center uppercase tracking-widest text-[#1D2D50]/40 font-bold flex items-center justify-center gap-1">
                <Info className="w-2 h-2" /> Offline Knowledge Base
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1D2D50] flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] border-2 border-[#D4AF37] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 md:w-7 md:h-7 text-[#D4AF37]" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-[#D4AF37]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ScholarAssistant;
