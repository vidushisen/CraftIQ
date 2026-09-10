import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { Mail, Phone, User } from 'lucide-react';

export const ArtisanInquiriesView: React.FC = () => {
  const { activeArtisan } = useAuth();
  const { isHindi } = useLanguage();
  const { inquiries } = useAppData();

  const artisanInquiries = inquiries.filter(i => i.artisanId === activeArtisan.id);

  if (artisanInquiries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center space-y-2">
        <Mail className="w-10 h-10 text-stone-300 mx-auto" />
        <h4 className="text-sm font-bold text-stone-800">{isHindi ? 'कोई नई पूछताछ नहीं है' : 'No Buyer Inquiries Yet'}</h4>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">{isHindi ? 'जैसे ही खरीदार आपके शिल्पों में रुचि दिखाएंगे, उनके संदेश यहां दिखाई देंगे।' : 'As buyers browse and send inquiries for your crafts, their messages will appear here.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-craft-earth font-display">{isHindi ? '📬 खरीदार पूछताछ एवं संदेश' : '📬 Buyer Inquiries & Lead Demands'} ({artisanInquiries.length})</h3>
      <div className="space-y-3">
        {artisanInquiries.map((inq) => (
          <div key={inq.id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm hover:shadow-craft transition-shadow space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2.5">
                <img src={inq.productImage} alt={inq.productTitle} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold text-stone-900 line-clamp-1">{inq.productTitle}</div>
                  <div className="text-[10px] text-craft-terracotta font-semibold">{isHindi ? 'मांगी गई मात्रा:' : 'Qty Requested:'} {inq.quantityRequested} {isHindi ? 'इकाइयां' : 'units'}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">{inq.buyerType.replace('_', ' ')}</span>
                <span className="text-[10px] text-stone-400">{new Date(inq.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="bg-craft-cream p-3 rounded-xl border border-stone-200 text-xs text-stone-800 font-serif leading-relaxed">"{inq.message}"</div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-semibold text-stone-900"><User className="w-3.5 h-3.5 text-stone-400" />{inq.buyerName}</span>
                <a href={`tel:${inq.buyerPhone}`} className="flex items-center gap-1 text-craft-terracotta hover:underline font-medium"><Phone className="w-3.5 h-3.5" />{inq.buyerPhone}</a>
                <a href={`mailto:${inq.buyerEmail}`} className="hidden sm:flex items-center gap-1 text-stone-500 hover:text-stone-800"><Mail className="w-3.5 h-3.5" />{inq.buyerEmail}</a>
              </div>
              <button type="button" onClick={() => alert(`Connecting with buyer: ${inq.buyerName} (${inq.buyerPhone})`)} className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">
                {isHindi ? 'सीधे संपर्क करें' : 'Contact Buyer'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
