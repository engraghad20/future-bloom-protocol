import { motion } from "framer-motion";

const cards = [
  { role: "LEADER", title: "Leader", desc: "Guides vision into reality. Builds people, not just products.", icon: "◆" },
  { role: "FOUNDER", title: "Co-Founder", desc: "Architect of ventures. Risk taken, ground broken.", icon: "◈" },
  { role: "ENGINEER", title: "Programmer", desc: "Translates complexity into elegant systems.", icon: "◇" },
];

export default function Identity() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <div className="font-mono text-xs text-muted-foreground">IDENTITY://CORE.MATRIX</div>
          <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Three signals. <span className="text-gradient">One voice.</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass p-8 transition-all hover:-translate-y-2 hover:border-accent/50"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, oklch(0.5 0.25 280 / 25%), transparent 60%)" }}
              />
              <div className="relative">
                <div className="font-mono text-xs text-muted-foreground">{c.role}</div>
                <div className="mt-4 text-5xl text-accent animate-float-slow">{c.icon}</div>
                <h3 className="mt-6 text-3xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>STATUS: ACTIVE</span>
                  <span>v.08</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
