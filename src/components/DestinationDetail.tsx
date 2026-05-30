"use client";
import { useState } from "react";

interface Dest { id: string; name: string; country: string; tags: string[]; photo: string; }
interface Props { dest: Dest; onBack: () => void; }

const destTabs = ["Overview","Hotels","Things to do","Restaurants"];

const hotelList = [
  { name: "Grand Hotel & Spa",    rating: 4.5, reviews: 2847, amenity: "Free breakfast · Pool",       price: "$149", photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { name: "City View Boutique",   rating: 4.2, reviews: 1471, amenity: "Free cancellation · Bar",     price: "$99",  photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { name: "Heritage Inn",         rating: 4.7, reviews: 934,  amenity: "Breakfast included · Spa",    price: "$215", photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
];

const thingsList = [
  { name: "Cultural Walking Tour",  type: "Tours & Activities", rating: 4.9, reviews: 5621, price: "from $25",  photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { name: "Local Food Market",      type: "Food & Drink",       rating: 4.7, reviews: 2103, price: "Free entry",photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { name: "Sunset Viewpoint Hike", type: "Outdoor Activities",  rating: 4.8, reviews: 1890, price: "from $18",  photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
];

export default function DestinationDetail({ dest, onBack }: Props) {
  const [activeTab, setActiveTab] = useState("Hotels");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">

      {/* ── Nav ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3 bg-white border-b border-gray-100">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-satoshi text-[17px] font-600 text-gray-900">{dest.name}</span>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7.5" stroke="#1c1c1e" strokeWidth="1.8"/>
            <path d="M21 21l-4.5-4.5" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {destTabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-shrink-0 px-4 py-3 font-satoshi text-[14px] font-500 relative"
            style={{ color: activeTab === t ? "#1c1c1e" : "#8e8e93" }}>
            {t}
            {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-full" />}
          </button>
        ))}
      </div>

      {/* ── Filter pills ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 py-3">
        <button className="flex-shrink-0 flex items-center gap-1.5 bg-black rounded-full px-3.5 py-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 20h6M12 4v16M4.5 8h15" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span className="font-satoshi text-white text-[13px] font-600">Map</span>
        </button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 font-satoshi text-[13px] font-500 text-gray-700 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#555" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Dec 26 → 27
        </button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 font-satoshi text-[13px] font-500 text-gray-700 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="#555" strokeWidth="1.8"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/></svg>
          2
        </button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 font-satoshi text-[13px] font-500 text-gray-700 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#555" strokeWidth="1.8"/><path d="M12 8v4l3 3" stroke="#555" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Rewards
        </button>
      </div>

      {/* ── Sort line ── */}
      <div className="px-5 pb-3 font-satoshi text-[13px] text-gray-500">
        Properties in <span className="font-600 text-gray-900">{dest.name}</span> sorted by{" "}
        <span className="underline decoration-dotted text-gray-900">best value</span>
      </div>

      {/* ── Rewards banner ── */}
      <div className="mx-5 mb-4 flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#d4a017" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="font-satoshi text-[13px] font-600 text-gray-900">Earn 5% back in Rewards</div>
            <div className="font-satoshi text-[11px] text-gray-400">On eligible hotels</div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>

      {/* ── Hotels ── */}
      {activeTab === "Hotels" && (
        <div className="px-5 space-y-5 pb-6">
          {hotelList.map((h, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
              <div className="relative" style={{ height: 210 }}>
                <img src={h.photo} alt={h.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {[0,1,2,3].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: d === 0 ? "white" : "rgba(255,255,255,0.45)" }} />)}
                </div>
                <button onClick={() => setLiked(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(i) ? "#ff2d55" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(i) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                  </svg>
                </button>
                {i === 0 && (
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#00AA6C] flex flex-col items-center justify-center shadow">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/></svg>
                    <span className="font-satoshi text-white text-[7px] font-700 leading-none">2024</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-satoshi text-[18px] font-700 text-gray-900">{i + 1}. {h.name}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <BubbleRating rating={h.rating} />
                  <span className="font-satoshi text-[13px] text-gray-400">{h.reviews.toLocaleString()}</span>
                </div>
                <div className="font-satoshi text-[13px] text-gray-500 mt-1">{h.amenity}</div>
                <div className="mt-3">
                  <div className="font-satoshi text-[12px] text-gray-400">from</div>
                  <div className="font-serif text-[28px] text-black leading-none">{h.price}</div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#d4a017" strokeWidth="1.8"/><path d="M12 8v4l2 2" stroke="#d4a017" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <span className="font-satoshi text-[12px] font-600 text-gray-700">Earn 5% back in Rewards</span>
                </div>
                <div className="font-satoshi text-[12px] text-gray-400 mt-0.5">Fully Refundable Options</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab !== "Hotels" && (
        <div className="px-5 space-y-4 pb-6">
          {activeTab === "Overview" && (
            <div className="rounded-2xl overflow-hidden relative mb-4" style={{ height: 200 }}>
              <img src={dest.photo} alt={dest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 30%, transparent)" }} />
              <div className="absolute bottom-4 left-4">
                <div className="font-serif text-white text-[28px] leading-none">{dest.name}</div>
                <div className="font-satoshi text-white/70 text-[14px] mt-0.5">{dest.country}</div>
              </div>
            </div>
          )}
          {thingsList.map((item, i) => (
            <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
              <div className="w-[110px] h-[100px] flex-shrink-0">
                <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-3 pr-3">
                <div className="font-satoshi text-[11px] text-[#00AA6C] font-600">{item.type}</div>
                <div className="font-satoshi text-[14px] font-700 text-gray-900 mt-0.5 leading-snug">{item.name}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <BubbleRating rating={item.rating} />
                  <span className="font-satoshi text-[11px] text-gray-400">{item.reviews.toLocaleString()}</span>
                </div>
                <div className="font-satoshi text-[13px] font-600 text-gray-900 mt-1">{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}

function BubbleRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <div key={i} className="w-[11px] h-[11px] rounded-full"
          style={{ background: i < Math.floor(rating) ? "#00AA6C" : (i === Math.floor(rating) && rating%1>=0.5 ? "linear-gradient(90deg,#00AA6C 50%,#d1d1d6 50%)" : "#d1d1d6") }} />
      ))}
    </div>
  );
}
