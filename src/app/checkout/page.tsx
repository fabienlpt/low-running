"use client";
import StoreLocator from "@/components/store-locator";
import {Store} from "@/libs/stores";
import {useEffect, useState} from "react";
import {CartItem, useCart} from "@/hooks/useCart";
import {redirect} from "next/navigation";
import {getProductById} from "@/libs/products";
import Image from "next/image";

export default function Page({store}) {
    const {cartItems, removeFromCart, clearCart} = useCart();
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [error, setError] = useState<string | null>(null);

    const placeOrder = () => {
        if (!selectedStore) {
            setError("Veuillez sélectionner un magasin");
            return;
        }

        clearCart();
        redirect("/");
    };

    const renderProduct = (cartItem: CartItem) => {
        const product = getProductById(cartItem.productId);
        if (!product) {
            return null;
        }
        return (
            <li key={cartItem.productId} className={"flex w-full justify-between border border-gray-300 shadow-lg p-2 rounded"}>
                <div>
                    <p className={"font-bold"}>{product.name}</p>
                    <p className={"text-sm text-gray-400"}>Taille : {cartItem.size}</p>
                    <p className={"text-sm text-gray-400"}>Couleur : {cartItem.color}</p>
                </div>
                {product.images.length > 0 && (
                    <Image src={product.images[0]} alt={product.name} className={"h-full aspect-square object-cover"} width={100} height={100}/>
                )}
            </li>
        );
    }

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    return (
        <div className={"lg:max-w-7xl max-w-sm mx-auto min-h-screen"}>
            <h1 className="text-3xl font-bold text-gray-900 my-8">Validation de commande</h1>
            <div>
                <h2 className={"text-xl font-semibold mb-6"}>Récapitulatif de la commande</h2>
                <ul className={"grid grid-cols-1 lg:grid-cols-3 gap-8"}>
                    {cartItems.map((item) => renderProduct(item))}
                </ul>
            </div>

            <h2 className={"text-xl font-semibold mb-6 mt-8"}>Sélectionnez un magasin</h2>
            <div className={"lg:h-96"}>
                <StoreLocator onSelectStore={(store) => setSelectedStore(store)}/>
            </div>

            {error && <div className={"text-red-500 mt-8 font-bold"}>{error}</div>}

            <button className="w-full bg-black text-white py-4 rounded-[30px] hover:bg-opacity-80 mb-4 block text-center mt-8" onClick={placeOrder}>Valider la commande</button>
        </div>
    );
}