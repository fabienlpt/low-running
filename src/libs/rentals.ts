import { rentals, Rental } from "@/data/rentals";
import { getProducts, Product } from "@/libs/products";

export type RentalWithProduct = Rental & {
  product: Product;
};

async function enrichRental(rental: Rental): Promise<RentalWithProduct> {
  const products = await getProducts();
  const product = products.find((p) => p.id === rental.productId);

  if (!product) {
    throw new Error(`Product not found for rental ${rental.id}`);
  }

  return {
    ...rental,
    product,
  };
}

export async function getRentals(): Promise<RentalWithProduct[]> {
  const enrichedRentals = await Promise.all(rentals.map(enrichRental));
  return enrichedRentals;
}

export async function getRentalById(
  id: number
): Promise<RentalWithProduct | null> {
  const rental = rentals.find((r) => r.id === id);
  if (!rental) return null;

  return enrichRental(rental);
}

export async function getRentalsByUserId(
  userId: number
): Promise<RentalWithProduct[]> {
  const userRentals = rentals.filter((r) => r.userId === userId);
  return Promise.all(userRentals.map(enrichRental));
}

export async function getActiveRentals(
  userId: number
): Promise<RentalWithProduct[]> {
  const userRentals = rentals.filter((r) => r.userId === userId && r.isActive);
  return Promise.all(userRentals.map(enrichRental));
}

export async function getPastRentals(
  userId: number
): Promise<RentalWithProduct[]> {
  const userRentals = rentals.filter((r) => r.userId === userId && !r.isActive);
  return Promise.all(userRentals.map(enrichRental));
}

export async function stopRental(rentalId: number): Promise<boolean> {
  const rental = rentals.find((r) => r.id === rentalId);
  if (!rental || !rental.isActive) return false;

  rental.isActive = false;
  rental.endDate = new Date().toISOString().split("T")[0];
  return true;
}

export async function createRental(
  data: Omit<Rental, "id">
): Promise<RentalWithProduct> {
  const newRental: Rental = {
    id: Math.max(...rentals.map((r) => r.id)) + 1,
    ...data,
  };

  rentals.push(newRental);
  return enrichRental(newRental);
}
