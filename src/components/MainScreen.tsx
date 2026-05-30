"use client";
import { useState } from "react";
import HomeTab from "./tabs/HomeTab";
import SearchTab from "./tabs/SearchTab";
import TripsTab from "./tabs/TripsTab";
import AccountTab from "./tabs/AccountTab";

const tabs = [
  {
    key: "home", label: "Home",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"
          stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8" fill={active ? "#1c1c1e" : "none"}/>
        <path d="M9 21V13h6v8" stroke={active ? "white" : "#8e8e93"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "search", label: "Search",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8"/>
        <path d="M21 21l-4.5-4.5" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "trips", label: "Trips",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="8" width="20" height="13" rx="2" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8" fill={active ? "#1c1c1e" : "none"}/>
        <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8"/>
        <path d="M2 13h20" stroke={active ? "white" : "#8e8e93"} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "account", label: "Account",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8" fill={active ? "#1c1c1e" : "none"}/>
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke={active ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

type TabKey = "home"|"search"|"trips"|"account";

export default function MainScreen() {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div className="flex flex-col bg-white" style={{ height: "100dvh" }}>
      <div className="flex-1 overflow-hidden">
        {tab === "home"    && <HomeTab />}
        {tab === "search"  && <SearchTab />}
        {tab === "trips"   && <TripsTab onSwitchToHome={() => setTab("home")} />}
        {tab === "account" && <AccountTab />}
      </div>

      {/* Bottom tab bar */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200">
        <div className="flex">
          {tabs.map(t => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key as TabKey)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5"
              >
                {t.icon(isActive)}
                <span className="text-[10px] font-medium" style={{ color: isActive ? "#1c1c1e" : "#8e8e93" }}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center pb-1 pt-0.5">
          <div className="w-[120px] h-1 rounded-full bg-gray-200"/>
        </div>
      </div>
    </div>
  );
}
