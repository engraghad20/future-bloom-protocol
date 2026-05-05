import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function playBoom() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // sub bass
    const o1 = ctx.createOscillator(); const g1 = ctx.createGain();
    o1.type = "sine"; o1.frequency.setValueAtTime(120, now); o1.frequency.exponentialRampToValueAtTime(40, now + 1.4);
    g1.gain.setValueAtTime(0.0001, now); g1.gain.linearRampToValueAtTime(0.4, now + 0.05); g1.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    o1.connect(g1).connect(ctx.destination); o1.start(now); o1.stop(now + 1.7);
    // shimmer
    [880, 1320, 1760, 2640].forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.05);
      g.gain.linearRampToValueAtTime(0.05, now + i * 0.05 + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 2);
      o.connect(g).connect(ctx.destination); o.start(now + i * 0.05); o.stop(now + 2.1);
    });
    setTimeout(() => ctx.close(), 3000);
  } catch { /* noop */ }
}

export default function PeakMoment() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!inView) return;
    playBoom();
    const t = setTimeout(() => setRevealed(true), 900);

    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.offsetWidth * dpr; c.height = c.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
    };
    resize();
    const W = () => c.offsetWidth, H = () => c.offsetHeight;
    const cx = () => W() / 2, cy = () => H() / 2;

    type P = { x: number; y: number; vx: number; vy: number; life: number; hue: number };
    const particles: P[] = Array.from({ length: 280 }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 9 + 2;
      return { x: cx(), y: cy(), vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue: 260 + Math.random() * 80 };
    });
    type Ray = { a: number; len: number; speed: number };
    const rays: Ray[] = Array.from({ length: 14 }, () => ({ a: Math.random() * Math.PI * 2, len: 0, speed: Math.random() * 30 + 20 }));

    let raf = 0; let frame = 0;
    const tick = () => {
      frame++;
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, W(), H());

      // light rays
      ctx.save();
      ctx.translate(cx(), cy());
      for (const r of rays) {
        r.len += r.speed; r.speed *= 0.985;
        const grad = ctx.createLinearGradient(0, 0, Math.cos(r.a) * r.len, Math.sin(r.a) * r.len);
        grad.addColorStop(0, "rgba(180,170,255,0.8)");
        grad.addColorStop(1, "rgba(120,180,255,0)");
        ctx.strokeStyle = grad; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(r.a) * r.len, Math.sin(r.a) * r.len); ctx.stroke();
      }
      ctx.restore();

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.978; p.vy *= 0.978;
        p.life *= 0.992;
        ctx.beginPath();
        ctx.fillStyle = `oklch(0.78 0.22 ${p.hue} / ${p.life})`;
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // central flash
      if (frame < 30) {
        const a = 1 - frame / 30;
        const grad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), Math.max(W(), H()));
        grad.addColorStop(0, `rgba(255,255,255,${a * 0.9})`);
        grad.addColorStop(0.2, `rgba(180,170,255,${a * 0.4})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W(), H());
      }

      if (frame < 600) raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [inView]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
        animate={revealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-accent">// status</div>
        <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-8xl">
          <span className="text-foreground">Semester 8</span>
          <br />
          <span className="text-gradient">— Completed</span>
        </h2>
      </motion.div>
    </section>
  );
}
