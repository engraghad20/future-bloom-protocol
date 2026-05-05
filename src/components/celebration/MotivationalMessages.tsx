import { motion } from "framer-motion";

const messages = [
  "You made it.",
  "Every late night was worth it.",
  "You didn't stop — and that changed everything.",
  "Discipline beats everything.",
  "You pushed through when it was hardest.",
  "This is proof of your strength.",
  "You finished what many couldn't.",
  "You earned this moment.",
  "No shortcuts. Just effort.",
  "This is your victory.",
];

export default function MotivationalMessages() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          system message stream
        </div>
        <div className="space-y-20 md:space-y-28">
          {messages.map((m, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30%" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className={`text-center text-3xl font-semibold leading-tight md:text-5xl ${
                i % 3 === 0 ? "text-gradient" : "text-foreground"
              }`}
            >
              {m}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
