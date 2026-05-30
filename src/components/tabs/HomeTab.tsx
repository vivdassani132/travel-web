"use client";
import { useState } from "react";
import { trips, tagAlongTrips, Trip } from "@/lib/data";
import MapModal from "../MapModal";

export default function HomeTab() {
  const [mapTrip, setMapTrip] = useState<Trip | null>(null);

  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-hide bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-full bg-amber-200 flex items-center justify-center text-xl">✈️</div>
            <span className="text-[26px] font-bold text-gray-900">Hello Traveller</span>
          </div>
          <div className="flex gap-2.5">
            <button className="w-[38px] h-[38px] rounded-xl bg-[#f2f2f7] flex items-center justify-center text-base">🔔</button>
            <button className="w-[38px] h-[38px] rounded-xl bg-[#f2f2f7] flex items-center justify-center text-base">💬</button>
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="flex items-center justify-between px-5 mb-3.5">
          <span className="text-[17px] font-semibold text-gray-900">Upcoming Trips</span>
          <span className="text-gray-400 text-base">›</span>
        </div>
        <div className="flex gap-3.5 overflow-x-auto scrollbar-hide px-5 pb-1">
          {trips.map(trip => (
            <button key={trip.id} onClick={() => setMapTrip(trip)} className="flex-shrink-0 w-[200px] text-left">
              <div className="w-full h-[170px] rounded-[18px] relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${trip.gradient[0]}, ${trip.gradient[1]})` }}>
                <span className="absolute top-3 right-3 text-5xl opacity-50">{trip.emoji}</span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] text-gray-400">📍</span>
                <span className="text-[13px] font-medium text-gray-800 flex-1 truncate">{trip.destination}, {trip.country}</span>
                <Avatars count={2} />
              </div>
            </button>
          ))}
        </div>

        {/* TagAlong */}
        <div className="px-5 mt-8 mb-1.5">
          <div className="text-[17px] font-bold text-gray-900">#TagAlong</div>
          <div className="text-[14px] text-gray-500 mt-0.5">Discover open trips you can hop on</div>
        </div>
        <div className="px-5 mt-3.5 space-y-3">
          {tagAlongTrips.map(t => (
            <div key={t.id} className="flex gap-3.5 bg-white rounded-[18px] p-3.5 shadow-sm border border-gray-100">
              <div className="w-[100px] h-[100px] rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${t.gradient[0]}, ${t.gradient[1]})` }}>
                <span className="opacity-60">{t.emoji}</span>
                <div className="absolute bottom-1.5 left-1.5 bg-black/30 rounded-full px-2 py-0.5 flex items-center gap-1">
                  <span className="text-white text-[9px]">📍</span>
                  <span className="text-white text-[9px] font-semibold">{t.country}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold text-gray-900 leading-tight">{t.destination}</div>
                <div className="text-[13px] text-gray-500 mt-1 leading-snug">{t.description}</div>
                <div className="text-[13px] font-semibold mt-2" style={{ color: "#007a66" }}>{t.slotsLeft} Slots left</div>
              </div>
            </div>
          ))}
        </div>

        {/* Saved Destinations */}
        <div className="flex items-center justify-between px-5 mt-8 mb-3.5">
          <span className="text-[17px] font-semibold text-gray-900">Saved Destinations</span>
          <span className="text-gray-400 text-base">›</span>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
          {[
            { emoji:"🗼", name:"Paris", country:"France", g:["#7050b0","#4a2080"] },
            { emoji:"🏝️", name:"Bali", country:"Indonesia", g:["#108050","#055060"] },
            { emoji:"🏔️", name:"Interlaken", country:"Switzerland", g:["#2060c0","#103580"] },
          ].map(d => (
            <div key={d.name} className="flex-shrink-0 w-[130px]">
              <div className="w-full h-[100px] rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: `linear-gradient(135deg, ${d.g[0]}, ${d.g[1]})` }}>
                <span className="opacity-65">{d.emoji}</span>
              </div>
              <div className="text-[14px] font-semibold text-gray-900 mt-2">{d.name}</div>
              <div className="text-[12px] text-gray-400">{d.country}</div>
            </div>
          ))}
        </div>
        <div className="h-28" />
      </div>

      {mapTrip && <MapModal trip={mapTrip} onClose={() => setMapTrip(null)} />}
    </>
  );
}

function Avatars({ count }: { count: number }) {
  const colors = ["#e8b88a", "#8dbf8d"];
  const emojis = ["👩", "👨"];
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-[26px] h-[26px] rounded-full border-2 border-white flex items-center justify-center text-sm -ml-2 first:ml-0"
          style={{ background: colors[i % 2] }}>{emojis[i]}</div>
      ))}
    </div>
  );
}
