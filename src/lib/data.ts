// Mock data for PakCrafteds e-commerce clone

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  founded: string;
  description: string;
}

export const companyInfo: CompanyInfo = {
  name: "PakCrafteds",
  tagline: "Handcrafted Goods, Delivered Worldwide",
  address: "3-15-8 Jingumae, Shibuya-ku, Tokyo 150-0001",
  phone: "03-1234-5678",
  email: "info@pakcrafteds.com",
  hours: "Mon–Fri 10:00–18:00",
  founded: "1999",
  description:
    "PakCrafteds is an online store delivering carefully curated handcrafted goods from around the world. Since our founding, we have been committed to quality and artisan craftsmanship, offering products made with care and attention to detail.",
};

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Leather Goods",
    slug: "leather-goods",
    image: "/images/product-bag.png",
    productCount: 24,
  },
  {
    id: "cat-2",
    name: "Kitchenware",
    slug: "kitchenware",
    image: "/images/product-knife.png",
    productCount: 18,
  },
  {
    id: "cat-3",
    name: "Home & Decor",
    slug: "interior",
    image: "/images/product-organizer.png",
    productCount: 31,
  },
  {
    id: "cat-4",
    name: "Fashion",
    slug: "fashion",
    image: "/images/product-jacket.png",
    productCount: 15,
  },
  {
    id: "cat-5",
    name: "Gifts",
    slug: "gifts",
    image: "/images/product-incense.png",
    productCount: 22,
  },
  {
    id: "cat-6",
    name: "Bags",
    slug: "bags",
    image: "/images/product-tote.png",
    productCount: 19,
  },
];

export const products: Product[] = [
  {
    id: "prod-001",
    title: "Artisan Leather Messenger Bag",
    description:
      "A handcrafted messenger bag made from premium Italian leather. Each piece is individually crafted by skilled artisans and develops a beautiful patina over time. Fits A4 files comfortably — perfect for business or everyday use.",
    price: 19800,
    originalPrice: 24800,
    image: "/images/product-bag.png",
    category: "leather-goods",
    badge: "HOT",
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: "prod-002",
    title: "Handmade Ceramic Tea Set (3-Piece)",
    description:
      "A set of three hand-thrown tea bowls crafted using traditional Arita porcelain techniques. Each piece features unique glaze expressions. Comes in a premium paulownia wood box — ideal for gifting.",
    price: 8640,
    image: "/images/product-tea.png",
    category: "kitchenware",
    badge: "NEW",
    rating: 4.9,
    reviewCount: 87,
    inStock: true,
  },
  {
    id: "prod-003",
    title: "Natural Walnut Watch Box",
    description:
      "A luxurious watch box crafted from solid walnut wood. Stores up to 5 watches with a soft velvet-lined interior. A sophisticated accessory for any watch enthusiast.",
    price: 12800,
    originalPrice: 15800,
    image: "/images/product-watch.png",
    category: "interior",
    rating: 4.7,
    reviewCount: 56,
    inStock: true,
  },
  {
    id: "prod-004",
    title: "Forged Chef Knife Set (3-Piece)",
    description:
      "A three-piece knife set hand-forged by master blacksmiths using traditional Japanese sword-making techniques. Exceptional sharpness that professionals trust. A kitchen essential.",
    price: 32800,
    originalPrice: 39800,
    image: "/images/product-knife.png",
    category: "kitchenware",
    badge: "HOT",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
  },
  {
    id: "prod-005",
    title: "Okayama Denim Standard Jacket",
    description:
      "A 14-ounce denim jacket woven using traditional Okayama methods. Vintage-style wash processing delivers unique fading with every wear — your jacket, your story.",
    price: 15800,
    image: "/images/product-jacket.png",
    category: "fashion",
    rating: 4.6,
    reviewCount: 92,
    inStock: true,
  },
  {
    id: "prod-006",
    title: "Hand-Stitched Leather Bi-Fold Wallet",
    description:
      "A long wallet hand-stitched from vegetable-tanned cowhide. Features 12 card slots, 2 coin pockets, and 2 bill compartments. Rich amber tones develop beautifully with use.",
    price: 11800,
    originalPrice: 14800,
    image: "/images/product-wallet.png",
    category: "leather-goods",
    badge: "SALE",
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
  },
  {
    id: "prod-007",
    title: "Kyoto Artisan Incense Gift Set",
    description:
      "A natural ingredient incense gift set from a 300-year-old Kyoto workshop. Four distinct fragrances in a paulownia wood box. Perfect for creating a relaxing atmosphere or as a thoughtful gift.",
    price: 5400,
    image: "/images/product-incense.png",
    category: "gifts",
    badge: "NEW",
    rating: 4.7,
    reviewCount: 45,
    inStock: true,
  },
  {
    id: "prod-008",
    title: "Organic Cotton Canvas Tote Bag",
    description:
      "A durable yet lightweight canvas tote made from Indian organic cotton. Perfect everyday size — also popular as a stylish and practical diaper bag. Built to last.",
    price: 4800,
    image: "/images/product-tote.png",
    category: "bags",
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: "prod-009",
    title: "Solid Hinoki Wood Desk Organizer",
    description:
      "A sleek desk organizer made from Hokkaido-grown hinoki cypress. Combines a pen holder, small items tray, and catch-all in one smart, minimalist design. Bring natural warmth to your workspace.",
    price: 6800,
    image: "/images/product-organizer.png",
    category: "interior",
    rating: 4.6,
    reviewCount: 78,
    inStock: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Mitchell",
    avatar: "",
    rating: 5,
    text: "I'm blown away by the quality of the leather bag! You can really feel the warmth of genuine handcraftsmanship. I've been using it for six months now and the patina is developing beautifully.",
    date: "2024-11-15",
  },
  {
    id: "test-2",
    name: "James Cooper",
    avatar: "",
    rating: 5,
    text: "The knife set made the perfect gift. The sharpness is incredible — it's made everyday cooking so much more enjoyable. The packaging was beautiful too, making it an ideal present for someone special.",
    date: "2024-10-28",
  },
  {
    id: "test-3",
    name: "Emily Chen",
    avatar: "",
    rating: 4,
    text: "I purchased the incense gift set and I absolutely love it. The four fragrances are so elegant and they've transformed my room into a relaxing retreat. Already planning to reorder!",
    date: "2024-12-01",
  },
];

export const footerLinks = {
  shop: [
    { name: "All Products", href: "#home", hash: "home" },
    { name: "New Arrivals", href: "#new", hash: "new" },
    { name: "Best Sellers", href: "#home", hash: "home" },
    { name: "Sale", href: "#home", hash: "home" },
  ],
  categories: [
    { name: "Leather Goods", href: "#home", hash: "home" },
    { name: "Kitchenware", href: "#home", hash: "home" },
    { name: "Home & Decor", href: "#home", hash: "home" },
    { name: "Fashion", href: "#home", hash: "home" },
  ],
  support: [
    { name: "User Guide", href: "#guide", hash: "guide" },
    { name: "Contact Us", href: "#contact", hash: "contact" },
    { name: "Returns & Exchanges", href: "#guide", hash: "guide" },
    { name: "Shipping Info", href: "#guide", hash: "guide" },
  ],
  company: [
    { name: "About Us", href: "#about", hash: "about" },
    { name: "Store Locations", href: "#store", hash: "store" },
    { name: "Legal Notices", href: "#legal", hash: "legal" },
    { name: "Privacy Policy", href: "#privacy", hash: "privacy" },
  ],
};
