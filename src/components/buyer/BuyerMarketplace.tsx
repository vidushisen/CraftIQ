import React, { useState, useMemo } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { parseNaturalSearchQuery } from '../../utils/helpers';
import { CraftBadge } from '../common/Badge';
import { ProductItem } from '../../types';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Heart,
  Eye,
  Send,
  MapPin,
  Filter,
  CheckCircle2,
  HelpCircle,
  X
} from 'lucide-react';

export const BuyerMarketplace: React.FC = () => {
  const { products, setSelectedProductForDetail, setSelectedProductForInquiry, toggleSaveProduct, isProductSaved } = useAppData();
  const { t, isHindi } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Extract unique crafts and states from products
  const craftCategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.craftType));
    return Array.from(set);
  }, [products]);

  const stateList = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.state));
    return Array.from(set);
  }, [products]);

  // Natural language query processing + multidimensional filters
  const filteredProducts = useMemo(() => {
    let result = parseNaturalSearchQuery(searchQuery, products);

    if (selectedCraft !== 'all') {
      result = result.filter(p => p.craftType === selectedCraft);
    }

    if (selectedState !== 'all') {
      result = result.filter(p => p.state === selectedState);
    }

    if (maxPrice < 10000) {
      result = result.filter(p => p.price <= maxPrice);
    }

    return result;
  }, [searchQuery, products, selectedCraft, selectedState, maxPrice]);

  const sampleSearchQueries = isHindi
    ? [
        '₹1500 के अंदर पारंपरिक उपहार',
        'राजस्थान की ब्लू पॉटरी',
        'बिहार की मधुबनी पेंटिंग',
        'कच्छ का हस्तनिर्मित बैग'
      ]
    : [
        'Traditional gifts under ₹1500',
        'Blue pottery Rajasthan',
        'Madhubani wall art Bihar',
        'Handmade tote bag Kutch'
      ];

  return (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <div className="bg-gradient-to-r from-stone-900 via-craft-earth to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-craft-lg">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-xs font-extrabold uppercase">
              {isHindi ? 'प्रामाणिक कारीगर बाज़ार' : 'Artisan Discovery Market'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
            {isHindi
              ? 'सीधे भारत के मास्टर कारीगरों से हस्तशिल्प खोजें'
              : 'Discover Authentic Handcrafted Treasures from Village Masters'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {isHindi
              ? 'बिना किसी बिचौलिए के सीधे शिल्पकारों से जुड़ें। हर उत्पाद के पीछे एक जीवित भारतीय परंपरा है।'
              : 'Direct market linkage connecting conscious consumers with indigenous rural artisans with zero intermediary margins.'}
          </p>
        </div>

        {/* Natural Language AI Search Bar */}
        <div className="mt-6">
          <div className="relative flex items-center bg-white rounded-2xl shadow-craft-lg overflow-hidden p-1.5">
            <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full text-xs sm:text-sm p-2.5 bg-transparent text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-stone-400 hover:text-stone-600 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Natural Query Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs">
            <span className="text-amber-200/80 text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {isHindi ? 'त्वरित खोज:' : 'Try asking:'}
            </span>
            {sampleSearchQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(q)}
                className="bg-white/15 hover:bg-white/25 text-white text-[11px] px-2.5 py-1 rounded-full border border-white/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-stone-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-craft-terracotta" />
              {isHindi ? 'फ़िल्टर:' : 'Filters:'}
            </span>

            {/* Craft Type Select */}
            <select
              value={selectedCraft}
              onChange={(e) => setSelectedCraft(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-800"
            >
              <option value="all">{isHindi ? 'सभी शिल्प (Crafts)' : 'All Craft Forms'}</option>
              {craftCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* State Select */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-stone-300 bg-stone-50 text-stone-800"
            >
              <option value="all">{isHindi ? 'सभी राज्य (States)' : 'All Regions & States'}</option>
              {stateList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 text-xs">
              {isHindi ? 'अधिकतम मूल्य:' : 'Max Price:'} <strong>₹{maxPrice}</strong>
            </span>
            <input
              type="range"
              min="500"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 sm:w-32 accent-craft-terracotta"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {isHindi ? 'प्रामाणिक उत्पाद' : 'Handcrafted Heritage Pieces'} ({filteredProducts.length})
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
            <Search className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-sm font-bold text-stone-800">
              {isHindi ? 'कोई उत्पाद नहीं मिला' : 'No matching crafts found'}
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {isHindi ? 'कृपया अपनी खोज या फ़िल्टर बदलकर पुनः प्रयास करें।' : 'Try resetting your search query or price bracket.'}
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCraft('all'); setSelectedState('all'); setMaxPrice(10000); }}
              className="text-xs font-bold text-craft-terracotta hover:underline"
            >
              {isHindi ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((prod) => {
              const isSaved = isProductSaved(prod.id);

              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-craft hover:shadow-craft-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                          {isHindi ? prod.craftTypeHi : prod.craftType}
                        </span>
                      </div>

                      {/* Heart Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProduct(prod.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-600 transition-colors shadow-sm"
                        aria-label="Save product"
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-600 fill-rose-600' : ''}`} />
                      </button>

                      {/* State Location Tag */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-stone-900/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md">
                        <MapPin className="w-3 h-3 text-amber-300" />
                        <span>{prod.state}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-craft-terracotta">
                          {prod.category}
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                          ✓ {isHindi ? '100% हस्तनिर्मित' : '100% Handmade'}
                        </span>
                      </div>

                      <h3
                        onClick={() => setSelectedProductForDetail(prod)}
                        className="text-sm font-bold text-stone-900 group-hover:text-craft-terracotta transition-colors leading-snug cursor-pointer line-clamp-1 font-display"
                      >
                        {isHindi ? prod.titleHi : prod.title}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-serif">
                        {isHindi ? prod.simpleDescriptionHi : prod.simpleDescription}
                      </p>

                      {/* Artisan Provenance Tag */}
                      <div className="pt-1 flex items-center gap-2 text-xs text-stone-600 border-t border-stone-100">
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                          श
                        </div>
                        <span className="truncate">
                          {isHindi ? 'कारीगर: ' : 'Artisan: '}<strong>{prod.artisanName}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-base font-extrabold text-craft-terracotta font-display">
                        ₹{prod.price}
                      </div>
                      <span className="text-[10px] text-stone-400 block">
                        {isHindi ? 'सीधा मूल्य' : 'Artisan Price'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProductForDetail(prod)}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-800 transition-colors"
                      >
                        {isHindi ? 'विवरण' : 'Details'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProductForInquiry(prod)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-warm transition-transform active:scale-95"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isHindi ? 'संपर्क करें' : 'Inquire'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
