"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * HorizonCanvas — the persistent background of the "Living Horizon" home.
 *
 * One fixed, full-viewport layer that travels NIGHT → DAWN → DAY as the page is
 * scrolled (the immigration story: pre-dawn aspiration → daylight arrival). It is
 * the single backdrop over which every section's content + image "windows" float,
 * so images get breathing room instead of stacking.
 *
 * Cheap by design — no WebGL: a scroll-driven linear gradient (sky → horizon) + a
 * rising radial "sun" glow + a faint drifting global graticule. Honours
 * prefers-reduced-motion (freezes to a static dawn gradient) and is render-once
 * cheap (transform/background only, on a single fixed element).
 *
 * Mounted INSIDE the home page (scoped to `/`), sitting at -z-10 behind content.
 */
export default function HorizonCanvas() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Sky (top) — stays deep until ~0.45, then lifts to daylight.
  const skyTop = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 0.85, 1],
    ["#070a12", "#10203a", "#46577a", "#b9c6d8", "#e7edf3"],
  );
  // Sky mid-band.
  const skyMid = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 0.85, 1],
    ["#0b0f17", "#1d3052", "#7c7170", "#d8d2c6", "#f1f1ec"],
  );
  // Horizon (bottom) — where the warm dawn light pools.
  const horizon = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.8, 1],
    ["#14233b", "#5b3b27", "#cf9550", "#ecdcc2", "#f5f0e6"],
  );
  // Sun glow colour + rise.
  const glow = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 1],
    [
      "rgba(212,175,55,0.10)",
      "rgba(220,150,70,0.34)",
      "rgba(232,200,150,0.20)",
      "rgba(212,175,55,0.05)",
    ],
  );
  const sunY = useTransform(scrollYProgress, [0, 1], ["90%", "26%"]);
  // Graticule fades as day breaks (lines belong to the night sky).
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [0.5, 0.4, 0]);

  const sky = useMotionTemplate`linear-gradient(180deg, ${skyTop} 0%, ${skyMid} 46%, ${horizon} 100%)`;
  const sun = useMotionTemplate`radial-gradient(70% 55% at 50% ${sunY}, ${glow} 0%, transparent 72%)`;

  if (reduce) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: "linear-gradient(180deg,#10203a 0%,#5b3b27 64%,#f5f0e6 100%)" }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: sky }}
    >
      <motion.div className="absolute inset-0" style={{ background: sun }} />
      <Graticule opacity={gridOpacity} />
      {/* faint film grain / vignette to stop banding */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_55%,rgba(0,0,0,0.28)_100%)]" />
    </motion.div>
  );
}

/* ── A faint global graticule (lat/long), drifting slowly ──────────────────── */
function Graticule({ opacity }: { opacity: MotionValue<number> }) {
  const meridians = [12, 26, 40, 50, 60, 74, 88]; // x% of viewport
  const parallels = [58, 66, 74, 82, 90]; // y% — bunched toward the horizon
  return (
    <motion.svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      style={{ opacity }}
      animate={{ x: ["-2%", "2%", "-2%"] }}
      transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* meridians — bow outward from a vanishing point above the horizon */}
      {meridians.map((x) => (
        <path
          key={`m${x}`}
          d={`M ${x} 40 Q ${50 + (x - 50) * 1.9} 72, ${50 + (x - 50) * 3.1} 100`}
          fill="none"
          stroke="rgba(212,175,55,0.16)"
          strokeWidth={0.12}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {/* parallels — horizontal latitude lines, denser near the horizon */}
      {parallels.map((y) => (
        <line
          key={`p${y}`}
          x1="0"
          x2="100"
          y1={y}
          y2={y}
          stroke="rgba(212,175,55,0.12)"
          strokeWidth={0.1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.svg>
  );
}
