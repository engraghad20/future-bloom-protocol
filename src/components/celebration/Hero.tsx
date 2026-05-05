import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, oklch(0.5 0.25 285 / 45%), transparent 65%)" }}
      />
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          chapter // 08
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.01em" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-8xl"
        >
          <span className="text-foreground">A chapter ends.</span>
          <br />
          <span className="text-gradient">A force remains.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="mt-16 flex flex-col items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-8 w-px bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
