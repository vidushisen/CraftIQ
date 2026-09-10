import { ProductItem } from '../types';

export const mockProducts: ProductItem[] = [
  {
    id: 'prod-1',
    artisanId: 'artisan-1',
    artisanName: 'Rameshwar Prajapati',
    artisanRegion: 'Jaipur, Rajasthan',
    title: 'Handcrafted Blue Pottery Decorative Floral Bowl',
    titleHi: 'हस्तनिर्मित जयपुरी ब्लू पॉटरी फ्लोरल डेकोरेटिव बाउल',
    simpleDescription: 'Traditional 8-inch handcrafted ceramic bowl with cobalt blue floral motifs.',
    simpleDescriptionHi: 'पारंपरिक 8-इंच हस्तनिर्मित सेरामिक बाउल, नीले कोबाल्ट फूलों की नक्काशी के साथ।',
    detailedDescription: 'Crafted without clay using powdered quartz, fuller’s earth, and natural gum, this iconic Jaipur Blue Pottery bowl features intricate Persian-inspired botanical motifs hand-painted with cobalt oxide. Perfect for centerpieces, gifting, and dry snacks.',
    detailedDescriptionHi: 'क्वार्ट्ज पत्थर पाउडर और मुल्तानी मिट्टी से निर्मित यह प्रसिद्ध जयपुरी बाउल कोबाल्ट ब्लू से हाथ से पेंट किया गया है। होम डेकोर और उपहार के लिए उत्तम।',
    craftStory: 'Blue Pottery originated in Turko-Persia and came to Jaipur in the 19th century under Maharaja Sawai Ram Singh II. Each piece takes 12 days to shape, paint, glaze and bake in wood-fired kilns.',
    craftStoryHi: 'ब्लू पॉटरी 19वीं सदी में जयपुर के महाराजा सवाई राम सिंह द्वितीय के काल में लोकप्रिय हुई। इसे तैयार करने में 12 दिन लगते हैं।',
    craftType: 'Jaipur Blue Pottery',
    craftTypeHi: 'जयपुरी ब्लू पॉटरी',
    category: 'Home Décor & Tableware',
    categoryHi: 'होम डेकोर एवं टेबलवेयर',
    material: ['Quartz Stone Powder', 'Fuller’s Earth (Multani Mitti)', 'Cobalt Oxide Pigment', 'Natural Resin Gum'],
    materialHi: ['क्वार्ट्ज पत्थर पाउडर', 'मुल्तानी मिट्टी', 'कोबाल्ट ऑक्साइड रंग', 'प्राकृतिक गोंद'],
    state: 'Rajasthan',
    price: 1250,
    suggestedPriceRange: {
      min: 1100,
      max: 1450
    },
    fairPriceDetails: {
      materialCost: 380,
      laborHours: 6.5,
      hourlyRate: 110,
      indicativeTotal: 1245
    },
    tags: ['Blue Pottery', 'Jaipur Craft', 'Handmade Bowl', 'Home Décor', 'Eco Friendly', 'Indian Art'],
    searchKeywords: ['blue pottery bowl', 'jaipur ceramic', 'handmade gift under 1500', 'traditional decor', 'handcrafted tableware'],
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'
    ],
    makingTimeDays: 7,
    status: 'published',
    views: 1284,
    inquiriesCount: 26,
    marketMatches: [
      {
        segmentName: 'Premium Home Décor Boutiques',
        segmentNameHi: 'प्रीमियम होम डेकोर बुटीक',
        matchPercentage: 94,
        reason: 'Handmade, authentic heritage aesthetic aligns with high-end interior styling trends.',
        reasonHi: 'हस्तनिर्मित और पारंपरिक डिज़ाइन होम डेकोर स्टोर्स के लिए 94% अनुकूल है।',
        targetBuyerCount: 140
      },
      {
        segmentName: 'Corporate & Festival Gifting',
        segmentNameHi: 'कॉर्पोरेट एवं त्यौहार उपहार',
        matchPercentage: 88,
        reason: 'Price point (₹1,000–₹1,500) and lightweight packaging make it ideal for festive hampers.',
        reasonHi: '₹1000-₹1500 की मूल्य सीमा इसे कॉर्पोरेट उपहारों के लिए उपयुक्त बनाती है।',
        targetBuyerCount: 85
      },
      {
        segmentName: 'Heritage Tourism Retailers',
        segmentNameHi: 'विरासत पर्यटन विक्रेता',
        matchPercentage: 82,
        reason: 'Iconic GI-tagged Rajasthan craft with strong appeal for cultural tourists.',
        reasonHi: 'राजस्थान की जीआई टैग कला पर्यटकों के बीच बहुत लोकप्रिय है।',
        targetBuyerCount: 60
      }
    ],
    socialCaption: 'Bring 200 years of Jaipur royal heritage to your living space. Hand-painted Blue Pottery bowl made with pure quartz and natural cobalt glaze.',
    socialCaptionHi: 'जयपुर की 200 साल पुरानी शाही विरासत को अपने घर लाएं। हाथ से पेंट किया गया प्रामाणिक ब्लू पॉटरी बाउल।',
    createdAt: '2024-03-20',
    isHandmade: true,
    isTraditionalCraft: true,
    isRegionalCraft: true,
    isFeatured: true
  },
  {
    id: 'prod-2',
    artisanId: 'artisan-2',
    artisanName: 'Devi Kumari Devi',
    artisanRegion: 'Madhubani, Bihar',
    title: 'Tree of Life - Authentic Kachni Madhubani Painting',
    titleHi: 'जीवन का वृक्ष - प्रामाणिक कचनी मधुबनी चित्रकला',
    simpleDescription: 'Hand-painted 16x20 inch Mithila folk art on handmade canvas with natural pigments.',
    simpleDescriptionHi: 'हस्तनिर्मित कैनवास पर प्राकृतिक रंगों से बनी 16x20 इंच मिथिला लोक कला।',
    detailedDescription: 'An exquisite hand-rendered Mithila masterpiece depicting the sacred "Tree of Life" surrounded by birds and wildlife symbolizing fertility and cosmic unity. Hand-drawn using bamboo twigs and nib pens without stencils.',
    detailedDescriptionHi: 'बांस की तीलियों और प्राकृतिक रंगों से हस्तनिर्मित मिथिला कलाकृति, जिसमें जीवन का वृक्ष और पक्षी चित्रित हैं।',
    craftStory: 'Passed down maternally across Mithila households for wedding and harvest blessings, each stroke represents devotion and natural harmony.',
    craftStoryHi: 'मिथिला की सदियों पुरानी मातृसत्तात्मक परंपरा, जिसमें प्रकृति और जीवन के उत्सव का चित्रण होता है।',
    craftType: 'Mithila / Madhubani Art',
    craftTypeHi: 'मिथिला / मधुबनी चित्रकला',
    category: 'Traditional Art & Paintings',
    categoryHi: 'पारंपरिक कला एवं पेंटिंग्स',
    material: ['Handmade Cotton Rag Paper', 'Turmeric Yellow', 'Lampblack Ink', 'Indigo Dye', 'Crushed Leaves'],
    materialHi: ['सूती हस्तनिर्मित कागज़', 'हल्दी का पीला रंग', 'कालिख की स्याही', 'नील रंग', 'पत्तियों का रस'],
    state: 'Bihar',
    price: 2400,
    suggestedPriceRange: {
      min: 2200,
      max: 2900
    },
    fairPriceDetails: {
      materialCost: 450,
      laborHours: 14,
      hourlyRate: 130,
      indicativeTotal: 2370
    },
    tags: ['Madhubani', 'Mithila Art', 'Tree of Life', 'Natural Dyes', 'Folk Painting', 'Wall Art'],
    searchKeywords: ['madhubani painting', 'tree of life wall art', 'folk art under 3000', 'bihar painting', 'bihar handmade'],
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=800&auto=format&fit=crop&q=80'
    ],
    makingTimeDays: 10,
    status: 'published',
    views: 1840,
    inquiriesCount: 39,
    marketMatches: [
      {
        segmentName: 'Art Galleries & Curators',
        segmentNameHi: 'आर्ट गैलरी एवं कला संग्राहक',
        matchPercentage: 96,
        reason: 'Authentic Kachni line-work using natural pigments meets fine-art collector criteria.',
        reasonHi: 'प्राकृतिक रंगों से बनी बारीक कचनी रेखाएं कला दीर्घाओं के लिए 96% सटीक हैं।',
        targetBuyerCount: 110
      },
      {
        segmentName: 'Luxury Hospitality & Resorts',
        segmentNameHi: 'लक्ज़री होटल एवं रिसॉर्ट्स',
        matchPercentage: 91,
        reason: 'Large dimensions and cultural storytelling suit boutique heritage hotel decor.',
        reasonHi: 'विरासत होटलों और लाउंज की दीवारों के लिए उत्कृष्ट विकल्प।',
        targetBuyerCount: 75
      }
    ],
    socialCaption: 'Hand-drawn with bamboo twigs over 10 days, this Madhubani Tree of Life brings sacred blessings and traditional Indian folk beauty to your home.',
    socialCaptionHi: '10 दिनों में बांस की कलम और प्राकृतिक रंगों से बनाई गई मधुबनी कलाकृति।',
    createdAt: '2024-03-12',
    isHandmade: true,
    isTraditionalCraft: true,
    isRegionalCraft: true,
    isFeatured: true
  },
  {
    id: 'prod-3',
    artisanId: 'artisan-3',
    artisanName: 'Mangal Ram Kashyap',
    artisanRegion: 'Bastar, Chhattisgarh',
    title: 'Tribal Musician Figurine - Lost-Wax Dhokra Bell Metal',
    titleHi: 'आदिवासी संगीतकार प्रतिमा - ढोकरा लॉस्ट-वैक्स बेल मेटल',
    simpleDescription: 'Solid cast antique brass metal sculpture crafted with 4,000-year-old tribal technique.',
    simpleDescriptionHi: '4000 वर्ष पुरानी ढोकरा पद्धति से ढली हुई ठोस पीतल की आदिवासी संगीतकार प्रतिमा।',
    detailedDescription: 'Handmade by tribal Bastar artisans using the ancient Cire Perdue (lost-wax) technique. Each figurine is individually modeled using beeswax threads, making every single piece unique with its own rustic character and antique patina finish.',
    detailedDescriptionHi: 'बस्तर के आदिवासी कारीगरों द्वारा लॉस्ट-वैक्स तकनीक से निर्मित। मोम के धागों से बनी अनूठी पीतल की मूर्ति।',
    craftStory: 'Dhokra casting dates back to the Mohenjo-Daro Dancing Girl artifact. The craft honors forest deities and tribal celebrations.',
    craftStoryHi: 'ढोकरा धातु ढलाई का इतिहास सिंधु घाटी सभ्यता से जुड़ा है। यह कला जनजातीय उत्सवों को समर्पित है।',
    craftType: 'Bastar Dhokra Metal Art',
    craftTypeHi: 'बस्तर ढोकरा मेटल आर्ट',
    category: 'Metalware & Sculptures',
    categoryHi: 'धातु शिल्प एवं मूर्तियां',
    material: ['Recycled Bell Metal (Brass & Bronze)', 'Beeswax Threads', 'Riverbed Alluvial Clay', 'Charcoal'],
    materialHi: ['रिसाइकिल पीतल/कांस्य', 'मधुमक्खी मोम के धागे', 'नदी की गाद मिट्टी', 'कोयला'],
    state: 'Chhattisgarh',
    price: 1850,
    suggestedPriceRange: {
      min: 1700,
      max: 2150
    },
    fairPriceDetails: {
      materialCost: 520,
      laborHours: 9,
      hourlyRate: 135,
      indicativeTotal: 1835
    },
    tags: ['Dhokra Art', 'Tribal Metal', 'Lost Wax Casting', 'Brass Figurine', 'Bastar Craft', 'Sculpture'],
    searchKeywords: ['dhokra sculpture', 'bastar brass figurine', 'lost wax metal craft', 'tribal handicraft under 2000'],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80'
    ],
    makingTimeDays: 8,
    status: 'published',
    views: 920,
    inquiriesCount: 18,
    marketMatches: [
      {
        segmentName: 'Boutique Interior Designers',
        segmentNameHi: 'इंटीरियर डिज़ाइनर्स एवं स्टाइलिस्ट',
        matchPercentage: 92,
        reason: 'Rustic brass patina and primal shapes match modern rustic & brutalist design trends.',
        reasonHi: 'मॉडर्न और रस्टिक इंटीरियर डिज़ाइन के लिए 92% मैच।',
        targetBuyerCount: 88
      },
      {
        segmentName: 'Museum & Cultural Gift Shops',
        segmentNameHi: 'सांस्कृतिक उपहार एवं संग्रहालय स्टोर',
        matchPercentage: 89,
        reason: 'Deep archaeological historical lineage creates exceptional souvenir value.',
        reasonHi: 'ऐतिहासिक महत्व के कारण सांस्कृतिक उपहार दुकानों में उच्च मांग।',
        targetBuyerCount: 65
      }
    ],
    socialCaption: 'A 4,000-year-old living heritage in your hands. Hand-cast Dhokra brass tribal musician sculpture from Bastar.',
    socialCaptionHi: 'बस्तर के जंगलों से 4000 साल पुरानी ढोकरा कला। पीतल की अनूठी हस्तनिर्मित मूर्ति।',
    createdAt: '2024-03-18',
    isHandmade: true,
    isTraditionalCraft: true,
    isRegionalCraft: true,
    isFeatured: false
  },
  {
    id: 'prod-4',
    artisanId: 'artisan-4',
    artisanName: 'Ghulam Mohammad Dar',
    artisanRegion: 'Srinagar, Kashmir',
    title: 'Pure Pashmina Shawl with Hand Sozni Needlework',
    titleHi: 'शुद्ध पश्मीना शॉल - हस्तनिर्मित सोज़नी कशीदाकारी',
    simpleDescription: 'Featherlight 100% Changthangi cashmere pashmina with intricate floral border embroidery.',
    simpleDescriptionHi: 'चांगथांगी पश्मीना ऊन की अत्यंत हल्की व गर्म शॉल, हाथ की सोज़नी बॉर्डर कढ़ाई के साथ।',
    detailedDescription: 'Spun from the delicate undercoat of high-altitude Himalayan Capra Hircus goats, this pure Kashmiri Pashmina is woven on a traditional wooden handloom and detailed with micro-needle Sozni floral borders.',
    detailedDescriptionHi: 'हिमालयी चांगथांगी बकरियों की महीन पश्मीना ऊन से हाथ की खड्डी पर बुनी और सोज़नी सुई से कढ़ी शॉल।',
    craftStory: 'Kashmiri Pashmina has draped royalty for centuries. Authenticated by passing effortlessly through a finger ring.',
    craftStoryHi: 'कश्मीरी पश्मीना सदियों से राजघरानों की शान रही है। अपनी बेमिसाल गर्माहट और कोमलता के लिए प्रसिद्ध।',
    craftType: 'Kashmiri Handloom Pashmina',
    craftTypeHi: 'कश्मीरी हथकरघा पश्मीना',
    category: 'Handloom & Textiles',
    categoryHi: 'हथकरघा एवं परिधान',
    material: ['100% Pure Changthangi Pashmina Wool', 'Silk Embroidery Threads'],
    materialHi: ['100% शुद्ध चांगथांगी पश्मीना ऊन', 'रेशमी कढ़ाई के धागे'],
    state: 'Jammu & Kashmir',
    price: 8500,
    suggestedPriceRange: {
      min: 7800,
      max: 9800
    },
    fairPriceDetails: {
      materialCost: 3200,
      laborHours: 42,
      hourlyRate: 120,
      indicativeTotal: 8240
    },
    tags: ['Pashmina', 'Kashmiri Shawl', 'Sozni Work', 'Cashmere', 'Handloom', 'Luxury Textile'],
    searchKeywords: ['pure pashmina shawl', 'kashmiri handloom shawl', 'sozni needlework', 'luxury handmade gift'],
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop&q=80'
    ],
    makingTimeDays: 28,
    status: 'published',
    views: 3100,
    inquiriesCount: 51,
    marketMatches: [
      {
        segmentName: 'Luxury Ethical Fashion Retailers',
        segmentNameHi: 'लक्ज़री एथिकल फैशन रिटेलर्स',
        matchPercentage: 97,
        reason: 'Certified pure handloom cashmere with verifiable artisan provenance commands premium global retail.',
        reasonHi: 'शुद्ध हाथ से बनी पश्मीना अंतरराष्ट्रीय व घरेलू लक्जरी फैशन स्टोर्स के लिए 97% अनुकूल है।',
        targetBuyerCount: 160
      },
      {
        segmentName: 'High-Net-Worth Individual Gifting',
        segmentNameHi: 'विशिष्ट वैयक्तिक एवं वीआईपी उपहार',
        matchPercentage: 93,
        reason: 'Timeless heirloom gifting for weddings, dignitaries, and collectors.',
        reasonHi: 'विवाह व खास अवसरों पर विरासत उपहार के रूप में उच्च मांग।',
        targetBuyerCount: 95
      }
    ],
    socialCaption: 'Wrap yourself in ethereal warmth. Hand-spun and handloom-woven pure Kashmiri Pashmina with timeless Sozni needle craft.',
    socialCaptionHi: 'कश्मीर की वादियों की सौम्य गर्माहट। हाथ से कती और बुनी असली पश्मीना शॉल।',
    createdAt: '2024-02-14',
    isHandmade: true,
    isTraditionalCraft: true,
    isRegionalCraft: true,
    isFeatured: true
  },
  {
    id: 'prod-5',
    artisanId: 'artisan-5',
    artisanName: 'Pabiben Rabari',
    artisanRegion: 'Bhuj, Gujarat',
    title: 'Embroidered Kutchi Mirror-Work Tote Bag',
    titleHi: 'कच्छी आरी-दर्पण कढ़ाई वाला हस्तनिर्मित टोट बैग',
    simpleDescription: 'Vibrant handcrafted cotton tote bag with genuine mirror work and traditional tribal motifs.',
    simpleDescriptionHi: 'पारंपरिक गुजराती दर्पण कढ़ाई से सुसज्जित रंगीन और मजबूत सूती टोट बैग।',
    detailedDescription: 'Hand-embroidered by women artisans of the Rabari community in Kutch, this sturdy eco-friendly tote bag features geometric diamond patterns, genuine mirror inserts, and sturdy reinforced cotton canvas straps.',
    detailedDescriptionHi: 'कच्छ के रबारी समुदाय की महिलाओं द्वारा निर्मित। असली कांच के दर्पण और मजबूत सूती कपड़े से बना टिकाऊ बैग।',
    craftStory: 'Kutch embroidery reflects the colorful identity of desert pastoral communities, converting everyday utility items into celebratory art.',
    craftStoryHi: 'रेगिस्तानी लोक जीवन के उल्लास को दर्शाती कच्छी कढ़ाई, जो हर दिन के उपयोग को कला में बदल देती है।',
    craftType: 'Kutch Tribal Embroidery',
    craftTypeHi: 'कच्छ जनजातीय कढ़ाई',
    category: 'Fashion & Accessories',
    categoryHi: 'फैशन एवं एक्सेसरीज',
    material: ['Handspun Cotton Canvas', 'Glass Mirrors', 'Vegetable Dyed Threads'],
    materialHi: ['हाथ से काता सूती कैनवास', 'कांच के दर्पण', 'प्राकृतिक रंगे धागे'],
    state: 'Gujarat',
    price: 950,
    suggestedPriceRange: {
      min: 850,
      max: 1200
    },
    fairPriceDetails: {
      materialCost: 240,
      laborHours: 5.5,
      hourlyRate: 115,
      indicativeTotal: 932
    },
    tags: ['Kutch Embroidery', 'Mirror Work', 'Tote Bag', 'Boho Chic', 'Sustainable Fashion', 'Gujarat Craft'],
    searchKeywords: ['kutch embroidered bag', 'mirror work tote', 'handmade bag under 1000', 'boho handmade bag', 'gujarat craft'],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'
    ],
    makingTimeDays: 4,
    status: 'published',
    views: 1420,
    inquiriesCount: 31,
    marketMatches: [
      {
        segmentName: 'Eco-conscious & Youth Fashion Boutiques',
        segmentNameHi: 'इको-फ्रेंडली एवं युवा फैशन बुटीक',
        matchPercentage: 95,
        reason: 'Affordable price point, zero plastic, and vibrant boho appeal among young urban consumers.',
        reasonHi: 'युवाओं और सस्टेनेबल फैशन खरीदारों के बीच 95% उच्च मांग।',
        targetBuyerCount: 175
      },
      {
        segmentName: 'Export & Fair Trade Gift Shops',
        segmentNameHi: 'एक्सपोर्ट एवं फेयर ट्रेड गिफ्ट स्टोर्स',
        matchPercentage: 88,
        reason: 'Women-empowerment artisan collective story provides compelling retail marketing.',
        reasonHi: 'महिला सशक्तिकरण और फेयर ट्रेड स्टोर्स के लिए बेहतरीन उत्पाद।',
        targetBuyerCount: 105
      }
    ],
    socialCaption: 'Carry sunshine and desert heritage wherever you go. Hand-embroidered mirror work tote bag crafted by Kutch artisan collectives.',
    socialCaptionHi: 'कच्छ की रंगीन धूप और संस्कृति अपने साथ ले जाएं। असली दर्पण कढ़ाई वाला मजबूत टोट बैग।',
    createdAt: '2024-03-01',
    isHandmade: true,
    isTraditionalCraft: true,
    isRegionalCraft: true,
    isFeatured: true
  }
];
