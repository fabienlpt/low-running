"use client";

import { useState, useEffect } from "react";
import { cartStore } from "@/stores/cartStore";

export type CartItem = {
  productId: number;
  size: string;
  color: string;
};

export function useCart() {
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState(cartStore.getItems());
  const [itemCount, setItemCount] = useState(cartStore.count);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = cartStore.subscribe(() => {
      setCartItems(cartStore.getItems());
      setItemCount(cartStore.count);
    });

    return unsubscribe;
  }, []);

  if (!mounted) {
    return {
      cartItems: [],
      itemCount: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    };
  }

  return {
    cartItems,
    itemCount,
    addToCart: (item: CartItem) => cartStore.addItem(item),
    removeFromCart: (index: number) => cartStore.removeItem(index),
    clearCart: () => cartStore.clearCart(),
  };
}
