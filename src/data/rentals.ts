import { Rental } from "@/libs/rentals";

export const rentals: Rental[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    size: "40",
    color: "Black",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    isActive: false,
  },
  {
    id: 2,
    productId: 2,
    userId: 1,
    size: "41",
    color: "Blue",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    isActive: false,
  },
  {
    id: 3,
    productId: 3,
    userId: 1,
    size: "38",
    color: "Gray",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    isActive: true,
  },
];
