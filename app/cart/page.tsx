'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-6 bg-white border rounded-lg p-6"
                  >
                    {/* Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {item.price} DKK each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="text-right">
                      <p className="font-bold text-lg mb-4">
                        {(item.price * item.quantity).toFixed(2)} DKK
                      </p>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/products"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-8 h-fit sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{total().toFixed(2)} DKK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">75 DKK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 text-lg font-bold">
                <span>Total</span>
                <span>{(total() + 75).toFixed(2)} DKK</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-3 font-bold rounded-lg hover:bg-gray-900 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
