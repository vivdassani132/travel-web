"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";

const steps = [
  {
    q: "What kind of traveller are you?",
    hint: "Pick the one that fits best.",
    key: "travelStyle" as const,
    options: [
      { emoji: "🏄", label: "Adventurer", desc: "Surf, hike, skydive — you live for it" },
      { emoji: "📸", label: "Explorer", desc: "Hidden gems, local spots, off the map" },
      { emoji: "🍷", label: "Connoisseur", desc: "Fine dining, wine, cultural depth" },
      { emoji: "🧘", label: "Slow traveller", desc: "Settle in, soak it up" },
      { emoji: "🎉", label: "Social", desc: "Nightlife, festivals, meeting people" },
    ],
    multi: false,
  },
  {
    q: "What's your budget style?",
    hint: "We'll find the best value at any level.",
    key: "budget" as const,
    options: [
      { emoji: "💸", label: "Budget", desc: "Under $100/day — stretch every dollar" },
      { emoji: "💳", label: "Mid-range", desc: "$100–300/day — comfort meets value" },
      { emoji: "💎", label: "Luxury", desc: "$300+/day — no compromises" },
      { emoji: "🤷", label: "Flexible", desc: "Depends on the trip" },
    ],
    multi: false,
  },
  {
    q: "What's your travel pace?",
    hint: "No right answer — just yours.",
    key: "pace" as const,
    options: [
      { emoji: "🐢", label: "Slow & deep", desc: "2–3 places, really soak them in" },
      { emoji: "⚖️", label: "Balanced", desc: "Mix of planned and spontaneous" },
      { emoji: "🚀", label: "Pack it in", desc: "See and do as much as possible" },
    ],
    multi: false,
  },
  {
    q: "What do you love doing?",
    hint: "Pick as many as you like.",
    key: "interests" as const,
    options: [
      { emoji: "🍜", label: "Street food", desc: "" },
      { emoji: "🏛️", label: "History", desc: "" },
      { emoji: "🎵", label: "Music", desc: "" },
      { emoji: "🏖️", label: "Beaches", desc: "" },
      { emoji: "🎨", label: "Art", desc: "" },
      { emoji: "🥾", label: "Hiking", desc: "" },
      { emoji: "🛍️", label: "Shopping", desc: "" },
      { emoji: "🌿", label: "Nature", desc: "" },
      { emoji: "🍷", label: "Wine", desc: "" },
      { emoji: "📸", label: "Photography", desc: "" },
      { emoji: "🧘", label: "Wellness", desc: "" },
      { emoji: "🌃", label: "Nightlife", desc: "" },
    ],
    multi: true,
  },
  {
    q: "Where do you like to stay?",
    hint: "Sets the whole tone of your trip.",
    key: "accommodation" as const,
    options: [
      { emoji: "🏨", label: "Hotel", desc: "Comfort and service" },
      { emoji: "🏡", label: "Airbnb", desc: "Local feel, your own space" },
      { emoji: "🌿", label: "Boutique", desc: "Character in every room" },
      { emoji: "⛺", label: "Hostel / Camp", desc: "Budget-smart and social" },
      { emoji: "🛥️", label: "Unique stays", desc: "Treehouses, boats, anything surprising" },
    ],
    multi: false,
  },
];

export default function OnboardingScreen() {
  const { setScreen, setProfile, profile } = useStore();
  const [step, setStep] = useState(0);
  const current = steps[step];

  const getValue = () => {
    if (current.key === "interests") return profile.interests;
    return profile[current.key as keyof typeof profile] as string;
  };

  const canContinue = current.multi
    ? (getValue() as string[]).length > 0
    : !!(getValue() as string);

  const handleSelect = (label: string) => {
    if (current.multi) {
      const arr = [...profile.interests];
      const idx = arr.indexOf(label);
      if (idx >= 0) arr.splice(idx, 1); else arr.push(label);
      setProfile({ interests: arr });
    } else {
      setProfile({ [current.key]: label });
    }
  };

  const isSelected = (label: string) =>
    current.multi ? profile.interests.includes(label) : getValue() === label;

  const next = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else setScreen("main");
  };

  return (
    <div className="flex flex-col h-dvh bg-[#f2f2f7]">
      {/* Progress */}
      <div className="px-5 pt-14 pb-5">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ background: i <= step ? "#007a66" : "#e5e5ea" }} />
          ))}
        </div>
        <p className="text-[13px] font-medium mt-3" style={{ color: "#007a66" }}>
          Question {step + 1} of {steps.length}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        <h2 className="text-[26px] font-bold text-gray-900 mb-1">{current.q}</h2>
        <p className="text-[15px] text-gray-500 mb-6">{current.hint}</p>

        {current.multi ? (
          <div className="grid grid-cols-2 gap-2.5">
            {current.options.map(o => (
              <button key={o.label} onClick={() => handleSelect(o.label)}
                className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-left transition-all"
                style={{
                  background: isSelected(o.label) ? "rgba(0,122,102,0.10)" : "#fff",
                  border: `1.5px solid ${isSelected(o.label) ? "#007a66" : "transparent"}`,
                }}>
                <span className="text-xl">{o.emoji}</span>
                <span className="text-[14px] font-medium text-gray-900">{o.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5">
            {current.options.map(o => (
              <button key={o.label} onClick={() => handleSelect(o.label)}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all"
                style={{
                  background: isSelected(o.label) ? "rgba(0,122,102,0.10)" : "#fff",
                  border: `1.5px solid ${isSelected(o.label) ? "#007a66" : "transparent"}`,
                }}>
                <span className="text-[26px] w-10 text-center">{o.emoji}</span>
                <div className="flex-1">
                  <div className="text-[16px] font-semibold"
                    style={{ color: isSelected(o.label) ? "#007a66" : "#111" }}>{o.label}</div>
                  {o.desc && <div className="text-[13px] text-gray-500">{o.desc}</div>}
                </div>
                <div className="text-xl"
                  style={{ color: isSelected(o.label) ? "#007a66" : "#c7c7cc" }}>
                  {isSelected(o.label) ? "✓" : "○"}
                </div>
              </button>
            ))}
          </div>
        )}
        <div className="h-6" />
      </div>

      {/* Button */}
      <div className="px-5 pb-10 pt-4">
        <button onClick={next} disabled={!canContinue}
          className="w-full h-[54px] rounded-2xl text-white text-[17px] font-semibold transition-opacity"
          style={{ background: "#007a66", opacity: canContinue ? 1 : 0.4 }}>
          {step === steps.length - 1 ? "Build my profile ✨" : "Continue"}
        </button>
      </div>
    </div>
  );
}
