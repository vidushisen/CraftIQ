import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Camera, Sparkles, Target, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC<{ onStartArtisan: () => void }> = ({ onStartArtisan }) => {
  const { isHindi } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: <Camera className="w-6 h-6 text-craft-terracotta" />,
      title: isHindi ? 'फोटो अपलोड या वॉयस इनपुट' : 'Snap Photo or Speak',
      desc: isHindi
        ? 'कारीगर केवल अपने उत्पाद की एक फोटो खींचते हैं या अपनी मातृभाषा में 2 वाक्य बोलते हैं।'
        : 'Artisan snaps a quick craft photo or speaks a few words in their native Indian language.'
    },
    {
      num: '02',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: isHindi ? 'AI स्मार्ट कैटलॉग निर्माण' : 'AI Generates Full Catalog',
      desc: isHindi
        ? 'AI स्वचालित रूप से द्विभाषी शीर्षक, विरासत कहानी, सामग्री, टैग्स और उचित मूल्य सीमा तैयार करता है।'
        : 'AI instantly crafts bilingual titles, cultural storytelling, SEO tags & dignified price brackets.'
    },
    {
      num: '03',
      icon: <Target className="w-6 h-6 text-emerald-600" />,
      title: isHindi ? 'AI बाज़ार मेल (Market Match)' : 'AI Market Matching',
      desc: isHindi
        ? 'सिस्टम उत्पाद के आधार पर होम डेकोर, कॉर्पोरेट गिफ्टिंग और एक्सपोर्ट बायर्स से मैच करता है।'
        : 'Algorithm clusters buyer segments (Home decor, gifting, boutiques) with affinity match %.'
    },
    {
      num: '04',
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: isHindi ? 'प्रत्यक्ष खरीदार संपर्क' : 'Direct Buyer Linkage',
      desc: isHindi
        ? 'शून्य बिचौलिया कमीशन के साथ खरीदार सीधे कारीगर से जुड़ते हैं और ऑर्डर भेजते हैं।'
        : 'Buyers discover verified heritage items and send direct inquiries without exploitative broker margins.'
    }
  ];

  return (
    <section className="py-12 border-t border-stone-200">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-craft-terracotta">
          {isHindi ? 'कारीगर से बाज़ार तक की यात्रा' : 'The Transformation Journey'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-craft-earth font-display">
          {isHindi ? 'यह कैसे काम करता है? (How CraftIQ Works)' : 'From Local Craft to Global Market in 4 Simple Steps'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed">
          {isHindi
            ? 'हमने डिजिटल काम को AI द्वारा 90% कम कर दिया है ताकि ग्रामीण कारीगर केवल अपने हुनर पर ध्यान दे सकें।'
            : 'Transforming traditional handmade skill into digital discovery and verifiable livelihood opportunities.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm hover:shadow-craft transition-all flex flex-col justify-between space-y-4 relative group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-craft-cream border border-stone-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                {st.icon}
              </div>
              <span className="text-2xl font-black text-stone-300 font-display">
                {st.num}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 className="text-sm font-bold text-stone-900 font-display">
                {st.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-serif">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
