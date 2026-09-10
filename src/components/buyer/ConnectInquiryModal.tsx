import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Modal } from '../common/Modal';
import { Mail, Phone, User, Send, Building, Sparkles } from 'lucide-react';

export const ConnectInquiryModal: React.FC = () => {
  const { selectedProductForInquiry, setSelectedProductForInquiry, sendInquiry } = useAppData();
  const { isHindi } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [buyerType, setBuyerType] = useState<'individual' | 'retail_boutique' | 'corporate_gifting' | 'export_agency'>('individual');
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState('');

  if (!selectedProductForInquiry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(isHindi ? 'कृपया अपना नाम और फ़ोन नंबर दर्ज करें' : 'Please provide your name and phone number');
      return;
    }

    sendInquiry({
      productId: selectedProductForInquiry.id,
      productTitle: selectedProductForInquiry.title,
      productImage: selectedProductForInquiry.images[0],
      artisanId: selectedProductForInquiry.artisanId,
      buyerName: name,
      buyerEmail: email || 'buyer@example.com',
      buyerPhone: phone,
      buyerType,
      quantityRequested: quantity,
      message: message || (isHindi ? 'मैं इस हस्तशिल्प उत्पाद को खरीदने में रुचि रखता हूँ।' : 'I am interested in purchasing this handcrafted piece.')
    });

    setSelectedProductForInquiry(null);
  };

  return (
    <Modal
      isOpen={!!selectedProductForInquiry}
      onClose={() => setSelectedProductForInquiry(null)}
      title={isHindi ? '🤝 कारीगर से संपर्क करें' : '🤝 Connect with Master Artisan'}
      subtitle={isHindi ? `उत्पाद: ${selectedProductForInquiry.titleHi}` : `Product: ${selectedProductForInquiry.title}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
          <img
            src={selectedProductForInquiry.images[0]}
            alt={selectedProductForInquiry.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-craft-earth truncate">
              {isHindi ? selectedProductForInquiry.titleHi : selectedProductForInquiry.title}
            </div>
            <div className="text-xs text-craft-terracotta font-bold">
              ₹{selectedProductForInquiry.price}
            </div>
            <div className="text-[10px] text-stone-500">
              {isHindi ? 'कारीगर: ' : 'Artisan: '}{selectedProductForInquiry.artisanName} ({selectedProductForInquiry.artisanRegion})
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isHindi ? 'आपका नाम *' : 'Your Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isHindi ? 'फ़ोन नंबर *' : 'Phone Number *'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isHindi ? 'ईमेल आईडी' : 'Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="buyer@example.com"
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {isHindi ? 'खरीदार प्रकार' : 'Buyer Category'}
            </label>
            <select
              value={buyerType}
              onChange={(e) => setBuyerType(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none"
            >
              <option value="individual">{isHindi ? 'व्यक्तिगत खरीदार' : 'Individual Buyer'}</option>
              <option value="retail_boutique">{isHindi ? 'रिटेल / बुटीक स्टोर' : 'Retail / Boutique Store'}</option>
              <option value="corporate_gifting">{isHindi ? 'कॉर्पोरेट उपहार' : 'Corporate Gifting'}</option>
              <option value="export_agency">{isHindi ? 'निर्यात / एक्सपोर्ट' : 'Export Agency'}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            {isHindi ? 'मात्रा (इकाइयां)' : 'Quantity Needed (Units)'}
          </label>
          <input
            type="number"
            min="1"
            max="5000"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            {isHindi ? 'आपका संदेश / आवश्यकता' : 'Custom Request or Notes'}
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isHindi ? 'जैसे: क्या आप इसे 15 दिनों में दिल्ली भेज सकते हैं?' : 'e.g. Interested in custom packaging for 25 units by next week...'}
            className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-craft-terracotta focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
          <span>{isHindi ? 'सीधे कारीगर को संदेश भेजें' : 'Send Direct Inquiry to Artisan'}</span>
        </button>
      </form>
    </Modal>
  );
};
