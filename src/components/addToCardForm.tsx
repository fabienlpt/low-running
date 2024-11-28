"use client";

import { useCart } from "@/hooks/useCart";
import { Heart } from "lucide-react";

type AddToCartFormProps = {
  productId: number;
  selectedSize: string;
  selectedColor: string;
};

export function AddToCartForm({
  productId,
  selectedSize,
  selectedColor,
}: AddToCartFormProps) {
  const { addToCart } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart({
      productId,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-6 w-full">
      <button
        type="submit"
        className="flex-1 bg-black text-white py-4 rounded-[30px] hover:bg-opacity-50 flex items-center justify-center space-x-2 w-full"
      >
        <span>Ajouter au panier</span>
      </button>
      <button
        type="button"
        className="p-4 border border-gray-200 rounded-[30px] hover:border-black flex items-center justify-center space-x-2 w-full"
      >
        <span>Ajouter aux favoris</span>
        <Heart className="w-6 h-6" />
      </button>
    </form>
  );
}
