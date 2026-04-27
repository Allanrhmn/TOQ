'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCart((state) => state.count());

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          CREAT
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-600">
            Shop
          </Link>
          <Link href="/products" className="hover:text-gray-600">
            Lookbook
          </Link>
          <Link href="/" className="hover:text-gray-600">
            About
          </Link>
          <Link href="/" className="hover:text-gray-600">
            Contact
          </Link>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-gray-600">
            Home
          </Link>
          <Link href="/products" className="block hover:text-gray-600">
            Shop
          </Link>
          <Link href="/" className="block hover:text-gray-600">
            Lookbook
          </Link>
          <Link href="/" className="block hover:text-gray-600">
            About
          </Link>
          <Link href="/" className="block hover:text-gray-600">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
