import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">CREATNESS STARTS WITH SABR</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Limited edition streetwear and accessories
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-200 font-bold text-lg transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* New Items Live Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-4">New Items Live Now</h2>
        <p className="text-gray-600 text-lg mb-12">
          Discover our latest collection of exclusive drops
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Limited Edition</h3>
              <p className="text-gray-600">
                Exclusive pieces that won't be restocked. Get them while they last.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                High-quality materials and craftsmanship in every piece.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick delivery across Denmark with reliable shipping partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Email List</h2>
          <p className="text-gray-300 mb-8">
            Find out about new drops and exclusive releases before anyone else
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded bg-white text-black placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
