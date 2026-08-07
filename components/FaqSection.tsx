import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  themeStyles: {
    bg: string;
    text: string;
    card: string;
    border: string;
  };
  currentView?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ themeStyles, currentView = 'landing' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "What is Saul's Podship and what is its primary goal?",
      answer: "Saul's Podship is an interactive theological research archive and digital ministry project led by Solat Nadeem. By combining robust historical-grammatical hermeneutics, immersive timelines, graphic lineages, and narrative audio, we make complex biblical scholarship accessible, engaging, and spiritually transformative for a modern digital generation."
    },
    {
      question: "How do I navigate and study the 46 Volumes of Saul's Podship Encyclopedia?",
      answer: "The library is structured into 46 distinct scholarly chapters mapping key biblical eras, original Hebrew covenants, and prophecies. To begin studying, click 'Access The Library' on the landing page, choose a active Volume card, and adjust your personal Scholar settings (such as Ivory/Sepia/Midnight, font size, and serif legibility) from the preferences drawer. Each volume features detailed timelines, maps, and scholarly analyses."
    },
    {
      question: "What is the meaning and purpose of the 'Electric Border' interactive effect?",
      answer: "The 'Electric Border' is an visual cues model representing the living, active, and glowing power of the Word of God ('For the word of God is alive and active...'). When your cursor hovers over premium cards and core buttons, a custom-drawn canvas-based dynamic plasma glow activates around that card, tracing chaotic and beautiful paths of amber-crimson light based on custom noise coordinate maps."
    },
    {
      question: "Does the encyclopedia integrate academic hermeneutic standards?",
      answer: "Yes, absolutely. Our research team adheres rigidly to the historical-grammatical method of scriptural hermeneutics. We cross-examine original manuscript records (Masoretic Hebrew texts, Codex Vaticanus, Septuagint) with relevant archaeological discoveries (e.g., Dead Sea Scrolls) to build an objective commentaries framework, totally free of modern speculative biases."
    },
    {
      question: "How can I listen to the podcasts, listen to the Zaboor, or partner with the ministry?",
      answer: "All primary resources—including our podcast episodes, traditional Punjabi Zaboor arrangements (set to classical South Asian Raags), and modern choral hymns—are embedded directly on the homepage. You can support the continuous publication of these free scholarly structures by visiting our Patreon portal or volunteering for the ministry."
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-12 py-16">
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-2">Reference Desk</span>
        <h3 className="text-4xl md:text-5xl font-serif-heading font-black uppercase tracking-tighter">Frequently Asked Questions</h3>
        <p className="text-xs opacity-60 mt-2 font-serif-heading italic max-w-lg mx-auto">Instant expert answers regarding the ministry, scientific analysis, and interactive features.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div key={idx} className="cursor-pointer transition-all duration-300">
              <ElectricBorder
                color="#D4AF37"
                speed={0.8}
                chaos={0.08}
                borderRadius={20}
                className="w-full"
              >
                <div 
                  onClick={() => toggleExpand(idx)}
                  className="p-6 md:p-8 rounded-[1.25rem] border text-left flex flex-col transition-colors duration-300"
                  style={{ 
                    backgroundColor: currentView === 'encyclopedia' ? themeStyles.card : '#ffffff', 
                    borderColor: isExpanded ? '#D4AF37' : (currentView === 'encyclopedia' ? themeStyles.border : 'rgba(74, 21, 44, 0.1)') 
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#4a152c] flex items-center justify-center text-[#D4AF37] shrink-0">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif-heading font-black text-sm md:text-md uppercase tracking-tight text-[#D4AF37] line-clamp-2 md:line-clamp-none">
                        {faq.question}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[#D4AF37] shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-dashed" style={{ borderColor: currentView === 'encyclopedia' ? themeStyles.border : 'rgba(74, 21, 44, 0.1)' }}>
                          <p className="text-xs md:text-sm leading-relaxed" style={{ color: currentView === 'encyclopedia' ? themeStyles.text : '#1D2D50' }}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ElectricBorder>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
