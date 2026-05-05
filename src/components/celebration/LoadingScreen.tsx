import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const lines = [
  "> Initializing celebration protocol…",
  "> Loading neural pathways…",
  "> Calibrating achievement vectors…",
  "> Authenticating: Leader / Co-Founder / Programmer…",
  "> Ready.",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown((s) => [...s, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(id);
        setTimeout(() => { setDone(true); onDone(); }, 700);
      }
    }, 480);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-scan" />
          <div className="relative w-full max-w-xl px-8 font-mono text-sm">
            <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              SYSTEM://CEREMONY.AI
            </div>
            {shown.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-foreground/90"
              >
                {l}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
