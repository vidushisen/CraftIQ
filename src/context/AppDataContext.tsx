import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, BuyerInquiry } from '../types';
import { storageService } from '../services/storageService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export type NewInquiryData = {
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
};

interface AppDataContextType {
  products: ProductItem[];
  inquiries: BuyerInquiry[];
  savedProductIds: string[];
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  addProduct: (product: ProductItem) => void;
  sendInquiry: (inquiry: NewInquiryData) => void;
  toggleSaveProduct: (productId: string) => boolean;
  isProductSaved: (productId: string) => boolean;
  selectedProductForDetail: ProductItem | null;
  setSelectedProductForDetail: (product: ProductItem | null) => void;
  selectedProductForInquiry: ProductItem | null;
  setSelectedProductForInquiry: (product: ProductItem | null) => void;
  isScanModalOpen: boolean;
  setIsScanModalOpen: (open: boolean) => void;
  isFairPriceModalOpen: boolean;
  setIsFairPriceModalOpen: (open: boolean) => void;
  refreshData: () => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => storageService.getProducts());
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>(() => storageService.getInquiries());
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => storageService.getSavedProductIds());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<ProductItem | null>(null);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<ProductItem | null>(null);
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [isFairPriceModalOpen, setIsFairPriceModalOpen] = useState<boolean>(false);

  const refreshData = () => {
    setProducts(storageService.getProducts());
    setInquiries(storageService.getInquiries());
    setSavedProductIds(storageService.getSavedProductIds());
  };

  useEffect(() => {
    const handleProductsUpdated = () => setProducts(storageService.getProducts());
    const handleInquiriesUpdated = () => setInquiries(storageService.getInquiries());
    const handleSavedUpdated = () => setSavedProductIds(storageService.getSavedProductIds());

    window.addEventListener('craftiq_products_updated', handleProductsUpdated);
    window.addEventListener('craftiq_inquiries_updated', handleInquiriesUpdated);
    window.addEventListener('craftiq_saved_updated', handleSavedUpdated);

    return () => {
      window.removeEventListener('craftiq_products_updated', handleProductsUpdated);
      window.removeEventListener('craftiq_inquiries_updated', handleInquiriesUpdated);
      window.removeEventListener('craftiq_saved_updated', handleSavedUpdated);
    };
  }, []);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addProduct = (product: ProductItem) => {
    storageService.saveProduct(product);
    refreshData();
    showToast({
      type: 'success',
      title: 'Catalog Published Successfully!',
      message: `${product.title} is now visible to buyers with AI Market Matches.`
    });
  };

  const sendInquiry = (inquiry: NewInquiryData) => {
    storageService.addInquiry(inquiry);
    refreshData();
    showToast({
      type: 'success',
      title: 'Inquiry Sent!',
      message: 'The artisan has been notified of your interest.'
    });
  };

  const toggleSaveProduct = (productId: string) => {
    const isSaved = storageService.toggleSaveProduct(productId);
    refreshData();
    showToast({
      type: 'info',
      title: isSaved ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: isSaved ? 'Product added to your saved heritage crafts.' : 'Product removed.'
    });
    return isSaved;
  };

  const isProductSaved = (productId: string) => {
    return savedProductIds.includes(productId);
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        inquiries,
        savedProductIds,
        toasts,
        showToast,
        removeToast,
        addProduct,
        sendInquiry,
        toggleSaveProduct,
        isProductSaved,
        selectedProductForDetail,
        setSelectedProductForDetail,
        selectedProductForInquiry,
        setSelectedProductForInquiry,
        isScanModalOpen,
        setIsScanModalOpen,
        isFairPriceModalOpen,
        setIsFairPriceModalOpen,
        refreshData
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
