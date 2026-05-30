"use client";
import { useState } from "react";
import HomeTab from "./tabs/HomeTab";
import ExploreTab from "./tabs/ExploreTab";
import TripsTab from "./tabs/TripsTab";
import ProfileTab from "./tabs/ProfileTab";

const tabs = [
  { icon: "🏠", filled: "🏠", label: "Home" },
  { icon: "🧭", filled: "🧭", label: "Explore" },
  { icon: "🔖", filled: "🔖", label: "Trips" },
  { icon: "👤", filled: "👤", label: "Profile" },
];

export default function MainScreen() {
  const [tab, setTab] = useState(0);

  return (
    <div className="flex flex-col h-dvh bg-[#f2f2f7] relative">
      <div className="flex-1 overflow-hidden">
        {tab === 0 && <HomeTab />}
        {tab === 1 && <ExploreTab />}
        {tab === 2 && <TripsTab />}
        {tab === 3 && <ProfileTab />}
      </div>

      {/* Floating tab bar */}
      <div className="absolute bottom-7 left-0 right-0 flex justify-center px-10 z-50">
        <div className="flex w-full bg-white rounded-[26px] shadow-lg px-2.5 py-1">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className="flex-1 flex flex-col items-center justify-center h-[50px] gap-0.5"
              style={{ color: tab === i ? "#111" : "#8e8e93" }}>
              <span className="text-[22px] leading-none">{t.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
