
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

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Handcrafted Gemstone Necklace",
    price: 79.99,
    description: "Beautiful handcrafted necklace with natural gemstones set in sterling silver.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80",
    category: "necklaces",
    artisan: "Elena Crafts",
    rating: 4.8,
    isFeatured: true,
    isNew: false
  },
  {
    id: "2",
    name: "Pearl Earrings",
    price: 45.00,
    description: "Delicate freshwater pearl earrings with 14k gold fixtures.",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    category: "earrings",
    artisan: "Ocean Treasures",
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: "3",
    name: "Handwoven Macramé Bracelet",
    price: 29.99,
    description: "Intricate macramé bracelet woven with cotton rope and wooden beads.",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    category: "bracelets",
    artisan: "Natural Knots",
    rating: 4.7,
    isFeatured: true,
    isNew: true
  },
  {
    id: "4",
    name: "Silver Statement Ring",
    price: 89.00,
    description: "Handcrafted statement ring made from recycled silver with a unique abstract design.",
    imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    category: "rings",
    artisan: "Silver Stories",
    rating: 4.9,
    isFeatured: true,
    isNew: false
  },
  {
    id: "5",
    name: "Copper Wire Wrapped Pendant",
    price: 35.99,
    description: "Hand-wrapped copper wire pendant with a polished stone center.",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    category: "pendants",
    artisan: "Copper Creations",
    rating: 4.6,
    isFeatured: false,
    isNew: true
  },
  {
    id: "6",
    name: "Beaded Anklet",
    price: 19.99,
    description: "Colorful handmade anklet with glass beads and silver charms.",
    imageUrl: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=800&q=80",
    category: "anklets",
    artisan: "Beach Beads",
    rating: 4.7,
    isFeatured: false,
    isNew: true
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
