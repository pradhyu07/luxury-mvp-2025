import { supabase } from "@/lib/supabase";

export default async function Home() {
  // THIS WILL SHOW IF DATABASE IS CONNECTED
  const { data, error } = await supabase.from("hotels").select("*");

  return (
    <div className="p-20 bg-black text-white min-h-screen">
      <h1 className="text-4xl mb-10">Database Connection Test</h1>

      {error && <p className="text-red-500">ERROR: {error.message}</p>}
      {data && data.length === 0 && <p className="text-yellow-500">Connected! But table is empty</p>}
      {data && data.length > 0 && (
        <div>
          <p className="text-green-500 text-2xl mb-5">SUCCESS — DATABASE CONNECTED!</p>
          {data.map((h: any) => (
            <div key={h.id} className="bg-gray-900 p-4 rounded mb-4">
              <p>{h.name} - {h.location} - ${h.price_per_night}</p>
              {h.images?.[0] && <img src={h.images[0]} alt="" className="w-96 mt-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
