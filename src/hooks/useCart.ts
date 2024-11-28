"use client";

import { useState, useEffect } from "react";
import { cartStore } from "@/stores/cartStore";

export type CartItem = {
  productId: number;
  size: string;
  color: string;
};

export function useCart() {
  const [cartItems, setCartItems] = useState(cartStore.getItems());
  const [itemCount, setItemCount] = useState(cartStore.count);

  useEffect(() => {
    return cartStore.subscribe(() => {
      setCartItems(cartStore.getItems());
      setItemCount(cartStore.count);
    });
  }, []);

  return {
    cartItems,
    itemCount,
    addToCart: (item: CartItem) => cartStore.addItem(item),
    removeFromCart: (index: number) => cartStore.removeItem(index),
    clearCart: () => cartStore.clearCart(),
  };
}
