"use client";
import { useState, useEffect, useRef } from "react";
import { Trip, TripSpot } from "@/lib/data";

interface Props {
  trip: Trip;
  onClose: () => void;
}

export default function MapModal({ trip, onClose }: Props) {
  const [selectedSpot, setSelectedSpot] = useState<TripSpot>(trip.spots[0]);
  const [activeDay, setActiveDay] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  // Static map image using OSM tile background (no API key needed)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${trip.lng - 0.08},${trip.lat - 0.06},${trip.lng + 0.08},${trip.lat + 0.06}&layer=mapnik&marker=${trip.lat},${trip.lng}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" style={{ maxWidth: 390, left: "50%", transform: "translateX(-50%)" }}>
      <div className="bg-white w-full h-[92%] rounded-t-3xl overflow-hidden flex flex-col">
        {/* Map Area */}
        <div className="relative flex-shrink-0" style={{ height: "45%" }}>
          {/* Leaflet-style static map background */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={mapUrl}
              className="w-full h-full border-0 pointer-events-none"
              title="map"
              style={{ filter: "saturate(0.85) brightness(1.05)" }}
            />
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, white, transparent)" }} />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
            <button onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow flex items-center justify-center text-gray-700 font-semibold text-lg">
              ‹
            </button>
            {/* Location pill */}
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md shadow rounded-full px-3 py-1.5">
              <span className="text-[14px]">{trip.emoji}</span>
              <span className="text-[13px] font-semibold text-gray-800">{trip.destination}</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow flex items-center justify-center text-base">
              🔍
            </button>
          </div>

          {/* Spot pins */}
          {trip.spots.map((spot, i) => {
            // Map lat/lng to relative position inside the iframe viewport
            const xPct = ((spot.lng - (trip.lng - 0.08)) / 0.16) * 100;
            const yPct = ((trip.lat + 0.06 - spot.lat) / 0.12) * 100;
            const clampedX = Math.max(5, Math.min(95, xPct));
            const clampedY = Math.max(5, Math.min(85, yPct));
            const isSelected = selectedSpot.id === spot.id;
            return (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className="absolute flex flex-col items-center"
                style={{ left: `${clampedX}%`, top: `${clampedY}%`, transform: "translate(-50%, -100%)" }}>
                <div className={`rounded-full flex items-center justify-center shadow-lg transition-all ${isSelected ? "w-10 h-10 text-xl" : "w-8 h-8 text-base"}`}
                  style={{ background: `linear-gradient(135deg, ${spot.gradient[0]}, ${spot.gradient[1]})` }}>
                  {spot.emoji}
                </div>
                <div className="w-2 h-2 rounded-full mt-0.5"
                  style={{ background: spot.gradient[0] }} />
              </button>
            );
          })}
        </div>

        {/* Photo cards scroll */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-3 flex-shrink-0"
          style={{ marginTop: -16 }}>
          {trip.spots.map(spot => {
            const isSelected = selectedSpot.id === spot.id;
            return (
              <button key={spot.id} onClick={() => setSelectedSpot(spot)}
                className={`flex-shrink-0 w-[140px] rounded-2xl overflow-hidden transition-all ${isSelected ? "ring-2 ring-offset-1 scale-105" : "scale-100 opacity-80"}`}
>
                <div className="h-[100px] flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${spot.gradient[0]}, ${spot.gradient[1]})` }}>
                  <span className="text-4xl opacity-60">{spot.emoji}</span>
                  <div className="absolute bottom-2 left-2 bg-black/30 rounded-full px-2 py-0.5">
                    <span className="text-white text-[10px] font-semibold">👥 {spot.travelers}</span>
                  </div>
                </div>
                <div className="bg-white px-2 py-1.5">
                  <div className="text-[12px] font-semibold text-gray-800 truncate">{spot.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Trip details */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-6">
          {/* Trip header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[22px] font-bold text-gray-900">{trip.destination}</h2>
              <p className="text-[14px] text-gray-500 mt-0.5">{trip.tagline}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[13px] text-gray-600">⏱ {trip.duration}</span>
                <span className="text-[13px] text-gray-600">💰 {trip.price}</span>
                <span className="text-[13px] text-amber-500">★ {trip.rating}</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl px-2.5 py-1.5 text-center">
              <div className="text-[20px] font-bold text-green-700">{trip.matchPercent}%</div>
              <div className="text-[10px] text-green-600">match</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {trip.tags.map(t => (
              <span key={t} className="bg-[#f2f2f7] rounded-full px-3 py-1 text-[12px] font-medium text-gray-700">{t}</span>
            ))}
          </div>

          {/* Itinerary */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-3">Itinerary</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3">
              {trip.itinerary.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${activeDay === i ? "text-white" : "bg-[#f2f2f7] text-gray-600"}`}
                  style={activeDay === i ? { background: `linear-gradient(135deg, ${trip.gradient[0]}, ${trip.gradient[1]})` } : {}}>
                  Day {d.day}
                </button>
              ))}
            </div>
            {trip.itinerary[activeDay] && (
              <div className="bg-[#f9f9fb] rounded-2xl p-3.5">
                <div className="text-[14px] font-semibold text-gray-800 mb-2">{trip.itinerary[activeDay].title}</div>
                {trip.itinerary[activeDay].items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-[6px] flex-shrink-0" />
                    <span className="text-[13px] text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Restaurants */}
          <div className="mb-5">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-3">Where to Eat</h3>
            <div className="space-y-2">
              {trip.restaurants.map((r, i) => (
                <div key={i} className="bg-[#f9f9fb] rounded-2xl p-3.5 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl flex-shrink-0">🍽️</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-gray-800">{r.name}</span>
                      <span className="text-[12px] text-amber-500">★ {r.rating}</span>
                    </div>
                    <div className="text-[12px] text-gray-500">{r.cuisine} · {r.price}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5 italic">"{r.note}"</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels */}
          <div className="mb-4">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-3">Where to Stay</h3>
            {trip.hotels.map((h, i) => (
              <div key={i} className="bg-[#f9f9fb] rounded-2xl p-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl flex-shrink-0">🏨</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-gray-800">{h.name}</span>
                    <span className="text-[12px] text-amber-500">{"★".repeat(h.stars)}</span>
                  </div>
                  <div className="text-[12px] text-gray-500">{h.pricePerNight}/night</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 italic">"{h.highlight}"</div>
                </div>
              </div>
            ))}
          </div>

          {/* Book button */}
          <button className="w-full py-4 rounded-2xl text-white font-semibold text-[16px]"
            style={{ background: `linear-gradient(135deg, ${trip.gradient[0]}, ${trip.gradient[1]})` }}>
            Book This Trip · {trip.price}
          </button>
        </div>
      </div>
    </div>
  );
}
