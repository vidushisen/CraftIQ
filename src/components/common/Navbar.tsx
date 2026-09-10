import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { storageService } from '../../services/storageService';
import {
  Sparkles,
  Layers,
  ShoppingBag,
  BarChart3,
  Landmark,
  Camera,
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { role, setRole, isSimpleMode, setIsSimpleMode, activeArtisan, setActiveArtisanId, allArtisans } = useAuth();
  const { language, setLanguage, t, isHindi } = useLanguage();
  const { setIsScanModalOpen } = useAppData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-craft-cream/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="bg-craft-terracotta text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-between">
        <div className="flex items-center gap-1.5 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>
            {isHindi 
              ? 'CraftIQ • वंचित एवं ग्रामीण कारीगरों के लिए AI स्मार्ट कैटलॉगिंग और बाज़ार लिंकेज' 
              : 'CraftIQ • AI-Driven Market Linkage & Smart Cataloging for India\'s Marginalized Artisans'}
          </span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Reset local demo catalog & inquiries to defaults?')) {
              storageService.resetToDemoDefaults();
            }
          }}
          className="hidden md:flex items-center gap-1 text-[11px] bg-craft-terracottaDark/80 hover:bg-craft-terracottaDark px-2 py-0.5 rounded text-amber-200 transition-colors"
          title="Reset seed data"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isHindi ? 'रीसेट डेटा' : 'Reset Demo'}</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            onClick={() => setCurrentTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-craft-terracotta flex items-center justify-center text-white font-bold text-xl shadow-warm group-hover:scale-105 transition-transform">
              <span>श</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-craft-earth font-display">
                  Craft<span className="text-craft-terracotta">IQ</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-craft-clay font-medium">
                  {isHindi ? 'कारीगरसेतु' : 'KarigarSetu'}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 tracking-wide font-serif">
                {t.tagline}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'landing'
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => {
                setRole('artisan');
                setCurrentTab('artisan');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'artisan' && role === 'artisan'
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.navArtisanDashboard}</span>
            </button>

            <button
              onClick={() => {
                setRole('buyer');
                setCurrentTab('buyer');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'buyer'
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.navBuyerMarket}</span>
            </button>

            <button
              onClick={() => setCurrentTab('ecosystem')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'ecosystem'
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.navEcosystem}</span>
            </button>

            <button
              onClick={() => {
                setRole('admin');
                setCurrentTab('admin');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'admin'
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{t.navAdminDashboard}</span>
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  language === 'en'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-medium rounded ${
                  language === 'hi'
                    ? 'bg-craft-terracotta text-white shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                हिंदी
              </button>
            </div>

            {role === 'artisan' && currentTab === 'artisan' && (
              <div className="hidden lg:flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <span className="text-xs font-medium text-craft-earth">
                  {isHindi ? 'मोड:' : 'Mode:'}
                </span>
                <button
                  onClick={() => setIsSimpleMode(!isSimpleMode)}
                  className={`text-xs px-2 py-0.5 rounded-md font-semibold transition-colors ${
                    isSimpleMode ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-800'
                  }`}
                >
                  {isSimpleMode ? (isHindi ? '📱 सरल मोड' : '📱 Simple') : (isHindi ? '📊 प्रो मोड' : '📊 Pro')}
                </button>
              </div>
            )}

            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-1.5 bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isHindi ? 'स्कैन कैटलॉग' : 'Scan & Create'}
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-craft-cream px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                setRole('artisan');
                setCurrentTab('artisan');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                currentTab === 'artisan' ? 'bg-orange-50 border-craft-terracotta text-craft-terracotta font-bold' : 'bg-white border-stone-200'
              }`}
            >
              <Layers className="w-4 h-4 text-craft-terracotta" />
              <div className="text-xs">
                <div className="font-bold">{t.navArtisanDashboard}</div>
                <div className="text-[10px] text-stone-500">{isHindi ? 'कारीगर हब' : 'For Artisans'}</div>
              </div>
            </button>

            <button
              onClick={() => {
                setRole('buyer');
                setCurrentTab('buyer');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left border flex items-center gap-2 ${
                currentTab === 'buyer' ? 'bg-orange-50 border-craft-terracotta text-craft-terracotta font-bold' : 'bg-white border-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-craft-terracotta" />
              <div className="text-xs">
                <div className="font-bold">{t.navBuyerMarket}</div>
                <div className="text-[10px] text-stone-500">{isHindi ? 'खरीदार बाज़ार' : 'For Buyers'}</div>
              </div>
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentTab('ecosystem');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-xs font-semibold text-stone-800"
          >
            <span className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-700" />
              {t.navEcosystem}
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
              {isHindi ? 'सरकारी योजनाएं' : 'Govt Schemes'}
            </span>
          </button>

          <button
            onClick={() => {
              setRole('admin');
              setCurrentTab('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 bg-white rounded-xl border border-stone-200 text-xs font-semibold text-stone-800"
          >
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
              {t.navAdminDashboard}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
              {isHindi ? 'इम्पैक्ट डेटा' : 'Impact Metrics'}
            </span>
          </button>

          <div className="mt-3 pt-3 border-t border-stone-200">
            <div className="text-[11px] font-semibold text-stone-500 mb-1.5">
              {isHindi ? 'डेमो कारीगर प्रोफ़ाइल चुनें:' : 'Select Demo Artisan Profile:'}
            </div>
            <select
              value={activeArtisan.id}
              onChange={(e) => setActiveArtisanId(e.target.value)}
              className="w-full text-xs p-2 rounded-lg bg-white border border-stone-300 text-stone-800 font-medium"
            >
              {allArtisans.map((a) => (
                <option key={a.id} value={a.id}>
                  {isHindi ? a.nameHi : a.name} ({isHindi ? a.craftTypeHi : a.craftType})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
