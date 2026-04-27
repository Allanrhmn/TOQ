import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CREAT | Premium Streetwear & Accessories",
  description: "Exclusive limited edition streetwear and accessories. Creatness starts with Sabr.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
              <a href="/" className="text-2xl md:text-3xl font-bold tracking-tight hover:opacity-70 transition">
                CREAT
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="/products" className="text-sm font-medium hover:opacity-70 transition">
                Shop
              </a>
              <a href="#" className="text-sm font-medium hover:opacity-70 transition">
                Lookbook
              </a>
              <a href="#" className="text-sm font-medium hover:opacity-70 transition">
                About
              </a>
              <a href="#" className="text-sm font-medium hover:opacity-70 transition">
                Contact
              </a>
            </div>
            <div className="hidden md:flex ml-auto">
              <a href="#" className="text-sm font-medium hover:opacity-70 transition">
                Account
              </a>
            </div>
            {/* Mobile menu toggle */}
            <button className="md:hidden ml-6 space-y-1.5">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {/* Shop */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/products" className="text-gray-400 hover:text-white transition text-sm">
                      All Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Sale
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Lookbook
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Support</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Shipping Info
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400">
                  &copy; 2024 CREAT. All rights reserved.
                </p>
                <p className="text-sm text-gray-400">
                  Creatness starts with Sabr.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
