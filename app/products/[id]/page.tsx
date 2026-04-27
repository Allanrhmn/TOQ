'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  stock: number;
  category: string;
  rating?: number;
}

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        productId: product.id,
        title: product.title,
        price: product.salePrice || product.price,
        image: product.images[0] || "/placeholder.png",
      },
      quantity
    );
    setQuantity(1);
  };

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="py-16 text-center">Product not found</div>;
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {product.images[0] ? (
              <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square bg-gray-300 rounded-lg" />
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold">{product.salePrice} DKK</span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.price} DKK
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg text-sm font-semibold">
                    Sale
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">{product.price} DKK</span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-600 mb-2">Category</p>
              <p className="text-lg capitalize">{product.category}</p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-600 mb-2">Stock</p>
              <p
                className={`text-lg font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold">Quantity</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-bold text-lg transition ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>

              <button className="w-full px-6 py-4 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition">
                Wishlist
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-12 pt-8 border-t space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Shipping</p>
                <p className="text-gray-700">2-3 business days to Denmark</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Returns</p>
                <p className="text-gray-700">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
