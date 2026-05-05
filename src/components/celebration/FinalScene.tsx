import { motion } from "framer-motion";

export default function FinalScene() {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.22 285 / 45%), transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <h2 className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-7xl">
          And this is only{" "}
          <span className="text-gradient">the beginning.</span>
        </h2>
        <div className="mt-16 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          chapter closed
        </div>
      </motion.div>
    </section>
  );
}
