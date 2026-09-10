import { ProductItem, MarketMatchScore } from '../types';

export class MarketService {
  public static calculateMatchesForProduct(product: Partial<ProductItem>): MarketMatchScore[] {
    const matches: MarketMatchScore[] = [];
    const craft = (product.craftType || '').toLowerCase();
    const price = product.price || 1000;

    if (craft.includes('pottery') || craft.includes('painting') || craft.includes('metal') || craft.includes('brass') || craft.includes('sculpture')) {
      matches.push({
        segmentName: 'Interior Designers & Home Décor Boutiques',
        segmentNameHi: 'इंटीरियर डिज़ाइनर्स एवं होम डेकोर स्टोर्स',
        matchPercentage: Math.min(96, Math.max(82, 92)),
        reason: 'Handmade, decorative and associated with a traditional regional craft, making it highly suitable for modern sustainable interior aesthetics.',
        reasonHi: 'पारंपरिक क्षेत्रीय शिल्प और प्राकृतिक फिनिश के कारण आधुनिक होम डेकोर के लिए अत्यंत उपयुक्त।',
        targetBuyerCount: 140
      });
    }

    if (price <= 2500) {
      matches.push({
        segmentName: 'Corporate & Festival Gifting Curation',
        segmentNameHi: 'कॉर्पोरेट एवं त्यौहार उपहार',
        matchPercentage: Math.min(94, Math.max(80, 88)),
        reason: 'Accessible price bracket under ₹2,500 and authentic Indian heritage story make this attractive for bulk corporate hampers.',
        reasonHi: '₹2,500 के अंदर का मूल्य और प्रामाणिक भारतीय विरासत कहानी इसे कॉर्पोरेट गिफ्टिंग के लिए आदर्श बनाती है।',
        targetBuyerCount: 95
      });
    }

    if (craft.includes('pashmina') || craft.includes('embroidery') || craft.includes('bag') || craft.includes('textile') || craft.includes('shawl')) {
      matches.push({
        segmentName: 'Ethical Fashion & Conscious Apparel Boutiques',
        segmentNameHi: 'एथिकल फैशन एवं परिधान स्टोर्स',
        matchPercentage: 95,
        reason: 'Zero-plastic artisanal craftsmanship and women-led collective provenance match global sustainable fashion demand.',
        reasonHi: 'सस्टेनेबल सामग्री और महिला कारीगरों के नेतृत्व वाले समूह वैश्विक फैशन खरीदारों को आकर्षित करते हैं।',
        targetBuyerCount: 165
      });
    }

    matches.push({
      segmentName: 'Cultural Tourism & Museum Gift Shops',
      segmentNameHi: 'सांस्कृतिक पर्यटन एवं संग्रहालय दुकानें',
      matchPercentage: 84,
      reason: 'GI-tagged regional craft story offers deep cultural memorabilia value for domestic and international travelers.',
      reasonHi: 'जीआई-टैग क्षेत्रीय शिल्प पर्यटकों के लिए प्रामाणिक सांस्कृतिक स्मृति चिह्न प्रदान करता है।',
      targetBuyerCount: 65
    });

    return matches;
  }
}
