"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  status: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = selectedCategory && selectedCategory !== "All" 
    ? products.filter((p) => p.category === selectedCategory) 
    : products;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
          <p className="text-lg text-gray-300">
            Browse our exclusive collection of limited edition pieces
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-12 md:mb-16 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
                className={`px-4 md:px-6 py-2 md:py-3 text-sm md:text-base font-medium rounded transition ${
                  (selectedCategory === null && cat === "All") || selectedCategory === cat
                    ? "bg-black text-white"
                    : "border border-gray-300 text-black hover:border-black"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col hover:opacity-75 transition"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden rounded mb-4 md:mb-6">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Status Badge */}
                    {product.status === "Sold Out" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-lg md:text-xl font-bold">Sold Out</span>
                      </div>
                    )}
                    {product.status === "On Sale" && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm font-bold">
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-lg font-bold">{product.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{product.description}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg md:text-xl font-bold">{product.price} DKK</span>
                      {product.originalPrice && (
                        <span className="text-sm md:text-base text-gray-500 line-through">
                          {product.originalPrice} DKK
                        </span>
                      )}
                    </div>

                    {/* Stock Info */}
                    <p className="text-xs md:text-sm text-gray-500">
                      {product.status === "Sold Out" ? "Out of stock" : `${product.stock} in stock`}
                    </p>

                    {/* Add to Cart Button */}
                    <button
                      disabled={product.status === "Sold Out"}
                      className={`w-full py-3 md:py-4 rounded text-sm md:text-base font-bold transition mt-4 md:mt-6 ${
                        product.status === "Sold Out"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-900"
                      }`}
                    >
                      {product.status === "Sold Out" ? "Sold Out" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
