import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorAura() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const on = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", on);
    return () => window.removeEventListener("mousemove", on);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed z-[60] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: "radial-gradient(circle, oklch(0.78 0.2 280 / 25%), transparent 60%)",
        filter: "blur(20px)",
      }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.6 }}
    />
  );
}
