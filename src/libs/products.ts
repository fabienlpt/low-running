import {products} from "@/data/products";

export type Product = {
    id: number,
    category: string,
    name: string,
    price: number,
    sizes: string[],
    material: string,
    colors: string[],
    features: string[],
    images?: string[],
}

export type ProductFilter = {
    categories: string[],
    sizes: string[],
    colors: string[],
    materials: string[],
}

export function getProducts() {
    return products;
}