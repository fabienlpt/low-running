import {stores} from "@/data/stores";

export type Store = {
    id: number;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    openingHours: string;
}
export default function getStores() {
    return stores;
}