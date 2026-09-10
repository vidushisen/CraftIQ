import { ProductItem, BuyerInquiry, ArtisanProfile } from '../types';
import { mockProducts } from '../data/mockProducts';
import { mockArtisans } from '../data/mockArtisans';

const STORAGE_KEYS = {
  PRODUCTS: 'craftiq_products',
  INQUIRIES: 'craftiq_inquiries',
  ARTISANS: 'craftiq_artisans',
  SAVED_PRODUCTS: 'craftiq_saved_products',
  ACTIVE_ARTISAN_ID: 'craftiq_active_artisan_id'
};

export class StorageService {
  private static instance: StorageService;

  private constructor() {
    this.initializeDefaultData();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  private initializeDefaultData() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ARTISANS)) {
      localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(mockArtisans));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      const defaultInquiries: BuyerInquiry[] = [
        {
          id: 'inq-1',
          productId: 'prod-1',
          productTitle: 'Handcrafted Blue Pottery Decorative Floral Bowl',
          productImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&auto=format&fit=crop&q=80',
          artisanId: 'artisan-1',
          buyerName: 'Ananya Sharma',
          buyerEmail: 'ananya.sharma@lifestyleboutique.in',
          buyerPhone: '+91 98111 22334',
          buyerType: 'retail_boutique',
          message: 'Hello Rameshwar-ji, we run a boutique in South Delhi and would like to order 25 of these blue pottery bowls for our festive curation.',
          quantityRequested: 25,
          createdAt: '2024-03-22T10:30:00Z',
          status: 'new'
        },
        {
          id: 'inq-2',
          productId: 'prod-1',
          productTitle: 'Handcrafted Blue Pottery Decorative Floral Bowl',
          productImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&auto=format&fit=crop&q=80',
          artisanId: 'artisan-1',
          buyerName: 'Vikram Joshi (Corporate Gifting Lead)',
          buyerEmail: 'vikram.j@techventure.com',
          buyerPhone: '+91 99220 55667',
          buyerType: 'corporate_gifting',
          message: 'Looking for 50 pieces with custom gift box packaging for Diwali gifting.',
          quantityRequested: 50,
          createdAt: '2024-03-21T15:45:00Z',
          status: 'contacted'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(defaultInquiries));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(['prod-1', 'prod-4']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID, 'artisan-1');
    }
  }

  public getProducts(): ProductItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : mockProducts;
    } catch {
      return mockProducts;
    }
  }

  public saveProduct(product: ProductItem): ProductItem {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('craftiq_products_updated'));
    return product;
  }

  public incrementProductViews(productId: string) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      prod.views = (prod.views || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }

  public getArtisans(): ArtisanProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARTISANS);
      return data ? JSON.parse(data) : mockArtisans;
    } catch {
      return mockArtisans;
    }
  }

  public getActiveArtisan(): ArtisanProfile {
    const artisans = this.getArtisans();
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID) || 'artisan-1';
    return artisans.find(a => a.id === activeId) || artisans[0];
  }

  public setActiveArtisan(artisanId: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID, artisanId);
    window.dispatchEvent(new Event('craftiq_artisan_changed'));
  }

  public getInquiries(): BuyerInquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public addInquiry(inquiry: {
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
  }): BuyerInquiry {
    const inquiries = this.getInquiries();
    const newInquiry: BuyerInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    
    const products = this.getProducts();
    const p = products.find(prod => prod.id === inquiry.productId);
    if (p) {
      p.inquiriesCount = (p.inquiriesCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }

    window.dispatchEvent(new Event('craftiq_inquiries_updated'));
    return newInquiry;
  }

  public getSavedProductIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public toggleSaveProduct(productId: string): boolean {
    const saved = this.getSavedProductIds();
    const index = saved.indexOf(productId);
    let isSaved = false;
    if (index >= 0) {
      saved.splice(index, 1);
      isSaved = false;
    } else {
      saved.push(productId);
      isSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_PRODUCTS, JSON.stringify(saved));
    window.dispatchEvent(new Event('craftiq_saved_updated'));
    return isSaved;
  }

  public resetToDemoDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ARTISANS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.SAVED_PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ARTISAN_ID);
    this.initializeDefaultData();
    window.location.reload();
  }
}

export const storageService = StorageService.getInstance();
