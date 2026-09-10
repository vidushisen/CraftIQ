import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { ArrowRight, MapPin, Feather, Sparkles } from 'lucide-react';

export const CraftShowcaseSection: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { products, setSelectedProductForDetail } = useAppData();
  const { isHindi } = useLanguage();

  const showcaseItems = products.slice(0, 3);

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-craft-terracotta">
            {isHindi ? 'भारतीय हस्तशिल्प धरोहर' : 'Curated Heritage Discovery'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-craft-earth font-display">
            {isHindi ? 'हाल ही में AI द्वारा सूचीबद्ध शिल्प' : 'Recently Digitized Artisan Crafts'}
          </h2>
        </div>
        <button
          onClick={onExplore}
          className="flex items-center gap-1.5 text-xs font-bold text-craft-terracotta hover:text-craft-terracottaDark"
        >
          <span>{isHindi ? 'पूरा बाज़ार देखें' : 'View Full Marketplace'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {showcaseItems.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setSelectedProductForDetail(prod)}
            className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-craft hover:shadow-craft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-bold">
                  {isHindi ? prod.craftTypeHi : prod.craftType}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-stone-900/70 text-white text-[10px] px-2 py-0.5 rounded-md">
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span>{prod.state}</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-craft-terracotta transition-colors line-clamp-1 font-display">
                  {isHindi ? prod.titleHi : prod.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-serif">
                  {isHindi ? prod.simpleDescriptionHi : prod.simpleDescription}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-sm font-extrabold text-craft-terracotta font-display">
                  ₹{prod.price}
                </span>
                <span className="text-[10px] text-stone-400 block">
                  {isHindi ? 'कारीगर: ' : 'By: '}{prod.artisanName}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                {isHindi ? 'देखें →' : 'View Craft →'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
