"use client"
import {filterProducts, getCategories, getColors, getProducts, getSizes, Product, ProductFilter} from "@/libs/products";
import {useEffect, useState} from "react";

export default function ProductsArchive() {
    const [filters, setFilters] = useState<ProductFilter>({
        categories: [],
        sizes: [],
        colors: [],
        materials: [],
    });

    const [products, setProducts] = useState<Product[]>(getProducts());
    const [categories, setCategories] = useState<string[]>(getCategories());
    const [sizes, setSizes] = useState<string[]>(getSizes());
    const [colors, setColors] = useState<string[]>(getColors());

    useEffect(() => {
        setProducts(filterProducts(filters));
    }, [filters]);


    return (
        <div className={"flex"}>
            <div className={"w-1/3 h-full"}>
                <h2 className={"text-xl font-bold mb-2"}>Filtres</h2>

                <h3 className={"mb-2"}>Catégories</h3>
                <ul>
                    {categories.map(category => (
                        <li key={category}>
                            <input type={"checkbox"} id={category} name={category} value={category} onInput={(e) => {
                                const checked = (e.target as HTMLInputElement).checked;
                                if (checked) {
                                    setFilters({
                                        ...filters,
                                        categories: [...filters.categories, category]
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        categories: filters.categories.filter(c => c !== category)
                                    });
                                }
                            }}/>
                            <label htmlFor={category}>{category}</label>
                        </li>
                    ))}
                </ul>

                <h3 className={"mb-2"}>Tailles</h3>
                <ul>
                    {sizes.map(size => (
                        <li key={size}>
                            <input type={"checkbox"} id={size} name={size} value={size} onInput={(e) => {
                                const checked = (e.target as HTMLInputElement).checked;
                                if (checked) {
                                    setFilters({
                                        ...filters,
                                        sizes: [...filters.sizes, size]
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        sizes: filters.sizes.filter(s => s !== size)
                                    });
                                }
                            }}/>
                            <label htmlFor={size}>{size}</label>
                        </li>
                    ))}
                </ul>

                <h3 className={"mb-2"}>Couleurs</h3>
                <ul>
                    {colors.map(color => (
                        <li key={color}>
                            <input type={"checkbox"} id={color} name={color} value={color} onInput={(e) => {
                                const checked = (e.target as HTMLInputElement).checked;
                                if (checked) {
                                    setFilters({
                                        ...filters,
                                        colors: [...filters.colors, color]
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        colors: filters.colors.filter(c => c !== color)
                                    });
                                }
                            }}/>
                            <label htmlFor={color}>{color}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"w-2/3"}>
                <div className={"grid grid-cols-3 gap-4"}>
                    {products.map(product => (
                        <div key={product.id} className={"bg-gray-100 p-4"}>
                            <h3 className={"font-bold"}>{product.name}</h3>
                            <p>{product.price} €</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
