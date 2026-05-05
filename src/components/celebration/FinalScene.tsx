import { motion } from "framer-motion";

export default function FinalScene() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-6 py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 animate-pulse-glow"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.22 280 / 50%), transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <div className="font-mono text-xs text-muted-foreground">EPILOGUE://NEXT</div>
        <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-tight md:text-7xl">
          This is not the end.
          <br />
          <span className="text-gradient">This is your next beginning.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-sm text-muted-foreground">
          The system has logged your achievement. The horizon has noted your name.
        </p>
        <div className="mt-12 inline-flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          SESSION COMPLETE · 2026
        </div>
      </motion.div>
    </section>
  );
}
