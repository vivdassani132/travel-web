"use client";
import { useStore } from "@/lib/store";

export default function AccountTab() {
  const { setScreen } = useStore();

  return (
    <div className="h-full overflow-y-auto scrollbar-hide bg-white">
      <div className="px-4 pt-12 pb-4">
        <h1 className="font-serif text-[30px] text-black">Account</h1>
      </div>

      {/* Profile card */}
      <div className="mx-4 mb-5 border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="flex-1">
          <div className="font-satoshi text-[17px] font-bold text-gray-900">Traveller</div>
          <div className="font-satoshi text-[13px] text-gray-400">Level 3 · Explorer</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: i < 3 ? "#000000" : "#d1d1d6" }} />)}
            </div>
            <span className="font-satoshi text-[11px] text-gray-400">12 reviews</span>
          </div>
        </div>
        <button className="font-satoshi text-[13px] font-medium text-[#000000]">Edit</button>
      </div>

      {/* Menu items */}
      <div className="mx-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-4">
        {[
          { icon: "🗺️", label: "My Trips", badge: "3" },
          { icon: "❤️", label: "Saved", badge: "" },
          { icon: "⭐", label: "My Reviews", badge: "12" },
          { icon: "📸", label: "Photos", badge: "" },
        ].map((item, i, arr) => (
          <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="text-[20px] w-7">{item.icon}</span>
            <span className="flex-1 text-[15px] font-medium text-gray-800">{item.label}</span>
            {item.badge && <span className="text-[12px] font-semibold text-white bg-[#000000] rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        ))}
      </div>

      <div className="mx-4 border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-4">
        {[
          { icon: "⚙️", label: "Settings" },
          { icon: "🔄", label: "Retake Quiz", action: () => setScreen("onboarding") },
          { icon: "❓", label: "Help & Support" },
          { icon: "🚪", label: "Sign Out" },
        ].map((item, i, arr) => (
          <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="text-[20px] w-7">{item.icon}</span>
            <span className={`flex-1 text-[15px] font-medium ${item.label === "Sign Out" ? "text-red-500" : "text-gray-800"}`}>{item.label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        ))}
      </div>
      <div className="h-6" />
    </div>
  );
}
