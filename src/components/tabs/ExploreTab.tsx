"use client";
import { useState } from "react";
import { trips } from "@/lib/data";

const categories = ["All", "Beach", "Culture", "Adventure", "Food", "City", "Nature"];

const allDestinations = [
  ...trips,
  { id: "bali", destination: "Bali", country: "Indonesia", emoji: "🌴", tagline: "Temples, rice fields & surf", duration: "7 days", price: "$1,800", rating: 4.8, gradient: ["#108050", "#055060"] as [string,string], matchPercent: 89, tags: ["Beach", "Culture", "Nature"], lat: -8.3405, lng: 115.0920, spots: [], activities: [], restaurants: [], hotels: [], itinerary: [] },
  { id: "paris", destination: "Paris", country: "France", emoji: "🗼", tagline: "Art, fashion & croissants", duration: "5 days", price: "$2,500", rating: 4.8, gradient: ["#7050b0", "#4a2080"] as [string,string], matchPercent: 92, tags: ["Romantic", "Cultural", "Foodie"], lat: 48.8566, lng: 2.3522, spots: [], activities: [], restaurants: [], hotels: [], itinerary: [] },
  { id: "nyc", destination: "New York", country: "USA", emoji: "🗽", tagline: "The city that never sleeps", duration: "6 days", price: "$3,200", rating: 4.7, gradient: ["#c03040", "#801030"] as [string,string], matchPercent: 85, tags: ["Urban", "City", "Foodie"], lat: 40.7128, lng: -74.0060, spots: [], activities: [], restaurants: [], hotels: [], itinerary: [] },
  { id: "amalfi", destination: "Amalfi Coast", country: "Italy", emoji: "🌊", tagline: "Cliffside villages & turquoise sea", duration: "6 days", price: "$3,000", rating: 4.9, gradient: ["#2080c0", "#105080"] as [string,string], matchPercent: 93, tags: ["Beach", "Scenic", "Romantic"], lat: 40.6340, lng: 14.6027, spots: [], activities: [], restaurants: [], hotels: [], itinerary: [] },
];

export default function ExploreTab() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = allDestinations.filter(d => {
    const matchesSearch = d.destination.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === "All" || d.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-[#f2f2f7]">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 bg-white">
        <h1 className="text-[28px] font-bold text-gray-900 mb-4">Explore</h1>
        {/* Search */}
        <div className="flex items-center gap-2.5 bg-[#f2f2f7] rounded-xl px-3.5 py-2.5">
          <span className="text-gray-400 text-base">🔍</span>
          <input
            className="flex-1 bg-transparent text-[15px] text-gray-800 placeholder-gray-400 outline-none"
            placeholder="Search destinations..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-3 bg-white border-b border-gray-100">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${activeCategory === c ? "bg-gray-900 text-white" : "bg-[#f2f2f7] text-gray-600"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Featured banner */}
      {activeCategory === "All" && !query && (
        <div className="px-5 pt-5 pb-2">
          <div className="relative w-full h-[180px] rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1a4d8a, #0d99b0)" }}>
            <span className="absolute right-4 top-4 text-7xl opacity-30">✈️</span>
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="text-white/70 text-[12px] font-medium mb-1">FEATURED TRIP</div>
              <div className="text-white text-[22px] font-bold leading-tight">Discover Venice<br />in 6 Days</div>
              <div className="text-white/80 text-[13px] mt-1">Starting from $2,800</div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-5 pt-4 pb-2">
        <div className="text-[13px] text-gray-400 font-medium mb-3">{filtered.length} destinations</div>
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(d => (
            <div key={d.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-[110px] flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${d.gradient[0]}, ${d.gradient[1]})` }}>
                <span className="text-5xl opacity-50">{d.emoji}</span>
                <div className="absolute top-2 right-2 bg-white/20 rounded-full px-2 py-0.5">
                  <span className="text-white text-[10px] font-semibold">{d.matchPercent}% match</span>
                </div>
              </div>
              <div className="p-2.5">
                <div className="text-[14px] font-bold text-gray-900">{d.destination}</div>
                <div className="text-[11px] text-gray-400">{d.country}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[12px] font-semibold text-green-700">{d.price}</span>
                  <span className="text-[11px] text-amber-500">★ {d.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-28" />
    </div>
  );
}
