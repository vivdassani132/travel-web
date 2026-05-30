"use client";
import { useStore } from "@/lib/store";
import WelcomeScreen from "@/components/WelcomeScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import MainScreen from "@/components/MainScreen";

export default function Home() {
  const { screen } = useStore();
  if (screen === "welcome") return <WelcomeScreen />;
  if (screen === "onboarding") return <OnboardingScreen />;
  return <MainScreen />;
}
