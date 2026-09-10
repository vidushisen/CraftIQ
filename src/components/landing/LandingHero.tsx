import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import {
  Sparkles,
  Camera,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Feather,
  Globe2,
  Users
} from 'lucide-react';

interface LandingHeroProps {
  onStartArtisan: () => void;
  onExploreBuyer: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartArtisan, onExploreBuyer }) => {
  const { isHindi } = useLanguage();
  const { setIsScanModalOpen } = useAppData();

  return (
    <div className="relative pt-6 pb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-craft-terracotta text-xs font-bold border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-craft-terracotta animate-pulse" />
            <span>
              {isHindi
                ? 'AI स्मार्ट कैटलॉगिंग एवं डायरेक्ट बाज़ार लिंकेज'
                : 'AI Smart Cataloging & Direct Market Linkage'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-craft-earth font-display leading-[1.15] tracking-tight">
            {isHindi ? (
              <>
                भारत का हुनर। <br />
                <span className="text-craft-terracotta">उनका कौशल।</span> <br />
                एक बड़ा वैश्विक बाज़ार।
              </>
            ) : (
              <>
                India\'s Craft. <br />
                <span className="text-craft-terracotta">Their Sacred Skill.</span> <br />
                A Bigger Global Market.
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 font-serif leading-relaxed max-w-xl">
            {isHindi
              ? 'हाशिए पर मौजूद ग्रामीण शिल्पकारों को डिजिटल कैटलॉग, उचित मूल्य निर्धारण और उपयुक्त खरीदारों से जोड़ने वाला मोबाइल-फर्स्ट AI डिजिटल सेतु।'
              : 'AI-powered automated cataloging and market discovery designed to help indigenous artisans turn traditional craftsmanship into dignified, high-value digital opportunities.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartArtisan}
              className="flex items-center gap-2 bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-warm transition-transform active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>{isHindi ? 'कारीगर के रूप में शुरू करें' : 'Start as Artisan (📸 Scan)'}</span>
            </button>

            <button
              type="button"
              onClick={onExploreBuyer}
              className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border-2 border-stone-200 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-craft-terracotta" />
              <span>{isHindi ? 'शिल्प बाज़ार देखें' : 'Explore Indian Crafts'}</span>
            </button>
          </div>

          {/* Value Badges */}
          <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-2 text-stone-600 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isHindi ? 'शून्य बिचौलिया' : 'Zero Middleman'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Globe2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{isHindi ? 'द्विभाषी वॉयस' : 'Bilingual Voice'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Feather className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isHindi ? '100% प्रामाणिक' : '100% Authentic'}</span>
            </div>
          </div>
        </div>

        {/* Right Visual Interactive Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 shadow-craft-lg space-y-4 relative group">
            
            {/* Live Scan Preview Floating Badge */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80"
                alt="Jaipur Blue Pottery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isHindi ? 'AI विज़न द्वारा स्वतः पहचाना गया' : 'AI Vision Auto-Cataloged'}</span>
                </div>
                <div className="text-sm font-bold truncate">
                  Handcrafted Jaipur Blue Pottery Bowl
                </div>
              </div>
            </div>

            {/* AI Generated Attributes Breakdown */}
            <div className="space-y-2 bg-craft-cream p-3 rounded-2xl border border-stone-200 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-semibold">{isHindi ? 'सुझाया गया उचित मूल्य:' : 'Fair Price Bracket:'}</span>
                <span className="font-extrabold text-craft-terracotta">₹1,100 – ₹1,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-semibold">{isHindi ? 'शीर्ष मार्केट मैच:' : 'Top Market Match:'}</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">94% Home Décor Boutiques</span>
              </div>
            </div>

            <button
              onClick={() => setIsScanModalOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 rounded-2xl text-xs shadow-warm flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Camera className="w-4 h-4" />
              <span>{isHindi ? 'स्वयं आज़माएं: 1-क्लिक AI स्कैन' : 'Try Demo: 1-Click AI Scan & Create'}</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
