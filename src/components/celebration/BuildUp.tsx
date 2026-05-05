import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BuildUp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1.4, 2.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, 6]);

  return (
    <section ref={ref} className="relative flex min-h-[120vh] items-center justify-center overflow-hidden px-6">
      <motion.div
        style={{ scale, opacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.7 0.25 285 / 70%), oklch(0.55 0.22 230 / 30%) 40%, transparent 70%)" }}
        />
      </motion.div>

      <motion.h2
        style={{ filter: useTransform(blur, (b) => `blur(${b}px)`) }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30%" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center text-4xl font-semibold tracking-tight md:text-7xl"
      >
        <span className="text-gradient">It wasn't easy.</span>
      </motion.h2>
    </section>
  );
}
