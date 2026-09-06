/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FDFBF7]">
      <section className="bg-[#1A0812] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#D4AF37] text-[#1A0812]">
            <ShieldCheck className="w-4 h-4" />
            Compliance &amp; Data Rights
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-white/70">Last Updated: September 6, 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-gray-800">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#4A152C]">1. Introduction &amp; Scope</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Saul's Podship ("we", "our", or "us") operates https://www.saulspodship.com as a free public theological scriptorium and educational encyclopedia. We are committed to transparency and respect for user privacy.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#4A152C]">2. Information Collection</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We do not require user accounts or personal registration to read our 50 encyclopedia volumes or listen to audio podcasts. We only collect information voluntarily submitted via our contact or newsletter forms.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#4A152C]">3. Cookies &amp; Advertising Partners</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            We may partner with third-party advertising networks like Google AdSense. Third parties may use cookies, web beacons, and similar technologies to serve non-intrusive ads based on prior visits. Users may manage cookie preferences via browser settings or Google Ad Settings.
          </p>

          <h2 className="font-serif text-xl font-bold text-[#4A152C]">4. Contact Us</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            For privacy inquiries or data removal requests, please reach out via our contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
