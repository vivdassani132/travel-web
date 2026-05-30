"use client";
import { useState } from "react";
import DestinationDetail from "../DestinationDetail";

const adventures = [
  { id: "cusco",     name: "Cusco",         country: "Peru",        tags: ["Cultural Tours","Highlands"],    photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { id: "japan",     name: "Kyoto",         country: "Japan",       tags: ["Temples","After dark"],          photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id: "argentina", name: "Buenos Aires",  country: "Argentina",   tags: ["Nightlife","4WD Tours"],         photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  { id: "russia",    name: "Moscow",        country: "Russia",      tags: ["Architecture","History"],        photo: "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg" },
];

const trending = [
  { id: "bali",     name: "Bali",           country: "Indonesia",   photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { id: "maldives", name: "Maldives",       country: "Maldives",    photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { id: "vegas",    name: "Las Vegas",      country: "USA",         photo: "https://i.pinimg.com/1200x/44/33/61/44336116fa73e410602359b05189d680.jpg" },
  { id: "rio",      name: "Rio de Janeiro", country: "Brazil",      photo: "https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg" },
  { id: "villa",    name: "Santorini",      country: "Greece",      photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { id: "nyc",      name: "New York",       country: "USA",         photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
];

const nearby = [
  { name: "Andean trekking",     location: "Cusco, Peru",        rating: 4.8, reviews: 2341, price: "from $45", photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Tropical island stay",location: "Bali, Indonesia",   rating: 4.9, reviews: 1872, price: "from $120", photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
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
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-2.5">
          {/* Compass logo mark */}
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6"/>
              <path d="M16.5 7.5l-3 6-6 3 3-6 6-3z" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="black"/>
            </svg>
          </div>
          <span className="font-serif text-[22px] text-black tracking-tight">Compass</span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f5f5f5]">
          {/* Bell */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Search bar ── */}
      <div className="px-5 mb-5">
        <button className="w-full flex items-center gap-3 bg-[#f5f5f5] rounded-2xl px-4 py-3.5 text-left">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span className="font-satoshi text-[15px] text-gray-400">Destinations, hotels, experiences...</span>
        </button>
      </div>

      {/* ── Location strip ── */}
      <div className="mx-5 mb-7 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-gray-100 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div className="w-10 h-10 rounded-full bg-[#00AA6C] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
            <circle cx="12" cy="9" r="2.2" fill="#00AA6C"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-satoshi text-[14px] font-600 text-gray-900 leading-snug">Discover what's near you</div>
          <div className="font-satoshi text-[12px] text-gray-400">Turn on location for local picks</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* ── Plan your next adventure ── */}
      <div className="px-5 mb-4">
        <h2 className="font-serif text-[26px] text-black leading-tight">Plan your next adventure</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        {adventures.map(d => (
          <button key={d.id} onClick={() => setDetail(d)}
            className="flex-shrink-0 w-[280px] rounded-3xl overflow-hidden relative text-left"
            style={{ height: 340 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.68) 40%, rgba(0,0,0,0.04) 80%)" }} />
            {/* Tags + heart */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-start justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {d.tags.map(tag => (
                  <span key={tag} className="font-satoshi bg-white/95 rounded-full px-2.5 py-[5px] text-[11px] font-600 text-gray-800 leading-none">{tag}</span>
                ))}
              </div>
              <button onClick={e => toggleLike(e, d.id)}
                className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(d.id) ? "#ff2d55" : "none"}>
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                </svg>
              </button>
            </div>
            {/* City */}
            <div className="absolute bottom-4 left-4">
              <div className="font-serif text-white text-[30px] leading-none">{d.name}</div>
              <div className="font-satoshi text-white/70 text-[13px] mt-1">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Trending ── */}
      <div className="px-5 mt-8 mb-4">
        <h2 className="font-serif text-[26px] text-black">Trending with travellers</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        {trending.map(d => (
          <button key={d.id} onClick={() => setDetail({ ...d, tags: [] })}
            className="flex-shrink-0 w-[155px] rounded-2xl overflow-hidden relative text-left"
            style={{ height: 155 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 40%, transparent 70%)" }} />
            <button onClick={e => toggleLike(e, d.id + "t")}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill={liked.has(d.id + "t") ? "#ff2d55" : "none"}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id + "t") ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
              </svg>
            </button>
            <div className="absolute bottom-3 left-3">
              <div className="font-serif text-white text-[16px] leading-none">{d.name}</div>
              <div className="font-satoshi text-white/70 text-[11px] mt-0.5">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Experiences ── */}
      <div className="px-5 mt-8 mb-4">
        <h2 className="font-serif text-[26px] text-black">Experiences for you</h2>
      </div>
      <div className="px-5 space-y-3 pb-6">
        {nearby.map((item, i) => (
          <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
            <div className="w-[100px] h-[90px] flex-shrink-0">
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 py-2.5 pr-3">
              <div className="font-satoshi text-[14px] font-700 text-gray-900 leading-snug">{item.name}</div>
              <div className="font-satoshi text-[12px] text-gray-400 mt-0.5">{item.location}</div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <BubbleRating rating={item.rating} />
                <span className="font-satoshi text-[11px] text-gray-400">{item.reviews.toLocaleString()}</span>
              </div>
              <div className="font-satoshi text-[13px] font-600 text-gray-900 mt-1">{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-4" />
    </div>
  );
}

function BubbleRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <div key={i} className="w-[11px] h-[11px] rounded-full"
          style={{ background: i < Math.floor(rating) ? "#00AA6C" : i === Math.floor(rating) && rating%1>=0.5 ? "linear-gradient(90deg,#00AA6C 50%,#d1d1d6 50%)" : "#d1d1d6" }} />
      ))}
    </div>
  );
}
