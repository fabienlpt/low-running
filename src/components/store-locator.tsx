"use client";

import getStores, {Store} from "@/libs/stores";
import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import {useEffect, useState} from "react";
import L, {LatLngExpression} from "leaflet";
import 'leaflet/dist/leaflet.css';

type StoreLocatorProps = {
    onSelectStore: (store: Store) => void;
}
export default function StoreLocator({onSelectStore}: StoreLocatorProps) {
    const stores = getStores();
    const center = [stores[0].latitude, stores[0].longitude] as LatLngExpression;
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);

    function ChangeView({ coords }: { coords: LatLngExpression }) {
        const map = useMap();
        map.setView(coords, 12);
        return null;
    }

    const fixLeafletIcons = () => {
        // @ts-expect-error fix for leaflet icons
        delete (L.Icon.Default.prototype)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
    };

    useEffect(() => {
        fixLeafletIcons();
    }, []);

    useEffect(() => {
        if (selectedStore) {
            onSelectStore(selectedStore);
        }
    }, [selectedStore]);


    return (
        <div className="lg:grid grid-cols-2 lg:h-full h-fit">
            <div className="overflow-y-auto bg-gray-50 px-4 h-96 lg:h-full">
                <div className="space-y-4">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedStore?.id === store.id ? "bg-gray-300" : ""}`}
                            onClick={() => setSelectedStore(store)}
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{store.name}</h2>
                            <p className="text-gray-600">{store.address}</p>
                            <p className="text-gray-600">{store.postalCode} {store.city}</p>
                            <p className="text-gray-500 mt-2 text-sm">{store.openingHours}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-96 lg:h-full w-full">
                <MapContainer center={center} zoom={12} className="h-full w-full">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {stores.map((store) => (
                        <Marker key={store.id} position={[store.latitude, store.longitude]}/>
                    ))}
                    <ChangeView coords={center}/>
                </MapContainer>
            </div>
        </div>
    );
}