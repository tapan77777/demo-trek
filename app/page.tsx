// app/page.tsx
import Link from "next/link";

const treks = [
  {
    id: "hampta-pass",
    name: "Hampta Pass",
    description: "Scenic crossover trek in Himachal Pradesh.",
    price: 8999,
  },
  {
    id: "kedarkantha",
    name: "Kedarkantha",
    description: "Best winter trek with snow-covered trails.",
    price: 7499,
  },
];

export default function HomePage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Available Treks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {treks.map((trek) => (
          <div key={trek.id} className="p-5 border rounded shadow">
            <h2 className="text-xl font-semibold">{trek.name}</h2>
            <p>{trek.description}</p>
            <p className="text-green-600 font-bold">₹{trek.price}</p>
            <Link
              href={`/trek/${trek.id}?price=${trek.price}&name=${encodeURIComponent(
                trek.name
              )}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
