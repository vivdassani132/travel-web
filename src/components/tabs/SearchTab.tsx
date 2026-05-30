"use client";
import { useState } from "react";
import SearchModal from "../SearchModal";
import DestinationDetail, { type Dest } from "../DestinationDetail";

const categories = [
  { label:"Hotels",           icon:"🏨", query:"Hotel" },
  { label:"Restaurants",     icon:"🍽️", query:"Food" },
  { label:"Things to Do",    icon:"🎯", query:"Hiking" },
  { label:"Vacation Rentals",icon:"🏡", query:"Rental" },
];

const popular: Dest[] = [
  { id:"bali",       name:"Bali",          country:"Indonesia", tags:["Beach","Temples","Jungle"],    photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { id:"maldives",   name:"Maldives",      country:"Maldives",  tags:["Beach","Ocean","Luxury"],      photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { id:"kyoto",      name:"Kyoto",         country:"Japan",     tags:["Temples","Food","History"],    photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id:"santorini",  name:"Santorini",     country:"Greece",    tags:["Island","Romantic","Sunset"],  photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { id:"cusco",      name:"Cusco",         country:"Peru",      tags:["Cultural","Highlands"],        photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { id:"newyork",    name:"New York",      country:"USA",       tags:["Urban","Food","Culture"],      photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
];

export default function SearchTab() {
  const [showModal, setShowModal] = useState(false);
  const [modalQuery, setModalQuery] = useState("");
  const [detail, setDetail] = useState<Dest | null>(null);

  const openCategory = (query: string) => { setModalQuery(query); setShowModal(true); };

  if (detail) return <DestinationDetail dest={detail} onBack={() => setDetail(null)} />;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white relative">
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-serif text-[30px] text-black mb-4">Search</h1>
        {/* Search bar — opens modal */}
        <button onClick={() => { setModalQuery(""); setShowModal(true); }}
          className="w-full flex items-center gap-2.5 bg-[#f2f2f7] rounded-full px-4 py-3.5 text-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="font-satoshi text-[15px] text-gray-400">Places to go, hotels, things to do...</span>
        </button>
      </div>

      {/* Categories */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map(c => (
            <button key={c.label} onClick={() => openCategory(c.query)}
              className="flex flex-col items-center gap-1.5 bg-[#f9f9fb] rounded-2xl py-4 border border-gray-100 active:bg-gray-100 transition-colors">
              <span className="text-2xl">{c.icon}</span>
              <span className="font-satoshi text-[12px] font-500 text-gray-700 text-center">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular destinations */}
      <div className="px-5 mb-3">
        <h2 className="font-serif text-[22px] text-black">Popular destinations</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-8">
        {popular.map(d => (
          <button key={d.id} onClick={() => setDetail(d)}
            className="rounded-2xl overflow-hidden relative text-left active:opacity-90 transition-opacity" style={{ height: 130 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)" }}/>
            <div className="absolute bottom-2.5 left-3">
              <div className="font-serif text-white text-[15px] font-600">{d.name}</div>
              <div className="font-satoshi text-white/70 text-[11px]">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      {showModal && (
        <SearchModal
          initialQuery={modalQuery}
          onClose={() => setShowModal(false)}
          onSelect={d => { setDetail(d); setShowModal(false); }}
        />
      )}
    </div>
  );
}
