import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase! Your order has been confirmed and will be
          shipped within 2-3 business days.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold">ORDER-2024-001</p>
        </div>

        <p className="text-sm text-gray-600 mb-8">
          We've sent a confirmation email to your inbox with tracking details.
        </p>

        <div className="space-y-3">
          <Link
            href="/products"
            className="block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block px-6 py-3 border-2 border-black text-black font-bold rounded-lg hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
