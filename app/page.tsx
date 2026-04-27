import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-black text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4 space-y-8">
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-widest uppercase">
              Limited Edition Streetwear
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              CREATNESS STARTS WITH SABR
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Exclusive limited edition pieces. Don't miss the new drops.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-white text-black px-10 py-4 rounded font-bold text-lg hover:bg-gray-200 transition duration-200"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Items Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-16">
            <p className="text-sm md:text-base text-gray-500 uppercase tracking-widest mb-4">
              New collection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">New Items Live Now</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Our latest exclusive drops. Limited quantities. Don't sleep on these.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold">Limited Edition</h3>
              <p className="text-gray-400">
                Each drop is carefully curated. Once sold out, they're gone forever.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold">Premium Quality</h3>
              <p className="text-gray-400">
                Hand-selected materials and meticulous craftsmanship in every piece.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-bold">Fast Shipping</h3>
              <p className="text-gray-400">
                Quick delivery across Denmark with reliable tracking included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Stay in the Loop</h2>
            <p className="text-lg text-gray-600">
              Get notified about new drops and exclusive releases before they sell out.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border border-gray-300 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:border-black transition"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-black text-white font-bold rounded hover:bg-gray-900 transition duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Featured Link */}
      <section className="border-t border-gray-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <Link
            href="/products"
            className="inline-block text-lg font-bold hover:underline transition"
          >
            View Full Collection →
          </Link>
        </div>
      </section>
    </div>
  );
}
