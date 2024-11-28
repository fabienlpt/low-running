import DiscoveryForm from "@/components/discoveryForm/discoveryForm";
import { getProductsMaxPrice, getProductsMinPrice, getRandomProducts } from "@/libs/products";

export default function Page() {
    return (
        <main className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="my-4 max-w-sm lg:max-w-full lg:mx-auto">
                <h1 className={"font-bold text-3xl"}>Trouver votre chaussure sur-mesure</h1>
                <span className={"text-gray-500"}>De {getProductsMinPrice()}€ à {getProductsMaxPrice()}€</span>
            </div>
            <DiscoveryForm randomProducts={getRandomProducts(3)} />
        </main>
    );
}
