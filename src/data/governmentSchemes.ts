import { GovernmentOpportunity } from '../types';

export const governmentSchemes: GovernmentOpportunity[] = [
  {
    id: 'scheme-1',
    title: 'PM Vishwakarma Scheme',
    titleHi: 'पीएम विश्वकर्मा योजना',
    organization: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    organizationHi: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME)',
    category: 'financial_support',
    description: 'Comprehensive financial support, collateral-free loans at concessional interest (5%), modern skill training stipend (₹500/day), toolkit incentive (₹15,000), and marketing linkage support for 18 traditional trade crafts.',
    descriptionHi: '18 पारंपरिक शिल्पों के लिए ₹15,000 टूलकिट अनुदान, 5% रियायती ब्याज पर ऋण, दैनिक प्रशिक्षण वजीफा एवं विपणन सहायता।',
    eligibility: 'Artisans engaged in traditional crafts without active institutional loan defaults.',
    eligibilityHi: 'पारंपरिक शिल्पों से जुड़े कारीगर एवं शिल्पकार।',
    officialUrl: 'https://pmvishwakarma.gov.in',
    badge: 'Official Portal',
    badgeHi: 'आधिकारिक पोर्टल'
  },
  {
    id: 'scheme-2',
    title: 'One District One Product (ODOP) Initiative',
    titleHi: 'एक जिला एक उत्पाद (ODOP) पहल',
    organization: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    organizationHi: 'उद्योग संवर्धन और आंतरिक व्यापार विभाग (DPIIT)',
    category: 'market_linkage',
    description: 'Specialized market linkage, packaging modernization, export facilitation, and branding support for distinct indigenous handicraft and handloom clusters identified across every Indian district.',
    descriptionHi: 'प्रत्येक जिले के पारंपरिक शिल्पों के लिए ब्रांडिंग, पैकेजिंग आधुनिकीकरण एवं निर्यात लिंकेज।',
    eligibility: 'Registered district craft producer groups, SHGs, and recognized master artisans.',
    eligibilityHi: 'जिले के पंजीकृत शिल्पकार, स्वयं सहायता समूह एवं कारीगर।',
    officialUrl: 'https://www.indiatradefair.com',
    badge: 'Market Linkage',
    badgeHi: 'बाजार लिंकेज'
  },
  {
    id: 'scheme-3',
    title: 'GeM (Government e-Marketplace) Artisan Onboarding',
    titleHi: 'GeM पोर्टल पर कारीगर पंजीकरण',
    organization: 'Ministry of Commerce and Industry',
    organizationHi: 'वाणिज्य एवं उद्योग मंत्रालय',
    category: 'market_linkage',
    description: 'Direct access to sell handcrafted products and office decor items directly to central and state government departments, ministries, and public sector undertakings without intermediaries.',
    descriptionHi: 'सरकारी विभागों और मंत्रालयों को सीधे हस्तशिल्प और उत्पाद बेचने के लिए शून्य कमीशन प्लेटफॉर्म।',
    eligibility: 'Artisans with Pehchan Artisan Card or State Handicrafts Board registration.',
    eligibilityHi: 'पहचान कार्ड धारक या राज्य हस्तशिल्प बोर्ड पंजीकृत कारीगर।',
    officialUrl: 'https://gem.gov.in',
    badge: 'B2G Direct Selling',
    badgeHi: 'सरकारी बिक्री'
  },
  {
    id: 'scheme-4',
    title: 'National Handicraft Development Programme (NHDP)',
    titleHi: 'राष्ट्रीय हस्तशिल्प विकास कार्यक्रम (NHDP)',
    organization: 'Office of the Development Commissioner (Handicrafts), Ministry of Textiles',
    organizationHi: 'विकास आयुक्त (हस्तशिल्प), कपड़ा मंत्रालय',
    category: 'training',
    description: 'Empowers craft clusters through common facility centers, design & technology workshops with NID/NIFT experts, direct domestic Gandhi Shilp Bazaar stalls, and international fair participation grants.',
    descriptionHi: 'डिजाइन वर्कशॉप, गांधी शिल्प बाजार में निःशुल्क स्टॉल एवं अंतर्राष्ट्रीय प्रदर्शनियों में भाग लेने के लिए सहायता।',
    eligibility: 'Individual artisans holding Pehchan Card and registered artisan self-help groups.',
    eligibilityHi: 'पहचान कार्ड धारक व्यक्तिगत कारीगर एवं स्वयं सहायता समूह।',
    officialUrl: 'https://handicrafts.nic.in',
    badge: 'Ministry of Textiles',
    badgeHi: 'कपड़ा मंत्रालय'
  },
  {
    id: 'scheme-5',
    title: 'Shilp Guru & National Awards for Master Craftsmen',
    titleHi: 'शिल्प गुरु एवं राष्ट्रीय हस्तशिल्प पुरस्कार',
    organization: 'Ministry of Textiles, Government of India',
    organizationHi: 'कपड़ा मंत्रालय, भारत सरकार',
    category: 'exhibition',
    description: 'Prestigious national recognition conferring a gold medal, ₹2,00,000 cash citation, and global master craftsman status for exemplary contributions towards the revival and preservation of rare heritage crafts.',
    descriptionHi: 'दुर्लभ और पारंपरिक कलाओं के संरक्षण हेतु स्वर्ण पदक, प्रशस्ति पत्र एवं ₹2 लाख का राष्ट्रीय सम्मान।',
    eligibility: 'Master artisans with minimum 15+ years of verified heritage craft practice.',
    eligibilityHi: '15+ वर्ष के अनुभव वाले मास्टर शिल्पकार।',
    officialUrl: 'https://handicrafts.nic.in',
    badge: 'National Recognition',
    badgeHi: 'राष्ट्रीय सम्मान'
  }
];
