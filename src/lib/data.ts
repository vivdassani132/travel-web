export interface TripSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji: string;
  travelers: number;
  gradient: [string, string];
}

export interface Trip {
  id: string;
  destination: string;
  country: string;
  emoji: string;
  tagline: string;
  duration: string;
  price: string;
  rating: number;
  gradient: [string, string];
  matchPercent: number;
  tags: string[];
  lat: number;
  lng: number;
  spots: TripSpot[];
  activities: string[];
  restaurants: { name: string; cuisine: string; price: string; rating: number; note: string }[];
  hotels: { name: string; stars: number; pricePerNight: string; highlight: string }[];
  itinerary: { day: number; title: string; items: string[] }[];
}

export interface TagAlongTrip {
  id: string;
  destination: string;
  country: string;
  description: string;
  slotsLeft: number;
  emoji: string;
  gradient: [string, string];
}

export const trips: Trip[] = [
  {
    id: "venice",
    destination: "Venice",
    country: "Italy",
    emoji: "🇮🇹",
    tagline: "Canals, gondolas & golden hour",
    duration: "6 days",
    price: "$2,800",
    rating: 4.9,
    gradient: ["#3478c0", "#1a4d8a"],
    matchPercent: 96,
    tags: ["Romantic", "Cultural", "Foodie"],
    lat: 45.4408,
    lng: 12.3155,
    spots: [
      { id: "s1", name: "Grand Canal", lat: 45.4371, lng: 12.3326, emoji: "🚤", travelers: 2, gradient: ["#3478c0", "#0d99b0"] },
      { id: "s2", name: "Piazza San Marco", lat: 45.4341, lng: 12.3388, emoji: "🏛️", travelers: 3, gradient: ["#c08a20", "#c06010"] },
      { id: "s3", name: "Rialto Bridge", lat: 45.4380, lng: 12.3359, emoji: "🌉", travelers: 2, gradient: ["#8b4513", "#c87820"] },
    ],
    activities: ["Gondola ride at sunset", "Rialto Market", "Doge's Palace", "Murano glassblowing", "Harry's Bar"],
    restaurants: [
      { name: "Osteria alle Testiere", cuisine: "Venetian seafood", price: "$$$", rating: 4.9, note: "Book weeks ahead — tiny and perfect" },
      { name: "Trattoria da Jonatan", cuisine: "Traditional Italian", price: "$$", rating: 4.7, note: "Hidden gem, no tourists" },
    ],
    hotels: [{ name: "Aman Venice", stars: 5, pricePerNight: "$1,200", highlight: "16th-century palazzo" }],
    itinerary: [
      { day: 1, title: "Arrival & San Marco", items: ["Check in", "Piazza San Marco at dusk", "Aperol spritz at a canal bar"] },
      { day: 2, title: "Islands", items: ["Murano glass tour", "Burano colourful houses", "Seafood lunch by the water"] },
    ],
  },
  {
    id: "sf",
    destination: "San Francisco",
    country: "USA",
    emoji: "🇺🇸",
    tagline: "Golden Gate, fog & sourdough",
    duration: "5 days",
    price: "$2,100",
    rating: 4.7,
    gradient: ["#d45a20", "#a03010"],
    matchPercent: 91,
    tags: ["Urban", "Foodie", "Scenic"],
    lat: 37.7749,
    lng: -122.4194,
    spots: [
      { id: "s4", name: "Golden Gate Bridge", lat: 37.8199, lng: -122.4783, emoji: "🌉", travelers: 3, gradient: ["#d45a20", "#a03010"] },
      { id: "s5", name: "Alcatraz Island", lat: 37.8267, lng: -122.4230, emoji: "🏝️", travelers: 2, gradient: ["#3a6b8a", "#1a3d5a"] },
      { id: "s6", name: "Fisherman's Wharf", lat: 37.8080, lng: -122.4177, emoji: "🦞", travelers: 2, gradient: ["#2080a0", "#104060"] },
    ],
    activities: ["Golden Gate Bridge walk", "Alcatraz tour", "Ferry Building market", "Chinatown", "Muir Woods"],
    restaurants: [
      { name: "Tartine Bakery", cuisine: "Artisan bread & pastries", price: "$", rating: 4.9, note: "Get there early — sells out by noon" },
      { name: "Gary Danko", cuisine: "Modern American", price: "$$$", rating: 4.8, note: "Tasting menu, reserve months ahead" },
    ],
    hotels: [{ name: "Proper Hotel", stars: 4, pricePerNight: "$320", highlight: "Rooftop bar with bridge views" }],
    itinerary: [
      { day: 1, title: "The Bridge & Marin", items: ["Walk or bike Golden Gate", "Sausalito for lunch", "Ferry back to city"] },
      { day: 2, title: "Neighbourhoods", items: ["Mission murals", "Dolores Park", "Castro & Haight-Ashbury"] },
    ],
  },
  {
    id: "kyoto",
    destination: "Kyoto",
    country: "Japan",
    emoji: "🇯🇵",
    tagline: "Temples, matcha & zen gardens",
    duration: "8 days",
    price: "$2,400",
    rating: 4.9,
    gradient: ["#c47090", "#8040a0"],
    matchPercent: 97,
    tags: ["Cultural", "Foodie", "Scenic"],
    lat: 35.0116,
    lng: 135.7681,
    spots: [
      { id: "s7", name: "Fushimi Inari", lat: 34.9671, lng: 135.7727, emoji: "⛩️", travelers: 2, gradient: ["#c03040", "#802040"] },
      { id: "s8", name: "Arashiyama", lat: 35.0094, lng: 135.6761, emoji: "🎋", travelers: 3, gradient: ["#208040", "#106050"] },
      { id: "s9", name: "Gion District", lat: 35.0037, lng: 135.7758, emoji: "🏯", travelers: 2, gradient: ["#c07820", "#906010"] },
    ],
    activities: ["Fushimi Inari hike", "Tea ceremony", "Bamboo Grove", "Nishiki Market", "Geisha district"],
    restaurants: [
      { name: "Kikunoi", cuisine: "Kaiseki", price: "$$$", rating: 4.9, note: "Michelin 3-star, reserve 2 months ahead" },
      { name: "Nishiki Warai", cuisine: "Street food", price: "$", rating: 4.7, note: "Local favourite" },
    ],
    hotels: [{ name: "Hoshinoya Kyoto", stars: 5, pricePerNight: "$520", highlight: "Only accessible by boat" }],
    itinerary: [
      { day: 1, title: "Arrival & Gion", items: ["Check in", "Evening Gion walk", "Dinner at Nishiki Warai"] },
      { day: 2, title: "Fushimi Inari", items: ["Early morning hike", "Matcha café", "Market exploration"] },
    ],
  },
];

export const tagAlongTrips: TagAlongTrip[] = [
  {
    id: "ta1",
    destination: "Weekend in Rio de Janeiro",
    country: "Rio, Brazil",
    description: "Beach days, food tours, museums, nightlife; all split evenly.",
    slotsLeft: 2,
    emoji: "🏖️",
    gradient: ["#1a8050", "#106080"],
  },
  {
    id: "ta2",
    destination: "Tokyo Food Week",
    country: "Tokyo, Japan",
    description: "Ramen, izakayas, Tsukiji market. 6 stops in 4 days.",
    slotsLeft: 1,
    emoji: "🍜",
    gradient: ["#c03050", "#801060"],
  },
];
