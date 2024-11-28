type CartItem = {
  productId: number;
  size: string;
  color: string;
};

type Listener = () => void;

class CartStore {
  private items: CartItem[] = [];
  private listeners: Set<Listener> = new Set();

  constructor() {
    // Initialiser le panier depuis sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cart");
      if (stored) {
        this.items = JSON.parse(stored);
      }
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cart", JSON.stringify(this.items));
    }
  }

  getItems() {
    return this.items;
  }

  addItem(item: CartItem) {
    this.items = [...this.items, item];
    this.notify();
  }

  removeItem(index: number) {
    this.items = this.items.filter((_, i) => i !== index);
    this.notify();
  }

  clearCart() {
    this.items = [];
    this.notify();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cart");
    }
  }

  get count() {
    return this.items.length;
  }
}

export const cartStore = new CartStore();
