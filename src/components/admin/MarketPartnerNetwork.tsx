import React from 'react';
import { mockMarketPartners } from '../../data/marketPartners';
import { useLanguage } from '../../i18n/LanguageContext';
import { Building2, ShieldCheck, Globe, Handshake, MapPin } from 'lucide-react';

export const MarketPartnerNetwork: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-craft-earth font-display">
            {isHindi ? '🏛️ मार्केट पार्टनर इंटीग्रेशन लेयर' : '🏛️ Market Partner Integration Layer'}
          </h3>
          <p className="text-xs text-stone-500">
            {isHindi
              ? 'बल्क रिटेलर्स, एक्सपोर्ट हाउस और एनजीओ के साथ डिजिटल मार्केट लिंकेज'
              : 'Institutional B2B buyers, fair-trade export houses & ecosystem partners'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMarketPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                  {partner.logo}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isHindi ? partner.nameHi : partner.name}
                  </h4>
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{partner.location}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {partner.type}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-serif leading-relaxed">
              {partner.description}
            </p>

            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 space-y-1">
              <div className="text-[10px] font-bold text-stone-600 uppercase">
                {isHindi ? 'सक्रिय थोक मांग (Active Demands):' : 'Active Sourcing Demands:'}
              </div>
              <div className="flex flex-wrap gap-1">
                {partner.activeDemands.map((demand, i) => (
                  <span key={i} className="text-[10px] bg-white border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md">
                    • {demand}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
              <span className="text-stone-500 text-[11px]">
                {partner.contactPerson}
              </span>
              <button
                type="button"
                onClick={() => alert(`Connect request initiated for ${partner.name}.`)}
                className="bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors"
              >
                {isHindi ? 'पार्टनर से जुड़ें' : 'Connect Partner'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
