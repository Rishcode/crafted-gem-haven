export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  artisan: string;
  rating: number;
  isFeatured: boolean;
  isNew: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

// Seller related interfaces
export interface Seller {
  id: string;
  user_id: string;
  store_name: string;
  bio?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  country: string;
  bank_account_number?: string;
  bank_name?: string;
  ifsc_code?: string;
  account_holder_name?: string;
  verified: boolean;
  verification_status: string;
  created_at: string;
  updated_at: string;
  specialization?: string;
  years_of_experience?: number;
  awards?: string[];
  gallery?: string[];
}

export interface SellerDocument {
  id: string;
  seller_id: string;
  document_type: 'aadhar' | 'pan' | 'store_photo' | 'self_photo';
  file_path: string;
  verified: boolean;
  uploaded_at: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Handcrafted Gemstone Necklace",
    price: 3999,
    description: "Beautiful handcrafted necklace with natural gemstones set in sterling silver.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    artisan: "Aanya Handicrafts",
    rating: 4.8,
    isFeatured: true,
    isNew: false
  },
  {
    id: "2",
    name: "Pearl Earrings",
    price: 2250,
    description: "Delicate freshwater pearl earrings with 14k gold fixtures.",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    category: "earrings",
    artisan: "Samudra Jewels",
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: "3",
    name: "Handwoven Macramé Bracelet",
    price: 1499,
    description: "Intricate macramé bracelet woven with cotton rope and wooden beads.",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    artisan: "Vastra Designs",
    rating: 4.7,
    isFeatured: true,
    isNew: true
  },
  {
    id: "4",
    name: "Silver Statement Ring",
    price: 4450,
    description: "Handcrafted statement ring made from recycled silver with a unique abstract design.",
    imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    category: "rings",
    artisan: "Chandi Crafts",
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: "5",
    name: "Copper Wire Wrapped Pendant",
    price: 1799,
    description: "Hand-wrapped copper wire pendant with a polished stone center.",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    category: "pendants",
    artisan: "Tamba Creations",
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: "6",
    name: "Beaded Anklet",
    price: 999,
    description: "Colorful handmade anklet with glass beads and silver charms.",
    imageUrl: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=800&q=80",
    category: "anklets",
    artisan: "Moti Designs",
    rating: 4.7,
    isFeatured: false,
    isNew: true
  },
  {
    id: "7",
    name: "Traditional Kundan Necklace",
    price: 8999,
    description: "Exquisite kundan work necklace with meenakari detailing and pearl accents.",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    artisan: "Aanya Handicrafts",
    rating: 5.0,
    isFeatured: true,
    isNew: true
  },
  {
    id: "8",
    name: "Gemstone Stud Earrings",
    price: 1899,
    description: "Delicate stud earrings with semi-precious gemstones in gold-plated settings.",
    imageUrl: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80",
    category: "earrings",
    artisan: "Samudra Jewels",
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: "9",
    name: "Oxidized Silver Bangles (Set of 3)",
    price: 2499,
    description: "Traditional oxidized silver bangles with tribal motifs and intricate detailing.",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    artisan: "Chandi Crafts",
    rating: 4.8,
    isFeatured: false,
    isNew: false
  },
  {
    id: "10",
    name: "Wooden Bead Statement Necklace",
    price: 2199,
    description: "Handcrafted wooden bead necklace with natural dyes and cotton thread work.",
    imageUrl: "https://images.unsplash.com/photo-1576022162028-8997941e2284?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    artisan: "Vastra Designs",
    rating: 4.5,
    isFeatured: true,
    isNew: false
  },
  {
    id: "11",
    name: "Silver Toe Ring (Pair)",
    price: 899,
    description: "Delicate silver toe rings with traditional design, adjustable size.",
    imageUrl: "https://images.unsplash.com/photo-1604159734475-71911ae8bb2f?auto=format&fit=crop&w=800&q=80",
    category: "rings",
    artisan: "Chandi Crafts",
    rating: 4.3,
    isFeatured: false,
    isNew: false
  },
  {
    id: "12",
    name: "Brass Temple Jewelry Set",
    price: 3699,
    description: "Traditional temple-style jewelry set with necklace and earrings in antique brass finish.",
    imageUrl: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    artisan: "Tamba Creations",
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: "13",
    name: "Seed Bead Layered Bracelet",
    price: 1299,
    description: "Colorful seed bead bracelet with multiple layers and adjustable clasp.",
    imageUrl: "https://images.unsplash.com/photo-1611085583191-a3b181a88577?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    artisan: "Moti Designs",
    rating: 4.4,
    isFeatured: false,
    isNew: true
  },
  {
    id: "14",
    name: "Silver Filigree Pendant",
    price: 2999,
    description: "Intricate silver filigree pendant with traditional Odisha craftsmanship.",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category: "pendants",
    artisan: "Chandi Crafts",
    rating: 4.8,
    isFeatured: true,
    isNew: false
  },
  {
    id: "15",
    name: "Handcrafted Copper Bracelet",
    price: 1599,
    description: "Therapeutic copper bracelet with hand-hammered texture and magnetic elements.",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    artisan: "Tamba Creations",
    rating: 4.7,
    isFeatured: false,
    isNew: false
  },
  {
    id: "16",
    name: "Glass Bead Making Kit",
    price: 1999,
    description: "DIY kit for creating your own glass beads with traditional techniques.",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    category: "materials",
    artisan: "Moti Designs",
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: "17",
    name: "Silver Wire 24 Gauge (10m)",
    price: 699,
    description: "High-quality silver wire for jewelry making, perfect for wire-wrapping techniques.",
    imageUrl: "https://images.unsplash.com/photo-1601821326018-d949a54b6d6f?auto=format&fit=crop&w=800&q=80",
    category: "materials",
    artisan: "Chandi Crafts",
    rating: 4.9,
    isFeatured: false,
    isNew: false
  },
  {
    id: "18",
    name: "Semi-precious Gemstone Collection",
    price: 2499,
    description: "Assorted semi-precious gemstones for jewelry making, includes 15 varieties.",
    imageUrl: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&w=800&q=80",
    category: "materials",
    artisan: "Samudra Jewels",
    rating: 4.8,
    isFeatured: true,
    isNew: false
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Necklaces",
    imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83a5089?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted necklaces for every occasion"
  },
  {
    id: "2",
    name: "Earrings",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    description: "Unique handmade earrings to match your style"
  },
  {
    id: "3",
    name: "Bracelets",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    description: "Artisanal bracelets crafted with care"
  },
  {
    id: "4",
    name: "Rings",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    description: "Statement rings handmade by skilled artisans"
  },
  {
    id: "5",
    name: "Crafting Materials",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80",
    description: "Quality materials for your own jewelry creations"
  }
];

// Mock artisans with detailed profiles
export const MOCK_ARTISANS = [
  {
    id: "a1",
    user_id: "u123",
    store_name: "Aanya Handicrafts",
    bio: "Third-generation artisan specializing in traditional gemstone jewelry with modern designs. Our family workshop has been creating unique pieces since 1952, bringing together ancient techniques with contemporary aesthetics.",
    phone_number: "+91 98765 43210",
    address: "42, Crafters Lane, Johari Bazaar",
    city: "Jaipur",
    state: "Rajasthan",
    pin_code: "302001",
    country: "India",
    verified: true,
    verification_status: "verified",
    created_at: "2024-02-15",
    updated_at: "2024-04-20",
    specialization: "Gemstone Setting and Filigree Work",
    years_of_experience: 25,
    awards: ["National Handicraft Award 2022", "State Master Craftsperson 2020"],
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-43f82a3d9994?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "a2",
    user_id: "u234",
    store_name: "Samudra Jewels",
    bio: "Inspired by the ocean, Samudra Jewels creates delicate pearl and seashell jewelry using sustainably sourced materials. Each piece is designed to capture the essence of coastal beauty.",
    phone_number: "+91 87654 32109",
    address: "8, Beach Road, Silver Beach",
    city: "Mumbai",
    state: "Maharashtra",
    pin_code: "400001",
    country: "India",
    verified: true,
    verification_status: "verified",
    created_at: "2023-11-05",
    updated_at: "2024-03-15",
    specialization: "Pearl Setting and Ocean-inspired Designs",
    years_of_experience: 12,
    awards: ["Best Emerging Designer 2023"],
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83a5089?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "a3",
    user_id: "u345",
    store_name: "Vastra Designs",
    bio: "Vastra Designs blends traditional textile techniques with modern aesthetics to create unique wearable art. Our workshop employs local artisans, preserving age-old weaving and macramé skills.",
    phone_number: "+91 76543 21098",
    address: "15, Weavers Colony, Textile Market",
    city: "Ahmedabad",
    state: "Gujarat",
    pin_code: "380001",
    country: "India",
    verified: true,
    verification_status: "verified",
    created_at: "2023-08-18",
    updated_at: "2024-04-02",
    specialization: "Macramé and Natural Fiber Weaving",
    years_of_experience: 15,
    awards: ["Textile Excellence Award 2021", "Sustainable Craft Recognition 2023"],
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620286796651-38c7136b1df0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605999081236-47dbdb1a1264?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "a4",
    user_id: "u456",
    store_name: "Chandi Crafts",
    bio: "Specializing in silver filigree work, a traditional craft from Cuttack, Odisha. Our artisans create intricate designs that blend centuries-old techniques with contemporary style, using recycled silver.",
    phone_number: "+91 65432 10987",
    address: "27, Silver Street, Filigree Market",
    city: "Cuttack",
    state: "Odisha",
    pin_code: "753001",
    country: "India",
    verified: true,
    verification_status: "verified",
    created_at: "2022-05-10",
    updated_at: "2024-02-28",
    specialization: "Silver Filigree and Tribal Jewelry",
    years_of_experience: 30,
    awards: ["Master Craftsman Award 2019", "GI Tag Recognition 2018"],
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618403088890-3d9ff6f4c8b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601821326018-d949a54b6d6f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "a5",
    user_id: "u567",
    store_name: "Tamba Creations",
    bio: "Specializing in copper and brass work, we create handcrafted items using ancient techniques passed down through generations. Our workshop focuses on eco-friendly practices and supporting local artisans.",
    phone_number: "+91 54321 09876",
    address: "12, Metal Workers Colony, Copper Market",
    city: "Moradabad",
    state: "Uttar Pradesh",
    pin_code: "244001",
    country: "India",
    verified: true,
    verification_status: "verified",
    created_at: "2023-02-20",
    updated_at: "2024-01-15",
    specialization: "Copper Wire Wrapping and Stone Setting",
    years_of_experience: 18,
    awards: ["Metal Artistry Award 2022"],
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631965004544-1762fc696476?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
