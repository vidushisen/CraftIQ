import { MarketPartner } from '../types';

export const mockMarketPartners: MarketPartner[] = [
  {
    id: 'partner-1',
    name: 'FabHeritage Retail Alliance',
    nameHi: 'फैब-हेरिटेज रिटेल अलायंस',
    type: 'B2B Retail',
    location: 'New Delhi & Mumbai',
    activeDemands: ['Jaipur Blue Pottery (1,000 units/mo)', 'Kutch Embroidery Bags', 'Bastar Brass Statues'],
    contactPerson: 'Aditi Sengupta (Procurement Lead)',
    verifiedPartner: true,
    logo: '🏛️',
    description: 'Network of 45+ lifestyle boutique stores curating GI-tagged authentic Indian handcrafted decor and apparel.'
  },
  {
    id: 'partner-2',
    name: 'Hastashilp Fair-Trade Export Collective',
    nameHi: 'हस्तशिल्प फेयर-ट्रेड एक्सपोर्ट कलेक्टिव',
    type: 'Export House',
    location: 'Bengaluru & Hamburg (EU Hub)',
    activeDemands: ['Pure Kashmiri Pashmina Shawls', 'Madhubani Canvas Paintings', 'Dhokra Metal Art'],
    contactPerson: 'Dr. Vikram Anand (Director of Sourcing)',
    verifiedPartner: true,
    logo: '🌐',
    description: 'Direct ethical export bridge connecting Indian rural artisan clusters with European museum gift shops and ethical luxury boutiques.'
  },
  {
    id: 'partner-3',
    name: 'Gramin Kaushal Vikas Foundation',
    nameHi: 'ग्रामीण कौशल विकास फाउंडेशन',
    type: 'Fair Trade NGO',
    location: 'Jaipur, Patna & Raipur',
    activeDemands: ['Artisan Digital Literacy Workshops', 'Packaging & Quality Control Assistance', 'Micro-Credit Facilitation'],
    contactPerson: 'Meera Deshmukh (Community Coordinator)',
    verifiedPartner: true,
    logo: '🤝',
    description: 'Grassroots non-profit working across 60+ artisan villages to provide logistics, photography, and digital cataloging assistance.'
  },
  {
    id: 'partner-4',
    name: 'Uphaar Corporate Eco-Gifting Hub',
    nameHi: 'उपहार कॉर्पोरेट इको-गिफ्टिंग हब',
    type: 'B2B Retail',
    location: 'Hyderabad, Pune & Gurugram',
    activeDemands: ['Festive Diyas & Bowls (5,000 units Diwali demand)', 'Handmade Notebooks & Canvas Art'],
    contactPerson: 'Sanjay Rao (Corporate Sales)',
    verifiedPartner: true,
    logo: '🎁',
    description: 'Bulk corporate gifting platform supplying leading Indian tech enterprises with sustainable, plastic-free handmade gift hampers.'
  }
];
