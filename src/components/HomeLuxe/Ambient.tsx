"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient — a *just-noticeable* background layer: two very soft gold/cool glows
 * that drift slowly, plus a few faint floating dust motes. Sits behind a section's
 * content (pointer-events-none, z-0; give the content `relative z-10`). Honours
 * reduced motion (renders the glows static). Fixed positions (no Math.random) to
 * avoid hydration mismatch.
 */
const DUST = [
  { l: "12%", t: "30%", d: 22, dl: 0 },
  { l: "28%", t: "70%", d: 28, dl: 4 },
  { l: "52%", t: "20%", d: 26, dl: 2 },
  { l: "68%", t: "60%", d: 30, dl: 6 },
  { l: "84%", t: "38%", d: 24, dl: 1 },
  { l: "40%", t: "84%", d: 32, dl: 3 },
];

export default function Ambient({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  // golden ambient (both glows gold-toned)
  const g1 = dark ? "rgba(191,161,92,0.15)" : "rgba(191,161,92,0.11)";
  const g2 = dark ? "rgba(214,176,96,0.12)" : "rgba(198,166,90,0.08)";
  const dot = dark ? "rgba(228,194,122,0.6)" : "rgba(176,144,78,0.45)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute h-[42rem] w-[42rem] rounded-full"
        style={{ background: `radial-gradient(circle, ${g1}, transparent 70%)`, top: "-12%", left: "4%", filter: "blur(36px)" }}
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 36, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-[36rem] w-[36rem] rounded-full"
        style={{ background: `radial-gradient(circle, ${g2}, transparent 70%)`, bottom: "-14%", right: "6%", filter: "blur(40px)" }}
        animate={reduce ? undefined : { x: [0, -52, 0], y: [0, -28, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduce &&
        DUST.map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{ left: p.l, top: p.t, background: dot, filter: "blur(0.5px)" }}
            animate={{ y: [0, -26, 0], opacity: [0, 1, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.dl }}
          />
        ))}
    </div>
  );
}
