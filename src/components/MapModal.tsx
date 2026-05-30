"use client";
import { useState } from "react";
import { Trip, TripSpot } from "@/lib/data";

interface Props {
  trip: Trip;
  onClose: () => void;
}

export default function MapModal({ trip, onClose }: Props) {
  const [selectedSpot, setSelectedSpot] = useState<TripSpot>(trip.spots[0]);
  const [activeDay, setActiveDay] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Build Leaflet map HTML using srcdoc (no npm required)
  const spotsJS = trip.spots.map(s => {
    const isFirst = s.id === trip.spots[0].id;
    return `
      var icon${s.id} = L.divIcon({
        html: '<div style="width:20px;height:20px;background:${isFirst ? "#007AFF" : "#fff"};border:3px solid ${isFirst ? "#007AFF" : "#007AFF"};border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
        className:'',iconSize:[20,20],iconAnchor:[10,10]
      });
      L.marker([${s.lat},${s.lng}],{icon:icon${s.id}}).addTo(map);
    `;
  }).join("\n");

  const mapHtml = `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<style>*{margin:0;padding:0}#map{height:100vh;width:100vw}.leaflet-control-attribution{display:none}.leaflet-control-zoom{display:none}</style>
</head><body>
<div id="map"></div>
<script>
var map=L.map('map',{zoomControl:false,attributionControl:false}).setView([${trip.lat},${trip.lng}],13);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:19}).addTo(map);
${spotsJS}
<\/script></body></html>`;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      style={{ maxWidth: 390, left: "50%", transform: "translateX(-50%)" }}
    >
      {/* ── Map fills top portion ── */}
      <div className="relative flex-1 min-h-0">
        <iframe
          srcDoc={mapHtml}
          className="w-full h-full border-0"
          title="map"
        />

        {/* Top bar — floats over map */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-12 pb-3 pointer-events-none">
          <button
            className="pointer-events-auto w-[36px] h-[36px] rounded-full bg-white shadow flex items-center justify-center"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="pointer-events-none bg-white/95 rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-[15px] font-semibold text-gray-900">{trip.destination}</span>
          </div>

          <button className="pointer-events-auto w-[36px] h-[36px] rounded-full bg-white shadow flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#1c1c1e" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* White gradient fade at bottom of map */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, white, transparent)" }}
        />

        {/* Photo cards — overlap map and sheet */}
        <div className="absolute bottom-0 left-0 right-0 pb-2">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
            {trip.spots.map(spot => {
              const isSelected = selectedSpot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className="flex-shrink-0 flex flex-col items-center"
                >
                  <div
                    className="overflow-hidden transition-all"
                    style={{
                      width: isSelected ? 148 : 120,
                      height: isSelected ? 105 : 86,
                      borderRadius: 16,
                      boxShadow: isSelected ? "0 4px 20px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.1)",
                      border: isSelected ? "2.5px solid #007AFF" : "2.5px solid transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img src={spot.photo} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 mt-1.5 bg-white rounded-full px-2.5 py-1 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                      <span className="text-[11px] font-semibold text-gray-800">{spot.name}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom sheet ── */}
      <div className="bg-white flex-shrink-0" style={{ maxHeight: sheetOpen ? "60%" : "auto" }}>
        {/* Drag handle + collapse toggle */}
        <button
          onClick={() => setSheetOpen(!sheetOpen)}
          className="w-full flex flex-col items-center pt-2 pb-3"
        >
          <div className="w-10 h-1 rounded-full bg-gray-200 mb-2" />
          <div className="flex items-center justify-between w-full px-5">
            <div>
              <div className="text-[19px] font-bold text-gray-900 text-left">{trip.destination}</div>
              <div className="text-[13px] text-gray-400 text-left">{trip.tagline}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-amber-500">★ {trip.rating}</span>
              <div className="bg-green-50 rounded-xl px-2 py-1 text-center">
                <div className="text-[15px] font-bold text-green-700 leading-none">{trip.matchPercent}%</div>
                <div className="text-[9px] text-green-500 leading-none mt-0.5">match</div>
              </div>
            </div>
          </div>
        </button>

        {sheetOpen && (
          <div className="overflow-y-auto scrollbar-hide px-5 pb-6" style={{ maxHeight: "calc(60vh - 80px)" }}>
            {/* Quick stats */}
            <div className="flex gap-3 mb-4">
              {[
                { icon: "🕐", val: trip.duration },
                { icon: "💰", val: trip.price },
              ].map(item => (
                <div key={item.val} className="flex items-center gap-1.5 bg-[#f2f2f7] rounded-xl px-3 py-2">
                  <span className="text-[14px]">{item.icon}</span>
                  <span className="text-[13px] font-medium text-gray-700">{item.val}</span>
                </div>
              ))}
              <div className="flex gap-1.5 flex-wrap">
                {trip.tags.map(t => (
                  <span key={t} className="bg-[#f2f2f7] rounded-xl px-3 py-2 text-[12px] font-medium text-gray-600">{t}</span>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-4">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">Itinerary</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3">
                {trip.itinerary.map((d, i) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${activeDay === i ? "bg-gray-900 text-white" : "bg-[#f2f2f7] text-gray-600"}`}>
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
            <div className="mb-4">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">Where to Eat</h3>
              {trip.restaurants.map((r, i) => (
                <div key={i} className="bg-[#f9f9fb] rounded-2xl p-3 flex gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-lg flex-shrink-0">🍽️</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-semibold text-gray-800">{r.name}</span>
                      <span className="text-[11px] text-amber-500">★ {r.rating}</span>
                    </div>
                    <div className="text-[11px] text-gray-400">{r.cuisine} · {r.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hotels */}
            <div className="mb-5">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">Where to Stay</h3>
              {trip.hotels.map((h, i) => (
                <div key={i} className="bg-[#f9f9fb] rounded-2xl p-3 flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-lg flex-shrink-0">🏨</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-semibold text-gray-800">{h.name}</span>
                      <span className="text-[11px] text-amber-400">{"★".repeat(h.stars)}</span>
                    </div>
                    <div className="text-[11px] text-gray-400">{h.pricePerNight}/night · {h.highlight}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full py-3.5 rounded-2xl text-white font-semibold text-[16px]"
              style={{ background: "linear-gradient(135deg, #007AFF, #0056b3)" }}
            >
              Book This Trip · {trip.price}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
