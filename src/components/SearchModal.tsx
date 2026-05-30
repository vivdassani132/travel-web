"use client";
import { useState, useRef, useEffect } from "react";

const ALL_DESTINATIONS = [
  { name: "Cusco",          country: "Peru",        tags: ["Cultural","Highlands","Trekking"],      photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { name: "Kyoto",          country: "Japan",       tags: ["Temples","Food","History"],             photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { name: "Buenos Aires",   country: "Argentina",   tags: ["Nightlife","Culture","Food"],           photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
  { name: "Moscow",         country: "Russia",      tags: ["Architecture","History","Winter"],      photo: "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg" },
  { name: "Bali",           country: "Indonesia",   tags: ["Beach","Temples","Jungle"],             photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { name: "Maldives",       country: "Maldives",    tags: ["Beach","Ocean","Luxury"],               photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { name: "Las Vegas",      country: "USA",         tags: ["Nightlife","Entertainment","Desert"],   photo: "https://i.pinimg.com/1200x/44/33/61/44336116fa73e410602359b05189d680.jpg" },
  { name: "Rio de Janeiro", country: "Brazil",      tags: ["Beach","Carnival","Mountains"],         photo: "https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg" },
  { name: "Santorini",      country: "Greece",      tags: ["Island","Romantic","Sunset"],           photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { name: "New York",       country: "USA",         tags: ["Urban","Food","Culture","Shopping"],    photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
  { name: "Swiss Alps",     country: "Switzerland", tags: ["Mountain","Skiing","Hiking"],           photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  // Swiss Alps hotels & places
  { name: "Victoria-Jungfrau Grand Hotel",  country: "Interlaken, Switzerland",   tags: ["Hotel","Luxury","Alps","Spa"],            photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "The Chedi Andermatt",            country: "Andermatt, Switzerland",    tags: ["Hotel","Ski","Luxury","Alpine"],          photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Bellevue Hotel Grindelwald",     country: "Grindelwald, Switzerland",  tags: ["Hotel","Mountain","View","Boutique"],     photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Palace Hotel Luzern",            country: "Lucerne, Switzerland",      tags: ["Hotel","Heritage","Lake","Classic"],      photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Tschuggen Grand Hotel",          country: "Arosa, Switzerland",        tags: ["Hotel","Spa","Ski","5-Star"],             photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Jungfraujoch — Top of Europe",  country: "Bernese Alps, Switzerland", tags: ["Summit","Experience","Glacier","Views"],  photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Aletsch Glacier Walk",           country: "Valais, Switzerland",       tags: ["Hiking","Glacier","Alpine","Nature"],     photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Lake Thun Kayaking",             country: "Thun, Switzerland",         tags: ["Activity","Water","Alps","Kayak"],        photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Interlaken Old Town",            country: "Interlaken, Switzerland",   tags: ["Village","Shopping","Alps","Walk"],       photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Grindelwald Village",            country: "Grindelwald, Switzerland",  tags: ["Village","Ski","Hiking","Scenic"],        photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  { name: "Zermatt & Matterhorn",           country: "Zermatt, Switzerland",      tags: ["Iconic","Mountain","Skiing","Hiking"],    photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
];

const RECENT = ["Swiss Alps", "Buenos Aires", "Maldives"];

interface Dest { id: string; name: string; country: string; tags: string[]; photo: string; }
interface Props { onClose: () => void; onSelect?: (dest: Dest) => void; }

export default function SearchModal({ onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = query.trim().length > 0
    ? ALL_DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col" style={{ maxWidth: 430, left: "50%", transform: "translateX(-50%)" }}>
      {/* Search input row */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-3 border-b border-gray-100">
        <div className="flex-1 flex items-center gap-2.5 bg-[#f5f5f5] rounded-2xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Destinations, hotels, experiences..."
            className="flex-1 bg-transparent font-satoshi text-[15px] text-gray-900 placeholder-gray-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#c7c7cc"/>
                <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
        <button onClick={onClose} className="font-satoshi text-[15px] font-500 text-gray-600 flex-shrink-0">
          Cancel
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* No query — show recents + categories */}
        {!query && (
          <div className="px-5 pt-4">
            <div className="mb-5">
              <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-2">Recent searches</div>
              {RECENT.map(name => {
                const d = ALL_DESTINATIONS.find(x => x.name === name)!;
                return (
                  <button key={name} onClick={() => { if (onSelect) { onSelect({ id: d.name.toLowerCase().replace(/\s/g,"-"), ...d }); onClose(); } else setQuery(name); }} className="w-full flex items-center gap-3 py-2.5">
                    <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={d.photo} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-satoshi text-[15px] font-500 text-gray-900">{name}</div>
                      <div className="font-satoshi text-[12px] text-gray-400">{d.country}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8l4 4-4 4M8 12h8" stroke="#c7c7cc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-3">Explore by vibe</div>
            <div className="flex flex-wrap gap-2">
              {["Beach","Mountain","City","Jungle","Desert","Island","Winter","Culture","Food","Alpine","Ski","Hotel"].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)}
                  className="font-satoshi text-[13px] font-500 text-gray-700 bg-[#f5f5f5] rounded-full px-3.5 py-2">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && results.length === 0 && (
          <div className="flex flex-col items-center justify-center pt-16 px-10 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mb-4 opacity-20">
              <circle cx="11" cy="11" r="8" stroke="#1c1c1e" strokeWidth="1.5"/>
              <path d="M21 21l-4.35-4.35" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="font-serif text-[20px] text-black mb-1">No results for &ldquo;{query}&rdquo;</div>
            <div className="font-satoshi text-[14px] text-gray-400">Try a different destination, country, or vibe</div>
          </div>
        )}

        {results.length > 0 && (
          <div className="px-5 pt-3">
            <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-3">{results.length} result{results.length !== 1 ? "s" : ""}</div>
            <div className="space-y-3">
              {results.map(d => (
                <button key={d.name}
                  onClick={() => { if (onSelect) { onSelect({ id: d.name.toLowerCase().replace(/\s/g,"-"), ...d }); onClose(); } }}
                  className="w-full flex items-stretch border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.04)] text-left active:bg-gray-50">
                  <div className="w-[80px] flex-shrink-0">
                    <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-3 px-3">
                    <div className="font-serif text-[17px] text-black leading-snug">{d.name}</div>
                    <div className="font-satoshi text-[12px] text-gray-400">{d.country}</div>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {d.tags.slice(0,3).map(t => (
                        <span key={t} className="font-satoshi text-[10px] font-500 text-gray-500 bg-[#f5f5f5] rounded-full px-2 py-0.5">{t}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="h-8"/>
          </div>
        )}
      </div>
    </div>
  );
}
