import { Product } from "@/types/product";

// Categories
export const categories = [
  { id: "smartphones", name: "Smartphones", icon: "📱" },
  { id: "ordinateurs", name: "Ordinateurs", icon: "💻" },
  { id: "tablets", name: "Tablettes", icon: "📲" },
  { id: "audio", name: "Audio", icon: "🎧" },
  { id: "electronique", name: "Électronique", icon: "📺" },
  { id: "electromenager", name: "Électroménager", icon: "🏠" },
  { id: "climatisation", name: "Climatisation", icon: "❄️" },
];

// Brands
export const brands = [
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "xiaomi", name: "Xiaomi" },
  { id: "tecno", name: "TECNO" },
  { id: "itel", name: "Itel" },
  { id: "hikvision", name: "Hikvision" },
  { id: "walton", name: "Walton" },
  { id: "binatone", name: "Binatone" },
];

// Products with REAL iPhone images uploaded by user
export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 16 128GB eSIM",
    description: "Le nouvel iPhone 16 repousse les limites avec sa puce A18 Bionic ultra-rapide et son système photo avancé.",
    image: "/images/products/iphone16-black.png",
    originalPrice: 750000,
    currentPrice: 699000,
    category: "smartphones",
    brand: "Apple",
    inStock: true,
    colors: ["#000000", "#F5F5F0", "#A0C4FF", "#C1E1C1", "#F4C2C2"],
    colorImages: {
      "#000000": "/images/products/iphone16-black.png",
      "#F5F5F0": "/images/products/iphone16-white.png",
      "#A0C4FF": "/images/products/iphone16-blue.png",
      "#C1E1C1": "/images/products/iphone16-teal.png",
      "#F4C2C2": "/images/products/iphone16-pink.png"
    },
    storageOptions: ["128GB", "256GB", "512GB"],
    specs: {
      processor: "A18 Bionic",
      ram: "8GB",
      battery: "3561 mAh",
      weight: "170g",
      camera: "48MP Main",
      screen: "6.1\" Super Retina XDR"
    }
  },
  {
    id: "2",
    name: "Samsung Galaxy A07 128GB",
    image: "/images/products/samsung-a07-black.png",
    originalPrice: 185000,
    currentPrice: 165000,
    category: "smartphones",
    brand: "Samsung",
    inStock: true,
    colors: ["#000000", "#2C7A7B", "#A8A8A8"],
    colorImages: {
      "#000000": "/images/products/samsung-a07-black.png",
      "#2C7A7B": "/images/products/samsung-a07-teal.png",
      "#A8A8A8": "/images/products/samsung-a07-black.png"
    },
    storageOptions: ["64GB", "128GB"],
    specs: {
      processor: "Helio G35",
      ram: "4GB",
      battery: "5000 mAh",
      camera: "50MP Main",
      screen: "6.7\" PLS LCD"
    }
  },
  {
    id: "3",
    name: "TECNO POP 10 128GB",
    image: "/images/products/tecno-pop10-black.png",
    originalPrice: 95000,
    currentPrice: 85000,
    category: "smartphones",
    brand: "TECNO",
    inStock: true,
    colors: ["#000000", "#4A90E2"],
    colorImages: {
      "#000000": "/images/products/tecno-pop10-black.png",
      "#4A90E2": "/images/products/tecno-pop10-black.png"
    },
    storageOptions: ["64GB", "128GB"],
    specs: {
      processor: "Unisoc T606",
      ram: "4GB",
      battery: "5000 mAh",
      camera: "13MP AI",
      screen: "6.6\" HD+"
    }
  },
  {
    id: "4",
    name: "Ventilateur Industriel 30 Pouces",
    image: "/images/products/ventilateur-user.png",
    originalPrice: 125000,
    currentPrice: 99000,
    category: "climatisation",
    brand: "Binatone",
    inStock: true,
  },
  {
    id: "5",
    name: "Xiaomi Redmi Note 13 Pro",
    image: "/images/products/xiaomi-note13-pro.png",
    originalPrice: 245000,
    currentPrice: 225000,
    category: "smartphones",
    brand: "Xiaomi",
    inStock: true,
    colors: ["#000000", "#FFFFFF"],
    storageOptions: ["128GB", "256GB"],
    specs: {
      processor: "Snapdragon 7s Gen 2",
      ram: "8GB",
      battery: "5100 mAh",
      camera: "200MP Main",
      screen: "6.67\" AMOLED"
    }
  },
  {
    id: "6",
    name: "Caméra de Surveillance Hikvision 4K",
    image: "/images/products/hikvision-4k.png",
    originalPrice: 95000,
    currentPrice: 79000,
    category: "electronique",
    brand: "Hikvision",
    inStock: true,
  },
  {
    id: "7",
    name: "Itel A05 S 64GB",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=800&auto=format&fit=crop",
    currentPrice: 55000,
    category: "smartphones",
    brand: "Itel",
    inStock: true,
    colors: ["#Black", "#Blue"],
    storageOptions: ["32GB", "64GB"],
    specs: {
      ram: "4GB (2+2)",
      battery: "4000 mAh",
      screen: "6.6\" HD+"
    }
  },
  {
    id: "8",
    name: "Réfrigérateur Walton 350L",
    image: "/images/products/refrigerateur-user.png",
    originalPrice: 450000,
    currentPrice: 395000,
    category: "electromenager",
    brand: "Walton",
    inStock: true,
  },
  {
    id: "9",
    name: "MacBook Pro M3 14\"",
    description: "La puissance à l'état pur. Le MacBook Pro M3 offre des performances exceptionnelles pour les professionnels et les créatifs.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=900&hei=900&fmt=jpeg&qlt=90&.v=1697311054290",
    originalPrice: 1500000,
    currentPrice: 1399000,
    category: "ordinateurs",
    brand: "Apple",
    inStock: true,
    colors: ["#7D7D7D", "#E3E3E3"],
    colorImages: {
      "#7D7D7D": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=900&hei=900&fmt=jpeg&qlt=90&.v=1697311054290",
      "#E3E3E3": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=900&hei=900&fmt=jpeg&qlt=90&.v=1697311054350",
    },
    storageOptions: ["512GB", "1TB", "2TB"],
    specs: {
      processor: "Apple M3 Pro",
      ram: "18GB",
      battery: "72.4 Wh",
      weight: "1.61 kg",
      screen: "14.2\" Liquid Retina XDR"
    }
  },
  {
    id: "10",
    name: "iPad Air M2 11\"",
    description: "L'iPad Air M2 combine puissance et portabilité.",
    image: "/images/products/ipad-air-m2-user.png",
    originalPrice: 550000,
    currentPrice: 499000,
    category: "tablets",
    brand: "Apple",
    inStock: true,
    colors: ["#68696F", "#E4DCD3", "#89A7B1", "#BAA7C7"],
    storageOptions: ["128GB", "256GB"],
    specs: {
      processor: "Apple M2",
      ram: "8GB",
      battery: "28.6 Wh",
      weight: "462g",
      screen: "11\" Liquid Retina"
    }
  },
  {
    id: "11",
    name: "AirPods Max Space Gray",
    description: "Une expérience d'écoute inouïe.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=940&hei=1112&fmt=png-alpha&.v=1604021228514",
    originalPrice: 450000,
    currentPrice: 399000,
    category: "audio",
    brand: "Apple",
    inStock: true,
    colors: ["#3E3E3E", "#EBEBEB", "#AAD3E1", "#EFA8A9", "#A5E0C5"],
    specs: {
      processor: "H1",
      battery: "20h Listening",
      weight: "384.8g"
    }
  },
];

export const weeklyDeals = products.filter(p => p.originalPrice && p.originalPrice > p.currentPrice);
