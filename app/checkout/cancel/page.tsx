import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment has been cancelled. Your items remain in your cart and are ready for checkout whenever you're ready.
        </p>

        <div className="space-y-3">
          <Link
            href="/cart"
            className="block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900"
          >
            Back to Cart
          </Link>
          <Link
            href="/products"
            className="block px-6 py-3 border-2 border-black text-black font-bold rounded-lg hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
