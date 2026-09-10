import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sparkles, TrendingUp, Users, Target, ArrowUpRight } from 'lucide-react';

export const AiMarketInsights: React.FC = () => {
  const { isHindi } = useLanguage();

  const insightsList = [
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      title: isHindi ? 'उच्च मांग वाली मूल्य सीमा' : 'High-Demand Price Sweet Spot',
      text: isHindi
        ? '₹800 से ₹1,500 के बीच के उत्पादों को 3.2 गुना अधिक खरीदार पूछताछ मिल रही है।'
        : 'Products priced between ₹800–₹1,500 are receiving 3.2x higher inquiries from festive buyers.',
      action: isHindi ? 'मूल्य संरेखित करें' : 'Align Pricing'
    },
    {
      icon: <Target className="w-4 h-4 text-amber-600" />,
      title: isHindi ? 'होम डेकोर बुटीक रुझान' : 'Home Décor Buyer Interest',
      text: isHindi
        ? 'आपके हस्तशिल्प में दिल्ली-मुंबई के लाइफस्टाइल स्टोर्स की 94% रुचि है।'
        : 'Your handcrafted items are receiving 94% affinity matches from urban lifestyle boutiques.',
      action: isHindi ? 'कैटलॉग बढ़ाएं' : 'Add 2 More Products'
    },
    {
      icon: <Users className="w-4 h-4 text-blue-600" />,
      title: isHindi ? 'कॉर्पोरेट उपहार अवसर' : 'Corporate Festive Gifting Peak',
      text: isHindi
        ? 'आगामी त्यौहारों के लिए 25-50 पीस के बल्क ऑर्डर की मांग में 40% की वृद्धि देखी जा रही है।'
        : 'Bulk orders (25–50 units) for corporate gifting are peaking. Keep lead time updated.',
      action: isHindi ? 'अवसर देखें' : 'View Demands'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-craft space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100 text-craft-terracotta flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <h3 className="text-sm font-bold text-craft-earth font-display">
            {isHindi ? 'AI बाज़ार अंतर्दृष्टि (Market Insights)' : 'AI Market Insights & Recommendations'}
          </h3>
        </div>
        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
          {isHindi ? 'दैनिक अपडेट' : 'Live Trends'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {insightsList.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-craft-cream border border-stone-200 flex flex-col justify-between space-y-2 hover:border-amber-300 transition-colors">
            <div>
              <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-stone-900">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-serif">{item.text}</p>
            </div>
            <div className="pt-1 flex items-center justify-between text-[10px] font-semibold text-craft-terracotta">
              <span>{item.action}</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
