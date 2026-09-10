import React from 'react';
import { CheckCircle, ShieldCheck, Sparkles, Feather, Award } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface BadgeProps {
  type: 'handmade' | 'verified' | 'traditional' | 'gi' | 'ai_match' | 'official';
  text?: string;
  size?: 'sm' | 'md';
}

export const CraftBadge: React.FC<BadgeProps> = ({ type, text, size = 'md' }) => {
  const { isHindi } = useLanguage();

  const isSmall = size === 'sm';
  const sizeClasses = isSmall ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (type) {
    case 'handmade':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-craft-clay border border-amber-200 ${sizeClasses}`}>
          <Feather className="w-3 h-3 text-craft-terracotta" />
          <span>{text || (isHindi ? '100% हस्तनिर्मित' : '100% Handmade')}</span>
        </span>
      );
    case 'verified':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${sizeClasses}`}>
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>{text || (isHindi ? 'प्रोफ़ाइल सत्यापित' : 'Profile Verified')}</span>
        </span>
      );
    case 'traditional':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 ${sizeClasses}`}>
          <Award className="w-3 h-3 text-amber-700" />
          <span>{text || (isHindi ? 'पारंपरिक विरासत' : 'Traditional Craft')}</span>
        </span>
      );
    case 'ai_match':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-orange-50 text-craft-terracotta border border-orange-200 font-semibold ${sizeClasses}`}>
          <Sparkles className="w-3 h-3 text-craft-terracotta animate-pulse" />
          <span>{text || (isHindi ? 'AI बाज़ार मैच' : 'AI Market Match')}</span>
        </span>
      );
    case 'official':
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 ${sizeClasses}`}>
          <CheckCircle className="w-3 h-3 text-blue-600" />
          <span>{text || (isHindi ? 'सरकारी पोर्टल' : 'Official Portal')}</span>
        </span>
      );
  }
};
