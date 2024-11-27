import { RentalWithProduct } from "@/libs/rentals";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  rental: RentalWithProduct;
}

export const RentalCard = ({ rental }: Props) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="aspect-video relative">
      {rental.product.images && rental.product.images.length > 0 ? (
        <Image
          src={rental.product.images?.[0] || "/placeholder.jpg"}
          alt={rental.product.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="bg-gray-100 w-full h-80 flex items-center justify-center">
          <span className="text-gray-400">Image non disponible</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{rental.product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {rental.size} • {rental.color}
          </p>
        </div>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            rental.isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {rental.isActive ? "Active" : "Terminée"}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>Début: {new Date(rental.startDate).toLocaleDateString()}</p>
        <p>Fin: {new Date(rental.endDate).toLocaleDateString()}</p>
        <p className="font-medium text-gray-900">
          {rental.product.price}€/mois
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/account/rentals/${rental.id}`}
          className="flex-1 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors text-center text-sm"
        >
          {rental.isActive ? "Gérer" : "Détails"}
        </Link>
        <Link
          href={`/products/${rental.productId}`}
          className="flex items-center justify-center py-2 px-3 rounded border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
);
