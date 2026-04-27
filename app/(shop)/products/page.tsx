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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Shop</h1>
      <p className="text-gray-600 mb-12">Explore our exclusive collection</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="relative aspect-square bg-gray-200 overflow-hidden group">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              {product.status === "Sold Out" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">Sold Out</span>
                </div>
              )}
              {product.status === "On Sale" && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded font-bold">
                  Sale
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">{product.price} DKK</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {product.originalPrice} DKK
                    </span>
                  )}
                </div>
                <button
                  disabled={product.status === "Sold Out"}
                  className={`px-4 py-2 rounded font-bold transition ${
                    product.status === "Sold Out"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {product.status === "Sold Out" ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">{product.stock} in stock</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
