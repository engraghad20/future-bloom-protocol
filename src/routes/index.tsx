import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ParticleField from "@/components/celebration/ParticleField";
import CursorAura from "@/components/celebration/CursorAura";
import LoadingScreen from "@/components/celebration/LoadingScreen";
import Hero from "@/components/celebration/Hero";
import BuildUp from "@/components/celebration/BuildUp";
import PeakMoment from "@/components/celebration/PeakMoment";
import MotivationalMessages from "@/components/celebration/MotivationalMessages";
import EmotionalPeak from "@/components/celebration/EmotionalPeak";
import FinalScene from "@/components/celebration/FinalScene";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Semester 8 — Completed" },
      { name: "description", content: "A cinematic celebration of finishing the final chapter." },
    ],
  }),
});

function Index() {
  const [ready, setReady] = useState(false);
  return (
    <main className="relative min-h-screen">
      <LoadingScreen onDone={() => setReady(true)} />
      <ParticleField />
      <CursorAura />

      <div
        className="relative z-10 transition-opacity duration-1000"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Hero />
        <BuildUp />
        <PeakMoment />
        <MotivationalMessages />
        <EmotionalPeak />
        <FinalScene />
      </div>
    </main>
  );
}
