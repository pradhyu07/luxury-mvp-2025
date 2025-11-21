import { supabase } from "@/lib/supabase";

export const revalidate = 0; // No cache — always fresh

async function getHotels() {
  const { data } = await supabase.from("hotels").select("name");
  return data || [];
}

export default async function Home() {
  const hotels = await getHotels();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-10">
      <h1 className="text-6xl font-bold text-amber-500">SERENOVA</h1>
      <p className="text-3xl">Exclusive Luxury Hotels</p>

      <div className="text-center">
        <h2 className="text-4xl mb-8 text-amber-400">Hotel List (Live from Supabase)</h2>

        {hotels.length === 0 ? (
          <p className="text-gray-400 text-xl">No hotels found – add some in Supabase!</p>
        ) : (
          <ul className="space-y-4 text-2xl">
            {hotels.map((hotel: any, index) => (
              <li key={index} className="text-amber-300">
                {hotel.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form action="/api/create-checkout-session" method="POST">
        <button className="bg-amber-500 hover:bg-amber-400 text-black px-16 py-6 text-2xl font-bold rounded-full mt-10">
          Join Club – $999/mo
        </button>
      </form>
    </div>
  );
}
