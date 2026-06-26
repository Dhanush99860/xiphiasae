"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  /** Palette: `gold` (warm), `oasis` (blue-teal), or `mixed`. */
  tone?: "gold" | "oasis" | "mixed";
  /** 0–1 overall intensity. */
  intensity?: number;
};

/**
 * Ambient drifting aurora/gold-veil background. Pure CSS radial blobs animated
 * with framer-motion; sits behind content (pointer-events-none, aria-hidden).
 * Renders a static glow under reduced motion. Cheap — only transform/opacity.
 */
export default function AuroraBackground({ className, tone = "mixed", intensity = 1 }: Props) {
  const reduce = useReducedMotion();

  // Desert Sand (light): very pale warm washes — soft gold + dune + ivory.
  // Subtle on a sand ground; never muddy.
  const blobs =
    tone === "gold"
      ? ["rgba(212,175,55,0.16)", "rgba(232,220,200,0.55)", "rgba(255,243,214,0.45)"]
      : tone === "oasis"
        ? ["rgba(232,220,200,0.6)", "rgba(212,175,55,0.10)", "rgba(245,237,224,0.6)"]
        : ["rgba(212,175,55,0.13)", "rgba(232,220,200,0.55)", "rgba(255,243,214,0.4)"];

  const common = "absolute rounded-full blur-3xl will-change-transform";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.div
        className={common}
        style={{
          top: "-15%",
          left: "5%",
          width: "55vw",
          height: "55vw",
          opacity: 0.9 * intensity,
          background: `radial-gradient(closest-side, ${blobs[0]}, transparent 70%)`,
        }}
        animate={reduce ? undefined : { x: [0, 60, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className={common}
        style={{
          bottom: "-20%",
          right: "0%",
          width: "60vw",
          height: "60vw",
          opacity: 0.85 * intensity,
          background: `radial-gradient(closest-side, ${blobs[1]}, transparent 70%)`,
        }}
        animate={reduce ? undefined : { x: [0, -50, 20, 0], y: [0, -25, 15, 0] }}
        transition={{ duration: 32, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className={common}
        style={{
          top: "25%",
          right: "20%",
          width: "35vw",
          height: "35vw",
          opacity: 0.8 * intensity,
          background: `radial-gradient(closest-side, ${blobs[2]}, transparent 70%)`,
        }}
        animate={reduce ? undefined : { x: [0, 30, -30, 0], y: [0, -20, 20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}
