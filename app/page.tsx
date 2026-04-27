import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to CREATSABR</h1>
        <p className="text-xl text-gray-600">
          AI-powered ecommerce platform for Denmark
        </p>
        <Link
          href="/products"
          className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">🤖 AI Assistant</h3>
          <p className="text-gray-600">
            Chat with our intelligent shopping assistant
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">⚡ Fast Checkout</h3>
          <p className="text-gray-600">
            Complete your purchase in seconds
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-bold mb-2">💳 Multiple Payments</h3>
          <p className="text-gray-600">
            Pay with card, Apple Pay, Google Pay, or MobilePay
          </p>
        </div>
      </div>
    </div>
  );
}
