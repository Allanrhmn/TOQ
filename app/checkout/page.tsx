'use client';

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "DK",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: formData,
          total: total() + 75,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        return;
      }

      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        clearCart();
        window.location.href = "/checkout/success";
      }
    } catch (error) {
      alert("An error occurred during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/cart"
          className="flex items-center gap-2 text-blue-600 hover:underline mb-8"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div>
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg mb-4"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="DK">Denmark</option>
                    <option value="SE">Sweden</option>
                    <option value="NO">Norway</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <input
                    type="radio"
                    name="payment"
                    id="card"
                    defaultChecked
                    className="mr-3"
                  />
                  <label htmlFor="card" className="font-semibold">
                    Credit Card (Stripe)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Continue to Payment"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b pb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} DKK
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6 border-b pb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{total().toFixed(2)} DKK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">75 DKK</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{(total() + 75).toFixed(2)} DKK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
