import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { storageService } from '../../services/storageService';
import { Modal } from '../common/Modal';
import { CraftBadge } from '../common/Badge';
import {
  Heart,
  Share2,
  Sparkles,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  Feather,
  Award,
  Layers
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    setSelectedProductForInquiry,
    toggleSaveProduct,
    isProductSaved,
    showToast
  } = useAppData();
  const { isHindi } = useLanguage();

  if (!selectedProductForDetail) return null;

  const prod = selectedProductForDetail;
  const isSaved = isProductSaved(prod.id);

  // Increment views on modal open
  storageService.incrementProductViews(prod.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: isHindi ? prod.titleHi : prod.title,
        text: isHindi ? prod.simpleDescriptionHi : prod.simpleDescription,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        type: 'info',
        title: isHindi ? 'लिंक कॉपी हो गया!' : 'Link Copied!',
        message: isHindi ? 'उत्पाद लिंक क्लिपबोर्ड पर कॉपी किया गया।' : 'Product URL copied to clipboard.'
      });
    }
  };

  return (
    <Modal
      isOpen={!!selectedProductForDetail}
      onClose={() => setSelectedProductForDetail(null)}
      title={isHindi ? prod.titleHi : prod.title}
      subtitle={`${prod.craftType} • ${prod.artisanRegion}`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm relative group">
              <img
                src={prod.images[0]}
                alt={prod.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => toggleSaveProduct(prod.id)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-600 hover:text-rose-600 transition-colors shadow-sm"
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'text-rose-600 fill-rose-600' : ''}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <CraftBadge type="handmade" />
              <CraftBadge type="traditional" />
              <CraftBadge type="verified" />
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-black text-craft-terracotta font-display">
                    ₹{prod.price}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {isHindi ? 'सीधे कारीगर द्वारा निर्धारित मूल्य' : 'Direct Artisan-Set Price (Zero Middleman)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'शेयर' : 'Share'}</span>
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {isHindi ? 'विवरण' : 'Product Description'}
                </h4>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  {isHindi ? prod.detailedDescriptionHi : prod.detailedDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {isHindi ? 'प्रयुक्त सामग्री' : 'Materials & Natural Ingredients'}
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(isHindi ? prod.materialHi : prod.material).map((mat, i) => (
                    <span
                      key={i}
                      className="text-[11px] bg-amber-50 text-craft-clay border border-amber-200 px-2 py-0.5 rounded-lg"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-600 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-craft-terracotta" />
                  <strong>{isHindi ? 'निर्माण समय:' : 'Lead Time:'}</strong> {prod.makingTimeDays} {isHindi ? 'दिन' : 'days'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-craft-terracotta" />
                  <span>{prod.state}</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedProductForInquiry(prod);
                  setSelectedProductForDetail(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{isHindi ? 'कारीगर से संपर्क करें / खरीदें' : 'Connect with Artisan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Artisan Story Section */}
        <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                श
              </div>
              <div>
                <h4 className="text-sm font-bold text-craft-earth font-display">
                  {isHindi ? 'कारीगर से मिलें: ' : 'Meet the Artisan: '}{prod.artisanName}
                </h4>
                <div className="text-[11px] text-stone-500">
                  {prod.artisanRegion} • {isHindi ? 'सत्यापित विरासत शिल्पकार' : 'Verified Heritage Craftsman'}
                </div>
              </div>
            </div>
            <CraftBadge type="verified" size="sm" />
          </div>

          <p className="text-xs text-stone-700 leading-relaxed font-serif bg-white p-3 rounded-xl border border-amber-100">
            {isHindi ? prod.craftStoryHi : prod.craftStory}
          </p>
        </div>

        {/* AI Market Match Insights */}
        {prod.marketMatches && prod.marketMatches.length > 0 && (
          <div className="bg-orange-50/60 rounded-2xl p-4 border border-orange-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-craft-earth">
              <Sparkles className="w-4 h-4 text-craft-terracotta" />
              <span>{isHindi ? '🎯 AI बाज़ार मेल विश्लेषण (AI Market Match)' : '🎯 AI Market Match Affinity'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prod.marketMatches.map((m, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-orange-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span>{isHindi ? m.segmentNameHi : m.segmentName}</span>
                    <span className="text-craft-terracotta">{m.matchPercentage}%</span>
                  </div>
                  <p className="text-[11px] text-stone-600 font-serif leading-relaxed">
                    {isHindi ? m.reasonHi : m.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
