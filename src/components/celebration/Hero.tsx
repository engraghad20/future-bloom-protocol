import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: "radial-gradient(circle, oklch(0.5 0.25 280 / 40%), transparent 65%)" }}
      />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          MILESTONE.08 / SEMESTER COMPLETE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">A Journey Completed.</span>
          <br />
          <span className="text-gradient">A Future Unlocked.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          A digital award ceremony — designed by the future, for the architects of it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-12 flex items-center justify-center gap-4 font-mono text-xs text-muted-foreground"
        >
          <span>↓ SCROLL TO BEGIN ANALYSIS</span>
        </motion.div>
      </div>
    </section>
  );
}
