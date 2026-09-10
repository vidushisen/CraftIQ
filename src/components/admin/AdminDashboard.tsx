import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { formatCurrencyINR } from '../../utils/helpers';
import { MarketPartnerNetwork } from './MarketPartnerNetwork';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import {
  Users,
  ShoppingBag,
  Target,
  TrendingUp,
  Award,
  Globe2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, inquiries } = useAppData();
  const { t, isHindi } = useLanguage();

  const totalCataloged = 1420 + products.length;
  const totalProductsDiscovered = 4850 + products.length * 4;
  const totalBuyerConnections = 620 + inquiries.length;
  const totalMarketValue = 18450000; // in INR

  // Craft Category Distribution Data
  const craftCategoryData = [
    { name: isHindi ? 'ब्लू पॉटरी' : 'Blue Pottery', value: 38, count: 420 },
    { name: isHindi ? 'मधुबनी' : 'Madhubani', value: 29, count: 310 },
    { name: isHindi ? 'ढोकरा मेटल' : 'Dhokra Metal', value: 24, count: 260 },
    { name: isHindi ? 'पश्मीना' : 'Pashmina', value: 33, count: 350 },
    { name: isHindi ? 'कच्छ कढ़ाई' : 'Kutch Embroidery', value: 27, count: 290 }
  ];

  // Regional Artisan Distribution Data
  const regionalData = [
    { region: isHindi ? 'राजस्थान' : 'Rajasthan', artisans: 410 },
    { region: isHindi ? 'बिहार' : 'Bihar', artisans: 320 },
    { region: isHindi ? 'गुजरात' : 'Gujarat', artisans: 280 },
    { region: isHindi ? 'कश्मीर' : 'Kashmir', artisans: 240 },
    { region: isHindi ? 'छत्तीसगढ़' : 'Chhattisgarh', artisans: 170 }
  ];

  const COLORS = ['#C2410C', '#D97706', '#15803D', '#1E3A8A', '#7C2D12'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-craft-earth text-white rounded-3xl p-6 sm:p-8 shadow-craft-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase">
              {isHindi ? 'राष्ट्रीय प्रभाव ट्रैकर' : 'National Impact Metrics'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              {t.impactSummaryTitle}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed max-w-xl">
              {isHindi
                ? 'AI डिजिटल कैटलॉगिंग और बाज़ार लिंकेज द्वारा ग्रामीण शिल्पकारों के सामाजिक-आर्थिक सशक्तिकरण का वास्तविक डेटा।'
                : 'Measurable socioeconomic indicators on artisan digital empowerment, discoverability velocity, and market transactions.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] text-amber-300 uppercase font-bold">
              {isHindi ? 'सत्यापित डिजिटल लिंकेज' : 'Verified Direct Linkages'}
            </div>
            <div className="text-2xl font-black font-display text-white">
              100% Direct
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">{t.totalArtisansCataloged}</span>
            <Users className="w-5 h-5 text-craft-terracotta" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-display">
            {totalCataloged.toLocaleString()}+
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 24%</span>
            <span className="text-stone-400 font-normal">{isHindi ? 'इस माह नए' : 'this month'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">{t.totalProductsListed}</span>
            <ShoppingBag className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-display">
            {totalProductsDiscovered.toLocaleString()}+
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 38%</span>
            <span className="text-stone-400 font-normal">{isHindi ? 'AI द्वारा कैटलॉग किए गए' : 'AI generated'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">{t.totalBuyerConnections}</span>
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 font-display">
            {totalBuyerConnections.toLocaleString()}+
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ 82%</span>
            <span className="text-stone-400 font-normal">{isHindi ? 'सक्रिय पूछताछ' : 'direct leads'}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase">{t.totalMarketValueGenerated}</span>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-craft-terracotta font-display">
            {formatCurrencyINR(totalMarketValue)}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>↑ ₹4.2M</span>
            <span className="text-stone-400 font-normal">{isHindi ? 'संभावित बाज़ार मूल्य' : 'opportunity pipe'}</span>
          </div>
        </div>
      </div>

      {/* Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution Chart */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-craft-earth font-display">
              {t.regionalDistribution}
            </h3>
            <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-600">
              {isHindi ? 'क्षेत्रवार कारीगर' : 'Artisans by State'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Artisans`, 'Enrolled']}
                  contentStyle={{ backgroundColor: '#FDFBF7', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Bar dataKey="artisans" fill="#C2410C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Craft Categories Demand Chart */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-craft-earth font-display">
              {t.topCraftsChart}
            </h3>
            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
              {isHindi ? 'मांग विश्लेषण' : 'Demand Affinity'}
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={craftCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {craftCategoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} Units Demand`, name]}
                  contentStyle={{ backgroundColor: '#FDFBF7', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {craftCategoryData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-stone-700 text-[11px]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Partner Integration Layer */}
      <MarketPartnerNetwork />
    </div>
  );
};
