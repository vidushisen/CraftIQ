import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { aiService } from '../../services/aiService';
import { ProductItem, AiCatalogGenerationResult } from '../../types';
import { Modal } from '../common/Modal';
import { VoiceProductInput } from './VoiceProductInput';
import { CraftBadge } from '../common/Badge';
import { Upload, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_CRAFT_PRESETS = [
  { name: 'Jaipur Blue Pottery', nameHi: 'जयपुरी ब्लू पॉटरी', imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80', approxPrice: 1250, hint: 'blue pottery ceramic bowl jaipur floral' },
  { name: 'Madhubani Painting', nameHi: 'मधुबनी चित्रकला', imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80', approxPrice: 2400, hint: 'madhubani tree of life painting bihar' },
  { name: 'Bastar Dhokra Metal', nameHi: 'बस्तर ढोकरा मेटल', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80', approxPrice: 1850, hint: 'dhokra tribal brass sculpture bastar' },
  { name: 'Kashmiri Pashmina', nameHi: 'कश्मीरी पश्मीना', imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80', approxPrice: 8500, hint: 'pure pashmina cashmere shawl sozni needlework' },
  { name: 'Kutch Embroidered Bag', nameHi: 'कच्छी कढ़ाई बैग', imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80', approxPrice: 950, hint: 'kutch mirror work tote bag boho gujarat' }
];

export const ScanCreateModal: React.FC = () => {
  const { isScanModalOpen, setIsScanModalOpen, addProduct } = useAppData();
  const { activeArtisan } = useAuth();
  const { t, isHindi } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_CRAFT_PRESETS[0].imageUrl);
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [presetKey, setPresetKey] = useState<string>(SAMPLE_CRAFT_PRESETS[0].hint);
  
  const [artisanNotes, setArtisanNotes] = useState<string>('');
  const [enteredPrice, setEnteredPrice] = useState<number>(SAMPLE_CRAFT_PRESETS[0].approxPrice);
  const [aiResult, setAiResult] = useState<AiCatalogGenerationResult | null>(null);

  const resetFlow = () => {
    setStep(1);
    setSelectedImage(SAMPLE_CRAFT_PRESETS[0].imageUrl);
    setCustomFile(null);
    setPresetKey(SAMPLE_CRAFT_PRESETS[0].hint);
    setArtisanNotes('');
    setEnteredPrice(SAMPLE_CRAFT_PRESETS[0].approxPrice);
    setAiResult(null);
  };

  const handleClose = () => {
    setIsScanModalOpen(false);
    resetFlow();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomFile(file);
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setPresetKey(file.name);
    }
  };

  const startAiAnalysis = async () => {
    setStep(2);
    try {
      const result = await aiService.analyzeImageAndGenerateCatalog({
        imageFile: customFile || selectedImage,
        presetCraft: presetKey,
        rawInputNotes: artisanNotes,
        approximatePrice: enteredPrice,
        location: activeArtisan.region,
        language: isHindi ? 'hi' : 'en'
      });

      setAiResult(result);
      setEnteredPrice(Math.round((result.suggestedPriceMin + result.suggestedPriceMax) / 2));
      setStep(3);
    } catch {
      setStep(1);
    }
  };

  const handlePublish = () => {
    if (!aiResult) return;

    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      artisanId: activeArtisan.id,
      artisanName: activeArtisan.name,
      artisanRegion: activeArtisan.region,
      title: aiResult.titleEn,
      titleHi: aiResult.titleHi,
      simpleDescription: aiResult.simpleDescriptionEn,
      simpleDescriptionHi: aiResult.simpleDescriptionHi,
      detailedDescription: aiResult.detailedDescriptionEn,
      detailedDescriptionHi: aiResult.detailedDescriptionHi,
      craftStory: aiResult.craftStoryEn,
      craftStoryHi: aiResult.craftStoryHi,
      craftType: aiResult.craftType,
      craftTypeHi: aiResult.craftTypeHi,
      category: aiResult.category,
      categoryHi: aiResult.categoryHi,
      material: aiResult.materialsEn,
      materialHi: aiResult.materialsHi,
      state: activeArtisan.state,
      price: enteredPrice,
      suggestedPriceRange: { min: aiResult.suggestedPriceMin, max: aiResult.suggestedPriceMax },
      fairPriceDetails: { materialCost: Math.round(enteredPrice * 0.3), laborHours: 8, hourlyRate: 120, indicativeTotal: enteredPrice },
      tags: aiResult.tagsEn,
      searchKeywords: aiResult.searchKeywords,
      images: [selectedImage],
      makingTimeDays: 7,
      status: 'published',
      views: 1,
      inquiriesCount: 0,
      marketMatches: aiResult.marketMatches,
      socialCaption: aiResult.socialCaptionEn,
      socialCaptionHi: aiResult.socialCaptionHi,
      createdAt: new Date().toISOString().split('T')[0],
      isHandmade: true,
      isTraditionalCraft: true,
      isRegionalCraft: true,
      isFeatured: true
    };

    addProduct(newProduct);
    try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch {}
    handleClose();
  };

  return (
    <Modal
      isOpen={isScanModalOpen}
      onClose={handleClose}
      title={isHindi ? '📸 AI स्मार्ट कैटलॉग जनरेटर' : '📸 AI Smart Catalog Generator'}
      subtitle={isHindi ? 'फोटो खींचें या चुनें, AI अपने आप शीर्षक, कहानी, टैग और खरीदार तैयार करेगा।' : 'Upload or snap a photo. AI generates bilingual titles, stories, SEO tags & market matches.'}
      maxWidth="4xl"
    >
      <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs font-semibold text-stone-500">
        <span className={step >= 1 ? 'text-craft-terracotta font-bold' : ''}>{t.scanStep1}</span>
        <span>→</span>
        <span className={step >= 2 ? 'text-craft-terracotta font-bold' : ''}>{t.scanStep2}</span>
        <span>→</span>
        <span className={step >= 3 ? 'text-craft-terracotta font-bold' : ''}>{t.scanStep3}</span>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-700 mb-2">{t.uploadPhotoPrompt}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1 aspect-square rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 flex flex-col items-center justify-center p-3 text-center overflow-hidden relative group">
                <img src={selectedImage} alt="Selected Craft" className="w-full h-full object-cover rounded-xl shadow-xs" />
                <label className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity">
                  <Upload className="w-6 h-6 mb-1" />
                  <span>{isHindi ? 'फोटो बदलें' : 'Upload Your Own'}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <div className="text-xs font-semibold text-stone-600">{t.selectSamplePhoto}</div>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_CRAFT_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => { setSelectedImage(preset.imageUrl); setPresetKey(preset.hint); setEnteredPrice(preset.approxPrice); setCustomFile(null); }}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left border transition-all ${selectedImage === preset.imageUrl ? 'bg-amber-100/70 border-craft-terracotta ring-2 ring-craft-terracotta/30' : 'bg-white border-stone-200 hover:bg-stone-50'}`}
                    >
                      <img src={preset.imageUrl} alt={preset.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="text-xs">
                        <div className="font-bold text-craft-earth leading-tight">{isHindi ? preset.nameHi : preset.name}</div>
                        <div className="text-[10px] text-stone-500">~₹{preset.approxPrice}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <VoiceProductInput onTranscriptReady={(t) => { setArtisanNotes(t); setPresetKey(t); }} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">{isHindi ? 'कारीगर विवरण (वैकल्पिक):' : 'Artisan Notes (Optional):'}</label>
              <input type="text" value={artisanNotes} onChange={(e) => setArtisanNotes(e.target.value)} placeholder={t.artisanNotesPlaceholder} className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{isHindi ? 'अनुमानित मूल्य (₹):' : 'Estimated Price (₹):'}</label>
              <input type="number" value={enteredPrice} onChange={(e) => setEnteredPrice(Number(e.target.value))} className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none font-bold" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="button" onClick={startAiAnalysis} className="flex items-center gap-2 bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? '✨ AI स्कैन प्रारंभ करें' : '✨ Start AI Scan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-craft-lg border-2 border-craft-terracotta">
            <img src={selectedImage} alt="Scanning" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent animate-scan" />
            <div className="absolute inset-0 border-2 border-amber-300 rounded-2xl pointer-events-none" />
          </div>
          <div className="space-y-1 max-w-md">
            <div className="flex items-center justify-center gap-2 text-craft-terracotta font-bold text-sm font-display">
              <RefreshCw className="w-4 h-4 animate-spin text-craft-terracotta" />
              <span>{isHindi ? 'AI विज़न विश्लेषण चल रहा है...' : 'AI Vision Analysis in Progress...'}</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-serif">{t.scanningAnimationText}</p>
          </div>
        </div>
      )}

      {step === 3 && aiResult && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-emerald-950">{t.craftDetected} {isHindi ? aiResult.craftTypeHi : aiResult.craftType}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 font-medium">{t.confidence} <strong>{aiResult.confidenceScore}%</strong></span>
              <CraftBadge type="verified" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 space-y-2">
              <img src={selectedImage} alt={aiResult.titleEn} className="w-full aspect-square object-cover rounded-2xl border border-stone-200 shadow-sm" />
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] space-y-1">
                <div className="font-bold text-craft-earth">{isHindi ? 'पहचाने गए विज़ुअल तत्व:' : 'Detected Attributes:'}</div>
                <div className="flex flex-wrap gap-1">
                  {aiResult.detectedVisualAttributes.map((attr, i) => (
                    <span key={i} className="bg-white px-1.5 py-0.5 rounded text-stone-700 border border-amber-100">• {attr}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">{isHindi ? 'AI द्वारा तैयार शीर्षक:' : 'AI Generated Title:'}</label>
                <div className="font-display font-bold text-stone-900 text-base leading-snug mt-0.5">{isHindi ? aiResult.titleHi : aiResult.titleEn}</div>
                <div className="text-xs text-stone-500 italic mt-0.5">{isHindi ? aiResult.titleEn : aiResult.titleHi}</div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">{isHindi ? 'संक्षिप्त विवरण (Simple Description):' : 'Simple Description:'}</label>
                <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">{isHindi ? aiResult.simpleDescriptionHi : aiResult.simpleDescriptionEn}</p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">{isHindi ? 'सांस्कृतिक कहानी (Craft Story):' : 'Cultural Heritage Story:'}</label>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed font-serif bg-craft-cream p-2.5 rounded-xl border border-stone-200">{isHindi ? aiResult.craftStoryHi : aiResult.craftStoryEn}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-stone-200">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">{isHindi ? 'AI सुझाई गई मूल्य सीमा' : 'AI Suggested Price Range'}</div>
                  <div className="text-sm font-bold text-craft-terracotta">₹{aiResult.suggestedPriceMin} – ₹{aiResult.suggestedPriceMax}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">{isHindi ? 'अंतिम निर्धारित मूल्य (₹)' : 'Final Listing Price (₹)'}</div>
                  <input type="number" value={enteredPrice} onChange={(e) => setEnteredPrice(Number(e.target.value))} className="text-sm font-bold text-stone-900 border-b border-craft-terracotta bg-transparent focus:outline-none w-full" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">{isHindi ? 'टैग्स एवं सर्च कीवर्ड्स:' : 'AI Tags & Keywords:'}</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(isHindi ? aiResult.tagsHi : aiResult.tagsEn).map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-craft-earth">
              <Sparkles className="w-4 h-4 text-craft-terracotta" />
              <span>{isHindi ? '🎯 AI मार्केट मैच विश्लेषण:' : '🎯 AI Market Match Prediction:'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiResult.marketMatches.map((match, i) => (
                <div key={i} className="bg-white p-2.5 rounded-xl border border-orange-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span>{isHindi ? match.segmentNameHi : match.segmentName}</span>
                    <span className="text-craft-terracotta">{match.matchPercentage}%</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-serif">{isHindi ? match.reasonHi : match.reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200">
            <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg">{isHindi ? '← दोबारा स्कैन करें' : '← Re-Scan Photo'}</button>
            <button type="button" onClick={handlePublish} className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.publishCatalogBtn}</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
