"use client";
import { useState } from "react";
import { trips } from "@/lib/data";

const tabs = ["Upcoming", "Past", "Saved"];

export default function TripsTab() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-[#f2f2f7]">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 bg-white">
        <h1 className="text-[28px] font-bold text-gray-900">My Trips</h1>
        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-[#f2f2f7] rounded-xl p-1">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-[14px] font-medium transition-all ${activeTab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        {activeTab === "Upcoming" && (
          <div className="space-y-4">
            {trips.map(trip => (
              <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-[140px] relative"
                  style={{ background: `linear-gradient(135deg, ${trip.gradient[0]}, ${trip.gradient[1]})` }}>
                  <span className="absolute right-4 top-4 text-6xl opacity-40">{trip.emoji}</span>
                  <div className="absolute bottom-3 left-4">
                    <div className="text-white font-bold text-[20px]">{trip.destination}</div>
                    <div className="text-white/70 text-[13px]">{trip.country}</div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <span className="text-white text-[11px] font-semibold">In 14 days</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[13px] text-gray-500">Duration</div>
                      <div className="text-[15px] font-semibold text-gray-800">{trip.duration}</div>
                    </div>
                    <div>
                      <div className="text-[13px] text-gray-500">Budget</div>
                      <div className="text-[15px] font-semibold text-gray-800">{trip.price}</div>
                    </div>
                    <div>
                      <div className="text-[13px] text-gray-500">Match</div>
                      <div className="text-[15px] font-semibold text-green-700">{trip.matchPercent}%</div>
                    </div>
                  </div>
                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[12px] text-gray-400 mb-1">
                      <span>Planning progress</span>
                      <span>60%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-[60%]"
                        style={{ background: `linear-gradient(90deg, ${trip.gradient[0]}, ${trip.gradient[1]})` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl text-[13px] font-medium text-gray-700 bg-[#f2f2f7]">
                      View Details
                    </button>
                    <button className="flex-1 py-2 rounded-xl text-[13px] font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${trip.gradient[0]}, ${trip.gradient[1]})` }}>
                      Continue Planning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Past" && (
          <div className="space-y-3">
            {[
              { name: "Tokyo", country: "Japan", emoji: "🗾", date: "Mar 2025", rating: 5, g: ["#c03050", "#801060"] as [string,string] },
              { name: "Barcelona", country: "Spain", emoji: "🇪🇸", date: "Nov 2024", rating: 4, g: ["#e06020", "#a03010"] as [string,string] },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `linear-gradient(135deg, ${t.g[0]}, ${t.g[1]})` }}>
                  <span className="opacity-70">{t.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="text-[16px] font-bold text-gray-900">{t.name}</div>
                  <div className="text-[13px] text-gray-400">{t.country} · {t.date}</div>
                  <div className="text-amber-400 text-[13px] mt-0.5">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                </div>
                <button className="text-[13px] text-gray-400">›</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Saved" && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Santorini", emoji: "🏛️", g: ["#4080c0", "#204080"] as [string,string] },
              { name: "Maldives", emoji: "🏝️", g: ["#10b0a0", "#057080"] as [string,string] },
              { name: "Machu Picchu", emoji: "🏔️", g: ["#508020", "#305010"] as [string,string] },
              { name: "Dubai", emoji: "🌆", g: ["#c09020", "#806010"] as [string,string] },
            ].map(d => (
              <div key={d.name} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-[90px] flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${d.g[0]}, ${d.g[1]})` }}>
                  <span className="text-4xl opacity-60">{d.emoji}</span>
                </div>
                <div className="p-2.5">
                  <div className="text-[14px] font-semibold text-gray-800">{d.name}</div>
                  <button className="text-[11px] text-blue-500 font-medium mt-0.5">Explore →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-28" />
    </div>
  );
}
