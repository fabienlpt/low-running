import { orders } from "@/data/orders";
import { getProducts, Product } from "@/libs/products";

export type OrderStatus =
  | "pending" // En attente de traitement
  | "processing" // En cours de préparation
  | "shipped" // Expédié
  | "delivered" // Livré
  | "returned"; // Retourné

export type Order = {
  id: number;
  userId: number;
  productId: number;
  size: string;
  color: string;
  status: OrderStatus;
  trackingNumber?: string;
  orderDate: string;
  estimatedDeliveryDate?: string;
  deliveredDate?: string;
  returnedDate?: string;
};

export type OrderWithProduct = Order & {
  product: Product;
};

async function enrichOrder(order: Order): Promise<OrderWithProduct> {
  const products = await getProducts();
  const product = products.find((p) => p.id === order.productId);

  if (!product) {
    throw new Error(`Product not found for order ${order.id}`);
  }

  return {
    ...order,
    product,
  };
}

export async function getOrders(): Promise<OrderWithProduct[]> {
  const enrichedOrders = await Promise.all(orders.map(enrichOrder));
  return enrichedOrders;
}

export async function getOrderById(
  id: number
): Promise<OrderWithProduct | null> {
  const order = orders.find((o) => o.id === id);
  if (!order) return null;

  return enrichOrder(order);
}

export async function getOrdersByUserId(
  userId: number
): Promise<OrderWithProduct[]> {
  const userOrders = orders.filter((o) => o.userId === userId);
  return Promise.all(userOrders.map(enrichOrder));
}

export async function getActiveOrders(
  userId: number
): Promise<OrderWithProduct[]> {
  const userOrders = orders.filter(
    (o) =>
      o.userId === userId &&
      ["pending", "processing", "shipped"].includes(o.status)
  );
  return Promise.all(userOrders.map(enrichOrder));
}

export async function getPastOrders(
  userId: number
): Promise<OrderWithProduct[]> {
  const userOrders = orders.filter(
    (o) => o.userId === userId && ["delivered", "returned"].includes(o.status)
  );
  return Promise.all(userOrders.map(enrichOrder));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
