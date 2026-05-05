import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const script = [
  { label: "ANALYZE", text: "Analyzing journey trajectory…" },
  { label: "SCAN", text: "8 semesters processed. 0 incomplete." },
  { label: "SKILLS", text: "Acquired: Data Analysis · Artificial Intelligence · Leadership · Engineering." },
  { label: "ROLE", text: "Identity verified: Co-Founder / Programmer / Visionary." },
  { label: "STATUS", text: "Status: Ready for next horizon." },
];

export default function AINarrative() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [step, setStep] = useState(-1);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const next = () => {
      if (s >= script.length) return;
      setStep(s);
      const full = script[s].text;
      let i = 0;
      const typer = setInterval(() => {
        i++;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          clearInterval(typer);
          s++;
          setTimeout(next, 600);
        }
      }, 22);
    };
    next();
  }, [inView]);

  return (
    <section ref={ref} className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          AI://NARRATIVE.STREAM
        </div>
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="space-y-4 font-mono text-sm md:text-base">
            {script.map((line, i) => {
              if (i > step) return null;
              const isCurrent = i === step;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4"
                >
                  <span className="shrink-0 text-accent">[{line.label}]</span>
                  <span className={isCurrent ? "text-foreground caret" : "text-foreground/80"}>
                    {isCurrent ? typed : line.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
