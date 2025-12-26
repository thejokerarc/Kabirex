export interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice?: number;
  currentPrice: number;
  category: string;
  brand: string;
  inStock: boolean;
  description?: string;
  // New Specs & Options
  colors?: string[];
  colorImages?: { [key: string]: string };
  storageOptions?: string[];
  specs?: {
    processor?: string;
    ram?: string;
    battery?: string;
    weight?: string;
    camera?: string;
    screen?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
}
