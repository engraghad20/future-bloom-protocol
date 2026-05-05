import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3400);
    const t3 = setTimeout(() => { setDone(true); onDone(); }, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />

          <div className="relative text-center font-mono">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div
                  key="p0"
                  initial={{ opacity: 0, letterSpacing: "0.6em" }}
                  animate={{ opacity: 1, letterSpacing: "0.2em" }}
                  exit={{ opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 1.2 }}
                  className="text-sm uppercase tracking-widest text-foreground/80 md:text-base"
                >
                  Loading Final Chapter<span className="caret" />
                </motion.div>
              )}
              {phase === 1 && (
                <motion.div
                  key="p1"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(12px)", scale: 1.05 }}
                  transition={{ duration: 1 }}
                  className="text-2xl font-semibold text-foreground md:text-4xl"
                >
                  End of Semester <span className="text-gradient">8</span>
                </motion.div>
              )}
              {phase === 2 && (
                <motion.div
                  key="p2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 text-xs text-muted-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Initializing experience…
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
