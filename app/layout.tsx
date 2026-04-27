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
      <body className="bg-white text-black">
        <header className="border-b">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">CREAT</h1>
            <div className="space-x-6 flex items-center">
              <a href="/" className="hover:underline font-medium">Home</a>
              <a href="/products" className="hover:underline font-medium">Shop</a>
              <a href="#" className="hover:underline font-medium">Contact</a>
              <a href="#" className="hover:underline font-medium">Account</a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-black text-white mt-16 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-white">Tees</a></li>
                  <li><a href="#" className="hover:text-white">Outerwear</a></li>
                  <li><a href="#" className="hover:text-white">Accessories</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Lookbook</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Shipping</a></li>
                  <li><a href="#" className="hover:text-white">Returns</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Cookies</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2024 CREAT. All rights reserved. Creatness starts with Sabr.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
