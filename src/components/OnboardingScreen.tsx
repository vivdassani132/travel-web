"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";

// Hero images shown at top of each step
const stepImages = [
  "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg",
  "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg",
  "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg",
  "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg",
  "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg",
];

const steps = [
  {
    q: "What kind of traveller are you?",
    hint: "Pick the one that fits best.",
    key: "travelStyle" as const,
    multi: false,
    options: [
      { label: "Adventurer", desc: "Surf, hike, skydive — you live for it" },
      { label: "Explorer", desc: "Hidden gems, local spots, off the map" },
      { label: "Connoisseur", desc: "Fine dining, wine, cultural depth" },
      { label: "Slow traveller", desc: "Settle in, soak it up, no rush" },
      { label: "Social butterfly", desc: "Nightlife, festivals, meeting people" },
    ],
  },
  {
    q: "What's your budget style?",
    hint: "We'll find the best value at any level.",
    key: "budget" as const,
    multi: false,
    options: [
      { label: "Budget", desc: "Under $100/day — stretch every dollar" },
      { label: "Mid-range", desc: "$100–300/day — comfort meets value" },
      { label: "Luxury", desc: "$300+/day — no compromises" },
      { label: "Flexible", desc: "Depends on the trip" },
    ],
  },
  {
    q: "What's your travel pace?",
    hint: "No right answer — just yours.",
    key: "pace" as const,
    multi: false,
    options: [
      { label: "Slow & deep", desc: "2–3 places, really soak them in" },
      { label: "Balanced", desc: "Mix of planned and spontaneous" },
      { label: "Pack it in", desc: "See and do as much as possible" },
    ],
  },
  {
    q: "What environments call to you?",
    hint: "Pick the biomes that pull you in.",
    key: "interests" as const,
    multi: true,
    options: [
      { label: "Alpine & Highland",  photo: "https://i.pinimg.com/1200x/6e/7f/eb/6e7febf97b4eb37736d12347658b43c5.jpg" },
      { label: "Coastal & Ocean",     photo: "https://i.pinimg.com/1200x/89/92/da/8992da97b30bd7a97c12cae8d68fd4a2.jpg" },
      { label: "Tropical Island",     photo: "https://i.pinimg.com/1200x/ec/38/a3/ec38a3bf4a8a1b6c838c9ddca0a66833.jpg" },
      { label: "Rainforest & Jungle", photo: "https://i.pinimg.com/736x/3c/5b/a9/3c5ba90171601238cbd6f62058628569.jpg" },
      { label: "Volcanic & Gorge",    photo: "https://i.pinimg.com/736x/52/64/be/5264be0299957c5ceb6dca23b014c05f.jpg" },
      { label: "Boreal & Tundra",     photo: "https://i.pinimg.com/1200x/fa/c8/04/fac80456650bd429dd4ae2f22adcc2c1.jpg" },
      { label: "Bamboo & Forest",     photo: "https://i.pinimg.com/1200x/c0/46/bb/c046bb1351a1297b012cbb996cdc9836.jpg" },
      { label: "Pampas & Steppe",     photo: "https://i.pinimg.com/1200x/19/a8/d8/19a8d8e4823bfe5c62e42ecd23d9555d.jpg" },
      { label: "Hot Arid Desert",     photo: "https://i.pinimg.com/1200x/d1/e8/9e/d1e89e20ad29db9f1e0b622718ec703d.jpg" },
      { label: "Urban Landscape",     photo: "https://i.pinimg.com/1200x/1c/d1/b2/1cd1b22dd9aba43c65672ce40398bbea.jpg" },
    ],
  },
  {
    q: "Where do you like to stay?",
    hint: "Sets the whole tone of your trip.",
    key: "accommodation" as const,
    multi: false,
    options: [
      { label: "Hotel", desc: "Comfort and full service" },
      { label: "Airbnb", desc: "Local feel, your own space" },
      { label: "Boutique", desc: "Character in every room" },
      { label: "Hostel / Camp", desc: "Budget-smart and social" },
      { label: "Unique stays", desc: "Treehouses, boats, anything surprising" },
    ],
  },
];

type StepOption = { label: string; desc?: string; photo?: string };

export default function OnboardingScreen() {
  const { setScreen, setProfile, profile } = useStore();
  const [step, setStep] = useState(0);
  const current = steps[step];

  const getValue = () =>
    current.key === "interests" ? profile.interests : (profile[current.key as keyof typeof profile] as string);

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

  const isPhotoStep = current.multi && !!(current.options[0] as StepOption & { photo?: string }).photo;

  return (
    <div className="flex flex-col bg-white overflow-hidden" style={{ height: "100dvh" }}>

      {/* ── Hero image ── */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: isPhotoStep ? "28%" : "34%" }}>
        {stepImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ opacity: i === step ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <img src={img} alt="" className="w-full h-full object-cover object-center" draggable={false} />
          </div>
        ))}
        {/* bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, white, transparent)" }}
        />
        {/* Back button */}
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="absolute top-12 left-5 w-[34px] h-[34px] rounded-full bg-white/80 flex items-center justify-center shadow-sm"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#1c1c1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── White bottom ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">

        {/* Progress bar */}
        <div className="px-5 pt-1 pb-4">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[3px] rounded-full transition-all duration-400"
                style={{ background: i <= step ? "#1c1c1e" : "#e5e5ea" }}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="px-5 mb-4">
          <h2 className="font-serif text-[24px] text-black leading-snug">
            {current.q}
          </h2>
          <p className="text-[14px] text-gray-400 mt-1">{current.hint}</p>
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
          {isPhotoStep ? (
            // Photo grid for interests
            <div className="grid grid-cols-2 gap-2.5 pb-4">
              {current.options.map((o: StepOption) => {
                const sel = isSelected(o.label);
                return (
                  <button
                    key={o.label}
                    onClick={() => handleSelect(o.label)}
                    className="relative overflow-hidden rounded-2xl text-left"
                    style={{ height: 100 }}
                  >
                    <img src={o.photo} alt={o.label} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: sel ? "rgba(28,28,30,0.35)" : "rgba(0,0,0,0.22)" }}
                    />
                    {/* Selection ring */}
                    {sel && (
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: "2.5px solid #1c1c1e" }}
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end p-2.5">
                      <span className="text-white font-semibold text-[13px]">{o.label}</span>
                    </div>
                    {sel && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#1c1c1e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            // Text option rows
            <div className="space-y-2 pb-4">
              {current.options.map((o: StepOption) => {
                const sel = isSelected(o.label);
                return (
                  <button
                    key={o.label}
                    onClick={() => handleSelect(o.label)}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all"
                    style={{
                      background: sel ? "#1c1c1e" : "#f2f2f7",
                      border: "none",
                    }}
                  >
                    <div>
                      <div className="text-[15px] font-semibold" style={{ color: sel ? "#fff" : "#1c1c1e" }}>
                        {o.label}
                      </div>
                      {o.desc && (
                        <div className="text-[12px] mt-0.5" style={{ color: sel ? "rgba(255,255,255,0.65)" : "#8e8e93" }}>
                          {o.desc}
                        </div>
                      )}
                    </div>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                      style={{ background: sel ? "rgba(255,255,255,0.2)" : "#e5e5ea" }}
                    >
                      {sel && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="px-5 pb-8 pt-3 flex-shrink-0">
          <button
            onClick={next}
            disabled={!canContinue}
            className="w-full py-4 rounded-2xl text-[16px] font-semibold text-white transition-opacity"
            style={{ background: "#1c1c1e", opacity: canContinue ? 1 : 0.25 }}
          >
            {step === steps.length - 1 ? "Build my profile →" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
