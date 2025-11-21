import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Remove or comment this line to disable ISR caching while testing
// export const revalidate = 60;

async function getHotels() {
  const { data, error } = await supabase.from("hotels").select("*");

  // Debug: This will show in Vercel Build Logs
  console.log("Supabase fetch result:", { data, error });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }
  return data || [];
}

export default async function Home() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1618776185832-c6e4b0e2287c"
          fill
          className="object-cover"
          alt="hero"
          priority
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">SERENOVA</h1>
          <p className="text-2xl md:text-4xl text-amber-100 mb-10">
            Exclusive US Luxury Hotels
          </p>
          <form action="/api/create-checkout-session" method="POST">
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-16 py-6 text-xl font-bold rounded-full transition">
              Join Club - $999/mo
            </button>
          </form>
        </div>
      </section>

      {/* HOTELS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-amber-500">
          Our Exclusive Hotels
        </h2>

        {/* This handles null, undefined, and empty array */}
        {!hotels || hotels.length === 0 ? (
          <p className="text-center text-gray-400 text-2xl">
            No hotels yet – add some in Supabase!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {hotels.map((hotel: any) => (
              <div
                key={hotel.id}
                className="group relative rounded-2xl overflow-hidden bg-gray-900/50 border border-amber-500/30 shadow-2xl"
              >
                <div className="aspect-video relative">
                  <Image
                    src={
                      hotel.images?.[0] ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    }
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                    alt={hotel.name}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-amber-400 mb-4">{hotel.location}</p>
                  <p className="text-4xl font-bold">
                    ${hotel.price_per_night?.toLocaleString()}
                    <span className="text-xl"> /night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
