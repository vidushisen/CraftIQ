import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Heart, ShieldCheck, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-craft-earth text-stone-300 pt-12 pb-24 md:pb-12 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-craft-terracotta flex items-center justify-center text-white font-bold">
                श
              </div>
              <span className="text-xl font-bold text-craft-cream font-display">
                Craft<span className="text-amber-400">IQ</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-300">
                {isHindi ? 'कारीगरसेतु' : 'KarigarSetu'}
              </span>
            </div>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed font-serif">
              {isHindi
                ? 'भारत के दूर-दराज और ग्रामीण कारीगरों को AI विज़न, बहुभाषी वॉयस और स्मार्ट मार्केट लिंकेज से डिजिटल पहचान और वैश्विक अवसर प्रदान करने का राष्ट्रव्यापी मिशन।'
                : 'Empowering India\'s indigenous artisans with AI-driven automated cataloging, fair price discovery, bilingual voice interfaces, and high-value market linkage.'}
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? '100% प्रामाणिक भारतीय हस्तशिल्प और कारीगर कल्याण' : '100% Authentic Indian Craft Heritage & Artisan Upliftment'}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              {isHindi ? 'आधिकारिक सरकारी लिंक' : 'Official Ecosystem Links'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  PM Vishwakarma Portal <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://handicrafts.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  DC (Handicrafts) Textiles <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://gem.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  GeM Artisan Onboarding <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
              <li>
                <a href="https://www.indiatradefair.com" target="_blank" rel="noreferrer" className="hover:text-amber-200 flex items-center gap-1 transition-colors">
                  ODOP Initiative (DPIIT) <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
              {isHindi ? 'हैकाथॉन विज़न' : 'Hackathon Problem Scope'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {isHindi
                ? 'यह केवल एक ई-कॉमर्स वेबसाइट नहीं है, बल्कि हाशिए पर मौजूद कारीगरों के लिए डिजिटल असमानता को पाटने वाला AI ब्रिज है।'
                : 'Not just an e-commerce storefront, but an AI digital bridge solving discoverability, language barriers, and fair price realization for rural artisans.'}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for India\'s master artisans • CraftIQ (KarigarSetu)</span>
          </div>
          <div>
            <span>MIT Licensed • Ready for Cloud Vision & Gemini API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
