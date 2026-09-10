export type UserRole = 'artisan' | 'buyer' | 'admin';
export type AppLanguage = 'en' | 'hi';
export type ProductStatus = 'draft' | 'published' | 'interested' | 'sold';

export interface ArtisanProfile {
  id: string;
  name: string;
  nameHi: string;
  avatar: string;
  craftType: string;
  craftTypeHi: string;
  region: string;
  regionHi: string;
  state: string;
  stateHi: string;
  experienceYears: number;
  story: string;
  storyHi: string;
  technique: string;
  techniqueHi: string;
  isProfileVerified: boolean;
  isHandmadeCertified: boolean;
  phone?: string;
  catalogCount: number;
  totalViews: number;
  totalInquiries: number;
  rating: number;
  joinedDate: string;
}

export interface MarketMatchScore {
  segmentName: string;
  segmentNameHi: string;
  matchPercentage: number;
  reason: string;
  reasonHi: string;
  targetBuyerCount: number;
}

export interface ProductItem {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanRegion: string;
  title: string;
  titleHi: string;
  simpleDescription: string;
  simpleDescriptionHi: string;
  detailedDescription: string;
  detailedDescriptionHi: string;
  craftStory: string;
  craftStoryHi: string;
  craftType: string;
  craftTypeHi: string;
  category: string;
  categoryHi: string;
  material: string[];
  materialHi: string[];
  state: string;
  price: number;
  suggestedPriceRange: {
    min: number;
    max: number;
  };
  fairPriceDetails?: {
    materialCost: number;
    laborHours: number;
    hourlyRate: number;
    indicativeTotal: number;
  };
  tags: string[];
  searchKeywords: string[];
  images: string[];
  makingTimeDays: number;
  status: ProductStatus;
  views: number;
  inquiriesCount: number;
  marketMatches: MarketMatchScore[];
  socialCaption: string;
  socialCaptionHi: string;
  createdAt: string;
  isHandmade: boolean;
  isTraditionalCraft: boolean;
  isRegionalCraft: boolean;
  isFeatured?: boolean;
}

export interface BuyerInquiry {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  artisanId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerType: 'individual' | 'retail_boutique' | 'corporate_gifting' | 'export_agency';
  message: string;
  quantityRequested: number;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface GovernmentOpportunity {
  id: string;
  title: string;
  titleHi: string;
  organization: string;
  organizationHi: string;
  category: 'scheme' | 'training' | 'exhibition' | 'market_linkage' | 'financial_support';
  description: string;
  descriptionHi: string;
  eligibility: string;
  eligibilityHi: string;
  officialUrl: string;
  deadline?: string;
  badge: string;
  badgeHi: string;
}

export interface MarketPartner {
  id: string;
  name: string;
  nameHi: string;
  type: 'B2B Retail' | 'Fair Trade NGO' | 'Export House' | 'Ecosystem Hub';
  location: string;
  activeDemands: string[];
  contactPerson: string;
  verifiedPartner: boolean;
  logo: string;
  description: string;
}

export interface AiCatalogGenerationRequest {
  imageFile?: File | string;
  presetCraft?: string;
  rawInputNotes?: string;
  craftCategory?: string;
  material?: string;
  approximatePrice?: number;
  location?: string;
  voiceTranscript?: string;
  language?: AppLanguage;
}

export interface AiCatalogGenerationResult {
  titleEn: string;
  titleHi: string;
  category: string;
  categoryHi: string;
  craftType: string;
  craftTypeHi: string;
  simpleDescriptionEn: string;
  simpleDescriptionHi: string;
  detailedDescriptionEn: string;
  detailedDescriptionHi: string;
  craftStoryEn: string;
  craftStoryHi: string;
  materialsEn: string[];
  materialsHi: string[];
  suggestedPriceMin: number;
  suggestedPriceMax: number;
  tagsEn: string[];
  tagsHi: string[];
  searchKeywords: string[];
  socialCaptionEn: string;
  socialCaptionHi: string;
  customerSegmentEn: string;
  customerSegmentHi: string;
  marketMatches: MarketMatchScore[];
  confidenceScore: number;
  detectedVisualAttributes: string[];
}
