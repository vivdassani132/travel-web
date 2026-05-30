"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

const slides = [
  {
    image: "https://i.pinimg.com/1200x/8e/30/a9/8e30a98384704f2627139390d4eb430e.jpg",
    title: "Travel,\nsimplified.",
    subtitle: "Keep your plans, packing, and\nprogress in one place.",
  },
  {
    image: "https://i.pinimg.com/736x/92/c3/a5/92c3a5433d9f225a8c2d60a2c305585f.jpg",
    title: "Your trip,\ncurated for you.",
    subtitle: "AI-powered recommendations\nbased on your travel style.",
  },
  {
    image: "https://i.pinimg.com/1200x/89/e5/d3/89e5d3ad8e23b3de4260e2c0cb806588.jpg",
    title: "Explore the\nworld together.",
    subtitle: "Join trips, meet travellers,\nand share the adventure.",
  },
  {
    image: "https://i.pinimg.com/736x/28/c7/27/28c72731d2d0f7655112b04f267e884b.jpg",
    title: "Every detail,\ntaken care of.",
    subtitle: "Hotels, restaurants, itineraries —\nall in one beautiful app.",
  },
];

export default function WelcomeScreen() {
  const { setScreen } = useStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      if (current < slides.length - 1) setCurrent(c => c + 1);
    }, 4000);
    return () => clearTimeout(t);
  }, [current]);

  const goNext = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1);
    else setScreen("onboarding");
  };

  return (
    <div className="flex flex-col bg-white overflow-hidden" style={{ height: "100dvh" }}>
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: "58%" }}>
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{ opacity: i === current ? 1 : 0, transition: "opacity 0.6s ease" }}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover object-center" draggable={false} />
          </div>
        ))}
        {current < slides.length - 1 && (
          <button
            onClick={() => setScreen("onboarding")}
            className="absolute top-14 right-5 text-[14px] font-semibold text-white/90 bg-black/20 rounded-full px-3.5 py-1.5"
            style={{ backdropFilter: "blur(8px)" }}
          >
            Skip
          </button>
        )}
      </div>

      <div className="flex-1 bg-white flex flex-col px-6 pt-6 pb-8">
        <div className="flex-1">
          <h1 className="font-bold text-gray-900 leading-tight whitespace-pre-line" style={{ fontSize: 30, letterSpacing: "-0.5px" }}>
            {slides[current].title}
          </h1>
          <p className="text-[15px] text-gray-400 mt-2 leading-relaxed whitespace-pre-line">
            {slides[current].subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 mb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? "#1c1c1e" : "#d1d1d6" }}
            />
          ))}
        </div>
        <button
          onClick={goNext}
          className="w-full py-4 rounded-2xl text-[16px] font-semibold text-white"
          style={{ background: "#1c1c1e" }}
        >
          {current === slides.length - 1 ? "Get Started →" : "Continue"}
        </button>
      </div>
    </div>
  );
}
