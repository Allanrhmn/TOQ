"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
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
      <h1 className="text-4xl font-bold mb-12">Our Products</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="relative aspect-square bg-gray-200">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{product.price} DKK</span>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
