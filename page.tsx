export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-12 tracking-tight">
          Luxury MVP
        </h1>
        <p className="text-2xl text-gray-700 mb-16">
          Your exclusive wishlist starts here
        </p>
        <button className="bg-black text-white px-12 py-6 rounded-full text-xl hover:bg-gray-800 transition">
          Get Early Access
        </button>
      </div>
    </div>
  );
}