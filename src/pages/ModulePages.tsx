/**
 * Routed home pages for the standalone interactive modules.
 * Each gives a module its own page identity (URL, title, hero band) inside the
 * shared site chrome (RootLayout header/footer), embedding the verified static
 * module document in an iframe — same isolation pattern as /comparative-apologetics.
 */
import React, { useEffect } from 'react';

interface ModuleMeta {
  kicker: string;
  title: string;
  blurb: string;
  src: string;
}

const makeModulePage = (meta: ModuleMeta): React.FC => {
  const Page: React.FC = () => {
    useEffect(() => {
      document.title = `${meta.title} | Saul's Podship`;
    }, [meta.title]);
    return (
      <div className="w-full">
        <section className="py-14 bg-[#1A0812] text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
              {meta.kicker}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:5xl font-bold tracking-tight text-white mt-4">
              {meta.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mt-3 font-light">
              {meta.blurb}
            </p>
          </div>
        </section>
        <section className="py-10 bg-[#F8F4E3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white">
              <iframe
                src={meta.src}
                title={`${meta.title} — interactive module`}
                loading="lazy"
                className="w-full h-[80vh] min-h-[560px] md:h-[820px] border-0 block"
              />
            </div>
          </div>
        </section>
      </div>
    );
  };
  return Page;
};

export const ProphecyMapPage = makeModulePage({
  kicker: 'A Saul\u2019s Podship Study \u00b7 Prophetic Fulfilment Atlas',
  title: 'The Biblical Prophecy Map',
  blurb: '247 biblical prophecies \u2014 107 fulfilled, 88 in part, 52 still awaiting \u2014 woven together by 1,063 cross-references on a rotatable 3D globe. Every thread opens the passage on bible.com.',
  src: '/prophecy-map.html',
});

export const KingsOfTheBiblePage = makeModulePage({
  kicker: 'A Saul\u2019s Podship Study \u00b7 Royal Chronology',
  title: 'Kings of the Bible \u2014 The Throne Line',
  blurb: 'Every throne from Saul to the Herods in canonical order \u2014 reign lengths, synchronisms, wars and prophetic witness charted line by line.',
  src: '/kings-of-the-bible.html',
});

export const CrossReferencesPage = makeModulePage({
  kicker: 'A Saul\u2019s Podship Study \u00b7 Visual Concordance',
  title: 'The Interlinked Bible \u2014 344,799 Threads',
  blurb: 'Every cross-reference in Scripture woven into one interactive horseshoe: 66 books, 1,189 chapters, 190,758 chapter-to-chapter links, with KJV drill-down and the OT \u2192 NT scarlet thread.',
  src: '/cross-references/index.html',
});
