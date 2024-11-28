type CartItem = {
  productId: number;
  size: string;
  color: string;
};

type Listener = () => void;

class CartStore {
  private items: CartItem[] = [];
  private listeners: Set<Listener> = new Set();
  private initialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;

    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("cart");
      if (stored) {
        try {
          this.items = JSON.parse(stored);
        } catch (e) {
          this.items = [];
          console.error(e);
        }
      }
      this.initialized = true;
    }
  }

  subscribe(listener: Listener) {
    this.init();
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
    this.init();
    return this.items;
  }

  addItem(item: CartItem) {
    this.init();
    this.items = [...this.items, item];
    this.notify();
  }

  removeItem(index: number) {
    this.init();
    this.items = this.items.filter((_, i) => i !== index);
    this.notify();
  }

  clearCart() {
    this.init();
    this.items = [];
    this.notify();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("cart");
    }
  }

  get count() {
    this.init();
    return this.items.length;
  }
}

export const cartStore = new CartStore();
