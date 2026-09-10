import React from 'react';
import { governmentSchemes } from '../../data/governmentSchemes';
import { useLanguage } from '../../i18n/LanguageContext';
import { Landmark, ExternalLink, ShieldCheck, CheckCircle2, Award, BookOpen, Coins } from 'lucide-react';

export const EcosystemView: React.FC = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-800 via-craft-earth to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-craft-lg">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              {isHindi ? 'आधिकारिक सरकारी एवं संस्थागत अवसर' : 'Official National Initiatives'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            {t.govtSchemesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            {t.govtSchemesSubtitle}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
            {isHindi ? 'सत्यापित योजनाएं एवं पोर्टल' : 'Verified Schemes & Official Portals'} ({governmentSchemes.length})
          </div>
          <span className="text-xs text-stone-500 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isHindi ? 'केवल आधिकारिक भारत सरकार URL' : 'Official Verified Govt URLs'}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {governmentSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-craft hover:shadow-craft-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-craft-earth font-display">
                      {isHindi ? scheme.titleHi : scheme.title}
                    </h3>
                    <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                      {isHindi ? scheme.organizationHi : scheme.organization}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
                    {isHindi ? scheme.badgeHi : scheme.badge}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-serif">
                  {isHindi ? scheme.descriptionHi : scheme.description}
                </p>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                  <span className="font-semibold text-stone-600">
                    {isHindi ? 'पात्रता:' : 'Eligibility:'}
                  </span>{' '}
                  <span className="text-stone-700 font-serif">
                    {isHindi ? scheme.eligibilityHi : scheme.eligibility}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  {isHindi ? 'शून्य बिचौलिया प्रत्यक्ष पोर्टल' : 'Direct Official Portal'}
                </span>
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
                >
                  <span>{t.openOfficialPortal}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
