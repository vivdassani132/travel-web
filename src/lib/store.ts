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

export const useStore = create<Store>((set) => ({
  screen: "welcome",
  profile: { travelStyle: "", budget: "", pace: "", interests: [], accommodation: "" },
  setScreen: (screen) => set({ screen }),
  setProfile: (p) => set((state) => ({ profile: { ...state.profile, ...p } })),
}));
