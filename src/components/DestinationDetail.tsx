"use client";
import { useState } from "react";

interface Dest { id: string; name: string; country: string; tags: string[]; photo: string; }
interface Props { dest: Dest; onBack: () => void; }

const destTabs = ["Overview", "Hotels", "Things to do", "Restaurants"];

const hotels: Record<string, { name: string; rating: number; reviews: number; amenity: string; price: string; photo: string }[]> = {
  default: [
    { name: "Grand Hotel & Spa", rating: 4.5, reviews: 2847, amenity: "Free breakfast available", price: "$149", photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
    { name: "City View Boutique", rating: 4.2, reviews: 1471, amenity: "Pool · Free cancellation", price: "$99", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
    { name: "Heritage Inn", rating: 4.7, reviews: 934, amenity: "Breakfast included · Spa", price: "$215", photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  ],
};

const things: Record<string, { name: string; type: string; rating: number; reviews: number; price: string; photo: string }[]> = {
  default: [
    { name: "Cultural Walking Tour", type: "Tours & Activities", rating: 4.9, reviews: 5621, price: "from $25", photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
    { name: "Local Food Market", type: "Food & Drink", rating: 4.7, reviews: 2103, price: "Free entry", photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
    { name: "Sunset Viewpoint Hike", type: "Outdoor Activities", rating: 4.8, reviews: 1890, price: "from $18", photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  ],
};

export default function DestinationDetail({ dest, onBack }: Props) {
  const [activeTab, setActiveTab] = useState("Hotels");
  const [liked, setLiked] = useState(false);
  const hotelList = hotels.default;
  const thingsList = things.default;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">

      {/* ── Top nav ── */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-[17px] font-semibold text-gray-900">{dest.name}</span>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7.5" stroke="#1c1c1e" strokeWidth="1.8"/>
            <path d="M21 21l-4.5-4.5" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── Section tabs ── */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {destTabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-shrink-0 px-4 py-3 text-[14px] font-medium relative"
            style={{ color: activeTab === t ? "#1c1c1e" : "#8e8e93" }}>
            {t}
            {activeTab === t && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* ── Filter pills ── */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
        <button className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 rounded-full px-3.5 py-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 20h6M12 4v16M4.5 8h15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-white text-[13px] font-semibold">Map</span>
        </button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 text-[13px] font-medium text-gray-700">Dec 26 → 27</button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#1c1c1e" strokeWidth="1.8"/><path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round"/></svg>
          <span className="text-[13px] font-medium text-gray-700">2</span>
        </button>
        <button className="flex-shrink-0 border border-gray-300 rounded-full px-3.5 py-2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[9px]">$</div>
          <span className="text-[13px] font-medium text-gray-700">Rewards</span>
        </button>
      </div>

      {/* ── Sort info ── */}
      <div className="px-4 pb-3 text-[13px] text-gray-500">
        Properties in <span className="font-medium text-gray-900">{dest.name}</span> sorted by{" "}
        <span className="underline text-gray-900">best value</span>
      </div>

      {/* ── Rewards banner ── */}
      <div className="mx-4 mb-4 flex items-center justify-between bg-white border border-gray-100 rounded-xl px-3.5 py-2.5 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-[14px]">$</div>
          <div>
            <div className="text-[13px] font-semibold text-gray-900">Earn 5% back in Rewards</div>
            <div className="text-[11px] text-gray-400">Earn rewards on eligible hotels</div>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>

      {/* ── Content based on active tab ── */}
      {activeTab === "Hotels" && (
        <div className="px-4 space-y-5 pb-6">
          {hotelList.map((h, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              {/* Photo */}
              <div className="relative" style={{ height: 200 }}>
                <img src={h.photo} alt={h.name} className="w-full h-full object-cover" />
                {/* Dots indicator */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {[0,1,2,3].map(d => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: d === 0 ? "white" : "rgba(255,255,255,0.5)" }} />
                  ))}
                </div>
                {/* Heart */}
                <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={liked && i === 0 ? "#ff2d55" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked && i === 0 ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                  </svg>
                </button>
                {/* Badge */}
                {i === 0 && (
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-[#00AA6C] flex flex-col items-center justify-center">
                    <div className="text-white text-[8px] font-bold leading-none">2024</div>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="text-[17px] font-bold text-gray-900">{i + 1}. {h.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <BubbleRating rating={h.rating} />
                  <span className="text-[13px] text-gray-500">{h.reviews.toLocaleString()}</span>
                </div>
                <div className="text-[13px] text-gray-500 mt-1">{h.amenity}</div>
                <div className="mt-3">
                  <div className="text-[13px] text-gray-400">from</div>
                  <div className="text-[24px] font-bold text-gray-900 leading-none">{h.price}</div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-[9px] font-bold text-white">$</div>
                  <span className="text-[12px] font-semibold text-gray-700">Earn 5% back in Rewards</span>
                </div>
                <div className="text-[12px] text-gray-400 mt-0.5">Fully Refundable Options</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === "Things to do" || activeTab === "Overview" || activeTab === "Restaurants") && (
        <div className="px-4 space-y-4 pb-6">
          {/* Hero image */}
          {activeTab === "Overview" && (
            <div className="rounded-2xl overflow-hidden relative mb-4" style={{ height: 200 }}>
              <img src={dest.photo} alt={dest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent)" }} />
              <div className="absolute bottom-4 left-4">
                <div className="text-white text-[26px] font-bold">{dest.name}</div>
                <div className="text-white/75 text-[14px]">{dest.country}</div>
              </div>
            </div>
          )}
          {thingsList.map((item, i) => (
            <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="w-[110px] h-[100px] flex-shrink-0">
                <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-3 pr-3">
                <div className="text-[12px] text-[#00AA6C] font-medium">{item.type}</div>
                <div className="text-[14px] font-bold text-gray-900 mt-0.5 leading-snug">{item.name}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <BubbleRating rating={item.rating} />
                  <span className="text-[11px] text-gray-400">{item.reviews.toLocaleString()}</span>
                </div>
                <div className="text-[13px] font-semibold text-gray-900 mt-1">{item.price}</div>
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
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <div key={i} className="w-3 h-3 rounded-full"
          style={{ background: i < full ? "#00AA6C" : (i === full && half ? "linear-gradient(90deg,#00AA6C 50%,#d1d1d6 50%)" : "#d1d1d6") }} />
      ))}
    </div>
  );
}
