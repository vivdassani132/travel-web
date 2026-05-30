"use client";
import { useState } from "react";

const categories = [
  { label: "Hotels",         icon: "🏨" },
  { label: "Things to Do",   icon: "🎯" },
  { label: "Restaurants",    icon: "🍽️" },
  { label: "Flights",        icon: "✈️" },
  { label: "Vacation Rentals", icon: "🏡" },
];

const popular = [
  { name: "Bali",          country: "Indonesia", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { name: "Maldives",      country: "Maldives",  photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { name: "Kyoto",         country: "Japan",     photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { name: "Santorini",     country: "Greece",    photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { name: "Cusco",         country: "Peru",      photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { name: "New York",      country: "USA",       photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
];

export default function SearchTab() {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-[28px] font-bold text-gray-900 mb-4" style={{ letterSpacing: "-0.4px" }}>Search</h1>
        <div className="flex items-center gap-2.5 bg-[#f2f2f7] rounded-full px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/></svg>
          <input className="flex-1 bg-transparent text-[15px] outline-none placeholder-gray-400 text-gray-900" placeholder="Places to go, things to do, hotels..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map(c => (
            <button key={c.label} className="flex flex-col items-center gap-1.5 bg-[#f9f9fb] rounded-2xl py-4 border border-gray-100">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-[12px] font-medium text-gray-700 text-center">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular destinations */}
      <div className="px-4 mb-3">
        <h2 className="text-[19px] font-bold text-gray-900">Popular destinations</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pb-6">
        {popular.map(d => (
          <div key={d.name} className="rounded-2xl overflow-hidden relative" style={{ height: 120 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 40%, transparent)" }} />
            <div className="absolute bottom-2.5 left-3">
              <div className="text-white text-[14px] font-bold">{d.name}</div>
              <div className="text-white/70 text-[11px]">{d.country}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
