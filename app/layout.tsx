import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CREATSABR | Premium Danish Ecommerce",
  description: "AI-powered ecommerce platform for Denmark",
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
            <h1 className="text-2xl font-bold">CREATSABR</h1>
            <div className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/products" className="hover:underline">Products</a>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-900 text-white mt-16 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 CREATSABR. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
