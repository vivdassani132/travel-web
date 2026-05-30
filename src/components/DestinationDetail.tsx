"use client";
import { useState } from "react";

export interface Dest { id: string; name: string; country: string; tags: string[]; photo: string; }
interface Props { dest: Dest; onBack: () => void; }

const destTabs = ["Overview","Hotels","Restaurants","Things to do","Flights","Rentals"];

// ── Per-destination data ──────────────────────────────────────────────
type Hotel = { name: string; rating: number; reviews: number; amenity: string; price: string; photo: string };
type Activity = { name: string; type: string; rating: number; reviews: number; price: string; photo: string };
type Restaurant = { name: string; cuisine: string; rating: number; reviews: number; price: string; photo: string };
type Flight = { from: string; airline: string; duration: string; stops: string; price: string; dept: string; arr: string };
type Rental = { name: string; type: string; guests: number; price: string; amenity: string; photo: string };

type DestData = { hotels: Hotel[]; activities: Activity[]; restaurants: Restaurant[]; flights: Flight[]; rentals: Rental[] };

const DATA: Record<string, DestData> = {
  "Buenos Aires": {
    hotels:[
      { name:"Palacio Duhau Park Hyatt", rating:4.8, reviews:3214, amenity:"Pool · Spa · Free breakfast", price:"$280", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
      { name:"Hotel Esplendor Palermo", rating:4.5, reviews:1870, amenity:"Free cancellation · Bar", price:"$140", photo:"https://i.pinimg.com/1200x/65/2e/96/652e96ed2ef95f0f3f180ba2f2b7aca8.jpg" },
      { name:"Fierro Hotel Buenos Aires", rating:4.6, reviews:982, amenity:"Rooftop pool · Breakfast incl.", price:"$195", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
    ],
    activities:[
      { name:"El Superclásico Match Tour", type:"Sports", rating:4.9, reviews:6210, price:"from $85", photo:"https://i.pinimg.com/736x/27/c8/74/27c87463c7f93c03a5f9aae392e82b7c.jpg" },
      { name:"Tango Lesson + Milonga Night", type:"Culture", rating:4.8, reviews:4102, price:"from $45", photo:"https://i.pinimg.com/1200x/65/2e/96/652e96ed2ef95f0f3f180ba2f2b7aca8.jpg" },
      { name:"Recoleta Cemetery Tour", type:"History", rating:4.7, reviews:8903, price:"Free", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
      { name:"Tigre Delta Boat Cruise", type:"Nature", rating:4.6, reviews:2540, price:"from $38", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
    ],
    restaurants:[
      { name:"Don Julio Parrilla", cuisine:"Argentinian Steakhouse", rating:4.9, reviews:12400, price:"$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
      { name:"El Obrero", cuisine:"Traditional Bodegón", rating:4.7, reviews:5820, price:"$$", photo:"https://i.pinimg.com/1200x/93/2c/d8/932cd838a96c258d43c96d0826b40f3d.jpg" },
      { name:"Florería Atlántico", cuisine:"Cocktail Bar & Modern", rating:4.8, reviews:3190, price:"$$$", photo:"https://i.pinimg.com/1200x/65/2e/96/652e96ed2ef95f0f3f180ba2f2b7aca8.jpg" },
      { name:"Café Tortoni", cuisine:"Historic Café", rating:4.6, reviews:9870, price:"$", photo:"https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"LATAM Airlines", duration:"10h 30m", stops:"Non-stop", price:"$980", dept:"08:30", arr:"22:00" },
      { from:"New York (JFK)", airline:"American Airlines", duration:"12h 15m", stops:"1 stop (MIA)", price:"$740", dept:"06:00", arr:"21:15" },
      { from:"Miami (MIA)", airline:"Aerolíneas Argentinas", duration:"8h 45m", stops:"Non-stop", price:"$620", dept:"23:55", arr:"14:40+1" },
    ],
    rentals:[
      { name:"Palermo Soho Loft", type:"Entire apartment", guests:2, price:"$85/night", amenity:"WiFi · Kitchen · Balcony", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
      { name:"Recoleta Penthouse", type:"Entire condo", guests:4, price:"$180/night", amenity:"Pool · Doorman · City view", photo:"https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
    ],
  },
  "Maldives": {
    hotels:[
      { name:"Conrad Maldives Rangali", rating:4.9, reviews:4821, amenity:"Overwater villa · Full board · Spa", price:"$620", photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
      { name:"Soneva Jani", rating:4.9, reviews:2103, amenity:"Private pool · All-inclusive · Seaplane", price:"$1,200", photo:"https://i.pinimg.com/1200x/2a/b2/47/2ab247c17fd63526c7314b4312b96c9a.jpg" },
      { name:"Maafushi Inn", rating:4.3, reviews:3204, amenity:"Guesthouse · Breakfast · Snorkel hire", price:"$95", photo:"https://i.pinimg.com/1200x/39/96/1b/39961ba2482a782a93a5e9115547cfae.jpg" },
    ],
    activities:[
      { name:"Manta Ray Snorkelling — Hanifaru Bay", type:"Nature", rating:5.0, reviews:3102, price:"from $85", photo:"https://i.pinimg.com/1200x/22/52/2f/22522f3a4c9c123606642adb5f13cbb4.jpg" },
      { name:"Sunset Dolphin Cruise", type:"Tours", rating:4.8, reviews:5640, price:"from $65", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
      { name:"Sandbank Picnic", type:"Experience", rating:4.9, reviews:2890, price:"from $40", photo:"https://i.pinimg.com/1200x/39/96/1b/39961ba2482a782a93a5e9115547cfae.jpg" },
      { name:"SUP & Kayak Rental", type:"Water Sport", rating:4.6, reviews:1820, price:"Free (resort)", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
    ],
    restaurants:[
      { name:"Ithaa Undersea Restaurant", cuisine:"Fine Dining · Underwater", rating:4.9, reviews:6210, price:"$$$$", photo:"https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
      { name:"Meeru Café — Local Island", cuisine:"Maldivian · Seafood", rating:4.5, reviews:2100, price:"$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
      { name:"The Lighthouse", cuisine:"International · Beachfront", rating:4.7, reviews:3820, price:"$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"Emirates via Dubai", duration:"16h 40m", stops:"1 stop (DXB)", price:"$1,240", dept:"10:05", arr:"06:45+1" },
      { from:"London (LHR)", airline:"Qatar Airways via Doha", duration:"12h 20m", stops:"1 stop (DOH)", price:"$980", dept:"21:30", arr:"13:50+1" },
      { from:"Dubai (DXB)", airline:"flydubai", duration:"4h 30m", stops:"Non-stop", price:"$320", dept:"08:00", arr:"13:30" },
    ],
    rentals:[
      { name:"Private Water Villa — North Malé", type:"Overwater villa", guests:2, price:"$480/night", amenity:"Private pool · Butler · Glass floor", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
      { name:"Beach Bungalow — Maafushi", type:"Guesthouse room", guests:2, price:"$80/night", amenity:"WiFi · Breakfast · Snorkel gear", photo:"https://i.pinimg.com/1200x/39/96/1b/39961ba2482a782a93a5e9115547cfae.jpg" },
    ],
  },
  "Swiss Alps": {
    hotels:[
      { name:"Victoria-Jungfrau Grand Hotel", rating:4.9, reviews:5102, amenity:"Spa · Lake view · Breakfast", price:"$580", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { name:"The Chedi Andermatt", rating:4.8, reviews:2840, amenity:"Ski-in/ski-out · Pool · Fine dining", price:"$920", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { name:"Bellevue Hotel Grindelwald", rating:4.6, reviews:1920, amenity:"Mountain view · Free cancellation", price:"$280", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
    ],
    activities:[
      { name:"Jungfraujoch — Top of Europe", type:"Scenic", rating:4.9, reviews:28410, price:"from $180", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { name:"Aletsch Glacier Walk", type:"Hiking", rating:4.8, reviews:6300, price:"Free (guide $45)", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { name:"Lake Thun Kayaking", type:"Water Sport", rating:4.7, reviews:2810, price:"from $55", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
      { name:"GoldenPass Scenic Rail", type:"Transport", rating:4.9, reviews:14200, price:"from $58", photo:"https://i.pinimg.com/1200x/57/5a/0c/575a0c80aa5953a97f41681612fc56c8.jpg" },
    ],
    restaurants:[
      { name:"Tüfi Stübli", cuisine:"Swiss · Raclette & Fondue", rating:4.8, reviews:3840, price:"$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
      { name:"Restaurant Schuh", cuisine:"Swiss · Traditional", rating:4.6, reviews:5210, price:"$$", photo:"https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg" },
      { name:"Lindt Swiss Chocolate Heaven", cuisine:"Café · Desserts", rating:4.7, reviews:9810, price:"$", photo:"https://i.pinimg.com/1200x/93/2c/d8/932cd838a96c258d43c96d0826b40f3d.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"Swiss International Air", duration:"8h 15m", stops:"Non-stop", price:"$980", dept:"19:10", arr:"09:25+1" },
      { from:"New York (JFK)", airline:"Lufthansa via Frankfurt", duration:"11h 30m", stops:"1 stop (FRA)", price:"$720", dept:"16:45", arr:"11:15+1" },
      { from:"London (LHR)", airline:"SWISS", duration:"2h 05m", stops:"Non-stop", price:"$180", dept:"07:35", arr:"10:40" },
    ],
    rentals:[
      { name:"Chalet — Grindelwald", type:"Entire chalet", guests:6, price:"$320/night", amenity:"Fireplace · Mountain view · Hot tub", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { name:"Studio — Interlaken", type:"Entire apartment", guests:2, price:"$120/night", amenity:"Kitchen · WiFi · Alps view", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
    ],
  },
  "New York": {
    hotels:[
      { name:"The Moxy NYC Times Square", rating:4.4, reviews:8210, amenity:"Bar · Great location", price:"$185", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
      { name:"The Standard High Line", rating:4.7, reviews:5940, amenity:"Rooftop bar · Hudson views", price:"$380", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
      { name:"Arlo Nomad", rating:4.3, reviews:4120, amenity:"Free cancellation · Rooftop", price:"$160", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
    ],
    activities:[
      { name:"Central Park Bike Tour", type:"Outdoor", rating:4.8, reviews:12400, price:"from $42", photo:"https://i.pinimg.com/1200x/57/5a/0c/575a0c80aa5953a97f41681612fc56c8.jpg" },
      { name:"MoMA — Museum of Modern Art", type:"Museum", rating:4.8, reviews:24100, price:"$30", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
      { name:"Brooklyn Bridge Walk", type:"Sightseeing", rating:4.9, reviews:58200, price:"Free", photo:"https://i.pinimg.com/1200x/57/5a/0c/575a0c80aa5953a97f41681612fc56c8.jpg" },
      { name:"⚽ FIFA World Cup 2026 — MetLife", type:"Sports", rating:5.0, reviews:1200, price:"from $85", photo:"https://i.pinimg.com/736x/68/9f/86/689f8682ab5151f43aa6d1abfb11d885.jpg" },
    ],
    restaurants:[
      { name:"Shake Shack — Madison Sq Park", cuisine:"American · Burgers", rating:4.7, reviews:34100, price:"$", photo:"https://i.pinimg.com/1200x/93/2c/d8/932cd838a96c258d43c96d0826b40f3d.jpg" },
      { name:"Russ & Daughters", cuisine:"Jewish Deli · Brunch", rating:4.9, reviews:8210, price:"$$", photo:"https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg" },
      { name:"Carbone", cuisine:"Italian-American · Fine dining", rating:4.8, reviews:12400, price:"$$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
      { name:"Ess-a-Bagel", cuisine:"New York Bagels", rating:4.8, reviews:18900, price:"$", photo:"https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg" },
    ],
    flights:[
      { from:"Los Angeles (LAX)", airline:"Delta Air Lines", duration:"5h 15m", stops:"Non-stop", price:"$220", dept:"07:00", arr:"15:15" },
      { from:"London (LHR)", airline:"British Airways", duration:"7h 00m", stops:"Non-stop", price:"$580", dept:"11:30", arr:"14:30" },
      { from:"Miami (MIA)", airline:"American Airlines", duration:"3h 05m", stops:"Non-stop", price:"$180", dept:"09:20", arr:"12:25" },
    ],
    rentals:[
      { name:"Williamsburg Loft", type:"Entire loft", guests:4, price:"$210/night", amenity:"Manhattan view · Rooftop access", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
      { name:"Upper West Side Studio", type:"Entire apartment", guests:2, price:"$140/night", amenity:"Central Park 3 blocks · Kitchen", photo:"https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
    ],
  },
  "Kyoto": {
    hotels:[
      { name:"Hoshinoya Kyoto", rating:4.9, reviews:2840, amenity:"River access · Kaiseki dining", price:"$620", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { name:"The Ritz-Carlton Kyoto", rating:4.8, reviews:4120, amenity:"Pool · Spa · Nijo Castle view", price:"$480", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { name:"Gion Hatanaka Ryokan", rating:4.9, reviews:890, amenity:"Traditional ryokan · Dinner incl.", price:"$380", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
    ],
    activities:[
      { name:"Arashiyama Bamboo Grove", type:"Nature", rating:4.7, reviews:42100, price:"Free", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { name:"Fushimi Inari Night Walk", type:"Spiritual", rating:4.9, reviews:31200, price:"Free", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { name:"Tea Ceremony — Higashiyama", type:"Culture", rating:4.8, reviews:8410, price:"from $35", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
      { name:"Geisha District Walk — Gion", type:"History", rating:4.8, reviews:18200, price:"Free", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
    ],
    restaurants:[
      { name:"Mizai", cuisine:"Kaiseki · Michelin 3★", rating:5.0, reviews:1240, price:"$$$$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
      { name:"Nishiki Market", cuisine:"Street Food · Local", rating:4.7, reviews:24100, price:"$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
      { name:"Omen Noodles", cuisine:"Japanese · Udon", rating:4.6, reviews:5810, price:"$$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"Japan Airlines via Tokyo", duration:"14h 30m", stops:"1 stop (NRT)", price:"$1,100", dept:"12:30", arr:"16:00+1" },
      { from:"Los Angeles (LAX)", airline:"ANA", duration:"11h 20m", stops:"Non-stop to OSA", price:"$820", dept:"01:10", arr:"05:30+1" },
      { from:"London (LHR)", airline:"British Airways", duration:"12h 45m", stops:"Non-stop to KIX", price:"$780", dept:"13:15", arr:"09:00+1" },
    ],
    rentals:[
      { name:"Traditional Machiya Townhouse", type:"Entire house", guests:4, price:"$180/night", amenity:"Zen garden · Tatami · Gion district", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { name:"Modern Apartment — Arashiyama", type:"Entire apartment", guests:2, price:"$95/night", amenity:"Mountain view · Kitchen · Quiet", photo:"https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
    ],
  },
  "Cusco": {
    hotels:[
      { name:"Belmond Hotel Monasterio", rating:4.9, reviews:3840, amenity:"Historic · Breakfast · Oxygen-enriched", price:"$480", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Inkaterra Machu Picchu Pueblo", rating:4.8, reviews:2100, amenity:"Rainforest · All meals · Guided treks", price:"$380", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Los Apus Hotel & Mirador", rating:4.5, reviews:1820, amenity:"Mountain view · Free cancellation", price:"$120", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
    ],
    activities:[
      { name:"Machu Picchu Full Day Tour", type:"UNESCO Site", rating:5.0, reviews:48200, price:"from $65", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Inca Trail Trek — 4 Days", type:"Hiking", rating:4.9, reviews:12800, price:"from $650", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Rainbow Mountain Hike", type:"Adventure", rating:4.8, reviews:9810, price:"from $38", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Sacsayhuamán Ruins", type:"History", rating:4.7, reviews:24100, price:"$20", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
    ],
    restaurants:[
      { name:"Central Restaurante", cuisine:"Peruvian · Michelin", rating:5.0, reviews:4810, price:"$$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
      { name:"Chicha por Gastón Acurio", cuisine:"Modern Peruvian", rating:4.8, reviews:6210, price:"$$$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
      { name:"Mercado San Pedro", cuisine:"Local Market · Street food", rating:4.6, reviews:18400, price:"$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"LATAM via Lima", duration:"9h 30m", stops:"1 stop (LIM)", price:"$820", dept:"23:15", arr:"12:45+1" },
      { from:"Miami (MIA)", airline:"Copa Airlines via Bogotá", duration:"7h 20m", stops:"1 stop (BOG)", price:"$560", dept:"06:10", arr:"15:30" },
      { from:"Lima (LIM)", airline:"LATAM", duration:"1h 15m", stops:"Non-stop", price:"$85", dept:"06:00", arr:"07:15" },
    ],
    rentals:[
      { name:"Adobe House — San Blas", type:"Entire house", guests:4, price:"$75/night", amenity:"Mountain view · Kitchen · Courtyard", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { name:"Sacred Valley Lodge", type:"Private room", guests:2, price:"$45/night", amenity:"Breakfast · Yoga · Farm", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
    ],
  },
  "Bali": {
    hotels:[
      { name:"Four Seasons Sayan Ubud", rating:4.9, reviews:3210, amenity:"Jungle pool · Spa · Rice terrace", price:"$680", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { name:"COMO Uma Ubud", rating:4.8, reviews:2100, amenity:"Infinity pool · Yoga · Fine dining", price:"$420", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { name:"Bisma Eight", rating:4.7, reviews:1840, amenity:"Valley view · Breakfast · Free cancel", price:"$180", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
    ],
    activities:[
      { name:"Tegallalang Rice Terrace Walk", type:"Nature", rating:4.7, reviews:28400, price:"$5", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { name:"Tanah Lot Sunset Temple", type:"Spiritual", rating:4.8, reviews:38100, price:"$5", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { name:"Mount Batur Sunrise Trek", type:"Hiking", rating:4.9, reviews:14200, price:"from $45", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { name:"White Water Rafting — Ayung", type:"Adventure", rating:4.7, reviews:9810, price:"from $35", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
    ],
    restaurants:[
      { name:"Locavore", cuisine:"Modern Indonesian · Michelin", rating:4.9, reviews:8210, price:"$$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
      { name:"Naughty Nuri's Warung", cuisine:"BBQ Ribs · Local", rating:4.6, reviews:18400, price:"$$", photo:"https://i.pinimg.com/1200x/93/2c/d8/932cd838a96c258d43c96d0826b40f3d.jpg" },
      { name:"Kakiang Bakery", cuisine:"Café · Breakfast", rating:4.5, reviews:6810, price:"$", photo:"https://i.pinimg.com/1200x/93/b1/29/93b1298920b9e6fdb1d5b9a9610fde09.jpg" },
    ],
    flights:[
      { from:"New York (JFK)", airline:"Singapore Airlines via SIN", duration:"22h 30m", stops:"1 stop (SIN)", price:"$1,100", dept:"12:00", arr:"21:30+1" },
      { from:"Sydney (SYD)", airline:"Jetstar", duration:"6h 00m", stops:"Non-stop", price:"$180", dept:"07:30", arr:"10:30" },
      { from:"Singapore (SIN)", airline:"Scoot", duration:"2h 30m", stops:"Non-stop", price:"$95", dept:"08:00", arr:"10:30" },
    ],
    rentals:[
      { name:"Villa with Private Pool — Ubud", type:"Entire villa", guests:4, price:"$160/night", amenity:"Pool · Rice field view · Chef available", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
      { name:"Jungle Treehouse — Tegallalang", type:"Treehouse", guests:2, price:"$95/night", amenity:"Open-air · Waterfall · Breakfast", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
    ],
  },
};

// Fallback generic data
const FALLBACK: DestData = {
  hotels:[
    { name:"Grand Hotel & Spa", rating:4.5, reviews:2847, amenity:"Free breakfast · Pool · Spa", price:"$149", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
    { name:"City View Boutique", rating:4.2, reviews:1471, amenity:"Free cancellation · Bar", price:"$99", photo:"https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
    { name:"Heritage Inn", rating:4.7, reviews:934, amenity:"Breakfast included · Spa", price:"$215", photo:"https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
  ],
  activities:[
    { name:"City Walking Tour", type:"Tours", rating:4.8, reviews:5200, price:"from $25", photo:"https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
    { name:"Local Food Market", type:"Food & Drink", rating:4.7, reviews:2103, price:"Free entry", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
    { name:"Sunset Viewpoint Hike", type:"Outdoor", rating:4.8, reviews:1890, price:"from $18", photo:"https://i.pinimg.com/1200x/ba/7f/75/ba7f75659c691101eb72929822d75bb0.jpg" },
  ],
  restaurants:[
    { name:"The Local Table", cuisine:"Contemporary · Farm-to-table", rating:4.7, reviews:3210, price:"$$$", photo:"https://i.pinimg.com/1200x/8d/7e/b5/8d7eb541a065dd9e77819f306ab5b829.jpg" },
    { name:"Street Market Eats", cuisine:"Local · Street food", rating:4.6, reviews:8410, price:"$", photo:"https://i.pinimg.com/1200x/aa/70/7a/aa707a29321e92bc8d980346aec465e9.jpg" },
  ],
  flights:[
    { from:"New York (JFK)", airline:"Various airlines", duration:"8–14h", stops:"1 stop", price:"$680", dept:"Various", arr:"Various" },
    { from:"London (LHR)", airline:"Various airlines", duration:"6–12h", stops:"1 stop", price:"$520", dept:"Various", arr:"Various" },
  ],
  rentals:[
    { name:"Central Apartment", type:"Entire apartment", guests:2, price:"$90/night", amenity:"WiFi · Kitchen · Central", photo:"https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
  ],
};

function getDestData(name: string): DestData {
  // Try exact match, then partial
  if (DATA[name]) return DATA[name];
  const key = Object.keys(DATA).find(k => name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase()));
  return key ? DATA[key] : FALLBACK;
}

function BubbleRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[0,1,2,3,4].map(i => (
        <div key={i} className="w-[11px] h-[11px] rounded-full"
          style={{ background: i < Math.floor(rating) ? "#000" : (i === Math.floor(rating) && rating%1>=0.5 ? "linear-gradient(90deg,#000 50%,#d1d1d6 50%)" : "#d1d1d6") }} />
      ))}
    </div>
  );
}

export default function DestinationDetail({ dest, onBack }: Props) {
  const [activeTab, setActiveTab] = useState("Hotels");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const data = getDestData(dest.name);

  const toggleLike = (id: string) => setLiked(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">

      {/* Nav */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3 bg-white border-b border-gray-100">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="font-satoshi text-[17px] font-600 text-gray-900">{dest.name}</span>
        <div className="w-8"/>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {destTabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-shrink-0 px-4 py-3 font-satoshi text-[13px] font-500 relative whitespace-nowrap"
            style={{ color: activeTab === t ? "#1c1c1e" : "#8e8e93" }}>
            {t}
            {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-full"/>}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "Overview" && (
        <div className="pb-8">
          <div className="relative" style={{ height: 220 }}>
            <img src={dest.photo} alt={dest.name} className="w-full h-full object-cover"/>
            <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.6) 35%, transparent)" }}/>
            <div className="absolute bottom-4 left-5">
              <div className="font-serif text-white text-[30px] leading-none">{dest.name}</div>
              <div className="font-satoshi text-white/70 text-[14px] mt-1">{dest.country}</div>
            </div>
          </div>
          <div className="px-5 py-5 space-y-3">
            {dest.tags.map(t => (
              <div key={t} className="inline-flex mr-2 bg-gray-100 rounded-full px-3 py-1.5">
                <span className="font-satoshi text-[12px] text-gray-700 font-500">{t}</span>
              </div>
            ))}
            <p className="font-satoshi text-[14px] text-gray-500 leading-relaxed pt-2">
              {dest.name} is one of the world's most sought-after destinations — a perfect mix of culture, adventure, and local flavour. From world-class hotels to hidden street food gems, this is a place that rewards the curious traveller.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[{label:"Hotels", val:data.hotels.length+"+"}, {label:"Restaurants", val:data.restaurants.length+"+"}, {label:"Activities", val:data.activities.length+"+"}].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-2xl p-3 text-center">
                  <div className="font-serif text-[22px] text-black">{s.val}</div>
                  <div className="font-satoshi text-[11px] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hotels */}
      {activeTab === "Hotels" && (
        <div className="px-5 pt-4 space-y-5 pb-8">
          <p className="font-satoshi text-[13px] text-gray-500">
            {data.hotels.length} properties in <span className="font-600 text-gray-900">{dest.name}</span> · sorted by best value
          </p>
          {data.hotels.map((h, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
              <div className="relative" style={{ height: 200 }}>
                <img src={h.photo} alt={h.name} className="w-full h-full object-cover"/>
                <button onClick={() => toggleLike(`h${i}`)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(`h${i}`) ? "#ff2d55" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(`h${i}`) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="font-satoshi text-[17px] font-700 text-gray-900">{h.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <BubbleRating rating={h.rating}/>
                  <span className="font-satoshi text-[12px] text-gray-400">{h.reviews.toLocaleString()} reviews</span>
                </div>
                <div className="font-satoshi text-[13px] text-gray-500 mt-1">{h.amenity}</div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="font-satoshi text-[11px] text-gray-400">from</div>
                    <div className="font-serif text-[26px] text-black leading-none">{h.price}<span className="font-satoshi text-[13px] text-gray-400"> /night</span></div>
                  </div>
                  <button className="bg-black text-white font-satoshi text-[13px] font-600 px-4 py-2.5 rounded-xl">Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restaurants */}
      {activeTab === "Restaurants" && (
        <div className="px-5 pt-4 space-y-4 pb-8">
          <p className="font-satoshi text-[13px] text-gray-500">{data.restaurants.length} restaurants in <span className="font-600 text-gray-900">{dest.name}</span></p>
          {data.restaurants.map((r, i) => (
            <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
              <div className="w-[100px] flex-shrink-0 self-stretch overflow-hidden" style={{ minHeight:90 }}>
                <img src={r.photo} alt={r.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 py-3 pr-3">
                <div className="font-satoshi text-[11px] text-gray-400 font-500">{r.cuisine}</div>
                <div className="font-satoshi text-[15px] font-700 text-gray-900 leading-snug mt-0.5">{r.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <BubbleRating rating={r.rating}/>
                  <span className="font-satoshi text-[11px] text-gray-400">{r.reviews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-satoshi text-[12px] font-600 text-gray-700">{r.price}</span>
                  <button onClick={() => toggleLike(`r${i}`)} className="w-7 h-7 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={liked.has(`r${i}`) ? "#ff2d55" : "none"}>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(`r${i}`) ? "#ff2d55" : "#c7c7cc"} strokeWidth="1.8"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Things to do */}
      {activeTab === "Things to do" && (
        <div className="px-5 pt-4 space-y-4 pb-8">
          <p className="font-satoshi text-[13px] text-gray-500">{data.activities.length} experiences in <span className="font-600 text-gray-900">{dest.name}</span></p>
          {data.activities.map((a, i) => (
            <div key={i} className="flex gap-3 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
              <div className="w-[100px] flex-shrink-0 self-stretch overflow-hidden" style={{ minHeight:90 }}>
                <img src={a.photo} alt={a.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 py-3 pr-3">
                <div className="font-satoshi text-[11px] text-black font-600">{a.type}</div>
                <div className="font-satoshi text-[14px] font-700 text-gray-900 leading-snug mt-0.5">{a.name}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <BubbleRating rating={a.rating}/>
                  <span className="font-satoshi text-[11px] text-gray-400">{a.reviews.toLocaleString()}</span>
                </div>
                <div className="font-satoshi text-[13px] font-600 text-gray-900 mt-1">{a.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flights */}
      {activeTab === "Flights" && (
        <div className="px-5 pt-4 space-y-4 pb-8">
          <p className="font-satoshi text-[13px] text-gray-500">Best flights to <span className="font-600 text-gray-900">{dest.name}</span></p>
          {data.flights.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-satoshi text-[12px] text-gray-400">From</div>
                  <div className="font-satoshi text-[14px] font-700 text-gray-900">{f.from}</div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-satoshi text-[11px] text-gray-400">{f.duration}</span>
                  <div className="flex items-center gap-1 my-0.5">
                    <div className="w-6 h-px bg-gray-300"/>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round"/></svg>
                    <div className="w-6 h-px bg-gray-300"/>
                  </div>
                  <span className="font-satoshi text-[10px] text-gray-400">{f.stops}</span>
                </div>
                <div className="text-right">
                  <div className="font-serif text-[22px] text-black leading-none">{f.price}</div>
                  <div className="font-satoshi text-[11px] text-gray-400">return</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-[14px]">✈️</span>
                  <span className="font-satoshi text-[12px] text-gray-600">{f.airline}</span>
                </div>
                <div className="font-satoshi text-[12px] text-gray-500">{f.dept} → {f.arr}</div>
              </div>
              <button className="w-full mt-3 py-2.5 bg-black text-white font-satoshi text-[14px] font-600 rounded-xl">Select flight</button>
            </div>
          ))}
        </div>
      )}

      {/* Vacation Rentals */}
      {activeTab === "Rentals" && (
        <div className="px-5 pt-4 space-y-5 pb-8">
          <p className="font-satoshi text-[13px] text-gray-500">{data.rentals.length} rentals in <span className="font-600 text-gray-900">{dest.name}</span></p>
          {data.rentals.map((r, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
              <div className="relative" style={{ height: 180 }}>
                <img src={r.photo} alt={r.name} className="w-full h-full object-cover"/>
                <button onClick={() => toggleLike(`re${i}`)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={liked.has(`re${i}`) ? "#ff2d55" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={liked.has(`re${i}`) ? "#ff2d55" : "#1c1c1e"} strokeWidth="1.8"/>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="font-satoshi text-[12px] text-gray-400">{r.type} · {r.guests} guests</div>
                <div className="font-satoshi text-[16px] font-700 text-gray-900 mt-0.5">{r.name}</div>
                <div className="font-satoshi text-[12px] text-gray-500 mt-1">{r.amenity}</div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="font-serif text-[24px] text-black leading-none">{r.price}</div>
                  </div>
                  <button className="bg-black text-white font-satoshi text-[13px] font-600 px-4 py-2.5 rounded-xl">Reserve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="h-4"/>
    </div>
  );
}
