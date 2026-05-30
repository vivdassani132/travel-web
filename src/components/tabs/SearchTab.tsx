"use client";
import { useState } from "react";
import SearchModal from "../SearchModal";
import DestinationDetail, { type Dest } from "../DestinationDetail";

const CATEGORY_CONTENT: Record<string, { heading: string; items: { name: string; sub: string; price: string; photo: string; dest: Dest }[] }> = {
  Hotels: {
    heading: "Top hotels worldwide",
    items: [
      { name:"Victoria-Jungfrau Grand Hotel", sub:"Interlaken, Switzerland · ★4.9 · Pool & Spa", price:"from $580/night", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg", dest:{ id:"swiss-alps", name:"Swiss Alps", country:"Switzerland", tags:["Alpine","Skiing"], photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg"} },
      { name:"Palacio Duhau Park Hyatt", sub:"Buenos Aires, Argentina · ★4.8 · Breakfast incl.", price:"from $280/night", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg", dest:{ id:"buenos-aires", name:"Buenos Aires", country:"Argentina", tags:["Culture","Nightlife"], photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg"} },
      { name:"Conrad Maldives Rangali", sub:"Maldives · ★4.9 · Overwater villa, full board", price:"from $620/night", photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg", dest:{ id:"maldives", name:"Maldives", country:"Maldives", tags:["Ocean","Luxury"], photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg"} },
      { name:"Four Seasons Sayan Ubud", sub:"Bali, Indonesia · ★4.9 · Jungle pool, spa", price:"from $680/night", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg", dest:{ id:"bali", name:"Bali", country:"Indonesia", tags:["Jungle","Spiritual"], photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg"} },
      { name:"Hoshinoya Kyoto", sub:"Kyoto, Japan · ★4.9 · River access, kaiseki dining", price:"from $620/night", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg", dest:{ id:"kyoto", name:"Kyoto", country:"Japan", tags:["Temples","Food"], photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg"} },
      { name:"The Standard High Line", sub:"New York, USA · ★4.7 · Rooftop bar, Hudson views", price:"from $380/night", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg", dest:{ id:"new-york", name:"New York", country:"USA", tags:["Urban","Food"], photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg"} },
    ],
  },
  Restaurants: {
    heading: "Top restaurants worldwide",
    items: [
      { name:"Don Julio Parrilla", sub:"Buenos Aires, Argentina · Steakhouse · ★4.9", price:"$$$", photo:"https://i.pinimg.com/1200x/8f/75/53/8f7553ae96ad48825c362566e9887d35.jpg", dest:{ id:"buenos-aires", name:"Buenos Aires", country:"Argentina", tags:["Culture","Food"], photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg"} },
      { name:"Mizai", sub:"Kyoto, Japan · Kaiseki · Michelin 3★", price:"$$$$", photo:"https://i.pinimg.com/1200x/dd/80/48/dd8048c9b412d1f22b5362a311e7dee4.jpg", dest:{ id:"kyoto", name:"Kyoto", country:"Japan", tags:["Temples","Food"], photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg"} },
      { name:"Ithaa Undersea Restaurant", sub:"Maldives · Fine dining 5m underwater · ★4.9", price:"$$$$", photo:"https://i.pinimg.com/1200x/ff/81/2e/ff812eeb3de47219fd44bb24ca5533a4.jpg", dest:{ id:"maldives", name:"Maldives", country:"Maldives", tags:["Ocean","Luxury"], photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg"} },
      { name:"Central Restaurante", sub:"Cusco, Peru · Modern Peruvian · Michelin · ★5.0", price:"$$$$", photo:"https://i.pinimg.com/1200x/5c/7e/7b/5c7e7ba33ff497234805fe5c5dbbc6ae.jpg", dest:{ id:"cusco", name:"Cusco", country:"Peru", tags:["Cultural","Highlands"], photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg"} },
      { name:"Locavore", sub:"Bali, Indonesia · Modern Indonesian · Michelin · ★4.9", price:"$$$$", photo:"https://i.pinimg.com/1200x/a1/fe/09/a1fe09adad1542dab4618e8a96bb27d5.jpg", dest:{ id:"bali", name:"Bali", country:"Indonesia", tags:["Jungle","Food"], photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg"} },
      { name:"Carbone", sub:"New York, USA · Italian-American · ★4.8", price:"$$$$", photo:"https://i.pinimg.com/1200x/ed/f0/cd/edf0cda924a1bdcc9548b6ca8b6e30bf.jpg", dest:{ id:"new-york", name:"New York", country:"USA", tags:["Urban","Food"], photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg"} },
    ],
  },
  "Things to Do": {
    heading: "Top experiences worldwide",
    items: [
      { name:"Jungfraujoch — Top of Europe", sub:"Swiss Alps · Glacier summit at 3,454m", price:"from $180", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg", dest:{ id:"swiss-alps", name:"Swiss Alps", country:"Switzerland", tags:["Alpine","Hiking"], photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg"} },
      { name:"Manta Ray Snorkelling", sub:"Maldives · Hanifaru Bay UNESCO · ★5.0", price:"from $85", photo:"https://i.pinimg.com/1200x/22/52/2f/22522f3a4c9c123606642adb5f13cbb4.jpg", dest:{ id:"maldives", name:"Maldives", country:"Maldives", tags:["Ocean","Nature"], photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg"} },
      { name:"Machu Picchu Full Day Tour", sub:"Cusco, Peru · UNESCO Wonder · ★5.0", price:"from $65", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg", dest:{ id:"cusco", name:"Cusco", country:"Peru", tags:["Cultural","Highlands"], photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg"} },
      { name:"Fushimi Inari Night Walk", sub:"Kyoto, Japan · 10,000 torii gates · ★4.9", price:"Free", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg", dest:{ id:"kyoto", name:"Kyoto", country:"Japan", tags:["Temples","History"], photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg"} },
      { name:"Brooklyn Bridge Walk", sub:"New York, USA · 1.3-mile iconic walk · ★4.9", price:"Free", photo:"https://i.pinimg.com/1200x/57/5a/0c/575a0c80aa5953a97f41681612fc56c8.jpg", dest:{ id:"new-york", name:"New York", country:"USA", tags:["Urban","Sightseeing"], photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg"} },
      { name:"Mount Batur Sunrise Trek", sub:"Bali, Indonesia · Active volcano · ★4.9", price:"from $45", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg", dest:{ id:"bali", name:"Bali", country:"Indonesia", tags:["Adventure","Nature"], photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg"} },
    ],
  },
  "Vacation Rentals": {
    heading: "Unique stays worldwide",
    items: [
      { name:"Chalet — Grindelwald", sub:"Swiss Alps · 6 guests · Fireplace, hot tub", price:"$320/night", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg", dest:{ id:"swiss-alps", name:"Swiss Alps", country:"Switzerland", tags:["Alpine","Chalet"], photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg"} },
      { name:"Private Water Villa", sub:"Maldives · 2 guests · Private pool, glass floor", price:"$480/night", photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg", dest:{ id:"maldives", name:"Maldives", country:"Maldives", tags:["Luxury","Ocean"], photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg"} },
      { name:"Traditional Machiya Townhouse", sub:"Kyoto · 4 guests · Zen garden, Gion district", price:"$180/night", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg", dest:{ id:"kyoto", name:"Kyoto", country:"Japan", tags:["Traditional","Culture"], photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg"} },
      { name:"Palermo Soho Loft", sub:"Buenos Aires · 2 guests · Balcony, WiFi", price:"$85/night", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg", dest:{ id:"buenos-aires", name:"Buenos Aires", country:"Argentina", tags:["City","Loft"], photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg"} },
      { name:"Villa with Private Pool — Ubud", sub:"Bali · 4 guests · Rice field view, chef", price:"$160/night", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg", dest:{ id:"bali", name:"Bali", country:"Indonesia", tags:["Villa","Jungle"], photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg"} },
      { name:"Williamsburg Loft", sub:"New York · 4 guests · Manhattan view, rooftop", price:"$210/night", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg", dest:{ id:"new-york", name:"New York", country:"USA", tags:["Urban","Loft"], photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg"} },
    ],
  },
};

const popular: Dest[] = [
  { id:"bali",       name:"Bali",          country:"Indonesia", tags:["Beach","Temples","Jungle"],    photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
  { id:"maldives",   name:"Maldives",      country:"Maldives",  tags:["Beach","Ocean","Luxury"],      photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
  { id:"kyoto",      name:"Kyoto",         country:"Japan",     tags:["Temples","Food","History"],    photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
  { id:"santorini",  name:"Santorini",     country:"Greece",    tags:["Island","Romantic","Sunset"],  photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  { id:"cusco",      name:"Cusco",         country:"Peru",      tags:["Cultural","Highlands"],        photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
  { id:"newyork",    name:"New York",      country:"USA",       tags:["Urban","Food","Culture"],      photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
];

const categories = ["Hotels","Restaurants","Things to Do","Vacation Rentals"];

export default function SearchTab() {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [detail, setDetail] = useState<Dest | null>(null);

  if (detail) return <DestinationDetail dest={detail} onBack={() => setDetail(null)} />;

  const catContent = activeCategory ? CATEGORY_CONTENT[activeCategory] : null;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white relative">

      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="font-serif text-[30px] text-black mb-4">Search</h1>
        {/* Search bar — opens modal */}
        <button onClick={() => setShowModal(true)}
          className="w-full flex items-center gap-2.5 bg-[#f2f2f7] rounded-full px-4 py-3.5 text-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="font-satoshi text-[15px] text-gray-400">Places to go, hotels, things to do...</span>
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 mb-5">
        <button
          onClick={() => setActiveCategory(null)}
          className="flex-shrink-0 rounded-full px-4 py-2 font-satoshi text-[13px] font-500 transition-colors"
          style={{ background: !activeCategory ? "#000" : "#f2f2f7", color: !activeCategory ? "#fff" : "#555" }}>
          All
        </button>
        {categories.map(c => (
          <button key={c}
            onClick={() => setActiveCategory(c === activeCategory ? null : c)}
            className="flex-shrink-0 rounded-full px-4 py-2 font-satoshi text-[13px] font-500 transition-colors whitespace-nowrap"
            style={{ background: activeCategory === c ? "#000" : "#f2f2f7", color: activeCategory === c ? "#fff" : "#555" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Category content */}
      {catContent ? (
        <div className="px-5 pb-8">
          <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-3">
            {catContent.heading}
          </div>
          <div className="space-y-3">
            {catContent.items.map((item, i) => (
              <button key={i} onClick={() => setDetail(item.dest)}
                className="w-full flex items-stretch gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.05)] text-left active:bg-gray-50 transition-colors">
                <div className="w-[90px] flex-shrink-0 self-stretch overflow-hidden" style={{ minHeight: 88 }}>
                  <img src={item.photo} alt={item.name} className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 py-3 pr-3 flex flex-col justify-center">
                  <div className="font-satoshi text-[14px] font-700 text-gray-900 leading-snug">{item.name}</div>
                  <div className="font-satoshi text-[12px] text-gray-400 mt-0.5 leading-snug">{item.sub}</div>
                  <div className="font-serif text-[15px] text-black mt-1">{item.price}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Popular destinations */}
          <div className="px-5 mb-3">
            <h2 className="font-serif text-[22px] text-black">Popular destinations</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 pb-8">
            {popular.map(d => (
              <button key={d.id} onClick={() => setDetail(d)}
                className="rounded-2xl overflow-hidden relative text-left active:opacity-90" style={{ height: 130 }}>
                <img src={d.photo} alt={d.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)" }}/>
                <div className="absolute bottom-2.5 left-3">
                  <div className="font-serif text-white text-[15px]">{d.name}</div>
                  <div className="font-satoshi text-white/70 text-[11px]">{d.country}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Full-screen search modal */}
      {showModal && (
        <SearchModal
          onClose={() => setShowModal(false)}
          onSelect={d => { setDetail(d); setShowModal(false); }}
        />
      )}
    </div>
  );
}
