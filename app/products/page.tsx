'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  stock: number;
  category: string;
  isFeatured: boolean;
}

export default function StorefrontProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem(
      {
        productId: product.id,
        title: product.title,
        price: product.salePrice || product.price,
        image: product.images[0] || "/placeholder.png",
      },
      1
    );
  };

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>

        {/* Category Filter */}
        <div className="flex gap-3 mb-12 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}

                {product.salePrice && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    Sale
                  </div>
                )}

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <Link
                  href={`/products/${product.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {product.title}
                </Link>
                <p className="text-sm text-gray-600 mt-1">{product.category}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 items-center">
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold">
                        {product.salePrice} DKK
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.price} DKK
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">{product.price} DKK</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
