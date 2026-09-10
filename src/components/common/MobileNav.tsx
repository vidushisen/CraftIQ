import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { Layers, ShoppingBag, Landmark, Camera, BarChart2 } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, setCurrentTab }) => {
  const { setRole } = useAuth();
  const { isHindi } = useLanguage();
  const { setIsScanModalOpen } = useAppData();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-1.5 shadow-craft-lg">
      <div className="grid grid-cols-5 items-center">
        <button
          onClick={() => {
            setRole('artisan');
            setCurrentTab('artisan');
          }}
          className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
            currentTab === 'artisan' ? 'text-craft-terracotta font-bold' : 'text-stone-500'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {isHindi ? 'कारीगर' : 'Artisan'}
          </span>
        </button>

        <button
          onClick={() => {
            setRole('buyer');
            setCurrentTab('buyer');
          }}
          className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
            currentTab === 'buyer' ? 'text-craft-terracotta font-bold' : 'text-stone-500'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {isHindi ? 'बाज़ार' : 'Market'}
          </span>
        </button>

        <button
          onClick={() => setIsScanModalOpen(true)}
          className="flex flex-col items-center -mt-5"
          aria-label="AI Scan Craft"
        >
          <div className="w-12 h-12 rounded-full bg-craft-terracotta text-white flex items-center justify-center shadow-warm border-2 border-craft-cream active:scale-95 transition-transform p-2.5">
            <Camera className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-bold text-craft-terracotta mt-0.5">
            {isHindi ? 'AI स्कैन' : 'AI Scan'}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('ecosystem')}
          className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
            currentTab === 'ecosystem' ? 'text-craft-terracotta font-bold' : 'text-stone-500'
          }`}
        >
          <Landmark className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {isHindi ? 'योजनाएं' : 'Govt'}
          </span>
        </button>

        <button
          onClick={() => {
            setRole('admin');
            setCurrentTab('admin');
          }}
          className={`flex flex-col items-center py-1 rounded-lg transition-colors ${
            currentTab === 'admin' ? 'text-craft-terracotta font-bold' : 'text-stone-500'
          }`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">
            {isHindi ? 'इम्पैक्ट' : 'Impact'}
          </span>
        </button>
      </div>
    </div>
  );
};
