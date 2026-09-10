import { AiCatalogGenerationRequest, AiCatalogGenerationResult, MarketMatchScore } from '../types';

export class AiService {
  private static instance: AiService;
  private apiKey: string = '';

  private constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  public static getInstance(): AiService {
    if (!AiService.instance) {
      AiService.instance = new AiService();
    }
    return AiService.instance;
  }

  public async analyzeImageAndGenerateCatalog(
    request: AiCatalogGenerationRequest
  ): Promise<AiCatalogGenerationResult> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const hint = (request.presetCraft || request.rawInputNotes || request.voiceTranscript || request.craftCategory || '').toLowerCase();

    if (hint.includes('pottery') || hint.includes('blue') || hint.includes('bowl') || hint.includes('jaipur') || hint.includes('ceramic')) {
      return this.getBluePotteryPreset(request);
    } else if (hint.includes('madhubani') || hint.includes('mithila') || hint.includes('paint') || hint.includes('bihar') || hint.includes('canvas')) {
      return this.getMadhubaniPreset(request);
    } else if (hint.includes('dhokra') || hint.includes('metal') || hint.includes('brass') || hint.includes('bastar') || hint.includes('sculpture')) {
      return this.getDhokraPreset(request);
    } else if (hint.includes('pashmina') || hint.includes('shawl') || hint.includes('kashmir') || hint.includes('wool') || hint.includes('cashmere')) {
      return this.getPashminaPreset(request);
    } else if (hint.includes('kutch') || hint.includes('bag') || hint.includes('embroidery') || hint.includes('mirror') || hint.includes('gujarat')) {
      return this.getKutchPreset(request);
    }

    return this.getGenericHandicraftPreset(request);
  }

  public calculateFairPrice(params: {
    materialCost: number;
    laborHours: number;
    hourlyWageRate?: number;
    craftComplexityFactor?: number;
    packagingCost?: number;
  }) {
    const hourlyRate = params.hourlyWageRate || 120;
    const laborTotal = params.laborHours * hourlyRate;
    const packaging = params.packagingCost || 60;
    const rawCost = params.materialCost + laborTotal + packaging;
    
    const minPrice = Math.round(rawCost * 1.15 / 10) * 10;
    const maxPrice = Math.round(rawCost * 1.40 / 10) * 10;
    const indicativePrice = Math.round((minPrice + maxPrice) / 2);

    return {
      materialCost: params.materialCost,
      laborCost: laborTotal,
      packagingCost: packaging,
      hourlyWageRate: hourlyRate,
      suggestedMin: minPrice,
      suggestedMax: maxPrice,
      indicativePrice
    };
  }

  private getBluePotteryPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const matches: MarketMatchScore[] = [
      {
        segmentName: 'Premium Home Décor Boutiques',
        segmentNameHi: 'प्रीमियम होम डेकोर बुटीक',
        matchPercentage: 94,
        reason: 'Handmade, authentic heritage aesthetic aligns with high-end interior styling trends.',
        reasonHi: 'हाथ से बनी नीली फ्लोरल नक्काशी आधुनिक होम डेकोर के लिए 94% अनुकूल है।',
        targetBuyerCount: 140
      },
      {
        segmentName: 'Corporate & Festival Gifting',
        segmentNameHi: 'कॉर्पोरेट एवं त्यौहार उपहार',
        matchPercentage: 88,
        reason: 'Price point (₹1,000–₹1,500) and lightweight packaging make it ideal for festive hampers.',
        reasonHi: 'त्यौहारों व खास मौकों पर प्रीमियम गिफ्टिंग के लिए अत्यंत उपयुक्त।',
        targetBuyerCount: 85
      },
      {
        segmentName: 'Heritage Tourism Retailers',
        segmentNameHi: 'विरासत पर्यटन विक्रेता',
        matchPercentage: 82,
        reason: 'Iconic GI-tagged Rajasthan craft with strong appeal for cultural tourists.',
        reasonHi: 'राजस्थान की जीआई टैग कला पर्यटकों में लोकप्रिय है।',
        targetBuyerCount: 60
      }
    ];

    return {
      titleEn: 'Handcrafted Jaipur Blue Pottery Decorative Floral Bowl',
      titleHi: 'हस्तनिर्मित जयपुरी ब्लू पॉटरी फ्लोरल डेकोरेटिव बाउल',
      category: 'Home Décor & Tableware',
      categoryHi: 'होम डेकोर एवं टेबलवेयर',
      craftType: 'Jaipur Blue Pottery',
      craftTypeHi: 'जयपुरी ब्लू पॉटरी',
      simpleDescriptionEn: 'Traditional 8-inch handcrafted ceramic bowl made with powdered quartz and cobalt floral motifs.',
      simpleDescriptionHi: 'पारंपरिक 8-इंच हस्तनिर्मित सेरामिक बाउल, नीले कोबाल्ट फूलों की नक्काशी के साथ।',
      detailedDescriptionEn: 'Crafted without clay using powdered quartz, fuller’s earth, and natural gum, this iconic Jaipur Blue Pottery bowl features intricate Persian-inspired botanical motifs hand-painted with cobalt oxide. Perfect for centerpieces, gifting, and dry snacks.',
      detailedDescriptionHi: 'क्वार्ट्ज पत्थर पाउडर और मुल्तानी मिट्टी से निर्मित यह प्रसिद्ध जयपुरी बाउल कोबाल्ट ब्लू से हाथ से पेंट किया गया है। होम डेकोर और उपहार के लिए उत्तम।',
      craftStoryEn: 'Blue Pottery originated in Turko-Persia and came to Jaipur in the 19th century under Maharaja Sawai Ram Singh II. Each piece takes 12 days to shape, paint, glaze and bake in wood-fired kilns.',
      craftStoryHi: 'ब्लू पॉटरी 19वीं सदी में जयपुर के महाराजा सवाई राम सिंह द्वितीय के काल में लोकप्रिय हुई। इसे तैयार करने में 12 दिन लगते हैं।',
      materialsEn: ['Quartz Stone Powder', 'Fuller’s Earth (Multani Mitti)', 'Cobalt Oxide Pigment', 'Natural Resin Gum'],
      materialsHi: ['क्वार्ट्ज पत्थर पाउडर', 'मुल्तानी मिट्टी', 'कोबाल्ट ऑक्साइड रंग', 'प्राकृतिक गोंद'],
      suggestedPriceMin: 1100,
      suggestedPriceMax: 1450,
      tagsEn: ['Blue Pottery', 'Jaipur Craft', 'Handmade Bowl', 'Home Décor', 'Eco Friendly', 'Indian Art'],
      tagsHi: ['ब्लू पॉटरी', 'जयपुरी क्राफ्ट', 'हस्तनिर्मित बाउल', 'होम डेकोर', 'पर्यावरण अनुकूल', 'भारतीय कला'],
      searchKeywords: ['blue pottery bowl', 'jaipur ceramic', 'handmade gift under 1500', 'traditional decor', 'handcrafted tableware'],
      socialCaptionEn: 'Bring 200 years of Jaipur royal heritage to your living space. Hand-painted Blue Pottery bowl made with pure quartz and natural cobalt glaze.',
      socialCaptionHi: 'जयपुर की 200 साल पुरानी शाही विरासत को अपने घर लाएं। हाथ से पेंट किया गया प्रामाणिक ब्लू पॉटरी बाउल।',
      customerSegmentEn: 'Interior designers, heritage collectors, and corporate festive gifters.',
      customerSegmentHi: 'इंटीरियर डिज़ाइनर्स, कला प्रेमी और कॉर्पोरेट उपहार खरीदार।',
      marketMatches: matches,
      confidenceScore: 96,
      detectedVisualAttributes: ['Cobalt Blue Glaze', 'Floral Persian Motifs', 'Circular Geometric Rim', 'Quartz Paste Sheen']
    };
  }

  private getMadhubaniPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const matches: MarketMatchScore[] = [
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
    ];

    return {
      titleEn: 'Tree of Life - Authentic Kachni Madhubani Folk Painting',
      titleHi: 'जीवन का वृक्ष - प्रामाणिक कचनी मधुबनी चित्रकला',
      category: 'Traditional Art & Paintings',
      categoryHi: 'पारंपरिक कला एवं पेंटिंग्स',
      craftType: 'Mithila / Madhubani Art',
      craftTypeHi: 'मिथिला / मधुबनी चित्रकला',
      simpleDescriptionEn: 'Hand-painted 16x20 inch Mithila folk art on handmade canvas using organic pigments.',
      simpleDescriptionHi: 'हस्तनिर्मित कैनवास पर प्राकृतिक रंगों से बनी 16x20 इंच मिथिला लोक कला।',
      detailedDescriptionEn: 'An exquisite hand-rendered Mithila masterpiece depicting the sacred Tree of Life surrounded by birds and wildlife symbolizing fertility and cosmic unity. Hand-drawn using bamboo twigs and nib pens without stencils.',
      detailedDescriptionHi: 'बांस की तीलियों और प्राकृतिक रंगों से हस्तनिर्मित मिथिला कलाकृति, जिसमें जीवन का वृक्ष और पक्षी चित्रित हैं।',
      craftStoryEn: 'Passed down maternally across Mithila households for wedding and harvest blessings, each stroke represents devotion and natural harmony.',
      craftStoryHi: 'मिथिला की सदियों पुरानी मातृसत्तात्मक परंपरा, जिसमें प्रकृति और जीवन के उत्सव का चित्रण होता है।',
      materialsEn: ['Handmade Cotton Rag Paper', 'Turmeric Yellow', 'Lampblack Ink', 'Indigo Dye', 'Crushed Leaves'],
      materialsHi: ['सूती हस्तनिर्मित कागज़', 'हल्दी का पीला रंग', 'कालिख की स्याही', 'नील रंग', 'पत्तियों का रस'],
      suggestedPriceMin: 2200,
      suggestedPriceMax: 2900,
      tagsEn: ['Madhubani', 'Mithila Art', 'Tree of Life', 'Natural Dyes', 'Folk Painting', 'Wall Art'],
      tagsHi: ['मधुबनी', 'मिथिला पेंटिंग', 'जीवन का वृक्ष', 'प्राकृतिक रंग', 'लोक कला', 'वॉल आर्ट'],
      searchKeywords: ['madhubani painting', 'tree of life wall art', 'folk art under 3000', 'bihar painting', 'bihar handmade'],
      socialCaptionEn: 'Hand-drawn with bamboo twigs over 10 days, this Madhubani Tree of Life brings sacred blessings and traditional Indian folk beauty to your home.',
      socialCaptionHi: '10 दिनों में बांस की कलम और प्राकृतिक रंगों से बनाई गई मधुबनी कलाकृति।',
      customerSegmentEn: 'Art collectors, luxury homeowners, and heritage galleries.',
      customerSegmentHi: 'कला प्रेमी, लक्जरी होम डेकोर और विरासत गैलरी।',
      marketMatches: matches,
      confidenceScore: 97,
      detectedVisualAttributes: ['Bamboo Nib Linework', 'Natural Pigments', 'Tree of Life Motif', 'Handmade Canvas Texture']
    };
  }

  private getDhokraPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const matches: MarketMatchScore[] = [
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
    ];

    return {
      titleEn: 'Tribal Musician Figurine - Lost-Wax Dhokra Bell Metal',
      titleHi: 'आदिवासी संगीतकार प्रतिमा - ढोकरा लॉस्ट-वैक्स बेल मेटल',
      category: 'Metalware & Sculptures',
      categoryHi: 'धातु शिल्प एवं मूर्तियां',
      craftType: 'Bastar Dhokra Metal Art',
      craftTypeHi: 'बस्तर ढोकरा मेटल आर्ट',
      simpleDescriptionEn: 'Solid cast antique brass metal sculpture crafted with 4,000-year-old lost-wax tribal technique.',
      simpleDescriptionHi: '4000 वर्ष पुरानी ढोकरा पद्धति से ढली हुई ठोस पीतल की आदिवासी संगीतकार प्रतिमा।',
      detailedDescriptionEn: 'Handmade by tribal Bastar artisans using the ancient Cire Perdue (lost-wax) technique. Each figurine is individually modeled using beeswax threads, making every single piece unique with its own rustic character and antique patina finish.',
      detailedDescriptionHi: 'बस्तर के आदिवासी कारीगरों द्वारा लॉस्ट-वैक्स तकनीक से निर्मित। मोम के धागों से बनी अनूठी पीतल की मूर्ति।',
      craftStoryEn: 'Dhokra casting dates back to the Mohenjo-Daro Dancing Girl artifact. The craft honors forest deities and tribal celebrations.',
      craftStoryHi: 'ढोकरा धातु ढलाई का इतिहास सिंधु घाटी सभ्यता से जुड़ा है। यह कला जनजातीय उत्सवों को समर्पित है।',
      materialsEn: ['Recycled Bell Metal (Brass & Bronze)', 'Beeswax Threads', 'Riverbed Alluvial Clay', 'Charcoal'],
      materialsHi: ['रिसाइकिल पीतल/कांस्य', 'मधुमक्खी मोम के धागे', 'नदी की गाद मिट्टी', 'कोयला'],
      suggestedPriceMin: 1700,
      suggestedPriceMax: 2150,
      tagsEn: ['Dhokra Art', 'Tribal Metal', 'Lost Wax Casting', 'Brass Figurine', 'Bastar Craft', 'Sculpture'],
      tagsHi: ['ढोकरा कला', 'जनजातीय धातु', 'लॉस्ट वैक्स कास्टिंग', 'पीतल की मूर्ति', 'बस्तर क्राफ्ट'],
      searchKeywords: ['dhokra sculpture', 'bastar brass figurine', 'lost wax metal craft', 'tribal handicraft under 2000'],
      socialCaptionEn: 'A 4,000-year-old living heritage in your hands. Hand-cast Dhokra brass tribal musician sculpture from Bastar.',
      socialCaptionHi: 'बस्तर के जंगलों से 4000 साल पुरानी ढोकरा कला। पीतल की अनूठी हस्तनिर्मित मूर्ति।',
      customerSegmentEn: 'Sculpture collectors, ethnic interior decorators, and souvenir boutiques.',
      customerSegmentHi: 'मूर्तिकला प्रेमी, इंटीरियर डेकोरेटर्स और सोवेनियर बुटीक।',
      marketMatches: matches,
      confidenceScore: 94,
      detectedVisualAttributes: ['Lost-Wax Filigree Texture', 'Antique Brass Patina', 'Tribal Figural Proportions']
    };
  }

  private getPashminaPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const matches: MarketMatchScore[] = [
      {
        segmentName: 'Luxury Ethical Fashion Retailers',
        segmentNameHi: 'लक्ज़री एथिकल फैशन रिटेलर्स',
        matchPercentage: 97,
        reason: 'Certified pure handloom cashmere with verifiable artisan provenance commands premium global retail.',
        reasonHi: 'शुद्ध हाथ से बनी पश्मीना अंतरराष्ट्रीय व घरेलू लक्जरी फैशन स्टोर्स के लिए 97% अनुकूल है।',
        targetBuyerCount: 160
      }
    ];

    return {
      titleEn: 'Pure Kashmiri Pashmina Shawl with Sozni Needlework',
      titleHi: 'शुद्ध पश्मीना शॉल - हस्तनिर्मित सोज़नी कशीदाकारी',
      category: 'Handloom & Textiles',
      categoryHi: 'हथकरघा एवं परिधान',
      craftType: 'Kashmiri Handloom Pashmina',
      craftTypeHi: 'कश्मीरी हथकरघा पश्मीना',
      simpleDescriptionEn: 'Featherlight 100% Changthangi cashmere pashmina with intricate floral border embroidery.',
      simpleDescriptionHi: 'चांगथांगी पश्मीना ऊन की अत्यंत हल्की व गर्म शॉल, हाथ की सोज़नी बॉर्डर कढ़ाई के साथ।',
      detailedDescriptionEn: 'Spun from the delicate undercoat of high-altitude Himalayan Capra Hircus goats, this pure Kashmiri Pashmina is woven on a traditional wooden handloom and detailed with micro-needle Sozni floral borders.',
      detailedDescriptionHi: 'हिमालयी चांगथांगी बकरियों की महीन पश्मीना ऊन से हाथ की खड्डी पर बुनी और सोज़नी सुई से कढ़ी शॉल।',
      craftStoryEn: 'Kashmiri Pashmina has draped royalty for centuries. Authenticated by passing effortlessly through a finger ring.',
      craftStoryHi: 'कश्मीरी पश्मीना सदियों से राजघरानों की शान रही है। अपनी बेमिसाल गर्माहट और कोमलता के लिए प्रसिद्ध।',
      materialsEn: ['100% Pure Changthangi Pashmina Wool', 'Silk Embroidery Threads'],
      materialsHi: ['100% शुद्ध चांगथांगी पश्मीना ऊन', 'रेशमी कढ़ाई के धागे'],
      suggestedPriceMin: 7800,
      suggestedPriceMax: 9800,
      tagsEn: ['Pashmina', 'Kashmiri Shawl', 'Sozni Work', 'Cashmere', 'Handloom', 'Luxury Textile'],
      tagsHi: ['पश्मीना', 'कश्मीरी शॉल', 'सोज़नी कढ़ाई', 'कैशमीयर', 'हथकरघा', 'लक्जरी वस्त्र'],
      searchKeywords: ['pure pashmina shawl', 'kashmiri handloom shawl', 'sozni needlework', 'luxury handmade gift'],
      socialCaptionEn: 'Wrap yourself in ethereal warmth. Hand-spun and handloom-woven pure Kashmiri Pashmina with timeless Sozni needle craft.',
      socialCaptionHi: 'कश्मीर की वादियों की सौम्य गर्माहट। हाथ से कती और बुनी असली पश्मीना शॉल।',
      customerSegmentEn: 'Luxury fashion consumers, wedding shoppers, and international winter travelers.',
      customerSegmentHi: 'लक्जरी फैशन खरीदार, शादी-विवाह खरीदार एवं अंतरराष्ट्रीय पर्यटक।',
      marketMatches: matches,
      confidenceScore: 98,
      detectedVisualAttributes: ['Micro-Fibre Cashmere Weave', 'Hand-Stitched Sozni Needlework', 'Natural Cream/Ivory Base']
    };
  }

  private getKutchPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const matches: MarketMatchScore[] = [
      {
        segmentName: 'Eco-conscious & Youth Fashion Boutiques',
        segmentNameHi: 'इको-फ्रेंडली एवं युवा फैशन बुटीक',
        matchPercentage: 95,
        reason: 'Affordable price point, zero plastic, and vibrant boho appeal among young urban consumers.',
        reasonHi: 'युवाओं और सस्टेनेबल फैशन खरीदारों के बीच 95% उच्च मांग।',
        targetBuyerCount: 175
      }
    ];

    return {
      titleEn: 'Hand-Embroidered Kutchi Mirror-Work Boho Tote Bag',
      titleHi: 'कच्छी आरी-दर्पण कढ़ाई वाला हस्तनिर्मित टोट बैग',
      category: 'Fashion & Accessories',
      categoryHi: 'फैशन एवं एक्सेसरीज',
      craftType: 'Kutch Tribal Embroidery',
      craftTypeHi: 'कच्छ जनजातीय कढ़ाई',
      simpleDescriptionEn: 'Vibrant handcrafted cotton tote bag with genuine mirror work and traditional tribal motifs.',
      simpleDescriptionHi: 'पारंपरिक गुजराती दर्पण कढ़ाई से सुसज्जित रंगीन और मजबूत सूती टोट बैग।',
      detailedDescriptionEn: 'Hand-embroidered by women artisans of the Rabari community in Kutch, this sturdy eco-friendly tote bag features geometric diamond patterns, genuine mirror inserts, and sturdy reinforced cotton canvas straps.',
      detailedDescriptionHi: 'कच्छ के रबारी समुदाय की महिलाओं द्वारा निर्मित। असली कांच के दर्पण और मजबूत सूती कपड़े से बना टिकाऊ बैग।',
      craftStoryEn: 'Kutch embroidery reflects the colorful identity of desert pastoral communities, converting everyday utility items into celebratory art.',
      craftStoryHi: 'रेगिस्तानी लोक जीवन के उल्लास को दर्शाती कच्छी कढ़ाई, जो हर दिन के उपयोग को कला में बदल देती है।',
      materialsEn: ['Handspun Cotton Canvas', 'Glass Mirrors', 'Vegetable Dyed Threads'],
      materialsHi: ['हाथ से काता सूती कैनवास', 'कांच के दर्पण', 'प्राकृतिक रंगे धागे'],
      suggestedPriceMin: 850,
      suggestedPriceMax: 1200,
      tagsEn: ['Kutch Embroidery', 'Mirror Work', 'Tote Bag', 'Boho Chic', 'Sustainable Fashion', 'Gujarat Craft'],
      tagsHi: ['कच्छ कढ़ाई', 'मिरर वर्क', 'टोट बैग', 'बोहो चिक', 'सस्टेनेबल फैशन', 'गुजराती क्राफ्ट'],
      searchKeywords: ['kutch embroidered bag', 'mirror work tote', 'handmade bag under 1000', 'boho handmade bag', 'gujarat craft'],
      socialCaptionEn: 'Carry sunshine and desert heritage wherever you go. Hand-embroidered mirror work tote bag crafted by Kutch artisan collectives.',
      socialCaptionHi: 'कच्छ की रंगीन धूप और संस्कृति अपने साथ ले जाएं। असली दर्पण कढ़ाई वाला मजबूत टोट बैग।',
      customerSegmentEn: 'College students, eco-friendly shoppers, and travel enthusiasts.',
      customerSegmentHi: 'कॉलेज छात्र, पर्यावरण-सचेत खरीदार और यात्रा प्रेमी।',
      marketMatches: matches,
      confidenceScore: 95,
      detectedVisualAttributes: ['Real Glass Mirrors', 'Vibrant Geometrical Needlework', 'Sturdy Cotton Canvas']
    };
  }

  private getGenericHandicraftPreset(req: AiCatalogGenerationRequest): AiCatalogGenerationResult {
    const rawNote = req.rawInputNotes || req.voiceTranscript || 'Traditional Handcrafted Heritage Item';
    const approx = req.approximatePrice || 1200;
    const minP = Math.round(approx * 0.9 / 10) * 10;
    const maxP = Math.round(approx * 1.3 / 10) * 10;

    return {
      titleEn: 'Handcrafted Traditional Artisan Masterpiece',
      titleHi: 'हस्तनिर्मित पारंपरिक कारीगरी कलाकृति',
      category: 'Home Décor & Cultural Crafts',
      categoryHi: 'होम डेकोर एवं सांस्कृतिक शिल्प',
      craftType: req.craftCategory || 'Indigenous Indian Craft',
      craftTypeHi: 'स्वदेशी भारतीय हस्तशिल्प',
      simpleDescriptionEn: 'Authentic handmade craft lovingly made by rural Indian artisans using sustainable regional techniques.',
      simpleDescriptionHi: 'ग्रामीण भारतीय कारीगरों द्वारा पारंपरिक और टिकाऊ तकनीक से निर्मित प्रामाणिक हस्तशिल्प।',
      detailedDescriptionEn: 'Each piece is painstakingly shaped by hand, reflecting generations of indigenous craftsmanship and cultural heritage. Perfectly suited for artistic home spaces, thoughtful gifts, and cultural collectors.',
      detailedDescriptionHi: 'पीढ़ियों की धरोहर को संजोए यह हस्तशिल्प प्रामाणिक पारंपरिक कला का सुंदर उदाहरण है।',
      craftStoryEn: 'Created in small artisan clusters preserving generational skills and community livelihood.',
      craftStoryHi: 'स्थानीय कारीगर समूहों द्वारा सदियों पुरानी हुनर को जीवित रखते हुए निर्मित।',
      materialsEn: ['Natural Raw Material', 'Eco-friendly Binding', 'Organic Colors'],
      materialsHi: ['प्राकृतिक कच्चा माल', 'पर्यावरण-अनुकूल सामग्री', 'जैविक रंग'],
      suggestedPriceMin: minP,
      suggestedPriceMax: maxP,
      tagsEn: ['Handmade', 'Indian Craft', 'Artisan Made', 'Eco Friendly', 'Cultural Heritage'],
      tagsHi: ['हस्तनिर्मित', 'भारतीय शिल्प', 'कारीगर निर्मित', 'पर्यावरण अनुकूल', 'सांस्कृतिक धरोहर'],
      searchKeywords: ['handmade craft', 'indian artisan product', 'authentic handicraft', 'sustainable gift'],
      socialCaptionEn: 'Celebrate the spirit of Indian craftsmanship with this handmade piece directly from village master artisans.',
      socialCaptionHi: 'भारतीय कारीगरी की आत्मा को अपने घर में स्थान दें। सीधे गांव के कारीगरों द्वारा हस्तनिर्मित।',
      customerSegmentEn: 'Ethical buyers, conscious lifestyle consumers, and home curators.',
      customerSegmentHi: 'एथिकल खरीदार, सांस्कृतिक कला प्रेमी और होम डेकोरेटर्स।',
      marketMatches: [
        {
          segmentName: 'Ethical Living & Lifestyle Retailers',
          segmentNameHi: 'एथिकल लाइफस्टाइल रिटेलर्स',
          matchPercentage: 90,
          reason: 'Sustainable materials and genuine artisan origin appeal to conscious urban consumers.',
          reasonHi: 'प्राकृतिक सामग्री और कारीगर की प्रत्यक्ष कहानी खरीदारों को आकर्षित करती है।',
          targetBuyerCount: 120
        }
      ],
      confidenceScore: 89,
      detectedVisualAttributes: ['Hand-molded Geometry', 'Natural Texture Finish', 'Organic Pigments']
    };
  }
}

export const aiService = AiService.getInstance();
