import { products } from "@/data/products";

export type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  sizes: string[];
  material: string;
  colors: string[];
  features: string[];
  maxKilometers: number;
  images?: string[];
};

export type ProductFilter = {
  categories: string[];
  sizes: string[];
  colors: string[];
  materials: string[];
};

export function getProducts() {
  return products;
}

export function filterProducts(filters: ProductFilter) {
    return products.filter(product => {
        if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
            return false;
        }

        if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) {
            return false;
        }

        if (filters.colors.length > 0 && !filters.colors.some(color => product.colors.includes(color))) {
            return false;
        }

        if (filters.materials.length > 0 && !filters.materials.some(material => product.material === material)) {
            return false;
        }

        return true;
    });
}

export function getCategories() {
    return Array.from(new Set(products.map(product => product.category)));
}

export function getSizes() {
    return Array.from(new Set(products.flatMap(product => product.sizes)));
}

export function getColors() {
    return Array.from(new Set(products.flatMap(product => product.colors)));
}

export function getMaterials() {
    return Array.from(new Set(products.map(product => product.material)));
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id) || null;
}
