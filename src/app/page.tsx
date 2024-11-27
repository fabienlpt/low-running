import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="relative h-[80vh] bg-black">
        <Image
          src="/home-banner.jpg"
          alt="Runner in action"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              COUREZ RESPONSABLE
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto px-4">
              Louez vos chaussures de running. Économique et écologique.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Découvrir
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi louer vos chaussures ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">€</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Économique</h3>
              <p className="text-gray-600">
                Payez uniquement pour la durée d&apos;utilisation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Écologique</h3>
              <p className="text-gray-600">
                Réduisez votre impact environnemental
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible</h3>
              <p className="text-gray-600">
                Changez de modèle selon vos besoins
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Les meilleures marques à votre disposition
              </h2>
              <p className="text-gray-600 mb-8">
                Accédez à une sélection premium de chaussures de running,
                soigneusement entretenues et vérifiées après chaque utilisation.
              </p>
              <Link
                href="/products"
                className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Voir les modèles
              </Link>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/shoes-collection.jpg"
                alt="Collection de chaussures"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
