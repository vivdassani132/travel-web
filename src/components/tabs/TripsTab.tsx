"use client";
import { useState } from "react";

const segments = ["Upcoming", "Past", "Saved"];

const upcoming = [
  { name: "Cusco", country: "Peru", date: "Dec 26 – Jan 2", days: 8, photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg", status: "In 14 days" },
  { name: "Kyoto", country: "Japan", date: "Feb 10 – 18", days: 8, photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg", status: "In 61 days" },
];

const past = [
  { name: "Buenos Aires", country: "Argentina", date: "Jan 2025", rating: 5, photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  { name: "New York",     country: "USA",       date: "Nov 2024", rating: 4, photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
  { name: "Las Vegas",    country: "USA",       date: "Aug 2024", rating: 4, photo: "https://i.pinimg.com/1200x/44/33/61/44336116fa73e410602359b05189d680.jpg" },
];

const saved = [
  { name: "Maldives",     country: "Maldives",  photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { name: "Santorini",    country: "Greece",    photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { name: "Bali",         country: "Indonesia", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { name: "Russia",       country: "Russia",    photo: "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg" },
];

export default function TripsTab() {
  const [seg, setSeg] = useState("Upcoming");

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-4 pt-12 pb-2">
        <h1 className="font-serif text-[30px] text-black">Trips</h1>
      </div>

      {/* Segment */}
      <div className="flex border-b border-gray-200 px-4">
        {segments.map(s => (
          <button key={s} onClick={() => setSeg(s)}
            className="px-4 py-3 text-[14px] font-medium relative mr-2"
            style={{ color: seg === s ? "#1c1c1e" : "#8e8e93" }}>
            {s}
            {seg === s && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-full" />}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 pb-6">
        {seg === "Upcoming" && (
          <div className="space-y-4">
            {upcoming.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative" style={{ height: 160 }}>
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 35%, transparent)" }} />
                  <div className="absolute top-3 left-3 bg-[#000000] rounded-full px-2.5 py-1">
                    <span className="text-white text-[11px] font-semibold">{t.status}</span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="text-white text-[22px] font-bold leading-none">{t.name}</div>
                    <div className="text-white/70 text-[13px]">{t.country}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[12px] text-gray-400">Dates</div>
                      <div className="text-[14px] font-semibold text-gray-900">{t.date}</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-400">Duration</div>
                      <div className="text-[14px] font-semibold text-gray-900">{t.days} days</div>
                    </div>
                    <div>
                      <div className="text-[12px] text-gray-400">Status</div>
                      <div className="text-[14px] font-semibold text-[#000000]">Confirmed</div>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#f2f2f7] rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-[#000000] rounded-full" style={{ width: "60%" }} />
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-xl text-[13px] font-medium text-gray-700 bg-[#f2f2f7]">Details</button>
                    <button className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gray-900">Continue Planning</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {seg === "Past" && (
          <div className="space-y-3">
            {past.map((t, i) => (
              <div key={i} className="flex gap-3 items-center border border-gray-100 rounded-2xl p-3 shadow-sm">
                <div className="w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0">
                  <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-gray-900">{t.name}</div>
                  <div className="text-[12px] text-gray-400">{t.country} · {t.date}</div>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <div key={s} className="w-2.5 h-2.5 rounded-full" style={{ background: s <= t.rating ? "#000000" : "#d1d1d6" }} />
                    ))}
                  </div>
                </div>
                <button className="text-[12px] font-semibold text-[#000000] border border-[#000000] rounded-full px-3 py-1.5">Review</button>
              </div>
            ))}
          </div>
        )}

        {seg === "Saved" && (
          <div className="grid grid-cols-2 gap-3">
            {saved.map((d, i) => (
              <div key={i} className="rounded-2xl overflow-hidden relative" style={{ height: 130 }}>
                <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)" }} />
                <div className="absolute bottom-2.5 left-3">
                  <div className="text-white text-[14px] font-bold">{d.name}</div>
                  <div className="text-white/70 text-[11px]">{d.country}</div>
                </div>
                <button className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff2d55"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
