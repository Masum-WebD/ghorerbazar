export interface Product {
  id: string;
  slug: string;
  name: string;
  bnName: string;
  category: string;
  bnCategory: string;
  price: number;
  originalPrice: number;
  weight: string;
  bnWeight: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  description: string;
  bnDescription: string;
  benefits: string[];
  bnBenefits: string[];
  stock: number;
  badge?: string | null;
  badgeColor?: string;
  saveText?: string;
}

export interface ComboItem {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  numericPrice: number;
  numericOldPrice: number;
  save: string;
  img: string;
}

export interface BrandItem {
  id: string;
  name: string;
  logo: string;
  link: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  designation: string;
  comment: string;
  avatar?: string;
  rating: number;
}

export const categories = [
  { id: "all", name: "All Products", bnName: "সব প্রোডাক্ট", image: "https://backoffice.ghorerbazar.com/category_images/HJOrw1774766749.png" },
  { id: "combos", name: "Combos", bnName: "কম্বো অফার", image: "https://backoffice.ghorerbazar.com/category_images/Zf99g1774766372.png" },
  { id: "oil-ghee", name: "Oil & Ghee", bnName: "ঘি ও তেল", image: "https://backoffice.ghorerbazar.com/category_images/Zf99g1774766372.png" },
  { id: "organic", name: "Organic", bnName: "অর্গানিক", image: "https://backoffice.ghorerbazar.com/category_images/HJOrw1774766749.png" },
  { id: "honey", name: "Honey", bnName: "মধু", image: "https://backoffice.ghorerbazar.com/category_images/KbWCe1774766391.png" },
  { id: "dates", name: "Dates", bnName: "খেজুর", image: "https://backoffice.ghorerbazar.com/category_images/wgCR01774766402.png" },
  { id: "spices", name: "Spices", bnName: "মশলা", image: "https://backoffice.ghorerbazar.com/category_images/hXyU71774766413.png" },
  { id: "nuts-seeds", name: "Nuts & Seeds", bnName: "বাদাম ও বীজ", image: "https://backoffice.ghorerbazar.com/category_images/5u39t1774766425.png" },
  { id: "beverage", name: "Beverage", bnName: "পানীয়", image: "https://backoffice.ghorerbazar.com/category_images/AZG2N1774766442.png" },
  { id: "rice", name: "Rice", bnName: "চাল", image: "https://backoffice.ghorerbazar.com/category_images/Emr6I1774766667.png" },
  { id: "flours-lentils", name: "Flours & Lentils", bnName: "আটা ও ডাল", image: "https://backoffice.ghorerbazar.com/category_images/Lo11M1774766468.png" },
  { id: "functional-food", name: "Functional Food", bnName: "ফাংশনাল ফুড", image: "https://backoffice.ghorerbazar.com/category_images/JxBh61774766494.png" },
];

export const topSellingProducts: Product[] = [
  {
    id: "top-1",
    slug: "sundarban-honey-1kg",
    name: "Sundarban Honey 1kg",
    bnName: "সুন্দরবনের খাঁটি মধু ১ কেজি",
    category: "honey",
    bnCategory: "মধু",
    price: 2500,
    originalPrice: 2500,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/qmVLk1783162733.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/qmVLk1783162733.png"],
    rating: 5,
    reviewCount: 320,
    description: "Authentic Sundarban honey collected straight from natural hives.",
    bnDescription: "সুন্দরবনের প্রাকৃতিক মৌচাক থেকে সংগৃহীত ১০০% খাঁটি মধু।",
    benefits: ["১০০% প্রাকৃতিক", "রোগ প্রতিরোধ ক্ষমতা বাড়ায়"],
    bnBenefits: ["১০০% প্রাকৃতিক", "রোগ প্রতিরোধ ক্ষমতা বাড়ায়"],
    stock: 50
  },
  {
    id: "top-2",
    slug: "deshi-mustard-oil-5l",
    name: "Deshi Mustard Oil 5 liter",
    bnName: "দেশি সরিষার তেল ৫ লিটার",
    category: "oil-ghee",
    bnCategory: "ঘি ও তেল",
    price: 1700,
    originalPrice: 1700,
    weight: "5 L",
    bnWeight: "৫ লিটার",
    image: "https://backoffice.ghorerbazar.com/productImages/vkVdH1767248022.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/vkVdH1767248022.jpg"],
    rating: 5,
    reviewCount: 280,
    description: "Pure cold-pressed deshi mustard oil.",
    bnDescription: "কাঠের ঘানিতে ভাঙানো খাঁটি দেশি সরিষার তেল।",
    benefits: ["প্রাকৃতিক ঝাঁঝ", "স্বাস্থ্যকর"],
    bnBenefits: ["প্রাকৃতিক ঝাঁঝ", "স্বাস্থ্যকর"],
    stock: 40,
    badge: "Best Selling"
  },
  {
    id: "top-3",
    slug: "black-seed-honey-1kg-top",
    name: "Black Seed Honey 1kg",
    bnName: "কালোজিরা ফুলের মধু ১ কেজি",
    category: "honey",
    bnCategory: "মধু",
    price: 1500,
    originalPrice: 1600,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/fAewT1767418525.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/fAewT1767418525.jpg"],
    rating: 4.9,
    reviewCount: 210,
    description: "Premium black seed flower honey.",
    bnDescription: "প্রাকৃতিক উপায়ে তৈরি সেরা মানের কালোজিরা মধু।",
    benefits: ["প্রাকৃতিক এনার্জি", "রোগ প্রতিরোধক"],
    bnBenefits: ["প্রাকৃতিক এনার্জি", "রোগ প্রতিরোধক"],
    stock: 35,
    saveText: "Save ৳100"
  },
  {
    id: "top-4",
    slug: "gawa-ghee-1kg",
    name: "Gawa Ghee 1kg",
    bnName: "প্রিমিয়াম গাওয়া ঘি ১ কেজি",
    category: "oil-ghee",
    bnCategory: "ঘি ও তেল",
    price: 1800,
    originalPrice: 1800,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/bcBTR1781518012.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/bcBTR1781518012.png"],
    rating: 5,
    reviewCount: 410,
    description: "Pure handcrafted cow ghee.",
    bnDescription: "দানাদার স্বাদের শতভাগ খাঁটি গাওয়া ঘি।",
    benefits: ["চমৎকার সুবাস", "প্রাকৃতিক স্বাদ"],
    bnBenefits: ["চমৎকার সুবাস", "প্রাকৃতিক স্বাদ"],
    stock: 30,
    badge: "Best Selling"
  }
];

export const honeyProducts: Product[] = [
  {
    id: "honey-1",
    slug: "honey-nuts-800g",
    name: "Honey Nuts 800gm",
    bnName: "হানি নাটস ৮০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 1700,
    originalPrice: 1700,
    weight: "800 g",
    bnWeight: "৮০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/4BTRl1767443347.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/4BTRl1767443347.jpg"],
    rating: 4.9,
    reviewCount: 150,
    description: "Premium nuts soaked in pure honey.",
    bnDescription: "খাঁটি মধুতে ডোবানো প্রিমিয়াম বাদামের পুষ্টিকর সংমিশ্রণ।",
    benefits: ["তাৎক্ষণিক শক্তি", "পুষ্টিতে ভরপুর"],
    bnBenefits: ["তাৎক্ষণিক শক্তি", "পুষ্টিতে ভরপুর"],
    stock: 25,
    badge: "Best Selling",
    badgeColor: "bg-blue-600"
  },
  {
    id: "honey-2",
    slug: "sundarban-honey-1kg-grid",
    name: "Sundarban Honey 1kg",
    bnName: "সুন্দরবনের মধু ১ কেজি",
    category: "honey",
    bnCategory: "মধু",
    price: 2500,
    originalPrice: 2500,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/qmVLk1783162733.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/qmVLk1783162733.png"],
    rating: 5,
    reviewCount: 300,
    description: "Direct Sundarban wild honey.",
    bnDescription: "সুন্দরবনের শতভাগ প্রাকৃতিক ও প্রিমিয়াম বন্য মধু।",
    benefits: ["অর্গানিক", "প্রাকৃতিক স্বাস্থ্যের জন্য উত্তম"],
    bnBenefits: ["অর্গানিক", "প্রাকৃতিক স্বাস্থ্যের জন্য উত্তম"],
    stock: 45
  },
  {
    id: "honey-3",
    slug: "african-organic-wild-honey-500g",
    name: "African Organic Wild Honey 500g",
    bnName: "আফ্রিকান অর্গানিক ওয়াইল্ড হানি ৫০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 1100,
    originalPrice: 1250,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/g7Qx11775107164.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/g7Qx11775107164.jpg"],
    rating: 4.8,
    reviewCount: 88,
    description: "Imported wild organic honey.",
    bnDescription: "আমদানিকৃত প্রিমিয়াম আফ্রিকান ওয়াইল্ড অর্গানিক মধু।",
    benefits: ["রোগ প্রতিরোধক", "অ্যান্টি-অক্সিডেন্ট"],
    bnBenefits: ["রোগ প্রতিরোধক", "অ্যান্টি-অক্সিডেন্ট"],
    stock: 20,
    badge: "Save 12%",
    badgeColor: "bg-green-600"
  },
  {
    id: "honey-4",
    slug: "black-seed-honey-500g",
    name: "Black Seed Honey 500g",
    bnName: "কালোজিরা ফুলের মধু ৫০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 750,
    originalPrice: 800,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/JdeWl1767418564.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/JdeWl1767418564.jpg"],
    rating: 4.9,
    reviewCount: 110,
    description: "Pure Black Seed Honey.",
    bnDescription: "প্রাকৃতিক উপাদান ও পুষ্টিতে ভরপুর খাঁটি কালোজিরা মধু।",
    benefits: ["উপকারী", "স্বাস্থ্যকর"],
    bnBenefits: ["উপকারী", "স্বাস্থ্যকর"],
    stock: 30,
    badge: "Save 6%",
    badgeColor: "bg-green-600"
  },
  {
    id: "honey-5",
    slug: "natural-honeycomb-1kg",
    name: "Natural Honeycomb- 1kg",
    bnName: "ন্যাচারাল হানিকম্ব- ১ কেজি",
    category: "honey",
    bnCategory: "মধু",
    price: 2250,
    originalPrice: 2500,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/8ZFYk1767532058.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/8ZFYk1767532058.jpg"],
    rating: 5,
    reviewCount: 95,
    description: "Raw honeycomb with honey.",
    bnDescription: "মৌচাকসহ খাঁটি প্রাকৃতিক র হানি।",
    benefits: ["শতভাগ কাঁচা", "অর্গানিক"],
    bnBenefits: ["শতভাগ কাঁচা", "অর্গানিক"],
    stock: 15,
    badge: "Save 10%",
    badgeColor: "bg-green-600"
  },
  {
    id: "honey-6",
    slug: "lychee-flower-honey-500g",
    name: "Lychee Flower Honey 500g",
    bnName: "লিচু ফুলের মধু ৫০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 550,
    originalPrice: 600,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/TtgOl1767418640.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/TtgOl1767418640.jpg"],
    rating: 4.7,
    reviewCount: 75,
    description: "Sweet and aromatic lychee flower honey.",
    bnDescription: "হালকা মিষ্টি সুবাসযুক্ত খাঁটি লিচু ফুলের মধু।",
    benefits: ["প্রাকৃতিক মিষ্টি", "উপকারী"],
    bnBenefits: ["প্রাকৃতিক মিষ্টি", "উপকারী"],
    stock: 40,
    badge: "Save 8%",
    badgeColor: "bg-green-600"
  },
  {
    id: "honey-7",
    slug: "kashmiri-sidr-honey-800g",
    name: "Kashmiri Sidr Honey 800g",
    bnName: "কাশ্মীরি সিদর মধু ৮০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 1800,
    originalPrice: 2000,
    weight: "800 g",
    bnWeight: "৮০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/OY4JB1768121526.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/OY4JB1768121526.jpg"],
    rating: 4.9,
    reviewCount: 60,
    description: "Rare Kashmiri Sidr Honey.",
    bnDescription: "কাশ্মীরের প্রিমিয়াম রয়্যাল সিদর মধু।",
    benefits: ["ওষুধী গুণ সমৃদ্ধ", "প্রিমিয়াম কোয়ালিটি"],
    bnBenefits: ["ওষুধী গুণ সমৃদ্ধ", "প্রিমিয়াম কোয়ালিটি"],
    stock: 18,
    badge: "New Arrival",
    badgeColor: "bg-blue-600"
  },
  {
    id: "honey-8",
    slug: "lychee-flower-honey-1kg",
    name: "Lychee Flower Honey 1kg",
    bnName: "লিচু ফুলের মধু ১ কেজি",
    category: "honey",
    bnCategory: "মধু",
    price: 1100,
    originalPrice: 1200,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://backoffice.ghorerbazar.com/productImages/A14zf1767418585.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/A14zf1767418585.jpg"],
    rating: 4.8,
    reviewCount: 130,
    description: "Lychee flower honey 1kg pack.",
    bnDescription: "লিচু বাগানের সংগৃহীত সুস্বাদু মধু।",
    benefits: ["শক্তি যোগায়", "সুস্বাদু"],
    bnBenefits: ["শক্তি যোগায়", "সুস্বাদু"],
    stock: 35,
    badge: "Save 8%",
    badgeColor: "bg-green-600"
  },
  {
    id: "honey-9",
    slug: "sundarban-honey-box",
    name: "Sundarban Honey 15g X 24 pcs (BOX)",
    bnName: "সুন্দরবনের মধু স্যাশে বক্স (২৪ পিস)",
    category: "honey",
    bnCategory: "মধু",
    price: 768,
    originalPrice: 768,
    weight: "360 g",
    bnWeight: "৩৬০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/xtAP01776075952.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/xtAP01776075952.png"],
    rating: 4.9,
    reviewCount: 40,
    description: "Easy travel-friendly sachet box.",
    bnDescription: "সহজে বহনে উপযোগী সুন্দরবনের মধুর বিশেষ স্যাশে প্যাক।",
    benefits: ["সহজ বহনযোগ্য", "হাইজিন প্যাক"],
    bnBenefits: ["সহজ বহনযোগ্য", "হাইজিন প্যাক"],
    stock: 50,
    badge: "New Arrival",
    badgeColor: "bg-blue-600"
  },
  {
    id: "honey-10",
    slug: "sundarban-honey-500g",
    name: "Sundarban Honey 500 gm",
    bnName: "সুন্দরবনের মধু ৫০০ গ্রাম",
    category: "honey",
    bnCategory: "মধু",
    price: 1250,
    originalPrice: 1250,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/cfxR31783329993.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/cfxR31783329993.png"],
    rating: 5,
    reviewCount: 160,
    description: "Pure Sundarban Honey 500g.",
    bnDescription: "সুন্দরবনের প্রাকৃতিক মৌচাকের খাঁটি মধু ৫০০ গ্রাম।",
    benefits: ["১০০% খাঁটি", "প্রাকৃতিক"],
    bnBenefits: ["১০০% খাঁটি", "প্রাকৃতিক"],
    stock: 40
  }
];

export const comboItems: ComboItem[] = [
  {
    id: "combo-1",
    title: "Ghee (Half Kg) & Lychee Honey Sachet Combo",
    price: "৳1,000.00",
    oldPrice: "৳1,140.00",
    numericPrice: 1000,
    numericOldPrice: 1140,
    save: "12.3%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/1Xbv0tpGtgeSD6T0BHNp5daunFfZTAeDk9Qg76Eb.jpg"
  },
  {
    id: "combo-2",
    title: "Ghee (1 Kg) & Lychee Honey Sachet Combo",
    price: "৳1,800.00",
    oldPrice: "৳2,040.00",
    numericPrice: 1800,
    numericOldPrice: 2040,
    save: "11.8%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/eHFlh1X3A3xFiWdXUe2kXfVtaY5Ei77wEtlnC9fB.jpg"
  },
  {
    id: "combo-3",
    title: "Shahi Masala & Lychee Honey Sachet Combo",
    price: "৳1,500.00",
    oldPrice: "৳1,740.00",
    numericPrice: 1500,
    numericOldPrice: 1740,
    save: "13.8%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/jKGn1mEx0rH62pOSk1bgTcAJmSTZyu0AnUQpolx6.jpg"
  },
  {
    id: "combo-4",
    title: "Kala Bhuna & Lychee Honey Sachet Combo",
    price: "৳1,500.00",
    oldPrice: "৳1,740.00",
    numericPrice: 1500,
    numericOldPrice: 1740,
    save: "13.8%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/jovUHCCVKQ30iw1nVvJMlS2GyrJj5dWUo26JF46A.jpg"
  },
  {
    id: "combo-5",
    title: "Mustard Oil & Lychee Honey Sachet Combo",
    price: "৳1,750.00",
    oldPrice: "৳1,940.00",
    numericPrice: 1750,
    numericOldPrice: 1940,
    save: "9.8%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/ztrD8icsvD9WTmxrynf3WPrW3oO7DzvSzjkhGAL4.jpg"
  },
  {
    id: "combo-6",
    title: "Black Cumin Seed Oil & Lychee Honey Sachet Combo",
    price: "৳2,500.00",
    oldPrice: "৳2,740.00",
    numericPrice: 2500,
    numericOldPrice: 2740,
    save: "8.8%",
    img: "https://backoffice.ghorerbazar.com/storage/combos/QBpfARii8ShvmhEW118gZGewLLeDnnETpKBTpmXB.jpg"
  }
];

export const datesProducts: Product[] = [
  {
    id: "date-1",
    slug: "safawi-kalmi-dates-1kg",
    name: "Safawi/Kalmi Dates (A Grade) 1kg",
    bnName: "সফাওয়ী/কলমি খেজুর (এ গ্রেড) ১ কেজি",
    category: "dates",
    bnCategory: "খেজুর",
    price: 1300,
    originalPrice: 1300,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 4.9,
    reviewCount: 110,
    description: "Premium A Grade Safawi Dates.",
    bnDescription: "মদিনার প্রিমিয়াম নরম ও সুস্বাদু কলমি খেজুর।",
    benefits: ["শক্তি যোগায়", "ফাইবার সমৃদ্ধ"],
    bnBenefits: ["শক্তি যোগায়", "ফাইবার সমৃদ্ধ"],
    stock: 30
  },
  {
    id: "date-2",
    slug: "ajwa-premium-fresh-dates-500g",
    name: "Ajwa Premium Fresh Dates 500g (Large)",
    bnName: "আজওয়া প্রিমিয়াম খেজুর ৫০০ গ্রাম (লরেঞ্জ)",
    category: "dates",
    bnCategory: "খেজুর",
    price: 2250,
    originalPrice: 2500,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 5,
    reviewCount: 190,
    description: "Large size fresh Ajwa dates.",
    bnDescription: "মদিনা শরিফের প্রিমিয়াম কোয়ালিটির বড় সাইজের আজওয়া খেজুর।",
    benefits: ["হৃদযন্ত্রের জন্য উপকারী", "পুষ্টিকর"],
    bnBenefits: ["হৃদযন্ত্রের জন্য উপকারী", "পুষ্টিকর"],
    stock: 25,
    badge: "Save 12%",
    badgeColor: "bg-green-600"
  },
  {
    id: "date-3",
    slug: "ajwa-premium-fresh-dates-1kg",
    name: "Ajwa Premium Fresh Dates 1kg (Large)",
    bnName: "আজওয়া প্রিমিয়াম খেজুর ১ কেজি (লার্জ)",
    category: "dates",
    bnCategory: "খেজুর",
    price: 2250,
    originalPrice: 2500,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 5,
    reviewCount: 220,
    description: "1kg pack of Ajwa dates.",
    bnDescription: "পবিত্র মদিনার শতভাগ প্রিমিয়াম আজওয়া খেজুর ১ কেজি।",
    benefits: ["রোগ প্রতিরোধ ক্ষমতা", "পুষ্টি সমৃদ্ধ"],
    bnBenefits: ["রোগ প্রতিরোধ ক্ষমতা", "পুষ্টি সমৃদ্ধ"],
    stock: 20
  },
  {
    id: "date-4",
    slug: "safawi-kalmi-500g",
    name: "Safawi/Kalmi (A Grade) 500g",
    bnName: "সফাওয়ী/কলমি (এ গ্রেড) ৫০০ গ্রাম",
    category: "dates",
    bnCategory: "খেজুর",
    price: 650,
    originalPrice: 650,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 4.8,
    reviewCount: 70,
    description: "500g Safawi Dates.",
    bnDescription: "কলমি খেজুর ৫০০ গ্রাম প্যাক।",
    benefits: ["সুস্বাদু", "ন্যাচারাল"],
    bnBenefits: ["সুস্বাদু", "ন্যাচারাল"],
    stock: 45
  },
  {
    id: "date-5",
    slug: "egyptian-medjool-1kg",
    name: "Egyptian Medjool Dates – 1 kg (Super Jumbo)",
    bnName: "ইজিপশিয়ান মেডজুল খেজুর ১ কেজি (সুপার জাম্বো)",
    category: "dates",
    bnCategory: "খেজুর",
    price: 2700,
    originalPrice: 2700,
    weight: "1 kg",
    bnWeight: "১ কেজি",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 4.9,
    reviewCount: 95,
    description: "Super jumbo size Egyptian Medjool dates.",
    bnDescription: "মিশরের বিশাল সাইজের জুসি ও সুস্বাদু মেডজুল খেজুর।",
    benefits: ["সুপার সাইজ", "মিষ্টি ও রসালো"],
    bnBenefits: ["সুপার সাইজ", "মিষ্টি ও রসালো"],
    stock: 15
  },
  {
    id: "date-6",
    slug: "medjool-premium-500g",
    name: "Medjool Premium Dates 500g",
    bnName: "মেডজুল প্রিমিয়াম খেজুর ৫০০ গ্রাম",
    category: "dates",
    bnCategory: "খেজুর",
    price: 1350,
    originalPrice: 1350,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596708059430-ba215112857f?q=80&w=600&auto=format&fit=crop"],
    rating: 4.9,
    reviewCount: 50,
    description: "500g Premium Medjool.",
    bnDescription: "মেডজুল প্রিমিয়াম কোয়ালিটি ৫০০ গ্রাম।",
    benefits: ["রসালো", "উপকারী"],
    bnBenefits: ["রসালো", "উপকারী"],
    stock: 25,
    badge: "New Arrival",
    badgeColor: "bg-blue-600"
  }
];

export const cookingProducts: Product[] = [
  {
    id: "cook-1",
    slug: "rice-flour-2kg",
    name: "Rice Flour (Chaler Gura) 2kg",
    bnName: "চাল বা চালের গুঁড়া ২ কেজি",
    category: "flours-lentils",
    bnCategory: "আটা ও ডাল",
    price: 200,
    originalPrice: 200,
    weight: "2 kg",
    bnWeight: "২ কেজি",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop"],
    rating: 4.7,
    reviewCount: 65,
    description: "Pure rice flour.",
    bnDescription: "পিঠা ও রান্নার জন্য প্রস্তুত খাঁটি আতপ চালের গুঁড়া।",
    benefits: ["খাঁটি", "পিঠার উপযোগী"],
    bnBenefits: ["খাঁটি", "পিঠার উপযোগী"],
    stock: 50
  },
  {
    id: "cook-2",
    slug: "turmeric-powder-500g",
    name: "Turmeric (Holud) Powder 500g",
    bnName: "হলুদ গুঁড়া ৫০০ গ্রাম",
    category: "spices",
    bnCategory: "মশলা",
    price: 295,
    originalPrice: 295,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop"],
    rating: 4.8,
    reviewCount: 140,
    description: "Pure natural turmeric powder.",
    bnDescription: "ভেজালমুক্ত প্রাকৃতিকভাবে শুকানো দেশি হলুদের গুঁড়া।",
    benefits: ["প্রাকৃতিক রং", "অ্যান্টিসেপ্টিক"],
    bnBenefits: ["প্রাকৃতিক রং", "অ্যান্টিসেপ্টিক"],
    stock: 60
  },
  {
    id: "cook-3",
    slug: "gawa-ghee-500g",
    name: "Gawa Ghee 500gm",
    bnName: "গাওয়া ঘি ৫০০ গ্রাম",
    category: "oil-ghee",
    bnCategory: "ঘি ও তেল",
    price: 900,
    originalPrice: 900,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://backoffice.ghorerbazar.com/productImages/bcBTR1781518012.png",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/bcBTR1781518012.png"],
    rating: 5,
    reviewCount: 180,
    description: "500g pure cow ghee.",
    bnDescription: "গরুর দুধের মাখন থেকে তৈরি সুবাসিত গাওয়া ঘি।",
    benefits: ["স্বাদু", "সুগন্ধি"],
    bnBenefits: ["স্বাদু", "সুগন্ধি"],
    stock: 35
  },
  {
    id: "cook-4",
    slug: "laal-atta-2kg",
    name: "Laal Atta 2kg",
    bnName: "লাল আটা ২ কেজি",
    category: "flours-lentils",
    bnCategory: "আটা ও ডাল",
    price: 200,
    originalPrice: 200,
    weight: "2 kg",
    bnWeight: "২ কেজি",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop"],
    rating: 4.8,
    reviewCount: 90,
    description: "Whole wheat red flour.",
    bnDescription: "আঁশযুক্ত ও পুষ্টিকর লাল গমের তৈরি খাঁটি আটা।",
    benefits: ["ডায়াবেটিসের জন্য ভাল", "আঁশযুক্ত"],
    bnBenefits: ["ডায়াবেটিসের জন্য ভাল", "আঁশযুক্ত"],
    stock: 50
  },
  {
    id: "cook-5",
    slug: "coriander-powder-500g",
    name: "Coriander Powder 500gm",
    bnName: "ধনে গুঁড়া ৫০০ গ্রাম",
    category: "spices",
    bnCategory: "মশলা",
    price: 240,
    originalPrice: 240,
    weight: "500 g",
    bnWeight: "৫০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop"],
    rating: 4.7,
    reviewCount: 55,
    description: "Pure coriander powder.",
    bnDescription: "তাজা ধনে বীজ থেকে তৈরি ঘ্রাণযুক্ত ধনে গুঁড়া।",
    benefits: ["রান্নার সুবাস", "ভেজালহীন"],
    bnBenefits: ["রান্নার সুবাস", "ভেজালহীন"],
    stock: 45
  },
  {
    id: "cook-6",
    slug: "mustard-oil-1l",
    name: "Deshi Mustard Oil 1 Liter",
    bnName: "দেশি সরিষার তেল ১ লিটার",
    category: "oil-ghee",
    bnCategory: "ঘি ও তেল",
    price: 350,
    originalPrice: 350,
    weight: "1 L",
    bnWeight: "১ লিটার",
    image: "https://backoffice.ghorerbazar.com/productImages/vkVdH1767248022.jpg",
    gallery: ["https://backoffice.ghorerbazar.com/productImages/vkVdH1767248022.jpg"],
    rating: 4.9,
    reviewCount: 210,
    description: "1 Liter Mustard Oil.",
    bnDescription: "কাঠের ঘানির দেশি সরিষার তেল ১ লিটার।",
    benefits: ["ঝাঁঝালো", "স্বাস্থ্যকর"],
    bnBenefits: ["ঝাঁঝালো", "স্বাস্থ্যকর"],
    stock: 60
  }
];

export const organicProducts: Product[] = [
  {
    id: "org-1",
    slug: "glarvest-matcha-tea-100g",
    name: "Glarvest Organic Matcha Green Tea 100gm",
    bnName: "গ্লারভেস্ট অর্গানিক মাচা গ্রিন টি ১০০ গ্রাম",
    category: "organic",
    bnCategory: "অর্গানিক",
    price: 1500,
    originalPrice: 1500,
    weight: "100 g",
    bnWeight: "১০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop"],
    rating: 5,
    reviewCount: 75,
    description: "Organic Japanese Matcha Green Tea.",
    bnDescription: "জাপানি মেথডে তৈরি অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ অর্গানিক মাচা গ্রিন টি।",
    benefits: ["মেটাবলিজম বাড়ায়", "ডিটক্সিফাই করে"],
    bnBenefits: ["মেটাবলিজম বাড়ায়", "ডিটক্সিফাই করে"],
    stock: 25
  },
  {
    id: "org-2",
    slug: "organic-spirulina-powder-250g",
    name: "Organic Spirulina Powder 250gm",
    bnName: "অর্গানিক স্পিরুলিনা পাউডার ২৫০ গ্রাম",
    category: "organic",
    bnCategory: "অর্গানিক",
    price: 1140,
    originalPrice: 1300,
    weight: "250 g",
    bnWeight: "২৫০ গ্রাম",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop"],
    rating: 4.8,
    reviewCount: 45,
    description: "Superfood Spirulina Powder.",
    bnDescription: "প্রোটিন ও খনিজ পদার্থে ভরপুর সেরা স্পিরুলিনা পাউডার।",
    benefits: ["সুপারফুড", "শক্তি বৃদ্ধি"],
    bnBenefits: ["সুপারফুড", "শক্তি বৃদ্ধি"],
    stock: 30,
    badge: "Save 12%",
    badgeColor: "bg-green-600"
  },
  {
    id: "org-3",
    slug: "ashwagandha-powder-100g",
    name: "Ashwagandha Powder 100g (USDA Organic Certified)",
    bnName: "অশ্বগন্ধা পাউডার ১০০ গ্রাম (ইউএসডিএ অর্গানিক)",
    category: "organic",
    bnCategory: "অর্গানিক",
    price: 600,
    originalPrice: 600,
    weight: "100 g",
    bnWeight: "১০০ গ্রাম",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop"],
    rating: 4.9,
    reviewCount: 90,
    description: "USDA Certified Ashwagandha Powder.",
    bnDescription: "মানসিক চাপ দূর করতে এবং শারীরিক শক্তি বাড়াতে ইউএসডিএ সার্টিফাইড অশ্বগন্ধা।",
    benefits: ["স্ট্রেস কমায়", "স্ট্যামিনা বাড়ায়"],
    bnBenefits: ["স্ট্রেস কমায়", "স্ট্যামিনা বাড়ায়"],
    stock: 40,
    badge: "USDA Certified",
    badgeColor: "bg-green-700"
  },
  {
    id: "org-4",
    slug: "ceylon-coconut-milk-400ml",
    name: "Ceylon Organic Coconut Milk (C) 400ml",
    bnName: "সিলন অর্গানিক কোকোনাট মিল্ক ৪০০ মি.লি.",
    category: "organic",
    bnCategory: "অর্গানিক",
    price: 360,
    originalPrice: 360,
    weight: "400 ml",
    bnWeight: "৪০০ মি.লি.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop"],
    rating: 4.7,
    reviewCount: 35,
    description: "Pure Ceylon Coconut Milk.",
    bnDescription: "শ্রীলঙ্কান প্রিমিয়াম অর্গানিক নারিকেল দুধ।",
    benefits: ["সুস্বাদু", "ল্যাকটোজ ফ্রি"],
    bnBenefits: ["সুস্বাদু", "ল্যাকটোজ ফ্রি"],
    stock: 50
  },
  {
    id: "org-5",
    slug: "ceylon-coconut-vinegar-500ml",
    name: "Ceylon Organic Coconut Vinegar 500ml",
    bnName: "সিলন অর্গানিক কোকোনাট ভিনেগার ৫০০ মি.লি.",
    category: "organic",
    bnCategory: "অর্গানিক",
    price: 1065,
    originalPrice: 1065,
    weight: "500 ml",
    bnWeight: "৫০০ মি.লি.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop"],
    rating: 4.8,
    reviewCount: 20,
    description: "Natural Ceylon Coconut Vinegar.",
    bnDescription: "হজম শক্তি বাড়াতে প্রাকৃতিক কোকোনাট ভিনেগার।",
    benefits: ["হজম সহায়তায়", "ন্যাচারাল"],
    bnBenefits: ["হজম সহায়তায়", "ন্যাচারাল"],
    stock: 20
  }
];

export const brandItems: BrandItem[] = [
  {
    id: "brand-1",
    name: "Ghorer Bazar",
    logo: "https://backoffice.ghorerbazar.com/brand_images/7hNKq1768887947.png",
    link: "/shop?brand=ghorerbazar"
  },
  {
    id: "brand-2",
    name: "Glarvest",
    logo: "https://backoffice.ghorerbazar.com/brand_images/RNTIU1763611802.png",
    link: "/shop?brand=glarvest"
  },
  {
    id: "brand-3",
    name: "Khejuri",
    logo: "https://backoffice.ghorerbazar.com/brand_images/8Gpl21757919440.png",
    link: "/shop?brand=khejuri"
  },
  {
    id: "brand-4",
    name: "Shosti Food",
    logo: "https://backoffice.ghorerbazar.com/brand_images/8matO1757919401.png",
    link: "/shop?brand=shosti-food"
  },
  {
    id: "brand-5",
    name: "Honeyraj",
    logo: "https://backoffice.ghorerbazar.com/brand_images/lCfRt1759553456.png",
    link: "/shop?brand=honeyraj"
  }
];

export const reviewItems: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Fariha Akter Tumpa",
    designation: "Entrepreneur",
    comment: "আমি অনেক দিন ধরে এই সাইট থেকে খাঁটি মধু আর খেজুর কিনছি, মান খুবই ভালো।",
    avatar: "https://picsum.photos/seed/reviewer-1/60/60",
    rating: 5
  },
  {
    id: "rev-2",
    name: "Ayesha Khan",
    designation: "Banker",
    comment: "এখান থেকে ঘি এবং মশলা কিনেছি, প্যাকেজিং ও কোয়ালিটি চমৎকার ছিল, ধন্যবাদ Ghorer Bazar কে।",
    avatar: "https://picsum.photos/seed/reviewer-2/60/60",
    rating: 5
  },
  {
    id: "rev-3",
    name: "Sultana Yesmin",
    designation: "Housewife",
    comment: "Thanks Ghorer Bazar for free Honeyraj. Of course, I got it for being a regular customer.",
    avatar: "https://picsum.photos/seed/reviewer-3/60/60",
    rating: 5
  }
];

export const staticProducts: Product[] = [
  ...topSellingProducts,
  ...honeyProducts,
  ...datesProducts,
  ...cookingProducts,
  ...organicProducts
];
