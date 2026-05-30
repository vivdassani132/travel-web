"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import DestinationDetail from "../DestinationDetail";
import SearchModal from "../SearchModal";
import NotificationsPanel from "../NotificationsPanel";

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
const DEST = {
  maldives:   "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg",
  bali:       "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg",
  kyoto:      "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg",
  peru:       "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg",
  nyc:        "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg",
  mountains:  "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg",
  rainforest: "https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg",
  argentina:  "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg",
  russia:     "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg",
  villa:      "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg",
};

type CostLine = { label: string; cost: string };
type Activity = {
  time: string; label: string; note: string; img: string; type: string;
  cost: string; breakdown: CostLine[];
};
type DayPlan = { day: number; title: string; total: string; events: Activity[] };
type Trip = { name: string; country: string; hero: string; dates: string; days: number; totalCost: string; days_plan: DayPlan[] };

const TRIPS: Record<string, Trip> = {
  "Pampas & Steppe": {
    name:"Buenos Aires", country:"Argentina", hero:DEST.argentina, dates:"Dec 26 – Jan 2", days:7, totalCost:"$3,240",
    days_plan:[
      { day:1, title:"Arrival & First Night", total:"$412", events:[
        { time:"08:30", label:"Flight to Buenos Aires", note:"JFK → EZE, 10h 30m, LATAM Airlines", img:IMGS.airport, type:"flight", cost:"$980 return",
          breakdown:[{ label:"Economy class (return)", cost:"$980" },{ label:"Seat selection", cost:"$18" },{ label:"Checked bag", cost:"$30" }] },
        { time:"16:00", label:"Check in — Palermo boutique hotel", note:"Hotel Esplendor by Wyndham, Palermo Soho", img:DEST.villa, type:"hotel", cost:"$140/night",
          breakdown:[{ label:"Room (7 nights × $140)", cost:"$980" },{ label:"City tax", cost:"$12/night" },{ label:"Breakfast included", cost:"free" }] },
        { time:"18:00", label:"Walk Palermo Soho", note:"Street art, vintage shops, neighbourhood vibe", img:DEST.argentina, type:"activity", cost:"Free",
          breakdown:[{ label:"Self-guided walk", cost:"Free" },{ label:"Neighborhood map", cost:"Free" }] },
        { time:"20:30", label:"Dinner — Don Julio Parrilla", note:"#1 steakhouse in BA. Book ahead. Malbec included.", img:IMGS.diner, type:"food", cost:"$62/person",
          breakdown:[{ label:"Bife de chorizo (ribeye)", cost:"$28" },{ label:"Malbec bottle", cost:"$22" },{ label:"Empanadas starter", cost:"$8" },{ label:"Dessert", cost:"$4" }] },
        { time:"23:00", label:"Milonga at La Viruta", note:"Tango club in Palermo. Live band Thursdays.", img:IMGS.nightStreet, type:"activity", cost:"$20",
          breakdown:[{ label:"Entry fee", cost:"$20" },{ label:"Tango lesson (optional)", cost:"$30" },{ label:"Drinks", cost:"~$12" }] },
      ]},
      { day:2, title:"City & Fútbol", total:"$138", events:[
        { time:"07:30", label:"Breakfast — Café Tortoni", note:"Buenos Aires' most famous café since 1858", img:IMGS.breakfast, type:"food", cost:"$14",
          breakdown:[{ label:"Medialunas (croissants) × 3", cost:"$5" },{ label:"Cortado coffee", cost:"$4" },{ label:"Tostadas con manteca", cost:"$5" }] },
        { time:"09:30", label:"Plaza de Mayo & Casa Rosada", note:"Iconic pink presidential palace. Free guided tour.", img:DEST.argentina, type:"activity", cost:"Free",
          breakdown:[{ label:"Guided tour (public)", cost:"Free" },{ label:"Audio guide (optional)", cost:"$6" }] },
        { time:"11:00", label:"La Boca — Caminito street", note:"Colorful houses, tango dancers, local art market", img:DEST.argentina, type:"activity", cost:"Free",
          breakdown:[{ label:"Entrance", cost:"Free" },{ label:"Souvenir tango figurines", cost:"~$15" }] },
        { time:"13:30", label:"Lunch — El Obrero", note:"100-year-old restaurant. Cash only. Locals only.", img:IMGS.burger, type:"food", cost:"$22",
          breakdown:[{ label:"Milanesa napolitana", cost:"$12" },{ label:"Papas fritas", cost:"$4" },{ label:"Quilmes beer × 2", cost:"$6" }] },
        { time:"16:00", label:"⚽ Boca Juniors vs River Plate", note:"El Superclásico. Estadio Alberto J. Armando. Biggest derby on earth.", img:IMGS.volleyball, type:"activity", cost:"$85",
          breakdown:[{ label:"Match ticket (popular stand)", cost:"$85" },{ label:"Bus to La Boca", cost:"$1.50" },{ label:"Pre-match beer + empanadas", cost:"$10" }] },
        { time:"21:30", label:"Asado street food", note:"Post-match street parilla near the stadium", img:IMGS.streetFood, type:"food", cost:"$17",
          breakdown:[{ label:"Choripán (chorizo sandwich)", cost:"$5" },{ label:"Morcilla (blood sausage)", cost:"$4" },{ label:"Craft beer × 2", cost:"$8" }] },
      ]},
      { day:3, title:"Day Trip & Culture", total:"$89", events:[
        { time:"08:00", label:"Breakfast at hotel", note:"Included with stay", img:IMGS.breakfast, type:"food", cost:"Included",
          breakdown:[{ label:"Full buffet breakfast", cost:"Included in room" }] },
        { time:"09:30", label:"Recoleta Cemetery", note:"Eva Perón's tomb. Stunning mausoleums. 2h walk.", img:DEST.argentina, type:"activity", cost:"Free",
          breakdown:[{ label:"Entrance", cost:"Free" },{ label:"Official guide (optional)", cost:"$15" }] },
        { time:"12:00", label:"Empanadas lunch", note:"El Federal, San Telmo. Oldest bar in BA.", img:IMGS.streetFood, type:"food", cost:"$18",
          breakdown:[{ label:"Empanadas × 4 (mixed)", cost:"$10" },{ label:"Provoleta (grilled cheese)", cost:"$5" },{ label:"Fernet & cola", cost:"$3" }] },
        { time:"14:00", label:"Tigre Delta boat tour", note:"45-min train + river delta boat through jungle waterways", img:IMGS.paddle, type:"activity", cost:"$38",
          breakdown:[{ label:"Train to Tigre (return)", cost:"$3" },{ label:"Delta boat tour 2h", cost:"$30" },{ label:"Mate & snacks on board", cost:"$5" }] },
        { time:"18:00", label:"Drive back on Panamerican", note:"Catch the sunset over the delta wetlands", img:IMGS.highway, type:"transport", cost:"$8",
          breakdown:[{ label:"Return bus/train", cost:"$3" },{ label:"Taxi home", cost:"$5" }] },
        { time:"21:00", label:"Rooftop cocktails + dinner", note:"Florería Atlántico, Retiro. World's best bars list.", img:IMGS.nightStreet, type:"food", cost:"$45",
          breakdown:[{ label:"Signature cocktails × 2", cost:"$24" },{ label:"Tapas sharing plate", cost:"$21" }] },
      ]},
    ],
  },
  "Coastal & Ocean": {
    name:"Maldives", country:"Maldives", hero:DEST.maldives, dates:"Jan 5 – 12", days:7, totalCost:"$5,890",
    days_plan:[
      { day:1, title:"Arrival & Settle In", total:"$1,380", events:[
        { time:"06:00", label:"Flight to Malé", note:"JFK → MLE via Dubai. 16h total. Emirates.", img:IMGS.airport, type:"flight", cost:"$1,240 return",
          breakdown:[{ label:"Economy return (Emirates)", cost:"$1,240" },{ label:"Lounge access (DXB)", cost:"$35" },{ label:"Checked bags × 2", cost:"$0 (included)" }] },
        { time:"16:00", label:"Seaplane to resort", note:"Twin Otter over atolls. 25-min flight. Unforgettable.", img:IMGS.palmBeach, type:"transport", cost:"$140",
          breakdown:[{ label:"Seaplane transfer (return)", cost:"$140" },{ label:"Speedboat alternative", cost:"$30 cheaper" }] },
        { time:"18:00", label:"Overwater bungalow check-in", note:"Private deck, glass floor, direct lagoon access", img:DEST.villa, type:"hotel", cost:"$620/night",
          breakdown:[{ label:"Overwater bungalow × 7 nights", cost:"$4,340" },{ label:"Full board (meals included)", cost:"$180/night" },{ label:"Resort fee", cost:"$25/night" }] },
        { time:"19:30", label:"Welcome dinner on the deck", note:"Grilled lobster, barefoot on the sand", img:IMGS.diner, type:"food", cost:"Included",
          breakdown:[{ label:"Dinner (full board)", cost:"Included in hotel" },{ label:"Champagne upgrade", cost:"$45" }] },
      ]},
      { day:2, title:"Ocean Day", total:"$210", events:[
        { time:"07:30", label:"Breakfast — tropical fruit platter", note:"Açaí, dragonfruit, fresh coconut at the beach", img:IMGS.breakfast, type:"food", cost:"Included",
          breakdown:[{ label:"Full breakfast (full board)", cost:"Included" },{ label:"Fresh coconut water", cost:"$4" }] },
        { time:"09:30", label:"Snorkelling with manta rays", note:"Hanifaru Bay UNESCO biosphere — manta season Dec-May", img:IMGS.swimming, type:"activity", cost:"$85",
          breakdown:[{ label:"Guided snorkel excursion", cost:"$85" },{ label:"Equipment hire", cost:"Included" },{ label:"Underwater camera rental", cost:"$30" }] },
        { time:"12:30", label:"Sandbank picnic lunch", note:"Private sandbank in the middle of the atoll", img:IMGS.beach, type:"food", cost:"Included",
          breakdown:[{ label:"Packed picnic lunch", cost:"Included in board" },{ label:"Speedboat to sandbank", cost:"$20" }] },
        { time:"14:30", label:"Paddleboard around the lagoon", note:"Crystal clear water, coral beneath you", img:IMGS.paddle, type:"activity", cost:"Free",
          breakdown:[{ label:"SUP hire (resort)", cost:"Free with stay" },{ label:"Kayak alternative", cost:"Free" }] },
        { time:"16:30", label:"Relax under the palms", note:"Hammock time. Compulsory.", img:IMGS.palmRelax, type:"activity", cost:"Free",
          breakdown:[{ label:"Hammock", cost:"Free" },{ label:"Cocktail from beach bar", cost:"$18" }] },
        { time:"20:00", label:"Dinner — underwater restaurant", note:"Ithaa Undersea Restaurant. 5m below sea level.", img:IMGS.streetFood, type:"food", cost:"$300",
          breakdown:[{ label:"5-course tasting menu", cost:"$260" },{ label:"Wine pairing", cost:"$40" },{ label:"Reservation required", cost:"Book 3mo ahead" }] },
      ]},
      { day:3, title:"Island Hopping", total:"$175", events:[
        { time:"08:00", label:"Breakfast + pack daypack", note:"Grab snacks for the trip", img:IMGS.breakfast, type:"food", cost:"Included",
          breakdown:[{ label:"Breakfast (full board)", cost:"Included" }] },
        { time:"10:00", label:"Speedboat to local island", note:"Maafushi — local life, no resort prices", img:IMGS.palmBeach, type:"transport", cost:"$25",
          breakdown:[{ label:"Speedboat charter (return)", cost:"$25" },{ label:"Bike hire on island", cost:"$5" }] },
        { time:"12:00", label:"Street food lunch", note:"Fish curry, roshi bread, samosas at local café", img:IMGS.streetFood, type:"food", cost:"$8",
          breakdown:[{ label:"Fish curry + rice", cost:"$4" },{ label:"Samosas × 3", cost:"$2" },{ label:"Fresh lime juice", cost:"$2" }] },
        { time:"14:00", label:"Beach volleyball", note:"Join the local team. They will destroy you. Have fun.", img:IMGS.volleyball, type:"activity", cost:"Free",
          breakdown:[{ label:"Join local game", cost:"Free" },{ label:"Drinks after", cost:"$6" }] },
        { time:"16:00", label:"Swimming at bikini beach", note:"Only public beach on island with swimming allowed", img:IMGS.swimming, type:"activity", cost:"Free",
          breakdown:[{ label:"Entrance", cost:"Free" },{ label:"Snorkel hire", cost:"$5" }] },
        { time:"19:00", label:"Sunset cruise", note:"Dhoni boat, dolphins at golden hour", img:IMGS.paddle, type:"activity", cost:"$65",
          breakdown:[{ label:"Sunset dolphin cruise 2h", cost:"$65" },{ label:"Cocktails on board", cost:"$15" }] },
      ]},
    ],
  },
  "Alpine & Highland": {
    name:"Swiss Alps", country:"Switzerland", hero:DEST.mountains, dates:"Feb 1–8", days:7, totalCost:"$4,620",
    days_plan:[
      { day:1, title:"Alpine Arrival", total:"$320", events:[
        { time:"07:00", label:"Flight to Zurich", note:"JFK → ZRH, 8h, Swiss Air", img:IMGS.airport, type:"flight", cost:"$980 return",
          breakdown:[{ label:"Economy return (Swiss Air)", cost:"$980" },{ label:"Seat selection", cost:"$24" }] },
        { time:"14:00", label:"Scenic rail — Zurich to Interlaken", note:"GoldenPass Line through emerald valleys. Window seat essential.", img:IMGS.highway, type:"transport", cost:"$58",
          breakdown:[{ label:"1st class rail (return)", cost:"$58" },{ label:"Swiss Rail Pass (3-day)", cost:"$140" }] },
        { time:"17:00", label:"Hotel in Interlaken", note:"Victoria Jungfrau Grand Hotel. Lake + Alps view.", img:DEST.mountains, type:"hotel", cost:"$280/night",
          breakdown:[{ label:"Standard room × 7 nights", cost:"$1,960" },{ label:"Spa access (included)", cost:"Free" },{ label:"Breakfast buffet", cost:"$38/day" }] },
        { time:"20:00", label:"Fondue dinner in town", note:"Restaurant Schuh. Moitié-moitié with local Fendant wine.", img:IMGS.diner, type:"food", cost:"$52",
          breakdown:[{ label:"Cheese fondue for 2", cost:"$38" },{ label:"Fendant white wine", cost:"$14" }] },
      ]},
      { day:2, title:"Jungfraujoch Summit", total:"$280", events:[
        { time:"06:30", label:"Breakfast + early start", note:"Get there before tour groups", img:IMGS.breakfast, type:"food", cost:"$38",
          breakdown:[{ label:"Hotel buffet breakfast", cost:"$38 (included in stay option)" }] },
        { time:"08:00", label:"Cogwheel train to Jungfraujoch", note:"Top of Europe — 3,454m. Views of Aletsch glacier.", img:IMGS.bus, type:"transport", cost:"$180",
          breakdown:[{ label:"Return cogwheel rail ticket", cost:"$180" },{ label:"Optional ice palace entry", cost:"$12" }] },
        { time:"11:00", label:"Summit hike & glacier walk", note:"1h loop on the glacier. Crampons provided.", img:DEST.mountains, type:"activity", cost:"Free",
          breakdown:[{ label:"Glacier walk (with guide)", cost:"Free with rail ticket" },{ label:"Crampons rental", cost:"$15" }] },
        { time:"13:00", label:"Lunch at Lindt Chocolate Heaven", note:"On the summit. Yes, really.", img:IMGS.burger, type:"food", cost:"$28",
          breakdown:[{ label:"Alpine mac & cheese", cost:"$18" },{ label:"Lindt hot chocolate", cost:"$6" },{ label:"Chocolate takeaway", cost:"$14" }] },
        { time:"15:30", label:"Grindelwald village explore", note:"Ski town charm. Browse outdoor gear, stop for Käseschnitte.", img:DEST.mountains, type:"activity", cost:"Free",
          breakdown:[{ label:"Village wander", cost:"Free" },{ label:"Käseschnitte (cheese toast snack)", cost:"$12" }] },
        { time:"19:00", label:"Night bus back", note:"Cozy train back to Interlaken", img:IMGS.busNight, type:"transport", cost:"$8",
          breakdown:[{ label:"Evening train back", cost:"$8" }] },
        { time:"21:00", label:"Raclette dinner", note:"Tüfi Stübli. Melted cheese scraped tableside.", img:IMGS.diner, type:"food", cost:"$44",
          breakdown:[{ label:"Raclette for 2 (3 rounds)", cost:"$36" },{ label:"Local beer", cost:"$8" }] },
      ]},
    ],
  },
  "Rainforest & Jungle": {
    name:"Manaus & Amazon", country:"Brazil", hero:DEST.rainforest, dates:"Mar 3–10", days:7, totalCost:"$2,980",
    days_plan:[
      { day:1, title:"Into the Amazon", total:"$420", events:[
        { time:"07:00", label:"Flight to Manaus", note:"JFK → MIA → MAO. 12h total.", img:IMGS.airport, type:"flight", cost:"$840 return",
          breakdown:[{ label:"Economy return", cost:"$840" },{ label:"Miami layover 2h", cost:"$0" }] },
        { time:"16:00", label:"River transfer into jungle", note:"30-min speedboat up Rio Negro to the lodge", img:IMGS.paddle, type:"transport", cost:"$45",
          breakdown:[{ label:"Speedboat to lodge (return)", cost:"$45" },{ label:"Porter service", cost:"$10" }] },
        { time:"18:00", label:"Jungle eco-lodge check in", note:"Anavilhanas Lodge. Solar power, no A/C, pure nature.", img:DEST.rainforest, type:"hotel", cost:"$180/night",
          breakdown:[{ label:"Eco-lodge × 7 nights", cost:"$1,260" },{ label:"All meals included", cost:"Included" },{ label:"All excursions included", cost:"Included" }] },
        { time:"20:00", label:"Night canoe — alligator spotting", note:"Paddle in darkness. Guide spots caiman eyes with flashlight.", img:IMGS.swimming, type:"activity", cost:"Included",
          breakdown:[{ label:"Night canoe (included in lodge)", cost:"Included" },{ label:"Guide tip (recommended)", cost:"$20" }] },
      ]},
      { day:2, title:"Deep Forest Day", total:"$0 (lodge incl.)", events:[
        { time:"05:30", label:"Dawn jungle hike", note:"Spider monkeys, toucans, canopy walkway", img:DEST.rainforest, type:"activity", cost:"Included",
          breakdown:[{ label:"Guided hike (included)", cost:"Included" },{ label:"Insect repellent (bring your own)", cost:"$8" }] },
        { time:"08:00", label:"Breakfast at the lodge", note:"Tropical fruit, açaí, cassava bread, tapioca", img:IMGS.breakfast, type:"food", cost:"Included",
          breakdown:[{ label:"Full breakfast (included)", cost:"Included" }] },
        { time:"10:00", label:"Piranha fishing", note:"Catch and release. Also terrifying.", img:IMGS.volleyball, type:"activity", cost:"Included",
          breakdown:[{ label:"Guided fishing session 2h", cost:"Included" },{ label:"Rod & bait", cost:"Included" }] },
        { time:"13:00", label:"River swim with pink dolphins", note:"Fresh water, no ocean sharks. Boto dolphins are curious.", img:IMGS.swimming, type:"activity", cost:"Included",
          breakdown:[{ label:"Dolphin swim session", cost:"Included" },{ label:"Life vest", cost:"Included" }] },
        { time:"15:00", label:"Jungle road expedition", note:"4x4 into secondary forest roads", img:IMGS.highway, type:"transport", cost:"Included",
          breakdown:[{ label:"4x4 expedition (included)", cost:"Included" }] },
        { time:"19:00", label:"Gas stop snacks", note:"Rural outpost on the way back. Cold guaraná.", img:IMGS.gasStation, type:"food", cost:"$5",
          breakdown:[{ label:"Guaraná Antarctica × 2", cost:"$3" },{ label:"Brigadeiro sweets", cost:"$2" }] },
        { time:"21:00", label:"Açaí & Churrasco street night", note:"Back in Manaus, street market by the port", img:IMGS.streetFood, type:"food", cost:"$14",
          breakdown:[{ label:"Churrasco plate", cost:"$8" },{ label:"Açaí bowl", cost:"$4" },{ label:"Caipirinha", cost:"$4" }] },
      ]},
    ],
  },
  "Urban Landscape": {
    name:"New York City", country:"USA", hero:DEST.nyc, dates:"Apr 10–15", days:5, totalCost:"$2,840",
    days_plan:[
      { day:1, title:"NYC Landing", total:"$380", events:[
        { time:"07:00", label:"Arrive JFK", note:"Domestic flight or Amtrak from wherever you are", img:IMGS.airport, type:"flight", cost:"$320 return",
          breakdown:[{ label:"Domestic return flight", cost:"$320" },{ label:"AirTrain + Subway to Manhattan", cost:"$8.25" }] },
        { time:"10:00", label:"Check in — Midtown hotel", note:"The Moxy NYC Times Square. Compact but buzzy.", img:DEST.nyc, type:"hotel", cost:"$185/night",
          breakdown:[{ label:"Deluxe room × 5 nights", cost:"$925" },{ label:"NYC hotel tax (14.75%)", cost:"$136" }] },
        { time:"13:00", label:"Classic NYC diner lunch", note:"Lexington Candy Shop, open since 1925. Egg cream mandatory.", img:IMGS.diner, type:"food", cost:"$18",
          breakdown:[{ label:"Club sandwich", cost:"$14" },{ label:"Egg cream drink", cost:"$4" }] },
        { time:"15:00", label:"High Line walk", note:"Elevated park on old rail line. Chelsea views.", img:IMGS.palmBeach, type:"activity", cost:"Free",
          breakdown:[{ label:"High Line entrance", cost:"Free" },{ label:"Optional donation", cost:"$5" }] },
        { time:"18:00", label:"M10 bus up Riverside Drive", note:"Best $2.90 in NYC — Hudson River at golden hour", img:IMGS.bus, type:"transport", cost:"$2.90",
          breakdown:[{ label:"MTA bus fare", cost:"$2.90" }] },
        { time:"21:00", label:"Times Square at night", note:"Overwhelming. Go once. Tick it off.", img:IMGS.nightStreet, type:"activity", cost:"Free",
          breakdown:[{ label:"Times Square", cost:"Free" },{ label:"Pizza slice at 2am", cost:"$3" }] },
      ]},
      { day:2, title:"Boroughs Explorer", total:"$145", events:[
        { time:"08:00", label:"Brooklyn bagel breakfast", note:"Ess-a-Bagel. H&H bagels. Pick a side and die on it.", img:IMGS.breakfast, type:"food", cost:"$12",
          breakdown:[{ label:"Everything bagel + lox", cost:"$9" },{ label:"Coffee", cost:"$3" }] },
        { time:"10:00", label:"Brooklyn Bridge walk", note:"Manhattan side → Brooklyn. 1.3 miles. Do it.", img:IMGS.highway, type:"activity", cost:"Free",
          breakdown:[{ label:"Bridge walk", cost:"Free" }] },
        { time:"12:00", label:"Shake Shack burger", note:"Madison Square Park original. The original.", img:IMGS.burger, type:"food", cost:"$16",
          breakdown:[{ label:"ShackBurger + fries", cost:"$12.50" },{ label:"Concrete custard shake", cost:"$6.50" }] },
        { time:"14:30", label:"MoMA", note:"Monet, Picasso, Warhol. Unreal collection.", img:DEST.nyc, type:"activity", cost:"$30",
          breakdown:[{ label:"Adult admission", cost:"$30" },{ label:"Audio guide", cost:"$7" }] },
        { time:"18:00", label:"Highway drive to Catskills viewpoint", note:"Rent a Zipcar. Hudson Valley sunset.", img:IMGS.highway, type:"transport", cost:"$45",
          breakdown:[{ label:"Zipcar rental 4h", cost:"$45" },{ label:"Gas", cost:"$15" }] },
        { time:"21:00", label:"Night bus back to Manhattan", note:"Late bus from Kingston, or drive back", img:IMGS.busNight, type:"transport", cost:"$22",
          breakdown:[{ label:"Trailways bus return", cost:"$22" }] },
      ]},
    ],
  },
};

const DEFAULT_TRIP = TRIPS["Coastal & Ocean"] || Object.values(TRIPS)[0];

const DISCOVER = [
  { id:"cusco",  name:"Cusco",       country:"Peru",      tags:["Cultural","Highlands"], photo:DEST.peru     },
  { id:"kyoto",  name:"Kyoto",       country:"Japan",     tags:["Temples","Food"],       photo:DEST.kyoto    },
  { id:"ba",     name:"Buenos Aires",country:"Argentina", tags:["Fútbol","Nightlife"],   photo:DEST.argentina},
  { id:"russia", name:"Moscow",      country:"Russia",    tags:["History","Winter"],     photo:DEST.russia   },
];
type DiscoverDest = typeof DISCOVER[0];

export default function HomeTab() {
  const { profile } = useStore();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [detail, setDetail]   = useState<DiscoverDest | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [liked, setLiked] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try { return new Set(JSON.parse(localStorage.getItem("compass_liked")||"[]")); } catch { return new Set(); }
  });

  const primaryInterest = profile.interests[0] || "Coastal & Ocean";
  const trip: Trip = TRIPS[primaryInterest] || DEFAULT_TRIP;
  const dayPlan = trip.days_plan[activeDay];

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLiked(s => {
      const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id);
      try { localStorage.setItem("compass_liked", JSON.stringify([...n])); } catch {}
      return n;
    });
  };

  const typeIcon = (type: string) => {
    const icons: Record<string,string> = { flight:"✈️", hotel:"🏨", food:"🍽️", activity:"🎯", transport:"🚌" };
    return icons[type] || "📍";
  };

  if (detail) return <DestinationDetail dest={detail} onBack={() => setDetail(null)} />;

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white relative">

      {/* Header */}
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
        <button onClick={() => setShowNotifs(true)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f5f5f5] relative">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black border-2 border-white"/>
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mb-6">
        <button onClick={() => setShowSearch(true)} className="w-full flex items-center gap-3 bg-[#f5f5f5] rounded-2xl px-4 py-3.5 text-left">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8e8e93" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#8e8e93" strokeWidth="2.2" strokeLinecap="round"/></svg>
          <span className="font-satoshi text-[15px] text-gray-400">Destinations, hotels, experiences...</span>
        </button>
      </div>

      {/* Trip Hero */}
      <div className="mx-5 rounded-3xl overflow-hidden relative" style={{ height: 220 }}>
        <img src={trip.hero} alt={trip.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent 80%)" }}/>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-serif text-white text-[30px] leading-none">{trip.name}</div>
              <div className="font-satoshi text-white/70 text-[13px] mt-1">{trip.country} · {trip.dates} · {trip.days} days</div>
            </div>
            <div className="text-right">
              <div className="font-satoshi text-white/60 text-[10px] uppercase tracking-wider">Total est.</div>
              <div className="font-serif text-white text-[22px] leading-none">{trip.totalCost}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 rounded-full px-2.5 py-1">
          <span className="font-satoshi text-[11px] font-600 text-gray-800">{profile.travelStyle?.split("||")[0] || "Explorer"} · {profile.budget || "Mid-range"}</span>
        </div>
        <button className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1">
          <span className="font-satoshi text-[11px] font-600 text-gray-800">Switch trip</span>
        </button>
      </div>

      {/* Day selector */}
      <div className="px-5 mt-5 mb-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-[22px] text-black">Itinerary</h3>
          <span className="font-satoshi text-[12px] text-gray-400">Tap any item for cost breakdown</span>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {trip.days_plan.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)}
              className="flex-shrink-0 rounded-2xl px-4 py-2.5 font-satoshi text-[13px] font-600 transition-all text-left"
              style={{ background: activeDay === i ? "#000" : "#f5f5f5", color: activeDay === i ? "#fff" : "#555", minWidth: 80 }}>
              <div style={{ color: activeDay === i ? "rgba(255,255,255,0.6)" : "#aaa", fontSize: 10 }}>DAY {d.day}</div>
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Day total */}
      {dayPlan && (
        <div className="px-5 mb-2 flex items-center justify-between">
          <span className="font-satoshi text-[13px] text-gray-400">{dayPlan.events.length} activities</span>
          <span className="font-satoshi text-[13px] font-600 text-gray-900">Day est. {dayPlan.total}</span>
        </div>
      )}

      {/* Events */}
      {dayPlan && (
        <div className="px-5 mb-6">
          {dayPlan.events.map((ev, i) => (
            <div key={i} className="mb-3">
              {/* Timeline connector */}
              <div className="flex gap-3">
                <div className="flex flex-col items-center" style={{ minWidth: 40 }}>
                  <div className="w-8 h-8 rounded-full bg-[#f5f5f5] flex items-center justify-center text-sm flex-shrink-0">{typeIcon(ev.type)}</div>
                  {i < dayPlan.events.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1 mb-1" style={{ minHeight: 12 }}/>}
                </div>
                <button onClick={() => setSelected(ev)}
                  className="flex-1 flex gap-3 rounded-2xl overflow-hidden border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.04)] mb-0 text-left bg-white active:bg-gray-50 transition-colors">
                  <div className="w-[88px] h-[80px] flex-shrink-0 overflow-hidden">
                    <img src={ev.img} alt={ev.label} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 py-2.5 pr-3 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <span className="font-satoshi text-[10px] text-gray-400">{ev.time}</span>
                      <span className="font-satoshi text-[11px] font-600 text-gray-700">{ev.cost}</span>
                    </div>
                    <div className="font-satoshi text-[14px] font-700 text-gray-900 leading-snug mt-0.5">{ev.label}</div>
                    <div className="font-satoshi text-[12px] text-gray-400 mt-0.5 leading-snug">{ev.note}</div>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discover */}
      <div className="px-5 mb-4">
        <h2 className="font-serif text-[24px] text-black">Worth exploring</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-5 pb-1">
        {DISCOVER.map(d => (
          <button key={d.id} onClick={() => setDetail(d)}
            className="flex-shrink-0 w-[220px] rounded-3xl overflow-hidden relative text-left"
            style={{ height: 260 }}>
            <img src={d.photo} alt={d.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.04) 80%)" }}/>
            <div className="absolute top-3 right-3 flex gap-1.5 flex-wrap justify-end">
              {d.tags.map(t => <span key={t} className="font-satoshi bg-white/95 rounded-full px-2 py-[4px] text-[10px] font-600 text-gray-800">{t}</span>)}
            </div>
            <button onClick={e => toggleLike(e, d.id)} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked.has(d.id) ? "#ff2d55" : "none"}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(d.id) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
              </svg>
            </button>
            <div className="absolute bottom-4 left-4">
              <div className="font-serif text-white text-[20px] leading-none">{d.name}</div>
              <div className="font-satoshi text-white/70 text-[12px] mt-0.5">{d.country}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="h-28"/>

      {/* ── Activity Cost Sheet ── */}
      {selected && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)}/>
          <div className="relative bg-white rounded-t-3xl px-5 pt-5 pb-10 shadow-2xl">
            <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4"/>
            {/* Photo */}
            <div className="rounded-2xl overflow-hidden mb-4" style={{ height: 160 }}>
              <img src={selected.img} alt={selected.label} className="w-full h-full object-cover"/>
            </div>
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1">
                <div className="font-satoshi text-[11px] text-gray-400 uppercase tracking-wider">{selected.time} · {selected.type}</div>
                <div className="font-serif text-[22px] text-black leading-snug mt-0.5">{selected.label}</div>
              </div>
              <div className="text-right ml-3">
                <div className="font-satoshi text-[11px] text-gray-400">Estimated</div>
                <div className="font-serif text-[20px] text-black">{selected.cost}</div>
              </div>
            </div>
            <p className="font-satoshi text-[13px] text-gray-500 mb-4">{selected.note}</p>
            {/* Breakdown */}
            <div className="bg-[#f9f9f9] rounded-2xl overflow-hidden mb-4">
              <div className="font-satoshi text-[11px] font-600 text-gray-500 uppercase tracking-wider px-4 py-2.5 border-b border-gray-100">Cost breakdown</div>
              {selected.breakdown.map((line, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-2.5 font-satoshi ${i < selected.breakdown.length-1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-[14px] text-gray-700">{line.label}</span>
                  <span className="text-[14px] font-600 text-gray-900">{line.cost}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl bg-black text-white font-satoshi text-[16px] font-600">
              Book this → {selected.cost}
            </button>
          </div>
        </div>
      )}

      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showNotifs && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
    </div>
  );
}
