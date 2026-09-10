import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const SavedProductsView: React.FC = () => {
  const { products, savedProductIds, toggleSaveProduct, setSelectedProductForDetail, setSelectedProductForInquiry } = useAppData();
  const { isHindi } = useLanguage();

  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-3 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
          <Heart className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900 font-display">
          {isHindi ? 'आपकी विशलिस्ट खाली है' : 'Your Wishlist is Empty'}
        </h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
          {isHindi
            ? 'कारीगरों के प्रामाणिक शिल्पों को ब्राउज़ करते समय दिल के आइकन पर क्लिक करके उन्हें यहां सहेजें।'
            : 'Explore traditional crafts and tap the heart icon on any card to save your favorite heritage pieces.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-craft-earth font-display">
          {isHindi ? '❤️ सहेजे गए पसंदीदा शिल्प' : '❤️ Saved Heritage Crafts'} ({savedProducts.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-craft transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => toggleSaveProduct(prod.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-xs"
                >
                  <Heart className="w-4 h-4 fill-rose-600" />
                </button>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="text-[10px] font-bold text-craft-terracotta uppercase">
                  {isHindi ? prod.craftTypeHi : prod.craftType}
                </div>
                <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                  {isHindi ? prod.titleHi : prod.title}
                </h4>
                <div className="text-xs font-extrabold text-craft-earth">
                  ₹{prod.price}
                </div>
                <div className="text-[11px] text-stone-500">
                  {isHindi ? 'कारीगर: ' : 'By: '}{prod.artisanName} ({prod.artisanRegion})
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedProductForDetail(prod)}
                className="flex-1 text-center py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
              >
                {isHindi ? 'विवरण' : 'Details'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedProductForInquiry(prod)}
                className="flex-1 text-center py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
              >
                {isHindi ? 'संपर्क करें' : 'Inquire'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
