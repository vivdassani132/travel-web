"use client";
import { useStore } from "@/lib/store";

export default function WelcomeScreen() {
  const { setScreen } = useStore();
  return (
    <div className="flex flex-col h-dvh bg-white px-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-9">
        {/* Icon */}
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
          style={{ background: "rgba(0,122,102,0.10)" }}>
          ✈️
        </div>

        {/* Headline */}
        <div className="text-center space-y-3">
          <h1 className="text-[34px] font-bold tracking-tight text-gray-900 leading-tight">
            Travel, your way.
          </h1>
          <p className="text-[17px] text-gray-500 leading-relaxed">
            Tell us what you love. We&apos;ll plan<br />the perfect trip around you.
          </p>
        </div>

        {/* Features */}
        <div className="w-full rounded-2xl overflow-hidden" style={{ background: "#f2f2f7" }}>
          {[
            { icon: "✨", title: "Built around you", sub: "Trips curated to your exact taste" },
            { icon: "🍴", title: "Restaurants you'll love", sub: "Matched to your palate and budget" },
            { icon: "📅", title: "Complete itineraries", sub: "Day-by-day, nothing to figure out" },
          ].map((f, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 px-4 py-[13px]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(0,122,102,0.10)" }}>
                  {f.icon}
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">{f.title}</div>
                  <div className="text-[13px] text-gray-500">{f.sub}</div>
                </div>
              </div>
              {i < 2 && <div className="h-px bg-gray-200 ml-[72px]" />}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pb-12 space-y-4">
        <button
          onClick={() => setScreen("onboarding")}
          className="w-full h-[54px] rounded-2xl text-white text-[17px] font-semibold"
          style={{ background: "#007a66" }}>
          Get Started
        </button>
        <p className="text-center text-[13px] text-gray-400">Free to use · No account needed</p>
      </div>
    </div>
  );
}
