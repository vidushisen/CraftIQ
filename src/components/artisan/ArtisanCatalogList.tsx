import React, { useState } from 'react';
import { ProductItem, ProductStatus } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAppData } from '../../context/AppDataContext';
import { Eye, MessageSquare, Plus } from 'lucide-react';

export const ArtisanCatalogList: React.FC<{ products: ProductItem[]; onAddNew: () => void }> = ({ products, onAddNew }) => {
  const { t, isHindi } = useLanguage();
  const { setSelectedProductForDetail } = useAppData();
  const [filterStatus, setFilterStatus] = useState<'all' | ProductStatus>('all');

  const filtered = products.filter(p => filterStatus === 'all' || p.status === filterStatus);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-craft-earth font-display">
          {t.myProducts} ({products.length})
        </h3>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600'
              }`}
            >
              {isHindi ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'published' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-stone-600'
              }`}
            >
              {isHindi ? 'प्रकाशित' : 'Published'}
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'draft' ? 'bg-white text-amber-800 shadow-xs font-bold' : 'text-stone-600'
              }`}
            >
              {isHindi ? 'ड्राफ्ट' : 'Draft'}
            </button>
          </div>

          <button
            onClick={onAddNew}
            className="flex items-center gap-1 bg-craft-terracotta hover:bg-craft-terracottaLight text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-warm transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isHindi ? 'नया जोड़ें' : 'Add Craft'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => setSelectedProductForDetail(product)}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-craft hover:shadow-craft-lg transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  <span className="bg-stone-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {isHindi ? product.craftTypeHi : product.craftType}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    product.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {product.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-stone-900 leading-snug group-hover:text-craft-terracotta transition-colors line-clamp-1 font-display">
                  {isHindi ? product.titleHi : product.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-serif">
                  {isHindi ? product.simpleDescriptionHi : product.simpleDescription}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {product.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between text-xs">
              <div>
                <span className="text-sm font-extrabold text-craft-terracotta font-display">
                  ₹{product.price}
                </span>
                <span className="text-[10px] text-stone-400 block">
                  {isHindi ? 'सुझाव: ' : 'AI Target: '}₹{product.suggestedPriceRange.min}–{product.suggestedPriceRange.max}
                </span>
              </div>

              <div className="flex items-center gap-3 text-stone-500 text-xs">
                <span className="flex items-center gap-1" title="Catalog Views">
                  <Eye className="w-3.5 h-3.5 text-stone-400" />
                  <strong>{product.views}</strong>
                </span>
                <span className="flex items-center gap-1" title="Buyer Inquiries">
                  <MessageSquare className="w-3.5 h-3.5 text-craft-terracotta" />
                  <strong>{product.inquiriesCount}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
