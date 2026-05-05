import { motion } from "framer-motion";

const events = [
  { sem: "01", title: "Foundations", desc: "First lines of code. Curiosity ignited.", tag: "INIT" },
  { sem: "02", title: "Logic & Structure", desc: "Algorithms became language.", tag: "BUILD" },
  { sem: "03", title: "Systems Thinking", desc: "Connecting dots across disciplines.", tag: "MAP" },
  { sem: "04", title: "Co-Founder", desc: "Stepped into leadership. Built a team.", tag: "LEAD" },
  { sem: "05", title: "Data Awakening", desc: "Patterns, models, intuition.", tag: "DATA" },
  { sem: "06", title: "AI Mastery", desc: "Trained models that learned back.", tag: "AI" },
  { sem: "07", title: "Vision", desc: "Strategy meets execution.", tag: "SCALE" },
  { sem: "08", title: "Completion", desc: "A chapter closed. A future opened.", tag: "DONE" },
];

export default function Timeline() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <div className="font-mono text-xs text-muted-foreground">TIMELINE://JOURNEY.MAP</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Eight chapters. <span className="text-gradient">One signal.</span></h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent md:left-1/2" />
          <div className="space-y-12">
            {events.map((e, i) => (
              <motion.div
                key={e.sem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className={`relative flex md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-4 -translate-x-1/2 md:left-1/2">
                  <div className="h-3 w-3 rounded-full bg-accent neon-glow" />
                </div>
                <div className="ml-12 w-full md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass group cursor-default rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-accent/40">
                    <div className="mb-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                      <span>SEM_{e.sem}</span>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{e.tag}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
