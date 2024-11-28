"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

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
            <Link
              href="/cart"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-black transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Toggle menu</span>
              {isOpen ? (
                <X className="h-6 w-6 transition-all duration-300 ease-in-out rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-all duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/products"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Chaussures
            </Link>
            <Link
              href="/account"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Mon Compte
            </Link>
            <Link
              href="/account/rentals"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Mes Locations
            </Link>
            <Link
              href="/account/orders"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Mes Commandes
            </Link>
            <Link
              href="/cart"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
            >
              Panier
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
