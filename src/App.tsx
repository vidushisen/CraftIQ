import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './i18n/LanguageContext';
import { useAppData } from './context/AppDataContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';

// Artisan Components
import { ArtisanStats } from './components/artisan/ArtisanStats';
import { AiMarketInsights } from './components/artisan/AiMarketInsights';
import { ArtisanSimpleMode } from './components/artisan/ArtisanSimpleMode';
import { ArtisanCatalogList } from './components/artisan/ArtisanCatalogList';
import { ArtisanInquiriesView } from './components/artisan/ArtisanInquiriesView';
import { ScanCreateModal } from './components/artisan/ScanCreateModal';
import { FairPriceAssistant } from './components/artisan/FairPriceAssistant';

// Buyer Components
import { BuyerMarketplace } from './components/buyer/BuyerMarketplace';
import { ProductDetailModal } from './components/buyer/ProductDetailModal';
import { ConnectInquiryModal } from './components/buyer/ConnectInquiryModal';
import { SavedProductsView } from './components/buyer/SavedProductsView';

// Admin & Ecosystem
import { AdminDashboard } from './components/admin/AdminDashboard';
import { EcosystemView } from './components/admin/EcosystemView';

// Landing Components
import { LandingHero } from './components/landing/LandingHero';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { CraftShowcaseSection } from './components/landing/CraftShowcaseSection';

import { Sparkles, Layers, Heart, Mail } from 'lucide-react';

export default function App() {
  const { role, setRole, isSimpleMode, setIsSimpleMode, activeArtisan } = useAuth();
  const { isHindi } = useLanguage();
  const {
    products,
    setIsScanModalOpen,
    setIsFairPriceModalOpen
  } = useAppData();

  const [currentTab, setCurrentTab] = useState<'landing' | 'artisan' | 'buyer' | 'admin' | 'ecosystem'>('landing');
  const [buyerSubTab, setBuyerSubTab] = useState<'market' | 'saved'>('market');
  const [artisanSubTab, setArtisanSubTab] = useState<'catalog' | 'inquiries'>('catalog');

  const artisanProducts = products.filter(p => p.artisanId === activeArtisan.id);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-craft-cream selection:bg-craft-terracotta selection:text-white pb-16 md:pb-0">
      
      {/* Top Main Navigation Bar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab as any} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        
        {/* 1. LANDING PAGE VIEW */}
        {currentTab === 'landing' && (
          <div className="space-y-12">
            <LandingHero
              onStartArtisan={() => {
                setRole('artisan');
                setCurrentTab('artisan');
              }}
              onExploreBuyer={() => {
                setRole('buyer');
                setCurrentTab('buyer');
              }}
            />
            <HowItWorksSection
              onStartArtisan={() => {
                setRole('artisan');
                setCurrentTab('artisan');
              }}
            />
            <CraftShowcaseSection
              onExplore={() => {
                setRole('buyer');
                setCurrentTab('buyer');
              }}
            />
          </div>
        )}

        {/* 2. ARTISAN HUB VIEW */}
        {currentTab === 'artisan' && (
          <div className="space-y-6">
            
            {/* Mode Switcher Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2">
                <img
                  src={activeArtisan.avatar}
                  alt={activeArtisan.name}
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-craft-earth">
                    {isHindi ? activeArtisan.nameHi : activeArtisan.name}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {isHindi ? activeArtisan.craftTypeHi : activeArtisan.craftType} • {activeArtisan.region}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
                <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs">
                  <button
                    onClick={() => setIsSimpleMode(true)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      isSimpleMode ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    {isHindi ? '📱 सरल मोड (Simple)' : '📱 Simple Mode'}
                  </button>
                  <button
                    onClick={() => setIsSimpleMode(false)}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      !isSimpleMode ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    {isHindi ? '📊 प्रो हब (Pro)' : '📊 Pro Hub'}
                  </button>
                </div>
              </div>
            </div>

            {/* If Simple Mode is Active */}
            {isSimpleMode ? (
              <ArtisanSimpleMode
                onOpenScan={() => setIsScanModalOpen(true)}
                onOpenFairPrice={() => setIsFairPriceModalOpen(true)}
                onOpenInquiries={() => {
                  setIsSimpleMode(false);
                  setArtisanSubTab('inquiries');
                }}
              />
            ) : (
              /* Pro Mode Dashboard */
              <div className="space-y-6">
                <ArtisanStats />
                <AiMarketInsights />

                {/* Sub Tab Switcher (Catalog vs Inquiries) */}
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                  <button
                    onClick={() => setArtisanSubTab('catalog')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      artisanSubTab === 'catalog' ? 'bg-craft-terracotta text-white' : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isHindi ? 'कैटलॉग सूची' : 'My Catalog Inventory'} ({artisanProducts.length})</span>
                  </button>

                  <button
                    onClick={() => setArtisanSubTab('inquiries')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      artisanSubTab === 'inquiries' ? 'bg-craft-terracotta text-white' : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{isHindi ? 'खरीदार पूछताछ' : 'Buyer Inquiries'}</span>
                  </button>
                </div>

                {artisanSubTab === 'catalog' ? (
                  <ArtisanCatalogList
                    products={artisanProducts}
                    onAddNew={() => setIsScanModalOpen(true)}
                  />
                ) : (
                  <ArtisanInquiriesView />
                )}
              </div>
            )}

          </div>
        )}

        {/* 3. BUYER MARKETPLACE VIEW */}
        {currentTab === 'buyer' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
              <button
                onClick={() => setBuyerSubTab('market')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  buyerSubTab === 'market' ? 'bg-craft-terracotta text-white' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {isHindi ? '🛍️ संपूर्ण बाज़ार' : '🛍️ Explore Crafts'}
              </button>
              <button
                onClick={() => setBuyerSubTab('saved')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  buyerSubTab === 'saved' ? 'bg-craft-terracotta text-white' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>{isHindi ? 'विशलिस्ट' : 'Saved Wishlist'}</span>
              </button>
            </div>

            {buyerSubTab === 'market' ? (
              <BuyerMarketplace />
            ) : (
              <SavedProductsView />
            )}
          </div>
        )}

        {/* 4. ECOSYSTEM & GOVT SCHEMES */}
        {currentTab === 'ecosystem' && (
          <EcosystemView />
        )}

        {/* 5. ADMIN & IMPACT DASHBOARD */}
        {currentTab === 'admin' && (
          <AdminDashboard />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Navigation */}
      <MobileNav currentTab={currentTab} setCurrentTab={setCurrentTab as any} />

      {/* Global Modals & Notifications */}
      <ScanCreateModal />
      <FairPriceAssistant />
      <ProductDetailModal />
      <ConnectInquiryModal />
      <ToastContainer />

    </div>
  );
}
