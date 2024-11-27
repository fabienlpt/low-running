import { RentalCard } from "@/components/rentalCard";
import { getActiveRentals, getPastRentals } from "@/libs/rentals";
import { CheckCircle2, Clock } from "lucide-react";

export default async function RentalsPage() {
  const activeRentals = await getActiveRentals(1);
  const pastRentals = await getPastRentals(1);

  return (
    <main className="w-full bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes locations</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos locations actives et consultez l&apos;historique de vos
            locations passées
          </p>
        </header>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Locations actives
            </h2>
          </div>

          {activeRentals.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Vous n&apos;avez aucune location active en ce moment
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {activeRentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Locations terminées
            </h2>
          </div>

          {pastRentals.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Vous n&apos;avez aucune location terminée
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pastRentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
