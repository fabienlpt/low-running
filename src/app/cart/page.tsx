"use client";

import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/libs/products";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductWithDetails = {
  productId: number;
  size: string;
  color: string;
  product: Product;
};

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="py-12 text-center">Chargement...</div>;
  }

  const cartItemsWithDetails: ProductWithDetails[] = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)!,
  }));

  const total = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.product.price,
    0
  );

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">Votre panier est vide</p>
            <Link
              href="/products"
              className="inline-block bg-black text-white px-6 py-3 rounded-[30px] hover:bg-opacity-80"
            >
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cartItemsWithDetails.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-6 border-b last:border-b-0"
                >
                  <div className="w-24 h-24 relative rounded bg-gray-100">
                    {item.product.images && item.product.images.length > 0 && (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="ml-6 flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Taille: {item.size} • Couleur: {item.color}
                    </p>
                    <p className="mt-1 font-medium">{item.product.price}€/mois</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-medium">{total.toFixed(2)}€/mois sur 12 mois.</span>
              </div>

              <a href={'/checkout'}
                className="w-full bg-black text-white py-4 rounded-[30px] hover:bg-opacity-80 mb-4 block text-center"
              >
                Passer la commande
              </a>

              <Link
                href="/products"
                className="block text-center text-sm text-gray-600 hover:text-black"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
