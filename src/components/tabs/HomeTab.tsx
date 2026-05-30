"use client";
import { useState } from "react";
import { trips, tagAlongTrips, Trip } from "@/lib/data";
import MapModal from "../MapModal";

export default function HomeTab() {
  const [mapTrip, setMapTrip] = useState<Trip | null>(null);

  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-hide bg-white">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-14 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80&fit=crop"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[24px] font-bold tracking-tight text-gray-900">Hello Traveller</span>
          </div>
          <div className="flex gap-2">
            <button className="w-[36px] h-[36px] rounded-full bg-[#f2f2f7] flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="#3c3c43" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="w-[36px] h-[36px] rounded-full bg-[#f2f2f7] flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#3c3c43" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Upcoming Trips ── */}
        <div className="flex items-center justify-between px-5 mb-3">
          <span className="text-[17px] font-semibold text-gray-900">Upcoming Trips</span>
          <button className="flex items-center gap-0.5 text-gray-400">
            <span className="text-[15px]">See all</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
          {trips.map(trip => (
            <button
              key={trip.id}
              onClick={() => setMapTrip(trip)}
              className="flex-shrink-0 w-[195px] text-left"
            >
              {/* Photo card */}
              <div className="w-full h-[175px] rounded-[20px] overflow-hidden relative shadow-sm">
                <img
                  src={trip.photo}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
                {/* subtle gradient at bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />
              </div>
              {/* Caption row */}
              <div className="mt-2 flex items-center gap-1.5 px-0.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#8e8e93"/></svg>
                <span className="text-[13px] font-medium text-gray-700 flex-1 truncate">{trip.destination}, {trip.country}</span>
                <TravelerAvatars />
              </div>
            </button>
          ))}
        </div>

        {/* ── #TagAlong ── */}
        <div className="px-5 mt-8">
          <div className="text-[17px] font-bold text-gray-900">#TagAlong</div>
          <div className="text-[13px] text-gray-400 mt-0.5 mb-3.5">Discover open trips you can hop on</div>
          <div className="space-y-3">
            {tagAlongTrips.map(t => (
              <div key={t.id} className="flex gap-3 bg-white rounded-[18px] p-3 shadow-sm border border-gray-100/80">
                <div className="w-[96px] h-[96px] rounded-[14px] overflow-hidden flex-shrink-0">
                  <img src={t.photo} alt={t.destination} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-0.5">
                  <div className="text-[15px] font-bold text-gray-900 leading-snug">{t.destination}</div>
                  <div className="text-[12px] text-gray-500 mt-1 leading-snug">{t.description}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#8e8e93"/></svg>
                    <span className="text-[11px] text-gray-400">{t.country}</span>
                  </div>
                  <div className="text-[13px] font-semibold mt-1" style={{ color: "#007AFF" }}>{t.slotsLeft} Slots left</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Saved Destinations ── */}
        <div className="flex items-center justify-between px-5 mt-8 mb-3">
          <span className="text-[17px] font-semibold text-gray-900">Saved Destinations</span>
          <button className="flex items-center gap-0.5 text-gray-400">
            <span className="text-[15px]">See all</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-2">
          {[
            { name: "Paris", country: "France", photo: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80&fit=crop" },
            { name: "Bali", country: "Indonesia", photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80&fit=crop" },
            { name: "Interlaken", country: "Switzerland", photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80&fit=crop" },
          ].map(d => (
            <div key={d.name} className="flex-shrink-0 w-[120px]">
              <div className="w-full h-[90px] rounded-[16px] overflow-hidden">
                <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
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

function TravelerAvatars() {
  const photos = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=60&q=80&fit=crop",
  ];
  return (
    <div className="flex">
      {photos.map((src, i) => (
        <div key={i} className={`w-[22px] h-[22px] rounded-full overflow-hidden border-[1.5px] border-white ${i > 0 ? "-ml-2" : ""}`}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
