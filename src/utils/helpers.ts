import { ProductItem } from '../types';

export const formatCurrencyINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const parseNaturalSearchQuery = (query: string, products: ProductItem[]) => {
  const q = query.toLowerCase().trim();
  if (!q) return products;

  let maxPrice: number | null = null;
  const underMatch = q.match(/(?:under|below|less than|within)\\s*(?:₹|rs\\.?|inr)?\\s*(\\d+)/i);
  if (underMatch && underMatch[1]) {
    maxPrice = parseInt(underMatch[1], 10);
  }

  const regions = ['rajasthan', 'bihar', 'gujarat', 'kashmir', 'chhattisgarh', 'odisha', 'bengal', 'jaipur', 'kutch', 'bastar', 'srinagar', 'madhubani'];
  const matchedRegion = regions.find(r => q.includes(r));

  const craftKeywords = ['blue pottery', 'pottery', 'madhubani', 'painting', 'dhokra', 'brass', 'metal', 'pashmina', 'shawl', 'bag', 'tote', 'embroidery', 'mirror'];
  const matchedCraft = craftKeywords.find(c => q.includes(c));

  return products.filter(p => {
    if (maxPrice !== null && p.price > maxPrice) {
      return false;
    }

    if (matchedRegion) {
      const stateMatch = p.state.toLowerCase().includes(matchedRegion);
      const regionMatch = p.artisanRegion.toLowerCase().includes(matchedRegion);
      if (!stateMatch && !regionMatch) {
        if (q.includes('from ' + matchedRegion) || q.includes('in ' + matchedRegion)) {
          return false;
        }
      }
    }

    const fullSearchableText = [
      p.title,
      p.titleHi,
      p.craftType,
      p.craftTypeHi,
      p.category,
      p.categoryHi,
      p.state,
      p.artisanName,
      p.artisanRegion,
      p.tags.join(' '),
      p.searchKeywords.join(' '),
      p.material.join(' ')
    ].join(' ').toLowerCase();

    const words = q.replace(/(?:show me|find|handmade|craft|under|below|less than|₹|rs|inr|\\d+)/gi, '').trim().split(/\\s+/).filter(w => w.length > 2);
    
    if (words.length === 0) {
      return true;
    }

    return words.some(w => fullSearchableText.includes(w)) || (matchedCraft ? fullSearchableText.includes(matchedCraft) : false);
  });
};
