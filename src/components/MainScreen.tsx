"use client";
import { useState } from "react";
import HomeTab from "./tabs/HomeTab";
import ExploreTab from "./tabs/ExploreTab";
import TripsTab from "./tabs/TripsTab";
import ChatTab from "./tabs/ChatTab";

// iOS-style SVG tab icons
const TabIcons = {
  home: (filled: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {filled
        ? <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill="#1c1c1e"/>
        : <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke="#8e8e93" strokeWidth="1.7" fill="none"/>
      }
      <path d="M9 21V12h6v9" stroke={filled ? "white" : "#8e8e93"} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  explore: (filled: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={filled ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.7" fill={filled ? "#1c1c1e" : "none"}/>
      <path d="M16.5 7.5l-2.5 5-5 2.5 2.5-5 5-2.5z" fill={filled ? "white" : "#8e8e93"}/>
    </svg>
  ),
  trips: (filled: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={filled ? "#1c1c1e" : "#8e8e93"} strokeWidth="1.7" fill={filled ? "#1c1c1e" : "none"}/>
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke={filled ? "white" : "#8e8e93"} strokeWidth="1.7"/>
      <path d="M12 12v4M10 14h4" stroke={filled ? "white" : "#8e8e93"} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  chat: (filled: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {filled
        ? <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="#1c1c1e"/>
        : <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#8e8e93" strokeWidth="1.7" fill="none"/>
      }
      <path d="M8 10h8M8 13h5" stroke={filled ? "white" : "#8e8e93"} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const tabs = [
  { key: "home",    label: "Home" },
  { key: "explore", label: "Explore" },
  { key: "trips",   label: "Trips" },
  { key: "chat",    label: "Chat" },
] as const;

type TabKey = typeof tabs[number]["key"];

export default function MainScreen() {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div className="flex flex-col bg-white" style={{ height: "100dvh" }}>
      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {tab === "home"    && <HomeTab />}
        {tab === "explore" && <ExploreTab />}
        {tab === "trips"   && <TripsTab />}
        {tab === "chat"    && <ChatTab />}
      </div>

      {/* Floating tab bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-7 px-8 z-40 pointer-events-none">
        <div
          className="flex w-full rounded-[28px] pointer-events-auto"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.06)",
            padding: "6px 4px",
          }}
        >
          {tabs.map(t => {
            const isActive = tab === t.key;
            const Icon = TabIcons[t.key];
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-1.5 transition-opacity"
                style={{ opacity: isActive ? 1 : 0.5 }}
              >
                {Icon(isActive)}
                <span
                  className="text-[10px] font-medium"
                  style={{ color: isActive ? "#1c1c1e" : "#8e8e93" }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
