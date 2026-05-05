import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Web Audio synthesized ambient pulse — no asset needed.
function playPulse() {
  try {
    const Ctx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new Ctx();
    const now = ctx.currentTime;
    const notes = [220, 277.18, 329.63, 440, 523.25];
    notes.forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.18);
      g.gain.linearRampToValueAtTime(0.18, now + i * 0.18 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 1.6);
      o.connect(g).connect(ctx.destination);
      o.start(now + i * 0.18);
      o.stop(now + i * 0.18 + 1.7);
    });
    setTimeout(() => ctx.close(), 4000);
  } catch { /* noop */ }
}

export default function CelebrationProtocol() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = c.offsetWidth, H = c.offsetHeight;
    const cx = W / 2, cy = H / 2;

    type N = { x: number; y: number; vx: number; vy: number; life: number };
    const nodes: N[] = Array.from({ length: 140 }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 4 + 1;
      return { x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 };
    });
    let raf = 0; let t = 0;
    const tick = () => {
      t++;
      ctx.fillStyle = "rgba(15,12,30,0.18)";
      ctx.fillRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.985; n.vy *= 0.985;
        n.life *= 0.992;
        ctx.beginPath();
        ctx.fillStyle = `rgba(190,170,255,${n.life})`;
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 6, nodes.length); j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.strokeStyle = `rgba(120,200,255,${(1 - d / 90) * 0.4 * a.life})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      if (t < 600) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="font-mono text-xs text-muted-foreground">PROTOCOL://CELEBRATION</div>
        <h2 className="mt-4 text-4xl font-semibold md:text-6xl">
          The moment, <span className="text-gradient">rendered.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">No fireworks. A neural bloom of light, data, and intention.</p>

        <div className="relative mt-12 overflow-hidden rounded-3xl glass">
          <canvas ref={canvasRef} className="h-[420px] w-full" />
          <AnimatePresence>
            {!active && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <button
                  onClick={() => { setActive(true); playPulse(); }}
                  className="group relative inline-flex items-center gap-3 rounded-full border border-accent/40 bg-background/40 px-8 py-4 font-mono text-sm uppercase tracking-widest transition-all hover:border-accent hover:shadow-[var(--shadow-neon)]"
                >
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Activate Celebration Protocol
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
