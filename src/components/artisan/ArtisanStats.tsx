import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { formatCurrencyINR } from '../../utils/helpers';
import { Eye, MessageSquare, Target, Sparkles, TrendingUp } from 'lucide-react';

export const ArtisanStats: React.FC = () => {
  const { activeArtisan } = useAuth();
  const { t } = useLanguage();
  const { products, inquiries } = useAppData();

  const artisanProducts = products.filter(p => p.artisanId === activeArtisan.id);
  const totalViews = artisanProducts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalInquiries = inquiries.filter(i => i.artisanId === activeArtisan.id).length;
  const totalMarketMatches = artisanProducts.reduce((acc, p) => acc + (p.marketMatches?.length || 0), 0);
  const totalPipelineValue = artisanProducts.reduce((acc, p) => acc + (p.price * Math.max(1, p.inquiriesCount * 3)), 0);

  const statsList = [
    { label: t.myProducts, value: artisanProducts.length, icon: <Sparkles className="w-4 h-4 text-amber-600" />, bg: 'bg-amber-50 border-amber-200' },
    { label: t.catalogViews, value: totalViews.toLocaleString(), icon: <Eye className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50 border-blue-200' },
    { label: t.buyerInterests, value: totalInquiries, icon: <MessageSquare className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50 border-emerald-200' },
    { label: t.marketMatches, value: totalMarketMatches, icon: <Target className="w-4 h-4 text-craft-terracotta" />, bg: 'bg-orange-50 border-orange-200' },
    { label: t.estOpportunities, value: formatCurrencyINR(totalPipelineValue), icon: <TrendingUp className="w-4 h-4 text-purple-600" />, bg: 'bg-purple-50 border-purple-200' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {statsList.map((st, i) => (
        <div key={i} className={`p-3.5 rounded-2xl border ${st.bg} flex flex-col justify-between shadow-xs`}>
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 mb-1">
            <span className="truncate">{st.label}</span>
            {st.icon}
          </div>
          <div className="text-xl font-extrabold text-stone-900 font-display">{st.value}</div>
        </div>
      ))}
    </div>
  );
};
