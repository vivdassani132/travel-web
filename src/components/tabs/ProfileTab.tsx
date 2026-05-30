"use client";
import { useStore } from "@/lib/store";

const dnaTraits = [
  { label: "Adventure", pct: 82, color: "#d45a20" },
  { label: "Culture", pct: 91, color: "#3478c0" },
  { label: "Foodie", pct: 76, color: "#e08a10" },
  { label: "Relaxation", pct: 58, color: "#10a080" },
  { label: "Social", pct: 65, color: "#8040a0" },
];

const badges = [
  { emoji: "🌏", label: "Asia Explorer" },
  { emoji: "🍜", label: "Foodie" },
  { emoji: "📸", label: "Photographer" },
  { emoji: "🏔️", label: "Adventurer" },
];

export default function ProfileTab() {
  const { profile, setScreen } = useStore();

  const interests = profile.interests.length > 0 ? profile.interests : ["Culture", "Food", "Nature"];
  const travelStyle = profile.travelStyle || "Explorer";
  const budget = profile.budget || "Mid-range";
  const pace = profile.pace || "Balanced";

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-[#f2f2f7]">
      {/* Header card */}
      <div className="bg-white pb-6">
        <div className="relative h-[110px] bg-gradient-to-br from-[#3478c0] to-[#1a4d8a]">
          <div className="absolute -bottom-[40px] left-5">
            <div className="w-[80px] h-[80px] rounded-full bg-amber-200 border-4 border-white flex items-center justify-center text-3xl shadow-md">
              ✈️
            </div>
          </div>
        </div>
        <div className="pt-12 px-5">
          <div className="text-[22px] font-bold text-gray-900">Traveller</div>
          <div className="text-[14px] text-gray-400 mt-0.5">@traveller · Member since 2024</div>
          <div className="flex gap-4 mt-3">
            <div className="text-center">
              <div className="text-[18px] font-bold text-gray-900">7</div>
              <div className="text-[11px] text-gray-400">Trips</div>
            </div>
            <div className="text-center">
              <div className="text-[18px] font-bold text-gray-900">12</div>
              <div className="text-[11px] text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-[18px] font-bold text-gray-900">24k</div>
              <div className="text-[11px] text-gray-400">km</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Travel DNA */}
        <div className="bg-white rounded-2xl p-4">
          <div className="text-[17px] font-bold text-gray-900 mb-1">Travel DNA</div>
          <div className="text-[13px] text-gray-400 mb-4">Based on your preferences</div>
          <div className="space-y-3">
            {dnaTraits.map(trait => (
              <div key={trait.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[13px] font-medium text-gray-700">{trait.label}</span>
                  <span className="text-[13px] font-semibold" style={{ color: trait.color }}>{trait.pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${trait.pct}%`, backgroundColor: trait.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-2xl p-4">
          <div className="text-[17px] font-bold text-gray-900 mb-3">Your Profile</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🧭", label: "Style", value: travelStyle },
              { icon: "💰", label: "Budget", value: budget },
              { icon: "⚡", label: "Pace", value: pace },
              { icon: "🏠", label: "Stay", value: profile.accommodation || "Hotel" },
            ].map(item => (
              <div key={item.label} className="bg-[#f9f9fb] rounded-xl p-3">
                <div className="text-[18px] mb-1">{item.icon}</div>
                <div className="text-[11px] text-gray-400">{item.label}</div>
                <div className="text-[13px] font-semibold text-gray-800 mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white rounded-2xl p-4">
          <div className="text-[17px] font-bold text-gray-900 mb-3">Interests</div>
          <div className="flex flex-wrap gap-2">
            {interests.map(i => (
              <span key={i} className="bg-[#f2f2f7] rounded-full px-3 py-1.5 text-[13px] font-medium text-gray-700">{i}</span>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-4">
          <div className="text-[17px] font-bold text-gray-900 mb-3">Badges</div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(b => (
              <div key={b.label} className="flex flex-col items-center">
                <div className="w-[50px] h-[50px] bg-[#f2f2f7] rounded-2xl flex items-center justify-center text-2xl">
                  {b.emoji}
                </div>
                <div className="text-[10px] text-gray-500 mt-1.5 text-center leading-tight">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings quick links */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {[
            { icon: "⚙️", label: "Settings" },
            { icon: "🔄", label: "Retake Onboarding", action: () => setScreen("onboarding") },
            { icon: "❓", label: "Help & Support" },
            { icon: "🚪", label: "Sign Out" },
          ].map((item, i, arr) => (
            <button key={item.label} onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-[18px] w-6">{item.icon}</span>
              <span className={`text-[15px] font-medium ${item.label === "Sign Out" ? "text-red-500" : "text-gray-800"}`}>{item.label}</span>
              <span className="ml-auto text-gray-300">›</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-28" />
    </div>
  );
}
