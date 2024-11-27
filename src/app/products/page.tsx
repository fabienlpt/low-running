import ProductsArchive from "@/components/ProductsArchive/ProductsArchive";
import {products} from "@/data/products";

export default function Products() {

    return (
        <div className={"max-w-[1440px] mx-auto"}>
            <div className={"my-4"}>
                <h1 className={"font-bold text-3xl"}>Toutes les chaussures</h1>
                <span className={"text-gray-500"}>{products.length} produits</span>
            </div>

            <ProductsArchive/>
        </div>
    )
}