"use client";
import {
  filterProducts,
  getCategories,
  getColors,
  getMaterials,
  getProducts,
  getSizes,
  Product,
  ProductFilter,
  SortBy,
} from "@/libs/products";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductsArchive/ProductCard";
import ProductFilterTab from "@/components/ProductsArchive/ProductFilterTab";
import { ArrowDownNarrowWide } from "lucide-react";

export default function ProductsArchive() {
  const [filters, setFilters] = useState<ProductFilter>({
    categories: [],
    sizes: [],
    colors: [],
    materials: [],
  });

  const [products, setProducts] = useState<Product[]>(getProducts());
  const categories = getCategories();
  const sizes = getSizes();
  const colors = getColors();
  const materials = getMaterials();
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<SortBy>("priceAsc");

  useEffect(() => {
    setProducts(filterProducts(filters, sortBy));
  }, [filters, sortBy]);

  function handleFilterChange(slug: string, items: string[]) {
    setFilters({
      ...filters,
      [slug]: items,
    });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={
          "my-4 flex justify-between items-center max-w-sm lg:max-w-full mx-auto"
        }
      >
        <div>
          <h1 className={"font-bold text-3xl"}>Toutes les chaussures</h1>
          <span className={"text-gray-500"}>{products.length} produits</span>
        </div>
        <div>
          <div
            onClick={() => setOpenSort(!openSort)}
            className={"relative"}
            ref={dropdownRef}
          >
            <div
              className={
                "flex items-center justify-center p-1 border border-black rounded "
              }
            >
              <ArrowDownNarrowWide className={"cursor-pointer"} />
            </div>
            {openSort && (
              <div
                className={
                  "absolute top-10 right-0 bg-white p-4 border border-gray-200 z-10 w-fit"
                }
              >
                <div className={"flex flex-col gap-2 w-40"}>
                  <button
                    onClick={() => setSortBy("priceAsc")}
                    className={"text-left w-full hover:bg-gray-100 p-2"}
                  >
                    Prix croissant
                  </button>
                  <button
                    onClick={() => setSortBy("priceDesc")}
                    className={"text-left w-full hover:bg-gray-100 p-2"}
                  >
                    Prix décroissant
                  </button>
                  <button
                    onClick={() => setSortBy("nameAsc")}
                    className={"text-left w-full hover:bg-gray-100 p-2"}
                  >
                    Nom croissant
                  </button>
                  <button
                    onClick={() => setSortBy("nameDesc")}
                    className={"text-left w-full hover:bg-gray-100 p-2"}
                  >
                    Nom décroissant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          "flex lg:flex-row flex-col lg:space-x-8 max-w-sm lg:max-w-full mx-auto"
        }
      >
        <div className={"lg:sticky w-full  mx-auto  lg:w-1/4 h-full top-12"}>
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className={
              "lg:hidden block bg-black text-white p-2 rounded mb-4 w-full"
            }
          >
            Filtres
          </button>
          <div className={` lg:block ${openFilter ? "block" : "hidden"}`}>
            <h2 className={"text-xl font-bold mb-2 hidden lg:block"}>
              Filtres
            </h2>

            <ProductFilterTab
              title={"Catégorie"}
              slug={"categories"}
              items={categories}
              setFilters={handleFilterChange}
            />

            <ProductFilterTab
              title={"Tailles"}
              slug={"sizes"}
              items={sizes}
              setFilters={handleFilterChange}
            />

            <ProductFilterTab
              title={"Couleurs"}
              slug={"colors"}
              items={colors}
              setFilters={handleFilterChange}
            />

            <ProductFilterTab
              title={"Matériaux"}
              slug={"materials"}
              items={materials}
              setFilters={handleFilterChange}
            />
          </div>
        </div>

        <div className={"w-full lg:w-3/4 mb-4"}>
          <div
            className={
              "lg:grid grid-cols-3 gap-4 mx-auto lg:space-y-0 space-y-8"
            }
          >
            {products.map((product) => (
              <ProductCard key={"product-" + product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
