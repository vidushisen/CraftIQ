import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export const ArtisanSimpleMode: React.FC<{ onOpenScan: () => void; onOpenFairPrice: () => void; onOpenInquiries: () => void }> = ({ onOpenScan, onOpenFairPrice, onOpenInquiries }) => {
  const { activeArtisan } = useAuth();
  const { t, isHindi } = useLanguage();
  const { inquiries, products } = useAppData();

  const artisanProducts = products.filter(p => p.artisanId === activeArtisan.id);
  const artisanInquiries = inquiries.filter(i => i.artisanId === activeArtisan.id);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 via-craft-terracotta to-orange-700 text-white rounded-3xl p-6 shadow-craft-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={activeArtisan.avatar}
              alt={activeArtisan.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
            />
            <div>
              <div className="text-xs font-semibold text-amber-200 tracking-wider">
                {isHindi ? 'नमस्ते एवं स्वागत है' : 'Welcome Master Artisan'}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display">
                {isHindi ? activeArtisan.nameHi : activeArtisan.name}
              </h2>
              <div className="text-xs text-white/90 flex items-center gap-2 mt-0.5">
                <span>{isHindi ? activeArtisan.craftTypeHi : activeArtisan.craftType}</span>
                <span>•</span>
                <span>{isHindi ? activeArtisan.regionHi : activeArtisan.region}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-amber-200" />
            <span>{isHindi ? 'सत्यापित शिल्पकार' : 'Verified Craftsman'}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
          {isHindi ? '👇 आप क्या करना चाहते हैं?' : '👇 What would you like to do?'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={onOpenScan}
            className="p-5 rounded-2xl bg-white hover:bg-orange-50/50 border-2 border-craft-terracotta/30 hover:border-craft-terracotta text-left shadow-craft flex items-start gap-4 transition-all transform active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-craft-terracotta text-white flex items-center justify-center text-2xl shadow-warm group-hover:scale-110 transition-transform shrink-0">
              📸
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold text-craft-earth font-display">
                {t.simpleAddProduct}
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {isHindi ? 'फोटो खींचें, AI अपने आप कैटलॉग बना देगा।' : 'Snap a craft photo to auto-generate a digital catalog card.'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-400 self-center" />
          </button>

          <button
            onClick={onOpenFairPrice}
            className="p-5 rounded-2xl bg-white hover:bg-amber-50/50 border-2 border-amber-300 hover:border-amber-500 text-left shadow-craft flex items-start gap-4 transition-all transform active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-warm group-hover:scale-110 transition-transform shrink-0">
              💰
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold text-craft-earth font-display">
                {t.simpleFairPrice}
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {isHindi ? 'सामग्री और श्रम समय के अनुसार सही दाम जानें।' : 'Calculate fair selling prices based on raw material & crafting hours.'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-400 self-center" />
          </button>

          <button
            onClick={onOpenInquiries}
            className="p-5 rounded-2xl bg-white hover:bg-emerald-50/50 border-2 border-emerald-300 hover:border-emerald-500 text-left shadow-craft flex items-start gap-4 transition-all transform active:scale-98 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-warm group-hover:scale-110 transition-transform shrink-0 relative">
              📬
              {artisanInquiries.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {artisanInquiries.length}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold text-craft-earth font-display">
                {t.simpleMyOrders} ({artisanInquiries.length})
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {isHindi ? 'खरीदारों के संदेश और ऑर्डर मांग देखें।' : 'View buyer messages and purchase inquiries.'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-400 self-center" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {isHindi ? '📦 मेरे कैटलॉग उत्पाद' : '📦 My Active Listed Crafts'} ({artisanProducts.length})
          </h3>
          <button onClick={onOpenScan} className="text-xs font-bold text-craft-terracotta hover:underline">
            + {isHindi ? 'नया जोड़ें' : 'Add New'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {artisanProducts.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex items-center gap-3 p-3">
              <img src={prod.images[0]} alt={prod.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-stone-900 truncate">{isHindi ? prod.titleHi : prod.title}</h4>
                <div className="text-xs font-bold text-craft-terracotta mt-0.5">₹{prod.price}</div>
                <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-1">
                  <span>👀 {prod.views} {isHindi ? 'व्यूज' : 'views'}</span>
                  <span>•</span>
                  <span>📬 {prod.inquiriesCount} {isHindi ? 'पूछताछ' : 'inquiries'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
