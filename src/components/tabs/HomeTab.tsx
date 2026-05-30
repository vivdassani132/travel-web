"use client";
import { useState } from "react";
import DestinationDetail from "../DestinationDetail";

const adventures = [
  { id: "cusco",     name: "Cusco",         country: "Peru",        tags: ["Cultural Tours","Highlands"],   photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { id: "japan",     name: "Kyoto",         country: "Japan",       tags: ["Temples","Food"],                photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id: "argentina", name: "Buenos Aires",  country: "Argentina",   tags: ["Nightlife","Culture"],           photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  { id: "russia",    name: "Moscow",        country: "Russia",      tags: ["Architecture","History"],        photo: "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg" },
];

const trending = [
  { id: "bali",    name: "Bali",        country: "Indonesia", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { id: "beach",   name: "Maldives",    country: "Maldives",  photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { id: "lasvegas",name: "Las Vegas",   country: "USA",       photo: "https://i.pinimg.com/1200x/44/33/61/44336116fa73e410602359b05189d680.jpg" },
  { id: "southam", name: "Rio de Janeiro",country:"Brazil",   photo: "https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg" },
  { id: "villa",   name: "Santorini",   country: "Greece",    photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { id: "nyc",     name: "New York",    country: "USA",       photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
];

type Dest = typeof adventures[0];

export default function HomeTab() {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<Dest | null>(null);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLiked(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  if (detail) return <DestinationDetail dest={detail} onBack={() => setDetail(null)} />;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#00AA6C] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="white"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          <span className="text-[20px] font-bold text-gray-900" style={{ letterSpacing: "-0.3px" }}>Wandr</span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Search bar ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-2.5 bg-[#f2f2f7] rounded-full px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[15px] text-gray-400">Places to go, things to do, hotels...</span>
        </div>
      </div>

      {/* ── Location banner ── */}
      <div className="mx-4 mb-6 flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm">
        <div className="w-11 h-11 rounded-full bg-[#00AA6C] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
            <circle cx="12" cy="9" r="2.5" fill="#00AA6C"/>
            <path d="M19 9h1M4 9H3M12 2V1M12 16v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-semibold text-gray-900">Looking for something nearby?</div>
          <div className="text-[13px] text-gray-400">Allow location access</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Plan your next adventure ── */}
      <div className="px-4 mb-3">
        <h2 className="text-[22px] font-bold text-gray-900" style={{ letterSpacing: "-0.3px" }}>Plan your next adventure</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-1">
        {adventures.map(d => (
          <button key={d.id} onClick={() => setDetail(d)} className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden relative text-left" style={{ height: 340 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
            {/* Dark gradient */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 40%, transparent 75%)" }} />
            {/* Top tags + heart */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {d.tags.map(tag => (
                  <span key={tag} className="bg-white/95 rounded-full px-2.5 py-1 text-[11px] font-semibold text-gray-800">{tag}</span>
                ))}
              </div>
              <button onClick={e => toggleLike(e, d.id)} className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={liked.has(d.id) ? "#ff2d55" : "none"}>
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
            {/* Bottom city name */}
            <div className="absolute bottom-4 left-4">
              <div className="text-white text-[26px] font-bold leading-none" style={{ letterSpacing: "-0.5px" }}>{d.name}</div>
              <div className="text-white/75 text-[14px] mt-0.5">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Trending with travelers ── */}
      <div className="px-4 mt-7 mb-3">
        <h2 className="text-[22px] font-bold text-gray-900" style={{ letterSpacing: "-0.3px" }}>Trending with travelers</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 pb-2">
        {trending.map(d => (
          <button key={d.id} onClick={() => setDetail({ ...d, tags: [] })} className="flex-shrink-0 w-[160px] rounded-2xl overflow-hidden relative text-left" style={{ height: 160 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent 70%)" }} />
            <button onClick={e => toggleLike(e, d.id + "t")} className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill={liked.has(d.id + "t") ? "#ff2d55" : "none"}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id + "t") ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
              </svg>
            </button>
            <div className="absolute bottom-3 left-3">
              <div className="text-white text-[15px] font-bold leading-none">{d.name}</div>
              <div className="text-white/70 text-[12px]">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Near you ── */}
      <div className="px-4 mt-6 mb-3">
        <h2 className="text-[22px] font-bold text-gray-900" style={{ letterSpacing: "-0.3px" }}>Experiences near you</h2>
      </div>
      <div className="px-4 space-y-3 pb-6">
        {[
          { name: "Mountain trekking tour", location: "Andes, South America", rating: 4.8, reviews: 2341, price: "from $45", photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
          { name: "Tropical island escape", location: "Southeast Asia", rating: 4.9, reviews: 1872, price: "from $120", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden">
            <div className="w-[100px] h-[90px] flex-shrink-0">
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 py-2.5 pr-3">
              <div className="text-[14px] font-bold text-gray-900 leading-snug">{item.name}</div>
              <div className="text-[12px] text-gray-400 mt-0.5">{item.location}</div>
              <div className="flex items-center gap-1 mt-1">
                <BubbleRating rating={item.rating} />
                <span className="text-[11px] text-gray-400">{item.reviews.toLocaleString()}</span>
              </div>
              <div className="text-[13px] font-semibold text-gray-900 mt-1">{item.price}</div>
            </div>
          </div>
        ))}
      </div>

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
          style={{ background: i < full ? "#00AA6C" : i === full && half ? "linear-gradient(90deg, #00AA6C 50%, #d1d1d6 50%)" : "#d1d1d6" }} />
      ))}
    </div>
  );
}
