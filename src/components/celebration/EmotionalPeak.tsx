import { motion } from "framer-motion";

const lines = ["This wasn't luck.", "This was consistency.", "This was resilience."];

export default function EmotionalPeak() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.4 0.22 285 / 50%), transparent 60%), radial-gradient(ellipse at 30% 70%, oklch(0.4 0.2 220 / 35%), transparent 55%)",
        }}
      />
      <div className="relative z-10 space-y-12 text-center md:space-y-20">
        {lines.map((l, i) => (
          <motion.h3
            key={i}
            initial={{ opacity: 0, y: 60, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            viewport={{ once: true, margin: "-25%" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
            className="text-4xl font-semibold md:text-7xl"
          >
            {i === 1 ? <span className="text-gradient">{l}</span> : <span className="text-foreground">{l}</span>}
          </motion.h3>
        ))}
      </div>
    </section>
  );
}
