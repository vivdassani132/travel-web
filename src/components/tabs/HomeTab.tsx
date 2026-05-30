"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import DestinationDetail from "../DestinationDetail";
import SearchModal from "../SearchModal";
import NotificationsPanel from "../NotificationsPanel";

// ── Image library (user-provided) ──────────────────────────────────
const IMGS = {
  bus:        "https://i.pinimg.com/1200x/9f/8d/ee/9f8deee3f62efe64251986d5ab3c07b5.jpg",
  highway:    "https://i.pinimg.com/1200x/57/5a/0c/575a0c80aa5953a97f41681612fc56c8.jpg",
  gasStation: "https://i.pinimg.com/1200x/49/dc/61/49dc61147e167cac642dd852181dc152.jpg",
  nightStreet:"https://i.pinimg.com/1200x/65/2e/96/652e96ed2ef95f0f3f180ba2f2b7aca8.jpg",
  airport:    "https://i.pinimg.com/originals/51/0a/1c/510a1cb191832030ae8c7987c83690ef.gif",
  volleyball: "https://i.pinimg.com/1200x/06/73/37/06733753b5b9d3deb1e4b400890dd94c.jpg",
  palmBeach:  "https://i.pinimg.com/1200x/2a/b2/47/2ab247c17fd63526c7314b4312b96c9a.jpg",
  swimming:   "https://i.pinimg.com/1200x/22/52/2f/22522f3a4c9c123606642adb5f13cbb4.jpg",
  palmRelax:  "https://i.pinimg.com/1200x/e3/bb/e5/e3bbe576e391961dbf22d726835ebc33.jpg",
  paddle:     "https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg",
  beach:      "https://i.pinimg.com/1200x/39/96/1b/39961ba2482a782a93a5e9115547cfae.jpg",
  desert:     "https://i.pinimg.com/1200x/d6/2e/b0/d62eb01dd273ed5bb9fb30659314bc7f.jpg",
  diner:      "https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg",
  breakfast:  "https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg",
  burger:     "https://i.pinimg.com/1200x/93/2c/d8/932cd838a96c258d43c96d0826b40f3d.jpg",
  busNight:   "https://i.pinimg.com/736x/e5/0e/c9/e50ec9c6610d22c43f35ba8dea192a64.jpg",
  streetFood: "https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg",
};

// ── Destination photos (previous set) ──────────────────────────────
const DEST = {
  maldives:  "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg",
  bali:      "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg",
  kyoto:     "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg",
  peru:      "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg",
  nyc:       "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg",
  mountains: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg",
  rainforest:"https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg",
  argentina: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg",
  russia:    "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg",
  villa:     "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg",
};

// ── Trip templates keyed by primary interest ────────────────────────
const TRIP_TEMPLATES: Record<string, TripTemplate> = {
  "Coastal & Ocean": {
    name: "Maldives", country: "Maldives", hero: DEST.maldives, dates: "Dec 26 – Jan 2", days: 7,
    days_plan: [
      { day: 1, title: "Arrival Day", events: [
        { time: "09:00", label: "Fly out", note: "Catch your morning flight", img: IMGS.airport },
        { time: "15:00", label: "Check in", note: "Overwater bungalow, settle in", img: DEST.villa },
        { time: "18:30", label: "Sunset dinner", note: "Seafood on the deck", img: IMGS.diner },
      ]},
      { day: 2, title: "Ocean Day", events: [
        { time: "08:00", label: "Breakfast", note: "Tropical fruit platter", img: IMGS.breakfast },
        { time: "10:00", label: "Paddleboarding", note: "Crystal-clear lagoon", img: IMGS.paddle },
        { time: "13:00", label: "Snorkel lunch", note: "Reef picnic stop", img: IMGS.swimming },
        { time: "16:00", label: "Beach relax", note: "Palm tree hammock hour", img: IMGS.palmRelax },
        { time: "20:00", label: "Night eats", note: "Street market by the dock", img: IMGS.streetFood },
      ]},
      { day: 3, title: "Island Hop", events: [
        { time: "09:00", label: "Breakfast", note: "Hotel buffet, stack those pancakes", img: IMGS.breakfast },
        { time: "11:00", label: "Island hopping", note: "Speed boat to neighbouring atolls", img: IMGS.palmBeach },
        { time: "14:00", label: "Volleyball", note: "Beach games with locals", img: IMGS.volleyball },
        { time: "17:00", label: "Drive back", note: "Coastal road transfer", img: IMGS.highway },
        { time: "20:00", label: "Dinner", note: "Burgers at the beach bar", img: IMGS.burger },
      ]},
    ],
  },
  "Tropical Island": {
    name: "Bali", country: "Indonesia", hero: DEST.bali, dates: "Jan 5 – 12", days: 7,
    days_plan: [
      { day: 1, title: "Arrival & Chill", events: [
        { time: "10:00", label: "Land in Denpasar", note: "Grab bags, head to Seminyak", img: IMGS.airport },
        { time: "15:00", label: "Hotel & pool", note: "Tropical villa check-in", img: DEST.villa },
        { time: "19:00", label: "Street food", note: "Nasi goreng & satay", img: IMGS.streetFood },
      ]},
      { day: 2, title: "Beach & Surf", events: [
        { time: "07:30", label: "Breakfast", note: "Açaí bowl at the beach", img: IMGS.breakfast },
        { time: "09:00", label: "Surf lesson", note: "Kuta beach with an instructor", img: IMGS.swimming },
        { time: "13:00", label: "Lunch", note: "Warungs burgers by the shore", img: IMGS.burger },
        { time: "16:00", label: "Paddle out", note: "SUP through rice-paddy canals", img: IMGS.paddle },
        { time: "21:00", label: "Night out", note: "Legian strip lights up", img: IMGS.nightStreet },
      ]},
    ],
  },
  "Alpine & Highland": {
    name: "Swiss Alps", country: "Switzerland", hero: DEST.mountains, dates: "Feb 1 – 8", days: 7,
    days_plan: [
      { day: 1, title: "Alpine Arrival", events: [
        { time: "08:00", label: "Fly to Zürich", note: "Morning flight, window seat", img: IMGS.airport },
        { time: "14:00", label: "Train to Interlaken", note: "Scenic rail through the alps", img: IMGS.highway },
        { time: "19:00", label: "Dinner", note: "Swiss fondue & raclette", img: IMGS.diner },
      ]},
      { day: 2, title: "Peaks & Trails", events: [
        { time: "07:00", label: "Breakfast", note: "Müsli & coffee at the lodge", img: IMGS.breakfast },
        { time: "09:00", label: "Hike Schynige Platte", note: "Ridge trail with peak views", img: DEST.mountains },
        { time: "14:00", label: "Gas stop + snacks", note: "Roadside pit stop on the way back", img: IMGS.gasStation },
        { time: "20:00", label: "Night bus back", note: "Cozy late ride to town", img: IMGS.busNight },
      ]},
    ],
  },
  "Rainforest & Jungle": {
    name: "Amazon & Rio", country: "Brazil", hero: DEST.rainforest, dates: "Mar 3 – 10", days: 7,
    days_plan: [
      { day: 1, title: "Into the Jungle", events: [
        { time: "07:00", label: "Fly to Manaus", note: "Gateway to the Amazon", img: IMGS.airport },
        { time: "13:00", label: "River transfer", note: "Boat into the rainforest", img: DEST.rainforest },
        { time: "20:00", label: "Camp dinner", note: "Jungle-side food stall", img: IMGS.streetFood },
      ]},
      { day: 2, title: "Deep Forest Day", events: [
        { time: "06:00", label: "Dawn hike", note: "Spider monkeys & canopy walk", img: DEST.rainforest },
        { time: "12:00", label: "Lunch", note: "Grilled pirarucu fish + burger fix", img: IMGS.burger },
        { time: "15:00", label: "River swim", note: "Pink dolphins in the Rio Negro", img: IMGS.swimming },
        { time: "18:00", label: "Drive back", note: "Dirt road highway transfer", img: IMGS.highway },
        { time: "21:00", label: "Night street food", note: "Açaí & churrasco", img: IMGS.nightStreet },
      ]},
    ],
  },
  "Urban Landscape": {
    name: "New York", country: "USA", hero: DEST.nyc, dates: "Apr 10 – 15", days: 5,
    days_plan: [
      { day: 1, title: "NYC Arrival", events: [
        { time: "09:00", label: "JFK landing", note: "Grab a yellow cab to Manhattan", img: IMGS.airport },
        { time: "14:00", label: "Hotel drop-off", note: "Midtown, drop your bags", img: DEST.nyc },
        { time: "20:00", label: "Night walk", note: "Times Square at night", img: IMGS.nightStreet },
      ]},
      { day: 2, title: "City Explorer", events: [
        { time: "08:00", label: "Diner breakfast", note: "Classic NYC diner stack", img: IMGS.breakfast },
        { time: "10:00", label: "Central Park", note: "Morning jog or bike ride", img: IMGS.palmBeach },
        { time: "13:00", label: "Lunch", note: "Shake Shack in Madison Sq.", img: IMGS.burger },
        { time: "16:00", label: "Bus uptown", note: "M10 bus along Riverside Drive", img: IMGS.bus },
        { time: "21:00", label: "Dinner", note: "Little Italy, actual pasta", img: IMGS.diner },
      ]},
      { day: 3, title: "Boroughs Day", events: [
        { time: "09:00", label: "Breakfast", note: "Brooklyn bagel, no arguments", img: IMGS.breakfast },
        { time: "11:00", label: "Highway drive", note: "Rent a car, head to the Catskills", img: IMGS.highway },
        { time: "18:00", label: "Gas & snacks", note: "Small-town stop on the way back", img: IMGS.gasStation },
        { time: "22:00", label: "Night bus home", note: "Late Greyhound back to the city", img: IMGS.busNight },
      ]},
    ],
  },
  "Hot Arid Desert": {
    name: "Moroccan Desert", country: "Morocco", hero: IMGS.desert, dates: "Feb 14 – 20", days: 6,
    days_plan: [
      { day: 1, title: "Marrakech Landing", events: [
        { time: "10:00", label: "Arrive Marrakech", note: "Medina hotel, riad vibes", img: IMGS.airport },
        { time: "15:00", label: "Souk wander", note: "Djemaa el-Fna market", img: IMGS.streetFood },
        { time: "21:00", label: "Night eats", note: "Tagine under the stars", img: IMGS.diner },
      ]},
      { day: 2, title: "Sahara Push", events: [
        { time: "06:00", label: "Breakfast + pack", note: "Mint tea & msemen", img: IMGS.breakfast },
        { time: "08:00", label: "Highway south", note: "Long desert drive to Merzouga", img: IMGS.highway },
        { time: "14:00", label: "Gas stop", note: "Rural outpost, cold drink", img: IMGS.gasStation },
        { time: "17:00", label: "Into the desert", note: "Camel trek to camp", img: IMGS.desert },
        { time: "21:00", label: "Camp dinner", note: "Berber feast around the fire", img: IMGS.burger },
      ]},
    ],
  },
};

// Default fallback
const DEFAULT_TRIP = TRIP_TEMPLATES["Coastal & Ocean"];

interface TripTemplate {
  name: string; country: string; hero: string; dates: string; days: number;
  days_plan: { day: number; title: string; events: { time: string; label: string; note: string; img: string }[] }[];
}

const DISCOVER = [
  { id:"cusco",  name:"Cusco",   country:"Peru",      tags:["Cultural","Highlands"], photo: DEST.peru },
  { id:"kyoto",  name:"Kyoto",   country:"Japan",     tags:["Temples","Food"],       photo: DEST.kyoto },
  { id:"ba",     name:"B. Aires",country:"Argentina", tags:["Nightlife","Culture"],  photo: DEST.argentina },
  { id:"russia", name:"Moscow",  country:"Russia",    tags:["History","Winter"],     photo: DEST.russia },
];

type Dest = typeof DISCOVER[0];

export default function HomeTab() {
  const { profile } = useStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [detail, setDetail] = useState<Dest | null>(null);
  const [liked, setLiked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("compass_liked") || "[]")); } catch { return new Set(); }
  });
  const [activeDay, setActiveDay] = useState(0);

  // Pick trip based on first interest biome
  const primaryInterest = profile.interests[0] || "Coastal & Ocean";
  const trip: TripTemplate = TRIP_TEMPLATES[primaryInterest] || DEFAULT_TRIP;
  const dayPlan = trip.days_plan[activeDay];

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLiked(s => {
      const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id);
      try { localStorage.setItem("compass_liked", JSON.stringify([...n])); } catch {}
      return n;
    });
  };

  if (detail) return <DestinationDetail dest={detail} onBack={() => setDetail(null)} />;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white relative">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6"/>
              <path d="M16.5 7.5l-3 6-6 3 3-6 6-3z" fill="white"/>
              <circle cx="12" cy="12" r="1.5" fill="black"/>
            </svg>
          </div>
          <span className="font-serif text-[22px] text-black">Compass</span>
        </div>
        <button onClick={() => setShowNotifs(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f5f5f5] relative">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black border-2 border-white" />
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-5 mb-6">
        <button onClick={() => setShowSearch(true)}
          className="w-full flex items-center gap-3 bg-[#f5f5f5] rounded-2xl px-4 py-3.5 text-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
          <span className="font-satoshi text-[15px] text-gray-400">Destinations, hotels, experiences...</span>
        </button>
      </div>

      {/* ── Your Trip Plan ── */}
      <div className="px-5 mb-2">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-satoshi text-[12px] font-600 text-gray-400 uppercase tracking-wider mb-1">Your trip, curated</div>
            <h2 className="font-serif text-[28px] text-black leading-none">{trip.name}</h2>
            <div className="font-satoshi text-[13px] text-gray-400 mt-0.5">{trip.country} · {trip.dates} · {trip.days} days</div>
          </div>
          <button className="font-satoshi text-[13px] font-600 text-gray-900 border border-gray-200 rounded-full px-3 py-1.5 mb-0.5">
            Switch
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="mx-5 mt-3 rounded-3xl overflow-hidden relative" style={{ height: 200 }}>
        <img src={trip.hero} alt={trip.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 30%, transparent)" }}/>
        <div className="absolute bottom-4 left-4">
          <div className="font-serif text-white text-[26px] leading-none">{trip.name}</div>
          <div className="font-satoshi text-white/70 text-[13px] mt-0.5">{trip.country}</div>
        </div>
        <div className="absolute top-3 right-3 bg-white/95 rounded-full px-2.5 py-1">
          <span className="font-satoshi text-[11px] font-600 text-gray-800">
            {profile.travelStyle || "Explorer"} · {profile.budget || "Mid-range"}
          </span>
        </div>
      </div>

      {/* ── Day selector ── */}
      <div className="px-5 mt-5 mb-3">
        <h3 className="font-serif text-[20px] text-black mb-3">Your itinerary</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {trip.days_plan.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)}
              className="flex-shrink-0 rounded-full px-3.5 py-1.5 font-satoshi text-[13px] font-600 transition-all"
              style={{ background: activeDay === i ? "#000" : "#f5f5f5", color: activeDay === i ? "#fff" : "#555" }}>
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* ── Day plan ── */}
      {dayPlan && (
        <div className="px-5 mb-6">
          <div className="font-satoshi text-[14px] font-600 text-gray-500 mb-3">{dayPlan.title}</div>
          <div className="space-y-3">
            {dayPlan.events.map((ev, i) => (
              <div key={i} className="flex gap-3 rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
                {/* Photo */}
                <div className="w-[90px] h-[80px] flex-shrink-0 overflow-hidden">
                  <img src={ev.img} alt={ev.label} className="w-full h-full object-cover"/>
                </div>
                {/* Info */}
                <div className="flex-1 py-2.5 pr-3 flex flex-col justify-center">
                  <div className="font-satoshi text-[11px] text-gray-400">{ev.time}</div>
                  <div className="font-satoshi text-[14px] font-700 text-gray-900 leading-snug">{ev.label}</div>
                  <div className="font-satoshi text-[12px] text-gray-400 mt-0.5">{ev.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Discover more ── */}
      <div className="px-5 mb-4">
        <h2 className="font-serif text-[24px] text-black">Also worth exploring</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        {DISCOVER.map(d => (
          <button key={d.id} onClick={() => setDetail(d)}
            className="flex-shrink-0 w-[240px] rounded-3xl overflow-hidden relative text-left"
            style={{ height: 280 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.04) 80%)" }}/>
            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 flex-wrap justify-end">
              {d.tags.map(t => (
                <span key={t} className="font-satoshi bg-white/95 rounded-full px-2 py-[4px] text-[10px] font-600 text-gray-800">{t}</span>
              ))}
            </div>
            <button onClick={e => toggleLike(e, d.id)}
              className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked.has(d.id) ? "#ff2d55" : "none"}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
              </svg>
            </button>
            <div className="absolute bottom-4 left-4">
              <div className="font-serif text-white text-[22px] leading-none">{d.name}</div>
              <div className="font-satoshi text-white/70 text-[12px] mt-0.5">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-28" />

      {showSearch  && <SearchModal onClose={() => setShowSearch(false)} />}
      {showNotifs  && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
    </div>
  );
}
