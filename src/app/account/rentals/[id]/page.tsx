import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  RefreshCcw,
  HelpCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { getRentalById } from "@/libs/rentals";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RentalPage({ params }: Props) {
  const { id } = await params;
  const rental = await getRentalById(parseInt(id));

  if (!rental) {
    notFound();
  }

  return (
    <main className="relative">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-6 aspect-video relative rounded-lg overflow-hidden">
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

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {rental.product.name}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Location {rental.isActive ? "active" : "terminée"}</span>
            <span>•</span>
            <span>Du {new Date(rental.startDate).toLocaleDateString()}</span>
            {rental.isActive && (
              <>
                <span>•</span>
                <span>Au {new Date(rental.endDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <p>Taille : {rental.size}</p>
            <p>Couleur : {rental.color}</p>
            <p className="font-medium text-gray-900 mt-2">
              {rental.product.price}€/mois
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {rental.isActive ? (
            <>
              <form action="/api/rentals/stop" method="POST">
                <input type="hidden" name="rentalId" value={rental.id} />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-3"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Arrêter la location</span>
                </button>
              </form>

              <Link
                href={`/account/rental/${rental.id}/support`}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Demander une assistance</span>
              </Link>

              <Link
                href={`/rent/${rental.productId}`}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-3"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Relouer cette paire</span>
              </Link>

              <Link
                href={`/products/${rental.productId}`}
                className="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-3"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Voir la fiche produit</span>
              </Link>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  L&apos;arrêt anticipé de la location pourrait entraîner des
                  frais supplémentaires. Consultez nos conditions générales pour
                  plus d&apos;informations.
                </p>
              </div>
            </>
          ) : (
            <>
              <Link
                href={`/rent/${rental.productId}`}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-3"
              >
                <RefreshCcw className="w-5 h-5" />
                <span>Relouer cette paire</span>
              </Link>

              <Link
                href={`/products/${rental.productId}`}
                className="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center space-x-3"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Voir la fiche produit</span>
              </Link>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/account/rentals"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Retour à mes locations
          </Link>
        </div>
      </div>
    </main>
  );
}
