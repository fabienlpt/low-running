import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Low Running"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/products"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-black transition-colors"
            >
              Chaussures
            </Link>

            <Link
              href="/account"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-black transition-colors"
            >
              Mon Compte
            </Link>

            <Link
              href="/account/rentals"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-black transition-colors"
            >
              Mes Locations
            </Link>

            <Link
              href="/account/orders"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-black transition-colors"
            >
              Mes Commandes
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
