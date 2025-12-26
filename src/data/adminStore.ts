import { Product, products as initialProducts } from "./products";

const STORAGE_KEY = "kabirex_dynamic_products";

export const getProducts = (): Product[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored products", e);
        }
    }
    return initialProducts;
};

export const saveProducts = (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, "id">): Product => {
    const products = getProducts();
    const nextId = Math.max(0, ...products.map(p => Number(p.id) || 0)) + 1;
    const newProduct = { ...product, id: String(nextId) } as Product;
    saveProducts([...products, newProduct]);
    return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
    const products = getProducts();
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    saveProducts(updated);
};

export const deleteProduct = (id: string) => {
    const products = getProducts();
    saveProducts(products.filter(p => p.id !== id));
};
