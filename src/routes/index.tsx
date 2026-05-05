import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ParticleField from "@/components/celebration/ParticleField";
import CursorAura from "@/components/celebration/CursorAura";
import LoadingScreen from "@/components/celebration/LoadingScreen";
import Hero from "@/components/celebration/Hero";
import AINarrative from "@/components/celebration/AINarrative";
import Timeline from "@/components/celebration/Timeline";
import CelebrationProtocol from "@/components/celebration/CelebrationProtocol";
import Identity from "@/components/celebration/Identity";
import FinalScene from "@/components/celebration/FinalScene";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  return (
    <main className="relative min-h-screen">
      <LoadingScreen onDone={() => setReady(true)} />
      <ParticleField />
      <CursorAura />

      <div
        className="relative z-10 transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Hero />
        <AINarrative />
        <Timeline />
        <CelebrationProtocol />
        <Identity />
        <FinalScene />
      </div>
    </main>
  );
}
