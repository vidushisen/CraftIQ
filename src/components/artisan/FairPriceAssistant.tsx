import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { aiService } from '../../services/aiService';
import { Modal } from '../common/Modal';
import { Info } from 'lucide-react';

export const FairPriceAssistant: React.FC = () => {
  const { isFairPriceModalOpen, setIsFairPriceModalOpen } = useAppData();
  const { t, isHindi } = useLanguage();

  const [materialCost, setMaterialCost] = useState<number>(350);
  const [laborHours, setLaborHours] = useState<number>(6);
  const [hourlyWage, setHourlyWage] = useState<number>(120);
  const [packagingCost, setPackagingCost] = useState<number>(60);

  const priceCalc = aiService.calculateFairPrice({
    materialCost,
    laborHours,
    hourlyWageRate: hourlyWage,
    packagingCost
  });

  return (
    <Modal
      isOpen={isFairPriceModalOpen}
      onClose={() => setIsFairPriceModalOpen(false)}
      title={isHindi ? '💰 AI उचित मूल्य सहायक' : '💰 AI Fair Price Assistant'}
      subtitle={t.fairPriceSubtitle}
      maxWidth="xl"
    >
      <div className="space-y-4">
        <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
              <span>{t.materialCostLabel}</span>
              <span className="font-bold text-craft-earth">₹{materialCost}</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={materialCost}
              onChange={(e) => setMaterialCost(Number(e.target.value))}
              className="w-full accent-craft-terracotta"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
              <span>{t.laborHoursLabel}</span>
              <span className="font-bold text-craft-earth">{laborHours} {isHindi ? 'घंटे' : 'hours'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={laborHours}
              onChange={(e) => setLaborHours(Number(e.target.value))}
              className="w-full accent-craft-terracotta"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
              <span>{t.hourlyRateLabel}</span>
              <span className="font-bold text-craft-earth">₹{hourlyWage}/hr</span>
            </div>
            <input
              type="range"
              min="80"
              max="350"
              step="10"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full accent-craft-terracotta"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
              <span>{t.packagingCostLabel}</span>
              <span className="font-bold text-craft-earth">₹{packagingCost}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full accent-craft-terracotta"
            />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-craft-earth">
              {t.calculatedFairPrice}
            </span>
            <span className="text-xs px-2 py-0.5 bg-amber-200 text-amber-900 rounded font-bold">
              {isHindi ? 'सम्मानजनक मूल्य' : 'Dignified Wage'}
            </span>
          </div>

          <div className="text-center py-2 bg-white rounded-xl border border-amber-200 shadow-xs">
            <div className="text-2xl font-black text-craft-terracotta font-display">
              ₹{priceCalc.suggestedMin} – ₹{priceCalc.suggestedMax}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              {isHindi ? 'मध्यमान सांकेतिक मूल्य: ' : 'Median Indicative Target: '}
              <strong>₹{priceCalc.indicativePrice}</strong>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600 pt-1">
            <div className="bg-white/80 p-1.5 rounded-lg">
              <div>{isHindi ? 'कच्चा माल' : 'Material'}</div>
              <div className="font-bold text-stone-900">₹{priceCalc.materialCost}</div>
            </div>
            <div className="bg-white/80 p-1.5 rounded-lg">
              <div>{isHindi ? 'श्रम पारिश्रमिक' : 'Labor Wage'}</div>
              <div className="font-bold text-stone-900">₹{priceCalc.laborCost}</div>
            </div>
            <div className="bg-white/80 p-1.5 rounded-lg">
              <div>{isHindi ? 'पैकेजिंग' : 'Packaging'}</div>
              <div className="font-bold text-stone-900">₹{priceCalc.packagingCost}</div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-stone-500 bg-stone-100 p-3 rounded-xl border border-stone-200">
          <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.indicativeDisclaimer}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFairPriceModalOpen(false)}
          className="w-full bg-craft-terracotta hover:bg-craft-terracottaLight text-white py-2.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
        >
          {isHindi ? 'ठीक है, समझ गया' : 'Apply to Listing'}
        </button>
      </div>
    </Modal>
  );
};
