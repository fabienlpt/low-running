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
            <div className="relative h-[400px] md:h-[450px] lg:h-[600px]">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">
                Trouvez la chaussure parfaite pour vous
              </h2>
              <p className="text-gray-600 mb-8">
                Notre système de recommandation intelligent analyse votre profil
                de course, votre morphologie et vos préférences pour vous
                proposer les modèles les plus adaptés à votre pratique.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    1
                  </div>
                  <p className="ml-4 text-gray-600">
                    Répondez à quelques questions sur votre pratique de la
                    course
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    2
                  </div>
                  <p className="ml-4 text-gray-600">
                    Précisez vos préférences en termes de confort et de
                    performance
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    3
                  </div>
                  <p className="ml-4 text-gray-600">
                    Recevez une sélection personnalisée de modèles adaptés
                  </p>
                </div>
              </div>
              <Link
                href="/form"
                className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors mt-8 rounded-full"
              >
                Trouver mes chaussures
              </Link>
            </div>
            <div className="relative h-[400px] order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl transform rotate-3">
                <Image
                  src="/images/nike1.png"
                  alt="Chaussure personnalisée"
                  fill
                  className="object-cover rounded-2xl mix-blend-overlay opacity-50"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm rounded-2xl -rotate-3">
                <div className="absolute bottom-8 left-8 right-8 bg-white bg-opacity-90 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-2">
                    Recommandation personnalisée
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Basée sur votre profil de coureur et vos objectifs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
