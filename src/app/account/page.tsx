import {
  getAccountById,
  generateColorFromEmail,
  getInitials,
} from "@/libs/account";
import { getActiveRentals } from "@/libs/rentals";
import { getActiveOrders } from "@/libs/orders";
import { Settings, Package, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function AccountPage() {
  const account = await getAccountById(1);
  const activeRentals = await getActiveRentals(1);
  const activeOrders = await getActiveOrders(1);

  if (!account) {
    return null;
  }

  const avatarColor = generateColorFromEmail(account.email);
  const initials = getInitials(account.firstName, account.lastName);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-6 mb-12">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-semibold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {account.firstName} {account.lastName}
            </h1>
            <p className="text-gray-500 mt-1">{account.email}</p>
            <button className="mt-3 text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
              Modifier le profil
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <Link
            href="/account/rentals"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col"
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">Locations en cours</h3>
              <p className="text-3xl font-bold mt-2">{activeRentals.length}</p>
            </div>
            <div className="mt-auto flex items-center text-sm font-medium text-gray-600 group-hover:text-black">
              Gérer vos locations
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/account/orders"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col"
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">Commandes</h3>
              <p className="text-3xl font-bold mt-2">{activeOrders.length}</p>
            </div>
            <div className="mt-auto flex items-center text-sm font-medium text-gray-600 group-hover:text-black">
              Voir l&apos;historique
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/account/settings"
            className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 flex flex-col"
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-lg">Paramètres</h3>
              <p className="text-gray-600 mt-1">Gérer vos préférences</p>
            </div>
            <div className="mt-auto flex items-center text-sm font-medium text-gray-600 group-hover:text-black">
              Modifier
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-6">
            Informations personnelles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Adresse
              </h3>
              <p className="text-gray-900">
                {account.address}
                <br />
                {account.postalCode} {account.city}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Contact
              </h3>
              <p className="text-gray-900">{account.phone}</p>
              <p className="text-gray-900">{account.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
