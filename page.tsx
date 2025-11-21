import Image from "next/image";
import { createClient } from '@/lib/supabase';

async function getHotels() {
  const supabase = createClient()
  const { data } = await supabase.from('hotels').select('*')
  return data || []
}

export default async function Home() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Your hero section here */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-16 text-amber-500">Our Exclusive Hotels</h2>
        {(!hotels || hotels.length === 0) ? (
          <p className="text-center text-gray-400">No hotels yet – add some in Supabase!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {hotels.map((hotel: any) => (
              <div key={hotel.id} className="group relative rounded-2xl overflow-hidden bg-gray-900/50 border border-amber-500/30">
                <div className="aspect-video relative">
                  <Image
                    src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                    fill
                    className="object-cover group-hover:scale-110 transition"
                    alt={hotel.name}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-amber-400 mb-4">{hotel.location}</p>
                  <p className="text-4xl font-bold">
                    ${hotel.price_per_night?.toLocaleString()}
                    <span className="text-xl">/night</span>
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
