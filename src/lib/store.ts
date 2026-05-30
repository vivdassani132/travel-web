"use client";
import { create } from "zustand";

type Screen = "welcome" | "onboarding" | "main";

interface Profile {
  travelStyle: string;
  budget: string;
  pace: string;
  interests: string[];
  accommodation: string;
}

interface Store {
  screen: Screen;
  profile: Profile;
  setScreen: (s: Screen) => void;
  setProfile: (p: Partial<Profile>) => void;
}

// Zustand via inline — lightweight store
let listeners: Array<() => void> = [];
let state: Store = {
  screen: "welcome",
  profile: { travelStyle: "", budget: "", pace: "", interests: [], accommodation: "" },
  setScreen: (s) => { state = { ...state, screen: s }; listeners.forEach(l => l()); },
  setProfile: (p) => { state = { ...state, profile: { ...state.profile, ...p } }; listeners.forEach(l => l()); },
};

export function useStore(): Store {
  // React hook shim — works with Next.js client components
  if (typeof window === "undefined") return state;
  const [, rerender] = (require("react") as typeof import("react")).useReducer(x => x + 1, 0);
  (require("react") as typeof import("react")).useEffect(() => {
    listeners.push(rerender);
    return () => { listeners = listeners.filter(l => l !== rerender); };
  }, [rerender]);
  return state;
}
